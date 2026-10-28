# Ça Joue

Six jeux de soirée sur un seul téléphone qu'on se passe : **Mimes**, **Mot interdit**, **Action ou Vérité** (de Chill à +18), **2 vérités, 1 mensonge**, **Undercover** avec rôles spéciaux et **Jeu mystère**. Un classement additionne les points de tous les jeux. Gratuit, sans compte, sans publicité, utilisable hors ligne.

L'appli s'installe sur l'écran d'accueil du téléphone (iPhone et Android) comme une appli classique : plein écran, icône, fonctionnement sans réseau.

## Lancer en local

Il faut [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install
npm run dev        # http://localhost:5173, accessible aussi depuis un téléphone sur le même Wi-Fi
npm run build      # version de production dans dist/
npm run preview    # teste la version de production (installation et hors ligne compris)
```

## Mise en ligne avec Vercel

1. Sur [vercel.com](https://vercel.com), **Add New → Project**, puis importer le dépôt `ca-joue`.
2. Vercel détecte Vite tout seul : commande `npm run build`, dossier `dist`. Cliquer sur **Deploy**.
3. Chaque push sur `main` met le site à jour. L'appli installée se met à jour à la prochaine ouverture.

## Installer sur le téléphone

- **iPhone** : ouvrir le site dans Safari, bouton Partager, puis **Sur l'écran d'accueil**.
- **Android** : ouvrir le site dans Chrome, puis le bouton **Installer** de l'appli, ou le menu, puis **Installer l'application**.

## Structure

| Fichier | Rôle |
|---|---|
| `src/content.js` | Tout le contenu : mots, cartes, paires Undercover, cartes mystère, rôles spéciaux. |
| `src/main.js` | Écrans, navigation et règles des jeux. |
| `src/styles.css` | Le design. |
| `src/avatars.js` | Les personnages des joueurs. |
| `src/icons.js` | Les icônes utilisées. |
| `android/`, `ios/` | Projets natifs Capacitor, pour une future publication sur les stores. |

### Écrire des cartes

Dans `src/content.js` :

- `{joueur}` : un autre joueur au hasard ;
- `{opp}` : un joueur du sexe opposé, sinon un autre joueur ;
- `{p1}`, `{p2}` : les joueurs tirés pour une carte mystère ;
- `{forme féminine|forme masculine}` : accord selon le joueur concerné, par exemple `{la reine|le roi}`. Pour un autre joueur : `{elle|il:opp}`.

## Crédits

- Personnages : [Open Peeps](https://www.openpeeps.com) de Pablo Stanley, licence CC0, assemblés avec [DiceBear](https://www.dicebear.com).
- Icônes : [Lucide](https://lucide.dev), licence ISC.
- Polices : Dela Gothic One et Figtree, licence SIL Open Font License.
