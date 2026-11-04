/* Catalogue des lieux du kit, en vignettes (avec deux personnes pour l'échelle) : node tools/lieux.cjs → lieux.png */
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const kit = path.resolve(__dirname, '..');
const names = ['placeRoom', 'placeStreet', 'placePark', 'placeBoard', 'placeOffice', 'placeCafe', 'placeBedroom', 'placeShop', 'placeBus', 'pluie', 'nuit'];
const TW = 1080, TH = 1920, S = 0.25, COLS = 6, W = COLS * TW * S + (COLS + 1) * 20, H = 2 * (TH * S + 60) + 20;
const html = `<!doctype html><meta charset=utf-8><link rel=stylesheet href="file://${kit}/fonts/fonts.css"><style>body{margin:0;background:#fff}</style>
<svg id=s width=${W} height=${H} xmlns="http://www.w3.org/2000/svg"></svg>
<script>window.TL={B:.5,BAR:2,dur:1,S:{},lines:[]};window.CAST_DATA=null;</script>
<script src="file://${kit}/engine.js"></script><script src="file://${kit}/people.js"></script><script src="file://${kit}/story.js"></script>
<script>document.fonts.ready.then(()=>{const s=document.getElementById('s');window.HUD=s;
${JSON.stringify(names)}.forEach((n,i)=>{const x=20+(i%${COLS})*(${TW * S}+20),y=20+Math.floor(i/${COLS})*(${TH * S}+60);
 const cp=el('clipPath',{id:'c'+i},s);el('rect',{width:${TW},height:${TH}},cp);
 const g=el('g',{transform:'translate('+x+' '+y+') scale(${S})'},s);const inner=el('g',{'clip-path':'url(#c'+i+')'},g);
 if(n==='pluie'){placeStreet(inner);rain(inner)(0.3);}else if(n==='nuit'){placePark(inner);night(inner);}else{const u=window[n](inner);if(n==='placeRoom')sofa(inner,540);if(n==='placeOffice')desk(inner,700);if(typeof u==='function')u(0.5);}
 [[300,{skin:SKIN[1],hair:'short',hat:'cap',shirt:'#4FC3F7'}],[780,{skin:SKIN[2],hair:'puff',shirt:'#FFD45E'}]].forEach(([px,o])=>{const w=el('g',{transform:'translate('+px+' '+FLOOR+') scale(.95)'},inner);pose(person(w,o),{mood:'joie'});});
 txt(s,n,{x:x,y:y+${TH * S}+34,'font-size':24,'font-family':'Fredoka','font-weight':600,fill:'#333'});});window.DONE=true;});</script>`;
const tmp = path.join(require('os').tmpdir(), 'lieux-' + process.pid + '.html'); fs.writeFileSync(tmp, html);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: Math.ceil(W), height: Math.ceil(H) } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('file://' + tmp); await p.waitForFunction(() => window.DONE || null, null, { timeout: 30000 }).catch(() => {});
  if (errs.length) { console.error(errs.join('\n')); process.exitCode = 1; }
  await p.screenshot({ path: 'lieux.png' }); await b.close(); fs.unlinkSync(tmp); console.log('lieux.png'); })();
