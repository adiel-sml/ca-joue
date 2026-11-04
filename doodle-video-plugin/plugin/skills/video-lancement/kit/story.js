// Histoires et explications : lieux, accessoires, bulles de dialogue, éléments explicatifs.
// S'ajoute à engine.js et people.js. Tout est pur : chaque fonction construit une fois et renvoie update(t) ou des nœuds.
'use strict';
SETS.lime = SETS.lime || { bg: '#C6F16D', pat: '#D5F58E', floor: '#8FC23A' };
SETS.sun = SETS.sun || { bg: '#FFD45E', pat: '#FFE08A', floor: '#E0A93A' };
SETS.cream = { bg: '#FFF1D6', pat: '#FBE6BE', floor: '#E8C99A' };

// ---------------- Lieux ----------------
// Salon : mur à motif, fenêtre, cadre, canapé ; plancher.
function placeRoom(g, o = {}) {
  const wall = o.wall || '#FFE3B3', floor = o.floor || '#C98A52';
  el('rect', { x: -400, y: -400, width: W + 800, height: FLOOR + 400, fill: wall }, g);
  dots(g, o.pat || '#FBD597', 110, 8);
  const win = el('g', { transform: `translate(${o.winX ?? 230} 520)` }, g);
  el('rect', { x: -130 + 12, y: -170 + 12, width: 260, height: 340, rx: 16, fill: K.ol }, win);
  el('rect', { x: -130, y: -170, width: 260, height: 340, rx: 16, fill: o.sky || '#8ED1FC', ...SO }, win);
  el('path', { d: 'M 0 -170 V 170 M -130 0 H 130', stroke: K.ol, 'stroke-width': 8 }, win);
  const fr = el('g', { transform: `translate(${o.frameX ?? 820} 470) rotate(3)` }, g);
  el('rect', { x: -90, y: -70, width: 180, height: 140, rx: 8, fill: K.white, ...SO }, fr);
  el('path', { d: 'M -60 40 L -20 -10 L 10 20 L 30 0 L 60 40 Z', fill: '#43AA8B', ...SO, 'stroke-width': 5 }, fr);
  el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: floor }, g);
  for (let x = -400; x < W + 400; x += 160) el('line', { x1: x, y1: FLOOR, x2: x - 60, y2: H + 400, stroke: K.ol, 'stroke-width': 3, opacity: .25 }, g);
  el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
}
function sofa(g, x, col = '#E76F51') {
  const s = el('g', { transform: `translate(${x} ${FLOOR})` }, g);
  el('rect', { x: -230, y: -250, width: 460, height: 150, rx: 40, fill: col, ...SO }, s);
  el('rect', { x: -250, y: -140, width: 500, height: 110, rx: 30, fill: col, ...SO }, s);
  for (const dx of [-270, 210]) el('rect', { x: dx, y: -190, width: 60, height: 170, rx: 26, fill: col, ...SO }, s);
  for (const dx of [-200, 180]) el('rect', { x: dx, y: -30, width: 20, height: 30, fill: K.ol }, s);
  return s;
}
function table(g, x, w = 300, col = '#8E5530') {
  const t = el('g', { transform: `translate(${x} ${FLOOR})` }, g);
  el('rect', { x: -w / 2, y: -190, width: w, height: 28, rx: 10, fill: col, ...SO }, t);
  for (const dx of [-w / 2 + 30, w / 2 - 44]) el('rect', { x: dx, y: -162, width: 14, height: 162, fill: col, ...SO, 'stroke-width': 6 }, t);
  return t;
}
// Rue : immeubles en silhouette, fenêtres, trottoir.
function placeStreet(g, o = {}) {
  el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: o.sky || '#8ED1FC' }, g);
  const r = rng(o.seed || 3), cols = ['#FFB870', '#FF8FB1', '#5BD68A', '#FFD45E', '#7FDDCF'];
  for (let x = -120, i = 0; x < W + 120; i++) {
    const w = 170 + r() * 120, h = 520 + r() * 420, b = el('g', {}, g);
    el('rect', { x, y: FLOOR - h, width: w, height: h + 20, fill: cols[i % cols.length], ...SO }, b);
    for (let yy = FLOOR - h + 50; yy < FLOOR - 120; yy += 110) for (let xx = x + 30; xx < x + w - 50; xx += 70) el('rect', { x: xx, y: yy, width: 40, height: 56, rx: 6, fill: K.cream, ...SO, 'stroke-width': 5 }, b);
    x += w + 10;
  }
  el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: '#B8BEC9' }, g);
  el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
}
// Parc : arbres ronds, soleil, herbe.
function placePark(g, o = {}) {
  el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: o.sky || '#A6DBFD' }, g);
  const sun = el('g', { transform: 'translate(860 300)' }, g);
  el('circle', { cx: 0, cy: 0, r: 90, fill: K.yellow, ...SO }, sun);
  for (const [x, s] of [[120, 1.1], [420, 0.8], [980, 1.2]]) {
    const tr = el('g', { transform: `translate(${x} ${FLOOR}) scale(${s})` }, g);
    el('rect', { x: -22, y: -260, width: 44, height: 260, fill: '#8E5530', ...SO }, tr);
    for (const [cx, cy, rr] of [[0, -360, 120], [-90, -290, 80], [90, -290, 80]]) el('circle', { cx, cy, r: rr, fill: '#43AA8B', ...SO }, tr);
  }
  el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: '#5BD68A' }, g);
  el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
}
// Salle de classe ou réunion : tableau où écrire.
function placeBoard(g, o = {}) {
  el('rect', { x: -400, y: -400, width: W + 800, height: FLOOR + 400, fill: o.wall || '#CFE8D9' }, g);
  const b = el('g', { transform: 'translate(540 560)' }, g);
  el('rect', { x: -420 + 14, y: -260 + 14, width: 840, height: 520, rx: 20, fill: K.ol }, b);
  el('rect', { x: -420, y: -260, width: 840, height: 520, rx: 20, fill: o.board || '#2F5D50', stroke: '#8E5530', 'stroke-width': 22 }, b);
  el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: o.floor || '#C98A52' }, g);
  el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
  return b;      // groupe du tableau : y ajouter du texte à la craie (chalk)
}
function chalk(parent, text, x, y, size = 64, o = {}) {
  return txt(parent, text, { x, y, 'font-size': size, 'font-family': 'Fredoka', 'font-weight': 600, fill: o.fill || '#F4F1E8', 'text-anchor': o.anchor || 'middle' });
}

// ---------------- Bulle de dialogue ----------------
// Pointe vers (tx, ty), le texte se coupe en lignes de maxW px. Apparaît à t0, disparaît à t1. Renvoie { g, update }.
function bubble(parent, text, o) {
  const size = o.size || 46, maxW = o.maxW || 520, pad = 34;
  const words = text.split(' '), lines = [''];
  for (const w of words) { const tl = (lines[lines.length - 1] + ' ' + w).trim(); if (measure(tl, size, 600) > maxW && lines[lines.length - 1]) lines.push(w); else lines[lines.length - 1] = tl; }
  const w = Math.max(...lines.map(l => measure(l, size, 600))) + pad * 2, h = lines.length * size * 1.25 + pad * 1.4;
  const g = el('g', {}, parent), inner = el('g', {}, g);
  o = { ...o, x: clamp(o.x, w / 2 + 40, W - w / 2 - 40) };          // la bulle reste dans le cadre
  const tx = o.tx - o.x, ty = o.ty - o.y, side = tx < 0 ? -1 : 1;
  const tail = `M ${side * w * 0.18 - 24} ${h / 2 - 4} L ${tx * 0.55} ${ty * 0.55} L ${side * w * 0.18 + 24} ${h / 2 - 4} Z`;
  el('rect', { x: -w / 2 + 10, y: -h / 2 + 10, width: w, height: h, rx: 34, fill: K.ol }, inner);
  el('path', { d: tail, fill: K.white, ...SO }, inner);
  el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 34, fill: o.fill || K.white, ...SO }, inner);
  el('path', { d: tail.replace(/Z$/, ''), fill: o.fill || K.white, stroke: 'none' }, inner);
  lines.forEach((l, i) => txt(inner, l, { x: 0, y: -h / 2 + pad * 0.7 + size * (1.0 + i * 1.25), 'font-size': size, 'font-family': 'Fredoka', 'font-weight': 600, fill: K.ol, 'text-anchor': 'middle' }));
  op(g, 0);
  const st = { g, w, h, text, x: o.x, y: o.y, t0: o.t0, t1: o.t1 };
  st.update = t => {
    if (t < st.t0 || t >= st.t1) { op(g, 0); return; }
    op(g, 1);
    const p = E.back(seg(t, st.t0, st.t0 + 0.25)) * (1 - E.in(seg(t, st.t1 - 0.15, st.t1)));
    g.setAttribute('transform', `translate(${st.x + tx * 0.4 * (1 - p)} ${st.y + ty * 0.4 * (1 - p)}) scale(${p.toFixed(3)})`);
  };
  return st;
}

// ---------------- Éléments explicatifs ----------------
// Pastille d'étape numérotée + titre, pour un « comment ça marche » en 3 à 5 étapes.
function stepBadge(parent, n, title, o = {}) {
  const g = el('g', {}, parent), col = o.col || K.yellow;
  el('circle', { cx: 8, cy: 8, r: 58, fill: K.ol }, g);
  el('circle', { cx: 0, cy: 0, r: 58, fill: col, ...SO }, g);
  gtext(g, String(n), 0, 26, 72, { fill: K.white, sw: 11 });
  const tw = measure(title, 54) + 60;
  el('rect', { x: 70 + 10, y: -40 + 10, width: tw, height: 80, rx: 40, fill: K.ol }, g);
  el('rect', { x: 70, y: -40, width: tw, height: 80, rx: 40, fill: K.cream, ...SO, 'stroke-width': 7 }, g);
  txt(g, title, { x: 70 + tw / 2, y: 18, 'font-size': 54, 'font-family': 'Fredoka', 'font-weight': 700, fill: K.ol, 'text-anchor': 'middle' });
  return { g, w: 70 + tw };
}
// Flèche dessinée d'un point à un autre, qui se trace entre t0 et t0 + d.
function arrow(parent, x1, y1, x2, y2, o = {}) {
  const mx = (x1 + x2) / 2 + (o.bend ?? 0.25) * (y2 - y1), my = (y1 + y2) / 2 - (o.bend ?? 0.25) * (x2 - x1);
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const g = el('g', {}, parent);
  const p = el('path', { d, fill: 'none', stroke: o.col || K.ol, 'stroke-width': o.w || 12, 'stroke-linecap': 'round' }, g);
  const a = Math.atan2(y2 - my, x2 - mx) * 180 / Math.PI;
  const head = el('path', { d: 'M -34 -22 L 0 0 L -34 22', fill: 'none', stroke: o.col || K.ol, 'stroke-width': o.w || 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', transform: `translate(${x2} ${y2}) rotate(${a})` }, g);
  const len = p.getTotalLength();
  p.setAttribute('stroke-dasharray', len);
  return { g, update(t) {
    const q = seg(t, o.t0, o.t0 + (o.d || 0.4));
    p.setAttribute('stroke-dashoffset', (len * (1 - E.out(q))).toFixed(1)); op(head, q >= 1 ? 1 : 0); op(g, t >= o.t0 ? 1 : 0);
  } };
}
// Gros chiffre qui compte jusqu'à sa valeur (avec unité), pour une statistique vraie et sourcée.
function bigNumber(parent, value, unit, o) {
  const g = el('g', {}, parent), size = o.size || 200;
  const n = gtext(g, '0', 0, 0, size, { fill: o.col || K.yellow, sw: size * 0.13 });
  const u = unit ? gtext(g, unit, 0, size * 0.62, size * 0.32, { fill: K.white, sw: size * 0.05 }) : null;
  return { g, update(t) {
    op(g, t >= o.t0 ? 1 : 0);
    const p = E.out(seg(t, o.t0, o.t0 + (o.d || 0.8)));
    n.textContent = (o.format || (v => String(Math.round(v))))(value * p);
    tf(g, o.x, o.y, E.back(seg(t, o.t0, o.t0 + 0.3)));
  } };
}
// Liste de points qui se cochent un par un (temps donnés), pour un récapitulatif.
function checklist(parent, items, o) {
  const g = el('g', {}, parent), rows = items.map((it, i) => {
    const r = el('g', { transform: `translate(0 ${i * 110})` }, g);
    el('rect', { x: -20, y: -40, width: 80, height: 80, rx: 18, fill: K.white, ...SO }, r);
    const ck = el('path', { d: 'M -2 2 L 16 20 L 44 -16', fill: 'none', stroke: '#2FB36B', 'stroke-width': 14, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, r);
    txt(r, it, { x: 90, y: 18, 'font-size': 52, 'font-family': 'Fredoka', 'font-weight': 700, fill: o.fill || K.ol });
    return { r, ck };
  });
  return { g, update(t) {
    tf(g, o.x, o.y);
    rows.forEach((x, i) => { const ti = o.times[i]; op(x.r, t >= ti - 0.3 ? 1 : 0); op(x.ck, t >= ti ? 1 : 0); tf(x.ck, 0, 0, E.back(seg(t, ti, ti + 0.25))); });
  } };
}

// ---------------- Mouvement ----------------
// Marche de xa à xb entre t0 et t1 : position, balancement des jambes et des bras, petit rebond.
function walk(t, t0, t1, xa, xb) {
  const p = seg(t, t0, t1), moving = t > t0 && t < t1, ph = (t - t0) * 2 * Math.PI * 1.8;
  return { x: lerp(xa, xb, E.io(p)), y: moving ? -Math.abs(Math.sin(ph)) * 10 : 0, step: moving ? Math.sin(ph) : 0,
           armsL: moving ? 18 + 14 * Math.sin(ph) : null, armsR: moving ? 18 - 14 * Math.sin(ph) : null, face: xb >= xa ? 1 : -1 };
}
// Bouche qui parle : ouverte sur les mots de la ligne (temps des mots de TL.lines).
function talking(L, t) { return !!L && L.words.some(w => t >= w.t0 && t < w.t1 - 0.04 && ((t - w.t0) % 0.16) < 0.1); }

// ---------------- Rythme : ce qui garde le spectateur ----------------
// Découpage automatique d'un dialogue : un plan par réplique, qui alterne plan large et gros plan sur celui qui parle,
// avec une poussée lente pendant la réplique. who : {id de ligne → x du personnage}. Renvoie cam(t).
function dialogueCam(lines, who, o = {}) {
  const wide = o.wide || { x: 540, y: 1060, z: 1.25 }, headY = o.headY ?? FLOOR - 330, zc = o.zClose || 1.75;
  const shots = lines.map((L, i) => ({ t0: L.t0 - 0.08, t1: L.t1, close: i % 3 !== 0, x: who[L.id] }));
  return t => {
    let k = -1; shots.forEach((s, i) => { if (t >= s.t0) k = i; });
    if (k < 0) return wide;
    const s = shots[k], p = seg(t, s.t0, s.t1 + 0.4);
    if (!s.close) return { x: wide.x, y: wide.y, z: wide.z + 0.08 * p };
    return { x: clamp(s.x, 540 - 540 * (1 - 1 / zc), 540 + 540 * (1 - 1 / zc)), y: headY + 120, z: zc + 0.1 * p };
  };
}
// Vie au repos : respiration, léger balancement, clignement ; à fusionner dans les options de pose.
function alive(t, i = 0) {
  const b = Math.sin(t * 2.4 + i * 1.7);
  const blink = ((t + i * 0.77) % 3.1) < 0.12;
  return { lean: 2.2 * b, sq: 1 + 0.012 * Math.sin(t * 3.1 + i), eyes: blink ? 'meh' : 'n' };
}
// Réaction de celui qui écoute : un petit sursaut au début de la réplique de l'autre, puis il regarde le locuteur.
function listen(t, L, dx) { const r = L && t >= L.t0 && t < L.t0 + 0.3 ? hitSq(t, L.t0, 0.06) : 1; return { look: Math.sign(dx) * 6, sq: r }; }
// Mot clé qui surgit au moment où il est dit (étiquette à ombre dure), avec un pop et un coup de zoom.
// Par défaut à l'écran (HUD, toujours visible) : keyword(L, 'mot', {…}) ; ou dans le décor : keyword(L, 'mot', {g, s}).
function keyword(L, word, o = {}) {
  const g = o.g || HUD, s = o.s || { fx: OVERLAYS };
  const w = L.words.find(x => x.w.toLowerCase().replace(/[^a-zàâçéèêëîïôûùœ0-9'-]/g, '').startsWith(word.toLowerCase()));
  if (!w) return null;
  const t0 = w.t0 - 0.03, txt_ = o.text || word.toUpperCase();
  const st = sticker(g, txt_, { col: o.col || K.yellow, fill: o.fill || K.white, x: o.x ?? 540, y: o.y ?? 560, rot: o.rot ?? -5, t0, t1: o.t1 ?? (t0 + 1.6), size: o.size || 72 });
  s.fx.push(st.update); ev(t0, 'pop', { f: o.f || 988 }); punch(t0, 0.025);
  if (typeof reg === 'function') reg('kw-' + txt_, txt_, st.t0, st.t1, st.x, st.y, st.w, st.h);
  return st;
}
// Transition rapide entre deux scènes : une bande de couleur balaie l'écran (0,3 s) avec un whoosh.
const WIPES = [];
function wipe(t0, col = K.yellow) { WIPES.push({ t0, col }); ev(t0 - 0.12, 'whoosh'); }
function drawWipes(hud, t) {
  if (!drawWipes.g) { drawWipes.g = el('g', {}, hud); drawWipes.r = el('path', { d: '', fill: K.yellow, stroke: K.ol, 'stroke-width': 10 }, drawWipes.g); }
  const w = WIPES.find(x => t >= x.t0 - 0.15 && t < x.t0 + 0.15);
  if (!w) { op(drawWipes.g, 0); return; }
  const p = seg(t, w.t0 - 0.15, w.t0 + 0.15), x = lerp(-1400, 1500, E.io(p));
  drawWipes.r.setAttribute('fill', w.col); op(drawWipes.g, 1);
  drawWipes.r.setAttribute('d', `M ${x} -100 L ${x + 900} -100 L ${x + 600} 2020 L ${x - 300} 2020 Z`);
}
