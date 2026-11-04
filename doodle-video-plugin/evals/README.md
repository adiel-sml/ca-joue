# Tests du plugin

- `../tests/smoke.sh` : construit et vérifie un film complet (vertical puis 16:9) avec une installation neuve ; il doit finir par « test de fumée réussi ».
- `trigger-video-lancement.json`, `trigger-histoire.json` : 20 requêtes chacun (10 qui doivent déclencher le skill, 10 proches qui ne doivent pas), au format du skill `skill-creator`. Pour mesurer et améliorer la description d'un skill : demander à Claude « optimise la description du skill histoire avec skill-creator et evals/trigger-histoire.json ».
