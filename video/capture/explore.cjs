const {chromium}=require('playwright');
const OUT=__dirname+'/raw';
const ids="mime taboo tu quiz num av nhie wyr bomb tvm mys uc lg spy most dico chain know future who2 wave dare2 talk".split(" ");
const R=[["Léa","f"],["Tom","h"],["Inès","f"],["Max","h"],["Zoé","f"]].map(([n,g],i)=>({id:"p"+i,name:n,g,av:g+i}));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
p.on('pageerror',e=>console.log('ERR',e.message));
const acts=async()=>(await p.$$eval('[data-act]',l=>l.filter(x=>x.offsetParent).map(x=>x.dataset.act+(x.dataset.arg?'='+x.dataset.arg:'')))).join(' ');
const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:`${OUT}/${n}.png`});console.log(n,'|',await acts());};
const c=s=>p.click(s,{timeout:8000});
await p.goto('http://localhost:4173/');
await p.evaluate(([ids,R])=>{localStorage.clear();localStorage.setItem('cajoue:rulesSeen',JSON.stringify(ids));localStorage.setItem('cajoue:roster',JSON.stringify(R));localStorage.setItem('cajoue:installHidden','true');},[ids,R]);await p.reload();
await shot('x-home');
const back=async()=>{await p.goto("http://localhost:4173/");await p.waitForTimeout(300);};
for (const [g,steps] of [['mime',['teamsGo','turnStart']],['bomb',['bombStart']],['uc',['ucGo','ucShow']],['know',[]],['av',['avPick=v']],['wyr',[]],['lg',[]]]) {
  await c(`[data-act=open][data-arg=${g}]`);await shot(`x-${g}-0`);let i=1;
  for (const s of steps){const [a,arg]=s.split('=');await c(`[data-act=${a}]${arg?`[data-arg="${arg}"]`:''}`);await shot(`x-${g}-${i++}`);}
  await back();await p.waitForTimeout(200);
}
await b.close();})();
