// Jeu d'acteur : ce qui empêche les bonhommes d'être figés.
//   actor(c, t => pose)      lisse toutes les poses comme un ressort (principes de Disney : élan avant le geste, léger
//                            dépassement à l'arrivée, cheveux et boucles d'oreilles qui suivent en retard). Fonction pure de t.
//   act(L, t, o)             gestes automatiques tirés des mots de la réplique L (question, « toi », « non », nombres, « moi »,
//                            exclamation, mots appuyés).
//   alive(t, i)              attente vivante : respiration, appui d'une jambe sur l'autre, regard qui bouge, clignements irréguliers.
//   listen(t, L, dx)         celui qui écoute : regarde le locuteur, hoche la tête sur les mots appuyés.
//   geste(nom, t, t0, t1)    bibliothèque de gestes ; danse(t, style, i, énergie) : pas de danse sur le tempo.
//   reach(côté, x, y)        la main va à un point du corps (cinématique inverse) ; crowd(g, n, o) : une foule.
'use strict';
const hash1 = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const bump = (t, a, b, r = 0.12) => seg(t, a - r, a) * (1 - seg(t, b, b + r));          // 0 → 1 → 0 avec rampes

// ---------------- Cinématique inverse : la main à (x, y), repère du personnage (pieds en 0, tête vers y −340) ----------------
function reach(side, hx, hy, dy = 0) {
  const s = side === 'L' ? -1 : 1, sx = 40 * s, sy = -254 + dy;
  const dx = (hx - sx) * s, dv = hy - sy, L1 = LIMB.up, L2 = LIMB.low;
  const d = clamp(Math.hypot(dx, dv), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5);
  const base = Math.atan2(dx, dv);
  const A = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  const Bv = Math.acos(clamp((L1 * L1 + L2 * L2 - d * d) / (2 * L1 * L2), -1, 1));
  // deux solutions : on garde le coude le plus à l'extérieur et le plus bas (pose naturelle)
  const sol = [[base - A, Math.PI - Bv], [base + A, -(Math.PI - Bv)]].map(([a, e]) => ({ a, e, sc: L1 * Math.sin(a) + 0.6 * L1 * Math.cos(a) }));
  const { a, e } = sol[0].sc >= sol[1].sc ? sol[0] : sol[1];
  return { a: a * 180 / Math.PI, e: e * 180 / Math.PI };
}
const handAt = (side, x, y) => { const r = reach(side, x, y); return side === 'L' ? { armsL: r.a, elbowL: r.e } : { armsR: r.a, elbowR: r.e }; };

// ---------------- Bibliothèque de gestes ----------------
// Chaque geste renvoie des options de pose ; p = avancement 0..1 dans le geste, t = temps (pour les gestes qui bougent).
const GESTES = {
  haussement: () => ({ shrug: 1, armsL: 32, elbowL: 80, armsR: 32, elbowR: 80, tilt: 7, glance: 2 }),
  paumes:     () => ({ armsL: 28, elbowL: 72, armsR: 28, elbowR: 72, tilt: 5 }),
  front:      () => ({ ...handAt('R', 6, -352), tilt: -8, nod: 4, mood: 'gene' }),
  pouce:      () => ({ armsR: 50, elbowR: 112, finger: 'R', mood: 'joie' }),
  applaudir:  (p, t) => { const k = (Math.sin(t * Math.PI * 2 * 3.2) + 1) / 2, x = 6 + 34 * k; return { ...handAt('L', -x, -222), ...handAt('R', x, -222), mood: 'joie' }; },
  coucou:     (p, t) => ({ armsR: 150, elbowR: 15 + 28 * Math.sin(t * Math.PI * 2 * 2.6), mood: 'joie' }),
  compter:    () => ({ ...handAt('R', 82, -330), finger: 'R', tilt: -3 }),
  hanches:    () => ({ ...handAt('L', -50, -168), ...handAt('R', 50, -168), mood: 'fier' }),
  bras_croises: () => ({ ...handAt('L', 30, -214), ...handAt('R', -30, -208), tilt: -3 }),
  reflechir:  () => ({ ...handAt('R', 12, -292), tilt: 8, glance: 3, mood: 'doute' }),
  moi:        () => ({ ...handAt('R', 8, -222), nod: 2 }),
  victoire:   () => ({ armsL: 145, elbowL: -15, armsR: 145, elbowR: -15, sq: 0.97, mood: 'rire' }),
  montrer:    side => ({ [side === 'L' ? 'armsL' : 'armsR']: 92, [side === 'L' ? 'elbowL' : 'elbowR']: 0, finger: side || 'R' }),
  non:        (p, t) => ({ turn: 0.45 * Math.sin(t * Math.PI * 2 * 3), armsR: 30, elbowR: 40 }),
  oui:        (p, t) => ({ nod: 6 * Math.max(0, Math.sin(t * Math.PI * 2 * 2.6)) }),
};
// Le geste nom joué de t0 à t1 (vide en dehors) : geste('haussement', t, 3.2, 4.4)
function geste(nom, t, t0, t1, arg) {
  if (t < t0 || t >= t1 || !GESTES[nom]) return {};
  return nom === 'montrer' ? GESTES.montrer(arg) : GESTES[nom](seg(t, t0, t1), t);
}

// ---------------- Danses sur le tempo ----------------
// styles : rebond, pas, vague, disco, clap, robot, balance. énergie 0..1 (couplet calme → refrain).
const DANSES = ['rebond', 'pas', 'vague', 'disco', 'clap', 'balance'];
function danse(t, style = 'rebond', i = 0, energy = 1) {
  const ph = (t - B0) / B + i * 0.37, b = Math.floor(ph), f = ph - b, odd = b % 2, k = energy;
  const hit = 1 - 0.07 * k * Math.exp(-f * 9);
  switch (style) {
    case 'pas':    return { step: odd ? 0.7 : -0.7, armsL: lerp(15, odd ? 60 : 20, k), armsR: lerp(15, odd ? 20 : 60, k), elbowL: 60, elbowR: 60, lean: (odd ? 5 : -5) * k, sq: hit, weight: odd ? 1 : -1 };
    case 'vague':  { const w = Math.sin(ph * Math.PI); return { armsL: lerp(30, 140 + 20 * w, k), armsR: lerp(30, 140 - 20 * w, k), elbowL: 30 * w, elbowR: -30 * w, lean: 6 * w * k, sq: hit, tilt: 4 * w }; }
    case 'disco':  return { armsR: odd ? lerp(40, 160, k) : 30, elbowR: odd ? -10 : 20, finger: odd ? 'R' : null, armsL: 25, elbowL: 80, lean: (odd ? -7 : 4) * k, step: odd ? 0.5 : -0.3, sq: hit };
    case 'clap':   { const x = f < 0.25 ? 6 : 40; return { ...handAt('L', -x, odd ? -330 : -230), ...handAt('R', x, odd ? -330 : -230), sq: hit, nod: 4 * Math.exp(-f * 8) }; }
    case 'robot':  return { armsL: 90, elbowL: odd ? 90 : -90, armsR: 90, elbowR: odd ? -90 : 90, turn: odd ? 0.3 : -0.3, sq: hit };
    case 'balance': { const w = Math.sin((t - B0) / BAR * Math.PI * 2 + i); return { lean: 7 * w * k, weight: w, armsL: 20 + 15 * k, armsR: 20 + 15 * k, elbowL: 50, elbowR: 50, tilt: 4 * w }; }
    default:       return { hey: odd ? lerp(0.2, 1, k) : lerp(0.1, 0.55, k), step: (odd ? 0.6 : -0.6) * k, lean: (odd ? 6 : -6) * k, sq: hit, nod: 3 * Math.exp(-f * 8) };
  }
}
const hopDanse = (t, i = 0, h = 22) => hopY(t + i * 0.37 * B, h);

// ---------------- Attente vivante ----------------
// Respiration, appui d'une jambe sur l'autre (toutes les 4 à 7 s), regard qui saute (saccades), clignements irréguliers, micro-hochements.
function alive(t, i = 0) {
  const b = Math.sin(t * 2.4 + i * 1.7);
  const wp = 4 + 3 * hash1(i + 0.5), wv = Math.sin((t + i * 1.3) * Math.PI * 2 / wp);
  const sk = Math.floor((t + i * 0.61) / (1.1 + 0.8 * hash1(i))), glance = (hash1(sk * 7.3 + i) - 0.5) * 4;
  const bk = Math.floor((t + i * 0.77) / 2.7), bt = (t + i * 0.77) - bk * 2.7, bAt = 0.4 + 2.0 * hash1(bk * 3.1 + i);
  const blink = bt > bAt && bt < bAt + 0.11;
  return { lean: 2.2 * b, sq: 1 + 0.012 * Math.sin(t * 3.1 + i), eyes: blink ? 'meh' : undefined,
           weight: 0.7 * Math.tanh(wv * 3), glance, nod: 1.2 * Math.max(0, Math.sin(t * 2.4 + i * 1.7)) };
}

// Mots appuyés d'une réplique : longs, ou suivis d'une ponctuation, ou le dernier.
function stressed(L) {
  if (!L || !L.words) return [];
  return L.words.filter((w, k) => w.t1 - w.t0 >= 0.3 || /[,.;:!?…]$/.test(w.w) || k === L.words.length - 1 || /^[A-ZÀ-Ý]{3,}/.test(w.w));
}
// Celui qui écoute : regarde le locuteur (dx = position du locuteur moins la sienne), petit sursaut au début, hoche sur les mots appuyés.
function listen(t, L, dx) {
  const r = L && t >= L.t0 && t < L.t0 + 0.3 ? hitSq(t, L.t0, 0.06) : 1;
  let nod = 0; for (const w of stressed(L)) nod = Math.max(nod, 6 * bump(t, w.t0 + 0.08, w.t0 + 0.2, 0.1));
  return { look: Math.sign(dx) * 6, turn: Math.sign(dx) * 0.35, sq: r, nod };
}
// Regard et trois-quarts vers un point (x de celui qui regarde, x de la cible ; ou la caméra si toX est null).
function lookAt(fromX, toX) { if (toX == null) return { look: 0, turn: 0 }; const d = toX - fromX; return { look: clamp(d / 40, -6, 6), turn: clamp(d / 600, -0.5, 0.5) }; }

// ---------------- Gestes automatiques d'après la réplique ----------------
const RX = {
  toi: /^(toi|tu|vous|ton|ta|tes|votre|vos|t'|te)$/i, non: /^(non|jamais|rien|personne|nan)$/i, moi: /^(moi|je|j'|mon|ma|mes|nous|on)$/i,
  nombre: /^(un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix|vingt|cent|mille|premier|première|\d+)$/i,
};
const clean = w => w.toLowerCase().replace(/[«»"“”()]/g, '').replace(/[,.;:!?…]+$/, '').replace(/^(j|t|l|qu|c|d|n|s|m)['’]/, '$1\'');
// Renvoie des options de pose à fusionner pendant que le personnage dit la ligne L. o.dx : côté de l'interlocuteur (pour montrer),
// o.calm (0..1) : moins de gestes, o.side : bras principal ('R' par défaut).
function act(L, t, o = {}) {
  if (!L || !L.words || t < L.t0 - 0.35 || t > L.t1 + 0.6) return {};
  const ws = L.words, txt = (L.text || ws.map(w => w.w).join(' ')).trim(), side = o.side || 'R', amp = 1 - (o.calm || 0) * 0.6;
  const ev = [];
  ws.forEach((w, k) => {
    const c = clean(w.w), n = ws[k + 1], tEnd = Math.max(w.t1 + 0.3, n ? n.t0 : w.t1 + 0.5);
    if (RX.toi.test(c) || RX.toi.test(c.replace(/'.*/, "'"))) ev.push({ t0: w.t0 - 0.12, t1: tEnd, p: 3, g: GESTES.montrer(o.dx < 0 ? 'L' : 'R') });
    else if (RX.non.test(c)) ev.push({ t0: w.t0 - 0.05, t1: w.t1 + 0.45, p: 3, g: 'non' });
    else if (RX.nombre.test(c)) ev.push({ t0: w.t0 - 0.12, t1: tEnd + 0.2, p: 2, g: GESTES.compter() });
    else if (RX.moi.test(c) && k < 3) ev.push({ t0: w.t0 - 0.1, t1: Math.min(tEnd, w.t1 + 0.6), p: 1, g: GESTES.moi() });
  });
  if (/\?\s*$/.test(txt)) { const w = ws[ws.length - 1]; ev.push({ t0: w.t0 - 0.1, t1: L.t1 + 0.6, p: 4, g: GESTES.paumes() }); }
  else if (/!\s*$/.test(txt)) { const w = ws[ws.length - 1]; ev.push({ t0: w.t0 - 0.1, t1: L.t1 + 0.4, p: 4, g: { armsR: 140, elbowR: -10, armsL: 60, elbowL: 30, sq: 0.97 } }); }
  // mots appuyés : battement de l'avant-bras, un côté puis l'autre (le geste « qui ponctue » des gens qui parlent)
  let beatN = 0;
  for (const w of stressed(L)) if (!ev.some(e => w.t0 >= e.t0 && w.t0 < e.t1)) {
    const s = (beatN++ % 2 === 0) ? side : (side === 'R' ? 'L' : 'R');
    ev.push({ t0: w.t0 - 0.12, t1: w.t0 + 0.4, p: 0, g: s === 'R' ? { armsR: 34 * amp, elbowR: 75 * amp, nod: 3 } : { armsL: 34 * amp, elbowL: 75 * amp, nod: 3 } });
  }
  // fond : mains un peu levées tant qu'il parle, le buste penché vers l'interlocuteur
  const base = t >= L.t0 - 0.2 && t < L.t1 + 0.3 ? { armsL: 18, armsR: 22, elbowL: 25, elbowR: 30, lean: (o.dx ? Math.sign(o.dx) * 3 : 0) } : {};
  let out = { ...base };
  ev.filter(e => t >= e.t0 && t < e.t1).sort((a, b) => a.p - b.p).forEach(e => { out = { ...out, ...(typeof e.g === 'string' ? GESTES[e.g](seg(t, e.t0, e.t1), t) : e.g) }; });
  return out;
}

// ---------------- Lissage « ressort » des poses (pur : seule la fonction de t compte) ----------------
const NUMK = ['armsL', 'armsR', 'elbowL', 'elbowR', 'lean', 'sq', 'look', 'turn', 'sit', 'crouch', 'step', 'tilt', 'nod', 'shrug', 'weight', 'glance'];
function normPose(o) {
  const r = { ...o }, hey = o.hey || 0, md = MOODS[o.mood] || MOODS.neutre;
  let aL = o.armsL ?? lerp(10, 150, hey), aR = o.armsR ?? lerp(10, 150, hey), eL = o.elbowL, eR = o.elbowR;
  if (o.point === 'L') { aL = 92; eL = 0; r.finger = 'L'; } if (o.point === 'R') { aR = 92; eR = 0; r.finger = 'R'; }
  if (o.hold && (o.holdSide || 'R') === 'R' && o.armsR == null) { aR = 38; eR = 70; }
  if (o.hold && o.holdSide === 'L' && o.armsL == null) { aL = 38; eL = 70; }
  r.armsL = aL; r.armsR = aR; r.elbowL = eL ?? elbowFor(aL); r.elbowR = eR ?? elbowFor(aR);
  r.look = o.look ?? md.look ?? 0; r.sq = o.sq ?? 1; delete r.hey; delete r.point;
  for (const k of NUMK) if (r[k] == null) r[k] = 0;
  if (!o.sq) r.sq = 1;
  return r;
}
// Réponse d'un ressort amorti (ζ, fréquence f Hz) à un échelon, échantillonnée : poids du filtre.
function springW(f, z, dt, n) {
  const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z), S = x => 1 - Math.exp(-z * w * x) * (Math.cos(wd * x) + z / Math.sqrt(1 - z * z) * Math.sin(wd * x));
  const ws = []; for (let i = 0; i < n; i++) ws.push(S((i + 1) * dt) - S(i * dt));
  const sum = ws.reduce((a, b) => a + b, 0); return ws.map(x => x / sum);
}
const SPR = { dt: 0.02, n: 28, ant: 7 };
SPR.fast = springW(3.4, 0.42, SPR.dt, SPR.n);       // corps : dépassement ≈ 20 %
SPR.slow = springW(1.9, 0.3, SPR.dt, SPR.n);        // cheveux : plus lents, ils suivent
// actor(c, fn, {w, t0, antic, x}) : renvoie play(t). fn(t) donne les options de pose (et éventuellement x, y, s : position du
// groupe w). t0 : début de la scène (pas de mémoire avant). antic : élan avant les gestes (0.22 par défaut).
function actor(c, fn, o = {}) {
  const antic = o.antic ?? 0.22, t0 = o.t0 ?? -1e9, ARMS = new Set(['armsL', 'armsR', 'elbowL', 'elbowR', 'lean']);
  return t => {
    const N = SPR.n, A = SPR.ant, samp = [];
    for (let i = -A; i < N; i++) samp.push(normPose(fn(Math.max(t0, t - i * SPR.dt))));
    const cur = samp[A], out = { ...cur };
    for (const k of NUMK) {
      let y = 0; for (let i = 0; i < N; i++) { const xi = samp[i + A][k]; y += SPR.fast[i] * (ARMS.has(k) ? (1 + antic) * xi - antic * samp[i][k] : xi); }
      out[k] = y;
    }
    // cheveux et boucles : retard sur le buste (penché) et sur le déplacement (x)
    let ls = 0, lf = 0, xs = 0, xf = 0;
    for (let i = 0; i < N; i++) { const s = samp[i + A]; ls += SPR.slow[i] * s.lean; lf += SPR.fast[i] * s.lean; xs += SPR.slow[i] * (s.x || 0); xf += SPR.fast[i] * (s.x || 0); }
    out.swing = (cur.swing || 0) + 1.8 * (ls - lf) + 0.12 * (xs - xf) + 2.5 * (cur.turn - out.turn);
    if (o.w && cur.x != null) tf(o.w, cur.x, cur.y ?? FLOOR, cur.s ?? 1);
    posePerson(c, out);
    return out;
  };
}

// ---------------- Foule ----------------
// crowd(g, n, {x0, x1, y, s, seed}) : n passants tous différents, au fond ; renvoie update(t, énergie, styles).
const CROWD_SHIRTS = [...((window.PALETTE && PALETTE.accents) || []), '#FF4D6D', '#FFD45E', '#3A86FF', '#2EC4B6', '#FF8A65', '#5BD68A', '#F4F1EA', '#8ED1FC', '#FFB870'];
function crowd(g, n = 6, o = {}) {
  const r = rng(o.seed || 7), x0 = o.x0 ?? 80, x1 = o.x1 ?? 1000, y = o.y ?? FLOOR - 20, s = o.s ?? 0.72;
  const hairs = ['short', 'puff', 'curly', 'long', 'braids', 'bald'], hats = [null, null, null, 'cap', 'beanie', 'bucket'];
  const M = [];
  for (let k = 0; k < n; k++) {
    const w = el('g', {}, g), pick = a => a[Math.floor(r() * a.length)];
    const c = person(w, { skin: pick(SKIN), hair: pick(hairs), hairColor: pick(['dark', 'brown', 'black', 'red', 'blond']), hat: pick(hats), hatColor: pick(CROWD_SHIRTS),
      shirt: pick(CROWD_SHIRTS), pants: pick(['#2E3440', '#1F4E3D', '#2B2D42', '#5A3420']), glasses: r() < 0.2, earring: r() < 0.3, beard: r() < 0.2 });
    M.push({ w, c, x: lerp(x0, x1, n > 1 ? k / (n - 1) : 0.5) + (r() - 0.5) * 40, y: y + (r() - 0.5) * 20, s: s * (0.92 + 0.12 * r()), style: DANSES[Math.floor(r() * DANSES.length)], i: k + 3 });
  }
  return (t, energy = 1, styles) => M.forEach((m, k) => {
    tf(m.w, m.x, m.y + (energy > 0.4 ? hopDanse(t, m.i, 14 * energy) : 0), m.s);
    posePerson(m.c, { ...alive(t, m.i), ...(energy > 0.05 ? danse(t, (styles && styles[k % styles.length]) || m.style, m.i, energy) : {}), mood: energy > 0.6 ? 'rire' : 'joie' });
  });
}
