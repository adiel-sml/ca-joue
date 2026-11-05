/* Captures de l'interface pour un film de motion : écrans entiers et morceaux (boutons, cartes, listes) avec leur position.
   node tools/ui_capture.cjs <url> <étapes.json> [--desktop] [--dpr 3]
   Étapes (tableau JSON) :
     ["goto", "/chemin"]          ["click", "sélecteur"]      ["type", "sélecteur", "texte"]   ["wait", ms]   ["tick", ms d'horloge simulée]
     ["scroll", y]                ["eval", "code js"]          ["storage", {clé: valeur}]  (localStorage, puis rechargement)
     ["shot", "nom"]              écran visible → assets/ui/nom.png
     ["full", "nom"]              page entière (pour la faire défiler dans le téléphone) → assets/ui/nom.png
     ["part", "nom", "sélecteur"] un élément seul, avec sa boîte dans l'écran → assets/ui/nom.png
   Écrit assets/ui/ui.js : window.UI = { page: [l, h], screens: {nom: fichier}, parts: {nom: {file, box: [x, y, l, h], page}} }.
   Horloge simulée et hasard fixé : deux captures donnent les mêmes images. Les erreurs de la page sont affichées. */
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const args = process.argv.slice(2), url = args[0], steps = JSON.parse(fs.existsSync(args[1] || '') ? fs.readFileSync(args[1], 'utf8') : (args[1] || '[]'));
const desktop = args.includes('--desktop'), dpr = +(args[args.indexOf('--dpr') + 1] || (desktop ? 2 : 3)) || 3;
const VP = desktop ? { width: 1440, height: 900 } : { width: 390, height: 844 };
const OUT = path.resolve('assets/ui'); fs.mkdirSync(OUT, { recursive: true });
const UI = fs.existsSync(path.join(OUT, 'ui.json')) ? JSON.parse(fs.readFileSync(path.join(OUT, 'ui.json'), 'utf8')) : { screens: {}, parts: {} };
UI.page = [VP.width, VP.height];
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: VP, deviceScaleFactor: dpr });
  p.on('pageerror', e => console.log('erreur de la page :', e.message));
  await p.addInitScript(() => { let s = 20261104; Math.random = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; });
  await p.clock.install(); await p.goto(url); await p.clock.runFor(600);
  const base = new URL(url);
  for (const [k, a, c] of steps) {
    if (k === 'goto') { await p.goto(new URL(a, base).href); await p.clock.runFor(600); }
    else if (k === 'click') { await p.click(a, { timeout: 8000 }); await p.clock.runFor(350); }
    else if (k === 'type') { await p.fill(a, ''); await p.type(a, c); await p.clock.runFor(200); }
    else if (k === 'wait') await p.waitForTimeout(a);
    else if (k === 'tick') await p.clock.runFor(a);
    else if (k === 'scroll') { await p.evaluate(y => window.scrollTo(0, y), a); await p.clock.runFor(200); }
    else if (k === 'eval') await p.evaluate(a);
    else if (k === 'storage') { await p.evaluate(o => { for (const [kk, v] of Object.entries(o)) localStorage.setItem(kk, typeof v === 'string' ? v : JSON.stringify(v)); }, a); await p.reload(); await p.clock.runFor(600); }
    else if (k === 'shot' || k === 'full') { const f = `assets/ui/${a}.png`; await p.screenshot({ path: f, fullPage: k === 'full' }); UI.screens[a] = f; console.log('écran', a); }
    else if (k === 'part') {
      const h = await p.$(c); if (!h) { console.log('élément introuvable pour', a, ':', c); process.exitCode = 1; continue; }
      const bb = await h.boundingBox(), sy = await p.evaluate(() => window.scrollY), f = `assets/ui/${a}.png`;
      await h.screenshot({ path: f }); UI.parts[a] = { file: f, box: [bb.x, bb.y + 0, bb.width, bb.height].map(v => Math.round(v * 10) / 10), page: UI.page, scrollY: sy };
      console.log('morceau', a, UI.parts[a].box.join(' '));
    } else { console.log('étape inconnue', k); process.exitCode = 1; }
  }
  fs.writeFileSync(path.join(OUT, 'ui.json'), JSON.stringify(UI, null, 1));
  fs.writeFileSync(path.join(OUT, 'ui.js'), 'window.UI = ' + JSON.stringify(UI) + ';\n');
  await b.close();
})();
