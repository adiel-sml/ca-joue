---
name: video-lancement
description: Crée la vidéo de lancement ou de présentation d'un projet (appli, site, outil, jeu) en dessin animé avec des bonhommes doodle, pour TikTok, Reels, Shorts, YouTube ou Instagram. Lit le dépôt, écrit la voix off, filme les vrais écrans les plus parlants, cale sous-titres et bouches sur la voix (enregistrée par l'utilisateur ou de synthèse Microsoft), compose une musique rythmée, vérifie tout et prépare la publication. À utiliser dès que l'utilisateur veut une vidéo de lancement, une vidéo promo, une pub, un teaser, une démo animée, un TikTok ou un Reel pour présenter un de ses projets, même s'il ne dit pas « dessin animé », ou une « vidéo comme la dernière ». Pour une histoire ou une explication sans produit à présenter, utiliser le skill histoire.
---

# Vidéo de lancement en dessin animé

Des bonhommes doodle sur un plateau coloré, le vrai produit dans un téléphone dessiné, une voix off, des sous-titres qui s'allument mot par mot et une musique rythmée calée sur l'image. L'exemple complet est le film de Ça Joue dans `kit/example/` (traitement : `kit/example/TREATMENT.md`) : il montre la mécanique, l'histoire de chaque film vient du projet. Toute la boîte à outils est décrite dans `kit/GUIDE.md` : lis-le avant d'écrire du code.

Parle en français à l'utilisateur, sauf s'il écrit dans une autre langue.

**Skills d'appoint, s'ils sont installés** : Social Media Skills (`hook-writer`, `tiktok-script`, `reels-script`, `youtube-shorts`, `caption-writer`, `hashtag-strategy`, `platform-specs-and-validation`) pour l'accroche et la publication ; `dataviz` pour un graphique. Ils complètent ce skill sans remplacer ses règles ni son style.

## Règles de l'utilisateur, toujours

- Rien qui fasse « généré » : pas de faux avis, pas de boutons qui pullulent, pas de violet ni de dégradé, pas de tiret long ni court comme ponctuation dans les titres et les textes, pas d'emoji (des icônes à la place), pas d'animation dans tous les sens, pas de mention « IA » ni de tag IA, aucune image générée. Tout est dessiné en code.
- Personnages : des bonhommes originaux (`people.js`), jamais une mascotte tirée du logo, jamais un personnage existant ni une personne réelle reconnaissable.
- Ne rien inventer : chaque phrase et chaque étiquette se vérifie dans le code ou le site ; un chiffre se recompte dans le code.
- Contenu adulte de l'appli : jamais à l'écran ni dans la voix.
- Aucune erreur livrée : `tools/check.py` doit passer sans échec avant la livraison.

## 0. Outils

`sh "<dossier de ce skill>/scripts/setup.sh"` : bibliothèque de rendu à une version figée dans `~/.doodle-video/lemo-opuscar`, ffmpeg 7+ (privé si besoin). Il imprime `KIT=` et `LIB=`. La première fois, `sh setup.sh deps` en arrière-plan (quelques minutes). Signale ce qui manque (Node 20+, Python 3.11+) sans l'installer toi-même.

Réseau d'une session cloud : voix Microsoft par `speech.platform.bing.com` (passer par `HTTPS_PROXY`, `tts.py` le fait) ; vérification Whisper par `huggingface.co`, `us.aws.cdn.hf.co`, `cas-bridge.xethub.hf.co`, `cas-server.xethub.hf.co`. Si un hôte est refusé, dis lequel et propose l'autre voie (voix Kokoro hors ligne, une seule voix française féminine ; ou la voix de l'utilisateur).

## 1. Lire le projet

Avant toute question : README, `package.json`, pages et contenus, `index.html`, manifeste, icônes, couleurs, adresse en ligne. Note le nom, la promesse en une phrase, le public, les 4 à 6 fonctions les plus fortes (avec leur preuve dans le code), les chiffres vrais, les couleurs de marque, comment lancer l'appli en local.

## 2. Une seule série de questions

Avec `AskUserQuestion`, en une fois, seulement ce que le dépôt ne dit pas : format (vertical recommandé ; 16:9 pour YouTube ; les deux), voix (la sienne, une voix Microsoft homme ou femme, sans voix), ambiance musicale proposée d'après le projet (toujours rythmée), et ce qu'il veut absolument montrer. Puis résume le plan en quelques lignes et avance.

## 3. Distribution et texte

- **`cast.json`** : trois bonhommes différents (peau, coiffure, vêtements, un accessoire chacun) et leur voix ; si le projet en a déjà un, garde-le (même distribution d'une vidéo à l'autre). `node tools/planche.cjs cast.json` → `planche.png`.
- **`lines.json`** : 7 à 11 lignes, une phrase chacune, 2,5 mots par seconde environ. Accroche dans les 3 premières secondes (le problème vécu, en question) ; la révélation avec le chiffre fort ; une ligne par fonction, la plus spectaculaire d'abord ; un moment de suspense (question, silence, réponse qui claque) ; la fin avec le nom (l'adresse s'affiche, la voix ne la lit pas). Pas de mot isolé et ambigu en début de ligne.
- Voix de l'utilisateur : le texte numéroté, Dictaphone, pièce calme, téléphone à 20 cm, ton enjoué, **une seconde de silence entre les lignes**, une erreur se corrige en relisant la ligne (la dernière prise est gardée). Avance pendant ce temps avec la voix de synthèse.

## 4. Les écrans : les plus parlants

Lance l'appli et explore-la avec `tools/explore.cjs` (photo de chaque étape + boutons cliquables). Pour chaque ligne, l'écran qui la prouve le mieux : le produit **en action** (partie en cours, résultat, chrono, révélation), lisible en une seconde (grand mot, carte, chiffre), données de démonstration crédibles et neutres, sans bandeau, fenêtre d'autorisation ni erreur, en courte séquence s'il bouge. Capture comme `kit/example/capture.cjs` (scale 2, 390×844, `Math.random` fixé, horloge simulée, stockage pré-rempli, attente réelle si un panneau s'anime) et regarde chaque capture.

## 5. Traitement, storyboard, film

Dossier `<nom>-lancement/` chez l'utilisateur (hors du dépôt de l'appli sauf demande), avec `kit/` copié (sans `example/`, `example-histoire/`, `templates/`).
1. **`TREATMENT.md`** : trois structures possibles et ton choix, logline, découpage (décor, cadre, mouvement de caméra et pourquoi), repères musicaux, son.
2. **`tools/timeline.py`** d'après `kit/example/timeline.py` : sections sur la grille de tempo, longueur depuis la voix, et `TL.score`.
3. **`film.js`** d'après `kit/example/film.js` (scènes seulement ; voir `kit/GUIDE.md`). Mise en page verticale : sol y = 1380, téléphone en haut au centre, bonhommes devant, étiquettes en bas sur les côtés du téléphone, titres vers y = 265, sous-titres vers y = 1410.
4. **Storyboard** : voix de synthèse et minutage (`TTS=1`, puis `tools/align.py` et `tools/timeline.py`), puis `python tools/storyboard.py 9` → `storyboard.jpg`. **Montre-le à l'utilisateur et attends son accord** avant le rendu complet ; applique ses remarques.

## Rythme : captiver jusqu'à la fin

- Accroche visible dès la première image (grosse étiquette, coup de zoom à 0 s), jamais un logo ni un plan vide pour commencer.
- Aucun temps mort : 0,12 s entre deux répliques, pas d'attente en fin de scène, une phrase par ligne, débit +6 % à +10 %.
- Quelque chose change à l'écran toutes les 1,5 à 2 s : plan, mot clé, étiquette, écran de l'appli, réaction.
- Personnages vivants : émotions qui suivent le texte, bouche qui suit les sons, regard vers celui qui parle, respiration, réactions.
- Transitions qui claquent (coupe avec éclair, bande balayée), jamais de fondu lent ; musique rythmée sans interruption sauf un ou deux silences voulus ; fin courte.

## 6. Construction, contrôles, publication

- `sh build.sh` (ou `REC=<fichier> sh build.sh` pour la voix de l'utilisateur ; lis `voice/split.json`), `SIZE=1920x1080 sh build.sh` pour la version 16:9.
- `python tools/check.py <film>.mp4` : tout doit passer. Un échec se corrige à la source (texte, minutage, mise en page), puis on reconstruit et on revérifie. Regarde aussi une planche-contact d'une image par seconde.
- `post.json` (couverture `cover_t` et `cover_title`, textes et 3 à 5 hashtags par réseau, titre YouTube) puis `python tools/post.py <film>.mp4 post.json` → `publication/`.
- Livre : la vidéo, `poster.jpg`, `.srt`, `publication/`, `TREATMENT.md`, `CREDITS` (d'après `kit/CREDITS.template`), le code avec `build.sh`. Dis où est le dossier, dis ce que tu n'as pas pu contrôler (l'écoute finale revient à l'utilisateur), et propose de le sauvegarder dans une branche du dépôt du projet (la machine d'une session cloud est temporaire).
