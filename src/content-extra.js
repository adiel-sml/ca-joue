/* Quatrième vague de contenu : chaque jeu de cartes atteint au moins 250 cartes par section */
const L = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);
const P = s => L(s).map(l => l.split("|").map(x => x.trim()));

/* Tu préfères : "choix A | choix B". Épicé = séduction, +18 = sexualité. */
export const WYR_EXTRA = {
 normal: P(`
Savoir cuisiner tous les plats du monde | Savoir jouer de tous les instruments
Ne plus jamais manger de pain | Ne plus jamais manger de pâtes
Vivre sans frigo | Vivre sans machine à laver
Avoir un rire de cochon | Avoir un éternuement de canard
Toujours avoir les mains froides | Toujours avoir les pieds mouillés
Ne plus jamais pouvoir mentir | Ne plus jamais pouvoir garder un secret
Être coincé dans un embouteillage tous les matins | Prendre un train bondé tous les matins
Avoir une piscine | Avoir un cinéma à la maison
Pouvoir respirer sous l'eau | Pouvoir voir dans le noir
Être le meilleur joueur d'une équipe nulle | Être le pire joueur d'une équipe championne
Revoir un ancien ami perdu de vue | Te faire un nouvel ami extraordinaire
Vivre dans une maison minuscule au centre-ville | Vivre dans une immense maison au milieu de nulle part
Ne plus jamais voir la neige | Ne plus jamais voir la mer
Avoir des cheveux qui poussent d'un mètre par jour | Ne plus jamais avoir de cheveux
Changer de prénom | Changer de nom de famille
Pouvoir mettre la vie sur pause | Pouvoir rembobiner de dix secondes
Avoir un majordome | Avoir un coach personnel
Ne manger que froid | Ne manger que chaud
Passer un an sans voyager | Passer un an sans regarder de séries
Vivre dans un igloo | Vivre dans une hutte sur la plage
Avoir un chat qui parle | Avoir un chien qui chante
Toujours avoir un caillou dans ta chaussure | Toujours avoir une étiquette qui gratte
Perdre ton téléphone | Perdre ton portefeuille
Ne plus jamais pouvoir écouter ta chanson préférée | L'entendre en boucle partout où tu vas
Faire un saut en parachute | Faire de la plongée avec des requins
Être le personnage principal d'un film d'action | Être le personnage principal d'une comédie
Avoir une mémoire d'éléphant | Avoir une vue d'aigle
Savoir danser tous les styles | Savoir chanter juste à tous les coups
Pouvoir parler aux plantes | Pouvoir parler aux machines
Avoir un jour de plus par semaine | Une heure de sommeil en plus chaque nuit
Vivre dans un appartement avec vue sur la tour Eiffel | Vivre dans une villa avec vue sur la mer
Passer tes vacances en camping | Passer tes vacances dans un hôtel de luxe sans sortir de ta chambre
Être un chat | Être un chien
Recevoir 100 € tout de suite | Recevoir 1 000 € dans un an
Avoir toujours raison | Être toujours de bonne humeur
Te réveiller tous les jours à 5 h | Te coucher tous les jours à 21 h
Avoir des yeux de couleurs différentes | Avoir une mèche blanche
Ne plus jamais avoir de courbatures | Ne plus jamais avoir de coups de soleil
Devoir crier tout ce que tu dis | Devoir chuchoter tout ce que tu dis
Être bloqué une nuit dans un musée | Être bloqué une nuit dans un supermarché
Ne jamais plus manger de glace | Ne jamais plus manger de chocolat chaud
Que ta vie soit filmée en permanence | Ne plus jamais pouvoir faire de photo
Un voyage dans l'espace | Un voyage au fond des océans
Rencontrer tes arrière-petits-enfants | Rencontrer tes arrière-grands-parents jeunes
Avoir un tatouage choisi par tes amis | Une coupe de cheveux choisie par tes parents
Savoir piloter un avion | Savoir piloter un bateau
Toujours avoir faim | Toujours avoir sommeil
Avoir dix frères et sœurs | Être enfant unique
Faire du karaoké devant 1 000 personnes | Faire un discours devant 1 000 personnes
Vivre dans un monde sans couleurs | Vivre dans un monde sans musique
Ne plus jamais pouvoir utiliser de miroir | Ne plus jamais pouvoir utiliser de peigne
Avoir des ailes | Avoir une queue
Revivre la même journée parfaite pour toujours | Vivre chaque jour une journée imprévisible
Gagner tous les quiz | Gagner tous les concours de danse
Ne plus jamais avoir de rhume | Ne plus jamais avoir de mal de tête
Avoir un robot qui fait le ménage | Avoir un robot qui fait la cuisine
Vivre au Moyen Âge | Vivre à l'époque des dinosaures
Pouvoir parler à ton toi d'il y a dix ans | Pouvoir parler à ton toi dans dix ans
Que tous tes rêves deviennent réalité | Que tous tes cauchemars disparaissent
Te faire piquer par une méduse | Te faire piquer par une guêpe
Gagner un voyage autour du monde | Gagner une voiture neuve
Avoir le hoquet pendant une semaine | Une chanson nulle dans la tête pendant un mois
Ne boire que de l'eau | Ne boire que du soda tiède
Être un super-héros sans costume | Avoir le costume sans les pouvoirs
Que les animaux te comprennent | Comprendre les bébés
Travailler 4 jours de 10 heures | Travailler 5 jours de 8 heures
Habiter au dernier étage sans ascenseur | Habiter au rez-de-chaussée sur une rue bruyante
Être capable de dormir n'importe où | Être capable de manger n'importe quoi
Ne plus jamais avoir de réseau | Ne plus jamais avoir de batterie au-dessus de 10 %
Partir en vacances avec tes parents | Partir en vacances avec ton patron
Une soirée pyjama | Une soirée en boîte
Ne regarder que des films d'horreur | Ne regarder que des comédies romantiques
Avoir le même âge pour toujours | Vieillir deux fois plus vite mais être riche
Visiter tous les pays du monde | Connaître parfaitement ta propre ville
Être riche en hiver seulement | Être riche en été seulement
Ne plus pouvoir utiliser tes pouces | Ne plus pouvoir plier les genoux
Avoir un bouton sur le front | Un bouton sur le menton
Que ton téléphone lise tes messages à voix haute en public | Que ton ordinateur affiche tes recherches en grand
Vivre dans Harry Potter | Vivre dans Star Wars
Ne plus jamais manger au restaurant | Ne plus jamais cuisiner
Avoir une voix de dessin animé | Une voix de film d'horreur
Pouvoir arrêter le temps | Pouvoir accélérer le temps
Sauter d'un plongeoir de 10 mètres | Faire une descente en luge de nuit
Recevoir une lettre de toi-même dans 20 ans | Envoyer une lettre à toi-même enfant
Être une star de la chanson | Une star de cinéma
Que ton plat préféré n'ait plus aucun goût | Que ton plat préféré ait toujours un goût de brocoli
Te perdre en forêt | Te perdre dans une grande ville étrangère
Être le meilleur au monde dans un sport inconnu | Être moyen dans un sport célèbre
Avoir des chaussettes toujours mouillées | Des chaussures toujours trop petites
Que tes amis organisent ton mariage | Que ta famille organise ton enterrement de vie de célibataire
Manger un insecte | Manger un plat très épicé
Vivre sans vacances mais avec un travail génial | Avoir six mois de vacances avec un travail ennuyeux
Avoir le pouvoir de guérir | Le pouvoir de voler
Toujours dire la vérité | Toujours être cru
Parler toutes les langues avec un accent ridicule | Ne parler que ta langue parfaitement
Avoir un sosie | Avoir un jumeau ou une jumelle
Être réveillé par un coq | Être réveillé par une alarme incendie
Un an sans sucre | Un an sans sel
Faire le ménage chez tout le monde ici | Faire la vaisselle de tout le monde pendant un mois
Être le premier humain sur Mars | Le dernier humain sur Terre
Devoir faire une sieste obligatoire chaque jour | Ne jamais pouvoir faire de sieste
Vivre au bord d'un lac | Vivre au pied d'un volcan endormi
Savoir tout sur le passé | Savoir un peu sur l'avenir
Ne plus jamais avoir de devoirs ni de travail à rapporter | Ne plus jamais avoir de réunions
Avoir un super odorat | Une super ouïe
Pouvoir changer de couleur de cheveux d'une pensée | Pouvoir changer de couleur d'yeux d'une pensée
Que chaque porte que tu ouvres grince | Que chaque chaise sur laquelle tu t'assois fasse un bruit bizarre
Avoir le visage d'un célèbre acteur | Avoir le talent d'un célèbre acteur
Te réveiller en ayant tout oublié de la veille | Te souvenir de tout pour toujours
Être pris en photo à chaque fois que tu clignes des yeux | Être pris en photo à chaque fois que tu bâilles
Avoir un ami imaginaire visible par tous | Être invisible pour les animaux
Partir en road trip en van | Partir en train à travers l'Europe
Ne manger que des plats de ta grand-mère | Ne manger que des plats de grands chefs
Ne plus jamais voir de film | Ne plus jamais lire de livre
Avoir un pouce vert | Avoir des mains en or pour bricoler
Gagner tous les jeux de société | Gagner tous les débats
Avoir la plus belle voiture | La plus belle maison
Faire une heure de sport par jour | Ne plus jamais faire de sport mais avoir mal partout
Pouvoir entendre les pensées des animaux | Pouvoir entendre les pensées des bébés
Avoir trop chaud dans ton lit | Avoir trop froid dans ton lit
Être bloqué sur une île avec ton pire ennemi | Être bloqué seul sur une île pendant un an
Une glace à la vanille pour toujours | Toutes les glaces du monde, mais une fois par an
Avoir un nez qui siffle | Des genoux qui craquent
Être connu de tout le monde dans ta ville | Être inconnu partout mais avoir un ami célèbre
Avoir une pizza gratuite par semaine | Un cinéma gratuit par semaine
Que tout le monde chante quand il parle | Que tout le monde danse quand il marche
Faire le tour de France à vélo | Le tour de France à pied
Être un génie des maths | Un génie des mots
Ne plus jamais avoir de clés à chercher | Ne plus jamais avoir de chaussettes dépareillées
Passer Noël au soleil | Passer Noël sous la neige
Avoir une cabane dans les arbres | Une cabane sous la mer
Voir ton film préféré pour la première fois | Lire ton livre préféré pour la première fois
Avoir une tortue géante | Avoir un perroquet qui dit des gros mots
Être le meilleur ami d'un dragon | Le meilleur ami d'une licorne
Avoir toujours une batterie pleine | Toujours une connexion parfaite
Rencontrer un extraterrestre | Rencontrer un fantôme
Que ta maison soit en chocolat | Que ta maison soit en Lego
Tout savoir sur l'univers | Tout savoir sur toi-même
Parler à l'envers | Écrire à l'envers
Ne plus jamais pouvoir dire non | Ne plus jamais pouvoir dire oui
Te lever du pied gauche pour toujours | Te cogner le petit orteil une fois par semaine
Revivre tes 15 ans | Avoir directement 50 ans
Être l'organisateur de toutes les fêtes | Être l'invité de toutes les fêtes
Avoir une voix sublime | Un physique sublime
Être un pirate | Être un cowboy
Passer un an au pôle Nord | Passer un an dans le désert
Ne jamais plus avoir de chagrin | Ne jamais plus avoir de colère
Pouvoir faire apparaître n'importe quel plat | Pouvoir faire apparaître n'importe quel vêtement
Dormir dans un hamac pour toujours | Dormir dans un lit superposé pour toujours
Devenir minuscule pendant une journée | Devenir géant pendant une journée
Vivre dans la série que tu regardes en ce moment | Vivre dans le dernier jeu vidéo auquel tu as joué
Que ton prochain voyage soit tiré au sort | Le planifier pendant un an
Toujours avoir du persil coincé entre les dents | Toujours avoir une tache sur ton haut
Être un chef étoilé | Être un pâtissier de génie
Une maison sans wifi au paradis | Une maison avec wifi dans une zone industrielle
Faire une fête chaque semaine | Partir en voyage chaque mois
Être le plus vieux de la soirée | Être le plus jeune de la soirée
Avoir un rire très bruyant | Un rire totalement silencieux
Faire le tour du monde avec ta famille | Faire le tour du monde avec tes amis
Ne plus jamais t'ennuyer | Ne plus jamais être fatigué
Gagner un concours de danse | Un concours de chant
Aller à l'école des sorciers | Aller à l'école des super-héros
Un week-end à Disneyland | Un week-end au ski
Savoir faire tous les tours de magie | Savoir lire dans les cartes
Que la musique te suive partout | Que le silence te suive partout
Toujours avoir une bonne place de parking | Ne jamais faire la queue
Être un excellent menteur | Un excellent détecteur de mensonges
Ne jamais plus avoir besoin de dormir | Ne jamais plus avoir besoin de manger
Faire la grasse matinée tous les jours | Avoir des soirées interminables tous les jours
Vivre dans une ville où il pleut tout le temps | Vivre dans une ville où il fait 40 °C tout le temps
Perdre tous tes contacts de téléphone | Perdre toutes tes photos
Avoir des jambes très longues | Des bras très longs
Être expert en survie | Être expert en premiers secours
Habiter dans un bateau | Habiter dans une caravane
Ne plus pouvoir manger avec des couverts | Ne plus pouvoir boire dans un verre
Avoir une super mémoire des prénoms | Une super mémoire des visages
Faire du stop pour traverser l'Europe | Traverser l'Europe à vélo
Le sucré à tous les repas | Le fromage à tous les repas
Que ton anniversaire dure une semaine | Avoir deux anniversaires par an
Que ton patron soit ton meilleur ami | Que ton meilleur ami soit ton patron
Vivre dans un château sans chauffage | Vivre dans un studio très bien chauffé
Te faire coiffer par un enfant de 5 ans | Te faire maquiller par un enfant de 5 ans
Être capable de tout réparer | Être capable de tout construire
Que ta vie soit une comédie musicale | Que ta vie soit un documentaire animalier
Retrouver un objet perdu de ton enfance | Retrouver un ami perdu de vue
Faire tes courses en pyjama toute ta vie | Aller au travail en costume de mascotte une fois par an
Pouvoir goûter les couleurs | Pouvoir entendre les odeurs
Avoir un compte en banque illimité pendant 24 heures | Recevoir 100 000 € tout de suite
`),
 hot: P(`
Un premier bisou au cinéma | Un premier bisou sur une grande roue
Un partenaire qui écrit des poèmes | Un partenaire qui cuisine comme un chef
Recevoir des fleurs chaque semaine | Recevoir une lettre d'amour chaque mois
Un rendez-vous surprise organisé par ton crush | Organiser toi-même le rendez-vous parfait
Que ton crush te surprenne en train de chanter faux | Que ton crush te surprenne en train de parler seul devant le miroir
Embrasser quelqu'un qui sent la cigarette | Embrasser quelqu'un qui vient de manger de l'ail
Un coup de foudre qui dure une semaine | Une histoire tiède qui dure dix ans
Un partenaire qui te fait rire tous les jours | Un partenaire qui te fait rêver tous les jours
Une déclaration sur écran géant au stade | Une déclaration chuchotée sous la couette
Que ton crush lise ta conversation avec ton meilleur ami | Que ton crush lise ton historique de recherches
Un premier rendez-vous au restaurant | Un premier rendez-vous en balade de nuit
Sortir avec quelqu'un de très jaloux | Sortir avec quelqu'un qui flirte avec tout le monde
Un slow avec ton crush devant toute l'école | Aucun slow de ta vie
Embrasser ton crush devant ton ex | Embrasser ton ex devant ton crush
Un partenaire célèbre mais jamais disponible | Un partenaire inconnu toujours présent
Que tes amis choisissent ton prochain rendez-vous | Que tes parents le choisissent
Recevoir un bisou volé | Voler un bisou
Être en couple avec ton meilleur ami | Ne plus jamais lui parler
Un rendez-vous en tête-à-tête qui dure toute la nuit | Un rendez-vous parfait de 20 minutes
Un partenaire qui te couvre de compliments | Un partenaire qui te couvre de cadeaux
Que ton crush tombe sur tes photos de collège | Que ton crush tombe sur tes messages vocaux à ton ex
Une histoire d'amour d'été intense | Une longue histoire d'amitié amoureuse
Flirter avec un inconnu dans le train | Flirter avec ton voisin de palier
Te marier avec ton premier amour | Te marier avec quelqu'un que tu n'as pas encore rencontré
Un partenaire qui danse comme un dieu | Un partenaire qui chante comme un ange
Sortir avec quelqu'un qui a le même prénom que toi | Sortir avec quelqu'un qui porte le prénom de ton ex
Ton crush te demande de l'aider à draguer quelqu'un d'autre | Ton ex te demande des conseils pour reconquérir quelqu'un
Un premier bisou sous le gui | Un premier bisou sous un feu d'artifice
Un bisou au ralenti comme au cinéma | Un bisou fougueux et maladroit
Écrire une lettre d'amour à la main | Enregistrer une chanson d'amour
Que ton partenaire soit très tactile en public | Que ton partenaire soit très pudique en public
Un compliment sur tes yeux | Un compliment sur ton sourire
Un partenaire grand et timide | Un partenaire petit et très sûr de lui
Te faire draguer par ton crush de lycée aujourd'hui | Te faire draguer par ta célébrité préférée
Avoir une histoire avec un voisin | Avoir une histoire avec un collègue
Que ton crush te voie sans maquillage ou mal rasé | Que ton crush te voie avec ta pire tenue de sport
Que ton partenaire t'appelle par un surnom ridicule | Que ton partenaire ne t'appelle que par ton nom de famille
Un baiser de cinéma sous la pluie | Un baiser tranquille au coin du feu
Un partenaire qui oublie toutes les dates importantes | Un partenaire qui organise tout à l'avance
Faire une déclaration en chanson devant tes amis | Faire une déclaration en vidéo publiée sur internet
Te faire draguer par quelqu'un de beaucoup plus jeune | Te faire draguer par quelqu'un de beaucoup plus âgé
Un week-end en amoureux à la montagne | Un week-end en amoureux au bord de la mer
Recevoir un message de ton crush à 3 h du matin | Ne jamais recevoir de message de ton crush
Une histoire secrète avec quelqu'un ici | Une histoire officielle avec un inconnu
Être en couple avec quelqu'un qui a toujours les pieds glacés | Être en couple avec quelqu'un qui prend toute la couette
Que ton premier bisou soit filmé | Ne jamais te souvenir de ton premier bisou
Un rendez-vous au musée | Un rendez-vous dans une fête foraine
Un crush qui te répond toujours en une minute | Un crush qui te répond en trois jours avec un long message
Draguer avec ta voix | Draguer avec ton regard
Un partenaire qui adore ta famille | Un partenaire que tes amis adorent
Un dîner aux chandelles | Un pique-nique au coucher du soleil
Que ton crush voie ta chambre en désordre | Que ton crush voie ton frigo vide
Un mariage en petit comité | Un mariage avec 300 invités
Un amour à distance avec quelqu'un de parfait | Un amour tout près avec quelqu'un d'ordinaire
Être la personne qui aime le plus | Être la personne la plus aimée
Un ex qui veut revenir | Un crush qui ne te voit pas
Un partenaire très drôle mais jamais sérieux | Un partenaire très sérieux mais jamais drôle
Te faire offrir un bijou | Te faire offrir un voyage
Draguer en boîte de nuit | Draguer à la bibliothèque
Que ton crush ait un rire ridicule | Que ton crush ait une haleine du matin terrible
Un bisou dans le cou par surprise | Un bisou sur la main en guise de bonjour
Que ton crush te prenne la main en premier | Prendre sa main en premier
Une histoire d'amour digne d'un film | Une histoire d'amour digne d'une chanson
Une relation où l'on se dit tout | Une relation avec un peu de mystère
Sortir avec quelqu'un qui adore les animaux | Sortir avec quelqu'un qui adore les voyages
Avoir un crush sur ton prof de danse | Avoir un crush sur ton médecin
Un rendez-vous où tu paies tout | Un rendez-vous où tu ne paies rien mais où tu ne choisis rien
Te faire draguer en italien | Te faire draguer en espagnol
Un partenaire qui envoie des messages toute la journée | Un partenaire qui appelle une fois par jour
Ton ex à ton mariage | Ton crush de collège à ton mariage
Un premier rendez-vous en double avec des amis | Un premier rendez-vous en tête-à-tête
Embrasser quelqu'un qui embrasse très mal | Ne plus embrasser personne pendant un an
Danser un slow avec ton ex | Danser un slow avec le parent de ton crush
Un partenaire qui a dix ex | Un partenaire qui n'a jamais eu de relation
Que ton crush lise tes journaux intimes d'ado | Que ton crush écoute tes chansons préférées d'ado
Une demande en mariage en public | Une demande en mariage en privé
Recevoir une sérénade sous ta fenêtre | Recevoir un énorme bouquet au travail
Te faire draguer par un serveur | Te faire draguer par un chauffeur de taxi
Un partenaire qui fait toujours la cuisine | Un partenaire qui fait toujours le ménage
Un premier rendez-vous qui finit par un bisou | Un premier rendez-vous qui finit par un fou rire
Que ton ex craque à nouveau pour toi | Que ton crush te remarque enfin
Une semaine de rêve avec ton crush puis plus rien | Une amitié pour toujours sans rien d'autre
Avoir les mains moites au premier rendez-vous | Avoir le hoquet au premier rendez-vous
Que ton crush ait le même humour que toi | Que ton crush ait les mêmes goûts musicaux
Te déclarer par message | Te déclarer en face
Une relation passionnée avec des disputes | Une relation calme sans étincelles
Sortir avec un acteur célèbre | Sortir avec un sportif célèbre
Que ton partenaire soit toujours en retard | Que ton partenaire soit toujours en avance et te le reproche
Partager ton dessert | Garder ton dessert pour toi au premier rendez-vous
Une soirée Netflix et câlins | Une soirée danse et cocktails en amoureux
Que ton crush te voie tomber dans l'escalier | Que ton crush te voie te tromper de prénom en le saluant
Un bisou sur le front | Un bisou sur le nez
Une rencontre sur une appli | Une rencontre par des amis
Un partenaire qui a peur du noir | Un partenaire qui a peur des araignées
Un rendez-vous en bateau | Un rendez-vous en montgolfière
Que ton crush t'invite au mariage de sa sœur | Que ton crush t'invite à un dîner avec ses collègues
Un partenaire qui parle beaucoup | Un partenaire qui écoute beaucoup
Revivre ton premier bisou | Revivre ton premier rendez-vous
Te faire larguer par lettre | Te faire larguer par un ami commun
Embrasser ton crush devant tes parents | Ne jamais l'embrasser
Une fête d'anniversaire organisée par ton crush | Un voyage surprise organisé par ton ex
Une histoire d'amour au travail | Une histoire d'amour en vacances
Que ton partenaire te connaisse par cœur | Que ton partenaire te surprenne tous les jours
Un partenaire très beau qui ne rit jamais | Un partenaire banal qui rit de tout
Dire « je t'aime » dans une autre langue | Le dire en chantant
Que tes amis votent pour choisir ton partenaire | Choisir toi-même sans jamais pouvoir changer d'avis
Un rendez-vous où vous vous perdez en ville | Un rendez-vous où la pluie vous surprend
Te faire draguer par un ami de tes parents | Te faire draguer par l'ex de ton meilleur ami
Que ton partenaire sache tout faire de ses mains | Que ton partenaire sache tout dire avec les mots
Un premier rendez-vous en pyjama | Un premier rendez-vous en tenue de soirée
Que l'on craque pour ta voix | Que l'on craque pour ton physique
Que ton crush t'entende ronfler | Que ton crush t'entende chanter sous la douche
Garder tous tes ex comme amis | Ne plus jamais revoir aucun ex
Un baiser à l'aéroport avant un départ | Un baiser à l'aéroport à un retour
Un partenaire qui adore les jeux vidéo | Un partenaire qui adore le shopping
Que ton crush découvre ton surnom d'enfance | Que ton crush découvre ta playlist secrète
Un slow sur une chanson ringarde | Un rock endiablé
Être en couple avec une star des réseaux sociaux | Être en couple avec quelqu'un qui n'a aucun réseau social
Recevoir un compliment de ton crush | Recevoir un compliment d'une star
Un premier bisou dans un ascenseur | Un premier bisou sur un quai de gare
Sortir avec quelqu'un qui te ressemble | Sortir avec ton opposé
Que ton partenaire écrive ton prénom dans le sable | Que ton partenaire le tatoue sur son bras
Une déclaration ratée mais sincère | Une déclaration parfaite mais apprise par cœur
Un partenaire qui adore danser | Un partenaire qui refuse de danser
Que ton ex te rappelle à chaque anniversaire | Que ton ex t'oublie pour toujours
Un week-end à Paris | Un week-end à Venise
Tomber sous le charme d'une voix au téléphone | Tomber sous le charme d'une écriture dans une lettre
Un câlin de 10 minutes | Un bisou de 10 secondes
Qu'un inconnu t'offre un verre | Offrir un verre à un inconnu
Un premier rendez-vous qui dure 12 heures | Trois rendez-vous d'une heure
Que ton partenaire te fasse une scène de jalousie | Que ton partenaire ne soit jamais jaloux
Que ton crush ait un accent irrésistible | Que ton crush ait un regard irrésistible
Rencontrer l'amour dans un avion | Rencontrer l'amour dans une file d'attente
Un partenaire qui adore le sport | Un partenaire qui adore la lecture
Un premier bisou maladroit et drôle | Un premier bisou parfait et silencieux
Une demande en mariage au restaurant | Une demande en mariage en haut d'une montagne
Qu'on te fasse la cour pendant des mois | Qu'on t'embrasse au bout d'une heure
Un partenaire qui chante faux sous la douche | Un partenaire qui danse mal en soirée
Que ton crush voie ton historique de likes | Que ton crush voie tes brouillons de messages
Que ton crush te prête sa veste | Que ton crush te raccompagne chez toi
Avoir une seule histoire d'amour dans ta vie | En avoir dix
Un partenaire très organisé | Un partenaire très spontané
Une soirée romantique gâchée par la pluie | Une soirée romantique gâchée par un fou rire
Un rendez-vous dans un bar karaoké | Un rendez-vous dans un bar à jeux
Un partenaire qui s'habille toujours en noir | Un partenaire qui s'habille toujours en couleurs
Que ton ex devienne ton coloc | Que ton crush devienne ton collègue
Un crush sur un inconnu croisé tous les matins | Un crush sur un ami de longue date
Que ton crush te montre ses photos d'enfance | Que ton crush te présente sa grand-mère
Un bisou pour se dire bonjour | Un bisou pour se dire au revoir
Un amour impossible très romantique | Un amour simple très tranquille
Une déclaration le jour de ton anniversaire | Une déclaration un jour au hasard
Avoir un admirateur secret | Être l'admirateur secret de quelqu'un
Que ton partenaire te dédie un livre | Que ton partenaire te dédie une chanson
Un premier rendez-vous qui finit en dispute | Un premier rendez-vous ennuyeux
Te faire draguer avec une phrase nulle mais drôle | Te faire draguer avec une phrase parfaite mais froide
Être en couple avec un pilote toujours absent | Être en couple avec un chef toujours en cuisine
Que ton crush apprenne tes sentiments par quelqu'un d'autre | Les lui avouer toi-même devant tout le monde
Un partenaire qui adore les surprises | Un partenaire qui déteste les surprises
Partir en vacances avec ton crush et ses parents | Partir en vacances avec ton crush et ton ex
Un rendez-vous où tu dois parler anglais toute la soirée | Un rendez-vous sans parler du tout
Faire un bisou à ton crush devant ses amis | Faire un bisou à ton crush devant tes amis
Un partenaire qui t'écrit des mots doux partout | Un partenaire qui te fait des petits plats
Qu'on t'offre un bouquet de roses | Qu'on t'offre un bouquet de fleurs sauvages
Un amour au premier regard | Un amour qui grandit petit à petit
Que ton crush voie ta dernière story | Que ton crush voie ta photo de profil de 2015
Un premier rendez-vous très chic | Un premier rendez-vous très simple
Être le crush de toute la salle | Être le crush d'une seule personne qui compte
Que ton partenaire fasse toujours le premier pas | Faire toujours le premier pas
Un week-end sans téléphone avec ton crush | Un week-end avec ton crush et ses dix amis
Que ton ex rencontre ton nouveau partenaire | Que ton nouveau partenaire rencontre tous tes ex
Une relation où vous vivez ensemble | Une relation où chacun garde son appartement
Sortir avec quelqu'un qui a un tatouage de son ex | Sortir avec quelqu'un qui garde les photos de son ex
Le premier bisou après trois rendez-vous | Le premier bisou dès la première minute
Un partenaire qui fait de la musique | Un partenaire qui fait de la peinture
Recevoir un poème sur ta beauté | Recevoir un poème sur ton intelligence
Un crush qui t'écrit en majuscules | Un crush qui ne met jamais de ponctuation
Être en couple avec un grand romantique | Être en couple avec un grand aventurier
Un partenaire qui te ressemble physiquement | Un partenaire qui ne te ressemble pas du tout
Que ton crush t'entende parler de ses défauts | Que ton crush lise ce que tu écris à son sujet
Danser un slow avec un inconnu | Danser un slow avec ton patron
Un bisou qui ne finit jamais | Mille petits bisous
Un premier rendez-vous au bowling | Un premier rendez-vous au zoo
Recevoir un bisou dans le cou | Recevoir un bisou sur l'épaule
Que ton crush t'envoie une chanson | Que ton crush t'envoie une photo de son coucher de soleil
Un partenaire qui sent toujours bon | Un partenaire qui a toujours les mains douces
Te faire offrir un parfum | Offrir un parfum
Une histoire d'amour avec ton voisin de train | Une histoire d'amour avec ton voisin de plage
Un slow dans une cuisine à 2 h du matin | Un slow dans une salle de bal
Que ton crush voie tes notes d'amour d'ado | Que ton crush voie ton tout premier profil sur une appli
Un regard qui en dit long | Un mot doux qui en dit long
Un partenaire qui prépare le petit-déjeuner | Un partenaire qui prépare le bain
Un premier bisou devant la tour Eiffel | Un premier bisou au milieu d'un concert
Draguer quelqu'un avec une blague | Draguer quelqu'un avec un compliment
Que ton crush t'invite à danser | Inviter ton crush à danser
Un rendez-vous dans une cabane au fond des bois | Un rendez-vous sur un rooftop en ville
Un partenaire qui adore les câlins | Un partenaire qui adore les longues discussions
Recevoir une déclaration à la radio | Recevoir une déclaration dans un journal
Tomber amoureux en vacances | Tomber amoureux au travail
Une soirée à regarder les étoiles | Une soirée à danser jusqu'au matin
Être en couple avec quelqu'un qui te fait rougir sans arrêt | Être en couple avec quelqu'un qui te fait rire sans arrêt
Que ton partenaire t'offre ses vêtements | Que ton partenaire porte toujours les tiens
Que ton crush ait une voix grave | Que ton crush ait un sourire timide
Un rendez-vous dans une librairie | Un rendez-vous dans un marché de Noël
Un ex qui te dédie une chanson à succès | Un ex qui écrit un livre sur votre histoire
Un premier rendez-vous à vélo | Un premier rendez-vous en trottinette
Que tes amis approuvent ton crush | Que ta famille approuve ton crush
Un amour fou qui fait peur | Un amour doux qui rassure
Te faire embrasser à minuit pile | Te faire embrasser au lever du soleil
Une lettre d'amour cachée dans ton sac | Un mot doux écrit sur le miroir de la salle de bain
Un partenaire qui adore ta cuisine | Un partenaire qui adore tes blagues
Danser un tango avec ton crush | Danser une valse avec ton crush
Un rendez-vous où vous cuisinez ensemble | Un rendez-vous où vous peignez ensemble
Que ton crush te remarque grâce à ta tenue | Que ton crush te remarque grâce à ton humour
Un partenaire qui te tient la porte | Un partenaire qui te tient la main
Un regard complice en soirée | Un message complice en soirée
Un week-end à Rome en amoureux | Un week-end à Lisbonne en amoureux
`),
 x18: P(`
Faire l'amour dans une cabine de bateau | Faire l'amour dans un wagon-lit
Une nuit avec ton crush de lycée | Une nuit avec ta célébrité préférée
Que tes colocs tombent sur tes sextoys | Que tes voisins voient ta lingerie sur le balcon
Un partenaire qui adore les jeux de rôle | Un partenaire qui adore les sextoys
Faire l'amour sur la table de la cuisine | Faire l'amour sur le canapé du salon
Un massage sensuel de 30 minutes | Un quart d'heure torride sans massage
Une nuit dans un hôtel avec miroir au plafond | Une nuit dans un chalet avec cheminée
Que ton partenaire te déshabille lentement | Que ton partenaire arrache tes vêtements
Faire l'amour en pleine forêt | Faire l'amour dans un champ sous les étoiles
Te faire réveiller par des caresses | Te faire endormir par des caresses
Faire l'amour dans un jacuzzi sur un toit | Faire l'amour dans une piscine de nuit
Un strip-tease de ton partenaire | Une lap dance de ton partenaire
Une semaine sans sexe | Une semaine sans chocolat
Recevoir une lettre torride | Recevoir un dessin coquin
Faire l'amour à la lumière d'une seule bougie | Faire l'amour sous une lumière rouge
Un plan à trois avec ton partenaire et un inconnu | Un échange de partenaires avec un couple d'amis
Tester un sextoy en couple | Tester un jeu de rôle en costume
Faire l'amour dans un ascenseur en panne | Faire l'amour dans un vestiaire
Recevoir une photo coquine de ton crush | Recevoir un message vocal coquin de ton crush
Faire l'amour trois fois dans la journée | Une seule fois mais pendant trois heures
Te faire attacher | Attacher ton partenaire
Donner la fessée | Recevoir la fessée
Un partenaire qui adore les miroirs | Un partenaire qui adore les bougies
Faire l'amour avec du miel | Faire l'amour avec de la chantilly
Une nuit avec ton ex le plus doué | Une nuit avec un inconnu très séduisant
Que ton partenaire porte de la lingerie fine | Que ton partenaire porte un uniforme
Faire l'amour dans un sauna | Faire l'amour dans une cabane de ski
Le sexe le matin au réveil | Le sexe en pleine nuit après une soirée
Te faire surprendre par ta belle-famille | Te faire surprendre par ton meilleur ami
Un partenaire qui sait tout faire avec ses mains | Un partenaire qui sait tout faire avec sa bouche
Avouer ton nombre de partenaires à ton partenaire | Avouer ton plus gros fantasme à ton partenaire
Que ton partenaire te filme, pour vous seuls | Filmer ton partenaire, pour vous seuls
Faire l'amour sur une plage déserte | Faire l'amour sur le balcon d'un hôtel
Une heure de baisers | Une heure de massages
Que ton partenaire prenne toujours l'initiative | Prendre toujours l'initiative
Un coup d'un soir dans une ville étrangère | Une histoire torride avec un collègue
Faire l'amour en silence chez tes parents | Faire l'amour bruyamment chez toi
Un bandeau sur les yeux | Un casque avec de la musique sur les oreilles
Un partenaire qui aime les câlins après | Un partenaire qui s'endort aussitôt
Faire un strip-poker avec tes amis | Faire un jeu d'action ou vérité torride avec tes amis
Que ton partenaire soit insatiable | Que ton partenaire soit très doux
Faire l'amour sous la pluie | Faire l'amour sous la neige dans un jacuzzi
Faire l'amour avec ton ex une dernière fois | Ne plus jamais revoir ton ex
Un sextoy télécommandé au restaurant | Un sextoy télécommandé au cinéma
Un appel vidéo coquin | Des messages coquins toute la journée
Que ton crush voie ton historique de vidéos coquines | Que ta mère voie ta commande de sex-shop
Un jeu de rôle patron et employé | Un jeu de rôle d'inconnus qui se rencontrent dans un bar
Faire l'amour dans un train de nuit | Faire l'amour dans un camping-car
Une nuit torride sans lendemain | Une relation stable avec une vie intime moyenne
Coucher avec quelqu'un qui embrasse mal | Coucher avec quelqu'un qui ne fait aucun bruit
Une position acrobatique | Une position confortable
Faire l'amour dans une voiture garée en forêt | Faire l'amour dans une tente en camping
Un massage aux pierres chaudes | Un massage à quatre mains
Un fantasme réalisé une seule fois | Un fantasme à vivre chaque semaine
Faire l'amour devant une cheminée | Faire l'amour sur une terrasse en été
Un partenaire qui connaît le Kamasutra par cœur | Un partenaire qui improvise tout
Un premier rendez-vous qui finit au lit | Un premier rendez-vous qui finit par un simple bisou
Un partenaire très poilu | Un partenaire entièrement épilé
Un plan régulier sans sentiments | Une histoire d'amour sans désir
Faire l'amour en écoutant du rap | Faire l'amour en écoutant du jazz
Une nuit de folie et une gueule de bois | Une nuit sage et un réveil parfait
Faire l'amour dans la salle de bain d'une soirée | Faire l'amour dans la chambre des hôtes d'une soirée
Te faire masser les pieds | Te faire masser le dos
Recevoir un suçon visible | Faire un suçon visible
Une soirée à deux en sous-vêtements | Une soirée à deux en peignoir
Un massage en duo dans un spa | Un bain de minuit à deux
Te réveiller nu à côté d'un inconnu | Te réveiller habillé à côté de ton crush
Un sextoy offert par ton partenaire | Un sextoy choisi ensemble
Faire l'amour dans une suite nuptiale | Faire l'amour dans un motel douteux
Une nuit avec deux personnes | Deux nuits avec la même personne
Faire l'amour avec quelqu'un qui parle une autre langue | Faire l'amour avec quelqu'un qui ne dit pas un mot
Un câlin coquin dans la cuisine en préparant le dîner | Un câlin coquin dans la salle de bain en te préparant
Un body shot sur ton partenaire | Un body shot sur toi
Te faire embrasser partout | Embrasser ton partenaire partout
Que ton partenaire soit jaloux de ton ex | Que ton partenaire soit ami avec ton ex
Faire l'amour pendant un film | Faire l'amour pendant un match
Que ton partenaire te lise une histoire érotique | Lire une histoire érotique à ton partenaire
Un week-end coquin dans un hôtel de luxe | Un week-end coquin dans une cabane perdue
Faire l'amour avec quelqu'un de beaucoup plus âgé | Faire l'amour avec quelqu'un de beaucoup plus jeune
Que tes voisins frappent au mur | Que la police sonne pour tapage nocturne
Une lingerie rouge | Une lingerie noire
Faire l'amour sur un lit d'eau | Faire l'amour dans un hamac
Un partenaire qui adore les préliminaires | Un partenaire qui adore les longues nuits
Un plan à trois avec deux personnes de ton sexe | Un plan à trois avec deux personnes du sexe opposé
Réaliser ton fantasme mais que tout le monde le sache | Garder ton fantasme secret sans jamais le réaliser
Faire l'amour au bureau après le travail | Faire l'amour au cinéma pendant la séance
Faire l'amour juste avant une soirée | Faire l'amour juste après une soirée
Un partenaire qui sait danser lascivement | Un partenaire qui sait masser divinement
Perdre ta voix à force de crier | Perdre tes forces après une nuit entière
Un câlin coquin très lent | Un câlin coquin très rapide
Que ton partenaire porte ton t-shirt | Que ton partenaire ne porte rien
Faire l'amour dans un lit superposé | Faire l'amour sur un matelas gonflable
Te faire draguer pour un plan à trois | Proposer toi-même un plan à trois
Regarder une vidéo coquine avec ton partenaire | Vous filmer pour la regarder ensuite
Un club libertin | Un sauna mixte
Faire l'amour en étant observé | Observer un couple faire l'amour
Une fessée | Un suçon
Faire l'amour en plein jour, rideaux ouverts | Faire l'amour en pleine nuit, fenêtres ouvertes
Un partenaire qui raconte ses fantasmes | Un partenaire qui les réalise sans prévenir
Une vie intime très fréquente mais expédiée | Une vie intime rare mais exceptionnelle
Faire l'amour avec quelqu'un que tu connais depuis une heure | Faire l'amour avec ton meilleur ami
Un sex friend que tes amis connaissent | Un sex friend que personne ne connaît
Faire l'amour dans une chambre d'hôtel en haut d'une tour | Faire l'amour dans une cabane sur pilotis
Faire l'amour en pleine tempête | Faire l'amour pendant une panne de courant
Un strip-poker à deux | Un jeu de dés coquins à deux
Un baiser enflammé contre un mur | Un câlin coquin sous la couette
Faire un strip-tease à ton partenaire devant ses amis | Recevoir un strip-tease en privé
Un week-end naturiste | Un week-end dans un hôtel coquin
Te réveiller avec un suçon dans le cou un jour de réunion | Te réveiller avec des griffures dans le dos un jour de piscine
Faire l'amour sur un capot de voiture | Faire l'amour sur un bureau
Que ton partenaire te fasse une surprise coquine au travail | Que ton partenaire t'attende en lingerie à la maison
Une nuit d'amour pendant un orage | Une nuit d'amour au bord d'un lac
Que tes parents trouvent tes menottes | Que ton patron trouve tes menottes
Que ton partenaire dise ton prénom en plein moment | Que ton partenaire reste silencieux
Le sexe au téléphone | Le sexe par messages
Faire l'amour en pleine nature au printemps | Faire l'amour devant un feu de camp
Un sextoy rien que pour toi | Un sextoy pour le couple
Un plan à trois avec ta célébrité préférée et ton partenaire | Une nuit en tête-à-tête avec ta célébrité préférée
Embrasser quelqu'un du même sexe devant tes amis | Faire une lap dance à un inconnu
Faire l'amour dans un ascenseur vitré | Faire l'amour dans une grande roue
Une nuit blanche torride une fois par an | Une sieste coquine chaque après-midi
Faire l'amour sur la plage au coucher du soleil | Faire l'amour dans une chambre avec vue sur la ville
Que ton partenaire te surprenne en solo | Surprendre ton partenaire en solo
Une nuit de noces torride | Un voyage de noces torride
Un partenaire qui mord | Un partenaire qui griffe
Faire l'amour sur un tapis devant la télé | Faire l'amour dans la baignoire
Un bandeau et des plumes | Des menottes et un glaçon
Faire l'amour avec quelqu'un de très timide | Faire l'amour avec quelqu'un de très bavard
Un dimanche entier au lit avec ton partenaire | Un samedi soir en club libertin
Un coup d'un soir dont tu ne sais pas le prénom | Un ex dont tu connais tout
Un rapport dans une cabine de plage | Un rapport dans une cabine téléphonique
Que ton partenaire te fasse l'amour en chantant | Que ton partenaire te fasse l'amour en riant
Une nuit avec ta célébrité préférée sans pouvoir le raconter | Raconter une nuit qui n'a jamais eu lieu
Faire l'amour en pleine journée au soleil | Faire l'amour à la lueur des bougies
Te faire bander les yeux par ton partenaire | Bander les yeux de ton partenaire
Une nuit dans un manoir hanté | Une nuit dans un igloo
Un partenaire qui adore les fessées | Un partenaire qui adore les mordillements
Faire l'amour avec un inconnu masqué | Faire l'amour avec ton crush habillé en super-héros
Que ton partenaire t'envoie une photo osée au travail | Que ton partenaire t'envoie un message torride pendant un repas de famille
Faire l'amour dans un champ de lavande | Faire l'amour dans un vignoble
Une nuit avec ton ex en cachette | Une nuit avec un inconnu en vacances
Que ton partenaire soit très expérimenté mais distant | Que ton partenaire soit débutant mais très amoureux
Faire l'amour dans une maison de vacances pleine d'amis | Faire l'amour dans une chambre d'hôtel entre deux réunions
Une nuit dans un hôtel avec jacuzzi | Une nuit dans un hôtel avec vue sur la mer
Une nuit d'amour très romantique | Une nuit d'amour très crue
Que ton crush te surprenne en lingerie | Que ton crush te surprenne sous la douche
Faire l'amour à l'arrière d'une limousine | Faire l'amour dans une cabane de jardin
Un partenaire qui fait de la danse classique | Un partenaire qui fait du yoga
Te faire déshabiller du regard | Te faire déshabiller à pleines mains
Faire l'amour juste après une dispute | Faire l'amour juste après une déclaration
Une nuit sans préliminaires | Des préliminaires sans aller plus loin
Faire un câlin coquin dans les toilettes d'un avion | Faire un câlin coquin dans les toilettes d'un train
Que ton ex écrive un livre sur vos nuits | Que ton partenaire raconte vos nuits à ses amis
Avoir un amant ou une maîtresse secrète | Être l'amant ou la maîtresse secrète de quelqu'un
Te faire réveiller par un partenaire nu | Te faire réveiller par un partenaire en lingerie
Faire l'amour avec un bandeau pendant toute la nuit | Faire l'amour en se regardant dans les yeux toute la nuit
Avouer ton fantasme le plus fou à tes amis | Avouer ton nombre de partenaires à tes parents
Faire l'amour en été sans climatisation | Faire l'amour en hiver sans chauffage
Faire l'amour dans un cinéma vide | Faire l'amour dans un musée après la fermeture
Un partenaire qui adore la lingerie | Un partenaire qui adore les costumes
Faire l'amour dans un lit étroit d'internat | Faire l'amour dans un lit king size
Une relation torride mais secrète | Une relation tiède mais officielle
Faire l'amour sur un bateau en pleine mer | Faire l'amour dans une cabane en haut d'un arbre
Que ton partenaire ait un fantasme bizarre | Que ton partenaire n'ait aucun fantasme
Une nuit à recommencer tous les soirs | Une nuit unique impossible à oublier
Que ton partenaire te fasse rougir en public | Faire rougir ton partenaire en public
Faire l'amour devant une baie vitrée | Faire l'amour dans une cave à vin
Un jeu de rôle de cambrioleur | Un jeu de rôle de médecin
Une nuit avec ton partenaire déguisé en ton personnage préféré | Une nuit avec ton partenaire dans un costume de ton choix
Un partenaire qui adore la douche à deux | Un partenaire qui adore le petit-déjeuner au lit
Te faire surprendre en pleine action par un livreur | Te faire surprendre par un voisin à la fenêtre
Une nuit au bord de la piscine | Une nuit au fond du jardin
Que ton partenaire te propose un plan à trois | Que ton partenaire te propose un club libertin
Une nuit d'amour à la belle étoile | Une nuit d'amour sur un yacht
Un premier rapport parfait | Un premier rapport raté mais drôle
Faire l'amour avec quelqu'un de très musclé | Faire l'amour avec quelqu'un de très tendre
Faire l'amour dans un cabanon de plage | Faire l'amour dans une piscine d'hôtel la nuit
Faire l'amour dans une chambre d'étudiant | Faire l'amour dans la chambre d'amis de tes beaux-parents
Un partenaire qui adore être mordillé | Un partenaire qui adore être chatouillé
Une lingerie en dentelle | Une lingerie en cuir
Recevoir un massage sensuel les yeux bandés | Faire un massage sensuel les yeux bandés
Faire l'amour en se tenant les mains | Faire l'amour sans jamais se toucher les mains
Que ton partenaire t'attende nu sous un peignoir | Que ton partenaire t'attende dans un bain moussant
Une nuit coquine dans un hôtel capsule | Une nuit coquine dans une cabane de pêcheur
Un rendez-vous coquin au milieu de la journée | Un rendez-vous coquin à 4 h du matin
Faire l'amour avec un parfum enivrant | Faire l'amour après une séance de sport
Un partenaire qui te décrit tes plus beaux atouts | Un partenaire qui te les montre du bout des doigts
Que ton crush t'envoie une photo en sous-vêtements | Recevoir une vidéo de ton crush qui danse pour toi
Un jeu de rôle de pirates | Un jeu de rôle d'agents secrets
Un câlin coquin dans une cabine d'essayage | Un câlin coquin dans un vestiaire de piscine
Faire l'amour en buvant du champagne | Faire l'amour en mangeant des fraises
Que ton partenaire porte uniquement une cravate | Que ton partenaire porte uniquement des talons
Une nuit de passion avec ton crush puis plus jamais | Une relation avec ton crush mais une vie intime très sage
Un suçon dans le cou | Un suçon sur la cuisse
Un partenaire qui fait l'amour comme dans les films | Un partenaire qui fait l'amour comme dans la vraie vie
Faire l'amour en chuchotant chez des amis | Faire l'amour sans retenue dans une maison isolée
Que ton partenaire te propose un jeu de cartes coquin | Que ton partenaire te propose une liste de fantasmes à cocher
Un sextoy qui vibre | Un sextoy qui chauffe
Une vidéo coquine regardée seul | Une vidéo coquine regardée à deux
Faire l'amour dans un appartement aux murs très fins | Faire l'amour dans une maison de campagne isolée
Un baiser coquin dans un ascenseur bondé | Un baiser coquin dans un taxi
Un partenaire qui aime parler de sexe | Un partenaire qui préfère le faire sans en parler
Faire l'amour après un dîner aux chandelles | Faire l'amour avant même d'avoir dîné
Te faire désirer pendant toute une soirée | Faire désirer ton partenaire pendant toute une soirée
Un week-end sans vêtements | Un week-end sans téléphone
Que ton ex raconte vos nuits à tes amis | Que tes amis racontent ta pire nuit à ton crush
Un plan à trois avec ton partenaire et ton crush | Une nuit en tête-à-tête avec ton crush, en cachette
Un fantasme d'uniforme de pilote | Un fantasme d'uniforme de pompier
Faire l'amour dans un dressing | Faire l'amour dans une buanderie
Un massage qui dérape lentement | Une dispute qui dérape en baiser
Un partenaire qui te réveille la nuit avec des envies | Un partenaire qui te fait attendre jusqu'au week-end
Faire l'amour devant la fenêtre d'un gratte-ciel | Faire l'amour dans une cabane perdue en montagne
Envoyer un message coquin à la mauvaise personne | Recevoir un message coquin qui ne t'était pas destiné
Te faire surprendre par ton coloc | Te faire surprendre par ta propriétaire
Faire l'amour dans une piscine gonflable | Faire l'amour sur un trampoline
Une nuit sans limites avec la bonne personne | Une nuit sage avec ta célébrité préférée
Un jeu de rôle de serveur et de client | Un jeu de rôle de coach sportif
`)
};

export const GAGES_EXTRA = L(`
Parle avec l'accent de ton choix jusqu'à la fin de la manche.
Fais 10 sauts sur place en criant le prénom de la personne à ta gauche.
Fais le tour de la table en marchant comme un canard.
Garde un glaçon dans ta main jusqu'à ce qu'il fonde, ou pendant 1 minute.
Mange une chips sans les mains.
Bois ton prochain verre avec une cuillère.
Laisse le groupe choisir une chanson que tu chantes en entier.
Fais une déclaration d'amour à ton téléphone.
Ne dis plus « oui » ni « non » pendant 5 minutes.
Termine toutes tes phrases par « et c'est merveilleux » pendant 5 minutes.
Tiens la position de la chaise contre le mur pendant 40 secondes.
Fais 20 abdominaux.
Fais une imitation de la personne à ta droite pendant 30 secondes.
Raconte l'histoire de ta vie en 30 secondes, avec une voix de bande-annonce.
Laisse le groupe te poser une question à laquelle tu réponds sans mentir.
Mets tes chaussures à l'envers jusqu'à ton prochain tour.
Porte un torchon sur l'épaule comme un serveur jusqu'à ton prochain tour.
Joue le serveur de la table jusqu'à ton prochain tour.
Mange une cuillère de ketchup.
Mange une cuillère de mayonnaise.
Bois un verre d'eau avec une paille, sans t'arrêter.
Reste immobile comme un mannequin de vitrine pendant 30 secondes.
Applaudis chaque fois que quelqu'un parle, jusqu'à ton prochain tour.
Lève-toi chaque fois que quelqu'un dit ton prénom, pendant 10 minutes.
Fais un discours de 30 secondes sur le sujet choisi par le groupe.
Fais deviner trois films en mimes en moins d'une minute.
Fais un cri de guerre avant chaque gorgée jusqu'à ton prochain tour.
Parle uniquement avec des rimes jusqu'à ton prochain tour.
Récite les jours de la semaine en anglais à l'envers.
Laisse le groupe choisir ton surnom pour le reste de la soirée.
Fais 10 burpees.
Danse sur la prochaine chanson qui passe, jusqu'au refrain.
Mime un animal jusqu'à ce que le groupe le devine.
Fais une démonstration de danse classique.
Imite le cri de cinq animaux à la suite.
Invente une devinette et pose-la au groupe.
Garde les mains sur la tête jusqu'à ton prochain tour.
Garde un doigt sur le nez jusqu'à ton prochain tour.
Mets tes lunettes ou celles de quelqu'un à l'envers pendant 5 minutes.
Écris ton prénom en l'air avec ton nez.
Écris ton prénom en l'air avec tes fesses.
Fais le tour de la pièce en marchant à reculons.
Fais le moonwalk sur 3 mètres.
Parle comme un présentateur de télé-achat jusqu'à ton prochain tour.
Parle comme un commentateur sportif jusqu'à ton prochain tour.
Fais une vidéo de 10 secondes où tu chantes, et montre-la au groupe.
Envoie un vocal de 10 secondes où tu imites une poule à un ami.
Envoie « Je viens de gagner au loto » à un ami, puis avoue la vérité.
Laisse le groupe écrire un mot sur ton front au stylo effaçable ou au rouge à lèvres.
Porte une chaussette sur une main jusqu'à la fin de la manche.
Fais une révérence à chaque personne en l'appelant « Votre Altesse ».
Appelle tout le monde « chef » jusqu'à ton prochain tour.
Vouvoie tout le monde jusqu'à ton prochain tour.
Pose une question à chaque personne et écoute sa réponse sans la couper.
Ne touche pas ton téléphone pendant 15 minutes.
Donne ton téléphone au groupe pendant 2 minutes, sans toucher aux messages.
Lis à voix haute ta dernière recherche internet.
Montre la dixième photo de ta galerie.
Mets ton haut à l'envers jusqu'à la fin de la manche.
Laisse quelqu'un te faire une couette ou une tresse.
Fais 30 secondes de corde à sauter imaginaire.
Tiens sur un pied pendant toute la prochaine carte.
Garde une grimace choisie par le groupe pendant 30 secondes.
Prends un selfie ridicule et montre-le à tout le monde.
Essaie de dire « Un chasseur sachant chasser sans son chien » trois fois très vite.
Essaie de toucher ton nez avec ta langue.
Fais un tour sur toi-même à chaque fois que tu bois, jusqu'à ton prochain tour.
Fais une ola en solo.
Fais un compliment sincère à la personne que tu connais le moins ici.
Remercie chaque personne pour quelque chose de précis.
Dis une qualité de chaque personne en moins de 30 secondes.
Mange une cuillère de cornichons ou d'olives, au choix du groupe.
Mange un piment, ou une cuillère de sauce piquante si tu en trouves.
Bois une gorgée du verre choisi par le groupe.
Joue de la batterie imaginaire pendant 20 secondes, avec les bruits.
Joue du violon imaginaire en pleurant d'émotion.
Fais une chorégraphie de 15 secondes sur une chanson choisie par le groupe.
Chante « Joyeux anniversaire » à la personne de ton choix.
Imite un chanteur ou une chanteuse célèbre, le groupe devine qui.
Imite un personnage de dessin animé, le groupe devine qui.
Raconte ton dernier rêve en le mimant.
Parle en ne bougeant que la mâchoire, comme un ventriloque, jusqu'à ton prochain tour.
Fais le bruit d'une voiture de course à chaque fois que tu te lèves, jusqu'à ton prochain tour.
Interdit de dire « genre » et « en fait » jusqu'à ton prochain tour.
Interdit de prononcer le prénom de quelqu'un jusqu'à ton prochain tour.
Interdit d'utiliser tes mains pour parler jusqu'à ton prochain tour.
Interdit de croiser les jambes jusqu'à ton prochain tour.
Garde le sourire jusqu'à ton prochain tour, même pour boire.
Fais un câlin à chaque personne.
Laisse la personne à ta gauche choisir ton prochain gage.
Fais un tour de magie avec une pièce ou un bouchon.
Fais un toast de 20 secondes à l'amitié.
Fais un défilé de mode avec les chaussures de quelqu'un d'autre.
Mets un objet en équilibre sur ta tête et fais le tour de la table.
Récite une table de multiplication choisie par le groupe.
Cite 10 pays en 15 secondes.
Cite 10 marques en 15 secondes.
Cite 10 prénoms qui commencent par la même lettre en 15 secondes.
Fais 15 secondes de beatbox.
Fais une interview de toi-même, en jouant les deux rôles.
Présente la météo de la soirée.
Annonce le prochain tour comme un présentateur de jeu télévisé.
Fais le bruitage du prochain tour de jeu.
Raconte comment tu as rencontré chaque personne ici, en une phrase.
Fais semblant de pleurer de joie pendant 15 secondes.
Fais semblant de rire pendant 15 secondes, jusqu'à ce que quelqu'un rie avec toi.
Fais la voix d'un GPS jusqu'à ton prochain tour.
Accueille la prochaine personne qui parle comme une star de cinéma.
Imite un mannequin qui défile, jusqu'à la porte et retour.
Mime une scène de ménage avec un balai.
Fais le serveur de la personne à ta droite jusqu'à la fin de la manche.
Laisse le groupe choisir ton statut WhatsApp pour 24 heures.
Laisse le groupe choisir ta sonnerie de téléphone jusqu'à demain.
Commente une photo d'un ami avec le message choisi par le groupe, en restant gentil.
Mets un rappel « Je suis une légende » sur ton téléphone tous les jours pendant une semaine.
Écris une courte lettre d'excuses à ton frigo et lis-la.
Fais une démonstration de yoga avec un nom de posture inventé.
Fais l'avion en tournant sur toi-même pendant 10 secondes.
Fais 10 squats en tenant ton verre sans le renverser.
Marche avec un livre sur la tête jusqu'à la porte et reviens.
Laisse quelqu'un te dessiner un tatouage au stylo sur le bras.
Bois ton prochain verre avec ta main non dominante.
Prends une gorgée à chaque fois que quelqu'un rit, pendant 5 minutes.
Ne dis que des mots d'une syllabe pendant 2 minutes.
Parle uniquement en posant des questions pendant 2 minutes.
Remplace chaque « je » par ton prénom jusqu'à ton prochain tour.
Mime ta réaction si tu gagnais au loto.
Mime ta réaction si tu croisais ton ex au supermarché.
Imite ta façon de te réveiller le matin.
Imite ta façon de rentrer de soirée.
Fais 30 secondes de gainage pendant que le groupe te raconte une blague.
Danse le zouk ou la salsa avec un coussin.
Fais une déclaration d'amour à la pizza.
Fais une pub de 20 secondes pour la boisson que tu bois.
Fais deviner une chanson en la sifflant.
Joue la scène de « Titanic » en solo, avec le vent dans les cheveux.
Fais le tour de la pièce avec un objet coincé sous le menton.
Garde une pièce sur ton front jusqu'à ton prochain tour, tête penchée.
Échange ta place avec la personne de ton choix.
Assieds-toi par terre jusqu'à la fin de la manche.
Laisse ta boisson au centre de la table jusqu'à ton prochain tour.
Fais le DJ : choisis les trois prochaines chansons, le groupe a un droit de veto.
Range les verres vides de la table.
Fais une danse de la victoire à chaque bonne réponse du groupe, jusqu'à ton prochain tour.
Imite le bruit d'un objet de la cuisine, le groupe devine lequel.
Fais trois tours de la table en sautant à pieds joints.
Fais une démonstration de karaté au ralenti, avec les bruits.
Parle comme un extraterrestre qui découvre la Terre jusqu'à ton prochain tour.
Joue au mime avec la personne en face de toi : elle mime, tu devines, en 30 secondes.
Dis l'alphabet en sautant une lettre sur deux.
Raconte ton plus gros fou rire.
Avoue ton plaisir coupable musical.
Dis ce que tu as pensé de chaque personne la première fois que tu l'as vue.
Fais un concours de regard avec la personne en face de toi. Si tu perds, refais un gage.
Laisse le groupe te maquiller pendant 1 minute.
Mets un accessoire choisi par le groupe jusqu'à la fin de la partie.
Prends une photo de groupe où tout le monde t'imite.
Raconte une histoire inventée avec trois mots donnés par le groupe.
Fais un éloge funèbre très dramatique pour une chips.
`);

/* Gages épicés : séduction, jamais de sexualité */
export const GAGES_HOT_EXTRA = L(`
Fais un bisou sur la joue de la personne qui vient de parler.
Fais un bisou sur la joue de la personne à ta droite.
Fais un bisou esquimau à la personne de ton choix.
Fais un bisou sur le front de la personne de ton choix.
Fais un bisou sur la main de chaque personne.
Fais un bisou sur l'épaule de la personne de ton choix.
Fais un câlin de 30 secondes à la personne de ton choix.
Fais un câlin par derrière à la personne de ton choix.
Fais un slow sans musique avec la personne de ton choix.
Fais un slow avec la personne désignée par le groupe.
Danse un collé-serré de 20 secondes avec la personne de ton choix.
Fais une danse lascive avec une écharpe ou une serviette.
Fais une danse de séduction à une chaise.
Fais un regard de braise à chaque personne, une par une.
Fais un clin d'œil à la personne de ton choix chaque fois que tu bois, jusqu'à ton prochain tour.
Murmure un compliment à l'oreille de chaque personne.
Murmure ton prénom à l'oreille de quelqu'un, de la façon la plus sensuelle possible.
Fais un compliment sur le physique de chaque personne.
Fais une déclaration enflammée à la personne de ton choix.
Drague la personne en face de toi avec ta meilleure phrase d'accroche.
Drague la personne à ta droite comme dans un film des années 50.
Drague quelqu'un en ne parlant que de légumes.
Drague quelqu'un en chantant.
Drague quelqu'un avec un accent italien pendant 20 secondes.
Fais une demande de rendez-vous à genoux à la personne de ton choix.
Écris ton numéro de téléphone sur la main de quelqu'un.
Écris un mot doux sur un papier et donne-le à la personne de ton choix.
Envoie un compliment à ton crush.
Envoie un cœur à la dernière personne avec qui tu as flirté.
Like une vieille photo de ton crush.
Envoie « Tu es libre la semaine prochaine ? » à ton crush.
Envoie « Je viens de rêver de toi » à la troisième personne de tes conversations.
Montre la dernière photo que tu as envoyée à ton crush.
Montre au groupe la photo de ton crush, sans dire son nom.
Montre la photo de toi qui a reçu le plus de likes.
Laisse le groupe choisir une photo de toi à envoyer à ton crush, avec un droit de veto.
Avoue ton crush actuel, ou donne trois indices.
Raconte ton premier bisou en détail.
Raconte ton dernier rendez-vous galant.
Raconte ton plus gros râteau.
Raconte ta technique de drague secrète.
Avoue qui ici te plaît le plus physiquement.
Note sur 10 le charme de chaque personne.
Dis qui ici embrasse le mieux, selon toi.
Dis qui ici ferait le meilleur partenaire, et pourquoi.
Laisse quelqu'un poser sa tête sur tes genoux pendant une carte.
Pose ta tête sur l'épaule de quelqu'un jusqu'à ton prochain tour.
Tiens la main de la personne de ton choix jusqu'à ton prochain tour.
Mets ton bras autour des épaules de quelqu'un jusqu'à ton prochain tour.
Masse les mains de la personne de ton choix pendant 30 secondes.
Masse le cou de la personne de ton choix pendant 30 secondes.
Fais un massage du cuir chevelu à quelqu'un pendant 30 secondes.
Laisse quelqu'un te masser les épaules en te murmurant des compliments.
Passe ta main dans les cheveux de la personne de ton choix.
Caresse la joue de quelqu'un en lui faisant un compliment.
Regarde la personne de ton choix dans les yeux pendant 30 secondes sans rire.
Approche-toi nez à nez de quelqu'un. Le premier qui rit fait un gage.
Mange un carré de chocolat de la façon la plus séduisante possible.
Mange une banane de la façon la plus séduisante possible.
Bois une gorgée bras dessus bras dessous avec la personne de ton choix.
Bois dans le verre de la personne de ton choix en la regardant dans les yeux.
Fais passer une carte de ta bouche à celle de quelqu'un en aspirant.
Fais passer une orange de ton cou à celui de quelqu'un, sans les mains.
Croque un bout de réglisse avec quelqu'un qui croque l'autre bout. Arrêtez-vous avant le bisou.
Mets du baume à lèvres à quelqu'un, doucement.
Laisse quelqu'un te mettre du rouge à lèvres.
Laisse quelqu'un te faire une marque de rouge à lèvres sur la joue.
Fais une marque de rouge à lèvres sur la joue de quelqu'un.
Sens le parfum de la personne de ton choix dans son cou et décris-le.
Les yeux bandés, reconnais une personne à son parfum.
Les yeux bandés, reconnais une personne en touchant ses mains.
Les yeux bandés, fais un bisou sur la joue de la personne vers qui le groupe te guide.
Laisse-toi guider les yeux bandés par la personne de ton choix à travers la pièce.
Fais un défilé de mannequin avec un regard de braise.
Prends la pose pour une couverture de magazine, le groupe prend la photo.
Fais une séance photo glamour de 20 secondes.
Retire ta veste ou ton pull de la façon la plus séduisante possible, en gardant ton haut.
Enlève tes chaussettes de la façon la plus sensuelle possible.
Retire un accessoire de la façon la plus sensuelle possible.
Lis la composition de ta boisson avec ta voix la plus sensuelle.
Lis ton dernier message reçu avec une voix de séducteur ou de séductrice.
Commente la soirée avec la voix d'un présentateur de radio de nuit.
Joue une scène de baiser de cinéma avec ta main.
Rejoue avec quelqu'un la scène du balcon de Roméo et Juliette.
Rejoue avec quelqu'un une scène de film romantique choisie par le groupe.
Joue avec quelqu'un un couple qui se retrouve à l'aéroport après un an.
Joue avec quelqu'un un premier rendez-vous très gênant.
Fais une déclaration d'amour à quelqu'un, comme dans une télénovela.
Dis « je t'aime » à quelqu'un de cinq façons différentes.
Chante une chanson d'amour en regardant quelqu'un dans les yeux.
Fredonne une chanson à l'oreille de quelqu'un.
Invite quelqu'un à danser comme dans un bal ancien.
Danse une valse avec la personne de ton choix.
Danse une bachata avec la personne de ton choix.
Fais tourner quelqu'un sur place comme dans un film de danse.
Appelle la personne de ton choix « mon cœur » jusqu'à ton prochain tour.
Sois le cavalier ou la cavalière de quelqu'un jusqu'à la fin de la partie.
Ressers la personne de ton choix chaque fois que son verre est vide, jusqu'à ton prochain tour.
Laisse quelqu'un te donner une bouchée à manger.
Donne une bouchée à manger à quelqu'un, de la façon la plus séduisante possible.
Fais un compliment sur les yeux de quelqu'un, les yeux dans les yeux.
Fais rougir quelqu'un en moins de 30 secondes, sans aucun contact.
Fais rire quelqu'un en lui chuchotant à l'oreille.
Lis les lignes de la main de quelqu'un et invente son avenir amoureux.
Fais l'horoscope amoureux de chaque personne.
Imite ta tête quand ton crush t'écrit.
Imite ta technique de drague en boîte.
Imite la façon de draguer de la personne de ton choix.
Mime ton premier bisou, avec ta main.
Mime un rendez-vous galant raté.
Fais un bisou soufflé à chaque personne.
Fais un bisou sur le nez de la personne de ton choix.
Fais un bisou à l'intérieur du poignet de quelqu'un.
Fais trois bisous à quelqu'un, à trois endroits du visage, sauf la bouche.
Fais un bisou papillon sur la joue de quelqu'un, avec tes cils.
Souffle doucement dans le cou de la personne de ton choix.
Caresse le dos de quelqu'un par-dessus son vêtement pendant 10 secondes.
Reste joue contre joue avec quelqu'un pendant 10 secondes.
Pose ta main sur le genou de quelqu'un jusqu'à ton prochain tour.
Assieds-toi tout contre quelqu'un jusqu'à ton prochain tour.
Laisse quelqu'un s'asseoir sur tes genoux jusqu'à ton prochain tour.
Dessine un cœur sur la main de quelqu'un.
Laisse quelqu'un t'écrire un surnom coquin au stylo sur le bras.
Laisse la personne de ton choix te donner un surnom de séduction pour le reste de la soirée.
Fais un compliment osé, mais élégant, à chaque personne.
Dis à quelqu'un ce que tu as remarqué en premier chez lui ou chez elle.
Dis à voix haute ce qui te fait craquer chez quelqu'un.
Dis à voix haute le prénom de la dernière personne que tu as embrassée.
Dis à voix haute la dernière fois que tu as flirté.
Raconte ton rendez-vous idéal en détail.
Raconte ta plus belle soirée romantique.
Raconte le bisou le plus inattendu de ta vie.
Raconte ton pire bisou.
Raconte un coup de foudre que tu as vécu.
Avoue à qui tu as pensé en dernier avant de dormir hier soir.
Avoue un crush que tu as eu sur quelqu'un ici, même ancien, ou bois deux fois.
Avoue le surnom que tu donnes en secret à ton crush.
Montre ton dernier message de drague envoyé.
Mime ce que tu fais quand quelqu'un te plaît en soirée.
Fais une danse du ventre de 15 secondes.
Enlève un accessoire et donne-le à la personne de ton choix jusqu'à la fin de la partie.
Échange un vêtement avec la personne de ton choix jusqu'à la fin de la partie.
Prête ta veste à quelqu'un, avec élégance.
Prends un selfie avec quelqu'un comme un couple qui vient de se fiancer.
Prends une photo joue contre joue avec la personne de ton choix.
Fais semblant de tomber dans les bras de quelqu'un.
Fais une demande en mariage à quelqu'un avec une bague imaginaire.
Propose un pacte à quelqu'un : si vous êtes célibataires à 40 ans, vous vous mariez.
Joue au couple marié avec la personne de ton choix jusqu'à ton prochain tour.
Fais une scène de jalousie théâtrale à la personne de ton choix.
Fais une scène de retrouvailles passionnées avec quelqu'un.
Dis un compliment différent à quelqu'un chaque fois qu'il ou elle boit, jusqu'à ton prochain tour.
Garde ta main dans celle de quelqu'un jusqu'à ce qu'il ou elle boive.
Fais le serveur pour un dîner romantique entre deux personnes du groupe.
Organise un mini rendez-vous galant d'une minute entre deux personnes du groupe.
Désigne le plus beau couple possible du groupe et fais-les danser.
Fais le coach en séduction de quelqu'un pendant 30 secondes.
Donne trois conseils de séduction à la personne de ton choix.
Appelle ton crush et dis-lui une phrase choisie par le groupe, avec un droit de veto.
Écris un poème coquin de quatre vers et lis-le.
Écris une déclaration à la personne de ton choix, en trois phrases.
Fais une déclaration d'amour à quelqu'un en utilisant uniquement des titres de chansons.
Fais un massage des pieds à quelqu'un pendant 20 secondes, en chaussettes.
Fais un tour de la pièce comme une star sur le tapis rouge.
Fais une danse de séduction au rythme d'une chanson choisie par le groupe.
Prends la pose la plus séduisante possible pendant 10 secondes.
Dis à la personne à ta droite ce que tu aimes chez elle.
Dis à la personne à ta gauche ce que tu aimes chez elle.
Coiffe quelqu'un en prenant tout ton temps.
Remets le col ou les cheveux de quelqu'un en place, lentement.
Retire délicatement une poussière imaginaire du visage de quelqu'un.
Choisis une personne et dédie-lui une chanson d'amour.
Fais un baisemain à la personne de ton choix.
Fais une révérence à quelqu'un et demande-lui la permission de lui tenir la main.
Écris le prénom de ton crush sur ta main et garde-le jusqu'à la fin de la partie.
Confie un secret amoureux à l'oreille de quelqu'un.
Laisse quelqu'un lire ton dernier échange avec une personne qui te plaît.
Laisse le groupe lire ta bio sur une appli de rencontre, ou écris-en une sur le champ.
Laisse quelqu'un faire défiler tes photos pendant 10 secondes.
Fais semblant d'être un séducteur ou une séductrice de feuilleton pendant une minute.
Joue un serveur qui drague tous les clients.
Joue un inconnu qui aborde quelqu'un dans un bar.
Fais une démonstration de ton meilleur déhanché.
Fais tourner ta veste au-dessus de ta tête comme dans un spectacle.
Fais un bisou sur la joue de chaque personne, en commençant par celle que tu préfères.
Laisse quelqu'un te faire un bisou sur le front.
Laisse quelqu'un te souffler dans le cou.
Laisse quelqu'un te caresser les cheveux pendant 20 secondes.
Laisse quelqu'un dessiner un cœur sur ta joue avec son doigt.
Laisse la personne de ton choix te prendre dans ses bras pendant 15 secondes.
Fais un câlin à quelqu'un pendant toute la durée d'un refrain.
Prends quelqu'un par la main et fais le tour de la pièce sans un mot.
Trinque avec quelqu'un et bois une gorgée sans détourner les yeux des siens.
Fais un slow avec quelqu'un sur la chanson la plus ringarde possible.
Laisse le groupe choisir avec qui tu danses un slow.
Laisse le groupe choisir qui te fait un bisou sur la joue.
Laisse le groupe choisir la personne à qui tu fais une déclaration.
Avoue qui tu embrasserais ici si tu devais choisir.
Avoue la chose la plus osée que tu aies faite pour séduire.
Mime la tête de quelqu'un qui reçoit un compliment de son crush.
Dis à la personne de ton choix quelle célébrité elle pourrait séduire.
Murmure à l'oreille de quelqu'un ce que tu ferais lors d'un premier rendez-vous.
Murmure une phrase en anglais à l'oreille de quelqu'un, avec ta voix la plus douce.
Parle avec une voix sensuelle jusqu'à ton prochain tour.
Termine chaque phrase par « mon amour » jusqu'à ton prochain tour.
Fais un compliment à quelqu'un sans utiliser les mots beau, belle ou joli.
Pose trois questions de séduction à quelqu'un. Il ou elle répond honnêtement.
Laisse quelqu'un te poser trois questions sur ta vie amoureuse.
Raconte ta plus belle déclaration, reçue ou faite.
Raconte la dernière fois que ton cœur s'est emballé.
Mets-toi à genoux et offre une fleur imaginaire à la personne de ton choix.
Fais semblant d'être un admirateur secret et livre un mot doux à quelqu'un.
Choisis quelqu'un et imite tous ses gestes avec un regard charmeur jusqu'à ton prochain tour.
Fais un bisou sur la joue de quelqu'un en te mettant sur la pointe des pieds.
Embrasse ton reflet dans un miroir ou un écran éteint, de façon passionnée.
Fais une déclaration passionnée à la plante verte la plus proche.
Raconte à la personne de ton choix, à voix basse, la chose la plus romantique que tu aies vécue.
Fais un bisou sur la tempe de la personne de ton choix.
Fais un bisou dans les cheveux de quelqu'un.
Remonte la manche de quelqu'un et fais-lui un bisou sur l'avant-bras.
Fais un câlin à quelqu'un comme si vous ne vous étiez pas vus depuis un an.
Pose ta tête contre celle de quelqu'un pendant 15 secondes.
Danse un tango théâtral avec quelqu'un, une rose imaginaire entre les dents.
Fais un slow en tenant la personne de ton choix par la taille.
Fais un compliment sur le sourire de quelqu'un, puis provoque ce sourire.
Chuchote trois mots doux à l'oreille de quelqu'un.
Envoie un message vocal de 5 secondes à ton crush avec ta voix la plus douce.
Écris un message de Saint-Valentin à quelqu'un ici et lis-le à voix haute.
Prends la main de quelqu'un et dessine des petits cercles avec ton pouce pendant 20 secondes.
Glisse un mot doux dans la poche de quelqu'un, à lire à la fin de la soirée.
Fais un selfie les yeux dans les yeux avec quelqu'un.
Prends la pose d'une affiche de film romantique avec la personne de ton choix.
Dis à voix haute à quelle célébrité ressemble ton crush.
Raconte ta pire Saint-Valentin.
Avoue le surnom le plus mignon qu'on t'ait donné en couple.
Danse un slow avec un coussin en fixant la personne de ton choix.
Mime une demande en mariage à la personne qui vient de rire.
Fais un baisemain à chaque personne, en commençant par celle que tu trouves la plus élégante.
Fais un bisou sur la joue de quelqu'un et reste joue contre joue 5 secondes.
Laisse quelqu'un te faire tourner sur la piste comme dans un bal.
Joue avec quelqu'un deux inconnus qui se rentrent dedans et tombent sous le charme.
Laisse quelqu'un choisir la prochaine personne avec qui tu trinques, les yeux dans les yeux.
`);

/* Gages ajoutés au niveau +18, en plus des gages épicés */
export const GAGES_X18_EXTRA = L(`
Enlève un vêtement jusqu'à la fin de la partie, sous-vêtements exclus.
Laisse quelqu'un te faire un suçon sur le bras.
Imite ton expression du matin au réveil après une nuit torride.
Fais un body shot avec la boisson de ton choix.
Fais une lap dance de 15 secondes à la personne de ton choix.
Mime ta position préférée avec un coussin, le groupe devine son nom.
Simule un orgasme le plus discrètement possible, puis le plus bruyamment possible.
Raconte ta nuit la plus torride en trois phrases, sans donner de nom.
Avoue ton nombre de partenaires, ou prends deux gages.
Avoue ton fantasme le plus inavouable à l'oreille de la personne de ton choix.
Montre la couleur de tes sous-vêtements à une seule personne de ton choix.
Fais un strip-tease de 20 secondes en gardant tes sous-vêtements.
Laisse quelqu'un t'enlever un vêtement de son choix, sous-vêtements exclus.
Embrasse le cou de la personne de ton choix pendant 10 secondes, avec son accord.
Mordille le lobe de l'oreille de quelqu'un, avec son accord.
Laisse la personne de ton choix poser ses mains où elle veut au-dessus de ta ceinture, pendant 10 secondes.
Fais un massage sensuel du dos à quelqu'un, sous son haut, avec son accord.
Lis à voix haute le dernier message coquin que tu as reçu.
Montre la photo la plus coquine de ton téléphone à une seule personne de ton choix.
Assieds-toi à califourchon sur la personne de ton choix pendant une carte, avec son accord.
Passe un glaçon dans le cou de quelqu'un, avec son accord.
Murmure à l'oreille de quelqu'un ce que tu lui ferais si vous étiez seuls.
Décris ta dernière fois en mimant, sans un mot.
Embrasse quelqu'un sur la bouche pendant 5 secondes, ou prends deux gages.
Cite cinq positions en dix secondes, ou retire un vêtement.
Twerke contre la personne de ton choix pendant 10 secondes, avec son accord.
`);

/* 2 vérités, 1 mensonge : thèmes d'inspiration */
export const TVM_EXTRA = L(`
Ton premier amour
Ton premier bisou
Ta première cuite
Ton premier salaire
Ton premier appartement
Ta première voiture
Ton premier voyage en solo
Ton premier jour de travail
Ton premier animal
Ta première fois en avion
Ton premier festival
Ta première nuit blanche
Ton premier rendez-vous galant
Ta première dispute avec un ami
Ton premier tatouage ou piercing
Ton premier compte sur un réseau social
Tes vacances en camping
Tes vacances à l'étranger
Un pays que tu as visité
Une ville où tu as vécu
Un hôtel où tu as dormi
Un avion que tu as raté
Un bagage perdu
Une rencontre en voyage
Un plat goûté à l'étranger
Une galère de transports
Un souvenir de colonie de vacances
Un souvenir de classe verte ou de voyage scolaire
Ton collège
Ton lycée
Tes notes à l'école
Un prof qui t'a marqué
Une punition à l'école
Une bêtise en classe
Ton bac ou ton premier diplôme
Tes études
Ton stage le plus bizarre
Ton entretien d'embauche le plus étrange
Un collègue mémorable
Ton patron le plus étonnant
Une démission
Un job d'été
Un petit boulot
Une gaffe au travail
Une réunion qui a dérapé
Un pot de départ
Un membre éloigné de ta famille
Tes grands-parents
Tes frères et sœurs
Tes cousins
Un repas de famille
Un mariage où tu étais
Un enterrement de vie de célibataire
Un baptême ou une communion
Un Noël en famille
Un anniversaire surprise
Ton pire anniversaire
Ton meilleur anniversaire
Un cadeau que tu as reçu
Un cadeau que tu as offert
Un cadeau que tu as revendu
Un ex
Ta pire rupture
Une demande en mariage
Un rendez-vous à l'aveugle
Une appli de rencontre
Un crush impossible
Une déclaration d'amour
Une histoire de vacances
Un message envoyé à la mauvaise personne
Un secret que tu as gardé
Un mensonge qui a mal tourné
Une rumeur sur toi
Une dispute mémorable
Une réconciliation
Ton meilleur ami d'enfance
Un ami perdu de vue
Une amitié improbable
Un voisin étrange
Un coloc mémorable
Une fête organisée chez toi
Une soirée déguisée
Une soirée en boîte
Un réveillon du Nouvel An
Un concert où tu étais
Un festival de musique
Un match que tu as vu au stade
Une émission de télé
Un tournage ou un casting
Un sosie de célébrité
Un autographe
Un selfie avec quelqu'un de connu
Ton passage dans le journal
Un concours que tu as gagné
Un record du monde que tu as tenté de battre
Un sport que tu as pratiqué
Une compétition sportive
Une blessure de sport
Un séjour à l'hôpital
Une visite chez le médecin
Un accident domestique
Une allergie
Une phobie
Un cauchemar récurrent
Un rêve étrange
Une coïncidence incroyable
Un phénomène inexpliqué
Une maison hantée
Une superstition
Une voyante ou un horoscope
Ton signe astrologique
Un animal que tu as gardé pour quelqu'un
Un animal sauvage croisé
Une piqûre ou une morsure
Une plante que tu as fait pousser
Ton plat préféré
Un plat que tu as raté
Une recette de famille
Un restaurant étoilé
Un repas étrange
Un régime
Une addiction au café ou au sucre
Ton premier verre d'alcool
Un cocktail que tu as inventé
Une gueule de bois
Ton fond d'écran
Une appli que tu utilises trop
Ton historique internet
Une vidéo devenue virale
Un objet que tu as cassé
Un objet que tu collectionnes
Un objet emprunté jamais rendu
Un objet trouvé dans la rue
Une vente en ligne
Un achat compulsif
Une dépense folle
Un pari perdu
Un pari gagné
Une arnaque
Un remboursement
Ton compte en banque
Un héritage
Un jeu d'argent
Ta voiture
Ton permis de conduire
Une amende
Une panne sur la route
Un accident de vélo ou de trottinette
Une nuit dehors
Une nuit sans dormir
Une sieste dans un endroit improbable
Une glissade sur le verglas
Une cicatrice
Un vêtement que tu adores
Un look regretté
Un passage chez le coiffeur
Une couleur de cheveux
Un tatouage ou un piercing regretté
Tes chaussures
Ton parfum
Ta chambre d'enfant
Ta maison d'enfance
Un déménagement
Un cambriolage
Une fuite d'eau
Une inondation ou une tempête
Une panne de courant
Un incendie évité de justesse
Un bricolage raté
Un meuble Ikea
Un don que tu as découvert sur le tard
Un instrument de musique
Une chanson que tu as écrite
Un spectacle de fin d'année
Une chorégraphie
Un karaoké
Une langue étrangère
Un accent que tu imites
Un livre qui t'a marqué
Un film qui t'a fait pleurer
Une série que tu as dévorée
Un jeu vidéo
Un jeu de société
Un déguisement
Halloween
Une chasse aux œufs ou un carnaval
Un voyage en train
Une croisière
Une randonnée
Une nuit en refuge ou en tente
La montagne
La mer
Un sport extrême
Un saut en parachute ou à l'élastique
Une plongée sous-marine
Une rencontre avec la police
Une erreur administrative
Une file d'attente interminable
Un retard mémorable
Un rendez-vous oublié
Un prénom oublié
Une fausse excuse
Un fou rire au mauvais moment
Une honte publique
Une maladresse en public
Un discours devant du monde
Une chose que tu ne referas jamais
Une chose que tu referais demain
Un regret
Un rêve d'enfant
Une peur d'enfant
Un jouet d'enfant
Un dessin animé d'enfance
Un surnom
Un nom de famille
Un ancêtre
Un objet de famille
Un talent de tes parents
Une tradition de ta famille
Une fête de village
Une rencontre dans un bar
Un inconnu dans le train
Une conversation surprenante
Une lettre ou un message reçu
Un appel au milieu de la nuit
Un mail envoyé par erreur
Un compte piraté
Une photo que tu as supprimée
Une photo de classe
Ton journal intime
Ta liste de choses à faire avant de mourir
Un objectif que tu as atteint
Une résolution du Nouvel An
Un défi que tu t'es lancé
Un exploit sportif
Une nuit dans un aéroport
Un passeport oublié
Une frontière traversée
Un pays où tu ne retourneras jamais
Un plat que tu sais cuisiner les yeux fermés
Un aliment bizarre que tu adores
Un endroit secret que tu aimes
Une rencontre avec un animal célèbre ou rare
`);

/* La Bombe */
export const BOMB_EXTRA = L(`
Un animal de la savane
Un animal marin
Un oiseau
Un légume
Un agrume ou un fruit exotique
Une épice
Une pâtisserie
Une sauce
Un ingrédient de pizza
Une marque de céréales ou de biscuits
Un objet de la salle de bain
Un objet de bureau
Un outil de bricolage
Un meuble
Un appareil électroménager
Un accessoire de mode
Une coiffure
Une couleur de cheveux ou de vernis
Un personnage de dessin animé
Un méchant de film
Une princesse ou un prince Disney
Un personnage de jeu vidéo
Une série française
Une comédie française
Un acteur ou une actrice français
Un humoriste
Une chanson de mariage
Un mot qui rime avec « bisou »
Un mot qui rime avec « fête »
Un mot qui finit par « -age »
Un mot qui finit par « -eur »
Un mot qui contient un Z
Un mot qui contient un K
Une chose qu'on fait en vacances
Une chose qu'on fait le dimanche
Une chose qui colle
Une chose qui pique
Une chose qui sent bon
Une chose qu'on trouve dans un sac à main
Une danse
Une fête ou une célébration
Une île
Un monument célèbre
Une région de France
Un département français
Un fleuve ou une rivière
`);

/* Mot interdit : "mot:interdit1,interdit2,interdit3,interdit4" */
export const TABOO_EXTRA = L(`
Aquarium:poissons,eau,bocal,vitre
Bibliothèque:livres,silence,emprunter,lire
Boussole:nord,aiguille,direction,perdu
Calendrier:jours,mois,date,année
Cerf-volant:vent,ficelle,voler,plage
Dauphin:mer,intelligent,nager,mammifère
Éléphant:trompe,gris,défenses,Afrique
Escargot:coquille,lent,bave,Bourgogne
Girafe:cou,long,taches,savane
Hamac:sieste,suspendu,balancer,jardin
Igloo:glace,neige,maison,pôle
Jongleur:balles,cirque,lancer,rattraper
Kangourou:Australie,sauter,poche,bébé
Lampe:lumière,ampoule,allumer,abat-jour
Marionnette:fils,main,spectacle,Guignol
Moustache:poils,lèvre,barbe,visage
Parachute:sauter,avion,ciel,toile
Pingouin:banquise,noir,blanc,glisser
Tornade:vent,tourbillon,tempête,maison
Trampoline:sauter,rebondir,jardin,toile
Brunch:dimanche,petit-déjeuner,déjeuner,œufs
Sieste:dormir,après-midi,canapé,repos
Pique-nique:herbe,nappe,panier,manger
Bouchon:bouteille,vin,embouteillage,liège
Puzzle:pièces,assembler,image,boîte
`).map(l => { const [w, f] = l.split(":"); return { w, f: f.split(",") }; });

/* Mimes difficiles */
export const MIMES_HARD_EXTRA = {
  "Action": ["Faire du parapente", "Faire de l'escrime", "Se faire couper les cheveux", "Faire un plongeon de haut vol", "Déboucher un évier", "Jouer au flipper", "Gonfler un matelas pneumatique", "Faire un château de sable", "Prendre un bain glacé", "Peindre un mur au rouleau", "Chanter au karaoké sans connaître les paroles", "Rentrer en cachette sans faire de bruit", "Rater un gâteau au four", "Cueillir des cerises sur une échelle", "Laver un chien qui ne veut pas", "Danser le french cancan"],
  "Métier": ["Sommelier", "Guide de musée", "Vendeur au marché", "Fleuriste", "Chef de chantier", "Agent de sécurité à l'aéroport", "Lanceur de couteaux", "Équilibriste", "Vigneron", "Moniteur d'auto-école", "Pâtissier"],
  "Animal": ["Ours qui pêche un saumon", "Chèvre de montagne", "Paon qui fait la roue", "Pélican", "Phoque qui joue au ballon", "Chimpanzé qui épluche une banane", "Taupe", "Grenouille qui attrape une mouche", "Araignée qui tisse sa toile", "Autruche qui cache sa tête dans le sable"],
  "Film / série": ["Avengers", "Moi, moche et méchant", "Hunger Games", "La La Land", "Gladiator", "Peter Pan", "Le Petit Prince", "Cars", "Le Livre de la jungle", "Les Bronzés font du ski"],
  "Personnage": ["Zorro", "Robin des Bois", "Le Petit Chaperon rouge", "Lucky Luke", "Marilyn Monroe", "Mr Bean", "Wonder Woman", "Le capitaine Haddock"],
  "Objet": ["Machine à café", "Tronçonneuse", "Lave-vaisselle", "Lance à incendie", "Cafetière italienne", "Rouleau à pâtisserie", "Tapis roulant", "Store vénitien", "Thermomètre", "Chaise pliante"]
};

/* Jeu mystère : type, texte, chrono facultatif en secondes */
export const MYS_EXTRA = [
  { t: "qui", x: "…se perdre dans un aéroport ?" },
  { t: "qui", x: "…tomber amoureux ou amoureuse d'un serveur en vacances ?" },
  { t: "qui", x: "…devenir le maire de son village ?" },
  { t: "qui", x: "…recueillir tous les chats errants du quartier ?" },
  { t: "qui", x: "…participer à une émission de téléréalité ?" },
  { t: "qui", x: "…faire le tour du monde en sac à dos ?" },
  { t: "qui", x: "…partir vivre sur un bateau ?" },
  { t: "qui", x: "…envoyer un message à la mauvaise personne ce soir ?" },
  { t: "qui", x: "…devenir millionnaire grâce à une idée absurde ?" },
  { t: "qui", x: "…s'endormir en premier à une soirée pyjama ?" },
  { t: "qui", x: "…perdre ses clés dans la semaine ?" },
  { t: "qui", x: "…gagner un concours de mangeurs de pizza ?" },
  { t: "qui", x: "…finir en garde à vue par erreur ?" },
  { t: "qui", x: "…ouvrir un bar sur la plage ?" },
  { t: "qui", x: "…s'incruster à un mariage pour y chanter ?" },
  { t: "qui", x: "…adopter un enfant de chaque continent ?" },
  { t: "qui", x: "…rire pendant une minute de silence ?" },
  { t: "jamais", x: "…mangé quelque chose de périmé sans m'en rendre compte." },
  { t: "jamais", x: "…fait semblant de dormir pour éviter une corvée." },
  { t: "jamais", x: "…chanté sous la pluie." },
  { t: "jamais", x: "…eu un fou rire pendant un examen." },
  { t: "jamais", x: "…pris un bus dans le mauvais sens." },
  { t: "jamais", x: "…oublié mes clés et attendu des heures devant ma porte." },
  { t: "jamais", x: "…acheté un vêtement que je n'ai jamais porté." },
  { t: "jamais", x: "…parlé à une plante." },
  { t: "jamais", x: "…répondu « toi aussi » à un serveur qui me souhaitait bon appétit." },
  { t: "jamais", x: "…regardé une série entière en un week-end." },
  { t: "jamais", x: "…dormi plus de 14 heures d'affilée." },
  { t: "jamais", x: "…fait une bataille de nourriture." },
  { t: "defi", x: "{p1} cite 8 marques de chaussures en 20 secondes.", s: 20 },
  { t: "defi", x: "{p1} imite trois personnages de dessin animé, les autres devinent qui." },
  { t: "defi", x: "{p1} parle 30 secondes de son plat préféré comme dans une pub de parfum.", s: 30 },
  { t: "defi", x: "{p1} fait 10 squats en récitant l'alphabet.", s: 30 },
  { t: "defi", x: "{p1} dessine {p2} les yeux fermés en 30 secondes. Le groupe juge la ressemblance.", s: 30 },
  { t: "defi", x: "{p1} cite 10 personnages de Disney en 20 secondes.", s: 20 },
  { t: "defi", x: "{p1} tient la position de la chaise contre le mur pendant 40 secondes.", s: 40 },
  { t: "defi", x: "{p1} fait deviner 3 animaux sans parler en 30 secondes.", s: 30 },
  { t: "defi", x: "{p1} invente une chanson sur {p2} et la chante." },
  { t: "defi", x: "{p1} récite les mois de l'année à l'envers en moins de 15 secondes.", s: 15 },
  { t: "duel", x: "{p1} contre {p2} : à tour de rôle, citez des fruits. Qui sèche perd." },
  { t: "duel", x: "{p1} contre {p2} : concours d'imitation d'une star choisie par le groupe. Le groupe vote." },
  { t: "duel", x: "{p1} contre {p2} : qui garde un glaçon dans la main le plus longtemps ?" },
  { t: "duel", x: "{p1} contre {p2} : à tour de rôle, citez des pays. Qui sèche perd." },
  { t: "duel", x: "{p1} contre {p2} : concours de cri de Tarzan. Le groupe vote." },
  { t: "duel", x: "{p1} contre {p2} : qui fait le plus de sauts en étoile en 20 secondes ?", s: 20 },
  { t: "patate", x: "Citez des marques de céréales ou de biscuits." },
  { t: "patate", x: "Citez des personnages de Harry Potter." },
  { t: "patate", x: "Citez des jeux vidéo." },
  { t: "patate", x: "Citez des choses qu'on trouve dans un sac à main." },
  { t: "patate", x: "Citez des mots qui riment avec « été »." },
  { t: "regle", x: "Interdit de dire « trop »." },
  { t: "regle", x: "Chaque fois que quelqu'un boit, tout le monde dit « santé » en chœur." },
  { t: "regle", x: "{p1} doit applaudir chaque fois que {p2} parle." },
  { t: "regle", x: "Interdit de pointer quelqu'un du doigt." },
  { t: "devine", x: "{p1} mime un objet de la cuisine. 20 secondes pour trouver.", s: 20 },
  { t: "devine", x: "{p1} décrit un pays sans dire son nom ni sa langue." },
  { t: "devine", x: "{p1} fredonne une chanson de Noël." },
  { t: "devine", x: "{p1} imite un célèbre personnage de dessin animé. Trouvez qui." }
];

/* Quiz : catégorie, question, bonne réponse, 3 mauvaises réponses */
export const QUIZ_EXTRA = [
  ["Culture générale", "Quel est le plus haut sommet du monde ?", "L'Everest", "Le K2", "Le mont Blanc", "Le Kilimandjaro"],
  ["Culture générale", "Quelle est la formule chimique de l'eau ?", "H2O", "CO2", "O2", "H2O2"],
  ["Culture générale", "Quel est le symbole chimique du fer ?", "Fe", "Fr", "F", "Fi"],
  ["Culture générale", "Quel est le symbole chimique de l'argent ?", "Ag", "Ar", "Au", "Al"],
  ["Culture générale", "Combien de planètes compte le système solaire ?", "8", "9", "7", "10"],
  ["Culture générale", "Quelle est la plus grande planète du système solaire ?", "Jupiter", "Saturne", "Neptune", "Uranus"],
  ["Culture générale", "Quel est le plus grand organe du corps humain ?", "La peau", "Le foie", "Le cerveau", "Les poumons"],
  ["Culture générale", "Combien de dents compte un adulte, dents de sagesse comprises ?", "32", "28", "30", "36"],
  ["Culture générale", "Quel groupe sanguin est surnommé « donneur universel » ?", "O négatif", "AB positif", "A positif", "B négatif"],
  ["Culture générale", "Qui a découvert la pénicilline ?", "Alexander Fleming", "Louis Pasteur", "Marie Curie", "Robert Koch"],
  ["Culture générale", "Qui a formulé la théorie de la relativité ?", "Albert Einstein", "Isaac Newton", "Galilée", "Nikola Tesla"],
  ["Culture générale", "Qui a écrit « Le Petit Prince » ?", "Antoine de Saint-Exupéry", "Jules Verne", "Albert Camus", "Marcel Pagnol"],
  ["Culture générale", "Qui a écrit « Vingt Mille Lieues sous les mers » ?", "Jules Verne", "Victor Hugo", "Alexandre Dumas", "Émile Zola"],
  ["Culture générale", "Qui a écrit « Les Trois Mousquetaires » ?", "Alexandre Dumas", "Victor Hugo", "Honoré de Balzac", "Gustave Flaubert"],
  ["Culture générale", "Qui a écrit « Roméo et Juliette » ?", "William Shakespeare", "Molière", "Jean Racine", "Charles Dickens"],
  ["Culture générale", "Qui a écrit « Le Malade imaginaire » ?", "Molière", "Jean de La Fontaine", "Pierre Corneille", "Voltaire"],
  ["Culture générale", "Qui a peint « La Nuit étoilée » ?", "Vincent van Gogh", "Claude Monet", "Pablo Picasso", "Paul Cézanne"],
  ["Culture générale", "Qui a peint « Guernica » ?", "Pablo Picasso", "Salvador Dalí", "Joan Miró", "Henri Matisse"],
  ["Culture générale", "Quel peintre a réalisé la série des « Nymphéas » ?", "Claude Monet", "Édouard Manet", "Auguste Renoir", "Edgar Degas"],
  ["Culture générale", "Quel est le plus grand animal terrestre ?", "L'éléphant d'Afrique", "La girafe", "L'hippopotame", "Le rhinocéros"],
  ["Culture générale", "Combien de pattes a un insecte ?", "6", "8", "4", "10"],
  ["Culture générale", "Quel oiseau est le symbole de la paix ?", "La colombe", "Le cygne", "L'aigle", "Le moineau"],
  ["Culture générale", "Combien de couleurs compte traditionnellement un arc-en-ciel ?", "7", "5", "6", "9"],
  ["Culture générale", "En quelle année a eu lieu la prise de la Bastille ?", "1789", "1792", "1776", "1815"],
  ["Culture générale", "En quelle année est tombé le mur de Berlin ?", "1989", "1991", "1985", "1975"],
  ["Culture générale", "Qui a été le premier empereur des Français ?", "Napoléon Ier", "Louis XIV", "Charlemagne", "Napoléon III"],
  ["Culture générale", "Quel roi de France était surnommé le « Roi-Soleil » ?", "Louis XIV", "Louis XVI", "François Ier", "Henri IV"],
  ["Culture générale", "Quel paquebot a coulé en 1912 après avoir heurté un iceberg ?", "Le Titanic", "Le Lusitania", "Le Queen Mary", "Le Normandie"],
  ["Culture générale", "Combien de secondes compte une heure ?", "3 600", "1 000", "6 000", "360"],
  ["Culture générale", "Quel fleuve traverse l'Égypte ?", "Le Nil", "Le Congo", "Le Niger", "Le Zambèze"],
  ["Culture générale", "Combien de cases compte un échiquier ?", "64", "48", "81", "100"],
  ["Culture générale", "Aux échecs, quelle pièce se déplace uniquement en diagonale ?", "Le fou", "La tour", "Le cavalier", "Le roi"],
  ["Culture générale", "À quelle température l'eau bout-elle au niveau de la mer ?", "100 °C", "90 °C", "120 °C", "80 °C"],
  ["Culture générale", "Quelle vitamine le corps fabrique-t-il grâce au soleil ?", "La vitamine D", "La vitamine C", "La vitamine A", "La vitamine B12"],
  ["Culture générale", "Quel oiseau pond les plus gros œufs ?", "L'autruche", "L'aigle", "Le cygne", "Le pélican"],
  ["Culture générale", "Combien d'années compte un millénaire ?", "1 000", "100", "10 000", "500"],
  ["Culture générale", "Combien de joueurs compte une partie de bridge ?", "4", "2", "3", "6"],
  ["Culture générale", "Quel animal est surnommé « le roi de la jungle » ?", "Le lion", "Le tigre", "Le gorille", "L'éléphant"],
  ["Culture générale", "Quelle est la note qui suit « do » dans la gamme ?", "Ré", "Mi", "Si", "Sol"],
  ["Géographie", "Quel est le plus haut sommet de France ?", "Le mont Blanc", "Le Vignemale", "La Barre des Écrins", "Le puy de Sancy"],
  ["Géographie", "Quelle est la capitale de la Suisse ?", "Berne", "Zurich", "Genève", "Lausanne"],
  ["Géographie", "Quelle est la capitale de la Turquie ?", "Ankara", "Istanbul", "Izmir", "Antalya"],
  ["Géographie", "Quelle est la capitale du Brésil ?", "Brasília", "Rio de Janeiro", "São Paulo", "Salvador"],
  ["Géographie", "Quelle est la capitale de l'Argentine ?", "Buenos Aires", "Santiago", "Montevideo", "Lima"],
  ["Géographie", "Quelle est la capitale de la Norvège ?", "Oslo", "Stockholm", "Helsinki", "Copenhague"],
  ["Géographie", "Quelle est la capitale de la Pologne ?", "Varsovie", "Cracovie", "Prague", "Budapest"],
  ["Géographie", "Quelle est la capitale de l'Égypte ?", "Le Caire", "Alexandrie", "Louxor", "Assouan"],
  ["Géographie", "Quelle est la capitale du Sénégal ?", "Dakar", "Bamako", "Abidjan", "Conakry"],
  ["Géographie", "Quelle est la capitale de l'Inde ?", "New Delhi", "Bombay", "Calcutta", "Bangalore"],
  ["Géographie", "Quelle est la capitale de la Corée du Sud ?", "Séoul", "Busan", "Pyongyang", "Tokyo"],
  ["Géographie", "Quelle est la capitale du Mexique ?", "Mexico", "Cancún", "Guadalajara", "Monterrey"],
  ["Géographie", "Dans quel pays se trouve le Taj Mahal ?", "L'Inde", "Le Pakistan", "L'Iran", "Le Népal"],
  ["Géographie", "Dans quel pays se trouve le temple d'Angkor Vat ?", "Le Cambodge", "La Thaïlande", "Le Viêt Nam", "Le Laos"],
  ["Géographie", "Dans quelle ville se trouve le Colisée ?", "Rome", "Athènes", "Naples", "Florence"],
  ["Géographie", "Dans quelle ville se trouve la Sagrada Família ?", "Barcelone", "Madrid", "Séville", "Valence"],
  ["Géographie", "Quel est le plus grand pays d'Amérique du Sud ?", "Le Brésil", "L'Argentine", "Le Pérou", "La Colombie"],
  ["Géographie", "Quel est le plus grand pays d'Afrique en superficie ?", "L'Algérie", "Le Nigeria", "L'Égypte", "L'Afrique du Sud"],
  ["Géographie", "Quel détroit sépare l'Espagne du Maroc ?", "Le détroit de Gibraltar", "Le détroit du Bosphore", "Le pas de Calais", "Le détroit de Messine"],
  ["Géographie", "Dans quel océan se trouve Madagascar ?", "L'océan Indien", "L'océan Atlantique", "L'océan Pacifique", "L'océan Arctique"],
  ["Géographie", "Dans quel pays se trouve la ville de Porto ?", "Le Portugal", "L'Espagne", "L'Italie", "Le Brésil"],
  ["Géographie", "Quelle ville est surnommée « la capitale des Gaules » ?", "Lyon", "Paris", "Marseille", "Bordeaux"],
  ["Géographie", "Dans quelle ville siège officiellement le Parlement européen ?", "Strasbourg", "Bruxelles", "Luxembourg", "Genève"],
  ["Géographie", "Dans quelle région se trouve le Mont-Saint-Michel ?", "La Normandie", "La Bretagne", "Les Pays de la Loire", "Les Hauts-de-France"],
  ["Géographie", "Quels fleuves se rejoignent à Lyon ?", "Le Rhône et la Saône", "La Seine et la Marne", "La Loire et le Cher", "La Garonne et la Dordogne"],
  ["Géographie", "Sur quel continent se trouve le désert de Gobi ?", "L'Asie", "L'Afrique", "L'Amérique", "L'Océanie"],
  ["Géographie", "Quelle île est surnommée « l'île de Beauté » ?", "La Corse", "La Réunion", "La Martinique", "La Sardaigne"],
  ["Géographie", "Dans quel pays se trouve la ville de Cracovie ?", "La Pologne", "La République tchèque", "La Hongrie", "L'Autriche"],
  ["Cinéma et séries", "Dans « Harry Potter », comment s'appelle la chouette de Harry ?", "Hedwige", "Croûtard", "Pattenrond", "Errol"],
  ["Cinéma et séries", "Qui a réalisé « Pulp Fiction » ?", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "David Fincher"],
  ["Cinéma et séries", "Dans « Le Roi Lion », comment s'appelle l'oncle de Simba ?", "Scar", "Rafiki", "Zazu", "Pumbaa"],
  ["Cinéma et séries", "Dans « Aladdin », comment s'appelle le singe d'Aladdin ?", "Abu", "Iago", "Rajah", "Sébastien"],
  ["Cinéma et séries", "Dans « Toy Story », comment s'appelle le jouet cosmonaute ?", "Buzz l'Éclair", "Woody", "Rex", "Zurg"],
  ["Cinéma et séries", "Dans « Ratatouille », comment s'appelle le rat cuisinier ?", "Rémy", "Émile", "Linguini", "Gusteau"],
  ["Cinéma et séries", "Quelle actrice joue Hermione dans les films « Harry Potter » ?", "Emma Watson", "Emma Stone", "Keira Knightley", "Natalie Portman"],
  ["Cinéma et séries", "Quel acteur joue Forrest Gump ?", "Tom Hanks", "Tom Cruise", "Kevin Costner", "Robin Williams"],
  ["Cinéma et séries", "Dans « Friends », quel est le métier de Ross ?", "Paléontologue", "Cuisinier", "Acteur", "Masseur"],
  ["Cinéma et séries", "Dans « Breaking Bad », quel est le surnom de Walter White ?", "Heisenberg", "Le Professeur", "Le Chimiste", "Scarface"],
  ["Cinéma et séries", "Quel acteur joue Wolverine dans les films « X-Men » ?", "Hugh Jackman", "Chris Hemsworth", "Ryan Reynolds", "Russell Crowe"],
  ["Cinéma et séries", "Pour quel film Leonardo DiCaprio a-t-il remporté son premier Oscar ?", "The Revenant", "Titanic", "Inception", "Le Loup de Wall Street"],
  ["Cinéma et séries", "Quel studio japonais a produit « Le Voyage de Chihiro » ?", "Le studio Ghibli", "Toei Animation", "Pixar", "Sunrise"],
  ["Cinéma et séries", "Quel acteur joue James Bond dans « Casino Royale » sorti en 2006 ?", "Daniel Craig", "Pierce Brosnan", "Sean Connery", "Roger Moore"],
  ["Cinéma et séries", "Dans « Retour vers le futur », quelle voiture sert de machine à voyager dans le temps ?", "Une DeLorean", "Une Ford Mustang", "Une Cadillac", "Une Coccinelle"],
  ["Cinéma et séries", "Dans « Les Visiteurs », qui joue Jacquouille la Fripouille ?", "Christian Clavier", "Jean Reno", "Gérard Depardieu", "Thierry Lhermitte"],
  ["Cinéma et séries", "Dans « Le Dîner de cons », comment s'appelle le personnage joué par Jacques Villeret ?", "François Pignon", "Pierre Brochant", "Juste Leblanc", "Marlène Sasseur"],
  ["Cinéma et séries", "Qui a réalisé « Le Fabuleux Destin d'Amélie Poulain » ?", "Jean-Pierre Jeunet", "Luc Besson", "Jacques Audiard", "Cédric Klapisch"],
  ["Cinéma et séries", "Comment s'appelle le chien d'Obélix ?", "Idéfix", "Milou", "Rantanplan", "Pluto"],
  ["Musique", "Qui chante « La Bohème » ?", "Charles Aznavour", "Jacques Brel", "Serge Gainsbourg", "Michel Sardou"],
  ["Musique", "Qui chante « Ne me quitte pas » ?", "Jacques Brel", "Charles Aznavour", "Georges Brassens", "Léo Ferré"],
  ["Musique", "De quel pays vient Shakira ?", "La Colombie", "Le Mexique", "L'Espagne", "L'Argentine"],
  ["Musique", "Qui chante « Single Ladies » ?", "Beyoncé", "Rihanna", "Alicia Keys", "Shakira"],
  ["Musique", "Qui chante « Bad Romance » ?", "Lady Gaga", "Katy Perry", "Madonna", "Britney Spears"],
  ["Musique", "Qui chante « Toxic » ?", "Britney Spears", "Christina Aguilera", "Lady Gaga", "Dua Lipa"],
  ["Musique", "Avec quel duo français Pharrell Williams chante-t-il « Get Lucky » ?", "Daft Punk", "Justice", "Air", "Cassius"],
  ["Musique", "Qui chante « Je veux » ?", "Zaz", "Louane", "Indila", "Vianney"],
  ["Musique", "Qui chante « Dernière danse » ?", "Indila", "Zaz", "Louane", "Angèle"],
  ["Musique", "Combien de touches compte un piano standard ?", "88", "76", "96", "64"],
  ["Musique", "Quel célèbre compositeur est devenu sourd ?", "Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Frédéric Chopin", "Jean-Sébastien Bach"],
  ["Musique", "Qui a composé « Les Quatre Saisons » ?", "Antonio Vivaldi", "Jean-Sébastien Bach", "Joseph Haydn", "Giuseppe Verdi"],
  ["Musique", "De quel pays vient le reggae ?", "La Jamaïque", "Cuba", "Le Brésil", "Haïti"],
  ["Musique", "Qui chante « Imagine » ?", "John Lennon", "Paul McCartney", "Elton John", "Bob Dylan"],
  ["Musique", "Qui chante « Like a Prayer » ?", "Madonna", "Cyndi Lauper", "Whitney Houston", "Tina Turner"],
  ["Musique", "Quel groupe chante « Tout le bonheur du monde » ?", "Sinsemilia", "Tryo", "Louise Attaque", "Indochine"],
  ["Musique", "Quel rappeur a sorti l'album « Civilisation » en 2021 ?", "Orelsan", "Nekfeu", "Booba", "PNL"],
  ["Musique", "Quel duo de frères chante « Dommage » ?", "Bigflo et Oli", "PNL", "Daft Punk", "Justice"],
  ["Sport", "Combien de minutes dure un match de NBA, hors prolongations ?", "48", "40", "60", "90"],
  ["Sport", "Combien de joueurs par équipe sur un terrain de handball ?", "7", "6", "5", "11"],
  ["Sport", "Dans quel sport s'illustre Antoine Dupont ?", "Le rugby", "Le football", "Le handball", "Le judo"],
  ["Sport", "Dans quel sport s'illustre Léon Marchand ?", "La natation", "L'athlétisme", "Le cyclisme", "Le tennis"],
  ["Sport", "Dans quel sport s'illustre Victor Wembanyama ?", "Le basket", "Le volley", "Le handball", "Le tennis"],
  ["Sport", "Quel pays a remporté la Coupe du monde de football 2022 ?", "L'Argentine", "La France", "Le Brésil", "La Croatie"],
  ["Sport", "Quel pays a remporté la Coupe du monde de football 2018 ?", "La France", "La Croatie", "La Belgique", "L'Allemagne"],
  ["Sport", "Combien de tournois du Grand Chelem compte le tennis chaque année ?", "4", "3", "5", "6"],
  ["Sport", "Sur quelle surface se joue le tournoi de Wimbledon ?", "Le gazon", "La terre battue", "Le dur", "La moquette"],
  ["Sport", "Quelle distance mesure un marathon ?", "42,195 km", "40 km", "21,1 km", "50 km"],
  ["Sport", "Combien de points vaut une transformation au rugby ?", "2", "3", "1", "5"],
  ["Sport", "Dans quelle ville se trouve le stade Vélodrome ?", "Marseille", "Lyon", "Bordeaux", "Lille"],
  ["Sport", "De quel pays le judo est-il originaire ?", "Le Japon", "La Chine", "La Corée du Sud", "La Thaïlande"],
  ["Sport", "Combien d'anneaux figurent sur le drapeau olympique ?", "5", "4", "6", "7"],
  ["Sport", "Dans quel sport utilise-t-on une crosse et un palet sur la glace ?", "Le hockey sur glace", "Le curling", "Le patinage", "Le bobsleigh"],
  ["Pop culture", "Comment s'appelle le frère de Mario ?", "Luigi", "Wario", "Toad", "Yoshi"],
  ["Pop culture", "Dans Pokémon, quel est le type de Salamèche ?", "Feu", "Eau", "Plante", "Électrik"],
  ["Pop culture", "Quelle console Nintendo est sortie en 2017 ?", "La Switch", "La Wii", "La Game Boy", "La GameCube"],
  ["Pop culture", "Quelle entreprise a créé Windows ?", "Microsoft", "Apple", "IBM", "Google"],
  ["Pop culture", "Qui a fondé Amazon ?", "Jeff Bezos", "Elon Musk", "Bill Gates", "Steve Jobs"],
  ["Pop culture", "Quelle marque de voitures a pour logo un cheval cabré sur fond jaune ?", "Ferrari", "Lamborghini", "Maserati", "Alfa Romeo"],
  ["Pop culture", "Quelle marque a pour logo une virgule ?", "Nike", "Adidas", "Puma", "Reebok"],
  ["Pop culture", "Quelle maison de luxe a pour logo deux C entrelacés ?", "Chanel", "Dior", "Hermès", "Cartier"],
  ["Pop culture", "Comment s'appelle le chien de Tintin ?", "Milou", "Idéfix", "Pluto", "Rantanplan"],
  ["Pop culture", "Comment s'appelle la mère dans « Les Simpson » ?", "Marge", "Lisa", "Maggie", "Patty"],
  ["Pop culture", "Quel personnage de Nintendo est une boule rose qui aspire ses ennemis ?", "Kirby", "Yoshi", "Donkey Kong", "Toad"],
  ["Pop culture", "De quel pays vient la marque Ikea ?", "La Suède", "Le Danemark", "La Norvège", "La Finlande"],
  ["Pop culture", "De quel pays vient le sushi ?", "Le Japon", "La Chine", "La Corée du Sud", "La Thaïlande"],
  ["Pop culture", "De quel pays vient la paella ?", "L'Espagne", "Le Portugal", "L'Italie", "Le Mexique"],
  ["Pop culture", "Quel fromage est indispensable à une tartiflette ?", "Le reblochon", "Le comté", "Le camembert", "Le roquefort"],
  ["Pop culture", "Quel fruit est au cœur d'une tarte Tatin ?", "La pomme", "La poire", "L'abricot", "La pêche"],
  ["Pop culture", "Quel youtubeur a créé la course automobile GP Explorer ?", "Squeezie", "Inoxtag", "Michou", "Cyprien"]
].map(([cat, q, a, ...w]) => ({ q, a, w, cat }));
