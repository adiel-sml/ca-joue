---
name: histoire
description: Raconte une histoire ou explique un sujet en vidéo dessin animé, avec des bonhommes doodle (grosse tête, corps fin, trait noir épais) qui jouent les scènes, des dialogues en bulles ou une voix off, des décors (salon, rue, parc, tableau), des explications visuelles (étapes numérotées, flèches, gros chiffres, liste qui se coche), des voix Microsoft ou la voix de l'utilisateur, et une musique rythmée. À utiliser quand l'utilisateur veut raconter une histoire, une anecdote ou un témoignage en vidéo, expliquer un concept, un fonctionnement, une démarche ou un tutoriel, faire une vidéo pédagogique, un sketch ou un dialogue animé, même sans projet de code. Pour présenter une appli ou un site, préférer le skill video-lancement.
---

# Histoire ou explication en dessin animé

Même outillage que le skill `video-lancement` : le kit est dans `../video-lancement/kit/` (à partir du dossier de ce skill), avec un exemple d'histoire complet dans `kit/example-histoire/` (deux amis préparent une soirée : salon, tableau en trois étapes, parc). L'exemple montre la mécanique ; chaque histoire écrit ses propres scènes.

Parle en français à l'utilisateur, sauf s'il écrit dans une autre langue.

## Règles de l'utilisateur, toujours

Rien qui fasse « généré » : pas de dégradé violet ni de violet, pas de tiret long ni court comme ponctuation dans les textes, pas d'emoji, pas d'animation dans tous les sens, pas de mention « IA », aucune image générée. Tout est dessiné en code. Personnages originaux comme `kit/people.js`, jamais un personnage existant ni une personne réelle reconnaissable. Pour une explication, chaque fait et chaque chiffre est vrai et sourcé (garde les sources dans `SOURCES.md` du film).

## 0. Outils

`sh "<dossier du skill video-lancement>/scripts/setup.sh"` (et `deps` la première fois). Même réseau que pour `video-lancement` : `speech.platform.bing.com` pour les voix Microsoft.

## 1. Comprendre ce qu'il veut raconter

Lis ce qu'il a écrit, et ses fichiers s'il en donne. Puis une seule série de questions avec `AskUserQuestion`, seulement ce qui manque :
1. **Forme** : histoire jouée par des personnages (dialogues), explication avec un narrateur (voix off et schémas), ou les deux (une scène vécue, puis l'explication).
2. **Format et durée** : vertical 1080×1920 de 30 à 60 s (recommandé), horizontal, plus long (au-delà de 90 s, le dire : c'est plus long à produire).
3. **Voix** : la sienne, des voix Microsoft (une par personnage : Henri, Rémy, Denise, Vivienne, et pour d'autres accents Gérard en Belgique, Antoine au Québec, Ariane en Suisse), ou sans voix (textes seulement).
4. **Ton et musique** : drôle et rythmé, posé et pédagogique, émouvant ; la musique reste rythmée sauf demande contraire.

Ensuite, résume le plan en quelques lignes et avance.

## 2. Écrire

- **Une idée, un personnage qui veut quelque chose, un changement, une fin qui répond au début.** Accroche dans les 3 premières secondes.
- **Explication** : le problème vécu d'abord (une scène), puis 3 à 5 étapes au plus, une image par étape, un récapitulatif qui se coche, et la phrase à retenir.
- Répliques courtes (une à deux lignes de bulle, 12 mots au plus), une action visible par réplique.
- `lines.json` : une ligne par réplique, avec `who` (le personnage), `voice`, `text` (nombres en lettres) et `show` (forme affichée, `{"trois": "3"}`). `story.json` : les scènes, leurs répliques, leur mode de musique (voir `kit/tools/timeline_story.py`), `pause` pour un silence voulu.
- Si l'utilisateur enregistre sa voix ou celles de ses amis : le texte numéroté par personnage, une seconde de silence entre les répliques, un fichier par personnage ou un seul fichier dans l'ordre.

## 3. Le film

Crée `<titre>-video/` dans le dossier de l'utilisateur, copie `kit/` (sans les exemples), puis :
- **`TREATMENT.md`** : trois structures possibles et ton choix, la logline, les scènes (lieu, cadre, mouvement de caméra et pourquoi), les moments sonores, deux silences au moins.
- **Personnages** : `person()` de `people.js` (peau, coiffure : `short`, `puff`, `curly`, `long` ; `hat` : `cap`, `bucket` ; lunettes, sac à dos, boucles d'oreille ; couleurs de vêtements). Fais une planche des personnages (images fixes) et vérifie-les avant de tourner.
- **Lieux** (`story.js`) : `placeRoom` (salon, avec `sofa`, `table`), `placeStreet`, `placePark`, `placeBoard` (tableau, `chalk` pour écrire dessus), ou les plateaux colorés de `engine.js` (`setBg` : rayures, pois, soleil) pour les moments de jeu ou d'emphase. Un lieu nouveau se dessine dans le même trait (aplats, contour encre 8 px, ombre dure, pas de dégradé).
- **Jeu des personnages** : `pose` (bras, coude, regard, bouche, yeux fermés, sueur, masque, suie), `walk` (marcher d'un point à un autre), `talking` (bouche qui suit les mots), sauts sur le temps (`hopY`), écrasement aux impacts (`hitSq`). Anticipation, action, rebond sur chaque geste important.
- **Paroles** : `bubble` au-dessus de celui qui parle (`SUBS_ON = false`), ou la plaque de sous-titres mot par mot pour une voix off (`SUBS_ON = true`).
- **Explications** : `stepBadge` (étapes numérotées), `arrow` (flèche qui se trace), `bigNumber` (chiffre qui compte), `checklist` (récapitulatif qui se coche), `sticker` et `judge` (mots qui claquent), le téléphone avec de vraies captures si l'histoire parle d'une appli.
- **`film.js`** : d'après `kit/example-histoire/film.js` (une scène par bloc, tout calculé depuis `t`). **Minutage** : `tools/timeline_story.py` (lu automatiquement par `build.sh` quand `story.json` existe).

## 4. Voix, musique, montage, contrôles

Exactement comme `video-lancement` : `TTS=1 sh build.sh` (voix de synthèse) ou `REC=<fichier> sh build.sh` (voix enregistrée), vérification Whisper si le réseau le permet, partition rythmée pilotée par `TL.score`, mixage à −14 LUFS, planches-contact, bandes à 0,2 s sur les gestes clés, contrôle de lecture (`readcheck.mjs`), images noires. Une série de corrections, puis livraison : la vidéo, `poster.jpg`, les sous-titres `.srt`, `TREATMENT.md`, `CREDITS`, le code avec `build.sh`. Propose de sauvegarder le dossier dans un dépôt (la machine d'une session cloud est temporaire).
