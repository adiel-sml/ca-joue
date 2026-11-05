// Ça Joue, le combo : la pub cinéma (nuit, lumière de l'appli, téléphone en 3D, interface qui jaillit, un mot fort par plan)
// avec la bande de potes en bonhommes doodle qui jouent dans le même espace 3D. Voix : Henri. Tout se cale sur ses mots.
'use strict';
SUBS_ON = false;
const L = Object.fromEntries(TL.lines.map(l => [l.id, l])), S_ = TL.S;
const SH = n => `assets/ui/screens/${n}.png`, UF = n => `assets/ui/${n}.png`;
const COL = { orange: '#FF6B35', rose: '#FF4D6D', jaune: '#FFBE0B', bleu: '#3A86FF', vert: '#2EC4B6' };
const sp = (t, t0, s = SP.vif) => stepR(t - t0, s);
function logoCards(parent, size = 1) {
  const g = node3(parent, '', { width: 520 * size + 'px', height: 520 * size + 'px' });
  const cards = [[COL.bleu, -18, -52], [COL.rose, 0, 0], [COL.jaune, 18, 52]].map(([c, r, dx]) => ({ e: node3(g, '', { left: (185 * size) + 'px', top: (140 * size) + 'px', width: 150 * size + 'px', height: 214 * size + 'px', borderRadius: 26 * size + 'px', background: c, border: `${10 * size}px solid #101416`, boxSizing: 'border-box' }), r, dx: dx * size }));
  g.fan = p => cards.forEach(c => { c.e.style.transform = `translate(${(c.dx * p).toFixed(1)}px, ${(c.r ? 6 * p : 0).toFixed(1)}px) rotate(${(c.r * p).toFixed(2)}deg)`; });
  return g;
}
// la bande : Tom, Léa, Max, Inès ; chaque scène les joue avec actor (ressorts, élan, cheveux qui suivent)
function bande(st, o = {}) {
  const tr = troupe(st.world, { w: o.w || 1080, h: o.h || 760, rimCol: o.rim || '#FFFFFF' });
  const P = {}; (o.who || [['tom', 230], ['lea', 430], ['max', 650], ['ines', 860]]).forEach(([id, x]) => { P[id] = tr.add(id, x, o.s || 0.95); });
  return { tr, P };
}

// ---------------- 1. Logo : éclat de lumière, les cartes s'ouvrent, le nom traverse l'image ----------------
cineScene(S_.logo.t0, S_.logo.t1, st => {
  const l1 = L.l1, tToi = wordAt(l1, 'toi'), tPart = wordAt(l1, 'partie');
  const glowA = light(st.bg, COL.orange, 760, 0.7), glowB = light(st.bg, COL.rose, 520, 0.6);
  const lg = logoCards(st.world, 1.05);
  const word = node3(st.world, 'Ça Joue', { width: '2400px', height: '420px', font: `400 360px "${FONT_T}"`, color: '#FFFFFF', textAlign: 'center', lineHeight: '420px', whiteSpace: 'nowrap', letterSpacing: '-8px', transformStyle: 'flat' });
  ev(S_.logo.t0 + 0.05, 'boom'); ev(tToi, 'whoosh'); ev(tPart - 0.1, 'whoosh');
  return t => {
    const a = sp(t, S_.logo.t0 - 0.35, { w: 7, z: 1 }), f = sp(t, tToi - 0.15, SP.vif), out = sp(t, tPart - 0.2, { w: 9, z: 1 });
    place(glowA, { x: 540, y: 900, s: 0.3 + 0.9 * a + 0.05 * Math.sin(t * 3), o: 0.9 * a * (1 - 0.5 * out) });
    place(glowB, { x: 600, y: 1000, s: 0.4 + 0.8 * f, o: 0.8 * f * (1 - 0.6 * out) });
    lg.fan(f); place(lg, { x: 540, y: 960, z: -200 + 260 * a - 900 * out, ry: 25 * (1 - a) - 30 * out, s: 0.7 + 0.3 * a, o: a * (1 - out) });
    place(word, { x: 540 + 900 * (1 - out) - 260 * out + 120 * clamp((t - tPart) / 1.5), y: 960, z: 120 * out, o: clamp(out * 3), b: 14 * (1 - out) });
    st.cam({ z: 120 * clamp(t / 2) });
  };
});

// ---------------- 2. Ennui : la bande s'ennuie dans le noir ; le téléphone s'allume et les éclaire ----------------
cineScene(S_.ennui.t0, S_.ennui.t1, st => {
  const l2 = L.l2, tEnn = wordAt(l2, "s'ennuient"), tSors = wordAt(l2, 'sors'), tTel = wordAt(l2, 'telephone');
  const cold = light(st.bg, '#3A86FF', 620, 0.22), warm = light(st.bg, COL.orange, 820, 0.7);
  const fl = floor(st.world);
  const { tr, P } = bande(st, { s: 1.0 });
  const ph = phone3d(st.world, { w: 360, screenBg: '#101416', glow: COL.orange }); ph.set(UF('home'));
  caption('Ennui ?', tEnn - 0.05, tSors - 0.05, { col: '#9FB4C7' });
  caption('Sors-le.', tSors - 0.05, S_.ennui.t1 + 0.02);
  ev(tSors, 'whoosh'); ev(tTel, 'sparkle');
  const awake = t => sp(t, tTel - 0.1, { w: 10, z: 0.75 });
  const A = Object.entries(P).map(([id, p], i) => ({ p, a: actor(p.c, t => {
    const w = awake(t), bored = w < 0.5;
    return { ...alive(t, i), mood: bored ? (i % 2 ? 'triste' : 'doute') : (i === 1 ? 'rire' : 'surprise'), eyes: bored && i === 2 ? 'meh' : undefined,
      lean: bored ? (i % 2 ? -6 : 5) : 0, sq: bored ? 0.97 : 1, ...(bored ? (i === 0 ? geste('reflechir', t, 0, 99) : i === 3 ? geste('bras_croises', t, 0, 99) : {}) : geste('victoire', t, tTel, tTel + 0.9)),
      look: (540 - p.x) / 60 * w, turn: (540 - p.x) / 900 * w };
  }, { t0: S_.ennui.t0 }) }));
  return t => {
    const w = awake(t), rise = sp(t, tSors - 0.05, { w: 8, z: 0.85 });
    place(cold, { x: 540, y: 1150, o: 0.9 * (1 - w) }); place(warm, { x: 540, y: 1150, s: 0.4 + 0.8 * w, o: w });
    place(fl, { x: 540, y: 1720, rx: 78, o: 0.5 });
    place(tr.el, { x: 540, y: 1260, z: -260 + 80 * w, o: 0.55 + 0.45 * w });
    A.forEach(({ p, a }) => { p.at(0, hopY(t, 26) * (t > tTel && t < tTel + 1 ? 1 : 0)); a(t); });
    place(ph.el, { x: 540, y: 1500 - 560 * rise, z: 120 + 120 * rise, rx: 20 * (1 - rise), ry: -12 * rise, s: 0.8 + 0.2 * rise, o: rise > 0.01 ? 1 : 0 });
    ph.glare(clamp((t - tSors) / 1.5));
    st.cam({ z: 60 * clamp((t - S_.ennui.t0) / 3), y: 1000 });
  };
});

// ---------------- 3. Choix : le doigt touche « Mimes », la tuile sort ; la bande se penche derrière ----------------
cineScene(S_.choix.t0, S_.choix.t1, st => {
  const l3 = L.l3, tChoisis = wordAt(l3, 'choisis');
  const gl = light(st.bg, COL.orange, 700, 0.5);
  const { tr, P } = bande(st, { s: 0.9, who: [['tom', 110], ['lea', 250], ['max', 830], ['ines', 970]] });
  const ph = phone3d(st.world, { w: 520, screenBg: '#101416', glow: COL.orange }); ph.set(UF('home'));
  const tile = cardImg(ph.el, UF('tile-mime'), 173 * ph.k, 175 * ph.k, { r: 22, glow: COL.orange });
  const tp = tap(ph.el), hm = ph.app(102.5, 358.3), tc = tChoisis + 0.05;
  caption('Choisis.', tChoisis, S_.choix.t1 + 0.02);
  ev(tc, 'click'); ev(tc + 0.12, 'pop', { f: 880 });
  const A = Object.values(P).map((p, i) => actor(p.c, t => ({ ...alive(t, i), mood: t > tc ? 'joie' : 'surprise', look: (540 - p.x) / 70, turn: (540 - p.x) / 900, lean: (540 - p.x) / 60,
    ...(t > tc + 0.2 ? geste(i % 2 ? 'applaudir' : 'pouce', t, tc + 0.2, 99) : {}) }), { t0: S_.choix.t0 }));
  return t => {
    const r = sp(t, S_.choix.t0 - 0.05, { w: 6, z: 0.9 }), lift = sp(t, tc + 0.08, { w: 13, z: 0.75 });
    place(gl, { x: 540, y: 1000, s: 1 + 0.1 * lift, o: 0.85 });
    place(tr.el, { x: 540, y: 1480, z: -160, o: 1 }); Object.values(P).forEach((p, i) => { p.at(); A[i](t); });
    place(ph.el, { x: 540, y: 1060 + 500 * (1 - r), z: -120 * (1 - r) + 40 * lift, rx: 14 * (1 - r) + 6, ry: -28 + 16 * r + 6 * lift, rz: -4 * (1 - r), s: 0.96 });
    ph.glare(clamp((t - S_.choix.t0) / 2.2));
    tp(t, ph.w / 2 + hm.x, ph.h / 2 + hm.y, tc, 30);
    place(tile, { x: ph.w / 2 + hm.x, y: ph.h / 2 + hm.y - 40 * lift, z: 4 + 260 * lift, ry: 10 * lift, rz: -5 * lift, s: 1 + 0.3 * lift, o: t >= tc - 0.02 ? 1 : 0 });
    st.cam({ z: 60 * r + 120 * lift, x: 540 - 40 * lift, y: 980 - 30 * lift });
  };
});

// ---------------- 4. Jeux : à chaque nom, la tuile jaillit et un pote joue le jeu ; « 23 » sort de l'écran ----------------
cineScene(S_.jeux.t0, S_.jeux.t1, st => {
  const l4 = L.l4;
  const G = [['mimes', 'mime-12', 'tile-mime', COL.orange, -1, 'lea'], ['bombe', 'bomb', 'tile-bomb', COL.rose, 1, 'tom'], ['undercover', 'uc-show', 'tile-uc', COL.vert, -1, 'max'], ['loup', 'lg', 'tile-lg', COL.bleu, 1, 'ines']]
    .map(([w, s, tl, c, side, who]) => ({ t: wordAt(l4, w), s, tl, c, side, who }));
  const t23 = wordAt(l4, '23');
  const glows = G.map(g => light(st.bg, g.c, 720, 0.5));
  const { tr, P } = bande(st, { s: 0.85, who: [['lea', 170], ['tom', 400], ['max', 680], ['ines', 910]] });
  const ph = phone3d(st.world, { w: 470, screenBg: '#101416' });
  G.forEach((g, i) => { g.tile = cardImg(st.world, UF(g.tl), 280, 283, { r: 32, glow: g.c }); ev(g.t - 0.03, 'pop', { f: 700 + 80 * i }); punch(g.t, 0.02); });
  const pl = pill(ph.el, { col: COL.jaune, size: 88, w: 480 });
  caption('Joue.', G[0].t, G[3].t + 0.5);
  caption('23 jeux.', t23, S_.jeux.t1 + 0.02);
  ev(t23, 'whoosh'); ev(t23 + 0.7, 'stamp');
  // ce que chacun fait quand son jeu est nommé : mimer, tenir la bombe qui chauffe, se cacher (masque), avoir peur du loup
  const ACT = {
    lea: t => ({ ...geste('coucou', t, 0, 99), mood: 'rire', armsL: 140, elbowL: -30 + 30 * Math.sin(t * 9) }),
    tom: t => ({ hold: 'phone', holdSide: 'R', armsR: 60, elbowR: 60, sweat: true, mood: 'peur', lean: 6 * Math.sin(t * 14) }),
    max: () => ({ mask: true, mood: 'fier', ...geste('bras_croises', 0, -1, 99) }),
    ines: () => ({ mood: 'peur', eyes: 'wide', ...geste('front', 0, -1, 99), crouch: 0.3 }),
  };
  const A = Object.entries(P).map(([id, p], i) => ({ id, p, a: actor(p.c, t => {
    const g = G.find(x => x.who === id), on = g && t >= g.t - 0.05 && t < (G[G.indexOf(g) + 1]?.t ?? t23) + 0.3, all = t >= t23;
    return { ...alive(t, i), mood: 'joie', ...(on ? ACT[id](t) : {}), ...(all ? { ...danse(t, ['pas', 'vague', 'rebond', 'disco'][i], i, 1), mood: 'rire', mask: false } : {}) };
  }, { t0: S_.jeux.t0 }) }));
  return t => {
    let k = 0; G.forEach((g, i) => { if (t >= g.t - 0.06) k = i; });
    ph.set(SH(G[k].s));
    glows.forEach((gl, i) => place(gl, { x: 540 + 200 * G[i].side, y: 1100, o: i === k && t < t23 ? 0.9 * sp(t, G[i].t - 0.1, SP.texte) : 0 }));
    const out = sp(t, t23 - 0.1, { w: 10, z: 0.85 }), rot = Math.sin((t - S_.jeux.t0) * 1.4) * 10;
    place(tr.el, { x: 540, y: 1330, z: -150 + 60 * out, o: 1 });
    A.forEach(({ id, p, a }) => { const g = G.find(x => x.who === id), on = g && t >= g.t - 0.05 && t < (G[G.indexOf(g) + 1]?.t ?? t23) + 0.3;
      p.at(0, t >= t23 ? hopDanse(t, A.indexOf(A.find(x => x.id === id)), 24) : 0, on ? 1.12 : 1); a(t); });
    place(ph.el, { x: 540, y: 820 + 40 * out, z: -60 - 100 * out, rx: 8 + 6 * out, ry: -12 + rot * (1 - out) + 12 * out, s: 0.85 });
    ph.glare(clamp((t - S_.jeux.t0) / 4));
    G.forEach((g, i) => { const v = vis(t, g.t - 0.05, (G[i + 1] ? G[i + 1].t : t23) + 0.05, 0.12), e = v.e;
      place(g.tile, { x: 540 + g.side * lerp(80, 330, e), y: 620 + (i % 2) * 60, z: lerp(-200, 220, e), ry: -g.side * 24 * e, rz: g.side * 6 * e, o: v.o, b: v.b }); });
    pl.set(fmtN(Math.round(countTo(t, t23, 0.75, 0, 23))) + ' jeux');
    const pv = sp(t, t23, { w: 12, z: 0.8 });
    place(pl, { x: ph.w / 2, y: ph.h * 0.45, z: 20 + 300 * pv, s: 0.6 + 0.45 * pv, o: t >= t23 ? 1 : 0 });
    st.cam({ z: 30 + 40 * out, y: 1000 });
  };
});

// ---------------- 5. Gage : Tom a perdu, les autres le montrent en riant, la feuille du gage vient au premier plan ----------------
cineScene(S_.gage.t0, S_.gage.t1, st => {
  const l5 = L.l5, tPerds = wordAt(l5, 'perds'), tGage = wordAt(l5, 'gage');
  const gl = light(st.bg, COL.rose, 760, 0.6), spot = light(st.bg, '#FFFFFF', 300, 0.25);
  const { tr, P } = bande(st, { s: 1.0, who: [['lea', 210], ['tom', 540], ['max', 760], ['ines', 930]] });
  const ph = phone3d(st.world, { w: 420, screenBg: '#101416', glow: COL.rose });
  const sheet = cardImg(st.world, UF('gage-sheet'), 560, 528, { r: 30, glow: COL.jaune });
  caption('Perds.', tPerds - 0.25, tGage - 0.02);
  caption('Gage.', tGage, S_.gage.t1 + 0.02, { col: COL.jaune });
  ev(S_.gage.t0 + 0.05, 'boom2'); ev(tPerds + 0.2, 'laugh'); ev(tGage, 'stamp');
  const A = Object.entries(P).map(([id, p], i) => ({ p, a: actor(p.c, t => id === 'tom'
    ? { ...alive(t, i), mood: t > tPerds ? 'gene' : 'surprise', sweat: t > tPerds, soot: true, eyes: t < tPerds ? 'x' : undefined, ...geste('front', t, tPerds + 0.1, 99) }
    : { ...alive(t, i), mood: 'rire', ...(t > tPerds ? { point: p.x < 540 ? 'R' : 'L' } : {}), turn: p.x < 540 ? 0.5 : -0.5, look: p.x < 540 ? 6 : -6,
        lean: 4 * Math.sin(t * 12 + i) * (t > tPerds ? 1 : 0) }, { t0: S_.gage.t0 }) }));
  return t => {
    const sh = Math.exp(-(t - S_.gage.t0) * 6) * Math.sin((t - S_.gage.t0) * 60) * 10, up = sp(t, tGage, { w: 11, z: 0.8 });
    ph.set(SH('bomb-end'));
    place(gl, { x: 540, y: 1100, s: 0.9 + 0.2 * sp(t, S_.gage.t0, SP.net), o: 0.85 });
    place(spot, { x: 540, y: 1200, s: 1, o: t > tPerds ? 0.9 : 0 });
    place(tr.el, { x: 540 + sh, y: 1360, z: -80, o: 1 });
    A.forEach(({ p, a }) => { p.at(0, 0, p.c === P.tom.c ? 1.1 : 1); a(t); });
    place(ph.el, { x: 540 + sh, y: 640, z: -320, rx: 6, ry: 14, rz: sh * 0.2, s: 0.75, o: 1 - up });
    ph.glare(clamp((t - S_.gage.t0) / 2.4));
    place(sheet, { x: 540, y: lerp(900, 700, up), z: lerp(-300, 180, up), rx: -8 * (1 - up), s: 0.8 + 0.2 * up, o: t >= tGage - 0.05 ? 1 : 0 });
    st.cam({ z: 60 * up, y: 1000 - 40 * up });
  };
});

// ---------------- 6. Couple : Léa et Max sous une lumière rose, trois jeux à deux s'ouvrent au-dessus d'eux ----------------
cineScene(S_.couple.t0, S_.couple.t1, st => {
  const l6 = L.l6, tCouple = wordAt(l6, 'couple'), tDeux = wordAt(l6, 'deux');
  const gl = light(st.bg, COL.rose, 820, 0.62);
  const fl = floor(st.world);
  const { tr, P } = bande(st, { s: 1.05, who: [['lea', 420], ['max', 660]], rim: COL.rose });
  const T = [['tile-know', -1, 0, 326], ['tile-who2', 0, 1, 360], ['tile-talk', 1, 2, 293]].map(([n, side, i, h]) => ({ c: cardImg(st.world, UF(n), 280, h * 280 / 290, { r: 32, glow: COL.rose }), side, t: tCouple + i * 0.22 }));
  T.forEach(x => ev(x.t, 'pop', { f: 990 }));
  caption('À deux.', tCouple - 0.05, S_.couple.t1 + 0.02);
  ev(tDeux, 'heart');
  const A = [P.lea, P.max].map((p, i) => actor(p.c, t => { const close = sp(t, tDeux - 0.2, SP.doux);
    return { ...alive(t, i), mood: close > 0.5 ? 'joie' : 'gene', turn: i ? -0.6 : 0.6, look: i ? -6 : 6, ...danse(t, 'balance', i, 0.4 + 0.4 * close), x: p.x + (i ? -40 : 40) * close }; }, { t0: S_.couple.t0 }));
  return t => {
    const r = sp(t, S_.couple.t0, { w: 7, z: 0.9 }), close = sp(t, tDeux - 0.2, SP.doux);
    place(gl, { x: 540, y: 1150, s: 0.8 + 0.3 * r, o: 0.85 });
    place(fl, { x: 540, y: 1740, rx: 78, o: 0.5 });
    place(tr.el, { x: 540, y: 1330, z: 0, o: 1 });
    P.lea.at(40 * close); P.max.at(-40 * close); A.forEach(a => a(t));
    T.forEach(x => { const e = sp(t, x.t, { w: 12, z: 0.78 });
      place(x.c, { x: 540 + x.side * 320 * e, y: lerp(1100, x.side ? 640 : 520, e), z: lerp(-240, 120 - Math.abs(x.side) * 40, e), ry: -x.side * 26 * e, rz: x.side * 8 * e, o: t >= x.t ? 1 : 0, s: 0.6 + 0.4 * e }); });
    st.cam({ z: 40 * r, ry: 4 * Math.sin((t - S_.couple.t0) * 1.2) });
  };
});

// ---------------- 7. Fin : le logo, le nom, l'adresse, et toute la bande qui saute ----------------
cineScene(S_.fin.t0, S_.fin.t1, st => {
  const gl = light(st.bg, COL.orange, 760, 0.55), gl2 = light(st.bg, COL.bleu, 520, 0.35);
  const lg = logoCards(st.world, 0.6);
  const name = node3(st.world, 'Ça Joue', { width: '1000px', height: '200px', font: `400 140px "${FONT_T}"`, color: '#FFFFFF', textAlign: 'center', lineHeight: '200px', letterSpacing: '-3px', transformStyle: 'flat' });
  const url = pill(st.top, { col: COL.orange, size: 44, w: 640 }); url.set('ca-joue-rho.vercel.app');
  const { tr, P } = bande(st, { s: 0.8, who: [['tom', 240], ['lea', 440], ['max', 640], ['ines', 840]] });
  reg('nom', 'Ça Joue', S_.fin.t0 + 0.2, S_.fin.t1, 540, 760, 720, 160, 'hud');
  reg('url', 'ca-joue-rho.vercel.app', S_.fin.t0 + 0.6, S_.fin.t1, 540, 930, 640, 76, 'hud');
  ev(S_.fin.t0 + 0.05, 'boom'); ev(S_.fin.t0 + 0.6, 'pop', { f: 1047 }); ev(S_.fin.t0 + 0.3, 'crowd');
  const A = Object.values(P).map((p, i) => actor(p.c, t => ({ ...alive(t, i), ...danse(t, ['rebond', 'vague', 'clap', 'pas'][i], i, 1), mood: 'rire', ...geste('victoire', t, S_.fin.t0 + 0.2, S_.fin.t0 + 1.2) }), { t0: S_.fin.t0 }));
  return t => {
    const a = sp(t, S_.fin.t0, { w: 8, z: 0.85 }), b = sp(t, S_.fin.t0 + 0.25, SP.vif), c = sp(t, S_.fin.t0 + 0.6, SP.vif), d = clamp((t - S_.fin.t0) / 4);
    place(gl, { x: 540 + 80 * Math.sin((t - S_.fin.t0) * 1.6), y: 700, s: 0.6 + 0.5 * a + 0.08 * Math.exp(-frac(t) * 6), o: 0.85 }); place(gl2, { x: 420, y: 1300, s: 0.8 + 0.2 * d, o: 0.6 * a });
    lg.fan(a * (1 + 0.12 * Math.sin((t - S_.fin.t0) * 3))); place(lg, { x: 540, y: 520, z: 100 * d, ry: 16 * Math.sin((t - S_.fin.t0) * 1.3), s: 0.85 + 0.15 * a, o: a });
    place(name, { x: 540, y: 760, z: 30 * d, s: 0.9 + 0.1 * b, o: b, b: 10 * (1 - b) });
    place(url, { x: 540, y: 930, s: 0.9 + 0.1 * c, o: c, b: 8 * (1 - c) });
    place(tr.el, { x: 540, y: 1420, z: -40 + 60 * d, o: a });
    Object.values(P).forEach((p, i) => { p.at(0, hopDanse(t, i, 30)); A[i](t); });
    st.cam({ z: 120 * d, ry: 5 * Math.sin((t - S_.fin.t0) * 0.9) });
  };
});
