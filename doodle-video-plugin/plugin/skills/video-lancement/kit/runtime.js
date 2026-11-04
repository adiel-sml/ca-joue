// Socle commun des films : scènes, étiquettes, sous-titres mot par mot, caméra et rendu. Le film du projet (film.js)
// ne contient que ses scènes. Tout est recalculé depuis t (render pur) ; le minutage vient de timeline.js (window.TL).
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
const FLASHES = [];                     // grands éclairs blancs (photo, révélation)
let SUB_Y = 1520;                        // hauteur de la plaque de sous-titres
let SUBS_ON = true;                      // false : pas de plaque (dialogues en bulles, par exemple)
// ======================= Sous-titres : une plaque, la ligne s'écrit mot par mot =======================
let SUBS = null;
const buildSubs = () => {
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
        tf(it.cg, 540, SUB_Y, E.back(seg(t, it.c.t0, it.c.t0 + 0.2)) * (1 - 0.08 * E.in(seg(t, it.c.t1 - 0.1, it.c.t1))));
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
};

// ======================= Rendu =======================
window.DUR = TL.dur;
window.render = t => {
  if (!SUBS) SUBS = buildSubs();
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
  for (const c of FLASHES) if (t >= c && t < c + 0.25) fl = Math.max(fl, 1 - (t - c) / 0.25);
  op(FLASH, fl);
  if (SUBS_ON) SUBS.update(t); else SUBS.update(-1);
};
window.TEXTS = t => TEXTREG.filter(x => t >= x.t0 && t < x.t1).map(({ id, text, x0, y0, x1, y1 }) => ({ id, text, x0, y0, x1, y1 }));
Object.defineProperty(window, 'SUBCUES', { get: () => (SUBS || (SUBS = buildSubs())).chunks.map(c => ({ t0: +c.t0.toFixed(3), t1: +c.t1.toFixed(3), text: c.map(w => w.w).join(' ') })) });
