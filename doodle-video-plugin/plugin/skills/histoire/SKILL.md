---
name: histoire
description: Raconte une histoire ou explique un sujet en vidéo dessin animé, avec des bonhommes doodle (grosse tête, corps fin, trait noir épais) qui jouent les scènes, des dialogues en bulles ou une voix off, des décors (salon, rue, parc, tableau), des explications visuelles (étapes numérotées, flèches, gros chiffres, liste qui se coche), des voix Microsoft ou la voix de l'utilisateur, et une musique rythmée. À utiliser quand l'utilisateur veut raconter une histoire, une anecdote ou un témoignage en vidéo, expliquer un concept, un fonctionnement, une démarche ou un tutoriel, faire une vidéo pédagogique, un sketch ou un dialogue animé, même sans projet de code. Pour présenter une appli ou un site, préférer le skill video-lancement.
---

# Histoire ou explication en dessin animé

Même outillage que le skill `video-lancement` : le kit est dans `../video-lancement/kit/` (à partir du dossier de ce skill), avec un exemple d'histoire complet dans `kit/example-histoire/` (deux amis préparent une soirée : salon, tableau en trois étapes, parc). L'exemple montre la mécanique ; chaque histoire écrit ses propres scènes.

Parle en français à l'utilisateur, sauf s'il écrit dans une autre langue.

**Skills d'appoint, s'ils sont installés** : ceux du plugin Social Media Skills (`hook-writer` pour l'accroche, `tiktok-script`, `reels-script`, `youtube-shorts`, `caption-writer`, `hashtag-strategy`, `platform-specs-and-validation`) pour le texte et la publication ; `dataviz` pour un graphique dans une explication. Ils complètent ce skill, ils ne remplacent ni ses règles ni son style.

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
- Répliques courtes (une phrase, 12 mots au plus), une action visible par réplique ; une explication en étapes = une ligne de voix par étape.
- `lines.json` : une ligne par réplique, avec `who` (le personnage), `voice`, `text` (nombres en lettres) et `show` (forme affichée, `{"trois": "3"}`). `story.json` : les scènes, leurs répliques, leur mode de musique (voir `kit/tools/timeline_story.py`), `pause` pour un silence voulu.
- Si l'utilisateur enregistre sa voix ou celles de ses amis : le texte numéroté par personnage, une seconde de silence entre les répliques, un fichier par personnage ou un seul fichier dans l'ordre.

## 3. Le film

Crée `<titre>-video/` dans le dossier de l'utilisateur, copie `kit/` (sans les exemples), puis :
- **`TREATMENT.md`** : trois structures possibles et ton choix, la logline, les scènes (lieu, cadre, mouvement de caméra et pourquoi), les moments sonores, deux silences au moins.
- **Personnages** : `person()` de `people.js` (peau, coiffure : `short`, `puff`, `curly`, `long` ; `hat` : `cap`, `bucket` ; lunettes, sac à dos, boucles d'oreille ; couleurs de vêtements). Fais une planche des personnages (images fixes) et vérifie-les avant de tourner.
- **Lieux** (`story.js`) : `placeRoom` (salon, avec `sofa`, `table`), `placeStreet`, `placePark`, `placeBoard` (tableau, `chalk` pour écrire dessus), ou les plateaux colorés de `engine.js` (`setBg` : rayures, pois, soleil) pour les moments de jeu ou d'emphase. Un lieu nouveau se dessine dans le même trait (aplats, contour encre 8 px, ombre dure, pas de dégradé).
- **Jeu des personnages** : `pose` (bras, coude, regard, bouche, yeux fermés, sueur, masque, suie), `walk` (marcher d'un point à un autre), `talking` (bouche qui suit les mots), sauts sur le temps (`hopY`), écrasement aux impacts (`hitSq`). Anticipation, action, rebond sur chaque geste important.
- **Paroles** : `bubble(HUD, …)` ajoutée à `OVERLAYS` (`SUBS_ON = false`), toujours à l'écran, la pointe vers celui qui parle ; ou la plaque de sous-titres mot par mot pour une voix off (`SUBS_ON = true`).
- **Explications** : `stepBadge` (étapes numérotées), `arrow` (flèche qui se trace), `bigNumber` (chiffre qui compte), `checklist` (récapitulatif qui se coche), `sticker` et `judge` (mots qui claquent), le téléphone avec de vraies captures si l'histoire parle d'une appli.
- **`film.js`** : d'après `kit/example-histoire/film.js` (une scène par bloc, tout calculé depuis `t`). **Minutage** : `tools/timeline_story.py` (lu automatiquement par `build.sh` quand `story.json` existe).

## Rythme : captiver jusqu'à la fin

Le spectateur décide en 1 à 2 secondes s'il reste, puis à chaque temps mort. Règles, toujours :
- **Accroche visible dès la première image** : la question ou l'enjeu en grosse étiquette (`sticker`), avec un coup de zoom à 0 s ; jamais un logo ni un plan vide pour commencer.
- **Aucun temps mort** : 0,12 s entre deux répliques (`gap`), pas de mesure entière d'attente en fin de scène (la scène coupe sur le temps qui suit la dernière réplique), une seule phrase par ligne de voix (les points au milieu d'une ligne ajoutent environ 0,7 s de silence avec les voix Microsoft), débit `rate` de +6 % à +10 %.
- **Quelque chose change à l'écran toutes les 1,5 à 2 secondes** : nouveau plan (`dialogueCam` : un plan par réplique, plan large puis gros plan sur celui qui parle), mot clé qui surgit sur le mot dit (`keyword`), étape qui s'affiche, réaction, objet qui entre.
- **Personnages vivants en permanence** : respiration, balancement et clignement (`alive`), réaction de celui qui écoute (`listen`), bouche qui suit les mots (`talking`), saut ou écrasement sur les temps forts.
- **Transitions qui claquent** : bande balayée avec whoosh (`wipe`), coupe franche avec éclair, jamais de fondu lent.
- **Textes à l'écran** : bulles et mots clés dans le HUD (`OVERLAYS`), donc toujours visibles, même en gros plan.
- **Musique rythmée sans interruption**, sauf un ou deux silences voulus juste avant une révélation.
- **Fin courte** : la chute, puis 1 à 2 secondes au plus avant de couper (au-delà, le spectateur part avant la fin, ce que les réseaux pénalisent).
- Contrôle : `timeline.json` ne doit montrer aucun blanc de plus de 0,7 s entre deux répliques, et la planche-contact à une image par seconde doit changer à chaque image.

## Publication sur TikTok, Instagram et YouTube

Une seule vidéo verticale 1080×1920 sert aux trois réseaux (TikTok, Reels, Shorts). Avant de livrer :
1. Écris `post.json` avec l'utilisateur : `cover_t` (l'image de couverture, souvent l'accroche ou la révélation), et pour chaque réseau le texte (la première ligne reprend l'accroche) et 3 à 5 hashtags précis (pas de liste de 30) ; pour YouTube un titre de 100 caractères au plus et `#Shorts`.
2. Lance `python tools/post.py <film>.mp4 post.json` : il crée `publication/` avec `tiktok.mp4`, `reels.mp4`, `shorts.mp4` (vérifiés, lecture rapide), `couverture-9x16.jpg`, `couverture-4x5.jpg` (grille Instagram), `zones-sures.jpg` et `POST.md` (textes à copier, longueurs).
3. Regarde `zones-sures.jpg` : aucun visage, texte ou sous-titre sous les zones rouges (interface de chaque réseau). Mise en page sûre : sous-titres vers y = 1410 (`SUB_Y`), titres vers y = 265, rien d'important au-dessus de y = 220, sous y = 1500, ni à droite de x = 940 entre y = 880 et 1560.
4. Durées : Reels et Shorts jusqu'à 3 min, TikTok jusqu'à 10 min ; viser 15 à 45 s pour une histoire, 30 à 55 s pour un lancement.

Une version horizontale 16:9 pour une vidéo YouTube classique n'est pas encore prise en charge par le kit (mise en page verticale) : le dire si l'utilisateur la demande.

## 4. Voix, musique, montage, contrôles

Exactement comme `video-lancement` : `TTS=1 sh build.sh` (voix de synthèse) ou `REC=<fichier> sh build.sh` (voix enregistrée), vérification Whisper si le réseau le permet, partition rythmée pilotée par `TL.score`, mixage à −14 LUFS, planches-contact, bandes à 0,2 s sur les gestes clés, contrôle de lecture (`readcheck.mjs`), images noires. Une série de corrections, puis livraison avec le dossier `publication/` : la vidéo, `poster.jpg`, les sous-titres `.srt`, `TREATMENT.md`, `CREDITS`, le code avec `build.sh`. Propose de sauvegarder le dossier dans un dépôt (la machine d'une session cloud est temporaire).
