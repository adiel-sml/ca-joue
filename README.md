# Ça Joue !

Six jeux de soirée sur un seul téléphone qu'on se passe : **Mimes**, **Mot interdit**, **Action ou Vérité** (de Chill à +18), **2 vérités, 1 mensonge**, **Undercover** (avec rôles spéciaux) et **Jeu mystère**. Classement de la soirée commun à tous les jeux. Gratuit, sans compte, sans pub, fonctionne hors ligne.

Le code est une appli web (HTML/CSS/JavaScript, sans framework) construite avec [Vite](https://vitejs.dev) et emballée en appli iPhone et Android avec [Capacitor](https://capacitorjs.com).

## Structure

| Dossier / fichier | Rôle |
|---|---|
| `src/content.js` | Tout le contenu : mots des mimes, cartes Mot interdit, Action ou Vérité, paires Undercover, cartes mystère. C'est ici qu'on ajoute des cartes. |
| `src/main.js` | La logique des écrans et des jeux. |
| `src/styles.css` | Le design. |
| `android/`, `ios/` | Projets natifs générés par Capacitor. |
| `assets/` | Icône et écran de démarrage sources (régénérer avec `npm run icons`). |

### Gabarits des cartes

Dans `src/content.js` :

- `{joueur}` : un autre joueur au hasard ;
- `{opp}` : un joueur du sexe opposé (sinon un autre joueur) ;
- `{p1}`, `{p2}` : joueurs tirés pour les cartes mystère ;
- `{forme féminine|forme masculine}` : accord selon le joueur concerné, par ex. `{la reine|le roi}`. Pour un autre joueur : `{elle|il:opp}`.

## Lancer en local

Il faut [Node.js](https://nodejs.org) 20 ou plus.

```bash
npm install
npm run dev        # ouvre http://localhost:5173, accessible aussi depuis le téléphone sur le même Wi-Fi
npm run build      # version de production dans dist/
```

## Site web gratuit (GitHub Pages)

Le workflow `.github/workflows/pages.yml` publie l'appli à chaque push sur `main`.
Activer une fois : **Settings → Pages → Source : GitHub Actions**.
GitHub Pages sur un dépôt privé demande un compte GitHub payant ; sinon, rendre le dépôt public.

## Android (Google Play)

Prérequis : [Android Studio](https://developer.android.com/studio).

```bash
npm run android    # build web + synchronisation + ouvre Android Studio
```

Dans Android Studio : **Build → Generate Signed App Bundle** pour obtenir le `.aab` à envoyer sur la [Google Play Console](https://play.google.com/console) (inscription unique : 25 $).
Le workflow CI produit aussi un APK de test à chaque push (onglet *Actions* → artefact `ca-joue-debug-apk`), installable directement sur un Android.

## iPhone (App Store)

Prérequis : un Mac avec Xcode et [CocoaPods](https://cocoapods.org) (`sudo gem install cocoapods`), et un compte Apple Developer (99 $/an).

```bash
npm run ios        # build web + synchronisation + ouvre Xcode
```

Dans Xcode : choisir l'équipe de signature, puis **Product → Archive** et envoyer sur App Store Connect.

## Avant la publication sur les stores

- **Identifiant** : `app.cajoue.soiree` dans `capacitor.config.json`. À changer avant la première publication si besoin (impossible ensuite).
- **Contenu +18** : le niveau +18 d'Action ou Vérité contient du contenu sexuel explicite. Apple refuse le contenu « ouvertement sexuel » (règle 1.1.4) et Google Play encadre fortement le contenu sexuel. Pour les stores, prévoir une version sans le niveau +18 (ou adoucie) et une classification 17+ / PEGI 18 au questionnaire d'âge. Le site web peut garder la version complète.
- **Politique de confidentialité** : obligatoire sur les deux stores. L'appli ne collecte rien (prénoms et scores restent sur le téléphone), une page simple suffit.
- **Captures d'écran** : téléphone, 3 à 8 par store.
