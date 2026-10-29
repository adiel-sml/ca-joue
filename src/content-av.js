/* Action ou Vérité : cartes supplémentaires, au moins 250 vérités et 250 actions par niveau.
   Épicé = séduction, bisous, flirt, sans sexualité. +18 = sexualité. */
const L = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);

export const AV_EXTRA = {
 chill: {
  v: L(`
Quel est le premier concert que tu as vu ?
Quelle chanson te met de bonne humeur à coup sûr ?
Quel jouet de ton enfance gardes-tu encore ?
Quel goût te ramène directement en enfance ?
Quel est le plus long trajet que tu aies fait d'une traite ?
Quelle matière détestais-tu le plus à l'école ?
Quel prof t'a le plus marqué{e|}, et pourquoi ?
Quelle est la chose la plus utile que tu saches faire de tes mains ?
Si tu ouvrais un restaurant, que servirais-tu ?
Quel est ton petit-déjeuner idéal ?
Quel plat de ton enfance réclames-tu encore ?
Quelle est la meilleure pizza que tu aies mangée, et où ?
Combien de temps passes-tu dans la salle de bain le matin ?
À quoi ressemble ton dimanche idéal ?
Quel est le meilleur cadeau que tu aies reçu ?
Quel cadeau rêverais-tu de recevoir ?
Quel est le dernier livre que tu as lu en entier ?
Quel livre t'a le plus marqué{e|} ?
Quel film te fait pleurer à chaque fois ?
Quel film as-tu détesté alors que tout le monde l'adore ?
Quelle série pourrais-tu revoir en boucle ?
Quel personnage de série te ressemble le plus ?
Quel personnage de dessin animé aurais-tu voulu être ?
Quelle est la pire série que tu aies regardée jusqu'au bout ?
Quelle chanson connais-tu par cœur sans l'avoir jamais voulu ?
Quelle est la première chanson ou le premier album que tu as acheté ?
Quel instrument aurais-tu aimé savoir jouer ?
Quelle langue aimerais-tu parler couramment ?
Quel pays rêves-tu de visiter ?
Quel est l'endroit le plus beau que tu aies vu ?
Dans quelle ville pourrais-tu emménager demain sans hésiter ?
Plage, montagne ou grande ville pour les vacances ?
Quel est ton souvenir de vacances préféré ?
Quel est le plus vieux vêtement que tu portes encore ?
Quel vêtement ne jetteras-tu jamais ?
Quelle est la tenue la plus improbable que tu aies portée ?
Quelle mode regrettes-tu d'avoir suivie ?
Décris la dernière photo que tu as prise.
Quelle appli ouvres-tu en premier le matin ?
Combien de notifications non lues as-tu en ce moment ?
Quel est ton fond d'écran, et pourquoi celui-là ?
À quelle heure t'es-tu couché{e|} hier soir ?
Combien de réveils mets-tu le matin ?
Tu dors sur le dos, sur le ventre ou sur le côté ?
As-tu un doudou ou un objet fétiche ?
As-tu une superstition ? Laquelle ?
De quoi es-tu {la plus fière|le plus fier} cette année ?
Quel est ton plus beau souvenir avec quelqu'un ici ?
Comment as-tu rencontré la personne à ta droite ?
Quelle a été ta première impression de {joueur} ?
Quel est le meilleur moment que tu aies passé avec {joueur} ?
Qui ici appellerais-tu en premier en cas de problème ?
Qui ici a le meilleur rire ?
Qui ici cuisine le mieux ?
Qui ici est toujours en retard ?
Qui ici ferait le meilleur prof ?
Qui ici ressemble le plus à un personnage de dessin animé ? Lequel ?
Si {joueur} était un animal, lequel serait-{elle|il:joueur} ?
Si tu étais un plat, lequel serais-tu ?
Si tu étais une couleur, laquelle et pourquoi ?
Si tu étais un objet de la maison, lequel serais-tu ?
Si ta vie était un film, quel serait son titre ?
Qui jouerait ton rôle dans le film de ta vie ?
Quelle chanson passerait au générique de fin de ta vie ?
Si tu pouvais maîtriser un talent en une nuit, lequel choisirais-tu ?
Avec quel personnage historique aimerais-tu dîner ?
Si tu pouvais revivre une journée de ta vie, laquelle ?
Si tu pouvais changer de prénom, lequel prendrais-tu ?
Si tu devais vivre dans un autre pays, lequel choisirais-tu ?
Si tu ne pouvais manger qu'un seul dessert toute ta vie, lequel ?
Tu gagnes un voyage n'importe où demain matin. Tu pars où ?
Que dirais-tu à toi-même à 10 ans ?
Si tu étais invisible une journée, que ferais-tu en premier ?
À quelle émission de télé aimerais-tu participer ?
Si tu étais {présidente|président} pour un jour, quelle loi ferais-tu passer ?
Quelle invention changerait ta vie si elle existait ?
Quel objet emporterais-tu sur une île déserte ?
Quelle est la chose que tu ne prêtes jamais ?
Quel est ton record de sommeil ?
Quelle est la pire nuit que tu aies passée ?
Quel est ton plus beau souvenir de Noël ?
Quel est le pire anniversaire que tu aies vécu ?
Comment fêterais-tu ton anniversaire idéal ?
Quel est le meilleur repas de ta vie ?
Quel aliment détestais-tu enfant et adores-tu aujourd'hui ?
Quelle est ta boisson préférée ?
Thé ou café ? Et comment le prends-tu ?
Quelle est ta recette fétiche ?
Quel est ton fast-food préféré, et ta commande habituelle ?
Quelle est la chose la plus chère que tu aies achetée ?
Quel achat regrettes-tu le plus ?
Quel est l'objet le plus inutile que tu possèdes ?
Que collectionnais-tu quand tu étais petit{e|} ?
À quel jeu de société es-tu {mauvaise perdante|mauvais perdant} ?
À quel jeu vidéo as-tu le plus joué ?
Quel sport as-tu pratiqué le plus longtemps ?
Quel sport t'ennuie le plus à regarder ?
As-tu déjà gagné quelque chose à un concours ?
Quel est le métier de tes rêves aujourd'hui ?
Quel est le pire job que tu aies fait ?
Quelle est la meilleure décision que tu aies prise ?
Quelle chose remets-tu toujours à demain ?
Quelle habitude aimerais-tu prendre ?
Quelle habitude des autres t'agace le plus ?
Quelle expression dis-tu tout le temps ?
Quel mot as-tu longtemps mal prononcé ?
Quel est ton accent préféré ?
Quelle question te pose-t-on le plus souvent ?
Quel compliment te fait le plus plaisir ?
Quelle qualité apprécies-tu le plus chez un ami ?
Quel défaut assumes-tu complètement ?
En trois mots, comment te décrirait ta mère ?
En trois mots, comment te décrirais-tu ?
Quel conseil donnerais-tu à un ado d'aujourd'hui ?
Quelle règle de ta maison d'enfance trouvais-tu absurde ?
Quelle bêtise tes parents n'ont-ils jamais découverte ?
Quelle est la chose la plus courageuse que tu aies faite ?
Quel animal te fait le plus peur ?
Quel film d'horreur t'a le plus traumatisé{e|} ?
Crois-tu aux fantômes ?
Quel est ton signe astrologique, et te ressemble-t-il vraiment ?
As-tu un chiffre porte-bonheur ?
Quelle est ta saison préférée, et pourquoi ?
Quelle est ta fête préférée de l'année ?
Quel est ton parfum de glace préféré ?
Quelle odeur adores-tu ?
Quel bruit ne supportes-tu pas ?
Que fais-tu pour te calmer quand ça ne va pas ?
Quel est ton remède contre le coup de blues ?
Qu'est-ce qui t'énerve en deux secondes ?
Quelle est la dernière chose qui t'a {rendue|rendu} vraiment {heureuse|heureux} ?
Quel est le plus beau compliment qu'on t'ait fait ?
Es-tu déjà {passée|passé} à la télé ou dans le journal ?
As-tu déjà croisé une célébrité ? Raconte.
Combien de temps as-tu tenu sans téléphone, au maximum ?
Si tu ne pouvais garder que trois applis, lesquelles ?
Combien de photos as-tu dans ta galerie ?
Avec qui échanges-tu le plus de messages ?
Quelle série attends-tu avec impatience ?
Quel créateur ou quelle créatrice de vidéos regardes-tu le plus ?
Quel podcast ou quelle émission écoutes-tu le plus ?
À quel jeu de ton enfance aimerais-tu rejouer ?
Quel était ton goûter préféré à l'école ?
Qui était ton meilleur ami ou ta meilleure amie en primaire ?
Quel est ton plus beau souvenir d'école ?
Quelle punition as-tu reçue à l'école, et pourquoi ?
As-tu déjà triché à un contrôle ?
Quel métier ne pourrais-tu jamais faire ?
Que ferais-tu de tes journées si tu n'avais plus besoin de travailler ?
Qu'est-ce que tu sais faire mieux que tout le monde ici ?
Qu'aimerais-tu apprendre cette année ?
Quel âge as-tu dans ta tête ?
À quel moment t'es-tu senti{e|} adulte pour la première fois ?
Quelle est la chose la plus enfantine que tu fais encore ?
Quel personnage de Disney te ressemble le plus ?
Quelle chanson de Disney connais-tu par cœur ?
Quelle est la chose la plus folle que tu aies faite pour un concert ou un match ?
Où te sens-tu le mieux au monde ?
Quelle pièce de ta maison préfères-tu ?
Honnêtement, à quoi ressemble ta chambre en ce moment ?
Rangement parfait ou bazar organisé ?
Quelle tâche ménagère détestes-tu le plus ?
Quel est ton plat de flemme ?
Quelle est la pire chose que tu aies mangée par politesse ?
Quel prénom donnerais-tu à un animal de compagnie ?
As-tu un animal ? Raconte sa pire bêtise.
Chat ou chien, et pourquoi ?
Quel est ton moyen de transport préféré ?
As-tu peur en avion ?
Quel est le pire trajet en transports que tu aies vécu ?
T'es-tu déjà {perdue|perdu} dans une ville étrangère ?
Quelle est la chose la plus spontanée que tu aies faite ?
Quelle est la plus belle surprise qu'on t'ait faite ?
Quelle surprise as-tu déjà préparée pour quelqu'un ?
Quel est ton meilleur souvenir avec tes grands-parents ?
Quelle tradition familiale adores-tu ?
Qui est la personne la plus drôle de ta famille ?
Ressembles-tu plus à ta mère ou à ton père ?
Que fais-tu en premier en rentrant chez toi ?
Quelle est la dernière chose que tu fais avant de dormir ?
Quel est ton rituel avant une soirée ?
Combien de temps mets-tu à te préparer pour sortir ?
Quelle chanson mets-tu pendant que tu te prépares ?
Quel est ton pas de danse signature ?
Quelle chanson choisirais-tu au karaoké ?
Quel est le meilleur concert de ta vie ?
Quel spectacle t'a le plus impressionné{e|} ?
Quel est le dernier film que tu as vu au cinéma ?
Quel film te fait rire à chaque fois ?
Quelle réplique de film cites-tu souvent ?
Quel est le meilleur jeu de société, selon toi ?
Quel est ton plus grand exploit sportif ?
Quelle est la blessure la plus bête que tu te sois faite ?
As-tu une cicatrice ? Quelle est son histoire ?
Quelle étape de ta routine beauté est indispensable ?
Quelle coiffure rêverais-tu d'oser ?
Quel tatouage ferais-tu si tu devais en faire un demain ?
Quelle qualité tes amis te trouvent-ils ?
De quoi peux-tu parler pendant des heures ?
Quel sujet te fait décrocher immédiatement ?
Quelle est la dernière chose que tu as apprise ?
Quelle info complètement inutile connais-tu par cœur ?
Quel est l'objet le plus bizarre dans ton sac en ce moment ?
Combien de paires de chaussures as-tu ?
Quel objet perds-tu tout le temps ?
Depuis combien de temps dure ta plus vieille amitié ?
Comment s'est passé ton premier jour de travail ?
Si tu pouvais supprimer une chose du monde, laquelle ?
Si tu pouvais créer un jour férié, que fêterait-il ?
Si tu étais célèbre, pour quoi le serais-tu ?
Si tu étais un super-héros, quel serait ton nom de scène ?
À quelle époque aimerais-tu vivre ?
Si tu pouvais avoir une maison n'importe où, ce serait où ?
Si tu ouvrais une boutique, que vendrais-tu ?
Dans quelle émission de téléréalité te verrais-tu ?
Si tu écrivais un livre, de quoi parlerait-il ?
Qu'est-ce qui te rend unique, selon toi ?
Quelle expression détestes-tu entendre ?
Quel est le meilleur truc dans ton frigo en ce moment ?
Pour quoi dépenses-tu trop d'argent ?
Avec l'argent, tu es plutôt fourmi ou cigale ?
Quel est le meilleur jeu de soirée, selon toi ?
Quelle soirée n'oublieras-tu jamais ?
Quand as-tu dit « plus jamais » pour la dernière fois ?
Quel était ton plus gros caprice d'enfant ?
Quel poster avais-tu dans ta chambre d'ado ?
Quel chanteur ou quel groupe adorais-tu à 13 ans ?
Quel était ton premier téléphone ?
Quel était ton pseudo sur internet quand tu étais ado ?
Quel était ton jeu préféré dans la cour de récré ?
Quel est le plus gros mensonge qu'on t'ait fait croire enfant ?
À quel âge as-tu arrêté de croire au Père Noël ?
Qu'est-ce qui te manque le plus de ton enfance ?
Si tu pouvais retourner à un âge, lequel choisirais-tu ?
Quel est ton rêve le plus fou ?
Qu'y a-t-il sur ta liste de choses à faire cette année ?
Quel est ton prochain voyage ?
Où te vois-tu dans cinq ans ?
À quelle célébrité te compare-t-on souvent ?
Quel serait le sosie de {joueur}, selon toi ?
Quel talent de {joueur} lui envies-tu ?
Qu'aimerais-tu apprendre de {joueur} ?
Quel est ton souvenir le plus drôle avec {joueur} ?
Quel conseil donnerais-tu à {joueur} ?
Qu'est-ce que tout le monde aime et que tu détestes ?
Qu'est-ce que tu adores et que tout le monde déteste ?
Quel avis impopulaire es-tu {prête|prêt} à défendre ?
L'ananas sur la pizza : pour ou contre ? Défends ton camp.
Pain au chocolat ou chocolatine ? Défends ton camp.
Quelle est la pire invention, selon toi ?
Quel est le plus beau son du monde, selon toi ?
Qu'est-ce qui te rend nostalgique ?
As-tu déjà ramené un souvenir d'hôtel, comme un peignoir ou une serviette ?
Quelle est ta technique pour t'endormir ?
Quelle est ta plus belle réussite en cuisine ?
Quel plat cuisines-tu pour impressionner ?
Quelle émission de ton enfance te manque ?
Qu'as-tu fait de ton premier salaire ?
Quelle chose n'as-tu jamais comprise ?
Quel est le plus beau mot de la langue française, selon toi ?
Quelle est ta citation préférée ?
Quelle est la dernière chose qui t'a {surprise|surpris} ?
`),
  a: L(`
Imite un présentateur de journal télévisé qui annonce une nouvelle sur {joueur}.
Fais une démonstration de yoga de 20 secondes, en commentant chaque position.
Récite les jours de la semaine à l'envers, le plus vite possible.
Récite les mois de l'année à l'envers en moins de 15 secondes.
Compte jusqu'à 20 en disant « pouet » à la place de chaque multiple de 3.
Parle pendant 20 secondes sans utiliser la lettre E.
Cite 10 fruits en 15 secondes.
Cite 8 pays d'Asie en 20 secondes.
Cite 5 chansons de Disney en 20 secondes.
Chante « Frère Jacques » avec une voix d'opéra.
Fais la voix d'un GPS pour guider {joueur} jusqu'à la cuisine.
Commente ce que fait {joueur} pendant 30 secondes, comme dans un documentaire animalier.
Fais une démonstration de télé-achat pour une chaussette.
Fais le serveur de {joueur} jusqu'à ton prochain tour.
Raconte Blanche-Neige en 30 secondes, version film d'horreur.
Imite ta tête au réveil un lundi matin.
Imite le bruit d'une imprimante qui bloque.
Danse comme un robot pendant 15 secondes.
Danse comme si tu étais au mariage de ton cousin.
Fais la danse de la joie, comme si tu venais de gagner au loto.
Mime ta journée type en 20 secondes.
Mime un sport, le groupe devine lequel.
Mime ton pire cauchemar.
Joue la statue pendant 30 secondes pendant que le groupe essaie de te faire rire.
Tiens sur un pied jusqu'à ce que {joueur} ait bu une gorgée.
Fais un tour de magie avec un objet de la pièce.
Fais un compliment à {joueur} comme un poète du XVIIe siècle.
Présente {joueur} comme une star qui entre sur scène.
Décris {joueur} en trois adjectifs.
Dessine {joueur} en 30 secondes et montre le résultat.
Dessine une maison les yeux fermés.
Écris ton prénom avec ta main non dominante et montre le résultat.
Fais 5 pompes en chantant.
Fais la chaise contre le mur pendant 30 secondes.
Tourne 5 fois sur toi-même, puis touche ton nez du bout du doigt.
Essaie de toucher tes pieds sans plier les genoux.
Fais le tour de la pièce en faisant l'avion.
Parle comme un animateur radio jusqu'à ton prochain tour.
Parle comme un vieux sage jusqu'à ton prochain tour.
Termine chaque phrase par « mon capitaine » jusqu'à ton prochain tour.
Réponds à tout par une question jusqu'à ton prochain tour.
Ne fais que des phrases de trois mots jusqu'à ton prochain tour.
Interviewe {joueur} sur sa journée, comme un journaliste.
Invente une chanson sur ton plat préféré.
Invente un slogan pour la soirée.
Invente un cri de ralliement pour le groupe.
Invente une danse et apprends-la à {joueur}.
Apprends un pas de danse à tout le groupe.
Lance une ola avec tout le groupe.
Fais rire {joueur} en moins de 20 secondes.
Joue à pierre-feuille-ciseaux contre {joueur}. Si tu perds, fais 5 squats.
Fais un bras de fer avec {joueur}.
Mange quelque chose sans utiliser tes mains.
Porte un toast à la soirée, avec un vrai discours.
Raconte un souvenir d'enfance en 30 secondes.
Raconte la dernière chose drôle qui t'est arrivée.
Imite un personnage de dessin animé, le groupe devine qui.
Imite trois animaux en 15 secondes.
Imite une poule qui vient de pondre un œuf.
Imite un chat qui découvre un concombre.
Imite quelqu'un qui marche pieds nus sur des braises.
Imite un mannequin qui trébuche sur le podium.
Imite quelqu'un qui présente son petit-déjeuner sur les réseaux sociaux.
Présente le journal de 20 heures de la soirée.
Vide tes poches ou ton sac et commente chaque objet.
Montre la dernière capture d'écran de ton téléphone.
Montre ton fond d'écran et raconte son histoire.
Montre la troisième photo de ta galerie.
Lis ta dernière note de téléphone à voix haute.
Montre ta playlist la plus écoutée.
Fais un selfie avec {joueur} en faisant la même grimace.
Prends une photo de groupe artistique en 20 secondes.
Fais un tutoriel de 20 secondes sur un truc que tu sais faire.
Explique les règles d'un sport que tu inventes.
Vends une brique de lait au groupe en 20 secondes.
Danse sur la chanson que {joueur} fredonne.
Fais 15 secondes de beatbox.
Siffle une chanson, le groupe devine laquelle.
Fredonne une chanson bouche fermée, le groupe devine laquelle.
Chante le générique d'un dessin animé.
Chante une chanson en chuchotant.
Chante la chanson que tu as dans la tête, avec le plus d'émotion possible.
Joue un solo de guitare imaginaire de 15 secondes.
Fais un solo de batterie sur la table.
Fais un orchestre à toi tout{e|} seul{e|} pendant 15 secondes.
Récite la table de 7.
Épelle ton prénom à l'envers.
Dis une phrase dont tous les mots commencent par la même lettre.
Raconte une blague de Toto.
Serre la main de chaque personne, d'une façon différente à chaque fois.
Invente une poignée de main secrète avec {joueur}.
Fais un câlin à {joueur}.
Laisse {joueur} te poser une question. Tu dois répondre honnêtement.
Échange ta place avec {joueur} jusqu'à la fin de la partie.
Assieds-toi par terre jusqu'à ton prochain tour.
Mets un vêtement à l'envers jusqu'à ton prochain tour.
Garde les bras croisés jusqu'à ton prochain tour.
Tiens un objet choisi par {joueur} jusqu'à ton prochain tour.
Fais un discours d'anniversaire pour {joueur}, même si ce n'est pas son anniversaire.
Raconte comment tu imagines {joueur} dans 20 ans.
Devine le signe astrologique de {joueur}.
Dessine un objet dans le dos de {joueur} avec ton doigt. {Elle|Il:joueur} doit deviner.
Fais un compliment à chacun avec un mot qui commence par la première lettre de son prénom.
Fais un poème de deux vers sur la soirée.
Fais une prédiction sur la fin de la soirée.
Devine ce que {joueur} a mangé à midi.
Lis la composition d'un produit de la pièce avec l'accent anglais.
Lis un texte de ton téléphone avec la voix d'un film d'horreur.
Lis le dernier message que tu as reçu avec une voix de dessin animé.
Commente {joueur} qui boit une gorgée, comme un match de tennis.
Raconte un film célèbre en 20 secondes, le groupe devine lequel.
Décris ton plat préféré comme un grand chef étoilé.
Fais la critique gastronomique de ce que tu bois.
Les yeux fermés, goûte ce que {joueur} te donne et devine ce que c'est.
Construis une tour avec des objets de la table en 30 secondes.
Fais tenir une cuillère sur ton nez.
Assieds-toi et relève-toi avec un objet en équilibre sur la tête.
Fais 10 secondes de hula hoop imaginaire.
Saute à pieds joints jusqu'à la porte et reviens.
Marche en crabe jusqu'à la porte.
Prends la position du lotus et fais « om » pendant 10 secondes.
Fais 20 secondes de sport en te coachant toi-même à voix haute.
Fais une démonstration de karaté au ralenti.
Rejoue une scène de film culte avec {joueur}.
Rejoue la scène « Je vole » de Titanic avec {joueur}.
Joue un sketch de 30 secondes avec {joueur} sur un thème choisi par le groupe.
Fais l'interview d'un objet de la pièce.
Fais parler ta main comme une marionnette pendant 20 secondes.
Fais le tour de la pièce en saluant chaque objet.
Dis merci à chaque personne, pour une raison différente à chaque fois.
Fais une révérence à chaque personne.
Salue chaque personne dans une langue différente.
Dis « bonjour » dans 5 langues.
Compte jusqu'à 10 dans une autre langue.
Imite le cri de ton animal préféré.
Écris une ode de quatre vers à la pizza et lis-la.
Fais visiter la pièce comme un guide de musée, en présentant {joueur} comme une œuvre d'art.
Prends la pose d'une statue célèbre.
Mime quelqu'un coincé dans une boîte invisible.
Mime quelqu'un qui marche contre une tempête.
Fais semblant de descendre un escalier derrière le canapé.
Fais semblant de répondre au téléphone à ton idole.
Appelle un membre de ta famille pour lui dire que tu l'aimes.
Envoie un message gentil à quelqu'un que tu n'as pas vu depuis longtemps.
Envoie un vocal de 10 secondes à ton dernier contact pour lui souhaiter une bonne soirée.
Ferme les yeux et décris la tenue de {joueur}.
Ferme les yeux et donne la couleur des yeux de chaque personne.
Raconte ta journée uniquement en mimes.
Raconte ta journée en cinq mots.
Fais deviner ton film préféré en trois mots.
Fais deviner ton plat préféré en le mimant.
Tourne trois fois sur toi-même, puis récite l'alphabet.
Fais une danse traditionnelle de ton choix.
Fais la danse des canards.
Danse au ralenti pendant 20 secondes.
Danse un slow avec un coussin.
Fais une course à cloche-pied avec {joueur} jusqu'à la porte.
Joue à « Jacques a dit » avec le groupe pendant 30 secondes.
Mime un métier, le groupe devine lequel.
Parle sans bouger les lèvres pendant 10 secondes, comme un ventriloque.
Fais une phrase qui contient le prénom de chaque joueur.
Invente une chanson avec le prénom de chaque joueur.
Fais un selfie avec chaque personne en 30 secondes.
Prends {joueur} en photo comme un photographe de mode, en donnant des consignes.
Fais le coach de motivation de {joueur} pendant 20 secondes.
Fais un pari avec {joueur} sur la fin de la soirée.
Fais un discours de campagne électorale de 30 secondes.
Présente un objet de la pièce comme une découverte archéologique.
Fais le déballage imaginaire d'un cadeau, comme sur internet.
Fais semblant de croquer dans un citron très acide.
Fais semblant de marcher sur la Lune.
Nage le crawl sur le canapé pendant 10 secondes.
Ris pendant 15 secondes sans t'arrêter.
Pleure de façon dramatique pendant 10 secondes.
Fais un caprice de star pendant 10 secondes.
Sors de la pièce et reviens avec une entrée spectaculaire.
Fais deviner une chanson en mimant les paroles.
Raconte ton dernier rêve comme une bande-annonce de film.
Décris ta chambre comme un agent immobilier.
Présente-toi comme un candidat de jeu télévisé.
Imite le générique d'un jeu télévisé.
Fais un concours de grimaces avec {joueur}. Le groupe désigne le gagnant.
Imite le bruit de cinq objets de la maison.
Fais un compliment à {joueur} en rimes.
Mime une émotion, le groupe devine laquelle.
Commande un plat imaginaire avec l'accent belge.
Raconte ta journée avec l'accent québécois.
Explique comment faire des crêpes, en mimant tout.
Dis cinq qualités de {joueur} en 15 secondes.
Fais la liste de tes cinq plats préférés en les classant.
Fais un discours de remise de médaille pour {joueur}.
Raconte une histoire de 30 secondes qui se termine par « et c'est pour ça que je n'aime pas les pigeons ».
Fais le tour de la table en marchant uniquement sur la pointe des pieds.
Fais une imitation de ton chanteur ou de ta chanteuse préférée.
Mime un dessin animé, le groupe devine lequel.
Fais un vrai faux bulletin d'information sur la soirée.
Garde le sourire sans montrer tes dents jusqu'à ton prochain tour.
Donne un surnom gentil à chaque personne.
Sculpte un buste imaginaire de {joueur} en commentant chaque détail.
Fais une démonstration de danse de salon avec {joueur}.
Fais semblant d'être une hôtesse ou un steward qui présente les consignes de sécurité.
Fais le bruitage d'un orage avec tes mains et ta bouche.
Récite un virelangue trois fois très vite : « Les chaussettes de l'archiduchesse sont-elles sèches ? »
Dis « un chasseur sachant chasser » trois fois de suite sans te tromper.
Prends une voix de méchant de film pour demander un verre d'eau.
Imite un commentateur de course hippique pendant que {joueur} traverse la pièce.
Mime un plat qui cuit dans une poêle, le groupe devine lequel.
Raconte la soirée comme si tu étais un chat.
Joue au chef d'orchestre avec le groupe qui fait des bruits d'instruments.
`)
 },
 fun: {
  v: L(`
Quelle est la chose la plus gênante que tu aies faite devant un crush ?
As-tu déjà fait semblant de rire à une blague nulle de ton chef ou de ton prof ?
Quel surnom ridicule donnes-tu à quelqu'un sans qu'il le sache ?
Qui ici a eu la pire coupe de cheveux de sa vie ?
Qui ici devrait refaire sa garde-robe, et par quoi commencer ?
Quel est le pire cadeau que quelqu'un ici t'ait fait ?
Qui ici envoie les messages vocaux les plus longs ?
Qui ici met le plus de temps à répondre aux messages ?
Qui ici est le plus radin ?
Qui ici est le plus susceptible ?
Qui ici est {la plus mauvaise perdante|le plus mauvais perdant}, à part toi ?
Qui ici a le plus de chances de se faire arrêter par la police un jour ?
Qui ici raconte les pires blagues ?
Qui ici passe le plus de temps sur son téléphone ?
Qui ici ment le mieux ?
Qui ici ferait le meilleur espion ?
Qui ici choisit le plus mal ses partenaires ?
Qui ici est le plus dramatique ?
Qui ici oublierait ton anniversaire ?
Qui ici te doit encore de l'argent ?
Qui ici est le plus insupportable au réveil ?
Qui ici survivrait le moins longtemps sur une île déserte ?
Qui ici te ferait le plus honte en soirée ?
Qui ici est le plus gourmand ?
Quelle est la dispute la plus ridicule que tu aies eue ?
As-tu déjà écouté en douce la conversation d'inconnus au restaurant ?
As-tu déjà fait semblant d'être au téléphone pour éviter quelqu'un ?
As-tu déjà inventé un copain ou une copine pour te débarrasser de quelqu'un ?
As-tu déjà offert un cadeau qu'on t'avait offert ?
As-tu déjà été {renvoyée|renvoyé} d'un cours ? Pourquoi ?
As-tu déjà été {virée|viré} d'un travail ? Pourquoi ?
As-tu déjà oublié le prénom de quelqu'un ici ?
As-tu déjà dit « je t'aime » sans le penser ?
As-tu déjà eu un faible pour quelqu'un ici ?
Quel est le pire surnom qu'un ex t'ait donné ?
Quel est le plus long message que tu aies envoyé à un ex ?
Combien de temps as-tu mis à te remettre de ta pire rupture ?
Où t'es-tu fait larguer de la façon la plus humiliante ?
Comment as-tu quitté la dernière personne que tu as quittée ?
Pourquoi as-tu ghosté la dernière personne que tu as ghostée ?
As-tu déjà été {ghostée|ghosté} ? Comment l'as-tu vécu ?
Quel est le pire profil que tu aies vu sur une appli de rencontre ?
Quelle est ta bio sur les applis de rencontre, ou quelle serait-elle ?
As-tu déjà mis une photo trompeuse sur une appli de rencontre ?
Quelle est la pire excuse qu'on t'ait donnée pour annuler un rendez-vous ?
Quel est le plan le plus foireux que tu aies organisé ?
Quelle est la pire chose que tu aies faite à un frère, une sœur ou un cousin ?
Quel est le pire mensonge que tu aies dit pour pouvoir sortir ?
À quelle heure es-tu {rentrée|rentré} le plus tard en cachette ?
As-tu déjà fait le mur ?
As-tu déjà séché les cours ? Pour faire quoi ?
Quelle est la pire note que tu aies eue ?
As-tu déjà imité la signature de tes parents ?
Quelle photo de toi aimerais-tu faire disparaître d'internet ?
As-tu un compte secret sur un réseau social ?
Qui regardes-tu le plus souvent sur les réseaux, sans jamais liker ?
Quel est le dernier profil que tu as regardé sur Instagram ?
Combien de fois par jour vérifies-tu qui a vu ta story ?
As-tu déjà supprimé une photo parce qu'elle n'avait pas assez de likes ?
Quelle est la chose la plus chère que tu aies achetée sur un coup de tête ?
Quelle est la commande en ligne la plus honteuse que tu aies faite ?
Quel est ton plus gros craquage pendant les soldes ?
Quel secret de quelqu'un as-tu failli révéler ?
As-tu déjà répété un secret qu'on t'avait confié ?
Quel est le pire conseil que tu aies donné à un ami ?
Quelle est la chose la plus égoïste que tu aies faite ?
As-tu déjà laissé quelqu'un se faire gronder à ta place ?
Quel est le pari le plus stupide que tu aies relevé ?
Quelle est la chose la plus gênante que tu aies dite à un inconnu ?
As-tu déjà répondu à un salut qui ne t'était pas destiné ?
As-tu déjà appelé un prof « maman » ou « papa » ?
Quel est ton plus gros moment de solitude ?
Quelle est ta pire chute en public ?
Quelle est ta pire galère dans des toilettes publiques ?
As-tu déjà fait pipi dans une piscine ?
Combien de jours d'affilée peux-tu porter le même pyjama ?
Quel est ton record de jours sans faire le ménage ?
As-tu déjà mangé dans le frigo d'un coloc sans demander ?
As-tu déjà fait semblant d'avoir lu un livre ou vu un film ?
As-tu déjà fait semblant de comprendre une blague ?
As-tu déjà fait semblant de reconnaître quelqu'un ?
As-tu déjà fait semblant d'être {occupée|occupé} pour ne pas aider ?
Quel est le plus gros mensonge que tu aies dit à un chef ou à un prof ?
Quel est ton pire souvenir d'entretien d'embauche ?
As-tu déjà eu un crush au travail ou en cours ?
Quel collègue ou camarade ne supportes-tu pas, et pourquoi ?
Quel est le pire voisin que tu aies eu ?
Quel est le pire coloc que tu aies eu ?
Quelle règle bizarre t'imposes-tu au quotidien ?
Quel est ton tic le plus agaçant, d'après les autres ?
Quelle critique te fait-on le plus souvent ?
Que disent tes amis de toi quand tu n'es pas là, à ton avis ?
Que penses-tu vraiment de la tenue de {joueur} ce soir ?
Qu'est-ce qui t'agace chez {joueur}, gentiment ?
Qu'est-ce que {joueur} fait mieux que toi ?
Avec qui ici échangerais-tu ta garde-robe ?
À qui ici confierais-tu tes réseaux sociaux pendant un mois ?
Dans la tête de qui ici aimerais-tu lire pendant une heure ?
Si tu pouvais effacer un souvenir, lequel choisirais-tu ?
Si ta vie amoureuse était un film, quel serait son titre ?
Quel est ton pire achat de vêtement ?
Quel look de ton passé te fait le plus honte ?
Décris ta pire photo de classe.
Quelle excuse utilises-tu le plus pour être en retard ?
Combien de fois as-tu menti aujourd'hui, à ton avis ?
T'es-tu déjà fait prendre la main dans le sac ? Raconte.
Quelle est la pire chose que tu aies dite sous le coup de la colère ?
As-tu déjà raccroché au nez de quelqu'un ? Qui ?
As-tu déjà bloqué quelqu'un ici, même quelques heures ?
Qui ici as-tu déjà mis en sourdine sur les réseaux ?
Quel est le nom de ton groupe de discussion le plus ridicule ?
Quelle conversation de ton téléphone ne montrerais-tu à personne ?
Quel est le contact le plus bizarre de ton téléphone ?
Sous quel nom {joueur} est-{elle|il:joueur} enregistré{e|:joueur} dans ton téléphone ?
As-tu déjà envoyé une capture d'écran à la personne dont tu te moquais ?
Quelle est la pire faute d'orthographe que tu aies faite dans un message important ?
As-tu déjà été {jalouse|jaloux} d'un ex de ton partenaire ?
Quel prénom ne veux-tu plus jamais entendre ?
Quelle chanson te fait penser à un ex ?
As-tu déjà écouté une chanson triste en boucle après une rupture ?
Quelle est ta pire honte en vacances ?
Quelle a été la pire gueule de bois de ta vie ?
Quel est ton record de nuit blanche ?
À quelle heure es-tu {rentrée|rentré} de soirée, au plus tard ?
As-tu déjà dormi dans un endroit improbable après une soirée ?
As-tu déjà perdu quelque chose d'important en soirée ?
As-tu déjà oublié complètement ce que tu avais fait la veille ?
As-tu déjà pleuré en soirée ? Pourquoi ?
As-tu déjà été malade devant quelqu'un que tu voulais impressionner ?
Quel est l'endroit le plus improbable où tu t'es {endormie|endormi} ?
Si tu devais noter ta vie amoureuse sur 10, combien ?
Quel est le plus gros mensonge que tu aies dit à un partenaire ?
Qu'est-ce qui te rend le plus {jalouse|jaloux} ?
Quel défaut de tes parents as-tu hérité malgré toi ?
Que caches-tu encore à tes parents aujourd'hui ?
Quelle question redoutes-tu aux repas de famille ?
Quel membre de ta famille as-tu du mal à supporter ?
As-tu déjà fait semblant d'être malade pour ne pas aller travailler ou en cours ?
As-tu déjà triché à un jeu de société ?
Quel est l'endroit le plus improbable où ton téléphone est tombé ?
Quel est l'objet le plus bizarre que tu aies perdu ?
Combien de téléphones as-tu cassés ?
Quelle est la chose la plus chère que tu aies perdue ?
As-tu déjà fait exprès d'oublier ton portefeuille ?
Quel est le pourboire le plus radin que tu aies laissé ?
As-tu déjà mangé quelque chose dans un magasin avant de le payer ?
Quel est ton plus gros défaut en couple ?
Quelle qualité fais-tu semblant d'avoir ?
Quel compliment as-tu fait sans le penser ?
Quel est ton surnom le plus gênant, et qui te l'a donné ?
Quelle est la chose la plus bizarre que tu aies faite seul{e|} chez toi ?
As-tu déjà parlé à ton animal comme à un humain pendant des heures ?
As-tu déjà été {prise|pris} en train de chanter ou de danser seul{e|} ?
As-tu déjà été {surprise|surpris} en train de te parler à toi-même devant un miroir ?
Quel est le pire endroit où tu aies eu un fou rire ?
Quelle est la chose la plus absurde que tu aies crue jusqu'à un âge avancé ?
Quel complot ou quelle théorie bizarre te paraît crédible ?
Quel film culte n'as-tu jamais vu en faisant croire le contraire ?
Quelle célébrité as-tu déjà défendue alors que personne ne l'aimait ?
Qui ici a le rire le plus contagieux ?
Qui ici t'a déjà fait le plus rire sans le vouloir ?
Qui ici se plaint le plus ?
Qui ici est le plus têtu ?
Qui ici dépense le plus en vêtements ?
Qui ici prend le plus de selfies ?
Qui ici a la pire écriture ?
Qui ici choisirais-tu pour t'aider à cacher un secret ?
Qui ici serait le premier à craquer dans une téléréalité ?
Qui ici serait le meilleur candidat de Koh-Lanta ?
Qui ici a le plus de chances de partir sans payer l'addition ?
À qui ici confierais-tu les clés de chez toi ?
À qui ici ne prêterais-tu jamais ta voiture ?
Qui ici a le pire sens de l'orientation ?
Qui ici serait le plus nul dans un escape game ?
Qui ici tomberait amoureux ou amoureuse le plus vite ?
Si tu devais te marier avec quelqu'un ici pour les papiers, qui choisirais-tu ?
Si tu devais partager ta chambre avec quelqu'un ici pendant un an, qui ?
Qui ici aurait le plus de mal à garder un secret ?
As-tu déjà menti sur ton métier ou tes études pour impressionner ?
As-tu déjà menti sur ton prénom à quelqu'un en soirée ?
As-tu déjà donné un faux numéro de téléphone ?
As-tu déjà fait semblant d'avoir un accent pour séduire ou impressionner ?
Quel est ton pire souvenir de rendez-vous chez le coiffeur ?
As-tu déjà pleuré pour une raison vraiment ridicule ? Laquelle ?
Quelle est la plus grosse colère que tu aies piquée pour un détail ?
Quel est ton pire souvenir de colonie ou de voyage scolaire ?
As-tu déjà été {amoureuse|amoureux} d'un ami de tes parents ou d'un parent d'ami ?
As-tu déjà espionné le téléphone d'un frère ou d'une sœur ?
As-tu déjà lu le journal intime de quelqu'un ?
As-tu déjà écrit un journal intime ? Que contenait-il ?
Quelle est la recherche internet la plus honteuse de ta semaine ?
Quelle vidéo regardes-tu en boucle quand personne ne te voit ?
Quelle chanson chantes-tu à tue-tête en voiture ?
Quel est ton plaisir coupable à la télé ?
As-tu déjà demandé un autographe ou une photo à une célébrité ?
As-tu déjà eu une conversation entière avec quelqu'un sans savoir qui c'était ?
As-tu déjà fait une fausse excuse à quelqu'un ici ? Laquelle ?
Quelle est l'excuse la plus inventive que tu aies trouvée pour annuler un plan ?
Quel est le pire cadeau d'anniversaire que tu aies offert par flemme ?
As-tu déjà fait payer un cadeau commun sans participer ?
Raconte la fois où tu as eu le plus honte devant tes parents.
Quelle est la chose la plus gênante que tes amis aient vue de toi ?
Quel est le surnom que tu donnes secrètement à ton chef ou à ton prof ?
Si tu devais quitter le groupe pour en rejoindre un autre, lequel ?
Quelle est la règle de couple que tu ne respectes jamais ?
Quel est ton pire souvenir de premier rendez-vous ?
As-tu déjà eu un rendez-vous où tu t'es {ennuyée|ennuyé} à mourir ?
As-tu déjà fui un rendez-vous par la porte de derrière ?
Quel est le texto que tu as mis le plus de temps à écrire ?
As-tu déjà fait relire un message à tes amis avant de l'envoyer à ton crush ?
As-tu déjà demandé à quelqu'un de mentir pour toi ?
As-tu déjà menti pour couvrir quelqu'un ici ?
Quelle est la plus grosse bêtise que tu aies faite cette année ?
Si tu devais t'excuser auprès de quelqu'un ici, pour quoi ?
Quelle est la chose que tu n'as jamais avouée à {joueur} ?
Quel est le défaut que {joueur} ne soupçonne pas chez toi ?
Qu'as-tu pensé de {joueur} la première fois que tu l'as vu{e|:joueur} ?
`),
  a: L(`
Envoie « J'ai un truc important à te dire » à un ami, et attends sa réponse avant de t'expliquer.
Appelle un ami et parle-lui uniquement en chantant pendant 20 secondes.
Appelle un de tes parents et dis-lui que tu l'aimes très fort, sans donner de raison.
Envoie un vocal où tu chantes à une personne choisie par le groupe.
Envoie un selfie grimaçant à la troisième conversation de ta liste.
Poste une story choisie par le groupe, avec une légende écrite par le groupe.
Change ta bio Instagram pour une phrase choisie par le groupe, pendant 24 heures.
Commente « Quelle époque » sous une vieille photo d'un ami.
Like la première photo publiée par {joueur}.
Montre à qui tu as envoyé ton dernier message, et ce que tu as écrit.
Lis à voix haute les derniers messages de ta conversation de groupe la plus active.
Montre ton historique YouTube.
Montre les cinq derniers emojis que tu as utilisés.
Montre ta playlist la plus honteuse.
Montre la plus vieille photo de ta galerie.
Montre ta plus ancienne photo de profil sur un réseau social.
Laisse {joueur} choisir une photo de ta galerie à montrer à tout le monde.
Fais un appel professionnel très sérieux avec une banane en guise de téléphone.
Fais un discours de candidature pour devenir le meilleur ami de {joueur}.
Imite {joueur} quand {elle|il:joueur} est fatigué{e|:joueur}.
Imite {joueur} en soirée, après minuit.
Imite {joueur} au réveil.
Imite ta mère qui t'appelle pour passer à table.
Imite ton père qui cherche ses clés.
Imite un influenceur qui fait la promotion d'un objet de la pièce.
Imite une star de téléréalité qui se confie face caméra.
Joue une scène de téléréalité avec {joueur} : une dispute pour un yaourt.
Rejoue une rupture dramatique avec {joueur}.
Fais une demande en mariage à {joueur} avec un objet de la pièce en guise de bague.
Fais le leader d'un groupe de K-pop et apprends une chorégraphie au groupe.
Fais un défilé de mode sur un thème choisi par le groupe.
Porte un vêtement de {joueur} jusqu'à la fin de la partie.
Mets du rouge à lèvres sans miroir, si quelqu'un en a.
Laisse {joueur} te mettre du vernis sur un ongle.
Goûte un mélange de deux boissons sans alcool choisi par le groupe.
Dis quelque chose de gentil puis quelque chose de taquin à chaque personne.
Fais la critique de la soirée comme un critique de cinéma.
Présente ta vie amoureuse comme une bande-annonce de film.
Raconte ton dernier rendez-vous comme un commentateur sportif.
Raconte ta pire rupture comme un conte de fées.
Raconte ton pire souvenir de soirée en 30 secondes.
Danse ton premier slow imaginaire avec un coussin.
Fais une battle de danse avec {joueur}. Le groupe vote.
Fais un clash de rap contre {joueur}, en restant gentil.
Chante une chanson d'amour en regardant {joueur} dans les yeux.
Chante une chanson de rupture à {joueur}.
Fais une sérénade à la personne à ta gauche.
Lis ta dernière recherche internet avec une voix de présentateur du journal.
Fais un tutoriel de drague en 30 secondes.
Montre comment tu te comportes quand quelqu'un te plaît.
Fais un clin d'œil à chaque personne, en gardant ton sérieux.
Fais semblant de pleurer pour obtenir une faveur de {joueur}.
Négocie une faveur avec {joueur} en 30 secondes.
Convaincs {joueur} de te donner un objet qu'{elle|il:joueur} a sur {elle|lui:joueur}.
Fais la fiche de rencontre de {joueur} : trois qualités et un défaut.
Écris une bio de site de rencontre pour {joueur} et lis-la.
Présente {joueur} comme {la candidate|le candidat:joueur} d'une émission de rencontre.
Désigne la personne avec qui tu partirais en vacances, et explique pourquoi.
Désigne la personne qui a le meilleur style ici, et explique pourquoi.
Désigne la personne qui ment le mieux ici, avec une preuve.
Fais le top 3 des personnes les plus drôles ici.
Classe les personnes ici, de la plus fêtarde à la plus sage.
Note le rire de chaque personne sur 10.
Imite le rire de chaque personne.
Lis une conversation de ton téléphone avec la voix de Dark Vador.
Parle comme un présentateur de téléréalité jusqu'à ton prochain tour.
Parle comme un ado de 14 ans jusqu'à ton prochain tour.
Parle en verlan jusqu'à ton prochain tour.
Termine chaque phrase par « ou pas » jusqu'à ton prochain tour.
Interdit de dire « moi » jusqu'à ton prochain tour.
Réponds uniquement en mimant jusqu'à ton prochain tour.
Obéis à {joueur} pendant 30 secondes, dans la limite du raisonnable.
Sois l'assistant personnel de {joueur} jusqu'à ton prochain tour.
Laisse {joueur} te poser trois questions. Réponds sans mentir.
Révèle un secret sans gravité que personne ici ne connaît.
Avoue ce que tu as pensé de {joueur} la première fois.
Joue un journaliste people et interroge {joueur} sur sa vie amoureuse.
Fais un massage du crâne à {joueur} pendant 20 secondes.
Laisse {joueur} te dessiner un tatouage au stylo sur le bras.
Fais un bisou sur la joue de {joueur}.
Lance un câlin collectif.
Montre la dernière photo que tu as envoyée à quelqu'un.
Fais lire ta dernière conversation avec ta mère ou ton père à {joueur}.
Laisse {joueur} envoyer un message de son choix à une personne de tes contacts. Tu as un droit de veto.
Écris un message d'excuse exagéré à un ami pour une raison inventée, et envoie-le.
Envoie « Tu dors ? » au dixième contact de ton téléphone.
Envoie à ton meilleur ami ou ta meilleure amie une déclaration d'amitié digne d'un mariage.
Appelle un ami et fais-lui deviner une chanson que tu fredonnes.
Appelle quelqu'un et commande une pizza imaginaire, très sérieusement.
Raconte une anecdote gênante sur {joueur}, avec son accord.
Imite la façon dont {joueur} danse.
Imite la façon dont {joueur} rit.
Fais l'éloge de ton ex en 20 secondes, sans une seule critique.
Joue ton ex qui te croise par hasard, avec {joueur} dans ton rôle.
Fais une pub pour toi, comme si tu étais un parfum de luxe.
Défile comme un mannequin, puis prends la pose devant {joueur}.
Fais une séance photo de mode avec {joueur} comme photographe.
Raconte ton histoire d'amour la plus ratée en mode télénovela.
Fais un résumé de la soirée en rap.
Improvise un slam sur ton téléphone.
Chante le refrain d'une chanson en remplaçant un mot par le prénom de {joueur}.
Danse la macarena en entier.
Fais une chorégraphie de boys band avec {joueur}.
Fais une danse de victoire comme un footballeur après un but.
Fais une entrée de catcheur dans la pièce.
Raconte une blague en anglais.
Fais un compliment à chaque personne avec une voix de robot amoureux.
Parle avec la voix d'un personnage de dessin animé jusqu'à ton prochain tour.
Fais l'interview de {joueur} comme dans une émission de fin de soirée.
Pose une question gênante à {joueur}. {Elle|Il:joueur} doit répondre.
Échange ton téléphone avec {joueur} pendant une minute, sans toucher aux messages.
Laisse {joueur} faire défiler ton fil Instagram pendant 20 secondes.
Laisse {joueur} choisir ta sonnerie jusqu'à demain.
Mets la chanson choisie par le groupe en sonnerie jusqu'à demain.
Fais une imitation de ton prof le plus sévère.
Fais un récit dramatique de ta dernière dispute.
Lis ton dernier message envoyé avec beaucoup trop d'émotion.
Mime ta dernière dispute, le groupe devine le sujet.
Imite ta façon de draguer, version catastrophe.
Raconte ta pire honte au téléphone.
Laisse le groupe décider de ton prochain verre.
Fais une déclaration d'amour à ton plat préféré.
Fais une scène de jalousie à {joueur} parce qu'{elle|il:joueur} a parlé à quelqu'un d'autre.
Fais un mini-sketch de couple qui se dispute pour la télécommande, avec {joueur}.
Vends ton ex au groupe en 20 secondes, sans dire de mal.
Fais une imitation de toi-même en soirée.
Dis à {joueur} ce que tu as toujours voulu lui dire, gentiment.
Remplace le prénom de tout le monde par un nom de fruit jusqu'à ton prochain tour.
Parle uniquement en citations de films jusqu'à ton prochain tour.
Joue ta propre mère qui découvre ta chambre.
Mime ton premier rendez-vous, le groupe commente.
Fais semblant d'être un coach de vie et règle un problème de {joueur} en 30 secondes.
Fais un horoscope inventé pour chaque personne.
Lis l'avenir de {joueur} dans sa main.
Raconte l'histoire du groupe dans dix ans.
Fais le portrait chinois de {joueur} : un animal, un plat, une chanson.
Invente un nom de groupe de musique pour la soirée et chante son tube.
Rejoue la demande en mariage la plus ratée possible avec {joueur}.
Prends un selfie de couple avec {joueur}, version photo de mariage.
Fais semblant d'être en direct sur les réseaux pendant 30 secondes.
Raconte ton crush le plus inavouable sans donner son nom.
Mime ton crush célèbre, le groupe devine qui.
Dis le prénom de ton premier amour.
Dis le prénom de ton dernier crush.
Montre le dernier message que tu as envoyé à ton crush ou ton partenaire.
Rejoue de mémoire le dernier message vocal que tu as envoyé.
Fais tourner la bouteille et fais un compliment à la personne désignée.
Laisse {joueur} te maquiller une seule partie du visage, de son choix.
Laisse {joueur} te faire une coiffure de star des années 80.
Laisse {joueur} choisir un accessoire ridicule que tu portes jusqu'à la fin du jeu.
Porte tes lunettes de soleil jusqu'à ton prochain tour, même à l'intérieur.
Mets une chaussette sur ta main et fais-la parler jusqu'à ton prochain tour.
Fais un cours de danse de salon à {joueur}.
Invente une devise personnelle pour chaque personne.
Fais un discours pour annoncer ta candidature à la présidence du groupe.
Fais un débat de 30 secondes avec {joueur} : chocolatine contre pain au chocolat.
Défends une idée absurde choisie par le groupe pendant 30 secondes.
Fais la pub du dernier objet que tu as acheté.
Lis les conditions d'utilisation d'une appli avec une voix sensuelle.
Joue la scène d'un film d'action avec {joueur}, au ralenti.
Joue un serveur très désagréable qui prend la commande de {joueur}.
Joue un vendeur de luxe qui conseille {joueur}.
Fais un tour de la pièce comme si tu venais de gagner un Oscar.
Fais un discours de défaite comme si tu venais de perdre une élection.
Pose comme pour la couverture d'un album, le groupe prend la photo.
Laisse le groupe choisir un nouveau surnom que tout le monde utilise jusqu'à la fin.
Mets un objet de la pièce aux enchères comme une pièce de collection.
Écris un mot gentil sur un papier et donne-le à la personne que tu connais le moins ici.
Fais deviner une personne célèbre à {joueur} uniquement par des questions oui ou non.
Fais rire {joueur} en racontant ta journée avec une voix différente à chaque phrase.
Joue le guide touristique de ton propre téléphone.
Fais une présentation PowerPoint imaginaire sur toi-même en 30 secondes.
Joue une visio avec ton chef où tu as oublié de couper ta caméra.
Fais une démonstration de selfie parfait en commentant chaque étape.
Raconte comment tu as rencontré {joueur}, version film romantique.
Raconte comment tu as rencontré {joueur}, version film d'horreur.
Imite un candidat de télé-crochet qui chante faux, avec conviction.
Chante une chanson connue avec les paroles traduites mot à mot en anglais.
Fais la voix off de ce que pense {joueur} pendant 20 secondes.
Fais trois vœux pour {joueur} à voix haute.
Prends la pose d'un personnage de tableau célèbre.
Donne un conseil amoureux à chaque personne.
Organise un mini-concours de talents de 10 secondes chacun, et fais le jury.
Fais une déclaration à la caméra de ton téléphone comme dans une téléréalité.
Fais un tour de la pièce en draguant chaque objet.
Imite la personne que tu trouves la plus classe de la pièce.
Mime un rendez-vous raté, le groupe devine ce qui a mal tourné.
Mime ta réaction quand ton crush like ta photo.
Mime ta réaction quand ton ex t'écrit à 2 h du matin.
Mime la tête que tu fais quand tu reçois un message de ta banque.
Fais un discours d'ouverture de jeux olympiques pour la soirée.
Laisse le groupe te poser une question à laquelle tu dois répondre en un seul mot.
Invente un cocktail avec ce qu'il y a sur la table et décris-le comme un barman.
Donne une note sur 10 à la tenue de chaque personne, avec un commentaire.
Fais le portrait robot de ton partenaire idéal en mimes.
Dessine ton crush idéal en 30 secondes.
Fais une déclaration d'amour au frigo, comme dans une comédie romantique.
Raconte ton dernier achat inutile comme si c'était le meilleur investissement de ta vie.
Joue un agent secret qui doit transmettre un message à {joueur} sans que personne ne remarque.
Mime une soirée où tu as trop bu, sans un mot.
Lis tes trois derniers messages envoyés en prenant l'accent du Sud.
Montre ton dernier message de plus de dix lignes.
Fais deviner au groupe le nom d'un ex en mimant son métier.
Raconte ton premier bisou en mimant les deux personnes.
Fais une imitation de {joueur} qui raconte une anecdote.
Joue le meilleur ami de {joueur} qui fait un discours à son mariage.
Fais semblant d'animer une émission de cuisine avec ce qu'il y a sur la table.
Joue un détective qui interroge {joueur} sur ce qu'{elle|il:joueur} a fait hier soir.
Fais une réclamation au service client pour ta vie amoureuse.
Écris un haïku sur ton dernier rendez-vous et lis-le.
Fais une chorégraphie avec les mains seulement sur une chanson choisie par {joueur}.
Fais l'éloge de ton téléphone comme s'il partait à la retraite.
Fais semblant d'être bloqué{e|} dans un ascenseur avec {joueur} et improvise la scène.
Rejoue avec {joueur} la scène où deux amis se retrouvent après dix ans.
Imite ta tête quand tu croises un ex au supermarché.
Supplie ton téléphone, de façon dramatique, pour que ton crush te réponde.
`)
 },
 hot: {
  v: L(`
Qui ici a les plus beaux yeux ?
Qui ici a la voix la plus séduisante ?
Qui ici sent le meilleur parfum ?
Qui ici serait le meilleur rendez-vous galant ?
Qui ici aurait le plus de chances de te faire craquer ?
Qui ici drague le mieux, à ton avis ?
Qui ici drague le plus mal ?
Qui ici embrasse le mieux, à ton avis ?
Qui ici a le plus de pouvoir de séduction ?
Avec qui ici partirais-tu en week-end en amoureux ?
Avec qui ici danserais-tu un slow ?
À qui ici donnerais-tu ton numéro si tu le croisais en soirée sans le connaître ?
Qui ici a un charme qu'il ou elle ne soupçonne pas ?
Si tu devais sortir avec quelqu'un ici pendant une semaine, qui choisirais-tu ?
Mains, voix ou parfum : qu'est-ce qui te trouble le plus chez quelqu'un ?
Quel compliment te fait rougir à coup sûr ?
Quel est ton meilleur atout de séduction ?
Quelle est ta technique de drague infaillible ?
Quelle est la pire technique de drague que tu aies tentée ?
Quelle est la phrase d'accroche la plus réussie que tu aies utilisée ?
As-tu déjà dragué quelqu'un dans les transports ?
As-tu déjà demandé son numéro à un inconnu ?
As-tu déjà glissé ton numéro sur un bout de papier ?
As-tu déjà dragué un serveur ou une serveuse ?
As-tu déjà eu un coup de foudre ? Raconte.
As-tu déjà eu un coup de foudre pour un inconnu croisé dans la rue ?
Quelle est la chose la plus folle que tu aies faite pour séduire ?
Quel a été ton plus beau premier rendez-vous ?
Raconte ton premier bisou, avec les détails.
Quel est le pire premier bisou de ta vie ?
Plutôt bisou tendre ou bisou passionné ?
Quel est le bisou le plus inattendu que tu aies reçu ?
As-tu déjà embrassé quelqu'un dont tu ne connaissais pas le prénom ?
As-tu déjà embrassé quelqu'un pour un pari ?
As-tu déjà embrassé un ami ou une amie ? Et après ?
As-tu déjà embrassé quelqu'un sous la pluie ?
As-tu déjà embrassé quelqu'un à minuit pile au Nouvel An ?
As-tu déjà été {embrassée|embrassé} par surprise ?
Quel bisou regrettes-tu de ne pas avoir donné ?
Quel est ton plus long flirt sans que rien ne se passe ?
As-tu déjà vécu une situation ambiguë avec un ami ou une amie ?
As-tu déjà eu un crush sur quelqu'un de beaucoup plus âgé que toi ?
As-tu déjà eu un crush sur un ou une collègue ?
As-tu déjà eu un crush sur le frère ou la sœur d'un ami ?
As-tu déjà eu un crush sur un voisin ou une voisine ?
As-tu déjà eu un crush sur ton coach ou ton moniteur ?
As-tu déjà eu un crush sur un personnage de dessin animé ?
Quelle est la scène de film la plus romantique, selon toi ?
Quelle scène de bisou de cinéma aimerais-tu vivre ?
Quelle chanson mettrais-tu pour séduire quelqu'un ?
Quel parfum aimes-tu sentir sur quelqu'un ?
Décris ton partenaire idéal en trois mots.
Qu'est-ce qui te fait fuir pendant un rendez-vous ?
Quel signal d'alerte ignores-tu toujours chez quelqu'un qui te plaît ?
Comment montres-tu à quelqu'un qu'il ou elle te plaît ?
Comment sais-tu que tu plais à quelqu'un ?
Quelle est la chose la plus romantique que tu aies faite ?
Quel est le cadeau le plus romantique que tu aies offert ?
Quel est le message le plus mignon que tu aies reçu ?
Quel est le plus beau compliment qu'on t'ait fait sur ton physique ?
Quelle partie de toi reçoit le plus de compliments ?
Quel est ton meilleur souvenir de slow ?
As-tu déjà fait une déclaration d'amour ? Comment ça s'est terminé ?
As-tu déjà écrit une lettre d'amour ?
As-tu déjà reçu une lettre d'amour ?
As-tu déjà été {amoureuse|amoureux} de deux personnes en même temps ?
As-tu déjà été {amoureuse|amoureux} sans jamais le dire ?
Combien de fois as-tu été vraiment {amoureuse|amoureux} ?
Raconte ton premier amour.
Quel est ton plus grand regret amoureux ?
Quel ex te fait encore de l'effet ?
As-tu déjà eu envie d'embrasser quelqu'un au pire moment possible ?
As-tu déjà dragué quelqu'un pour obtenir quelque chose ?
As-tu déjà fait semblant d'être {intéressée|intéressé} pour un verre offert ?
As-tu déjà posté une photo uniquement pour faire réagir un ex ?
Quelle est la chose la plus osée que tu aies faite pour attirer l'attention de quelqu'un ?
Quel est l'endroit le plus romantique où tu sois {allée|allé} ?
À quoi ressemblerait ton week-end en amoureux idéal ?
As-tu déjà flirté par message pendant des semaines sans jamais rencontrer la personne ?
As-tu déjà vécu une relation à distance ?
As-tu déjà eu un rendez-vous avec quelqu'un qui ne ressemblait pas du tout à ses photos ?
As-tu déjà accepté un rendez-vous à l'aveugle ?
Quel est ton record de rendez-vous galants en une semaine ?
As-tu déjà eu deux rendez-vous galants le même jour ?
As-tu déjà embrassé quelqu'un dès le premier rendez-vous ?
Combien de temps attends-tu avant le premier bisou ?
Qui doit faire le premier pas, selon toi ?
As-tu déjà fait le premier pas et regretté aussitôt ?
Le premier message, tu l'envoies ou tu attends ?
As-tu déjà dragué quelqu'un en lui envoyant une chanson ?
Quelle chanson te rappelle un bisou ?
As-tu déjà dansé collé-serré avec un inconnu ou une inconnue ?
As-tu déjà dragué en boîte avec succès ? Raconte.
As-tu déjà été {draguée|dragué} par quelqu'un de beaucoup plus jeune ?
As-tu déjà été {draguée|dragué} par quelqu'un du même sexe ? Comment as-tu réagi ?
Quel est l'endroit le plus improbable où l'on t'a {draguée|dragué} ?
As-tu déjà flirté avec un moniteur ou une monitrice de colo ou de ski ?
Quel serait le plus beau couple ici, réel ou imaginaire ?
Quelles deux personnes ici formeraient le meilleur couple ?
Qui ici a sûrement le plus d'ex ?
Qui ici a le plus de succès sur les applis de rencontre, à ton avis ?
Qui ici a le plus de chances de vivre une aventure de vacances ?
Qui ici rougit le plus facilement ?
Qui ici choisirais-tu pour te donner des cours de séduction ?
À qui ici demanderais-tu un conseil en amour ?
Note sur 10 ton talent pour la drague.
Note sur 10 ton dernier bisou.
Note ton charme sur 10, honnêtement.
Si tu devais séduire {opp} en une seule phrase, que dirais-tu ?
Quelle chanson dédierais-tu à {opp} ?
Quel surnom mignon donnerais-tu à {opp} ?
Quel est le plus grand atout de {opp}, selon toi ?
{opp} t'invite à danser. Tu acceptes ? Pourquoi ?
Si {opp} t'écrivait ce soir, que répondrais-tu ?
Embrasserais-tu {opp} pour 100 € ?
Que remarques-tu en premier chez {opp} ?
Quel écart d'âge maximum accepterais-tu en couple ?
Quelle a été ta plus grosse déception amoureuse ?
As-tu déjà menti sur ta situation amoureuse pour plaire ?
As-tu déjà eu une histoire avec un ou une collègue ?
As-tu déjà eu une histoire dans ton groupe d'amis qui a mal fini ?
As-tu déjà eu une histoire secrète que personne ici ne connaît ?
As-tu déjà passé une nuit entière à parler avec quelqu'un jusqu'au lever du soleil ?
As-tu déjà vécu une soirée qui aurait pu tourner en histoire d'amour ?
As-tu déjà été {jalouse|jaloux} sans aucune raison ?
Quelle est la chose la plus jalouse que tu aies faite ?
Que penses-tu des relations libres ?
Quelle est la chose la plus mignonne que tu fais en couple ?
Quel est ton langage de l'amour : les mots, les cadeaux, le temps passé ensemble, le toucher ou les petites attentions ?
Câlins à volonté ou besoin d'espace ?
Un bisou sur la bouche entre amis, c'est possible pour toi ?
Quelle est la meilleure façon de te séduire ?
Quelle erreur ne faut-il surtout pas faire pour te séduire ?
Quel style vestimentaire te fait craquer chez quelqu'un ?
Costume ou jean et baskets chez un partenaire ?
Cheveux longs ou cheveux courts chez quelqu'un qui te plaît ?
Les lunettes, ça te plaît ou pas du tout ?
Taches de rousseur, grain de beauté ou fossettes : ton détail préféré ?
Les tatouages chez un partenaire : pour ou contre ?
Quel accent trouves-tu le plus séduisant ?
Quelle langue étrangère trouves-tu la plus sexy ?
Quel métier trouves-tu le plus séduisant ?
Quel sport rend les gens plus attirants, selon toi ?
As-tu déjà fait du sport uniquement pour quelqu'un ?
As-tu déjà changé de look pour plaire à quelqu'un ?
As-tu déjà appris quelque chose uniquement pour impressionner un crush ?
As-tu déjà fait semblant d'aimer une musique ou un sport pour plaire ?
Que fais-tu pour être {sûre|sûr} de plaire en soirée ?
Combien de temps passes-tu à te préparer pour un rendez-vous galant ?
Quelle est ta tenue idéale pour un premier rendez-vous ?
Ton rendez-vous se passe mal : quelle est ton excuse pour partir ?
As-tu déjà quitté un rendez-vous galant en plein milieu ?
Quel est le rendez-vous le plus romantique que tu aies vécu ?
Raconte la dernière fois que ton cœur s'est emballé.
Quelle est la chose la plus mignonne qu'un crush t'ait dite ?
Qui est la dernière personne qui t'a fait de l'effet ?
Quand as-tu flirté pour la dernière fois ?
Combien de crushs as-tu en ce moment ?
As-tu un crush en ce moment ? Donne un indice.
Ton crush actuel est-il dans cette pièce ? Oui ou non.
Si ton crush t'écrivait maintenant, que ferais-tu ?
Qu'est-ce qui t'empêche de te déclarer à ton crush ?
Quelle est la chose la plus folle que tu ferais pour ton crush ?
Plutôt bisou dans le cou ou bisou sur le front ?
Quel est le moment idéal pour un premier bisou ?
As-tu déjà été {embrassée|embrassé} devant tes parents ?
Quelle a été ta plus belle soirée en amoureux ?
Quel ex garde le pire souvenir de toi, à ton avis ?
Avec quel ex as-tu les plus beaux souvenirs ?
Si tu devais écrire un message de drague à quelqu'un ici, à qui l'enverrais-tu ?
Avec qui ici passerais-tu une soirée romantique ?
Si tu devais faire une déclaration à quelqu'un ici, à qui ?
Quelle qualité de {opp} aimerais-tu trouver chez un partenaire ?
Quelle est la meilleure phrase d'accroche qu'on t'ait faite ?
As-tu déjà dragué quelqu'un en faisant semblant d'avoir besoin d'aide ?
As-tu déjà fait exprès de croiser quelqu'un qui te plaisait ?
As-tu déjà changé d'itinéraire pour croiser ton crush ?
As-tu déjà été {amoureuse|amoureux} d'un prof ou d'un formateur ?
As-tu déjà dragué quelqu'un pendant un mariage ?
As-tu déjà eu une histoire avec le témoin d'un mariage ?
As-tu déjà échangé un bisou dans un endroit où c'était interdit ?
Quel est le bisou le plus long de ta vie ?
Quel est le plus beau regard qu'on t'ait lancé ?
As-tu déjà rendu quelqu'un fou ou folle de jalousie, exprès ?
Quel est ton rendez-vous de rêve avec une célébrité ?
Avec quelle célébrité aimerais-tu danser un slow ?
Quelle célébrité aimerais-tu embrasser une seule fois ?
As-tu déjà eu le cœur brisé par quelqu'un ici, même un tout petit peu ?
As-tu déjà appris, des années après, que quelqu'un avait un crush sur toi ?
Quelle est la déclaration la plus maladroite qu'on t'ait faite ?
As-tu déjà dit « je t'aime » en premier ?
Combien de temps faut-il pour que tu dises « je t'aime » ?
Quelle est la plus longue relation que tu aies eue ?
Quelle est la relation la plus courte que tu aies eue ?
Qu'est-ce qui fait qu'un premier rendez-vous est réussi pour toi ?
As-tu déjà payé l'addition pour impressionner quelqu'un ?
Restaurant chic ou pique-nique au coucher du soleil pour un premier rendez-vous ?
As-tu déjà fait un road trip en amoureux ?
As-tu déjà dormi dans les bras de quelqu'un sans que rien ne se passe ?
As-tu déjà eu un flirt de vacances avec quelqu'un qui ne parlait pas ta langue ?
Quel est le texto de drague le plus nul qu'on t'ait envoyé ?
Quel est le texto de drague le plus réussi que tu aies envoyé ?
As-tu déjà envoyé un message à ton crush en te trompant de conversation ?
Qui ici aimerais-tu voir en couple avec quelqu'un d'autre ici ?
Quel conseil de séduction donnerais-tu à {opp} ?
À quoi ressemblerait un premier rendez-vous avec {opp} ?
Que penses-tu que {opp} pense de toi ?
Quel film regarderais-tu avec {opp} pour une soirée en amoureux ?
Si tu devais faire un slow avec {opp}, sur quelle chanson ?
Quelle est la chose la plus séduisante chez {opp} ce soir ?
Quel est ton premier souvenir de crush ?
As-tu déjà eu un crush sur quelqu'un juste à cause de sa voix ?
As-tu déjà eu un crush sur quelqu'un à cause de son odeur ?
Le romantisme, c'est ringard ou indispensable ?
Quelle chanson d'amour te fait encore frissonner ?
As-tu déjà regardé quelqu'un dans les yeux pendant si longtemps que c'en était gênant ?
Préfères-tu qu'on te complimente sur ton physique ou sur ta personnalité ?
As-tu déjà été {draguée|dragué} par le ou la partenaire d'un ami ?
As-tu déjà dû repousser quelqu'un ici ?
Si tu devais embrasser quelqu'un ici sur la joue, là, maintenant, qui ?
As-tu déjà fait une déclaration par message vocal ?
As-tu déjà fait semblant d'être {saoule|saoul} pour oser draguer ?
Quel est ton plus beau souvenir de Saint-Valentin ?
Quelle est ta pire Saint-Valentin ?
`),
  a: L(`
Regarde {opp} dans les yeux pendant 30 secondes sans rire.
Fais un bisou esquimau à {opp}.
Fais un bisou papillon sur la joue de {opp}, avec tes cils.
Fais un bisou sur l'épaule de {opp}.
Fais un bisou à l'intérieur du poignet de {opp}.
Fais un bisou sur le nez de {opp}.
Fais trois bisous à {opp}, à trois endroits du visage de ton choix, sauf la bouche.
Fais un massage du cou à {opp} pendant 30 secondes.
Fais un massage du cuir chevelu à {opp} pendant 30 secondes.
Caresse la joue de {opp} en lui faisant un compliment.
Passe ta main dans les cheveux de {opp}.
Fais un câlin à {opp} par derrière pendant 15 secondes.
Fais un slow sans musique avec {opp}, en fredonnant toi-même la chanson.
Danse une salsa ou une bachata avec {opp}.
Fais tourner {opp} sur {elle|lui:opp}-même comme dans un film de danse.
Apprends un pas de danse sensuel à {opp}.
Fais une danse de séduction de 20 secondes pour {opp}, sans {la|le:opp} toucher.
Défile devant {opp} comme sur un podium, avec un regard de braise.
Prends ta pose la plus séduisante pour une photo prise par {opp}.
Fais une séance photo glamour de 30 secondes, avec {opp} comme photographe.
Joue une scène de baiser de cinéma avec {opp}, en vous arrêtant au dernier moment.
Rejoue la scène du balcon de Roméo et Juliette avec {opp}.
Rejoue la scène finale de « Dirty Dancing » avec {opp}, porté facultatif.
Rejoue un premier rendez-vous avec {opp}, de la rencontre au bisou sur la joue.
Drague {opp} comme dans les années 50.
Drague {opp} avec une phrase d'accroche nulle, sans rire.
Drague {opp} uniquement avec des titres de chansons.
Drague {opp} en ne parlant que de nourriture.
Drague {opp} avec un accent italien.
Drague {opp} comme un personnage de film.
Fais une demande de rendez-vous officielle à {opp}, à genoux.
Écris ton numéro sur la main de {opp}.
Avec ton doigt, écris un compliment dans la paume de {opp}. {Elle|Il:opp} doit deviner.
Décris {opp} comme si tu {la|le:opp} voyais pour la première fois et que c'était le coup de foudre.
Fais trois compliments différents à {opp}.
Dis à {opp} ce que tu as remarqué en premier chez {elle|lui:opp}.
Chuchote à l'oreille de {opp} comment se passerait votre premier rendez-vous.
Chuchote une phrase en anglais à l'oreille de {opp}, avec ta voix la plus douce.
Dis une phrase romantique à {opp} dans une langue étrangère.
Chante une chanson d'amour à {opp}, les yeux dans les yeux.
Fredonne une chanson à l'oreille de {opp}.
Envoie un compliment par message à {opp}, alors que vous êtes dans la même pièce.
Envoie un compliment sincère à ton crush par message.
Envoie un cœur à la dernière personne avec qui tu as flirté.
Like une photo de ton crush datant de plus d'un an.
Montre au groupe une photo de ton crush, sans dire son nom.
Montre la photo de toi que tu trouves la plus séduisante.
Prends un selfie avec {opp} comme un couple qui vient de se fiancer.
Joue le couple marié avec {opp} jusqu'à ton prochain tour.
Appelle {opp} « mon cœur » jusqu'à ton prochain tour.
Sois {la cavalière|le cavalier} de {opp} jusqu'à la fin de la partie.
Ressers {opp} chaque fois que son verre est vide, jusqu'à ton prochain tour.
Assieds-toi tout contre {opp} jusqu'à ton prochain tour.
Pose ta main sur le genou de {opp} jusqu'à ton prochain tour.
Pose ta tête sur les genoux de {opp} pendant un tour.
Laisse {opp} te donner une bouchée à manger.
Donne une bouchée à manger à {opp}, de façon séduisante.
Bois dans le même verre que {opp}, en même temps si possible.
Bois une gorgée bras dessus bras dessous avec {opp}.
Fais passer une carte de ta bouche à celle de {opp} en aspirant, sans la faire tomber.
Fais passer une orange de ton cou à celui de {opp}, sans les mains.
Croquez chacun un bout de la même réglisse avec {opp}, et arrêtez-vous juste avant le bisou.
Mets du baume à lèvres à {opp}, tout doucement.
Retire délicatement une poussière imaginaire du visage de {opp}.
Remets le col de {opp} en place, lentement.
Coiffe {opp} en prenant tout ton temps.
Sens le parfum de {opp} dans son cou et décris-le.
Les yeux bandés, retrouve {opp} à son parfum.
Les yeux fermés, reconnais les mains de {opp} parmi celles de deux personnes.
Les yeux bandés, fais un bisou sur la joue de {opp}, guidé{e|} par le groupe.
Laisse {opp} te guider les yeux bandés à travers la pièce.
Tiens {opp} par la taille pendant 20 secondes en dansant.
Danse une valse avec {opp}.
Fais une déclaration à {opp} comme un chevalier du Moyen Âge.
Fais un regard de braise à {opp} jusqu'à ce qu'{elle|il:opp} détourne les yeux.
Fais rougir {opp} en moins de 30 secondes, sans {la|le:opp} toucher.
Fais rire {opp} en lui chuchotant quelque chose à l'oreille.
Fais trois compliments à {opp} dans trois langues différentes.
Décris à {opp} ton rendez-vous idéal comme si vous y étiez.
Écris un petit mot doux pour {opp} et glisse-le-lui dans la main.
Laisse {opp} choisir une photo de toi à mettre en photo de profil pendant une heure.
Laisse {opp} t'écrire un surnom au stylo sur le bras.
Laisse {opp} te mettre un peu de son parfum.
Masse les tempes de {opp} pendant qu'{elle|il:opp} garde les yeux fermés.
Fais un câlin à {opp} comme si vous ne vous étiez pas vus depuis un an.
Lis les lignes de la main de {opp} et invente son avenir amoureux.
Fais l'horoscope amoureux de {opp}.
Imite ta tête quand ton crush t'écrit.
Mime un premier bisou maladroit avec ta main.
Mange un carré de chocolat de la façon la plus séduisante possible devant {opp}.
Fais un tour sur toi-même en lançant un regard séducteur à chaque personne.
Retire ta veste ou ton pull de la façon la plus séduisante possible, en gardant ton haut.
Joue un slow de fin de boum avec {opp}.
Invite {opp} à danser comme dans un bal du XIXe siècle.
Donne trois conseils de séduction à {opp}.
Coache {opp} pendant 30 secondes pour qu'{elle|il:opp} drague quelqu'un d'autre ici.
Improvise avec {opp} un faux rendez-vous galant en une minute : commande, discussion, addition.
Fais le serveur d'un dîner romantique entre deux personnes du groupe.
Fais semblant de tomber dans les bras de {opp}.
Dis « je t'aime » à {opp} de cinq façons : drôle, triste, timide, passionnée et en chuchotant.
Fais une déclaration d'amour à {opp} comme dans une télénovela.
Joue une scène de retrouvailles à l'aéroport avec {opp}.
Fais un selfie avec {opp} où vous vous regardez dans les yeux.
Dessine le portrait de {opp} avec un cœur autour.
Avec ton doigt, écris un mot doux dans le dos de {opp}. {Elle|Il:opp} doit deviner.
Souffle doucement dans le cou de {opp}.
Caresse le dos de {opp} par-dessus son vêtement pendant 10 secondes.
Pose trois questions de séduction à {opp}. {Elle|Il:opp} répond honnêtement.
Fais un compliment à {opp} sans utiliser les mots beau, belle ou joli.
Joue au miroir avec {opp} pendant 20 secondes, les yeux dans les yeux.
Avancez lentement l'un vers l'autre avec {opp}, nez à nez. Le premier qui rit a perdu.
Pose ta veste sur les épaules de {opp}, avec élégance.
Raccompagne {opp} jusqu'à la porte bras dessus bras dessous, et dis-lui au revoir comme à la fin d'un rendez-vous.
Joue un adieu déchirant sur un quai de gare avec {opp}.
Propose un pacte à {opp} : si vous êtes célibataires à 40 ans, vous vous mariez.
Raconte ta rencontre avec {opp}, version inventée et romantique.
Présente {opp} comme ton ou ta partenaire à un dîner imaginaire.
Trinque avec {opp} les yeux dans les yeux et bois une gorgée sans {la|le:opp} quitter du regard.
Fais un bisou sur la joue de {opp} et demande-lui une note sur 10.
Prends {opp} dans tes bras et fais-lui un compliment à l'oreille.
Embrasse la main de {opp}, puis remonte jusqu'au coude avec trois bisous.
Fais un bisou sur la tempe de {opp}.
Fais un bisou sur le front de {opp} en {la|le:opp} tenant par le visage.
Caresse la nuque de {opp} du bout des doigts pendant 10 secondes.
Pose ta tête contre celle de {opp} pendant 15 secondes.
Fais un bisou sur la joue de {opp} en restant collé{e|} 5 secondes.
Fais un câlin à {opp} pendant toute la durée d'un refrain.
Prends la main de {opp} et ne la lâche pas jusqu'à ce qu'{elle|il:opp} boive.
Mets ta main dans celle de {opp} et dessine-lui des cercles avec ton pouce.
Raconte à {opp} ton plus beau souvenir de bisou, en le regardant dans les yeux.
Fais un compliment sur le sourire de {opp}, puis fais-{la|le:opp} sourire.
Fais un compliment sur la voix de {opp} et demande-lui de dire ton prénom.
Demande à {opp} de te faire un compliment, et réponds-lui avec un plus beau.
Choisis une chanson d'amour et dédie-la à {opp} devant tout le monde.
Mime ta technique de séduction en trois gestes, sur {opp}.
Fais la cour à {opp} comme un paon, en paradant.
Joue {la princesse charmante|le prince charmant} qui cherche {opp} au bal.
Mets un genou à terre et offre une fleur imaginaire à {opp}.
Fais une déclaration à {opp} en n'utilisant que des mots d'une syllabe.
Dis à {opp} trois choses que tu aimerais faire avec {elle|lui:opp} lors d'un week-end en amoureux.
Pose ta main sur le cœur de {opp} et dis si ça bat vite.
Reste joue contre joue avec {opp} pendant 10 secondes.
Fais un slow avec {opp} sur la chanson d'amour la plus ringarde que vous connaissiez.
Joue au jeu du regard avec {opp} : le premier qui sourit fait un bisou sur la joue de l'autre.
Fais un massage des mains à {opp} en lui disant ce que tu aimes chez {elle|lui:opp}.
Murmure à l'oreille de {opp} ton prénom, puis le sien, le plus doucement possible.
Fais semblant d'être un serveur qui apporte un mot doux à {opp} de la part d'un admirateur secret.
Écris un poème de quatre vers pour {opp} et lis-le en {la|le:opp} regardant.
Laisse {opp} te faire un bisou sur la joue, les yeux fermés.
Laisse {opp} remettre tes cheveux en place.
Laisse {opp} te masser les épaules pendant 20 secondes.
Laisse {opp} t'apprendre un pas de danse.
Laisse {opp} te dessiner un cœur sur la main.
Laisse {opp} choisir quelqu'un que tu dois draguer pendant 20 secondes.
Laisse {opp} te prendre dans ses bras pendant un slow imaginaire.
Laisse {opp} te nourrir les yeux fermés.
Imite la façon dont {opp} séduit, selon toi.
Fais le bruitage d'une scène romantique pendant que {opp} te regarde dans les yeux.
Fais une scène de jalousie théâtrale à {opp}.
Célèbre ton mariage imaginaire avec {opp}, le groupe joue les invités.
Fais un discours de témoin pour le mariage imaginaire de {opp}.
Danse en tenant {opp} par les mains, front contre front.
Fais tourner {opp} trois fois puis rattrape-{la|le:opp} dans tes bras.
Approche-toi de {opp} et murmure « je t'ai remarqué{e|:opp} dès que je suis {arrivée|arrivé} ».
Fais une déclaration enflammée à {opp} en remplaçant les mots d'amour par des noms de fromages.
Prends la main de {opp} et fais-lui faire le tour de la pièce comme au bal.
Écris un message de Saint-Valentin à {opp} et lis-le à voix haute.
Fais un bisou sur les doigts de {opp}, un par un.
Fais le geste le plus charmant possible pour inviter {opp} à s'asseoir à côté de toi.
Murmure un secret à l'oreille de {opp}.
Garde ton bras autour des épaules de {opp} jusqu'à ton prochain tour.
Fais deviner une chanson d'amour à {opp} en mimant les paroles.
Prends la pose d'un couple sur une affiche de film romantique avec {opp}.
Présente {opp} au groupe comme la personne la plus irrésistible de la soirée.
Fais un compliment osé, mais élégant, à chaque personne du groupe.
Montre ton plus beau regard séducteur à chaque personne, une par une.
Fais un clin d'œil, un sourire et un bisou soufflé à {opp}, dans cet ordre.
Retire doucement les lunettes ou un bijou de {opp} en {la|le:opp} regardant dans les yeux.
Rapproche ta chaise de celle de {opp} et reste collé{e|} jusqu'à ton prochain tour.
Dis à {opp} une phrase de drague que tu as vraiment utilisée.
Lis à {opp} un message de drague que tu as reçu, avec la voix la plus sensuelle possible.
Joue avec {opp} deux inconnus qui se rentrent dedans et ramassent leurs affaires en se regardant.
Fais un compliment à {opp} en le chantant sur l'air d'une chanson connue.
Fais un bisou sur la joue de {opp} et un deuxième sur l'autre, très lentement.
Laisse {opp} décider de la prochaine action que tu feras dans la soirée, dans les limites du jeu.
Dis à {opp} ce qui te ferait craquer chez {elle|lui:opp} si vous étiez en rendez-vous.
Raconte ton dernier rêve romantique à {opp}, même inventé.
Fais un bisou sur la joue de {opp} chaque fois que quelqu'un dit ton prénom, jusqu'à ton prochain tour.
Écris tes initiales et celles de {opp} dans un cœur, sur un papier ou sur ta main.
Prends {opp} par la main et emmène-{la|le:opp} faire le tour de la pièce sans un mot.
Regarde {opp} dans les yeux et décris la couleur exacte de ses yeux.
Fais un bisou sur la joue de {opp} en te mettant sur la pointe des pieds.
Mets ta main sur la joue de {opp} et dis-lui un compliment en le regardant fixement.
Fais un massage des pieds à {opp} pendant 20 secondes, en chaussettes.
Danse un tango théâtral avec {opp}, avec une rose imaginaire entre les dents.
Laisse {opp} s'asseoir sur tes genoux jusqu'à ton prochain tour.
Prends {opp} dans tes bras et balance-toi doucement pendant 15 secondes.
Murmure à l'oreille de {opp} trois mots qui te font penser à {elle|lui:opp}.
Laisse {opp} dessiner un cœur sur ta joue avec son doigt.
Fais un bisou dans les cheveux de {opp}.
Remonte la manche de {opp} et fais-lui un bisou sur l'avant-bras.
Fais la révérence à {opp} et demande-lui la permission de lui tenir la main.
Fais une déclaration à {opp} en utilisant uniquement des répliques de films.
Dis à {opp} quelle célébrité {elle|il:opp} pourrait faire tomber selon toi.
Chuchote un compliment à l'oreille de chaque personne, en finissant par {opp}.
Fais un câlin à {opp} en lui frottant doucement le dos.
Échange un vêtement ou un accessoire avec {opp} jusqu'à la fin de la partie.
Glisse un mot doux dans la poche de {opp}, à lire seulement à la fin de la soirée.
Imite ce que tu fais quand tu reçois un message de quelqu'un qui te plaît.
Fais une photo de toi et {opp} en train de vous tenir la main, à la façon d'une annonce de fiançailles.
Montre à {opp} ta façon de regarder quelqu'un qui te plaît.
Raconte à {opp} la chose la plus romantique que tu aies vécue, à voix basse.
Écris un message de drague à {opp} avec trois fautes volontaires et lis-le avec sérieux.
Mime une scène de bisou de cinéma avec ta main et celle de {opp}.
Fais un slow avec {opp} en lui racontant votre premier rendez-vous imaginaire.
Montre à {opp} le geste que tu fais pour signifier à quelqu'un que tu veux l'embrasser.
Fais un bisou sur la joue de {opp} et un autre sur sa main, puis demande-lui lequel {elle|il:opp} a préféré.
`)
 },
 x18: {
  v: L(`
Combien de temps durent tes préliminaires idéaux ?
Qu'est-ce que ton ou ta partenaire fait au lit qui te rend {folle|fou} ?
Hors de la chambre, quel est le meilleur endroit de la maison pour faire l'amour ?
As-tu déjà fait l'amour dans la cuisine ?
As-tu déjà fait l'amour chez tes parents ?
As-tu déjà fait l'amour pendant que quelqu'un dormait dans la même pièce ?
As-tu déjà fait l'amour dans une cabine d'essayage ?
Tes voisins t'ont-ils déjà fait une remarque sur le bruit ?
As-tu déjà entendu tes voisins faire l'amour ?
As-tu déjà surpris des colocs ou des amis en plein acte ?
As-tu déjà fait l'amour dans un avion ?
As-tu déjà fait l'amour dans un train ?
As-tu déjà fait l'amour sur une plage ?
As-tu déjà fait l'amour dans une piscine ou un jacuzzi ?
As-tu déjà fait l'amour sous la douche ? Bilan ?
As-tu déjà fait l'amour dans un ascenseur ?
As-tu déjà eu un moment coquin dans une salle de cinéma ?
As-tu déjà fait l'amour sous une tente ?
As-tu déjà fait l'amour dans les toilettes d'un bar ou d'une boîte ?
T'es-tu déjà {éclipsée|éclipsé} d'une soirée pour un moment coquin ?
Quelle est la chose la plus coquine que tu aies faite pendant une soirée ?
Quel est ton record de partenaires en un mois ?
Combien de coups d'un soir as-tu eus ?
Quel coup d'un soir aurais-tu voulu revoir ?
As-tu déjà couché avec quelqu'un rencontré sur une appli le soir même ?
As-tu déjà couché avec un ou une collègue ?
As-tu déjà couché avec un ami ou une amie ? Votre amitié a-t-elle survécu ?
As-tu déjà couché avec deux personnes du même groupe d'amis ?
As-tu déjà couché avec quelqu'un de beaucoup plus âgé que toi ?
As-tu déjà couché avec quelqu'un pour te venger d'un ex ?
As-tu déjà couché avec quelqu'un pour en oublier un autre ?
As-tu déjà couché avec quelqu'un d'un peu connu ?
As-tu déjà eu une relation purement sexuelle qui s'est transformée en couple ?
Combien de temps as-tu tenu sans sexe, au maximum ?
Quelle serait ta fréquence idéale ?
Plutôt rapide et intense ou longue nuit ?
Plutôt doux ou sauvage ?
Après l'amour : câlins, douche ou dodo ?
Parles-tu pendant l'amour ?
Aimes-tu qu'on te parle crûment au lit ?
As-tu déjà fait un jeu de rôle ? Lequel ?
Quel costume aimerais-tu voir sur ton ou ta partenaire ?
Quel costume serais-tu {prête|prêt} à porter pour une nuit ?
As-tu déjà été {attachée|attaché} ?
As-tu déjà attaché quelqu'un ?
La fessée : jamais, parfois ou souvent ?
As-tu déjà utilisé de la nourriture au lit ?
As-tu déjà utilisé des glaçons pendant un moment intime ?
As-tu déjà fait un massage à l'huile qui a dérapé ?
As-tu déjà fait l'amour les yeux bandés ?
As-tu déjà fait l'amour devant un miroir ?
As-tu déjà été {filmée|filmé} ou {photographiée|photographié} pendant un moment intime ?
As-tu déjà fait un appel vidéo coquin ?
As-tu déjà échangé des messages coquins avec quelqu'un que tu n'avais jamais vu ?
As-tu déjà envoyé une photo osée à la mauvaise personne ?
As-tu déjà reçu une photo osée que tu n'avais pas demandée ? Comment as-tu réagi ?
As-tu des photos coquines dans ton téléphone en ce moment ?
Quelle catégorie de vidéos coquines regardes-tu le plus ?
À quelle fréquence regardes-tu du porno ?
Quel film grand public t'a le plus troublé{e|} ?
Quel livre érotique as-tu lu ?
As-tu déjà offert un sextoy à quelqu'un ?
Combien de sextoys possèdes-tu ?
As-tu déjà oublié un sextoy en évidence quand quelqu'un est venu chez toi ?
Es-tu déjà {entrée|entré} dans un sex-shop ? Qu'as-tu acheté ?
Es-tu déjà {allée|allé} dans un club libertin ?
Serais-tu {prête|prêt} à aller dans un club libertin ?
As-tu déjà fait l'amour avec deux personnes différentes le même jour ?
T'es-tu déjà fait surprendre en train de te faire plaisir ?
À quelle fréquence te fais-tu plaisir en solo ?
Quel est l'endroit le plus étrange où tu t'es fait plaisir ?
As-tu déjà pensé à quelqu'un ici pendant un moment intime ?
Quelle célébrité t'a déjà inspiré un moment en solo ?
As-tu déjà fait un rêve érotique avec quelqu'un que tu connais ?
Quel est le rêve érotique le plus bizarre que tu aies fait ?
Quelle est la chose la plus folle que tu aies faite au lit ?
Que refuserais-tu toujours au lit ?
Quelle limite as-tu déjà dépassée sans la regretter ?
Qu'as-tu essayé une fois au lit et plus jamais ensuite ?
Qu'est-ce qui t'a le plus {surprise|surpris} lors de ta première fois ?
Ta première fois : préparée ou improvisée ?
Où s'est passée ta première fois ?
Quel conseil donnerais-tu à toi-même juste avant ta première fois ?
As-tu déjà eu un fou rire en plein acte ?
As-tu déjà eu une crampe en plein acte ?
As-tu déjà été {interrompue|interrompu} par un appel ou un animal ?
As-tu déjà cassé quelque chose pendant l'amour ?
Raconte ton retour à la maison le plus gênant au petit matin.
As-tu déjà filé en pleine nuit sans réveiller l'autre ?
As-tu déjà été trop {éméchée|éméché} pour aller au bout ?
Quel geste te rend {folle|fou} au lit ?
Quelle est ta technique secrète ?
Quelle est ta spécialité au lit ?
Sur 10, quelle note te donnerais-tu au lit ?
Sur 10, quelle note te donnerait ton ou ta dernière partenaire ?
Qu'est-ce qui fait un bon coup, selon toi ?
Endurance ou technique : qu'est-ce qui compte le plus pour toi ?
La taille compte-t-elle vraiment pour toi ?
Lingerie : quelle couleur te fait le plus d'effet ?
As-tu déjà fait du naturisme ?
As-tu déjà fait un bain de minuit sans maillot ?
As-tu déjà eu envie d'être {regardée|regardé} pendant l'amour ?
As-tu déjà regardé un couple faire l'amour, en vrai ?
Quel est le plus gros risque que tu aies pris pour un moment coquin ?
Quelle est la chose la plus coquine que tu aies faite au travail ?
As-tu déjà fait quelque chose de coquin sous la table au restaurant ?
As-tu déjà fait quelque chose de coquin à l'arrière d'un taxi ?
Quelle musique mettrais-tu pour faire l'amour ?
Quelle est la pire musique qui soit passée pendant l'amour ?
As-tu une playlist spéciale pour les moments intimes ?
Bougies et ambiance, ou spontané et sans chichis ?
Quelle a été ta nuit la plus romantique et la plus torride à la fois ?
Combien de rendez-vous attends-tu en général avant de passer la nuit avec quelqu'un ?
As-tu déjà couché avec quelqu'un qui embrassait mal ?
As-tu déjà été {déçue|déçu} après avoir longtemps attendu quelqu'un ?
As-tu déjà été {surprise|surpris} en bien par quelqu'un dont tu n'attendais rien ?
As-tu déjà eu une aventure avec quelqu'un en couple ?
As-tu déjà trompé quelqu'un ?
As-tu déjà été {trompée|trompé} ? Comment l'as-tu appris ?
Pardonnerais-tu une infidélité d'un soir ?
Où commence la tromperie pour toi : un bisou, un message ou une nuit ?
As-tu déjà vécu une relation libre ?
Quel est ton fantasme le plus facile à réaliser ?
Quel fantasme as-tu déjà réalisé ?
Quel fantasme aimerais-tu réaliser cette année ?
Qui ici a l'air le plus coquin, à ton avis ?
Qui ici a sûrement le plus d'expérience ?
Qui ici est le plus sauvage au lit, à ton avis ?
Qui ici fait le plus de bruit, à ton avis ?
Qui ici a sûrement le plus de sextoys ?
Qui ici a sûrement déjà fait un plan à trois ?
Qui ici ferait le meilleur strip-tease ?
Qui ici a le plus de chances d'avoir un sex friend en ce moment ?
Qui ici est le plus coquin par message, à ton avis ?
Qui ici cache le mieux son jeu ?
Quelle partie du corps des autres te rend {folle|fou} ?
Qu'aimerais-tu qu'on te fasse plus souvent ?
Qu'aimerais-tu faire plus souvent ?
Si tu pouvais tout essayer une nuit sans jugement, que choisirais-tu ?
Si tu écrivais une scène érotique, où se passerait-elle ?
Si ta vie sexuelle était un film, quel serait son titre ?
Ta vie sexuelle en ce moment : désert, oasis ou festival ?
À quand remonte ta dernière fois ?
Où s'est passée ta dernière fois ?
Raconte ta dernière fois en trois mots.
Combien de fois as-tu fait l'amour ce mois-ci ?
As-tu déjà fait l'amour le jour de ton anniversaire ?
As-tu déjà fait l'amour à minuit pile, le soir du Nouvel An ?
As-tu déjà eu un moment coquin pendant un mariage ?
As-tu déjà couché avec un ou une témoin de mariage ?
As-tu déjà été {excitée|excité} au pire moment ?
As-tu déjà été {troublée|troublé} par une simple voix au téléphone ?
As-tu déjà été {excitée|excité} en lisant un message ?
Quel est le message vocal le plus coquin que tu aies envoyé ?
As-tu déjà fait l'amour par téléphone ?
As-tu déjà fait l'amour la porte ouverte ?
As-tu déjà réservé une chambre d'hôtel juste pour une nuit coquine ?
As-tu déjà fait l'amour dans le lit de quelqu'un d'autre ?
Quel est l'endroit le plus inconfortable où tu as fait l'amour ?
Quelle position détestes-tu ?
Quelle est la position la plus acrobatique que tu aies tentée ?
As-tu déjà essayé une position vue sur internet ? Résultat ?
As-tu déjà fait l'amour devant un film ?
Quel est ton préliminaire préféré ?
Où un bisou te fait-il le plus d'effet ?
As-tu déjà eu un suçon visible au travail ou en cours ?
Où était le plus gros suçon que tu aies eu ?
As-tu déjà laissé des traces de griffures ?
As-tu déjà eu des courbatures après une nuit ?
T'es-tu déjà {endormie|endormi} en plein moment intime ?
As-tu déjà oublié le visage de quelqu'un avec qui tu avais passé la nuit ?
Comment fais-tu comprendre à quelqu'un que tu as envie de lui ou d'elle ?
Quel signe trahit que tu as envie ?
Protection : es-tu toujours {sérieuse|sérieux} ?
Quelle est la phrase la plus coquine que tu aies dite au lit ?
Quelle est la phrase la plus ridicule que tu aies dite au lit ?
As-tu déjà éclaté de rire à cause de ce qu'on t'a dit au lit ?
As-tu un surnom coquin ? Lequel ?
As-tu déjà dragué quelqu'un uniquement pour une nuit ?
As-tu déjà annoncé « juste une nuit » dès le départ ?
As-tu déjà regretté de ne pas avoir passé la nuit avec quelqu'un ?
Quelle occasion manquée regrettes-tu encore ?
Quel ex était le meilleur au lit, sans donner de nom ?
Ton ex te propose une nuit, sans suite. Tu acceptes ?
Ton meilleur ami ou ta meilleure amie te propose une nuit, sans suite. Tu acceptes ?
Quelle célébrité imagines-tu très douée au lit ?
Qui ici imagines-tu le plus tendre au lit ?
Plutôt matin câlin ou nuit blanche ?
Combien de temps tiens-tu sous la couette un dimanche quand tu n'es pas {seule|seul} ?
Quel est le vêtement que tu enlèves en premier quand ça devient chaud ?
Quel est le pire sous-vêtement que tu aies porté lors d'une première nuit ?
As-tu déjà acheté de la lingerie spécialement pour quelqu'un ?
As-tu déjà dormi chez quelqu'un sans rien faire, alors que tout le monde pensait le contraire ?
As-tu déjà fait croire à tes amis qu'il s'était passé quelque chose alors que non ?
As-tu déjà menti sur ton nombre de partenaires ? Dans quel sens ?
Quel est le nombre de partenaires idéal chez l'autre, selon toi ?
As-tu déjà eu un plan régulier dont tes amis ignoraient tout ?
As-tu déjà eu une histoire torride avec quelqu'un que tu n'aurais jamais présenté à tes parents ?
Quel est le lieu de vacances le plus torride de ta vie ?
As-tu déjà fait l'amour dans un pays étranger avec quelqu'un dont tu ne parlais pas la langue ?
Quel est ton plus beau souvenir de câlin du matin ?
As-tu déjà eu envie de quelqu'un pendant une réunion ou un cours ?
As-tu déjà eu une attirance purement physique pour quelqu'un que tu ne supportais pas ?
As-tu déjà fait l'amour après une dispute ?
Réconciliation sur l'oreiller : ça marche avec toi ?
As-tu déjà eu un coup d'un soir avec quelqu'un que tu revois souvent ?
Quel est ton plus gros fantasme d'uniforme ?
As-tu déjà joué au strip-poker ?
As-tu déjà joué à un jeu coquin comme celui-ci qui a vraiment dérapé ?
As-tu déjà fait un strip-tease à quelqu'un par appel vidéo ?
As-tu déjà tenté un plan à trois qui ne s'est finalement pas fait ?
As-tu déjà reçu une proposition de plan à trois ?
`),
  a: L(`
Mime, avec tes mains seulement, ce que tu aimes qu'on te fasse.
Montre sur ton poignet comment tu embrasses dans le cou.
Montre ta technique de bisou sur un fruit, le groupe note sur 10.
Montre ta technique sur une banane, le groupe note sur 10.
Imite le bruit de tes voisins le samedi soir.
Mime ta dernière fois, sans un mot.
Montre ton déhanché le plus sexy pendant 15 secondes.
Fais un strip-tease d'un accessoire devant {opp} : montre, bijou ou ceinture.
Enlève ta ceinture lentement en regardant {opp}.
Laisse {opp} t'enlever un accessoire avec les dents.
Retire un bijou de {opp} avec les dents.
Défais un bouton du haut de {opp}, avec son accord.
Défais un bouton de ton haut et garde-le ainsi jusqu'à la fin de la partie.
Enlève ton haut et remets-le à l'envers, devant tout le monde.
Échange ton haut avec {opp}, ici, devant tout le monde.
Reste en sous-vêtements jusqu'à ton prochain tour, ou prends 3 gages.
Montre tes sous-vêtements au groupe pendant 3 secondes.
Enlève tes sous-vêtements sans retirer tes vêtements, et pose-les sur la table.
Lèche une goutte de ta boisson sur la clavicule de {opp}.
Fais glisser un glaçon le long du dos de {opp}.
Mange un bonbon posé sur le ventre de {opp}, sans les mains.
Mange de la chantilly dans le cou de {opp}.
Fais passer un glaçon de ta bouche à celle de {opp}, ou prends 2 gages.
Embrasse {opp} comme dans ton film préféré, ou prends 2 gages.
Les yeux bandés, devine qui t'embrasse dans le cou, entre deux personnes.
Les yeux bandés, laisse {opp} poser un glaçon où {elle|il:opp} veut au-dessus de la ceinture.
Les yeux bandés, laisse {opp} te faire goûter quelque chose du bout de ses doigts.
Embrasse {opp} au bas du dos, par-dessus ou sous le vêtement selon son accord.
Embrasse l'intérieur du poignet de {opp} et remonte lentement jusqu'au coude.
Embrasse la nuque de {opp} pendant 10 secondes.
Embrasse le haut du torse de {opp}, au niveau du col.
Laisse {opp} t'embrasser la nuque pendant 10 secondes.
Masse les cuisses de {opp} par-dessus le vêtement pendant 20 secondes.
Masse le bas du dos de {opp} pendant 30 secondes.
Fais un massage sensuel des pieds à {opp}.
Laisse {opp} te masser où {elle|il:opp} veut au-dessus de la ceinture, pendant 20 secondes.
Passe tes doigts le long de la colonne de {opp}, sous son haut si {elle|il:opp} accepte.
Effleure les lèvres de {opp} du bout du doigt.
Caresse l'intérieur du bras de {opp} du bout des doigts pendant 15 secondes.
Caresse la cuisse de {opp} par-dessus le vêtement pendant 10 secondes.
Pose ta main sur la cuisse de {opp} jusqu'à ton prochain tour.
Laisse {opp} poser sa main sur ta cuisse jusqu'à ton prochain tour.
Fais une lap dance de 20 secondes à la personne désignée par le groupe.
Fais une pole dance avec un balai ou l'encadrement d'une porte.
Fais une danse sexy contre le mur, en solo, pendant 20 secondes.
Twerke contre {opp} pendant 10 secondes.
Enlève ta veste ou ton pull, puis remets-le de la façon la plus sexy possible.
Joue avec {opp} une scène de film érotique, habillés, pendant 20 secondes.
Rejoue avec {opp} la scène de la poterie de « Ghost », avec un verre ou une bouteille.
Rejoue avec {opp} la scène de la voiture de « Titanic », la main sur la vitre.
Rejoue le croisement de jambes de « Basic Instinct ».
Lis à voix haute un passage coquin trouvé sur internet par le groupe.
Décris {opp} comme dans un roman érotique, en 20 secondes.
Mime avec {opp} la position choisie par le groupe, habillés, pendant 5 secondes.
Mime une position du Kamasutra avec un coussin, le groupe devine son nom.
Fais 5 pompes au-dessus de {opp}, {allongée|allongé:opp} sous toi, avec un bisou à chaque pompe.
Plaque doucement {opp} contre un mur et regarde-{la|le:opp} 10 secondes, sans l'embrasser.
Embrasse {opp} en {la|le:opp} plaquant doucement contre un mur, ou prends 2 gages.
Montre sur ta main ta technique de baiser avec la langue, pendant 5 secondes.
Embrasse {opp} avec un bonbon dans la bouche et fais-le-lui passer, ou prends 2 gages.
Murmure à {opp} ce que tu portes en dessous.
Murmure à l'oreille de {opp} ton endroit préféré pour faire l'amour.
Murmure à {opp} le dernier rêve érotique que tu as fait.
Envoie un message coquin à {opp} alors qu'{elle|il:opp} est dans la pièce. {Elle|Il:opp} le lit à voix haute.
Montre à {opp} la photo la plus sexy de ton téléphone.
Prends une photo sexy de toi, le groupe fait le photographe, puis supprime-la.
Prends {opp} en photo dans sa pose la plus sexy, avec son accord.
Prends la pose d'une couverture de magazine coquin pendant 10 secondes.
Laisse {opp} te placer dans la pose de son choix, comme une statue, pendant 10 secondes.
Fais une trace de baisers de l'épaule jusqu'au cou de {opp}.
Embrasse les doigts de {opp} un par un.
Prends le doigt de {opp} entre tes lèvres en {la|le:opp} regardant dans les yeux.
Fais un bisou sur le ventre de {opp}, puis remonte jusqu'au cou.
Enlève deux vêtements, accessoires non compris, jusqu'à la fin de la partie.
Fais un baiser de cinéma à la renverse avec {opp}, ou prends 2 gages.
Embrasse sur la bouche deux personnes de ton choix, ou prends 3 gages.
Embrasse sur la bouche la personne que le groupe désigne, ou prends 2 gages.
Embrasse {opp} avec de la chantilly sur les lèvres.
Embrasse {opp} sur la bouche à travers une feuille de papier.
Embrasse {opp} sur la bouche, les yeux bandés.
Fais un slow avec {opp} qui se termine par un baiser, ou prends 2 gages.
Glisse ta main dans la poche arrière de {opp} jusqu'à ton prochain tour.
Pose ta main sur les fesses de {opp} pendant 5 secondes, avec son accord.
Donne une petite fessée à {opp}, avec son accord.
Laisse {opp} te donner une fessée.
Fais un bisou sur les fesses de {opp}, par-dessus le vêtement.
Montre ton tatouage le plus caché, ou dis où il se trouve.
Montre du doigt ta zone la plus sensible.
Montre la dernière photo coquine de ton téléphone à une seule personne de ton choix.
Montre ta dernière conversation coquine à {opp}.
Lis à voix haute le dernier message coquin que tu as reçu.
Montre avec tes doigts ton nombre de partenaires.
Écris un mot coquin sur le ventre de {opp} avec ton doigt. {Elle|Il:opp} doit deviner.
Écris au stylo un mot coquin à un endroit caché de ton corps, et révèle-le à la fin du jeu.
Laisse {opp} te faire une marque de rouge à lèvres dans le cou.
Assieds-toi entre les jambes de {opp} jusqu'à ton prochain tour.
Fais la cuillère avec {opp} pendant 30 secondes, allongés.
Allonge-toi contre {opp} pendant un tour complet.
Danse un slow collé avec {opp}, les mains sur ses hanches.
Danse un reggaeton très collé avec {opp} pendant 20 secondes.
Pousse un soupir langoureux à l'oreille de {opp}.
Respire lentement à l'oreille de {opp} pendant 5 secondes.
Mordille le cou de {opp}.
Mordille le doigt de {opp} en le regardant dans les yeux.
Embrasse {opp} sans les lèvres, uniquement avec le bout du nez et ton souffle.
Fais un bisou papillon dans le cou de {opp}.
Fais un bisou sur le torse de {opp}, au niveau du cœur, par-dessus le vêtement.
Fais un bisou à l'intérieur de la cuisse de {opp}, par-dessus le vêtement, avec son accord.
Décris à voix haute le sous-vêtement parfait sur {opp}.
Dis à {opp} quelle partie de son corps tu préfères, en la touchant du bout du doigt.
Désigne la personne ici avec qui tu pourrais passer une nuit, et dis-lui pourquoi à l'oreille.
Fais une proposition indécente à {opp}, en vers.
Lance ton meilleur regard « on rentre ? » à {opp}.
Imite ce que tu fais pour faire comprendre à quelqu'un que tu as envie.
Imite ta façon d'enlever ton haut quand tu es {pressée|pressé}.
Fais un dessin coquin en 20 secondes, le groupe devine ce que c'est.
Dessine ta position préférée avec des bonshommes bâtons, le groupe devine.
Fais deviner le nom d'un sextoy en le mimant.
Fais deviner un mot coquin au groupe en le mimant.
Cite 10 expressions pour dire « faire l'amour » en 20 secondes.
Cite 5 positions en 10 secondes.
Cite 5 zones érogènes en 10 secondes.
Cite 5 films érotiques en 20 secondes.
Invente une position, donne-lui un nom et mime-la avec un coussin.
Fais une pub de 20 secondes pour un sextoy imaginaire.
Fais une pub de 20 secondes pour des préservatifs.
Présente-toi comme dans une petite annonce coquine, en trois phrases.
Commente la soirée comme la voix off d'un film coquin.
Commence une histoire érotique, {opp} doit la continuer.
Joue un plombier venu réparer une fuite chez {opp}, version film coquin, pendant 20 secondes.
Joue une scène d'infirmière et de patient avec {opp}, version coquine, pendant 20 secondes.
Joue {la policière|le policier} qui fouille {opp}, version coquine et avec son accord.
Fais un massage du cuir chevelu à {opp} en lui murmurant des mots coquins.
Embrasse le cou de {opp} pendant qu'{elle|il:opp} boit une gorgée.
Laisse {opp} t'embrasser où {elle|il:opp} veut sur les bras et les épaules, les yeux fermés.
Dégrafe ou défais un vêtement de {opp} d'une seule main, avec son accord.
Fais un strip-tease de 15 secondes sur une chanson choisie par {opp}, en ne retirant qu'un vêtement.
Retire une chaussette de {opp} avec les dents.
Joue au chat et à la souris avec {opp} : {elle|il:opp} a 10 secondes pour t'attraper et t'embrasser.
Laisse {opp} t'embrasser là où tu as le plus de chatouilles, au-dessus de la ceinture.
Chuchote à {opp} le plus beau compliment qu'on t'ait fait au lit.
Raconte à l'oreille de {opp} ta nuit la plus torride, en trois phrases.
Raconte à {opp}, les yeux dans les yeux, ce que tu aimerais essayer.
Caresse les cheveux de {opp} en lui décrivant ton fantasme.
Passe un glaçon sur tes lèvres puis embrasse le cou de {opp}.
Fais un bisou dans le cou de {opp} chaque fois que le groupe applaudit, pendant 20 secondes.
Pose ta tête sur la poitrine de {opp} pendant 15 secondes.
Laisse {opp} poser sa tête sur ta poitrine pendant 15 secondes.
Fais un câlin à {opp} sans les mains, uniquement avec ton corps, pendant 10 secondes.
Mets-toi dos à dos avec {opp} et danse lentement pendant 15 secondes.
Fais une danse sensuelle à {opp} sur une chaise, sans {la|le:opp} toucher, pendant 30 secondes.
Laisse {opp} te faire une danse sensuelle sur ta chaise.
Montre la façon dont tu aimes être {embrassée|embrassé}, sur le bras de {opp}.
Joue à « chaud ou froid » avec {opp} : {elle|il:opp} cherche ta zone la plus sensible du bout des doigts.
Laisse {opp} chercher ton point faible dans le cou, du bout des lèvres.
Passe une minute sur les genoux de {opp}, face à {elle|lui:opp}.
Fais un baiser à {opp} de la façon que le groupe choisit : timide, passionné ou à la française, ou prends 3 gages.
Fais une démonstration de massage sensuel sur le bras de {opp}.
Fais goûter à {opp} une gorgée de ta boisson, de bouche à bouche, ou prends 3 gages.
Fais un bisou dans le cou de chaque personne qui accepte, en commençant par {opp}.
Choisis une personne et passe un tour complet sur ses genoux.
Dis à voix haute ton fantasme numéro un, puis désigne la personne qui pourrait le réaliser.
Murmure à {opp} le mot coquin que tu préfères.
Fais deviner à {opp} ta zone érogène préférée par « chaud » ou « froid ».
Retire un vêtement à chaque fois que le groupe applaudit pendant 15 secondes, sous-vêtements exclus.
Laisse {opp} t'enlever ta veste ou ton pull, très lentement.
Embrasse {opp} dans le cou en descendant jusqu'à l'épaule.
Mets un peu de miel ou de chocolat sur ton doigt et laisse {opp} le goûter.
Fais une marque de rouge à lèvres sur le ventre de {opp}.
Montre à {opp} comment tu aimes qu'on te caresse le dos.
Glisse un glaçon dans le haut de {opp}, dans le dos.
Mime ta nuit idéale en trois gestes.
Regarde {opp} en te mordant la lèvre pendant 5 secondes.
Fais un bisou sur la bouche à {opp} pendant 3 secondes, ou prends 2 gages.
Allonge-toi sur le canapé et laisse {opp} s'allonger sur toi pendant 10 secondes.
Fais le geste le plus sensuel possible avec une paille et ta boisson.
Mange un fruit dans la main de {opp}, sans tes mains.
Enlève ton haut et laisse {opp} te le remettre.
Fais tourner ton haut au-dessus de ta tête comme dans un spectacle de strip-tease, en gardant tes sous-vêtements.
Embrasse {opp} pendant que le groupe chante une chanson d'amour, ou prends 3 gages.
Passe ton doigt sur les lèvres de {opp}, puis sur les tiennes.
Laisse {opp} t'enlever tes chaussettes de façon sensuelle.
Avoue à l'oreille de {opp} ce que tu as pensé en {la|le:opp} voyant arriver ce soir.
Embrasse {opp} dans le cou pendant que {elle|il:opp} essaie de garder son sérieux.
Laisse {opp} te mordiller l'épaule.
Fais un bisou à {opp} juste au coin des lèvres.
Laisse {opp} t'embrasser juste au coin des lèvres.
Embrasse le lobe de l'oreille de {opp} et murmure-lui un mot doux.
Fais un massage des épaules à {opp} sous son haut, avec son accord.
Masse les mollets de {opp} en remontant jusqu'aux genoux.
Prends la main de {opp} et pose-la où tu veux au-dessus de ta ceinture, pendant 5 secondes.
Laisse {opp} guider ta main où {elle|il:opp} veut au-dessus de sa ceinture, pendant 5 secondes.
Assieds-toi à califourchon sur une chaise et fais une déclaration torride à {opp}.
Fais un concours de baiser sur la main avec {opp} : le groupe note la technique.
Mets un bonbon entre tes lèvres et laisse {opp} venir le chercher, ou prends 2 gages.
Mets de la chantilly sur ton cou et laisse {opp} la goûter.
Fais une danse lascive avec une écharpe ou une serviette autour du cou de {opp}.
Attire {opp} vers toi avec une écharpe ou ta ceinture, puis arrête-toi à un souffle de son visage.
Remonte doucement le bas du haut de {opp} de quelques centimètres et embrasse son ventre.
Embrasse {opp} trois fois : sur la joue, dans le cou, puis sur la bouche, ou prends 3 gages.
Laisse {opp} passer un glaçon de son choix sur ta peau, au-dessus de la ceinture.
Mime ta réaction quand ton ou ta partenaire te réveille avec des bisous dans le cou.
Murmure à {opp} la chose la plus coquine que tu aies faite cette année.
Écris sur un papier ton fantasme et donne-le à {opp}, qui le lit en silence.
Fais rougir {opp} en lui décrivant ta tenue idéale pour {elle|lui:opp}, à l'oreille.
Fais trois bisous dans le dos de {opp}, entre les omoplates.
Embrasse lentement l'épaule nue de {opp}, avec son accord.
Imite le moment où tu enlèves tes chaussures en rentrant d'une nuit torride.
Prends {opp} par la taille et colle-{la|le:opp} contre toi pendant 10 secondes.
Laisse {opp} t'attraper par le col et te rapprocher de son visage.
Mets ta main dans le dos de {opp}, sous son haut, jusqu'à ce qu'{elle|il:opp} boive une gorgée.
Fais un bisou à {opp} là où {elle|il:opp} a un grain de beauté, s'il est au-dessus de la ceinture.
Embrasse {opp} dans le cou pendant 5 secondes, puis {elle|il:opp} te rend la pareille.
Twerke {assise|assis} sur les genoux de {opp} pendant 15 secondes.
Twerke devant {opp}, ses mains posées sur tes hanches, pendant 15 secondes.
Twerke à quatre pattes sur le canapé pendant 10 secondes, face à {opp}.
Embrasse {opp} langoureusement pendant 15 secondes, avec la langue, ou prends 3 gages.
Embrasse {opp} sans t'arrêter pendant 30 secondes, le groupe compte à voix haute.
Glisse ta main dans {le soutien-gorge|le caleçon:opp} de {opp} pendant 5 secondes, ou prends 3 gages.
Glisse ta main dans le pantalon de {opp}, par-dessus ses sous-vêtements, pendant 10 secondes.
Laisse {opp} glisser sa main dans ton pantalon pendant 10 secondes, ou prends 3 gages.
Va dans la pièce d'à côté avec {opp} pendant 1 minute. Faites ce que vous voulez, personne ne pose de questions.
Va dans la salle de bain avec {opp} pendant 2 minutes. Ce qui s'y passe reste dans la salle de bain.
Enferme-toi 3 minutes dans une pièce avec la personne de ton choix. Vous revenez avec un vêtement en moins chacun.
Glissez-vous sous une couverture, {opp} et toi, pendant 1 minute. Le groupe se retourne.
Montre à une personne de ton choix une photo de ton dossier « My Eyes Only » sur Snapchat, ou prends 3 gages.
Ouvre ton album de photos masquées et montre à {opp} la photo de ton choix, ou prends 3 gages.
Montre à {opp} la dernière photo coquine que tu as envoyée, ou prends 3 gages.
Montre à {opp} le dernier selfie que tu n'as envoyé qu'à une seule personne.
Lis à voix haute le dernier message coquin que tu as reçu, sans dire de qui il vient, ou prends 3 gages.
Ouvre ta navigation privée et montre à {opp} le dernier onglet ouvert, ou prends 3 gages.
Envoie à {opp} un vocal coquin de 10 secondes, qu'{elle|il:opp} écoute à voix haute devant tout le monde.
Mets une claque sur la fesse gauche de {opp}.
Mets une fessée à {opp}. Le groupe choisit la force : douce, moyenne ou bien sentie.
Laisse {opp} te mettre une fessée, aussi forte qu'{elle|il:opp} le veut.
Mets-toi à quatre pattes et laisse {opp} te donner deux fessées.
Laisse {opp} te donner trois fessées : une sur chaque fesse et la dernière où {elle|il:opp} veut.
Choisis une personne du groupe : elle te met une fessée devant tout le monde.
{Retire ton soutien-gorge sans enlever ton haut, puis fais-le tourner au-dessus de ta tête|Retire ton haut et fais-le tourner au-dessus de ta tête comme un chippendale}.
Enlève {ta culotte|ton caleçon} dans la pièce d'à côté et glisse-{la|le} dans la poche de {opp}.
Joue la suite de la partie sans {ton soutien-gorge|ton caleçon}, enlevé discrètement dans la pièce d'à côté.
Retire un sous-vêtement à {opp} sans lui enlever ses vêtements. Tu as 1 minute.
Dégrafe {le soutien-gorge|la ceinture:opp} de {opp} d'une seule main. Tu as 10 secondes.
Déshabille {opp} jusqu'aux sous-vêtements, ou prends 3 gages.
Laisse {opp} te déshabiller jusqu'aux sous-vêtements, ou prends 3 gages.
Enlève le haut de {opp} avec les dents, ou prends 3 gages.
Ouvre la braguette de {opp} avec les dents, ou prends 3 gages.
Tu as 30 secondes pour enlever un maximum de vêtements à {opp}.
{opp} a 30 secondes pour t'enlever un maximum de vêtements.
Ferme les yeux pendant que {opp} t'enlève un vêtement de son choix, sous-vêtements compris.
Enlève ton pantalon et assieds-toi sur les genoux de {opp} jusqu'à ton prochain tour.
Enlève ton pantalon et garde-le enlevé jusqu'à ton prochain tour, ou prends 3 gages.
Retire ton pantalon en dansant, les yeux dans les yeux avec {opp}.
Fais un strip-tease jusqu'aux sous-vêtements devant {opp}, {assise|assis:opp} sur une chaise.
Relève ton haut devant {opp} pendant 3 secondes{, soutien-gorge compris si tu oses|}.
Baisse ton pantalon et montre tes fesses au groupe pendant 3 secondes.
Fais un câlin à {opp}, tous les deux en sous-vêtements, pendant 10 secondes, ou prends 3 gages.
Fais un slow avec {opp} en sous-vêtements, ou prends 3 gages.
Joue trois manches de pierre, feuille, ciseaux contre {opp} : à chaque manche, le perdant enlève un vêtement.
Joue à pierre, feuille, ciseaux contre {opp} : le perdant embrasse le gagnant où celui-ci le veut.
Touche {la poitrine|le torse:opp} de {opp} pendant 10 secondes, par-dessus le vêtement.
Laisse {opp} te toucher {la poitrine|le torse} pendant 10 secondes.
Embrasse {la poitrine|le torse:opp} de {opp}, sous son haut, pendant 5 secondes, ou prends 3 gages.
Mordille le téton de {opp} par-dessus son haut.
Pose ta main sur l'entrejambe de {opp}, par-dessus le pantalon, pendant 5 secondes, ou prends 3 gages.
Laisse {opp} poser sa main sur ton entrejambe, par-dessus le pantalon, pendant 5 secondes.
Passe ta main entre les cuisses de {opp}, par-dessus le vêtement, pendant 5 secondes.
Empoigne les fesses de {opp} pendant 10 secondes.
Laisse {opp} t'empoigner les fesses pendant 10 secondes.
Pose tes deux mains sur les fesses de {opp} et garde-les jusqu'à ce qu'{elle|il:opp} dise stop.
Caresse les fesses de {opp} sous son pantalon pendant 5 secondes, ou prends 3 gages.
Embrasse {opp} en lui caressant les fesses.
Glisse ta main sous le haut de {opp} et caresse son ventre pendant 10 secondes.
Mets la main de {opp} sur ta poitrine et laisse-la 10 secondes.
Prends la main de {opp} et pose-la où tu veux, sans limite, pendant 5 secondes.
Prends la main de {opp} et fais-la glisser lentement de ton cou jusqu'à ta ceinture.
Pendant 1 minute, {opp} peut te toucher où {elle|il:opp} veut, par-dessus les vêtements.
Pendant 1 minute, tu peux toucher {opp} où tu veux, par-dessus les vêtements.
Garde ta main dans la poche avant du pantalon de {opp} pendant 1 minute.
Mets ta main dans la poche arrière de {opp} et laisse-la jusqu'à ton prochain tour.
Lèche le cou de {opp}, de l'épaule jusqu'à l'oreille.
Lèche le nombril de {opp}.
Lèche la lèvre inférieure de {opp}.
Passe ta langue sur les lèvres de {opp}, sans l'embrasser.
Suce le doigt de {opp} en {la|le:opp} regardant dans les yeux.
Laisse {opp} te sucer le doigt pendant 5 secondes.
Étale un peu de chocolat sur le ventre de {opp} et lèche-le.
Lèche une goutte de chantilly posée sur le ventre de {opp}, juste au-dessus de la ceinture.
Bois un shot posé dans le creux des reins de {opp}, sans les mains.
Fais une tequila version body shot : sel sur le cou de {opp}, un shot, puis le citron dans sa bouche.
Partage une gorgée de ta boisson avec {opp} en l'embrassant.
Mets un glaçon dans ta bouche et fais-le glisser le long de la colonne de {opp}, sous son haut.
Laisse {opp} glisser un glaçon dans ton pantalon.
Cache un bonbon sur toi : {opp} a 20 secondes pour le trouver avec la bouche.
Cache un glaçon sur toi : {opp} a 20 secondes pour le trouver avec les mains.
Mordille la fesse de {opp} par-dessus son pantalon.
Fais un bisou sur les fesses de {opp}, pantalon baissé, ou prends 3 gages.
Fais un suçon à {opp} à l'intérieur de la cuisse.
Laisse {opp} te faire un suçon où {elle|il:opp} veut, sans limite.
Mords doucement {opp} là où tu veux.
Laisse {opp} te mordre là où {elle|il:opp} veut.
Embrasse {opp} où tu veux, même en dessous de la ceinture, par-dessus le vêtement.
Ferme les yeux et laisse {opp} t'embrasser où {elle|il:opp} veut, sans limite de ceinture, pendant 10 secondes.
Embrasse {opp} à l'endroit que le groupe choisit, même en dessous de la ceinture, par-dessus le vêtement.
Fais un bisou à {opp} sur chaque partie du corps que le groupe cite, pendant 20 secondes.
Embrasse {opp} en descendant du cou jusqu'au nombril, son haut relevé.
Allonge {opp} sur le canapé et embrasse son ventre en descendant jusqu'à la ceinture.
Fais un bisou dans le bas du dos de {opp}, juste au-dessus des fesses, son haut relevé.
Enlève ton haut et laisse {opp} t'embrasser le torse pendant 10 secondes.
Relève ton haut et laisse {opp} dessiner un cœur au rouge à lèvres sur ton ventre.
Embrasse {opp} en {la|le:opp} plaquant doucement contre un mur, pendant 10 secondes.
Embrasse {opp} en lui tenant les poignets au-dessus de la tête, contre le mur.
Assieds {opp} sur la table, place-toi entre ses jambes et embrasse-{la|le:opp} pendant 10 secondes.
Fais asseoir {opp} sur tes genoux, face à toi, et embrassez-vous jusqu'à ce que le groupe dise stop.
Embrasse {opp}, {allongée|allongé} sur {elle|lui:opp}, pendant 15 secondes.
Laisse {opp} s'allonger sur toi et t'embrasser pendant 15 secondes.
Embrasse {opp} pendant qu'{elle|il:opp} garde un glaçon dans la bouche.
Embrasse {opp} le plus longtemps possible. Une personne de ton choix vous chronomètre.
Murmure à {opp} le mot le plus cru que tu connais, puis embrasse-{la|le:opp}.
Dis à voix haute trois choses que tu aimerais faire à {opp} au lit.
Fais gémir {opp} en moins de 30 secondes, sans enlever aucun vêtement.
Gémis le prénom de {opp} de la façon la plus crédible possible.
Assieds-toi sur les genoux de {opp} et ondule du bassin pendant 20 secondes.
Frotte-toi contre {opp} comme en boîte de nuit, sur la chanson choisie par le groupe.
Danse {collée serrée|collé serré} avec {opp}, tes mains sur ses fesses, pendant toute une chanson.
Fais une lap dance à {opp} en terminant {assise|assis} à califourchon sur {elle|lui:opp}.
Mime la levrette avec {opp}, habillés, pendant 10 secondes.
Mime un 69 avec {opp}, habillés, pendant 5 secondes, ou prends 3 gages.
Mets-toi en missionnaire avec {opp}, habillés, et ne bougez plus pendant 15 secondes.
Simule avec {opp} un réveil coquin du dimanche matin sous une couverture, pendant 20 secondes.
Fais allonger {opp} sur le ventre, assieds-toi sur ses fesses et masse-lui le dos sous son haut pendant 30 secondes.
Masse les fesses de {opp} pendant 20 secondes.
Masse l'intérieur des cuisses de {opp} pendant 20 secondes.
Laisse {opp} te masser l'intérieur des cuisses pendant 20 secondes.
Bande les yeux de {opp} et embrasse-{la|le:opp} à trois endroits de ton choix.
Les yeux bandés, laisse {opp} te toucher à trois endroits. Devine avec quoi : ses lèvres, sa langue ou ses doigts.
Attache les poignets de {opp} avec une écharpe et embrasse-{la|le:opp} comme tu veux pendant 20 secondes.
Laisse {opp} t'attacher les mains dans le dos jusqu'à ton prochain tour.
Fais un bisou sur la bouche à chaque personne du groupe qui l'accepte, ou prends 3 gages.
Fais un baiser à trois avec {opp} et une troisième personne de ton choix.
Choisis deux personnes : elles s'embrassent langoureusement pendant 10 secondes, ou prennent chacune 2 gages.
Choisis deux personnes qui passent 2 minutes ensemble dans la pièce d'à côté.
Le groupe choisit une partie de ton corps : {opp} doit l'embrasser.
`)
 }
};
