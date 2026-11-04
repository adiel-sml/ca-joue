// Les scènes du film « Ça Joue ». Tout est recalculé depuis t (render pur) ; le minutage vient de timeline.js.
'use strict';
const S = TL.S;
const WORLD = document.getElementById('world'), HUD = document.getElementById('hud');
const FLASH = document.getElementById('flash');
const SCENES = [], CUTS = [], TEXTREG = [];
const X3 = [250, 540, 830];
const PHY = 230;                       // haut du téléphone sur le plateau
const SCR_CX = 540, SCR_CY = PHY + 16 + SCR.h / 2;
const lineById = id => TL.lines.find(l => l.id === id);
const wordT = (L, prefix, k = 0) => { const ws = L.words.filter(w => w.w.toLowerCase().replace(/[^a-zàâçéèêëîïôûùœ'’-]/g, '').startsWith(prefix.toLowerCase())); return ws[k] ? ws[k].t0 : null; };
const pitch = i => 523.25 * Math.pow(2, [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24][i % 11] / 12);

function scene(t0, t1, build) {
  const g = el('g', {}, WORLD);
  const s = { t0, t1, g, fx: [], cam: () => ({ x: 540, y: 960, z: 1 }) };
  s.update = build(g, s);
  show(g, false);
  SCENES.push(s);
  return s;
}
function reg(id, text, t0, t1, x, y, w, h) { TEXTREG.push({ id, text, t0, t1, x0: x - w / 2, y0: y - h / 2, x1: x + w / 2, y1: y + h / 2 }); }
function stick(g, s, text, o) { const st = sticker(g, text, o); s.fx.push(st.update); reg('st-' + text, text, st.t0, st.t1, st.x, st.y, st.w, st.h); if (o.sound !== false) { ev(st.t0, 'pop', { f: o.f || 880 }); punch(st.t0, 0.012); } return st; }
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
  scene(R.t0, S.r1.t0, (g, s) => {
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
    reg('n23', '23 jeux', R.n23, S.r1.t0, 540, 180, tagW, 200);
    s.fx.push(burst(g, 540, 180, R.n23, K.yellow, 1.6));
    s.cam = t => { const p = E.io(seg(t, R.t0, tFly + 0.4)); return { x: 540, y: lerp(820, 960, p), z: lerp(1.1, 1, p) }; };
    return t => {
      bgU(t);
      const sq = hitSq(t, R.t0, 0.1);
      tf(ph.g, 540, PHY + 30 * (1 - sq), 1, 0, 1);
      const idx = t < tFly + 0.35 ? 0 : Math.min(40, Math.floor(seg(t, tFly + 0.35, S.r1.t0 - 0.2) * 40));
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

// ======================= 3–6. Manches : carte, puis jeu =======================
const BANNERS = [];
function roundCard(R, n, name, setKey, gid, tcol) {
  CUTS.push(R.t0);
  { const st = sticker(HUD, name, { col: tcol || GAME[gid].color, x: 540, y: 190, t0: R.card1, t1: R.t1, size: 44 }); BANNERS.push(st.update);
    TEXTREG.push({ id: 'card' + n, text: name, t0: R.card1, t1: R.t1, x0: 540 - st.w / 2, y0: 190 - st.h / 2, x1: 540 + st.w / 2, y1: 190 + st.h / 2 }); }
  ev(R.t0, 'jingle'); punch(R.t0, 0.03);
  scene(R.t0, R.card1, (g, s) => {
    const bgU = setBg(g, setKey, 'stripes', { w: 70, angle: -24, floor: false });
    const p = el('g', {}, g);
    el('rect', { x: -450 + 16, y: -250 + 16, width: 900, height: 500, rx: 54, fill: K.ol }, p);
    el('rect', { x: -450, y: -250, width: 900, height: 500, rx: 54, fill: K.cream, ...SO, 'stroke-width': 10 }, p);
    const pillW = measure('MANCHE ' + n, 50) + 70;
    el('rect', { x: -pillW / 2, y: -300, width: pillW, height: 90, rx: 45, fill: K.ol }, p);
    gtext(p, 'MANCHE ' + n, 0, -238, 50, { fill: K.white, sw: 0 });
    const tile = el('g', {}, p); gameTile(tile, GAME[gid], 170);
    let size = 118; while (measure(name, size) > 780) size -= 4;
    const title = gtext(p, name, 0, 190, size, { fill: tcol || GAME[gid].color, sw: size * 0.13 });
    reg('card' + n, name, R.t0, R.card1, 540, 1010, measure(name, size), size);
    s.cam = () => ({ x: 540, y: 960, z: 1 });
    return t => {
      bgU(t);
      tf(p, lerp(1500, 540, E.back(seg(t, R.t0, R.t0 + 0.32))), 860, 1, lerp(8, -2, seg(t, R.t0, R.t0 + 0.32)));
      tf(tile, 0, -40 + hopY(t, 26), hitSq(t, R.t0 + B * Math.round((t - R.t0) / B - 0.5), 0.12));
      void title;
    };
  });
}

// --- Manche 1 : En équipes ---
{
  const R = S.r1, L = lineById(R.line);
  roundCard(R, 1, 'En équipes', 'tang', 'mime');
  const tF = R.card1 + (R.t1 - R.card1) * 12 / 24;
  scene(R.card1, R.t1, (g, s) => {
    const bgU = setBg(g, 'tang', 'stripes');
    const ph = phone(g);
    const M = cast3(g);
    const tm = wordT(L, 'mimes'), tmot = wordT(L, 'mot'), ttu = wordT(L, 'time');
    stick(g, s, 'Mimes', { col: GAME.mime.color, x: 215, y: 780, rot: -6, t0: q16(tm ?? R.card1), t1: R.t1, f: 784 });
    stick(g, s, 'Mot interdit', { col: GAME.taboo.color, x: 860, y: 880, rot: 5, t0: q16(tmot ?? R.card1 + .4), t1: R.t1, f: 880 });
    stick(g, s, "Time's Up", { col: GAME.tu.color, x: 215, y: 990, rot: -4, t0: q16(ttu ?? R.card1 + .8), t1: R.t1, f: 988 });
    ev(tF, 'ding'); punch(tF, 0.02);
    s.fx.push(burst(g, 250, FLOOR - 300, tF, K.yellow, 1.1));
    const sweeps = beatsIn(R.card1, R.t1, B / 2); sweeps.forEach((x, i) => i % 2 || ev(x, 'squeak', { f: 1 + (i % 4) * 0.1 }));
    s.cam = t => ({ x: 540, y: 900, z: 1 + 0.04 * seg(t, R.card1, R.t1) });
    return t => {
      bgU(t);
      tf(ph.g, 540, PHY);
      ph.set('mime-' + String(Math.min(23, Math.floor(seg(t, R.card1, R.t1) * 24))).padStart(2, '0'));
      const sw = Math.sin((t - R.card1) / B * Math.PI);        // la bleue mime « curling » : elle balaie en rythme
      const found = t >= tF;
      M.forEach((m, i) => {
        let o;
        if (i === 1) o = { armsL: 50 + 30 * sw, armsR: 50 - 30 * sw, lean: 8 * sw, eyes: 'n', look: 6 * sw, flat: true, sq: 1 - 0.04 * Math.abs(sw) };
        else if (i === 0) o = found ? { hey: 1, open: true, eyes: 'up', sq: hitSq(t, tF, 0.2) } : { armsR: 150, armsL: 20, eyes: 'n', look: 6, flat: true, lean: -3 };
        else o = found ? { hey: 0.4, eyes: 'up', open: t < tF + 0.5 } : { armsL: 120, armsR: 20, eyes: 'n', look: -6, open: frac(t) < 0.25, lean: 3 };
        tf(m.w, m.x, FLOOR + (i === 0 && found ? hopY(t, 26) : 0), PSC);
        pose(m.c, o);
      });
      s.fx.forEach(f => f(t));
    };
  });
}

// --- Manche 2 : Tous ensemble (la bombe passe de main en main) ---
{
  const R = S.r2, L = lineById(R.line);
  roundCard(R, 2, 'Tous ensemble', 'green', 'bomb');
  const tBoom = R.t1 - B;
  const half = R.card1 + Math.floor((tBoom - R.card1) / BAR / 2 + 0.5) * BAR || R.card1 + BAR;
  const passes = beatsIn(R.card1 + B, half, B).concat(beatsIn(half, tBoom, B / 2));
  const N = passes.length, cyc = [0, 1, 2, 1];
  const start = (N % 2 === 1) ? 0 : 1;                        // la bombe finit chez la bleue (au centre)
  const holderAt = k => cyc[(start + k) % 4];
  passes.forEach((x, k) => ev(x, 'pass', { f: 0.9 + 0.05 * (k % 4) }));
  beatsIn(R.card1, tBoom, B / 2).forEach(x => ev(x, 'tick'));
  ev(tBoom, 'boom2'); punch(tBoom, 0.06);
  scene(R.card1, R.t1, (g, s) => {
    const bgU = setBg(g, 'green', 'dots');
    const ph = phone(g);
    const M = cast3(g);
    const bomb = el('g', {}, g);
    el('path', { d: 'M 10 -40 Q 30 -70 52 -66', fill: 'none', stroke: K.ol, 'stroke-width': 7, 'stroke-linecap': 'round' }, bomb);
    el('circle', { cx: 0, cy: 0, r: 44, fill: '#2B2D31', ...SO }, bomb);
    el('rect', { x: -14, y: -54, width: 28, height: 18, rx: 4, fill: '#55585E', ...SO, 'stroke-width': 5 }, bomb);
    el('ellipse', { cx: -14, cy: -14, rx: 12, ry: 8, fill: K.white, opacity: .5 }, bomb);
    const spark = el('path', { d: starPath(6, 22, 9), fill: K.yellow, ...SO, 'stroke-width': 4 }, bomb);
    const puff = el('g', {}, g);
    for (const [x, y, r] of [[0, 0, 120], [-110, 40, 80], [110, 30, 90], [-60, -90, 70], [70, -100, 80], [0, 90, 70]]) el('circle', { cx: x, cy: y, r, fill: '#E9E9E9', ...SO, 'stroke-width': 7 }, puff);
    s.fx.push(burst(g, 540, FLOOR - 140, tBoom, K.yellow, 2.2));
    const ta = wordT(L, 'action'), tb = wordT(L, 'bombe'), tw = wordT(L, 'tu');
    stick(g, s, 'Action ou Vérité', { col: GAME.av.color, x: 260, y: 780, rot: -6, t0: q16(ta ?? R.card1), t1: R.t1, f: 784 });
    stick(g, s, 'La Bombe', { col: GAME.bomb.color, x: 860, y: 880, rot: 5, t0: q16(tb ?? R.card1 + .5), t1: R.t1, f: 880 });
    stick(g, s, 'Tu préfères', { col: GAME.wyr.color, x: 215, y: 990, rot: -4, t0: q16(tw ?? R.card1 + 1), t1: R.t1, f: 988 });
    const scr = [[R.card1, 'bomb'], [q16(ta ?? R.card1), 'av'], [q16(tb ?? R.card1 + .5), 'bomb'], [q16(tw ?? R.card1 + 1), 'wyr'], [half, 'bomb'], [tBoom, 'bomb-end']];
    s.cam = t => t >= tBoom ? { x: 540, y: FLOOR - 170, z: 1.55 } : { x: 540, y: 920, z: 1 };
    const handPos = (i, t) => ({ x: X3[i], y: FLOOR - 205 + hopY(t, 10) });
    return t => {
      bgU(t);
      tf(ph.g, 540, PHY);
      let sc = 'bomb'; for (const [x, n] of scr) if (t >= x) sc = n; ph.set(sc);
      let k = -1; for (let j = 0; j < N; j++) if (t >= passes[j]) k = j;
      const hold = holderAt(k + 1), prev = holderAt(k);
      const boom = t >= tBoom;
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR + (boom ? 0 : hopY(t + i * 0.13, 10)), PSC);
        const has = i === hold;
        if (boom) pose(m.c, i === 1 ? { eyes: 'x', open: true, soot: true, armsL: 40, armsR: 40, sq: hitSq(t, tBoom, 0.3) } : { eyes: 'n', look: i === 0 ? 8 : -8, lean: i === 0 ? -10 : 10, sweat: true, open: true, armsL: 60, armsR: 60 });
        else pose(m.c, { armsL: has ? 62 : 25, armsR: has ? 62 : 25, eyes: 'n', look: (hold - i) * 5, open: has, sweat: has && t > half, sq: hitSq(t, passes[k] ?? -9, 0.1) });
      });
      // la bombe : dans les mains, ou en vol entre deux joueurs
      let bx, by;
      const tk = passes[k], tn = passes[k + 1] ?? tBoom, flight = Math.min(0.32, (tn - (tk ?? tn)) * 0.8);
      if (k >= 0 && t < tk + flight) {
        const p = E.io(seg(t, tk, tk + flight)), a = handPos(prev, t), b = handPos(hold, t);
        bx = lerp(a.x, b.x, p); by = lerp(a.y, b.y, p) - (t > half ? 90 : 170) * 4 * p * (1 - p);
      } else { const h = handPos(hold, t); bx = h.x; by = h.y; }
      op(bomb, boom ? 0 : 1); tf(bomb, bx, by, 1, Math.sin(t * 9) * 8);
      tf(spark, 52, -68, 0.7 + 0.4 * Math.abs(Math.sin(t * 31)), t * 400);
      const pp = seg(t, tBoom, tBoom + 0.35);
      op(puff, boom ? 1 - seg(t, tBoom + 0.18, tBoom + 0.42) : 0); tf(puff, 540, FLOOR - 190, 0.3 + 0.9 * E.out(pp));
      s.fx.forEach(f => f(t));
    };
  });
}

// --- Manche 3 : Rôles secrets ---
{
  const R = S.r3, L = lineById(R.line);
  roundCard(R, 3, 'Rôles secrets', 'night', 'uc');
  const tu = wordT(L, 'undercover') ?? R.card1, tl = wordT(L, 'loup') ?? R.card1 + 1;
  ev(q16(tl), 'howl');
  beatsIn(R.card1, R.t1, B).forEach((x, i) => ev(x, 'shift', { f: i % 2 ? 1.1 : 0.9 }));
  scene(R.card1, R.t1, (g, s) => {
    const bgU = setBg(g, 'night', 'dots', { step: 120, r: 6 });
    const stars = el('g', {}, g); const r = rng(5);
    for (let i = 0; i < 14; i++) { const st = el('path', { d: starPath(4, 16, 5), fill: K.yellow, transform: `translate(${80 + r() * 920} ${120 + r() * 620})` }, stars); st.dataset.ph = r() * 6; }
    const moon = el('g', {}, g);
    const mc = el('clipPath', { id: 'moonclip' }, g); el('circle', { cx: 0, cy: 0, r: 86 }, mc);
    el('circle', { cx: 0, cy: 0, r: 86, fill: K.yellow, ...SO }, moon);
    el('circle', { cx: 46, cy: -30, r: 76, fill: SETS.night.bg, ...SO, 'clip-path': 'url(#moonclip)' }, moon);
    const ph = phone(g);
    const M = cast3(g);
    stick(g, s, 'Undercover', { col: GAME.uc.color, x: 215, y: 800, rot: -6, t0: q16(tu), t1: R.t1, f: 698 });
    stick(g, s, 'Loup-garou', { col: GAME.lg.color, x: 860, y: 920, rot: 5, t0: q16(tl), t1: R.t1, f: 587 });
    s.cam = t => ({ x: 540, y: 1000, z: 1 + 0.08 * E.io(seg(t, R.card1, R.t1)) });
    return t => {
      bgU(t);
      [...stars.children].forEach(st => op(st, 0.45 + 0.55 * Math.abs(Math.sin(t * 2 + +st.dataset.ph))));
      tf(moon, 900, 260, 1 + 0.25 * Math.exp(-Math.max(0, t - tl) * 6) * (t >= tl ? 1 : 0), -10);
      tf(ph.g, 540, PHY);
      ph.set(t < tu + 0.25 ? 'uc-hide' : t < tl ? 'uc-show' : 'lg');
      const b = Math.floor((t - R.card1) / B);
      M.forEach((m, i) => {
        tf(m.w, m.x, FLOOR, PSC);
        pose(m.c, { mask: true, eyes: 'n', look: ((b + i) % 2 ? 8 : -8), flat: true, armsL: 18, armsR: 18, sweat: i === 2, lean: ((b + i) % 2 ? 2 : -2) });
      });
      s.fx.forEach(f => f(t));
    };
  });
}

// --- Manche 4 : En couple (scène partagée) ---
{
  const R = S.r4, L = lineById(R.line);
  roundCard(R, 4, 'En couple', 'pink', 'know');
  const tj = wordT(L, 'jeux') ?? R.card1;
  const hearts = beatsIn(R.card1 + B, R.t1, B);
  hearts.forEach((x, i) => ev(x, 'heart', { f: pitch(i + 2) }));
  scene(R.card1, R.t1, (g, s) => {
    el('rect', { x: -400, y: -400, width: W + 800, height: H + 800, fill: SETS.pink.bg }, g);
    dots(g, SETS.pink.pat, 90, 13);
    const right = el('g', {}, g);
    el('path', { d: 'M 540 -400 L 600 200 L 500 700 L 590 1200 L 540 2400 L 1600 2400 L 1600 -400 Z', fill: SETS.sky.bg }, right);
    el('path', { d: 'M 540 -400 L 600 200 L 500 700 L 590 1200 L 540 2400', fill: 'none', stroke: K.ol, 'stroke-width': OW }, right);
    el('rect', { x: -400, y: FLOOR, width: W + 800, height: H - FLOOR + 400, fill: SETS.pink.floor }, g);
    el('rect', { x: 540, y: FLOOR, width: 1000, height: H - FLOOR + 400, fill: SETS.sky.floor }, g);
    el('line', { x1: -400, y1: FLOOR, x2: W + 400, y2: FLOOR, stroke: K.ol, 'stroke-width': OW }, g);
    const ph = phone(g);
    const wb = el('g', {}, g), wg = el('g', {}, g);
    const cb = PEOPLE.puff(wb), cg = PEOPLE.cap(wg);
    const H2 = hearts.map((x, i) => { const h = el('path', { d: 'M 0 26 C -60 -10 -40 -60 0 -30 C 40 -60 60 -10 0 26 Z', fill: i % 2 ? K.red : K.white, ...SO, 'stroke-width': 6 }, g); const r = rng(40 + i); return { h, t0: x, x: i % 2 ? 150 + r() * 160 : 770 + r() * 160, y: 420 + r() * 520 }; });
    const names = ['Tu me connais ?', 'Qui de nous deux', 'Cœur à cœur'].map(x => x.replace(' ?', ' ?'));
    const cols = [GAME.know.color, GAME.who2.color, GAME.talk.color];
    names.forEach((nm, i) => stick(g, s, nm, { col: cols[i], x: i % 2 ? 840 : 245, y: 780 + i * 105, rot: i % 2 ? 5 : -5, t0: R.card1 + 0.25 + i * B, t1: R.t1, f: pitch(5 + i), size: 48 }));
    s.cam = () => ({ x: 540, y: 940, z: 1 });
    return t => {
      tf(ph.g, 540, PHY); ph.set('know');
      const hb = nearestIn(hearts, t, 0.02, 0.25);
      tf(wb, 250, FLOOR + hopY(t, 12), PSC); pose(cb, { eyes: 'up', lean: 7, armsL: 20, armsR: 70, open: hb != null && Math.round((hb - R.card1) / B) % 2 === 0 });
      tf(wg, 830, FLOOR + hopY(t + B / 2, 12), PSC); pose(cg, { eyes: 'up', lean: -7, armsL: 70, armsR: 20, open: hb != null && Math.round((hb - R.card1) / B) % 2 === 1 });
      H2.forEach(k => { const p = seg(t, k.t0, k.t0 + 1.2); op(k.h, t >= k.t0 && p < 1 ? 1 - p * p : 0); tf(k.h, k.x, k.y - 120 * p, E.back(seg(t, k.t0, k.t0 + 0.25)) * 1.2, Math.sin(t * 5 + k.x) * 8); });
      s.fx.forEach(f => f(t));
    };
  });
}

// ======================= 7. Le gage =======================
{
  const G = S.gage, la = lineById('l7a'), lb = lineById('l7b');
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

// ======================= 8. Sans réseau =======================
{
  const O = S.offline, L = lineById('l8');
  CUTS.push(O.t0);
  const ts = q16(wordT(L, 'sans') ?? O.t0 + 0.3), tm = q16(wordT(L, 'marche') ?? O.t0 + 1);
  ev(ts, 'nosignal'); ev(tm, 'ding'); punch(tm, 0.025);
  scene(O.t0, O.t1, (g, s) => {
    const bgU = setBg(g, 'sky', 'dots', { step: 110, r: 10, floor: false });
    const clouds = el('g', {}, g);
    for (const [x, y, k] of [[170, 420, 1], [900, 300, 0.8], [880, 980, 1.1]]) { const c = el('path', { d: 'M -90 30 C -130 30 -130 -20 -86 -22 C -84 -70 -20 -80 0 -44 C 30 -80 96 -60 86 -14 C 130 -10 126 30 90 30 Z', fill: K.white, ...SO, 'stroke-width': 7, transform: `translate(${x} ${y}) scale(${k})` }, clouds); void c; }
    const ph = phone(g);
    const nos = el('g', {}, g);
    el('circle', { cx: 8, cy: 8, r: 78, fill: K.ol }, nos);
    el('circle', { cx: 0, cy: 0, r: 78, fill: K.white, ...SO }, nos);
    [[-30, 18, 16], [-6, 4, 30], [18, -10, 44]].forEach(([x, y, h]) => el('rect', { x: x - 9, y: y + 22 - h, width: 18, height: h, rx: 4, fill: K.ol }, nos));
    el('path', { d: 'M -46 -46 L 46 46', stroke: K.red, 'stroke-width': 14, 'stroke-linecap': 'round' }, nos);
    stick(g, s, 'Hors ligne', { col: K.red, x: 760, y: 360, rot: 6, t0: ts, t1: O.t1, sound: false, size: 46 });
    s.fx.push(burst(g, 300, 1060, tm, K.yellow, 1.4));
    stick(g, s, 'Ça marche', { col: '#2FB36B', x: 300, y: 1060, rot: -5, t0: tm, t1: O.t1, sound: false, size: 52 });
    s.cam = t => ({ x: 540, y: lerp(700, 760, seg(t, O.t0, O.t1)), z: lerp(1.3, 1.24, E.out(seg(t, O.t0, O.t1))) });
    return t => {
      bgU(t);
      tf(ph.g, 540, PHY); ph.set('wyr');
      op(nos, t >= ts ? 1 : 0); tf(nos, 330, 380, E.back(seg(t, ts, ts + 0.3)), -8);
      s.fx.forEach(f => f(t));
    };
  });
}

// ======================= 9. Final : photo de groupe, puis l'écran de fin =======================
{
  const F = S.final, L = lineById('l9');
  CUTS.push(F.t0);
  const snap = F.snap;
  ev(snap, 'shutter'); ev(snap + 0.42, 'land'); ev(snap + 0.6, 'pop', { f: 784 }); ev(snap + 0.85, 'pop', { f: 1047 }); ev(snap + 1.1, 'pop', { f: 1319 });
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

// ======================= Sous-titres : une plaque, la ligne s'écrit mot par mot =======================
const SUBS = (() => {
  const size = 60, maxW = 880, chunks = [];
  for (const L of TL.lines) {
    let cur = [], len = 0;
    const flush = () => { if (cur.length) chunks.push(cur); cur = []; len = 0; };
    L.words.forEach((w, i) => {
      const ww = measure(w.w + ' ', size);
      if (len + ww > maxW * 2 - 40 && cur.length) flush();
      cur.push(w); len += ww;
      if (/[.?!:]$/.test(w.w) && i < L.words.length - 1 && len > 260) flush();
    });
    flush();
  }
  chunks.forEach((c, i) => {
    c.t0 = c[0].t0 - 0.08;
    const next = chunks[i + 1];
    c.t1 = Math.min(next ? next[0].t0 - 0.1 : 1e9, Math.max(c[c.length - 1].t1 + 0.6, c.t0 + 1.8));
    if (next) c.t1 = Math.min(c.t1, next[0].t0 - 0.02);
  });
  const g = el('g', {}, HUD);
  const items = chunks.map(c => {
    const cg = el('g', {}, g);
    const lines = [[]]; let lw = 0;
    c.forEach(w => { const ww = measure(w.w, size), sp = measure(' ', size); if (lw + ww > maxW && lines[lines.length - 1].length) { lines.push([]); lw = 0; } lines[lines.length - 1].push({ w, ww }); lw += ww + sp; });
    const widths = lines.map(l => l.reduce((a, x) => a + x.ww, 0) + measure(' ', size) * (l.length - 1));
    const pw = Math.max(...widths) + 90, phh = lines.length * 82 + 56;
    el('rect', { x: -pw / 2 + 12, y: -phh / 2 + 12, width: pw, height: phh, rx: 36, fill: K.ol }, cg);
    el('rect', { x: -pw / 2, y: -phh / 2, width: pw, height: phh, rx: 36, fill: K.cream, ...SO }, cg);
    const words = [];
    lines.forEach((l, li) => {
      let x = -widths[li] / 2;
      const y = -phh / 2 + 28 + 60 + li * 82 - 6;
      l.forEach(({ w, ww }) => {
        const n = txt(cg, w.w, { x: x + ww / 2, y, 'font-size': size, 'font-family': 'Fredoka', 'font-weight': 700, 'text-anchor': 'middle', 'paint-order': 'stroke', 'stroke-linejoin': 'round' });
        words.push({ n, w, x: x + ww / 2, y });
        x += ww + measure(' ', size);
      });
    });
    op(cg, 0);
    return { cg, c, words, pw, phh };
  });
  return {
    chunks,
    update(t) {
      items.forEach(it => {
        const on = t >= it.c.t0 && t < it.c.t1;
        op(it.cg, on ? 1 : 0); if (!on) return;
        const first = it.c === it.c[0] && false;
        void first;
        tf(it.cg, 540, 1520, E.back(seg(t, it.c.t0, it.c.t0 + 0.2)) * (1 - 0.08 * E.in(seg(t, it.c.t1 - 0.1, it.c.t1))));
        it.words.forEach((o, j) => {
          const nx = it.words[j + 1];
          const said = t >= o.w.t0 - 0.03, now = said && t < Math.min(o.w.t1 + 0.12, nx ? nx.w.t0 - 0.03 : 1e9);
          op(o.n, said ? 1 : 0.28);
          if (now) { o.n.setAttribute('fill', K.yellow); o.n.setAttribute('stroke', K.ol); o.n.setAttribute('stroke-width', 9); }
          else { o.n.setAttribute('fill', K.ol); o.n.setAttribute('stroke', 'none'); o.n.setAttribute('stroke-width', 0); }
          const p = seg(t, o.w.t0 - 0.03, o.w.t0 + 0.12);
          o.n.setAttribute('transform', `translate(${o.x} ${o.y}) scale(${(said ? 0.85 + 0.15 * E.back(p) : 1).toFixed(3)}) translate(${-o.x} ${-o.y})`);
        });
      });
    },
  };
})();

// ======================= Rendu =======================
CUTS.forEach(c => ev(c, 'cut'));
window.DUR = TL.dur;
window.render = t => {
  let cam = { x: 540, y: 960, z: 1 };
  for (const s of SCENES) {
    const on = t >= s.t0 && t < s.t1;
    show(s.g, on);
    if (on) { s.update(t); cam = s.cam(t); }
  }
  let pz = 0;
  for (const [t0, a] of PUNCH) if (t >= t0 && t < t0 + 0.2) pz += a * Math.exp(-(t - t0) * 18);
  const z = cam.z * (1 + Math.min(0.06, pz));
  WORLD.setAttribute('transform', `translate(540 960) scale(${z.toFixed(4)}) translate(${(-cam.x).toFixed(2)} ${(-cam.y).toFixed(2)})`);
  let fl = 0;
  for (const c of CUTS) if (t >= c && t < c + 0.08) fl = Math.max(fl, 0.85 * (1 - (t - c) / 0.08));
  if (t >= S.final.snap && t < S.final.snap + 0.25) fl = Math.max(fl, 1 - (t - S.final.snap) / 0.25);
  op(FLASH, fl);
  BANNERS.forEach(f => f(t));
  SUBS.update(t);
};
window.TEXTS = t => TEXTREG.filter(x => t >= x.t0 && t < x.t1).map(({ id, text, x0, y0, x1, y1 }) => ({ id, text, x0, y0, x1, y1 }));
window.SUBCUES = SUBS.chunks.map(c => ({ t0: +c.t0.toFixed(3), t1: +c.t1.toFixed(3), text: c.map(w => w.w).join(' ') }));
