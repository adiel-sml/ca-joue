/* Contenu des jeux ajoutés : Le lieu secret, Le plus susceptible de, Ordre de grandeur, Le faux dictionnaire, Mot pour mot */
const L = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);
const P = s => L(s).map(l => l.split("|").map(x => x.trim()));

/* Le lieu secret : un lieu par carte */
export const SPY_PLACES = L(`
Hôpital
Plage
Avion
Sous-marin
Station spatiale
Cirque
Casino
Prison
École primaire
Lycée
Université
Bibliothèque
Musée
Zoo
Aquarium
Ferme
Boulangerie
Supermarché
Pharmacie
Banque
Bureau de poste
Commissariat
Caserne de pompiers
Gare
Aéroport
Métro
Bus de nuit
Taxi
Bateau de croisière
Ferry
Yacht
Voilier
Train de nuit
Téléphérique
Station de ski
Refuge de montagne
Camping
Plateau de télévision
Studio de radio
Cinéma
Théâtre
Opéra
Salle de concert
Festival de musique
Boîte de nuit
Bar à cocktails
Pub irlandais
Restaurant étoilé
Fast-food
Pizzeria
Restaurant de sushis
Food truck
Salon de thé
Café parisien
Brasserie
Cave à vin
Vignoble
Microbrasserie
Chocolaterie
Fromagerie
Boucherie
Poissonnerie
Marché aux puces
Marché de Noël
Fête foraine
Parc d'attractions
Manège
Grande roue
Maison hantée
Château fort
Palais royal
Cathédrale
Monastère
Cimetière
Mairie
Tribunal
Parlement
Ambassade
Base militaire
Champ de bataille
Tranchée
Bateau pirate
Île déserte
Jungle
Désert
Oasis
Pôle Nord
Banquise
Igloo
Volcan
Grotte
Mine de charbon
Puits de pétrole
Plateforme pétrolière
Phare
Port de pêche
Chantier naval
Chantier de construction
Usine automobile
Entrepôt
Centrale nucléaire
Laboratoire de recherche
Observatoire
Planétarium
Fusée
Base lunaire
Vaisseau extraterrestre
Salle d'opération
Urgences
Maternité
Cabinet du dentiste
Cabinet du vétérinaire
Maison de retraite
Crèche
Salle de classe
Cour de récréation
Cantine
Internat
Colonie de vacances
Salle de sport
Piscine municipale
Patinoire
Stade de football
Court de tennis
Terrain de golf
Bowling
Salle d'escalade
Ring de boxe
Circuit de Formule 1
Hippodrome
Arène de corrida
Piste de ski
Club de plongée
Spa
Hammam
Sauna
Salon de coiffure
Institut de beauté
Salon de tatouage
Cabine d'essayage
Boutique de luxe
Centre commercial
Magasin de meubles
Animalerie
Fleuriste
Librairie
Magasin de jouets
Magasin de bricolage
Garage
Station-service
Station de lavage
Auto-école
Parking souterrain
Autoroute
Péage
Aire d'autoroute
Pont suspendu
Tunnel sous la Manche
Ascenseur
Escalator
Toit d'immeuble
Gratte-ciel
Cave
Grenier
Cuisine
Salle de bain
Chambre d'hôtel
Hôtel de luxe
Auberge de jeunesse
Chambre d'hôtes
Cabane dans les arbres
Chalet
Yourte
Péniche
Moulin
Ranch
Saloon
Mine d'or
Train à vapeur
Diligence
Pyramide
Temple grec
Colisée
Muraille de Chine
Tour Eiffel
Statue de la Liberté
Mont-Saint-Michel
Château de Versailles
Venise
Las Vegas
Hollywood
Bollywood
Mariage
Enterrement
Baptême
Anniversaire d'enfant
Enterrement de vie de célibataire
Réveillon du Nouvel An
Soirée déguisée
Bal masqué
Croisière dansante
Remise des diplômes
Cérémonie des Oscars
Défilé de mode
Salon de l'automobile
Vente aux enchères
Salle de jeux vidéo
Escape game
Laser game
Karaoké
Salle de réunion
Open space
Usine de bonbons
Atelier de couture
Atelier d'artiste
Galerie d'art
Studio photo
Studio d'enregistrement
Tournage de film
Coulisses d'un concert
Loge d'acteur
Salle des fêtes
Kermesse
Fête de village
Bal du 14 Juillet
Feu de camp
Pique-nique
Barbecue entre voisins
Jardin potager
Serre tropicale
Jardin botanique
Parc national
Safari
Réserve naturelle
Forêt tropicale
Montagne enneigée
Lac gelé
Rivière en canoë
Cascade
Station balnéaire
Bateau-mouche
Gondole
Train fantôme
Labyrinthe de maïs
Ferme pédagogique
Écurie
Poulailler
Ruche
Bergerie
Cuisine d'un restaurant
Plonge d'un restaurant
Salle de garde
Ambulance
Hélicoptère
Montgolfière
Parachute
Dirigeable
Navette spatiale
Salle des machines d'un navire
Cockpit d'avion
Tour de contrôle
Douane
Bureau des objets trouvés
Laverie
Salle d'attente
Office de tourisme
Agence immobilière
Agence de voyages
Cabinet d'avocat
Salle de rédaction d'un journal
Imprimerie
Centre d'appels
Salle de serveurs
Quartier général secret
Bunker
Sous-sol d'un château
Prison de haute sécurité
Île d'Alcatraz
Arche de Noé
Titanic
Pays des merveilles
Usine du Père Noël
Pôle Sud
Village gaulois
Poudlard
`);

/* Le plus susceptible de : la carte complète « Qui est le plus susceptible de… ». Épicé = séduction, +18 = sexualité. */
export const MOST = {
 soft: L(`
rater son train à cause d'un croissant
parler à son chat comme à un adulte
répondre à un message trois semaines plus tard
arriver en pyjama à une visio importante
pleurer en regardant une pub de Noël
se lever à 5 h du matin pour faire du sport
acheter un objet inutile en promotion
entrer dans une pièce et oublier pourquoi
se tromper de prénom en saluant quelqu'un
vider le frigo d'un ami sans demander
commander exactement le même plat à chaque fois
finir le paquet de chips en une soirée
connaître toutes les paroles d'un générique de dessin animé
se perdre dans son propre quartier
garder ses tickets de caisse pendant des années
se disputer avec un GPS
ranger ses chaussettes par couleur
faire la conversation à son reflet dans les vitrines
chanter faux avec une totale confiance
se faire piquer par une méduse dès le premier jour de vacances
devenir le meilleur ami du serveur en une soirée
faire une sieste de quatre heures un dimanche
envoyer un vocal de dix minutes
rire au mauvais moment pendant une réunion
annuler un plan au dernier moment
arriver avec une heure d'avance à l'aéroport
arriver à l'aéroport quand l'embarquement est fini
prendre trois valises pour un week-end
partir en vacances sans brosse à dents
se brûler la langue avec un café
mettre son pull à l'envers sans s'en rendre compte
manger le dessert avant le plat
regarder toute une série en un week-end
lire la fin d'un livre en premier
pleurer à la fin d'un film d'animation
adopter une plante et l'oublier
nommer ses plantes vertes
mettre un réveil toutes les cinq minutes
dormir avec une peluche
avoir peur d'un papillon
crier en voyant une araignée
tomber dans une piscine avec ses vêtements
glisser sur une plaque de verglas
renverser son verre en racontant une histoire
raconter la même anecdote deux fois dans la soirée
oublier la chute de sa propre blague
se faire reconnaître par sa voix au téléphone
avoir une playlist pour chaque humeur
faire des photos de tous ses plats
passer une heure à choisir un film
abandonner un film au bout de cinq minutes
devenir accro à un jeu sur son téléphone
gagner au loto et ne pas s'en rendre compte
oublier son code de carte bancaire
payer pour tout le monde sans rien dire
faire les soldes à l'ouverture du magasin
revenir de vacances avec un accent
revenir de vacances avec un animal
ramener des souvenirs pour tout le monde
faire un discours émouvant à un mariage
chanter au karaoké sans qu'on le lui demande
organiser une fête surprise parfaite
gâcher une fête surprise sans le vouloir
oublier où sa voiture est garée
appeler ses parents tous les jours
avoir le plus de photos dans son téléphone
garder ses jouets d'enfance
collectionner des objets bizarres
apprendre une langue juste pour un voyage
lancer un podcast
ouvrir une chaîne de cuisine
devenir prof de ski
s'inscrire à un marathon sans s'entraîner
finir un marathon en marchant
faire du yoga au bureau
manger une pizza entière sans partager
tester tous les restaurants de la ville
refuser de goûter un nouveau plat
mettre du ketchup partout
boire dix cafés par jour
ne jamais boire d'eau
avoir toujours des chewing-gums sur soi
avoir toujours une batterie de secours
avoir toujours un parapluie
oublier son parapluie dans le métro
se faire voler son vélo
tomber en panne d'essence
réparer n'importe quoi avec du scotch
monter un meuble sans lire la notice
casser un meuble en le montant
repeindre son appartement en couleurs vives
déménager tous les deux ans
vivre dans une maison remplie de plantes
adopter un perroquet
apprendre à jongler pendant le confinement
connaître tous les voisins de son immeuble
se faire inviter partout
connaître le prénom de tous les serveurs du quartier
négocier le prix au marché
se faire arnaquer par un vendeur de souvenirs
acheter une montre de luxe
faire des économies pendant des années pour un voyage
partir en voyage sur un coup de tête
rater une correspondance à l'autre bout du monde
dormir dans un aéroport
parler à des inconnus dans le train
se faire un ami dans une file d'attente
trouver un billet de 50 € par terre
gagner une tombola
gagner un concours de pétanque
tricher au Monopoly
bouder après avoir perdu au Uno
inventer ses propres règles de jeu
faire la lecture des règles pendant vingt minutes
ouvrir la piste de danse
quitter la soirée sans dire au revoir
rester jusqu'à la fermeture
s'endormir sur le canapé d'un ami
prendre un bain de minuit
faire du camping sauvage
survivre une semaine dans la nature sans aide
se faire mordre par un moustique toute la nuit
attraper un coup de soleil en hiver
oublier sa crème solaire
faire un château de sable géant
nager avec des dauphins
sauter en parachute pour ses 40 ans
monter sur le Kilimandjaro
traverser l'Atlantique en voilier
écrire un roman pendant les vacances
peindre un tableau qui finit au salon
apprendre la guitare et abandonner
jouer du piano à une soirée
remporter un concours de cuisine
rater une recette simple
faire brûler des pâtes
inventer une recette improbable
manger des céréales le soir
manger froid les restes de la veille au petit-déjeuner
regarder des vidéos de chats pendant une heure
avoir un compte pour son animal sur les réseaux
devenir célèbre grâce à une vidéo ratée
faire le buzz sans le vouloir
lancer une mode dans le groupe
porter des chaussettes dépareillées exprès
s'habiller en noir de la tête aux pieds
s'acheter des baskets en édition limitée
garder le même vêtement préféré pendant dix ans
changer de coupe de cheveux tous les mois
se teindre les cheveux en rose
porter des lunettes de soleil la nuit
mettre trois heures à se préparer
se préparer en cinq minutes
être en retard à son propre anniversaire
organiser son anniversaire un mois à l'avance
oublier l'anniversaire de sa mère
envoyer des cartes postales à tout le monde
écrire des lettres à la main
tenir un journal intime depuis l'enfance
garder tous les messages de ses amis
supprimer toutes ses photos sur un coup de tête
se désinscrire des réseaux pour une semaine
craquer et revenir sur les réseaux au bout d'un jour
passer sa vie dans les commentaires
lire les conditions d'utilisation en entier
tout planifier dans un tableau
faire des listes pour tout
perdre ses listes de courses
partir faire les courses et revenir sans rien
acheter du chocolat à chaque passage en caisse
manger le chocolat de l'Avent en un jour
décorer son sapin dès le mois de novembre
porter un pull de Noël moche fièrement
se déguiser à chaque occasion
avoir le meilleur costume d'Halloween
faire peur à tout le monde à Halloween
avoir peur du noir
dormir avec la lumière allumée
regarder un film d'horreur les yeux fermés
crier pendant un film d'horreur
chasser les fantômes dans un vieux château
croire aux extraterrestres
voir un OVNI
se faire tirer les cartes
lire son horoscope tous les matins
devenir guide touristique
connaître l'histoire de chaque monument
poser des questions au guide pendant une heure
se perdre dans un musée
toucher une œuvre d'art interdite
prendre la pose devant chaque statue
faire des selfies dans tous les ascenseurs
se coincer dans un ascenseur
monter les escaliers en courant
arriver à bout de souffle au rendez-vous
courir après un bus et le rater
s'endormir dans le bus et rater son arrêt
parler pendant son sommeil
faire du somnambulisme
ronfler en camping
se réveiller sans réveil
rester au lit tout un dimanche
faire le ménage à 2 h du matin
ranger de façon obsessionnelle
trouver de l'argent dans une vieille poche
se faire couper les cheveux par un ami
se couper la frange soi-même
garder son sang-froid en cas d'urgence
paniquer pour un rien
appeler les pompiers pour un chat dans un arbre
sauver un animal blessé
adopter un chien de refuge
avoir une ferme plus tard
cultiver ses propres légumes
faire son pain soi-même
fabriquer ses propres meubles
réparer sa voiture sans garagiste
partir vivre à la campagne
partir vivre dans une grande ville
vivre dans un pays où il fait toujours chaud
apprendre le japonais
parler à des touristes perdus
servir de traducteur avec les mains
inventer des mots
faire des jeux de mots toute la soirée
rire de ses propres jeux de mots
imiter tout le monde
imiter des accents à la perfection
faire un sketch improvisé
monter sur scène sans répéter
devenir humoriste
gagner un débat sans avoir raison
changer d'avis en cours de discussion
défendre une cause perdue
adopter une cause écologique
trier ses déchets avec passion
faire un potager sur son balcon
se mettre au vélo pour aller travailler
acheter une trottinette électrique
tomber de sa trottinette
apprendre à faire du roller adulte
faire une chute en patins à glace
gagner une course en sac
battre un record du monde absurde
manger le plus de crêpes à la Chandeleur
réussir à faire sauter une crêpe
inviter tout le monde chez soi à l'improviste
cuisiner pour vingt personnes sans stresser
oublier un ingrédient essentiel dans sa recette
servir un gâteau raté avec fierté
faire une tarte pour chaque anniversaire
mettre de la musique dès le réveil
danser en faisant la vaisselle
chanter sous la douche à pleine voix
se faire réveiller par ses voisins
devenir ami avec ses voisins
organiser la fête des voisins
lancer une pétition dans son immeuble
se plaindre du bruit chez les autres
faire du bruit à 3 h du matin
recevoir les colis de tout l'immeuble
commander en ligne tous les jours
retourner la moitié de ses achats
faire la queue pendant des heures pour un concert
camper devant un magasin pour une sortie
`),
 hot: L(`
tomber amoureux ou amoureuse en une soirée
draguer quelqu'un dans une file d'attente
envoyer un message à son ex après minuit
recevoir le plus de messages de drague cette semaine
avoir un crush secret sur quelqu'un ici
se remettre avec son ex
avoir trois rendez-vous galants le même week-end
oublier le prénom de son rendez-vous
faire une déclaration d'amour en public
demander quelqu'un en mariage au bout de trois mois
se faire draguer par un serveur
draguer le barman pour avoir un verre gratuit
embrasser quelqu'un sous le gui
embrasser un inconnu à minuit le soir du Nouvel An
avoir le plus d'ex
rester ami avec tous ses ex
bloquer un ex sur tous les réseaux
liker par erreur une vieille photo de son crush
espionner le profil d'un nouveau crush pendant une heure
écrire un message de drague et ne jamais l'envoyer
faire relire ses messages de drague à ses amis
tomber sous le charme d'un accent étranger
vivre une histoire d'amour de vacances
craquer pour son prof de ski
craquer pour un ami de longue date
être le crush secret de quelqu'un ici
recevoir une lettre d'amour anonyme
écrire un poème pour séduire
chanter une sérénade sous une fenêtre
danser un slow collé-serré avec un inconnu
faire le premier pas
attendre que l'autre fasse le premier pas pendant des mois
avoir un rendez-vous à l'aveugle
s'inscrire sur toutes les applis de rencontre
avoir le meilleur profil sur une appli
mettre une photo de son chien pour séduire
mentir sur sa taille sur une appli
séduire quelqu'un avec sa cuisine
séduire quelqu'un avec ses blagues
séduire quelqu'un avec un regard
rougir à chaque compliment
faire des compliments à tout le monde
avoir un faible pour les personnes en uniforme
tomber amoureux ou amoureuse de la mauvaise personne
avoir un crush sur une célébrité depuis dix ans
écrire à une célébrité sur les réseaux
se faire offrir des fleurs au travail
offrir des fleurs le premier soir
préparer un dîner aux chandelles
organiser le week-end romantique parfait
oublier la Saint-Valentin
fêter la Saint-Valentin en grand
se marier à Las Vegas
se fiancer en voyage
avoir un coup de foudre dans le métro
échanger son numéro dans un train
donner un faux numéro
laisser son numéro sur une serviette en papier
draguer en boîte avec une danse
draguer en citant des répliques de film
se faire draguer pendant un enterrement de vie de célibataire
séduire un témoin de mariage
danser avec tous les invités d'un mariage
craquer pour un collègue
avoir une histoire secrète au bureau
flirter avec le ou la partenaire d'un ami sans s'en rendre compte
rendre quelqu'un jaloux exprès
être jaloux ou jalouse d'un simple like
fouiller le téléphone de son partenaire
envoyer « Tu dors ? » à son crush
parler de son ex au premier rendez-vous
pleurer pour une histoire d'amour qui n'a jamais commencé
avoir un ex qui revient tous les six mois
se faire larguer par message
larguer quelqu'un par message
inventer une excuse pour quitter un rendez-vous
fuir un rendez-vous par la fenêtre des toilettes
payer l'addition en cachette pour impressionner
commander le plat le plus cher au premier rendez-vous
oublier son portefeuille au premier rendez-vous
arriver en retard à un premier rendez-vous
faire un bisou sur la joue pour dire au revoir à un premier rendez-vous
faire un câlin à tout le monde en soirée
tomber sous le charme d'une voix au téléphone
avoir le meilleur regard séducteur
faire le meilleur clin d'œil
avoir le plus beau sourire de la soirée
avoir toujours un mot doux à dire
écrire des messages romantiques interminables
envoyer des cœurs à tout le monde
appeler son crush par un surnom ridicule
avoir un surnom de couple gênant
s'embrasser en public sans gêne
tenir la main de son partenaire partout
faire une scène de jalousie en soirée
se réconcilier en dansant
finir en couple avec un ami d'enfance
retrouver son premier amour sur les réseaux
recontacter un ancien camarade de classe pour flirter
garder une boîte avec les souvenirs de ses ex
écouter des chansons tristes après une rupture
faire une liste des qualités de son crush
rêver de son crush toutes les nuits
rougir en entendant le prénom de son crush
inventer une excuse pour croiser son crush
s'habiller pour plaire à quelqu'un en particulier
changer de look après une rupture
partir en voyage pour oublier un ex
avoir un crush sur son voisin d'en face
draguer quelqu'un à la salle de sport
draguer dans un supermarché
draguer à la bibliothèque
draguer en vacances dans une autre langue
séduire quelqu'un grâce à sa playlist
se mettre en couple après une seule soirée
dire « je t'aime » le premier
dire « je t'aime » trop tôt
présenter son partenaire à ses parents au bout d'une semaine
emménager ensemble au bout d'un mois
avoir une relation à distance
traverser le pays pour un rendez-vous
envoyer des fleurs à quelqu'un jamais rencontré
craquer pour quelqu'un juste en lisant ses messages
se laisser séduire par un poème
avoir une collection de lettres d'amour
se faire offrir un bijou en gage d'amour
préparer un anniversaire de couple digne d'un film
préparer une surprise romantique ratée
faire une déclaration en chanson
séduire quelqu'un en dansant la salsa
séduire quelqu'un en jouant de la guitare
garder le parfum de son crush en mémoire
reconnaître son ex à son parfum dans la rue
craquer pour quelqu'un qui ne le mérite pas
donner une deuxième chance à un ex
donner une troisième chance à un ex
croire au coup de foudre
croire à l'âme sœur
se marier avec son premier amour
se marier plusieurs fois
organiser un mariage de rêve
pleurer à chaque mariage
attraper le bouquet de la mariée
draguer à un mariage avant le dessert
être la personne la plus romantique du groupe
être le plus jaloux ou la plus jalouse du groupe
avoir le cœur d'artichaut
avoir un nouveau coup de cœur chaque mois
garder ses sentiments secrets pendant des années
se déclarer par lettre manuscrite
envoyer un vocal de déclaration
draguer en faisant semblant de chercher son chemin
faire semblant de connaître une chanson pour plaire
faire semblant d'aimer le foot pour plaire
apprendre une danse pour séduire
prendre des cours de cuisine pour impressionner son crush
rougir en recevant un message
répondre en une seconde à son crush
attendre exprès une heure avant de répondre à son crush
passer pour quelqu'un de mystérieux
séduire avec de l'humour noir
séduire sans rien dire
avoir le plus de succès en soirée
se faire offrir le plus de verres
recevoir des compliments d'inconnus
se faire aborder dans la rue
aborder quelqu'un dans la rue
se faire draguer par quelqu'un de célèbre
avoir le béguin pour un personnage de série
pleurer devant une comédie romantique
connaître toutes les comédies romantiques par cœur
rejouer une scène de film romantique en vrai
embrasser sous la pluie comme au cinéma
faire une demande en mariage au restaurant
faire une demande en mariage ratée
dire non à une demande en mariage
avoir une bague de fiançailles cachée dans un tiroir
planifier son mariage avant d'être en couple
choisir les prénoms de ses futurs enfants au premier rendez-vous
parler de mariage au troisième rendez-vous
avoir un plan de séduction en dix étapes
réussir un plan de séduction
échouer à un plan de séduction de façon spectaculaire
se faire caser par ses amis
caser tous ses amis
jouer les entremetteurs
organiser un rendez-vous entre deux personnes du groupe
se tromper de destinataire pour un message romantique
envoyer un message tendre à sa mère par erreur
mettre son crush en fond d'écran
avoir une photo de son ex encore dans son téléphone
garder un vêtement d'un ex
porter le pull de son partenaire
voler les sweats de son partenaire
faire un câlin de dix minutes sans bouger
s'endormir dans les bras de quelqu'un au cinéma
regarder les étoiles pour séduire
emmener son rendez-vous au sommet d'une colline
prévoir un pique-nique romantique
oublier la nappe et les verres au pique-nique romantique
se faire surprendre en train d'embrasser quelqu'un
embrasser quelqu'un devant toute sa famille
draguer le frère ou la sœur d'un ami
vivre son premier amour en colonie de vacances
avoir eu le plus de crushs au lycée
avoir écrit le prénom de son crush sur son agenda
avoir fait une déclaration à la récré
écrire des mots doux en plein cours
séduire avec ses fossettes
séduire avec ses yeux
séduire avec sa voix
avoir une voix qui fait craquer au téléphone
réussir le meilleur slow de la soirée
inviter quelqu'un à danser sans oser parler
laisser un mot doux sur un pare-brise
écrire son numéro sur la main de quelqu'un
offrir sa veste à quelqu'un qui a froid
raccompagner quelqu'un jusqu'à sa porte
oser un bisou volé
faire un bisou sur le nez
dire des mots doux en plusieurs langues
apprendre « je t'aime » dans dix langues
avoir un coup de cœur pour quelqu'un rencontré en voyage
garder le contact avec un amour de vacances
traverser le monde pour retrouver quelqu'un
vivre une histoire digne d'un film
se marier en secret
avoir une relation que personne ne soupçonne
cacher un crush à ses meilleurs amis
avouer son crush après trois verres
rougir dès qu'on parle d'amour
devenir guimauve en couple
disparaître de la circulation dès le début d'une histoire d'amour
afficher son couple partout sur les réseaux
publier une photo de couple chaque jour
supprimer toutes les photos après une rupture
avoir une playlist de rupture
avoir une playlist de séduction
draguer quelqu'un dans un ascenseur
se faire offrir un verre par un inconnu ce soir
recevoir un message de son crush pendant ce jeu
draguer en utilisant une phrase d'accroche nulle et réussir
écrire « tu me manques » à quelqu'un ce soir
se faire inviter à danser par un inconnu
rendre jaloux son ex avec une photo
faire un câlin trop long pour être amical
garder les yeux dans les yeux de quelqu'un pendant une minute
embrasser quelqu'un sur une grande roue
draguer un DJ pour passer sa chanson
se laisser séduire par quelqu'un de beaucoup plus jeune
se laisser séduire par quelqu'un de beaucoup plus âgé
avoir un crush sur le témoin de mariage
séduire quelqu'un en lui préparant un cocktail
inviter son crush à un concert pour lui plaire
offrir un livre avec une dédicace romantique
écrire une chanson pour son crush
murmurer un compliment à l'oreille d'un inconnu
draguer avec un compliment sur les chaussures
retrouver un ancien flirt dans une soirée
avoir un rendez-vous galant dans un musée
transformer une amitié en histoire d'amour
avouer ses sentiments par message vocal à 2 h du matin
oser le premier bisou dès le premier rendez-vous
`),
 x18: L(`
coucher le premier soir
avoir un sex friend en ce moment
avoir le plus de partenaires du groupe
avoir déjà fait un plan à trois
proposer un plan à trois ce soir
faire l'amour dans un lieu public
se faire surprendre en plein acte
avoir un sextoy dans sa table de nuit
offrir un sextoy pour un anniversaire
regarder du porno au travail
envoyer des nudes à la mauvaise personne
avoir des photos osées dans son téléphone
faire un strip-tease en soirée
faire l'amour dans une voiture
faire l'amour dans un avion
faire l'amour dans une cabine d'essayage
faire l'amour sous la douche chez des amis
faire du bruit au point d'alerter les voisins
recevoir une plainte des voisins pour le bruit
coucher avec un ex
coucher avec un collègue
coucher avec deux personnes du même groupe d'amis
coucher avec un inconnu en vacances
avoir un coup d'un soir ce week-end
oublier le prénom d'un coup d'un soir
partir au petit matin sans réveiller l'autre
faire l'amour trois fois dans la même nuit
tester une position du Kamasutra
se blesser en testant une position
aller dans un club libertin
avoir déjà tenté l'échangisme
avoir un fantasme d'uniforme
porter de la lingerie sous une tenue sage
ne pas porter de sous-vêtements ce soir
faire l'amour avec les yeux bandés
utiliser des menottes
donner la fessée
aimer recevoir la fessée
avoir un fantasme inavouable sur quelqu'un ici
avoir couché avec quelqu'un de célèbre
faire l'amour dans un ascenseur
faire l'amour à l'hôtel uniquement pour la vue
réserver une chambre d'hôtel pour une heure
faire l'amour dans une forêt
faire l'amour sur une plage la nuit
se faire surprendre par ses parents
se faire surprendre par ses colocs
avoir un suçon visible au travail lundi
simuler pour que ça s'arrête
parler crûment au lit
rire au mauvais moment au lit
s'endormir pendant les préliminaires
appeler quelqu'un du mauvais prénom au lit
envoyer un message coquin pendant un repas de famille
faire un appel vidéo coquin
avoir une vie sexuelle débordante en ce moment
traverser une longue période de désert
battre un record de durée
battre un record de rapidité
lire des romans érotiques en cachette
connaître toutes les positions par leur nom
avoir une playlist pour faire l'amour
faire l'amour en musique très fort
avoir des courbatures après une nuit
avoir des griffures dans le dos
se réveiller à côté d'un inconnu
faire une soirée à thème coquine
jouer au strip-poker
perdre au strip-poker exprès
avoir un club de lecture érotique
acheter de la lingerie pour quelqu'un d'autre
faire l'amour dans la cuisine
faire l'amour sur la machine à laver
casser un lit
faire tomber un cadre en faisant l'amour
faire l'amour pendant une soirée chez des amis
s'éclipser d'un mariage pour un moment coquin
avoir une histoire avec un témoin de mariage
coucher avec quelqu'un rencontré le soir même sur une appli
avoir un plan régulier secret
coucher avec son voisin
coucher avec son prof de sport
avoir une aventure avec quelqu'un en couple
faire l'amour au travail après les heures
faire l'amour dans un cinéma
faire l'amour dans une tente sous l'orage
faire l'amour dans un jacuzzi
faire l'amour dans un sauna
oser un massage érotique
faire un massage qui finit au lit
utiliser de la chantilly au lit
utiliser des glaçons au lit
se filmer avec son partenaire
envoyer un message torride au mauvais groupe de discussion
écrire un message coquin en se trompant de destinataire
faire un lap dance à son partenaire
recevoir un lap dance en enterrement de vie de célibataire
aller voir un spectacle de strip-tease
monter sur scène pendant un spectacle de strip-tease
faire l'amour avant un entretien d'embauche
faire l'amour pendant la pause déjeuner
faire l'amour le matin avant le travail
dire non à une nuit et le regretter
dire oui à une nuit et le regretter
avoir un fantasme avec un personnage de dessin animé
avoir un fantasme avec un prof
proposer un jeu de rôle coquin
jouer au docteur version adulte
avoir déjà fait un rêve érotique avec quelqu'un ici
avoir un rêve érotique cette nuit
connaître le meilleur sex-shop de la ville
acheter un sextoy en ligne au bureau
faire livrer un sextoy chez ses parents par erreur
se faire offrir des menottes en cadeau
garder des menottes dans sa voiture
s'être déjà fait attacher au lit
faire l'amour dans un train de nuit
faire l'amour dans un camping-car
faire l'amour dans une piscine d'hôtel
se faire virer d'une piscine pour comportement coquin
se faire surprendre par un agent de sécurité
faire l'amour dans un parc
faire l'amour sur un toit
avoir le plus d'imagination au lit
avoir le plus d'endurance du groupe
être insatiable
préférer les préliminaires à tout le reste
faire l'amour en silence chez ses beaux-parents
faire l'amour pendant que des invités dorment à côté
faire l'amour dans le lit de quelqu'un d'autre
coucher avec quelqu'un uniquement pour son physique
coucher avec quelqu'un pour le rendre jaloux
coucher avec quelqu'un juste pour oublier un ex
avoir un plan à trois avec deux amis
tomber amoureux ou amoureuse d'un sex friend
transformer un coup d'un soir en mariage
coucher avec son ex le soir de la rupture
faire l'amour pour se réconcilier
se disputer exprès pour l'amour de réconciliation
avoir une liste de fantasmes écrite
réaliser un fantasme cette année
proposer quelque chose d'osé au deuxième rendez-vous
avoir un tatouage à un endroit intime
avoir un piercing caché
se promener sans sous-vêtements
prendre une photo coquine dans une cabine d'essayage
envoyer une photo coquine pendant une réunion
recevoir une photo coquine en plein repas
faire l'amour dans un lieu historique
faire l'amour dans un château
faire l'amour dans une cabane dans les arbres
faire l'amour dans une grange
faire l'amour dans un champ de blé
faire l'amour sur un bateau
faire l'amour dans une gondole à Venise
faire l'amour au sommet d'une montagne
faire l'amour dans un refuge plein de randonneurs
réveiller tout un camping
faire l'amour à côté d'une fête
avoir des voisins qui applaudissent
dormir dans le plus simple appareil chez des amis
passer la journée sans vêtements chez soi
faire le ménage en sous-vêtements
cuisiner en tablier et rien d'autre
ouvrir la porte au livreur en peignoir
ouvrir la porte au livreur sans haut
se faire surprendre sans vêtements par un voisin
faire un bain de minuit sans maillot
aller sur une plage naturiste
faire du naturisme en vacances
coucher avec quelqu'un rencontré au supermarché
coucher avec quelqu'un rencontré à la salle de sport
coucher avec un barman après la fermeture
coucher avec un moniteur de ski
avoir une aventure avec un guide de voyage
séduire quelqu'un uniquement pour une nuit
avoir le meilleur coup de reins, selon la rumeur
avoir les meilleurs baisers dans le cou
faire les meilleurs massages
mordiller un peu trop fort
laisser des marques de dents
avoir une voix qui change au lit
crier un prénom trop fort
avoir besoin de musique pour faire l'amour
faire l'amour devant une série
s'arrêter en plein moment pour regarder son téléphone
répondre au téléphone pendant l'amour
recevoir un appel de sa mère au pire moment
oublier de fermer la porte à clé
se faire surprendre par son animal
avoir un chat qui regarde pendant l'amour
faire l'amour dans chaque pièce d'une maison
inaugurer chaque nouvel appartement de la même façon
coucher avec quelqu'un rencontré à un mariage
avoir une collection de lingerie
porter une tenue coquine sous un manteau
faire une surprise coquine à son partenaire au travail
envoyer un sextoy télécommandé à son partenaire
porter un sextoy télécommandé en soirée
faire l'amour dans les toilettes d'une boîte de nuit
faire l'amour sur une terrasse d'hôtel
faire l'amour sous une couverture devant un feu de cheminée
faire l'amour à la belle étoile
découvrir une nouvelle position cette semaine
avoir une appli de positions sur son téléphone
lire le Kamasutra en entier
offrir le Kamasutra en cadeau
se réveiller avec une gueule de bois et un suçon
ne pas se souvenir de la nuit dernière
se réveiller dans le mauvais lit
partager un lit avec deux personnes
dormir avec un ex en toute amitié
faire la cuillère avec un ami
rougir en relisant ses propres messages coquins
écrire les messages les plus chauds
avoir le plus de conversations coquines en cours
avoir une deuxième appli de rencontre secrète
avoir un profil coquin en ligne
faire un strip-tease par appel vidéo
se déshabiller du regard en soirée
draguer en parlant directement de sexe
oser une proposition indécente
accepter une proposition indécente
faire un jeu à boire coquin
perdre un vêtement à chaque gage
finir la soirée en sous-vêtements
avoir une nuit torride cette semaine
coucher avec quelqu'un d'ici un jour
avoir déjà regretté une nuit dès le réveil
recommander un sextoy à ses amis
faire un cadeau coquin à son ex
recevoir un cadeau coquin au bureau
faire l'amour dans une salle d'attente
faire l'amour dans un vestiaire
faire l'amour dans une bibliothèque
faire l'amour dans un hammam
faire l'amour dans une loge de concert
faire l'amour sur le capot d'une voiture
faire l'amour dans une chambre d'étudiant
se faire arrêter par la police en plein moment coquin
dire des mots crus au premier rendez-vous
envoyer un nude dès le premier soir
garder des nudes d'un ex
supprimer ses nudes dans la panique
faire une sieste coquine au travail
s'éclipser du bureau pour un rendez-vous coquin
réserver un hôtel coquin pour un anniversaire
offrir une nuit d'hôtel coquine en cadeau
avoir un fantasme de plage déserte
avoir un fantasme de plombier
avoir un fantasme de pompier
faire un jeu de rôle d'inconnus dans un bar
envoyer une photo coquine à son partenaire en pleine journée de travail
proposer un jeu de cartes coquin à son partenaire
gagner à tous les jeux coquins
perdre à tous les jeux coquins exprès
apprendre une danse de cabaret pour son partenaire
prendre des cours de pole dance
faire une pole dance improvisée en soirée
porter un body sous ses vêtements
faire l'amour en se regardant dans un miroir
avoir un miroir au plafond
`)
};

/* Ordre de grandeur : question | réponse | unité (« année » pour une date) */
export const NUM_Q = P(`
En quelle année Christophe Colomb a-t-il atteint l'Amérique ? | 1492 | année
En quelle année Napoléon a-t-il été sacré empereur ? | 1804 | année
En quelle année a eu lieu la bataille de Waterloo ? | 1815 | année
En quelle année a commencé la Première Guerre mondiale ? | 1914 | année
En quelle année a été signé l'armistice de la Première Guerre mondiale ? | 1918 | année
En quelle année a commencé la Seconde Guerre mondiale ? | 1939 | année
En quelle année a eu lieu le débarquement en Normandie ? | 1944 | année
En quelle année la Seconde Guerre mondiale s'est-elle terminée en Europe ? | 1945 | année
En quelle année la tour Eiffel a-t-elle été inaugurée ? | 1889 | année
En quelle année les frères Wright ont-ils réalisé leur premier vol motorisé ? | 1903 | année
En quelle année Louis XIV est-il mort ? | 1715 | année
En quelle année Louis XVI a-t-il été exécuté ? | 1793 | année
En quelle année Charlemagne a-t-il été couronné empereur ? | 800 | année
En quelle année a eu lieu la bataille d'Hastings ? | 1066 | année
En quelle année Jeanne d'Arc est-elle morte à Rouen ? | 1431 | année
En quelle année a eu lieu la bataille de Marignan ? | 1515 | année
En quelle année l'esclavage a-t-il été définitivement aboli en France ? | 1848 | année
En quelle année les Françaises ont-elles obtenu le droit de vote ? | 1944 | année
En quelle année a été votée la loi de séparation des Églises et de l'État ? | 1905 | année
En quelle année la peine de mort a-t-elle été abolie en France ? | 1981 | année
En quelle année les pièces et billets en euros sont-ils arrivés dans nos poches ? | 2002 | année
En quelle année Youri Gagarine est-il devenu le premier homme dans l'espace ? | 1961 | année
En quelle année le premier iPhone a-t-il été présenté ? | 2007 | année
En quelle année Facebook a-t-il été créé ? | 2004 | année
En quelle année Google a-t-il été fondé ? | 1998 | année
En quelle année YouTube a-t-il été lancé ? | 2005 | année
En quelle année est née la Cinquième République ? | 1958 | année
En quelle année les États-Unis ont-ils déclaré leur indépendance ? | 1776 | année
En quelle année a eu lieu la révolution russe ? | 1917 | année
En quelle année a eu lieu le grand krach boursier de Wall Street ? | 1929 | année
En quelle année Nelson Mandela a-t-il été libéré de prison ? | 1990 | année
En quelle année a été organisé le premier Tour de France ? | 1903 | année
En quelle année ont eu lieu les premiers Jeux olympiques modernes ? | 1896 | année
En quelle année est sorti le premier film « Star Wars » ? | 1977 | année
En quelle année est sorti le film « Titanic » de James Cameron ? | 1997 | année
En quelle année est sorti le premier film « Harry Potter » ? | 2001 | année
En quelle année est sorti le premier livre « Harry Potter » en anglais ? | 1997 | année
En quelle année est sorti le premier « Toy Story » ? | 1995 | année
En quelle année est sorti le dessin animé « Le Roi Lion » de Disney ? | 1994 | année
En quelle année est sorti « Blanche-Neige et les Sept Nains » de Disney ? | 1937 | année
En quelle année la série « Friends » a-t-elle été diffusée pour la première fois ? | 1994 | année
En quelle année est sortie la première Game Boy ? | 1989 | année
En quelle année Mickey Mouse est-il apparu pour la première fois ? | 1928 | année
En quelle année Elvis Presley est-il mort ? | 1977 | année
En quelle année Michael Jackson est-il mort ? | 2009 | année
En quelle année est né Mozart ? | 1756 | année
En quelle année est né Victor Hugo ? | 1802 | année
En quelle année Napoléon est-il mort ? | 1821 | année
En quelle année le tunnel sous la Manche a-t-il été inauguré ? | 1994 | année
En quelle année Disneyland Paris a-t-il ouvert ses portes ? | 1992 | année
En quelle année le premier TGV a-t-il transporté des voyageurs ? | 1981 | année
En quelle année Notre-Dame de Paris a-t-elle brûlé ? | 2019 | année
En quelle année Elizabeth II a-t-elle été couronnée ? | 1953 | année
En quelle année Elizabeth II est-elle morte ? | 2022 | année
En quelle année Graham Bell a-t-il déposé le brevet du téléphone ? | 1876 | année
En quelle année les frères Lumière ont-ils organisé leur première projection publique payante ? | 1895 | année
En quelle année Alexander Fleming a-t-il découvert la pénicilline ? | 1928 | année
En quelle année Louis Pasteur a-t-il vacciné pour la première fois un enfant contre la rage ? | 1885 | année
En quelle année Louis XIV est-il né ? | 1638 | année
En quelle année Constantinople a-t-elle été prise par les Ottomans ? | 1453 | année
En quelle année la tombe de Toutânkhamon a-t-elle été découverte ? | 1922 | année
En quelle année a eu lieu le premier Festival de Cannes ? | 1946 | année
En quelle année a eu lieu le premier concours de l'Eurovision ? | 1956 | année
En quelle année Tintin est-il apparu pour la première fois ? | 1929 | année
En quelle année Astérix est-il apparu pour la première fois ? | 1959 | année
En quelle année est sorti le jeu « Super Mario Bros. » ? | 1985 | année
En quelle année le jeu « Tetris » a-t-il été créé ? | 1984 | année
En quelle année est sortie la version complète de « Minecraft » ? | 2011 | année
En quelle année sont sortis les premiers jeux Pokémon au Japon ? | 1996 | année
En quelle année Instagram a-t-il été lancé ? | 2010 | année
En quelle année Wikipédia a-t-elle été lancée ? | 2001 | année
En quelle année le premier SMS a-t-il été envoyé ? | 1992 | année
En quelle année est sorti le premier Walkman de Sony ? | 1979 | année
En quelle année le Rubik's Cube a-t-il été inventé ? | 1974 | année
En quelle année la poupée Barbie a-t-elle été lancée ? | 1959 | année
En quelle année le métro de Paris a-t-il été inauguré ? | 1900 | année
En quelle année le Louvre est-il devenu un musée ? | 1793 | année
En quelle année la statue de la Liberté a-t-elle été inaugurée ? | 1886 | année
En quelle année a été réalisée la première greffe du cœur ? | 1967 | année
En quelle année est né le premier bébé conçu par fécondation in vitro ? | 1978 | année
En quelle année Victor Hugo est-il mort ? | 1885 | année
En quelle année Édith Piaf est-elle morte ? | 1963 | année
En quelle année Johnny Hallyday est-il mort ? | 2017 | année
En quelle année est sorti l'album « Thriller » de Michael Jackson ? | 1982 | année
En quelle année ABBA a-t-il gagné l'Eurovision ? | 1974 | année
En quelle année est sortie la chanson « Bohemian Rhapsody » ? | 1975 | année
En quelle année est sorti le film « Intouchables » ? | 2011 | année
En quelle année est sorti le film « Bienvenue chez les Ch'tis » ? | 2008 | année
En quelle année est sorti le film « Les Visiteurs » ? | 1993 | année
En quelle année est sorti « Le Fabuleux Destin d'Amélie Poulain » ? | 2001 | année
En quelle année est sorti le film « Jurassic Park » ? | 1993 | année
En quelle année est sorti le film « E.T. l'extraterrestre » ? | 1982 | année
En quelle année est sorti le film « Retour vers le futur » ? | 1985 | année
En quelle année est sorti le film « Avatar » ? | 2009 | année
En quelle année est sorti le film « La Reine des neiges » ? | 2013 | année
En quelle année est sorti le film « Barbie » de Greta Gerwig ? | 2023 | année
En quelle année la série « Les Simpson » a-t-elle commencé ? | 1989 | année
En quelle année la série « Game of Thrones » a-t-elle commencé ? | 2011 | année
En quelle année la série « Squid Game » est-elle sortie ? | 2021 | année
En quelle année la série « Stranger Things » est-elle sortie ? | 2016 | année
En quelle année Coluche a-t-il créé les Restos du Cœur ? | 1985 | année
En quelle année a eu lieu le premier Téléthon en France ? | 1987 | année
En quelle année le Concorde a-t-il commencé ses vols commerciaux ? | 1976 | année
En quelle année Marie Curie a-t-elle reçu son premier prix Nobel ? | 1903 | année
En quelle année a été construit le mur de Berlin ? | 1961 | année
En quelle année ont eu lieu les attentats du 11 septembre aux États-Unis ? | 2001 | année
En quelle année Thomas Edison a-t-il mis au point son ampoule électrique ? | 1879 | année
En quelle année la pyramide du Louvre a-t-elle été inaugurée ? | 1989 | année
Combien de cartes compte un jeu de tarot ? | 78 |
Combien de cartes compte un jeu de belote ? | 32 |
Combien de dominos compte un jeu classique ? | 28 |
Combien de jetons de lettres compte un Scrabble en français, jokers compris ? | 102 |
Combien de cases compte un plateau de Scrabble ? | 225 |
Combien de cases compte un plateau de Monopoly ? | 40 |
Combien de pions chaque joueur a-t-il au début d'une partie de dames ? | 20 |
Combien de cases compte un damier de jeu de dames ? | 100 |
Combien de cordes compte un violon ? | 4 |
Combien de cordes compte une harpe de concert ? | 47 |
Combien de joueurs par équipe sur un terrain de baseball ? | 9 |
Combien de joueurs par équipe dans l'eau au water-polo ? | 7 |
Combien de joueurs par équipe sur la glace au hockey, gardien compris ? | 6 |
Combien de mètres mesure une piscine olympique ? | 50 | mètres
À quelle hauteur se trouve un panier de basket ? | 3.05 | mètres
Combien de mètres mesure un court de tennis en longueur ? | 23.77 | mètres
À quelle hauteur se trouve le filet de volley-ball chez les hommes ? | 2.43 | mètres
À combien de mètres du but se tire un penalty au football ? | 11 | mètres
Combien de secondes compte une journée ? | 86400 |
Combien de minutes compte une journée ? | 1440 |
Combien d'heures compte une année qui n'est pas bissextile ? | 8760 |
Combien de semaines complètes compte une année ? | 52 |
Combien de zéros compte un milliard ? | 9 |
Combien de côtés a un dodécagone ? | 12 |
Combien de degrés fait la somme des angles d'un triangle ? | 180 | degrés
Combien de faces a un icosaèdre ? | 20 |
Combien de sommets a un cube ? | 8 |
Quelle est la valeur de pi arrondie au centième ? | 3.14 |
Quelle est la racine carrée de 144 ? | 12 |
Combien font 17 fois 23 ? | 391 |
Combien de litres contient un mètre cube ? | 1000 | litres
Combien de centimètres compte un kilomètre ? | 100000 | centimètres
Combien de centilitres contient une bouteille de vin standard ? | 75 | centilitres
Combien de centilitres contient une canette de soda standard ? | 33 | centilitres
Combien de bouteilles standard contient un magnum ? | 2 | bouteilles
Combien de bouteilles standard contient un jéroboam de champagne ? | 4 | bouteilles
Quelle est la température normale du corps humain ? | 37 | °C
Combien de cavités compte un cœur humain ? | 4 |
Combien de dents de lait a un enfant ? | 20 | dents
Combien de paires de côtes a un être humain ? | 12 | paires
Combien de litres de sang circulent environ dans le corps d'un adulte ? | 5 | litres
Combien de chromosomes compte une cellule humaine ? | 46 |
Combien de bras a une pieuvre ? | 8 |
Combien de bosses a un dromadaire ? | 1 |
Combien de mois dure environ la gestation d'une éléphante ? | 22 | mois
Combien de mois dure environ la gestation d'une vache ? | 9 | mois
Quelle est l'altitude du mont Everest ? | 8849 | mètres
Combien de marches faut-il gravir pour atteindre le sommet de la tour Eiffel ? | 1665 | marches
Combien de départements compte la France ? | 101 |
Combien de régions compte la France, outre-mer compris ? | 18 |
Combien de pays compte l'Union européenne ? | 27 |
Combien de pays sont membres de l'ONU ? | 193 |
Combien de pays compte l'Afrique ? | 54 |
Combien d'étoiles compte le drapeau des États-Unis ? | 50 |
Combien d'étoiles compte le drapeau européen ? | 12 |
Combien d'arrondissements compte Paris ? | 20 |
Combien d'arrondissements compte Marseille ? | 16 |
Combien d'arrondissements compte Lyon ? | 9 |
Combien de millions d'habitants compte la France, environ ? | 68 | millions
Combien de milliards d'humains vivent sur Terre, environ ? | 8 | milliards
Quelle est la distance moyenne entre la Terre et la Lune ? | 384400 | km
Quelle est la distance moyenne entre la Terre et le Soleil, en millions de kilomètres ? | 150 | millions de km
Combien de kilomètres parcourt la lumière en une seconde, environ ? | 300000 | km
À quelle vitesse se déplace le son dans l'air, environ ? | 340 | mètres par seconde
Quelle est la circonférence de la Terre à l'équateur ? | 40075 | km
Quel est l'âge de l'univers, en milliards d'années ? | 13.8 | milliards d'années
Quel est l'âge de la Terre, en milliards d'années ? | 4.5 | milliards d'années
Combien de lunes tournent autour de Mars ? | 2 |
Combien de jours terrestres dure une année sur Mars ? | 687 | jours
Combien de minutes met la lumière du Soleil pour atteindre la Terre, environ ? | 8 | minutes
Combien d'astronautes ont marché sur la Lune ? | 12 |
Combien de missions Apollo se sont posées sur la Lune ? | 6 |
Quelle est la hauteur de la Burj Khalifa à Dubaï ? | 828 | mètres
Quelle est la hauteur de la statue de la Liberté, socle compris ? | 93 | mètres
Quelle était la hauteur de la pyramide de Khéops à sa construction, environ ? | 146 | mètres
Combien de kilomètres mesure le tunnel sous la Manche, environ ? | 50 | km
Quelle est la hauteur totale du viaduc de Millau ? | 343 | mètres
Quelle est la superficie de Monaco, environ ? | 2 | km²
Combien d'États compte l'Australie ? | 6 |
Combien de provinces compte le Canada ? | 10 |
Combien de cantons compte la Suisse ? | 26 |
Combien de pays ont une frontière terrestre avec la France métropolitaine ? | 8 |
Combien de langues officielles compte la Suisse ? | 4 |
Quelle est la hauteur de la tour Montparnasse ? | 210 | mètres
Quelle est l'altitude du mont Fuji ? | 3776 | mètres
Quelle est l'altitude du Kilimandjaro ? | 5895 | mètres
Quelle est l'altitude du puy de Dôme ? | 1465 | mètres
Quelle est la profondeur maximale du lac Baïkal ? | 1642 | mètres
Combien d'îles compte la Polynésie française ? | 118 | îles
Combien de livres compte la saga « Harry Potter » ? | 7 |
Combien de films compte la saga « Harry Potter » ? | 8 |
Combien de saisons compte la série « Friends » ? | 10 |
Combien d'épisodes compte la série « Friends » ? | 236 |
Combien de saisons compte « Game of Thrones » ? | 8 |
Combien de dalmatiens dans le titre du célèbre dessin animé Disney ? | 101 |
Combien de fantômes poursuivent Pac-Man ? | 4 |
Combien de Pokémon compte la toute première génération ? | 151 |
Combien de cases compte une grille de sudoku ? | 81 |
Combien de petits carrés colorés compte un Rubik's Cube classique ? | 54 |
Combien de pièces compte un jeu d'échecs complet ? | 32 |
Combien de joueurs participent au jeu dans la première saison de « Squid Game » ? | 456 |
Combien de symboles figurent sur chaque carte de Dobble ? | 8 |
Combien de cartes compte un jeu de Dobble ? | 55 |
Combien d'Oscars a remportés le film « Titanic » ? | 11 |
Combien de minutes dure le film « Titanic » ? | 194 | minutes
Dans combien de films James Bond Daniel Craig a-t-il joué l'agent 007 ? | 5 |
Combien de symphonies Beethoven a-t-il composées ? | 9 |
Combien de notes différentes compte une gamme majeure ? | 7 |
Combien de lignes compte une portée de musique ? | 5 |
Combien de cordes a un ukulélé classique ? | 4 |
Combien de vers compte un sonnet ? | 14 |
Combien de syllabes compte un alexandrin ? | 12 |
Combien de voyelles compte l'alphabet français ? | 6 |
Combien de tomes compte « À la recherche du temps perdu » de Proust ? | 7 |
En combien de jours Phileas Fogg doit-il faire le tour du monde chez Jules Verne ? | 80 | jours
Combien de kilocalories apporte un gramme de matières grasses ? | 9 | kilocalories
Combien de championnats du monde de Formule 1 Lewis Hamilton a-t-il gagnés ? | 7 |
Combien de fois Rafael Nadal a-t-il gagné Roland-Garros ? | 14 |
Combien de Ballons d'or Lionel Messi a-t-il remportés ? | 8 |
Combien de titres du Grand Chelem en simple Serena Williams a-t-elle gagnés ? | 23 |
Combien de médailles d'or olympiques Michael Phelps a-t-il gagnées ? | 23 |
Combien de mètres mesure un tour de piste d'athlétisme ? | 400 | mètres
Quel est le record du monde du 100 mètres d'Usain Bolt ? | 9.58 | secondes
Combien d'étapes compte le Tour de France ? | 21 | étapes
Combien de Coupes du monde de football la France a-t-elle gagnées ? | 2 |
Combien de Coupes du monde de football le Brésil a-t-il gagnées ? | 5 |
Combien de minutes dure un match de handball, hors prolongations ? | 60 | minutes
Combien de minutes dure un match de rugby, hors arrêts de jeu ? | 80 | minutes
Combien de quilles faut-il faire tomber au bowling ? | 10 |
Quel est le score maximal d'une partie de bowling ? | 300 | points
Quel est le score maximal avec trois fléchettes ? | 180 | points
Combien de jeux faut-il gagner, au minimum, pour remporter un set de tennis ? | 6 |
Combien de caractères pouvait contenir un tweet à ses débuts ? | 140 | caractères
Quel est le numéro d'urgence européen ? | 112 |
Quel est le numéro du SAMU ? | 15 |
Quel est le numéro des pompiers ? | 18 |
Combien de députés siègent à l'Assemblée nationale ? | 577 |
Combien de sénateurs siègent au Sénat ? | 348 |
Combien d'années dure le mandat du président de la République française ? | 5 | ans
Combien de pièces compte le château de Versailles, environ ? | 2300 | pièces
Combien de miroirs compte la galerie des Glaces de Versailles ? | 357 | miroirs
Combien de centimètres mesure une feuille A4 en hauteur ? | 29.7 | cm
Combien de centimètres mesure une feuille A4 en largeur ? | 21 | cm
Combien de grammes pèse une feuille A4 ordinaire ? | 5 | grammes
Combien de valeurs différentes de pièces en euros existe-t-il ? | 8 |
Combien de grammes pèse une pièce de 2 euros ? | 8.5 | grammes
Combien de litres contient un baril de pétrole ? | 159 | litres
Combien de mètres mesure un mile ? | 1609 | mètres
Combien de centimètres mesure un pouce ? | 2.54 | cm
Combien de mètres mesure un mille marin ? | 1852 | mètres
À combien de degrés Fahrenheit correspond 0 °C ? | 32 | °F
À combien de degrés Fahrenheit correspond 100 °C ? | 212 | °F
Combien d'yeux ont la plupart des araignées ? | 8 |
Combien d'ailes a une abeille ? | 4 |
Combien de pattes a un crabe, pinces comprises ? | 10 |
Combien de compartiments compte l'estomac d'une vache ? | 4 |
Combien de bras ont la plupart des étoiles de mer ? | 5 |
Combien de jours dure environ la gestation d'une chatte ? | 65 | jours
Combien de cornes a un rhinocéros blanc ? | 2 |
Combien de joueurs compte une équipe de football américain sur le terrain ? | 11 |
Combien de kilomètres mesure la Seine, environ ? | 777 | km
Combien de ponts traversent la Seine dans Paris ? | 37 | ponts
Combien d'heures de décalage horaire y a-t-il entre Paris et New York, en temps normal ? | 6 | heures
Combien d'heures de décalage horaire y a-t-il entre Paris et Tokyo en hiver ? | 8 | heures
Combien d'habitants compte Paris, en millions, environ ? | 2.1 | millions
Combien de couleurs compte le drapeau de l'Allemagne ? | 3 |
Combien de feuilles a un trèfle porte-bonheur ? | 4 | feuilles
`).map(([q, a, u]) => ({ q, a: +a, u: u || "" }));

/* Le faux dictionnaire : mot | vraie définition */
export const DICO = P(`
Callipyge | Qui a de belles fesses.
Billevesée | Propos vide de sens, idée creuse.
Brimborion | Petit objet sans valeur.
Cacochyme | D'une santé faible et chancelante.
Coquecigrue | Idée absurde, baliverne.
Croquignolet | Petit, mignon et un peu ridicule.
Galimatias | Discours confus et incompréhensible.
Jactance | Attitude de quelqu'un qui se vante.
Logorrhée | Flot de paroles excessif et incontrôlé.
Nyctalope | Qui voit dans l'obscurité.
Oripeaux | Vieux vêtements voyants et usés.
Palinodie | Changement complet d'opinion.
Pusillanime | Qui manque de courage et d'audace.
Quolibet | Plaisanterie moqueuse lancée à quelqu'un.
Rodomontade | Vantardise, fanfaronnade.
Sycophante | Délateur, dénonciateur hypocrite.
Abscons | Difficile à comprendre.
Atrabilaire | D'humeur sombre et irritable.
Bisbille | Petite querelle pour un motif futile.
Caboulot | Petit café mal fréquenté.
Chafouin | Qui a une mine sournoise.
Ébaubi | Très étonné, stupéfait.
Esbaudir | S'esbaudir : se réjouir bruyamment.
Falbala | Ornement de robe excessif et voyant.
Fifrelin | Chose de très peu de valeur.
Gabegie | Désordre causé par une mauvaise gestion.
Hâbleur | Qui aime se vanter en exagérant.
Ichtyophage | Qui se nourrit de poisson.
Incunable | Livre imprimé avant l'an 1501.
Jocrisse | Benêt qui se laisse mener par le bout du nez.
Lambrequin | Bordure découpée qui orne le haut d'une fenêtre.
Matutinal | Qui se rapporte au matin.
Nitescence | Lueur, éclat.
Obombrer | Couvrir d'ombre.
Pandiculation | Fait de s'étirer en bâillant.
Ripopée | Mélange de restes de vins ; ouvrage fait de morceaux mal assortis.
Sesquipédal | Se dit d'un mot très long.
Tintinnabuler | Résonner comme une petite clochette.
Zinzolin | D'une couleur violet rougeâtre.
Alacrité | Vivacité joyeuse.
Amphigouri | Écrit ou discours embrouillé et incompréhensible.
Anachorète | Ermite qui vit retiré du monde.
Apophtegme | Parole mémorable exprimée de façon concise.
Aréopage | Assemblée de personnes savantes ou compétentes.
Bélître | Homme de rien, coquin.
Bombance | Repas abondant, festin.
Borborygme | Bruit produit par les gaz dans l'intestin.
Brouillamini | Désordre, confusion.
Calembredaine | Propos extravagant, sornette.
Camouflet | Affront humiliant.
Capilotade | Ragoût de restes ; être en capilotade, c'est être en morceaux.
Carabistouille | Bêtise, baliverne, en Belgique.
Chiasme | Figure de style qui croise deux groupes de mots, comme « il faut manger pour vivre et non vivre pour manger ».
Clabauder | Crier sans raison, médire bruyamment.
Concupiscence | Désir ardent des plaisirs, en particulier sensuels.
Coruscant | Qui brille d'un vif éclat.
Cuistre | Personne pédante et prétentieuse.
Déliquescence | Décadence complète.
Dithyrambe | Éloge enthousiaste et excessif.
Doryphore | Insecte qui dévore les feuilles de pomme de terre.
Écornifleur | Personne qui vit aux dépens des autres.
Émerillonné | Vif, gai, éveillé.
Escarcelle | Grande bourse que l'on portait autrefois à la ceinture.
Estafette | Militaire chargé de porter des messages.
Factotum | Personne qui s'occupe de tout dans une maison.
Farfadet | Petit lutin malicieux.
Fatras | Amas confus de choses.
Flagorneur | Personne qui flatte bassement.
Forban | Pirate, bandit sans scrupules.
Fredaine | Écart de conduite sans gravité.
Gargote | Restaurant bon marché où l'on mange mal.
Godelureau | Jeune homme qui fait le joli cœur.
Goguenard | Moqueur, narquois.
Gougnafier | Bon à rien, rustre.
Grigou | Personne avare.
Haridelle | Cheval maigre et efflanqué.
Hiérophante | Prêtre qui initiait aux mystères dans la Grèce antique.
Hypocoristique | Qui exprime l'affection, comme un diminutif ou un surnom tendre.
Impécunieux | Qui manque d'argent.
Jobard | Naïf, facile à duper.
Lanterner | Perdre son temps à des riens.
Lazzi | Plaisanterie moqueuse, raillerie.
Lendore | Personne lente et comme endormie.
Lippe | Lèvre inférieure épaisse et avancée ; faire la lippe, c'est bouder.
Mâchicoulis | Ouverture au sommet d'une muraille pour jeter des projectiles.
Maraud | Coquin, vaurien.
Marmiteux | Misérable, piteux.
Matamore | Faux brave, vantard.
Mélopée | Chant monotone.
Méphitique | Qui dégage une odeur toxique et répugnante.
Mirliton | Petit instrument fait d'un tube et d'une membrane qui vibre quand on chante dedans.
Mitonner | Faire cuire longtemps à feu doux.
Nasarde | Chiquenaude donnée sur le nez.
Obséquieux | Poli et empressé à l'excès.
Oiseux | Inutile, sans intérêt.
Oronge | Champignon comestible aussi appelé amanite des Césars.
Ostrogoth | Personne grossière qui ignore les bonnes manières.
Palabre | Discussion longue et interminable.
Pantagruélique | Digne d'un appétit énorme.
Parangon | Modèle parfait.
Pendard | Coquin, vaurien.
Pérorer | Parler longuement avec emphase.
Pétaudière | Lieu où règnent la confusion et le désordre.
Pignouf | Personne grossière et mal élevée.
Plumitif | Écrivain médiocre.
Primesautier | Qui agit spontanément, au premier mouvement.
Prodrome | Signe annonciateur d'une maladie ou d'un événement.
Prosélyte | Nouveau converti plein de zèle.
Pyrrhique | Danse guerrière de la Grèce antique.
Ragougnasse | Mauvais ragoût, nourriture peu appétissante.
Rastaquouère | Étranger aux allures de riche, d'une élégance voyante et douteuse.
Ripaille | Repas abondant et joyeux.
Sapajou | Petit singe d'Amérique du Sud.
Saperlipopette | Juron d'autrefois qui exprime la surprise.
Sarabande | Danse ancienne à trois temps, lente et grave.
Scrogneugneu | Exclamation de mauvaise humeur.
Sérendipité | Fait de trouver par hasard ce que l'on ne cherchait pas.
Sicaire | Tueur à gages.
Sinécure | Emploi bien payé qui demande très peu de travail.
Soliveau | Petite poutre ; au figuré, personne sans autorité.
Sottisier | Recueil de sottises.
Spadassin | Tueur à gages, homme d'épée.
Stentor | Personne à la voix très puissante.
Sybarite | Personne qui recherche les plaisirs raffinés.
Talmouse | Pâtisserie garnie de fromage.
Taraud | Outil qui sert à creuser un filetage dans un trou.
Thuriféraire | Flatteur ; à l'origine, celui qui porte l'encensoir.
Trublion | Personne qui sème le trouble.
Turlupiner | Tracasser, tourmenter.
Tutélaire | Qui protège.
Vaticiner | Prédire l'avenir avec emphase.
Velléitaire | Qui a des intentions mais ne passe jamais à l'acte.
Vertugadin | Bourrelet qui élargissait autrefois les jupes au niveau des hanches.
Vétille | Chose insignifiante.
Vitupérer | Blâmer violemment.
Acrimonie | Mauvaise humeur qui s'exprime par des propos aigres.
Adret | Versant d'une montagne exposé au soleil.
Ubac | Versant d'une montagne exposé à l'ombre.
Agélaste | Personne qui ne rit jamais.
Aménité | Amabilité, douceur.
Anamnèse | Récit des antécédents médicaux d'un patient.
Antienne | Discours répété sans cesse.
Apocope | Suppression de la fin d'un mot, comme « ciné » pour « cinéma ».
Aphérèse | Suppression du début d'un mot, comme « bus » pour « autobus ».
Aporie | Difficulté de raisonnement sans issue.
Arlequinade | Bouffonnerie.
Astragale | Os du pied qui s'articule avec le tibia.
Atermoiement | Fait de remettre une décision à plus tard.
Avanie | Affront public, humiliation.
Baragouin | Langage incompréhensible.
Barguigner | Hésiter avant de se décider.
Béjaune | Jeune homme naïf et inexpérimenté.
Blandice | Ce qui séduit et flatte.
Boustrophédon | Écriture qui change de sens à chaque ligne.
Brandon | Torche de paille enflammée.
Cabotin | Comédien qui cherche à se faire remarquer.
Calligramme | Poème dont les vers dessinent une forme.
Cancrelat | Cafard.
Caparaçon | Housse d'ornement posée sur un cheval.
Cataphote | Petit réflecteur de lumière, sur un vélo ou au bord d'une route.
Céruléen | D'un bleu ciel.
Chamarré | Orné de couleurs vives et variées.
Chausse-trape | Piège.
Chenapan | Vaurien, garnement.
Corniaud | Chien bâtard ; au figuré, imbécile.
Courtepointe | Couverture de lit piquée.
Crapoussin | Personne petite et contrefaite.
Croquemitaine | Personnage imaginaire dont on menace les enfants.
Débonnaire | Doux et indulgent.
Déréliction | Sentiment d'abandon et de solitude morale.
Diaphane | Qui laisse passer la lumière sans être transparent.
Dipsomane | Personne qui éprouve un besoin irrésistible de boire de l'alcool.
Émolument | Rémunération.
Empyrée | Partie la plus haute du ciel, séjour des dieux.
Épigone | Successeur ou imitateur sans originalité.
Éristique | Art de la controverse.
Escogriffe | Homme grand et dégingandé.
Esperluette | Le signe &.
Étrille | Brosse en fer qui sert à nettoyer les chevaux.
Euphonie | Succession harmonieuse de sons.
Exégète | Personne qui interprète un texte.
Fanfreluche | Petit ornement de toilette sans valeur.
Fat | Prétentieux, vaniteux.
Félibre | Poète ou écrivain de langue d'oc.
Ferblantier | Artisan qui fabrique des objets en fer-blanc.
Flibustier | Pirate qui écumait la mer des Antilles.
Folliculaire | Mauvais journaliste.
Fouailler | Fouetter.
Friselis | Léger frémissement.
Gandin | Jeune homme élégant et ridicule.
Gaudriole | Plaisanterie grivoise.
Gnognote | Chose sans valeur.
Gorgerin | Partie d'une armure qui protège la gorge.
Grimaud | Mauvais écrivain ; autrefois, écolier ignorant.
Guilledou | Courir le guilledou : chercher des aventures galantes.
Hallebarde | Arme munie d'un long manche et d'un fer pointu et tranchant.
Hapax | Mot qui n'apparaît qu'une seule fois dans un texte.
Hiémal | Qui se rapporte à l'hiver.
Histrion | Comédien médiocre, bouffon.
Holorime | Vers dont tous les sons riment avec ceux du vers suivant.
Hypallage | Figure de style qui attribue un mot à un autre que celui qu'il devrait qualifier.
Idoine | Approprié, qui convient parfaitement.
Inanité | Caractère de ce qui est vain et inutile.
Incoercible | Qu'on ne peut pas contenir.
Ineffable | Qu'on ne peut pas exprimer par des mots.
Jérémiade | Plainte sans fin.
Jouvenceau | Jeune homme.
Lambin | Lent.
Lavallière | Cravate souple nouée en gros nœud.
Logogriphe | Énigme qui consiste à décomposer un mot en d'autres mots.
Lumignon | Bout de mèche qui brûle encore ; petite lampe.
Lupanar | Maison close.
Margoulin | Commerçant peu scrupuleux.
Mascaret | Vague qui remonte un fleuve à la marée montante.
Misonéisme | Hostilité envers toute nouveauté.
Moult | Beaucoup, en grande quantité.
Nonobstant | Malgré.
Obérer | Endetter, accabler de dettes.
Obvie | Qui vient naturellement à l'esprit.
Oaristys | Idylle, conversation tendre entre amoureux.
Ophidien | Serpent.
Ortolan | Petit passereau, autrefois mets raffiné.
Palimpseste | Parchemin effacé puis réécrit.
Panégyrique | Discours à la louange de quelqu'un.
Patenôtre | Prière ; paroles marmonnées.
Pécune | Argent.
Pérégrination | Voyage qui passe par de nombreux lieux.
Philtre | Breuvage magique.
Pléthore | Abondance excessive.
Potron-minet | Dès potron-minet : dès le lever du jour.
Prébende | Revenu attaché à une fonction, souvent sans travail.
Quinaud | Confus, penaud.
Rabelaisien | Truculent, d'une gaieté gaillarde.
Ratiociner | Raisonner de façon trop subtile.
Rémanence | Persistance d'un effet après l'arrêt de sa cause.
Rubicond | Rouge, en parlant d'un visage.
Sabir | Langue faite d'un mélange de plusieurs langues.
Saltimbanque | Artiste de rue, acrobate.
Scolopendre | Mille-pattes venimeux.
Sémillant | Vif, gai et pétillant.
Subreptice | Fait de façon furtive.
Tire-larigot | À tire-larigot : en grande quantité.
Truculent | Haut en couleur, pittoresque.
Turpitude | Conduite honteuse.
Ululer | Crier, en parlant des rapaces nocturnes.
Usufruit | Droit d'utiliser un bien qui appartient à un autre et d'en percevoir les revenus.
Vespéral | Qui se rapporte au soir.
Vilipender | Dénoncer comme méprisable.
Viatique | Provisions ou argent emportés pour un voyage.
Vibrion | Personne agitée ; aussi une bactérie.
Vivandière | Femme qui suivait les troupes pour leur vendre des vivres.
Zélateur | Partisan plein de zèle.
Zygomatique | Qui se rapporte à la pommette.
Anicroche | Petite difficulté imprévue.
Bamboche | Partie de plaisir, fête.
Brocard | Raillerie offensante.
Charivari | Grand tapage, vacarme.
Coloquinte | Plante dont le fruit amer ressemble à une petite courge.
Cornegidouille | Juron favori du Père Ubu.
Esbroufe | Étalage de manières prétentieuses pour impressionner.
Estourbir | Assommer.
Foutraque | Farfelu, un peu fou.
Galopin | Garnement.
Hongre | Cheval castré.
Houspiller | Réprimander vivement.
Maroufle | Colle forte qui sert à fixer une toile peinte.
Mistigri | Nom familier du chat.
Patachon | Mener une vie de patachon : mener une vie dissipée.
Pataquès | Faute de liaison à l'oral ; situation confuse.
Poulbot | Gamin des rues de Montmartre.
Prurit | Démangeaison.
Rogaton | Reste de nourriture.
Sacripant | Vaurien, mauvais garçon.
Tracassin | Humeur inquiète et agitée.
Zigomar | Individu bizarre.
Abstème | Qui ne boit pas d'alcool.
Acéphale | Sans tête.
Albédo | Part de la lumière que réfléchit une surface.
Aquilin | Se dit d'un nez recourbé comme le bec d'un aigle.
Batracien | Amphibien comme la grenouille ou le crapaud.
Bourrelier | Artisan qui fabrique des harnais et des objets en cuir.
Chalcographie | Gravure sur métal.
Cénotaphe | Tombeau vide élevé à la mémoire d'un mort.
Égrillard | Qui aime les propos lestes.
Énamourer | S'énamourer : tomber amoureux.
Éphéméride | Calendrier dont on détache une page chaque jour.
Gâte-sauce | Mauvais cuisinier.
Glaviot | Crachat.
Hippophagique | Se dit d'une boucherie qui vend de la viande de cheval.
Jusquiame | Plante toxique aux fleurs jaunâtres.
Macaronique | Se dit d'une poésie burlesque qui mêle le latin et une langue moderne.
Mansuétude | Douceur, indulgence.
Olibrius | Personnage bizarre et fanfaron.
Onomastique | Étude des noms propres.
Pantoufler | Quitter la fonction publique pour une entreprise privée.
Paronyme | Mot proche d'un autre par la forme, comme « collision » et « collusion ».
Péroraison | Conclusion d'un discours.
Psittacisme | Répétition mécanique de mots sans les comprendre.
Rhinolophe | Chauve-souris au nez en forme de fer à cheval.
Sagouin | Personne malpropre ; aussi un petit singe.
Saute-ruisseau | Jeune clerc chargé des courses.
Somptuaire | Qui concerne les dépenses de luxe.
Ténébrion | Insecte dont la larve est le ver de farine.
Tubéreuse | Plante aux fleurs blanches très parfumées.
Vagissement | Cri du nouveau-né.
Verbigération | Flot de paroles incohérentes.
Vespasienne | Urinoir public.
Zéphyr | Vent doux et léger.
Hurluberlu | Personne extravagante qui agit sans réfléchir.
Faribole | Propos frivole, sans valeur.
Dégingandé | Qui a une allure disloquée et maladroite.
Ubuesque | Grotesque et absurde, comme le roi Ubu.
Inextinguible | Qu'on ne peut pas éteindre ou arrêter.
Hétéroclite | Composé d'éléments disparates.
Marasme | Stagnation, découragement.
Polisson | Enfant espiègle.
Mélomane | Personne qui aime passionnément la musique.
`).map(([w, d]) => ({ w, d }));

/* Mot pour mot : mots de départ */
export const CHAIN_WORDS = L(`
Plage
Neige
Pizza
Vacances
Chocolat
Mariage
Cinéma
Forêt
Océan
Montagne
Soleil
Lune
Pluie
Orage
Été
Hiver
Printemps
Automne
Noël
Halloween
Anniversaire
École
Bureau
Hôpital
Cuisine
Jardin
Voiture
Avion
Train
Bateau
Vélo
Musique
Danse
Concert
Guitare
Piano
Football
Tennis
Piscine
Ski
Café
Thé
Fromage
Pain
Gâteau
Glace
Fraise
Pomme
Banane
Citron
Tomate
Pâtes
Sushi
Barbecue
Raclette
Crêpe
Soirée
Fête
Champagne
Cocktail
Bière
Vin
Amour
Bisou
Cœur
Rêve
Nuit
Sommeil
Réveil
Matin
Dimanche
Lundi
Week-end
Travail
Argent
Banque
Loto
Casino
Cadeau
Surprise
Ballon
Bougie
Feu
Eau
Terre
Air
Vent
Nuage
Étoile
Planète
Fusée
Robot
Ordinateur
Téléphone
Internet
Photo
Selfie
Vidéo
Télévision
Série
Film
Livre
Bibliothèque
Musée
Peinture
Château
Roi
Reine
Princesse
Dragon
Sorcière
Fantôme
Vampire
Zombie
Pirate
Trésor
Île
Désert
Jungle
Lion
Tigre
Éléphant
Singe
Chat
Chien
Cheval
Vache
Cochon
Poule
Œuf
Oiseau
Papillon
Abeille
Miel
Fleur
Rose
Arbre
Feuille
Champignon
Pomme de terre
Frites
Burger
Ketchup
Sel
Poivre
Sucre
Bonbon
Chewing-gum
Dentiste
Médecin
Pompier
Police
Prison
Voleur
Détective
Mystère
Secret
Mensonge
Vérité
Rire
Larme
Peur
Colère
Joie
Fatigue
Faim
Soif
Chaleur
Froid
Pull
Écharpe
Chaussure
Chaussette
Chapeau
Lunettes
Montre
Bague
Parfum
Miroir
Maquillage
Coiffeur
Barbe
Moustache
Brosse à dents
Douche
Bain
Serviette
Savon
Lit
Oreiller
Canapé
Fenêtre
Porte
Clé
Valise
Passeport
Aéroport
Hôtel
Restaurant
Serveur
Menu
Dessert
Clown
Cirque
Magicien
Carte
Jeu
Dé
Échecs
Puzzle
Médaille
Coupe
Victoire
Défaite
Course
Marathon
Sueur
Muscle
Sport
Yoga
Plongée
Requin
Baleine
Dauphin
Coquillage
Sable
Château de sable
Parasol
Crème solaire
Bronzage
Maillot de bain
Glacier
Pingouin
Igloo
Traîneau
Père Noël
Sapin
Guirlande
Feu d'artifice
Carnaval
Masque
Costume
Théâtre
Applaudissement
Star
Paparazzi
Tapis rouge
Oscar
Hollywood
Paris
Tour Eiffel
Baguette
Béret
Croissant
Métro
Taxi
Embouteillage
Klaxon
Radio
Chanson
Karaoké
Micro
Discothèque
Boule à facettes
Licorne
Arc-en-ciel
Paillettes
Diamant
Or
Volcan
Dinosaure
Fossile
Grotte
Chauve-souris
Lampe de poche
Camping
Tente
Feu de camp
Marshmallow
Moustique
Été indien
Vendanges
Raisin
Tracteur
Ferme
Fermier
Potager
Carotte
Lapin
Chasse aux œufs
Pâques
Cloche
Église
Clocher
Village
Ville
Gratte-ciel
Ascenseur
`);
