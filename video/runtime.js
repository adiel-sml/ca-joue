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
// Registre des textes (contrôle de lecture et des zones sûres). space : 'world' (dans le décor, suit la caméra) ou 'hud' (à l'écran).
// speech : texte dit à voix haute au même moment (bulle, mot clé) ; il doit rester 1 s au moins, sans règle de lecture silencieuse.
function reg(id, text, t0, t1, x, y, w, h, space = 'world', speech = false) { TEXTREG.push({ id, text, t0, t1, space, speech, x0: x - w / 2, y0: y - h / 2, x1: x + w / 2, y1: y + h / 2 }); }
// o.hud : l'étiquette vit à l'écran (ne suit pas la caméra) ; o.speech : elle reprend un mot dit au même moment
function stick(g, s, text, o) { const st = sticker(o.hud ? HUD : g, text, o); (o.hud ? OVERLAYS : s.fx).push(st.update); reg('st-' + text, text, st.t0, st.t1, st.x, st.y, st.w, st.h, o.hud ? 'hud' : 'world', !!o.speech); if (o.sound !== false) { ev(st.t0, 'pop', { f: o.f || 880 }); punch(st.t0, 0.012); } return st; }
const FLASHES = [];                     // grands éclairs blancs (photo, révélation)
// Écran (HUD) : conçu en 1080×1920, réduit et centré pour les autres formats.
const HUDT = (() => { const k = LANDSCAPE ? 0.7 * VH / 1080 : VW / 1080; const ox = (VW - 1080 * k) / 2, oy = LANDSCAPE ? -132 * VH / 1080 : VH === 1920 ? 0 : -190 * k;
  return { k, ox, oy, str: `translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${k.toFixed(4)})`, x: x => ox + x * k, y: y => oy + y * k }; })();
let SUB_Y = 1410;                        // hauteur de la plaque de sous-titres
const OVERLAYS = [];                     // éléments à l'écran (bulles, mots clés) : update(t) appelé à chaque image
let SUBS_ON = true;
let SUB_STYLE = 'plaque';                // 'plaque' (fond crème), 'karaoke' (sans fond, le mot dit s'allume), 'mot' (un seul gros mot au centre)                      // false : pas de plaque (dialogues en bulles, par exemple)
// ======================= Sous-titres : une plaque, la ligne s'écrit mot par mot =======================
let SUBS = null;
const buildSubs = () => {
  const size = 60, maxW = 680, chunks = [];       // largeur : la plaque reste hors de la colonne de boutons des réseaux
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
    const plate = el('g', {}, cg);
    el('rect', { x: -pw / 2 + 12, y: -phh / 2 + 12, width: pw, height: phh, rx: 36, fill: K.ol }, plate);
    el('rect', { x: -pw / 2, y: -phh / 2, width: pw, height: phh, rx: 36, fill: K.cream, ...SO }, plate);
    show(plate, SUB_STYLE === 'plaque');
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
    return { cg, c, words, pw, phh, plate };
  });
  return {
    chunks, items,
    update(t) {
      items.forEach(it => {
        const on = t >= it.c.t0 && t < it.c.t1;
        op(it.cg, on ? 1 : 0); if (!on) return;
        const first = it.c === it.c[0] && false;
        void first;
        tf(it.cg, 540, Math.min(SUB_Y, 1490 - it.phh / 2), E.back(seg(t, it.c.t0, it.c.t0 + 0.2)) * (1 - 0.08 * E.in(seg(t, it.c.t1 - 0.1, it.c.t1))));
        it.words.forEach((o, j) => {
          const nx = it.words[j + 1];
          const said = t >= o.w.t0 - 0.03, now = said && t < Math.min(o.w.t1 + 0.12, nx ? nx.w.t0 - 0.03 : 1e9);
          const st = SUB_STYLE;
          op(o.n, st === 'mot' ? (now ? 1 : 0) : said ? 1 : st === 'karaoke' ? 0.45 : 0.28);
          if (now) { o.n.setAttribute('fill', K.yellow); o.n.setAttribute('stroke', K.ol); o.n.setAttribute('stroke-width', st === 'plaque' ? 9 : 14); }
          else if (st === 'plaque') { o.n.setAttribute('fill', K.ol); o.n.setAttribute('stroke', 'none'); o.n.setAttribute('stroke-width', 0); }
          else { o.n.setAttribute('fill', K.white); o.n.setAttribute('stroke', K.ol); o.n.setAttribute('stroke-width', 14); }
          if (st === 'mot') { const k = 1.9 * (0.8 + 0.2 * E.back(seg(t, o.w.t0 - 0.03, o.w.t0 + 0.12))); o.n.setAttribute('transform', `scale(${k.toFixed(3)}) translate(${-o.x} ${-o.y + 20})`); return; }
          const p = seg(t, o.w.t0 - 0.03, o.w.t0 + 0.12);
          o.n.setAttribute('transform', `translate(${o.x} ${o.y}) scale(${(said ? 0.85 + 0.15 * E.back(p) : 1).toFixed(3)}) translate(${-o.x} ${-o.y})`);
        });
      });
    },
  };
};

// ======================= Rendu =======================
window.DUR = TL.dur;
const QS = new URLSearchParams(location.search);
const COVER = QS.has('cover') ? { t: +QS.get('cover'), title: QS.get('title') || '' } : null;
let coverG = null;
window.render = t => {
  if (COVER) { t = COVER.t; SUBS_ON = false; }
  if (QS.has('sub')) SUB_STYLE = QS.get('sub');      // essai rapide d'un style de sous-titres
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
  LAST.cam = cam; LAST.z = z;
  // format de l'image : en 16:9 la caméra cadre plus serré et plus bas (les personnages) ; en 4:5, un peu plus serré
  let zz = z, cy = cam.y;
  if (LANDSCAPE) { zz = Math.max(1.12, z * 1.15) * VH / 1080; cy = cam.z >= 1.5 ? cam.y - 140 : cam.y >= 950 ? cam.y + 110 : cam.y - 30; }
  else if (VH !== 1920) { cy = cam.y - (960 - 190 - VH / 2) / z; }        // 4:5 : la bande y 190 à 1540 du vertical, où tout l'important se trouve
  LAST.zz = zz; LAST.cy = cy;
  WORLD.setAttribute('transform', `translate(${VW / 2} ${VH / 2}) scale(${zz.toFixed(4)}) translate(${(-cam.x).toFixed(2)} ${(-cy).toFixed(2)})`);
  HUD.setAttribute('transform', HUDT.str);
  let fl = 0;
  FLASH.setAttribute('width', VW); FLASH.setAttribute('height', VH);
  for (const c of CUTS) if (t >= c && t < c + 0.08) fl = Math.max(fl, 0.85 * (1 - (t - c) / 0.08));
  for (const c of FLASHES) if (t >= c && t < c + 0.25) fl = Math.max(fl, 1 - (t - c) / 0.25);
  op(FLASH, fl);
  if (SUBS_ON) SUBS.update(t); else SUBS.update(-1);
  OVERLAYS.forEach(f => f(t));
  if (COVER && COVER.title) {
    if (!coverG) { coverG = el('g', {}, HUD); const st = sticker(coverG, COVER.title, { col: K.yellow, fill: K.white, x: W / 2, y: H * 0.2, rot: -4, t0: -1, t1: 1e9, size: Math.min(110, 1700 / COVER.title.length) }); st.update(0.5); }
  }
  if (typeof drawWipes === 'function') drawWipes(HUD, t);
};
const LAST = { cam: { x: 540, y: 960 }, z: 1, zz: 1, cy: 960 };
// Boîtes de tous les textes visibles à t, en pixels écran (caméra comprise), sous-titres compris : pour check.py.
window.BOXES = t => {
  window.render(t);
  const { cam, zz, cy } = LAST, sx = x => VW / 2 + (x - cam.x) * zz, sy = y => VH / 2 + (y - cy) * zz, hx = HUDT.x, hy = HUDT.y;
  const out = TEXTREG.filter(x => t >= x.t0 && t < x.t1).map(b => b.space === 'hud' ? { id: b.id, text: b.text, x0: hx(b.x0), y0: hy(b.y0), x1: hx(b.x1), y1: hy(b.y1) }
    : { id: b.id, text: b.text, x0: sx(b.x0), y0: sy(b.y0), x1: sx(b.x1), y1: sy(b.y1) });
  if (SUBS_ON && SUBS) for (const it of SUBS.items) if (t >= it.c.t0 && t < it.c.t1) out.push({ id: 'sous-titre', text: it.c.map(w => w.w).join(' '), x0: hx(540 - it.pw / 2), y0: hy(Math.min(SUB_Y, 1490 - it.phh / 2) - it.phh / 2), x1: hx(540 + it.pw / 2), y1: hy(Math.min(SUB_Y, 1490 - it.phh / 2) + it.phh / 2) });
  return out;
};
window.SPEECH = () => TEXTREG.filter(x => x.speech).map(({ id, text, t0, t1 }) => ({ id, text, t0, t1 }));
window.TEXTS = t => TEXTREG.filter(x => !x.speech && t >= x.t0 && t < x.t1).map(({ id, text, x0, y0, x1, y1 }) => ({ id, text, x0, y0, x1, y1 }));
Object.defineProperty(window, 'SUBCUES', { get: () => (SUBS || (SUBS = buildSubs())).chunks.map(c => ({ t0: +c.t0.toFixed(3), t1: +c.t1.toFixed(3), text: c.map(w => w.w).join(' ') })) });
