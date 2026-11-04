/* Exporte les 23 jeux de l'appli (nom, couleur, icône Lucide) pour le film. Lancer depuis le dossier ca-joue. */
import fs from "node:fs";
import * as L from "lucide";
const src = fs.readFileSync("src/icons.js", "utf8"), css = fs.readFileSync("src/styles.css", "utf8");
const map = Object.fromEntries([...src.matchAll(/(\w+): (\w+)/g)].map(m => [m[1], m[2]]));
const { GAMES, GAME_CATS } = await import(process.cwd() + "/src/content.js");
const col = v => { const k = v.match(/--[\w-]+/)[0]; return css.match(new RegExp(k + ":\\s*(#[0-9a-fA-F]{6})"))[1]; };
const out = GAMES.map(g => ({ id: g.id, cat: g.cat, name: g.name, color: col(g.c), icon: L[map[g.icon]] }));
fs.writeFileSync(process.argv[2], JSON.stringify({ cats: GAME_CATS, games: out }));
console.log(out.length, out.map(g => g.id + ":" + g.color + ":" + (g.icon ? "ok" : "MISSING")).join(" "));
