/* Contenu des jeux en couple. Gabarits : {p1} = la personne dont c'est le tour, {p2} = l'autre ; {f|h} et {f|h:p2} pour les accords. */
const L = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);
const P = s => L(s).map(l => l.split("|").map(x => x.trim()));

/* Tu me connais ? : une question sur {p2}, à laquelle {p1} répond */
export const KNOW = L(`
Quel est le plat préféré de {p2} ?
Quelle est la plus grande peur de {p2} ?
Quel est le film préféré de {p2} ?
Quelle série {p2} pourrait-{elle|il:p2} revoir en boucle ?
Quelle est la couleur préférée de {p2} ?
Quelle est la pointure de {p2} ?
Quel est le parfum de glace préféré de {p2} ?
Comment {p2} prend-{elle|il:p2} son café ou son thé ?
Quelle est la chanson que {p2} chante sous la douche ?
Quel est le dessert préféré de {p2} ?
Quel aliment {p2} déteste-t-{elle|il:p2} par-dessus tout ?
Quel était le métier de rêve de {p2} quand {elle|il:p2} était enfant ?
Quel est le deuxième prénom de {p2}, s'{elle|il:p2} en a un ?
Quelle est la ville natale de {p2} ?
Quel est le plus vieux souvenir de {p2} ?
Quel est le surnom d'enfance de {p2} ?
Quelle est la boisson préférée de {p2} en soirée ?
Quel animal {p2} rêverait-{elle|il:p2} d'avoir ?
Quel super-pouvoir {p2} choisirait-{elle|il:p2} ?
Quel pays {p2} rêve-t-{elle|il:p2} de visiter ?
Quel est le plus beau voyage de {p2} ?
Quelle est l'appli que {p2} ouvre le plus ?
Quelle est la célébrité préférée de {p2} ?
Quel chanteur ou quel groupe {p2} écoutait-{elle|il:p2} à 15 ans ?
Quel est le plus gros défaut de {p2}, selon {elle|lui:p2} ?
Quelle est la plus grande qualité de {p2}, selon {elle|lui:p2} ?
Qu'est-ce qui énerve le plus {p2} au quotidien ?
Qu'est-ce qui fait rire {p2} à coup sûr ?
Qu'est-ce qui rend {p2} triste sans raison ?
Comment {p2} se détend-{elle|il:p2} après une longue journée ?
Quel est le sport préféré de {p2} ?
Quel sport {p2} déteste-t-{elle|il:p2} ?
Quel est le livre préféré de {p2} ?
Quel est le dessin animé préféré de {p2} enfant ?
Quel est le jeu de société préféré de {p2} ?
À quel jeu {p2} est-{elle|il:p2} {la plus mauvaise perdante|le plus mauvais perdant:p2} ?
Quel est le plus grand rêve de {p2} ?
Quelle est la plus grande fierté de {p2} ?
Quel est le plus grand regret de {p2} ?
Quel est le pire job qu'ait fait {p2} ?
Quel est le prénom du meilleur ami ou de la meilleure amie d'enfance de {p2} ?
Qui {p2} appelle-t-{elle|il:p2} en premier quand {elle|il:p2} a une bonne nouvelle ?
Qui {p2} appelle-t-{elle|il:p2} en premier quand ça ne va pas ?
Quelle est la tâche ménagère que {p2} déteste le plus ?
Quelle est la tâche ménagère que {p2} préfère ?
De quel côté du lit {p2} préfère-t-{elle|il:p2} dormir ?
Combien de réveils {p2} met-{elle|il:p2} le matin ?
À quelle heure {p2} se couche-t-{elle|il:p2} en semaine ?
Quel est le petit-déjeuner idéal de {p2} ?
Quel est le plat que {p2} cuisine le mieux ?
Quel est le plat que {p2} rate toujours ?
Quelle est l'odeur préférée de {p2} ?
Quel est le parfum que porte {p2} ?
Quelle est la saison préférée de {p2} ?
Quel est le jour préféré de la semaine de {p2} ?
Quelle est la fête préférée de {p2} ?
Quel cadeau ferait le plus plaisir à {p2} en ce moment ?
Quel est le pire cadeau que {p2} ait reçu ?
Quel est le plus beau cadeau que {p2} ait reçu ?
Quelle est la marque de vêtements préférée de {p2} ?
Quel vêtement {p2} porte-t-{elle|il:p2} le plus souvent ?
Quel vêtement {p2} ne jettera jamais ?
Quelle est la coupe de cheveux la plus ratée de {p2} ?
Quel est l'objet que {p2} perd tout le temps ?
Quel est l'objet dont {p2} ne pourrait pas se passer ?
Quelle est la première chose que {p2} fait en se réveillant ?
Quelle est la dernière chose que {p2} fait avant de dormir ?
Quel est le tic de langage de {p2} ?
Quel mot {p2} prononce-t-{elle|il:p2} de travers ?
Quelle est l'expression préférée de {p2} ?
Quel est l'acteur ou l'actrice qui jouerait {p2} dans un film ?
Quel est le personnage de fiction auquel {p2} s'identifie ?
Quel est le plus gros caprice de {p2} ?
De quoi {p2} parle-t-{elle|il:p2} pendant des heures ?
Quel sujet ennuie {p2} à mourir ?
Qu'est-ce qui angoisse le plus {p2} en avion ?
Quel insecte {p2} déteste-t-{elle|il:p2} le plus ?
Quel est le pire souvenir d'école de {p2} ?
Quelle matière {p2} préférait-{elle|il:p2} à l'école ?
Quelle matière {p2} détestait-{elle|il:p2} ?
Quel est le premier concert de {p2} ?
Quelle est la chanson qui donne envie de danser à {p2} ?
Quelle chanson rend {p2} nostalgique ?
Quel est le restaurant préféré de {p2} ?
Quelle cuisine du monde {p2} préfère-t-{elle|il:p2} ?
Pizza ou burger, que choisirait {p2} ?
Mer ou montagne, que choisirait {p2} ?
Chat ou chien, que choisirait {p2} ?
Ville ou campagne, que choisirait {p2} ?
Sucré ou salé, que choisirait {p2} ?
Lève-tôt ou couche-tard, que dirait {p2} ?
Douche ou bain, que choisirait {p2} ?
Que ferait {p2} en premier en gagnant au loto ?
Quel est le plus gros achat de la vie de {p2} ?
Quel est l'achat que {p2} regrette le plus ?
Pour quoi {p2} dépense-t-{elle|il:p2} trop d'argent ?
Quelle est l'émission de télé guilty pleasure de {p2} ?
Quel est le youtubeur ou le podcast préféré de {p2} ?
Quelle est la personne que {p2} admire le plus ?
Quel est le membre de sa famille dont {p2} est le plus proche ?
Combien de frères et sœurs a {p2} ?
Quel est le prénom de la grand-mère de {p2} ?
Quel est le métier de la mère de {p2} ?
Quel est le métier du père de {p2} ?
Quelle tradition familiale {p2} adore-t-{elle|il:p2} ?
Quel est le plus beau souvenir d'enfance de {p2} ?
Quelle bêtise d'enfant {p2} a-t-{elle|il:p2} faite ?
Quel était le jouet préféré de {p2} ?
Quel animal de compagnie {p2} a-t-{elle|il:p2} eu enfant ?
Quel était le premier téléphone de {p2} ?
Quelle était la première voiture de {p2} ?
À quel âge {p2} a-t-{elle|il:p2} eu son premier bisou ?
Quel est le premier film vu ensemble au cinéma ?
Où avez-vous eu votre premier rendez-vous ?
Qu'a pensé {p2} de toi la première fois ?
Quel a été le premier cadeau de {p2} pour toi ?
Quelle est la date de votre premier bisou ?
Quel est le surnom que {p2} te donne le plus ?
Quel est le surnom de toi que {p2} préfère ?
Quelle chanson {p2} considère-t-{elle|il:p2} comme votre chanson ?
Quel est le meilleur souvenir de couple de {p2} ?
Quel est le voyage à deux préféré de {p2} ?
Quelle est votre plus grosse dispute, selon {p2} ?
Qu'est-ce que {p2} préfère chez toi ?
Qu'est-ce qui agace {p2} chez toi, gentiment ?
Quelle est ta manie qui fait rire {p2} ?
Quel est le plat que {p2} préfère quand c'est toi qui cuisines ?
Quel geste tendre {p2} préfère-t-{elle|il:p2} ?
Comment {p2} préfère-t-{elle|il:p2} qu'on {la|le:p2} console ?
Quel est le langage de l'amour de {p2} : mots, cadeaux, temps, gestes ou attentions ?
Quelle est la soirée parfaite pour {p2} ?
Quel est le week-end idéal de {p2} ?
Quel est le film que {p2} veut toujours regarder et toi jamais ?
Quelle est la chose que {p2} n'a jamais osé te dire ?
Quel est le rêve que {p2} n'a encore jamais réalisé ?
Quelle langue {p2} aimerait-{elle|il:p2} parler ?
Quel instrument {p2} aimerait-{elle|il:p2} jouer ?
Quel métier {p2} ferait-{elle|il:p2} s'{elle|il:p2} recommençait tout ?
Où {p2} aimerait-{elle|il:p2} vivre dans dix ans ?
Combien d'enfants {p2} imagine-t-{elle|il:p2} avoir, s'{elle|il:p2} en veut ?
Quel prénom {p2} aimerait-{elle|il:p2} donner à un enfant ?
Quel prénom {p2} aimerait-{elle|il:p2} donner à un animal ?
Quelle est la plus grosse qualité de {p2} en voyage ?
Quel est le pire défaut de {p2} en voyage ?
Combien de temps {p2} met-{elle|il:p2} à se préparer pour sortir ?
Combien de paires de chaussures possède {p2} ?
Combien de temps {p2} passe-t-{elle|il:p2} sur son téléphone par jour ?
Quelle est la dernière recherche internet de {p2}, à ton avis ?
Quel est le dernier achat en ligne de {p2} ?
Quel est le fond d'écran du téléphone de {p2} ?
Quelle est la dernière photo prise par {p2} ?
Qui est la dernière personne à qui {p2} a envoyé un message, à part toi ?
Quel est le dernier film que {p2} a vu sans toi ?
Quel est le dernier livre lu par {p2} ?
Quel est le dernier fou rire de {p2} ?
Quelle est la dernière chose qui a fait pleurer {p2} ?
Quelle est la chose qui stresse le plus {p2} en ce moment ?
Quel est le projet qui tient le plus à cœur à {p2} en ce moment ?
Quelle est l'habitude que {p2} aimerait perdre ?
Quelle est l'habitude que {p2} aimerait prendre ?
Quel est le talent caché de {p2} ?
Quel talent inutile maîtrise {p2} ?
Quel est le record personnel dont {p2} est {la plus fière|le plus fier:p2} ?
Quel est le plus grand exploit sportif de {p2} ?
Quelle est la pire blessure de {p2} ?
De quoi {p2} a-t-{elle|il:p2} le plus horreur chez le dentiste ou le médecin ?
Quelle est la pire maladie qu'ait eue {p2} ?
Quel est le remède miracle de {p2} quand {elle|il:p2} est malade ?
Quel est le plat réconfort de {p2} ?
Quelle est la madeleine de Proust de {p2} ?
Quel goûter {p2} adorait-{elle|il:p2} à l'école ?
Quel bonbon {p2} préfère-t-{elle|il:p2} ?
Quelle boisson {p2} commande-t-{elle|il:p2} toujours au café ?
Quel cocktail {p2} préfère-t-{elle|il:p2} ?
Quel fromage {p2} préfère-t-{elle|il:p2} ?
Quel fruit {p2} préfère-t-{elle|il:p2} ?
Quel légume {p2} refuse-t-{elle|il:p2} de manger ?
Quelle épice {p2} met-{elle|il:p2} partout ?
Quel est le pire plat que {p2} ait goûté ?
Quel est le restaurant où {p2} rêve d'aller ?
Quel est l'hôtel de rêve de {p2} ?
Quelle est la ville où {p2} pourrait vivre demain ?
Quel pays {p2} n'a-t-{elle|il:p2} aucune envie de visiter ?
Quelle activité {p2} adore-t-{elle|il:p2} en vacances ?
Plage, musée ou randonnée : que préfère {p2} en voyage ?
Quelle est la plus grande peur de {p2} en voyage ?
Quelle est la chose que {p2} oublie toujours dans sa valise ?
Combien de valises {p2} emporte-t-{elle|il:p2} pour une semaine ?
Quel moyen de transport {p2} préfère-t-{elle|il:p2} ?
Quel est le pire trajet qu'ait vécu {p2} ?
Quelle est l'appli de rencontre qu'utilisait {p2} avant toi, s'il y en avait une ?
Quel est le type de personne qui plaisait à {p2} avant toi ?
Quel est le crush de célébrité de {p2} ?
Quel est le premier amour de {p2} ?
Combien de temps a duré la plus longue relation de {p2} avant toi ?
Quel est le pire rendez-vous de {p2} avant toi ?
Qu'est-ce qui a séduit {p2} en premier chez toi ?
À quel moment {p2} a-t-{elle|il:p2} su que ça devenait sérieux ?
Qui a dit « je t'aime » en premier, selon {p2} ?
Quel est le moment où {p2} t'a {trouvée la plus séduisante|trouvé le plus séduisant} ?
Quelle tenue {p2} préfère-t-{elle|il:p2} te voir porter ?
Qu'est-ce que {p2} aimerait que vous fassiez plus souvent ensemble ?
Quelle activité {p2} aimerait-{elle|il:p2} tester avec toi ?
Quelle est la chose la plus romantique que {p2} ait faite pour toi ?
Quelle est la chose la plus romantique que tu aies faite pour {p2}, selon {elle|lui:p2} ?
Quelle chanson {p2} associe-t-{elle|il:p2} à toi ?
Quel film {p2} associe-t-{elle|il:p2} à votre couple ?
Quel animal représenterait le mieux {p2} ?
Quel animal représenterait le mieux votre couple, selon {p2} ?
Quel est le mot qui décrit le mieux {p2}, selon {elle|lui:p2} ?
Quel est le mot qui décrit le mieux votre couple, selon {p2} ?
Quelle est la plus grande peur de {p2} pour l'avenir ?
Quel est le plus grand espoir de {p2} pour l'avenir ?
Qu'est-ce qui rend {p2} {jalouse|jaloux:p2} ?
Qu'est-ce qui rassure {p2} quand {elle|il:p2} doute ?
Quelle est la chose qui touche le plus {p2} ?
Quel compliment {p2} aime-t-{elle|il:p2} recevoir ?
Quel compliment {p2} ne supporte-t-{elle|il:p2} pas ?
Quel est le pire défaut d'un partenaire, selon {p2} ?
Quelle qualité {p2} trouve-t-{elle|il:p2} indispensable chez un ami ?
Qui est le meilleur ami ou la meilleure amie de {p2} aujourd'hui ?
Quel ami de {p2} te ressemble le plus ?
Quel est le collègue que {p2} apprécie le plus ?
Quel est le collègue qui agace le plus {p2} ?
Quelle est la plus grande réussite professionnelle de {p2} ?
Quel métier {p2} ne pourrait-{elle|il:p2} jamais faire ?
Combien d'heures de sommeil faut-il à {p2} pour être de bonne humeur ?
Quelle est l'humeur de {p2} au réveil, sur une échelle de 1 à 10 ?
Quel est le signe que {p2} est {fatiguée|fatigué:p2} ?
Quel est le signe que {p2} est sur le point d'éclater de rire ?
Quel est le signe que {p2} a faim ?
Comment {p2} réagit-{elle|il:p2} quand {elle|il:p2} a peur ?
Quel film d'horreur a le plus traumatisé {p2} ?
Est-ce que {p2} croit aux fantômes ?
Quel est le signe astrologique de {p2} ?
Quel est le chiffre porte-bonheur de {p2} ?
Quelle superstition {p2} respecte-t-{elle|il:p2} ?
Quelle est la fleur préférée de {p2} ?
Quelle est la plante que {p2} rêve d'avoir ?
Quel est l'arbre préféré de {p2} ?
Quel paysage apaise le plus {p2} ?
Quelle météo rend {p2} de bonne humeur ?
Quel est le bruit que {p2} ne supporte pas ?
Quel son {p2} trouve-t-{elle|il:p2} apaisant ?
Quelle est la musique de mariage idéale pour {p2} ?
Quelle chanson {p2} met-{elle|il:p2} pour se donner du courage ?
Quel est le premier slow de {p2} ?
Quel est le style de danse préféré de {p2} ?
Quelle est la boisson que {p2} ne veut plus jamais boire ?
Quelle est la pire gueule de bois de {p2} ?
Quelle est la soirée la plus folle de {p2} ?
Quel est le festival ou l'événement préféré de {p2} ?
Quel est l'artiste que {p2} rêve de voir en concert ?
Quel tatouage {p2} ferait-{elle|il:p2} s'{elle|il:p2} devait en faire un ?
Quelle couleur de cheveux {p2} aimerait-{elle|il:p2} essayer ?
Quelle partie de son corps {p2} préfère-t-{elle|il:p2} ?
Quelle est la photo préférée de {p2} dans son téléphone ?
Quelle est la plus grosse honte de {p2} ?
Quelle est la plus grosse bêtise d'adulte de {p2} ?
Quel est le plus gros mensonge que {p2} ait dit à ses parents ?
Quel secret {p2} t'a-t-{elle|il:p2} confié en premier ?
Quelle est la qualité que {p2} aimerait avoir ?
Quel personnage historique {p2} aimerait-{elle|il:p2} rencontrer ?
À quelle époque {p2} aimerait-{elle|il:p2} vivre ?
Quelle invention {p2} trouve-t-{elle|il:p2} la plus inutile ?
Quelle est la cause qui tient le plus à cœur à {p2} ?
Pour quoi {p2} serait-{elle|il:p2} {prête|prêt:p2} à manifester ?
Quel est l'avis tranché de {p2} sur l'ananas dans la pizza ?
Quelle est l'opinion la plus impopulaire de {p2} ?
Quel est le mot préféré de {p2} ?
Quelle est la citation préférée de {p2} ?
Quel conseil {p2} donne-t-{elle|il:p2} tout le temps ?
Quel conseil {p2} aurait-{elle|il:p2} aimé recevoir plus jeune ?
Quel âge {p2} se donne-t-{elle|il:p2} dans sa tête ?
Quel âge avait {p2} quand {elle|il:p2} a quitté le domicile de ses parents ?
Quel était le premier appartement de {p2} ?
Quelle est la pièce préférée de {p2} chez vous ?
Quel meuble {p2} aimerait-{elle|il:p2} changer à la maison ?
Quelle déco {p2} trouve-t-{elle|il:p2} affreuse ?
Quel est le rangement le plus bizarre de {p2} ?
Quelle est l'heure idéale du dîner pour {p2} ?
Quel plat {p2} commande-t-{elle|il:p2} en livraison ?
Quel est le péché mignon de {p2} ?
Qu'est-ce que {p2} grignote la nuit ?
Quelle est la plus longue grasse matinée de {p2} ?
Combien de temps {p2} peut-{elle|il:p2} rester sans téléphone ?
Quelle est la plus grande dépendance de {p2} : café, sucre, séries ou réseaux ?
Quel est le plus grand plaisir simple de {p2} ?
Qu'est-ce qui rend {p2} {heureuse|heureux:p2} en dix secondes ?
`);

/* Notre futur */
export const FUTURE = L(`
Dans dix ans, dans quelle ville vivons-nous ?
Dans dix ans, à quoi ressemble notre maison ?
Maison ou appartement, à terme ?
Ville, campagne ou bord de mer pour finir nos jours ?
Combien de pièces aura notre logement idéal ?
Quelle pièce sera la plus importante chez nous ?
Aurons-nous un jardin ? Qu'y fera-t-on pousser ?
Quel animal adopterons-nous en premier ?
Comment s'appellera notre premier animal ?
Combien d'enfants aurons-nous, si nous en voulons ?
Quels prénoms donnerons-nous à nos enfants, si nous en avons ?
Qui de nous deux sera le plus sévère avec les enfants ?
Qui de nous deux se lèvera la nuit pour le bébé ?
À quel âge aimerais-tu devenir parent, si tu le souhaites ?
Nous marierons-nous un jour ? Où ?
À quoi ressemblera notre mariage idéal ?
Combien d'invités à notre mariage ?
Quelle chanson pour notre première danse ?
Où partirons-nous en voyage de noces ?
Quel sera notre prochain grand voyage ?
Quel pays visiterons-nous ensemble avant nos 50 ans ?
Quel est le voyage le plus fou que nous ferons ensemble ?
Ferons-nous un jour le tour du monde ?
Partirons-nous vivre à l'étranger ? Où ?
Quelle langue apprendrons-nous ensemble ?
Quel sport pratiquerons-nous ensemble ?
Quelle activité commencerons-nous à deux cette année ?
Quel défi relèverons-nous ensemble ?
Courrons-nous un marathon ensemble un jour ?
Quel sera notre rituel du dimanche dans cinq ans ?
Quel sera notre restaurant fétiche ?
Quel plat cuisinerons-nous ensemble pour nos amis ?
Quelle sera notre tradition de Noël ?
Où fêterons-nous nos 10 ans ensemble ?
Comment fêterons-nous nos 50 ans de couple ?
Quelle voiture aurons-nous dans dix ans ?
Aurons-nous un camping-car pour voyager ?
Achèterons-nous une maison de vacances ? Où ?
Quel sera notre budget vacances idéal ?
Qui de nous deux gérera les comptes ?
Compte commun ou comptes séparés ?
Quel est notre plus grand projet commun pour les cinq prochaines années ?
Quel rêve fou réaliserons-nous ensemble ?
Si nous gagnions au loto demain, que ferions-nous en premier ?
Quelle entreprise pourrions-nous créer à deux ?
Ouvrirons-nous un jour un restaurant, une boutique ou un gîte ?
Quel métier fera chacun de nous dans dix ans ?
Changeras-tu de métier un jour ? Pour quoi ?
À quel âge prendrons-nous notre retraite ?
Que ferons-nous de nos journées à la retraite ?
Où vivrons-nous à la retraite ?
À quoi ressemblera une journée type de notre retraite ?
Quel sera notre passe-temps de vieux couple ?
Lequel de nous deux deviendra le plus grincheux en vieillissant ?
Lequel de nous deux aura le plus de cheveux blancs ?
Danserons-nous encore ensemble à 80 ans ?
Quel sera notre surnom de couple quand nous serons grands-parents ?
Comment nos petits-enfants nous appelleront-ils ?
Quel conseil donnerons-nous à nos petits-enfants sur l'amour ?
Quelle histoire de notre couple raconterons-nous à nos petits-enfants ?
Quel souvenir de cette année raconterons-nous dans 30 ans ?
Quelle photo de nous encadrerons-nous dans notre salon ?
Quel objet garderons-nous toute notre vie ?
Quel sera notre plat de fête chaque année ?
Quelle sera notre chanson pour toujours ?
Quelle série regarderons-nous encore ensemble dans dix ans ?
Quel film reverrons-nous à chaque anniversaire ?
Combien d'amis proches aurons-nous dans vingt ans ?
Quel couple d'amis restera le plus proche de nous ?
Qui sera le témoin de mariage de chacun ?
Qui de nos amis se mariera en premier ?
Où passerons-nous nos étés ?
Où passerons-nous nos hivers ?
Quel sera notre prochain week-end en amoureux ?
Quelle nouvelle tradition de couple allons-nous créer ?
Quelle habitude voulons-nous garder toute notre vie ?
Quelle habitude devons-nous perdre ensemble ?
Quelle tâche ménagère chacun prendra-t-il en charge pour toujours ?
Qui cuisinera le plus souvent dans dix ans ?
Aurons-nous un potager ? Qui s'en occupera ?
Aurons-nous des poules un jour ?
Vivrons-nous un jour dans une maison écologique ?
Construirons-nous notre maison nous-mêmes ?
Quelle déco aura notre salon idéal ?
Quelle couleur pour notre chambre ?
Aurons-nous une piscine ? Un spa ? Un sauna ?
Quel sera le bruit de fond de notre maison : musique, enfants, animaux ou silence ?
Combien de chambres d'amis aurons-nous ?
Recevrons-nous souvent du monde à la maison ?
Organiserons-nous de grandes fêtes ou des dîners intimes ?
Quel sera notre cocktail signature pour recevoir ?
Quelle sera notre spécialité culinaire de couple ?
Quel cours prendrons-nous ensemble : cuisine, danse, poterie ou autre ?
Quel instrument apprendrons-nous ensemble ?
Écrirons-nous un livre ensemble un jour ? Sur quoi ?
Quel talent développerons-nous chacun dans les années à venir ?
Quelle cause défendrons-nous ensemble ?
Ferons-nous du bénévolat ensemble ? Où ?
Quel pays rêves-tu de faire découvrir à l'autre ?
Quel lieu de ton enfance veux-tu faire découvrir à l'autre ?
Quelle ville de France visiterons-nous en premier ensemble ?
Quel sommet escaladerons-nous ensemble ?
Quelle île visiterons-nous ensemble ?
Quel grand événement verrons-nous ensemble : Jeux olympiques, aurore boréale, éclipse ?
Quel concert rêvons-nous de voir ensemble ?
Quel festival ferons-nous ensemble ?
Quelle expérience folle tenterons-nous : parachute, montgolfière ou plongée ?
Quel sera notre plus beau souvenir de l'année prochaine ?
Qu'aimerais-tu que nous fassions plus souvent ensemble cette année ?
Qu'aimerais-tu que nous arrêtions de faire ?
Quel moment de la semaine sera réservé à nous deux ?
Comment passerons-nous nos soirées dans cinq ans ?
Quelle sera notre routine du matin idéale ?
Qui se lèvera en premier pour faire le café ?
Combien de temps passerons-nous sans téléphone chaque jour ?
Ferons-nous une soirée sans écran par semaine ?
Quelle sera notre règle d'or pour les disputes ?
Comment nous réconcilierons-nous après une dispute ?
Quel sujet faudra-t-il toujours aborder franchement entre nous ?
Que ferons-nous si l'un de nous veut changer de vie ?
Que ferons-nous si l'un de nous reçoit une offre de travail à l'autre bout du monde ?
Comment partagerons-nous les fêtes entre nos deux familles ?
Où passerons-nous Noël l'an prochain ?
Comment imagines-tu nos relations avec nos familles dans dix ans ?
Qui de nous deux sera le plus proche de sa belle-famille ?
Dans quelle ville habiteront nos enfants plus tard, à ton avis ?
Quel métier ferait notre enfant imaginaire ?
Quel trait de caractère de l'autre aimerais-tu transmettre ?
Quel trait de caractère de toi espères-tu ne pas transmettre ?
Quelle valeur voulons-nous absolument transmettre ?
Quelle éducation aimerions-nous donner ?
Quel sport ferons-nous faire à nos enfants, si nous en avons ?
Quels dessins animés montrerons-nous en premier à nos enfants ?
Quel voyage ferons-nous en famille en premier ?
Quel sera notre plus beau moment de famille, selon toi ?
Comment voudrais-tu qu'on parle de notre couple dans vingt ans ?
Quel mot décrira notre couple dans dix ans ?
Quelle est la chose que nous n'aurons jamais faite et que nous regretterons ?
Quel regret voulons-nous éviter ?
Quelle promesse peut-on se faire ce soir ?
Quelle surprise feras-tu à l'autre dans l'année ?
Quel cadeau rêves-tu de recevoir pour nos 10 ans ?
Quel cadeau rêves-tu d'offrir pour nos 10 ans ?
Quelle sera la date de notre prochain grand projet ?
Quelle sera la prochaine grande étape de notre couple ?
Quand emménagerons-nous ensemble, ou dans un plus grand logement ?
Quel quartier choisirons-nous pour vivre ?
Quel genre de voisins aimerions-nous avoir ?
Aurons-nous un jour une maison pleine d'amis le week-end ?
Qui organisera les anniversaires surprises ?
Qui oubliera le plus souvent les dates importantes ?
Quel sera notre plus grand achat commun ?
Quelle folie dépenserons-nous un jour sans regret ?
Que ferons-nous de notre première grosse prime ?
Combien économiserons-nous chaque mois ?
Pour quel rêve mettrons-nous de l'argent de côté ?
Prendrons-nous une année sabbatique ensemble ?
Où passerions-nous une année sabbatique ?
Quel pays du monde nous ressemble le plus ?
Quelle sera notre destination pour nos 40 ans ?
Quel âge aurons-nous quand nous ferons notre plus beau voyage ?
Quelle sera notre aventure la plus folle ?
Quelle sera notre plus grande réussite à deux ?
Quel obstacle surmonterons-nous ensemble ?
Comment nous soutiendrons-nous quand l'un de nous traversera un moment difficile ?
Quel rituel nous aidera à rester proches avec le temps ?
Comment garderons-nous la flamme dans vingt ans ?
Quel sera notre rendez-vous galant annuel ?
Où irons-nous pour la Saint-Valentin l'an prochain ?
Quelle tenue porteras-tu à notre prochaine grande soirée ?
Quelle sera notre photo de profil de couple dans dix ans ?
Aurons-nous un compte commun sur les réseaux ? Sous quel nom ?
Quel livre lirons-nous ensemble cette année ?
Quel podcast écouterons-nous ensemble ?
Quel jeu de société deviendra notre classique ?
Quelle console ou quel jeu vidéo aurons-nous dans le salon ?
Ferons-nous un jour un tatouage assorti ? Lequel ?
Aurons-nous un jour des bijoux assortis ?
Nous habillerons-nous un jour en tenues assorties pour une soirée ?
Quel sera notre déguisement de couple à la prochaine soirée costumée ?
Quel sera notre duo au karaoké ?
Quelle danse apprendrons-nous pour briller en soirée ?
Quel rôle prendra chacun de nous dans nos soirées entre amis ?
Qui de nous deux finira la soirée sur la piste de danse dans vingt ans ?
Quel métier aurais-tu aimé que nous fassions ensemble ?
Quelle maison de vacances rêverait-on de louer pour tous nos amis ?
Combien de temps resterons-nous sans nous disputer ?
Quel sera notre plus long voyage en voiture ?
Traverserons-nous un océan en bateau ?
Quel animal sauvage rêvons-nous de voir ensemble ?
Ferons-nous un safari ?
Dormirons-nous un jour dans une cabane dans les arbres ?
Dormirons-nous un jour dans un igloo ?
Verrons-nous ensemble les aurores boréales ?
Quel lever de soleil inoubliable verrons-nous ensemble ?
Où regarderons-nous les étoiles ?
Quel sera notre lieu secret, rien qu'à nous ?
Quel lieu deviendra notre pèlerinage amoureux ?
Retournerons-nous un jour sur le lieu de notre rencontre ?
Comment raconterons-nous notre rencontre dans trente ans ?
Quelle version de notre rencontre est la vraie ?
Quelle musique passera à nos 30 ans de mariage ?
Quel discours feras-tu pour nos 25 ans ?
Quel sera le secret de notre longévité ?
Que souhaites-tu pour nous dans un an ?
Que souhaites-tu pour nous dans cinq ans ?
Que souhaites-tu pour nous dans vingt ans ?
Qu'est-ce qui ne devra jamais changer entre nous ?
Qu'est-ce qui pourra changer sans problème ?
Quel nouveau souvenir veux-tu créer ce mois-ci ?
Quel est le prochain truc que nous ferons pour la première fois ensemble ?
Quelle sera notre prochaine folie ?
Quel sera le premier objet de notre future maison ?
Quel style aura notre cuisine ?
Quelle vue aimerais-tu avoir depuis notre lit ?
Quel tableau ou quelle photo trônera dans notre entrée ?
Combien de plantes vertes aurons-nous ?
Qui arrosera les plantes, honnêtement ?
Qui sortira les poubelles dans dix ans ?
Qui fera les courses ?
Qui conduira lors des longs trajets ?
Qui choisira le film du vendredi soir ?
Qui choisira la destination des vacances ?
Qui aura le dernier mot pour la déco ?
Qui gardera la télécommande ?
Qui fera la playlist des road trips ?
Qui préparera le petit-déjeuner du dimanche ?
Qui pensera à réserver le restaurant pour les anniversaires ?
Quel sera notre plus grand fou rire à venir, à ton avis ?
Quelle sera notre phrase culte de couple ?
Quel surnom nous donnerons-nous dans vingt ans ?
Quel sera le titre du film de notre histoire ?
Qui jouerait notre couple au cinéma ?
Quel serait le genre du film de notre vie : comédie, romance ou aventure ?
Quelle serait la musique du générique de notre histoire ?
Comment se terminerait le film de notre vie ?
Si on pouvait avancer de dix ans, que voudrais-tu découvrir en premier ?
Si on pouvait revenir à un moment de notre histoire, lequel ?
Quel est le meilleur moment de notre histoire qui reste à vivre ?
Quel sera notre prochain resto pour une grande occasion ?
Quelle sera notre prochaine soirée improvisée ?
Où ferons-nous notre prochain pique-nique ?
Quelle randonnée ferons-nous ensemble cet été ?
Quel marché de Noël visiterons-nous ensemble ?
Quelle capitale européenne explorerons-nous à vélo ?
Quel train mythique prendrons-nous un jour ?
Dans quelle ville passerons-nous un réveillon du Nouvel An ?
Quel parc d'attractions ferons-nous ensemble ?
Quel musée visiterons-nous ensemble pour la première fois ?
Quel spectacle irons-nous voir ensemble cette année ?
Quelle recette difficile réussirons-nous ensemble ?
Quel vin ou quelle boisson ouvrirons-nous pour fêter un grand moment ?
Quel meuble construirons-nous de nos mains ?
Quelle pièce de la maison rénoverons-nous ensemble ?
Quel cadeau ferons-nous à nos parents un jour, tous les deux ?
Quel ami aiderons-nous à réaliser un rêve ?
Quel pays du monde ne visiterons-nous jamais ensemble ?
Qu'écrirons-nous dans une lettre à ouvrir dans dix ans ?
Quelle sera la première phrase de notre lettre pour dans dix ans ?
Quelle sera notre plus belle photo de l'année prochaine ?
Quel sera le moment le plus romantique de l'année à venir ?
Quelle tradition de nos familles garderons-nous ?
Quelle tradition de nos familles abandonnerons-nous ?
Comment fêterons-nous notre prochain anniversaire de couple ?
`);

/* Qui de nous deux : la carte complète « Qui de nous deux… ». Épicé = séduction, +18 = sexualité. */
export const WHO2 = {
 tendre: L(`
ronfle le plus fort
prend toute la couette
met le plus de temps à se préparer
arrive toujours en retard
a dit « je t'aime » en premier
a fait le premier pas
pleure le plus devant les films
gagne le plus souvent aux jeux de société
triche aux jeux de société
fait le plus de bêtises en cuisine
cuisine le mieux
fait le plus souvent la vaisselle
laisse traîner ses chaussettes
range le mieux
perd ses clés le plus souvent
oublie les dates importantes
se souvient de tout
choisit le film du soir
s'endort devant le film
vole les frites dans l'assiette de l'autre
finit les desserts de l'autre
mange le plus vite
a le plus faim en permanence
grignote la nuit
se lève le plus tôt
fait la grasse matinée
a le réveil le plus difficile
met le plus de réveils
chante le plus faux
danse le mieux
chante sous la douche
passe le plus de temps dans la salle de bain
a le plus de vêtements
a le plus de chaussures
emprunte les vêtements de l'autre
fait le plus de selfies
passe le plus de temps sur son téléphone
répond le plus vite aux messages
envoie les messages les plus longs
envoie le plus de vocaux
a le plus de surnoms ridicules pour l'autre
fait le plus de compliments
fait le plus de câlins
réclame le plus de câlins
fait les meilleurs massages
a les pieds les plus froids
a toujours trop chaud
a toujours trop froid
monte le chauffage en cachette
ouvre la fenêtre en plein hiver
se plaint le plus
râle pour un rien
boude le plus longtemps
s'excuse en premier après une dispute
a le plus de mauvaise foi
pense toujours avoir raison
gagne les débats
change d'avis le plus souvent
hésite le plus longtemps au restaurant
commande toujours la même chose
goûte dans l'assiette de l'autre
paie le plus souvent l'addition
dépense le plus
économise le mieux
fait les achats les plus impulsifs
revient des courses avec des choses inutiles
oublie la liste de courses
conduit le mieux
se perd le plus souvent
refuse de demander son chemin
choisit la musique en voiture
s'endort en voiture
organise les vacances
fait les valises à la dernière minute
emporte trop d'affaires en voyage
oublie le chargeur en voyage
a le plus peur en avion
a le plus peur des araignées
crie le plus pendant un film d'horreur
fait semblant de ne pas avoir peur
tue les insectes de la maison
tue les plantes vertes sans le vouloir
s'occupe le mieux des plantes
aimerait le plus avoir un animal
parle le plus à l'animal de compagnie
a le rire le plus contagieux
fait le plus rire l'autre
raconte les pires blagues
rit de ses propres blagues
a le plus de fous rires au mauvais moment
garde le mieux son sérieux
ment le moins bien
garde le mieux les secrets
révèle les surprises sans le vouloir
prépare les meilleures surprises
offre les meilleurs cadeaux
emballe le plus mal les cadeaux
fait le plus attention aux détails
remarque une nouvelle coupe de cheveux
oublie de remarquer une nouvelle coupe de cheveux
parle le plus pendant son sommeil
bouge le plus en dormant
s'endort le plus vite
a besoin du plus de sommeil
fait le plus de siestes
est la pire personne à réveiller
fait le meilleur café
boit le plus de café
a le plus de manies
range ses affaires de façon bizarre
appuie trop fort sur le tube de dentifrice
laisse la lunette des toilettes relevée
oublie de reboucher les bouteilles
laisse les placards ouverts
a l'écriture la plus illisible
a la meilleure mémoire des prénoms
oublie le prénom des gens
parle le plus à des inconnus
se fait le plus facilement des amis
organise les meilleures fêtes
reste le plus tard en soirée
veut rentrer le premier en soirée
danse le plus en soirée
finit au karaoké
a le plus de patience
perd patience le plus vite
s'énerve au volant
s'énerve contre les objets qui ne marchent pas
répare les objets cassés
casse le plus d'objets
fait tomber son téléphone le plus souvent
a l'écran de téléphone le plus fissuré
oublie de charger son téléphone
vérifie trois fois que la porte est fermée
a le plus de rituels
prend le plus de photos en vacances
apparaît sur le moins de photos
fait les meilleures photos
poste le plus sur les réseaux
regarde le plus de séries
spoile les séries
avance dans une série sans attendre l'autre
lit le plus de livres
a le plus de culture générale
gagne aux quiz
connaît le plus de paroles de chansons
a les goûts musicaux les plus étranges
a la playlist la plus honteuse
fait le plus de sport
abandonne le sport le plus vite
mange le plus sainement
craque pour le chocolat
cache des sucreries
mange le dernier biscuit
prend la plus grosse part
partage le moins volontiers son dessert
fait le meilleur gâteau
rate le plus les recettes
suit les recettes à la lettre
improvise en cuisine
ajoute trop de sel
supporte le mieux le piment
a le plus de mal à se décider
fait les choix les plus raisonnables
prend le plus de risques
a le plus envie de voyager
voudrait vivre à l'étranger
pense le plus à l'avenir
vit le plus dans l'instant
fait le plus de listes
oublie le plus de rendez-vous
arrive le plus en avance
s'inquiète le plus
rassure le mieux l'autre
console le mieux
écoute le mieux
coupe la parole le plus souvent
parle le plus fort
parle le plus vite
raconte le mieux les histoires
exagère le plus en racontant
a le plus de souvenirs d'enfance
appelle le plus ses parents
a la meilleure cote auprès de sa belle-famille
s'entend le mieux avec la famille de l'autre
fait le plus de gaffes en famille
se souvient des anniversaires de tout le monde
envoie les cartes de vœux
écrit les plus beaux mots d'amour
garde les tickets de cinéma en souvenir
garde le plus de souvenirs du couple
se souvient de la date de votre rencontre
se souvient de ce que portait l'autre au premier rendez-vous
a montré le plus de timidité au début
a le plus changé depuis le début
a le plus de mal à dire non
dit oui à tout
propose les meilleures idées de sortie
choisit le restaurant
choisit la déco
a le meilleur goût en déco
a le plus d'objets inutiles
garde tout « au cas où »
jette tout
fait le ménage avec de la musique à fond
passe l'aspirateur le plus souvent
fait le lit le matin
plie le linge
oublie le linge dans la machine
repasse
tolère le plus le désordre
supporte le moins le bruit
a l'odorat le plus développé
sent toujours bon
porte le plus de parfum
prend les douches les plus longues
utilise toute l'eau chaude
vole le shampoing de l'autre
s'occupe le plus de sa peau
se maquille ou se coiffe le plus longtemps
a la plus belle écriture
fait les plus beaux dessins
a le plus d'imagination
invente les meilleures histoires
serait le meilleur parent
serait le parent le plus cool
serait le parent le plus strict
gâterait le plus les enfants
jouerait le plus aux jeux vidéo avec les enfants
survivrait le plus longtemps sur une île déserte
gagnerait à Koh-Lanta
réussirait le mieux une mission d'espionnage
craquerait le plus vite à un interrogatoire
deviendrait célèbre en premier
gagnerait au loto et le cacherait
dépenserait tout le gain du loto en une semaine
adopterait dix chats
partirait vivre dans une cabane
se perdrait en randonnée
voudrait toujours prendre l'ascenseur
prend les escaliers quatre à quatre
marche le plus vite
traîne le plus en balade
s'arrête devant chaque vitrine
fait le plus de détours
trouve toujours une place de parking
se gare le plus mal
a eu le plus d'amendes
fait le plus de photos de nourriture
goûte les plats les plus étranges
refuse de goûter les plats inconnus
commande en livraison le plus souvent
a le plus d'applis inutiles
oublie ses mots de passe
gère l'administratif
remet les papiers à plus tard
fait les courses en ligne
a le meilleur sens de l'orientation
a le plus d'amis d'enfance
se fait inviter partout
voudrait inviter du monde tous les week-ends
préfère les soirées au calme
fait le meilleur discours en public
pleure aux mariages
a le plus l'âme romantique
pense à acheter des fleurs
aime le plus les surprises
déteste le plus les surprises
attend le plus les fêtes de fin d'année
décore le plus la maison à Noël
mange le plus de chocolats à Pâques
a le plus de patience pour les puzzles
abandonne un puzzle à mi-chemin
lit le mode d'emploi
monte les meubles sans notice
a le plus d'idées folles
dit « on verra » le plus souvent
finit toujours par céder
a le dernier mot
`),
 hot: L(`
a craqué en premier
a regardé l'autre en premier à la première rencontre
a eu envie d'embrasser l'autre dès le premier soir
a donné le premier bisou
embrasse le mieux
donne les bisous les plus longs
réclame le plus de bisous
vole le plus de bisous
fait les bisous dans le cou les plus troublants
a le regard le plus séducteur
fait les meilleurs clins d'œil
rougit le plus vite
drague encore l'autre comme au premier jour
envoie les messages les plus séducteurs
écrit les mots doux les plus enflammés
fait les déclarations les plus romantiques
dit « je t'aime » le plus souvent
murmure des mots doux à l'oreille
fait le plus de compliments sur le physique de l'autre
reçoit le plus de compliments en soirée
attire le plus les regards en soirée
se fait le plus draguer quand le couple sort
remarque quand l'autre se fait draguer
est le plus jaloux ou la plus jalouse
fait les scènes de jalousie les plus drôles
rend l'autre jaloux exprès
flirte le plus avec l'autre en public
tient la main en premier dans la rue
prend l'autre par la taille en public
s'embrasse le plus volontiers devant les amis
fait les câlins les plus longs
a les mains les plus douces
fait les caresses les plus tendres
fait les massages les plus séduisants
a la voix la plus séduisante
sent le meilleur parfum
choisit le parfum de l'autre
porte les tenues les plus séduisantes
s'habille pour plaire à l'autre
remarque une nouvelle tenue en premier
préfère quand l'autre porte du noir
vole les chemises ou les pulls de l'autre
dort le plus collé à l'autre
fait la cuillère le plus souvent
réveille l'autre avec des bisous
apporte le petit-déjeuner au lit
organise les plus beaux rendez-vous
a eu l'idée du rendez-vous le plus romantique
réserve le restaurant romantique
allume les bougies
choisit la musique pour un slow
invite l'autre à danser
danse le slow le plus collé
mène la danse
se laisse le plus guider
écrit les plus belles lettres d'amour
garde les lettres d'amour
offre des fleurs sans raison
prépare des surprises romantiques
fait les cadeaux les plus romantiques
oublie la Saint-Valentin
fête la Saint-Valentin en grand
prend le plus de photos de couple
poste le plus de photos de couple
a la photo de l'autre en fond d'écran
regarde l'autre dormir
regarde l'autre avec des yeux amoureux
dit « tu es belle » ou « tu es beau » le plus souvent
complimente le sourire de l'autre
a le plus craqué pour le sourire de l'autre
a craqué pour la voix de l'autre
a craqué pour le style de l'autre
a craqué pour l'humour de l'autre
a le plus de crushs sur des célébrités
avoue ses crushs de célébrités sans gêne
a un faible pour les uniformes
trouve l'autre irrésistible au réveil
trouve l'autre irrésistible en tenue de soirée
fait le plus d'efforts pour séduire l'autre
séduit l'autre en cuisinant
séduit l'autre avec de l'humour
séduit l'autre avec un regard
fait fondre l'autre en un mot
sait exactement comment faire craquer l'autre
fait des avances en premier
résiste le moins aux avances de l'autre
fait semblant de résister
taquine l'autre le plus
chatouille l'autre le plus
a le plus de chatouilles
lance les batailles de coussins
lance les batailles d'eau
pousse l'autre dans la piscine
mordille l'oreille de l'autre
fait les bisous esquimaux
laisse des mots doux sur le miroir
envoie des cœurs par message toute la journée
appelle l'autre par un surnom tendre en public
a le surnom le plus gênant pour l'autre
fait le plus rougir l'autre devant ses amis
raconte votre rencontre en enjolivant tout
se souvient du premier bisou dans les détails
se souvient de la tenue du premier rendez-vous
a le plus stressé au premier rendez-vous
a eu le plus de papillons dans le ventre au début
a mis le plus de temps à se déclarer
a hésité le plus longtemps avant le premier bisou
a voulu un deuxième rendez-vous en premier
a présenté l'autre à ses amis en premier
a présenté l'autre à ses parents en premier
a parlé d'emménager ensemble en premier
a parlé de mariage en premier
pense le plus à demander l'autre en mariage
ferait la demande la plus romantique
pleurerait le plus pendant la demande
organiserait le mariage le plus grandiose
danserait le plus au mariage
ferait le plus beau discours de mariage
partirait en lune de miel la plus lointaine
rêve le plus de week-ends en amoureux
choisit les destinations romantiques
réserve les hôtels avec vue
veut toujours une baignoire à l'hôtel
traîne le plus au lit le dimanche
réclame des câlins le matin
envoie « tu me manques » le plus souvent
supporte le moins la distance
appelle l'autre à chaque escale en voyage
attend l'autre avec impatience à la gare ou à l'aéroport
prépare les retrouvailles les plus romantiques
cache des mots doux dans les valises
garde un vêtement de l'autre pour son odeur
a encore des papillons dans le ventre
regarde encore l'autre comme au premier jour
fait encore battre le cœur de l'autre
intimide encore l'autre
a le plus de charme au naturel
a le plus de succès sur les photos
fait les plus belles grimaces amoureuses
fait les déclarations les plus inattendues
dit les choses les plus touchantes sans s'en rendre compte
pleure de joie le plus facilement
se laisse le plus attendrir
pardonne le plus vite
se réconcilie avec un bisou
boude pour obtenir un câlin
fait la moue la plus craquante
a le sourire le plus craquant
a les fossettes ou les yeux qui font fondre
a la démarche la plus séduisante
fait le plus d'effet en sortant de la douche
met le plus de temps à se préparer pour un rendez-vous
fait les meilleures surprises d'anniversaire
fait les plus beaux cadeaux de couple
offre les bijoux
aime le plus recevoir des fleurs
aime le plus les déclarations en public
déteste le plus les déclarations en public
préfère les soirées en tête-à-tête
préfère les dîners aux chandelles
aime le plus les slows
chante des chansons d'amour à l'autre
dédie le plus de chansons à l'autre
a choisi votre chanson
connaît par cœur votre chanson
imite le mieux la voix de l'autre
connaît le mieux les goûts de l'autre
devine le mieux les envies de l'autre
remarque quand l'autre a besoin d'un câlin
dit « je t'aime » en premier après une dispute
écrit les messages les plus tendres après une dispute
a le cœur le plus fleur bleue
regarde le plus de comédies romantiques
pleure le plus devant les films d'amour
rejoue des scènes de film romantique
a le plus envie de refaire le premier rendez-vous
garde le plus de souvenirs de vos sorties
a gardé le ticket du premier film ensemble
connaît la date de votre premier bisou
prévoit les anniversaires de couple
oublie les anniversaires de couple
a le plus de surnoms amoureux pour l'autre
dit « mon cœur » le plus souvent
dit « bébé » le plus souvent
parle le plus de l'autre à ses amis
montre le plus de photos de l'autre à ses collègues
se vante le plus de son couple
a le plus le cœur qui s'emballe en voyant l'autre
devient le plus guimauve en couple
surveille le plus qui parle à l'autre en soirée
surveille le plus les likes de l'autre
like toutes les photos de l'autre
commente les photos de l'autre avec des cœurs
envoie des selfies à l'autre au travail
envoie des photos de chaque repas
fait des appels vidéo le plus souvent
reste au téléphone le plus longtemps
dit « raccroche toi d'abord »
s'endort au téléphone avec l'autre
rêve de l'autre la nuit
parle de l'autre dans son sommeil
fait les rêves les plus romantiques
voudrait refaire sa demande de premier rendez-vous
aimerait le plus vivre une aventure romantique à l'étranger
aimerait danser un tango avec l'autre
aimerait prendre des cours de danse de couple
aimerait faire une séance photo de couple
aimerait des tatouages assortis
aimerait des tenues assorties
porte des vêtements assortis sans le faire exprès
choisit les cadeaux les plus personnels
écrit les cartes d'anniversaire les plus longues
fait les plus belles déclarations par écrit
fait les plus belles déclarations à voix haute
séduit le plus avec ses mains
séduit le plus avec ses mots
séduit le plus avec son silence
ferait le plus craquer un inconnu en soirée
aurait le plus de succès sur une appli de rencontre
draguerait le mieux en cas de célibat
fait le plus de clins d'œil complices en soirée
comprend l'autre d'un seul regard
communique le mieux sans parler
a le plus envie de se retrouver en tête-à-tête après une soirée
propose de rentrer tôt pour être à deux
organise les soirées en amoureux surprises
cuisine le dîner romantique
prépare le meilleur cocktail pour l'autre
apporte les croissants le dimanche
masse les pieds de l'autre devant la télé
gratte le dos de l'autre
joue avec les cheveux de l'autre
caresse le visage de l'autre en premier
dépose des bisous sur le front
fait les bisous les plus surprenants
mord les lèvres de l'autre en s'embrassant
ferme les yeux en premier pendant un bisou
garde les yeux ouverts pendant un bisou
fait les bisous les plus doux
fait les bisous les plus passionnés
enlace l'autre par derrière
pose sa tête sur l'épaule de l'autre
s'endort sur l'épaule de l'autre au cinéma
tient la main sous la table
fait du pied sous la table
propose un bain à deux aux chandelles
choisit le film romantique du soir
pense à mettre de la musique douce pendant le dîner
a le plus de mal à cacher son attirance en public
fait les compliments les plus inattendus
parle le plus de votre premier rendez-vous
a gardé le plus de messages du début
relit les vieux messages du début
fait les plus beaux surnoms
offre le plus de petites attentions au quotidien
ferait une sérénade sous la fenêtre de l'autre
préparerait un pique-nique romantique au coucher du soleil
écrirait un poème pour l'autre
aimerait le plus un baiser sous la pluie
prolonge le plus les au revoir
envoie un message juste après s'être quitté
dit « bonne nuit » le plus tendrement
`),
 x18: L(`
a le plus envie de faire l'amour en ce moment
prend le plus souvent l'initiative au lit
a fait le premier pas pour la première nuit
a eu envie de l'autre dès le premier soir
a le plus d'imagination au lit
a le plus d'endurance
fait le plus de bruit
réveille l'autre pour un câlin coquin
préfère faire l'amour le matin
préfère faire l'amour le soir
préfère les préliminaires interminables
va le plus droit au but
aime le plus les surprises coquines
propose de nouvelles positions
connaît le plus de positions
a lu le plus de choses sur le sujet
a les fantasmes les plus fous
ose le plus parler de ses fantasmes
a réalisé le plus de fantasmes de l'autre
rougit le plus en parlant de sexe
parle le plus pendant l'amour
dit les mots les plus crus
préfère la lumière allumée
préfère le noir complet
aime le plus les jeux de rôle
choisirait le costume le plus osé
aime le plus la lingerie
offre le plus de lingerie à l'autre
porte le plus souvent de la lingerie pour l'autre
aime le plus les massages qui dérapent
fait les massages les plus sensuels
a les mains les plus expertes
fait les meilleurs baisers dans le cou
laisse le plus de suçons
laisse le plus de griffures
mordille le plus
aime le plus être dominé ou dominée
aime le plus mener la danse
aimerait tester les menottes
aimerait tester le bandeau sur les yeux
a eu l'idée de la position la plus acrobatique
s'est déjà fait mal en essayant une position
a eu le plus de fous rires au lit
s'endort le plus vite après l'amour
réclame des câlins après l'amour
file sous la douche juste après
a le plus d'idées d'endroits insolites
a proposé de faire l'amour dans le lieu le plus fou
a le plus envie de faire l'amour en pleine nature
aimerait le plus faire l'amour dans un avion
aimerait le plus faire l'amour sur une plage
a le plus peur de se faire surprendre
aime le plus le risque de se faire surprendre
a déjà fait le plus de bruit chez des amis
s'est déjà fait surprendre par quelqu'un
envoie les messages les plus coquins
envoie les photos les plus osées
a le plus de photos coquines de l'autre
excite l'autre par message au travail
lance les appels vidéo coquins
a la voix la plus sexy au téléphone
chuchote les choses les plus osées à l'oreille
fait le strip-tease le plus réussi
danserait le lap dance le plus torride
a le plus beau corps, selon l'autre
préfère qu'on s'occupe de son cou
préfère qu'on s'occupe de son dos
a les zones sensibles les plus inattendues
craque le plus vite sous les caresses
résiste le moins longtemps
fait durer le plaisir le plus longtemps
aime le plus les douches à deux
aime le plus les bains à deux
aime le plus faire l'amour dans la cuisine
aime le plus faire l'amour sur le canapé
préfère le lit, tout simplement
a le plus envie d'un week-end au lit
propose le plus de soirées coquines
organise les soirées coquines surprises
choisit la musique pour faire l'amour
allume les bougies pour l'ambiance
achète les sextoys
a choisi le dernier sextoy
utilise le plus les sextoys
cache les sextoys quand les amis viennent
aimerait le plus tester un nouveau jouet
aime le plus l'huile de massage
aime le plus les glaçons au lit
aime le plus la chantilly au lit
a le plus d'idées gourmandes au lit
pense le plus souvent au sexe
pense au sexe au travail
a déjà eu envie de l'autre au pire moment
a déjà eu envie de l'autre pendant un repas de famille
fait du pied le plus coquin sous la table
a les mains les plus baladeuses en public
pose la main sur la cuisse de l'autre en voiture
aime le plus faire l'amour après une soirée
aime le plus faire l'amour après une dispute
aime le plus la réconciliation sur l'oreiller
fait le plus de câlins coquins le dimanche matin
réveille l'autre de la façon la plus coquine
dort sans rien sur la peau le plus souvent
se promène le plus souvent sans vêtements dans l'appartement
aime le plus être regardé ou regardée
aime le plus regarder l'autre se déshabiller
déshabille l'autre le plus vite
déshabille l'autre le plus lentement
arrache les vêtements de l'autre
plie ses vêtements avant l'amour
garde ses chaussettes, honnêtement
aime le plus les quickies
aime le plus les longues nuits
a battu le record de la nuit la plus longue
a le plus de courbatures le lendemain
se plaint du bruit des voisins pendant l'amour
a déjà frappé au mur pour faire taire les voisins
fait le plus attention à ne pas réveiller les voisins
oublie de fermer les rideaux
oublie de fermer la porte à clé
a déjà cassé quelque chose au lit
a déjà fait tomber la lampe de chevet
a déjà eu une crampe au mauvais moment
a eu le fou rire le plus mémorable au lit
a déjà dit un mot ridicule pendant l'amour
a les surnoms coquins les plus drôles
donne le plus de surnoms coquins
a le plus de mal à garder son sérieux pendant un jeu de rôle
improvise le mieux un jeu de rôle
ferait le meilleur plombier de film coquin
ferait la meilleure infirmière ou le meilleur infirmier de jeu de rôle
aimerait le plus un uniforme dans la chambre
préfère les tenues sexy aux costumes
achète les tenues coquines
porte des sous-vêtements assortis
a la plus grande collection de sous-vêtements
remarque toujours les sous-vêtements de l'autre
a le plus envie de faire l'amour en vacances
réserve des hôtels pour leur grand lit
choisit les chambres avec jacuzzi
fait le plus de bruit à l'hôtel
a déjà reçu une plainte à l'hôtel
aime le plus faire l'amour devant un miroir
aimerait le plus se filmer
préfère faire l'amour en musique
préfère le silence total
fait les bruits les plus drôles
simule le moins bien
a le plus de mal à dire non à un câlin coquin
accepte le plus souvent un câlin coquin en pleine journée
propose une sieste coquine
transforme une sieste en câlin coquin
transforme un massage en câlin coquin
transforme une douche en câlin coquin
transforme un film en câlin coquin
s'endort en plein câlin coquin
a déjà oublié le film en cours
pense à mettre la serviette sur le canapé
pense à la contraception
achète les préservatifs
a le plus d'idées pour pimenter le couple
lit le plus de récits érotiques
regarde le plus de vidéos coquines
proposerait de regarder une vidéo coquine à deux
aimerait le plus un club libertin, juste pour voir
parle le plus de plan à trois en rigolant
a le plus de fantasmes sur des célébrités
avoue ses fantasmes de célébrités le plus facilement
a les rêves érotiques les plus fréquents
raconte ses rêves érotiques au réveil
a le plus de mal à cacher son envie en public
dévore l'autre des yeux en soirée
murmure les propositions les plus indécentes en soirée
propose de rentrer plus tôt d'une soirée pour être à deux
a déjà proposé un câlin coquin dans les toilettes d'un restaurant
a déjà proposé un câlin coquin dans une cabine d'essayage
a le plus d'audace
a le plus de pudeur
a le plus évolué depuis le début de votre histoire
a le plus appris de l'autre au lit
apprend le plus vite ce que l'autre aime
connaît le mieux le corps de l'autre
devine le mieux ce que l'autre veut
demande le plus ce que l'autre aime
guide le mieux l'autre
aime le plus les baisers interminables
embrasse le plus pendant l'amour
garde les yeux ouverts pendant l'amour
aime le plus les câlins peau contre peau
fait le plus de caresses dans le dos
aime le plus les caresses dans les cheveux
aime le plus être mordillé ou mordillée
aime le plus les petites fessées
donne les fessées
aime le plus les jeux avec un bandeau
aime le plus attacher l'autre
préfère être attaché ou attachée
a la liste de fantasmes la plus longue
voudrait cocher toute la liste de fantasmes
oserait le plus de choses en vacances
a le plus d'idées coquines pour un anniversaire
offre les cadeaux les plus coquins
a déjà offert un sextoy à l'autre
emporte un sextoy en vacances
a déjà oublié un sextoy dans une valise contrôlée
a déjà eu le plus honte à cause d'un sextoy
a le plus envie de recommencer tout de suite
a besoin d'une pause plus longue
a le plus faim après l'amour
prépare le petit-déjeuner après une nuit agitée
parle le plus de sexe avec ses amis
garde le plus de choses secrètes sur votre vie intime
raconte le plus de détails aux amis
rougit le plus quand les amis posent des questions
fait les allusions les plus coquines devant les autres
glisse des sous-entendus pendant les repas
comprend le plus vite les sous-entendus de l'autre
envoie un message coquin pendant un dîner avec des amis
a le plus de mal à rester sage en public
aime le plus les endroits où l'on risque d'être vu
aimerait faire l'amour à la belle étoile
aimerait faire l'amour sous la pluie
aimerait faire l'amour dans un train de nuit
aimerait faire l'amour dans une cabane perdue
aimerait passer une nuit dans un hôtel coquin
aimerait tester une chambre avec miroir au plafond
aimerait tester un week-end sans vêtements
aimerait tester le naturisme
a le plus d'expérience
a le plus évolué grâce à l'autre
a la libido la plus forte
a le plus envie de l'autre après une séparation de quelques jours
fait les retrouvailles les plus torrides
prolonge le plus les préliminaires
excelle le plus dans les préliminaires
fait monter le désir le plus lentement
laisse l'autre le plus languir
fait craquer l'autre à force de taquineries
cède le premier quand l'autre taquine
dit « encore » le plus souvent
dit « attends » le plus souvent
aimerait faire l'amour dans chaque pièce de la maison
a déjà proposé de faire l'amour dans la voiture
aime le plus les baisers qui descendent dans le cou
envoie un message coquin juste avant de rentrer
attend l'autre en tenue coquine
a le plus d'idées pour la Saint-Valentin version coquine
aimerait recommencer la première nuit ensemble
se souvient le mieux de votre première nuit
a été le plus stressé ou la plus stressée la première nuit
a le plus changé ses habitudes au lit grâce à l'autre
propose les jeux coquins à deux
gagne le plus souvent aux jeux coquins
perd exprès aux jeux coquins
aime le plus le strip-poker à deux
a déjà proposé un défi coquin pendant un repas
fait monter la température en un seul regard
sait le mieux faire durer l'attente
supporte le moins bien l'attente
a déjà annulé une sortie pour rester au lit
préférerait une nuit à deux à une soirée entre amis
`)
};

/* Défis à deux : défi pour {p1}, avec {p2}. Épicé = séduction, +18 = sexualité. */
export const DARE2 = {
 tendre: L(`
Fais un massage des épaules à {p2} pendant une minute.
Dis trois choses que tu aimes chez {p2}, en {la|le:p2} regardant dans les yeux.
Fais un câlin de trente secondes à {p2} sans rien dire.
Imite {p2} quand {elle|il:p2} se réveille.
Imite {p2} quand {elle|il:p2} a faim.
Raconte votre rencontre comme un conte de fées.
Chante une chanson d'amour à {p2}, même faux.
Écris un petit mot doux pour {p2} et lis-le à voix haute.
Fais un compliment à {p2} sur un détail que personne ne remarque.
Dessine le portrait de {p2} en une minute.
Prépare une boisson pour {p2}, comme {elle|il:p2} l'aime.
Fais un bisou sur le front de {p2}.
Fais un bisou esquimau à {p2}.
Tiens la main de {p2} jusqu'à la fin de la prochaine carte.
Regarde {p2} dans les yeux pendant trente secondes sans rire.
Raconte ton plus beau souvenir avec {p2}.
Remercie {p2} pour une chose précise de cette semaine.
Fais une déclaration d'amour à {p2} avec un accent italien.
Fais une déclaration d'amour à {p2} comme dans un film des années 50.
Trouve trois nouveaux surnoms affectueux pour {p2}.
Masse les mains de {p2} pendant une minute.
Coiffe {p2} comme tu en as envie.
Fais une séance photo de {p2} comme si {elle|il:p2} était une star.
Prends un selfie avec {p2} en faisant votre plus belle grimace.
Danse un slow avec {p2} sur la chanson de son choix.
Fais rire {p2} en moins de trente secondes.
Mime un moment de votre histoire, {p2} doit deviner lequel.
Raconte à {p2} le moment où tu as su que tu l'aimais.
Décris {p2} en cinq adjectifs.
Fais la liste de cinq choses que vous ferez ensemble cette année.
Propose un rendez-vous surprise à {p2} pour la semaine prochaine.
Fais un bisou sur chaque joue de {p2}, puis sur son front.
Dessine un cœur dans la paume de {p2} avec ton doigt.
Récite un poème, même inventé, pour {p2}.
Fais un massage du cuir chevelu à {p2}.
Fais un massage des pieds à {p2} pendant une minute.
Laisse {p2} choisir la prochaine série que vous regarderez.
Promets un petit-déjeuner au lit à {p2} pour ce week-end.
Joue l'interview de {p2} comme une célébrité.
Fais un discours de remerciement à {p2} comme aux Oscars.
Mets une chanson qui te fait penser à {p2} et explique pourquoi.
Raconte à {p2} un souvenir d'enfance qu'{elle|il:p2} ne connaît pas.
Révèle à {p2} une petite manie que tu as en cachette.
Fais une imitation de toi le jour de votre premier rendez-vous.
Rejoue votre premier bisou, au ralenti.
Fais une révérence à {p2} et appelle-{la|le:p2} « Votre Majesté » pendant deux minutes.
Sers {p2} comme dans un restaurant étoilé jusqu'à la prochaine carte.
Fais une pub de trente secondes pour vendre {p2}.
Écris un acrostiche avec le prénom de {p2}.
Fais un câlin à {p2} par derrière et balance-toi doucement.
Raconte la chose la plus drôle que {p2} ait faite devant toi.
Dis à {p2} ce que tu as pensé la première fois que tu l'as vu{e|:p2}.
Fais un bisou sur chaque doigt de la main de {p2}.
Apprends un pas de danse à {p2}.
Laisse {p2} t'apprendre quelque chose qu'{elle|il:p2} sait faire.
Fais une danse ridicule pour faire sourire {p2}.
Dis « je t'aime » à {p2} de trois façons différentes.
Dis « je t'aime » à {p2} dans une autre langue.
Fais un compliment à {p2} en chantant.
Invente une chanson sur votre couple et chante le refrain.
Raconte ton rêve idéal de week-end avec {p2}.
Décris votre maison de rêve à {p2}.
Planifie votre prochain voyage en une minute, à voix haute.
Fais un bisou sur la joue de {p2} toutes les dix secondes pendant une minute.
Garde la main de {p2} dans la tienne pendant trois cartes.
Laisse {p2} poser sa tête sur tes genoux jusqu'à la prochaine carte.
Raconte une histoire pour endormir {p2}.
Imite la voix de {p2} quand {elle|il:p2} est {contrariée|contrarié:p2}.
Imite {p2} au volant.
Imite {p2} qui cherche ses clés.
Imite {p2} qui raconte une anecdote.
Rejoue votre première dispute, en mode comédie.
Écris un message tendre à {p2}, même si vous êtes à côté.
Envoie une photo de vous deux à un ami avec un message gentil.
Fais une liste de trois rêves que tu veux réaliser avec {p2}.
Raconte à {p2} le cadeau parfait que tu aimerais lui offrir.
Fais un bisou sur le nez de {p2}.
Fais un bisou sur l'épaule de {p2}.
Caresse les cheveux de {p2} pendant une minute.
Fais un câlin à {p2} comme si vous ne vous étiez pas vus depuis un an.
Rejoue des retrouvailles à l'aéroport avec {p2}.
Demande {p2} en mariage avec une bague imaginaire, pour rire.
Fais semblant d'être un serveur et prends la commande de {p2}.
Fais semblant d'être un guide touristique et fais visiter la pièce à {p2}.
Fais semblant d'être un journaliste et pose trois questions à {p2}.
Fais une prédiction sur votre couple dans dix ans.
Lis l'avenir de {p2} dans sa main.
Fais l'horoscope de {p2} pour la semaine.
Raconte à {p2} ce que tu préfères dans votre quotidien.
Fais un compliment sur le rire de {p2}.
Fais un compliment sur les mains de {p2}.
Fais un compliment sur la voix de {p2}.
Fais un compliment sur le style de {p2}.
Fais un compliment sur la cuisine de {p2}.
Fais trois bisous sur la main de {p2}.
Donne à {p2} un bon pour un massage, à utiliser quand {elle|il:p2} veut.
Donne à {p2} un bon pour une soirée où {elle|il:p2} choisit tout.
Donne à {p2} un bon pour une grasse matinée.
Promets à {p2} de faire la vaisselle demain.
Fais la liste des cinq meilleurs moments de votre histoire.
Raconte le plus beau cadeau que {p2} t'ait fait.
Raconte la chose la plus courageuse que {p2} ait faite.
Avoue une petite chose que tu n'as jamais dite à {p2}.
Avoue à {p2} un moment où tu as été {jalouse|jaloux} sans raison.
Fais une imitation de {p2} qui dort.
Fais un câlin à {p2} en {la|le:p2} soulevant, si c'est possible.
Fais tourner {p2} comme dans une danse.
Fais un slow imaginaire avec {p2}, sans musique.
Fredonne votre chanson à l'oreille de {p2}.
Choisis la playlist de votre prochain trajet en voiture.
Fais deviner un film à {p2} en le mimant.
Fais deviner une chanson à {p2} en la fredonnant.
Fais deviner un souvenir commun à {p2} en trois mots.
Écris une phrase d'amour sur un papier et cache-le dans les affaires de {p2}.
Fais une promesse à {p2} pour la semaine prochaine.
Fais un défi sportif avec {p2} : le premier qui lâche la planche a perdu.
Fais un bras de fer avec {p2}.
Fais une bataille de pouces avec {p2}.
Fais un concours de regard avec {p2}.
Fais un concours de grimaces avec {p2}.
Joue à pierre-feuille-ciseaux avec {p2}. Qui perd offre un bisou.
Fais une course jusqu'à la porte avec {p2}.
Porte {p2} sur ton dos jusqu'à la porte, si c'est possible.
Prépare un toast porté à {p2} avec un vrai discours.
Fais une liste de tout ce que tu aimes dans votre chez-vous.
Raconte la meilleure surprise que vous ayez vécue ensemble.
Raconte un moment où {p2} t'a beaucoup aidé{e|}.
Dis à {p2} ce qu'{elle|il:p2} t'a appris.
Dis à {p2} ce qui te fait rire chez {elle|lui:p2}.
Fais un bisou sur la tempe de {p2}.
Fais une couronne avec ce que tu trouves et pose-la sur la tête de {p2}.
Écris « je t'aime » sur la main de {p2} avec ton doigt.
Fais un petit massage du visage à {p2}, du bout des doigts.
Masse les épaules de {p2} en lui faisant un compliment toutes les dix secondes.
Fais un compliment à {p2} sans utiliser les mots beau ou belle.
Raconte votre histoire en trente secondes, comme une bande-annonce.
Invente le titre du film de votre histoire.
Choisis l'acteur ou l'actrice qui jouerait {p2} au cinéma.
Choisis la chanson du générique de votre histoire.
Fais une déclaration à {p2} en utilisant uniquement des titres de chansons.
Fais une déclaration à {p2} en utilisant uniquement des noms de plats.
Fais une déclaration à {p2} en mode commentateur sportif.
Fais une déclaration à {p2} en chuchotant.
Raconte ta journée idéale avec {p2}, minute par minute.
Propose une nouvelle tradition de couple.
Choisis un surnom pour votre couple.
Invente votre poignée de main secrète.
Invente votre mot de code pour quitter une soirée ensemble.
Invente un geste secret qui veut dire « je t'aime ».
Fais un bisou sur la paume de la main de {p2}.
Laisse {p2} te faire une coiffure de son choix.
Laisse {p2} choisir ta tenue de demain.
Laisse {p2} choisir le prochain restaurant.
Laisse {p2} choisir le prochain film, sans protester.
Fais un câlin à {p2} les yeux fermés pendant une minute.
Respire au même rythme que {p2} pendant trente secondes, front contre front.
Raconte à {p2} ce que tu ferais si vous aviez une journée entière rien qu'à vous.
Fais une liste de dix choses que {p2} fait mieux que toi.
Fais une liste de trois choses que tu aimerais apprendre avec {p2}.
Raconte ton souvenir préféré d'un voyage avec {p2}.
Montre à {p2} ta photo préférée de vous deux.
Raconte l'histoire de ta photo préférée de vous deux.
Trouve une nouvelle chanson pour votre playlist de couple.
Écris un message pour {p2} à ouvrir dans un an.
Fais un serment solennel ridicule à {p2}, la main sur le cœur.
Promets à {p2} de lui laisser la dernière part de dessert la prochaine fois.
Fais un bisou à {p2} à chaque fois qu'{elle|il:p2} dit ton prénom, jusqu'à la prochaine carte.
Donne la main à {p2} et marchez ensemble autour de la pièce comme au premier jour.
Fais une ola pour {p2}.
Applaudis {p2} pendant dix secondes pour une raison de ton choix.
Fais un cadeau imaginaire à {p2} et décris-le.
Décris le cadeau que tu aimerais recevoir de {p2}.
Prépare un mini spectacle de trente secondes pour {p2}.
Fais un tour de magie pour {p2}, même raté.
Raconte une blague à {p2}. S'{elle|il:p2} ne rit pas, fais-lui un bisou.
Fais une imitation de toi quand tu es {amoureuse|amoureux}.
Mime ta réaction quand {p2} t'envoie un message.
Mime ta tête quand {p2} rentre à la maison.
Fais une ola de bisous sur la joue de {p2}.
Écris trois mots qui résument votre couple.
Fais une prédiction sur votre prochain fou rire.
Raconte le premier message que tu as envoyé à {p2}.
Relis avec {p2} vos tout premiers messages.
Montre à {p2} la première photo de vous deux.
Fais un câlin à {p2} en lui chuchotant « merci ».
Fais une liste de cinq petits plaisirs que tu veux offrir à {p2} ce mois-ci.
Laisse {p2} te poser une question à laquelle tu réponds avec sincérité.
Fais un compliment à {p2} chaque fois qu'{elle|il:p2} boit, jusqu'à la prochaine carte.
Donne un baiser sur la main de {p2} comme un chevalier.
Joue {la princesse charmante|le prince charmant} qui réveille {p2} d'un bisou.
Fais un bisou sur la joue de {p2} sans utiliser tes mains.
Dessine votre futur animal de compagnie.
Dessine votre future maison en une minute.
Écris la liste de courses de votre dîner romantique idéal.
Choisis le menu de votre prochain dîner en amoureux.
Fais un massage du dos de {p2} pendant une minute.
Pose ta main sur le cœur de {p2} et dis-lui ce que tu ressens.
Raconte à {p2} ce qui te rassure chez {elle|lui:p2}.
Dis à {p2} ce que tu admires le plus chez {elle|lui:p2}.
Fais un câlin collé-serré à {p2} et compte jusqu'à vingt avant de lâcher.
Choisis une chanson et dansez comme personne ne vous regarde.
Fais une petite chorégraphie à deux avec {p2} en une minute.
Mets-toi dos à dos avec {p2} et devinez qui est le plus grand.
Joue à « ni oui ni non » avec {p2} pendant une minute.
Fais deviner un mot à {p2} en le dessinant dans son dos.
Fais deviner une émotion à {p2} rien qu'avec ton visage.
Écris un haïku pour {p2}.
Écris une carte postale imaginaire à {p2} depuis votre prochain voyage.
Raconte un rêve que tu as fait avec {p2} dedans.
Fais une promesse de couple pour l'année qui vient.
Fais un bisou à {p2} là où {elle|il:p2} te le demande sur le visage.
Laisse {p2} te faire un bisou là où {elle|il:p2} veut sur le visage.
Joue ta propre version d'une demande de rendez-vous à {p2}.
Offre une fleur imaginaire à {p2} avec un genou à terre.
Mets un fond d'écran de vous deux sur ton téléphone jusqu'à demain.
Écris une petite critique élogieuse de {p2}, comme pour un restaurant étoilé.
Note {p2} sur cinq étoiles et justifie chaque étoile.
Fais une liste de tes trois souvenirs préférés de cette année avec {p2}.
Termine cette phrase pour {p2} : « Avec toi, je me sens… »
Termine cette phrase pour {p2} : « Ce que j'aime le plus chez toi, c'est… »
Termine cette phrase pour {p2} : « Notre plus beau moment, c'était… »
Termine cette phrase pour {p2} : « Un jour, j'aimerais qu'on… »
Fais un compliment à {p2} sur sa façon de te regarder.
Raconte à {p2} un moment où tu as été {fière|fier} d'{elle|lui:p2}.
Raconte la première fois où {p2} t'a fait rire aux larmes.
Prépare une tasse de thé ou de chocolat chaud pour {p2}.
Mets une couverture sur les épaules de {p2} et fais-lui un câlin.
Choisis un film que vous regarderez ensemble ce week-end.
Écris trois qualités de {p2} sur un papier et donne-le-lui.
Fais un bisou sur les deux joues de {p2}, à la française.
Fais semblant d'être {la secrétaire|le secrétaire} de {p2} et organise sa semaine idéale.
Décris votre prochaine soirée en amoureux comme une publicité.
Raconte à {p2} ton souvenir préféré de votre premier été ensemble.
Choisis une destination au hasard sur une carte et imagine votre voyage là-bas.
Fais un câlin à {p2} pendant trois grandes respirations, au même rythme.
Fais une petite chorégraphie de remerciement pour {p2}.
Invente une recette qui porte le prénom de {p2}.
Fais une liste de cinq chansons qui vous ressemblent.
Écris une petite lettre d'amour de trois phrases et lis-la à {p2}.
Montre à {p2} comment tu lui dirais bonjour après un an loin de {elle|lui:p2}.
Fais un massage des tempes à {p2} pendant trente secondes.
Dis à {p2} ce que tu ferais si tu pouvais lui offrir n'importe quoi.
Raconte la fois où tu as eu le plus envie d'appeler {p2}.
Fais une déclaration à {p2} comme si c'était la première fois.
Dessine un soleil sur la main de {p2} avec ton doigt et explique pourquoi.
Imite ta première impression de {p2}.
Remercie {p2} pour quelque chose qu'{elle|il:p2} fait sans que personne ne le remarque.
Fais trois vœux pour votre couple, à voix haute.
Laisse {p2} choisir une musique et danse comme {elle|il:p2} te le demande.
Fais un bisou à {p2} en te mettant sur la pointe des pieds, même si c'est inutile.
Promets à {p2} une balade main dans la main cette semaine.
Raconte ce que tu as ressenti lors de votre premier rendez-vous.
Fais la liste des trois choses que {p2} fait qui te rendent la vie plus douce.
Raconte à {p2} le jour où tu as eu le plus envie de {la|le:p2} serrer dans tes bras.
Prépare en une minute un plan de pique-nique surprise pour {p2}.
Invente une médaille pour {p2} et remets-la-lui avec un discours.
Fais un bisou sur la main de {p2} et garde-la contre ta joue pendant dix secondes.
Écris le prénom de {p2} en lettres géantes avec ton doigt sur la table.
Raconte à {p2} un défaut que tu trouves mignon chez {elle|lui:p2}.
Imite le rire de {p2} jusqu'à ce qu'{elle|il:p2} rie pour de vrai.
Choisis une photo de vous deux et invente-lui une légende drôle.
Fais une liste de cinq raisons pour lesquelles tu es {heureuse|heureux} aujourd'hui avec {p2}.
Fais un massage des oreilles à {p2}, tout doucement.
Propose à {p2} une activité que vous n'avez jamais faite ensemble.
`),
 hot: L(`
Embrasse {p2} comme au tout premier bisou.
Embrasse {p2} comme dans un film romantique.
Fais un bisou dans le cou de {p2}.
Fais trois bisous dans le cou de {p2}, très lentement.
Fais un bisou derrière l'oreille de {p2}.
Mordille doucement l'oreille de {p2}.
Souffle doucement dans le cou de {p2}.
Murmure un compliment à l'oreille de {p2}.
Murmure à {p2} ce qui t'a fait craquer chez {elle|lui:p2}.
Fais un slow collé-serré avec {p2} sur une chanson lente.
Fais une danse de séduction pour {p2} pendant trente secondes.
Fais un défilé de mannequin devant {p2} avec un regard de braise.
Regarde {p2} dans les yeux pendant une minute, en silence.
Approche lentement ton visage de celui de {p2} et arrête-toi juste avant le bisou.
Joue au jeu du regard avec {p2} : le premier qui sourit offre un bisou.
Fais un massage des épaules à {p2} en déposant un bisou à la fin.
Fais un massage du cou à {p2} pendant une minute.
Masse le dos de {p2} par-dessus ses vêtements pendant une minute.
Caresse la joue de {p2} du bout des doigts.
Passe ta main dans les cheveux de {p2} en {la|le:p2} regardant.
Fais un câlin par derrière à {p2} et pose ton menton sur son épaule.
Fais un bisou sur chaque paupière de {p2}.
Fais un bisou sur le poignet de {p2}, puis remonte jusqu'au coude.
Embrasse les doigts de {p2} un par un.
Fais un bisou sur l'épaule de {p2} en écartant son col.
Prends {p2} par la taille et danse sans musique.
Fais tourner {p2} sur {elle|lui:p2}-même puis rattrape-{la|le:p2} dans tes bras.
Assieds-toi sur les genoux de {p2} pendant une carte.
Laisse {p2} s'asseoir sur tes genoux pendant une carte.
Fais une déclaration enflammée à {p2}, à genoux.
Écris un message de séduction à {p2} et envoie-le, même s'{elle|il:p2} est à côté.
Envoie à {p2} la photo de toi que tu trouves la plus séduisante.
Prends la pose la plus séduisante possible pour une photo prise par {p2}.
Fais une séance photo glamour de {p2}, en {la|le:p2} dirigeant comme un photographe de mode.
Dis à {p2} quelle partie de son visage tu préfères, et embrasse-la.
Décris à {p2} la tenue dans laquelle tu {la|le:p2} trouves irrésistible.
Raconte à {p2} le moment où {elle|il:p2} t'a le plus troublé{e|}.
Raconte à {p2} votre premier bisou avec tous les détails.
Rejoue votre premier bisou, en mieux.
Joue la scène du balcon de Roméo et Juliette avec {p2}.
Rejoue la scène finale de « Dirty Dancing » avec {p2}, porté facultatif.
Rejoue la scène de la poterie de « Ghost » avec un verre et {p2}.
Mange un fruit de la façon la plus séduisante possible devant {p2}.
Donne une bouchée de quelque chose à {p2}, de façon séduisante.
Bois une gorgée bras dessus bras dessous avec {p2}.
Trinque avec {p2} les yeux dans les yeux et bois sans détourner le regard.
Partage un bonbon long avec {p2}, chacun par un bout, jusqu'au bisou.
Fais passer un glaçon de ta main au cou de {p2}.
Fais un bisou à {p2} avec les lèvres froides après une gorgée glacée.
Dessine un cœur sur la nuque de {p2} avec ton doigt.
Écris un mot doux dans le dos de {p2} avec ton doigt, {elle|il:p2} doit deviner.
Fais frissonner {p2} sans {la|le:p2} toucher, rien qu'avec ton souffle.
Fais rougir {p2} en moins de trente secondes.
Dis à {p2} la chose la plus séduisante qu'{elle|il:p2} ait jamais faite sans s'en rendre compte.
Fais une déclaration à {p2} uniquement avec des regards et des gestes.
Embrasse {p2} pendant dix secondes.
Embrasse {p2} sans utiliser tes mains.
Embrasse {p2} en lui tenant le visage entre tes mains.
Fais un bisou papillon avec tes cils sur la joue de {p2}.
Fais des bisous de la tempe jusqu'au menton de {p2}.
Retire délicatement une mèche du visage de {p2} et embrasse son front.
Remets le col de {p2} en place, très lentement.
Défais un bouton de la veste ou du gilet de {p2}, puis referme-le.
Laisse {p2} choisir où tu dois lui faire un bisou sur le visage.
Laisse {p2} te faire un bisou là où {elle|il:p2} veut sur le visage et le cou.
Laisse {p2} te masser les épaules pendant une minute.
Laisse {p2} te guider les yeux bandés à travers la pièce.
Les yeux fermés, reconnais {p2} à son parfum.
Les yeux fermés, devine où {p2} va t'embrasser.
Les yeux bandés, laisse {p2} te faire goûter quelque chose.
Fais goûter quelque chose à {p2} les yeux fermés.
Invite {p2} à danser comme dans un bal ancien.
Danse une bachata ou une salsa avec {p2}.
Fais une valse avec {p2} dans le salon.
Fais un tango théâtral avec {p2}, une rose imaginaire entre les dents.
Chante une chanson d'amour à l'oreille de {p2}.
Fredonne votre chanson en dansant collé{e|} à {p2}.
Fais une déclaration à {p2} en italien, même inventé.
Récite un poème d'amour à {p2} en {la|le:p2} regardant dans les yeux.
Écris trois mots qui décrivent {p2} quand {elle|il:p2} est séduisant{e|:p2}.
Dis à {p2} ce que tu as envie de faire avec {elle|lui:p2} lors de votre prochain week-end en amoureux.
Propose à {p2} un rendez-vous galant pour cette semaine, avec heure et lieu.
Décris à {p2} votre dîner aux chandelles idéal.
Raconte à {p2} un rêve romantique que tu as fait sur {elle|lui:p2}.
Fais un câlin à {p2} pendant toute une chanson.
Pose ta tête sur la poitrine de {p2} et écoute son cœur.
Pose la main de {p2} sur ton cœur pendant que tu lui dis un compliment.
Prends la main de {p2} et embrasse l'intérieur de son poignet.
Fais un massage des mains de {p2} avec de la crème, si vous en avez.
Fais un massage des pieds à {p2}, avec un bisou à la fin.
Chatouille {p2} jusqu'à ce qu'{elle|il:p2} demande un bisou pour arrêter.
Lance une bataille de coussins qui finit par un bisou.
Fais un bisou à {p2} à chaque fois qu'{elle|il:p2} cligne des yeux pendant dix secondes.
Fais un compliment osé, mais élégant, à {p2}.
Dis à {p2} une phrase de drague comme si vous ne vous connaissiez pas.
Joue une scène de rencontre dans un bar avec {p2}, comme deux inconnus.
Drague {p2} avec la pire phrase d'accroche, sans rire.
Drague {p2} avec la meilleure phrase d'accroche que tu connaisses.
Drague {p2} uniquement avec des titres de films.
Drague {p2} comme un personnage de dessin animé.
Fais semblant d'être un serveur qui drague {p2}.
Fais semblant de rencontrer {p2} pour la première fois et demande son numéro.
Écris ton numéro sur la main de {p2}, comme à une première rencontre.
Glisse un mot doux dans la poche de {p2}.
Cache un mot doux quelque part pour que {p2} le trouve demain.
Envoie un message tendre à {p2} programmé pour demain matin.
Fais une liste de trois choses qui te font craquer chez {p2}.
Dis à {p2} le geste qu'{elle|il:p2} fait qui te fait fondre.
Imite le regard que {p2} te lance quand {elle|il:p2} veut un bisou.
Montre à {p2} le regard que tu lui lances quand tu veux un bisou.
Fais un bisou à {p2} en {la|le:p2} renversant légèrement, comme au cinéma.
Embrasse {p2} sous un drap tendu, comme sous une tente.
Fais une cabane avec un drap et passe une minute dedans avec {p2}.
Fais la cuillère avec {p2} sur le canapé pendant une minute.
Allonge-toi la tête sur les genoux de {p2} et laisse-{la|le:p2} te caresser les cheveux.
Caresse le visage de {p2} les yeux fermés, comme pour le mémoriser.
Dessine les contours du visage de {p2} du bout du doigt.
Embrasse {p2} sur le nez, puis sur la bouche.
Fais trois bisous à {p2} : un tendre, un drôle et un passionné.
Fais deviner une chanson d'amour à {p2} en la fredonnant tout contre son oreille.
Fais un compliment à {p2} sur sa bouche.
Fais un compliment à {p2} sur ses yeux, en {la|le:p2} regardant fixement.
Fais un compliment à {p2} sur sa voix et demande-lui de dire ton prénom.
Demande à {p2} de te murmurer ton prénom de la façon la plus séduisante possible.
Murmure le prénom de {p2} de la façon la plus séduisante possible.
Retire la veste ou le pull de {p2}, très lentement, en gardant son haut.
Retire ta veste ou ton pull de la façon la plus séduisante possible.
Retire une chaussette de {p2} avec élégance.
Enlève tes boucles d'oreilles, ta montre ou un bijou de façon séduisante.
Mets du baume à lèvres à {p2}, tout doucement.
Mets un peu de ton parfum sur le cou de {p2}.
Sens le cou de {p2} et décris son parfum.
Fais un bisou sur la clavicule de {p2}.
Fais une trace de bisous de l'épaule jusqu'au cou de {p2}.
Pose ta main sur le genou de {p2} pendant trois cartes.
Tiens {p2} par la taille pendant la prochaine carte.
Ne lâche pas la main de {p2} jusqu'à la fin de la partie.
Assieds-toi tout contre {p2} jusqu'à la prochaine carte.
Raconte à {p2} ce que tu as ressenti pendant votre premier slow.
Avoue à {p2} un moment où tu as eu très envie de l'embrasser sans oser.
Avoue à {p2} un fantasme romantique, sans rien de plus.
Décris à {p2} l'endroit le plus romantique où tu aimerais l'embrasser.
Choisis où vous échangerez votre prochain bisou mémorable.
Promets un baiser sous la pluie à {p2} à la prochaine averse.
Promets à {p2} un slow dans la cuisine ce soir.
Prépare un cocktail ou un mocktail pour {p2} et sers-le avec un compliment.
Joue un barman séducteur pour {p2} pendant une minute.
Lis l'avenir amoureux de {p2} dans sa main, en version très séduisante.
Fais l'horoscope amoureux de {p2} pour cette nuit.
Raconte une histoire romantique où {p2} est {l'héroïne|le héros:p2}.
Fais une déclaration à {p2} comme dans une télénovela.
Fais une scène de jalousie théâtrale à {p2}, puis réconcilie-toi avec un bisou.
Fais une scène de retrouvailles passionnées avec {p2}.
Fais semblant de partir en voyage et dis au revoir à {p2} comme sur un quai de gare.
Fais une demande de bisou très officielle à {p2}, avec un formulaire imaginaire.
Négocie un bisou avec {p2} comme dans une réunion d'affaires.
Fais un compliment à {p2} en chuchotant dans chaque oreille.
Dis à {p2} trois choses que tu aimerais faire avec {elle|lui:p2} ce week-end.
Décris à {p2} votre nuit idéale à l'hôtel, version romantique.
Prépare une petite ambiance : lumière tamisée et musique douce pour la prochaine carte.
Allume une bougie ou baisse la lumière et regarde {p2} en silence pendant trente secondes.
Mets une chanson sensuelle et danse avec {p2}, front contre front.
Danse avec {p2} sans vous lâcher pendant une chanson entière.
Danse avec {p2} les yeux fermés.
Fais un slow avec {p2} en lui murmurant les paroles.
Écris une lettre d'amour de quatre lignes à {p2}, en mode très passionné.
Fais une déclaration à {p2} en remplaçant tous les mots d'amour par des noms de fromages.
Fais un bisou à {p2} à travers une feuille de papier.
Fais un bisou à {p2} avec du chocolat sur les lèvres.
Mange un carré de chocolat avec {p2}, chacun d'un côté, jusqu'au bisou.
Fais un clin d'œil, un sourire, puis un bisou soufflé à {p2}.
Lance un regard séducteur à {p2} depuis l'autre bout de la pièce, puis approche-toi lentement.
Joue avec {p2} deux inconnus qui se croisent et tombent sous le charme.
Fais semblant de bousculer {p2} et ramasse ses affaires en {la|le:p2} regardant dans les yeux.
Invente un pas de danse séduisant et apprends-le à {p2}.
Apprends à {p2} à faire un baisemain parfait.
Fais un baisemain à {p2}.
Fais un bisou à {p2} en {la|le:p2} prenant par surprise.
Embrasse {p2} au moment où {elle|il:p2} s'y attend le moins dans la soirée.
Dis à {p2} un compliment que tu n'as jamais osé faire.
Raconte à {p2} ce qui te plaît quand {elle|il:p2} sort de la douche.
Raconte à {p2} ce qui te plaît quand {elle|il:p2} se réveille.
Dis à {p2} quel vêtement tu préfères lui voir porter.
Laisse {p2} choisir une tenue que tu porteras pour votre prochain rendez-vous.
Choisis une tenue que {p2} portera pour votre prochain rendez-vous.
Fais un massage du cuir chevelu à {p2} en lui murmurant des mots doux.
Fais un bisou à {p2} à chaque fois que tu dis son prénom pendant une minute.
Laisse {p2} te dessiner un cœur sur la joue avec du rouge à lèvres, si vous en avez.
Fais une marque de rouge à lèvres sur la joue de {p2}, si vous en avez.
Réveille le côté romantique de {p2} avec une phrase de film culte.
Fais une liste des cinq plus beaux bisous de votre histoire.
Raconte le bisou le plus fou que vous ayez échangé.
Choisis un lieu où vous referez votre premier bisou.
Fais une danse lente avec {p2} en faisant semblant d'être au bal de fin d'année.
Porte {p2} jusqu'au canapé comme {une mariée|un marié:p2}, si c'est possible.
Pose un bisou sur chaque doigt de pied de {p2}, en riant.
Laisse {p2} te chuchoter un secret à l'oreille.
Chuchote un secret à l'oreille de {p2}.
Fais un massage de trente secondes à {p2}, là où {elle|il:p2} le demande au-dessus de la ceinture.
Fais un câlin à {p2} en lui frottant doucement le dos.
Pose ton front contre celui de {p2} et respirez ensemble.
Dis « je t'aime » à {p2} de la façon la plus séduisante possible.
Fais à {p2} une déclaration en trois mots seulement.
Embrasse {p2} au ralenti, comme dans une publicité de parfum.
Joue une publicité de parfum avec {p2}.
Fais une démonstration de ton meilleur regard de {séductrice|séducteur} à {p2}.
Imite ta technique de drague du début sur {p2}.
Laisse {p2} imiter ta technique de drague du début.
Fais un bisou sur la nuque de {p2}.
Fais un bisou à l'intérieur de la paume de {p2}.
Fais un bisou dans les cheveux de {p2} en respirant son parfum.
Embrasse {p2} en comptant jusqu'à cinq à voix basse.
Embrasse {p2} et termine par un bisou sur le front.
Fais un bisou à {p2} les yeux fermés, en te laissant guider par sa voix.
Fais une danse lente devant {p2} en enlevant ton écharpe ou ta veste.
Fais un compliment à {p2} sur sa démarche.
Fais un compliment à {p2} sur son sourire en coin.
Raconte à {p2} la dernière fois qu'{elle|il:p2} t'a fait de l'effet en public.
Raconte à {p2} ce que tu as pensé de sa tenue ce soir.
Dis à {p2} ce que tu aimerais lui murmurer en soirée devant tout le monde.
Envoie un message séduisant à {p2} et regarde sa réaction.
Montre à {p2} le geste que tu fais pour dire « on rentre ».
Invente avec {p2} un signal secret qui veut dire « embrasse-moi ».
Fais un câlin à {p2} contre un mur, juste un câlin.
Plaque doucement {p2} contre un mur et regarde-{la|le:p2} sans rien dire pendant dix secondes.
Approche-toi de {p2} comme pour l'embrasser, puis fais-lui un bisou sur la joue.
Tourne autour de {p2} en {la|le:p2} regardant, comme dans une scène de danse.
Joue un tango avec {p2} en {la|le:p2} regardant fixement du début à la fin.
Fais un bisou à {p2} à chaque fois qu'{elle|il:p2} rit pendant une minute.
Laisse {p2} te nourrir avec une fraise ou un bonbon.
Nourris {p2} avec une fraise ou un bonbon, en {la|le:p2} regardant.
Prends un selfie de vous deux en train de vous embrasser.
Prends une photo de {p2} dans sa pose la plus charmante.
Écris un compliment sur un post-it et colle-le sur {p2}.
Écris « je pense à toi » quelque part où {p2} le verra demain.
Fais le portrait de {p2} en trois adjectifs séduisants.
Décris la première fois que tu as eu envie d'embrasser {p2}.
Décris le regard de {p2} quand {elle|il:p2} est {amoureuse|amoureux:p2}.
Fais un massage des avant-bras de {p2} du bout des doigts.
Dessine des cercles dans le dos de {p2} avec tes doigts pendant trente secondes.
Caresse les mains de {p2} pendant que tu lui dis ce qui te plaît chez {elle|lui:p2}.
Fais un bisou sur la main de {p2}, puis sur son épaule, puis sur sa joue.
Fais deviner à {p2} où tu vas lui faire un bisou, puis fais-le ailleurs.
Mets ta main dans la poche arrière de {p2} jusqu'à la prochaine carte.
Garde ton bras autour des épaules de {p2} pendant deux cartes.
Fais un slow avec {p2} sur une chanson ringarde, sans rire.
Raconte ton rendez-vous idéal avec {p2} comme une scène de film.
Joue avec {p2} une scène de demande en mariage très romantique, pour rire.
Fais une déclaration à {p2} en chuchotant chaque mot.
Dis à {p2} trois mots qui te font penser à {elle|lui:p2} quand tu es loin.
Avoue à {p2} une pensée romantique que tu as eue aujourd'hui.
Promets à {p2} un massage d'un quart d'heure ce soir.
Promets à {p2} une soirée en tête-à-tête cette semaine, sans téléphone.
Fais un câlin à {p2} enroulé dans une couverture.
Partage une gorgée avec {p2} dans le même verre, en même temps.
Fais un bisou à {p2} à chaque tour de musique jusqu'à la prochaine carte.
Dis à {p2} quelle est la plus belle photo d'{elle|lui:p2} selon toi.
Embrasse {p2} puis dis-lui ce que tu as ressenti, en un mot.
Danse un slow avec {p2} en vous tenant uniquement par le bout des doigts.
Laisse {p2} te faire danser comme {elle|il:p2} veut pendant trente secondes.
Lance un regard à {p2} qui veut dire « tu me plais », sans rire.
Fais semblant de séduire {p2} dans un ascenseur.
Fais rire {p2}, puis embrasse-{la|le:p2} au milieu du fou rire.
`),
 x18: L(`
Enlève un vêtement de {p2}, lentement, en {la|le:p2} regardant dans les yeux.
Enlève un de tes vêtements de la façon la plus sexy possible.
Fais un strip-tease d'une minute pour {p2}.
Fais une lap dance de trente secondes à {p2}.
Déshabille {p2} jusqu'aux sous-vêtements, sans utiliser tes mains plus de dix secondes.
Fais un massage sensuel de deux minutes à {p2}, à l'huile si vous en avez.
Masse le dos de {p2} sous ses vêtements pendant une minute.
Embrasse le ventre de {p2}, en descendant doucement jusqu'au nombril.
Embrasse {p2} de la nuque jusqu'au bas du dos.
Fais un suçon à {p2} là où personne ne le verra.
Laisse {p2} te faire un suçon là où {elle|il:p2} veut, sauf dans le cou.
Mordille la lèvre de {p2} pendant un baiser.
Embrasse {p2} passionnément pendant trente secondes.
Embrasse chaque centimètre du cou de {p2}.
Passe un glaçon sur le ventre de {p2}, puis réchauffe sa peau avec tes lèvres.
Fais glisser un glaçon le long de la colonne de {p2}.
Bande les yeux de {p2} et embrasse-{la|le:p2} à trois endroits surprises.
Bande les yeux de {p2} et fais-lui deviner quelle partie de ton corps {elle|il:p2} touche.
Laisse {p2} te bander les yeux et te guider pendant une minute.
Attache doucement les poignets de {p2} avec une écharpe pendant deux minutes.
Laisse {p2} t'attacher les poignets avec une écharpe pendant deux minutes.
Murmure à {p2} ce que tu as envie de lui faire ce soir.
Murmure à {p2} ton fantasme le plus récent.
Décris à {p2}, à l'oreille, votre meilleure nuit ensemble.
Raconte à {p2} ce qui t'a le plus excité{e|} chez {elle|lui:p2} dernièrement.
Dis à {p2} quelle partie de son corps tu préfères, et embrasse-la.
Montre à {p2} où tu aimes le plus être embrassé{e|}.
Guide la main de {p2} là où tu aimes être caressé{e|}.
Laisse {p2} guider ta main là où {elle|il:p2} aime être caressé{e|:p2}.
Fais une caresse à {p2} du bout des doigts, de la tête aux pieds, par-dessus les vêtements.
Caresse {p2} du bout des doigts de la tête aux pieds, sous les vêtements.
Assieds-toi à califourchon sur {p2} pendant une minute.
Laisse {p2} s'asseoir à califourchon sur toi pendant une minute.
Embrasse {p2} en {la|le:p2} plaquant doucement contre le mur.
Porte {p2} jusqu'au lit, si c'est possible.
Dis à {p2} ta position préférée avec {elle|lui:p2}.
Mime ta position préférée avec {p2}, habillés.
Choisis une position du Kamasutra que vous testerez bientôt.
Propose à {p2} un endroit insolite de la maison pour ce soir.
Fais l'amour à {p2} avec les yeux pendant une minute, sans {la|le:p2} toucher.
Danse collé contre {p2} pendant une chanson lente.
Danse de façon très suggestive devant {p2} pendant trente secondes.
Enlève tes sous-vêtements sans enlever tes vêtements et donne-les à {p2}.
Garde uniquement tes sous-vêtements jusqu'à la prochaine carte.
Montre à {p2} les sous-vêtements que tu portes.
Laisse {p2} choisir les sous-vêtements que tu porteras demain.
Choisis la tenue coquine que {p2} portera lors de votre prochaine soirée en amoureux.
Envoie à {p2} une photo osée, même s'{elle|il:p2} est à côté de toi.
Prends une photo coquine de {p2}, avec son accord, puis supprimez-la ensemble.
Écris un sexto à {p2} et lis-le à voix haute.
Lis à {p2} un passage érotique trouvé sur internet, avec ta voix la plus sexy.
Invente une scène érotique dont {p2} est {l'héroïne|le héros:p2}, en trois phrases.
Joue une scène de jeu de rôle avec {p2} : deux inconnus dans un ascenseur.
Joue une scène de jeu de rôle avec {p2} : le plombier ou la plombière qui arrive au mauvais moment.
Joue une scène de jeu de rôle avec {p2} : patient et médecin très attentionné.
Joue une scène de jeu de rôle avec {p2} : client et masseur ou masseuse.
Choisis le jeu de rôle de votre prochaine soirée.
Fais un massage des fesses à {p2} pendant trente secondes.
Donne une petite fessée à {p2}, si {elle|il:p2} est d'accord.
Laisse {p2} te donner une petite fessée.
Embrasse l'intérieur des cuisses de {p2}, par-dessus les vêtements.
Embrasse l'intérieur des cuisses de {p2}, sans vêtements, si {elle|il:p2} le veut.
Lèche un peu de chantilly ou de chocolat sur la peau de {p2}, là où {elle|il:p2} choisit.
Dépose un peu de miel sur ton cou et laisse {p2} le goûter.
Bois une gorgée sur le ventre de {p2}, sans les mains.
Fais un body shot sur {p2} avec la boisson de ton choix.
Souffle de l'air chaud, puis de l'air frais, dans le cou de {p2}.
Promène tes lèvres le long du bras de {p2}, sans l'embrasser.
Mordille doucement l'épaule de {p2}.
Embrasse {p2} derrière les genoux.
Fais un massage des pieds à {p2} qui remonte jusqu'aux genoux.
Fais languir {p2} : embrasse-{la|le:p2} partout sauf sur la bouche pendant une minute.
Interdis à {p2} de te toucher pendant que tu l'embrasses une minute.
Laisse {p2} t'embrasser où {elle|il:p2} veut pendant une minute, sans bouger.
Allonge-toi et laisse {p2} faire ce qu'{elle|il:p2} veut pendant deux minutes, dans vos limites.
Choisis un mot de sécurité pour vos jeux coquins.
Dis à {p2} une chose que tu n'as jamais osé lui demander au lit.
Demande à {p2} une chose qu'{elle|il:p2} aimerait essayer avec toi.
Fais la liste de trois envies coquines à tester ce mois-ci.
Écris un fantasme sur un papier et donne-le à {p2} pour plus tard.
Tire au sort un des fantasmes de {p2} et promets de le réaliser.
Raconte à {p2} ton rêve érotique le plus marquant avec {elle|lui:p2}.
Imite ce que tu fais pour faire comprendre à {p2} que tu as envie.
Fais comprendre à {p2} que tu as envie, sans dire un mot.
Fais un bisou à {p2} à un endroit que tu n'as encore jamais embrassé.
Fais découvrir à {p2} une nouvelle zone sensible chez toi.
Cherche la zone la plus sensible de {p2} du bout des doigts. {Elle|Il:p2} dit « chaud » ou « froid ».
Embrasse {p2} en descendant lentement le long de son corps, puis remonte.
Prends une douche avec {p2} ce soir, promis.
Propose à {p2} un bain à deux, avec bougies.
Mets une musique sensuelle et déshabillez-vous mutuellement.
Retire le haut de {p2} avec les dents, si tu peux.
Défais la ceinture de {p2} d'une seule main.
Dégrafe un vêtement de {p2} les yeux fermés.
Enlève les chaussettes de {p2} de la façon la plus sexy possible.
Fais une caresse dans le bas du dos de {p2}, sous ses vêtements.
Glisse tes mains sous le haut de {p2} pendant un baiser.
Laisse {p2} glisser ses mains sous ton haut pendant un baiser.
Embrasse {p2} sur la bouche pendant une minute entière.
Embrasse {p2} avec un glaçon dans la bouche.
Embrasse {p2} avec un bonbon à la menthe, puis souffle doucement sur ses lèvres.
Fais un massage du cuir chevelu à {p2} qui finit en baisers dans le cou.
Raconte à {p2} l'endroit le plus fou où tu aimerais faire l'amour avec {elle|lui:p2}.
Choisis une pièce de la maison pour la prochaine fois, autre que la chambre.
Promets à {p2} une soirée coquine surprise cette semaine.
Laisse {p2} choisir la musique de votre prochaine nuit.
Réveille {p2} demain matin de la façon la plus coquine possible.
Envoie un message coquin à {p2} demain pendant sa journée.
Fais une liste de tes cinq moments les plus torrides avec {p2}.
Rejoue votre première nuit ensemble en la racontant à voix basse.
Montre à {p2} comment tu aimes être embrassé{e|} dans le cou.
Montre à {p2} comment tu aimes être déshabillé{e|}.
Demande à {p2} de te montrer comment {elle|il:p2} aime être déshabillé{e|:p2}.
Fais un câlin peau contre peau avec {p2} pendant une minute.
Allonge-toi contre {p2} et respirez au même rythme, sans vêtements.
Embrasse {p2} en lui caressant le visage, puis le cou, puis plus bas.
Pose tes mains sur les hanches de {p2} et rapproche-{la|le:p2} de toi.
Fais une marque de rouge à lèvres ou de baiser sur le ventre de {p2}.
Écris un mot coquin sur la peau de {p2} avec ton doigt, {elle|il:p2} doit deviner.
Écris un mot coquin au stylo sur ta peau, dans un endroit que {seule|seul:p2} {p2} verra.
Laisse {p2} écrire un mot coquin sur ta peau, là où {elle|il:p2} veut.
Joue au strip-pierre-feuille-ciseaux avec {p2} pendant trois manches.
Lance un dé : le chiffre indique combien de vêtements {p2} t'enlève.
Lance un dé : le chiffre indique combien de baisers tu déposes sur le corps de {p2}.
Ferme les yeux et laisse {p2} te toucher où {elle|il:p2} veut pendant trente secondes.
Fais durer un baiser jusqu'à ce que {p2} supplie d'arrêter ou de continuer.
Taquine {p2} avec des baisers légers pendant une minute, sans aller plus loin.
Interdis à {p2} de bouger pendant que tu l'effleures pendant une minute.
Fais monter la température sans enlever un seul vêtement, pendant une minute.
Dis à {p2} un mot coquin que tu aimes entendre.
Dis à {p2} la phrase la plus coquine que tu oses.
Demande à {p2} de te dire la phrase la plus coquine qu'{elle|il:p2} ose.
Choisis un sextoy que vous aimeriez essayer ensemble.
Propose à {p2} d'utiliser un sextoy ce soir, si vous en avez un.
Montre à {p2} comment tu utiliserais l'huile de massage.
Fais un massage avec une plume ou un tissu doux sur la peau de {p2}.
Lèche doucement le lobe de l'oreille de {p2}.
Embrasse {p2} en descendant de l'oreille jusqu'à l'épaule.
Fais un bisou sur la poitrine ou le torse de {p2}.
Fais un bisou sur le bas du ventre de {p2}.
Retourne {p2} et embrasse tout son dos.
Fais le tour du corps de {p2} avec des baisers, sans oublier un endroit.
Imite les bruits que tu fais quand tu prends du plaisir, version comique.
Choisis le prochain endroit où tu laisseras une marque à {p2}.
Donne trois ordres coquins à {p2}. {Elle|Il:p2} peut en refuser un.
Laisse {p2} te donner trois ordres coquins. Tu peux en refuser un.
Sois aux ordres de {p2} pendant deux minutes, dans vos limites.
Garde {p2} à tes ordres pendant deux minutes, dans vos limites.
Choisis une tenue que {p2} doit enlever devant toi.
Retire un vêtement à chaque fois que {p2} te fait un compliment.
Retire un vêtement à {p2} à chaque bonne réponse à une question sur toi.
Pose une question coquine à {p2}. S'{elle|il:p2} refuse de répondre, {elle|il:p2} enlève un vêtement.
Raconte à {p2} le moment où tu as eu le plus envie d'{elle|lui:p2} en public.
Raconte à {p2} la plus folle idée coquine que tu as eue en {la|le:p2} regardant.
Avoue à {p2} un fantasme que tu n'as jamais dit.
Décris à {p2} la lingerie ou la tenue que tu rêves de lui voir porter.
Propose une date pour votre prochaine nuit à l'hôtel.
Réserve une heure de votre semaine rien que pour vous deux, au lit.
Fais un câlin coquin à {p2} sous une couverture pendant la prochaine carte.
Glisse ta main dans la poche de {p2} de façon coquine.
Pose ta main sur la cuisse de {p2} et laisse-la remonter doucement.
Laisse {p2} poser sa main sur ta cuisse et remonter doucement.
Fais un baiser à {p2} en {la|le:p2} tenant par la nuque.
Embrasse {p2} jusqu'à en perdre le souffle.
Enlace {p2} contre toi et dis-lui à l'oreille ce que tu ressens.
Fais deviner à {p2} ta prochaine envie en trois indices.
Mime ce que tu vas faire à {p2} dans dix minutes.
Fixe un rendez-vous coquin à {p2} dans dix minutes, dans une autre pièce.
Choisis une chanson : vous vous embrassez jusqu'à la fin.
Choisis une chanson : {p2} danse pour toi jusqu'à la fin.
Embrasse {p2} sous la douche, habillés ou non.
Fais l'amour à {p2} avec des mots seulement, pendant une minute.
Laisse-toi guider par {p2} les yeux fermés jusqu'au lit.
Allonge {p2} sur le lit et embrasse-{la|le:p2} des pieds à la tête.
Fais un massage à {p2} avec ton corps entier, sans les mains.
Raconte à {p2} ce que tu préfères dans vos câlins du matin.
Propose à {p2} un câlin coquin dans un endroit où vous ne l'avez jamais fait.
Laisse {p2} choisir la position de ce soir.
Choisis la position de ce soir.
Embrasse {p2} en prenant ton temps, comme si vous aviez toute la nuit.
Ralentis tout : déshabillez-vous mutuellement en trois minutes minimum.
Accélère tout : déshabillez-vous mutuellement en moins de vingt secondes.
Fais un bisou à {p2} à chaque vêtement que tu lui enlèves.
Enlève un vêtement à {p2} pour chaque compliment que tu lui fais.
Fais un compliment coquin à chaque partie du corps de {p2} que tu embrasses.
Décris à {p2}, à voix basse, la première chose que tu feras quand vous serez seuls.
Joue à « chaud ou froid » avec ta bouche sur la peau de {p2}.
Fais un massage du ventre de {p2}, du bout des doigts.
Masse les épaules de {p2} en embrassant sa nuque.
Choisis un endroit du corps de {p2} que tu as le droit d'embrasser pendant toute une minute.
Fais une proposition indécente à {p2}, très poliment.
Fais une proposition indécente à {p2}, en vers.
Laisse {p2} te faire une proposition indécente, et réponds honnêtement.
Écris votre programme coquin du week-end en trois points.
Range ton téléphone et consacre les cinq prochaines minutes à {p2}.
Embrasse le cou de {p2} jusqu'à ce qu'{elle|il:p2} frissonne.
Fais frissonner {p2} uniquement avec tes lèvres.
Fais frissonner {p2} uniquement avec tes mains.
Fais frissonner {p2} uniquement avec ton souffle.
Embrasse {p2} en lui tenant les poignets au-dessus de la tête.
Laisse {p2} te tenir les poignets pendant un baiser.
Murmure à {p2} trois mots qui décrivent ton envie du moment.
Raconte à {p2} ta plus belle nuit avec {elle|lui:p2} en trois phrases.
Dis à {p2} ce que tu as aimé la dernière fois.
Dis à {p2} ce que tu aimerais refaire très vite.
Dis à {p2} ce que tu aimerais essayer la prochaine fois.
Décris à {p2} un endroit de son corps que tu adores, sans le nommer.
Embrasse {p2} à l'endroit que tu viens de décrire.
Fais un massage à {p2} en remontant lentement le long de ses jambes.
Masse la nuque de {p2} puis descends le long de son dos.
Embrasse {p2} en faisant glisser une main dans son dos.
Mets-toi derrière {p2}, enlace-{la|le:p2} et embrasse son cou.
Mets-toi face à {p2}, très près, et ne bouge plus pendant dix secondes.
Fais tomber un vêtement de {p2} sans le toucher avec tes mains.
Déboutonne le haut de {p2} avec les dents, ou essaie.
Enlève tes chaussettes et ton haut en dansant.
Enlève le bas de {p2} très lentement, si {elle|il:p2} est d'accord.
Restez en sous-vêtements tous les deux jusqu'à la prochaine carte.
Restez tous les deux sans vêtements jusqu'à la prochaine carte.
Embrasse {p2} en descendant le long de sa colonne vertébrale.
Dépose une trace de baisers sur la hanche de {p2}.
Mordille doucement la hanche de {p2}.
Mordille le lobe de l'oreille de {p2} en lui murmurant son prénom.
Fais une caresse très lente sur la cuisse de {p2}.
Effleure le corps de {p2} sans jamais vraiment le toucher pendant trente secondes.
Prends la main de {p2} et embrasse le bout de chaque doigt.
Prends un doigt de {p2} entre tes lèvres en {la|le:p2} regardant dans les yeux.
Laisse {p2} poser ses mains où {elle|il:p2} veut sur toi pendant trente secondes.
Pose tes mains où tu veux sur {p2} pendant trente secondes, avec son accord.
Fais un câlin coquin à {p2} sans utiliser tes mains.
Montre à {p2} ton geste préféré pour commencer une nuit.
Recrée le moment le plus torride de votre histoire, en version courte.
Imagine avec {p2} le scénario de votre prochaine nuit, à voix haute.
Proposez chacun une idée coquine, et choisissez-en une pour ce soir.
Écris sur deux papiers « tendre » et « sauvage ». {p2} tire au sort le programme de ce soir.
Tire au sort avec {p2} la pièce de votre prochain câlin coquin.
Choisis un mot que {p2} doit dire pour que tu l'embrasses partout.
Embrasse {p2} à chaque fois qu'{elle|il:p2} soupire pendant une minute.
Fais une pause de trente secondes en plein baiser, puis reprends.
Joue au jeu du « pas avant que je le dise » avec {p2} pendant une minute.
Laisse {p2} décider quand tu as le droit de l'embrasser pendant une minute.
Embrasse {p2} en lui disant ce que tu ressens entre chaque baiser.
Dis à {p2} le surnom coquin que tu aimerais qu'{elle|il:p2} te donne.
Donne un surnom coquin à {p2} et utilise-le toute la soirée.
Envoie un vocal coquin à {p2}, qu'{elle|il:p2} écoutera demain.
Prépare un bon pour une nuit sans limites, dans vos limites, et offre-le à {p2}.
Offre à {p2} un bon pour un massage sensuel d'une demi-heure.
Offre à {p2} un bon pour un réveil coquin.
Promets à {p2} de réaliser un de ses fantasmes ce mois-ci.
Demande à {p2} de te décrire sa nuit idéale avec toi.
Écoute {p2} te décrire un fantasme sans l'interrompre.
Raconte à {p2} un fantasme en le chuchotant, mot par mot.
Lis un passage coquin avec {p2}, chacun une phrase.
Regarde {p2} en te mordant la lèvre pendant dix secondes.
Lance à {p2} le regard le plus torride dont tu sois capable.
Fais une danse sensuelle sur {p2} assis{e|:p2} sur une chaise.
Laisse {p2} faire une danse sensuelle sur toi, assis{e|} sur une chaise.
Fais un massage avec une serviette chaude sur le dos de {p2}.
Fais couler un peu d'eau tiède dans le dos de {p2} sous la douche.
Lave les cheveux de {p2} sous la douche ce soir, promis.
Fais la cuillère avec {p2}, sans vêtements, pendant une minute.
Embrasse {p2} à la lumière d'une seule bougie.
Éteins la lumière et retrouve {p2} uniquement au toucher.
Choisis un endroit du corps de {p2} que tu n'as jamais assez embrassé, et rattrape le retard.
Fais un bisou à {p2} à chaque endroit qu'{elle|il:p2} te désigne, pendant une minute.
`)
};

/* Cœur à cœur : questions de conversation */
export const TALK = {
 light: L(`
Quel est ton petit plaisir préféré du quotidien ?
Quelle est la meilleure partie de ta journée en général ?
Qu'est-ce qui t'a fait sourire aujourd'hui ?
Quel plat pourrais-tu manger toute ta vie sans te lasser ?
Quelle chanson te met de bonne humeur instantanément ?
Quel film pourrais-tu regarder encore et encore ?
Quelle série nous conseillerais-tu de regarder ensemble ?
Si on partait demain, où irais-tu ?
Plutôt soirée canapé ou soirée dehors ce week-end ?
Quel est le meilleur restaurant où on soit allés ensemble ?
Quel est le meilleur repas que je t'ai préparé ?
Quelle est ta saison préférée pour un voyage à deux ?
Quel est ton souvenir de vacances d'enfance préféré ?
Quel super-pouvoir aimerais-tu avoir pour une journée ?
Quel animal serais-tu, et quel animal serais-je ?
Si notre couple était un film, ce serait quel genre ?
Quel personnage de série te ressemble le plus ?
Quel personnage de dessin animé me ressemble le plus ?
Quelle est l'odeur qui te rappelle ton enfance ?
Quel est le jouet que tu aimais le plus enfant ?
Quel était ton goûter préféré ?
Quelle était ta matière préférée à l'école ?
Quel métier rêvais-tu de faire petit ou petite ?
Quel est le cadeau le plus original que tu aies reçu ?
Quel cadeau rêverais-tu de recevoir, sans limite de budget ?
Quel est le dernier truc qui t'a fait rire aux larmes ?
Quelle est ta blague préférée ?
Quelle est l'émission de télé de ton enfance qui te manque ?
Quel jeu de société devrions-nous acheter ?
Quel sport aimerais-tu qu'on essaie ensemble ?
Quelle activité aimerais-tu qu'on fasse ce mois-ci ?
Quel est ton dessert préféré ?
Quelle est ta boisson chaude préférée ?
Café du matin ou thé du soir ?
Quelle est ta façon idéale de passer un dimanche ?
Quel est ton plus grand talent culinaire ?
Quelle est ta plus grande catastrophe en cuisine ?
Si tu ouvrais un café, comment s'appellerait-il ?
Si on avait un chien, comment l'appellerait-on ?
Si on avait un chat, comment l'appellerait-on ?
Quelle est la plus belle ville que tu aies visitée ?
Quel paysage te fait le plus rêver ?
Quelle est ta météo préférée ?
Pluie sur un toit ou soleil sur une terrasse ?
Quel est ton bruit préféré ?
Quelle est l'application que tu ouvres le plus ?
Quelle est la photo de toi que tu préfères ?
Quelle est la photo de nous que tu préfères ?
Quel est le plus beau compliment qu'on t'ait fait ?
Quelle est la chose la plus gentille qu'un inconnu ait faite pour toi ?
Quel est ton accent préféré ?
Quelle langue aimerais-tu parler couramment ?
Quel instrument aimerais-tu savoir jouer ?
Quelle célébrité aimerais-tu inviter à dîner avec nous ?
Quel personnage historique aimerais-tu rencontrer ?
Quelle est ta citation préférée ?
Quel est ton mot préféré ?
Quel mot détestes-tu entendre ?
Quel est ton emoji le plus utilisé ?
Quel est le dernier achat qui t'a fait vraiment plaisir ?
Sur quoi dépenses-tu trop d'argent, honnêtement ?
Quel est le meilleur conseil qu'on t'ait donné ?
Quel conseil donnerais-tu à un ado de 15 ans ?
Quelle est ta superstition ?
Crois-tu à l'horoscope, même un peu ?
Quel est ton chiffre fétiche ?
Quelle est ta couleur préférée en ce moment ?
Quel vêtement te met le plus à l'aise ?
Quelle tenue portes-tu quand tu veux te sentir bien ?
Quelle coiffure aimerais-tu tester un jour ?
As-tu déjà eu envie de te faire tatouer ? Quoi ?
Quel est ton rituel du matin ?
Quel est ton rituel du soir ?
Combien de temps te faut-il pour te réveiller vraiment ?
Quelle est la tâche ménagère que tu détestes le moins ?
Quelle est ta playlist du moment ?
Quel concert aimerais-tu voir avec moi ?
Quel festival te tente le plus ?
Quelle danse aimerais-tu apprendre ?
Quel est ton jeu vidéo préféré, même ancien ?
Quel est le livre que tu offrirais à tout le monde ?
Quel livre lisais-tu en boucle petit ou petite ?
Quel est ton héros ou ton héroïne de fiction ?
Quelle est la chose la plus bizarre que tu aimes ?
Quel aliment détestais-tu enfant et adores maintenant ?
Quel plat de ta famille aimerais-tu que je goûte ?
Quelle recette aimerais-tu qu'on apprenne à faire ensemble ?
Quel est le restaurant où tu rêves de m'emmener ?
Quel pays aimerais-tu me faire découvrir ?
Quelle ville aimerais-tu qu'on explore à pied ?
Quel serait notre week-end parfait à la campagne ?
Quel serait notre week-end parfait en ville ?
Plage ou montagne pour nos prochaines vacances ?
Camping ou hôtel de luxe ?
Road trip ou séjour au même endroit ?
Quel est ton moyen de transport préféré pour voyager ?
Qu'emportes-tu toujours en voyage ?
Quelle est la pire chose qui te soit arrivée en voyage ?
Quel est le souvenir de voyage le plus drôle que nous ayons ?
Si on gagnait au loto, quel serait notre premier achat ?
Si on avait une journée sans aucune obligation, que ferait-on ?
Si on devait vivre ailleurs pendant un an, où irait-on ?
Si on pouvait dîner n'importe où dans le monde ce soir ?
Si on pouvait se téléporter maintenant, où irait-on ?
Quelle est la prochaine sortie que tu aimerais qu'on fasse ?
Quel est le film qu'on doit absolument voir ensemble ?
Quelle série as-tu honte d'avoir aimée ?
Quel est ton plaisir coupable musical ?
Quelle est la chanson que tu chantes faux avec le plus de conviction ?
Quelle est ta chanson de karaoké ?
Quelle chanson te rappelle notre début ?
Quelle chanson pourrait être notre hymne ?
Qu'est-ce qui te fait craquer dans une boulangerie ?
Quel est ton fromage préféré ?
Pizza ou sushi ce soir ?
Quel est le meilleur plat que tu aies mangé à l'étranger ?
Quelle cuisine du monde voudrais-tu découvrir ?
Quel fruit te rappelle l'été ?
Quel goût de glace choisis-tu toujours ?
Quelle est la chose la plus folle que tu aies mangée ?
Quel est ton snack de minuit ?
Quel est ton petit-déjeuner de rêve ?
Quel brunch idéal préparerait-on ensemble ?
Que commandes-tu toujours au restaurant ?
Quelle est ta boisson de fête ?
Quel cocktail me ressemble ?
Quelle fleur me ressemble ?
Quelle couleur me va le mieux, selon toi ?
Quel est mon tic que tu trouves le plus drôle ?
Quelle est mon expression que tu répètes sans le vouloir ?
Quelle habitude as-tu prise depuis qu'on est ensemble ?
Qu'est-ce que je fais mieux que toi ?
Qu'est-ce que tu fais mieux que moi ?
Quelle est ta plus grande fierté de la semaine ?
Quelle est la plus petite victoire de ta journée ?
Quel a été le petit agacement de ta journée ?
Quel est ton record de sommeil ?
Quel est ton record de série regardée d'une traite ?
Quel est ton record de messages non lus ?
Quelle est la notification que tu attends toujours avec impatience ?
Quelle appli supprimerais-tu si tu devais n'en garder que trois ?
Combien de temps tiendrais-tu sans téléphone ?
Quelle invention aimerais-tu qu'on crée ?
Si tu pouvais maîtriser un talent en une nuit, lequel ?
Si tu pouvais parler à un animal, lequel choisirais-tu ?
Si tu pouvais vivre dans un film, lequel ?
Si tu étais une saveur de glace, laquelle serais-tu ?
Si tu étais une couleur, laquelle ?
Si tu étais un objet de la maison, lequel ?
Si on était un duo célèbre, lequel serions-nous ?
Quel couple de fiction nous ressemble le plus ?
Quel couple de célébrités nous ressemble le plus ?
Quel est le surnom que tu préfères que je te donne ?
Quel surnom aimerais-tu que je ne te donne plus jamais ?
Quel est ton jour préféré de la semaine ?
Quelle est ta fête préférée de l'année ?
Quelle tradition de Noël aimes-tu le plus ?
Quel est ton meilleur souvenir d'anniversaire ?
Comment aimerais-tu fêter ton prochain anniversaire ?
Quel est ton plat de fête préféré ?
Quel est le meilleur cadeau que tu m'aies fait, selon toi ?
Quel cadeau aimerais-tu me faire un jour ?
Quelle est la chose la plus drôle qu'on ait vécue ensemble ?
Quel est notre fou rire le plus mémorable ?
Quelle est notre blague à nous ?
Quel est le mot que nous seuls comprenons ?
Quelle est notre plus grosse galère commune ?
Quel est le jeu auquel on joue le mieux ensemble ?
Qui de nous deux gagnerait à Koh-Lanta ?
Qui de nous deux survivrait le plus longtemps dans un film d'horreur ?
Quel est le pire film qu'on ait vu ensemble ?
Quel est le meilleur film qu'on ait vu ensemble ?
Quel spectacle t'a laissé le plus beau souvenir ?
Quelle est la chose que tu fais pour te détendre ?
Quel est ton endroit préféré dans notre quartier ?
Quel est ton coin préféré de la maison ?
Qu'aimerais-tu changer dans notre déco ?
Quel objet de la maison sauverais-tu en premier ?
Quel meuble aimerais-tu qu'on achète ?
Quelle plante aimerais-tu qu'on adopte ?
Quel est ton sport préféré à regarder ?
Quel est le sport que tu détestes ?
Quelle équipe ou quel athlète admires-tu ?
Quelle discipline olympique ferais-tu ?
Quel est le défi sportif que tu aimerais relever ?
Quel sport aimerais-tu me voir pratiquer ?
Quel est le jeu de ton enfance que tu aimerais rejouer ?
Quelle est ta bêtise d'enfant préférée ?
Quel surnom avais-tu à l'école ?
Quel était ton chanteur ou ta chanteuse préférée ado ?
Quel poster avais-tu dans ta chambre ?
Quelle mode ado regrettes-tu ?
Quel était ton premier téléphone ?
Quelle était ta première adresse mail ?
Quel était ton premier pseudo ?
Quel est ton premier souvenir de vacances ?
Quel est le premier film que tu as vu au cinéma ?
Quel est le premier concert que tu as vu ?
Quelle est la chose la plus courageuse que tu aies faite cette année ?
Qu'as-tu appris de nouveau ce mois-ci ?
Quel est le dernier truc que tu as découvert et adoré ?
Quel podcast ou quelle chaîne me conseillerais-tu ?
Quel est le compte sur les réseaux qui te fait le plus rire ?
Quelle vidéo regarderais-tu en boucle ?
Quel est ton animal préféré ?
Quel animal te fait peur ?
Quel animal aimerais-tu voir dans la nature ?
Quel est ton arbre préféré ?
Quel est ton paysage d'hiver préféré ?
Quel est ton souvenir de neige préféré ?
Quel est ton souvenir de plage préféré ?
Lever de soleil ou coucher de soleil ?
Étoiles filantes ou feux d'artifice ?
Bougies ou guirlandes lumineuses ?
Pique-nique ou dîner aux chandelles ?
Grasse matinée ou réveil aux aurores pour une belle balade ?
Vélo ou randonnée ?
Musée ou parc d'attractions ?
Cinéma ou théâtre ?
Livre papier ou liseuse ?
Musique douce ou musique à fond ?
Appel ou message ?
Lettre ou vocal ?
Câlin ou bisou ?
Salé ou sucré au goûter ?
Chocolat noir ou chocolat au lait ?
Crêpe ou gaufre ?
Frites ou purée ?
Thé glacé ou limonade ?
Quelle est la question que tu aimerais que je te pose plus souvent ?
Quelle est la chose qui te ferait plaisir ce soir ?
Qu'est-ce qui rendrait la semaine prochaine parfaite ?
Quel petit geste de ma part te fait le plus plaisir ?
Quel est le meilleur moment de notre semaine, d'habitude ?
Quel est notre rituel préféré ?
Quelle nouvelle habitude aimerais-tu qu'on prenne ensemble ?
Quelle est la chose la plus mignonne que je fasse sans m'en rendre compte ?
Quel est ton surnom pour moi quand je ne suis pas là ?
Comment me décrirais-tu à quelqu'un qui ne me connaît pas ?
Comment décrirais-tu notre couple en trois mots ?
Quel est notre plus beau week-end ?
Quelle est notre plus belle soirée improvisée ?
Quelle est la photo de nous que tu montrerais à tout le monde ?
Quel est ton bruit préféré le matin ?
Quelle odeur te donne envie de rentrer à la maison ?
Quel est le meilleur moment pour un câlin, selon toi ?
Quelle est la chanson parfaite pour un trajet en voiture ensemble ?
Quel est ton souvenir préféré d'une soirée avec nos amis ?
Quel plat cuisinerais-tu pour me remonter le moral ?
Quel film choisirais-tu pour une soirée pluvieuse ?
Quel serait ton déguisement idéal pour une soirée costumée à deux ?
Quel jeu de cartes aimerais-tu m'apprendre ?
Quel est le dernier rêve bizarre dont tu te souviens ?
Quelle est la chose la plus inutile que tu saches faire ?
Quel est ton record le plus absurde ?
Quel objet de ton enfance aimerais-tu retrouver ?
Quelle est ta friandise de cinéma préférée ?
Quelle est la vue la plus belle que tu aies vue avec moi ?
Quel est le trajet que tu préfères faire à pied ?
Quel est le meilleur endroit pour un premier rendez-vous, selon toi ?
Quel est le pire endroit pour un premier rendez-vous ?
Quel est le dernier compliment que tu as fait à quelqu'un ?
Qu'est-ce qui te rend fier ou fière chez moi en ce moment ?
`),
 memories: L(`
Quel est ton premier souvenir de moi ?
Que portais-je le jour de notre rencontre ?
De quoi avons-nous parlé la première fois ?
Quelle a été ta première impression de moi ?
À quel moment as-tu compris que je te plaisais ?
À quel moment as-tu compris que tu me plaisais ?
Comment s'est passé notre premier rendez-vous, selon toi ?
Qu'as-tu ressenti juste avant notre premier bisou ?
Où étions-nous lors de notre premier bisou ?
Quel temps faisait-il le jour de notre premier rendez-vous ?
Qu'as-tu raconté à tes amis après notre premier rendez-vous ?
Quel a été notre premier message ?
Quel est le premier cadeau que je t'ai fait ?
Quel est le premier film que nous avons vu ensemble ?
Quelle est la première chanson qui t'a fait penser à moi ?
Quel est notre premier voyage ensemble ?
Quel est le premier repas que l'un de nous a cuisiné pour l'autre ?
Quel est le premier fou rire que nous avons partagé ?
Quelle a été notre première dispute ? Comment s'est-elle terminée ?
Quand as-tu rencontré ma famille pour la première fois ? Comment ça s'est passé ?
Quand ai-je rencontré tes amis pour la première fois ?
Quel est le premier « je t'aime » dont tu te souviens ?
Où étions-nous quand on s'est dit « je t'aime » pour la première fois ?
Quelle est la première nuit où on a parlé jusqu'au matin ?
Quel est le premier surnom que je t'ai donné ?
Quel est le moment où tu as su que c'était sérieux ?
Quel est le souvenir de notre début que tu revis le plus souvent ?
Quelle photo de notre début préfères-tu ?
Quel est le moment le plus romantique que nous ayons vécu ?
Quel est le moment le plus drôle de notre histoire ?
Quel est le moment le plus gênant de notre histoire ?
Quel est le moment où on a eu le plus peur ensemble ?
Quel est le moment où on a été le plus fiers l'un de l'autre ?
Quel est le plus beau voyage que nous ayons fait ?
Quel est le pire voyage que nous ayons fait, et pourquoi on en rit aujourd'hui ?
Quelle est la plus belle surprise que je t'aie faite ?
Quelle est la plus belle surprise que tu m'aies faite, selon toi ?
Quel anniversaire passé ensemble reste ton préféré ?
Quel Noël passé ensemble préfères-tu ?
Quel réveillon du Nouvel An reste ton préféré ?
Quelle est notre plus belle soirée entre amis ?
Quelle est la soirée où on a le plus dansé ensemble ?
Quel est le restaurant qui restera dans notre histoire ?
Quel lieu est devenu « notre » lieu ?
Quelle chanson est devenue « notre » chanson, et pourquoi ?
Quel est le plus beau coucher de soleil que nous ayons vu ensemble ?
Quelle est la plus longue balade que nous ayons faite ?
Quel est le plus beau paysage que nous ayons découvert ensemble ?
Quel est le meilleur plat que nous ayons partagé ?
Quelle est la pire nourriture que nous ayons goûtée ensemble ?
Quelle galère en voyage nous a le plus rapprochés ?
Quel moment difficile avons-nous traversé ensemble ?
Quel moment t'a fait réaliser que tu pouvais compter sur moi ?
Quand t'es-tu senti le plus soutenu ou soutenue par moi ?
Quelle est la plus belle chose que je t'aie dite ?
Quel est le message de moi que tu as gardé ?
Quelle est la lettre ou le mot doux dont tu te souviens ?
Quel est ton souvenir préféré d'un dimanche à deux ?
Quel est ton souvenir préféré d'un matin à deux ?
Quel est le moment où tu as été le plus sous mon charme ?
Quelle tenue que je portais reste gravée dans ta mémoire ?
Quelle est notre plus belle photo, selon toi ?
Quel est le plus beau compliment que tu aies reçu de ma part ?
Quel est le moment où tu as été le plus fier ou la plus fière de nous ?
Quelle est la décision importante que nous avons prise ensemble ?
Quel est notre plus grand projet réalisé à deux ?
Quel est le jour où nous avons emménagé ensemble, ou celui où tu as dormi chez moi pour la première fois ?
Quel est le meuble ou l'objet qui raconte le mieux notre histoire ?
Quel est le premier objet que nous avons acheté ensemble ?
Quel est notre plus grand fou rire en public ?
Quel est le moment où on s'est le plus disputés pour un rien ?
Quel est le jour où on s'est le mieux réconciliés ?
Quel est le moment où ton amour pour moi a été le plus fort ?
Quel souvenir de nous te donne encore des papillons ?
Quel moment aimerais-tu revivre exactement pareil ?
Quel moment aimerais-tu revivre en le changeant ?
Quel est ton souvenir d'enfance préféré ?
Quel est ton plus vieux souvenir ?
Quel est ton souvenir le plus heureux avec tes parents ?
Quel est ton souvenir préféré avec tes grands-parents ?
Quelle était ta maison d'enfance ? Décris ta chambre.
Quel était ton jeu préféré dans la cour de récré ?
Qui était ton meilleur ami ou ta meilleure amie d'enfance ?
Quel prof a le plus compté pour toi, et pourquoi ?
Quel est ton meilleur souvenir d'école ?
Quel est ton pire souvenir d'école ?
Quelle bêtise d'enfance te fait encore rire ?
Quel animal de compagnie as-tu eu enfant ?
Quel était ton dessin animé préféré ?
Quelle était ta chanson préférée à dix ans ?
Quel était ton rêve d'enfant ?
Quel métier voulais-tu faire petit ou petite ?
Quelles étaient tes vacances d'été typiques enfant ?
Quel est ton plus beau souvenir de Noël enfant ?
Quel est ton souvenir de fête d'anniversaire préféré ?
Quel était ton cadeau préféré enfant ?
Quel livre a compté pour toi enfant ?
Quel film t'a fait peur enfant ?
Quel est ton souvenir de colonie de vacances ou de classe verte ?
Quel est ton premier souvenir de mer ou de montagne ?
Quel est ton premier souvenir de voyage en avion ?
Quel est le premier concert auquel tu sois allé ou allée ?
Quel était ton style ado ?
Quel était ton groupe d'amis ado ?
Quelle était ta plus grosse bêtise ado ?
Quel était ton premier crush ?
Quel est ton premier souvenir amoureux ?
Quel a été ton premier job ? Comment ça s'est passé ?
Qu'as-tu fait de ton premier salaire ?
Quel est ton premier appartement ou ta première chambre d'étudiant ?
Quel souvenir d'études te fait encore sourire ?
Quelle soirée étudiante reste ta préférée ?
Quel voyage a changé ta vision du monde ?
Quelle rencontre a changé ta vie, à part la nôtre ?
Quelle personne a eu le plus d'influence sur toi ?
Quel professeur ou quel mentor t'a fait grandir ?
Quel livre ou quel film t'a fait réfléchir sur ta vie ?
Quel événement a marqué ton entrée dans l'âge adulte ?
Quelle épreuve t'a rendu plus fort ou plus forte ?
Quel est le moment dont tu es le plus fier ou la plus fière dans ta vie ?
Quel est ton plus grand exploit personnel ?
Quel souvenir partages-tu avec très peu de gens ?
Quel souvenir de famille racontes-tu souvent ?
Quelle tradition familiale te manque ?
Quel plat de ton enfance aimerais-tu retrouver ?
Quelle odeur te ramène instantanément en enfance ?
Quel lieu de ton enfance aimerais-tu me montrer ?
Quel ami d'enfance aimerais-tu me présenter ?
Quelle photo de toi enfant préfères-tu ?
Quel souvenir d'un de tes anniversaires d'adulte te fait sourire ?
Quel est le plus beau cadeau que tu aies fait à quelqu'un ?
Quelle est la plus belle chose qu'un inconnu ait faite pour toi ?
Quel est ton plus beau souvenir de nature ?
Quel est ton plus beau souvenir de neige ?
Quel est ton plus beau souvenir d'été ?
Quel est ton plus beau souvenir de musique en live ?
Quel est ton plus beau souvenir de sport ?
Quel est le jour le plus heureux de ta vie, jusqu'ici ?
Quel est le jour le plus drôle de ta vie ?
Quel est le jour le plus étrange de ta vie ?
Quelle est la coïncidence la plus incroyable que tu aies vécue ?
Quelle est la fois où tu as eu le plus de chance ?
Quelle est la fois où tu as eu le plus peur ?
Quelle est la fois où tu as le plus ri ?
Quelle est la fois où tu as le plus pleuré de joie ?
Quelle est la fois où tu as été le plus surpris ou surprise ?
Quelle est la décision la plus spontanée que tu aies prise ?
Quel est le plus beau moment que tu aies vécu seul ou seule ?
Quel souvenir aimerais-tu ne jamais oublier ?
Quel souvenir de nous aimerais-tu raconter à nos petits-enfants ?
Quel moment de cette année n'oublieras-tu jamais ?
Quel est notre plus beau souvenir de cette année ?
Quel moment de ce mois-ci t'a rendu heureux ou heureuse ?
Quelle est la dernière fois que tu as ri avec moi jusqu'aux larmes ?
Quelle est la dernière fois que je t'ai surpris ou surprise ?
Quand as-tu eu, récemment, la sensation d'être vraiment proche de moi ?
Quel moment récent aimerais-tu qu'on refasse ?
Quel moment de notre histoire mériterait d'être filmé ?
Quel moment de notre histoire serait le titre d'un chapitre ?
Si notre histoire était un livre, quel serait le titre du premier chapitre ?
Quel détail de notre première soirée te revient en premier ?
Quel est le premier truc que tu as remarqué chez moi ?
Quel est le premier défaut que tu m'as trouvé ?
Quelle qualité as-tu découverte chez moi avec le temps ?
Quel souvenir de moi te fait rire quand tu y repenses ?
Quel souvenir de moi t'a ému ou émue ?
Quel est le moment où j'ai été le plus maladroit ou maladroite avec toi ?
Quel est le jour où je t'ai le plus impressionné ou impressionnée ?
Quel est le plus beau message vocal que je t'aie envoyé ?
Quel est le texto le plus drôle de notre conversation ?
Quelle est la plus longue conversation que nous ayons eue ?
De quoi avons-nous parlé pendant notre plus longue nuit blanche ?
Quel souvenir de vacances revient le plus souvent dans nos discussions ?
Quel est le premier endroit où nous sommes partis en week-end ?
Quelle est la chambre d'hôtel la plus mémorable de notre histoire ?
Quelle est la balade la plus romantique que nous ayons faite ?
Quelle est notre photo la plus ratée, et pourquoi on l'adore ?
Quelle est la tenue la plus ridicule que l'un de nous ait portée devant l'autre ?
Quel est le plus beau moment passé avec nos familles réunies ?
Quel ami nous a le plus aidés dans notre histoire ?
Quel couple d'amis a été témoin de nos débuts ?
Quel est le souvenir le plus drôle avec nos amis communs ?
Quel est le premier événement important que nous avons fêté ensemble ?
Quelle est la première épreuve que nous avons surmontée à deux ?
Quel est le souvenir qui résume le mieux notre couple ?
Quel souvenir aurait étonné la personne que tu étais avant de me connaître ?
Comment imaginais-tu ta vie amoureuse il y a dix ans ?
Quel souvenir de ta vie d'avant aimerais-tu me faire connaître ?
Quel moment de ta vie aimerais-tu que j'aie vécu avec toi ?
Quel moment de ma vie aurais-tu aimé partager ?
Quel endroit de mon passé aimerais-tu visiter ?
Quel souvenir de ma famille te fait sourire ?
Quel souvenir de ta famille aimerais-tu que je connaisse ?
Quelle est l'anecdote de ton enfance que tu me racontes le plus ?
Quelle anecdote de ton enfance ne m'as-tu jamais racontée ?
Quel est ton souvenir le plus précieux d'un ami ?
Quel ami as-tu perdu de vue et aimerais-tu revoir ?
Quelle est la plus belle fête à laquelle tu sois allé ou allée ?
Quel mariage t'a le plus ému ou émue ?
Quelle est la plus belle déclaration dont tu aies été témoin ?
Quel est ton souvenir de cinéma le plus marquant ?
Quel livre a été là pour toi dans un moment important ?
Quelle chanson est liée à un souvenir fort pour toi ?
Quelle odeur est liée à un souvenir de nous ?
Quel plat est lié à un souvenir de nous ?
Quel objet chez nous a une histoire particulière ?
Quel vêtement de toi a une histoire avec moi ?
Quelle est la date de notre histoire que tu n'oublieras jamais ?
Quel est le jour où tu as eu le plus envie de me revoir ?
Quel est le moment où tu as eu peur de me perdre ?
Quel est le moment où tu t'es dit « c'est la bonne personne » ?
Quel est le moment le plus simple et le plus heureux que nous ayons vécu ?
Quelle soirée banale est devenue un souvenir précieux ?
Quel est notre meilleur pique-nique ?
Quelle est notre plus belle journée à la plage ?
Quelle est notre plus belle journée à la neige ?
Quelle est notre plus belle journée de pluie ?
Quelle est notre meilleure soirée au restaurant ?
Quelle est notre meilleure soirée à la maison ?
Quel est le plus beau cadeau d'anniversaire que nous nous soyons faits ?
Quel est notre meilleur souvenir de Saint-Valentin ?
Quelle est la plus belle chose que nous ayons construite ensemble ?
Quelle habitude de couple est née d'un souvenir précis ?
Quel souvenir de nous partagerais-tu avec le monde entier ?
Quel souvenir de nous garderais-tu secret pour toujours ?
Quelle est la première chose que tu as achetée en pensant à moi ?
Qui a été la première personne à qui tu m'as présenté ou présentée ?
Quel est le premier secret que nous avons partagé ?
Quel est le premier projet que nous avons imaginé ensemble ?
Quel est le premier plat que nous avons raté ensemble ?
Quelle est la première chanson sur laquelle nous avons dansé ?
Quel est le premier film qui nous a fait pleurer ensemble ?
Quelle est la première fois où tu as dormi chez moi ?
Quel est le premier petit-déjeuner que nous avons partagé ?
Quel est le premier souvenir de nous sous la pluie ?
Quel est le premier jeu auquel nous avons joué ensemble ?
Quelle est la première fois où tu as vu des larmes dans mes yeux ?
Quelle est la première fois où tu as assisté à l'une de mes colères ?
Quelle est la première fois où je t'ai fait une vraie surprise ?
Quel est le premier souvenir de nous avec un animal ?
Quel est le premier voyage en voiture que nous avons fait ensemble ?
Quelle est la première photo de nous deux ?
Quel est le premier geste tendre de ma part dont tu te souviens ?
Quelle est la première chose que tu as aimée dans ma façon de parler ?
Quel est le premier livre ou le premier film que je t'ai conseillé ?
Quelle est la première fête que nous avons organisée ensemble ?
Quel est le premier jour de neige que nous avons vécu ensemble ?
Quel est le premier été que nous avons passé ensemble ?
Quel est le premier hiver que nous avons passé ensemble ?
Quelle est la première fois où tu t'es dit que tu voulais vieillir avec moi ?
Quel est le premier projet un peu fou que nous avons réalisé ?
Quelle est la première chose que nous avons apprise ensemble ?
Quelle est la première fois que nous avons ri d'un même souvenir ?
Quel est le premier mot doux que je t'ai écrit ?
Quel est le premier rituel que nous avons créé ensemble ?
Quel est ton souvenir préféré de nos débuts au téléphone ?
Quelle est la première chose que tu as dite de moi à ta famille ?
Quel est ton premier souvenir de mon rire ?
Quel est ton premier souvenir de ma voix ?
Quel est le premier moment où tu as eu envie de me prendre la main ?
Quel est le premier souvenir de nous que tu as raconté à un ami ?
Quel est le premier objet que tu as gardé en souvenir de nous ?
Quelle est la première fois que nous avons regardé les étoiles ensemble ?
Quel est le premier lever de soleil que nous avons vu ensemble ?
Quelle est la première fois où tu t'es dit « on forme une équipe » ?
`),
 deep: L(`
Qu'est-ce qui te rend profondément heureux ou heureuse ?
De quoi as-tu le plus peur dans la vie ?
De quoi as-tu le plus peur dans notre couple ?
Qu'est-ce qui te rassure le plus chez moi ?
À quel moment te sens-tu le plus aimé ou aimée par moi ?
Qu'est-ce que je pourrais faire pour que tu te sentes encore plus aimé ou aimée ?
Quel est ton plus grand rêve, celui que tu n'oses pas dire ?
Quel est ton plus grand regret ?
Si tu pouvais changer une chose dans ton passé, laquelle ?
Quelle est la leçon la plus importante que la vie t'ait apprise ?
Quelle valeur ne trahirais-tu jamais ?
Qu'est-ce qui donne du sens à ta vie ?
Qu'aimerais-tu qu'on dise de toi à la fin de ta vie ?
Quelle personne aimerais-tu devenir dans dix ans ?
Qu'est-ce que tu aimerais changer chez toi ?
Qu'est-ce que tu aimes le plus chez toi ?
Quelle est la chose la plus difficile que tu aies traversée ?
Qui t'a aidé ou aidée à traverser ton moment le plus difficile ?
Quand t'es-tu senti ou sentie le plus seul ou seule ?
Quand t'es-tu senti ou sentie le plus libre ?
Qu'est-ce qui te met en colère profondément ?
Qu'est-ce qui te blesse le plus facilement ?
Comment préfères-tu qu'on te console ?
Comment sais-tu que tu as besoin d'aide ?
As-tu du mal à demander de l'aide ? Pourquoi ?
Qu'est-ce que tu n'as jamais osé me dire ?
Qu'est-ce que tu voudrais que je comprenne mieux chez toi ?
Qu'est-ce que tu as appris sur toi grâce à notre couple ?
Qu'est-ce que je t'ai apporté que tu n'attendais pas ?
Qu'est-ce que tu m'as apporté, selon toi ?
En quoi as-tu changé depuis que nous sommes ensemble ?
En quoi ai-je changé depuis que nous sommes ensemble ?
Qu'est-ce qui te plaît le plus dans notre façon de nous aimer ?
Qu'est-ce qui pourrait nous rendre encore plus proches ?
Qu'est-ce qui nous rend solides, selon toi ?
Quelle est notre plus grande force en tant que couple ?
Quel est notre point faible, et comment le travailler ensemble ?
Comment pourrions-nous mieux gérer nos disputes ?
Qu'est-ce qui t'aide à te calmer après une dispute ?
De quoi as-tu besoin quand tu es triste ?
De quoi as-tu besoin quand tu es stressé ou stressée ?
De quoi as-tu besoin quand tu es en colère ?
Quel est ton langage de l'amour : les mots, les gestes, le temps passé ensemble, les cadeaux ou les attentions ?
Comment aimes-tu qu'on te montre de l'amour au quotidien ?
Quel geste de ma part t'a le plus touché ou touchée ?
Quelle phrase de ma part t'a fait le plus de bien ?
Quelle phrase de ma part t'a fait le plus de mal, sans que je le sache ?
Y a-t-il quelque chose que tu aimerais me pardonner ?
Y a-t-il quelque chose que tu aimerais que je te pardonne ?
Quelle promesse aimerais-tu qu'on se fasse ?
Qu'est-ce que la fidélité veut dire pour toi ?
Qu'est-ce que la confiance veut dire pour toi ?
Qu'est-ce que le respect veut dire dans un couple ?
Qu'est-ce que l'amour veut dire pour toi aujourd'hui ?
Ta définition de l'amour a-t-elle changé avec le temps ?
Crois-tu à l'âme sœur ?
Crois-tu que l'amour peut durer toute une vie ? Pourquoi ?
Qu'est-ce qui, selon toi, fait durer un couple ?
Quel couple autour de toi t'inspire, et pourquoi ?
Quel couple ne voudrais-tu jamais devenir ?
Qu'as-tu appris des couples de tes parents ou de ta famille ?
Quelle part de ton enfance influence notre couple ?
Quelle blessure du passé te suit encore un peu ?
Qu'est-ce que tes anciennes relations t'ont appris ?
De quoi es-tu le plus reconnaissant ou reconnaissante aujourd'hui ?
Quelle est la chose la plus courageuse que tu aies faite ?
Quand as-tu été le plus fier ou la plus fière de toi ?
Quand as-tu été le plus fier ou la plus fière de moi ?
Qu'est-ce que tu admires le plus chez moi ?
Quelle qualité de moi aimerais-tu avoir ?
Quel défaut de moi as-tu appris à aimer ?
Qu'est-ce qui t'a fait tomber amoureux ou amoureuse de moi ?
Qu'est-ce qui fait que tu restes amoureux ou amoureuse ?
Quand t'es-tu dit que tu voulais construire quelque chose avec moi ?
Qu'est-ce qui te fait douter parfois ?
Comment pouvons-nous mieux nous soutenir dans nos projets ?
Quel projet personnel aimerais-tu que je soutienne davantage ?
Quel rêve as-tu mis de côté et aimerais-tu reprendre ?
Si tu n'avais pas peur, que ferais-tu demain ?
Si l'argent n'existait pas, à quoi consacrerais-tu ta vie ?
Si tu n'avais plus qu'un an à vivre, que changerais-tu ?
Qu'est-ce qui t'empêche d'être pleinement heureux ou heureuse ?
Qu'est-ce qui te manque en ce moment ?
Qu'est-ce que tu voudrais plus dans ta vie ?
Qu'est-ce que tu voudrais moins dans ta vie ?
Quelle est ta plus grande insécurité ?
Quand te sens-tu le plus confiant ou confiante ?
Quand te sens-tu le plus vulnérable ?
As-tu déjà eu peur de me perdre ? Quand ?
Qu'est-ce qui te ferait partir d'une relation ?
Qu'est-ce que tu ne pourrais jamais pardonner ?
Qu'est-ce que tu as déjà pardonné et dont tu es fier ou fière ?
Comment voudrais-tu qu'on vieillisse ensemble ?
Comment imagines-tu notre couple dans trente ans ?
Qu'est-ce qui ne doit jamais changer entre nous ?
Qu'aimerais-tu que nous construisions ensemble ?
Quelle famille aimerais-tu qu'on forme, quelle qu'elle soit ?
Quelle valeur aimerais-tu transmettre un jour ?
Quelle éducation as-tu reçue que tu aimerais garder ?
Quelle éducation as-tu reçue que tu aimerais changer ?
Quelle relation as-tu avec tes parents aujourd'hui ?
Qu'est-ce que tu aimerais dire à tes parents que tu ne leur as jamais dit ?
Qui te manque le plus ?
Quelle personne disparue aimerais-tu me faire connaître ?
Quelle conversation aimerais-tu avoir avec quelqu'un qui n'est plus là ?
Qu'est-ce qui te rend nostalgique ?
Qu'est-ce qui te donne de l'espoir ?
Qu'est-ce qui te fait te sentir chez toi ?
Où te sens-tu vraiment à ta place ?
Quel est ton refuge quand tout va mal ?
Qu'est-ce qui te recharge vraiment ?
Qu'est-ce qui t'épuise sans que tu le montres ?
Comment puis-je mieux voir quand tu vas mal ?
Comment aimerais-tu qu'on parle des sujets difficiles ?
Y a-t-il un sujet que tu évites avec moi ?
Quel sujet aimerais-tu qu'on aborde plus souvent ?
Qu'est-ce que tu aimerais qu'on fasse plus souvent pour notre couple ?
Qu'est-ce que tu aimerais qu'on arrête de faire ?
Quel moment de la journée te sens-tu le plus proche de moi ?
Quand te sens-tu loin de moi, même quand je suis là ?
Qu'est-ce qui te fait sentir écouté ou écoutée ?
Est-ce que tu te sens libre d'être toi-même avec moi ?
Qu'est-ce que tu me caches par pudeur ?
Quelle est la chose la plus intime que tu aies partagée avec moi ?
Qu'est-ce que tu aimerais que je sache sur ton enfance ?
Quel souvenir douloureux aimerais-tu partager ce soir, si tu en as envie ?
Comment as-tu changé ces cinq dernières années ?
Quelle version de toi préfères-tu : celle d'avant ou celle d'aujourd'hui ?
Qu'aimerais-tu dire à la personne que tu étais à quinze ans ?
Qu'aimerais-tu dire à la personne que tu seras dans vingt ans ?
Quel conseil te donnerais-tu aujourd'hui ?
Qu'est-ce que tu as compris tard dans la vie ?
Qu'est-ce que tu aimerais apprendre à faire mieux ?
Qu'est-ce qui te fait te sentir utile ?
Quel est ton rapport au travail : passion, nécessité ou équilibre ?
Ton travail te rend-il heureux ou heureuse ?
Si tu pouvais changer de vie demain, le ferais-tu ?
Quelle est ta plus grande ambition ?
Qu'est-ce que la réussite veut dire pour toi ?
Qu'est-ce que l'argent représente pour toi ?
Qu'est-ce que la liberté représente pour toi ?
Qu'est-ce que la famille représente pour toi ?
Qu'est-ce que l'amitié représente pour toi ?
Qui sont les personnes les plus importantes de ta vie ?
Quelle amitié t'a le plus construit ou construite ?
Quelle rupture t'a le plus appris ?
Quelle erreur as-tu faite et dont tu as tiré une grande leçon ?
Quelle décision a changé le cours de ta vie ?
Quel hasard a changé ta vie ?
Crois-tu au destin ?
Crois-tu que tout arrive pour une raison ?
Quelle est ta relation à la religion ou à la spiritualité ?
Qu'est-ce qui t'émerveille encore ?
Qu'est-ce qui te touche dans la nature ?
Quelle cause te tient le plus à cœur ?
Qu'est-ce qui te révolte dans le monde ?
Comment aimerais-tu laisser le monde un peu meilleur ?
Qu'est-ce qui te fait peur dans l'avenir du monde ?
Qu'est-ce qui te rend optimiste pour l'avenir ?
Qu'est-ce que la maison veut dire pour toi ?
Quel est ton rapport au temps qui passe ?
Qu'est-ce que vieillir t'inspire ?
Qu'aimerais-tu avoir accompli à soixante-dix ans ?
Comment veux-tu qu'on fête nos victoires ?
Comment veux-tu qu'on traverse nos échecs ?
Que ferions-nous si la vie nous séparait géographiquement pendant un an ?
Que ferions-nous si l'un de nous tombait gravement malade ?
Comment voudrais-tu que je prenne soin de toi si tu n'allais pas bien ?
Qu'est-ce qui te ferait te sentir trahi ou trahie ?
Qu'est-ce que tu me dois, et qu'est-ce que je te dois, selon toi ?
Quelle place doivent avoir nos amis dans notre couple ?
Quelle place doit avoir la famille dans notre couple ?
De combien d'espace personnel as-tu besoin ?
Comment aimes-tu passer du temps seul ou seule ?
Est-ce que je te laisse assez de place ?
Est-ce que tu te sens assez soutenu ou soutenue ?
Est-ce que tu te sens assez désiré ou désirée ?
Est-ce que tu te sens assez admiré ou admirée ?
Est-ce que je te dis assez que je t'aime ?
Est-ce que je t'écoute assez ?
Qu'est-ce qui rend un « je t'aime » sincère, pour toi ?
Comment veux-tu qu'on se dise les choses qui fâchent ?
Qu'est-ce que tu aimerais qu'on se promette pour les mauvais jours ?
Qu'est-ce que tu aimerais qu'on se promette pour les beaux jours ?
Quel est ton plus beau souvenir de nous dans un moment difficile ?
Quel moment de vulnérabilité t'a rapproché ou rapprochée de moi ?
Quel trait de ta personnalité aimerais-tu que je comprenne mieux ?
Quelle peur d'enfant t'accompagne encore ?
Quel compliment as-tu besoin d'entendre plus souvent ?
Quelle critique te blesse le plus ?
Quelle est la plus belle chose qu'on t'ait jamais dite ?
Quelle est la chose la plus dure qu'on t'ait jamais dite ?
As-tu déjà eu le cœur brisé ? Qu'est-ce qui t'a aidé ou aidée ?
Qu'est-ce qui te donne envie de te battre pour nous ?
Qu'est-ce qui te fait croire en nous ?
Qu'est-ce que tu aimerais qu'on fasse différemment de nos parents ?
Quelle image de l'amour avais-tu enfant ?
Comment imaginais-tu la personne de ta vie quand tu étais plus jeune ?
En quoi suis-je différent ou différente de ce que tu imaginais ?
Qu'est-ce que tu ne changerais pour rien au monde chez moi ?
Qu'est-ce que tu ne changerais pour rien au monde dans notre vie ?
Si tu devais résumer notre histoire en une phrase, laquelle ?
Si tu devais écrire une lettre à notre couple, que dirait la première ligne ?
Qu'est-ce que tu aimerais me dire ce soir, que tu ne dis pas assez ?
Qu'est-ce qui t'a le plus surpris ou surprise chez moi en bien ?
De quoi as-tu besoin de ma part en ce moment ?
Comment puis-je rendre ta semaine plus douce ?
Quelle est la chose qui te pèse en ce moment ?
Quelle est la chose qui te réjouit en ce moment ?
Qu'est-ce qui te fait vibrer en ce moment ?
Quel rêve aimerais-tu réaliser avant la fin de l'année ?
De quoi as-tu envie pour toi, rien que pour toi, cette année ?
Qu'est-ce que tu aimerais apprendre de moi ?
Qu'est-ce que tu aimerais m'apprendre ?
Comment fais-tu la différence entre l'amour et l'attachement ?
La jalousie, c'est une preuve d'amour ou une peur ?
Comment réagis-tu quand tu te sens rejeté ou rejetée ?
Qu'est-ce qui te rend fort ou forte face aux épreuves ?
Quel est ton plus grand espoir pour nous ?
Quelle est ta plus grande crainte pour nous ?
Que veux-tu que je retienne de cette soirée ?
Qu'est-ce qui te fait sentir en sécurité avec moi ?
Qu'est-ce qui te fait peur dans l'idée de t'engager ?
Quelle est la chose la plus importante que tu attends d'un partenaire ?
Quel besoin as-tu du mal à exprimer ?
Qu'est-ce que tu ressens quand on se dispute ?
Qu'est-ce que tu ressens quand on se réconcilie ?
Comment aimerais-tu qu'on se dise au revoir le matin ?
Comment aimerais-tu qu'on se retrouve le soir ?
Qu'est-ce que la tendresse veut dire pour toi ?
Qu'est-ce que l'intimité veut dire pour toi, au-delà du corps ?
Quelle part de toi montres-tu rarement aux autres ?
Quelle part de toi aimerais-tu que je connaisse mieux ?
Qu'est-ce que tu protèges le plus en toi ?
Quel rêve d'enfant as-tu abandonné ? Le regrettes-tu ?
Qu'est-ce que tu fais quand tu doutes de toi ?
Qu'est-ce qui te redonne confiance ?
Quel moment de ta vie aimerais-tu revivre pour mieux le savourer ?
Quel moment de ta vie aimerais-tu effacer ?
Comment sais-tu que tu es vraiment heureux ou heureuse ?
Qu'est-ce que tu as peur de perdre ?
Qu'est-ce que tu as peur de ne jamais vivre ?
Quelle question aimerais-tu que je te pose plus souvent ?
Quelle question as-tu peur que je te pose ?
Qu'est-ce que tu ne m'as jamais remercié ou remerciée d'avoir fait ?
Quelle est la plus grande preuve d'amour que tu aies reçue ?
Quelle est la plus grande preuve d'amour que tu aies donnée ?
Comment aimerais-tu qu'on célèbre notre amour chaque année ?
Qu'est-ce qui rend notre lien unique, selon toi ?
Quel mot choisirais-tu pour décrire ce que tu ressens pour moi ?
Quelle question n'avons-nous jamais osé nous poser ?
Que voudrais-tu que je fasse si un jour tu te perdais un peu ?
Comment veux-tu que je te rappelle qui tu es dans les jours difficiles ?
Qu'est-ce qui, dans notre quotidien, te rend le plus heureux ou heureuse ?
Qu'est-ce que tu aimerais que nos enfants, ou nos proches, retiennent de nous ?
Qu'est-ce que tu aimerais me dire si c'était notre dernière soirée ensemble ?
Qu'est-ce que tu as appris sur l'amour grâce à moi ?
Quel est le plus beau cadeau que la vie t'ait fait ?
Qu'est-ce qui te fait te sentir vivant ou vivante ?
Quelle est la chose la plus vraie que tu puisses me dire ce soir ?
Qu'est-ce que je ne sais pas encore sur toi ?
`)
};
