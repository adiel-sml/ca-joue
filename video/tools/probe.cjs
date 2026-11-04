/* Ouvre le film dans Chromium et évalue une fonction de la page à plusieurs instants.
   node probe.cjs <dossier du film> <WxH> <BOXES|TEXTS|SUBCUES|DUR> [t …]   →  JSON sur la sortie standard */
const http = require('http'), fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [dir, size = '1080x1920', what = 'BOXES', ...ts] = process.argv.slice(2);
const [W, H] = size.split('x').map(Number);
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json' };
const srv = http.createServer((q, r) => { const f = path.join(dir, decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html');
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); }); });
srv.listen(0, '127.0.0.1', async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`http://127.0.0.1:${srv.address().port}/index.html?size=${size}`);
  await p.waitForFunction(() => window.READY, null, { timeout: 180000 });
  let out;
  if (what === 'DUR') out = await p.evaluate(() => window.DUR);
  else if (what === 'SUBCUES') out = await p.evaluate(() => window.SUBCUES);
  else if (what === 'SPEECH') out = await p.evaluate(() => window.SPEECH());
  else out = await p.evaluate(([w, ts]) => ts.map(t => ({ t, items: window[w](t) })), [what, ts.map(Number)]);
  if (errs.length) { console.error('erreurs de la page :', errs.join(' | ')); process.exitCode = 1; }
  console.log(JSON.stringify(out)); await b.close(); srv.close();
});
