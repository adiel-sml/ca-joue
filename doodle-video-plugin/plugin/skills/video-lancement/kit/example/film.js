// EXEMPLE : les scènes du film de lancement de Ça Joue (appli de jeux de soirée), à adapter, jamais à recopier tel quel.
'use strict';
const PSC = 0.85;                      // échelle des bonhommes
const PEOPLE = {
  cap:  p => person(p, { skin: SKIN[1], hair: 'short', hat: 'cap', hatColor: K.yellow, shirt: '#4FC3F7', pants: '#1F4E3D', backpack: '#2EC4B6' }),
  puff: p => person(p, { skin: SKIN[2], hair: 'puff', band: K.yellow, earring: true, shirt: '#FF8A65', pants: '#2E3440', shoe: '#FFD23F' }),
  hat:  p => person(p, { skin: SKIN[0], hair: 'short', hat: 'bucket', hatColor: K.red, glasses: true, shirt: '#43AA8B', pants: '#2B2D42' }),
};
function cast3(g) { const out = []; for (const [k, i] of [['cap', 0], ['puff', 1], ['hat', 2]]) { const w = el('g', {}, g); out.push({ w, c: PEOPLE[k](w), x: X3[i] }); } return out; }

// ======================= 1. Accroche =======================
{
  const L1 = lineById('l1'), L2a = lineById('l2a'), land = S.hook.t1;
  const tQ = q16(wordT(L1, 'quoi'));
  scene(0, land, (g, s) => {
    const bgU = setBg(g, 'mint', 'stripes');
    const ph = phone(g);
    const M = cast3(g);
    const bub = el('g', {}, g);
    el('path', { d: 'M -78 -70 h156 a40 40 0 0 1 40 40 v60 a40 40 0 0 1 -40 40 h-56 l-30 34 l-4 -34 h-66 a40 40 0 0 1 -40 -40 v-60 a40 40 0 0 1 40 -40 z', fill: K.white, ...SO }, bub);
    gtext(bub, '?', 0, 44, 120, { fill: K.yellow, sw: 16 });
    ev(tQ, 'pop', { f: 660 }); punch(tQ, 0.02);
    ev(L2a.t0, 'gasp');
    ev(land - 0.32, 'fall');
    s.cam = t => {
      const push = 0.05 * E.io(seg(t, 0, S.hook.silence)), up = E.io(seg(t, L2a.t0, Math.min(land - 0.3, L2a.t0 + 0.8)));
      return { x: 540, y: lerp(1150, 820, up), z: lerp(1.32 + push, 1.1, up) };
    };
    return t => {
      bgU(t);
      const still = t >= S.hook.silence;                       // le silence fige la scène
      const up = t >= L2a.t0;                                  // « Sors ton téléphone » : tout le monde lève les yeux
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR, PSC);
        const sway = still ? 0 : 4 * Math.sin(t * 2.2 + i * 1.7);
        pose(m.c, up ? { eyes: 'n', open: t > (L2a.words[2]?.t0 ?? 99), lean: -3 + i * 3, armsL: 30, armsR: 30, sq: hitSq(t, L2a.t0, 0.08) }
                     : { eyes: 'meh', flat: true, lean: sway, armsL: 10, armsR: 10 });
      });
      const pb = t >= tQ && t < S.hook.silence ? E.back(seg(t, tQ, tQ + 0.3)) * (1 - E.in(seg(t, S.hook.silence - 0.15, S.hook.silence))) : 0;
      op(bub, pb > 0 ? 1 : 0); tf(bub, 540, 860 + hopY(t, 6), pb, -4);
      const pf = seg(t, land - 0.42, land);
      op(ph.g, pf > 0 ? 1 : 0); tf(ph.g, 540, lerp(-950, PHY, E.in(pf)));
    };
  });
}

// ======================= 2. Révélation : 23 jeux =======================
{
  const R = S.reveal, L = lineById('l2b');
  const tFly = q16(wordT(L, 'seule') ?? (R.n23 + 1.2));
  CUTS.push(R.t0);
  scene(R.t0, S.mime.t0, (g, s) => {
    const bgU = setBg(g, 'navy', 'rays', { n: 32, cy: 680, spin: 6 });
    const ph = phone(g);
    const M = cast3(g);
    const order = ['mime', 'taboo', 'tu', 'quiz', 'num', 'av', 'nhie', 'wyr', 'bomb', 'tvm', 'mys', 'most', 'dico', 'chain', 'uc', 'lg', 'spy', 'know', 'future', 'who2', 'wave', 'dare2', 'talk'];
    const dt = (R.n23 - R.rain0) / 23;
    const tiles = order.map((id, i) => {
      const r = Math.floor(i / 5), c = i % 5, w = el('g', {}, g);
      gameTile(w, GAME[id], 128);
      const tl = R.rain0 + (i + 1) * dt;
      ev(tl, 'pip', { f: pitch(i) });
      return { w, x: 240 + c * 150 + (r === 4 ? 150 : 0), y: 380 + r * 150, tl, tf: tFly + i * 0.012 };
    });
    ev(R.t0, 'boom'); punch(R.t0, 0.05);
    ev(R.n23, 'stamp'); ev(R.n23, 'crash'); punch(R.n23, 0.04);
    ev(tFly, 'whoosh');
    const cnt = el('g', {}, g);
    el('rect', { x: -170 + 12, y: -78 + 12, width: 340, height: 156, rx: 40, fill: K.ol }, cnt);
    el('rect', { x: -170, y: -78, width: 340, height: 156, rx: 40, fill: K.cream, ...SO }, cnt);
    const num = gtext(cnt, '0', 0, 42, 118, { fill: K.yellow, sw: 18 });
    const tag = el('g', {}, g);
    const tagW = measure('23 jeux', 150) + 90;
    el('rect', { x: -tagW / 2 + 14, y: -100 + 14, width: tagW, height: 200, rx: 50, fill: K.ol }, tag);
    el('rect', { x: -tagW / 2, y: -100, width: tagW, height: 200, rx: 50, fill: K.gold, ...SO, 'stroke-width': 10 }, tag);
    gtext(tag, '23 jeux', 0, 52, 150, { fill: K.white, sw: 22 });
    reg('n23', '23 jeux', R.n23, S.mime.t0, 540, 180, tagW, 200);
    s.fx.push(burst(g, 540, 180, R.n23, K.yellow, 1.6));
    s.cam = t => { const p = E.io(seg(t, R.t0, tFly + 0.4)); return { x: 540, y: lerp(820, 960, p), z: lerp(1.1, 1, p) }; };
    return t => {
      bgU(t);
      const sq = hitSq(t, R.t0, 0.1);
      tf(ph.g, 540, PHY + 30 * (1 - sq), 1, 0, 1);
      const idx = t < tFly + 0.35 ? 0 : Math.min(40, Math.floor(seg(t, tFly + 0.35, S.mime.t0 - 0.2) * 40));
      ph.set('home-' + String(idx).padStart(2, '0'));
      const cheer = nearestIn([R.n23], t, 0.02, 0.6);
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR + hopY(t + i * B / 2, 18), PSC);
        pose(m.c, { eyes: 'up', open: cheer != null || frac(t) < 0.3, hey: cheer != null ? 1 : 0.15 + 0.15 * Math.sin(t * 6 + i), sq: hitSq(t, R.t0, 0.15) });
      });
      tiles.forEach(k => {
        if (t < k.tl - 0.25) { op(k.w, 0); return; }
        if (t < k.tl) { op(k.w, 1); tf(k.w, k.x, k.y - 800 * (1 - E.in(seg(t, k.tl - 0.25, k.tl))), 1); return; }
        if (t < k.tf) { op(k.w, 1); tf(k.w, k.x, k.y, hitSq(t, k.tl, 0.2)); return; }
        const p = E.in(seg(t, k.tf, k.tf + 0.32));
        op(k.w, p < 1 ? 1 : 0); tf(k.w, lerp(k.x, SCR_CX, p), lerp(k.y, SCR_CY, p), 1 - 0.85 * p, p * 90);
      });
      const n = Math.min(23, tiles.filter(k => t >= k.tl).length);
      num.textContent = String(n);
      op(cnt, t >= R.rain0 && t < R.n23 ? 1 : 0); tf(cnt, 540, 180, E.back(seg(t, R.rain0, R.rain0 + 0.25)));
      op(tag, t >= R.n23 ? 1 : 0); tf(tag, 540, 180, E.back(seg(t, R.n23, R.n23 + 0.3)), -4);
      s.fx.forEach(f => f(t));
    };
  });
}

// ======================= 3. Six jeux, un par section =======================
SETS.lime = { bg: '#C6F16D', pat: '#D5F58E', floor: '#8FC23A' };
SETS.sun = { bg: '#FFD45E', pat: '#FFE08A', floor: '#E0A93A' };
// Titre du jeu en haut (étiquette à la couleur du jeu), coupe franche avec éclair, cymbale dans la partition.
function gameScene(key, title, gid, build) {
  const R = S[key], L = lineById(R.line);
  CUTS.push(R.t0); punch(R.t0, 0.03);
  return scene(R.t0, R.t1, (g, s) => {
    const up = build(g, s, R, L);
    stick(g, s, title, { col: GAME[gid].color, x: 540, y: 150, rot: -3, t0: R.t0 + 0.05, t1: R.t1, size: 64, f: 784 });
    return t => { up(t); s.fx.forEach(f => f(t)); };
  });
}
function bombProp(g) {
  const bomb = el('g', {}, g);
  el('path', { d: 'M 10 -40 Q 30 -70 52 -66', fill: 'none', stroke: K.ol, 'stroke-width': 7, 'stroke-linecap': 'round' }, bomb);
  el('circle', { cx: 0, cy: 0, r: 44, fill: '#2B2D31', ...SO }, bomb);
  el('rect', { x: -14, y: -54, width: 28, height: 18, rx: 4, fill: '#55585E', ...SO, 'stroke-width': 5 }, bomb);
  el('ellipse', { cx: -14, cy: -14, rx: 12, ry: 8, fill: K.white, opacity: .5 }, bomb);
  const spark = el('path', { d: starPath(6, 22, 9), fill: K.yellow, ...SO, 'stroke-width': 4 }, bomb);
  return { bomb, spark };
}
function splitStage(g, left, right) {
  el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: SETS[left].bg }, g);
  dots(g, SETS[left].pat, 90, 13);
  const r = el('g', {}, g);
  el('path', { d: 'M 540 -400 L 600 200 L 500 700 L 590 1200 L 540 2400 L 1600 2400 L 1600 -400 Z', fill: SETS[right].bg }, r);
  el('path', { d: 'M 540 -400 L 600 200 L 500 700 L 590 1200 L 540 2400', fill: 'none', stroke: K.ol, 'stroke-width': OW }, r);
  el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: SETS[left].floor }, g);
  el('rect', { x: 540, y: FLOOR, width: 1000, height: H - FLOOR + 400, fill: SETS[right].floor }, g);
  el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
}

// --- Les mimes : la bonhomme du milieu mime « curling », les autres devinent ---
gameScene('mime', 'Les Mimes', 'mime', (g, s, R, L) => {
  const bgU = setBg(g, 'tang', 'stripes');
  const ph = phone(g), M = cast3(g);
  const tF = R.t0 + (R.t1 - R.t0) * 0.55;
  ev(tF, 'ding'); punch(tF, 0.02); s.fx.push(burst(g, 250, FLOOR - 360, tF, K.yellow, 1.1));
  stick(g, s, 'Trouvé !'.replace(' !', ' !'), { col: '#2FB36B', x: 230, y: 900, rot: -6, t0: tF, t1: R.t1, size: 50, sound: false });
  beatsIn(R.t0, R.t1, B / 2).forEach((x, i) => i % 2 || ev(x, 'squeak', { f: 1 + (i % 4) * 0.1 }));
  s.cam = t => ({ x: 540, y: 900, z: 1 + 0.04 * seg(t, R.t0, R.t1) });
  return t => {
    bgU(t); tf(ph.g, 540, PHY);
    ph.set('mime-' + String(Math.min(23, Math.floor(seg(t, R.t0, R.t1) * 24))).padStart(2, '0'));
    const sw = Math.sin((t - R.t0) / B * Math.PI), found = t >= tF;
    M.forEach((m, i) => {
      let o;
      if (i === 1) o = { armsL: 50 + 30 * sw, armsR: 50 - 30 * sw, lean: 8 * sw, look: 6 * sw, flat: true };
      else if (i === 0) o = found ? { hey: 1, open: true, eyes: 'up', sq: hitSq(t, tF, 0.2) } : { armsR: 150, armsL: 20, look: 6, flat: true, lean: -3 };
      else o = found ? { hey: 0.4, eyes: 'up', open: t < tF + 0.5 } : { armsL: 120, armsR: 20, look: -6, open: frac(t) < 0.25, lean: 3 };
      tf(m.w, m.x, FLOOR + (i === 0 && found ? hopY(t, 26) : 0), PSC); pose(m.c, o);
    });
  };
});

// --- La Bombe : elle passe de main en main, de plus en plus vite, puis explose ---
{
  const R = S.bomb, tBoom = R.t1 - B, half = R.t0 + BAR;
  const passes = beatsIn(R.t0 + B, half, B).concat(beatsIn(half, tBoom, B / 2));
  const N = passes.length, cyc = [0, 1, 2, 1], start = (N % 2 === 1) ? 0 : 1;   // finit chez la personne du milieu
  const holderAt = k => cyc[(start + k) % 4];
  passes.forEach((x, k) => ev(x, 'pass', { f: 0.9 + 0.05 * (k % 4) }));
  beatsIn(R.t0, tBoom, B / 2).forEach(x => ev(x, 'tick'));
  ev(tBoom, 'boom2'); punch(tBoom, 0.06);
  gameScene('bomb', 'La Bombe', 'bomb', (g, s) => {
    const bgU = setBg(g, 'green', 'dots');
    const ph = phone(g), M = cast3(g), { bomb, spark } = bombProp(g);
    const puff = el('g', {}, g);
    for (const [x, y, r] of [[0, 0, 120], [-110, 40, 80], [110, 30, 90], [-60, -90, 70], [70, -100, 80], [0, 90, 70]]) el('circle', { cx: x, cy: y, r, fill: '#E9E9E9', ...SO, 'stroke-width': 7 }, puff);
    s.fx.push(burst(g, 540, FLOOR - 140, tBoom, K.yellow, 2.2));
    s.cam = t => t >= tBoom ? { x: 540, y: FLOOR - 200, z: 1.5 } : { x: 540, y: 920, z: 1 };
    const handPos = (i, t) => ({ x: X3[i], y: FLOOR - 205 + hopY(t, 10) });
    return t => {
      bgU(t); tf(ph.g, 540, PHY); ph.set(t >= tBoom ? 'bomb-end' : 'bomb');
      let k = -1; for (let j = 0; j < N; j++) if (t >= passes[j]) k = j;
      const hold = holderAt(k + 1), prev = holderAt(k), boom = t >= tBoom;
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR + (boom ? 0 : hopY(t + i * 0.13, 10)), PSC);
        const has = i === hold;
        if (boom) pose(m.c, i === 1 ? { eyes: 'x', open: true, soot: true, armsL: 40, armsR: 40, sq: hitSq(t, tBoom, 0.3) } : { look: i === 0 ? 8 : -8, lean: i === 0 ? -10 : 10, sweat: true, open: true, armsL: 60, armsR: 60 });
        else pose(m.c, { armsL: has ? 62 : 25, armsR: has ? 62 : 25, look: (hold - i) * 5, open: has, sweat: has && t > half, sq: hitSq(t, passes[k] ?? -9, 0.1) });
      });
      let bx, by;
      const tk = passes[k], tn = passes[k + 1] ?? tBoom, flight = Math.min(0.32, (tn - (tk ?? tn)) * 0.8);
      if (k >= 0 && t < tk + flight) { const p = E.io(seg(t, tk, tk + flight)), a = handPos(prev, t), b = handPos(hold, t); bx = lerp(a.x, b.x, p); by = lerp(a.y, b.y, p) - (t > half ? 90 : 170) * 4 * p * (1 - p); }
      else { const h = handPos(hold, t); bx = h.x; by = h.y; }
      op(bomb, boom ? 0 : 1); tf(bomb, bx, by, 1, Math.sin(t * 9) * 8);
      tf(spark, 52, -68, 0.7 + 0.4 * Math.abs(Math.sin(t * 31)), t * 400);
      op(puff, boom ? 1 - seg(t, tBoom + 0.18, tBoom + 0.42) : 0); tf(puff, 540, FLOOR - 190, 0.3 + 0.9 * E.out(seg(t, tBoom, tBoom + 0.35)));
    };
  });
}

// --- Undercover : masques, regards en coin, le mot se révèle, l'intrus est désigné ---
gameScene('uc', 'Undercover', 'uc', (g, s, R, L) => {
  const bgU = setBg(g, 'sky', 'stripes', { w: 50 });
  const ph = phone(g), M = cast3(g);
  const td = q16(wordT(L, 'démasque') ?? R.t0 + 1), ti = q16(wordT(L, "l'intrus") ?? td + 0.4);
  ev(td, 'pop', { f: 659 }); ev(ti, 'stamp'); punch(ti, 0.03);
  beatsIn(R.t0, ti, B).forEach((x, i) => ev(x, 'shift', { f: i % 2 ? 1.1 : 0.9 }));
  s.fx.push(burst(g, X3[2], FLOOR - 380, ti, K.yellow, 1));
  stick(g, s, "L'intrus", { col: K.red, x: 860, y: 900, rot: 6, t0: ti, t1: R.t1, size: 48, sound: false });
  s.cam = t => ({ x: 540, y: 980, z: 1 + 0.06 * E.io(seg(t, R.t0, R.t1)) });
  return t => {
    bgU(t); tf(ph.g, 540, PHY); ph.set(t < td ? 'uc-hide' : 'uc-show');
    const b = Math.floor((t - R.t0) / B), found = t >= ti;
    M.forEach((m, i) => {
      tf(m.w, m.x, FLOOR, PSC);
      if (!found) pose(m.c, { mask: true, look: ((b + i) % 2 ? 8 : -8), flat: true, armsL: 18, armsR: 18, lean: ((b + i) % 2 ? 2 : -2) });
      else if (i === 2) pose(m.c, { mask: true, look: -4, open: true, sweat: true, armsL: 40, armsR: 40, sq: hitSq(t, ti, 0.15) });
      else pose(m.c, { mask: true, look: 8, armsR: i === 0 ? 0 : 20, armsL: 20, ...(i === 0 ? { armsR: 95, elbowR: 0 } : { armsR: 95, elbowR: 0 }), open: true });
    });
  };
});

// --- Le Loup-garou : la nuit tombe, tout le monde dort, l'appli mène la partie ---
{
  const R = S.lg, L = lineById(R.line);
  const tl = q16(wordT(L, 'loup') ?? R.t0 + 0.3);
  ev(tl + 0.1, 'howl');
  gameScene('lg', 'Le Loup-garou', 'lg', (g, s) => {
    const bgU = setBg(g, 'night', 'dots', { step: 120, r: 6 });
    const stars = el('g', {}, g); const r = rng(5);
    for (let i = 0; i < 14; i++) { const st = el('path', { d: starPath(4, 16, 5), fill: K.yellow, transform: `translate(${80 + r() * 920} ${260 + r() * 520})` }, stars); st.dataset.ph = r() * 6; }
    const moon = el('g', {}, g);
    const mc = el('clipPath', { id: 'moonclip' }, g); el('circle', { cx: 0, cy: 0, r: 86 }, mc);
    el('circle', { cx: 0, cy: 0, r: 86, fill: K.yellow, ...SO }, moon);
    el('circle', { cx: 46, cy: -30, r: 76, fill: SETS.night.bg, ...SO, 'clip-path': 'url(#moonclip)' }, moon);
    const ph = phone(g), M = cast3(g);
    const zz = M.map((m, i) => { const z = el('g', {}, g); gtext(z, 'z', 0, 0, 46, { fill: K.white, sw: 7 }); return z; });
    s.cam = t => ({ x: 540, y: 1000, z: 1 + 0.06 * E.io(seg(t, R.t0, R.t1)) });
    return t => {
      bgU(t);
      [...stars.children].forEach(st => op(st, 0.45 + 0.55 * Math.abs(Math.sin(t * 2 + +st.dataset.ph))));
      tf(moon, 880, 330, 1 + 0.25 * Math.exp(-Math.max(0, t - tl) * 6) * (t >= tl ? 1 : 0), -10);
      tf(ph.g, 540, PHY); ph.set('lg');
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR, PSC);
        pose(m.c, { eyes: 'meh', flat: true, lean: -6 + 2 * Math.sin(t * 2 + i), armsL: 12, armsR: 12, sq: 1 - 0.02 * Math.sin(t * 3 + i) });
        const p = ((t * 0.6 + i * 0.33) % 1);
        op(zz[i], 1 - p); tf(zz[i], m.x + 50 + 30 * p, FLOOR - 400 - 80 * p, 0.7 + 0.5 * p, -10);
      });
    };
  });
}

// --- Tu préfères : deux camps, la minorité perd ---
{
  const R = S.wyr, L = lineById(R.line);
  const tc = q16(wordT(L, 'choisis') ?? R.t0 + 0.6), tm = q16(wordT(L, 'minorité') ?? R.t0 + 1.4);
  ev(tc, 'swish'); ev(tm, 'buzz'); punch(tm, 0.03);
  gameScene('wyr', 'Tu préfères', 'wyr', (g, s) => {
    splitStage(g, 'sun', 'sky');
    const ph = phone(g), M = cast3(g);
    const A = el('g', {}, g), Bb = el('g', {}, g);
    for (const [grp, txt_, col] of [[A, 'A', K.yellow], [Bb, 'B', '#00BBF9']]) { el('circle', { cx: 6, cy: 6, r: 50, fill: K.ol }, grp); el('circle', { cx: 0, cy: 0, r: 50, fill: col, ...SO }, grp); gtext(grp, txt_, 0, 22, 62, { fill: K.white, sw: 9 }); }
    stick(g, s, 'Minorité', { col: K.red, x: 860, y: 920, rot: 5, t0: tm, t1: R.t1, size: 48, sound: false });
    s.cam = () => ({ x: 540, y: 940, z: 1 });
    const X = [170, 360, 860];                           // deux à gauche (A), une à droite (B)
    return t => {
      tf(ph.g, 540, PHY); ph.set('wyr');
      tf(A, 230, 1000, E.back(seg(t, R.t0 + 0.2, R.t0 + 0.5)), -6); tf(Bb, 860, 760, E.back(seg(t, R.t0 + 0.3, R.t0 + 0.6)), 6);
      const moved = E.io(seg(t, tc, tc + 0.4)), lost = t >= tm;
      M.forEach((m, i) => {
        const x = lerp(m.x, [X[0], X[2], X[1]][i], moved);
        tf(m.w, x, FLOOR + (lost && i !== 1 ? hopY(t, 18) : 0), PSC);
        if (i === 1) pose(m.c, lost ? { open: true, sweat: true, armsL: 40, armsR: 40, look: -6, sq: hitSq(t, tm, 0.15) } : { armsR: 120, armsL: 20, look: 6 });
        else pose(m.c, lost ? { hey: 1, eyes: 'up', open: true } : { armsL: i === 0 ? 20 : 120, armsR: 20, look: -6 });
      });
    };
  });
}

// --- Action ou Vérité : chacun choisit ---
{
  const R = S.av, L = lineById(R.line);
  const ta = q16(wordT(L, 'action') ?? R.t0 + 0.3), tv = q16(wordT(L, 'vérité') ?? R.t0 + 0.7);
  gameScene('av', 'Action ou Vérité', 'av', (g, s) => {
    const bgU = setBg(g, 'lime', 'stripes', { w: 55, angle: 28 });
    const ph = phone(g), M = cast3(g);
    stick(g, s, 'Action', { col: '#FF8C42', x: 220, y: 860, rot: -7, t0: ta, t1: R.t1, size: 52, f: 784 });
    stick(g, s, 'Vérité', { col: '#3A86FF', x: 860, y: 900, rot: 6, t0: tv, t1: R.t1, size: 52, f: 988 });
    s.cam = t => ({ x: 540, y: 920, z: 1 + 0.03 * seg(t, R.t0, R.t1) });
    return t => {
      bgU(t); tf(ph.g, 540, PHY); ph.set('av');
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR + hopY(t + i * 0.2, i === 1 ? 0 : 12), PSC);
        if (i === 1) pose(m.c, { armsL: t >= ta ? 120 : 20, armsR: t >= tv ? 120 : 20, look: t >= tv ? 6 : -6, open: frac(t) < 0.3 });
        else pose(m.c, { eyes: 'up', open: true, hey: 0.3 });
      });
    };
  });
}

// --- Les couples : une partie rien qu'à deux ---
{
  const R = S.couple, L = lineById(R.line);
  const names = [['Tu me connais', 'know'], ['Qui de nous deux', 'who2'], ['Cœur à cœur', 'talk']];
  const tn = names.map(([n], i) => q16(wordT(L, ['tu', 'qui', 'cœur'][i], i === 0 ? 0 : 0) ?? R.t0 + 1 + i * 0.5));
  tn[0] = q16(L.words.find(w => w.w === 'Tu')?.t0 ?? tn[0]);
  const hearts = beatsIn(R.t0 + B, R.t1, B);
  hearts.forEach((x, i) => ev(x, 'heart', { f: pitch(i + 2) }));
  CUTS.push(R.t0); ev(R.t0, 'jingle');
  scene(R.t0, R.t1, (g, s) => {
    splitStage(g, 'pink', 'sky');
    const ph = phone(g);
    const wb = el('g', {}, g), wg = el('g', {}, g);
    const cb = PEOPLE.puff(wb), cg = PEOPLE.cap(wg);
    const H2 = hearts.map((x, i) => { const h = el('path', { d: 'M 0 26 C -60 -10 -40 -60 0 -30 C 40 -60 60 -10 0 26 Z', fill: i % 2 ? K.red : K.white, ...SO, 'stroke-width': 6 }, g); const r = rng(40 + i); return { h, t0: x, x: i % 2 ? 150 + r() * 160 : 770 + r() * 160, y: 420 + r() * 380 }; });
    stick(g, s, 'En couple', { col: GAME.know.color, x: 540, y: 150, rot: -3, t0: R.t0 + 0.05, t1: R.t1, size: 64, f: 784 });
    names.forEach(([nm, id], i) => stick(g, s, nm, { col: GAME[id].color, x: i % 2 ? 840 : 245, y: 800 + i * 100, rot: i % 2 ? 5 : -5, t0: tn[i], t1: R.t1, f: pitch(5 + i), size: 46 }));
    s.cam = () => ({ x: 540, y: 940, z: 1 });
    return t => {
      tf(ph.g, 540, PHY); ph.set(t < tn[2] ? 'know' : 'talk');
      const hb = nearestIn(hearts, t, 0.02, 0.25);
      tf(wb, 250, FLOOR + hopY(t, 12), PSC); pose(cb, { eyes: 'up', lean: 7, armsL: 20, armsR: 70, open: hb != null && Math.round((hb - R.t0) / B) % 2 === 0 });
      tf(wg, 830, FLOOR + hopY(t + B / 2, 12), PSC); pose(cg, { eyes: 'up', lean: -7, armsL: 70, armsR: 20, open: hb != null && Math.round((hb - R.t0) / B) % 2 === 1 });
      H2.forEach(k => { const p = seg(t, k.t0, k.t0 + 1.2); op(k.h, t >= k.t0 && p < 1 ? 1 - p * p : 0); tf(k.h, k.x, k.y - 120 * p, E.back(seg(t, k.t0, k.t0 + 0.25)) * 1.2, Math.sin(t * 5 + k.x) * 8); });
      s.fx.forEach(f => f(t));
    };
  });
}

// ======================= 7. Le gage =======================
{
  const G = S.gage, la = lineById('l10a'), lb = lineById('l10b');
  CUTS.push(G.t0);
  const sweeps = beatsIn(la.t0, G.silence, B);
  const spotX = t => { if (t >= G.silence - B) return 540; const k = sweeps.filter(x => t >= x).length; return [250, 830, 250, 830, 540][Math.min(4, k)] ?? 540; };
  sweeps.forEach(x => ev(x, 'swish'));
  ev(G.stamp, 'stamp'); ev(G.stamp, 'crash'); punch(G.stamp, 0.07);
  scene(G.t0, G.t1, (g, s) => {
    const bgU = setBg(g, 'crim', 'stripes', { w: 50 });
    const ph = phone(g);
    const M = cast3(g);
    const dim = el('path', { d: '', fill: K.ol, 'fill-rule': 'evenodd', opacity: 0.55 }, g);
    const beam = el('path', { d: '', fill: '#FFF3B0', opacity: 0.35 }, g);
    s.fx.push(judge(g, 'GAGE !', 540, 330, G.stamp, K.yellow, G.t1 - G.stamp, 210));
    reg('gage', 'GAGE !', G.stamp, G.t1, 540, 330, measure('GAGE !', 210), 210);
    s.fx.push(burst(g, 540, 330, G.stamp, K.white, 2.4));
    let sx = 540;
    s.cam = t => ({ x: 540, y: 960, z: 1 });
    return t => {
      bgU(t);
      tf(ph.g, 540, PHY); ph.set('gage');
      const target = spotX(t);
      sx = target;
      const lit = t >= la.t0 && t < G.stamp + 0.15;
      const quiet = t >= G.silence && t < G.stamp;
      const d = `M -400 -400 H ${W + 400} V ${H + 400} H -400 Z M ${sx - 150} ${FLOOR + 20} a 150 46 0 1 0 300 0 a 150 46 0 1 0 -300 0 Z`;
      dim.setAttribute('d', d); op(dim, lit ? 0.55 : 0);
      beam.setAttribute('d', `M ${sx - 40} -100 L ${sx + 40} -100 L ${sx + 150} ${FLOOR + 20} L ${sx - 150} ${FLOOR + 20} Z`); op(beam, lit ? 0.35 : 0);
      const after = t >= G.stamp;
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR + (after && i !== 1 ? hopY(t, 20) : 0), PSC);
        if (i === 1) pose(m.c, { soot: true, eyes: quiet || after ? 'n' : 'n', look: quiet ? 0 : (target - 540) / 60, flat: !after, open: after, sweat: quiet || after, sq: hitSq(t, G.stamp, 0.3), armsL: after ? 40 : 18, armsR: after ? 40 : 18 });
        else pose(m.c, after ? { hey: 1, eyes: 'up', open: true } : { eyes: 'n', look: (target - m.x) / 50, flat: true, lean: quiet ? 0 : Math.sin(t * 3 + i) * 2 });
      });
      s.fx.forEach(f => f(t));
    };
  });
}

// ======================= 9. Final : photo de groupe, puis l'écran de fin =======================
{
  const F = S.final, L = lineById('l11');
  CUTS.push(F.t0);
  const snap = F.snap;
  FLASHES.push(snap); ev(snap, 'shutter'); ev(snap + 0.42, 'land'); ev(snap + 0.6, 'pop', { f: 784 }); ev(snap + 0.85, 'pop', { f: 1047 }); ev(snap + 1.1, 'pop', { f: 1319 });
  beatsIn(F.t0, snap, B).forEach((x, i) => i % 2 || ev(x, 'hop', { f: pitch(i) }));
  scene(F.t0, F.t1, (g, s) => {
    const endBg = el('g', {}, g);
    el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: K.navy }, endBg);
    const er = raysEl(endBg, 28, '#31315C');
    const pol = el('g', {}, g);
    el('rect', { x: -260 + 14, y: -360 + 14, width: 520, height: 720, rx: 10, fill: K.ol }, pol);
    el('rect', { x: -260, y: -360, width: 520, height: 720, rx: 10, fill: K.cream, ...SO }, pol);
    const cp = el('clipPath', { id: 'polclip' }, g); el('rect', { x: 60, y: 160, width: 960, height: 1200 }, cp);
    const stage = el('g', {}, g), inner = el('g', {}, stage);
    const bgU = setBg(inner, 'mint', 'stripes');
    const ph = phone(inner);
    const M = cast3(inner);
    const lg = logo(g, 0.62);
    const title = gtext(g, 'Ça Joue', 0, 0, 150, { fill: K.white, sw: 22 });
    const urlW = measure('ca-joue-rho.vercel.app', 50) + 80;
    const url = el('g', {}, g);
    el('rect', { x: -urlW / 2 + 10, y: -46 + 10, width: urlW, height: 92, rx: 46, fill: K.ol }, url);
    el('rect', { x: -urlW / 2, y: -46, width: urlW, height: 92, rx: 46, fill: K.cream, ...SO, 'stroke-width': 7 }, url);
    txt(url, 'ca-joue-rho.vercel.app', { x: 0, y: 17, 'font-size': 50, 'font-family': 'Fredoka', 'font-weight': 600, fill: K.ol, 'text-anchor': 'middle' });
    reg('title', 'Ça Joue', snap + 0.85, F.t1, 540, 1330, measure('Ça Joue', 150), 150);
    reg('url', 'ca-joue-rho.vercel.app', snap + 1.1, F.t1, 540, 1480, urlW, 92);
    const tJ = wordT(L, 'joue') ?? F.t0 + 0.6;
    s.cam = () => ({ x: 540, y: 960, z: 1 });
    return t => {
      bgU(t);
      const after = t >= snap;
      show(endBg, after); show(pol, after);
      tf(er, 540, 700, 1, t * 5);
      tf(ph.g, 540, PHY); ph.set('home-00');
      M.forEach((m, i) => {
        const tt = after ? snap - 0.02 : t;                     // la photo fige tout le monde en plein saut
        tf(m.w, m.x, FLOOR + hopY(tt + i * B / 2, 30), PSC);
        pose(m.c, { eyes: 'up', open: true, hey: (Math.floor(tt / B) + i) % 2 ? 1 : 0.55, sq: 1 });
      });
      if (!after) { stage.removeAttribute('transform'); stage.removeAttribute('clip-path'); inner.removeAttribute('clip-path'); }
      else {
        inner.setAttribute('clip-path', 'url(#polclip)');
        const p = E.back(seg(t, snap + 0.12, snap + 0.5));
        const sc = lerp(1, 0.5, E.out(seg(t, snap, snap + 0.42)));
        const x = lerp(540, 540, p), y = lerp(960, 640, E.out(seg(t, snap, snap + 0.42))), r = lerp(0, -4, p);
        stage.setAttribute('transform', `translate(${x} ${y}) rotate(${r}) scale(${sc}) translate(-540 -760)`);
        pol.setAttribute('transform', `translate(${x} ${y}) rotate(${r}) scale(${sc / 0.5}) translate(0 40)`);
      }
      op(lg.g, t >= snap + 0.6 ? 1 : 0); lg.g.setAttribute('transform', `translate(540 1130) scale(${(0.62 * E.back(seg(t, snap + 0.6, snap + 0.9))).toFixed(3)})`);
      lg.update(t, after ? hopY(t, 10) : 0);
      op(title, t >= snap + 0.85 ? 1 : 0); tf(title, 540, 1380, E.back(seg(t, snap + 0.85, snap + 1.15)), -2);
      op(url, t >= snap + 1.1 ? 1 : 0); tf(url, 540, 1500, E.back(seg(t, snap + 1.1, snap + 1.4)));
      void tJ;
    };
  });
}


// Logo de Ça Joue (trois cartes en éventail) : propre à ce projet
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
