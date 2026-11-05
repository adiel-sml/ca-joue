// Les bonhommes : grosse tête, corps fin, contour encre épais. Une seule construction, des variantes de peau, de coiffure,
// de vêtements et d'accessoires. Origine aux pieds ; hauteur ≈ 400 px à l'échelle 1.
// Jeu : émotions (mood), bouche qui suit les sons (mouth), regard (look), trois-quarts (turn), assis ou accroupi (sit, crouch),
// bras et coudes (armsL/R, elbowL/R), pointer (point), objet en main (hold).
'use strict';
const SKIN = ['#8D5524', '#6B3E1F', '#C68642', '#E0AC69', '#F1C27D', '#4A2C17'];
const HAIR = { dark: '#2B1B12', brown: '#5A3420', black: '#1B1B1B', red: '#A0431E', blond: '#D9A441', grey: '#B8B8B8' };
const LIMB = { up: 64, low: 58, thigh: 72, shin: 70 };

// Émotions : sourcils (inclinaison intérieure, hauteur), yeux, bouche au repos, extras.
const MOODS = {
  neutre:   { brow: [0, 0], eyes: 'n', mouth: 'smile0' },
  joie:     { brow: [-2, -4], eyes: 'n', mouth: 'smile', blush: 1 },
  rire:     { brow: [-2, -6], eyes: 'up', mouth: 'laugh', blush: 1 },
  triste:   { brow: [10, 2], eyes: 'n', mouth: 'frown', tear: 1, pupilY: 3 },
  colere:   { brow: [-12, 4], eyes: 'n', mouth: 'grit', blush: 0 },
  surprise: { brow: [0, -12], eyes: 'wide', mouth: 'O' },
  gene:     { brow: [8, 0], eyes: 'n', mouth: 'wavy', blush: 2, sweat: 1, look: -5 },
  fier:     { brow: [-4, -6], eyes: 'up', mouth: 'smirk' },
  peur:     { brow: [12, -8], eyes: 'wide', mouth: 'wavy', sweat: 1 },
  doute:    { brow: [6, -2], eyes: 'n', mouth: 'flat', browUneven: 1, look: 5 },
};
// Bouches : dessinées une fois, une seule visible.
const MOUTHS = {
  smile0: 'M -14 -306 Q 0 -296 14 -306',
  smile:  'M -18 -308 Q 0 -290 18 -308',
  frown:  'M -15 -298 Q 0 -310 15 -298',
  flat:   'M -11 -302 L 11 -302',
  wavy:   'M -16 -302 Q -8 -308 0 -302 Q 8 -296 16 -302',
  smirk:  'M -12 -304 Q 4 -300 18 -310',
};

function person(parent, o = {}) {
  const skin = o.skin || SKIN[0], shirt = o.shirt || '#3A86FF', pants = o.pants || '#2E3440', shoe = o.shoe || K.white;
  const hairC = HAIR[o.hairColor || 'dark'] || o.hairColor;
  const g = el('g', {}, parent);
  const body = el('g', {}, g);
  const limb = (p, w, col) => { el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: K.ol, 'stroke-width': w + 9, 'stroke-linecap': 'round' }, p); el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: col, 'stroke-width': w, 'stroke-linecap': 'round' }, p); return p; };
  if (o.backpack) el('rect', { x: -58, y: -262, width: 116, height: 104, rx: 22, fill: o.backpack, ...SO, 'stroke-width': 7 }, body);
  // jambes articulées (cuisse, tibia) et chaussures
  const legs = el('g', {}, body);
  const mkLeg = () => ({ th: limb(el('g', {}, legs), 13, pants), sh: limb(el('g', {}, legs), 13, pants) });
  const legL = mkLeg(), legR = mkLeg();
  const shoes = [0, 1].map(() => el('ellipse', { cx: 0, cy: 0, rx: 23, ry: 12, fill: shoe, ...SO, 'stroke-width': 6 }, legs));
  const torsoG = el('g', {}, body);
  el('path', { d: 'M -42 -266 Q 0 -280 42 -266 L 46 -158 Q 0 -144 -46 -158 Z', fill: shirt, ...SO, 'stroke-width': 7 }, torsoG);
  if (o.stripe) el('path', { d: 'M -44 -214 L 44 -214', stroke: o.stripe, 'stroke-width': 12 }, torsoG);
  if (o.jacket) for (const s of [-1, 1]) el('path', { d: `M ${s * 42} -266 L ${s * 46} -158 L ${s * 14} -156 L ${s * 10} -262 Z`, fill: o.jacket, ...SO, 'stroke-width': 6 }, torsoG);
  if (o.backpack) for (const x of [-26, 26]) el('line', { x1: x, y1: -266, x2: x * 1.1, y2: -190, stroke: K.ol, 'stroke-width': 6 }, torsoG);
  const soot = el('g', {}, body);
  for (const [x, y, r] of [[-20, -230, 16], [24, -190, 18], [-28, -340, 14], [22, -370, 12], [8, -320, 10]]) el('circle', { cx: x, cy: y, r, fill: K.soot, opacity: .75 }, soot);
  const mkArm = () => { const a = el('g', {}, body); const up = limb(el('g', {}, a), 10, skin); const low = limb(el('g', {}, a), 10, skin); const hand = el('circle', { cx: 0, cy: 0, r: 11, fill: skin, ...SO, 'stroke-width': 5 }, a); const finger = el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: K.ol, 'stroke-width': 13, 'stroke-linecap': 'round' }, a); const fin2 = el('line', { x1: 0, y1: 0, x2: 0, y2: 0, stroke: skin, 'stroke-width': 6, 'stroke-linecap': 'round' }, a); return { a, up, low, hand, finger, fin2 }; };
  const armL = mkArm(), armR = mkArm();
  // objet tenu (au-dessus des mains)
  const props = el('g', {}, body);
  const PROPS = {};
  const mkProp = (name, draw) => { const p = el('g', {}, props); draw(p); show(p, false); PROPS[name] = p; };
  mkProp('phone', p => { el('rect', { x: -16, y: -30, width: 32, height: 56, rx: 7, fill: '#2B2D31', ...SO, 'stroke-width': 5 }, p); el('rect', { x: -11, y: -24, width: 22, height: 40, rx: 4, fill: '#8ED1FC' }, p); });
  mkProp('cup', p => { el('path', { d: 'M -18 -26 L 18 -26 L 13 22 L -13 22 Z', fill: K.white, ...SO, 'stroke-width': 5 }, p); el('path', { d: 'M -16 -14 L 16 -14', stroke: K.red, 'stroke-width': 6 }, p); });
  mkProp('paper', p => { el('rect', { x: -26, y: -36, width: 52, height: 68, rx: 4, fill: K.white, ...SO, 'stroke-width': 5 }, p); for (const y of [-20, -8, 4, 16]) el('line', { x1: -16, y1: y, x2: 16, y2: y, stroke: '#9AA0A6', 'stroke-width': 4 }, p); });
  mkProp('pizza', p => { el('path', { d: 'M -30 -20 L 30 -20 L 0 34 Z', fill: '#FFD45E', ...SO, 'stroke-width': 5 }, p); for (const [x, y] of [[-10, -8], [10, -6], [0, 10]]) el('circle', { cx: x, cy: y, r: 6, fill: K.red }, p); });
  mkProp('gift', p => { el('rect', { x: -28, y: -26, width: 56, height: 50, rx: 6, fill: K.red, ...SO, 'stroke-width': 5 }, p); el('path', { d: 'M 0 -26 V 24 M -28 -4 H 28', stroke: K.yellow, 'stroke-width': 8 }, p); });
  mkProp('money', p => { el('rect', { x: -32, y: -18, width: 64, height: 36, rx: 6, fill: '#5BD68A', ...SO, 'stroke-width': 5 }, p); el('circle', { cx: 0, cy: 0, r: 10, fill: 'none', stroke: K.ol, 'stroke-width': 4 }, p); });
  mkProp('bottle', p => { el('path', { d: 'M -12 34 L -12 -6 Q -12 -16 -5 -20 L -5 -40 L 5 -40 L 5 -20 Q 12 -16 12 -6 L 12 34 Z', fill: '#2FB36B', ...SO, 'stroke-width': 5 }, p); el('rect', { x: -12, y: 2, width: 24, height: 16, fill: K.cream, opacity: .9 }, p); });
  mkProp('book', p => { el('rect', { x: -30, y: -24, width: 60, height: 48, rx: 4, fill: '#3A86FF', ...SO, 'stroke-width': 5 }, p); el('line', { x1: 0, y1: -24, x2: 0, y2: 24, stroke: K.ol, 'stroke-width': 4 }, p); });
  // cou, tête
  el('rect', { x: -10, y: -298, width: 20, height: 36, fill: skin, ...SO, 'stroke-width': 6 }, body);
  // tête : un groupe extérieur (descend quand on s'assied), un groupe intérieur (penche, hoche)
  const headO = el('g', {}, body), head = el('g', {}, headO);
  // cheveux qui suivent avec un temps de retard (chignon, cheveux longs, tresses) : pivotent autour du crâne
  const sway = el('g', {}, head);
  if (o.hair === 'puff') { el('circle', { cx: 0, cy: -410, r: 36, fill: hairC, ...SO, 'stroke-width': 7 }, sway); el('rect', { x: -26, y: -384, width: 52, height: 12, rx: 6, fill: o.band || K.yellow, ...SO, 'stroke-width': 4 }, sway); }
  if (o.hair === 'long') el('path', { d: 'M -56 -350 Q -64 -270 -40 -262 L 40 -262 Q 64 -270 56 -350 Z', fill: hairC, ...SO, 'stroke-width': 7 }, sway);
  if (o.hair === 'braids') for (const s of [-1, 1]) el('path', { d: `M ${s * 44} -330 Q ${s * 62} -280 ${s * 50} -236`, fill: 'none', stroke: hairC, 'stroke-width': 16, 'stroke-linecap': 'round' }, sway);
  const ears = [-50, 50].map(x => el('circle', { cx: x, cy: -338, r: 11, fill: skin, ...SO, 'stroke-width': 5 }, head));
  const drops = el('g', {}, head);                     // boucles d'oreilles : pendent et balancent
  if (o.earring) for (const x of [-52, 52]) { const d = el('g', {}, drops); d.dataset.x = x; el('line', { x1: x, y1: -328, x2: x, y2: -318, stroke: K.ol, 'stroke-width': 3 }, d); el('circle', { cx: x, cy: -314, r: 6, fill: K.yellow, ...SO, 'stroke-width': 3 }, d); }
  el('circle', { cx: 0, cy: -342, r: 52, fill: skin, ...SO, 'stroke-width': 7 }, head);
  if (o.beard) el('path', { d: 'M -46 -330 Q -40 -284 0 -280 Q 40 -284 46 -330 Q 30 -300 0 -298 Q -30 -300 -46 -330 Z', fill: hairC, ...SO, 'stroke-width': 5 }, head);
  if (['short', 'long', 'puff', 'braids'].includes(o.hair)) el('path', { d: 'M -52 -346 Q -54 -398 0 -398 Q 54 -398 52 -346 Q 30 -372 0 -370 Q -30 -372 -52 -346 Z', fill: hairC, ...SO, 'stroke-width': 6 }, head);
  if (o.hair === 'curly') for (const [x, y, r] of [[-38, -372, 20], [-14, -390, 22], [14, -390, 22], [38, -372, 20], [-50, -350, 14], [50, -350, 14]]) el('circle', { cx: x, cy: y, r, fill: hairC, ...SO, 'stroke-width': 5 }, head);
  if (o.hair === 'bald') el('path', { d: 'M -30 -380 Q -10 -388 6 -384', fill: 'none', stroke: K.white, 'stroke-width': 5, opacity: .5, 'stroke-linecap': 'round' }, head);
  if (o.hat === 'cap') { el('path', { d: 'M -54 -360 Q -50 -404 0 -404 Q 50 -404 54 -360 Z', fill: o.hatColor || K.yellow, ...SO, 'stroke-width': 6 }, head); el('path', { d: 'M 20 -364 L 84 -360 Q 88 -350 74 -350 L 20 -352 Z', fill: o.hatColor || K.yellow, ...SO, 'stroke-width': 6 }, head); }
  if (o.hat === 'bucket') { el('path', { d: 'M -40 -372 Q -38 -412 0 -412 Q 38 -412 40 -372 Z', fill: o.hatColor || K.red, ...SO, 'stroke-width': 6 }, head); el('path', { d: 'M -70 -366 Q 0 -386 70 -366 L 64 -356 Q 0 -374 -64 -356 Z', fill: o.hatColor || K.red, ...SO, 'stroke-width': 6 }, head); el('circle', { cx: 8, cy: -392, r: 9, fill: K.white, ...SO, 'stroke-width': 4 }, head); }
  if (o.hat === 'beanie') { el('path', { d: 'M -54 -352 Q -54 -410 0 -410 Q 54 -410 54 -352 Z', fill: o.hatColor || '#43AA8B', ...SO, 'stroke-width': 6 }, head); el('circle', { cx: 0, cy: -414, r: 12, fill: K.white, ...SO, 'stroke-width': 4 }, head); }
  // visage : un groupe qui glisse avec le trois-quarts
  const face = el('g', {}, head);
  const mask = el('path', { d: 'M -62 -370 Q 0 -384 62 -370 L 60 -324 Q 0 -334 -60 -324 Z', fill: K.ol }, face);
  const eyes = el('g', {}, face), whites = [], pupils = el('g', {}, eyes);
  for (const x of [-19, 19]) whites.push(el('ellipse', { cx: x, cy: -346, rx: 12, ry: 14, fill: K.white, stroke: K.ol, 'stroke-width': 3.5 }, eyes));
  for (const x of [-19, 19]) el('circle', { cx: x, cy: -344, r: 6, fill: K.ol }, pupils);
  eyes.appendChild(pupils);
  const lids = el('g', {}, face);                      // paupières : yeux mi-clos (doute, fatigue)
  for (const x of [-19, 19]) el('path', { d: `M ${x - 13} -347 Q ${x} -362 ${x + 13} -347 Z`, fill: skin, stroke: K.ol, 'stroke-width': 3 }, lids);
  const brows = el('path', { d: '', stroke: K.ol, 'stroke-width': 5.5, fill: 'none', 'stroke-linecap': 'round' }, face);
  const eyesUp = el('path', { d: 'M -30 -342 Q -19 -356 -8 -342 M 8 -342 Q 19 -356 30 -342', stroke: K.ol, 'stroke-width': 6, fill: 'none', 'stroke-linecap': 'round' }, face);
  const eyesMeh = el('path', { d: 'M -31 -344 L -8 -344 M 8 -344 L 31 -344', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
  const eyesX = el('path', { d: 'M -28 -354 L -10 -336 M -10 -354 L -28 -336 M 10 -354 L 28 -336 M 28 -354 L 10 -336', stroke: K.ol, 'stroke-width': 6, 'stroke-linecap': 'round' }, face);
  if (o.glasses) { const gl = el('g', { fill: 'none', stroke: K.ol, 'stroke-width': 5 }, face); el('circle', { cx: -19, cy: -346, r: 19 }, gl); el('circle', { cx: 19, cy: -346, r: 19 }, gl); }
  const nose = el('path', { d: 'M -3 -330 Q 4 -322 -2 -316', stroke: K.ol, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round', opacity: .6 }, face);
  const blush = el('g', {}, face);
  for (const x of [-34, 34]) el('ellipse', { cx: x, cy: -320, rx: 10, ry: 6, fill: K.pink, opacity: .7 }, blush);
  const blush2 = el('g', {}, face);
  for (const x of [-34, 34]) for (const dx of [-6, 0, 6]) el('line', { x1: x + dx - 2, y1: -324, x2: x + dx + 2, y2: -316, stroke: K.red, 'stroke-width': 3, opacity: .8 }, blush2);
  const tear = el('path', { d: 'M -26 -330 Q -32 -316 -26 -310 Q -20 -316 -26 -330 Z', fill: '#8ED1FC', ...SO, 'stroke-width': 3 }, face);
  // bouches
  const M = {};
  for (const [k, d] of Object.entries(MOUTHS)) M[k] = el('path', { d, fill: 'none', stroke: K.ol, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, face);
  const mk = (k, draw) => { const gg = el('g', {}, face); draw(gg); M[k] = gg; };
  mk('O', gg => { el('ellipse', { cx: 0, cy: -300, rx: 10, ry: 13, fill: K.ol }, gg); });
  mk('A', gg => { el('path', { d: 'M -16 -308 Q 0 -310 16 -308 Q 14 -284 0 -284 Q -14 -284 -16 -308 Z', fill: K.ol }, gg); el('ellipse', { cx: 0, cy: -290, rx: 9, ry: 5, fill: K.red }, gg); });
  mk('I', gg => { el('path', { d: 'M -18 -306 Q 0 -300 18 -306 Q 14 -294 0 -293 Q -14 -294 -18 -306 Z', fill: K.ol }, gg); el('path', { d: 'M -13 -304 L 13 -304', stroke: K.white, 'stroke-width': 3 }, gg); });
  mk('laugh', gg => { el('path', { d: 'M -20 -310 Q 0 -306 20 -310 Q 16 -280 0 -280 Q -16 -280 -20 -310 Z', fill: K.ol }, gg); el('path', { d: 'M -15 -307 L 15 -307', stroke: K.white, 'stroke-width': 4 }, gg); el('ellipse', { cx: 0, cy: -287, rx: 10, ry: 5, fill: K.red }, gg); });
  mk('grit', gg => { el('rect', { x: -16, y: -308, width: 32, height: 14, rx: 4, fill: K.white, stroke: K.ol, 'stroke-width': 4 }, gg); el('line', { x1: -16, y1: -301, x2: 16, y2: -301, stroke: K.ol, 'stroke-width': 2.5 }, gg); });
  M.M = M.flat;
  const sweat = el('path', { d: 'M 66 -380 Q 56 -360 66 -352 Q 76 -360 66 -380 Z', fill: '#8ED1FC', ...SO, 'stroke-width': 4 }, head);
  const uppers = [...body.children].filter(ch => ch !== legs && ch !== armL.a && ch !== armR.a && ch !== props);
  const c = { kind: 'person', uppers, g, body, head, face, legL, legR, shoes, armL, armR, eyes, whites, pupils, lids, brows, eyesUp, eyesMeh, eyesX, mask, M, soot, sweat, blush, blush2, tear, ears, nose, PROPS, sway, drops, hair: o.hair };
  (window.PEOPLE || (window.PEOPLE = [])).push(c); c.idx = window.PEOPLE.length;
  posePerson(c, {});
  return c;
}
function setLimb(p, x1, y1, x2, y2) { for (const l of p.children) { l.setAttribute('x1', x1.toFixed(1)); l.setAttribute('y1', y1.toFixed(1)); l.setAttribute('x2', x2.toFixed(1)); l.setAttribute('y2', y2.toFixed(1)); } }
// Bras : angle à l'épaule (0 = le long du corps, 90 = à l'horizontale vers l'extérieur, 160 = levé) et pli du coude.
function armPts(side, a, e, dy = 0, dx = 0) {
  const s = side === 'L' ? -1 : 1, r1 = a * Math.PI / 180, r2 = (a + e) * Math.PI / 180;
  const sx = 40 * s + dx, sy = -254 + dy, ex = sx + s * LIMB.up * Math.sin(r1), ey = sy + LIMB.up * Math.cos(r1);
  return { sx, sy, ex, ey, hx: ex + s * LIMB.low * Math.sin(r2), hy: ey + LIMB.low * Math.cos(r2), dir: r2, s };
}
const elbowFor = a => a > 100 ? 12 : a > 40 ? 30 : -6;
// Position de la main (repère du personnage, avant échelle) : pour poser un accessoire ou faire passer un objet.
function personHand(side, a, e = null, sq = 1, dy = 0) { const p = armPts(side, a, e ?? elbowFor(a), dy); return { x: p.hx / Math.sqrt(sq), y: p.hy * sq }; }
// Bouche selon le son prononcé à t dans la ligne L (a, o, i, m) : une forme par syllabe approximative.
function mouthAt(L, t) {
  if (!L) return null;
  const w = L.words.find(x => t >= x.t0 && t < x.t1 - 0.03);
  if (!w) return null;
  const v = w.w.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '').match(/[aeiouy]+|[^aeiouy]+/g) || ['a'];
  const syl = v.filter(x => /[aeiouy]/.test(x));
  const n = Math.max(1, syl.length), k = Math.min(n - 1, Math.floor((t - w.t0) / Math.max(0.05, (w.t1 - w.t0) / n)));
  const ph = ((t - w.t0) / Math.max(0.05, (w.t1 - w.t0) / n)) % 1;
  if (ph > 0.78) return 'M';
  const s = syl[k] || 'a';
  return /o|u|ou/.test(s) && !/i/.test(s) ? 'O' : /i|e|y/.test(s) && !/a/.test(s) ? 'I' : 'A';
}
function posePerson(c, o) {
  const { hey = 0, armsL = null, armsR = null, elbowL = null, elbowR = null, open = false, flat = false, sq = 1, lean = 0, eyes = null, look = null,
          mask = false, soot = false, sweat = null, step = 0, mood = 'neutre', mouth = null, turn = 0, sit = 0, crouch = 0, point = null, hold = null, holdSide = 'R',
          tilt = 0, nod = 0, shrug = 0, weight = 0, swing = 0, finger = null, glance = 0 } = o;
  c.still = !!o.still;                                   // immobilité voulue (photo, arrêt sur image) : check.py l'accepte
  const md = MOODS[mood] || MOODS.neutre;
  const drop = sit * 112 + crouch * 90;                 // le corps descend quand on s'assied ou s'accroupit
  const wx = weight * 8, sh = drop - shrug * 16;       // appui sur une jambe (le haut glisse), épaules haussées
  let aL = armsL ?? lerp(10, 150, hey), aR = armsR ?? lerp(10, 150, hey), eL = elbowL, eR = elbowR;
  if (point === 'L') { aL = 92; eL = 0; } if (point === 'R') { aR = 92; eR = 0; }
  if (hold && (holdSide === 'R' ? armsR == null : armsL == null)) { if (holdSide === 'R') { aR = 38; eR = 70; } else { aL = 38; eL = 70; } }
  for (const [arm, side, a, e, pt] of [[c.armL, 'L', aL, eL ?? elbowFor(aL), point === 'L' || finger === 'L'], [c.armR, 'R', aR, eR ?? elbowFor(aR), point === 'R' || finger === 'R']]) {
    const p = armPts(side, a, e, sh, wx);
    setLimb(arm.up, p.sx, p.sy, p.ex, p.ey); setLimb(arm.low, p.ex, p.ey, p.hx, p.hy);
    arm.hand.setAttribute('cx', p.hx.toFixed(1)); arm.hand.setAttribute('cy', p.hy.toFixed(1));
    const fx = p.hx + p.s * 22 * Math.sin(p.dir), fy = p.hy + 22 * Math.cos(p.dir);
    for (const f of [arm.finger, arm.fin2]) { f.setAttribute('x1', p.hx.toFixed(1)); f.setAttribute('y1', p.hy.toFixed(1)); f.setAttribute('x2', fx.toFixed(1)); f.setAttribute('y2', fy.toFixed(1)); show(f, pt); }
  }
  for (const k in c.PROPS) show(c.PROPS[k], k === hold);
  if (hold && c.PROPS[hold]) { const p = armPts(holdSide, holdSide === 'R' ? aR : aL, holdSide === 'R' ? (eR ?? 70) : (eL ?? 70), sh, wx); c.PROPS[hold].setAttribute('transform', `translate(${(p.hx + p.s * 4).toFixed(1)} ${(p.hy - 18).toFixed(1)})`); }
  // jambes : debout (genou au milieu), assis (cuisse vers l'avant, raccourcie), accroupi (genoux écartés)
  [[c.legL, -1], [c.legR, 1]].forEach(([leg, s], i) => {
    const hipX = s * 16 + wx, hipY = -156 + drop, fx = s * 22 + (i ? -step : step) * 18;
    const kx = lerp(lerp((hipX + fx) / 2, s * 30, sit), s * 46, crouch), ky = lerp(lerp(-86, -44 + drop * 0.1, sit), -70, crouch);
    setLimb(leg.th, hipX, hipY, kx, Math.min(ky, hipY + 70)); setLimb(leg.sh, kx, Math.min(ky, hipY + 70), fx, -16);
    c.shoes[i].setAttribute('cx', (fx + s * 6).toFixed(1)); c.shoes[i].setAttribute('cy', '-8');
  });
  c.body.setAttribute('transform', `rotate(${lean.toFixed(2)}) scale(${(1 / Math.sqrt(sq)).toFixed(3)} ${sq.toFixed(3)})`);
  // haut du corps abaissé (assis, accroupi) : torse, cou et tête descendent ; jambes, bras et objets sont déjà calculés
  const up = drop || wx ? `translate(${wx.toFixed(1)} ${drop.toFixed(1)})` : '';
  for (const ch of c.uppers) up ? ch.setAttribute('transform', up) : ch.removeAttribute('transform');
  // tête qui penche (tilt, degrés) et hoche (nod, px vers le bas) ; cheveux et boucles d'oreilles en retard (swing, degrés)
  c.head.setAttribute('transform', tilt || nod || shrug ? `translate(0 ${(nod + shrug * 6).toFixed(1)}) rotate(${tilt.toFixed(2)} 0 -300)` : '');
  c.sway.setAttribute('transform', swing ? `rotate(${clamp(swing, -14, 14).toFixed(2)} 0 -360)` : '');
  for (const d of c.drops.children) d.setAttribute('transform', swing ? `rotate(${clamp(swing * 2.2, -30, 30).toFixed(2)} ${d.dataset.x} -328)` : '');
  // trois-quarts : le visage glisse vers le côté regardé, l'oreille opposée se cache
  c.face.setAttribute('transform', `translate(${(turn * 14).toFixed(1)} 0)`);
  show(c.ears[0], turn > -0.5); show(c.ears[1], turn < 0.5);
  // yeux, sourcils, bouche
  const ey = eyes || md.eyes;
  show(c.eyes, ey === 'n' || ey === 'wide'); show(c.eyesUp, ey === 'up'); show(c.eyesMeh, ey === 'meh'); show(c.eyesX, ey === 'x');
  c.whites.forEach(w => { w.setAttribute('rx', ey === 'wide' ? 14 : 12); w.setAttribute('ry', ey === 'wide' ? 17 : 14); });
  show(c.lids, mood === 'doute' && ey === 'n');
  const lk = clamp((look ?? md.look ?? 0) + glance, -6, 6) + turn * 4;
  c.pupils.setAttribute('transform', `translate(${lk.toFixed(1)} ${(md.pupilY || 0)}) scale(${ey === 'wide' ? 0.85 : 1})`);
  const [bt, bh] = md.brow, un = md.browUneven ? 6 : 0;
  c.brows.setAttribute('d', `M -31 ${-368 + bh - bt * 0.5} L -8 ${-368 + bh + bt * 0.5 - un} M 8 ${-368 + bh + bt * 0.5 + un} L 31 ${-368 + bh - bt * 0.5}`);
  show(c.brows, ey !== 'x');
  const mo = mouth || (open ? 'A' : flat ? 'flat' : md.mouth);
  for (const k in c.M) show(c.M[k], false);
  show(c.M[mo] || c.M.smile0, true);
  show(c.mask, mask); show(c.soot, soot); show(c.sweat, sweat ?? !!md.sweat);
  show(c.blush, !mask && (md.blush ?? 1) >= 1); show(c.blush2, !mask && md.blush === 2); show(c.tear, !!md.tear);
}
// pose : jamais figé, l'attente vivante (alive, acting.js) s'ajoute sous les options données ; { still: true } pour une pose immobile voulue.
function pose(c, o) { return posePerson(c, o.still || typeof alive !== 'function' || window.NOW == null ? o : { ...alive(window.NOW, c.idx || 0), ...o }); }

// ---------------- Distribution du projet (cast.json → cast.js) ----------------
// cast.json : {"persos": {"malik": {"nom": "Malik", "voix": "fr-FR-HenriNeural", "look": {options de person()}}}}
// Gardé dans le projet : les mêmes personnages, avec les mêmes voix, d'une vidéo à l'autre.
function castPerson(parent, id) {
  const P = (window.CAST_DATA && CAST_DATA.persos) || {};
  if (!P[id]) throw new Error('personnage inconnu dans cast.json : ' + id);
  return person(parent, P[id].look || {});
}
