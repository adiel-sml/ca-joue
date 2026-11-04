# Tuto en 3 étapes

**Quand l'utiliser** : Apprendre à faire quelque chose : une recette, un réglage, une démarche.

## Structure

- 0-2 s : le résultat final d'abord (« Voilà ce que tu vas obtenir »), puis « en 3 étapes ».
- Une étape par réplique (4 à 6 s) : pastille numérotée, le geste montré par le personnage (`hold`, `point`), le point clé en mot clé, une flèche (`arrow`) si un détail compte.
- Le piège à éviter : un personnage se trompe (`gene`), l'autre corrige.
- Fin : récapitulatif qui se coche, résultat montré de nouveau.

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
   "id": "resultat",
   "lines": [
    "l1"
   ],
   "mode": "brass"
  },
  {
   "id": "e1",
   "lines": [
    "l2"
   ],
   "mode": "funk"
  },
  {
   "id": "e2",
   "lines": [
    "l3"
   ],
   "mode": "funk"
  },
  {
   "id": "e3",
   "lines": [
    "l4"
   ],
   "mode": "funk"
  },
  {
   "id": "piege",
   "lines": [
    "l5",
    "l6"
   ],
   "mode": "quiz"
  },
  {
   "id": "fin",
   "lines": [
    "l7"
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
 }
]
```
