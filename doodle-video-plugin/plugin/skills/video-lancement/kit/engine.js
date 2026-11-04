// Moteur des films doodle : SVG 1080×1920, render(t) pur. Personnages : people.js. Scènes : film.js du projet.
// Aides de base reprises et adaptées du style Game Show Flat de Lemo-Opuscar (licence MIT, voir CREDITS).
'use strict';
const NS = 'http://www.w3.org/2000/svg';
// Le monde est toujours dessiné en 1080×1920 (W, H) ; l'image rendue (VW×VH) peut être verticale, 4:5 ou 16:9 :
// la caméra et l'écran (HUD) s'adaptent (runtime.js). Taille de l'image : ?size=WxH dans l'adresse, sinon la fenêtre (--size des outils de rendu).
const W = 1080, H = 1920, FLOOR = 1380;
const [VW, VH] = ((new URLSearchParams(location.search).get('size')) || (innerWidth > 0 && innerHeight > 0 ? `${innerWidth}x${innerHeight}` : null) || '1080x1920').split('x').map(Number);
const LANDSCAPE = VW > VH;
function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
function txt(parent, str, attrs) { const e = el('text', attrs, parent); e.textContent = str; return e; }
function tf(e, x = 0, y = 0, s = 1, r = 0, sy) {
  e.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(2)}) scale(${s.toFixed(4)} ${(sy ?? s).toFixed(4)})`);
}
function op(e, o) { e.setAttribute('opacity', Math.max(0, Math.min(1, o)).toFixed(3)); }
function show(e, v) { e.style.display = v ? '' : 'none'; }
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (t, a, b) => clamp((t - a) / (b - a));
const lerp = (a, b, p) => a + (b - a) * p;
const E = {
  out: p => 1 - Math.pow(1 - p, 3),
  in: p => p * p * p,
  io: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2,
  back: p => { const c = 1.9; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
};
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const mctx = document.createElement('canvas').getContext('2d');
function measure(str, size, weight = 700) { mctx.font = `${weight} ${size}px Fredoka`; return mctx.measureText(str).width; }

// ---------------- Palette ----------------
const K = {
  ol: '#1B1B1B', white: '#FFFFFF', cream: '#FFF6E5', yellow: '#FFD23F',
  blue: '#3A86FF', red: '#FF4D6D', gold: '#FFBE0B',
  navy: '#26264A', pink: '#FF8FB1', soot: '#3A3A3A',
};
const SETS = {
  mint:  { bg: '#7FDDCF', pat: '#94E6DA', floor: '#4FBFB0' },
  navy:  { bg: '#26264A', pat: '#F2B33D', floor: '#1A1A36' },
  tang:  { bg: '#FFB870', pat: '#FFA85A', floor: '#E08A4A' },
  green: { bg: '#5BD68A', pat: '#7DE2A3', floor: '#3FAE6C' },
  night: { bg: '#173F4A', pat: '#245A68', floor: '#0F2C35' },
  pink:  { bg: '#FF8FB1', pat: '#FFA6C2', floor: '#E8709A' },
  crim:  { bg: '#FF5A5F', pat: '#FF7377', floor: '#D9434A' },
  sky:   { bg: '#8ED1FC', pat: '#A6DBFD', floor: '#5FB4E8' },
};
const OW = 8;
const SO = { stroke: K.ol, 'stroke-width': OW, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' };

// ---------------- Tempo, événements sonores, coups de caméra ----------------
const B = TL.B, BAR = TL.BAR;
const at = (bar, beat = 0) => (bar * 4 + beat) * B;
const EV = [];
const PUNCH = [];
function ev(t, s, o = {}) { EV.push({ t: +t.toFixed(4), type: s, s, ...o }); }
function punch(t, a = 0.018) { PUNCH.push([t, a]); }
window.EV = EV;
const frac = t => ((t / B) % 1 + 1) % 1;
const hopY = (t, h = 22) => { const f = frac(t); return -h * 4 * f * (1 - f); };
const hitSq = (t, t0, amt = 0.2) => (t0 != null && t >= t0 && t < t0 + 0.35) ? 1 - amt * Math.exp(-(t - t0) * 14) * Math.cos((t - t0) * 30) : 1;
const nearestIn = (arr, t, before = 0.02, after = 0.3) => { let b = null; for (const x of arr) if (t >= x - before && t < x + after) b = x; return b; };
const beatsIn = (t0, t1, step = B) => { const a = []; for (let x = Math.ceil(t0 / step - 1e-6) * step; x < t1 - 1e-6; x += step) a.push(+x.toFixed(4)); return a; };
const q16 = t => Math.round(t / (B / 4)) * (B / 4);

// ---------------- Texte « télop » ----------------
function gtext(parent, s, x, y, size, o = {}) {
  return txt(parent, s, { x, y, 'font-size': size, 'font-family': 'Fredoka', 'font-weight': o.weight || 700, fill: o.fill || K.white,
    stroke: o.stroke || K.ol, 'stroke-width': o.sw ?? size * 0.14, 'paint-order': 'stroke', 'stroke-linejoin': 'round', 'text-anchor': o.anchor || 'middle' });
}

// ---------------- Décors ----------------
function stripes(parent, col, w = 60, angle = -30) {
  const g = el('g', {}, parent), gi = el('g', { transform: `rotate(${angle} 540 960)` }, g);
  let d = '';
  for (let x = -1800; x < 2900; x += w * 2) d += `M${x} -1400 h${w} v4700 h${-w} Z`;
  el('path', { d, fill: col }, gi);
  return g;
}
function dots(parent, col, step = 90, r = 13) {
  let d = '';
  for (let y = -step; y < H + step; y += step) for (let x = ((Math.round(y / step) % 2 + 2) % 2) * step / 2 - step; x < W + step; x += step) d += `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  return el('path', { d, fill: col }, parent);
}
function raysEl(parent, n, col) {
  const g = el('g', {}, parent);
  for (let i = 0; i < n; i += 2) {
    const a = i / n * Math.PI * 2, da = Math.PI / n;
    el('path', { d: `M0 0 L${Math.cos(a - da) * 2400} ${Math.sin(a - da) * 2400} L${Math.cos(a + da) * 2400} ${Math.sin(a + da) * 2400} Z`, fill: col }, g);
  }
  return g;
}
function starPath(n, r1, r2) {
  let d = '';
  for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? r2 : r1; d += `${i ? 'L' : 'M'}${(Math.cos(a) * r).toFixed(1)} ${(Math.sin(a) * r).toFixed(1)}`; }
  return d + 'Z';
}
// Un décor : fond, motif (rayures, pois ou soleil), sol avec un trait d'encre. Renvoie update(t) pour faire défiler le motif.
function setBg(g, key, pat = 'stripes', o = {}) {
  const S = SETS[key];
  el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: S.bg }, g);
  let p, upd = () => {};
  if (pat === 'stripes') { p = stripes(g, S.pat, o.w || 60, o.angle ?? -30); upd = t => tf(p, (t * 40) % ((o.w || 60) * 2 / Math.cos(30 * Math.PI / 180)), 0); }
  else if (pat === 'dots') { p = dots(g, S.pat, o.step || 90, o.r || 13); upd = t => tf(p, 0, (t * 30) % (o.step || 90)); }
  else if (pat === 'rays') { p = raysEl(g, o.n || 28, S.pat); upd = t => tf(p, o.cx ?? 540, o.cy ?? 760, 1, t * (o.spin ?? 8)); }
  if (o.floor !== false) {
    el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: S.floor }, g);
    el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
  }
  return upd;
}

// ---------------- Éclat et mot de jugement ----------------
function burst(parent, x, y, t0, col = K.yellow, size = 1) {
  const g = el('g', {}, parent);
  const ring = el('circle', { cx: 0, cy: 0, r: 50, fill: 'none', stroke: K.white, 'stroke-width': 10 }, g);
  el('path', { d: starPath(8, 70, 28), fill: col, ...SO, 'stroke-width': 6 }, g);
  const lines = el('g', { stroke: K.ol, 'stroke-width': 7, 'stroke-linecap': 'round' }, g);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2; el('line', { x1: Math.cos(a) * 90, y1: Math.sin(a) * 90, x2: Math.cos(a) * 130, y2: Math.sin(a) * 130 }, lines); }
  op(g, 0);
  return t => {
    const p = (t - t0) / 0.3;
    if (p < 0 || p > 1) { op(g, 0); return; }
    op(g, 1 - p * p);
    tf(g, x, y, size * (0.55 + 0.7 * E.out(p)), p * 30);
    ring.setAttribute('r', 50 + 60 * p); ring.setAttribute('stroke-width', 10 * (1 - p));
  };
}
// Étiquette (pilule à ombre dure) qui saute à t0 et repart à t1.
function sticker(parent, text, o = {}) {
  const size = o.size || 54, pad = o.pad ?? 34, col = o.col || K.yellow;
  const g = el('g', {}, parent), inner = el('g', {}, g);
  const w = measure(text, size) + pad * 2, h = size * 1.55;
  el('rect', { x: -w / 2 + 10, y: -h / 2 + 10, width: w, height: h, rx: h / 2, fill: K.ol }, inner);
  el('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: h / 2, fill: col, ...SO, 'stroke-width': 7 }, inner);
  gtext(inner, text, 0, size * 0.36, size, { fill: o.fill || K.white, sw: size * 0.16 });
  op(g, 0);
  const st = { g, w, h, text, x: o.x || 0, y: o.y || 0, rot: o.rot || 0, t0: o.t0 ?? 0, t1: o.t1 ?? 1e9 };
  st.update = t => {
    if (t < st.t0 || t >= st.t1) { op(g, 0); return; }
    op(g, 1);
    const pin = E.back(seg(t, st.t0, st.t0 + 0.3)), pout = 1 - E.in(seg(t, st.t1 - 0.18, st.t1));
    tf(g, st.x, st.y, pin * pout, st.rot);
  };
  return st;
}
function judge(parent, word, x, y, t0, col = K.yellow, dur = 1.6, size = 170) {
  const g = el('g', {}, parent);
  gtext(g, word, 0, size * 0.35, size, { fill: col, sw: size * 0.15 });
  op(g, 0);
  return t => {
    if (t < t0 || t > t0 + dur) { op(g, 0); return; }
    op(g, 1 - seg(t, t0 + dur - 0.2, t0 + dur));
    tf(g, x, y - 20 * E.out(seg(t, t0, t0 + dur)), E.back(seg(t, t0, t0 + 0.25)), -6);
  };
}

// ---------------- Le téléphone (vrais écrans de l'appli) ----------------
const SCR = { w: 400, h: 866 }, PH = { w: 432, h: 898, r: 62 };
let clipN = 0;
function phone(parent) {
  const g = el('g', {}, parent);
  el('rect', { x: -PH.w / 2 + 16, y: 16, width: PH.w, height: PH.h, rx: PH.r, fill: K.ol }, g);
  el('rect', { x: -PH.w / 2, y: 0, width: PH.w, height: PH.h, rx: PH.r, fill: '#2B2D31', ...SO }, g);
  const id = 'scr' + (++clipN);
  const cp = el('clipPath', { id }, g);
  el('rect', { x: -SCR.w / 2, y: 16, width: SCR.w, height: SCR.h, rx: 46 }, cp);
  el('rect', { x: -SCR.w / 2, y: 16, width: SCR.w, height: SCR.h, rx: 46, fill: '#101416' }, g);
  const scr = el('g', { 'clip-path': `url(#${id})` }, g);
  const over = el('g', { 'clip-path': `url(#${id})` }, g);      // calques dessinés par-dessus l'écran
  el('rect', { x: -52, y: 26, width: 104, height: 28, rx: 14, fill: K.ol }, g);
  const imgs = {};
  let cur = null;
  // Une image par écran, chargée avant le rendu (window.READY attend LOADS) : changer d'écran ne fait qu'afficher ou masquer.
  const ph = { g, over, set(name) {
    if (name === cur) return;
    if (cur) show(imgs[cur], false);
    if (!imgs[name]) {
      const im = el('image', { x: -SCR.w / 2, y: 16, width: SCR.w, height: SCR.h, preserveAspectRatio: 'xMidYMin slice', href: `capture/screens/${name}.png` }, scr);
      LOADS.push(new Promise(r => { im.addEventListener('load', r); im.addEventListener('error', () => { console.error('écran manquant ' + name); r(); }); }));
      imgs[name] = im;
    }
    show(imgs[name], true); cur = name;
  } };
  return ph;
}
const LOADS = [];

// ---------------- Icônes Lucide des jeux ----------------
function lucide(parent, node, size = 60, stroke = K.white, sw = 2.4) {
  const s = size / 24, g = el('g', { transform: `translate(${-size / 2} ${-size / 2}) scale(${s})`, fill: 'none', stroke, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, parent);
  for (const [tag, attrs] of node[2] || []) el(tag, attrs, g);
  return g;
}
function gameTile(parent, game, size = 128) {
  const g = el('g', {}, parent);
  el('rect', { x: -size / 2 + 8, y: -size / 2 + 8, width: size, height: size, rx: size * 0.26, fill: K.ol }, g);
  el('rect', { x: -size / 2, y: -size / 2, width: size, height: size, rx: size * 0.26, fill: game.color, ...SO, 'stroke-width': 6 }, g);
  lucide(g, game.icon, size * 0.5, K.ol, 2.6);
  return g;
}
const GAME = window.GAMES ? Object.fromEntries(GAMES.games.map(x => [x.id, x])) : {};   // optionnel : assets/games.js du projet

