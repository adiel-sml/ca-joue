import "@fontsource/dela-gothic-one/latin-400.css";
import "@fontsource/figtree/latin-400.css";
import "@fontsource/figtree/latin-600.css";
import "@fontsource/figtree/latin-800.css";
import "./styles.css";
import { registerSW } from "virtual:pwa-register";
import { MIME_EASY, MIME_HARD, TABOO, AV, GAGES, GAGES_HOT, GAGES_X18, AV_LEVELS, AV_PTS, AV_BONUS, TVM_THEMES, UC_PAIRS, UC_SPECIALS, UC_PTS, MYS_TYPES, MYS, TEAM_NAMES, TEAM_COLORS, GAMES, GAME_CATS } from "./content.js";
import { TU_WORDS, BOMB_THEMES, WYR, NHIE, QUIZ, QUIZ_THEMES, LG_ROLES, LG_SPECIALS } from "./content-games.js";
import { SPY_PLACES, MOST, NUM_Q, DICO, CHAIN_WORDS } from "./content-party.js";
import { KNOW, FUTURE, WHO2, DARE2, TALK } from "./content-couple.js";
import { RULES } from "./content-rules.js";
import { GROUPE_N, GROUPE_E, GROUPE_A } from "./content-gages.js";
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

/* Paquets mémorisés sur l'appareil : une carte ne revient qu'une fois toutes les autres du paquet tirées,
   même d'une partie à l'autre et après fermeture de l'appli. Chaque carte est repérée par une empreinte
   de son texte, donc l'ajout de nouvelles cartes ne remet pas l'historique à zéro. Des paquets qui se
   recoupent partagent le même historique (thèmes du Quiz, niveaux des Mimes, gages épicés et +18). */
const cardKey = c => typeof c === "string" ? c : Array.isArray(c) ? c.join("|") : c.q && c.cat ? c.q : JSON.stringify(c);
function cardId(c) {
  const s = cardKey(c);
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) { const ch = s.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
const seenMem = {};
function pdeck(key, arr, legacy = key) {
  const ids = arr.map(cardId);
  return {
    draw() {
      const k = "seen:" + key;
      let seen = seenMem[k] || store.get(k, null);
      if (!Array.isArray(seen)) seen = [];
      /* Reprise de l'ancien format, qui gardait les numéros des cartes restantes */
      const old = store.get("deck:" + legacy, null);
      if (old) {
        try { localStorage.removeItem("cajoue:deck:" + legacy); } catch (e) {}
        if (Array.isArray(old.left) && old.n <= arr.length) { const left = new Set(old.left); for (let i = 0; i < old.n; i++) if (!left.has(i)) seen.push(ids[i]); }
      }
      const done = new Set(seen);
      let free = ids.flatMap((id, i) => done.has(id) ? [] : [i]);
      if (!free.length) {
        /* Tout le paquet est passé : il recommence, sans redonner tout de suite la dernière carte */
        const mine = new Set(ids), last = seen[seen.length - 1];
        seen = seen.filter(id => !mine.has(id));
        free = ids.flatMap((id, i) => id === last && arr.length > 1 ? [] : [i]);
      }
      const i = free[Math.floor(Math.random() * free.length)];
      seen.push(ids[i]);
      seenMem[k] = seen;
      store.set(k, seen);
      return arr[i];
    }
  };
}
const MIME_SETS = { easy: MIME_EASY, hard: MIME_HARD, mix: [...MIME_EASY, ...MIME_HARD] };

/* ---------- Joueurs ---------- */
const uid = () => Math.random().toString(36).slice(2, 9);
let roster = store.get("roster", null);
if (!roster) {
  const old = store.get("players", null), oldG = store.get("genders", {});
  if (old && old.length) roster = old.map((n, i) => ({ id: uid(), name: n, g: oldG[n] === "h" ? "h" : "f", av: (oldG[n] === "h" ? "h" : "f") + (i % 12) }));
  else roster = [];
}
const saveRoster = () => store.set("roster", roster);
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
/* Gages faits et refusés, par joueur. Refuser un gage coûte 2 points. */
let gstats = store.get("gagestats", {});
const GAGE_PENALTY = 2;
function gageResolve(ok) {
  if (!sheet) return;
  const names = sheet.who.length ? sheet.who : sheet.pick, then = sheet.then;
  sheet.done = ok ? "done" : "ref";
  names.forEach(n => {
    const st = gstats[n] = gstats[n] || { done: 0, ref: 0 };
    if (ok) st.done++; else { st.ref++; addPts(n, -GAGE_PENALTY); }
  });
  store.set("gagestats", gstats);
  sheet = null;
  if (then) A[then](); else draw();
  if (names.length) toast(ok ? `Gage fait par ${names.join(", ")}` : `Gage refusé : −${GAGE_PENALTY} pts pour ${names.join(", ")}`);
}

/* ---------- Son, chrono, écran allumé ---------- */
let actx;
/* Son : sur iPhone, l'audio n'est autorisé qu'après un toucher. On le prépare dès le premier toucher,
   et on demande à jouer même si le téléphone est en mode silencieux (Safari 16.4 et plus). */
function audio() {
  try {
    if (navigator.audioSession && navigator.audioSession.type !== "playback") navigator.audioSession.type = "playback";
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === "suspended") actx.resume();
  } catch (e) {}
  return actx;
}
function unlockAudio() {
  const c = audio(); if (!c || unlockAudio.done) return;
  try { const b = c.createBuffer(1, 1, 22050), s = c.createBufferSource(); s.buffer = b; s.connect(c.destination); s.start(0); unlockAudio.done = true; } catch (e) {}
}
function tone(f, d, at = 0, type = "triangle", vol = .22) {
  try { const c = audio(), t = c.currentTime + at, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(c.destination); o.start(t); o.stop(t + d); } catch (e) {}
}
function beep(f, d) { tone(f, d); }
/* Fin du chrono : trois bips puis une longue sonnerie, bien audibles */
function endSound() { [0, .22, .44].forEach(at => tone(880, .16, at, "square", .25)); tone(440, .9, .7, "square", .3); }
/* Explosion : souffle de bruit filtré qui s'éteint, plus un grondement grave */
function explosion() {
  try {
    audio();
    const t0 = actx.currentTime, len = 2.2, sr = actx.sampleRate;
    const buf = actx.createBuffer(1, Math.floor(sr * len), sr), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 1.5);
    const noise = actx.createBufferSource(); noise.buffer = buf;
    const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.setValueAtTime(4000, t0); lp.frequency.exponentialRampToValueAtTime(90, t0 + 1.8);
    const ng = actx.createGain(); ng.gain.setValueAtTime(0.001, t0); ng.gain.exponentialRampToValueAtTime(1, t0 + 0.02); ng.gain.exponentialRampToValueAtTime(0.001, t0 + len);
    noise.connect(lp).connect(ng).connect(actx.destination); noise.start(t0);
    const o = actx.createOscillator(), og = actx.createGain(); o.type = "sine";
    o.frequency.setValueAtTime(120, t0); o.frequency.exponentialRampToValueAtTime(28, t0 + 1.2);
    og.gain.setValueAtTime(0.9, t0); og.gain.exponentialRampToValueAtTime(0.001, t0 + 1.4);
    o.connect(og).connect(actx.destination); o.start(t0); o.stop(t0 + 1.5);
  } catch (e) {}
}
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
    if (n) { n.textContent = fmtT(left, sec); n.classList.toggle("urgent", left <= 10); }
    if (b) b.style.transform = `scaleX(${Math.max(0, (end - Date.now()) / (sec * 1000))})`;
    if (left <= 5 && left > 0 && left !== timer.last) { timer.last = left; beep(660, .08); }
    if (left === 0) { stopTimer(); endSound(); vib(); onEnd && onEnd(); }
  };
  timer.id = setInterval(tick, 200);
  tick();
}
/* Au-delà de 99 secondes, le chrono s'affiche en minutes : 6:00 */
const fmtT = (left, total) => total >= 100 ? `${Math.floor(left / 60)}:${String(left % 60).padStart(2, "0")}` : String(left);
const timerHTML = s => `<div class="timer"><div class="tbar"><i id="tbar" style="transform:scaleX(${timer ? timer.left / timer.sec : 1})"></i></div><div class="tnum" id="tnum">${fmtT(s, timer ? timer.sec : s)}</div></div>`;

let wake = null;
async function keepAwake() { try { if (!wake && navigator.wakeLock) { wake = await navigator.wakeLock.request("screen"); wake.addEventListener("release", () => wake = null); } } catch (e) {} }
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") keepAwake(); });

/* ---------- Installation sur l'écran d'accueil ---------- */
let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; if (view === root) draw(); });
window.addEventListener("appinstalled", () => { installEvt = null; draw(); });
const isStandalone = () => window.matchMedia("(display-mode: standalone)").matches || navigator.standalone === true;
const isIpad = () => /ipad/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const isIos = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

/* ---------- État de l'interface ---------- */
let G = null;          // partie en cours
let tab = "games";     // onglet de l'accueil
let applyUpdate = null;  // installe la nouvelle version quand elle est prête
let updating = false;
let homeCat = store.get("homeCat", "*");   // catégorie de jeux affichée à l'accueil
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
  catsSync();
  guardSync();
}
/* Bouton ou geste retour (Android, navigateur) : il ferme le panneau ouvert, revient aux jeux ou demande avant de quitter
   la partie, au lieu de fermer l'appli et de perdre la partie en cours */
let guarded = false;
function guardSync() {
  if (guarded || (!sheet && view === root && tab === "games")) return;
  try { history.pushState({ cajoue: 1 }, ""); guarded = true; } catch (e) {}
}
window.addEventListener("popstate", () => {
  guarded = false;
  if (sheet) { sheet = null; draw(); }
  else if (view === boardScreen) A.boardBack();
  else if (view !== root) A.askQuit();
  else if (tab !== "games") A.tab("games");
  guardSync();
});
function toast(t) { const el = document.getElementById("toast"); if (!el) return; el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => { el.hidden = true; }, 1800); }

/* Gabarit d'écran : barre du haut, contenu, zone d'actions en bas */
function screen({ title = "", left = "close", right = "board", color = "", body = "", foot = "", tabs = false }) {
  const l = left === "close" ? `<button class="iconbtn" data-act="askQuit" aria-label="Quitter la partie">${ic("x")}</button>`
    : left === "back" ? `<button class="iconbtn" data-act="boardBack" aria-label="Retour">${ic("back")}</button>` : "";
  const r = right === "board" ? `<button class="iconbtn" data-act="board" aria-label="Classement">${ic("trophy")}</button>`
    : right === "stop" ? `<button class="iconbtn" data-act="turnStop" aria-label="Arrêter le tour">${ic("stop")}</button>` : (right || "");
  const rep = G && G.kind === "lg" && voiceOn && lastSay && view !== lgSetup && view !== lgDeal ? `<button class="iconbtn" data-act="lgRepeat" aria-label="Répéter l'annonce">${ic("volume")}</button>` : "";
  return `<div class="screen${tabs ? " has-tabs" : ""}${foot ? " has-foot" : ""}" style="${color ? "--gc:" + color : ""}">
    ${title || l || r ? `<header class="appbar">${l}<h1 class="appbar-title">${esc(title)}</h1>${rep}${G && RULES[G.kind] && left !== "back" ? `<button class="iconbtn" data-act="rules" aria-label="Règles du jeu">${ic("info")}</button>` : ""}${r}</header>` : ""}
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
  const cats = homeCats(), cur = cats.some(c => c[0] === homeCat) ? homeCat : "*";
  return screen({
    left: null, right: null, tabs: true, body: `
    <div class="brand"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span class="brand-name">Ça Joue</span></div>
    ${applyUpdate ? `<div class="install update"><span class="install-ic">${ic("refresh", 22)}</span><span class="grow"><b>Nouvelle version disponible</b><small>Nouveaux contenus et corrections. Joueurs et classement sont conservés.</small></span><button class="pill" data-act="update" ${updating ? "disabled" : ""}>${updating ? "Un instant" : "Mettre à jour"}</button></div>` : ""}
    ${players.length ? `<button class="crew" data-act="tab" data-arg="players">
      <span class="stack-av">${players.slice(0, 6).map(n => av(n, "s")).join("")}</span>
      <span class="grow"><b>${plural(players.length, "joueur")}</b><small>Modifier la liste</small></span>
      ${ic("pencil", 18)}
    </button>` : `<button class="crew add" data-act="tab" data-arg="players">
      <span class="install-ic">${ic("userPlus", 22)}</span>
      <span class="grow"><b>Ajoute les joueurs</b><small>Il en faut au moins 2 pour jouer.</small></span>
      ${ic("pencil", 18)}
    </button>`}
    ${showInstall ? `<div class="install"><span class="install-ic">${ic("phone", 22)}</span><span class="grow"><b>Installer l'appli</b><small>Plein écran, même sans réseau.</small></span><button class="pill" data-act="install">Installer</button><button class="iconbtn sm" data-act="hideInstall" aria-label="Masquer">${ic("x", 18)}</button></div>` : ""}
    <div class="cats-top"></div>
    <nav class="cats" aria-label="Catégories de jeux">${cats.map(([k, l, n]) => `<button class="${cur === k ? "on" : ""}" data-act="homeCat" data-arg="${k}" aria-pressed="${cur === k}">${l} <small>${n}</small></button>`).join("")}</nav>
    ${cur === "*" ? GAME_CATS.map(([cat, label]) => `<h2 class="section">${label}</h2>${tiles(GAMES.filter(g => g.cat === cat))}`).join("")
      : cur === "recent" ? tiles(recentGames()) : tiles(GAMES.filter(g => g.cat === cur))}`
  });
}
/* Catégories de l'accueil : tous les jeux, les derniers joués, puis chaque catégorie */
const recentGames = () => store.get("recent", []).map(id => GAMES.find(g => g.id === id)).filter(Boolean);
function homeCats() {
  const r = recentGames();
  return [["*", "Tous les jeux", GAMES.length], ...(r.length ? [["recent", "Récents", r.length]] : []), ...GAME_CATS.map(([k, l]) => [k, l, GAMES.filter(g => g.cat === k).length])];
}
const tiles = list => `<div class="games">${list.map(g => `<button class="tile" style="--tc:${g.c}" data-act="open" data-arg="${g.id}">
      <span class="tile-ic">${ic(g.icon, 28)}</span>
      <span class="tile-name">${esc(g.name)}</span>
      <span class="tile-desc">${esc(g.desc)}</span>
      <span class="tile-meta">${ic(g.cat === "couple" ? "heart" : "users", 14)} ${g.cat === "couple" ? "À deux" : `Dès ${g.min} joueurs`}</span>
    </button>`).join("")}</div>`;
/* La barre des catégories reste en haut de l'écran : on garde la catégorie choisie visible et on gère l'encoche quand elle est collée en haut */
function catsSync() {
  const nav = $app.querySelector(".cats");
  if (!nav) return;
  const on = nav.querySelector(".on");
  if (on && on.offsetLeft + on.offsetWidth > nav.clientWidth - 16) nav.scrollLeft = on.offsetLeft + on.offsetWidth - nav.clientWidth + 16;
  const top = $app.querySelector(".cats-top");
  nav.classList.toggle("stuck", !!top && top.getBoundingClientRect().top < 0);
}
window.addEventListener("scroll", catsSync, { passive: true });
function playersBody() {
  return `${roster.length ? "" : `<p class="lead">Ajoute les joueurs de la soirée : il en faut au moins 2 pour jouer.</p>`}<p class="hint">Le sexe sert à adapter les cartes : bisous entre fille et garçon, « la reine » ou « le roi ».</p>
  ${btn("Ajouter un joueur", "editP", { icon: "userPlus" })}
  <ul class="list two-col">${roster.map(p => `<li><button class="row-item" data-act="editP" data-arg="${p.id}">${av(p.name, "m")}<span class="grow"><b>${esc(p.name)}</b><small>${p.g === "h" ? "Garçon" : "Fille"}</small></span>${ic("pencil", 18)}</button></li>`).join("")}</ul>
  ${roster.length ? `<button class="textbtn danger" data-act="askClear">Vider la liste</button>` : ""}`;
}
function gagesBlock() {
  const g = Object.entries(gstats).filter(([, v]) => v.done + v.ref > 0);
  if (!g.length) return "";
  const brave = [...g].sort((a, b) => b[1].done - a[1].done)[0], chicken = [...g].sort((a, b) => b[1].ref - a[1].ref)[0];
  return `<h2 class="section">Les gages de la soirée</h2>
  <div class="awards">${brave[1].done ? `<div class="award">${av(brave[0], "m")}<span><small>Le plus de gages faits</small><b>${esc(brave[0])}</b></span><b class="num">${brave[1].done}</b></div>` : ""}
  ${chicken[1].ref ? `<div class="award bad">${av(chicken[0], "m")}<span><small>Le plus de gages refusés</small><b>${esc(chicken[0])}</b></span><b class="num">${chicken[1].ref}</b></div>` : ""}</div>
  <ul class="list">${g.sort((a, b) => b[1].done - a[1].done).map(([n, v]) => `<li class="row-item">${av(n, "s")}<span class="grow">${esc(n)}</span><span class="badge b-good">${v.done} fait${v.done > 1 ? "s" : ""}</span><span class="badge ${v.ref ? "b-bad" : ""}">${v.ref} refusé${v.ref > 1 ? "s" : ""}</span></li>`).join("")}</ul>`;
}
function boardBody() {
  const s = Object.entries(scores).filter(([n]) => n).sort((a, b) => b[1] - a[1]);
  if (!s.length) return `<div class="empty">${ic("trophy", 40)}<b>Aucun point pour l'instant</b><p>Les points de tous les jeux s'additionnent ici.</p></div>${gagesBlock()}`;
  const top = s.slice(0, 3), order = [1, 0, 2].filter(i => top[i]);
  return `<div class="podium">${order.map(i => `<div class="step s${i + 1}">${av(top[i][0], i === 0 ? "l" : "m")}<b>${esc(top[i][0])}</b><span class="num">${top[i][1]} pts</span><i>${i + 1}</i></div>`).join("")}</div>
  ${s.length > 3 ? scoreList(s.slice(3), false, 3) : ""}
  ${gagesBlock()}
  <details class="howto"><summary>${ic("info", 18)} Comment on gagne des points</summary>
  <p>Mimes et Mot interdit : chaque membre de l'équipe gagne les points du tour, et 3 points de plus pour l'équipe gagnante. Action ou Vérité : 1 point par vérité, 2 par action, bonus en Épicé et en +18. Undercover : 2 points par civil gagnant, 5 par Undercover, 6 pour Mr White. Le lieu secret : 2 points par habitant gagnant, 4 pour l'espion. Ordre de grandeur : 1 point pour l'équipe la plus proche, 2 si elle tombe pile. Le faux dictionnaire : 2 points pour la vraie définition trouvée, 1 par voix sur ta fausse définition. Le plus susceptible de : 1 point si tu votes comme la majorité. Mot pour mot : 1 point pour chaque survivant de la manche. Jeux en couple : 1 point par bonne réponse, accord ou défi relevé. 2 vérités 1 mensonge et Jeu mystère : les points de chaque manche. Gages : chaque gage fait ou refusé est noté, et un gage refusé coûte 2 points.</p></details>
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
      ${sheet.err ? `<p class="hint warn">${sheet.err}</p>` : ""}
      <div class="seg" role="radiogroup" aria-label="Sexe">${[["f", "Fille"], ["h", "Garçon"]].map(([k, l]) => `<button type="button" role="radio" aria-checked="${d.g === k}" class="${d.g === k ? "on" : ""}" data-act="draftG" data-arg="${k}">${l}</button>`).join("")}</div>
      <span class="label">Personnage</span>
      <div class="avgrid">${list.map(a => `<button type="button" class="avpick${d.av === a.id ? " on" : ""}" data-act="draftAv" data-arg="${a.id}" aria-label="Personnage ${a.id}" aria-pressed="${d.av === a.id}"><span class="av av-m">${avatarSvg(a.id)}</span></button>`).join("")}</div>
      <button class="btn" type="submit">${ic("check", 20)}<span>${sheet.id ? "Enregistrer" : "Ajouter"}</span></button>
      ${sheet.id ? `<button type="button" class="textbtn danger" data-act="rmP">Retirer ce joueur</button>` : ""}
    </form>`;
  } else if (sheet.type === "dup") {
    inner = `<div class="rules-head" style="--tc:var(--c-tvm)"><span class="tile-ic">${ic("users", 26)}</span><h2 class="sheet-title">Ce prénom est déjà pris</h2></div>
    <p class="sheet-text">« ${esc(sheet.name)} » est déjà dans la liste des joueurs. Ajoute une initiale ou un surnom pour les différencier, par exemple « ${esc(sheet.name)} B. ».</p>
    ${btn("Changer le prénom", "dupBack", { icon: "pencil" })}`;
  } else if (sheet.type === "confirm") {
    inner = `<h2 class="sheet-title">${sheet.title}</h2><p class="sheet-text">${sheet.text}</p>
    <div class="stack">${btn(sheet.ok, sheet.act, { kind: sheet.danger ? "danger" : "", arg: sheet.arg ?? "" })}<button class="btn ghost" data-act="closeSheet">Annuler</button></div>`;
  } else if (sheet.type === "gage") {
    const who = esc(andList(sheet.who)), pen = `−${GAGE_PENALTY} pts`;
    const card = t => `<div class="card"><span class="card-label">${sheet.multi && t !== "group" ? "Gage à faire ensemble" : "Gage"}</span><div class="txt">${t === "group" ? "Le groupe invente le gage." : esc(t)}</div></div>`;
    const status = d => d === "done" ? `<b class="badge b-good">Fait</b>` : `<b class="badge b-bad">Refusé ${pen}</b>`;
    if (sheet.each) {
      /* Un gage chacun : chaque personne a le sien, noté séparément */
      inner = `<h2 class="sheet-title">Un gage chacun</h2><p class="sheet-text">Chacun fait son gage. Refuser coûte ${GAGE_PENALTY} points à la personne qui refuse.</p>
        <ul class="list gage-each">${sheet.each.map((e, i) => `<li class="row-item">${av(e.n, "s")}<span class="grow"><b>${esc(e.n)}</b><small>${esc(e.g)}</small></span>${e.done ? status(e.done) : `<span class="gage-ab"><button class="pill ghost" data-act="gageOne" data-arg="${i}|0">Refusé</button><button class="pill" data-act="gageOne" data-arg="${i}|1">Fait</button></span>`}</li>`).join("")}</ul>`;
    } else if (sheet.done) inner = `<h2 class="sheet-title">${who ? `Gage de ${who}` : "Le gage"}</h2>${card(sheet.chosen)}
        <p class="lead center">${sheet.done === "done" ? "Gage fait, c'est noté au classement." : `Gage refusé : ${pen}${sheet.multi ? " chacun" : ""}, c'est noté au classement.`}</p>
        <button class="btn ghost" data-act="closeSheet">Fermer</button>`;
    else if (sheet.chosen == null) inner = `<h2 class="sheet-title">${who ? `Gage pour ${who}` : "Choisis un gage"}</h2>
        <p class="sheet-text">${sheet.multi ? `${sheet.who.length} personnes ont un gage : un gage à faire ensemble, ou un gage chacun.` : "Choisis parmi ces trois propositions."}</p>
        <ul class="list">${sheet.opts.map((o, i) => `<li><button class="row-item gage-opt" data-act="gagePick" data-arg="${i}"><span class="opt">${i + 1}</span><span class="grow">${sheet.multi ? `<small>Ensemble</small>` : ""}${esc(o)}</span></button></li>`).join("")}
        <li><button class="row-item gage-opt" data-act="gagePick" data-arg="2"><span class="opt">${ic("users", 16)}</span><span class="grow"><b>Le groupe choisit le gage</b><small>Si aucune proposition ne convient</small></span></button></li>
        ${sheet.multi ? `<li><button class="row-item gage-opt" data-act="gageEach"><span class="opt">${ic("split", 16)}</span><span class="grow"><b>Un gage chacun</b><small>Chaque personne tire son propre gage</small></span></button></li>` : ""}</ul>`;
    else inner = `<h2 class="sheet-title">${who ? `Gage de ${who}` : "Le gage"}</h2>${card(sheet.chosen)}
        ${sheet.who.length ? "" : `<span class="label">Qui fait le gage ?</span><div class="pick">${players.map(n => `<button class="${sheet.pick.includes(n) ? "on" : ""}" data-act="gageWho" data-arg="${esc(n)}">${esc(n)}</button>`).join("")}</div>`}
        <div class="row2">${btn(`Refusé <small>${pen}${sheet.multi ? " chacun" : ""}</small>`, "gageRefuse", { kind: "ghost", icon: "x" })}${btn("Gage fait", "gageDone", { icon: "check" })}</div>
        <p class="hint center">${sheet.multi ? `Un gage à faire ensemble. S'il est refusé, chacun perd ${GAGE_PENALTY} points.` : `Refuser un gage coûte ${GAGE_PENALTY} points. Tout est noté dans le classement.`}</p>`;
  } else if (sheet.type === "rules") {
    const g = GAMES.find(x => x.id === sheet.id), r = RULES[sheet.id];
    inner = `<div class="rules-head" style="--tc:${g.c}"><span class="tile-ic">${ic(g.icon, 26)}</span><div><span class="label">Règles du jeu</span><h2 class="sheet-title">${esc(g.name)}</h2></div></div>
      <p class="sheet-text">${r.but}</p>
      <span class="label">${ic(g.cat === "couple" ? "heart" : "users", 14)} ${g.cat === "couple" ? "À deux" : `Dès ${g.min} joueurs`}</span>
      <ol class="steps">${r.steps.map((t, i) => `<li><span class="stepn" style="background:${g.c}">${i + 1}</span><span>${t}</span></li>`).join("")}</ol>
      <div class="rules-pts"><span class="label">${ic("trophy", 14)} Points</span><p>${r.pts}</p></div>
      ${btn("C'est parti", "closeSheet", { icon: "play", style: `background:${g.c}` })}`;
  } else if (sheet.type === "install") {
    inner = isIos()
      ? `<h2 class="sheet-title">Installer sur ${isIpad() ? "iPad" : "iPhone"}</h2>
         <ol class="steps"><li><span class="stepn">1</span><span>Ouvre cette page dans <b>Safari</b>.</span></li>
         <li><span class="stepn">2</span><span>Touche le bouton Partager ${ic("share", 18)} ${isIpad() ? "en haut à droite de l'écran" : "en bas de l'écran"}.</span></li>
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
/* spicy : false, "hot" (gage épicé) ou "x18" (gage épicé ou réservé aux adultes) */
/* Paquet de gages du niveau de la partie : gages individuels, ou gages de groupe à faire ensemble */
function gageDeck(spicy, group = false) {
  if (group) return spicy === "x18" ? pdeck("groupe-x18", GROUPE_A) : spicy ? pdeck("groupe-hot", GROUPE_E) : pdeck("groupe", GROUPE_N);
  return spicy === "x18" ? pdeck("gages-x18", GAGES_X18) : spicy ? pdeck("gages-hot", GAGES_HOT) : pdeck("gages", GAGES);
}
function gageOpts(spicy, group = false) {
  const d = gageDeck(spicy, group);
  const a = d.draw(); let b = d.draw(); if (b === a) b = d.draw();
  return [a, b];
}
/* Après une défaite, on ne passe à la suite qu'une fois le gage noté, fait ou refusé */
const gageOk = () => !!(G && G.gage && G.gage.done);
const lossGageBtn = (act, who) => btn(`Le gage${who ? ` de ${esc(andList(who))}` : ""}`, act, { icon: "flame" });
const andList = l => l.length > 1 ? `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}` : l.join("");
function openGage(who, spicy = false, then = null) {
  const list = who == null ? [] : Array.isArray(who) ? who : [who];
  /* Rouvrir le gage du même tour affiche les mêmes propositions, ou le gage déjà choisi */
  const prev = G && G.gage;
  if (prev && prev.spicy === spicy && prev.then === then && prev.who.join("|") === list.join("|")) { sheet = prev; return draw(); }
  const multi = list.length > 1;
  sheet = { type: "gage", who: list, pick: [], spicy, multi, opts: gageOpts(spicy, multi), chosen: null, then, done: null, each: null };
  if (G) G.gage = sheet;
  draw();
}

/* ---------- Mimes & Mot interdit ---------- */
function makeTeams() {
  const sh = shuffle(players);
  G.teams = Array.from({ length: G.nTeams }, (_, i) => ({ name: TEAM_NAMES[i], c: TEAM_COLORS[i], members: [], score: 0, k: 0 }));
  sh.forEach((p, i) => G.teams[i % G.nTeams].members.push(p));
}
const teamName = () => ({ mime: "Mimes", taboo: "Mot interdit", tu: "Time's Up", quiz: "Quiz", num: "Ordre de grandeur" })[G.kind];
const TEAM_LEADS = {
  mime: "Une personne mime, son équipe devine. Interdit de parler, de faire des bruits ou de montrer un objet.",
  taboo: "Une personne fait deviner le mot avec des phrases, sans dire le mot ni les mots en rouge. L'équipe adverse surveille.",
  tu: "Les mêmes mots reviennent pendant trois manches : on les décrit, puis on les fait deviner avec un seul mot, puis on les mime.",
  quiz: "Chaque équipe répond à son tour. Une bonne réponse rapporte un point.",
  num: "Chaque équipe donne son estimation en secret. L'équipe la plus proche de la bonne réponse marque un point, deux si elle tombe pile."
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
      ${solo && G.kind !== "quiz" && G.kind !== "num" ? `<p class="hint">Dans une équipe d'une personne, ce sont les autres qui devinent. Les points vont à celle ou celui qui fait deviner.</p>` : ""}
    </div>
    ${G.kind === "mime" ? `<div class="panel"><span class="label">Mots</span>
      <div class="seg">${[["easy", "Faciles"], ["hard", "Difficiles"], ["mix", "Mélange"]].map(([k, l]) => `<button class="${G.diff === k ? "on" : ""}" data-act="diff" data-arg="${k}">${l}</button>`).join("")}</div>
      <p class="hint">${G.diff === "easy" ? "Animaux, objets, métiers, sports : des mots simples à mimer." : G.diff === "hard" ? "Films, personnages, émotions et métiers rares : pour les pros du mime." : "Un peu de tout."}</p></div>` : ""}
    ${G.kind === "tu" ? `<div class="panel"><span class="label">Nombre de mots</span>
      <div class="seg">${[30, 40, 50].map(n => `<button class="${G.nWords === n ? "on" : ""}" data-act="tuWords" data-arg="${n}">${n} mots</button>`).join("")}</div></div>` : ""}
    ${G.kind === "quiz" ? `<div class="panel"><span class="label">Thème</span>
      <div class="pick themes">${[["all", "Tous les thèmes", QUIZ.length], ...QUIZ_THEMES.map(t => [t, t, QUIZ.filter(q => q.cat === t).length])].map(([k, l, n]) => `<button class="${G.qtheme === k ? "on" : ""}" data-act="quizTheme" data-arg="${esc(k)}" aria-pressed="${G.qtheme === k}">${esc(l)} <small>${n}</small></button>`).join("")}</div></div>` : ""}
    ${G.kind !== "tu" ? `<div class="panel"><span class="label">Objectif</span>
      <div class="seg">${[15, 30, 40, 0].map(n => `<button class="${G.target === n ? "on" : ""}" data-act="target" data-arg="${n}">${n ? `${n} pts` : "Sans"}</button>`).join("")}</div>
      <p class="hint">${G.target ? `La première équipe à ${G.target} points gagne la partie.` : G.kind === "quiz" || G.kind === "num" ? "Pas d'objectif : la partie s'arrête après le nombre de questions choisi." : "Pas d'objectif : vous arrêtez quand vous voulez avec « Terminer la partie »."}</p></div>` : ""}
    ${(G.kind === "quiz" || G.kind === "num") && G.target ? "" : G.kind === "quiz" || G.kind === "num" ? `<div class="panel"><span class="label">${G.kind === "num" ? "Questions" : "Questions par équipe"}</span>
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
/* Objectif de points : la première équipe qui l'atteint gagne. Sans objectif, Quiz et Ordre de grandeur suivent le nombre de questions. */
const targetHit = () => !!G.target && G.teams.some(t => t.score >= G.target);
const lastQ = (k = 0) => G.target ? targetHit() : G.asked + k >= G.total;
const targetTxt = () => G.target ? `Premier à ${G.target} points` : "";
const qTitle = () => G.target ? `Question ${G.asked + 1}, premier à ${G.target}` : `Question ${G.asked + 1} sur ${G.total}`;
const actorOf = t => t.members[t.k % t.members.length];
function turnIntro() {
  const t = G.teams[G.cur], a = actorOf(t);
  const verb = G.kind === "mime" ? "mime" : "fait deviner";
  return screen({
    title: `${teamName()}, tour ${G.round}`, color: t.c, body: `
    <div class="hero">${av(a, "xl")}<span class="kicker">${esc(t.name)}</span><h2 class="big">${esc(a)}</h2>
    <p class="lead">${t.members.length === 1 ? `${verb} pour les autres joueurs.` : `${verb} pour son équipe. Les autres équipes ne regardent pas l'écran.`}</p></div>
    <span class="label">Scores${G.target ? `, premier à ${G.target} points` : ""}</span>${teamScore()}`,
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
    <div class="hero"><span class="kicker">${esc(t.name)}</span><h2 class="big">${ptsTxt(pts)}</h2><p class="hint">Touche un mot pour corriger. Le dernier mot compte s'il a été trouvé au buzzer.${G.kind === "taboo" ? " Les mots interdits de chaque carte sont rappelés en rouge." : ""}</p></div>
    ${G.log.length ? `<ul class="list">${G.log.map((l, i) => `<li><button class="row-item" data-act="toggle" data-arg="${i}"><span class="grow">${esc(l.c.w)}${l.last ? `<small>Dernier mot</small>` : ""}${G.kind === "taboo" ? `<span class="forbid-mini">${l.c.f.map(f => `<span>${esc(f)}</span>`).join("")}</span>` : ""}</span><b class="badge ${l.v === 1 ? "b-good" : l.v === -1 ? "b-bad" : ""}">${lbl(l.v)}</b></button></li>`).join("")}</ul>` : `<p class="hint">Aucun mot cette fois.</p>`}`,
    foot: btn("Valider et équipe suivante", "turnValidate", { icon: "check" })
  });
}
function teamFinal() {
  const s = [...G.teams].sort((a, b) => b.score - a.score), tie = s[0].score === s[1].score;
  return screen({
    title: "Résultats", color: s[0].c, left: null, body: `
    <div class="hero">${ic(tie ? "medal" : "trophy", 44)}<span class="kicker">${tie ? "Égalité" : "Victoire"}</span><h2 class="big">${tie ? "Match nul" : esc(s[0].name)}</h2>
    ${tie ? "" : `<p class="lead">${G.target && s[0].score >= G.target ? `Objectif de ${G.target} points atteint. ` : ""}3 points bonus au classement pour ${s[0].members.map(esc).join(", ")}.</p>`}</div>
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
  G.input = "";
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
    <div class="card" style="--gc:${roleCol(p.role)}"><span class="card-label">Son rôle</span><div class="word">${roleName(p.role)}</div>${p.role !== "white" ? `<p class="card-foot">Son mot reste secret jusqu'à la fin de la partie.</p>` : ""}
    ${sp ? `<div class="special"><span class="role-ic">${ic(sp.icon, 20)}</span><div><span class="card-label">Rôle spécial</span><b>${sp.name}</b>${p.clownWin ? `<p>Éliminé au premier vote : 3 points pour ${esc(p.name)}.</p>` : ""}</div></div>` : ""}</div>`;
  let foot = btn("Continuer", "ucNext", { icon: "play" });
  if (q.wFail) body += `<p class="lead">Raté, ce n'est pas le mot des civils. La partie continue.</p>`;
  if (p.role === "white" && !q.wDone) {
    /* Mr White tape sa réponse : l'appli vérifie sans afficher le mot des civils */
    body += `<p class="lead">Dernière chance : ${esc(p.name)} tape le mot des civils. L'appli vérifie sans le dévoiler.</p>
      <label class="field"><span>Le mot des civils</span><input id="txtIn" value="${esc(G.input)}" maxlength="40" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="done"></label>`;
    foot = btn("Vérifier", "ucWhiteTry", { icon: "check" });
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
    foot: G.loser && !gageOk() ? lossGageBtn("mysLossGage", [G.loser])
      : btn(c ? "Carte suivante" : "Tirer une carte", "mysDraw", { icon: "dices" }) + (c && !G.loser ? `<button class="textbtn" data-act="mysGage">Quelqu'un ne peut pas le faire : gage</button>` : "")
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
    title: qTitle(), color: t.c, body: `
    <div class="who"><i class="dot" style="--tc:${t.c};width:16px;height:16px"></i><div><span class="kicker">Au tour de</span><b>${esc(t.name)}</b></div></div>
    <div class="card"><span class="card-label">${esc(q.cat)}</span><div class="txt">${esc(q.q)}</div></div>
    <ul class="list">${G.opts.map((o, i) => {
      const cls = !done ? "" : o === q.a ? " right" : i === G.ans ? " wrong" : " dim";
      return `<li><button class="row-item answer${cls}" data-act="quizAns" data-arg="${i}" ${done ? "disabled" : ""}><span class="opt">${"ABCD"[i]}</span><span class="grow">${esc(o)}</span>${done && o === q.a ? ic("check", 20) : done && i === G.ans ? ic("x", 20) : ""}</button></li>`;
    }).join("")}</ul>
    ${done ? `<p class="lead center">${G.opts[G.ans] === q.a ? `Bonne réponse, un point pour ${esc(t.name)}.` : `Raté. Bonne réponse : <strong>${esc(q.a)}</strong>`}</p>` : ""}`,
    foot: done ? btn(lastQ(1) ? "Voir les résultats" : "Question suivante", "quizNext", { icon: "play" }) : `<p class="hint center">${esc(t.name)} se met d'accord, puis touche sa réponse.</p>`
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
    foot: G.loser == null ? "" : gageOk() ? btn("Nouvelle manche", "bombNew", { icon: "undo" }) : lossGageBtn("bombGage", [G.loser])
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
  const A_ = players.filter(n => G.votes[n] === "A"), B_ = players.filter(n => G.votes[n] === "B");
  if (G.step === "result") {
    const minority = A_.length === B_.length ? null : A_.length < B_.length ? A_ : B_;
    const side = (k, txt, list, cls) => `<div class="wyr-side ${cls}${minority === list && list.length ? " lose" : ""}"><span class="wyr-tag">${k}</span><b class="wyr-count">${list.length}</b><p>${esc(txt)}</p><div class="team-members">${list.map(n => `<span class="mini">${av(n, "xs")}${esc(n)}</span>`).join("") || `<small>Personne</small>`}</div></div>`;
    return screen({
      title: "Tu préfères", color: C, body: `
      <h2 class="h2">${!minority ? "Égalité parfaite" : minority.length ? `Gage pour ${minority.map(esc).join(", ")}` : "Tout le monde est d'accord"}</h2>
      <p class="hint">${minority && minority.length ? "La majorité gagne 1 point. La minorité fait son gage ou le refuse, puis on passe au dilemme suivant." : "Personne ne gagne de point sur ce dilemme."}</p>
      <div class="wyr-result">${side("A", a, A_, "a")}${side("B", b, B_, "b")}</div>`,
      foot: minority && minority.length && !gageOk() ? lossGageBtn("wyrGage", minority) : btn("Dilemme suivant", "wyrNext", { icon: "play" })
    });
  }
  const voted = A_.length + B_.length;
  return screen({
    title: "Tu préfères", color: C, body: `
    <div class="seg">${WYR_LEVELS.map(([k, l]) => `<button class="${G.level === k ? "on" : ""}" data-act="wyrLevel" data-arg="${k}">${l}</button>`).join("")}</div>
    <div class="wyr">
      <div class="wyr-choice a"><span class="wyr-tag">A</span><p>${esc(a)}</p></div>
      <span class="wyr-or">ou</span>
      <div class="wyr-choice b"><span class="wyr-tag">B</span><p>${esc(b)}</p></div>
    </div>
    <span class="label">Chacun choisit son camp</span>
    <ul class="list">${players.map(n => `<li class="row-item wyr-vote">${av(n, "s")}<span class="grow">${esc(n)}</span>
      <span class="ab">${["A", "B"].map(k => `<button class="${G.votes[n] === k ? "on " + k.toLowerCase() : ""}" data-act="wyrVote" data-arg="${esc(n)}|${k}" aria-pressed="${G.votes[n] === k}">${k}</button>`).join("")}</span></li>`).join("")}</ul>`,
    foot: `<div class="row2">${btn("Passer", "wyrNext", { kind: "ghost", icon: "skip" })}${btn(`Résultat <small>${voted}/${players.length}</small>`, "wyrValidate", { icon: "check", dis: !voted })}</div>`
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
    <p class="lead">${dead.length ? `Cette nuit, ${dead.map(p => esc(p.name)).join(" et ")} ${dead.length > 1 ? (dead.every(p => gOf(p.name) === "f") ? "ont été retrouvées mortes" : "ont été retrouvés morts") : `a été ${fe(dead[0].name, "retrouvée morte", "retrouvé mort")}`}.` : "Personne n'est mort cette nuit."}</p></div>`,
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
  say(deaths.length ? `Le village se réveille. Cette nuit, ${deaths.map(d => G.ps[d.i].name).join(" et ")} ${deaths.length > 1 ? (deaths.every(d => gOf(G.ps[d.i].name) === "f") ? "sont mortes" : "sont morts") : fe(G.ps[deaths[0].i].name, "est morte", "est mort")}.` : "Le village se réveille. Personne n'est mort cette nuit.");
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

/* ---------- Le lieu secret ---------- */
const SPYC = "var(--c-spy)";
const spyMax = () => players.length >= 7 ? 2 : 1;
function spySetup() {
  return screen({
    title: "Le lieu secret", color: SPYC, body: `
    <p class="lead">Tout le monde connaît le lieu, sauf l'espion. Posez-vous des questions pour le démasquer. L'espion, lui, essaie de deviner le lieu sans se faire repérer.</p>
    <div class="panel"><span class="label">Espions</span>
      <div class="seg">${[1, 2].map(n => `<button class="${G.nS === n ? "on" : ""}" data-act="spyN" data-arg="${n}" ${n > spyMax() ? "disabled" : ""}>${plural(n, "espion")}</button>`).join("")}</div>
      ${spyMax() < 2 ? `<p class="hint">Deux espions possibles à partir de 7 joueurs.</p>` : ""}</div>
    <div class="panel"><span class="label">Durée de l'enquête</span>
      <div class="seg">${[4, 6, 8].map(n => `<button class="${G.mins === n ? "on" : ""}" data-act="spyMins" data-arg="${n}">${n} min</button>`).join("")}</div></div>
    <details class="howto"><summary>${ic("info", 18)} Comment on joue</summary>
      <p>Chacun découvre en secret le lieu, ou son rôle d'espion. La personne désignée pose une question sur le lieu à quelqu'un de son choix, sans jamais le nommer. Celle qui répond pose la question suivante. Trop vague, on vous soupçonne. Trop précis, l'espion devine. Le groupe peut passer au vote à tout moment, et l'espion peut se dévoiler pour tenter de deviner le lieu. Les habitants gagnent 2 points, l'espion 4.</p></details>`,
    foot: btn("Distribuer les rôles", "spyGo", { icon: "play" })
  });
}
const spyCard = p => p.spy
  ? `<div class="card"><span class="card-label">${esc(p.name)}, tu es</span><span class="role-big">${ic("eyeOff", 40)}</span><div class="word">L'espion</div><p class="card-foot">Tu ne connais pas le lieu. Écoute les questions, bluffe et essaie de le deviner.${G.nS > 1 ? " Il y a deux espions, vous ne vous connaissez pas." : ""}</p></div>`
  : `<div class="card"><span class="card-label">Le lieu, ${esc(p.name)}</span><div class="word">${esc(G.place)}</div><p class="card-foot">Tu n'es pas l'espion. Ne prononce jamais le nom du lieu.</p></div>`;
function spyDeal() {
  const p = G.ps[G.i], t = `Distribution ${G.i + 1} sur ${G.ps.length}`;
  if (!G.show) return screen({
    title: t, color: SPYC, body: `<div class="hero">${av(p.name, "xl")}<span class="kicker">Passe le téléphone à</span><h2 class="big">${esc(p.name)}</h2><p class="lead">Les autres ne regardent pas l'écran.</p></div>`,
    foot: btn(`Je suis ${esc(p.name)}, voir le lieu`, "spyShow", { icon: "eye" })
  });
  return screen({ title: t, color: SPYC, body: spyCard(p), foot: btn("J'ai retenu, je cache", "spyHide", { icon: "eyeOff" }) });
}
function spyPlay() {
  if (typeof G.peek === "number") return screen({ title: "Revoir le lieu", color: SPYC, body: spyCard(G.ps[G.peek]), foot: btn("Cacher", "spyPeekDone", { icon: "eyeOff" }) });
  if (G.peek === "list") return screen({
    title: "Revoir le lieu", color: SPYC, body: `<h2 class="h2">Qui a oublié ?</h2><p class="hint">Seule cette personne regarde l'écran.</p>
    <div class="pickgrid">${G.ps.map((p, i) => `<button class="pickav" data-act="spyPeek" data-arg="${i}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>`).join("")}</div>`,
    foot: btn("Retour", "spyPeekDone", { kind: "ghost", icon: "back" })
  });
  return screen({
    title: "Le lieu secret", color: SPYC, body: `
    <div class="who">${av(G.first, "m")}<div><span class="kicker">Première question</span><b>${esc(G.first)}</b></div></div>
    <p class="hint">Pose une question sur le lieu à la personne de ton choix. Celle qui répond pose la suivante. Interdit de reposer la question à la personne qui vient de t'interroger.</p>
    ${timerHTML(timer ? timer.left : G.mins * 60)}
    ${timer ? btn("Arrêter le chrono", "stopClock", { kind: "ghost", icon: "stop" }) : btn(`Lancer ${G.mins} minutes d'enquête`, "spyClock", { kind: "ghost", icon: "timer" })}
    <button class="textbtn" data-act="spyPeekList">Quelqu'un a oublié le lieu ?</button>`,
    foot: btn("Passer au vote", "spyVote", { icon: "vote" }) + `<button class="textbtn" data-act="spyUnmask">${ic("eyeOff", 18)} L'espion se dévoile</button>`
  });
}
function spyVoteScreen() {
  const solo = G.step === "unmask";
  return screen({
    title: solo ? "L'espion se dévoile" : "Le vote", color: SPYC, body: solo
      ? `<h2 class="h2">Qui se dévoile ?</h2><p class="hint">L'espion se désigne, puis tente de deviner le lieu. S'il trouve, il gagne.</p>
      <div class="pickgrid">${G.ps.map((p, i) => `<button class="pickav" data-act="spySelfAsk" data-arg="${i}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>`).join("")}</div>`
      : `<h2 class="h2">Qui est l'espion ?</h2><p class="hint">À trois, tout le monde pointe un suspect. Touche la personne la plus désignée.</p>
      <div class="pickgrid">${G.ps.map((p, i) => `<button class="pickav${G.pick === i ? " on" : ""}" data-act="spyPick" data-arg="${i}">${av(p.name, "m")}<span>${esc(p.name)}</span></button>`).join("")}</div>`,
    foot: (solo ? "" : btn(G.pick != null ? `Accuser ${esc(G.ps[G.pick].name)}` : "Choisis un suspect", "spyAccuse", { kind: "danger", icon: "crosshair", dis: G.pick == null }))
      + `<button class="textbtn" data-act="spyBack">Retour à l'enquête</button>`
  });
}
function spyGuess() {
  const p = G.ps[G.caught];
  return screen({
    title: "Dernière chance", color: SPYC, body: `
    <div class="hero">${av(p.name, "l")}<span class="kicker">${G.self ? "Se dévoile" : "Démasqué"}</span><h2 class="big">${esc(p.name)} est ${fe(p.name, "une espionne", "un espion")}</h2>
    <p class="lead">${G.self ? "S'il trouve le lieu, l'espion gagne. Sinon, les habitants gagnent." : "Dernière chance : s'il trouve le lieu, l'espion gagne quand même."}</p></div>
    <span class="label">Quel est le lieu ?</span>
    <div class="pick places">${G.opts.map((o, i) => `<button data-act="spyTry" data-arg="${i}">${esc(o)}</button>`).join("")}</div>`
  });
}
function spyEnd() {
  const spies = G.ps.filter(p => p.spy);
  return screen({
    title: "Fin de la partie", color: SPYC, left: null, body: `
    <div class="hero">${ic(G.win === "spies" ? "eyeOff" : "mapPin", 48)}<h2 class="big">${G.win === "spies" ? (spies.length > 1 ? "Les espions gagnent" : "L'espion gagne") : "Les habitants gagnent"}</h2><p class="lead">${G.why}</p></div>
    <div class="card"><span class="card-label">Le lieu</span><div class="word">${esc(G.place)}</div></div>
    <ul class="list">${G.ps.map(p => `<li class="row-item">${av(p.name, "s")}<span class="grow"><b>${esc(p.name)}</b><small>${p.spy ? fe(p.name, "Espionne", "Espion") : "Habitant"}</small></span><b class="badge ${G.pts[p.name] ? "b-good" : ""}">${G.pts[p.name] ? "+" + G.pts[p.name] : "0"}</b></li>`).join("")}</ul>`,
    foot: btn("Nouveau lieu", "spyGo", { icon: "undo" }) + `<div class="row2 links"><button class="textbtn" data-act="spySettings">Réglages</button><button class="textbtn" data-act="home">Retour aux jeux</button></div>`
  });
}

/* ---------- Le plus susceptible de ---------- */
const MOSTC = "var(--c-most)";
const MOST_LEVELS = [["soft", "Soft"], ["hot", "Épicé"], ["x18", "+18"]];
const segOf = (levels, cur, act) => `<div class="seg">${levels.map(([k, l]) => `<button class="${cur === k ? "on" : ""}" data-act="${act}" data-arg="${k}">${l}</button>`).join("")}</div>`;
const mostCard = () => `<div class="card"><span class="card-label">${ic("pointer", 16)} Le plus susceptible de…</span><div class="txt">…${esc(G.card)} ?</div></div>`;
function most() {
  if (G.gate) return gateScreen("Le plus susceptible de", MOSTC, "mostAdult", "mostGateNo");
  if (G.step === "vote") {
    const v = players[G.vi];
    return screen({
      title: `Vote ${G.vi + 1} sur ${players.length}`, color: MOSTC, body: `
      <div class="who">${av(v, "m")}<div><span class="kicker">Vote secret de</span><b>${esc(v)}</b></div></div>
      ${mostCard()}
      <p class="hint">Les autres ne regardent pas. Touche la personne de ton choix, le téléphone passe ensuite au suivant.</p>
      <div class="pickgrid">${others(v).map(n => `<button class="pickav" data-act="mostCast" data-arg="${esc(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`,
      foot: G.vi > 0 ? btn("Corriger le vote précédent", "mostUncast", { kind: "ghost", icon: "undo" }) : ""
    });
  }
  if (G.step === "result") {
    const tops = G.tops, one = tops.length === 1;
    return screen({
      title: "Le plus susceptible de", color: MOSTC, body: `
      <div class="hero">${one ? av(tops[0], "xl") : `<div class="pair-av">${tops.slice(0, 3).map(n => av(n, "l")).join("")}</div>`}
      <span class="kicker">${one ? fe(tops[0], "Élue par le groupe", "Élu par le groupe") : "Égalité"}</span><h2 class="big">${esc(andList(tops))}</h2></div>
      ${mostCard()}
      ${G.tally.length ? `<ul class="list">${G.tally.map(([n, v]) => `<li class="row-item${tops.includes(n) ? " lead" : ""}">${av(n, "s")}<span class="grow">${esc(n)}</span><b class="num">${v} voix</b></li>`).join("")}</ul>
      <p class="hint">${G.winners.length ? `1 point pour ${G.winners.map(esc).join(", ")}, qui ont voté comme la majorité.` : "Personne n'a voté comme la majorité."}</p>` : ""}`,
      foot: `<div class="row2">${btn("Le gage", "mostGage", { kind: "ghost", icon: "flame" })}${btn("Carte suivante", "mostNext", { icon: "play" })}</div>`
    });
  }
  return screen({
    title: "Le plus susceptible de", color: MOSTC, body: `
    ${segOf(MOST_LEVELS, G.level, "mostLevel")}
    ${mostCard()}
    ${segOf([["secret", "Vote secret"], ["hand", "À main levée"]], G.mode, "mostMode")}
    ${G.mode === "hand" ? `<span class="label">À trois, tout le monde pointe quelqu'un. Qui a le plus de voix ?</span>
    <div class="pickgrid">${players.map(n => `<button class="pickav${G.sel.includes(n) ? " on" : ""}" data-act="mostSel" data-arg="${esc(n)}" aria-pressed="${G.sel.includes(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>`
    : `<p class="hint">Chacun vote en secret en se passant le téléphone. Celles et ceux qui votent comme la majorité gagnent 1 point.</p>`}`,
    foot: `<div class="row2">${btn("Passer", "mostNext", { kind: "ghost", icon: "skip" })}${G.mode === "hand" ? btn("Valider", "mostHand", { icon: "check", dis: !G.sel.length }) : btn("Voter en secret", "mostVoteStart", { icon: "vote" })}</div>`
  });
}

/* ---------- Ordre de grandeur ---------- */
const fmtNum = (v, year) => year ? String(v) : v.toLocaleString("fr-FR", { maximumFractionDigits: 2 });
const numUnit = q => q.u && q.u !== "année" ? " " + q.u : "";
function numQ() {
  const q = G.q;
  if (G.ti < G.teams.length) {
    const t = G.teams[G.ti];
    return screen({
      title: qTitle(), color: t.c, body: `
      <div class="who"><i class="dot" style="--tc:${t.c};width:16px;height:16px"></i><div><span class="kicker">Estimation de</span><b>${esc(t.name)}</b></div></div>
      <div class="card"><span class="card-label">${ic("ruler", 16)} Ordre de grandeur</span><div class="txt">${esc(q.q)}</div>${q.u && q.u !== "année" ? `<p class="card-foot">Réponse en ${esc(q.u)}</p>` : ""}</div>
      <label class="field"><span>Votre estimation</span><input id="numIn" type="text" inputmode="decimal" autocomplete="off" enterkeyhint="done" value="${esc(G.input)}" placeholder="Un nombre"></label>
      <p class="hint">Les autres équipes ne regardent pas l'écran.</p>`,
      foot: btn(G.ti + 1 < G.teams.length ? "Valider et cacher" : "Valider et révéler", "numSet", { icon: "check" })
    });
  }
  const year = q.u === "année";
  return screen({
    title: qTitle(), color: "var(--c-num)", body: `
    <div class="card"><span class="card-label">${esc(q.q)}</span><div class="word">${fmtNum(q.a, year)}${esc(numUnit(q))}</div></div>
    <ul class="list">${G.rank.map(r => { const t = G.teams[r.i]; return `<li class="row-item${r.win ? " lead" : ""}" style="--tc:${t.c}"><i class="dot"></i><span class="grow"><b>${esc(t.name)}</b><small>${fmtNum(r.v, year)}${esc(numUnit(q))}</small></span>${r.win ? `<b class="badge b-good">+${G.gain}</b>` : `<b class="badge">0</b>`}</li>`; }).join("")}</ul>
    <p class="hint center">${G.gain === 2 ? "Pile la bonne réponse : 2 points." : "L'équipe la plus proche marque 1 point. Pile la bonne réponse en rapporte 2."}</p>`,
    foot: btn(lastQ(1) ? "Voir les résultats" : "Question suivante", "numNext", { icon: "play" })
  });
}

/* ---------- Le faux dictionnaire ---------- */
const DICOC = "var(--c-dico)";
const dicoScores = () => `<span class="label">Scores de la partie</span>${scoreList(Object.entries(G.scores).sort((a, b) => b[1] - a[1]))}`;
function dico() {
  const w = G.word.w;
  if (G.step === "word") return screen({
    title: "Le faux dictionnaire", color: DICOC, body: `
    <div class="card"><span class="card-label">${ic("book", 16)} Le mot</span><div class="word">${esc(w)}</div></div>
    <p class="lead">Chacun invente une fausse définition crédible, en secret. On mélange avec la vraie, puis tout le monde vote. Trouver la vraie rapporte 2 points, chaque voix sur ta fausse définition 1 point.</p>
    <p class="hint">Si quelqu'un connaît déjà ce mot, changez-en.</p>
    ${dicoScores()}`,
    foot: btn("Écrire les définitions", "dicoWrite", { icon: "pencil" }) + `<button class="textbtn" data-act="dicoOther">${ic("shuffle", 18)} Autre mot</button>`
  });
  if (G.step === "write") {
    const p = players[G.wi], t = `Définition ${G.wi + 1} sur ${players.length}`;
    if (!G.show) return screen({
      title: t, color: DICOC, body: `<div class="hero">${av(p, "xl")}<span class="kicker">Passe le téléphone à</span><h2 class="big">${esc(p)}</h2><p class="lead">Les autres ne regardent pas l'écran.</p></div>`,
      foot: btn(`Je suis ${esc(p)}, écrire`, "dicoShow", { icon: "pencil" })
    });
    return screen({
      title: t, color: DICOC, body: `
      <div class="card"><span class="card-label">Ta fausse définition de</span><div class="word">${esc(w)}</div></div>
      <label class="field"><span>${esc(p)}, invente une définition</span><textarea id="txtIn" rows="3" maxlength="160" placeholder="Une définition qui sonne vrai">${esc(G.input)}</textarea></label>
      <p class="hint">Imite le style d'un dictionnaire : court, sérieux, crédible.</p>`,
      foot: btn("Valider et cacher", "dicoSave", { icon: "check" }) + `<button class="textbtn" data-act="dicoSkip">Passer mon tour</button>`
    });
  }
  if (G.step === "read") return screen({
    title: "Lecture", color: DICOC, body: `
    <div class="card"><span class="card-label">Les définitions de</span><div class="word">${esc(w)}</div></div>
    <p class="hint">Une personne lit toutes les définitions à voix haute, sans rire et sans hésiter.</p>
    <ol class="list">${G.defs.map((d, i) => `<li class="row-item def"><span class="opt">${i + 1}</span><span class="grow">${esc(d.d)}</span></li>`).join("")}</ol>`,
    foot: btn("Passer au vote", "dicoVote", { icon: "vote" })
  });
  if (G.step === "vote") {
    const v = players[G.vi];
    return screen({
      title: `Vote ${G.vi + 1} sur ${players.length}`, color: DICOC, body: `
      <div class="who">${av(v, "m")}<div><span class="kicker">Vote de</span><b>${esc(v)}</b></div></div>
      <p class="hint">Quelle est la vraie définition de <b>${esc(w)}</b> ? Ta propre définition n'apparaît pas.</p>
      <ul class="list">${G.defs.map((d, i) => d.who === v ? "" : `<li><button class="row-item def" data-act="dicoCast" data-arg="${i}"><span class="opt">${i + 1}</span><span class="grow">${esc(d.d)}</span></button></li>`).join("")}</ul>`,
      foot: G.vi > 0 ? btn("Corriger le vote précédent", "dicoUncast", { kind: "ghost", icon: "undo" }) : ""
    });
  }
  return screen({
    title: "Résultat", color: DICOC, body: `
    <div class="card"><span class="card-label">La vraie définition de ${esc(w)}</span><div class="txt">${esc(G.word.d)}</div></div>
    <ul class="list">${G.defs.map((d, i) => { const vs = players.filter(n => G.votes[n] === i); return `<li class="row-item def${d.who ? "" : " lead"}"><span class="opt">${i + 1}</span><span class="grow"><b>${d.who ? `Inventée par ${esc(d.who)}` : "La vraie"}</b><small>${esc(d.d)}</small><small>${vs.length ? `Votes : ${vs.map(esc).join(", ")}` : "Aucun vote"}</small></span></li>`; }).join("")}</ul>
    ${dicoScores()}`,
    foot: btn("Mot suivant", "dicoNext", { icon: "play" })
  });
}

/* ---------- Mot pour mot ---------- */
const CHAINC = "var(--c-chain)";
const chainCur = () => G.order[G.cur % G.order.length];
function chain() {
  if (G.step === "play") {
    const p = chainCur();
    return screen({
      title: "Mot pour mot", color: CHAINC, left: null, right: `<button class="iconbtn" data-act="chainPause" aria-label="Pause">${ic("stop")}</button>`, body: `
      ${timerHTML(timer ? timer.left : G.sec)}
      <div class="meta-row"><span class="kicker">Mot de départ : ${esc(G.word)}</span><span class="kicker">${plural(G.n, "mot")}</span></div>
      <div class="hero">${av(p, "xl")}<span class="kicker">À toi</span><h2 class="big">${esc(p)}</h2><p class="lead">Dis un mot lié au précédent, puis touche le bouton.</p></div>
      <button class="textbtn danger" data-act="chainLose">${ic("ban", 18)} Contesté : mot répété ou sans lien</button>`,
      foot: `<button class="btn chain-go" data-act="chainNext">${ic("check", 24)}<span>Mot dit, au suivant</span></button>`
    });
  }
  if (G.step === "lost") return screen({
    title: "Mot pour mot", color: CHAINC, body: `
    <div class="hero">${av(G.loser, "xl")}<span class="kicker">${G.n ? `Après ${plural(G.n, "mot")}` : "Dès le premier mot"}</span><h2 class="big">${esc(G.loser)} a perdu</h2><p class="lead">Les autres gagnent 1 point.</p></div>`,
    foot: gageOk() ? btn("Nouvelle manche", "chainNew", { icon: "undo" }) : lossGageBtn("chainGage", [G.loser])
  });
  return screen({
    title: "Mot pour mot", color: CHAINC, body: `
    <div class="card"><span class="card-label">${ic("link", 16)} Mot de départ</span><div class="word">${esc(G.word)}</div></div>
    <p class="lead">Posez le téléphone au milieu. Chacun son tour, dis un mot lié au précédent avant la fin du chrono : « plage », « sable », « château »… Pas de répétition. Si le groupe conteste, tu as perdu.</p>
    <div class="panel"><span class="label">Temps par mot</span>${segOf([["3", "3 s"], ["5", "5 s"], ["8", "8 s"]], String(G.sec), "chainSec")}</div>
    <div class="who">${av(chainCur(), "m")}<div><span class="kicker">Commence</span><b>${esc(chainCur())}</b></div></div>`,
    foot: btn("C'est parti", "chainStart", { icon: "play" }) + `<button class="textbtn" data-act="chainWord">${ic("shuffle", 18)} Autre mot de départ</button>`
  });
}

/* ---------- Jeux en couple ---------- */
const coupleOk = c => Array.isArray(c) && c.length === 2 && c[0] !== c[1] && c.every(n => players.includes(n));
const cpOther = n => G.couple[0] === n ? G.couple[1] : G.couple[0];
const cpColor = () => gameColor(G.kind);
const cpTitle = () => GAMES.find(g => g.id === G.kind).name;
const WHO2_LEVELS = [["tendre", "Tendre"], ["hot", "Épicé"], ["x18", "+18"]];
const DARE2_LEVELS = WHO2_LEVELS;
const TALK_LEVELS = [["light", "Légères"], ["memories", "Souvenirs"], ["deep", "Profondes"]];
const CP_LEADS = {
  know: "Chacun son tour, l'un répond à une question sur l'autre. L'autre confirme si c'est juste. À la fin, votre score de complicité.",
  future: "Une question sur votre avenir. Chacun écrit sa réponse en secret, puis on compare. Même vision ou sujet à discuter ?",
  who2: "« Qui de nous deux… » : à trois, chacun pointe la personne qui correspond. D'accord ou pas ?",
  wave: "Un dilemme, deux choix secrets. Êtes-vous sur la même longueur d'onde ?",
  dare2: "Des défis à faire à deux, chacun son tour. Du tendre au +18.",
  talk: "Des questions pour parler vraiment, sans points ni gagnant. Chacun répond à son tour."
};
const cpCount = { know: [10, 20, 30], future: [5, 10, 15], wave: [10, 20, 30] };
function coupleSetup() {
  const ok = coupleOk(G.couple);
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    <p class="lead">${CP_LEADS[G.kind]}</p>
    <div class="panel"><span class="label">Le couple</span>
      <div class="pickgrid">${players.map(n => `<button class="pickav${G.couple.includes(n) ? " on" : ""}" data-act="cpPick" data-arg="${esc(n)}" aria-pressed="${G.couple.includes(n)}">${av(n, "m")}<span>${esc(n)}</span></button>`).join("")}</div>
      <p class="hint">${ok ? `${esc(G.couple[0])} et ${esc(G.couple[1])}` : "Touche les deux personnes du couple."}</p></div>
    ${cpCount[G.kind] ? `<div class="panel"><span class="label">${G.kind === "wave" ? "Dilemmes" : "Questions"}</span>${segOf(cpCount[G.kind].map(n => [String(n), String(n)]), String(G.n), "cpN")}</div>` : ""}`,
    foot: btn("Commencer", "cpGo", { icon: "play", dis: !ok })
  });
}
const cpHead = (n, k) => `<div class="who">${av(n, "m")}<div><span class="kicker">${k}</span><b>${esc(n)}</b></div></div>`;
const cpProgress = () => `<span class="kicker">${G.i + 1} sur ${G.n}</span>`;
const pct = (a, b) => b ? Math.round(a * 100 / b) : 0;
function cpVerdict(p) {
  return p >= 80 ? ["Âmes sœurs", "Vous vous connaissez par cœur."] : p >= 60 ? ["Très complices", "Quelques surprises, mais l'essentiel est là."]
    : p >= 40 ? ["En pleine découverte", "Il vous reste de jolies choses à apprendre l'un sur l'autre."] : ["Tout à découvrir", "Parfait pour une longue discussion ce soir."];
}
function cpResult(title, p, rows) {
  const [v, d] = cpVerdict(p);
  return screen({
    title: cpTitle(), color: cpColor(), left: null, body: `
    <div class="hero"><div class="pair-av">${av(G.couple[0], "l")}${ic("heart", 28)}${av(G.couple[1], "l")}</div>
    <span class="kicker">${title}</span><h2 class="big">${p} %</h2><p class="lead"><b>${v}.</b> ${d}</p></div>
    ${rows}`,
    foot: btn("Rejouer", "cpGo", { icon: "undo" }) + `<div class="row2 links"><button class="textbtn" data-act="cpSettings">Réglages</button><button class="textbtn" data-act="home">Retour aux jeux</button></div>`
  });
}
function know() {
  if (G.i >= G.n) {
    const [a, b] = G.couple, tot = G.ok[a] + G.ok[b];
    return cpResult("Score de complicité", pct(tot, G.n), `<ul class="list">${G.couple.map(n => `<li class="row-item">${av(n, "s")}<span class="grow"><b>${esc(n)}</b><small>Connaît ${esc(cpOther(n))}</small></span><b class="num">${G.ok[n]} sur ${G.asked[n]}</b></li>`).join("")}</ul>`);
  }
  const p = G.couple[G.i % 2];
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    <div class="meta-row">${cpProgress()}<span class="kicker">${G.ok[G.couple[0]] + G.ok[G.couple[1]]} bonnes réponses</span></div>
    ${cpHead(p, "Répond")}
    <div class="card"><span class="card-label">${ic("target", 16)} Question sur ${esc(cpOther(p))}</span><div class="txt">${G.text}</div></div>
    <p class="hint center">${esc(cpOther(p))} dit si c'est juste.</p>`,
    foot: `<div class="row2">${btn("Raté", "knowAns", { arg: "0", kind: "ghost", icon: "x" })}${btn("Bonne réponse", "knowAns", { arg: "1", icon: "check" })}</div><button class="textbtn" data-act="knowSkip">${ic("skip", 18)} Autre question</button>`
  });
}
function future() {
  const [a, b] = G.couple, q = `<div class="card"><span class="card-label">${ic("telescope", 16)} Notre futur</span><div class="txt">${esc(G.card)}</div></div>`;
  if (G.i >= G.n) return cpResult("Vision commune", pct(G.agree, G.n), "");
  if (G.step === "a" || G.step === "b") {
    const p = G.step === "a" ? a : b;
    return screen({
      title: cpTitle(), color: cpColor(), body: `
      <div class="meta-row">${cpProgress()}</div>
      ${cpHead(p, "Écrit en secret")}${q}
      <label class="field"><span>Ta réponse, ${esc(p)}</span><textarea id="txtIn" rows="3" maxlength="200" placeholder="Écris ce que tu imagines">${esc(G.input)}</textarea></label>
      <p class="hint">${esc(cpOther(p))} ne regarde pas l'écran.</p>`,
      foot: btn(G.step === "a" ? `Valider et passer à ${esc(b)}` : "Valider et révéler", "futureSave", { icon: "check" }) + (G.step === "a" ? `<button class="textbtn" data-act="futureOral">Répondre à voix haute</button>` : "")
    });
  }
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    <div class="meta-row">${cpProgress()}</div>${q}
    ${G.step === "oral" ? `<p class="lead center">À trois, répondez en même temps.</p>` : `<div class="answers">${G.couple.map(n => `<div class="answer-b">${cpHead(n, "Sa réponse")}<p>${esc(G.ans[n]) || "<small>Pas de réponse</small>"}</p></div>`).join("")}</div>`}`,
    foot: `<div class="row2">${btn("À discuter", "futureJudge", { arg: "0", kind: "ghost", icon: "quote" })}${btn("Même vision", "futureJudge", { arg: "1", icon: "heart" })}</div>`
  });
}
const waveChoices = (act) => {
  const [x, y] = G.card;
  return `<div class="wyr"><button class="wyr-choice a" data-act="${act}" data-arg="A"><span class="wyr-tag">A</span><p>${esc(x)}</p></button><span class="wyr-or">ou</span><button class="wyr-choice b" data-act="${act}" data-arg="B"><span class="wyr-tag">B</span><p>${esc(y)}</p></button></div>`;
};
function wave() {
  if (G.gate) return gateScreen(cpTitle(), cpColor(), "cpAdult", "cpGateNo");
  const [a, b] = G.couple;
  if (G.i >= G.n) return cpResult("Même longueur d'onde", pct(G.agree, G.n), "");
  if (G.step === "a" || G.step === "b") {
    const p = G.step === "a" ? a : b;
    return screen({
      title: cpTitle(), color: cpColor(), body: `
      ${G.step === "a" ? segOf(WYR_LEVELS, G.level, "cpLevel") : ""}
      <div class="meta-row">${cpProgress()}<span class="kicker">${G.agree} accord${G.agree > 1 ? "s" : ""}</span></div>
      ${cpHead(p, "Choisit en secret")}
      ${waveChoices("wavePick")}
      <p class="hint center">${esc(cpOther(p))} ne regarde pas l'écran.</p>`,
      foot: G.step === "a" ? `<button class="textbtn" data-act="waveSkip">${ic("skip", 18)} Autre dilemme</button>` : ""
    });
  }
  const same = G.picks[a] === G.picks[b];
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    <div class="meta-row">${cpProgress()}</div>
    <div class="hero">${ic(same ? "heart" : "split", 44)}<h2 class="big">${same ? "Même choix" : "Choix différents"}</h2></div>
    <div class="wyr-result">${["A", "B"].map((k, i) => `<div class="wyr-side ${k.toLowerCase()}"><span class="wyr-tag">${k}</span><p>${esc(G.card[i])}</p><div class="team-members">${G.couple.filter(n => G.picks[n] === k).map(n => `<span class="mini">${av(n, "xs")}${esc(n)}</span>`).join("") || "<small>Personne</small>"}</div></div>`).join("")}</div>`,
    foot: btn(G.i + 1 >= G.n ? "Voir le résultat" : "Dilemme suivant", "waveNext", { icon: "play" })
  });
}
function who2() {
  if (G.gate) return gateScreen(cpTitle(), cpColor(), "cpAdult", "cpGateNo");
  if (G.done) {
    const [a, b] = G.couple;
    return cpResult("Réponses communes", pct(G.agree, G.total), `<ul class="list">${G.couple.map(n => `<li class="row-item">${av(n, "s")}<span class="grow"><b>${esc(n)}</b><small>Désigné${fe(n, "e", "")} d'un commun accord</small></span><b class="num">${G.tally[n]} fois</b></li>`).join("")}</ul>
    <p class="hint center">${G.total} cartes jouées, ${G.total - G.agree} désaccord${G.total - G.agree > 1 ? "s" : ""}.</p>`);
  }
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    ${segOf(WHO2_LEVELS, G.level, "cpLevel")}
    <div class="card"><span class="card-label">${ic("heartHands", 16)} Qui de nous deux…</span><div class="txt">…${esc(G.card)} ?</div></div>
    <span class="label">À trois, chacun pointe la bonne personne. Résultat ?</span>
    <div class="pickgrid two">${G.couple.map(n => `<button class="pickav" data-act="who2Ans" data-arg="${esc(n)}">${av(n, "m")}<span>Tous les deux : ${esc(n)}</span></button>`).join("")}</div>`,
    foot: btn("Pas d'accord", "who2Ans", { arg: "", kind: "ghost", icon: "split" }) + `<button class="textbtn" data-act="cpEnd">Terminer et voir le bilan</button>`
  });
}
function dare2() {
  if (G.gate) return gateScreen(cpTitle(), cpColor(), "cpAdult", "cpGateNo");
  if (G.done) return screen({
    title: cpTitle(), color: cpColor(), left: null, body: `
    <div class="hero"><div class="pair-av">${av(G.couple[0], "l")}${ic("heart", 28)}${av(G.couple[1], "l")}</div><span class="kicker">Bilan</span><h2 class="big">${plural(G.ok[G.couple[0]] + G.ok[G.couple[1]], "défi")} relevé${G.ok[G.couple[0]] + G.ok[G.couple[1]] > 1 ? "s" : ""}</h2></div>
    <ul class="list">${G.couple.map(n => `<li class="row-item">${av(n, "s")}<span class="grow">${esc(n)}</span><b class="num">${G.ok[n]}</b></li>`).join("")}</ul>`,
    foot: btn("Continuer les défis", "cpResume", { icon: "play" }) + `<button class="textbtn" data-act="home">Retour aux jeux</button>`
  });
  const p = G.couple[G.i % 2];
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    ${segOf(DARE2_LEVELS, G.level, "cpLevel")}
    ${cpHead(p, "Défi pour")}
    <div class="card"><span class="card-label">${ic("gift", 16)} Défi, niveau ${DARE2_LEVELS.find(l => l[0] === G.level)[1]}</span><div class="txt">${G.text}</div></div>`,
    foot: `<div class="row2">${btn("Passer", "dareNext", { arg: "0", kind: "ghost", icon: "skip" })}${btn("Défi relevé", "dareNext", { arg: "1", icon: "check" })}</div><button class="textbtn" data-act="cpEnd">Terminer et voir le bilan</button>`
  });
}
function talk() {
  const p = G.couple[G.i % 2];
  return screen({
    title: cpTitle(), color: cpColor(), body: `
    ${segOf(TALK_LEVELS, G.level, "cpLevel")}
    <div class="card"><span class="card-label">${ic("chatHeart", 16)} ${TALK_LEVELS.find(l => l[0] === G.level)[1]}</span><div class="txt">${esc(G.card)}</div></div>
    <p class="hint center">${esc(p)} répond en premier, puis ${esc(cpOther(p))}. Prenez votre temps.</p>`,
    foot: btn("Question suivante", "talkNext", { icon: "play" }) + `<button class="textbtn" data-act="home">Terminer</button>`
  });
}

/* ---------- Classement (écran ouvert depuis un jeu) ---------- */
function boardScreen() { return screen({ title: "Classement", left: "back", right: null, body: boardBody() }); }

/* ---------- Actions ---------- */
const A = {
  tab(t) { tab = t; go(root); },
  home() { stopTimer(); try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} G = null; tab = "games"; go(root); },
  askQuit() { confirmSheet({ title: "Quitter la partie ?", text: "Les points déjà gagnés restent au classement.", ok: "Quitter", act: "home", danger: true }); },
  closeSheet() { sheet = null; draw(); },
  dupBack() { sheet = sheet.back; draw(); const i = document.getElementById("pname"); if (i) { i.focus(); i.select(); } },
  gagePick(i) { sheet.chosen = +i === 2 ? "group" : sheet.opts[+i]; draw(); },
  /* Un gage chacun : un gage individuel tiré pour chaque personne */
  gageEach() { const d = gageDeck(sheet.spicy); sheet.each = sheet.who.map(n => ({ n, g: d.draw(), done: null })); draw(); },
  gageOne(arg) {
    const [i, ok] = arg.split("|"), e = sheet.each[+i];
    if (!e || e.done) return;
    e.done = +ok ? "done" : "ref";
    const st = gstats[e.n] = gstats[e.n] || { done: 0, ref: 0 };
    if (+ok) st.done++; else { st.ref++; addPts(e.n, -GAGE_PENALTY); }
    store.set("gagestats", gstats);
    const msg = +ok ? `Gage fait par ${e.n}` : `Gage refusé : −${GAGE_PENALTY} pts pour ${e.n}`;
    if (sheet.each.every(x => x.done)) { sheet.done = "each"; const then = sheet.then; sheet = null; if (then) A[then](); else draw(); return toast(msg); }
    draw(); toast(msg);
  },
  gageWho(n) { sheet.pick = toggleIn(sheet.pick, n); draw(); },
  gageDone() { gageResolve(true); },
  gageRefuse() { gageResolve(false); },
  install() {
    if (installEvt) { const e = installEvt; installEvt = null; e.prompt(); e.userChoice.finally(() => draw()); return; }
    sheet = { type: "install" }; draw();
  },
  hideInstall() { installHidden = true; store.set("installHidden", true); draw(); },
  board() { prevView = view; go(boardScreen); },
  boardBack() { go(prevView || root); },
  askReset() { confirmSheet({ title: "Remettre à zéro ?", text: "Tous les points et les gages de la soirée seront effacés.", ok: "Tout effacer", act: "resetScores", danger: true }); },
  resetScores() { scores = {}; gstats = {}; store.set("scores", scores); store.set("gagestats", gstats); sheet = null; draw(); },
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
    A.openGame(id);
    if (G && G.kind === id) store.set("recent", [id, ...store.get("recent", []).filter(x => x !== id)].slice(0, 6));
    const seen = store.get("rulesSeen", []);
    if (G && G.kind === id && RULES[id] && !seen.includes(id)) { store.set("rulesSeen", [...seen, id]); sheet = { type: "rules", id }; draw(); }
  },
  rules() { if (G && RULES[G.kind]) { sheet = { type: "rules", id: G.kind }; draw(); } },
  update() { if (!applyUpdate || updating) return; updating = true; draw(); applyUpdate(); },
  homeCat(k) {
    const top = $app.querySelector(".cats-top"), y = top ? top.getBoundingClientRect().top + window.scrollY : 0, stuck = top && window.scrollY > y;
    homeCat = k; store.set("homeCat", k); draw();
    if (stuck) window.scrollTo(0, y);
  },
  openGame(id) {
    stopTimer();
    const g = GAMES.find(x => x.id === id);
    if (players.length < g.min) { tab = "players"; go(root); toast(`${g.name} se joue à ${g.min} joueurs minimum. Ajoute les joueurs.`); return; }
    if (id === "mime" || id === "taboo") { G = { kind: id, nTeams: 2, dur: 60, round: 1, diff: store.get("mimeDiff", "easy"), target: store.get("target-" + id, 30) }; makeTeams(); return go(teamSetup); }
    if (id === "av") { G = { kind: "av", order: shuffle(players), i: 0, level: store.get("avlvl", "fun"), decks: {} }; if (G.level === "x18" && !adultOk) G.level = "hot"; return go(avTurn); }
    if (id === "tvm") { G = { kind: "tvm", order: shuffle(players), i: 0, scores: Object.fromEntries(players.map(p => [p, 0])), step: "prep", td: pdeck("tvm", TVM_THEMES), sel: [] }; G.theme = G.td.draw(); return go(tvm); }
    if (id === "uc") { const n = players.length; G = { kind: "uc", nU: n >= 13 ? 3 : n >= 7 ? 2 : 1, nW: n >= 11 ? 2 : n >= 5 ? 1 : 0, ucScores: {} }; return go(ucSetup); }
    if (id === "tu") { G = { kind: "tu", nTeams: 2, dur: 45, nWords: 40, round: 0 }; makeTeams(); return go(teamSetup); }
    if (id === "quiz") { G = { kind: "quiz", nTeams: 2, nQ: 10, round: 1, qtheme: store.get("quizTheme", "all"), target: store.get("target-quiz", 0) }; makeTeams(); return go(teamSetup); }
    if (id === "bomb") { G = { kind: "bomb", d: pdeck("bomb", BOMB_THEMES), gd: pdeck("gages", GAGES), state: "idle", loser: null }; G.theme = G.d.draw(); return go(bomb); }
    if (id === "wyr") { let l = store.get("wyrlvl", "normal"); if (l === "x18" && !adultOk) l = "hot"; G = { kind: "wyr", level: l, decks: {} }; wyrDraw(); return go(wyr); }
    if (id === "nhie") { let l = store.get("nhielvl", "fun"); if (l === "x18" && !adultOk) l = "hot"; G = { kind: "nhie", level: l, decks: {} }; nhieDraw(); return go(nhie); }
    if (id === "lg") { const n = players.length; G = { kind: "lg", nW: n >= 16 ? 4 : n >= 12 ? 3 : n >= 7 ? 2 : 1 }; return go(lgSetup); }
    if (id === "mys") { G = { kind: "mys", d: pdeck("mys", MYS), card: null, rule: null }; return go(mys); }
    if (id === "spy") { G = { kind: "spy", nS: 1, mins: 6 }; return go(spySetup); }
    if (id === "most") { let l = store.get("mostlvl", "soft"); if (l === "x18" && !adultOk) l = "hot"; G = { kind: "most", level: l, mode: store.get("mostmode", "secret"), decks: {} }; mostDraw(); return go(most); }
    if (id === "num") { G = { kind: "num", nTeams: 2, nQ: 10, round: 1, target: store.get("target-num", 0) }; makeTeams(); return go(teamSetup); }
    if (id === "dico") { G = { kind: "dico", d: pdeck("dico", DICO), scores: Object.fromEntries(players.map(p => [p, 0])) }; dicoNewWord(); return go(dico); }
    if (id === "chain") { G = { kind: "chain", d: pdeck("chain", CHAIN_WORDS), sec: store.get("chainsec", 5), order: shuffle(players), cur: 0, step: "start" }; G.word = G.d.draw(); return go(chain); }
    if (g.cat === "couple") {
      let c = store.get("couple", null); if (!coupleOk(c)) c = players.length === 2 ? [...players] : [];
      let l = store.get("cplvl-" + id, id === "talk" ? "light" : id === "wave" ? "normal" : "tendre"); if (l === "x18" && !adultOk) l = "hot";
      G = { kind: id, couple: c, n: cpCount[id] ? cpCount[id][1] : 0, level: l, decks: {} }; return go(coupleSetup);
    }
  },
  /* équipes */
  nTeams(n) { G.nTeams = +n; makeTeams(); draw(); },
  reTeams() { makeTeams(); draw(); },
  dur(n) { G.dur = +n; draw(); },
  diff(k) { G.diff = k; store.set("mimeDiff", k); draw(); },
  teamsGo() { if (G.kind === "tu") return A.tuGo(); if (G.kind === "quiz") return A.quizGo(); if (G.kind === "num") return A.numGo(); G.cur = 0; G.round = 1; G.deck = G.kind === "mime" ? pdeck("mime", MIME_SETS[G.diff], "mime-" + G.diff) : pdeck("taboo", TABOO); go(turnIntro); },
  turnStart() { G.log = []; G.card = G.deck.draw(); go(turnPlay); runTimer(G.dur, A.turnStop); },
  mark(v) { G.log.push({ c: G.card, v: +v }); G.card = G.deck.draw(); beep(+v === 1 ? 880 : +v === -1 ? 220 : 440, .08); draw(); },
  turnStop() { stopTimer(); if (G.card) { G.log.push({ c: G.card, v: 0, last: true }); G.card = null; } go(turnEnd); },
  toggle(i) { const l = G.log[+i]; l.v = G.kind === "mime" ? (l.v === 1 ? 0 : 1) : (l.v === 1 ? 0 : l.v === 0 ? -1 : 1); draw(); },
  turnValidate() {
    const t = G.teams[G.cur], pts = G.log.reduce((s, l) => s + l.v, 0);
    t.score += pts; t.members.forEach(m => addPts(m, pts)); t.k++;
    if (targetHit()) return A.teamEnd();
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
    G.gage = null;
    if (t === "r") t = Math.random() < .5 ? "v" : "a";
    const key = t + G.level; G.decks[key] = G.decks[key] || pdeck("av-" + key, AV[G.level][t]);
    const cur = avCur(), o = others(cur);
    G.type = t; G.text = fill(G.decks[key].draw(), { cur, joueur: pick(o.length ? o : players), opp: oppOf(cur) });
    go(avCard);
  },
  avJoker() { openGage(avCur(), (G.level === "hot" || G.level === "x18") && G.level, "avAfterGage"); },
  avAfterGage() { G.i++; go(avTurn); },
  avNext() {
    const p = avCur(), pts = G.type === "g" ? 0 : AV_PTS[G.type] + AV_BONUS[G.level];
    addPts(p, pts); G.i++; go(avTurn); if (pts) toast(`${ptsTxt(pts)} pour ${p}`);
  },
  avSkip() { G.i++; draw(); },
  /* 2 vérités 1 mensonge */
  tvmTheme() { G.theme = G.td.draw(); draw(); },
  tvmReady() { G.step = "talk"; go(tvm); },
  tvmDebate() { runTimer(60, draw); draw(); },
  tvmVote() { stopTimer(); G.step = "vote"; G.sel = []; go(tvm); },
  tvmSel(n) { G.sel = G.sel.includes(n) ? G.sel.filter(x => x !== n) : [...G.sel, n]; draw(); },
  tvmValidate() {
    const p = tvmCur();
    if (G.sel.length) G.sel.forEach(n => { G.scores[n]++; addPts(n, 1); }); else { G.scores[p] += 2; addPts(p, 2); }
    G.i++; G.step = "prep"; G.theme = G.td.draw(); go(tvm);
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
  ucWhiteTry() {
    const n = w => String(w).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").replace(/s$/, "");
    if (!n(G.input)) return toast("Tape un mot.");
    if (n(G.input) === n(G.pair[0])) { G.queue = []; return ucFinish("white"); }
    Object.assign(G.queue[0], { wDone: true, wFail: true }); draw();
  },
  ucRevenge(i) { G.queue[0].revDone = true; G.queue.push({ i: +i, cause: "revenge" }); draw(); },
  ucNext() { G.queue.shift(); ucProcess(); },
  /* mystère */
  mysDraw() {
    G.gage = null;
    stopTimer();
    const c = G.d.draw(), p1 = pick(players);
    const o = others(p1), p2 = c.opp ? oppOf(p1) : pick(o.length ? o : players);
    Object.assign(G, { card: c, p1, p2, scored: false, loser: null });
    G.text = fill(c.x, { cur: p1, p1, p2 });
    if (c.t === "regle") G.rule = G.text;
    go(mys); beep(520, .06);
  },
  mysWin(arg) {
    stopTimer();
    const k = arg.lastIndexOf("|"), n = arg.slice(0, k), v = +arg.slice(k + 1);
    G.scored = true;
    if (n && v) { addPts(n, v); }
    if (G.card.t === "defi" && !v) { G.loser = G.p1; return openGage(G.loser, false, "mysDraw"); }
    if (G.card.t === "duel" && n) { G.loser = n === G.p1 ? G.p2 : G.p1; return openGage(G.loser, false, "mysDraw"); }
    draw(); if (n && v) toast(`${ptsTxt(v)} pour ${n}`);
  },
  mysLossGage() { openGage(G.loser, false, "mysDraw"); },
  mysGage() { openGage(G.card.t === "defi" || G.card.t === "devine" ? G.p1 : null, false, "mysDraw"); },
  mysTimer() { runTimer(G.card.s, draw); draw(); },
  stopClock() { stopTimer(); draw(); }
};

/* ---------- Actions des nouveaux jeux ---------- */
function quizDrawQ() { G.q = G.qd.draw(); G.opts = shuffle([G.q.a, ...G.q.w]); G.ans = null; }
function wyrDraw() { const k = G.level; G.decks[k] = G.decks[k] || pdeck("wyr-" + k, WYR[k]); G.card = G.decks[k].draw(); G.votes = {}; G.step = "ask"; }
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
  target(n) { G.target = +n; store.set("target-" + G.kind, G.target); draw(); },
  quizTheme(t) { G.qtheme = t; store.set("quizTheme", t); draw(); },
  quizGo() {
    const all = G.qtheme === "all" || !QUIZ_THEMES.includes(G.qtheme);
    Object.assign(G, { cur: 0, asked: 0, total: G.nQ * G.teams.length, qd: all ? pdeck("quiz", QUIZ) : pdeck("quiz", QUIZ.filter(q => q.cat === G.qtheme), "quiz-" + G.qtheme) });
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
    if (lastQ()) return A.teamEnd();
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
        explosion(); try { navigator.vibrate && navigator.vibrate([600, 80, 300, 80, 200]); } catch (e) {}
        return draw();
      }
      beep(left < 5000 ? 1046 : left < 15000 ? 880 : 740, .04);
      bombT = setTimeout(tick, left < 5000 ? 220 : left < 15000 ? 450 : 800);
    };
    draw(); tick();
  },
  bombLoser(n) { G.loser = n; G.gage = null; others(n).forEach(o => addPts(o, 1)); openGage(n, false, "bombNew"); },
  bombGage() { openGage(G.loser, false, "bombNew"); },
  bombNew() { G.state = "idle"; G.loser = null; G.theme = G.d.draw(); draw(); },
  /* Tu préfères */
  wyrLevel(k) { if (k === "x18" && !adultOk) { G.gate = true; return draw(); } G.level = k; store.set("wyrlvl", k); wyrDraw(); draw(); },
  wyrAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("wyrlvl", "x18"); wyrDraw(); draw(); },
  wyrGateNo() { G.gate = false; draw(); },
  wyrVote(arg) { const k = arg.lastIndexOf("|"), n = arg.slice(0, k), v = arg.slice(k + 1); G.votes[n] = G.votes[n] === v ? undefined : v; draw(); },
  wyrValidate() {
    G.gage = null;
    const a = players.filter(n => G.votes[n] === "A"), b = players.filter(n => G.votes[n] === "B");
    if (!a.length && !b.length) return;
    if (a.length !== b.length && a.length && b.length) (a.length > b.length ? a : b).forEach(n => addPts(n, 1));
    G.step = "result"; go(wyr);
  },

  wyrNext() { wyrDraw(); go(wyr); },
  wyrGage() { const a = players.filter(n => G.votes[n] === "A"), b = players.filter(n => G.votes[n] === "B"); openGage(a.length < b.length ? a : b, G.level !== "normal" && G.level, "wyrNext"); },
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

/* ---------- Actions des jeux ajoutés : lieu secret, vote, estimations, dictionnaire, chaîne de mots, couple ---------- */
function mostDraw() { const k = G.level; G.decks[k] = G.decks[k] || pdeck("most-" + k, MOST[k]); G.card = G.decks[k].draw(); G.sel = []; G.votes = {}; G.step = "ask"; }
function mostResult(tally) {
  G.gage = null;
  const best = tally.length ? tally[0][1] : 0;
  G.tally = tally; G.tops = tally.filter(t => t[1] === best).map(t => t[0]);
  G.winners = Object.keys(G.votes).filter(v => G.tops.includes(G.votes[v]));
  G.winners.forEach(n => addPts(n, 1));
  G.step = "result"; go(most);
}
function numDraw() { G.q = G.qd.draw(); G.est = {}; G.ti = 0; G.input = ""; }
const parseNum = s => { const v = parseFloat(String(s).replace(/[\s  ]/g, "").replace(",", ".")); return isFinite(v) ? v : null; };
function dicoNewWord() { G.word = G.d.draw(); G.step = "word"; }
function cpDraw() {
  const k = G.kind, src = { know: KNOW, future: FUTURE, who2: WHO2[G.level], dare2: DARE2[G.level], talk: TALK[G.level], wave: WYR[G.level] }[k];
  const key = k + (["who2", "dare2", "talk", "wave"].includes(k) ? "-" + G.level : "");
  G.decks[key] = G.decks[key] || (k === "wave" ? pdeck("wyr-" + G.level, src, "cp-" + key) : pdeck("cp-" + key, src));
  G.card = G.decks[key].draw();
  const p = G.couple[G.i % 2];
  if (k === "know" || k === "dare2") G.text = fill(G.card, { cur: p, p1: p, p2: cpOther(p) });
  G.step = "a"; G.input = ""; G.ans = {}; G.picks = {};
}
const cpView = () => ({ know, future, who2, wave, dare2, talk })[G.kind];

Object.assign(A, {
  /* Le lieu secret */
  spyN(n) { G.nS = Math.min(+n, spyMax()); draw(); },
  spyMins(n) { G.mins = +n; draw(); },
  spySettings() { stopTimer(); go(spySetup); },
  spyGo() {
    stopTimer();
    G.deck = G.deck || pdeck("spy", SPY_PLACES);
    G.place = G.deck.draw();
    const sh = shuffle(players), spies = new Set(sh.slice(0, Math.min(G.nS, spyMax())));
    G.ps = shuffle(players).map(name => ({ name, spy: spies.has(name) }));
    G.first = pick(players);
    Object.assign(G, { i: 0, show: false, peek: null, pick: null, step: "play", caught: null, self: false, win: null, pts: {} });
    go(spyDeal);
  },
  spyShow() { G.show = true; draw(); },
  spyHide() { G.show = false; G.i++; if (G.i >= G.ps.length) go(spyPlay); else go(spyDeal); },
  spyClock() { runTimer(G.mins * 60, () => { draw(); toast("Temps écoulé : passez au vote"); }); draw(); },
  spyPeekList() { G.peek = "list"; draw(); },
  spyPeek(i) { G.peek = +i; draw(); },
  spyPeekDone() { G.peek = null; draw(); },
  spyVote() { G.step = "vote"; G.pick = null; go(spyVoteScreen); },
  /* Se dévoiler demande une confirmation : un toucher par erreur ne doit pas révéler l'espion */
  spyUnmask() {
    if (G.nS > 1) { G.step = "unmask"; return go(spyVoteScreen); }
    confirmSheet({ title: "L'espion se dévoile ?", text: "Seul l'espion touche ce bouton. Il révèle son rôle et tente de deviner le lieu : s'il trouve, il gagne.", ok: "Je suis l'espion, je me dévoile", act: "spySelf", arg: G.ps.findIndex(p => p.spy) });
  },
  spySelfAsk(i) { const p = G.ps[+i]; confirmSheet({ title: `${esc(p.name)} se dévoile ?`, text: `${esc(p.name)} annonce être ${fe(p.name, "une espionne", "un espion")} et tente de deviner le lieu. Seule une personne espionne peut se dévoiler.`, ok: "Confirmer", act: "spySelf", arg: +i }); },
  spyBack() { G.step = "play"; go(spyPlay); },
  spyPick(i) { G.pick = G.pick === +i ? null : +i; draw(); },
  spyOpts() { G.opts = shuffle([G.place, ...shuffle(SPY_PLACES.filter(x => x !== G.place)).slice(0, 11)]); },
  spySelf(i) {
    if (!G.ps[+i].spy) { sheet = null; draw(); return toast(`${G.ps[+i].name} n'est pas ${fe(G.ps[+i].name, "espionne", "espion")}`); }
    stopTimer(); G.caught = +i; G.self = true; A.spyOpts(); go(spyGuess);
  },
  spyAccuse() {
    if (G.pick == null) return;
    stopTimer();
    const p = G.ps[G.pick];
    if (!p.spy) return A.spyFinish("spies", `${p.name} n'était pas ${fe(p.name, "l'espionne", "l'espion")}. Le groupe s'est trompé de cible.`);
    G.caught = G.pick; G.self = false; A.spyOpts(); go(spyGuess);
  },
  spyTry(i) {
    const p = G.ps[G.caught], ok = G.opts[+i] === G.place;
    A.spyFinish(ok ? "spies" : "locals", ok ? `${p.name} a deviné le lieu.` : `${p.name} a répondu « ${G.opts[+i]} ». Raté.`);
  },
  spyFinish(w, why) {
    G.win = w; G.why = why; G.pts = {};
    G.ps.forEach(p => { const v = w === "spies" ? (p.spy ? 4 : 0) : (p.spy ? 0 : 2); if (v) { G.pts[p.name] = v; addPts(p.name, v); } });
    go(spyEnd);
  },
  /* Le plus susceptible de */
  mostLevel(k) { if (k === "x18" && !adultOk) { G.gate = true; return draw(); } G.level = k; store.set("mostlvl", k); mostDraw(); draw(); },
  mostAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("mostlvl", "x18"); mostDraw(); draw(); },
  mostGateNo() { G.gate = false; draw(); },
  mostMode(m) { G.mode = m; store.set("mostmode", m); draw(); },
  mostSel(n) { G.sel = toggleIn(G.sel, n); draw(); },
  mostHand() { if (!G.sel.length) return; G.gage = null; G.votes = {}; G.tally = []; G.tops = G.sel; G.winners = []; G.step = "result"; go(most); },
  mostVoteStart() { G.vi = 0; G.votes = {}; G.step = "vote"; go(most); },
  mostCast(n) {
    G.votes[players[G.vi]] = n; G.vi++;
    if (G.vi < players.length) return go(most);
    const c = {}; Object.values(G.votes).forEach(v => { c[v] = (c[v] || 0) + 1; });
    mostResult(Object.entries(c).sort((a, b) => b[1] - a[1]));
  },
  mostUncast() { G.vi--; delete G.votes[players[G.vi]]; draw(); },
  mostGage() { openGage(G.tops, G.level !== "soft" && G.level, "mostNext"); },
  mostNext() { mostDraw(); go(most); },
  /* Ordre de grandeur */
  numGo() { Object.assign(G, { cur: 0, asked: 0, total: G.nQ, qd: pdeck("num", NUM_Q) }); numDraw(); go(numQ); },
  numSet() {
    const v = parseNum(G.input);
    if (v == null) { toast("Écris un nombre"); return; }
    G.est[G.ti] = v; G.ti++; G.input = "";
    if (G.ti >= G.teams.length) {
      const d = G.teams.map((t, i) => ({ i, v: G.est[i], d: Math.abs(G.est[i] - G.q.a) })).sort((x, y) => x.d - y.d);
      const best = d[0].d; G.gain = best === 0 ? 2 : 1;
      d.forEach(r => { r.win = r.d === best; if (r.win) { const t = G.teams[r.i]; t.score += G.gain; t.members.forEach(m => addPts(m, G.gain)); } });
      G.rank = d; beep(880, .12);
    }
    go(numQ);
  },
  numNext() { G.asked++; if (lastQ()) return A.teamEnd(); numDraw(); go(numQ); },
  /* Le faux dictionnaire */
  dicoOther() { dicoNewWord(); draw(); },
  dicoWrite() { Object.assign(G, { step: "write", wi: 0, show: false, input: "", fakes: {} }); go(dico); },
  dicoShow() { G.show = true; G.input = ""; draw(); },
  dicoSave() {
    const t = G.input.trim();
    if (t.length < 3) { toast("Écris une définition"); return; }
    G.fakes[players[G.wi]] = t.charAt(0).toUpperCase() + t.slice(1);
    A.dicoAdvance();
  },
  dicoSkip() { A.dicoAdvance(); },
  dicoAdvance() {
    G.wi++; G.show = false; G.input = "";
    if (G.wi < players.length) return go(dico);
    G.defs = shuffle([{ who: null, d: G.word.d }, ...Object.entries(G.fakes).map(([who, d]) => ({ who, d }))]);
    G.step = "read"; go(dico);
  },
  dicoVote() { G.step = "vote"; G.vi = 0; G.votes = {}; go(dico); },
  dicoCast(i) {
    G.votes[players[G.vi]] = +i; G.vi++;
    if (G.vi < players.length) return go(dico);
    players.forEach(v => {
      const d = G.defs[G.votes[v]];
      if (!d) return;
      if (!d.who) { G.scores[v] = (G.scores[v] || 0) + 2; addPts(v, 2); }
      else if (d.who !== v) { G.scores[d.who] = (G.scores[d.who] || 0) + 1; addPts(d.who, 1); }
    });
    G.step = "result"; go(dico);
  },
  dicoUncast() { G.vi--; delete G.votes[players[G.vi]]; draw(); },
  dicoNext() { dicoNewWord(); go(dico); },
  /* Mot pour mot */
  chainSec(s) { G.sec = +s; store.set("chainsec", G.sec); draw(); },
  chainWord() { G.word = G.d.draw(); draw(); },
  chainStart() { G.step = "play"; G.n = 0; go(chain); runTimer(G.sec, A.chainLose); },
  chainNext() { G.n++; G.cur++; beep(660, .05); go(chain); runTimer(G.sec, A.chainLose); },
  chainPause() { stopTimer(); G.step = "start"; go(chain); },
  chainLose() {
    stopTimer(); G.loser = chainCur(); G.step = "lost"; G.gage = null;
    others(G.loser).forEach(o => addPts(o, 1));
    explosion(); vib(); go(chain);
  },
  chainGage() { openGage(G.loser, false, "chainNew"); },
  chainNew() { G.word = G.d.draw(); G.order = shuffle(players); G.cur = 0; G.step = "start"; go(chain); },
  /* Couple : réglages communs */
  cpPick(n) {
    if (G.couple.includes(n)) G.couple = G.couple.filter(x => x !== n);
    else G.couple = G.couple.length < 2 ? [...G.couple, n] : [G.couple[0], n];
    draw();
  },
  cpN(n) { G.n = +n; draw(); },
  cpSettings() { go(coupleSetup); },
  cpGo() {
    if (!coupleOk(G.couple)) return;
    store.set("couple", G.couple);
    const [a, b] = G.couple;
    Object.assign(G, { i: 0, agree: 0, total: 0, done: false, gate: false, decks: G.decks || {}, ok: { [a]: 0, [b]: 0 }, asked: { [a]: 0, [b]: 0 }, tally: { [a]: 0, [b]: 0 } });
    cpDraw(); go(cpView());
  },
  cpLevel(k) {
    if (k === "x18" && !adultOk) { G.gate = true; G.pend = k; return draw(); }
    G.level = k; store.set("cplvl-" + G.kind, k); cpDraw(); draw();
  },
  cpAdult() { adultOk = true; G.gate = false; G.level = "x18"; store.set("cplvl-" + G.kind, "x18"); cpDraw(); draw(); },
  cpGateNo() { G.gate = false; draw(); },
  cpEnd() { G.done = true; draw(); },
  cpResume() { G.done = false; cpDraw(); draw(); },
  /* Tu me connais ? */
  knowAns(v) {
    const p = G.couple[G.i % 2];
    G.asked[p]++; if (+v) { G.ok[p]++; addPts(p, 1); beep(880, .1); }
    G.i++; if (G.i < G.n) cpDraw(); go(know);
  },
  knowSkip() { cpDraw(); draw(); },
  /* Notre futur */
  futureSave() {
    const [a, b] = G.couple;
    G.ans[G.step === "a" ? a : b] = G.input.trim(); G.input = "";
    G.step = G.step === "a" ? "b" : "reveal"; go(future);
  },
  futureOral() { G.step = "oral"; go(future); },
  futureJudge(v) {
    if (+v) { G.agree++; G.couple.forEach(n => addPts(n, 1)); }
    G.i++; if (G.i < G.n) cpDraw(); go(future);
  },
  /* Même longueur d'onde */
  wavePick(k) {
    const [a, b] = G.couple;
    if (G.step === "a") { G.picks[a] = k; G.step = "b"; return go(wave); }
    G.picks[b] = k; G.step = "reveal";
    if (G.picks[a] === G.picks[b]) { G.agree++; G.couple.forEach(n => addPts(n, 1)); beep(880, .12); }
    go(wave);
  },
  waveSkip() { cpDraw(); draw(); },
  waveNext() { G.i++; if (G.i < G.n) cpDraw(); go(wave); },
  /* Qui de nous deux */
  who2Ans(n) {
    G.total++;
    if (n) { G.agree++; G.tally[n]++; toast(`D'accord : ${n}`); } else toast("Pas d'accord");
    cpDraw(); draw();
  },
  /* Défis à deux */
  dareNext(v) {
    const p = G.couple[G.i % 2];
    if (+v) { G.ok[p]++; addPts(p, 1); }
    G.i++; cpDraw(); go(dare2);
  },
  /* Cœur à cœur */
  talkNext() { G.i++; cpDraw(); go(talk); }
});

document.addEventListener("click", e => {
  keepAwake(); unlockAudio();
  const t = e.target.closest("[data-act]");
  if (!t || t.disabled) return;
  const fn = A[t.dataset.act];
  if (!fn) return;
  e.preventDefault();
  fn(t.dataset.arg);
});
document.addEventListener("input", e => {
  if (e.target.id === "pname" && sheet && sheet.draft) sheet.draft.name = e.target.value;
  if ((e.target.id === "numIn" || e.target.id === "txtIn") && G) G.input = e.target.value;
});
document.addEventListener("submit", e => {
  if (e.target.id !== "pform") return;
  e.preventDefault();
  const d = sheet.draft, name = d.name.trim();
  if (!name) { sheet.err = "Écris un prénom."; return draw(); }
  const dup = roster.find(p => p.id !== sheet.id && p.name.toLowerCase() === name.toLowerCase());
  if (dup) { sheet = { type: "dup", name: dup.name, back: { ...sheet, err: "" } }; return draw(); }
  const p = sheet.id && roster.find(x => x.id === sheet.id);
  if (p) {
    if (p.name !== name) {
      if (scores[p.name] != null) { scores[name] = (scores[name] || 0) + scores[p.name]; delete scores[p.name]; store.set("scores", scores); }
      if (gstats[p.name]) { const a = gstats[p.name], b = gstats[name] || { done: 0, ref: 0 }; gstats[name] = { done: a.done + b.done, ref: a.ref + b.ref }; delete gstats[p.name]; store.set("gagestats", gstats); }
      const cp = store.get("couple", null); if (Array.isArray(cp) && cp.includes(p.name)) store.set("couple", cp.map(n => n === p.name ? name : n));
      p.name = name;
    }
    p.g = d.g; p.av = d.av;
  } else roster.push({ id: uid(), name, g: d.g, av: d.av });
  saveRoster(); syncNames(); sheet = null; draw();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && sheet) { sheet = null; draw(); }
  if (e.key === "Enter" && e.target.id === "numIn") { e.preventDefault(); A.numSet(); }
  if (e.key === "Enter" && e.target.id === "txtIn" && G && G.kind === "uc") { e.preventDefault(); A.ucWhiteTry(); }
});

/* Mises à jour : la nouvelle version se télécharge en arrière-plan, puis l'accueil propose de l'installer.
   Jamais de rechargement en pleine partie. On vérifie au lancement, au retour dans l'appli et toutes les 30 minutes. */
try {
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() {
      applyUpdate = () => { store.set("justUpdated", true); updateSW(true); setTimeout(() => location.reload(), 4000); };
      if (view === root && !sheet) draw();
    },
    onRegisteredSW(url, reg) {
      if (!reg) return;
      const check = () => { if (navigator.onLine !== false && !reg.installing) reg.update().catch(() => {}); };
      setInterval(check, 30 * 60 * 1000);
      document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") check(); });
    }
  });
} catch (e) {}
go(root);
if (store.get("justUpdated", false)) { store.set("justUpdated", false); toast("Ça Joue est à jour."); }
