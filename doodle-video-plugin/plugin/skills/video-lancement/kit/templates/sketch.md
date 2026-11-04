# Sketch dialogué

**Quand l'utiliser** : Une situation drôle entre deux ou trois personnages, avec une chute.

## Structure

- 0-2 s : la situation lancée par une réplique qui intrigue, plan large puis gros plan.
- Montée : répliques courtes qui se répondent (une phrase chacune), un plan par réplique (`dialogueCam`), réactions de celui qui écoute (`listen`), une escalade (l'enjeu monte trois fois).
- Un temps de silence (pause d'un temps dans story.json) juste avant la chute.
- La chute : surprise visuelle (accessoire, entrée d'un personnage, `judge`), réaction exagérée (`surprise`, `rire`).
- Coupe 1 s après la chute.

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
   "id": "situation",
   "lines": [
    "l1",
    "l2"
   ],
   "mode": "funk"
  },
  {
   "id": "escalade",
   "lines": [
    "l3",
    "l4",
    "l5",
    "l6"
   ],
   "mode": "quiz"
  },
  {
   "id": "chute",
   "lines": [
    "l7"
   ],
   "mode": "popBig",
   "pause": 0.5
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
