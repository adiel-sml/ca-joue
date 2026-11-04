# Guide du kit doodle-video

Référence commune aux skills `video-lancement` et `histoire`. Le monde est toujours dessiné en 1080×1920 (sol à y = 1380) ; l'image rendue peut être verticale, 16:9 ou 4:5, la caméra et l'écran s'adaptent.

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
  - `point: 'L'|'R'` (pointer), `hold: 'phone'|'cup'|'paper'|'pizza'|'gift'|'money'|'book'` et `holdSide` ;
  - corps : `sit`, `crouch` (0 à 1), `step` (marche), `lean`, `sq` (écrasement), `sweat`, `soot`, `mask`, `eyes` (`n`, `up`, `meh`, `x`, `wide`).
- Vie et rythme (`story.js`) : `alive(t, i)` (respiration, balancement, clignement), `listen(t, L, côté)` (réaction de celui qui écoute), `walk(t, t0, t1, xa, xb)` + `walkSteps(t0, t1)` (pas sonores), `talking(L, t)`.
- `node tools/planche.cjs cast.json` → `planche.png` : chaque personnage, ses 10 émotions et 10 poses. À montrer à l'utilisateur pour valider la distribution.

## Lieux et accessoires (`story.js`, `engine.js`)

- Lieux : `placeRoom` (+ `sofa`, `table`), `placeStreet`, `placePark`, `placeBoard` (+ `chalk`), `placeOffice` (+ `desk`), `placeCafe`, `placeBedroom`, `placeShop`, `placeBus` (renvoie `update(t)` : le paysage défile), `splitStage(g, gauche, droite)` ; plateaux colorés `setBg(g, set, 'stripes'|'dots'|'rays')` avec `SETS` (mint, navy, tang, green, night, pink, crim, sky, lime, sun, cream).
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

## Formats

`SIZE=1080x1920` (défaut, TikTok, Reels, Shorts), `SIZE=1920x1080` (YouTube 16:9), `SIZE=1080x1350` (fil Instagram 4:5) devant `sh build.sh`. Les scènes s'écrivent une seule fois, en coordonnées verticales. En 16:9, la caméra cadre plus serré sur les personnages et l'écran (bulles, sous-titres, mots clés) est réduit et centré. `tools/post.py` fait aussi la version 4:5 à partir du vertical.

## Contrôles

- `python tools/storyboard.py 9` → `storyboard.jpg` : 6 à 9 images clés avec leur réplique, à valider AVANT le rendu complet.
- `python tools/check.py <film>.mp4` : temps morts, lecture, zones sûres des réseaux, chevauchements de textes, images noires, plans figés, niveau sonore, transcription Whisper en français (`tools/voicecheck.py`). Code de sortie 1 si un point échoue : on corrige, on reconstruit, on revérifie.
- `python tools/post.py <film>.mp4 post.json` → `publication/` (vidéos par réseau, couvertures, zones, textes).
