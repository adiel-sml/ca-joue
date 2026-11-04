# Témoignage

**Quand l'utiliser** : Une personne raconte ce qui lui est arrivé, en vrai ou en exemple.

## Structure

- 0-2 s : la phrase la plus forte du témoignage, en premier, plan serré.
- Le contexte en 2 ou 3 répliques, avec le lieu (salon, bureau, rue) et des scènes rejouées par d'autres personnages.
- Le moment difficile (`triste`, musique plus calme `dream` ou `sweet`), puis le déclic.
- La leçon ou le conseil, regard caméra, mot clé.
- Pas de faux témoignage présenté comme réel : si c'est un exemple, le dire à l'écran (« histoire inspirée de… »).

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
   "id": "phrase",
   "lines": [
    "l1"
   ],
   "mode": "sparse"
  },
  {
   "id": "contexte",
   "lines": [
    "l2",
    "l3"
   ],
   "mode": "sweet"
  },
  {
   "id": "dur",
   "lines": [
    "l4"
   ],
   "mode": "dream"
  },
  {
   "id": "declic",
   "lines": [
    "l5",
    "l6"
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
 }
]
```
