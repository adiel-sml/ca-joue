// Les bonhommes : grosse tête, corps fin, contour encre épais. Une seule construction, des variantes de peau,
// de coiffure, de vêtements et d'accessoires. Origine aux pieds ; hauteur ≈ 400 px à l'échelle 1.
'use strict';
const SKIN = ['#8D5524', '#6B3E1F', '#C68642', '#E0AC69', '#F1C27D', '#4A2C17'];
const HAIR = { dark: '#2B1B12', brown: '#5A3420', black: '#1B1B1B', red: '#A0431E', blond: '#D9A441' };
const LIMB = { up: 64, low: 58 };

function person(parent, o = {}) {
  const skin = o.skin || SKIN[0], shirt = o.shirt || '#3A86FF', pants = o.pants || '#2E3440', shoe = o.shoe || K.white;
  const hairC = HAIR[o.hairColor || 'dark'] || o.hairColor;
  const g = el('g', {}, parent);
  const body = el('g', {}, g);
  const limb = (p, w, col) => { el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: K.ol, 'stroke-width': w + 9, 'stroke-linecap': 'round' }, p); el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, p); return p; };
  // sac à dos (derrière)
  if (o.backpack) { el('rect', { x: -58, y: -262, width: 116, height: 104, rx: 22, fill: o.backpack, ...SO, 'stroke-width': 7 }, body); }
  // jambes et chaussures
  const legs = el('g', {}, body);
  const legL = limb(el('g', {}, legs), 13, pants), legR = limb(el('g', {}, legs), 13, pants);
  const shoes = [-1, 1].map(s => el('ellipse', { cx: 0, cy: 0, rx: 23, ry: 12, fill: shoe, ...SO, 'stroke-width': 6 }, legs));
  // bras arrière-plan dessinés après le torse pour rester visibles
  const torso = el('path', { d: 'M -42 -266 Q 0 -280 42 -266 L 46 -158 Q 0 -144 -46 -158 Z', fill: shirt, ...SO, 'stroke-width': 7 }, body);
  if (o.stripe) el('path', { d: 'M -44 -214 L 44 -214', stroke: o.stripe, 'stroke-width': 12 }, body);
  if (o.backpack) for (const x of [-26, 26]) el('line', { x1: x, y1: -266, x2: x * 1.1, y2: -190, stroke: K.ol, 'stroke-width': 6 }, body);
  const soot = el('g', {}, body);
  for (const [x, y, r] of [[-20, -230, 16], [24, -190, 18], [-28, -340, 14], [22, -370, 12], [8, -320, 10]]) el('circle', { cx: x, cy: y, r, fill: K.soot, opacity: .75 }, soot);
  const mkArm = () => { const a = el('g', {}, body); const up = limb(el('g', {}, a), 10, skin); const low = limb(el('g', {}, a), 10, skin); const hand = el('circle', { cx: 0, cy: 0, r: 11, fill: skin, ...SO, 'stroke-width': 5 }, a); return { a, up, low, hand }; };
  const armL = mkArm(), armR = mkArm();
  // cou, tête, oreilles
  el('rect', { x: -10, y: -298, width: 20, height: 36, fill: skin, ...SO, 'stroke-width': 6 }, body);
  const head = el('g', {}, body);
  if (o.hair === 'puff') { el('circle', { cx: 0, cy: -410, r: 36, fill: hairC, ...SO, 'stroke-width': 7 }, head); el('rect', { x: -26, y: -384, width: 52, height: 12, rx: 6, fill: o.band || K.yellow, ...SO, 'stroke-width': 4 }, head); }
  if (o.hair === 'long') el('path', { d: 'M -56 -350 Q -64 -270 -40 -262 L 40 -262 Q 64 -270 56 -350 Z', fill: hairC, ...SO, 'stroke-width': 7 }, head);
  for (const x of [-50, 50]) el('circle', { cx: x, cy: -338, r: 11, fill: skin, ...SO, 'stroke-width': 5 }, head);
  if (o.earring) for (const x of [-52, 52]) el('circle', { cx: x, cy: -318, r: 6, fill: K.yellow, ...SO, 'stroke-width': 3 }, head);
  el('circle', { cx: 0, cy: -342, r: 52, fill: skin, ...SO, 'stroke-width': 7 }, head);
  if (o.hair === 'short' || o.hair === 'long' || o.hair === 'puff') el('path', { d: 'M -52 -346 Q -54 -398 0 -398 Q 54 -398 52 -346 Q 30 -372 0 -370 Q -30 -372 -52 -346 Z', fill: hairC, ...SO, 'stroke-width': 6 }, head);
  if (o.hair === 'curly') for (const [x, y, r] of [[-38, -372, 20], [-14, -390, 22], [14, -390, 22], [38, -372, 20], [-50, -350, 14], [50, -350, 14]]) el('circle', { cx: x, cy: y, r, fill: hairC, ...SO, 'stroke-width': 5 }, head);
  if (o.hat === 'cap') { el('path', { d: 'M -54 -360 Q -50 -404 0 -404 Q 50 -404 54 -360 Z', fill: o.hatColor || K.yellow, ...SO, 'stroke-width': 6 }, head); el('path', { d: 'M 20 -364 L 84 -360 Q 88 -350 74 -350 L 20 -352 Z', fill: o.hatColor || K.yellow, ...SO, 'stroke-width': 6 }, head); }
  if (o.hat === 'bucket') { el('path', { d: 'M -40 -372 Q -38 -412 0 -412 Q 38 -412 40 -372 Z', fill: o.hatColor || K.red, ...SO, 'stroke-width': 6 }, head); el('path', { d: 'M -70 -366 Q 0 -386 70 -366 L 64 -356 Q 0 -374 -64 -356 Z', fill: o.hatColor || K.red, ...SO, 'stroke-width': 6 }, head); el('circle', { cx: 8, cy: -392, r: 9, fill: K.white, ...SO, 'stroke-width': 4 }, head); }
  // visage
  const face = el('g', {}, head);
  const mask = el('path', { d: 'M -62 -370 Q 0 -384 62 -370 L 60 -324 Q 0 -334 -60 -324 Z', fill: K.ol }, face);
  const eyes = el('g', {}, face), pupils = el('g', {}, eyes);
  for (const x of [-19, 19]) el('ellipse', { cx: x, cy: -346, rx: 12, ry: 14, fill: K.white, stroke: K.ol, 'stroke-width': 3.5 }, eyes);
  for (const x of [-19, 19]) el('circle', { cx: x, cy: -344, r: 6, fill: K.ol }, pupils);
  eyes.appendChild(pupils);
  const brows = el('path', { d: 'M -30 -368 Q -20 -374 -9 -368 M 9 -368 Q 20 -374 30 -368', stroke: K.ol, 'stroke-width': 5, fill: 'none', 'stroke-linecap': 'round' }, face);
  const eyesUp = el('path', { d: 'M -30 -342 Q -19 -356 -8 -342 M 8 -342 Q 19 -356 30 -342', stroke: K.ol, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, face);
  const eyesMeh = el('path', { d: 'M -31 -344 L -8 -344 M 8 -344 L 31 -344', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
  const eyesX = el('path', { d: 'M -28 -354 L -10 -336 M -10 -354 L -28 -336 M 10 -354 L 28 -336 M 28 -354 L 10 -336', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
  if (o.glasses) { const gl = el('g', { fill: 'none', stroke: K.ol, 'stroke-width': 5 }, face); el('circle', { cx: -19, cy: -346, r: 19 }, gl); el('circle', { cx: 19, cy: -346, r: 19 }, gl); }
  el('path', { d: 'M -3 -330 Q 4 -322 -2 -316', stroke: K.ol, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', opacity: .6 }, face);
  const blush = el('g', {}, face);
  for (const x of [-34, 34]) el('ellipse', { cx: x, cy: -320, rx: 10, ry: 6, fill: K.pink, opacity: .7 }, blush);
  const mC = el('path', { d: 'M -14 -306 Q 0 -294 14 -306', fill: 'none', stroke: K.ol, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
  const mF = el('path', { d: 'M -11 -302 L 11 -302', stroke: K.ol, 'stroke-width': 5, 'stroke-linecap': 'round' }, face);
  const mO = el('g', {}, face);
  el('ellipse', { cx: 0, cy: -300, rx: 13, ry: 15, fill: K.ol }, mO); el('ellipse', { cx: 0, cy: -292, rx: 8, ry: 5, fill: K.red }, mO);
  const sweat = el('path', { d: 'M 66 -380 Q 56 -360 66 -352 Q 76 -360 66 -380 Z', fill: '#8ED1FC', ...SO, 'stroke-width': 4 }, head);
  const c = { kind: 'person', g, body, head, legL, legR, shoes, armL, armR, eyes, pupils, brows, eyesUp, eyesMeh, eyesX, mask, mC, mF, mO, soot, sweat, blush };
  posePerson(c, {});
  return c;
}
function setLimb(p, x1, y1, x2, y2) { for (const l of p.children) { l.setAttribute('x1', x1.toFixed(1)); l.setAttribute('y1', y1.toFixed(1)); l.setAttribute('x2', x2.toFixed(1)); l.setAttribute('y2', y2.toFixed(1)); } }
// Bras : angle à l'épaule (0 = le long du corps, 90 = à l'horizontale vers l'extérieur, 160 = levé) et pli du coude.
function armPts(side, a, e) {
  const s = side === 'L' ? -1 : 1, r1 = a * Math.PI / 180, r2 = (a + e) * Math.PI / 180;
  const sx = 40 * s, sy = -254, ex = sx + s * LIMB.up * Math.sin(r1), ey = sy + LIMB.up * Math.cos(r1);
  return { sx, sy, ex, ey, hx: ex + s * LIMB.low * Math.sin(r2), hy: ey + LIMB.low * Math.cos(r2) };
}
function personHand(side, a, e = null, sq = 1) { const p = armPts(side, a, e ?? elbowFor(a)); return { x: p.hx / Math.sqrt(sq), y: p.hy * sq }; }
const elbowFor = a => a > 100 ? 12 : a > 40 ? 30 : -6;
function posePerson(c, { hey = 0, armsL = null, armsR = null, elbowL = null, elbowR = null, open = false, flat = false, sq = 1, lean = 0, eyes = 'n', look = 0, mask = false, soot = false, sweat = false, step = 0 }) {
  const aL = armsL ?? lerp(10, 150, hey), aR = armsR ?? lerp(10, 150, hey);
  for (const [arm, side, a, e] of [[c.armL, 'L', aL, elbowL ?? elbowFor(aL)], [c.armR, 'R', aR, elbowR ?? elbowFor(aR)]]) {
    const p = armPts(side, a, e);
    setLimb(arm.up, p.sx, p.sy, p.ex, p.ey); setLimb(arm.low, p.ex, p.ey, p.hx, p.hy);
    arm.hand.setAttribute('cx', p.hx.toFixed(1)); arm.hand.setAttribute('cy', p.hy.toFixed(1));
  }
  [[c.legL, -1], [c.legR, 1]].forEach(([leg, s], i) => {
    const fx = s * 22 + (i ? -step : step) * 18;
    setLimb(leg, s * 16, -156, fx, -16);
    c.shoes[i].setAttribute('cx', (fx + s * 6).toFixed(1)); c.shoes[i].setAttribute('cy', '-8');
  });
  c.body.setAttribute('transform', `rotate(${lean.toFixed(2)}) scale(${(1 / Math.sqrt(sq)).toFixed(3)} ${sq.toFixed(3)})`);
  show(c.mO, open); show(c.mF, !open && flat); show(c.mC, !open && !flat);
  show(c.eyes, eyes === 'n'); show(c.eyesUp, eyes === 'up'); show(c.eyesMeh, eyes === 'meh'); show(c.eyesX, eyes === 'x');
  show(c.brows, eyes === 'n' || eyes === 'meh');
  c.pupils.setAttribute('transform', `translate(${clamp(look, -6, 6)} 0)`);
  show(c.mask, mask); show(c.soot, soot); show(c.sweat, sweat); show(c.blush, !mask);
}
function pose(c, o) { return c.kind === 'person' ? posePerson(c, o) : poseCard(c, o); }
