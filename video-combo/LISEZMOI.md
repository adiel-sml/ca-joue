# Ça Joue, le combo (pub cinéma et bonhommes doodle, voix Henri)

- Le film : `ca-joue-combo.mp4` (22,5 s, vertical), affiche `poster.jpg`, sous-titres `ca-joue-combo.srt`.
- Publication : `publication/POST.md` (textes par réseau), couvertures et zones sûres ; les vidéos par réseau se refont avec
  `python tools/post.py ca-joue-combo.mp4 post.json`.
- Refaire le film : kit doodle-video (plugin `doodle-video@adiel`), puis `sh build.sh voice` et `python tools/check.py ca-joue-combo.mp4`.
- Le texte de la voix est dans `lines.json`, les personnages dans `cast.json`, les plans dans `film.js`.
