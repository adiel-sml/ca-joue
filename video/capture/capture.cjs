/* Vrais écrans de Ça Joue, filmés image par image (horloge simulée), pour le téléphone du film.
   Prérequis : l'appli servie sur http://localhost:4173 (cd ca-joue && npx vite build && npx vite preview --port 4173). */
const {chromium}=require('playwright');
const OUT=__dirname+'/screens', URL='http://localhost:4173/';
const ids="mime taboo tu quiz num av nhie wyr bomb tvm mys uc lg spy most dico chain know future who2 wave dare2 talk".split(" ");
const R=[["Léa","f"],["Tom","h"],["Inès","f"],["Max","h"],["Zoé","f"]].map(([n,g],i)=>({id:"p"+i,name:n,g,av:g+i}));
(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
p.on('pageerror',e=>{console.log('ERR',e.message);process.exitCode=1;});
await p.addInitScript(()=>{let s=20261104;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};});
await p.clock.install();
const c=s=>p.click(s,{timeout:8000});
const shot=async n=>{await p.clock.runFor(120);await p.screenshot({path:`${OUT}/${n}.png`});};
const home=async()=>{await p.goto(URL);await p.evaluate(([ids,R])=>{localStorage.clear();localStorage.setItem('cajoue:rulesSeen',JSON.stringify(ids));
  localStorage.setItem('cajoue:roster',JSON.stringify(R));localStorage.setItem('cajoue:installHidden','true');localStorage.setItem('cajoue:ucRoles','[]');},[ids,R]);
  await p.reload();await p.clock.runFor(500);};
let n=0;
/* 1. accueil, défilement de toute la liste */
await home();const H=await p.evaluate(()=>document.scrollingElement.scrollHeight-innerHeight);
for(let i=0;i<=40;i++){await p.evaluate(y=>scrollTo(0,y),Math.round(H*i/40));await shot('home-'+String(i).padStart(2,'0'));}n+=41;
/* 2. Mimes : un tour, un mot trouvé au milieu */
await home();await c('[data-act=open][data-arg=mime]');await c('[data-act=teamsGo]');await c('[data-act=turnStart]');
for(let i=0;i<24;i++){if(i===12)await c('[data-act=mark][data-arg="1"]');await shot('mime-'+String(i).padStart(2,'0'));await p.clock.runFor(130);}n+=24;
/* 3. La Bombe */
await home();await c('[data-act=open][data-arg=bomb]');await c('[data-act=bombStart]');await shot('bomb');n++;
/* 4. Le gage du perdant de la Bombe */
await p.clock.runFor(61000);await shot('bomb-end');await c('[data-act=bombLoser][data-arg="Tom"]');await p.waitForTimeout(900);await shot('gage');n+=2;
/* 5. Undercover : carte cachée puis mot révélé */
await home();await c('[data-act=open][data-arg=uc]');await c('[data-act=ucGo]');await shot('uc-hide');await c('[data-act=ucShow]');await shot('uc-show');n+=2;
/* 6. Tu me connais ? */
await home();await c('[data-act=open][data-arg=know]');await c('[data-act=cpPick][data-arg="Léa"]');await c('[data-act=cpPick][data-arg="Tom"]');await c('[data-act=cpGo]');await shot('know');n++;
/* 7. Action ou Vérité, niveau Chill */
await home();await c('[data-act=open][data-arg=av]');await c('[data-act=avLevel][data-arg=chill]');await c('[data-act=avPick][data-arg=v]');await shot('av');n++;
/* 8. Tu préfères, avec des votes */
await home();await c('[data-act=open][data-arg=wyr]');for(const [w,s] of [['Léa','A'],['Tom','B'],['Inès','A']])await c(`[data-act=wyrVote][data-arg="${w}|${s}"]`);await shot('wyr');n++;
/* 9. Loup-garou : la carte du joueur qui est loup */
await home();await c('[data-act=open][data-arg=lg]');await c('[data-act=lgGo]');
for(let i=0;i<5;i++){await c('[data-act=lgShow]');const t=await p.textContent('.content');if(/Loup-garou/.test(t.split('Chaque nuit')[0])){await shot('lg');n++;break;}await c('[data-act=lgHide]');}
/* 10. Autres jeux en couple */
for(const g of ['who2','talk']){await home();await c(`[data-act=open][data-arg=${g}]`);await c('[data-act=cpPick][data-arg="Léa"]');await c('[data-act=cpPick][data-arg="Tom"]');await c('[data-act=cpGo]');await shot(g);n++;}
console.log(n,'images');await b.close();})();
