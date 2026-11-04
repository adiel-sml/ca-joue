# doodle-video

Plugin Claude Code personnel : des vidéos de lancement en dessin animé pour n'importe quel projet.

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

Dans n'importe quel projet : « Fais-moi une vidéo de lancement ». Ou tape `/doodle-video:video-lancement`.

## Réseau (sessions cloud)

- Voix Microsoft : `speech.platform.bing.com`
- Vérification de la voix (Whisper) : `huggingface.co`, `us.aws.cdn.hf.co`, `cas-bridge.xethub.hf.co`, `cas-server.xethub.hf.co`

## Contenu

- `plugin/skills/video-lancement/SKILL.md` : la méthode, étape par étape.
- `plugin/skills/video-lancement/kit/` : moteur d'image (`engine.js`), bonhommes (`people.js`), outils de voix, d'alignement, de musique et de rendu, et le film de Ça Joue en exemple (`example/`).
- Rendu, voix hors ligne et mixage : bibliothèque Lemo-Opuscar (MIT), installée par `scripts/setup.sh`.
