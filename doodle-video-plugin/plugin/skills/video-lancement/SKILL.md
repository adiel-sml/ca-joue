---
name: video-lancement
description: Crée la vidéo de lancement d'un projet (appli, site, outil) en dessin animé, au format vertical TikTok, Reels et Shorts ou horizontal. Le skill lit le dépôt, écrit la voix off, filme les vrais écrans les plus parlants image par image, met en scène des bonhommes doodle (grosse tête, corps fin, trait noir épais), cale les sous-titres mot par mot sur la voix (enregistrée par l'utilisateur ou de synthèse Microsoft), compose une musique rythmée accordée au projet, puis mixe et contrôle le film. À utiliser quand l'utilisateur demande une vidéo de lancement, une vidéo promo, une pub, un teaser, un TikTok ou un Reel pour un de ses projets, ou une « vidéo comme la dernière ».
---

# Vidéo de lancement en dessin animé

Ce skill refait, pour n'importe quel projet, le film de lancement de Ça Joue : des bonhommes doodle sur un plateau de jeu coloré, le vrai produit dans un téléphone dessiné, une voix off, des sous-titres qui s'allument mot par mot et une musique rythmée calée sur l'image. Le film d'exemple complet est dans `kit/example/` (son traitement : `kit/example/TREATMENT.md`). Il sert à apprendre la mécanique ; l'histoire, les scènes et les textes de chaque nouveau film viennent du projet.

Parle en français à l'utilisateur, sauf s'il écrit dans une autre langue.

## Règles de l'utilisateur, toujours

- Rien qui fasse « généré » : pas de faux avis, pas de boutons qui pullulent, pas de dégradé violet (pas de violet du tout dans les décors), pas de tiret long ni de tiret court en guise de ponctuation dans les titres et les textes, pas d'emoji (des icônes à la place), pas d'animation dans tous les sens, pas de mention « IA » ni de tag IA sur les textes ou les images, aucune image générée par IA. Tout est dessiné en code.
- Personnages : des bonhommes originaux comme `kit/people.js` (variations de peau, coiffure, casquette, bob, lunettes, sac à dos, boucles d'oreille), jamais une mascotte tirée du logo, jamais un personnage existant.
- Ne rien inventer sur le produit : chaque phrase de la voix off et chaque étiquette se vérifie dans le code ou le site.
- Contenu adulte de l'appli (niveaux +18, défis osés) : jamais à l'écran ni dans la voix.
- Ne fais aucune erreur : chaque étape se vérifie (images fixes, contrôle de lecture, niveau sonore, transcription de la voix).

## 0. Outils

Lance `sh "<dossier de ce skill>/scripts/setup.sh"` : il clone si besoin la bibliothèque de rendu Lemo-Opuscar dans `~/lemo-opuscar` (rendu image par image, voix Kokoro, transcription, mixage) et vérifie ffmpeg 7+ (sinon il en installe un privé dans `~/.doodle-video/bin`). Il imprime `KIT=` et `LIB=`. Lance tout de suite `sh setup.sh deps` en arrière-plan la première fois (quelques minutes). Signale à l'utilisateur ce qui manque sur sa machine (Node 20+, Python 3.11+) sans l'installer toi-même.

Réseau, dans une session cloud : les voix Microsoft passent par `speech.platform.bing.com`, la vérification de la voix télécharge Whisper sur `huggingface.co` puis sur ses serveurs de fichiers (`us.aws.cdn.hf.co`, `cas-bridge.xethub.hf.co`, `cas-server.xethub.hf.co`). Si un des deux est refusé, dis-le et propose l'autre voie (Kokoro hors ligne, une seule voix française féminine ; ou l'enregistrement de l'utilisateur).

## 1. Lire le projet

Avant toute question, lis le dépôt : README, `package.json`, pages et contenus (`src/`), `index.html` (titre, description), manifeste, icônes, couleurs (`styles.css`, variables CSS, thème), adresse en ligne (README, `vercel.json`, réglages de déploiement). Note :
- le nom, la promesse en une phrase, le public ;
- les 4 ou 5 fonctions les plus fortes, avec leur preuve dans le code ;
- les chiffres vrais (nombre de jeux, de modèles, de villes…), à recompter dans le code ;
- les couleurs de marque (elles teintent les étiquettes et les décors, jamais en dégradé) ;
- comment lancer l'appli en local (`npm run build` puis `preview`, ou `dev`).

## 2. Une seule série de questions

Avec `AskUserQuestion`, en une fois, seulement ce que le dépôt ne dit pas :
1. **Format** : vertical 1080×1920 environ 40 s (recommandé pour TikTok, Reels, Shorts), horizontal 1920×1080, ou les deux.
2. **Voix** : la sienne (tu écris le texte, il l'enregistre au Dictaphone et l'envoie), une voix Microsoft (Henri ou Rémy pour un homme, Denise ou Vivienne pour une femme : fais-en écouter une ligne si possible), ou sans voix.
3. **Ambiance musicale**, proposée d'après le projet : soirée et jeux → pop rythmée 120 BPM ; productivité ou finance → électro calme 110 BPM ; sport, défi ou mobilité → plus nerveux 128 BPM ; famille ou douceur → 100 BPM boîte à musique et percussions légères. Toujours rythmé : grosse caisse, claquements, basse qui bouge.
4. **Aperçu** : veut-il valider un brouillon avant la version finale (par défaut oui : un brouillon avec la voix de synthèse ne coûte presque rien).

Ensuite résume le plan en quelques lignes et avance sans reposer de questions.

## 3. Le texte de la voix off

7 à 10 lignes, environ 2,5 mots par seconde, à vérifier par rapport à la durée visée :
- **accroche dans les 3 premières secondes** : le problème vécu par le public, en une question ou une image ;
- **la révélation** : le produit apparaît, avec son chiffre fort ;
- **une ligne par fonction forte**, en commençant par la plus spectaculaire, chacune illustrée par un vrai écran ;
- **un moment de suspense** (une question, une seconde de silence, puis la réponse qui claque) ;
- **la fin** : le nom, l'appel à l'action ; l'adresse s'affiche à l'écran, la voix ne la lit pas.

Écris les nombres en lettres dans `text` (ce qui est dit) et mets la forme affichée dans `show` (`{"vingt-trois": "23"}`). Ponctuation française avec espace insécable avant `? ! :` (l'outil d'alignement s'en charge). Format de `lines.json` : `kit/example/lines.json`, avec `voice` (par exemple `fr-FR-HenriNeural`) et `rate` facultatif (`+6%`).

Si l'utilisateur enregistre sa voix, donne-lui le texte numéroté et ces consignes : Dictaphone, pièce calme sans télé ni musique, téléphone à 20 cm, ton enjoué, **une seconde de silence entre chaque ligne**, en cas d'erreur une pause puis relire la ligne (on garde la dernière prise), anglicismes prononcés à l'anglaise. Avance pendant ce temps avec la voix de synthèse.

## 4. Les écrans : les plus parlants, pas les plus nombreux

Lance l'appli en local et explore-la avec `kit/tools/explore.cjs` (copie-le dans le projet du film et adapte l'adresse et la liste des étapes) : chaque écran est photographié, avec la liste des boutons cliquables. Puis choisis, pour chaque ligne de voix, l'écran qui la prouve le mieux. Un bon écran :
- montre le produit **en action** (une partie en cours, un résultat, un chrono qui tourne, une révélation), pas un menu de réglages ni un formulaire vide ;
- se lit en une seconde sur un téléphone : un grand mot, une grande carte, un chiffre, des couleurs franches ;
- a des données de démonstration crédibles et neutres (prénoms variés, aucun contenu adulte, aucune donnée réelle d'utilisateur) ;
- n'a ni bandeau d'installation, ni fenêtre d'autorisation, ni état d'erreur ;
- bouge si possible : capture une courte séquence (12 à 40 images) pour un défilement, un chrono ou une réponse trouvée.

Capture avec Playwright comme `kit/example/capture.cjs` : `deviceScaleFactor: 2`, viewport 390×844, `Math.random` remplacé par une suite fixe (`addInitScript`), horloge simulée (`page.clock.install()`, `runFor`), stockage local pré-rempli (joueurs, préférences, écrans d'aide déjà vus), `waitForTimeout` réel avant une capture si un panneau s'anime. Regarde chaque capture (planche-contact) avant de l'utiliser.

## 5. Le traitement, puis le film

Crée le projet du film dans un dossier `<nom>-lancement/` du dossier de l'utilisateur (hors du dépôt de l'appli, sauf demande contraire). Copie-y `kit/` (sans `example/`), puis :
1. **`TREATMENT.md`** : trois structures possibles et ton choix, la logline, le découpage scène par scène (décor, cadre, mouvement de caméra et pourquoi), la carte des repères musicaux, le tableau du son, la typographie. Modèle : `kit/example/TREATMENT.md`. L'histoire vient du projet, jamais de l'exemple.
2. **`tools/timeline.py`** : d'après `kit/example/timeline.py`. Tempo fixe, sections sur des barres de mesure, longueur de chaque section calculée depuis la durée réelle de ses lignes de voix ; il produit aussi `TL.score` (la partition : modes par section, jingles, cymbales, roulements, silences, ambiances) que `tools/music.py` joue. Deux vrais silences au moins, avant la révélation et avant le moment de suspense.
3. **`film.js`** : d'après `kit/example/film.js`. Le moteur (`engine.js`) fournit décors (`setBg` : rayures, pois, soleil), téléphone avec vrais écrans (`phone`, `set(nom)`), étiquettes (`sticker`), éclat (`burst`), mot de jugement (`judge`), tuiles d'icônes Lucide (`gameTile`), caméra, coups de zoom (`punch`), événements sonores (`ev`). `people.js` fournit les bonhommes (`person`, `pose`, `personHand`). Les sous-titres en plaque, mot par mot, sont déjà dans l'exemple.
4. **Distribution** : trois bonhommes différents (peau, coiffure, vêtements, un accessoire chacun), aux couleurs qui ne sont jamais celles du décor où ils se tiennent.

Mise en page verticale : sol à y = 1380, téléphone en haut au centre, bonhommes devant sur le sol, étiquettes en bas sur les côtés du téléphone (là où les écrans sont vides), plaque de sous-titres à y ≈ 1520, rien d'important au-dessus de y = 150, sous y = 1650 ni à droite de x = 950 entre y = 900 et 1650 (interface de TikTok).

## 6. Voix, musique, montage

- **Voix de synthèse** : `TTS=1 sh build.sh`. **Voix de l'utilisateur** : `REC=<fichier> sh build.sh` (découpe en lignes, écarte les reprises, garde la dernière prise ; lis `voice/split.json` et signale une ligne au coût élevé).
- **Vérifie chaque ligne** : `"$LIB/.venv/bin/python" "$LIB/core/tts/asr_check.py" lines.json voice --lang fr` (transcription Whisper). Une ligne mal comprise : régénère-la (synthèse) ou demande à l'utilisateur de la refaire.
- **Musique** : `tools/music.py`, synthétisée en code, pilotée par `TL.score` ; garde-la rythmée du début à la fin, sauf pendant les silences voulus. La voix passe 10 dB au-dessus.
- **Construction** : `sh build.sh` (alignement des mots, minutage, événements, rendu image par image, partition et mixage à −14 LUFS, sous-titres `.srt`, image d'aperçu).

## 7. Contrôles avant de livrer

- Planches-contact d'un plan toutes les 1,5 s et bandes à 0,2 s autour des moments clés (`node "$LIB/core/render/still.mjs" <projet> <t>… --size 1080x1920`, `sheet.py`).
- `node "$LIB/core/render/readcheck.mjs" <projet> --size 1080x1920` : chaque texte reste assez longtemps.
- Aucune image noire (`ffmpeg … blackdetect`), niveau −14 LUFS et crête sous −1,2 dB (affichés par `mux.sh`), sous-titres en phase avec la voix.
- Écoute critique impossible pour toi : dis-le, et demande à l'utilisateur de signaler un mot décalé.
- Une seule série de corrections, puis livraison.

**Livrer** dans le dossier du film : `<nom>.mp4`, `poster.jpg`, `<nom>.srt`, `TREATMENT.md`, `CREDITS` (d'après `kit/CREDITS.template` : police Fredoka OFL, icônes Lucide ISC, code MIT de Lemo-Opuscar, voix utilisée), et le code avec `build.sh`. Envoie la vidéo à l'utilisateur, dis où est le dossier, et propose de le sauvegarder dans une branche du dépôt du projet (la machine d'une session cloud est temporaire).
