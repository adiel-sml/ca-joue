import "@fontsource/dela-gothic-one/latin-400.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-800.css";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";
import { MIME_EASY, MIME_HARD, TABOO, AV, GAGES, GAGES_HOT, AV_LEVELS, AV_PTS, AV_BONUS, TVM_THEMES, UC_PAIRS, UC_SPECIALS, UC_PTS, MYS_TYPES, MYS, TEAM_NAMES, TEAM_COLORS, GAMES, GAME_CATS } from "./content.js";
import { TU_WORDS, BOMB_THEMES, WYR, NHIE, QUIZ, LG_ROLES, LG_SPECIALS } from "./content-games.js";
import { ic } from "./icons.js";
import { AVATARS, avatarSvg } from "./avatars.js";

/* ---------- Outils ---------- */
const $app = document.getElementById("app");
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.random() * a.length | 0];
const store = {
  get(k, d) { try { const v = localStorage.getItem("cajoue:" + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("cajoue:" + k, JSON.stringify(v)); } catch (e) {} }
};
const plural = (n, w) => `${n} ${w}${Math.abs(n) > 1 ? "s" : ""}`;
const ptsTxt = v => `${v > 0 ? "+" : ""}${plural(v, "pt")}`;

/* Paquet mémorisé sur le téléphone : une carte ne revient qu'une fois tout le paquet passé, même d'une partie à l'autre */
function pdeck(key, arr) {
  return {
    draw() {
      let st = store.get("deck:" + key, null);
      if (!st || st.n !== arr.length || !Array.isArray(st.left) || !st.left.length) st = { n: arr.length, left: shuffle(arr.map((_, i) => i)) };
      const i = st.left.pop();
      store.set("deck:" + key, st);
      return arr[i];
    }
  };
}
const MIME_SETS = { easy: MIME_EASY, hard: MIME_HARD, mix: [...MIME_EASY, ...MIME_HARD] };

/* ---------- Joueurs ---------- */
const uid = () => Math.random().toString(36).slice(2, 9);
const SAMPLE = [["Léa", "f", "f0"], ["Inès", "f", "f2"], ["Sarah", "f", "f5"], ["Léo", "h", "h0"], ["Camille", "f", "f7"], ["Yanis", "h", "h2"]];
let roster = store.get("roster", null);
let isSample = false;
if (!roster) {
  const old = store.get("players", null), oldG = store.get("genders", {});
  if (old && old.length) roster = old.map((n, i) => ({ id: uid(), name: n, g: oldG[n] === "h" ? "h" : "f", av: (oldG[n] === "h" ? "h" : "f") + (i % 12) }));
  else { roster = SAMPLE.map(([name, g, av]) => ({ id: uid(), name, g, av })); isSample = true; }
}
const saveRoster = () => { isSample = false; store.set("roster", roster); };
let players = roster.map(p => p.name);
const syncNames = () => { players = roster.map(p => p.name); };
const byName = n => roster.find(p => p.name === n);
const gOf = n => (byName(n) || {}).g === "h" ? "h" : "f";
const av = (n, size = "m") => { const p = byName(n); return `<span class="av av-${size}">${avatarSvg(p ? p.av : "f0")}</span>`; };
const others = (p, list = players) => list.filter(x => x !== p);
function oppOf(p, list = players) {
  const o = list.filter(x => x !== p && gOf(x) !== gOf(p));
  return pick(o.length ? o : (others(p, list).length ? others(p, list) : list));
}
/* Remplit un gabarit de carte : accords {f|h} puis prénoms */
function fill(txt, ctx) {
  return esc(txt)
    .replace(/\{([^{}|:]*)\|([^{}|:]*)(?::(\w+))?\}/g, (m, f, h, k) => gOf(ctx[k || "cur"]) === "h" ? h : f)
    .replace(/\{(joueur|opp|p1|p2)\}/g, (m, k) => `<b>${esc(ctx[k])}</b>`);
}
const fe = (n, f, h) => gOf(n) === "h" ? h : f;

/* ---------- Classement ---------- */
let scores = store.get("scores", {});
function addPts(name, v) { if (!v) return; scores[name] = (scores[name] || 0) + v; store.set("scores", scores); }

/* ---------- Son, chrono, écran allumé ---------- */
let actx;
function beep(f, d) { try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.type = "triangle"; o.frequency.value = f; g.gain.setValueAtTime(.22, actx.currentTime); g.gain.exponentialRampToValueAtTime(.001, actx.currentTime + d); o.connect(g).connect(actx.destination); o.start(); o.stop(actx.currentTime + d); } catch (e) {} }
const vib = () => { try { navigator.vibrate && navigator.vibrate([200, 80, 200]); } catch (e) {} };

let timer = null;
function stopTimer() { if (timer) { clearInterval(timer.id); timer = null; } stopBomb(); }
function runTimer(sec, onEnd) {
  stopTimer();
  const end = Date.now() + sec * 1000;
  timer = { id: 0, last: null, sec, left: sec };
  const tick = () => {
    const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
    timer.left = left;
    const n = document.getElementById("tnum"), b = document.getElementById("tbar");
    if (n) { n.textContent = left; n.classList.toggle("urgent", left <= 10); }
    if (b) b.style.transform = `scaleX(${Math.max(0, (end - Date.now()) / (sec * 1000))})`;
    if (left <= 5 && left > 0 && left !== timer.last) { timer.last = left; beep(660, .08); }
    if (left === 0) { stopTimer(); beep(330, .6); vib(); onEnd && onEnd(); }
  };
  timer.id = setInterval(tick, 200);
  tick();
}
const timerHTML = s => `<div class="timer"><div class="tbar"><i id="tbar" style="transform:scaleX(${timer ? timer.left / timer.sec : 1})"></i></div><div class="tnum" id="tnum">${s}</div></div>`;

let wake = null;
async function keepAwake() { try { if (!wake && navigator.wakeLock) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => wake = null); } } catch (e) {} }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") keepAwake(); });

/* ---------- Installation sur l'écran d'accueil ---------- */
let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (view === root) draw(); });
window.addEventListener("appinstalled", () => { installEvt = null; draw(); });
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* ---------- État de l'interface ---------- */
let G = null;          // partie en cours
let tab = "games";     // onglet de l'accueil
let view = root;       // écran affiché
let prevView = null;   // écran à rouvrir après le classement
let sheet = null;      // panneau du bas ouvert
let adultOk = false;
let installHidden = store.get("installHidden", false);

function go(fn) { view = fn; sheet = null; draw(); window.scrollTo(0, 0); }
/* Espaces insécables de la typographie française devant ? ! : ; » et après « */
const frSpaces = h => h.replace(/ ([?!:;»])/g, "&nbsp;$1").replace(/« /g, "«&nbsp;");
function draw() {
  $app.innerHTML = frSpaces(view() + sheetHTML()) + '<div id="toast" class="toast" role="status" hidden></div>';
  document.body.classList.toggle("locked", !!sheet);
}
function toast(t) { const el = document.getElementById("toast"); if (!el) return; el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { el.hidden = true; }, 1800); }

/* Gabarit d'écran : barre du haut, contenu, zone d'actions en bas */
function screen({ title = "", left = "close", right = "board", color = "", body = "", foot = "", tabs = false }) {
  const l = left === "close" ? `<button class="iconbtn" data-act="askQuit" aria-label="Quitter la partie">${ic("x")}</button>`
    : left === "back" ? `<button class="iconbtn" data-act="boardBack" aria-label="Retour">${ic("back")}</button>` : "";
  const r = right === "board" ? `<button class="iconbtn" data-act="board" aria-label="Classement">${ic("trophy")}</button>`
    : right === "stop" ? `<button class="iconbtn" data-act="turnStop" aria-label="Arrêter le tour">${ic("stop")}</button>` : (right || "");
  const rep = G && G.kind === "lg" && voiceOn && lastSay && view !== lgSetup && view !== lgDeal ? `<button class="iconbtn" data-act="lgRepeat" aria-label="Répéter l'annonce">${ic("volume")}</button>` : "";
  return `<div class="screen${tabs ? " has-tabs" : ""}${foot ? " has-foot" : ""}" style="${color ? "--gc:" + color : ""}">
    ${title || l || r ? `<header class="appbar">${l}<h1 class="appbar-title">${esc(title)}</h1>${rep}${r}</header>` : ""}
    <main class="content">${body}</main>
    ${foot ? `<footer class="foot">${foot}</footer>` : ""}
    ${tabs ? tabbar() : ""}
  </div>`;
}
const tabbar = () => `<nav class="tabbar" aria-label="Navigation">${[["games", "grid", "Jeux"], ["players", "users", "Joueurs"], ["board", "trophy", "Classement"]].map(([k, i, l]) =>
  `<button class="${tab === k ? "on" : ""}" data-act="tab" data-arg="${k}" ${tab === k ? 'aria-current="page"' : ""}>${ic(i, 24)}<span>${l}</span></button>`).join("")}</nav>`;
const btn = (label, act, { arg = "", kind = "", icon = "", dis = false, style = "" } = {}) =>
  `<button class="btn ${kind}" data-act="${act}" ${arg !== "" ? `data-arg="${esc(arg)}"` : ""} ${dis ? "disabled" : ""} ${style ? `style="${style}"` : ""}>${icon ? ic(icon, 20) : ""}<span>${label}</span></button>`;
const scoreList = (entries, highlight = true, offset = 0) => {
  const best = entries.length ? entries[0][1] : 0;
  return `<ol class="list">${entries.map(([n, v], i) => `<li class="row-item${highlight && v === best && v > 0 ? " lead" : ""}"><span class="rank">${i + 1 + offset}</span>${av(n, "s")}<span class="grow">${esc(n)}</span><b class="num">${v}</b></li>`).join("")}</ol>`;
};

/* ---------- Accueil (onglets) ---------- */
function root() {
  if (tab === "players") return screen({ title: "Joueurs", left: null, right: null, tabs: true, body: playersBody() });
  if (tab === "board") return screen({ title: "Classement", left: null, right: null, tabs: true, body: boardBody() });
  const showInstall = !installHidden && !isStandalone();
  return screen({
    left: null, right: null, tabs: true, body: `
    <div class="brand"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-name">Ça Joue</span></div>
    <button class="crew" data-act="tab" data-arg="players">
      <span class="stack-av">${players.slice(0, 6).map(n => av(n, "s")).join("")}</span>
      <span class="grow"><b>${plural(players.length, "joueur")}</b><small>${isSample ? "Exemples à remplacer" : "Modifier la liste"}</small></span>
      ${ic("pencil", 18)}
    </button>
    ${showInstall ? `<div class="install"><span class="install-ic">${ic("phone", 22)}</span><span class="grow"><b>Installer l'appli</b><small>Plein écran, même sans réseau.</small></span><button class="pill" data-act="install">Installer</button><button class="iconbtn sm" data-act="hideInstall" aria-label="Masquer">${ic("x", 18)}</button></div>` : ""}
    ${GAME_CATS.map(([cat, label]) => `<h2 class="section">${label}</h2>
    <div class="games">${GAMES.filter(g => g.cat === cat).map(g => `<button class="tile" style="--tc:${g.c}" data-act="open" data-arg="${g.id}">
      <span class="tile-ic">${ic(g.icon, 28)}</span>
      <span class="tile-name">${esc(g.name)}</span>
      <span class="tile-desc">${esc(g.desc)}</span>
      <span class="tile-meta">${ic("users", 14)} Dès ${g.min} joueurs</span>
    </button>`).join("")}</div>`).join("")}`
  });
}
function playersBody() {
  return `${isSample ? `<p class="hint">Ce sont des prénoms d'exemple. Ajoute tes amis, la liste d'exemple disparaîtra.</p>` : `<p class="hint">Le sexe sert à adapter les cartes : bisous entre fille et garçon, « la reine » ou « le roi ».</p>`}
  ${btn("Ajouter un joueur", "editP", { icon: "userPlus" })}
  <ul class="list">${roster.map(p => `<li><button class="row-item" data-act="editP" data-arg="${p.id}">${av(p.name, "m")}<span class="grow"><b>${esc(p.name)}</b><small>${p.g === "h" ? "Garçon" : "Fille"}</small></span>${ic("pencil", 18)}</button></li>`).join("")}</ul>
  ${roster.length ? `<button class="textbtn danger" data-act="askClear">Vider la liste</button>` : ""}`;
}
function boardBody() {
  const s = Object.entries(scores).filter(([n]) => n).sort((a, b) => b[1] - a[1]);
  if (!s.length) return `<div class="empty">${ic("trophy", 40)}<b>Aucun point pour l'instant</b><p>Les points de tous les jeux s'additionnent ici.</p></div>`;
  const top = s.slice(0, 3), order = [1, 0, 2].filter(i => top[i]);
  return `<div class="podium">${order.map(i => `<div class="step s${i + 1}">${av(top[i][0], i === 0 ? "l" : "m")}<b>${esc(top[i][0])}</b><span class="num">${top[i][1]} pts</span><i>${i + 1}</i></div>`).join("")}</div>
  ${s.length > 3 ? scoreList(s.slice(3), false, 3) : ""}
  <details class="howto"><summary>${ic("info", 18)} Comment on gagne des points</summary>
  <p>Mimes et Mot interdit : chaque membre de l'équipe gagne les points du tour, et 3 points de plus pour l'équipe gagnante. Action ou Vérité : 1 point par vérité, 2 par action, bonus en Épicé et en +18. Undercover : 2 points par civil gagnant, 5 par Undercover, 6 pour Mr White. 2 vérités 1 mensonge et Jeu mystère : les points de chaque manche.</p></details>
  <button class="textbtn danger" data-act="askReset">Remettre le classement à zéro</button>`;
}

/* ---------- Panneaux du bas ---------- */
function sheetHTML() {
  if (!sheet) return "";
  let inner = "";
  if (sheet.type === "player") {
    const d = sheet.draft, list = AVATARS.filter(a => a.g === d.g).concat(AVATARS.filter(a => a.g !== d.g));
    inner = `<h2 class="sheet-title">${sheet.id ? "Modifier le joueur" : "Nouveau joueur"}</h2>
    <form id="pform" class="stack">
      <label class="field"><span>Prénom</span><input id="pname" value="${esc(d.name)}" maxlength="16" autocomplete="off" enterkeyhint="done" required></label>
      <div class="seg" role="radiogroup" aria-label="Sexe">${[["f", "Fille"], ["h", "Garçon"]].map(([k, l]) => `<button type="button" role="radio" aria-checked="${d.g === k}" class="${d.g === k ? "on" : ""}" data-act="draftG" data-arg="${k}">${l}</button>`).join("")}</div>
      <span class="label">Personnage</span>
      <div class="avgrid">${list.map(a => `<button type="button" class="avpick${d.av === a.id ? " on" : ""}" data-act="draftAv" data-arg="${a.id}" aria-label="Personnage ${a.id}" aria-pressed="${d.av === a.id}"><span class="av av-m">${avatarSvg(a.id)}</span></button>`).join("")}</div>
      ${sheet.err ? `<p class="hint warn">${sheet.err}</p>` : ""}
      <button class="btn" type="submit">${ic("check", 20)}<span>${sheet.id ? "Enregistrer" : "Ajouter"}</span></button>
      ${sheet.id ? `<button type="button" class="textbtn danger" data-act="rmP">Retirer ce joueur</button>` : ""}
    </form>`;
  } else if (sheet.type === "confirm") {
    inner = `<h2 class="sheet-title">${sheet.title}</h2><p class="sheet-text">${sheet.text}</p>
    <div class="stack">${btn(sheet.ok, sheet.act, { kind: sheet.danger ? "danger" : "" })}<button class="btn ghost" data-act="closeSheet">Annuler</button></div>`;
  } else if (sheet.type === "gage") {
    const who = sheet.who ? esc(sheet.who) : "";
    inner = sheet.chosen == null
      ? `<h2 class="sheet-title">${who ? `Gage pour ${who}` : "Choisis un gage"}</h2><p class="sheet-text">Choisis parmi ces trois propositions.</p>
        <ul class="list">${sheet.opts.map((o, i) => `<li><button class="row-item gage-opt" data-act="gagePick" data-arg="${i}"><span class="opt">${i + 1}</span><span class="grow">${esc(o)}</span></button></li>`).join("")}
        <li><button class="row-item gage-opt" data-act="gagePick" data-arg="2"><span class="opt">${ic("users", 16)}</span><span class="grow"><b>Le groupe choisit le gage</b><small>Si aucune proposition ne convient</small></span></button></li></ul>
        <button class="textbtn" data-act="gageReroll">${ic("shuffle", 18)} Deux autres propositions</button>`
      : `<h2 class="sheet-title">${who ? `Gage de ${who}` : "Le gage"}</h2>
        <div class="card"><span class="card-label">Gage</span><div class="txt">${sheet.chosen === "group" ? "Le groupe invente le gage. À vous de jouer !" : esc(sheet.chosen)}</div></div>
        ${btn("C'est fait", "gageDone", { icon: "check" })}`;
  } else if (sheet.type === "install") {
    inner = isIos()
      ? `<h2 class="sheet-title">Installer sur iPhone</h2>
         <ol class="steps"><li><span class="stepn">1</span><span>Ouvre cette page dans <b>Safari</b>.</span></li>
         <li><span class="stepn">2</span><span>Touche le bouton Partager ${ic("share", 18)} en bas de l'écran.</span></li>
         <li><span class="stepn">3</span><span>Choisis <b>Sur l'écran d'accueil</b> ${ic("squarePlus", 18)}, puis <b>Ajouter</b>.</span></li></ol>
         <button class="btn ghost" data-act="closeSheet">J'ai compris</button>`
      : `<h2 class="sheet-title">Installer sur Android</h2>
         <ol class="steps"><li><span class="stepn">1</span><span>Ouvre cette page dans <b>Chrome</b>.</span></li>
         <li><span class="stepn">2</span><span>Touche le menu en haut à droite, puis <b>Installer l'application</b> ou <b>Ajouter à l'écran d'accueil</b>.</span></li></ol>
         <button class="btn ghost" data-act="closeSheet">J'ai compris</button>`;
  }
  return `<div class="backdrop" data-act="closeSheet"></div><section class="sheet" role="dialog" aria-modal="true"><span class="grabber" aria-hidden="true"></span>${inner}</section>`;
}
function confirmSheet(o) { sheet = { type: "confirm", ...o }; draw(); }
/* Gages : deux propositions tirées au sort, plus le choix du groupe */
function gageOpts(spicy) {
  const n = pdeck("gages", GAGES), a = spicy ? pdeck("gages-hot", GAGES_HOT).draw() : n.draw();
  let b = n.draw(); if (b === a) b = n.draw();
  return [a, b];
}
function openGage(who, spicy = false, then = null) { sheet = { type: "gage", who, spicy, opts: gageOpts(spicy), chosen: null, then }; draw(); }

/* ---------- Mimes & Mot interdit ---------- */
function makeTeams() {
  const sh = shuffle(players);
  G.teams = Array.from({ length: G.nTeams }, (_, i) => ({ name: TEAM_NAMES[i], c: TEAM_COLORS[i], members: [], score: 0, k: 0 }));
  sh.forEach((p, i) => G.teams[i % G.nTeams].members.push(p));
}
const teamName = () => ({ mime: "Mimes", taboo: "Mot interdit", tu: "Time's Up", quiz: "Quiz" })[G.kind];
const TEAM_LEADS = {
  mime: "Une personne mime, son équipe devine. Interdit de parler, de faire des bruits ou de montrer un objet.",
  taboo: "Une personne fait deviner le mot avec des phrases, sans dire le mot ni les mots en rouge. L'équipe adverse surveille.",
  tu: "Les mêmes mots reviennent pendant trois manches : on les décrit, puis on les fait deviner avec un seul mot, puis on les mime.",
  quiz: "Chaque équipe répond à son tour. Une bonne réponse rapporte un point."
};
const gameColor = id => GAMES.find(g => g.id === id).c;
function teamSetup() {
  const max = Math.min(4, players.length), solo = G.teams.some(t => t.members.length === 1);
  return screen({
    title: teamName(), color: gameColor(G.kind), body: `
    <p class="lead">${TEAM_LEADS[G.kind]}</p>
    <div class="panel"><div class="panel-head"><span class="label">Équipes</span><button class="pill ghost" data-act="reTeams">${ic("shuffle", 16)} Mélanger</button></div>
      <div class="seg">${[2, 3, 4].map(n => `<button class="${G.nTeams === n ? "on" : ""}" data-act="nTeams" data-arg="${n}" ${n > max ? "disabled" : ""}>${n} équipes</button>`).join("")}</div>
      <div class="teams">${G.teams.map(t => `<div class="team" style="--tc:${t.c}"><b>${esc(t.name)}</b><div class="team-members">${t.members.map(m => `<span class="mini">${av(m, "xs")}${esc(m)}</span>`).join("")}</div></div>`).join("")}</div>
      ${solo && G.kind !== "quiz" ? `<p class="hint">Dans une équipe d'une personne, ce sont les autres qui devinent. Les points vont à celle ou celui qui fait deviner.</p>` : ""}
    </div>
    ${G.kind === "mime" ? `<div class="panel"><span class="label">Mots</span>
      <div class="seg">${[["easy", "Faciles"], ["hard", "Difficiles"], ["mix", "Mélange"]].map(([k, l]) => `<button class="${G.diff === k ? "on" : ""}" data-act="diff" data-arg="${k}">${l}</button>`).join("")}</div>
      <p class="hint">${G.diff === "easy" ? "Animaux, objets, métiers, sports : des mots simples à mimer." : G.diff === "hard" ? "Films, personnages et actions détaillées : pour les pros du mime." : "Un peu de tout."}</p></div>` : ""}
    ${G.kind === "tu" ? `<div class="panel"><span class="label">Nombre de mots</span>
      <div class="seg">${[30, 40, 50].map(n => `<button class="${G.nWords === n ? "on" : ""}" data-act="tuWords" data-arg="${n}">${n} mots</button>`).join("")}</div></div>` : ""}
    ${G.kind === "quiz" ? `<div class="panel"><span class="label">Questions par équipe</span>
      <div class="seg">${[5, 10, 15].map(n => `<button class="${G.nQ === n ? "on" : ""}" data-act="quizN" data-arg="${n}">${n}</button>`).join("")}</div></div>` : `<div class="panel"><span class="label">Durée d'un tour</span>
      <div class="seg">${(G.kind === "tu" ? [30, 45, 60] : [45, 60, 90]).map(n => `<button class="${G.dur === n ? "on" : ""}" data-act="dur" data-arg="${n}">${n} s</button>`).join("")}</div>
    </div>`}`,
    foot: btn("Commencer", "teamsGo", { icon: "play" })
  });
}
const teamScore = () => {
  const best = Math.max(...G.teams.map(t => t.score));
  return `<ul class="list">${G.teams.map(t => `<li class="row-item${t.score === best && best > 0 ? " lead" : ""}" style="--tc:${t.c}"><i class="dot"></i><span class="grow"><b>${esc(t.name)}</b><small>${t.members.map(esc).join(", ")}</small></span><b class="num">${t.score}</b></li>`).join("")}</ul>`;
};
const actorOf = t => t.members[t.k % t.members.length];
function turnIntro() {
  const t = G.teams[G.cur], a = actorOf(t);
  const verb = G.kind === "mime" ? "mime" : "fait deviner";
  return screen({
    title: `${teamName()}, tour ${G.round}`, color: t.c, body: `
    <div class="hero">${av(a, "xl")}<span class="kicker">${esc(t.name)}</span><h2 class="big">${esc(a)}</h2>
    <p class="lead">${t.members.length === 1 ? `${verb} pour les autres joueurs.` : `${verb} pour son équipe. Les autres équipes ne regardent pas l'écran.`}</p></div>
    <span class="label">Scores</span>${teamScore()}`,
    foot: btn(`Lancer le chrono, ${G.dur} s`, "turnStart", { icon: "timer" }) + `<button class="textbtn" data-act="teamEnd">Terminer la partie</button>`
  });
}
function cardHTML() {
  const c = G.card;
  if (G.kind === "mime") return `<div class="card"><span class="card-label">${esc(c.cat)}</span><div class="word">${esc(c.w)}</div></div>`;
  return `<div class="card"><div class="word">${esc(c.w)}</div><div class="forbid">${c.f.map(f => `<span>${esc(f)}</span>`).join("")}</div></div>`;
}
function turnPlay() {
  const t = G.teams[G.cur], pts = G.log.reduce((s, l) => s + l.v, 0);
  return screen({
    title: actorOf(t), color: t.c, left: null, right: "stop", body: `
    ${timerHTML(timer ? timer.left : G.dur)}
    <div class="meta-row"><span class="kicker">${esc(t.name)}</span><span class="kicker">${ptsTxt(pts)}</span></div>
    ${cardHTML()}
    ${G.kind === "taboo" ? `<button class="btn outline-bad" data-act="mark" data-arg="-1">${ic("ban", 20)}<span>Mot interdit prononcé</span></button>` : ""}`,
    foot: `<div class="row2">${btn("Passer", "mark", { arg: "0", kind: "ghost", icon: "skip" })}${btn("Trouvé", "mark", { arg: "1", icon: "check" })}</div>`
  });
}
function turnEnd() {
  const t = G.teams[G.cur], pts = G.log.reduce((s, l) => s + l.v, 0);
  const lbl = v => v === 1 ? "+1" : v === -1 ? "−1" : "0";
  return screen({
    title: "Fin du tour", color: t.c, left: null, body: `
    <div class="hero"><span class="kicker">${esc(t.name)}</span><h2 class="big">${ptsTxt(pts)}</h2><p class="hint">Touche un mot pour corriger. Le dernier mot compte s'il a été trouvé au buzzer.</p></div>
    ${G.log.length ? `<ul class="list">${G.log.map((l, i) => `<li><button class="row-item" data-act="toggle" data-arg="${i}"><span class="grow">${esc(l.c.w)}${l.last ? `<small>Dernier mot</small>` : ""}</span><b class="badge ${l.v === 1 ? "b-good" : l.v === -1 ? "b-bad" : ""}">${lbl(l.v)}</b></button></li>`).join("")}</ul>` : `<p class="hint">Aucun mot cette fois.</p>`}`,
    foot: btn("Valider et équipe suivante", "turnValidate", { icon: "check" })
  });
}
function teamFinal() {
  const s = [...G.teams].sort((a, b) => b.score - a.score), tie = s[0].score === s[1].score;
  return screen({
    title: "Résultats", color: s[0].c, left: null, body: `
    <div class="hero">${ic(tie ? "medal" : "trophy", 44)}<span class="kicker">${tie ? "Égalité" : "Victoire"}</span><h2 class="big">${tie ? "Match nul" : esc(s[0].name)}</h2>
    ${tie ? "" : `<p class="lead">3 points bonus au classement pour ${s[0].members.map(esc).join(", ")}.</p>`}</div>
    ${teamScore()}`,
    foot: btn("Rejouer avec les mêmes équipes", "teamsAgain", { icon: "undo" }) + `<button class="textbtn" data-act="home">Retour aux jeux</button>`
  });
}

/* ---------- Action ou Vérité ---------- */
const avCur = () => G.order[G.i % G.order.length];
const levelName = k => AV_LEVELS.find(l => l[0] === k)[1];
function avTurn() {
  if (G.gate) return screen({
    title: "Action ou Vérité", color: "var(--c-av)", body: `
    <div class="hero">${ic("flame", 44)}<span class="kicker">Niveau +18</span><h2 class="big">Contenu sexuel explicite</h2>
    <p class="lead">Réservé aux adultes. Tout le monde doit être majeur et partant. Chacun peut refuser une carte avec le joker, sans se justifier.</p></div>`,
    foot: btn("Tout le monde est majeur", "avAdult", { kind: "danger" }) + `<button class="textbtn" data-act="avGateNo">Rester au niveau ${levelName(G.level)}</button>`
  });
  const p = avCur();
  return screen({
    title: "Action ou Vérité", color: "var(--c-av)", body: `
    <div class="seg">${AV_LEVELS.map(([k, l]) => `<button class="${G.level === k ? "on" : ""}" data-act="avLevel" data-arg="${k}">${l}</button>`).join("")}</div>
    <div class="hero">${av(p, "xl")}<span class="kicker">À toi de jouer</span><h2 class="big">${esc(p)}</h2><p class="lead">Action ou vérité ?</p></div>`,
    foot: `<div class="row2">${btn(`Vérité <small>${ptsTxt(AV_PTS.v + AV_BONUS[G.level])}</small>`, "avPick", { arg: "v", kind: "alt" })}${btn(`Action <small>${ptsTxt(AV_PTS.a + AV_BONUS[G.level])}</small>`, "avPick", { arg: "a" })}</div>
    <div class="row2 links"><button class="textbtn" data-act="avPick" data-arg="r">${ic("dices", 18)} Au hasard</button><button class="textbtn" data-act="avSkip">${ic("skip", 18)} Passer son tour</button></div>`
  });
}
function avCard() {
  const lab = { v: "Vérité", a: "Action", g: "Gage" }[G.type], p = avCur();
  const pts = G.type === "g" ? 0 : AV_PTS[G.type] + AV_BONUS[G.level];
  return screen({
    title: "Action ou Vérité", color: "var(--c-av)", body: `
    <div class="who">${av(p, "m")}<div><span class="kicker">${lab} pour</span><b>${esc(p)}</b></div></div>
    <div class="card"><span class="card-label">${lab}${G.type !== "g" ? ", niveau " + levelName(G.level) : ""}</span><div class="txt">${G.text}</div></div>`,
    foot: btn(pts ? `Fait <small>${ptsTxt(pts)}</small>` : "Fait", "avNext", { icon: "check" }) + (G.type !== "g" ? `<button class="textbtn" data-act="avJoker">Je ne peux pas, je choisis un gage</button>` : "")
  });
}

/* ---------- 2 vérités, 1 mensonge ---------- */
const tvmCur = () => G.order[G.i % G.order.length];
function tvm() {
  const p = tvmCur(), C = "var(--c-tvm)";
  if (G.step === "prep") return screen({
    title: "2 vérités, 1 mensonge", color: C, body: `
    <div class="hero">${av(p, "xl")}<span class="kicker">Au tour de</span><h2 class="big">${esc(p)}</h2><p class="lead">Prépare deux anecdotes vraies et une inventée, puis mélange l'ordre.</p></div>
    <div class="panel"><div class="panel-head"><span class="label">Idée de thème</span><button class="pill ghost" data-act="tvmTheme">${ic("shuffle", 16)} Autre</button></div><p class="theme">${esc(G.theme)}</p></div>
    <span class="label">Scores de la partie</span>${scoreList(Object.entries(G.scores).sort((a, b) => b[1] - a[1]))}`,
    foot: btn(`Je suis ${fe(p, "prête", "prêt")}`, "tvmReady", { icon: "check" })
  });
  if (G.step === "talk") return screen({
    title: "2 vérités, 1 mensonge", color: C, body: `
    <div class="who">${av(p, "m")}<div><span class="kicker">Raconte</span><b>${esc(p)}</b></div></div>
    <p class="lead">Annonce tes trois phrases. Les autres posent des questions pour te piéger.</p>
    ${timerHTML(timer ? timer.left : 60)}
    ${timer ? btn("Arrêter le chrono", "stopClock", { kind: "ghost", icon: "stop" }) : btn("Lancer 60 s de questions", "tvmDebate", { kind: "ghost", icon: "timer" })}`,
    foot: btn("Révéler le mensonge", "tvmVote", { icon: "eye" })
  });
  return screen({
    title: "2 vérités, 1 mensonge", color: C, body: `
    <h2 class="h2">Qui avait trouvé ?</h2><p class="hint">1 point par bonne réponse. Si personne n'a trouvé, ${esc(p)} gagne 2 points.</p>
    <div class="pickgrid">${others(p).map(o => `<button class="pickav${G.sel.includes(o) ? " on" : ""}" data-act="tvmSel" data-arg="${esc(o)}" aria-pressed="${G.sel.includes(o)}">${av(o, "m")}<span>${esc(o)}</span></button>`).join("")}</div>`,
    foot: btn(G.sel.length ? `Valider <small>${plural(G.sel.length, "bonne réponse")}</small>` : `Personne n'a trouvé <small>+2 pour ${esc(p)}</small>`, "tvmValidate", { icon: "check" })
  });
}

/* ---------- Undercover ---------- */
const UCC = "var(--c-uc)";
const maxImp = () => Math.floor((players.length - 1) / 2);
const ucSel = () => store.get("ucRoles", ["boss", "lovers"]);
const ucNeed = sel => sel.reduce((n, id) => n + (id === "lovers" ? 2 : 1), 0);
const spOf = id => UC_SPECIALS.find(s => s.id === id);
const roleName = r => ({ civil: "Civil", under: "Undercover", white: "Mr White" }[r]);
const roleCol = r => r === "civil" ? "var(--c-taboo)" : r === "under" ? "var(--c-av)" : "var(--c-tvm)";
function ucSetup() {
  const n = players.length, civ = n - G.nU - G.nW, sel = ucSel(), need = ucNeed(sel);
  const stepper = (lab, sub, act, val) => `<div class="stepper"><span class="grow"><b>${lab}</b><small>${sub}</small></span><button class="iconbtn round" data-act="${act}" data-arg="-1" aria-label="Moins">${ic("minus", 20)}</button><b class="num">${val}</b><button class="iconbtn round" data-act="${act}" data-arg="1" aria-label="Plus">${ic("plus", 20)}</button></div>`;
  return screen({
    title: "Undercover", color: UCC, body: `
    <p class="lead">Les civils ont tous le même mot. L'Undercover a un mot très proche et ne sait pas qu'il est l'intrus. Mr White n'a pas de mot et doit bluffer.</p>
    <div class="panel">${stepper("Undercover", "Reçoit un mot proche", "ucU", G.nU)}${stepper("Mr White", "Sans mot, ne commence jamais", "ucW", G.nW)}
      <p class="hint">${n} joueurs : ${plural(civ, "civil")}, ${G.nU} Undercover, ${G.nW} Mr White.</p></div>
    <div class="panel"><span class="label">Rôles spéciaux</span><p class="hint">Ils s'ajoutent au mot. Chacun découvre le sien en secret.</p>
      <ul class="list">${UC_SPECIALS.map(s => `<li><button class="row-item toggle${sel.includes(s.id) ? " on" : ""}" data-act="ucRole" data-arg="${s.id}" aria-pressed="${sel.includes(s.id)}"><span class="role-ic">${ic(s.icon, 20)}</span><span class="grow"><b>${s.name}</b><small>${s.d}</small></span><span class="check">${ic("check", 16)}</span></button></li>`).join("")}</ul>
      ${need > n ? `<p class="hint warn">Trop de rôles spéciaux pour ${n} joueurs. Retires-en un.</p>` : ""}</div>
    <details class="howto"><summary>${ic("info", 18)} Comment on joue</summary>
      <p>Chacun regarde son mot en secret. Dans l'ordre affiché, chacun dit un seul mot pour décrire le sien. On débat, puis tout le monde vote et on entre les votes un par un. Les civils gagnent s'ils éliminent tous les intrus. Les intrus gagnent s'il ne reste qu'un civil. Mr White éliminé peut voler la victoire en devinant le mot des civils.</p></details>`,
    foot: btn("Distribuer les rôles", "ucGo", { icon: "play", dis: need > n })
  });
}
function ucSpecialHTML(p) {
  if (!p.sp) return "";
  const s = spOf(p.sp);
  const txt = p.sp === "lovers" ? `Tu es ${fe(p.name, "amoureuse", "amoureux")} de <b>${esc(G.ps[p.lover].name)}</b>. Si l'un de vous est éliminé, l'autre part aussi.` : s.d;
  return `<div class="special"><span class="role-ic">${ic(s.icon, 20)}</span><div><span class="card-label">Rôle spécial secret</span><b>${s.name}</b><p>${txt}</p></div></div>`;
}
const ucWordCard = p => p.role === "white"
  ? `<div class="card"><span class="card-label">${esc(p.name)}, tu es</span><div class="word">Mr White</div><p class="card-foot">Tu n'as pas de mot. Écoute les autres et bluffe.</p>${ucSpecialHTML(p)}</div>`
  : `<div class="card"><span class="card-label">Ton mot, ${esc(p.name)}</span><div class="word">${esc(p.word)}</div><p class="card-foot">Décris-le avec un seul mot, sans être trop évident.</p>${ucSpecialHTML(p)}</div>`;
function ucDeal() {
  const p = G.ps[G.i], t = `Distribution ${G.i + 1} sur ${G.ps.length}`;
  if (!G.show) return screen({
    title: t, color: UCC, body: `<div class="hero">${av(p.name, "xl")}<span class="kicker">Passe le téléphone à</span><h2 class="big">${esc(p.name)}</h2><p class="lead">Les autres ne regardent pas l'écran.</p></div>`,
    foot: btn(`Je suis ${esc(p.name)}, voir mon mot`, "ucShow", { icon: "eye" })
  });
  return screen({ title: t, color: UCC, body: ucWordCard(p), foot: btn("J'ai retenu, je cache", "ucHide", { icon: "eyeOff" }) });
}
function ucOrder() {
  const alive = shuffle(G.ps.filter(p => p.alive));
  const k = alive.findIndex(p => p.role !== "white");
  G.order = k > 0 ? [...alive.slice(k), ...alive.slice(0, k)] : alive;
}
function ucTalk() {
  return screen({
    title: `Undercover, manche ${G.round}`, color: UCC, body: `
    <h2 class="h2">Ordre de parole</h2><p class="hint">Chacun dit un seul mot pour décrire le sien, dans cet ordre. Puis débat libre.</p>
    <ol class="list">${G.order.map((p, i) => `<li class="row-item"><span class="rank">${i + 1}</span>${av(p.name, "s")}<span class="grow">${esc(p.name)}</span></li>`).join("")}</ol>`,
    foot: btn("Passer au vote", "ucVoteStart", { icon: "vote" }) + `<button class="textbtn" data-act="ucPeekList">Quelqu'un a oublié son mot ?</button>`
  });
}
function ucPeek() {
  if (G.peek != null) return screen({ title: "Revoir un mot", color: UCC, body: ucWordCard(G.ps[G.peek]), foot: btn("Cacher", "ucPeekDone", { icon: "eyeOff" }) });
  return screen({
    title: "Revoir un mot", color: UCC, body: `<h2 class="h2">Qui a oublié ?</h2><p class="hint">Seule cette personne regarde l'écran.</p>
    <div class="pickgrid">${G.ps.map((p, i) => `<button class="pickav" data-act="ucPeek" data-arg="${i}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>`).join("")}</div>`,
    foot: btn("Retour", "ucBack", { kind: "ghost", icon: "back" })
  });
}
const ucVoters = () => G.ps.map((p, i) => i).filter(i => G.ps[i].alive || G.ps[i].sp === "ghost");
function ucVote() {
  const voters = G.voters;
  if (G.vi < voters.length) {
    const vIdx = voters[G.vi], v = G.ps[vIdx];
    return screen({
      title: `Vote ${G.vi + 1} sur ${voters.length}`, color: UCC, body: `
      <div class="who">${av(v.name, "m")}<div><span class="kicker">${v.alive ? "Vote de" : "Vote du fantôme"}</span><b>${esc(v.name)}</b></div></div>
      <p class="hint">À trois, tout le monde pointe quelqu'un. Puis entre le vote de chacun ici.</p>
      <div class="pickgrid">${G.ps.map((p, i) => p.alive && i !== vIdx ? `<button class="pickav" data-act="ucCast" data-arg="${i}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>` : "").join("")}</div>`,
      foot: G.vi > 0 ? btn("Corriger le vote précédent", "ucUncast", { kind: "ghost", icon: "undo" }) : btn("Retour au débat", "ucBack", { kind: "ghost", icon: "back" })
    });
  }
  const tally = {};
  voters.forEach(vi => { const t = G.votes[vi]; tally[t] = (tally[t] || 0) + (G.ps[vi].sp === "boss" ? 2 : 1); });
  const rows = Object.entries(tally).sort((a, b) => b[1] - a[1]);
  const top = rows[0][1], tied = rows.filter(r => r[1] === top).map(r => +r[0]);
  return screen({
    title: "Résultat du vote", color: UCC, body: `
    <ul class="list">${rows.map(([i, v]) => `<li class="row-item${v === top ? " lead" : ""}">${av(G.ps[i].name, "s")}<span class="grow">${esc(G.ps[i].name)}</span><b class="num">${v} voix</b></li>`).join("")}</ul>
    ${tied.length > 1 ? `<h2 class="h2">Égalité</h2><p class="hint">Débat express entre ${tied.map(i => esc(G.ps[i].name)).join(" et ")}, puis le groupe choisit qui part.</p>
    <div class="pickgrid">${tied.map(i => `<button class="pickav" data-act="ucElim" data-arg="${i}">${av(G.ps[i].name, "m")}<span>${esc(G.ps[i].name)}</span></button>`).join("")}</div>` : ""}`,
    foot: (tied.length === 1 ? btn(`Éliminer ${esc(G.ps[tied[0]].name)}`, "ucElim", { arg: tied[0], kind: "danger", icon: "skull" }) : "") + `<button class="textbtn" data-act="ucVoteStart">Refaire le vote</button>`
  });
}
function ucEliminate(i, cause) { G.queue.push({ i, cause }); ucProcess(); }
function ucProcess() {
  if (!G.queue.length) return ucCheck();
  const q = G.queue[0], p = G.ps[q.i];
  if (!q.started) {
    q.started = true;
    if (q.cause === "vote" && p.sp === "shield" && !p.shieldUsed) { p.shieldUsed = true; q.saved = true; }
    else {
      p.alive = false;
      if (p.sp === "clown" && q.cause === "vote" && G.round === 1) p.clownWin = true;
      if (p.lover != null && G.ps[p.lover].alive && !G.queue.some(x => x.i === p.lover)) G.queue.push({ i: p.lover, cause: "love" });
    }
  }
  go(ucReveal);
}
function ucReveal() {
  const q = G.queue[0], p = G.ps[q.i];
  if (q.saved) return screen({
    title: "Révélation", color: UCC, body: `<div class="hero">${av(p.name, "xl")}<span class="kicker">${ic("shield", 16)} Bouclier</span><h2 class="big">${esc(p.name)} reste en jeu</h2><p class="lead">${fe(p.name, "Elle", "Il")} était ${fe(p.name, "protégée", "protégé")}. Son rôle reste secret.</p></div>`,
    foot: btn("Continuer", "ucNext", { icon: "play" })
  });
  const why = q.cause === "love" ? `meurt de chagrin, ${fe(p.name, "amoureuse", "amoureux")} de ${esc(G.ps[p.lover].name)}` : q.cause === "revenge" ? `est ${fe(p.name, "emportée", "emporté")} par le Vengeur` : `est ${fe(p.name, "éliminée", "éliminé")} par le vote`;
  const sp = p.sp ? spOf(p.sp) : null;
  let body = `<div class="hero">${av(p.name, "xl")}<p class="lead">${esc(p.name)} ${why}.</p></div>
    <div class="card" style="--gc:${roleCol(p.role)}"><span class="card-label">Son rôle</span><div class="word">${roleName(p.role)}</div>${p.role !== "white" ? `<p class="card-foot">Son mot : <b>${esc(p.word)}</b></p>` : ""}
    ${sp ? `<div class="special"><span class="role-ic">${ic(sp.icon, 20)}</span><div><span class="card-label">Rôle spécial</span><b>${sp.name}</b>${p.clownWin ? `<p>Éliminé au premier vote : 3 points pour ${esc(p.name)}.</p>` : ""}</div></div>` : ""}</div>`;
  let foot = btn("Continuer", "ucNext", { icon: "play" });
  if (p.role === "white" && !q.wDone) {
    if (q.wShown) {
      body += `<div class="hero"><span class="kicker">Le mot des civils était</span><h2 class="big">${esc(G.pair[0])}</h2></div>`;
      foot = `<div class="row2">${btn("Raté", "ucWhite", { arg: "0", kind: "ghost", icon: "x" })}${btn("Trouvé", "ucWhite", { arg: "1", icon: "check" })}</div>`;
    } else {
      body += `<p class="lead center">Dernière chance : ${esc(p.name)} annonce à voix haute le mot des civils.</p>`;
      foot = btn("Révéler le mot des civils", "ucWShow", { icon: "eye" });
    }
  } else if (p.sp === "avenger" && !q.revDone) {
    const alive = G.ps.map((x, i) => i).filter(i => G.ps[i].alive && !G.queue.some(y => y.i === i));
    body += `<h2 class="h2">${ic("swords", 20)} Vengeance</h2><p class="hint">${esc(p.name)} choisit qui emporter avec ${fe(p.name, "elle", "lui")}.</p>
      <div class="pickgrid">${alive.map(i => `<button class="pickav" data-act="ucRevenge" data-arg="${i}">${av(G.ps[i].name, "m")}<span>${esc(G.ps[i].name)}</span></button>`).join("")}</div>`;
    foot = "";
  }
  return screen({ title: "Révélation", color: UCC, body, foot });
}
function ucFinish(w) {
  G.winner = w; G.gamePts = {};
  const give = (n, v) => { G.gamePts[n] = (G.gamePts[n] || 0) + v; };
  G.ps.forEach(p => {
    if (w === "civ" && p.role === "civil") give(p.name, UC_PTS.civil);
    if (w === "imp" && p.role !== "civil") give(p.name, UC_PTS[p.role]);
    if (w === "white" && p.role === "white") give(p.name, UC_PTS.white);
    if (p.clownWin) give(p.name, 3);
    if (p.sp === "lovers" && p.alive && G.ps[p.lover].alive) give(p.name, 2);
  });
  Object.entries(G.gamePts).forEach(([n, v]) => { addPts(n, v); G.ucScores[n] = (G.ucScores[n] || 0) + v; });
  go(ucEnd);
}
function ucEnd() {
  const civWin = G.winner === "civ";
  const title = civWin ? "Les civils gagnent" : G.winner === "white" ? "Mr White gagne" : "Les intrus gagnent";
  const session = Object.entries(G.ucScores).sort((a, b) => b[1] - a[1]);
  return screen({
    title: "Fin de la partie", color: UCC, left: null, body: `
    <div class="hero">${ic("trophy", 44)}<h2 class="big">${title}</h2>
    <div class="pair"><span><small>Civils</small><b>${esc(G.pair[0])}</b></span><span><small>Undercover</small><b>${esc(G.pair[1])}</b></span></div></div>
    <ul class="list">${G.ps.map(p => `<li class="row-item" style="--tc:${roleCol(p.role)}">${av(p.name, "s")}<span class="grow"><b>${esc(p.name)}</b><small>${roleName(p.role)}${p.sp ? ", " + spOf(p.sp).name : ""}${p.alive ? "" : ", " + fe(p.name, "éliminée", "éliminé")}</small></span><b class="badge ${G.gamePts[p.name] ? "b-good" : ""}">${G.gamePts[p.name] ? "+" + G.gamePts[p.name] : "0"}</b></li>`).join("")}</ul>
    ${session.length ? `<span class="label">Points Undercover de la soirée</span>${scoreList(session)}` : ""}`,
    foot: btn("Rejouer avec d'autres mots", "ucGo", { icon: "undo" }) + `<div class="row2 links"><button class="textbtn" data-act="ucSettings">Réglages</button><button class="textbtn" data-act="home">Retour aux jeux</button></div>`
  });
}
function ucCheck() {
  const alive = G.ps.filter(p => p.alive);
  const imp = alive.filter(p => p.role !== "civil").length, civ = alive.length - imp;
  if (imp === 0) return ucFinish("civ");
  if (civ <= 1) return ucFinish("imp");
  G.round++; ucOrder(); go(ucTalk);
}

/* ---------- Jeu mystère ---------- */
function mys() {
  const c = G.card, T = c ? MYS_TYPES[c.t] : null;
  let win = "";
  if (c && !G.scored) {
    if (c.t === "duel") win = `<span class="label">Qui gagne le duel ? 2 points</span><div class="pickgrid two">${[G.p1, G.p2].map(n => `<button class="pickav" data-act="mysWin" data-arg="${esc(n)}|2">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`;
    else if (c.t === "defi") win = `<span class="label">Défi réussi ? 2 points pour ${esc(G.p1)}</span><div class="row2">${btn("Raté", "mysWin", { arg: "|0", kind: "ghost", icon: "x" })}${btn("Réussi", "mysWin", { arg: G.p1 + "|2", kind: "ghost", icon: "check" })}</div>`;
    else if (c.t === "devine" || c.t === "patate") win = `<span class="label">${c.t === "devine" ? "Qui a trouvé ? 1 point" : "Qui gagne ? 2 points"}</span><div class="pickgrid">${(c.t === "devine" ? others(G.p1) : players).map(n => `<button class="pickav" data-act="mysWin" data-arg="${esc(n)}|${c.t === "devine" ? 1 : 2}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`;
  }
  return screen({
    title: "Jeu mystère", color: T ? T.c : "var(--c-mys)", body: c ? `
    <div class="card"><span class="card-label">${ic(T.icon, 16)} ${T.label}</span><div class="txt">${G.text}</div><p class="card-foot">${T.foot}</p></div>
    ${c.s ? `${timerHTML(timer ? timer.left : c.s)}${timer ? btn("Arrêter le chrono", "stopClock", { kind: "ghost", icon: "stop" }) : btn(`Lancer le chrono, ${c.s} s`, "mysTimer", { kind: "ghost", icon: "timer" })}` : ""}
    ${win}
    ${G.rule && c.t !== "regle" ? `<div class="rule"><span class="label">${ic("gavel", 14)} Règle en cours</span><p>${G.rule}</p></div>` : ""}` : `
    <div class="hero">${ic("dices", 48)}<h2 class="big">Paquet mystère</h2><p class="lead">Qui pourrait, Je n'ai jamais, défis, duels, patate chaude, devinettes et règles absurdes. On tire une carte et on voit.</p></div>`,
    foot: btn(c ? "Carte suivante" : "Tirer une carte", "mysDraw", { icon: "dices" }) + (c ? `<button class="textbtn" data-act="mysGage">Quelqu'un ne peut pas le faire : gage</button>` : "")
  });
}

/* ---------- Time's Up ---------- */
const TU_ROUNDS = [
  { name: "Manche 1 : décrire", short: "Décrire", icon: "quote", rule: "Fais deviner avec autant de mots que tu veux, sans dire le mot ni un mot de la même famille." },
  { name: "Manche 2 : un seul mot", short: "Un seul mot", icon: "zap", rule: "Un seul mot pour faire deviner. Ton équipe n'a droit qu'à une proposition par mot." },
  { name: "Manche 3 : mimer", short: "Mimer", icon: "drama", rule: "Uniquement des gestes et des bruitages, aucun mot." }
];
function tuRoundIntro() {
  const r = TU_ROUNDS[G.round];
  return screen({
    title: "Time's Up", color: "var(--c-tu)", body: `
    <div class="hero">${ic(r.icon, 44)}<span class="kicker">${G.round + 1} sur 3</span><h2 class="big">${r.short}</h2><p class="lead">${r.rule}</p></div>
    <p class="hint center">Les ${G.words.length} mots de la partie reviennent dans chaque manche. Une manche se termine quand tous les mots ont été trouvés.</p>
    <span class="label">Scores</span>${teamScore()}`,
    foot: btn("Commencer la manche", "tuRoundStart", { icon: "play" }) + `<button class="textbtn" data-act="teamEnd">Terminer la partie</button>`
  });
}
function tuTurnIntro() {
  const t = G.teams[G.cur], a = actorOf(t);
  return screen({
    title: TU_ROUNDS[G.round].name, color: t.c, body: `
    <div class="hero">${av(a, "xl")}<span class="kicker">${esc(t.name)}</span><h2 class="big">${esc(a)}</h2>
    <p class="lead">${t.members.length === 1 ? "fait deviner aux autres joueurs." : "fait deviner à son équipe."} ${plural(G.pool.length, "mot")} à trouver dans cette manche.</p></div>
    <span class="label">Scores</span>${teamScore()}`,
    foot: btn(`Lancer le chrono, ${G.dur} s`, "tuStart", { icon: "timer" }) + `<button class="textbtn" data-act="teamEnd">Terminer la partie</button>`
  });
}
function tuPlay() {
  const t = G.teams[G.cur];
  return screen({
    title: actorOf(t), color: t.c, left: null, right: `<button class="iconbtn" data-act="tuStop" aria-label="Arrêter le tour">${ic("stop")}</button>`, body: `
    ${timerHTML(timer ? timer.left : G.dur)}
    <div class="meta-row"><span class="kicker">${TU_ROUNDS[G.round].short}</span><span class="kicker">${plural(G.pool.length + 1, "mot")} restant${G.pool.length ? "s" : ""}</span></div>
    <div class="card"><span class="card-label">${plural(G.log.length, "trouvé")}</span><div class="word">${esc(G.card)}</div></div>`,
    foot: `<div class="row2">${btn("Passer", "tuMark", { arg: "0", kind: "ghost", icon: "skip" })}${btn("Trouvé", "tuMark", { arg: "1", icon: "check" })}</div>`
  });
}
function tuTurnEnd() {
  const t = G.teams[G.cur], pts = G.log.filter(l => l.ok).length;
  return screen({
    title: "Fin du tour", color: t.c, left: null, body: `
    <div class="hero"><span class="kicker">${esc(t.name)}</span><h2 class="big">${ptsTxt(pts)}</h2><p class="hint">Touche un mot pour l'annuler s'il n'a pas été trouvé correctement : il reviendra dans la manche.</p></div>
    ${G.log.length ? `<ul class="list">${G.log.map((l, i) => `<li><button class="row-item" data-act="tuToggle" data-arg="${i}"><span class="grow">${esc(l.w)}</span><b class="badge ${l.ok ? "b-good" : ""}">${l.ok ? "+1" : "0"}</b></button></li>`).join("")}</ul>` : `<p class="hint">Aucun mot trouvé cette fois.</p>`}`,
    foot: btn(G.pool.length || G.log.some(l => !l.ok) ? "Valider et équipe suivante" : "Valider et finir la manche", "tuValidate", { icon: "check" })
  });
}

/* ---------- Quiz ---------- */
function quizQ() {
  const t = G.teams[G.cur], q = G.q, done = G.ans != null;
  return screen({
    title: `Question ${G.asked + 1} sur ${G.total}`, color: t.c, body: `
    <div class="who"><i class="dot" style="--tc:${t.c};width:16px;height:16px"></i><div><span class="kicker">Au tour de</span><b>${esc(t.name)}</b></div></div>
    <div class="card"><span class="card-label">${esc(q.cat)}</span><div class="txt">${esc(q.q)}</div></div>
    <ul class="list">${G.opts.map((o, i) => {
      const cls = !done ? "" : o === q.a ? " right" : i === G.ans ? " wrong" : " dim";
      return `<li><button class="row-item answer${cls}" data-act="quizAns" data-arg="${i}" ${done ? "disabled" : ""}><span class="opt">${"ABCD"[i]}</span><span class="grow">${esc(o)}</span>${done && o === q.a ? ic("check", 20) : done && i === G.ans ? ic("x", 20) : ""}</button></li>`;
    }).join("")}</ul>
    ${done ? `<p class="lead center">${G.opts[G.ans] === q.a ? `Bonne réponse, un point pour ${esc(t.name)}.` : `Raté. La bonne réponse était ${esc(q.a.replace(/^(L'|Le |La |Les )/, m => m.toLowerCase()))}.`}</p>` : ""}`,
    foot: done ? btn(G.asked + 1 >= G.total ? "Voir les résultats" : "Question suivante", "quizNext", { icon: "play" }) : `<p class="hint center">${esc(t.name)} se met d'accord, puis touche sa réponse.</p>`
  });
}

/* ---------- La Bombe ---------- */
let bombT = null;
function stopBomb() { if (bombT) { clearTimeout(bombT); bombT = null; } }
function bomb() {
  const C = "var(--c-bomb)";
  if (G.state === "ticking") return screen({
    title: "La Bombe", color: C, body: `
    <div class="hero bomb-live">${ic("bomb", 72)}<span class="kicker">La mèche est allumée</span><h2 class="big">${esc(G.theme)}</h2>
    <p class="lead">Donne une réponse puis passe vite le téléphone à ta gauche. Pas de répétition !</p></div>`
  });
  if (G.state === "boom") return screen({
    title: "La Bombe", color: C, body: G.loser == null ? `
    <div class="hero">${ic("bomb", 56)}<h2 class="big boom">Boum !</h2><p class="lead">Qui tenait la bombe ?</p></div>
    <div class="pickgrid">${players.map(n => `<button class="pickav" data-act="bombLoser" data-arg="${esc(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>` : `
    <div class="hero">${av(G.loser, "xl")}<span class="kicker">Perdu</span><h2 class="big">${esc(G.loser)}</h2><p class="lead">Les autres gagnent 1 point. ${esc(G.loser)} choisit son gage.</p></div>`,
    foot: G.loser == null ? "" : btn("Nouvelle manche", "bombNew", { icon: "undo" }) + `<button class="textbtn" data-act="bombGage">Revoir les gages</button>`
  });
  return screen({
    title: "La Bombe", color: C, body: `
    <div class="card"><span class="card-label">${ic("bomb", 16)} Thème</span><div class="word">${esc(G.theme)}</div></div>
    <p class="lead">Chacun son tour, donne une réponse qui colle au thème, puis passe le téléphone à ta gauche. La bombe explose à un moment au hasard : celle ou celui qui la tient a perdu.</p>`,
    foot: btn("Allumer la mèche", "bombStart", { icon: "flame" }) + `<button class="textbtn" data-act="bombTheme">${ic("shuffle", 18)} Autre thème</button>`
  });
}

/* ---------- Tu préfères ---------- */
const WYR_LEVELS = [["normal", "Normal"], ["hot", "Épicé"], ["x18", "+18"]];
function gateScreen(title, color, okAct, noAct) {
  return screen({
    title, color, body: `
    <div class="hero">${ic("flame", 44)}<span class="kicker">Niveau +18</span><h2 class="big">Contenu sexuel explicite</h2>
    <p class="lead">Réservé aux adultes. Tout le monde doit être majeur et partant. Chacun peut passer une carte sans se justifier.</p></div>`,
    foot: btn("Tout le monde est majeur", okAct, { kind: "danger" }) + `<button class="textbtn" data-act="${noAct}">Rester au niveau actuel</button>`
  });
}
function wyr() {
  const C = "var(--c-wyr)";
  if (G.gate) return gateScreen("Tu préfères", C, "wyrAdult", "wyrGateNo");
  const [a, b] = G.card;
  if (G.step === "result") {
    const A_ = G.sel, B_ = players.filter(n => !G.sel.includes(n));
    const minority = A_.length === B_.length ? null : A_.length < B_.length ? A_ : B_;
    const col = (lab, txt, list) => `<div class="panel"><span class="label">${lab}</span><b>${esc(txt)}</b><div class="team-members">${list.length ? list.map(n => `<span class="mini">${av(n, "xs")}${esc(n)}</span>`).join("") : `<small>Personne</small>`}</div></div>`;
    return screen({
      title: "Tu préfères", color: C, body: `
      <h2 class="h2">${minority ? (minority.length ? "La minorité prend un gage" : "Tout le monde est d'accord") : "Égalité parfaite"}</h2>
      <p class="hint">${minority && minority.length ? "La majorité gagne 1 point. La minorité boit une gorgée ou prend un gage." : "Personne ne gagne de point sur ce dilemme."}</p>
      ${col("Choix A", a, A_)}${col("Choix B", b, B_)}`,
      foot: btn("Dilemme suivant", "wyrNext", { icon: "play" }) + (minority && minority.length ? `<button class="textbtn" data-act="wyrGage">Choisir le gage de la minorité</button>` : "")
    });
  }
  return screen({
    title: "Tu préfères", color: C, body: `
    <div class="seg">${WYR_LEVELS.map(([k, l]) => `<button class="${G.level === k ? "on" : ""}" data-act="wyrLevel" data-arg="${k}">${l}</button>`).join("")}</div>
    <div class="dilemma"><div class="choice"><span class="opt">A</span><b>${esc(a)}</b></div><span class="or">ou</span><div class="choice"><span class="opt">B</span><b>${esc(b)}</b></div></div>
    <span class="label">À trois, levez la main pour A. Touche les personnes qui ont choisi A.</span>
    <div class="pickgrid">${players.map(n => `<button class="pickav${G.sel.includes(n) ? " on" : ""}" data-act="wyrSel" data-arg="${esc(n)}" aria-pressed="${G.sel.includes(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`,
    foot: btn(`Valider <small>${G.sel.length} pour A, ${players.length - G.sel.length} pour B</small>`, "wyrValidate", { icon: "check" }) + `<button class="textbtn" data-act="wyrNext">${ic("skip", 18)} Passer ce dilemme</button>`
  });
}

/* ---------- Je n'ai jamais ---------- */
const NHIE_LEVELS = [["soft", "Soft"], ["fun", "Fun"], ["hot", "Épicé"], ["x18", "+18"]];
function nhie() {
  const C = "var(--c-nhie)";
  if (G.gate) return gateScreen("Je n'ai jamais", C, "nhieAdult", "nhieGateNo");
  return screen({
    title: "Je n'ai jamais", color: C, body: `
    <div class="seg">${NHIE_LEVELS.map(([k, l]) => `<button class="${G.level === k ? "on" : ""}" data-act="nhieLevel" data-arg="${k}">${l}</button>`).join("")}</div>
    <div class="card"><span class="card-label">${ic("wine", 16)} Je n'ai jamais…</span><div class="txt">${esc(G.card)}.</div></div>
    <span class="label">Qui l'a déjà fait ? 1 point par aveu</span>
    <div class="pickgrid">${players.map(n => `<button class="pickav${G.sel.includes(n) ? " on" : ""}" data-act="nhieSel" data-arg="${esc(n)}" aria-pressed="${G.sel.includes(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`,
    foot: btn(G.sel.length ? `Carte suivante <small>${plural(G.sel.length, "aveu")}</small>` : "Carte suivante", "nhieNext", { icon: "play" })
  });
}

/* ---------- Loup-garou ---------- */
const LGC = "var(--c-lg)";
let voiceOn = store.get("voice", true);
let lastSay = "", frVoice = null;
/* Voix du meneur : la meilleure voix française disponible sur le téléphone */
function pickVoice() {
  try {
    const vs = speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang));
    const pref = ["Amélie", "Thomas", "Audrey", "Aurélie", "Google français", "Marie", "Daniel"];
    frVoice = pref.map(p => vs.find(v => v.name.includes(p))).find(Boolean) || vs.find(v => v.lang === "fr-FR") || vs[0] || null;
  } catch (e) {}
}
if (window.speechSynthesis) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
function say(t) {
  lastSay = t;
  try {
    if (!voiceOn || !window.speechSynthesis) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(t);
    u.lang = "fr-FR"; if (frVoice) u.voice = frVoice;
    u.rate = 0.92; u.pitch = 0.9; u.volume = 1;
    speechSynthesis.speak(u);
  } catch (e) {}
}
const lgSel = () => store.get("lgRoles", ["seer", "witch"]);
const lgMaxW = () => Math.max(1, Math.ceil(players.length / 2) - 1);
const lgOk = () => G.nW >= 1 && G.nW <= lgMaxW() && G.nW + lgSel().length <= players.length;
const lgRole = p => LG_ROLES[p.role];
const lgAlive = () => G.ps.filter(p => p.alive);
const lgIdx = p => G.ps.indexOf(p);
function lgSetup() {
  const n = players.length, sel = lgSel(), vill = n - G.nW - sel.length;
  return screen({
    title: "Loup-garou", color: LGC, body: `
    <p class="lead">Chaque nuit, les loups dévorent un villageois. Chaque jour, le village vote pour éliminer un suspect. L'appli fait le meneur : posez le téléphone au centre pendant la nuit et suivez la voix.</p>
    <div class="panel"><div class="stepper"><span class="grow"><b>Loups-garous</b><small>Au maximum ${lgMaxW()} pour ${n} joueurs</small></span><button class="iconbtn round" data-act="lgW" data-arg="-1" aria-label="Moins">${ic("minus", 20)}</button><b class="num">${G.nW}</b><button class="iconbtn round" data-act="lgW" data-arg="1" aria-label="Plus">${ic("plus", 20)}</button></div>
      <p class="hint">${n} joueurs : ${plural(G.nW, "loup")}, ${sel.length} rôle${sel.length > 1 ? "s" : ""} spécia${sel.length > 1 ? "ux" : "l"}, ${Math.max(0, vill)} villageois.</p></div>
    <div class="panel"><span class="label">Rôles spéciaux du village</span>
      <ul class="list">${LG_SPECIALS.map(id => { const r = LG_ROLES[id], on = sel.includes(id); return `<li><button class="row-item toggle${on ? " on" : ""}" data-act="lgRole" data-arg="${id}" aria-pressed="${on}"><span class="role-ic">${ic(r.icon, 20)}</span><span class="grow"><b>${r.name}</b><small>${r.d}</small></span><span class="check">${ic("check", 16)}</span></button></li>`; }).join("")}</ul>
      ${G.nW + sel.length > n ? `<p class="hint warn">Trop de rôles pour ${n} joueurs. Retires-en un.</p>` : ""}</div>
    <button class="row-item toggle${voiceOn ? " on" : ""}" data-act="lgVoice" aria-pressed="${voiceOn}"><span class="role-ic">${ic(voiceOn ? "volume" : "volumeOff", 20)}</span><span class="grow"><b>Voix du meneur</b><small>Le téléphone annonce la nuit, les morts, le débat et le vote. Monte le son.</small></span><span class="check">${ic("check", 16)}</span></button>
    ${voiceOn ? `<button class="textbtn" data-act="lgTestVoice">${ic("volume", 18)} Tester la voix</button>` : ""}`,
    foot: btn("Distribuer les rôles", "lgGo", { icon: "play", dis: !lgOk() })
  });
}
function lgRoleCard(p) {
  const r = lgRole(p), wolves = G.ps.filter(x => x.role === "wolf" && x !== p);
  return `<div class="card"><span class="card-label">${esc(p.name)}, tu es</span><span class="role-big">${ic(r.icon, 40)}</span><div class="word">${r.name}</div><p class="card-foot">${r.d}</p>
  ${p.role === "wolf" && wolves.length ? `<div class="special"><span class="role-ic">${ic("paw", 20)}</span><div><span class="card-label">Ta meute</span><b>${wolves.map(w => esc(w.name)).join(", ")}</b></div></div>` : ""}</div>`;
}
function lgDeal() {
  const p = G.ps[G.i], t = `Distribution ${G.i + 1} sur ${G.ps.length}`;
  if (!G.show) return screen({
    title: t, color: LGC, body: `<div class="hero">${av(p.name, "xl")}<span class="kicker">Passe le téléphone à</span><h2 class="big">${esc(p.name)}</h2><p class="lead">Les autres ne regardent pas l'écran.</p></div>`,
    foot: btn(`Je suis ${esc(p.name)}, voir mon rôle`, "lgShow", { icon: "eye" })
  });
  return screen({ title: t, color: LGC, body: lgRoleCard(p), foot: btn("J'ai retenu, je cache", "lgHide", { icon: "eyeOff" }) });
}
const LG_STEP = {
  cupid: { who: "Cupidon", wake: "Cupidon, ouvre les yeux et désigne deux amoureux.", sleep: "Cupidon, ferme les yeux." },
  lovers: { who: "Les amoureux", wake: "Cupidon touche l'épaule des deux amoureux. Amoureux, ouvrez les yeux et regardez l'écran.", sleep: "Amoureux, fermez les yeux." },
  wolves: { who: "Les loups-garous", wake: "Loups-garous, ouvrez les yeux et choisissez votre victime.", sleep: "Loups-garous, fermez les yeux." },
  seer: { who: "La voyante", wake: "Voyante, ouvre les yeux et choisis un joueur dont tu veux connaître le rôle.", sleep: "Voyante, ferme les yeux." },
  witch: { who: "La sorcière", wake: "Sorcière, ouvre les yeux.", sleep: "Sorcière, ferme les yeux." }
};
const lgPickGrid = (list, act, sel = []) => `<div class="pickgrid">${list.map(p => `<button class="pickav${sel.includes(lgIdx(p)) ? " on" : ""}" data-act="${act}" data-arg="${lgIdx(p)}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>`).join("")}</div>`;
function lgNight() {
  const title = `Nuit ${G.night}`;
  if (G.si < 0) return screen({
    title, color: LGC, body: `<div class="hero">${ic("moon", 56)}<h2 class="big">La nuit tombe</h2><p class="lead">Tout le monde ferme les yeux. Pose le téléphone au centre, écran visible. Seules les personnes appelées ouvrent les yeux.</p></div>`,
    foot: btn("Commencer la nuit", "lgNightNext", { icon: "moon" })
  });
  const step = G.steps[G.si], S = LG_STEP[step];
  if (G.sub === "sleep") return screen({
    title, color: LGC, body: `<div class="hero">${ic("moon", 48)}<span class="kicker">${S.who}</span><h2 class="big">${S.sleep}</h2></div>`,
    foot: btn("Suivant", "lgNightNext", { icon: "play" })
  });
  let body = `<div class="hero"><span class="kicker">${S.who}</span><p class="lead">${S.wake}</p></div>`, foot = "";
  if (step === "cupid") {
    body += lgPickGrid(lgAlive(), "lgPick", G.pick);
    foot = btn("Valider les amoureux", "lgCupid", { icon: "heart", dis: G.pick.length !== 2 });
  } else if (step === "lovers") {
    const [a, b] = G.ps.filter(p => p.lover != null);
    body += `<div class="pair-av">${av(a.name, "l")}${ic("heart", 28)}${av(b.name, "l")}</div><h2 class="big center">${esc(a.name)} et ${esc(b.name)}</h2><p class="hint center">Si l'un de vous meurt, l'autre meurt aussi. Si vous êtes les deux derniers en vie, vous gagnez ensemble.</p>`;
    foot = btn("Nous avons vu", "lgSleep", { icon: "eyeOff" });
  } else if (step === "wolves") {
    body += lgPickGrid(lgAlive().filter(p => p.role !== "wolf"), "lgPick", G.pick);
    foot = btn("Valider la victime", "lgWolves", { icon: "paw", dis: G.pick.length !== 1 });
  } else if (step === "seer") {
    if (G.seen != null) {
      const p = G.ps[G.seen];
      body = `<div class="hero">${av(p.name, "xl")}<span class="kicker">Rôle de ${esc(p.name)}</span><h2 class="big">${lgRole(p).name}</h2></div>`;
      foot = btn("J'ai vu", "lgSleep", { icon: "eyeOff" });
    } else {
      const seer = G.ps.find(p => p.role === "seer");
      body += lgPickGrid(lgAlive().filter(p => p !== seer), "lgSeer");
    }
  } else if (step === "witch") {
    const v = G.victim != null ? G.ps[G.victim] : null;
    if (G.wmode === "poison") {
      body = `<div class="hero"><span class="kicker">Potion de mort</span><p class="lead">Qui veux-tu empoisonner ?</p></div>${lgPickGrid(lgAlive().filter(p => p.role !== "witch"), "lgPoison")}`;
      foot = btn("Retour", "lgWitchBack", { kind: "ghost", icon: "back" });
    } else {
      body += v ? `<div class="hero">${av(v.name, "l")}<p class="lead">Les loups ont attaqué <b>${esc(v.name)}</b>.</p></div>` : `<p class="lead center">Personne n'a été attaqué cette nuit.</p>`;
      foot = (v && G.potions.life ? btn(`Sauver ${esc(v.name)}`, "lgSave", { icon: "flask" }) : "")
        + (G.potions.death ? btn("Utiliser la potion de mort", "lgWitchPoison", { kind: "ghost", icon: "skull" }) : "")
        + `<button class="textbtn" data-act="lgSleep">Ne rien faire</button>`;
      body += `<p class="hint center">Potion de vie : ${G.potions.life ? "disponible" : "utilisée"}. Potion de mort : ${G.potions.death ? "disponible" : "utilisée"}.</p>`;
    }
  }
  return screen({ title, color: LGC, body, foot });
}
function lgDayIntro() {
  const dead = G.queue.map(q => G.ps[q.i]);
  return screen({
    title: `Jour ${G.night}`, color: LGC, body: `<div class="hero">${ic("sun", 56)}<h2 class="big">Le village se réveille</h2>
    <p class="lead">${dead.length ? `Cette nuit, ${dead.map(p => esc(p.name)).join(" et ")} ${dead.length > 1 ? "ont été retrouvés morts" : `a été ${fe(dead[0].name, "retrouvée morte", "retrouvé mort")}`}.` : "Personne n'est mort cette nuit."}</p></div>`,
    foot: dead.length ? btn("Révéler les rôles", "lgProcess", { icon: "eye" }) : btn("Passer au débat", "lgDebate", { icon: "play" })
  });
}
function lgReveal() {
  const q = G.queue[0], p = G.ps[q.i], r = lgRole(p);
  const why = { wolves: "dévoré par les loups", poison: "empoisonné par la sorcière", love: "mort de chagrin", hunter: "abattu par le chasseur", vote: "éliminé par le village" }[q.cause];
  const whyF = { wolves: "dévorée par les loups", poison: "empoisonnée par la sorcière", love: "morte de chagrin", hunter: "abattue par le chasseur", vote: "éliminée par le village" }[q.cause];
  let body = `<div class="hero">${av(p.name, "xl")}<p class="lead">${esc(p.name)} a été ${fe(p.name, whyF, why)}.</p></div>
    <div class="card"><span class="card-label">Son rôle</span><span class="role-big">${ic(r.icon, 40)}</span><div class="word">${r.name}</div></div>`;
  let foot = btn("Continuer", "lgNext", { icon: "play" });
  if (p.role === "hunter" && !q.shot) {
    body += `<h2 class="h2">${ic("crosshair", 20)} Dernier tir</h2><p class="hint">${esc(p.name)} choisit qui éliminer.</p>${lgPickGrid(lgAlive().filter(x => !G.queue.some(y => y.i === lgIdx(x))), "lgShoot")}`;
    foot = "";
  }
  return screen({ title: "Révélation", color: LGC, body, foot });
}
function lgDebateScreen() {
  return screen({
    title: `Jour ${G.night}`, color: LGC, body: `
    <h2 class="h2">Débat</h2><p class="hint">Discutez, accusez, défendez-vous. Puis le village vote à main levée.</p>
    ${timerHTML(timer ? timer.left : 120)}
    ${timer ? btn("Arrêter le chrono", "stopClock", { kind: "ghost", icon: "stop" }) : btn("Lancer 2 minutes de débat", "lgClock", { kind: "ghost", icon: "timer" })}
    <span class="label">Encore en vie</span>
    <ul class="list">${lgAlive().map(p => `<li class="row-item">${av(p.name, "s")}<span class="grow">${esc(p.name)}</span></li>`).join("")}</ul>`,
    foot: btn("Passer au vote", "lgVote", { icon: "vote" })
  });
}
function lgVoteScreen() {
  return screen({
    title: `Vote du jour ${G.night}`, color: LGC, body: `
    <h2 class="h2">Qui le village élimine ?</h2><p class="hint">À trois, tout le monde pointe un suspect. Touche la personne qui a le plus de voix.</p>
    ${lgPickGrid(lgAlive(), "lgPick", G.pick)}`,
    foot: btn(G.pick.length ? `Éliminer ${esc(G.ps[G.pick[0]].name)}` : "Choisis une personne", "lgElim", { kind: "danger", icon: "skull", dis: !G.pick.length }) + `<button class="textbtn" data-act="lgNoElim">Égalité, personne n'est éliminé</button>`
  });
}
function lgWinner() {
  const alive = lgAlive(), w = alive.filter(p => p.role === "wolf").length;
  if (!alive.length) return "nobody";
  if (alive.length === 2 && alive[0].lover === lgIdx(alive[1])) return "lovers";
  if (w === 0) return "village";
  if (w >= alive.length - w) return "wolves";
  return null;
}
function lgEnd() {
  const t = { village: "Le village gagne", wolves: "Les loups-garous gagnent", lovers: "Les amoureux gagnent", nobody: "Personne ne survit" }[G.win];
  return screen({
    title: "Fin de la partie", color: LGC, left: null, body: `
    <div class="hero">${ic(G.win === "wolves" ? "paw" : G.win === "lovers" ? "heart" : "sun", 48)}<h2 class="big">${t}</h2></div>
    <ul class="list">${G.ps.map(p => `<li class="row-item">${av(p.name, "s")}<span class="grow"><b>${esc(p.name)}</b><small>${lgRole(p).name}${p.lover != null ? ", " + fe(p.name, "amoureuse", "amoureux") : ""}${p.alive ? "" : ", " + fe(p.name, "morte", "mort")}</small></span><b class="badge ${G.pts[p.name] ? "b-good" : ""}">${G.pts[p.name] ? "+" + G.pts[p.name] : "0"}</b></li>`).join("")}</ul>`,
    foot: btn("Rejouer", "lgGo", { icon: "undo" }) + `<div class="row2 links"><button class="textbtn" data-act="lgSettings">Réglages</button><button class="textbtn" data-act="home">Retour aux jeux</button></div>`
  });
}
function lgStartNight() {
  G.steps = [];
  const has = r => G.ps.some(p => p.alive && p.role === r);
  if (G.night === 1 && has("cupid")) G.steps.push("cupid", "lovers");
  G.steps.push("wolves");
  if (has("seer")) G.steps.push("seer");
  if (has("witch") && (G.potions.life || G.potions.death)) G.steps.push("witch");
  Object.assign(G, { si: -1, sub: null, pick: [], victim: null, poison: null, saved: false, seen: null, wmode: null });
  go(lgNight);
  say("La nuit tombe sur le village. Tout le monde ferme les yeux.");
}
function lgDawn() {
  const deaths = [];
  if (G.victim != null && !G.saved) deaths.push({ i: G.victim, cause: "wolves" });
  if (G.poison != null && !deaths.some(d => d.i === G.poison)) deaths.push({ i: G.poison, cause: "poison" });
  G.queue = deaths; G.after = "debate";
  go(lgDayIntro);
  say(deaths.length ? `Le village se réveille. Cette nuit, ${deaths.map(d => G.ps[d.i].name).join(" et ")} ${deaths.length > 1 ? "sont morts" : fe(G.ps[deaths[0].i].name, "est morte", "est mort")}.` : "Le village se réveille. Personne n'est mort cette nuit.");
}
function lgProcessQueue() {
  if (!G.queue.length) {
    const w = lgWinner();
    if (w) return lgFinish(w);
    if (G.after === "debate") { go(lgDebateScreen); return say("Le village se réunit. Débattez et démasquez les loups-garous."); }
    G.night++; return lgStartNight();
  }
  const q = G.queue[0], p = G.ps[q.i];
  if (!q.started) {
    q.started = true; p.alive = false;
    if (p.lover != null && G.ps[p.lover].alive && !G.queue.some(x => x.i === p.lover)) G.queue.push({ i: p.lover, cause: "love" });
  }
  go(lgReveal);
  say(`${p.name} était ${lgRole(p).name}.`);
}
function lgFinish(w) {
  G.win = w; G.pts = {};
  G.ps.forEach(p => {
    const v = w === "village" && p.role !== "wolf" ? 3 : w === "wolves" && p.role === "wolf" ? 5 : w === "lovers" && p.lover != null ? 6 : 0;
    if (v) { G.pts[p.name] = v; addPts(p.name, v); }
  });
  go(lgEnd);
  say({ village: "Le village a gagné.", wolves: "Les loups-garous ont gagné.", lovers: "Les amoureux ont gagné.", nobody: "Personne n'a survécu." }[w]);
}

/* ---------- Classement (écran ouvert depuis un jeu) ---------- */
function boardScreen() { return screen({ title: "Classement", left: "back", right: null, body: boardBody() }); }

/* ---------- Actions ---------- */
const A = {
  tab(t) { tab = t; go(root); },
  home() { stopTimer(); try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} G = null; tab = "games"; go(root); },
  askQuit() { confirmSheet({ title: "Quitter la partie ?", text: "Les points déjà gagnés restent au classement.", ok: "Quitter", act: "home", danger: true }); },
  closeSheet() { sheet = null; draw(); },
  gagePick(i) { sheet.chosen = +i === 2 ? "group" : sheet.opts[+i]; draw(); },
  gageReroll() { sheet.opts = gageOpts(sheet.spicy); draw(); },
  gageDone() { const then = sheet && sheet.then; sheet = null; if (then) A[then](); else draw(); },
  gagePick(i) { sheet.chosen = +i === 2 ? "group" : sheet.opts[+i]; draw(); },
  gageReroll() { sheet.opts = gageOpts(sheet.spicy); draw(); },
  gageDone() { const then = sheet && sheet.then; sheet = null; if (then) A[then](); else draw(); },
  install() {
    if (installEvt) { const e = installEvt; installEvt = null; e.prompt(); e.userChoice.finally(() => draw()); return; }
    sheet = { type: "install" }; draw();
  },
  hideInstall() { installHidden = true; store.set("installHidden", true); draw(); },
  board() { prevView = view; go(boardScreen); },
  boardBack() { go(prevView || root); },
  askReset() { confirmSheet({ title: "Remettre à zéro ?", text: "Tous les points de la soirée seront effacés.", ok: "Tout effacer", act: "resetScores", danger: true }); },
  resetScores() { scores = {}; store.set("scores", scores); sheet = null; draw(); },
  askClear() { confirmSheet({ title: "Vider la liste ?", text: "Tous les joueurs seront retirés.", ok: "Vider la liste", act: "clearP", danger: true }); },
  clearP() { roster = []; saveRoster(); syncNames(); sheet = null; draw(); },
  editP(id) {
    const p = roster.find(x => x.id === id);
    const used = new Set(roster.map(x => x.av));
    const g = p ? p.g : "f", free = AVATARS.find(a => a.g === g && !used.has(a.id)) || AVATARS.find(a => a.g === g);
    sheet = { type: "player", id: p ? p.id : null, draft: p ? { name: p.name, g: p.g, av: p.av } : { name: "", g, av: free.id } };
    draw(); if (!p) setTimeout(() => { const n = document.getElementById("pname"); n && n.focus(); }, 50);
  },
  draftG(g) {
    const d = sheet.draft; d.g = g;
    if (!d.av.startsWith(g)) { const used = new Set(roster.map(x => x.av)); d.av = (AVATARS.find(a => a.g === g && !used.has(a.id)) || AVATARS.find(a => a.g === g)).id; }
    draw();
  },
  draftAv(id) { sheet.draft.av = id; draw(); },
  rmP() { const i = roster.findIndex(x => x.id === sheet.id); if (i >= 0) roster.splice(i, 1); saveRoster(); syncNames(); sheet = null; draw(); },
  open(id) {
    stopTimer();
    const g = GAMES.find(x => x.id === id);
    if (players.length < g.min) { tab = "players"; go(root); toast(`${g.name} se joue à ${g.min} minimum`); return; }
    if (id === "mime" || id === "taboo") { G = { kind: id, nTeams: 2, dur: 60, round: 1, diff: store.get("mimeDiff", "easy") }; makeTeams(); return go(teamSetup); }
    if (id === "av") { G = { kind: "av", order: shuffle(players), i: 0, level: store.get("avlvl", "fun"), decks: {} }; if (G.level === "x18" && !adultOk) G.level = "hot"; return go(avTurn); }
    if (id === "tvm") { G = { kind: "tvm", order: shuffle(players), i: 0, scores: Object.fromEntries(players.map(p => [p, 0])), step: "prep", theme: pick(TVM_THEMES), sel: [] }; return go(tvm); }
    if (id === "uc") { const n = players.length; G = { kind: "uc", nU: n >= 13 ? 3 : n >= 7 ? 2 : 1, nW: n >= 11 ? 2 : n >= 5 ? 1 : 0, ucScores: {} }; return go(ucSetup); }
    if (id === "tu") { G = { kind: "tu", nTeams: 2, dur: 45, nWords: 40, round: 0 }; makeTeams(); return go(teamSetup); }
    if (id === "quiz") { G = { kind: "quiz", nTeams: 2, nQ: 10, round: 1 }; makeTeams(); return go(teamSetup); }
    if (id === "bomb") { G = { kind: "bomb", d: pdeck("bomb", BOMB_THEMES), gd: pdeck("gages", GAGES), state: "idle", loser: null }; G.theme = G.d.draw(); return go(bomb); }
    if (id === "wyr") { let l = store.get("wyrlvl", "normal"); if (l === "x18" && !adultOk) l = "hot"; G = { kind: "wyr", level: l, decks: {} }; wyrDraw(); return go(wyr); }
    if (id === "nhie") { let l = store.get("nhielvl", "fun"); if (l === "x18" && !adultOk) l = "hot"; G = { kind: "nhie", level: l, decks: {} }; nhieDraw(); return go(nhie); }
    if (id === "lg") { const n = players.length; G = { kind: "lg", nW: n >= 16 ? 4 : n >= 12 ? 3 : n >= 7 ? 2 : 1 }; return go(lgSetup); }
    if (id === "mys") { G = { kind: "mys", d: pdeck("mys", MYS), card: null, rule: null }; return go(mys); }
  },
  /* équipes */
  nTeams(n) { G.nTeams = +n; makeTeams(); draw(); },
  reTeams() { makeTeams(); draw(); },
  dur(n) { G.dur = +n; draw(); },
  diff(k) { G.diff = k; store.set("mimeDiff", k); draw(); },
  teamsGo() { if (G.kind === "tu") return A.tuGo(); if (G.kind === "quiz") return A.quizGo(); G.cur = 0; G.round = 1; G.deck = G.kind === "mime" ? pdeck("mime-" + G.diff, MIME_SETS[G.diff]) : pdeck("taboo", TABOO); go(turnIntro); },
  turnStart() { G.log = []; G.card = G.deck.draw(); go(turnPlay); runTimer(G.dur, A.turnStop); },
  mark(v) { G.log.push({ c: G.card, v: +v }); G.card = G.deck.draw(); beep(+v === 1 ? 880 : +v === -1 ? 220 : 440, .08); draw(); },
  turnStop() { stopTimer(); if (G.card) { G.log.push({ c: G.card, v: 0, last: true }); G.card = null; } go(turnEnd); },
  toggle(i) { const l = G.log[+i]; l.v = G.kind === "mime" ? (l.v === 1 ? 0 : 1) : (l.v === 1 ? 0 : l.v === 0 ? -1 : 1); draw(); },
  turnValidate() {
    const t = G.teams[G.cur], pts = G.log.reduce((s, l) => s + l.v, 0);
    t.score += pts; t.members.forEach(m => addPts(m, pts)); t.k++;
    G.cur = (G.cur + 1) % G.teams.length; if (G.cur === 0) G.round++;
    go(turnIntro); if (pts) toast(`${ptsTxt(pts)} pour ${t.name}`);
  },
  teamEnd() {
    const s = [...G.teams].sort((a, b) => b.score - a.score);
    if (!G.bonusGiven && s[0].score > s[1].score) s[0].members.forEach(m => addPts(m, 3));
    G.bonusGiven = true; go(teamFinal);
  },
  teamsAgain() { G.teams.forEach(t => { t.score = 0; t.k = 0; }); G.bonusGiven = false; A.teamsGo(); },
  /* action ou vérité */
  avLevel(k) { if (k === "x18" && !adultOk) { G.gate = true; return go(avTurn); } G.level = k; store.set("avlvl", k); draw(); },
  avAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("avlvl", "x18"); go(avTurn); },
  avGateNo() { G.gate = false; go(avTurn); },
  avPick(t) {
    if (t === "r") t = Math.random() < .5 ? "v" : "a";
    const key = t + G.level; G.decks[key] = G.decks[key] || pdeck("av-" + key, AV[G.level][t]);
    const cur = avCur(), o = others(cur);
    G.type = t; G.text = fill(G.decks[key].draw(), { cur, joueur: pick(o.length ? o : players), opp: oppOf(cur) });
    go(avCard);
  },
  avJoker() { openGage(avCur(), G.level === "hot" || G.level === "x18", "avAfterGage"); },
  avAfterGage() { G.i++; go(avTurn); },
  avNext() {
    const p = avCur(), pts = G.type === "g" ? 0 : AV_PTS[G.type] + AV_BONUS[G.level];
    addPts(p, pts); G.i++; go(avTurn); if (pts) toast(`${ptsTxt(pts)} pour ${p}`);
  },
  avSkip() { G.i++; draw(); },
  /* 2 vérités 1 mensonge */
  tvmTheme() { let t; do { t = pick(TVM_THEMES); } while (t === G.theme); G.theme = t; draw(); },
  tvmReady() { G.step = "talk"; go(tvm); },
  tvmDebate() { runTimer(60, draw); draw(); },
  tvmVote() { stopTimer(); G.step = "vote"; G.sel = []; go(tvm); },
  tvmSel(n) { G.sel = G.sel.includes(n) ? G.sel.filter(x => x !== n) : [...G.sel, n]; draw(); },
  tvmValidate() {
    const p = tvmCur();
    if (G.sel.length) G.sel.forEach(n => { G.scores[n]++; addPts(n, 1); }); else { G.scores[p] += 2; addPts(p, 2); }
    G.i++; G.step = "prep"; G.theme = pick(TVM_THEMES); go(tvm);
  },
  /* undercover */
  ucU(d) { const v = G.nU + +d; if (v >= 0 && v + G.nW <= maxImp() && v + G.nW >= 1) G.nU = v; draw(); },
  ucW(d) { const v = G.nW + +d; if (v >= 0 && v + G.nU <= maxImp() && v + G.nU >= 1) G.nW = v; draw(); },
  ucRole(id) { const s = ucSel(); store.set("ucRoles", s.includes(id) ? s.filter(x => x !== id) : [...s, id]); draw(); },
  ucSettings() { go(ucSetup); },
  ucGo() {
    G.deck = G.deck || pdeck("uc", UC_PAIRS);
    let pair = G.deck.draw(); if (Math.random() < .5) pair = [pair[1], pair[0]];
    G.pair = pair;
    const roles = shuffle([...Array(G.nU).fill("under"), ...Array(G.nW).fill("white"), ...Array(players.length - G.nU - G.nW).fill("civil")]);
    G.ps = shuffle(players).map((name, i) => ({ name, role: roles[i], word: roles[i] === "civil" ? pair[0] : roles[i] === "under" ? pair[1] : null, alive: true, sp: null, lover: null }));
    let free = shuffle(G.ps.map((p, i) => i));
    for (const id of ucSel()) {
      if (id === "lovers") {
        if (free.length < 2) continue;
        const a = free.shift(); let k = free.findIndex(i => gOf(G.ps[i].name) !== gOf(G.ps[a].name)); if (k < 0) k = 0;
        const b = free.splice(k, 1)[0];
        Object.assign(G.ps[a], { sp: "lovers", lover: b }); Object.assign(G.ps[b], { sp: "lovers", lover: a });
      } else if (free.length) G.ps[free.shift()].sp = id;
    }
    Object.assign(G, { i: 0, show: false, round: 1, queue: [], winner: null, peek: null });
    go(ucDeal);
  },
  ucShow() { G.show = true; draw(); },
  ucHide() { G.show = false; G.i++; if (G.i >= G.ps.length) { ucOrder(); go(ucTalk); } else go(ucDeal); },
  ucVoteStart() { G.voters = ucVoters(); G.vi = 0; G.votes = {}; go(ucVote); },
  ucCast(i) { G.votes[G.voters[G.vi]] = +i; G.vi++; go(ucVote); },
  ucUncast() { G.vi--; draw(); },
  ucElim(i) { ucEliminate(+i, "vote"); },
  ucBack() { G.peek = null; go(ucTalk); },
  ucPeekList() { G.peek = null; go(ucPeek); },
  ucPeek(i) { G.peek = +i; draw(); },
  ucPeekDone() { G.peek = null; go(ucTalk); },
  ucWShow() { G.queue[0].wShown = true; draw(); },
  ucWhite(ok) { if (+ok) { G.queue = []; return ucFinish("white"); } G.queue[0].wDone = true; draw(); },
  ucRevenge(i) { G.queue[0].revDone = true; G.queue.push({ i: +i, cause: "revenge" }); draw(); },
  ucNext() { G.queue.shift(); ucProcess(); },
  /* mystère */
  mysDraw() {
    stopTimer();
    const c = G.d.draw(), p1 = pick(players);
    const o = others(p1), p2 = c.opp ? oppOf(p1) : pick(o.length ? o : players);
    Object.assign(G, { card: c, p1, p2, scored: false });
    G.text = fill(c.x, { cur: p1, p1, p2 });
    if (c.t === "regle") G.rule = G.text;
    go(mys); beep(520, .06);
  },
  mysWin(arg) {
    stopTimer();
    const k = arg.lastIndexOf("|"), n = arg.slice(0, k), v = +arg.slice(k + 1);
    G.scored = true;
    if (n && v) { addPts(n, v); }
    if (G.card.t === "defi" && !v) return openGage(G.p1);
    if (G.card.t === "duel" && n) return openGage(n === G.p1 ? G.p2 : G.p1);
    draw(); if (n && v) toast(`${ptsTxt(v)} pour ${n}`);
  },
  mysGage() { openGage(G.card.t === "defi" || G.card.t === "devine" ? G.p1 : null); },
  mysTimer() { runTimer(G.card.s, draw); draw(); },
  stopClock() { stopTimer(); draw(); }
};

/* ---------- Actions des nouveaux jeux ---------- */
function quizDrawQ() { G.q = G.qd.draw(); G.opts = shuffle([G.q.a, ...G.q.w]); G.ans = null; }
function wyrDraw() { const k = G.level; G.decks[k] = G.decks[k] || pdeck("wyr-" + k, WYR[k]); G.card = G.decks[k].draw(); G.sel = []; G.step = "ask"; }
function nhieDraw() { const k = G.level; G.decks[k] = G.decks[k] || pdeck("nhie-" + k, NHIE[k]); G.card = G.decks[k].draw(); G.sel = []; }
const toggleIn = (list, n) => list.includes(n) ? list.filter(x => x !== n) : [...list, n];
function lgSleepNow() { G.sub = "sleep"; draw(); say(LG_STEP[G.steps[G.si]].sleep); }

Object.assign(A, {
  /* Time's Up */
  tuWords(n) { G.nWords = +n; draw(); },
  tuGo() {
    const d = pdeck("tu", TU_WORDS), set = new Set();
    for (let k = 0; set.size < G.nWords && k < G.nWords * 4; k++) set.add(d.draw());
    Object.assign(G, { cur: 0, round: 0, words: [...set], card: null, log: [] });
    G.pool = shuffle(G.words);
    go(tuRoundIntro);
  },
  tuRoundStart() { go(tuTurnIntro); },
  tuStart() { G.log = []; G.card = G.pool.shift(); go(tuPlay); runTimer(G.dur, A.tuStop); },
  tuMark(v) {
    if (+v === 1) { G.log.push({ w: G.card, ok: true }); beep(880, .08); } else { G.pool.push(G.card); beep(440, .08); }
    if (!G.pool.length) { G.card = null; return A.tuStop(); }
    G.card = G.pool.shift(); draw();
  },
  tuStop() { stopTimer(); if (G.card) { G.pool.push(G.card); G.card = null; } go(tuTurnEnd); },
  tuToggle(i) { const l = G.log[+i]; l.ok = !l.ok; draw(); },
  tuValidate() {
    const t = G.teams[G.cur], found = G.log.filter(l => l.ok);
    G.log.filter(l => !l.ok).forEach(l => G.pool.push(l.w));
    t.score += found.length; t.members.forEach(m => addPts(m, found.length)); t.k++;
    G.cur = (G.cur + 1) % G.teams.length;
    if (found.length) toast(`${ptsTxt(found.length)} pour ${t.name}`);
    if (!G.pool.length) {
      G.round++;
      if (G.round >= 3) return A.teamEnd();
      G.pool = shuffle(G.words);
      return go(tuRoundIntro);
    }
    go(tuTurnIntro);
  },
  /* Quiz */
  quizN(n) { G.nQ = +n; draw(); },
  quizGo() {
    Object.assign(G, { cur: 0, asked: 0, total: G.nQ * G.teams.length, qd: pdeck("quiz", QUIZ) });
    quizDrawQ(); go(quizQ);
  },
  quizAns(i) {
    if (G.ans != null) return;
    G.ans = +i;
    const t = G.teams[G.cur];
    if (G.opts[G.ans] === G.q.a) { t.score++; t.members.forEach(m => addPts(m, 1)); beep(880, .12); } else beep(220, .25);
    draw();
  },
  quizNext() {
    G.asked++;
    if (G.asked >= G.total) return A.teamEnd();
    G.cur = (G.cur + 1) % G.teams.length;
    quizDrawQ(); go(quizQ);
  },
  /* La Bombe */
  bombTheme() { G.theme = G.d.draw(); draw(); },
  bombStart() {
    stopBomb();
    G.state = "ticking";
    const end = Date.now() + 20000 + Math.random() * 40000;
    const tick = () => {
      const left = end - Date.now();
      if (left <= 0) {
        bombT = null; G.state = "boom"; G.loser = null;
        beep(70, 1.2); try { navigator.vibrate && navigator.vibrate([500, 100, 500]); } catch (e) {}
        return draw();
      }
      beep(left < 5000 ? 1046 : left < 15000 ? 880 : 740, .04);
      bombT = setTimeout(tick, left < 5000 ? 220 : left < 15000 ? 450 : 800);
    };
    draw(); tick();
  },
  bombLoser(n) { G.loser = n; others(n).forEach(o => addPts(o, 1)); openGage(n); },
  bombGage() { openGage(G.loser); },
  bombNew() { G.state = "idle"; G.loser = null; G.theme = G.d.draw(); draw(); },
  /* Tu préfères */
  wyrLevel(k) { if (k === "x18" && !adultOk) { G.gate = true; return draw(); } G.level = k; store.set("wyrlvl", k); wyrDraw(); draw(); },
  wyrAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("wyrlvl", "x18"); wyrDraw(); draw(); },
  wyrGateNo() { G.gate = false; draw(); },
  wyrSel(n) { G.sel = toggleIn(G.sel, n); draw(); },
  wyrValidate() {
    const a = G.sel, b = players.filter(n => !a.includes(n));
    if (a.length !== b.length && a.length && b.length) (a.length > b.length ? a : b).forEach(n => addPts(n, 1));
    G.step = "result"; go(wyr);
  },
  wyrNext() { wyrDraw(); go(wyr); },
  wyrGage() { const a = G.sel, b = players.filter(n => !a.includes(n)); openGage((a.length < b.length ? a : b).join(", "), G.level !== "normal"); },
  /* Je n'ai jamais */
  nhieLevel(k) { if (k === "x18" && !adultOk) { G.gate = true; return draw(); } G.level = k; store.set("nhielvl", k); nhieDraw(); draw(); },
  nhieAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("nhielvl", "x18"); nhieDraw(); draw(); },
  nhieGateNo() { G.gate = false; draw(); },
  nhieSel(n) { G.sel = toggleIn(G.sel, n); draw(); },
  nhieNext() {
    const s = G.sel;
    s.forEach(n => addPts(n, 1));
    nhieDraw(); go(nhie);
    if (s.length) toast(`+1 pour ${s.join(", ")}`);
  },
  /* Loup-garou */
  lgW(d) { const v = G.nW + +d; if (v >= 1 && v <= lgMaxW()) G.nW = v; draw(); },
  lgRole(id) { const s = lgSel(); store.set("lgRoles", s.includes(id) ? s.filter(x => x !== id) : [...s, id]); draw(); },
  lgVoice() { voiceOn = !voiceOn; store.set("voice", voiceOn); draw(); if (voiceOn) say("La voix du meneur est activée."); },
  lgSettings() { go(lgSetup); },
  lgGo() {
    if (!lgOk()) return;
    const sel = lgSel();
    const roles = shuffle([...Array(G.nW).fill("wolf"), ...sel, ...Array(players.length - G.nW - sel.length).fill("villager")]);
    G.ps = shuffle(players).map((name, i) => ({ name, role: roles[i], alive: true, lover: null }));
    Object.assign(G, { i: 0, show: false, night: 1, potions: { life: true, death: true }, win: null, queue: [], pick: [] });
    go(lgDeal); say("Distribution des rôles. Chacun découvre le sien en secret.");
  },
  lgShow() { G.show = true; draw(); },
  lgHide() { G.show = false; G.i++; if (G.i >= G.ps.length) lgStartNight(); else go(lgDeal); },
  lgNightNext() {
    G.si++; G.sub = null; G.pick = []; G.wmode = null;
    if (G.si >= G.steps.length) return lgDawn();
    go(lgNight); say(LG_STEP[G.steps[G.si]].wake);
  },
  lgSleep() { lgSleepNow(); },
  lgPick(i) {
    i = +i;
    const cupid = view === lgNight && G.steps[G.si] === "cupid";
    if (cupid) { if (G.pick.includes(i)) G.pick = G.pick.filter(x => x !== i); else if (G.pick.length < 2) G.pick = [...G.pick, i]; }
    else G.pick = G.pick[0] === i ? [] : [i];
    draw();
  },
  lgCupid() { const [a, b] = G.pick; G.ps[a].lover = b; G.ps[b].lover = a; G.pick = []; lgSleepNow(); },
  lgWolves() { G.victim = G.pick[0]; G.pick = []; lgSleepNow(); },
  lgSeer(i) { G.seen = +i; draw(); },
  lgSave() { G.saved = true; G.potions.life = false; lgSleepNow(); },
  lgWitchPoison() { G.wmode = "poison"; draw(); },
  lgWitchBack() { G.wmode = null; draw(); },
  lgPoison(i) { G.poison = +i; G.potions.death = false; G.wmode = null; lgSleepNow(); },
  lgProcess() { lgProcessQueue(); },
  lgNext() { G.queue.shift(); lgProcessQueue(); },
  lgShoot(i) { G.queue[0].shot = true; G.queue.push({ i: +i, cause: "hunter" }); draw(); say(`Le chasseur tire sur ${G.ps[+i].name}.`); },
  lgDebate() { go(lgDebateScreen); say("Le village se réunit. Débattez et démasquez les loups-garous."); },
  lgRepeat() { const t = lastSay; say(t); },
  lgTestVoice() { say("Bienvenue au village. Je serai votre meneur de jeu cette nuit."); },
  lgClock() { runTimer(120, draw); draw(); },
  lgVote() { stopTimer(); G.pick = []; go(lgVoteScreen); say("Il est temps de voter. À trois, désignez un suspect."); },
  lgElim() { if (!G.pick.length) return; G.after = "night"; G.queue = [{ i: G.pick[0], cause: "vote" }]; G.pick = []; lgProcessQueue(); },
  lgNoElim() { G.night++; lgStartNight(); }
});

document.addEventListener("click", e => {
  keepAwake();
  const t = e.target.closest("[data-act]");
  if (!t || t.disabled) return;
  const fn = A[t.dataset.act];
  if (!fn) return;
  e.preventDefault();
  fn(t.dataset.arg);
});
document.addEventListener("input", e => { if (e.target.id === "pname" && sheet && sheet.draft) sheet.draft.name = e.target.value; });
document.addEventListener("submit", e => {
  if (e.target.id !== "pform") return;
  e.preventDefault();
  const d = sheet.draft, name = d.name.trim();
  if (!name) { sheet.err = "Écris un prénom."; return draw(); }
  const dup = roster.find(p => p.id !== sheet.id && p.name.toLowerCase() === name.toLowerCase());
  if (dup) { sheet.err = `${esc(dup.name)} est déjà dans la liste.`; return draw(); }
  if (isSample) roster = [];
  const p = sheet.id && roster.find(x => x.id === sheet.id);
  if (p) {
    if (p.name !== name) { if (scores[p.name] != null) { scores[name] = (scores[name] || 0) + scores[p.name]; delete scores[p.name]; store.set("scores", scores); } p.name = name; }
    p.g = d.g; p.av = d.av;
  } else roster.push({ id: uid(), name, g: d.g, av: d.av });
  saveRoster(); syncNames(); sheet = null; draw();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && sheet) { sheet = null; draw(); } });

try { registerSW({ immediate: true }); } catch (e) {}
go(root);
