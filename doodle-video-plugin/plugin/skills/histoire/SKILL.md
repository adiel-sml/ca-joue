---
name: histoire
description: Raconte une histoire ou explique un sujet en vidéo dessin animé avec des bonhommes doodle (grosse tête, corps fin, trait noir épais) qui jouent les scènes, avec dialogues en bulles ou voix off, émotions, décors (salon, rue, parc, bureau, café, chambre, magasin, bus, tableau), explications visuelles (étapes, flèches, chiffres, listes), voix Microsoft ou voix de l'utilisateur, musique rythmée, pour TikTok, Reels, Shorts, YouTube ou Instagram. À utiliser dès que l'utilisateur veut raconter une histoire, une anecdote, un témoignage ou un sketch en vidéo, expliquer un concept, une démarche ou un tuto, faire un top 5, un avant/après, un « mythe ou réalité », une vidéo pédagogique ou un dialogue animé, même sans projet de code. Pour présenter une appli ou un site, utiliser plutôt video-lancement.
---

# Histoire ou explication en dessin animé

Même boîte à outils que `video-lancement` : le kit est dans `../video-lancement/kit/` (depuis le dossier de ce skill), décrit dans `kit/GUIDE.md`. Exemple complet : `kit/example-histoire/` (deux amis préparent une soirée : salon, tableau en trois étapes, parc ; 15 s, toutes les vérifications passent). Modèles de formats prêts à remplir : `kit/templates/` (top 5, avant/après, mythe ou réalité, tuto en 3 étapes, sketch, témoignage, 3 erreurs à éviter).

Parle en français à l'utilisateur, sauf s'il écrit dans une autre langue.

**Skills d'appoint, s'ils sont installés** : Social Media Skills (`hook-writer`, `short-form-video-script`, `storytelling-and-narrative`, `caption-writer`, `hashtag-strategy`) pour l'écriture et la publication ; `dataviz` pour un graphique dans une explication.

## Règles de l'utilisateur, toujours

Rien qui fasse « généré » : pas de violet ni de dégradé, pas de tiret long ni court comme ponctuation, pas d'emoji, pas d'animation dans tous les sens, pas de mention « IA », aucune image générée ; tout est dessiné en code. Personnages originaux, jamais un personnage existant ni une personne réelle reconnaissable. Une explication ne dit que des choses vraies : chaque fait et chiffre a sa source dans `SOURCES.md`. Un témoignage inventé ne se présente jamais comme réel. `tools/check.py` passe sans échec avant toute livraison.

## 0. Outils

`sh "<dossier du skill video-lancement>/scripts/setup.sh"` (et `deps` la première fois). Réseau : comme `video-lancement`.

## 1. Comprendre et cadrer

Lis ce qu'il a écrit et ses fichiers. Une seule série de questions avec `AskUserQuestion`, seulement ce qui manque :
1. **Forme** : histoire jouée (dialogues en bulles), explication avec narrateur (voix off et schémas), ou les deux ; propose le modèle de `kit/templates/` qui convient.
2. **Format** : vertical 15 à 45 s (recommandé), 16:9 pour YouTube, ou les deux.
3. **Voix** : la sienne (ou celles de ses amis, une par personnage), des voix Microsoft (une par personnage), ou sans voix.
4. **Ton** : drôle et rythmé, posé et pédagogique, émouvant (la musique reste rythmée sauf demande contraire).

Puis résume le plan en quelques lignes et avance.

## 2. Distribution et écriture

- **`cast.json`** : un personnage par rôle (look et voix), contrastés entre eux ; s'il existe déjà dans son dossier, réutilise-le pour garder la série cohérente. `node tools/planche.cjs cast.json` → `planche.png`.
- **Structure** : une idée, un personnage qui veut quelque chose, un changement, une fin qui répond au début. Accroche dans les 3 premières secondes. Explication : la situation vécue d'abord, 3 à 5 étapes au plus, une image par étape, un récapitulatif, la phrase à retenir.
- **`lines.json`** : une réplique par ligne, une phrase, 12 mots au plus, `who` renvoie à `cast.json`. Une étape = une ligne. Pas de mot isolé et ambigu en début de ligne (préférer « D'abord », « Ensuite », « Et enfin »). **`story.json`** : les scènes, leurs répliques, leur mode de musique, `pause` pour un silence voulu.

## 3. Traitement, storyboard, film

Dossier `<titre>-video/` chez l'utilisateur, avec le kit copié (sans les exemples ni les modèles).
1. **`TREATMENT.md`** : trois structures possibles et ton choix, logline, scènes (lieu, cadre, mouvement de caméra et pourquoi), deux moments de silence au plus.
2. **`film.js`** d'après `kit/example-histoire/film.js` : lieux, personnages avec émotions (`mood`) qui suivent le texte, bouche qui suit les sons (`mouthAt`), trois-quarts vers celui qui parle (`turn`), gestes (`point`, `hold`, `sit`, `walk`), bulles à l'écran, mots clés, étapes, transitions (`wipe`), un plan par réplique (`dialogueCam`).
3. **Storyboard** : `TTS=1` pour la voix, puis `tools/align.py`, `tools/timeline_story.py` et `python tools/storyboard.py 9` → `storyboard.jpg`. **Montre-le à l'utilisateur et attends son accord** avant le rendu complet.

## Rythme : captiver jusqu'à la fin

Accroche dès la première image ; aucun blanc de plus de 0,7 s entre deux répliques ; un changement à l'écran toutes les 1,5 à 2 s ; personnages toujours vivants (respiration, réactions, regard) ; transitions qui claquent ; musique rythmée ; fin courte (1 à 2 s après la chute). Voir `kit/GUIDE.md`.

## 4. Construction, contrôles, publication

`sh build.sh` (ou `REC=<fichier> sh build.sh`), `SIZE=1920x1080 sh build.sh` pour le 16:9 ; `python tools/check.py <film>.mp4` doit passer ; `python tools/post.py <film>.mp4 post.json` → `publication/`. Livre la vidéo, `poster.jpg`, `.srt`, `publication/`, `TREATMENT.md`, `CREDITS`, `SOURCES.md` pour une explication, le code avec `build.sh`. Dis ce que tu n'as pas pu contrôler (l'écoute finale revient à l'utilisateur) et propose de sauvegarder le dossier dans un dépôt.
