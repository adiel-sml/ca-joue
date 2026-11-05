// Motion design d'une appli (web ou mobile) : l'interface réelle qui bouge, sans bonhommes (ou avec, en appoint).
// Tout est une fonction pure de t (rendu image par image, dans n'importe quel ordre).
//   Track / stepR          ressorts fermés : un élément suit ses cibles avec un très léger dépassement, jamais de rebond mou
//   camRig                 caméra sur ressorts (zoom logarithmique), fit(t, boîte) : l'état remplit l'image
//   vis / applyVis         entrée sur ressort, sortie courte et tôt, avec un flou bref (changement de contenu)
//   uiShot / device        vraie capture de l'appli (coins arrondis, ombre posée) ; cadre téléphone, navigateur, ordinateur
//   uiPart                 un morceau d'écran capturé (bouton, carte, liste) qu'on peut sortir et animer seul
//   cursor                 curseur qui mène chaque changement : trajets en arc, clic (pression et onde), glisser
//   typing, counter, slam  texte tapé, compteur qui roule, mots qui tombent sur le temps
//   morph                  une forme qui change de taille, d'arrondi et de couleur au lieu d'une coupe
//   focus                  le reste s'assombrit, l'élément est cerné
// Règles de style (celles de l'utilisateur) : couleurs du produit, pas de dégradé violet, pas de halo ni de particules,
// une police d'interface (Inter, ou celle du produit), ombres courtes et posées.
'use strict';
const MFONT = (window.PALETTE && PALETTE.font) || 'Inter';
const MO = {
  canvas: (window.PALETTE && PALETTE.fond) || '#F6F4EF', ink: (window.PALETTE && PALETTE.encre) || '#15161A',
  accent: (window.PALETTE && PALETTE.accents && PALETTE.accents[0]) || '#FF4D6D', line: 'rgba(21,22,26,0.10)', shadow: 'rgba(21,22,26,0.16)',
};
function measureF(str, size, weight = 700, font = MFONT) { mctx.font = `${weight} ${size}px ${font}`; return mctx.measureText(str).width; }
function mtext(parent, str, o = {}) {
  const e = el('text', { x: o.x || 0, y: o.y || 0, 'font-size': o.size || 56, 'font-family': o.font || MFONT, 'font-weight': o.weight || 700,
    fill: o.fill || MO.ink, 'text-anchor': o.anchor || 'middle', 'letter-spacing': o.ls ?? (o.size >= 90 ? -2 : 0) }, parent);
  e.textContent = str; return e;
}

// ---------------- Ressorts ----------------
const SP = { vif: { w: 18, z: 0.8 }, doux: { w: 11, z: 1 }, cam: { w: 7.5, z: 1 }, texte: { w: 24, z: 1 }, net: { w: 30, z: 0.85 } };
function stepR(tau, sp = SP.vif) {
  if (tau <= 0) return 0;
  const w = sp.w, z = sp.z;
  if (z >= 1) { const x = w * tau; return 1 - Math.exp(-x) * (1 + x); }
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * tau) * (Math.cos(wd * tau) + (z * w / wd) * Math.sin(wd * tau));
}
// Une valeur qui suit ses cibles : new Track(0).to(1.2, 300).to(2.0, 120) ; at(t). Chaque changement est un ressort qui s'additionne.
class Track {
  constructor(v0) { this.v0 = v0; this.cur = v0; this.ev = []; }
  to(t, v, sp = SP.vif) { if (v !== this.cur) { this.ev.push([t, v - this.cur, sp]); this.cur = v; } return this; }
  at(t) { let v = this.v0; for (const [ti, d, sp] of this.ev) v += d * stepR(t - ti, sp); return v; }
}
// Caméra : s.cam = rig.cam ; rig.to(t, x, y, z) ou rig.fit(t, {x, y, w, h}) (centre et zoom pour que la boîte remplisse l'image).
function camRig(x0 = 540, y0 = 960, z0 = 1) {
  const X = new Track(x0), Y = new Track(y0), LZ = new Track(Math.log(z0));
  const rig = {
    to(t, x, y, z, sp = SP.cam) { X.to(t, x, sp); Y.to(t, y, sp); LZ.to(t, Math.log(z), sp); return rig; },
    fit(t, b, o = {}) { const pad = o.pad ?? 70, z = Math.min((W - 2 * pad) / b.w, (H * (o.fill ?? 0.62)) / b.h, o.max ?? 4);
      return rig.to(t, b.x + b.w / 2, b.y + b.h / 2 + (o.dy || 0) / z, z, o.sp || SP.cam); },
    cam: t => ({ x: X.at(t), y: Y.at(t), z: Math.exp(LZ.at(t)) }),
  };
  return rig;
}

// ---------------- Apparitions ----------------
// Entrée sur ressort (opacité, flou, glissement), sortie courte et tôt : deux contenus ne se superposent jamais longtemps.
function vis(t, tin, tout = null, dOut = 0.14) {
  const e = stepR(t - tin, SP.texte), x = tout == null ? 0 : clamp((t - tout) / dOut), xo = x * x;
  return { o: t < tin ? 0 : e * (1 - xo), b: (1 - e) * 8 + xo * 8, dy: (1 - e) * 18 - xo * 12, s: 0.96 + 0.04 * e, e };
}
const BLURS = new WeakMap();
function setBlur(g, b) {
  if (b < 0.25) { g.removeAttribute('filter'); return; }
  let f = BLURS.get(g);
  if (!f) { const id = 'mb' + (++clipN); const fl = el('filter', { id, x: '-30%', y: '-30%', width: '160%', height: '160%' }, g.parentNode || g); f = el('feGaussianBlur', { stdDeviation: 0 }, fl); f._id = id; BLURS.set(g, f); }
  f.setAttribute('stdDeviation', b.toFixed(2)); g.setAttribute('filter', `url(#${f._id})`);
}
function applyVis(g, v, x = 0, y = 0, s = 1, r = 0) { op(g, v.o); if (v.o <= 0.001) return; tf(g, x, y + v.dy, s * v.s, r); setBlur(g, v.b); }

// ---------------- Captures réelles et appareils ----------------
// Image chargée avant le rendu (LOADS). src : chemin d'une capture (tools/ui_capture.cjs les range dans assets/ui/).
function img(parent, src, x, y, w, h, o = {}) {
  const im = el('image', { x, y, width: w, height: h, href: src, preserveAspectRatio: o.fit || 'xMidYMin slice' }, parent);
  LOADS.push(new Promise(r => { im.addEventListener('load', r); im.addEventListener('error', () => { console.error('image manquante ' + src); r(); }); }));
  return im;
}
function rclip(parent, x, y, w, h, r) { const id = 'mc' + (++clipN), cp = el('clipPath', { id }, parent); el('rect', { x, y, width: w, height: h, rx: r }, cp); return `url(#${id})`; }
// Carte d'interface : la capture aux coins arrondis, une ombre courte posée dessous. Centrée sur (0, 0).
function uiShot(parent, src, o = {}) {
  const w = o.w || 700, h = o.h || 1400, r = o.r ?? 40, g = el('g', {}, parent);
  if (o.shadow !== false) el('rect', { x: -w / 2 + 6, y: -h / 2 + 18, width: w, height: h, rx: r, fill: MO.shadow, opacity: 0.55 }, g);
  const body = el('g', { 'clip-path': rclip(g, -w / 2, -h / 2, w, h, r) }, g);
  el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, fill: o.bg || '#FFFFFF' }, body);
  const ims = {}; let cur = null;
  const set = s => { if (s === cur) return; if (cur) show(ims[cur], false); if (!ims[s]) ims[s] = img(body, s, -w / 2, -h / 2, w, h, o); show(ims[s], true); cur = s; };
  if (src) set(src);
  el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: r, fill: 'none', stroke: MO.line, 'stroke-width': 2 }, g);
  return { g, body, w, h, set };
}
// Appareil : 'phone' (390×844 en points, écran 2:4.33), 'browser' (fenêtre avec barre d'adresse), 'laptop'.
// Renvoie { g, screen (groupe découpé à l'écran), sw, sh, set(src) }. Centré sur (0, 0).
function device(parent, kind = 'phone', o = {}) {
  const g = el('g', {}, parent);
  if (kind === 'phone') {
    const sw = o.w || 600, sh = sw * 844 / 390, bz = sw * 0.04, R = sw * 0.14;
    el('rect', { x: -sw / 2 - bz + 8, y: -sh / 2 - bz + 22, width: sw + 2 * bz, height: sh + 2 * bz, rx: R + bz, fill: MO.shadow, opacity: 0.6 }, g);
    el('rect', { x: -sw / 2 - bz, y: -sh / 2 - bz, width: sw + 2 * bz, height: sh + 2 * bz, rx: R + bz, fill: o.body || '#1C1D21' }, g);
    const screen = el('g', { 'clip-path': rclip(g, -sw / 2, -sh / 2, sw, sh, R) }, g);
    el('rect', { x: -sw / 2, y: -sh / 2, width: sw, height: sh, fill: o.screenBg || '#FFFFFF' }, screen);
    // barre d'état (les captures n'en ont pas) : l'interface commence sous l'îlot, comme sur un vrai téléphone
    const top = o.status === false ? 0 : sw * 0.12, ink = o.statusInk || '#FFFFFF', sb = el('g', {}, g);
    if (top) { mtext(sb, o.time || '21:00', { x: -sw * 0.3, y: -sh / 2 + sw * 0.088, size: sw * 0.042, weight: 600, fill: ink });
      el('rect', { x: sw * 0.29, y: -sh / 2 + sw * 0.058, width: sw * 0.06, height: sw * 0.03, rx: sw * 0.008, fill: 'none', stroke: ink, 'stroke-width': 2 }, sb);
      el('rect', { x: sw * 0.296, y: -sh / 2 + sw * 0.064, width: sw * 0.042, height: sw * 0.018, rx: sw * 0.004, fill: ink }, sb);
      [0, 1, 2, 3].forEach(i => el('rect', { x: sw * 0.2 + i * sw * 0.014, y: -sh / 2 + sw * (0.082 - 0.006 * i), width: sw * 0.009, height: sw * (0.006 + 0.006 * i), rx: 1.5, fill: ink }, sb)); }
    const island = el('rect', { x: -sw * 0.16, y: -sh / 2 + sw * 0.03, width: sw * 0.32, height: sw * 0.085, rx: sw * 0.0425, fill: '#0B0B0D' }, g);
    // les captures (390 de large) tiennent dans la hauteur sous la barre d'état ; k : px du monde par px d'appli
    const iw = Math.min(sw, (sh - top) * 390 / 844), k = iw / 390;
    const d = { g, screen, sw, sh, island, kind, top, iw, k };
    d.app = (ax, ay) => ({ x: (ax - 195) * k, y: -sh / 2 + top + ay * k });      // point de l'appli → repère de l'appareil
    return withSet(d, o);
  }
  const sw = o.w || 960, sh = o.h || sw * 0.625, bar = Math.max(44, sw * 0.055), r = o.r ?? 22;
  const top = kind === 'laptop' ? 0 : bar;
  el('rect', { x: -sw / 2 + 6, y: -sh / 2 - top + 18, width: sw, height: sh + top, rx: r, fill: MO.shadow, opacity: 0.55 }, g);
  el('rect', { x: -sw / 2, y: -sh / 2 - top, width: sw, height: sh + top, rx: r, fill: kind === 'laptop' ? '#1C1D21' : '#ECEBE7' }, g);
  if (kind === 'browser') {
    [0, 1, 2].forEach(i => el('circle', { cx: -sw / 2 + bar * 0.5 + i * bar * 0.42, cy: -sh / 2 - bar / 2, r: bar * 0.12, fill: '#C9C7C1' }, g));
    const uw = sw * 0.5; el('rect', { x: -uw / 2, y: -sh / 2 - bar * 0.78, width: uw, height: bar * 0.56, rx: bar * 0.28, fill: '#FFFFFF' }, g);
    if (o.url) mtext(g, o.url, { y: -sh / 2 - bar * 0.38, size: bar * 0.3, weight: 500, fill: '#6B6A66' });
  }
  const pad = kind === 'laptop' ? sw * 0.02 : 0;
  const screen = el('g', { 'clip-path': rclip(g, -sw / 2 + pad, -sh / 2 + pad, sw - 2 * pad, sh - 2 * pad, kind === 'laptop' ? 8 : 0) }, g);
  el('rect', { x: -sw / 2, y: -sh / 2, width: sw, height: sh, fill: '#FFFFFF' }, screen);
  if (kind === 'laptop') el('path', { d: `M ${-sw * 0.6} ${sh / 2} L ${sw * 0.6} ${sh / 2} L ${sw * 0.56} ${sh / 2 + sw * 0.035} L ${-sw * 0.56} ${sh / 2 + sw * 0.035} Z`, fill: '#2A2B30' }, g);
  return withSet({ g, screen, sw: sw - 2 * pad, sh: sh - 2 * pad, kind }, o);
}
function withSet(d, o) {
  const ims = {}; let cur = null;
  // l'écran affiché ; scroll (px du monde) fait défiler une capture plus haute que l'écran
  // aspect : hauteur / largeur de la capture (844 / 390 par défaut ; une page entière est plus haute)
  d.set = (src, scroll = 0, aspect = 844 / 390) => {
    const iw = d.iw || d.sw, y0 = -d.sh / 2 + (d.top || 0);
    if (src !== cur) { if (cur) show(ims[cur].g, false); if (!ims[src]) { const gg = el('g', {}, d.screen); ims[src] = { g: gg, im: img(gg, src, -iw / 2, y0, iw, iw * aspect, { fit: 'xMidYMin meet' }) }; } show(ims[src].g, true); cur = src; }
    ims[src].g.setAttribute('transform', `translate(0 ${(-scroll).toFixed(1)})`);
  };
  return d;
}
// Morceau d'écran capturé (tools/ui_capture.cjs : "part") : window.UI.parts[nom] = {file, box:[x, y, w, h], page:[w, h]}.
// uiPart(parent, nom, échelle) le place à sa position dans la capture entière (repère centré), pour l'en sortir ensuite.
function uiPart(parent, name, scale = 1, o = {}) {
  const P = (window.UI && UI.parts && UI.parts[name]); if (!P) throw new Error('morceau d\'interface inconnu : ' + name);
  const [x, y, w, h] = P.box, [pw, ph] = P.page || [390, 844], g = el('g', {}, parent), inner = el('g', {}, g);
  const r = (o.r ?? 18) * scale;
  if (o.shadow !== false) el('rect', { x: -w * scale / 2 + 4, y: -h * scale / 2 + 12, width: w * scale, height: h * scale, rx: r, fill: MO.shadow, opacity: 0.5 }, inner);
  const body = el('g', { 'clip-path': rclip(inner, -w * scale / 2, -h * scale / 2, w * scale, h * scale, r) }, inner);
  img(body, P.file, -w * scale / 2, -h * scale / 2, w * scale, h * scale, { fit: 'none' });
  // position d'origine dans l'écran entier (centré, même échelle) : home
  return { g, inner, w: w * scale, h: h * scale, home: { x: (x + w / 2 - pw / 2) * scale, y: (y + h / 2 - ph / 2) * scale } };
}

// ---------------- Curseur ----------------
// cursor(parent, [{t, x, y, click, drag, sp}], {label, col}) → update(t) ; le clic : pression, onde, bruit « click ».
// Les trajets sont en arc (pas en ligne droite) ; le curseur penche avec sa vitesse ; label : petite pastille qui suit avec retard.
function cursor(parent, path, o = {}) {
  const g = el('g', {}, parent), ring = el('circle', { r: 10, fill: 'none', stroke: o.col || MO.accent, 'stroke-width': 5 }, g);
  const arrow = el('g', {}, g);
  el('path', { d: 'M 0 0 L 0 46 L 12 35 L 21 55 L 30 51 L 21 32 L 37 32 Z', fill: o.fill || '#111214', stroke: '#FFFFFF', 'stroke-width': 3.5, 'stroke-linejoin': 'round' }, arrow);
  let pill = null;
  if (o.label) { pill = el('g', {}, g); const pw = measureF(o.label, 26, 600) + 30; el('rect', { x: 30, y: 52, width: pw, height: 40, rx: 20, fill: o.col || MO.accent }, pill); mtext(pill, o.label, { x: 30 + pw / 2, y: 80, size: 26, weight: 600, fill: '#FFFFFF' }); }
  const X = new Track(path[0].x), Y = new Track(path[0].y), A = new Track(0);
  path.forEach((p, i) => { if (!i) return; const q = path[i - 1], sp = p.sp || SP.doux, lead = p.lead ?? 0.38;
    const tm = p.t - lead; X.to(tm, p.x, sp); Y.to(tm, p.y, sp);
    const bend = (p.arc ?? 0.18) * Math.hypot(p.x - q.x, p.y - q.y) * (i % 2 ? 1 : -1); A.to(tm, bend, { w: 9, z: 1 }); A.to(tm + 0.25, 0, { w: 9, z: 1 }); });
  const clicks = path.filter(p => p.click).map(p => p.t);
  clicks.forEach(tc => ev(tc, 'click'));
  const pos = t => { const x = X.at(t), y = Y.at(t), dx = X.at(t + 0.02) - x, dy = Y.at(t + 0.02) - y, n = Math.hypot(dx, dy) || 1, a = A.at(t);
    return { x: x - dy / n * a * 0.35, y: y + dx / n * a * 0.35, vx: dx / 0.02 }; };
  const upd = t => {
    const p = pos(t);
    let press = 1; for (const tc of clicks) press *= 1 - 0.16 * Math.exp(-(((t - tc) / 0.05) ** 2));
    tf(arrow, 0, 0, press, clamp(-p.vx * 0.004, -14, 14));
    const lc = clicks.filter(tc => t >= tc && t < tc + 0.45).pop();
    if (lc != null) { const k = (t - lc) / 0.45; op(ring, (1 - k) * 0.9); ring.setAttribute('r', (8 + 46 * E.out(k)).toFixed(1)); } else op(ring, 0);
    if (pill) tf(pill, clamp(-p.vx * 0.01, -24, 24), 0);
    const on = t >= (o.t0 ?? path[0].t - 0.3) && t < (o.t1 ?? 1e9); op(g, on ? 1 : 0);
    tf(g, p.x, p.y, o.s || 1);
  };
  upd.pos = pos; return upd;
}

// ---------------- Texte ----------------
// Texte tapé lettre à lettre (curseur clignotant), un petit tic sonore toutes les 2 lettres.
function typing(parent, text, o = {}) {
  const g = el('g', {}, parent), size = o.size || 44, cps = o.cps || 16, t0 = o.t0 || 0;
  const tx = mtext(g, '', { x: o.x || 0, y: o.y || 0, size, weight: o.weight || 500, fill: o.fill || MO.ink, anchor: o.anchor || 'start' });
  const caret = el('rect', { width: 3, height: size * 1.05, fill: o.caret || MO.accent }, g);
  for (let i = 0; i < text.length; i += 2) if (text[i] !== ' ') ev(t0 + i / cps, 'tick', { gain: 0.5 });
  const upd = t => {
    const n = clamp(Math.floor((t - t0) * cps), 0, text.length); tx.textContent = text.slice(0, n);
    const w = measureF(text.slice(0, n), size, o.weight || 500), ax = o.anchor === 'middle' ? -measureF(text, size, o.weight || 500) / 2 : 0;
    caret.setAttribute('x', ((o.x || 0) + ax + w + 4).toFixed(1)); caret.setAttribute('y', ((o.y || 0) - size * 0.85).toFixed(1));
    op(caret, t >= t0 - 0.3 && (n < text.length || Math.floor(t * 2.2) % 2 === 0) && t < (o.t1 ?? 1e9) ? 1 : 0);
    op(g, t >= t0 - 0.3 && t < (o.t1 ?? 1e9) ? 1 : 0);
  };
  upd.done = t0 + text.length / cps; return upd;
}
// Compteur qui roule jusqu'à une vraie valeur (chiffres à chasse fixe), tic à chaque palier, petit coup à l'arrivée.
function counter(parent, to, o = {}) {
  const g = el('g', {}, parent), t0 = o.t0 || 0, dur = o.dur || 1.2, from = o.from || 0;
  const tx = mtext(g, '', { x: o.x || 0, y: o.y || 0, size: o.size || 160, weight: 800, fill: o.fill || MO.ink });
  tx.setAttribute('font-variant-numeric', 'tabular-nums');
  const fmt = v => (o.prefix || '') + Math.round(v).toLocaleString('fr-FR').replace(/ /g, ' ') + (o.suffix || '');
  for (let i = 1; i <= 8; i++) ev(t0 + dur * (1 - Math.pow(1 - i / 8, 2)), 'tick', { gain: 0.4 });
  ev(t0 + dur, 'stamp');
  return t => { const p = 1 - Math.pow(1 - clamp((t - t0) / dur), 3); tx.textContent = fmt(from + (to - from) * p);
    const k = stepR(t - t0 - dur, SP.net); tf(tx, 0, 0, 1 + 0.08 * Math.sin(Math.PI * clamp((t - t0 - dur) / 0.25)) * (1 - k)); op(g, t >= t0 - 0.1 && t < (o.t1 ?? 1e9) ? 1 : 0); };
}
// Mots qui tombent un par un sur des temps donnés (titres, promesse), chaque mot remplace le précédent ou s'ajoute (o.stack).
function slam(parent, words, times, o = {}) {
  const size = o.size || 150, gs = words.map((w, i) => { const g = el('g', {}, parent); mtext(g, w, { size, weight: 800, fill: (o.cols && o.cols[i]) || o.fill || MO.ink, ls: -3 }); return g; });
  times.forEach(t => ev(t, o.sfx || 'stamp'));
  return t => gs.forEach((g, i) => {
    const t1 = o.stack ? (o.t1 ?? 1e9) : (times[i + 1] ?? o.t1 ?? 1e9), v = vis(t, times[i], t1 - 0.12);
    const y = o.stack ? (o.y || 0) + (i - (words.length - 1) / 2) * size * 1.05 : (o.y || 0);
    applyVis(g, { ...v, s: 1.25 - 0.25 * v.e, b: v.b * 0.6 }, o.x || 0, y + size * 0.35);
  });
}

// ---------------- Formes ----------------
// Une seule forme qui devient chaque état : morph(parent, [{t, x, y, w, h, r, fill}]) → update(t) ; elle ne coupe jamais.
function morph(parent, states, o = {}) {
  const g = el('g', {}, parent), sh = el('rect', { fill: MO.shadow, opacity: o.shadow === false ? 0 : 0.5 }, g), R = el('rect', {}, g);
  const s0 = states[0], T = {}; ['x', 'y', 'w', 'h', 'r'].forEach(k => { T[k] = new Track(s0[k]); });
  states.forEach((s, i) => { if (i) ['x', 'y', 'w', 'h', 'r'].forEach(k => s[k] != null && T[k].to(s.t, s[k], s.sp || SP.vif)); });
  // bords d'attaque et de fuite sur deux ressorts : la forme s'étire quand elle se déplace
  const LW = new Track(s0.x), states2 = states.map(s => s); states2.forEach((s, i) => { if (i && s.x != null) LW.to(s.t, s.x, { w: 11, z: 0.95 }); });
  const upd = t => {
    const x = T.x.at(t), y = T.y.at(t), w = T.w.at(t), h = T.h.at(t), r = T.r.at(t), lag = LW.at(t) - x, ww = w + Math.abs(lag) * 0.6, xx = x + lag * 0.3;
    let fill = s0.fill; for (const s of states) if (t >= s.t && s.fill) fill = s.fill;
    for (const [e, dx, dy] of [[sh, 4, 12], [R, 0, 0]]) { e.setAttribute('x', (xx - ww / 2 + dx).toFixed(1)); e.setAttribute('y', (y - h / 2 + dy).toFixed(1)); e.setAttribute('width', ww.toFixed(1)); e.setAttribute('height', h.toFixed(1)); e.setAttribute('rx', Math.min(r, h / 2, ww / 2).toFixed(1)); }
    R.setAttribute('fill', fill);
    op(g, t >= (o.t0 ?? -1e9) && t < (o.t1 ?? 1e9) ? 1 : 0);
  };
  upd.at = t => ({ x: T.x.at(t), y: T.y.at(t), w: T.w.at(t), h: T.h.at(t) }); upd.g = g; return upd;
}
// Mise en avant : tout s'assombrit sauf la boîte, cernée d'un trait de la couleur du produit.
function focus(parent, box, t0, t1, o = {}) {
  const g = el('g', {}, parent), r = o.r ?? 24, pad = o.pad ?? 14;
  const dim = el('path', { 'fill-rule': 'evenodd', fill: o.dim || 'rgba(12,12,14,0.55)' }, g);
  const ring = el('rect', { fill: 'none', stroke: o.col || MO.accent, 'stroke-width': 6, rx: r }, g);
  ev(t0, 'pop', { f: 880 });
  return t => {
    const e = stepR(t - t0, SP.vif) * (1 - clamp((t - t1) / 0.2)); op(g, t >= t0 && t < t1 + 0.2 ? 1 : 0); if (e <= 0) return;
    const x = box.x - pad, y = box.y - pad, w = box.w + 2 * pad, h = box.h + 2 * pad, k = 1 + 0.12 * (1 - e);
    dim.setAttribute('d', `M -3000 -3000 H 4000 V 5000 H -3000 Z M ${x + r} ${y} H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r} V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h} H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r} V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`);
    dim.setAttribute('opacity', e.toFixed(3));
    ring.setAttribute('x', (x + w / 2 - w * k / 2).toFixed(1)); ring.setAttribute('y', (y + h / 2 - h * k / 2).toFixed(1)); ring.setAttribute('width', (w * k).toFixed(1)); ring.setAttribute('height', (h * k).toFixed(1)); ring.setAttribute('opacity', e.toFixed(3));
  };
}
// Fond de motion : la toile du produit, une trame de points discrète (pas de dégradé).
function motionBg(g, o = {}) {
  el('rect', { x: -2000, y: -2000, width: W + 4000, height: H + 4000, fill: o.col || MO.canvas }, g);
  if (o.dots !== false) { const pat = el('g', { opacity: o.dotsOp ?? 0.5 }, g); for (let y = -600; y < H + 600; y += 60) for (let x = -600; x < W + 600; x += 60) el('circle', { cx: x, cy: y, r: 2.2, fill: MO.line }, pat); }
}
// Moments du film (pour check.py : rien de neuf pendant plus de deux mesures = temps mort).
const BEATMARKS = []; function mark(t) { BEATMARKS.push(t); return t; }
window.MOTIONMARKS = () => [...BEATMARKS, ...EV.map(e => e.t), ...CUTS, ...PUNCH.map(p => p[0])].sort((a, b) => a - b);
