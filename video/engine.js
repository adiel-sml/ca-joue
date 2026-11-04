// Moteur du film « Ça Joue » : SVG 1080×1920, render(t) pur.
// Aides de base reprises et adaptées du style Game Show Flat de Lemo-Opuscar (licence MIT, voir CREDITS).
'use strict';
const NS = 'http://www.w3.org/2000/svg';
const W = 1080, H = 1920, FLOOR = 1380;
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
  blue: '#3A86FF', red: '#FF4D6D', gold: '#FFBE0B',               // les trois cartes du logo de l'appli
  blueD: '#2563D9', redD: '#D93356', goldD: '#E09A00',
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

// ---------------- Les mascottes : les trois cartes du logo ----------------
function mascot(parent, o) {
  const { color, dark, acc = null } = o;
  const g = el('g', {}, parent);
  const body = el('g', {}, g);
  const mkArm = () => { const a = el('g', {}, body); el('rect', { x: -14, y: -4, width: 28, height: 66, rx: 14, fill: color, ...SO }, a); el('circle', { cx: 0, cy: 66, r: 18, fill: K.white, ...SO, 'stroke-width': 6 }, a); return a; };
  const armL = mkArm(), armR = mkArm();
  for (const x of [-38, 38]) el('ellipse', { cx: x, cy: -10, rx: 32, ry: 15, fill: dark, ...SO }, body);
  el('rect', { x: -86, y: -244, width: 172, height: 228, rx: 30, fill: color, ...SO }, body);
  el('rect', { x: -70, y: -228, width: 140, height: 196, rx: 20, fill: 'none', stroke: K.white, 'stroke-width': 5, opacity: .5 }, body);
  for (const [x, y] of [[-56, -212], [56, -48]]) el('circle', { cx: x, cy: y, r: 8, fill: K.white, opacity: .75 }, body);
  const soot = el('g', {}, body);
  for (const [x, y, r] of [[-40, -190, 30], [30, -60, 36], [50, -170, 22], [-46, -70, 24], [0, -120, 18]]) el('circle', { cx: x, cy: y, r, fill: K.soot, opacity: .8 }, soot);
  const mask = el('path', { d: 'M -80 -172 Q 0 -186 80 -172 L 80 -128 Q 0 -140 -80 -128 Z', fill: K.ol }, body);
  const maskEyes = el('g', {}, body);
  for (const x of [-30, 30]) { el('ellipse', { cx: x, cy: -150, rx: 19, ry: 15, fill: K.white }, maskEyes); }
  const eyes = el('g', {}, body), eyeL = el('g', {}, eyes), eyeR = el('g', {}, eyes);
  for (const [e, x] of [[eyeL, -30], [eyeR, 30]]) { el('ellipse', { cx: x, cy: -150, rx: 12, ry: 17, fill: K.ol }, e); el('circle', { cx: x + 4, cy: -157, r: 4.5, fill: K.white }, e); }
  const eyesMeh = el('path', { d: 'M -44 -150 L -16 -150 M 16 -150 L 44 -150', stroke: K.ol, 'stroke-width': 7, 'stroke-linecap': 'round' }, body);
  const eyesX = el('path', { d: 'M -42 -162 L -18 -138 M -18 -162 L -42 -138 M 18 -162 L 42 -138 M 42 -162 L 18 -138', stroke: K.ol, 'stroke-width': 7, 'stroke-linecap': 'round' }, body);
  const eyesUp = el('path', { d: 'M -42 -146 Q -30 -164 -18 -146 M 18 -146 Q 30 -164 42 -146', stroke: K.ol, 'stroke-width': 7, fill: 'none', 'stroke-linecap': 'round' }, body);
  const blush = el('g', {}, body);
  for (const x of [-58, 58]) el('ellipse', { cx: x, cy: -120, rx: 15, ry: 8, fill: K.pink, opacity: .9 }, blush);
  const mC = el('path', { d: 'M -16 -114 Q 0 -100 16 -114', fill: 'none', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, body);
  const mF = el('path', { d: 'M -14 -108 L 14 -108', fill: 'none', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, body);
  const mO = el('g', {}, body);
  el('ellipse', { cx: 0, cy: -106, rx: 18, ry: 20, fill: K.ol }, mO);
  el('ellipse', { cx: 0, cy: -96, rx: 11, ry: 7, fill: K.red }, mO);
  if (acc === 'glasses') {
    const gl = el('g', { fill: K.white, 'fill-opacity': .22, stroke: K.ol, 'stroke-width': 6 }, body);
    el('circle', { cx: -30, cy: -150, r: 25 }, gl); el('circle', { cx: 30, cy: -150, r: 25 }, gl);
    el('path', { d: 'M -6 -152 Q 0 -158 6 -152', fill: 'none' }, gl);
  } else if (acc === 'hat') {
    const h = el('g', { transform: 'translate(34 -240) rotate(14)' }, body);
    el('path', { d: 'M -40 6 L 0 -96 L 40 6 Z', fill: K.gold, ...SO, 'stroke-width': 6 }, h);
    el('path', { d: 'M -26 -30 L 26 -30 M -14 -62 L 14 -62', stroke: K.blue, 'stroke-width': 9 }, h);
    el('circle', { cx: 0, cy: -100, r: 13, fill: K.white, ...SO, 'stroke-width': 5 }, h);
  } else if (acc === 'bow') {
    el('path', { d: 'M 0 -62 L -36 -80 L -36 -44 Z M 0 -62 L 36 -80 L 36 -44 Z', fill: K.red, ...SO, 'stroke-width': 6 }, body);
    el('circle', { cx: 0, cy: -62, r: 10, fill: K.red, ...SO, 'stroke-width': 5 }, body);
  }
  const sweat = el('path', { d: 'M 92 -200 Q 80 -178 92 -170 Q 104 -178 92 -200 Z', fill: '#8ED1FC', ...SO, 'stroke-width': 4 }, body);
  const c = { g, body, armL, armR, eyes, eyeL, eyeR, maskEyes, eyesMeh, eyesX, eyesUp, mC, mF, mO, mask, soot, sweat, blush };
  poseCard(c, {});
  return c;
}
// angles des bras en degrés (0 = le long du corps, 90 = à l'horizontale vers l'extérieur, 160 = levé)
function poseCard(c, { hey = 0, armsL = null, armsR = null, open = false, flat = false, sq = 1, lean = 0, eyes = 'n', look = 0, mask = false, soot = false, sweat = false }) {
  const aL = armsL ?? lerp(16, 158, hey), aR = armsR ?? lerp(16, 158, hey);
  c.armL.setAttribute('transform', `translate(-80 -150) rotate(${aL.toFixed(1)})`);
  c.armR.setAttribute('transform', `translate(80 -150) rotate(${(-aR).toFixed(1)})`);
  c.body.setAttribute('transform', `rotate(${lean.toFixed(2)}) scale(${(1 / Math.sqrt(sq)).toFixed(3)} ${sq.toFixed(3)})`);
  show(c.mO, open); show(c.mF, !open && flat); show(c.mC, !open && !flat);
  show(c.eyes, eyes === 'n'); show(c.eyesMeh, eyes === 'meh'); show(c.eyesX, eyes === 'x'); show(c.eyesUp, eyes === 'up');
  c.eyeL.setAttribute('transform', `translate(${look} 0)`); c.eyeR.setAttribute('transform', `translate(${look} 0)`);
  show(c.mask, mask); show(c.maskEyes, mask && eyes === 'n');
  show(c.soot, soot); show(c.sweat, sweat); show(c.blush, !mask);
}
// Position (repère du corps) de la main gauche ou droite pour un angle de bras donné.
function handAt(side, a, sq = 1) {
  const r = a * Math.PI / 180, sx = side === 'L' ? -1 : 1;
  return { x: (sx * 80 + sx * 66 * Math.sin(r)) / Math.sqrt(sq), y: (-150 + 66 * Math.cos(r)) * sq };
}
const CAST = {
  blue: p => mascot(p, { color: K.blue, dark: K.blueD, acc: 'glasses' }),
  red: p => mascot(p, { color: K.red, dark: K.redD, acc: 'hat' }),
  gold: p => mascot(p, { color: K.gold, dark: K.goldD, acc: 'bow' }),
};

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
const SCREENS = [...Array(41).keys()].map(i => 'home-' + String(i).padStart(2, '0'))
  .concat([...Array(24).keys()].map(i => 'mime-' + String(i).padStart(2, '0')))
  .concat(['bomb', 'bomb-end', 'gage', 'uc-hide', 'uc-show', 'know', 'av', 'wyr', 'lg']);

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
const GAME = Object.fromEntries(GAMES.games.map(x => [x.id, x]));

// ---------------- Le logo de l'appli (trois cartes en éventail) ----------------
function logo(parent, s = 1) {
  const g = el('g', { transform: `scale(${s})` }, parent);
  const cards = [];
  for (const [col, r, dx] of [[K.blue, -18, -66], [K.red, 0, 0], [K.gold, 18, 66]]) {
    const c = el('g', {}, g);
    el('rect', { x: -75, y: -107, width: 150, height: 214, rx: 26, fill: col, ...SO, 'stroke-width': 10 }, c);
    cards.push({ c, r, dx });
  }
  return { g, cards, update(t, hop = 0) { cards.forEach((k, i) => tf(k.c, k.dx, (k.r ? 6 : 0) + hop * (i === 1 ? 1 : 0.6), 1, k.r)); } };
}
