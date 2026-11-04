# 3 erreurs à éviter

**Quand l'utiliser** : Prévenir : les erreurs fréquentes et ce qu'il faut faire à la place.

## Structure

- 0-2 s : « 3 erreurs que tout le monde fait avec… », grosse étiquette, personnage `gene`.
- Par erreur (4 à 6 s) : le personnage la commet (pose, accessoire), croix rouge ou « ERREUR » (`judge`), puis la bonne façon par l'autre personnage, coche verte.
- La pire en dernier.
- Fin : récapitulatif des 3 bonnes façons qui se cochent.

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
   "id": "e1",
   "lines": [
    "l2",
    "l3"
   ],
   "mode": "funk"
  },
  {
   "id": "e2",
   "lines": [
    "l4",
    "l5"
   ],
   "mode": "funk"
  },
  {
   "id": "e3",
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
   "mode": "popBig"
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
