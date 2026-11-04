const {chromium}=require('playwright');
const ids="mime taboo tu quiz num av nhie wyr bomb tvm mys uc lg spy most dico chain know future who2 wave dare2 talk".split(" ");
const R=[["Léa","f"],["Tom","h"],["Inès","f"],["Max","h"],["Zoé","f"]].map(([n,g],i)=>({id:"p"+i,name:n,g,av:g+i}));
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
const acts=async()=>(await p.$$eval('[data-act]',l=>l.filter(x=>x.offsetParent).map(x=>x.dataset.act+(x.dataset.arg?'='+x.dataset.arg:'')))).join(' ');
await p.goto('http://localhost:4173/');
await p.evaluate(([ids,R])=>{localStorage.clear();localStorage.setItem('cajoue:rulesSeen',JSON.stringify(ids));localStorage.setItem('cajoue:roster',JSON.stringify(R));localStorage.setItem('cajoue:installHidden','true');},[ids,R]);await p.reload();
await p.click('[data-act=open][data-arg=lg]');await p.click('[data-act=lgGo]');
for(let i=0;i<7;i++){await p.waitForTimeout(300);await p.screenshot({path:`raw/lg-${i}.png`});const a=await acts();console.log(i,a);const nx=a.split(' ').find(x=>/^lg(Show|Hide|Next|Deal|Start|Night|Go|Ok)/.test(x));if(!nx)break;const [k,v]=nx.split('=');await p.click(`[data-act=${k}]${v?`[data-arg="${v}"]`:''}`);}
await b.close();})();
