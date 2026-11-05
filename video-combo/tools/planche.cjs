/* Planche des personnages : chaque personnage de cast.json, ses émotions et ses poses.  node tools/planche.cjs [cast.json] → planche.png */
const fs = require('fs'), path = require('path'), { chromium } = require('playwright');
const kit = path.resolve(__dirname, '..'), castFile = path.resolve(process.argv[2] || 'cast.json');
const cast = JSON.parse(fs.readFileSync(castFile, 'utf8')).persos;
const ids = Object.keys(cast), moods = ['neutre', 'joie', 'rire', 'triste', 'colere', 'surprise', 'gene', 'fier', 'peur', 'doute'];
const poses = [['debout', {}], ['parle a', { mouth: 'A' }], ['parle o', { mouth: 'O' }], ['pointe', { point: 'R', mood: 'joie' }], ['bras leves', { hey: 1, mood: 'rire' }],
  ['telephone', { hold: 'phone', mood: 'joie', look: 6 }], ['assis', { sit: 1 }], ['accroupi', { crouch: 1, mood: 'surprise' }], ['trois-quarts', { turn: 1, look: 6 }], ['marche', { step: 1, armsL: 30, armsR: 8 }]];
const CW = 230, RH = 520, W = CW * 10 + 60, H = ids.length * RH * 2 + 40;
const html = `<!doctype html><meta charset=utf-8><link rel=stylesheet href="file://${kit}/fonts/fonts.css"><style>body{margin:0;background:#fff}</style>
<svg id=s width=${W} height=${H} xmlns="http://www.w3.org/2000/svg"></svg>
<script>window.TL={B:.5,BAR:2,dur:1,S:{},lines:[]};</script><script src="file://${kit}/engine.js"></script><script src="file://${kit}/people.js"></script>
<script>CAST_DATA={persos:${JSON.stringify(cast)}};document.fonts.ready.then(()=>{const s=document.getElementById('s');
const ids=${JSON.stringify(ids)},moods=${JSON.stringify(moods)},poses=${JSON.stringify(poses)};
ids.forEach((id,r)=>{[moods.map(m=>[m,{mood:m}]),poses].forEach((row,k)=>row.forEach(([lab,o],c)=>{const y=40+(r*2+k)*${RH};
 const g=el('g',{transform:'translate('+(150+c*${CW})+' '+(y+460)+')'},s);const p=castPerson(g,id);pose(p,o);
 txt(s,(c===0&&k===0?(CAST_DATA.persos[id].nom||id)+' · ':'')+lab,{x:150+c*${CW}-100,y:y+500,'font-size':22,'font-family':'Fredoka','font-weight':600,fill:'#333'});}));});
 window.DONE=true;});</script>`;
const tmp = path.join(require('os').tmpdir(), 'planche-' + process.pid + '.html'); fs.writeFileSync(tmp, html);
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: W, height: H } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); await p.goto('file://' + tmp); await p.waitForFunction(() => window.DONE || null, null, { timeout: 30000 }).catch(() => {});
  if (errs.length) { console.error(errs.join('\n')); process.exitCode = 1; }
  await p.screenshot({ path: 'planche.png' }); await b.close(); fs.unlinkSync(tmp); console.log('planche.png', ids.length, 'personnages'); })();
