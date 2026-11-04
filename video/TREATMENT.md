# Ça Joue : film de lancement (style Game Show Flat)

Vertical 1080×1920, 24 fps, environ 46 s (la durée suit la voix). Voix off : l'utilisateur (enregistrement), voix de synthèse provisoire en attendant. Sous-titres en plaques de télop, mot par mot. Vrais écrans de l'appli, filmés image par image, dans un téléphone dessiné.

## 1. Trois structures

1. **La soirée en quatre manches.** Un plateau vide, trois mascottes qui s'ennuient. Le téléphone tombe du ciel, puis chaque catégorie de l'appli devient une manche avec sa carte de titre et son verbe répété en rythme. Fin sur une photo de groupe. Clair, une idée par manche, colle aux quatre catégories réelles de l'appli.
2. **Une seule manche qui s'emballe.** La bombe passe de main en main sur toute la durée, de plus en plus vite, chaque passe révèle un nom de jeu. Fort en tension mais un seul jeu domine et les jeux en couple ou à rôles secrets n'ont pas leur place.
3. **Le tableau des scores à l'envers.** Le compteur affiche 23 puis redescend jeu par jeu jusqu'à 0, « à vous de jouer ». Très graphique mais froid : peu de personnages, peu de soirée.

**Choix : 1.** Les quatre catégories existent dans l'appli (En équipes, Tous ensemble, Rôles secrets, En couple), le format manche par manche est la grammaire native du style, et la voix off suit naturellement une ligne par manche. La bombe de la structure 2 devient le verbe de la manche 2, le compteur de la structure 3 devient le « 23 » de la révélation.

## 2. Logline et arc

Trois mascottes en forme de cartes à jouer s'ennuient un soir ; un téléphone tombe du ciel et transforme le plateau en émission de jeux, manche après manche, jusqu'à la photo de groupe.

- **Mise en place** : plateau vide, haussement d'épaules, « ? ».
- **Bascule** : le téléphone atterrit, l'écran s'allume, 23 jeux pleuvent.
- **Fin** : la même scène qu'au début, mais pleine, figée en photo, avec l'adresse.

## 3. Référence (grammaire seulement)

- Les bandes-annonces de packs de jeux de soirée à animateur : un jeu, une phrase, une image de jeu réelle, rythme serré, logo à la fin.
- Les télops des émissions de variétés japonaises : plaques épaisses, mots qui claquent, cartes de manche.
- **À ne pas prendre** : personnages, polices, interfaces, jingles ou plans de ces œuvres ; rien du style de la vidéo de référence de l'utilisateur au-delà de l'idée générale (mascotte originale, sous-titres mot par mot, étiquettes à ombre dure).

## 4. Distribution

Trois mascottes, une seule construction : un corps de carte à jouer arrondi (les trois cartes du logo de l'appli), bras courts, mains en moufle, yeux ovales avec reflet, bouche qui s'ouvre.

| Mascotte | Couleur (de l'appli) | Accessoire |
|---|---|---|
| Bleue | `#3a86ff` | lunettes rondes |
| Rouge | `#ff4d6d` | chapeau de fête |
| Jaune | `#ffbe0b` | nœud papillon |

Jamais une mascotte sur un décor de sa propre teinte.

## 5. Découpage

Tempo fixe 120 BPM, une mesure = 2 s. Chaque section commence sur une barre de mesure. La durée des sections se recalcule en mesures entières à partir de la durée réelle de chaque ligne de voix (`timeline.mjs`).

| # | Section | Mesures (provisoire) | Décor | Cadre et mouvement | Pourquoi |
|---|---|---|---|---|---|
| 1 | Accroche | 0–1.5 | menthe, rayures | plan large frontal fixe, coup de zoom sur le « ? » | le problème en une image, lisible en vignette |
| 2 | Silence, chute du téléphone | 1.5–2 | menthe | le cadre tremble à l'atterrissage | le premier son après le silence est l'objet du film |
| 3 | Révélation, 23 jeux | 2–4.5 | marine, soleil or | travelling vertical du ciel au sol pendant que les icônes tombent | l'échelle de l'offre |
| 4 | Manche 1, En équipes | 4.5–7 | mandarine, rayures | carte de manche, puis plan moyen sur la bleue qui mime ; zoom brusque sur l'écran | le verbe : faire deviner |
| 5 | Manche 2, Tous ensemble | 7–9.5 | vert, pois | plan large, la bombe passe en noires puis en croches | l'accélération est l'intrigue |
| 6 | Manche 3, Rôles secrets | 9.5–12 | nuit sarcelle, lune | poussée lente vers les masques, un seul visage diffère | le secret |
| 7 | Manche 4, En couple | 12–13.5 | rose, soleil | scène partagée, deux mascottes face à face | deux camps qui se répondent |
| 8 | Le gage | 13.5–15 | rouge | une mesure de silence, puis « GAGE ! » tamponné, coup de zoom | le pic du film, le mot du jugement |
| 9 | Sans réseau | 15–16 | ciel | gros plan sur le téléphone, barres de réseau barrées, la partie continue | une vraie promesse de l'appli |
| 10 | Final | 16–20 | menthe (retour) | toutes les mascottes sautent, flash, l'image devient un polaroïd sur une carte, adresse | la fin répond au début |

Les vrais écrans apparaissent dans le téléphone dans les sections 3, 4, 5, 6, 7, 8 et 9. Chaque écran de manche rétrécit en vignette dans une fente en bas d'écran, et les vignettes rebondissent ensemble au final.

## 6. Carte des repères

- 120 BPM, 4/4, accord pop majeur par mesure (I–V–vi–IV en do, montée d'un ton au final).
- Saveur par section : accroche basse et claquements seuls ; révélation cuivres et cymbale ; manche 1 funk ; manche 2 quiz électro qui double ; manche 3 version rêveuse avec cloches de boîte à musique ; manche 4 nappe triangle et boîte à musique ; gage une mesure à vide puis cymbale ; final batterie complète et transposition.
- Chaque apparition, chute, tampon, passe de bombe, icône et coup de zoom est un événement `EV` à une position (mesure, temps) ; la musique et les bruitages sont générés à partir de cette liste.
- Lignes de voix : début sur le premier temps de leur section, ou un demi-temps après une carte de manche.

## 7. Son

| Section | Ambiance | Bruitages | Musique |
|---|---|---|---|
| Accroche | rumeur de salon très basse | pop du « ? », bâillement en sifflet | basse et claquement |
| Chute | silence complet | sifflement de chute, gros boum | coupée |
| Révélation | aucune | une note par icône (mélodie montante), cymbale à 23 | cuivres |
| Manche 1 | aucune | jingle de carte, couinements de mime | funk |
| Manche 2 | aucune | tic-tac, passes, petite explosion en bouffée | quiz électro accéléré |
| Manche 3 | grillons synthétiques | cloche, masques qui claquent | rêveuse |
| Manche 4 | aucune | cœurs qui poppent, carillon | boîte à musique |
| Gage | silence d'une mesure | tampon, cymbale | reprise sur le tampon |
| Sans réseau | aucune | bip de réseau perdu, ding de bonne réponse | légère |
| Final | foule synthétique | saut, déclic d'appareil photo, flash | complète, un ton plus haut |

Deux silences : avant la chute du téléphone et avant le gage. Deux transitions par le son : le sifflement de chute commence avant la coupe vers la révélation, et le jingle de carte de la manche 1 démarre sous la fin de la révélation.

## 8. Titres et sous-titres

- Police Fredoka 700, texte blanc ou jaune, contour encre à 14 % de la taille, peint sous le remplissage.
- Sous-titres : une plaque crème à ombre dure en bas d'écran, la ligne dite s'y écrit mot par mot, le mot en cours en jaune contour encre. Jamais sur les mascottes : le sol passe au-dessus de la plaque.
- Cartes de manche : « MANCHE 1 » + nom de la catégorie, une mesure, sur un jingle.
- Pas d'emoji, pas de tiret long, pas de mention IA dans l'image.
- Écran final : logo de l'appli (les trois cartes), « Ça Joue », l'adresse `ca-joue-rho.vercel.app`, tenus au moins 4 s.

## 9. Changements au montage

- **Durée** : 46 s avec la voix provisoire. Le contrôle du temps de lecture a demandé une mesure de plus pour la manche En couple et pour « Sans réseau ». La durée finale suivra le débit de la voix enregistrée.
- **Bandeau de manche** : le nom de la catégorie reste en haut de l'écran pendant toute la manche, après la carte d'une mesure.
- **Étiquettes** : placées en bas sur les côtés du téléphone, là où les vrais écrans sont vides, pour ne jamais cacher le contenu de l'appli.
- **Sans réseau** : le téléphone seul dans les nuages, sans les mascottes, en plan rapproché.
- **Vignettes au final** : abandonnées ; la photo de groupe suffit à faire écho à l'ouverture.
- **Deux textes plus courts que la règle de lecture**, gardés volontairement : « Time's Up » (1,6 s, dit et sous-titré en même temps) et le mot de jugement « GAGE ! » (1 s, lu d'un coup d'œil, ce que le style autorise).
- **Comparaison avec la démo du style** : structure (4 manches et une voix off contre 7 niveaux sans narration), ouverture (cartes qui s'ennuient contre décompte), plan signature (pluie des 23 jeux dans le téléphone), mouvements de caméra (bascule, travelling vertical, zoom brusque, poussée lente, contre aucun), partition (120 BPM en do contre 150 BPM), fin (photo polaroïd contre bulletin de notes) : les six diffèrent.
