# Top 5 (ou top 3)

**Quand l'utiliser** : Classer des éléments : 5 astuces, 5 erreurs, 5 lieux, 5 fonctions d'une appli.

## Structure

- 0-2 s : accroche, le numéro 1 est annoncé comme surprenant (« Le numéro 1 va te surprendre »), grosse étiquette du thème.
- Puis 5 blocs de 3 à 5 s, du 5 au 1 : pastille du rang (`stepBadge`), le nom en mot clé (`keyword`), un personnage qui le montre ou le vit, une réaction.
- Le numéro 1 : un silence d'un temps avant, puis révélation (mot de jugement `judge`, éclat `burst`, cymbale).
- Fin (1 à 2 s) : récapitulatif qui se coche (`checklist`) ou question au spectateur (« Et toi, ton numéro 1 ? »).

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
   "id": "n5",
   "lines": [
    "l2"
   ],
   "mode": "funk"
  },
  {
   "id": "n4",
   "lines": [
    "l3"
   ],
   "mode": "funk"
  },
  {
   "id": "n3",
   "lines": [
    "l4"
   ],
   "mode": "quiz"
  },
  {
   "id": "n2",
   "lines": [
    "l5"
   ],
   "mode": "quizFast"
  },
  {
   "id": "n1",
   "lines": [
    "l6"
   ],
   "mode": "popBig",
   "pause": 0.5
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
