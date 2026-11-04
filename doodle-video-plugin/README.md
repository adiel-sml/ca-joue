# doodle-video

Plugin Claude Code personnel : des vidéos en dessin animé avec des bonhommes doodle. Deux skills :

- **video-lancement** : la vidéo de lancement d'un projet, avec ses vrais écrans.
- **histoire** : raconter une histoire ou expliquer un sujet (dialogues en bulles, voix off, étapes, schémas).

Claude lit le dépôt, écrit la voix off, filme les vrais écrans les plus parlants, met en scène des bonhommes doodle, cale les sous-titres mot par mot sur la voix (la tienne ou une voix Microsoft), compose une musique rythmée et livre la vidéo verticale, l'image d'aperçu et les sous-titres.

## Installer (une fois, pour tous les projets)

Sur ton ordinateur :

```sh
claude plugin marketplace add adiel-sml/doodle-video
claude plugin install doodle-video@adiel --scope user
```

Dans les sessions cloud, ajoute la même chose au script de démarrage de l'environnement (menu de l'environnement, Modifier, Setup script) :

```sh
claude plugin marketplace add adiel-sml/doodle-video && claude plugin install doodle-video@adiel --scope user
```

Le dépôt étant privé, ajoute-le aussi dans les dépôts de l'environnement.

## Utiliser

- « Fais-moi une vidéo de lancement » dans un projet, ou `/doodle-video:video-lancement`.
- « Raconte en vidéo… », « Explique en vidéo comment… », ou `/doodle-video:histoire`.

## Réseau (sessions cloud)

- Voix Microsoft : `speech.platform.bing.com`
- Vérification de la voix (Whisper) : `huggingface.co`, `us.aws.cdn.hf.co`, `cas-bridge.xethub.hf.co`, `cas-server.xethub.hf.co`

## Contenu

- `plugin/skills/video-lancement/SKILL.md` : la méthode, étape par étape.
- `plugin/skills/histoire/SKILL.md` : la méthode pour les histoires et les explications.
- `plugin/skills/video-lancement/kit/` : moteur d'image (`engine.js`), socle commun (`runtime.js`), bonhommes (`people.js`), lieux et explications (`story.js`), outils de voix, d'alignement, de minutage, de musique et de rendu ; exemples : le film de Ça Joue (`example/`) et une petite histoire (`example-histoire/`).
- Rendu, voix hors ligne et mixage : bibliothèque Lemo-Opuscar (MIT), installée par `scripts/setup.sh`.
