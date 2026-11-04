# Avant / après

**Quand l'utiliser** : Montrer une transformation : sans l'appli puis avec, avant le conseil puis après.

## Structure

- 0-2 s : l'« avant » en pire, tout de suite (personnage en `gene` ou `triste`, décor terne avec `night(g, 0.25)`).
- 2-8 s : deux ou trois galères concrètes, une par réplique, plan serré sur le visage.
- Le basculement : transition balayée (`wipe`) ou écran partagé (`splitStage`), mot clé « APRÈS ».
- 8-20 s : le même personnage, mêmes situations, réussies (`joie`, `fier`), couleurs franches ; la solution nommée une fois, clairement.
- Fin : le personnage regarde la caméra, phrase à retenir en étiquette.

## Règles communes

Accroche dès la première image, une phrase par réplique, une action visible toutes les 1,5 à 2 s, aucun blanc de plus de 0,7 s, fin courte. Durée visée : 15 à 45 s.

## story.json de départ

```json
{
 "bpm": 120,
 "gap": 0.12,
 "end_hold": 1.4,
 "scenes": [
  {
   "id": "avant",
   "lines": [
    "l1",
    "l2",
    "l3"
   ],
   "mode": "tension"
  },
  {
   "id": "apres",
   "lines": [
    "l4",
    "l5",
    "l6"
   ],
   "mode": "popBig"
  },
  {
   "id": "fin",
   "lines": [
    "l7"
   ],
   "mode": "pop"
  }
 ]
}
```

## lines.json de départ

`who` renvoie à cast.json ; une seule phrase par ligne.

```json
[
 {
  "id": "l1",
  "who": "a",
  "text": "…"
 },
 {
  "id": "l2",
  "who": "b",
  "text": "…"
 },
 {
  "id": "l3",
  "who": "a",
  "text": "…"
 },
 {
  "id": "l4",
  "who": "b",
  "text": "…"
 },
 {
  "id": "l5",
  "who": "a",
  "text": "…"
 },
 {
  "id": "l6",
  "who": "b",
  "text": "…"
 },
 {
  "id": "l7",
  "who": "a",
  "text": "…"
 }
]
```
