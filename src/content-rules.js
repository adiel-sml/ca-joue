/* Règles de chaque jeu : le but, le déroulement étape par étape et les points.
   Affichées la première fois qu'on ouvre un jeu, puis avec le bouton d'information en haut de l'écran. */
export const RULES = {
  mime: {
    but: "Faire deviner un mot à son équipe en le mimant, sans dire un seul mot.",
    steps: [
      "Formez les équipes, choisissez des mots faciles, difficiles ou mélangés, la durée d'un tour et l'objectif : 15, 30 ou 40 points, ou sans limite.",
      "La personne désignée prend le téléphone et lance le chrono. Un mot s'affiche, elle seule le voit.",
      "Elle le mime : interdit de parler, de faire des bruits ou de montrer un objet. Son équipe propose des réponses.",
      "« Trouvé » quand l'équipe a deviné, « Passer » pour changer de mot. On enchaîne jusqu'à la fin du chrono.",
      "À la fin du tour, on corrige si besoin, puis le téléphone passe à l'équipe suivante."
    ],
    pts: "1 point par mot trouvé, pour chaque membre de l'équipe. La première équipe à atteindre l'objectif gagne et reçoit 3 points de plus. À deux, chacun fait deviner à l'autre."
  },
  taboo: {
    but: "Faire deviner un mot avec des phrases, sans prononcer les mots interdits.",
    steps: [
      "Formez les équipes, choisissez la durée d'un tour et l'objectif : 15, 30 ou 40 points, ou sans limite.",
      "La personne désignée lance le chrono. Un mot s'affiche avec quatre mots interdits en rouge.",
      "Elle décrit le mot sans le dire, sans mot de la même famille et sans les mots interdits.",
      "Une personne de l'équipe adverse surveille l'écran et touche « Mot interdit prononcé » à la moindre faute.",
      "À la fin du tour, le récapitulatif rappelle les mots interdits de chaque carte pour vérifier."
    ],
    pts: "1 point par mot trouvé, 1 point en moins par mot interdit prononcé. La première équipe à atteindre l'objectif gagne et reçoit 3 points de plus."
  },
  tu: {
    but: "Faire deviner les mêmes mots pendant trois manches, de plus en plus difficiles.",
    steps: [
      "Formez les équipes et choisissez le nombre de mots de la partie.",
      "Manche 1 : décrire. On fait deviner avec autant de mots qu'on veut, sans dire le mot.",
      "Manche 2 : un seul mot. Un seul indice par mot, l'équipe n'a droit qu'à une proposition.",
      "Manche 3 : mimer. Uniquement des gestes et des bruitages.",
      "Une manche se termine quand tous les mots ont été trouvés. Les mots passés reviennent plus tard."
    ],
    pts: "1 point par mot trouvé, pour chaque membre de l'équipe. L'équipe gagnante reçoit 3 points de plus."
  },
  quiz: {
    but: "Répondre juste à des questions de culture, en équipes.",
    steps: [
      "Formez les équipes, choisissez un thème ou tous les thèmes, puis un objectif de points ou un nombre de questions par équipe.",
      "Chaque équipe reçoit une question à son tour, avec quatre réponses possibles.",
      "L'équipe se met d'accord, puis touche sa réponse. La bonne réponse s'affiche aussitôt.",
      "Quand toutes les questions sont posées, l'appli annonce l'équipe gagnante."
    ],
    pts: "1 point par bonne réponse, pour chaque membre de l'équipe. L'équipe gagnante reçoit 3 points de plus."
  },
  num: {
    but: "Donner l'estimation la plus proche d'un chiffre : une date, une hauteur, une distance, un nombre.",
    steps: [
      "Formez les équipes, puis choisissez un objectif de points ou un nombre de questions.",
      "Une question chiffrée s'affiche. Chaque équipe tape son estimation en secret, pendant que les autres ne regardent pas.",
      "Quand toutes les équipes ont répondu, l'appli révèle la bonne réponse et classe les estimations.",
      "On passe à la question suivante."
    ],
    pts: "L'équipe la plus proche marque 1 point par membre, 2 si elle tombe pile. L'équipe gagnante reçoit 3 points de plus."
  },
  av: {
    but: "Répondre franchement à une question ou relever un défi.",
    steps: [
      "Choisissez le niveau : Chill, Fun, Épicé (séduction, sans sexe) ou +18 (après confirmation que tout le monde est majeur).",
      "La personne affichée choisit Vérité, Action ou Au hasard.",
      "Elle lit la carte à voix haute et répond, ou fait l'action.",
      "Si elle ne peut pas ou ne veut pas, elle touche le joker et choisit un gage à la place.",
      "Le tour passe à la personne suivante."
    ],
    pts: "Vérité : 1 point. Action : 2 points. 1 point de plus en Épicé, 2 de plus en +18."
  },
  nhie: {
    but: "Découvrir ce que les autres ont déjà fait, et avouer ce qu'on a fait soi-même.",
    steps: [
      "Choisissez le niveau : Soft, Fun, Épicé ou +18.",
      "Une personne lit la carte à voix haute : « Je n'ai jamais… ».",
      "Celles et ceux qui l'ont déjà fait se dénoncent en touchant leur personnage, et racontent si le groupe insiste.",
      "Carte suivante."
    ],
    pts: "1 point par aveu."
  },
  wyr: {
    but: "Choisir son camp entre deux options, et éviter d'être dans la minorité.",
    steps: [
      "Choisissez le niveau : Normal, Épicé ou +18.",
      "Lisez le dilemme à voix haute.",
      "Chacun choisit A ou B. On peut voter à main levée, puis entrer les choix de chacun.",
      "Touchez « Résultat » pour voir les deux camps."
    ],
    pts: "La majorité gagne 1 point. La minorité peut prendre un gage. En cas d'égalité, personne ne marque."
  },
  bomb: {
    but: "Ne pas tenir le téléphone quand la bombe explose.",
    steps: [
      "Un thème s'affiche, par exemple « Un pays » ou « Un mot qui contient OU ».",
      "Allumez la mèche. La première personne donne une réponse qui colle au thème, puis passe vite le téléphone à sa gauche.",
      "Pas de répétition et pas d'hésitation : le groupe juge.",
      "La bombe explose au bout d'un temps imprévisible, entre 20 secondes et 1 minute.",
      "On touche le personnage de la personne qui tenait la bombe."
    ],
    pts: "Tous les autres gagnent 1 point. La personne qui a perdu choisit un gage."
  },
  tvm: {
    but: "Trouver l'anecdote inventée parmi trois.",
    steps: [
      "La personne affichée prépare deux anecdotes vraies et une fausse. L'appli propose un thème pour l'inspirer.",
      "Elle annonce ses trois phrases, dans le désordre.",
      "Les autres ont 60 secondes pour poser des questions et la piéger.",
      "Chacun annonce laquelle est fausse, puis elle révèle le mensonge.",
      "On coche les personnes qui ont trouvé, et le tour passe à la suivante."
    ],
    pts: "1 point par bonne réponse. Si personne ne trouve, la personne qui raconte gagne 2 points."
  },
  mys: {
    but: "Tirer des cartes surprises et jouer ce qu'elles demandent.",
    steps: [
      "Touchez « Tirer une carte ». L'appli désigne une ou deux personnes si besoin.",
      "Qui pourrait : à trois, tout le monde pointe quelqu'un. Je n'ai jamais : celles et ceux qui l'ont fait se lèvent.",
      "Défi et duel : on joue, puis on indique le résultat. Patate chaude : chacun son tour, le premier qui sèche perd.",
      "Devinette : la première personne qui trouve marque. Nouvelle règle : elle reste valable jusqu'à la prochaine carte Nouvelle règle."
    ],
    pts: "Défi réussi : 2 points. Duel gagné : 2 points. Patate chaude gagnée : 2 points. Devinette trouvée : 1 point. Défi raté ou duel perdu : un gage."
  },
  uc: {
    but: "Pour les civils, démasquer les intrus. Pour les intrus, survivre sans se faire repérer.",
    steps: [
      "Réglez le nombre d'Undercover et de Mr White, et choisissez les rôles spéciaux.",
      "Chacun découvre son mot en secret. L'Undercover a un mot proche de celui des civils, Mr White n'en a pas.",
      "Dans l'ordre affiché, chacun dit un seul mot pour décrire le sien, puis on débat.",
      "Tout le monde vote. La personne éliminée révèle son rôle, mais son mot reste secret jusqu'à la fin. Mr White éliminé peut encore gagner : il tape le mot des civils et l'appli vérifie sans le dévoiler.",
      "Les civils gagnent quand tous les intrus sont éliminés. Les intrus gagnent s'il ne reste qu'un civil."
    ],
    pts: "Civil gagnant : 2 points. Undercover gagnant : 5 points. Mr White gagnant : 6 points."
  },
  lg: {
    but: "Pour le village, éliminer les loups-garous. Pour les loups, dévorer le village sans se faire prendre.",
    steps: [
      "Réglez le nombre de loups et les rôles spéciaux : Voyante, Sorcière, Chasseur, Cupidon.",
      "Chacun découvre son rôle en secret.",
      "La nuit, posez le téléphone au centre. La voix du meneur réveille chaque rôle à son tour, les autres gardent les yeux fermés.",
      "Le jour, l'appli annonce les morts et leurs rôles. Le village débat 2 minutes, puis vote pour éliminer un suspect.",
      "La partie continue jusqu'à la victoire d'un camp."
    ],
    pts: "Village gagnant : 3 points par villageois. Loups gagnants : 5 points par loup. Amoureux gagnants : 6 points chacun."
  },
  spy: {
    but: "Pour les habitants, démasquer l'espion. Pour l'espion, deviner le lieu sans se faire repérer.",
    steps: [
      "Choisissez un ou deux espions et la durée de l'enquête.",
      "Chacun découvre en secret le lieu, ou son rôle d'espion.",
      "La personne désignée pose une question sur le lieu à quelqu'un de son choix, sans le nommer. Celle qui répond pose la question suivante.",
      "À tout moment, le groupe peut passer au vote. Si l'espion est démasqué, il a une dernière chance de deviner le lieu dans une liste.",
      "L'espion peut aussi se dévoiler de lui-même pour tenter de deviner le lieu."
    ],
    pts: "Habitants gagnants : 2 points chacun. Espion gagnant : 4 points."
  },
  most: {
    but: "Désigner la personne du groupe qui correspond le mieux à la carte.",
    steps: [
      "Choisissez le niveau : Soft, Épicé ou +18.",
      "Lisez la carte à voix haute, par exemple « Le plus susceptible de rater son avion ».",
      "Vote secret : le téléphone passe de main en main, chacun touche la personne de son choix, sauf soi-même.",
      "À main levée : à trois, tout le monde pointe quelqu'un, puis on touche la personne la plus désignée.",
      "Le résultat affiche la personne élue et le détail des voix."
    ],
    pts: "En vote secret, 1 point pour chaque personne qui a voté comme la majorité. La personne élue peut prendre un gage."
  },
  dico: {
    but: "Inventer une fausse définition assez crédible pour piéger les autres, et trouver la vraie.",
    steps: [
      "Un mot rare s'affiche. Si quelqu'un connaît déjà sa définition, changez de mot.",
      "Le téléphone passe de main en main : chacun écrit en secret une fausse définition.",
      "Une personne lit toutes les définitions à voix haute, la vraie comprise, sans rire.",
      "Chacun vote pour la définition qu'il croit vraie. Sa propre définition n'apparaît pas.",
      "La vraie définition est révélée, avec l'auteur de chaque fausse définition."
    ],
    pts: "2 points pour avoir trouvé la vraie définition. 1 point par voix reçue sur ta fausse définition."
  },
  chain: {
    but: "Trouver vite un mot lié au précédent, sans jamais sécher.",
    steps: [
      "Choisissez le temps par mot : 3, 5 ou 8 secondes. Posez le téléphone au milieu.",
      "Un mot de départ s'affiche. La personne indiquée dit un mot lié, par exemple « plage », puis « sable », puis « château ».",
      "Elle touche le bouton avant la fin du chrono, et c'est au tour de la suivante.",
      "Perdu si le chrono se termine, si le mot a déjà été dit ou s'il n'a aucun lien : le groupe peut contester."
    ],
    pts: "Tous les autres gagnent 1 point. La personne qui a perdu choisit un gage."
  },
  know: {
    but: "Prouver que vous vous connaissez par cœur.",
    steps: [
      "Choisissez les deux personnes du couple et le nombre de questions.",
      "Chacun son tour, l'un répond à voix haute à une question sur l'autre.",
      "L'autre dit si c'est juste : « Bonne réponse » ou « Raté ».",
      "À la fin, l'appli donne votre score de complicité."
    ],
    pts: "1 point au classement par bonne réponse."
  },
  future: {
    but: "Comparer vos visions de l'avenir à deux.",
    steps: [
      "Choisissez le couple et le nombre de questions.",
      "Une question s'affiche, par exemple « Dans dix ans, dans quelle ville vivons-nous ? ».",
      "Le premier écrit sa réponse en secret, puis le second, sans regarder. On peut aussi répondre à voix haute en même temps.",
      "Les deux réponses s'affichent. Même vision ou sujet à discuter ?",
      "À la fin, l'appli donne votre pourcentage de vision commune."
    ],
    pts: "Chaque accord rapporte 1 point à chacun."
  },
  who2: {
    but: "Voir si vous êtes d'accord sur qui fait quoi dans le couple.",
    steps: [
      "Choisissez le couple, puis le niveau : Tendre, Épicé ou +18.",
      "Lisez la carte : « Qui de nous deux… ronfle le plus fort ? ».",
      "À trois, chacun pointe la personne qui correspond, soi-même ou l'autre.",
      "Si vous désignez la même personne, touchez son personnage. Sinon, touchez « Pas d'accord ».",
      "Terminez quand vous voulez pour voir votre bilan."
    ],
    pts: "Pas de points : le bilan montre votre taux d'accord et qui a été désigné le plus souvent."
  },
  wave: {
    but: "Faire les mêmes choix sans vous concerter.",
    steps: [
      "Choisissez le couple, le nombre de dilemmes et le niveau.",
      "Un dilemme de Tu préfères s'affiche. Le premier choisit A ou B en secret.",
      "Le second fait son choix à son tour, sans avoir vu celui de l'autre.",
      "Les deux choix s'affichent. À la fin, l'appli donne votre pourcentage d'accord."
    ],
    pts: "Même choix : 1 point chacun."
  },
  dare2: {
    but: "Relever des défis à deux, du plus tendre au plus osé.",
    steps: [
      "Choisissez le couple, puis le niveau : Tendre, Épicé ou +18.",
      "Chacun son tour reçoit un défi à faire avec l'autre.",
      "« Défi relevé » s'il est fait, « Passer » sinon. Chacun peut refuser une carte sans se justifier.",
      "Terminez quand vous voulez pour voir le bilan."
    ],
    pts: "1 point par défi relevé."
  },
  talk: {
    but: "Parler vraiment, et mieux vous connaître.",
    steps: [
      "Choisissez le couple, puis le niveau : Légères, Souvenirs ou Profondes.",
      "Une question s'affiche. L'un répond en premier, puis l'autre.",
      "Prenez votre temps, rebondissez, posez d'autres questions.",
      "Passez à la question suivante quand vous voulez."
    ],
    pts: "Pas de points, pas de gagnant."
  }
};
