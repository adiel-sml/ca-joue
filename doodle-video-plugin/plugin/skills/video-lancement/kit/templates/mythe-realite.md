# Mythe ou réalité

**Quand l'utiliser** : Démonter des idées reçues, une par une, avec un fait vrai et sourcé.

## Structure

- 0-2 s : « Tu crois encore que… ? », étiquette rouge avec l'idée reçue.
- Par idée reçue (5 à 7 s) : le mythe dit par un personnage sûr de lui (`fier`), tampon « MYTHE » (`judge`, rouge), puis la réalité par l'autre (`doute` puis `joie`), tampon « RÉALITÉ » (vert), un chiffre qui compte si utile (`bigNumber`).
- 3 idées reçues au plus.
- Fin : la source affichée en petit (« Source : … ») et la phrase à retenir.

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
   "id": "accroche",
   "lines": [
    "l1"
   ],
   "mode": "brass"
  },
  {
   "id": "m1",
   "lines": [
    "l2",
    "l3"
   ],
   "mode": "quiz"
  },
  {
   "id": "m2",
   "lines": [
    "l4",
    "l5"
   ],
   "mode": "funk"
  },
  {
   "id": "m3",
   "lines": [
    "l6",
    "l7"
   ],
   "mode": "quizFast"
  },
  {
   "id": "fin",
   "lines": [
    "l8"
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
 },
 {
  "id": "l8",
  "who": "b",
  "text": "…"
 }
]
```
