# Guide du kit doodle-video

Référence commune aux skills `video-lancement`, `histoire` et `clip`. Le monde est toujours dessiné en 1080×1920 (sol à y = 1380) ; l'image rendue peut être verticale, 16:9 ou 4:5, la caméra et l'écran s'adaptent.

## Fichiers d'un projet de film

| Fichier | Rôle |
|---|---|
| `cast.json` | la distribution : `{"persos": {"id": {"nom", "voix", "look": {…}}}}`, gardée d'une vidéo à l'autre |
| `lines.json` | une réplique par ligne : `id`, `who` (personnage), `text` (dit, nombres en lettres), `show` (forme affichée), `voice`/`rate` facultatifs |
| `story.json` (histoire) ou `tools/timeline.py` (lancement) | le découpage en scènes et la partition |
| `film.js` | les scènes, et rien d'autre (le socle est dans `runtime.js`) |
| `post.json` | couverture et textes de publication |
| `TREATMENT.md`, `CREDITS` | traitement et crédits du film |

## Personnages (`people.js`)

- `person(parent, look)` ou `castPerson(parent, id)` (depuis `cast.json`). Look : `skin` (`SKIN[0..5]`), `hair` (`short`, `puff`, `curly`, `long`, `braids`, `bald`), `hairColor`, `hat` (`cap`, `bucket`, `beanie`), `hatColor`, `glasses`, `beard`, `earring`, `backpack`, `jacket`, `stripe`, `shirt`, `pants`, `shoe`, `band`.
- `pose(c, {...})` à chaque image :
  - émotion `mood` : `neutre`, `joie`, `rire`, `triste`, `colere`, `surprise`, `gene`, `fier`, `peur`, `doute` ;
  - parole `mouth: mouthAt(L, t)` (formes a, o, i, m qui suivent les syllabes) ;
  - regard `look` (−6 à 6), trois-quarts `turn` (−1 à 1, vers celui à qui on parle) ;
  - bras `armsL`/`armsR` (0 le long du corps, 90 à l'horizontale, 150 levé), `elbowL`/`elbowR`, `hey` (0 à 1, bras levés) ;
  - `point: 'L'|'R'` (pointer), `hold: 'phone'|'cup'|'paper'|'pizza'|'gift'|'money'|'book'|'bottle'` et `holdSide` ;
  - corps : `sit`, `crouch` (0 à 1), `step` (marche), `lean`, `sq` (écrasement), `sweat`, `soot`, `mask`, `eyes` (`n`, `up`, `meh`, `x`, `wide`).
  - tête et corps : `tilt` (tête penchée, degrés), `nod` (hochement, px), `shrug` (épaules haussées, 0 à 1), `weight` (appui sur une jambe, −1 à 1), `glance` (regard qui saute), `finger` (index tendu sans pointer), `swing` (cheveux et boucles d'oreilles en retard, calculé par `actor`).
- Marche : `walk(t, t0, t1, xa, xb)` + `walkSteps(t0, t1)` (pas sonores), `talking(L, t)`.
- `node tools/planche.cjs cast.json` → `planche.png` : chaque personnage, ses 10 émotions et 10 poses. À montrer à l'utilisateur pour valider la distribution.

## Jeu d'acteur (`acting.js`) : jamais un personnage figé

Règle : chaque personnage visible joue avec `actor`, parle avec `act`, écoute avec `listen`, attend avec `alive`. `check.py` échoue si un personnage visible ne bouge plus du tout pendant 1,5 s et avertit s'il reste 4 s sans geste.
- `const a = actor(c, t => ({ ...pose }), { t0: R.t0, w })` dans la construction de la scène, puis `a(t)` à chaque image (à la place de `pose`). Toutes les poses sont lissées comme un ressort (principes de Disney) : petit élan opposé avant chaque geste, léger dépassement à l'arrivée, cheveux et boucles d'oreilles qui suivent avec retard (aussi sur le déplacement si la fonction renvoie `x`, `y`, `s` et que `w` est donné). Plus besoin d'adoucir les changements à la main : une pose peut changer d'un coup, `actor` en fait un mouvement.
- `act(L, t, { dx, side, calm })` : gestes tirés des mots de la réplique. Question : paumes ouvertes et tête penchée ; « toi », « tu », « te », « vous » : il montre son interlocuteur (côté `dx`) ; « non », « jamais », « rien » : il secoue la tête ; un nombre : il compte, le doigt levé ; « moi », « je », « on » en début de phrase : la main sur la poitrine ; exclamation : le bras levé ; mots appuyés (longs, avant une virgule, le dernier) : battement d'avant-bras, un côté puis l'autre ; mains un peu levées et buste vers l'interlocuteur tant qu'il parle. `calm: 1` pour un personnage posé.
- `geste(nom, t, t0, t1)` : `haussement`, `paumes`, `front` (main sur le front), `pouce`, `applaudir`, `coucou`, `compter`, `hanches`, `bras_croises`, `reflechir`, `moi`, `victoire`, `montrer` (côté en 5ᵉ argument), `non`, `oui`. `reach(côté, x, y)` / `handAt` : la main va à un point du corps (le coude se place tout seul).
- `pose()` ajoute toute seule `alive` sous les options données (personne n'est jamais figé) ; `still: true` pour une immobilité voulue (photo, arrêt sur image), que `check.py` accepte.
- `alive(t, i)` : respiration, appui d'une jambe sur l'autre, regard qui saute, clignements irréguliers, micro-hochements. `listen(t, L, dx)` : regarde le locuteur, sursaute au début, hoche la tête sur ses mots appuyés. `lookAt(x, xCible)`.
- `danse(t, style, i, énergie)` sur le tempo : `rebond`, `pas`, `vague`, `disco`, `clap`, `balance`, `robot` ; `hopDanse(t, i, h)` pour le saut ; énergie basse au couplet, 1 au refrain. `crowd(g, n, {x0, x1, y, s, seed})` → `update(t, énergie)` : une foule de passants tous différents qui dansent chacun à son rythme.
- `node tools/gestes.cjs cast.json [id]` → `gestes.mp4` et `gestes.png` : la planche animée de tous les gestes et pas de danse, joués par un personnage de la distribution.

## Lieux et accessoires (`story.js`, `engine.js`)

- Couleurs du projet : `python tools/palette.py <dépôt>` → `palette.js` : plateaux `SETS.projet`, `projet2`, `projet3` et `K.brand`, `K.brand2`, `K.brand3` aux couleurs de l'appli ou du site (violets écartés), vêtements de la foule.
- Lieux : `placeRoom` (+ `sofa`, `table`), `placeStreet`, `placePark`, `placeBoard` (+ `chalk`), `placeOffice` (+ `desk`), `placeCafe`, `placeBedroom`, `placeShop`, `placeBus` (renvoie `update(t)` : le paysage défile), `placeClub` (boîte de nuit, renvoie `update(t, énergie)` : piste, projecteurs et boule à facettes sur le tempo) + `stool`, `splitStage(g, gauche, droite)` ; plateaux colorés `setBg(g, set, 'stripes'|'dots'|'rays')` avec `SETS` (mint, navy, tang, green, night, pink, crim, sky, lime, sun, cream).
- Accessoires : `plant`, `door`, `sign`, `phone` (vrais écrans d'une appli), `gameTile` (icônes Lucide).
- Ambiances : `rain(g)` (renvoie `update(t)`), `night(g, 0.45)`.
- `node tools/lieux.cjs` → `lieux.png` : le catalogue des lieux.

## Paroles et explications

- Bulle : `bubble(HUD, texte, {x, y, tx, ty, t0, t1})`, ajoutée à `OVERLAYS` ; à l'écran, toujours visible. `SUBS_ON = false` quand les répliques sont en bulles.
- Sous-titres de voix off : `SUBS_ON = true`, style `SUB_STYLE` = `plaque` (fond crème), `karaoke` (sans fond, le mot dit s'allume), `mot` (un seul gros mot au centre). Essai rapide : `?sub=karaoke` dans l'adresse.
- `keyword(L, 'mot', {text, col, x, y})` : mot clé qui surgit au moment où il est dit.
- `stepBadge(g, n, titre)`, `arrow(g, x1, y1, x2, y2, {t0})`, `bigNumber(g, valeur, unité, {x, y, t0})`, `checklist(g, items, {x, y, times, t1})`, `sticker`, `judge` (mot de jugement), `burst` (éclat).
- Caméra : `s.cam = t => ({x, y, z})` ; `dialogueCam(lignes, {id: x})` fait un plan par réplique ; `punch(t, force)` pour un coup de zoom.
- Transitions : `wipe(t0, couleur)` (bande balayée avec whoosh), coupe franche (`CUTS.push(t)`, éclair).
- Registre des textes : `reg(id, texte, t0, t1, x, y, w, h, 'world'|'hud', dit_à_voix_haute)` ; il sert aux contrôles de lecture, de zones et de chevauchements.

## Son

- Voix : `tools/tts.py` (Microsoft en ligne, temps exacts des mots ; sinon Kokoro hors ligne), ou l'enregistrement de l'utilisateur découpé par `tools/split_voice.py`. Une phrase par ligne ; éviter un mot isolé et ambigu en début de ligne (« Un, … », « Deux, … » : préférer « D'abord », « Ensuite »).
- Partition synthétisée : modes `sparse`, `brass`, `funk`, `quiz`, `quizFast`, `dream`, `sweet`, `tension`, `pop`, `popBig`, `light`, `end` ; `crashes`, `jingles`, `fanfares`, `rolls`, `silences`, `ambience` (`room`, `crickets`, `cheer`).
- Musique de l'utilisateur (droits vérifiés) : `python tools/beat.py musique.mp3` donne `bpm` et `beat0` ; dans `story.json` : `"bpm": …, "track": {"file": "musique.mp3", "beat0": …, "gain": -2}`.
- Bruitages (événements `ev(t, nom)`) : `pop`, `pip`, `stamp`, `crash`, `boom`, `boom2`, `whoosh`, `swish`, `pass`, `tick`, `ding`, `squeak`, `howl`, `shift`, `heart`, `buzz`, `nosignal`, `shutter`, `land`, `hop`, `step`, `door`, `knock`, `notif`, `click`, `crowd`, `laugh`, `sparkle`.

## Motion design d'une appli (`motion.js`, skill motion)

L'interface réelle qui bouge, sans bonhommes ou avec eux en appoint. Exemple : `example-motion/` (Ça Joue).
- Captures : `node tools/ui_capture.cjs <url> capture.json [--desktop]` → `assets/ui/` et `assets/ui/ui.js` (`window.UI` : écrans, morceaux avec leur boîte). Étapes `goto`, `click`, `type`, `tick`, `scroll`, `storage`, `shot`, `full`, `part`. Horloge simulée et hasard fixé.
- Minutage : `motion.json` (`bpm`, `sections` en temps avec `mode`, `stop`, `lines` facultatives, `track` pour sa musique) → `python tools/timeline_motion.py` ; `build.sh` le choisit tout seul.
- Ressorts : `new Track(v0).to(t, v, SP.vif)` puis `.at(t)` (SP : `vif`, `doux`, `cam`, `texte`, `net`) ; `stepR(τ, sp)`.
- Caméra : `const rig = camRig(); rig.to(t, x, y, z)` ou `rig.fit(t, boîte, {pad, fill})` ; `s.cam = rig.cam` (zoom logarithmique).
- Appareils : `device(g, 'phone'|'browser'|'laptop', {w, screenBg, url})` → `set(src, scroll, aspect)`, `app(x, y)` (point de l'appli dans l'appareil), `k` ; barre d'état dessinée (les captures n'en ont pas). `uiShot(g, src, {w, h, r})` : une capture en carte.
- Morceaux : `uiPart(g, nom, échelle, {r})` → `{g, w, h, home}` (sa place dans l'écran) ; à placer avec `applyVis`.
- Apparitions : `vis(t, tin, tout)` (entrée sur ressort, sortie courte avec flou) + `applyVis(g, v, x, y, s, r)`.
- `cursor(g, [{t, x, y, click}], {label})` : trajets en arc, pression, onde, bruit de clic. `typing`, `counter` (vrai chiffre seulement), `slam(HUD, mots, temps, {stack, cols})`, `morph` (une forme qui devient chaque état), `focus(g, boîte, t0, t1)`, `motionBg`, `mtext`, `measureF` ; police d'interface Inter (ou `PALETTE.font`).
- `mark(t)` déclare un moment fort ; `check.py` mesure les temps morts sur tous les événements (bruits, coupes, coups de zoom, moments) : jamais plus de deux mesures sans rien de neuf, premier événement avant 0,6 s.

## Clip d'une chanson

- `python tools/lyrics_align.py chanson.mp3 paroles.txt` : paroles calées mot à mot (Whisper + alignement sur le texte) → `lines.json`, `voice/words.json`, `song.json`, `lyrics_report.txt` (vers à vérifier).
- `clip.json` : `titre`, `artiste`, `debut`, `fin` (extrait).
- `python tools/timeline_clip.py` : tempo et premier temps de la chanson (`beat.py`), sections intro, strophes (refrains marqués), fin ; `TL.order`, `TL.S`, `TL.beat0` (la grille des temps `frac`, `beatsIn`, `q16` suit la chanson). `build.sh` le choisit tout seul quand `song.json` existe ; la chanson est la bande-son, jamais baissée.
- Dans `film.js` : `mouth: mouthAt(L, t)` sur les vers de la scène pour le chanteur, `actor` + `danse(t, style, i, énergie)` sur le temps (un style différent par danseur, `crowd` pour une salle pleine), `SUB_STYLE = t => …` (plaque, karaoké ou mot à mot selon la strophe). Exemple : `example-clip/`.

## Brief et commandes

- `templates/brief.json` : toutes les réponses d'une vidéo en un fichier (type, sujet, format, voix, ambiance, personnages, chanson…). Si l'utilisateur en donne un, le skill ne pose que les questions dont la réponse manque.
- Commandes : `/doodle-video:lancement`, `/doodle-video:histoire`, `/doodle-video:clip`, avec le sujet, le dossier ou le brief en argument.

## Formats

`SIZE=1080x1920` (défaut, TikTok, Reels, Shorts), `SIZE=1920x1080` (YouTube 16:9), `SIZE=1080x1350` (fil Instagram 4:5) devant `sh build.sh`. Les scènes s'écrivent une seule fois, en coordonnées verticales. En 16:9, la caméra cadre plus serré sur les personnages et l'écran (bulles, sous-titres, mots clés) est réduit et centré. `tools/post.py` fait aussi la version 4:5 à partir du vertical.

## Contrôles

- `python tools/storyboard.py 9` → `storyboard.jpg` : 6 à 9 images clés avec leur réplique, à valider AVANT le rendu complet.
- `python tools/check.py <film>.mp4` : temps morts, lecture, zones sûres des réseaux, chevauchements de textes, personnages figés ou sans geste, images noires, plans figés, niveau sonore, transcription Whisper en français (`tools/voicecheck.py`). Code de sortie 1 si un point échoue : on corrige, on reconstruit, on revérifie.
- `python tools/post.py <film>.mp4 post.json` → `publication/` (vidéos par réseau, couvertures, zones, textes).
