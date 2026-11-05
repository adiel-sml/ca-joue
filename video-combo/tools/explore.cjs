/* Exploration d'une appli : photographie chaque étape et liste les boutons visibles.
   node explore.cjs <url> <dossier> '[["click","[data-act=open][data-arg=mime]"],["shot","mimes"],["wait",500],["goto","/"]]'
   Étapes : click <sélecteur>, shot <nom>, wait <ms réelles>, tick <ms d'horloge simulée>, goto <chemin>, eval <js>. */
const {chromium}=require('playwright');
const [url, out, stepsJson='[]'] = process.argv.slice(2);
(async()=>{const fs=require('fs');fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
p.on('pageerror',e=>console.log('ERREUR page :',e.message));
await p.addInitScript(()=>{let s=20261104;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};});
await p.clock.install();await p.goto(url);await p.clock.runFor(500);
const list=async()=>(await p.$$eval('button, a, [role=button], [data-act], input, select',l=>l.filter(x=>x.offsetParent).map(x=>(x.dataset.act?`[data-act=${x.dataset.act}]${x.dataset.arg?`[data-arg="${x.dataset.arg}"]`:''}`:x.tagName.toLowerCase()+(x.id?'#'+x.id:''))+' '+(x.innerText||x.value||x.getAttribute('aria-label')||'').trim().slice(0,30).replace(/\s+/g,' ')))).join(' | ');
for(const [k,v] of JSON.parse(stepsJson)){
  if(k==='click')await p.click(v,{timeout:8000});else if(k==='wait')await p.waitForTimeout(+v);else if(k==='tick')await p.clock.runFor(+v);
  else if(k==='goto')await p.goto(new URL(v,url).href);else if(k==='eval')await p.evaluate(v);
  else if(k==='shot'){await p.clock.runFor(120);await p.screenshot({path:`${out}/${v}.png`});console.log(`${v}.png\n  ${await list()}`);}
}
await p.screenshot({path:`${out}/fin.png`});console.log('fin.png\n  '+await list());await b.close();})();
