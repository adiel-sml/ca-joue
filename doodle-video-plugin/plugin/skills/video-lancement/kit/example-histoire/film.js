// EXEMPLE d'histoire : deux amis préparent une soirée, en trois scènes (salon, tableau, parc), dialogues en bulles.
// Il montre les outils de story.js et le rythme attendu : un plan par réplique, des réactions, des mots clés qui surgissent,
// des transitions balayées, aucune seconde sans mouvement. Chaque nouvelle histoire écrit ses propres scènes.
'use strict';
SUBS_ON = false;                                   // les répliques s'affichent dans les bulles
const PSC = 0.95;
// personnages et voix : cast.json du projet (les mêmes d'une vidéo à l'autre)
const CAST = { malik: p => castPerson(p, 'malik'), ines: p => castPerson(p, 'ines') };
// la bouche suit les sons quand le personnage parle, sinon celle de son émotion
const speak = (L, t) => mouthAt(L, t);
const lineOf = id => TL.lines.find(l => l.id === id);
const nb = s => s.replace(/ ([?!:;])/g, ' $1');
const TXT = Object.fromEntries(TL.lines.map(l => [l.id, l.words.map(w => w.w).join(' ')]));
// une réplique : bulle au-dessus de celui qui parle, de son premier mot à la réplique suivante
// La bulle vit à l'écran (HUD) et non dans le décor : elle reste lisible en gros plan comme en plan large.
function say(g, s, L, tail, t1, y = 560) {
  const st = bubble(HUD, nb(TXT[L.id]), { x: 540, y, tx: tail < 540 ? 380 : 700, ty: y + 260, t0: L.t0 - 0.08, t1, size: 52, maxW: 640 });
  reg('b-' + L.id, nb(TXT[L.id]), st.t0, st.t1, 540, y, st.w, st.h, 'hud', true); OVERLAYS.push(st.update); ev(L.t0 - 0.08, 'pop', { f: 700 });
}

// ---------------- 1. Le salon : le problème, dès la première image ----------------
{
  const R = S.salon, l1 = lineOf('l1'), l2 = lineOf('l2');
  scene(R.t0, R.t1, (g, s) => {
    placeRoom(g); sofa(g, 540);
    const wm = el('g', {}, g), wi = el('g', {}, g);
    const m = CAST.malik(wm), i = CAST.ines(wi);
    // accroche : la question du film est posée avant même la première réplique
    const hook = sticker(HUD, 'Soirée samedi ?', { col: K.red, x: 540, y: 340, rot: -4, t0: 0, t1: l2.t0, size: 70 }); OVERLAYS.push(hook.update);
    reg('hook', 'Soirée samedi ?', 0, l2.t0, 540, 340, hook.w, hook.h, 'hud'); punch(0.02, 0.03);
    say(g, s, l1, 330, l2.t0 - 0.1); say(g, s, l2, 760, R.t1);
    keyword(l2, 'trois', { text: '3 CHOSES', x: 540, y: 330, col: '#2FB36B', t1: R.t1 });
    s.cam = dialogueCam([l1, l2], { l1: 330, l2: 760 });
    return t => {
      tf(wm, 330, FLOOR, PSC); tf(wi, 760, FLOOR + (t >= l2.t0 ? hopY(t, 8) : 0), PSC);
      pose(m, { ...alive(t, 0), ...(t >= l2.t0 ? listen(t, l2, 1) : { look: 6 }), mood: t < l2.t0 ? 'gene' : 'surprise', mouth: speak(l1, t), turn: 0.6, armsL: t < l2.t0 ? 60 : 15, armsR: t < l2.t0 ? 60 : 15, elbowL: 60, elbowR: 60 });
      pose(i, { ...alive(t, 1), ...(t < l2.t0 ? listen(t, l1, -1) : { look: -6 }), mood: t < l2.t0 ? 'doute' : 'fier', mouth: speak(l2, t), turn: -0.6, armsR: t >= l2.t0 + 0.5 ? 150 : 15 });
      s.fx.forEach(f => f(t));
    };
  });
}

// ---------------- 2. Le tableau : l'explication en trois étapes, une étape par mot ----------------
{
  const R = S.tableau, L3 = ['l3', 'l3b', 'l3c'].map(lineOf);
  const tw = L3.map(L => q16(L.t0));
  const items = ['Une playlist', 'Des jeux', 'Des pizzas'];
  wipe(R.t0, '#2FB36B');
  tw.forEach(x => { ev(x, 'stamp'); punch(x, 0.03); });
  scene(R.t0, R.t1, (g, s) => {
    const board = placeBoard(g);
    chalk(board, 'La soirée parfaite', 0, -170, 66);
    const badges = items.map((it, k) => { const b = stepBadge(g, k + 1, it, { col: [K.red, '#3A86FF', '#2FB36B'][k] }); reg('step' + k, it, tw[k], R.t1, 230 + b.w / 2, 470 + k * 140, b.w, 120, 'world', true); return b; });
    const wi = el('g', {}, g), i = CAST.ines(wi);
    // chaque étape : la caméra se recadre sur la ligne qui apparaît
    s.cam = t => { const k = tw.filter(x => t >= x).length; const y = k ? 470 + (k - 1) * 140 : 640; return { x: 540, y: lerp(640, y + 120, 0.6), z: 1.2 + 0.06 * Math.exp(-(t - (tw[k - 1] ?? -9)) * 4) }; };
    return t => {
      badges.forEach((b, k) => { op(b.g, t >= tw[k] ? 1 : 0); tf(b.g, 230, 470 + k * 140, E.back(seg(t, tw[k], tw[k] + 0.3))); });
      const k = tw.filter(x => t >= x).length;
      tf(wi, 880, FLOOR, PSC);
      pose(i, { ...alive(t, 1), look: -6, mood: 'joie', mouth: L3.map(L => speak(L, t)).find(Boolean), turn: -0.8, point: k ? 'L' : null, armsR: 15, lean: -3, sq: hitSq(t, tw[k - 1] ?? -9, 0.05) });
    };
  });
}

// ---------------- 3. Le parc : le résultat ----------------
{
  const R = S.parc, l4 = lineOf('l4'), l5 = lineOf('l5');
  ev(l5.t1, 'pop', { f: 1047 });
  wipe(R.t0, K.red);
  scene(R.t0, R.t1, (g, s) => {
    placePark(g);
    const wm = el('g', {}, g), wi = el('g', {}, g);
    const m = CAST.malik(wm), i = CAST.ines(wi);
    say(g, s, l4, 380, l5.t0 - 0.1); say(g, s, l5, 780, R.t1);
    keyword(l5, 'simple', { text: 'SIMPLE', x: 540, y: 330, col: K.red, t1: R.t1 });
    s.fx.push(burst(g, 780, FLOOR - 470, l5.t1, K.yellow, 1.2));
    s.cam = t => ({ x: 540, y: lerp(900, 980, seg(t, R.t0, R.t1)), z: 1.15 + 0.08 * seg(t, R.t0, R.t1) });   // plan large : la liste reste visible
    return t => {
      const w = walk(t, R.t0, l4.t1, -120, 380);
      tf(wm, w.x, FLOOR + w.y, PSC);
      pose(m, { ...alive(t, 0), step: w.step, armsL: w.armsL ?? 20, armsR: w.armsR ?? 20, hold: 'pizza', mood: t > l4.t1 ? 'rire' : 'joie', mouth: speak(l4, t), look: 6, turn: 0.5 });
      tf(wi, 780, FLOOR + (t >= l5.t1 ? hopY(t, 22) : 0), PSC);
      pose(i, { ...alive(t, 1), ...(t < l5.t0 ? listen(t, l4, -1) : {}), mood: t >= l5.t1 ? 'rire' : 'fier', mouth: speak(l5, t), hey: t >= l5.t1 ? 1 : 0, turn: -0.5 });
      s.fx.forEach(f => f(t));
    };
  });
}
