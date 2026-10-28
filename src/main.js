import "@fontsource/dela-gothic-one/latin-400.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-800.css";
import "./styles.css";
import { MIME_CARDS, TABOO, AV, GAGES, AV_LEVELS, AV_PTS, AV_BONUS, TVM_THEMES, UC_PAIRS, UC_SPECIALS, UC_PTS, MYS_TYPES, MYS, TEAM_NAMES, TEAM_COLORS, GAMES } from "./content.js";

/* ---------- Outils ---------- */
const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.random()*a.length|0];
const deck = arr => { let pool=[]; return { draw(){ if(!pool.length) pool=shuffle(arr); return pool.pop(); } }; };
const store = {
  get(k,d){ try{ const v=localStorage.getItem("cajoue:"+k); return v?JSON.parse(v):d; }catch(e){ return d; } },
  set(k,v){ try{ localStorage.setItem("cajoue:"+k, JSON.stringify(v)); }catch(e){} }
};
const SAMPLE = [["Léa","f"],["Inès","f"],["Sarah","f"],["Léo","h"],["Camille","f"],["Yanis","h"]];
let players = store.get("players", null);
let genders = store.get("genders", {});
let isSample = !players;
if(!players){ players = SAMPLE.map(s=>s[0]); SAMPLE.forEach(([n,g])=>genders[n]=g); }
const savePlayers = () => { isSample=false; store.set("players", players); store.set("genders", genders); };
const gOf = n => genders[n]==="h" ? "h" : "f";
let addG = "f";

/* Classement de la soirée, tous jeux confondus */
let scores = store.get("scores", {});
function addPts(name, v){ if(!v) return; scores[name]=(scores[name]||0)+v; store.set("scores", scores); }
function toast(t){ const el=document.getElementById("toast"); if(!el) return; el.textContent=t; el.hidden=false; el.classList.remove("show"); void el.offsetWidth; el.classList.add("show"); clearTimeout(toast.t); toast.t=setTimeout(()=>el.hidden=true,1800); }
const ptsTxt = v => `${v>0?"+":""}${v} pt${Math.abs(v)>1?"s":""}`;

const others = (p, list=players) => list.filter(x=>x!==p);
function oppOf(p, list=players){
  const o = list.filter(x=>x!==p && gOf(x)!==gOf(p));
  return pick(o.length ? o : (others(p,list).length ? others(p,list) : list));
}
/* Remplit un gabarit de carte : accords {f|h} puis prénoms */
function fill(txt, ctx){
  return esc(txt)
    .replace(/\{([^{}|:]*)\|([^{}|:]*)(?::(\w+))?\}/g, (m,f,h,k) => gOf(ctx[k||"cur"])==="h" ? h : f)
    .replace(/\{(joueur|opp|p1|p2)\}/g, (m,k) => `<b>${esc(ctx[k])}</b>`);
}

let G = null;
let view = home;
let prevView = null;
let msg = "";
let adultOk = false;

let actx;
function beep(f,d){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)(); const o=actx.createOscillator(), g=actx.createGain(); o.type="triangle"; o.frequency.value=f; g.gain.setValueAtTime(.25,actx.currentTime); g.gain.exponentialRampToValueAtTime(.001,actx.currentTime+d); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime+d); }catch(e){} }
const vib = () => { try{ navigator.vibrate && navigator.vibrate([200,80,200]); }catch(e){} };

let timer = null;
function stopTimer(){ if(timer){ clearInterval(timer.id); timer=null; } }
function runTimer(sec, onEnd){
  stopTimer();
  const end = Date.now()+sec*1000;
  timer = { id:0, last:null, sec, left:sec };
  const tick = () => {
    const left = Math.max(0, Math.ceil((end-Date.now())/1000));
    timer.left = left;
    const n=document.getElementById("tnum"), b=document.getElementById("tbar");
    if(n){ n.textContent=left; n.classList.toggle("urgent", left<=10); }
    if(b) b.style.width = (100*(end-Date.now())/(sec*1000)) + "%";
    if(left<=5 && left>0 && left!==timer.last){ timer.last=left; beep(660,.08); }
    if(left===0){ stopTimer(); beep(330,.6); vib(); onEnd && onEnd(); }
  };
  timer.id = setInterval(tick, 200);
  tick();
}
const timerHTML = s => `<div class="timer"><div class="tbar"><i id="tbar" style="width:${timer?100*timer.left/timer.sec:100}%"></i></div><div class="tnum" id="tnum">${s}</div></div>`;

let wake=null;
async function keepAwake(){ try{ if(!wake && navigator.wakeLock){ wake=await navigator.wakeLock.request("screen"); wake.addEventListener("release",()=>wake=null); } }catch(e){} }
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="visible") keepAwake(); });

function go(fn){ view=fn; draw(); window.scrollTo(0,0); }
function draw(){ $app.innerHTML = view() + '<div id="toast" class="toast" hidden></div>'; }

let armed=false, armT;
const bar = (title) => `<div class="topbar"><button class="back${armed?" armed":""}" data-act="quit">${armed?"Quitter la partie ?":"‹ Jeux"}</button><span class="ttl">${esc(title)}</span><button class="ptsbtn" data-act="board">Classement</button></div>`;
const scoreRows = (entries, mark=true) => { const best=entries.length?entries[0][1]:0; return `<div class="score">${entries.map(([p,v])=>`<div class="${mark&&v===best&&v>0?"lead1":""}"><span>${esc(p)}</span><b>${v}</b></div>`).join("")}</div>`; };

/* ---------- Accueil, joueurs, classement ---------- */
function home(){
  const top = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0];
  return `<header class="hero"><div class="logo">Ça Joue<span>&nbsp;!</span></div>
  <p>Six jeux pour animer la soirée. Un seul téléphone, on se le passe.</p></header>
  <button class="pbar" data-act="players"><div class="chips">${players.map(p=>`<span class="chip g${gOf(p)}">${esc(p)}</span>`).join("")||'<span class="note">Aucun joueur</span>'}</div><span class="edit">${players.length} · Modifier</span></button>
  ${isSample?'<p class="note warn">Prénoms d\'exemple. Touche « Modifier » pour ajouter tes amis.</p>':""}
  <div class="games">${GAMES.map(g=>`<button class="game" style="--c:${g.c}" data-n="${g.min}+" data-act="open" data-arg="${g.id}" aria-label="${esc(g.name)}, ${g.min} joueurs minimum"><span class="tag">${g.tag}</span><h3>${esc(g.name)}</h3><p>${g.desc}</p></button>`).join("")}</div>
  <button class="pbar" data-act="board"><div style="flex:1;min-width:0"><span class="label">Classement de la soirée</span><div style="font-weight:700;margin-top:2px">${top&&top[1]>0?`En tête : ${esc(top[0])} · ${top[1]} pts`:"Les points de tous les jeux s'additionnent ici."}</div></div><span class="edit">Voir</span></button>
  <p class="note" style="text-align:center">Le chiffre sur chaque jeu = nombre de joueurs minimum. Monte le son pour le chrono.</p>`;
}
function playersScreen(){
  const want = G && G.want ? GAMES.find(g=>g.id===G.want) : null;
  return `<div class="topbar"><button class="back" data-act="home">‹ Jeux</button><span class="ttl">Joueurs</span></div>
  <h2>Qui joue ce soir ?</h2>
  ${msg?`<p class="note warn">${msg}</p>`:""}
  <p class="note">Le sexe sert à adapter les cartes : un garçon tombe sur une fille pour les bisous, « la reine » ou « le roi », etc.${isSample?" La liste d'exemple sera remplacée dès que tu ajoutes un prénom.":""}</p>
  <form id="addform" class="stack">
    <div class="seg">${[["f","Fille"],["h","Garçon"]].map(([k,l])=>`<button type="button" class="${addG===k?"on":""}" data-act="addG" data-arg="${k}">${l}</button>`).join("")}</div>
    <div class="addrow"><input id="pname" maxlength="18" placeholder="Prénom" autocomplete="off" enterkeyhint="done" aria-label="Prénom"><button class="btn small" type="submit">Ajouter</button></div>
  </form>
  <ul class="plist">${players.map((p,i)=>`<li><span>${esc(p)}</span><button class="gtag g${gOf(p)}" data-act="toggleG" data-arg="${i}" aria-label="Changer le sexe de ${esc(p)}">${gOf(p)==="h"?"Garçon":"Fille"}</button><button class="x" data-act="rmP" data-arg="${i}" aria-label="Retirer ${esc(p)}">×</button></li>`).join("")}</ul>
  <div class="stack">
    ${want?`<button class="btn" data-act="open" data-arg="${want.id}" ${players.length<want.min?"disabled":""}>Jouer à ${esc(want.name)}</button>`:`<button class="btn" data-act="home">C'est bon (${players.length})</button>`}
    ${players.length?'<button class="link" data-act="clearP">Vider la liste</button>':""}
  </div>`;
}
let resetArmed=false;
function board(){
  const s=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  return `<div class="topbar"><button class="back" data-act="boardBack">‹ Retour</button><span class="ttl">Classement</span></div>
  <h2>Classement de la soirée</h2>
  <p class="note">Mimes et Mot interdit : chaque membre de l'équipe gagne les points du tour. Action ou Vérité : +1 vérité, +2 action, bonus en Épicé et +18. Undercover : civils +2, Undercover +5, Mr White +6 en cas de victoire. 2 vérités 1 mensonge et Jeu mystère : points des manches.</p>
  ${s.length?scoreRows(s):'<p class="note">Aucun point pour l\'instant. Lance un jeu !</p>'}
  ${s.length?`<button class="link" data-act="boardReset">${resetArmed?"Sûr ? Touche encore pour tout effacer":"Remettre le classement à zéro"}</button>`:""}`;
}

/* ---------- Mimes & Mot interdit ---------- */
function makeTeams(){
  const sh = shuffle(players);
  G.teams = Array.from({length:G.nTeams},(_,i)=>({name:TEAM_NAMES[i], c:TEAM_COLORS[i], members:[], score:0, k:0}));
  sh.forEach((p,i)=>G.teams[i%G.nTeams].members.push(p));
}
function teamSetup(){
  const max = Math.min(4, players.length);
  const solo = G.teams.some(t=>t.members.length===1);
  return `${bar(G.kind==="mime"?"Mimes":"Mot interdit")}
  <h2>${G.kind==="mime"?"Mimes":"Mot interdit"}</h2>
  <p class="lead" style="font-size:16px">${G.kind==="mime"?"Une personne mime, son équipe devine. Interdit de parler, de faire des bruits ou de montrer un objet.":"Une personne fait deviner le mot avec des phrases, sans jamais dire le mot ni les 4 mots en rouge. L'équipe adverse surveille."}</p>
  <div class="panel"><span class="label">Nombre d'équipes</span>
    <div class="seg">${[2,3,4].map(n=>`<button class="${G.nTeams===n?"on":""}" data-act="nTeams" data-arg="${n}" ${n>max?"disabled":""}>${n}</button>`).join("")}</div>
    <div class="teams">${G.teams.map(t=>`<div class="team" style="--tc:${t.c}"><b>${esc(t.name)}</b><small>${t.members.map(esc).join(", ")}</small></div>`).join("")}</div>
    ${solo?'<p class="note">Équipe d\'une seule personne : ce sont les autres joueurs qui devinent, et les points vont à celui ou celle qui fait deviner.</p>':""}
    <button class="btn alt" data-act="reTeams">Mélanger les équipes</button>
  </div>
  <div class="panel"><span class="label">Durée d'un tour</span>
    <div class="seg">${[45,60,90].map(n=>`<button class="${G.dur===n?"on":""}" data-act="dur" data-arg="${n}">${n} s</button>`).join("")}</div>
  </div>
  <button class="btn" data-act="teamsGo">Commencer</button>`;
}
const teamScore = () => { const best=Math.max(...G.teams.map(t=>t.score)); return `<div class="score">${G.teams.map(t=>`<div class="${t.score===best&&best>0?"lead1":""}" style="--tc:${t.c}"><i class="dot"></i><span>${esc(t.name)} <small class="note">${t.members.map(esc).join(", ")}</small></span><b>${t.score}</b></div>`).join("")}</div>`; };
const actorOf = t => t.members[t.k % t.members.length];
function turnIntro(){
  const t = G.teams[G.cur];
  const verb = G.kind==="mime"?"mime":"fait deviner";
  const who = t.members.length===1 ? `${verb} pour les autres joueurs. Les points vont à son équipe.` : `${verb} pour son équipe. Les autres équipes ne regardent pas l'écran.`;
  return `${bar("Tour "+G.round)}
  <div class="center" style="--gc:${t.c};padding-top:12px">
    <span class="kicker">${esc(t.name)}</span>
    <div class="big">${esc(actorOf(t))}</div>
    <p class="lead">${who}</p>
  </div>
  <button class="btn" style="background:${t.c}" data-act="turnStart">Lancer le chrono · ${G.dur} s</button>
  <div class="panel"><span class="label">Scores</span>${teamScore()}</div>
  <button class="link" data-act="teamEnd">Terminer la partie</button>`;
}
function cardHTML(){
  const c=G.card;
  if(G.kind==="mime") return `<div class="card flip"><span class="cat">${esc(c.cat)}</span><div class="word">${esc(c.w)}</div></div>`;
  return `<div class="card flip"><div class="word">${esc(c.w)}</div><div class="forbid">${c.f.map(f=>`<span>${esc(f)}</span>`).join("")}</div></div>`;
}
function turnPlay(){
  const t = G.teams[G.cur];
  const pts = G.log.reduce((s,l)=>s+l.v,0);
  return `<div style="--gc:${t.c};display:flex;flex-direction:column;gap:16px">
  ${timerHTML(timer?timer.left:G.dur)}
  <div class="row" style="align-items:center"><span class="kicker" style="flex:3">${esc(t.name)} · ${esc(actorOf(t))}</span><span class="kicker" style="text-align:right">${ptsTxt(pts)}</span></div>
  <div id="cardzone">${cardHTML()}</div>
  <div class="row">
    <button class="btn alt" data-act="mark" data-arg="0">Passer</button>
    <button class="btn good" data-act="mark" data-arg="1">Trouvé</button>
  </div>
  ${G.kind==="taboo"?'<button class="btn bad" data-act="mark" data-arg="-1">Mot interdit dit ! (−1)</button>':""}
  <button class="link" data-act="turnStop">Arrêter le tour</button></div>`;
}
function turnEnd(){
  const t = G.teams[G.cur];
  const pts = G.log.reduce((s,l)=>s+l.v,0);
  const lbl = v => v===1?"+1":v===-1?"−1":"0";
  return `${bar("Fin du tour")}
  <div class="center" style="--gc:${t.c}"><span class="kicker">Temps écoulé</span><div class="big">${ptsTxt(pts)}</div><p class="note">Touche une ligne pour corriger. Le dernier mot compte s'il a été trouvé au buzzer.</p></div>
  <div class="log">${G.log.map((l,i)=>`<button data-act="toggle" data-arg="${i}"><span>${esc(l.c.w)}${l.last?' <small class="note">(dernier mot)</small>':""}</span><b class="v ${l.v===1?"v1":l.v===-1?"vm":"v0"}">${lbl(l.v)}</b></button>`).join("")||'<p class="note">Aucun mot cette fois.</p>'}</div>
  <button class="btn" style="background:${t.c}" data-act="turnValidate">Valider et équipe suivante</button>`;
}
function teamFinal(){
  const s=[...G.teams].sort((a,b)=>b.score-a.score);
  const tie = s[0].score===s[1].score;
  return `${bar("Résultats")}
  <div class="center" style="--gc:${s[0].c};padding-top:12px"><span class="kicker">${tie?"Égalité !":"Victoire"}</span><div class="big">${tie?"Match nul":esc(s[0].name)}</div>${tie?"":`<p class="lead">+3 pts bonus au classement pour ${s[0].members.map(esc).join(", ")}</p>`}</div>
  <div class="panel">${teamScore()}</div>
  <button class="btn" data-act="teamsAgain">Rejouer avec les mêmes équipes</button>
  <button class="btn ghost" data-act="home">Retour aux jeux</button>`;
}

/* ---------- Action ou Vérité ---------- */
const avCur = () => G.order[G.i % G.order.length];
function avTurn(){
  if(G.gate) return `${bar("Action ou Vérité")}
  <div class="center" style="--gc:var(--bad);padding-top:16px"><span class="kicker">Niveau +18</span><h2>Contenu sexuel explicite</h2>
  <p class="lead">Réservé aux adultes. Tout le monde doit être majeur et partant. Chacun peut refuser une carte avec le joker, sans se justifier.</p></div>
  <button class="btn bad" data-act="avAdult">On est tous majeurs, on y va</button>
  <button class="btn ghost" data-act="avGateNo">Rester au niveau actuel</button>`;
  return `${bar("Action ou Vérité")}
  <div class="seg">${AV_LEVELS.map(([k,l])=>`<button class="${G.level===k?"on":""}" data-act="avLevel" data-arg="${k}">${l}</button>`).join("")}</div>
  <div class="center" style="--gc:var(--rose);padding-top:20px"><span class="kicker">À toi de jouer</span><div class="big">${esc(avCur())}</div><p class="lead">Action ou vérité ?</p></div>
  <div class="row"><button class="btn" style="background:var(--sky)" data-act="avPick" data-arg="v">Vérité · ${ptsTxt(AV_PTS.v+AV_BONUS[G.level])}</button><button class="btn" style="background:var(--hot)" data-act="avPick" data-arg="a">Action · ${ptsTxt(AV_PTS.a+AV_BONUS[G.level])}</button></div>
  <button class="btn ghost" data-act="avPick" data-arg="r">Au hasard</button>
  <button class="link" data-act="avSkip">Passer à la personne suivante</button>`;
}
function avCard(){
  const lab = {v:"Vérité",a:"Action",g:"Gage"}[G.type], col={v:"var(--sky)",a:"var(--hot)",g:"var(--bad)"}[G.type];
  const pts = G.type==="g" ? 0 : AV_PTS[G.type]+AV_BONUS[G.level];
  return `${bar("Action ou Vérité")}
  <div class="center" style="--gc:${col}"><span class="kicker">${lab} pour</span><h2>${esc(avCur())}</h2></div>
  <div class="card flip" style="--gc:${col}"><span class="cat">${lab}${G.type!=="g"?" · "+AV_LEVELS.find(l=>l[0]===G.level)[1]:""}</span><div class="txt">${G.text}</div></div>
  <button class="btn good" data-act="avNext">${pts?`Fait ! ${ptsTxt(pts)} et au suivant`:"Fait ! Au suivant"}</button>
  ${G.type!=="g"?'<button class="btn ghost" data-act="avJoker">Joker : je prends un gage (0 pt)</button>':""}`;
}

/* ---------- 2 vérités, 1 mensonge ---------- */
const tvmCur = () => G.order[G.i % G.order.length];
const tvmScore = () => scoreRows(Object.entries(G.scores).sort((a,b)=>b[1]-a[1]));
function tvm(){
  const p = tvmCur();
  if(G.step==="prep") return `${bar("2 vérités, 1 mensonge")}
  <div class="center" style="--gc:var(--sun);padding-top:12px"><span class="kicker">Au tour de</span><div class="big">${esc(p)}</div><p class="lead">Prépare 2 anecdotes vraies et 1 fausse. Mélange l'ordre.</p></div>
  <div class="panel"><span class="label">Idée de thème</span><div style="font-family:var(--f-display);font-size:22px">${esc(G.theme)}</div><button class="btn alt" data-act="tvmTheme">Autre thème</button></div>
  <button class="btn" data-act="tvmReady">Je suis ${gOf(p)==="h"?"prêt":"prête"}</button>
  <div class="panel"><span class="label">Scores de la partie</span>${tvmScore()}</div>
  <button class="link" data-act="home">Terminer la partie</button>`;
  if(G.step==="talk") return `${bar("2 vérités, 1 mensonge")}
  <div class="center" style="--gc:var(--sun)"><span class="kicker">${esc(p)} raconte</span><p class="lead">Annonce tes 3 phrases. Les autres posent des questions pour te piéger.</p></div>
  ${timerHTML(timer?timer.left:60)}
  <button class="btn alt" data-act="tvmDebate">Lancer 60 s de questions</button>
  <button class="btn" data-act="tvmVote">On vote : révéler le mensonge</button>`;
  return `${bar("2 vérités, 1 mensonge")}
  <div class="center" style="--gc:var(--sun)"><span class="kicker">${esc(p)} révèle le mensonge</span><h2>Qui avait trouvé ?</h2><p class="note">+1 par bonne réponse. Si personne n'a trouvé, ${esc(p)} gagne 2 points.</p></div>
  <div class="pick" style="--gc:var(--sun)">${others(p).map(o=>`<button class="${G.sel.includes(o)?"on":""}" data-act="tvmSel" data-arg="${esc(o)}">${esc(o)}</button>`).join("")}</div>
  <button class="btn" data-act="tvmValidate">${G.sel.length?"Valider (+1 × "+G.sel.length+")":"Personne n'a trouvé (+2 pour "+esc(p)+")"}</button>`;
}

/* ---------- Undercover ---------- */
const maxImp = () => Math.floor((players.length-1)/2);
const ucSel = () => store.get("ucRoles", ["boss","lovers"]);
const ucNeed = sel => sel.reduce((n,id)=>n+(id==="lovers"?2:1),0);
const spName = id => (UC_SPECIALS.find(s=>s.id===id)||{}).name;
function ucSetup(){
  const n=players.length, civ=n-G.nU-G.nW, sel=ucSel(), need=ucNeed(sel);
  return `${bar("Undercover")}
  <h2>Undercover</h2>
  <p class="lead" style="font-size:16px">Les civils ont tous le même mot. L'Undercover a un mot très proche et ne sait pas qu'il est l'intrus. Mr White n'a pas de mot et bluffe.</p>
  <div class="panel">
    <div class="stepper"><span><b>Undercover</b><br><span class="note">Mot proche</span></span><div class="ctl"><button data-act="ucU" data-arg="-1" aria-label="Moins">−</button><b>${G.nU}</b><button data-act="ucU" data-arg="1" aria-label="Plus">+</button></div></div>
    <div class="stepper"><span><b>Mr White</b><br><span class="note">Pas de mot, ne parle jamais en premier</span></span><div class="ctl"><button data-act="ucW" data-arg="-1" aria-label="Moins">−</button><b>${G.nW}</b><button data-act="ucW" data-arg="1" aria-label="Plus">+</button></div></div>
    <p class="note">${n} joueurs : ${civ} civil${civ>1?"s":""}, ${G.nU} undercover, ${G.nW} Mr White.</p>
  </div>
  <div class="panel"><span class="label">Rôles spéciaux (en plus du mot)</span>
    <div class="roles">${UC_SPECIALS.map(s=>`<button class="role ${sel.includes(s.id)?"on":""}" data-act="ucRole" data-arg="${s.id}" aria-pressed="${sel.includes(s.id)}"><span class="box"></span><span><b>${s.name}</b><small>${s.d}</small></span></button>`).join("")}</div>
    ${need>n?`<p class="note warn">Trop de rôles spéciaux pour ${n} joueurs : retire-en un.</p>`:""}
  </div>
  <div class="panel"><span class="label">Comment on joue</span>
  <p class="note" style="font-size:15px">1. Chacun regarde son mot et son rôle spécial en secret.<br>2. Dans l'ordre affiché, chacun dit UN mot pour décrire le sien.<br>3. On débat, puis tout le monde vote. On entre les votes un par un dans l'appli.<br>4. Les civils gagnent s'ils éliminent tous les intrus. Les intrus gagnent s'il ne reste qu'un civil. Mr White éliminé peut voler la victoire en devinant le mot des civils.</p></div>
  <button class="btn" style="background:var(--mint)" data-act="ucGo" ${need>n?"disabled":""}>Distribuer les rôles</button>`;
}
function ucDeal(){
  const p=G.ps[G.i];
  if(!G.show) return `${bar("Distribution "+(G.i+1)+"/"+G.ps.length)}
  <div class="center secret" style="--gc:var(--mint)"><span class="kicker">Passe le téléphone à</span><div class="big">${esc(p.name)}</div><p class="lead">Les autres ne regardent pas.</p></div>
  <button class="btn" style="background:var(--mint)" data-act="ucShow">Je suis ${esc(p.name)} : voir mon mot</button>`;
  return `${bar("Distribution "+(G.i+1)+"/"+G.ps.length)}
  ${ucWordCard(p)}
  <button class="btn" data-act="ucHide">J'ai retenu, je cache</button>`;
}
function ucSpecialHTML(p){
  if(!p.sp) return "";
  const s=UC_SPECIALS.find(x=>x.id===p.sp);
  const extra = p.sp==="lovers" ? `Tu es amoureu${gOf(p.name)==="h"?"x":"se"} de <b>${esc(G.ps[p.lover].name)}</b>. Si l'un de vous est éliminé, l'autre part aussi.` : s.d;
  return `<div class="spbox"><span class="cat">Rôle spécial secret</span><b>${s.name}</b><span>${extra}</span></div>`;
}
const ucWordCard = p => p.role==="white"
  ? `<div class="card flip" style="--gc:var(--lilac)"><span class="cat">${esc(p.name)}</span><div class="word">Mr White</div><p class="foot">Tu n'as pas de mot. Écoute les autres et bluffe.</p>${ucSpecialHTML(p)}</div>`
  : `<div class="card flip" style="--gc:var(--mint)"><span class="cat">Ton mot, ${esc(p.name)}</span><div class="word">${esc(p.word)}</div><p class="foot">Décris-le avec un seul mot, sans être trop évident.</p>${ucSpecialHTML(p)}</div>`;
function ucOrder(){
  const alive=shuffle(G.ps.filter(p=>p.alive));
  const k=alive.findIndex(p=>p.role!=="white");
  G.order = k>0 ? [...alive.slice(k),...alive.slice(0,k)] : alive;
}
function ucTalk(){
  return `${bar("Undercover · manche "+G.round)}
  <div class="center" style="--gc:var(--mint)"><span class="kicker">Ordre de parole</span><p class="lead">Chacun dit un seul mot pour décrire le sien, dans cet ordre. Mr White ne commence jamais.</p></div>
  <div class="score">${G.order.map((p,i)=>`<div><b style="font-size:16px;min-width:1.5ch">${i+1}</b><span>${esc(p.name)}</span></div>`).join("")}</div>
  <button class="btn" style="background:var(--mint)" data-act="ucVoteStart">Débat terminé : voter</button>
  <button class="link" data-act="ucPeekList">Quelqu'un a oublié son mot ?</button>`;
}
function ucPeek(){
  if(G.peek!=null) return `${bar("Revoir un mot")}${ucWordCard(G.ps[G.peek])}<button class="btn" data-act="ucPeekDone">Cacher</button>`;
  return `${bar("Revoir un mot")}<h2>Qui a oublié ?</h2>
  <div class="pick">${G.ps.map((p,i)=>`<button data-act="ucPeek" data-arg="${i}">${esc(p.name)}</button>`).join("")}</div>
  <button class="btn ghost" data-act="ucBack">Retour</button>`;
}
const ucVoters = () => G.ps.map((p,i)=>i).filter(i=>G.ps[i].alive || G.ps[i].sp==="ghost");
function ucVote(){
  const voters=G.voters;
  if(G.vi < voters.length){
    const v=G.ps[voters[G.vi]];
    return `${bar("Vote "+(G.vi+1)+"/"+voters.length)}
    <div class="center" style="--gc:var(--bad)"><span class="kicker">${v.alive?"Vote de":"Vote du fantôme"}</span><div class="big">${esc(v.name)}</div><p class="note">À 3, tout le monde pointe quelqu'un. Puis entre le vote de chacun.</p></div>
    <div class="pick" style="--gc:var(--bad)">${G.ps.map((p,i)=>p.alive&&i!==voters[G.vi]?`<button data-act="ucCast" data-arg="${i}">${esc(p.name)}</button>`:"").join("")}</div>
    ${G.vi>0?'<button class="link" data-act="ucUncast">‹ Corriger le vote précédent</button>':'<button class="link" data-act="ucBack">Retour au débat</button>'}`;
  }
  const tally={}; voters.forEach(vi=>{ const t=G.votes[vi]; tally[t]=(tally[t]||0)+(G.ps[vi].sp==="boss"?2:1); });
  const rows=Object.entries(tally).sort((a,b)=>b[1]-a[1]);
  const top=rows[0][1], tied=rows.filter(r=>r[1]===top).map(r=>+r[0]);
  return `${bar("Résultat du vote")}
  <div class="score">${rows.map(([i,v])=>`<div class="${v===top?"lead1":""}"><span>${esc(G.ps[i].name)}</span><b>${v} voix</b></div>`).join("")}</div>
  ${tied.length===1
    ? `<button class="btn bad" data-act="ucElim" data-arg="${tied[0]}">Éliminer ${esc(G.ps[tied[0]].name)}</button>`
    : `<div class="center"><span class="kicker" style="color:var(--bad)">Égalité</span><p class="lead">Débat express entre ${tied.map(i=>esc(G.ps[i].name)).join(" et ")}, puis le groupe tranche :</p></div>
       <div class="pick" style="--gc:var(--bad)">${tied.map(i=>`<button data-act="ucElim" data-arg="${i}">${esc(G.ps[i].name)}</button>`).join("")}</div>`}
  <button class="link" data-act="ucVoteStart">Refaire le vote</button>`;
}
const roleName = r => ({civil:"Civil",under:"Undercover",white:"Mr White"}[r]);
const roleCol = r => r==="civil"?"var(--sky)":r==="under"?"var(--hot)":"var(--lilac)";
function ucEliminate(i, cause){ G.queue.push({i,cause}); ucProcess(); }
function ucProcess(){
  if(!G.queue.length) return ucCheck();
  const q=G.queue[0], p=G.ps[q.i];
  if(!q.started){
    q.started=true;
    if(q.cause==="vote" && p.sp==="shield" && !p.shieldUsed){ p.shieldUsed=true; q.saved=true; }
    else {
      p.alive=false;
      if(p.sp==="clown" && q.cause==="vote" && G.round===1) p.clownWin=true;
      if(p.lover!=null && G.ps[p.lover].alive && !G.queue.some(x=>x.i===p.lover)) G.queue.push({i:p.lover,cause:"love"});
    }
  }
  go(ucReveal);
}
function ucReveal(){
  const q=G.queue[0], p=G.ps[q.i];
  if(q.saved) return `${bar("Révélation")}
  <div class="card flip" style="--gc:var(--sun)"><span class="cat">Le vote visait ${esc(p.name)}</span><div class="word">Bouclier !</div><p class="foot">${esc(p.name)} était protégé${gOf(p.name)==="h"?"":"e"} et reste en jeu. Son rôle reste secret.</p></div>
  <button class="btn" data-act="ucNext">Continuer</button>`;
  const why = q.cause==="love" ? `meurt de chagrin (amoureu${gOf(p.name)==="h"?"x":"se"} de ${esc(G.ps[p.lover].name)})` : q.cause==="revenge" ? "est emporté"+(gOf(p.name)==="h"?"":"e")+" par le Vengeur" : "est éliminé"+(gOf(p.name)==="h"?"":"e")+" par le vote";
  let body = `<div class="card flip" style="--gc:${roleCol(p.role)}"><span class="cat">${esc(p.name)} ${why}</span><div class="word">${roleName(p.role)}</div>${p.role!=="white"?`<p class="foot">Son mot : ${esc(p.word)}</p>`:""}${p.sp?`<p class="foot">Rôle spécial : <b>${spName(p.sp)}</b>${p.clownWin?" · +3 pts, il voulait se faire éliminer !":""}</p>`:""}</div>`;
  if(p.role==="white" && !q.wDone){
    body += q.wShown
      ? `<div class="center"><span class="kicker">Le mot des civils était</span><div class="big">${esc(G.pair[0])}</div></div>
         <div class="row"><button class="btn alt" data-act="ucWhite" data-arg="0">Raté</button><button class="btn" style="background:var(--lilac)" data-act="ucWhite" data-arg="1">Trouvé !</button></div>`
      : `<p class="lead" style="text-align:center;align-self:center">Dernière chance : ${esc(p.name)} annonce à voix haute le mot des civils.</p><button class="btn" style="background:var(--lilac)" data-act="ucWShow">Révéler le mot des civils</button>`;
  } else if(p.sp==="avenger" && !q.revDone){
    const alive=G.ps.map((x,i)=>i).filter(i=>G.ps[i].alive && !G.queue.some(y=>y.i===i));
    body += `<div class="center"><span class="kicker" style="color:var(--hot)">Vengeance</span><p class="lead">${esc(p.name)} choisit qui emporter avec ${gOf(p.name)==="h"?"lui":"elle"} :</p></div>
      <div class="pick" style="--gc:var(--hot)">${alive.map(i=>`<button data-act="ucRevenge" data-arg="${i}">${esc(G.ps[i].name)}</button>`).join("")}</div>`;
  } else body += `<button class="btn" data-act="ucNext">Continuer</button>`;
  return `${bar("Révélation")}${body}`;
}
function ucFinish(w){
  G.winner=w; G.gamePts={};
  const give=(n,v)=>{ G.gamePts[n]=(G.gamePts[n]||0)+v; };
  G.ps.forEach(p=>{
    if(w==="civ" && p.role==="civil") give(p.name, UC_PTS.civil);
    if(w==="imp" && p.role!=="civil") give(p.name, UC_PTS[p.role]);
    if(w==="white" && p.role==="white") give(p.name, UC_PTS.white);
    if(p.clownWin) give(p.name, 3);
    if(p.sp==="lovers" && p.alive && G.ps[p.lover].alive) give(p.name, 2);
  });
  Object.entries(G.gamePts).forEach(([n,v])=>{ addPts(n,v); G.ucScores[n]=(G.ucScores[n]||0)+v; });
  go(ucEnd);
}
function ucEnd(){
  const civWin = G.winner==="civ";
  const title = civWin ? "Les civils gagnent" : G.winner==="white" ? "Mr White gagne" : "Les intrus gagnent";
  const session=Object.entries(G.ucScores).sort((a,b)=>b[1]-a[1]);
  return `${bar("Fin")}
  <div class="center" style="--gc:${civWin?"var(--sky)":"var(--hot)"};padding-top:12px"><span class="kicker">Partie terminée</span><div class="big">${title}</div>
  <p class="lead">Civils : <b>${esc(G.pair[0])}</b> · Undercover : <b>${esc(G.pair[1])}</b></p></div>
  <div class="score">${G.ps.map(p=>`<div style="--tc:${roleCol(p.role)}"><i class="dot"></i><span>${esc(p.name)} <small class="note">${roleName(p.role)}${p.sp?" · "+spName(p.sp):""}${p.alive?"":" · éliminé"+(gOf(p.name)==="h"?"":"e")}</small></span><b style="font-size:16px">${G.gamePts[p.name]?"+"+G.gamePts[p.name]:"0"}</b></div>`).join("")}</div>
  ${session.length?`<div class="panel"><span class="label">Points Undercover cumulés</span>${scoreRows(session)}</div>`:""}
  <button class="btn" style="background:var(--mint)" data-act="ucGo">Rejouer avec d'autres mots</button>
  <button class="btn ghost" data-act="ucSettings">Changer les réglages</button>
  <button class="link" data-act="home">Retour aux jeux</button>`;
}
function ucCheck(){
  const alive=G.ps.filter(p=>p.alive);
  const imp=alive.filter(p=>p.role!=="civil").length, civ=alive.length-imp;
  if(imp===0) return ucFinish("civ");
  if(civ<=1) return ucFinish("imp");
  G.round++; ucOrder(); go(ucTalk);
}

/* ---------- Jeu mystère ---------- */
function mys(){
  const c=G.card, T=c?MYS_TYPES[c.t]:null;
  let win="";
  if(c && !G.scored){
    if(c.t==="duel") win=`<span class="label">Qui gagne le duel ? (+2)</span><div class="row">${[G.p1,G.p2].map(n=>`<button class="btn alt" data-act="mysWin" data-arg="${esc(n)}|2">${esc(n)}</button>`).join("")}</div>`;
    else if(c.t==="defi") win=`<div class="row"><button class="btn alt" data-act="mysWin" data-arg="|0">Raté</button><button class="btn good" data-act="mysWin" data-arg="${esc(G.p1)}|2">Réussi (+2)</button></div>`;
    else if(c.t==="devine"||c.t==="patate") win=`<span class="label">${c.t==="devine"?"Qui a trouvé ? (+1)":"Qui gagne ? (+2)"}</span><div class="pick" style="--gc:var(--lilac)">${(c.t==="devine"?others(G.p1):players).map(n=>`<button data-act="mysWin" data-arg="${esc(n)}|${c.t==="devine"?1:2}">${esc(n)}</button>`).join("")}</div>`;
  }
  return `${bar("Jeu mystère")}
  ${c?`<div class="card flip" style="--gc:${T.c}" id="mcard"><span class="cat">${T.label}</span><div class="txt">${G.text}</div><p class="foot">${T.foot}</p></div>
  ${c.s?`${timerHTML(timer?timer.left:c.s)}<button class="btn alt" data-act="mysTimer">Lancer ${c.s} s</button>`:""}`
  :`<div class="center secret" style="--gc:var(--lilac)"><span class="kicker">Paquet mystère</span><div class="big">?</div><p class="lead">Qui pourrait, Je n'ai jamais, défis, duels, patate chaude, devinettes et règles absurdes.</p></div>`}
  ${win?`<div class="stack">${win}</div>`:""}
  <button class="btn" style="background:var(--lilac)" data-act="mysDraw">${c?"Carte suivante":"Tirer la première carte"}</button>
  ${G.rule?`<div class="rules"><span class="label">Règle en cours</span><div class="rule">${G.rule}</div></div>`:""}
  ${G.n?`<p class="note" style="text-align:center">${G.n} carte${G.n>1?"s":""} tirée${G.n>1?"s":""}</p>`:""}`;
}

/* ---------- Actions ---------- */
const A = {
  home(){ stopTimer(); G=null; msg=""; go(home); },
  quit(){
    if(!G || view===playersScreen){ return A.home(); }
    if(armed){ armed=false; clearTimeout(armT); return A.home(); }
    armed=true; draw(); armT=setTimeout(()=>{ armed=false; draw(); },3000);
  },
  players(){ msg=""; G=null; go(playersScreen); },
  addG(g){ addG=g; draw(); const n=document.getElementById("pname"); n&&n.focus(); },
  toggleG(i){ const p=players[+i]; genders[p]=gOf(p)==="h"?"f":"h"; savePlayers(); draw(); },
  rmP(i){ players.splice(+i,1); savePlayers(); draw(); },
  clearP(){ players=[]; savePlayers(); draw(); },
  board(){ resetArmed=false; if(view!==board) prevView=view; go(board); },
  boardBack(){ go(prevView||home); },
  boardReset(){ if(!resetArmed){ resetArmed=true; return draw(); } scores={}; store.set("scores",scores); resetArmed=false; draw(); },
  open(id){
    stopTimer(); armed=false;
    const g=GAMES.find(x=>x.id===id);
    if(players.length<g.min){ G={want:id}; msg=`${g.name} se joue à ${g.min} minimum. Ajoute ${g.min-players.length} prénom${g.min-players.length>1?"s":""}.`; return go(playersScreen); }
    msg="";
    if(id==="mime"||id==="taboo"){ G={kind:id,nTeams:2,dur:60,round:1}; makeTeams(); return go(teamSetup); }
    if(id==="av"){ G={kind:"av",order:shuffle(players),i:0,level:store.get("avlvl","fun"),decks:{}}; if(G.level==="x18"&&!adultOk) G.level="hot"; return go(avTurn); }
    if(id==="tvm"){ G={kind:"tvm",order:shuffle(players),i:0,scores:Object.fromEntries(players.map(p=>[p,0])),step:"prep",theme:pick(TVM_THEMES),sel:[]}; return go(tvm); }
    if(id==="uc"){ const n=players.length; G={kind:"uc",nU:n>=13?3:n>=7?2:1,nW:n>=11?2:n>=5?1:0,ucScores:{}}; return go(ucSetup); }
    if(id==="mys"){ G={kind:"mys",d:deck(MYS),card:null,rule:null,n:0}; return go(mys); }
  },
  /* équipes */
  nTeams(n){ G.nTeams=+n; makeTeams(); draw(); },
  reTeams(){ makeTeams(); draw(); },
  dur(n){ G.dur=+n; draw(); },
  teamsGo(){ G.cur=0; G.round=1; G.deck=deck(G.kind==="mime"?MIME_CARDS:TABOO); go(turnIntro); },
  turnStart(){ G.log=[]; G.card=G.deck.draw(); go(turnPlay); runTimer(G.dur, A.turnStop); },
  mark(v){ G.log.push({c:G.card,v:+v}); G.card=G.deck.draw(); beep(+v===1?880:+v===-1?220:440,.08); draw(); },
  turnStop(){ stopTimer(); if(G.card){ G.log.push({c:G.card,v:0,last:true}); G.card=null; } go(turnEnd); },
  toggle(i){ const l=G.log[+i]; l.v = G.kind==="mime" ? (l.v===1?0:1) : (l.v===1?0:l.v===0?-1:1); draw(); },
  turnValidate(){
    const t=G.teams[G.cur], pts=G.log.reduce((s,l)=>s+l.v,0);
    t.score += pts; t.members.forEach(m=>addPts(m,pts)); t.k++;
    G.cur=(G.cur+1)%G.teams.length; if(G.cur===0) G.round++;
    go(turnIntro); if(pts) toast(`${ptsTxt(pts)} pour ${t.name}`);
  },
  teamEnd(){
    const s=[...G.teams].sort((a,b)=>b.score-a.score);
    if(!G.bonusGiven && s[0].score>s[1].score){ s[0].members.forEach(m=>addPts(m,3)); }
    G.bonusGiven=true; go(teamFinal);
  },
  teamsAgain(){ G.teams.forEach(t=>t.score=0); G.bonusGiven=false; A.teamsGo(); },
  /* action ou vérité */
  avLevel(k){ if(k==="x18" && !adultOk){ G.gate=true; return draw(); } G.level=k; store.set("avlvl",k); draw(); },
  avAdult(){ adultOk=true; G.gate=false; G.level="x18"; store.set("avlvl","x18"); draw(); },
  avGateNo(){ G.gate=false; draw(); },
  avPick(t){
    if(t==="r") t=Math.random()<.5?"v":"a";
    const key=t+G.level; G.decks[key]=G.decks[key]||deck(AV[G.level][t]);
    const cur=avCur(), o=others(cur);
    G.type=t; G.text=fill(G.decks[key].draw(), {cur, joueur:pick(o.length?o:players), opp:oppOf(cur)});
    go(avCard);
  },
  avJoker(){ G.decks.g=G.decks.g||deck(GAGES); G.type="g"; G.text=esc(G.decks.g.draw()); go(avCard); },
  avNext(){
    const p=avCur(), pts = G.type==="g" ? 0 : AV_PTS[G.type]+AV_BONUS[G.level];
    addPts(p,pts); G.i++; go(avTurn); if(pts) toast(`${ptsTxt(pts)} pour ${p}`);
  },
  avSkip(){ G.i++; draw(); },
  /* 2v1m */
  tvmTheme(){ let t; do{ t=pick(TVM_THEMES); }while(t===G.theme); G.theme=t; draw(); },
  tvmReady(){ G.step="talk"; go(tvm); },
  tvmDebate(){ runTimer(60); },
  tvmVote(){ stopTimer(); G.step="vote"; G.sel=[]; go(tvm); },
  tvmSel(n){ G.sel = G.sel.includes(n) ? G.sel.filter(x=>x!==n) : [...G.sel,n]; draw(); },
  tvmValidate(){
    const p=tvmCur();
    if(G.sel.length) G.sel.forEach(n=>{ G.scores[n]++; addPts(n,1); }); else { G.scores[p]+=2; addPts(p,2); }
    G.i++; G.step="prep"; G.theme=pick(TVM_THEMES); go(tvm);
  },
  /* undercover */
  ucU(d){ const v=G.nU+ +d; if(v>=0 && v+G.nW<=maxImp() && v+G.nW>=1) G.nU=v; draw(); },
  ucW(d){ const v=G.nW+ +d; if(v>=0 && v+G.nU<=maxImp() && v+G.nU>=1) G.nW=v; draw(); },
  ucRole(id){ const s=ucSel(); store.set("ucRoles", s.includes(id)?s.filter(x=>x!==id):[...s,id]); draw(); },
  ucSettings(){ go(ucSetup); },
  ucGo(){
    G.deck=G.deck||deck(UC_PAIRS);
    let pair=G.deck.draw(); if(Math.random()<.5) pair=[pair[1],pair[0]];
    G.pair=pair;
    const roles=shuffle([...Array(G.nU).fill("under"),...Array(G.nW).fill("white"),...Array(players.length-G.nU-G.nW).fill("civil")]);
    G.ps=shuffle(players).map((name,i)=>({name,role:roles[i],word:roles[i]==="civil"?pair[0]:roles[i]==="under"?pair[1]:null,alive:true,sp:null,lover:null}));
    /* rôles spéciaux : un par joueur maximum */
    let free=shuffle(G.ps.map((p,i)=>i));
    for(const id of ucSel()){
      if(id==="lovers"){
        if(free.length<2) continue;
        const a=free.shift(); let k=free.findIndex(i=>gOf(G.ps[i].name)!==gOf(G.ps[a].name)); if(k<0) k=0;
        const b=free.splice(k,1)[0];
        Object.assign(G.ps[a],{sp:"lovers",lover:b}); Object.assign(G.ps[b],{sp:"lovers",lover:a});
      } else if(free.length) G.ps[free.shift()].sp=id;
    }
    Object.assign(G,{i:0,show:false,round:1,queue:[],winner:null,peek:null});
    go(ucDeal);
  },
  ucShow(){ G.show=true; draw(); },
  ucHide(){ G.show=false; G.i++; if(G.i>=G.ps.length){ ucOrder(); go(ucTalk); } else go(ucDeal); },
  ucVoteStart(){ G.voters=ucVoters(); G.vi=0; G.votes={}; go(ucVote); },
  ucCast(i){ G.votes[G.voters[G.vi]]=+i; G.vi++; draw(); window.scrollTo(0,0); },
  ucUncast(){ G.vi--; draw(); },
  ucElim(i){ ucEliminate(+i,"vote"); },
  ucBack(){ G.peek=null; go(ucTalk); },
  ucPeekList(){ G.peek=null; go(ucPeek); },
  ucPeek(i){ G.peek=+i; draw(); },
  ucPeekDone(){ G.peek=null; go(ucTalk); },
  ucWShow(){ G.queue[0].wShown=true; draw(); },
  ucWhite(ok){ if(+ok){ G.queue=[]; return ucFinish("white"); } G.queue[0].wDone=true; draw(); },
  ucRevenge(i){ G.queue[0].revDone=true; G.queue.push({i:+i,cause:"revenge"}); draw(); },
  ucNext(){ G.queue.shift(); ucProcess(); },
  /* mystère */
  mysDraw(){
    stopTimer();
    const c=G.d.draw(), p1=pick(players);
    const o=others(p1), p2 = c.opp ? oppOf(p1) : pick(o.length?o:players);
    Object.assign(G,{card:c,p1,p2,scored:false}); G.n++;
    G.text=fill(c.x,{cur:p1,p1,p2});
    if(c.t==="regle") G.rule=G.text;
    draw(); beep(520,.06);
  },
  mysWin(arg){ const [n,v]=arg.split("|"); G.scored=true; if(n&&+v){ addPts(n,+v); draw(); toast(`${ptsTxt(+v)} pour ${n}`); } else draw(); },
  mysTimer(){ runTimer(G.card.s); }
};

document.addEventListener("click", e => {
  keepAwake();
  const t=e.target.closest("[data-act]"); if(!t || t.disabled) return;
  const fn=A[t.dataset.act]; if(!fn) return;
  e.preventDefault();
  if(t.dataset.act!=="quit" && armed){ armed=false; clearTimeout(armT); }
  fn(t.dataset.arg, t);
});
document.addEventListener("submit", e => {
  if(e.target.id!=="addform") return;
  e.preventDefault();
  const inp=document.getElementById("pname"); const v=inp.value.trim();
  if(v){
    if(isSample){ players=[]; genders={}; }
    if(!players.some(p=>p.toLowerCase()===v.toLowerCase())){ players.push(v); genders[v]=addG; }
    savePlayers(); msg="";
  }
  draw(); const n=document.getElementById("pname"); n && n.focus();
});

go(home);
