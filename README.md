# Ça Joue

Douze jeux de soirée sur un seul téléphone qu'on se passe. Gratuit, sans compte, sans publicité, utilisable hors ligne.

L'appli s'installe sur l'écran d'accueil du téléphone ou de la tablette (iPhone, iPad, Android) comme une appli classique : plein écran, icône, fonctionnement sans réseau. Sur tablette, la mise en page s'élargit et l'appli fonctionne en portrait comme en paysage.

## Les jeux

| Jeu | Joueurs | Principe | Contenu |
|---|---|---|---|
| **En équipes** | | | |
| Mimes | dès 2 | Faire deviner sans parler, au chrono. Mots faciles, difficiles ou mélangés. | 410 mots faciles, 215 difficiles |
| Mot interdit | dès 2 | Faire deviner un mot sans dire les 4 mots interdits. | 249 cartes |
| Time's Up | dès 4 | Trois manches avec les mêmes mots : décrire, un seul mot, mimer. | 335 mots |
| Quiz | dès 2 | Questions à 4 choix, chaque équipe à son tour. | 165 questions |
| **Tous ensemble** | | | |
| Action ou Vérité | dès 2 | Quatre niveaux : Chill, Fun, Épicé, +18. | 409 cartes |
| Je n'ai jamais | dès 3 | Quatre niveaux, 1 point par aveu. | 200 cartes |
| Tu préfères | dès 3 | Trois niveaux. La majorité gagne, la minorité prend un gage. | 170 dilemmes |
| La Bombe | dès 3 | Répondre au thème et passer le téléphone avant l'explosion. | 243 thèmes |
| 2 vérités, 1 mensonge | dès 2 | Trouver l'anecdote inventée. | 40 thèmes d'inspiration |
| Jeu mystère | dès 2 | Qui pourrait, Je n'ai jamais, défis, duels, patate chaude, devinettes, règles. | 211 cartes |
| **Rôles secrets** | | | |
| Undercover | dès 3 | Démasquer l'intrus. Rôles spéciaux au choix : Boss, Fantôme, Amoureux, Vengeur, Bouclier, Clown. | 293 paires de mots |
| Loup-garou | dès 5 | L'appli fait le meneur, avec une voix qui annonce la nuit, les morts, le débat et le vote. Voyante, Sorcière, Chasseur, Cupidon. | |

## Fonctionnalités

- **Joueurs** avec prénom, sexe et personnage illustré. Le sexe sert à adapter les cartes : bisous entre fille et garçon, accords « la reine » ou « le roi ».
- **Classement de la soirée** : les points de tous les jeux s'additionnent.
- **Gages au choix** : deux gages tirés au sort, plus « Le groupe choisit le gage ». Proposés quand un joueur refuse une carte, rate un défi, perd un duel, perd à La Bombe ou se retrouve dans la minorité de Tu préfères. 100 gages et 25 gages épicés.
- **Pas de répétition** : une carte ne revient qu'une fois tout le paquet passé, même d'une soirée à l'autre.
- **Niveau +18** protégé par une confirmation, dans Action ou Vérité, Je n'ai jamais et Tu préfères.
- **Chrono** avec bips des 5 dernières secondes, vibration à la fin et bouton d'arrêt.
- **Écran toujours allumé** pendant la partie, quand le téléphone le permet.

## Installer sur le téléphone

- **iPhone** : ouvrir le site dans Safari, bouton Partager en bas de l'écran, puis **Sur l'écran d'accueil**.
- **iPad** : ouvrir le site dans Safari, bouton Partager en haut à droite, puis **Sur l'écran d'accueil**.
- **Android** : ouvrir le site dans Chrome, puis le bouton **Installer** de l'appli, ou le menu, puis **Installer l'application**.

## Lancer en local

Il faut [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install
npm run dev        # http://localhost:5173, accessible aussi depuis un téléphone sur le même Wi-Fi
npm run build      # version de production dans dist/
npm run preview    # teste la version de production (installation et hors ligne compris)
```

## Mise en ligne avec Vercel

1. Sur [vercel.com](https://vercel.com), **Add New**, puis **Project**, et importer le dépôt `ca-joue`.
2. Garder le preset **Vite** : commande `npm run build`, dossier `dist`. Cliquer sur **Deploy**.
3. Chaque push sur `main` met le site à jour. L'appli installée se met à jour à la prochaine ouverture.

## Structure

| Fichier | Rôle |
|---|---|
| `src/main.js` | Écrans, navigation et règles de tous les jeux. |
| `src/content.js` | Liste des jeux, Mimes, Mot interdit, Action ou Vérité, gages, Undercover, Jeu mystère. |
| `src/content-plus.js`, `src/content-more.js` | Cartes supplémentaires, fusionnées avec les listes de base sans doublons. |
| `src/content-games.js` | Time's Up, La Bombe, Tu préfères, Je n'ai jamais, Quiz, rôles du Loup-garou. |
| `src/styles.css` | Le design. |
| `src/avatars.js` | Les personnages des joueurs. |
| `src/icons.js` | Les icônes utilisées. |
| `android/`, `ios/` | Projets natifs Capacitor, pour une future publication sur les stores. |

### Écrire des cartes

- `{joueur}` : un autre joueur au hasard ;
- `{opp}` : un joueur du sexe opposé, sinon un autre joueur ;
- `{p1}`, `{p2}` : les joueurs tirés pour une carte mystère ;
- `{forme féminine|forme masculine}` : accord selon le joueur concerné, par exemple `{la reine|le roi}`. Pour un autre joueur : `{elle|il:opp}`.

Les doublons sont écartés automatiquement à la fusion des listes.

## Crédits

- Personnages : [Open Peeps](https://www.openpeeps.com) de Pablo Stanley, licence CC0, assemblés avec [DiceBear](https://www.dicebear.com).
- Icônes : [Lucide](https://lucide.dev), licence ISC.
- Polices : Dela Gothic One et Figtree, licence SIL Open Font License.
