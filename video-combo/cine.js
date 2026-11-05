// Style cinéma (pub produit) : fond noir profond, lumière de la couleur du produit, téléphone en vraie perspective 3D,
// éléments qui sortent de l'écran vers la caméra, un mot fort à l'écran sur le mot dit par la voix, plans courts.
// Calque HTML au-dessus de la scène SVG (transformations CSS 3D, rendues par Chromium image par image). Tout dépend de t.
//   cineScene(t0, t1, build)   build(st, s) → update(t) ; st.world (espace 3D), st.cam(t, {x, y, z, rx, ry}), st.bg, st.top (écran)
//   node3(parent, html?, style)   un élément ; place(e, {x, y, z, rx, ry, rz, s, o, b})   (b : flou en px)
//   phone3d(parent, {w, screenBg})   téléphone : set(src, scroll, aspect), app(x, y), el
//   light(parent, col, r)   nappe de lumière (couleur du produit) ; floor(parent)   sol de points en perspective
//   cardImg(parent, src, w, h, r)   un morceau d'interface capturé, ombré ; pill(parent, {col, size})   pastille de chiffre
//   caption(text, t0, t1, {y, size, col, font})   le mot fort, en haut, synchronisé sur la voix (enregistré pour les contrôles)
//   wordAt(L, mot)   le temps où la voix dit ce mot ; countTo(t, t0, dur, from, to)   valeur qui roule
//   tap(parent)   le doigt qui touche (cercle qui s'enfonce puis onde)
//   troupe(parent, {w, h, rim})   bonhommes doodle (people.js, acting.js) découpés dans l'espace 3D : add(id, x, s) → {w, c, at()}
'use strict';
const FONT_T = (window.PALETTE && PALETTE.polices && PALETTE.polices.titre) || 'Inter';
const FONT_X = (window.PALETTE && PALETTE.polices && PALETTE.polices.texte) || 'Inter';
const CINE = (() => {
  const root = document.createElement('div'); root.id = 'cine';
  Object.assign(root.style, { position: 'absolute', left: 0, top: 0, width: VW + 'px', height: VH + 'px', overflow: 'hidden', pointerEvents: 'none' });
  const frame = document.createElement('div');
  const k = Math.min(VW / 1080, VH / 1920);
  Object.assign(frame.style, { position: 'absolute', left: ((VW - 1080 * k) / 2) + 'px', top: ((VH - 1920 * k) / 2) + 'px', width: '1080px', height: '1920px', transform: `scale(${k})`, transformOrigin: '0 0' });
  root.appendChild(frame); document.body.appendChild(root);
  return { root, frame, k };
})();
function node3(parent, html = '', style = {}, tag = 'div') {
  const e = document.createElement(tag); if (html) e.innerHTML = html;
  Object.assign(e.style, { position: 'absolute', left: 0, top: 0, transformStyle: 'preserve-3d', ...style });
  parent.appendChild(e); return e;
}
// Place un élément : (x, y) est son centre dans l'espace 1080×1920, z vers la caméra, rotations en degrés, o opacité, b flou.
function place(e, p) {
  const w = e._w ?? (e._w = parseFloat(e.style.width) || 0), h = e._h ?? (e._h = parseFloat(e.style.height) || 0);
  e.style.transform = `translate3d(${((p.x ?? 540) - w / 2).toFixed(2)}px, ${((p.y ?? 960) - h / 2).toFixed(2)}px, ${(p.z || 0).toFixed(2)}px) rotateX(${(p.rx || 0).toFixed(2)}deg) rotateY(${(p.ry || 0).toFixed(2)}deg) rotateZ(${(p.rz || 0).toFixed(2)}deg) scale(${(p.s ?? 1).toFixed(4)})`;
  const o = p.o ?? 1; e.style.opacity = o.toFixed(3); e.style.visibility = o < 0.003 ? 'hidden' : 'visible';
  e.style.filter = ((e._f || '') + (p.b > 0.3 ? ` blur(${p.b.toFixed(2)}px)` : '')).trim();
}
const rgba = (hex, a) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${a})`; };
// Une scène cinéma : un fond noir, une lumière, un espace 3D avec sa caméra (perspective 1700 px), un calque d'écran (textes).
function cineScene(t0, t1, build, o = {}) {
  const sc = node3(CINE.frame, '', { width: '1080px', height: '1920px', overflow: 'hidden', background: o.bg || '#050507', perspective: (o.persp || 1700) + 'px', perspectiveOrigin: '540px 960px', transformStyle: 'flat' });
  const bg = node3(sc, '', { width: '1080px', height: '1920px' });
  const world = node3(sc, '', { width: '1080px', height: '1920px', transformOrigin: '540px 960px' });
  const top = node3(sc, '', { width: '1080px', height: '1920px', transformStyle: 'flat' });
  const st = { sc, bg, world, top, t0, t1,
    // caméra : on regarde le point (x, y) ; z > 0 rapproche ; rx, ry inclinent tout l'espace
    cam(c) { world.style.transform = `translateZ(${(c.z || 0).toFixed(1)}px) rotateX(${(c.rx || 0).toFixed(2)}deg) rotateY(${(c.ry || 0).toFixed(2)}deg) translate(${(540 - (c.x ?? 540)).toFixed(1)}px, ${(960 - (c.y ?? 960)).toFixed(1)}px)`; } };
  sc.style.display = 'none';
  CUTS.push(t0);
  scene(t0, t1, (g, s) => {
    el('rect', { x: -2000, y: -2000, width: 6000, height: 6000, fill: o.bg || '#050507' }, g);
    const upd = build(st, s);
    return t => { upd(t); };
  });
  OVERLAYS.push(t => { sc.style.display = t >= t0 && t < t1 ? '' : 'none'; });
  return st;
}
// Nappe de lumière douce (la couleur du produit, jamais un dégradé violet) ; placer avec place().
function light(parent, col, r = 700, a = 0.55) { return node3(parent, '', { width: 2 * r + 'px', height: 2 * r + 'px', borderRadius: '50%', background: `radial-gradient(circle, ${rgba(col, a)} 0%, ${rgba(col, a * 0.35)} 35%, rgba(0,0,0,0) 70%)` }); }
// Sol de points en perspective, très discret.
function floor(parent, o = {}) { return node3(parent, '', { width: '2600px', height: '2600px', backgroundImage: `radial-gradient(${o.col || 'rgba(255,255,255,0.16)'} 1.6px, transparent 2px)`, backgroundSize: '44px 44px',
  maskImage: 'radial-gradient(circle, black 20%, transparent 62%)', WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 62%)' }); }
function cimg(parent, src, style = {}) {
  const im = node3(parent, '', style, 'img'); im.src = src; im.draggable = false;
  LOADS.push(new Promise(r => { if (im.complete && im.naturalWidth) r(); im.addEventListener('load', r); im.addEventListener('error', () => { console.error('image manquante ' + src); r(); }); }));
  return im;
}
// Téléphone en 3D : vrai coin arrondi, liseré clair, reflet qui glisse, barre d'état ; écran = captures de l'appli.
function phone3d(parent, o = {}) {
  const w = o.w || 560, sh = w * 844 / 390 + w * 0.12, bz = w * 0.035, R = w * 0.15;
  const el_ = node3(parent, '', { width: (w + 2 * bz) + 'px', height: (sh + 2 * bz) + 'px', borderRadius: (R + bz) + 'px', background: 'linear-gradient(160deg, #3A3B40, #141518 40%, #0B0B0D)',
    boxShadow: `0 60px 120px rgba(0,0,0,0.7), 0 0 0 2px rgba(255,255,255,0.10) inset${o.glow ? `, 0 0 140px ${rgba(o.glow, 0.35)}` : ''}` });
  const screen = node3(el_, '', { left: bz + 'px', top: bz + 'px', width: w + 'px', height: sh + 'px', borderRadius: R + 'px', overflow: 'hidden', background: o.screenBg || '#000', transformStyle: 'flat' });
  const top = w * 0.12, ink = o.statusInk || '#FFFFFF';
  node3(screen, `<div style="position:absolute;left:${w * 0.1}px;top:${w * 0.045}px;font:600 ${w * 0.042}px ${FONT_X},Inter;color:${ink}">${o.time || '21:00'}</div>
    <div style="position:absolute;right:${w * 0.09}px;top:${w * 0.052}px;width:${w * 0.06}px;height:${w * 0.028}px;border:2px solid ${ink};border-radius:${w * 0.008}px;box-sizing:border-box;padding:2px"><div style="width:75%;height:100%;background:${ink};border-radius:2px"></div></div>`, { width: w + 'px', height: top + 'px' });
  const iw = (sh - top) * 390 / 844 > w ? w : (sh - top) * 390 / 844, k = iw / 390;
  const content = node3(screen, '', { left: ((w - iw) / 2) + 'px', top: top + 'px', width: iw + 'px', height: (sh - top) + 'px', overflow: 'hidden' });
  node3(el_, '', { left: (bz + w * 0.34) + 'px', top: (bz + w * 0.03) + 'px', width: (w * 0.32) + 'px', height: (w * 0.085) + 'px', borderRadius: (w * 0.0425) + 'px', background: '#000' });
  const glare = node3(el_, '', { left: bz + 'px', top: bz + 'px', width: w + 'px', height: sh + 'px', borderRadius: R + 'px', overflow: 'hidden', transformStyle: 'flat' });
  const sweep = node3(glare, '', { width: (w * 0.5) + 'px', height: (sh * 1.6) + 'px', background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0) 100%)' });
  const ims = {}; let cur = null;
  const ph = { el: el_, w: w + 2 * bz, h: sh + 2 * bz, k, iw, top,
    set(src, scroll = 0, aspect = 844 / 390) {
      if (src !== cur) { if (cur) ims[cur].style.display = 'none'; if (!ims[src]) ims[src] = cimg(content, src, { width: iw + 'px', height: (iw * aspect) + 'px', transformStyle: 'flat' }); ims[src].style.display = ''; cur = src; }
      ims[src].style.transform = `translateY(${(-scroll).toFixed(1)}px)`;
    },
    // point de l'appli (px d'appli) → position dans le plan du téléphone, par rapport à son centre
    app: (ax, ay) => ({ x: (ax - 195) * k, y: -(sh + 2 * bz) / 2 + bz + top + ay * k }),
    glare(p) { sweep.style.transform = `translate(${(-w * 0.6 + p * w * 1.6).toFixed(1)}px, ${(-sh * 0.3).toFixed(1)}px) rotate(18deg)`; },
  };
  ph.glare(0);
  return ph;
}
// Un morceau d'interface (capture) en carte, avec ombre portée et liseré.
function cardImg(parent, src, w, h, o = {}) {
  const c = node3(parent, '', { width: w + 'px', height: h + 'px', borderRadius: (o.r ?? 28) + 'px', overflow: 'hidden', transformStyle: 'flat',
    boxShadow: `0 40px 80px rgba(0,0,0,0.6)${o.glow ? `, 0 0 90px ${rgba(o.glow, 0.45)}` : ''}, 0 0 0 1.5px rgba(255,255,255,0.12) inset` });
  cimg(c, src, { width: w + 'px', height: h + 'px', objectFit: 'cover' }); return c;
}
// Pastille de chiffre (fond sombre, liseré et halo de la couleur) ; set(texte).
function pill(parent, o = {}) {
  const col = o.col || '#2EC4B6', size = o.size || 64;
  const p = node3(parent, '', { height: size * 1.7 + 'px', width: (o.w || size * 6) + 'px', borderRadius: size + 'px', background: 'rgba(12,14,16,0.92)', border: `3px solid ${rgba(col, 0.9)}`,
    boxShadow: `0 0 60px ${rgba(col, 0.45)}, 0 30px 60px rgba(0,0,0,0.6)`, display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'flat',
    font: `800 ${size}px ${FONT_X}, Inter`, color: o.text || '#FFFFFF', fontVariantNumeric: 'tabular-nums', letterSpacing: '-1px', whiteSpace: 'nowrap' });
  p.set = s => { if (p._s !== s) { p.textContent = s; p._s = s; } }; return p;
}
// Le mot fort à l'écran : arrive net en 0,2 s (flou → net, très léger zoom), reste, sort vite. Enregistré pour check.py.
const CAPS = [];
function caption(text, t0, t1, o = {}) {
  const size = o.size || 118, y = o.y ?? 330;
  const e = node3(CINE.frame, '', { width: '1000px', height: size * 1.3 + 'px', textAlign: 'center', font: `${o.weight || 400} ${size}px ${o.font || FONT_T}, Inter`, color: o.col || '#FFFFFF',
    letterSpacing: (o.ls ?? -2) + 'px', lineHeight: size * 1.3 + 'px', textShadow: o.shadow === false ? '' : '0 8px 40px rgba(0,0,0,0.6)', transformStyle: 'flat', zIndex: 5 });
  e.textContent = text;
  reg('cap-' + CAPS.length, text, t0, t1, 540, y, Math.min(1000, measureF(text, size, 800, 'Inter') * 1.05), size * 1.2, 'hud', o.said !== false);   // le mot répète la voix : règle « dit à voix haute »
  ev(t0, 'swish');
  const upd = t => { const v = vis(t, t0, t1 - 0.12, 0.12); place(e, { x: 540, y, o: v.o, b: v.b * 1.2, s: 1 + 0.06 * (1 - v.e) + 0.015 * clamp((t - t0) / (t1 - t0)) }); };
  CAPS.push(upd); return upd;
}
OVERLAYS.push(t => CAPS.forEach(f => f(t)));
// Temps où la voix dit un mot (premier mot qui commence ainsi, sans accents ni ponctuation).
const _n = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9']/g, '');
function wordAt(L, w, after = 0) { const x = L.words.find(q => q.t0 >= after && _n(q.w).startsWith(_n(w))); if (!x) throw new Error(`mot « ${w} » introuvable dans ${L.id}`); return x.t0; }
function countTo(t, t0, dur, a, b) { const p = clamp((t - t0) / dur); return a + (b - a) * (1 - Math.pow(1 - p, 3)); }
const fmtN = (v, d = 0) => v.toLocaleString('fr-FR', { minimumFractionDigits: d, maximumFractionDigits: d }).replace(/ /g, ' ');
// Le doigt qui touche : un disque clair qui s'enfonce puis une onde. update(t, x, y, tTouche).
function tap(parent) {
  const d = node3(parent, '', { width: '96px', height: '96px', borderRadius: '50%', background: 'rgba(255,255,255,0.85)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', transformStyle: 'flat' });
  const r = node3(parent, '', { width: '96px', height: '96px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.9)', boxSizing: 'border-box', transformStyle: 'flat' });
  return (t, x, y, tc, z = 40) => {
    const a = t - tc, inn = clamp((a + 0.35) / 0.25), out = clamp((a - 0.12) / 0.2);
    place(d, { x, y, z, s: 1 - 0.25 * Math.exp(-((a / 0.06) ** 2)), o: inn * (1 - out) });
    place(r, { x, y, z, s: 0.6 + 2 * clamp(a / 0.45), o: a >= 0 && a < 0.45 ? 1 - a / 0.45 : 0 });
  };
}

// ---------------- Bonhommes dans l'espace 3D ----------------
// Une découpe (SVG) posée dans la scène : on y met les bonhommes de cast.json, ils jouent avec actor/act/geste/danse comme
// dans les autres films ; un liseré de lumière (rim) les détache de la nuit. Sol de la découpe : y = h - 20 (floorY).
function troupe(parent, o = {}) {
  const w = o.w || 1080, h = o.h || 760;
  const d = node3(parent, '', { width: w + 'px', height: h + 'px', transformStyle: 'flat' });
  d._f = o.rim === false ? '' : `drop-shadow(0 0 2px rgba(255,255,255,0.75)) drop-shadow(0 0 22px ${rgba(o.rimCol || '#FFFFFF', 0.25)})`;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', w); svg.setAttribute('height', h); svg.setAttribute('viewBox', `0 0 ${w} ${h}`); svg.style.overflow = 'visible';
  d.appendChild(svg);
  const g = el('g', {}, svg), floorY = h - 20;
  return { el: d, g, w, h, floorY,
    add(id, x, sc = 0.95) { const wg = el('g', {}, g); const c = castPerson(wg, id); return { w: wg, c, x, s: sc, at(dx = 0, dy = 0, s2 = 1) { tf(wg, x + dx, floorY + dy, sc * s2); } }; } };
}
