/* Planche animée : chaque geste et chaque pas de danse du kit, joués par un personnage de la distribution, pour choisir à l'œil.
   node tools/gestes.cjs [cast.json] [id du personnage]  →  gestes.mp4 (12 s : gestes puis danses) et gestes.png (une image de chaque page) */
const fs = require('fs'), path = require('path'), os = require('os'), { execFileSync } = require('child_process'), { chromium } = require('playwright');
const kit = path.resolve(__dirname, '..'), castFile = path.resolve(process.argv[2] || 'cast.json');
const cast = fs.existsSync(castFile) ? JSON.parse(fs.readFileSync(castFile, 'utf8')).persos : { p: { nom: 'Perso', look: { skin: '#C68642', hair: 'puff', earring: true, shirt: '#FF4D6D' } } };
const id = process.argv[3] || Object.keys(cast)[0];
const FF = process.env.FFMPEG || (fs.existsSync(path.join(os.homedir(), '.doodle-video/bin/ffmpeg')) ? path.join(os.homedir(), '.doodle-video/bin/ffmpeg') : 'ffmpeg');
const W = 1080, H = 1920, FPS = 15, PAGE = 6;
const html = `<!doctype html><meta charset=utf-8><link rel=stylesheet href="file://${kit}/fonts/fonts.css"><style>body{margin:0;background:#FFF6E5}</style>
<svg id=s width=${W} height=${H} xmlns="http://www.w3.org/2000/svg"></svg>
<script>window.TL={B:60/120,BAR:2,beat0:0,dur:${2 * PAGE},S:{},lines:[]};</script>
<script src="file://${kit}/engine.js"></script><script src="file://${kit}/people.js"></script><script src="file://${kit}/acting.js"></script>
<script>CAST_DATA={persos:${JSON.stringify(cast)}};
document.fonts.ready.then(()=>{const s=document.getElementById('s');
 const L={t0:0.3,t1:1.6,text:'Et toi, tu viens ce soir ?',words:[['Et',.3,.42],['toi,',.42,.8],['tu',.85,.95],['viens',.95,1.2],['ce',1.2,1.3],['soir ?',1.3,1.6]].map(([w,t0,t1])=>({w,t0,t1}))};
 const loop=(t,f)=>f(t%2.4);
 const G=[['attente',t=>({})],['parle',t=>loop(t,u=>act(L,u,{dx:1}))],...['haussement','paumes','front','pouce','applaudir','coucou','compter','hanches','bras_croises','reflechir','moi','victoire','non','oui']
   .map(n=>[n.replace('_',' '),t=>loop(t,u=>geste(n,u,0.4,1.7))])];
 const D=[...DANSES,'robot'].map(n=>[n,t=>danse(t,n,0,1)]);
 const pages=[G,D].map((items,pg)=>{const g=el('g',{},s);items.forEach(([lab,f],k)=>{const c=k%4,r=Math.floor(k/4),x=135+c*270,y=60+r*465;
   const w=el('g',{},g);const p=castPerson(w,${JSON.stringify(id)});
   gtext(g,lab,x,y+430,34,{fill:'#1B1B1B',sw:0});
   const A=actor(p,t=>({...alive(t,k),...f(t)}));items[k].push(t=>{tf(w,x,y+390+(pg?hopDanse(t,0,16):0),0.82);A(t);});});
   if(pg===1){const fz=crowd(g,5,{x0:150,x1:930,y:1890,s:0.62,seed:4});items.push(['foule',null,t=>fz(t,1)]);}
   return {g,items};});
 window.draw=t=>{const pg=t<${PAGE}?0:1;pages.forEach((P,i)=>{show(P.g,i===pg);if(i===pg)P.items.forEach(it=>it[2](t));});};
 window.DONE=true;});</script>`;
const tmpd = fs.mkdtempSync(path.join(os.tmpdir(), 'gestes-')), tmp = path.join(tmpd, 'p.html'); fs.writeFileSync(tmp, html);
(async () => {
  const b = await chromium.launch(), p = await b.newPage({ viewport: { width: W, height: H } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + tmp); await p.waitForFunction(() => window.DONE || null, null, { timeout: 30000 }).catch(() => {});
  if (errs.length) { console.error(errs.join('\n')); process.exit(1); }
  const n = 2 * PAGE * FPS;
  for (let i = 0; i < n; i++) { await p.evaluate(t => window.draw(t), i / FPS); await p.screenshot({ path: path.join(tmpd, `f${String(i).padStart(4, '0')}.png`) }); }
  await b.close();
  execFileSync(FF, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(tmpd, 'f%04d.png'), '-vf', 'scale=540:960', '-pix_fmt', 'yuv420p', 'gestes.mp4']);
  execFileSync(FF, ['-y', '-loglevel', 'error', '-i', path.join(tmpd, `f${String(Math.round(1.2 * FPS)).padStart(4, '0')}.png`), '-i', path.join(tmpd, `f${String(Math.round((PAGE + 1.3) * FPS)).padStart(4, '0')}.png`), '-filter_complex', '[0][1]hstack,scale=1080:-1', 'gestes.png']);
  fs.rmSync(tmpd, { recursive: true, force: true });
  console.log('gestes.mp4 et gestes.png :', id);
})();
