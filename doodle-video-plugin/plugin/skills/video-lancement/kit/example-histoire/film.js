// EXEMPLE d'histoire : deux amis préparent une soirée, en trois scènes (salon, tableau, parc), dialogues en bulles.
// Il montre les outils de story.js ; chaque nouvelle histoire écrit ses propres scènes.
'use strict';
SUBS_ON = false;                                   // les répliques s'affichent dans les bulles
const PSC = 0.95;
const CAST = {
  malik: p => person(p, { skin: SKIN[1], hair: 'short', hat: 'cap', hatColor: K.red, shirt: '#4FC3F7', pants: '#2B2D42' }),
  ines:  p => person(p, { skin: SKIN[2], hair: 'puff', band: '#43AA8B', earring: true, shirt: '#FFD45E', pants: '#2E3440', shoe: K.red }),
};
const lineOf = id => TL.lines.find(l => l.id === id);
const nb = s => s.replace(/ ([?!:;])/g, ' $1');
// une réplique : bulle au-dessus de la tête de celui qui parle, tenue jusqu'à la réplique suivante
function say(g, s, L, x, tail, t1) {
  const st = bubble(g, nb(TL_TEXT[L.id]), { x, y: 790, tx: tail, ty: FLOOR - PSC * 430, t0: L.t0 - 0.1, t1, size: 46, maxW: 560 });
  s.fx.push(st.update); reg('b-' + L.id, nb(TL_TEXT[L.id]), st.t0, st.t1, x, 790, st.w, st.h); ev(L.t0 - 0.1, 'pop', { f: 700 });
}
const TL_TEXT = Object.fromEntries(TL.lines.map(l => [l.id, l.words.map(w => w.w).join(' ')]));

// ---------------- 1. Le salon : le problème ----------------
{
  const R = S.salon, l1 = lineOf('l1'), l2 = lineOf('l2');
  scene(R.t0, R.t1, (g, s) => {
    placeRoom(g); sofa(g, 540);
    const wm = el('g', {}, g), wi = el('g', {}, g);
    const m = CAST.malik(wm), i = CAST.ines(wi);
    say(g, s, l1, 540, 330, l2.t0 - 0.05);
    say(g, s, l2, 540, 760, R.t1);
    s.cam = t => ({ x: 540, y: 1080, z: 1.3 + 0.06 * seg(t, R.t0, R.t1) });
    return t => {
      tf(wm, 330, FLOOR, PSC); tf(wi, 760, FLOOR + (t >= l2.t0 ? hopY(t, 8) : 0), PSC);
      pose(m, { look: 6, open: talking(l1, t), armsL: t < l2.t0 ? 60 : 15, armsR: t < l2.t0 ? 60 : 15, elbowL: 60, elbowR: 60, sweat: t > l1.t0 + 1 && t < l2.t0 });
      pose(i, { look: -6, open: talking(l2, t), armsR: t >= l2.t0 + 0.6 ? 150 : 15, eyes: t >= l2.t0 ? 'n' : 'n' });
      s.fx.forEach(f => f(t));
    };
  });
}

// ---------------- 2. Le tableau : l'explication en trois étapes ----------------
{
  const R = S.tableau, l3 = lineOf('l3');
  const tw = ['Un', 'Deux', 'Trois'].map(w => q16(l3.words.find(x => x.w.startsWith(w)).t0));
  const items = ['Une playlist', 'Des jeux', 'Des pizzas'];
  CUTS.push(R.t0);
  tw.forEach((x, k) => { ev(x, 'stamp'); punch(x, 0.02); });
  scene(R.t0, R.t1, (g, s) => {
    const board = placeBoard(g);
    chalk(board, 'La soirée parfaite', 0, -170, 66);
    const badges = items.map((it, k) => { const b = stepBadge(g, k + 1, it, { col: [K.red, '#3A86FF', '#2FB36B'][k] }); reg('step' + k, it, tw[k], R.t1, 540, 470 + k * 140, b.w, 120); return b; });
    const wi = el('g', {}, g), i = CAST.ines(wi);
    s.cam = t => ({ x: 540, y: lerp(760, 820, seg(t, R.t0, R.t1)), z: 1.15 });
    return t => {
      badges.forEach((b, k) => { op(b.g, t >= tw[k] ? 1 : 0); tf(b.g, 250, 470 + k * 140, E.back(seg(t, tw[k], tw[k] + 0.3))); });
      const k = tw.filter(x => t >= x).length;
      tf(wi, 880, FLOOR, PSC);
      pose(i, { look: -6, open: talking(l3, t), armsL: k ? 100 : 20, elbowL: 0, armsR: 15, lean: -3 });
    };
  });
}

// ---------------- 3. Le parc : le résultat ----------------
{
  const R = S.parc, l4 = lineOf('l4'), l5 = lineOf('l5');
  const ticks = [R.t0 + 0.4, R.t0 + 0.9, R.t0 + 1.4];
  ticks.forEach((x, k) => ev(x, 'ding'));
  ev(l5.t1, 'pop', { f: 1047 });
  CUTS.push(R.t0);
  scene(R.t0, R.t1, (g, s) => {
    placePark(g);
    const list = checklist(g, ['Playlist', 'Jeux', 'Pizzas'], { x: 330, y: 400, times: ticks });
    ['Playlist', 'Jeux', 'Pizzas'].forEach((it, k) => reg('ck' + k, it, ticks[k] - 0.3, R.t1, 500, 400 + k * 110, 300, 80));
    const wm = el('g', {}, g), wi = el('g', {}, g);
    const m = CAST.malik(wm), i = CAST.ines(wi);
    say(g, s, l4, 540, 380, l5.t0 - 0.05);
    say(g, s, l5, 540, 780, R.t1);
    s.fx.push(burst(g, 780, FLOOR - 470, l5.t1, K.yellow, 1.2));
    s.cam = t => ({ x: 540, y: 1060, z: 1.2 });
    return t => {
      list.update(t);
      const w = walk(t, R.t0, l4.t1, -120, 380);
      tf(wm, w.x, FLOOR + w.y, PSC);
      pose(m, { step: w.step, armsL: w.armsL ?? 20, armsR: w.armsR ?? 20, open: talking(l4, t), eyes: t > l4.t1 ? 'up' : 'n', look: 6 });
      tf(wi, 780, FLOOR + (t >= l5.t1 ? hopY(t, 22) : 0), PSC);
      pose(i, { look: -6, open: talking(l5, t) || t >= l5.t1, hey: t >= l5.t1 ? 1 : 0, eyes: t >= l5.t1 ? 'up' : 'n' });
      s.fx.forEach(f => f(t));
    };
  });
}
