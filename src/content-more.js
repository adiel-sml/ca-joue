/* Troisième vague de contenu : mots, cartes et gages supplémentaires */
const lines = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);
const pairs = s => lines(s).map(l => l.split("|").map(x => x.trim()));

export const MIMES_EASY_MORE = {
  "Animal": ["Taureau", "Âne", "Chèvre", "Loup", "Renard", "Écureuil", "Hérisson", "Chauve-souris", "Pieuvre", "Baleine", "Phoque", "Panda", "Koala", "Zèbre", "Hippopotame", "Rhinocéros", "Perroquet", "Aigle", "Corbeau", "Coq", "Dinosaure", "Licorne", "Dragon", "Fourmi", "Coccinelle", "Ver de terre", "Chenille", "Paon", "Autruche", "Castor"],
  "Sport": ["Badminton", "Handball", "Karaté", "Plongeon", "Aviron", "Canoë", "Lancer de javelot", "Saut en hauteur", "Saut à la perche", "Curling", "Hockey", "Baseball", "Roller", "Sumo", "Fléchettes", "Billard", "Pétanque", "Danse classique"],
  "Métier": ["Vétérinaire", "Pêcheur", "Bûcheron", "Électricien", "Pharmacien", "Juge", "Avocat", "Soldat", "Marin", "Hôtesse de l'air", "Mannequin", "Acteur", "Journaliste", "Livreur", "Éboueur", "Maître-nageur", "Nounou", "Coach sportif", "Barman", "Sculpteur", "Détective", "Espion", "Moine"],
  "Objet": ["Perceuse", "Agrafeuse", "Stylo", "Gomme", "Calculatrice", "Tablette", "Manette", "Jumelles", "Loupe", "Boussole", "Sablier", "Horloge", "Râteau", "Pelle", "Arrosoir", "Tournevis", "Scie", "Cintre", "Oreiller", "Couverture", "Bouée", "Masque de plongée", "Palmes", "Raquette", "Gants de boxe", "Perche à selfie", "Paille", "Assiette", "Théière", "Mixeur", "Fer à repasser", "Ampoule"],
  "Action": ["Plonger", "Ramer", "Pédaler", "Ramper", "Glisser", "Trébucher", "Se coiffer", "S'habiller", "Lacer ses chaussures", "Faire un nœud de cravate", "Mettre du vernis", "Se parfumer", "Se moucher", "Tousser", "Avoir froid", "Avoir chaud", "Avoir peur", "Être en colère", "Être amoureux", "Être fatigué", "Avoir faim", "Faire du stop", "Envoyer un SMS", "Jouer aux cartes", "Lancer un dé", "Passer l'aspirateur", "Tondre la pelouse", "Arroser les plantes", "Laver la voiture", "Faire des pompes", "Faire un câlin", "Jongler", "Faire du hula hoop", "Souffler des bougies", "Ouvrir un cadeau"],
  "Nourriture": ["Fraise", "Cerise", "Raisin", "Ananas", "Noix de coco", "Kiwi", "Orange", "Carotte", "Brocoli", "Oignon", "Champignon", "Œuf", "Croissant", "Baguette", "Fromage", "Sandwich", "Yaourt", "Chocolat", "Bonbon", "Cookie", "Donut", "Kebab", "Tacos", "Riz", "Jus d'orange", "Thé", "Champagne", "Cocktail"],
  "Transport et lieu": ["Bus", "Métro", "Taxi", "Camion", "Tracteur", "Sous-marin", "Parachute", "Téléphérique", "Désert", "Jungle", "Igloo", "Château", "Pyramide", "Hôpital", "École", "Supermarché", "Prison", "Cirque", "Zoo", "Ferme", "Aéroport", "Discothèque", "Salle de sport", "Bibliothèque"],
  "Personnage": ["Fée", "Elfe", "Lutin", "Géant", "Pirate", "Extraterrestre", "Batman", "Hulk", "Dark Vador", "Harry Potter", "Mickey", "Lapin de Pâques", "Cupidon", "Diable", "Ange", "Squelette", "Loup-garou"]
};

export const MIMES_HARD_MORE = {
  "Action": ["Faire un tour de magie", "Se faire arrêter par la police", "Promener un chat en laisse", "Faire une demande en mariage", "Changer une roue", "Monter une tente", "Danser le tango", "Faire du ski nautique", "Traverser une rivière sur des pierres", "Se faire griffer par un chat", "Héler un taxi à New York", "Chasser un moustique la nuit", "Préparer des sushis", "Se faire tatouer", "Faire du rodéo", "Dresser un lion", "Faire la course en sac", "Patiner sur un lac gelé", "Chercher ses clés", "Réveiller quelqu'un qui ronfle", "Faire un barbecue", "Tomber amoureux au premier regard", "Se faire larguer par SMS", "Glisser sur une peau de banane", "Passer un entretien d'embauche", "Escalader l'Everest", "Se faire piquer par une méduse", "Ouvrir une huître", "Jouer de la harpe", "Être poursuivi par un taureau"],
  "Métier": ["Dompteur", "Cascadeur", "Mime", "Contrôleur de train", "Sage-femme", "Apiculteur", "Pilote de Formule 1", "Gardien de zoo", "Garde du corps", "Majordome", "Ramoneur", "Tatoueur", "Plongeur sous-marin", "Archéologue", "Présentateur météo", "Commissaire-priseur", "Contrôleur aérien"],
  "Animal": ["Chameau qui crache", "Pingouin qui glisse", "Chien qui fait le beau", "Kangourou boxeur", "Hérisson en boule", "Chat qui fait sa toilette", "Taureau en colère", "Cygne", "Lama", "Morse", "Scorpion", "Méduse", "Libellule"],
  "Film / série": ["E.T.", "Retour vers le futur", "Avatar", "Les Visiteurs", "Astérix et Obélix", "La Casa de Papel", "Stranger Things", "King Kong", "SOS Fantômes", "Karaté Kid", "Le Parrain", "Pretty Woman", "Dirty Dancing", "Grease", "Mamma Mia", "Top Gun", "Mary Poppins", "Bambi", "Ratatouille", "Le Monde de Nemo", "Toy Story", "Les Indestructibles", "Kung Fu Panda", "Madagascar", "Aladdin", "La Belle et la Bête"],
  "Personnage": ["Elvis Presley", "Bruce Lee", "Usain Bolt", "Le pape", "Cléopâtre", "Mozart", "Albert Einstein", "Jack Sparrow", "Indiana Jones", "Gandalf", "Yoda", "Le Grinch", "Sherlock Holmes", "James Bond", "Rambo"],
  "Objet": ["Éventail", "Machine à écrire", "Tourne-disque", "Taille-crayon", "Distributeur de billets", "Escalator", "Photocopieuse", "Moulin à vent", "Boule de cristal", "Lance-pierre", "Boomerang", "Pistolet à eau", "Yo-yo", "Toupie", "Hamac"]
};

export const TABOO_MORE = lines(`Plongée:eau,mer,bouteille,poissons
Camping:tente,nature,vacances,sac de couchage
Barbecue:grillade,viande,charbon,été
Raclette:fromage,hiver,pommes de terre,appareil
Fondue:fromage,Savoie,caquelon,pain
Kebab:viande,sauce,frites,grec
Tacos:mexicain,galette,viande,sauce
Popcorn:maïs,cinéma,sucré,salé
Bonbon:sucre,enfant,Haribo,sucette
Biscuit:gâteau,goûter,sec,croquer
Miel:abeille,sucré,pot,jaune
Confiture:fruits,pot,tartine,sucre
Moutarde:Dijon,piquant,jaune,sauce
Poivre:sel,épice,noir,moulin
Ketchup:tomate,rouge,frites,sauce
Mayonnaise:œuf,huile,sauce,blanche
Cuisine:cuisiner,four,repas,pièce
Salon:canapé,pièce,télé,maison
Canapé:assis,salon,coussin,meuble
Oreiller:dormir,tête,lit,plumes
Rideau:fenêtre,tissu,fermer,lumière
Miroir:reflet,se regarder,glace,salle de bain
Brosse à dents:dentifrice,dents,matin,soir
Savon:laver,mains,mousse,douche
Serviette:essuyer,bain,plage,tissu
Machine à laver:linge,lessive,tambour,vêtements
Frigo:froid,cuisine,nourriture,congélateur
Micro-ondes:réchauffer,cuisine,minutes,plat
Aspirateur:poussière,ménage,sol,bruit
Balai:ménage,sorcière,poussière,sol
Poubelle:déchets,jeter,sac,ordures
Parapluie:pluie,ouvrir,mouillé,ciel
Écharpe:cou,froid,hiver,laine
Bonnet:tête,hiver,laine,froid
Gants:mains,hiver,doigts,froid
Chaussettes:pieds,paire,chaussures,laver
Pyjama:dormir,nuit,lit,vêtements
Maillot de bain:plage,piscine,nager,été
Jean:pantalon,bleu,denim,Levi's
Robe:fille,vêtement,soirée,longue
Cravate:costume,cou,nœud,chemise
Sac à main:femme,porter,cuir,affaires
Montre:heure,poignet,temps,aiguilles
Bague:doigt,bijou,mariage,or
Collier:cou,bijou,perles,chaîne
Boucles d'oreilles:oreilles,bijoux,percer,paire
Rouge à lèvres:bouche,maquillage,rouge,lèvres
Vernis:ongles,couleur,manucure,pinceau
Coiffeur:cheveux,couper,salon,ciseaux
Dentifrice:dents,brosse,tube,menthe
Shampoing:cheveux,laver,douche,mousse
Pompier:feu,camion,sirène,caserne
Policier:voleur,menottes,uniforme,arrêter
Infirmière:hôpital,soins,piqûre,médecin
Pilote:avion,voler,cockpit,commandant
Astronaute:espace,fusée,Lune,combinaison
Agriculteur:ferme,champs,tracteur,vaches
Boucher:viande,couteau,steak,boucherie
Facteur:courrier,lettre,colis,boîte aux lettres
Plombier:fuite,tuyau,eau,réparer
Électricien:courant,fils,lumière,prise
Football américain:ballon,casque,États-Unis,Super Bowl
Basket:panier,ballon,NBA,dribbler
Golf:trou,club,balle,green
Formule 1:voiture,course,circuit,pilote
Marathon:courir,42 kilomètres,course,coureur
Surf:vague,planche,mer,glisse
Escalade:grimper,mur,corde,prises
Pétanque:boules,cochonnet,Marseille,pointer
Judo:kimono,ceinture,combat,tatami
Danse classique:tutu,pointes,ballet,opéra
Piano:touches,instrument,noir,blanc
Batterie:tambour,baguettes,rythme,cymbale
Violon:archet,cordes,instrument,orchestre
Trompette:souffler,cuivre,instrument,jazz
Micro:chanter,voix,parler,karaoké
Concert:musique,scène,chanteur,public
Festival:musique,été,concerts,plein air
DJ:musique,platines,soirée,mixer
Rap:musique,rappeur,paroles,flow
Opéra:chanter,lyrique,théâtre,soprano
Cirque:clown,chapiteau,acrobate,lion
Clown:nez rouge,cirque,rire,maquillage
Magicien:tour,chapeau,lapin,baguette
Fée:baguette,magie,ailes,Clochette
Dragon:feu,cracher,ailes,légende
Licorne de mer:narval,corne,baleine,océan
Dinosaure:préhistoire,T-rex,fossile,disparu
Extraterrestre:espace,ovni,martien,planète
Fantôme de l'opéra:masque,comédie musicale,Paris,chanteur
Momie:Égypte,bandelettes,pyramide,sarcophage
Château:roi,tour,princesse,forteresse
Pyramide:Égypte,pharaon,triangle,pierres
Tour Eiffel:Paris,fer,monument,haute
Statue de la Liberté:New York,torche,États-Unis,verte
Colisée:Rome,gladiateurs,arène,Italie
Big Ben:Londres,horloge,tour,Angleterre
Venise:Italie,gondole,canaux,eau
New York:États-Unis,Manhattan,ville,Big Apple
Londres:Angleterre,capitale,Big Ben,anglais
Japon:Tokyo,sushi,pays,Asie
Afrique:continent,savane,pays,Sahara
Australie:kangourou,Sydney,continent,koala
Brésil:samba,football,Rio,carnaval`).map(l => { const [w, f] = l.split(":"); return { w, f: f.split(",") }; });

export const UC_MORE = pairs(`Bowling|Mini-golf
Laser game|Paintball
Accrobranche|Escalade
Zoo|Aquarium
Cirque|Spectacle de magie
Parc d'attractions|Fête foraine
Grande roue|Montagnes russes
Toboggan|Balançoire
Trampoline|Château gonflable
Piscine à vagues|Toboggan aquatique
Pizza 4 fromages|Pizza Margherita
Raclette|Tartiflette
Fondue|Pierrade
Couscous|Paella
Lasagnes|Gratin dauphinois
Pâtes carbonara|Pâtes bolognaise
Bœuf bourguignon|Pot-au-feu
Crème brûlée|Crème caramel
Mousse au chocolat|Fondant au chocolat
Tarte aux pommes|Tarte Tatin
Cheesecake|Tiramisu glacé
Smoothie|Milkshake
Limonade|Soda
Eau gazeuse|Eau plate
Expresso|Cappuccino
Croque-madame|Croque-monsieur
Chips|Cacahuètes
Frites|Potatoes
Ketchup|Sauce barbecue
Wasabi|Gingembre
Paris|Lyon
Marseille|Nice
Bordeaux|Toulouse
Lille|Strasbourg
Bretagne|Normandie
Corse|Sardaigne
Thaïlande|Vietnam
Mexique|Colombie
Canada|Québec
Islande|Norvège
Maldives|Seychelles
Égypte|Jordanie
Inde|Sri Lanka
Australie|Nouvelle-Zélande
Miami|Ibiza
Disneyland|Parc Astérix
Louvre|Musée d'Orsay
Château de Versailles|Château de Chambord
Mont-Saint-Michel|Étretat
Tour Eiffel|Arc de triomphe
Avion|Hélicoptère
Moto|Scooter
Vélo|Trottinette électrique
TGV|TER
Voilier|Catamaran
Yacht|Paquebot
Uber|BlaBlaCar
Airbnb|Gîte
Camping-car|Van aménagé
Hôtel 5 étoiles|Palace
Médecin|Pharmacien
Pompier|Ambulancier
Policier|Gendarme
Avocat|Juge
Professeur|Directeur d'école
Boulanger|Pâtissier
Chef cuisinier|Traiteur
Vendeur|Caissier
Infirmier|Aide-soignant
Pilote|Steward
Architecte|Décorateur
Photographe|Vidéaste
Journaliste|Présentateur
Youtubeur|Streamer
Rappeur|Chanteur
DJ|Producteur
Acteur|Cascadeur
Mannequin|Influenceur
Footballeur|Rugbyman
Ballon d'or|Coupe du monde
Champions League|Ligue 1
Roland-Garros|Wimbledon
Tour de France|Paris-Roubaix
JO d'été|JO d'hiver
Ski alpin|Ski de fond
Patinage artistique|Danse sur glace
Yoga|Méditation
Musculation|Pilates en salle
Jogging|Sprint
Natation|Aquagym
Karaté|Judo
Boxe anglaise|Kick-boxing
Échecs|Dames
Uno|Skip-Bo
Jungle Speed|Dobble kids
Cluedo|Escape game à la maison
Puzzle|Mots croisés
Sudoku|Mots fléchés
Twister|Jenga
Loup-garou|Undercover
Fortnite|Call of Duty
Minecraft|Roblox
Mario Kart|Rocket League
Les Sims|Animal Crossing
Pokémon|Yu-Gi-Oh
Zelda|Final Fantasy
Netflix|Prime Video
Spotify|Deezer
YouTube|Twitch
TikTok|Reels
Snapchat|WhatsApp
Facebook|LinkedIn
Google|Wikipédia
ChatGPT|Siri
Selfie|Photo de groupe
Like|Partage
Abonné|Follower
Hashtag|Mention
Filtre|Retouche
Mème|GIF animé
Chanteuse|Rappeuse
Harry Potter|Hermione
Batman|Superman
Thor|Hulk
Shrek|Fiona
Mickey|Donald
Elsa|Anna
Simba|Nala
Woody|Buzz l'Éclair
Ariel|Raiponce
Pikachu|Évoli
Astérix|Obélix
Tintin|Milou
Bob l'éponge|Patrick
Homer Simpson|Peter Griffin
Joker|Harley Quinn
Dracula|Frankenstein
Barbie|Ken
Père Noël|Mère Noël`);

export const AV_MORE = {
 chill: {
  v: ["Quelle est la chanson que tu chantes le plus fort sous la douche ?", "Quel est ton plat préféré, celui que tu pourrais manger tous les jours ?", "Quelle est ta plus grosse peur bizarre ?", "Quel dessin animé regardais-tu en boucle petit ?", "Quel est le plus beau voyage que tu aies fait ?", "Tu es plutôt du matin ou du soir ?", "Quel super-pouvoir aimerais-tu avoir ?", "Qui est ton idole ?", "Quelle est la dernière chose que tu as achetée sur internet ?", "Quel est ton pire souvenir de vacances ?", "As-tu déjà eu un surnom ridicule ? Lequel ?", "Quel est le meilleur conseil qu'on t'ait donné ?", "Quelle est ta série préférée du moment ?", "Avec quelle célébrité aimerais-tu dîner ?", "Quel est le métier le plus bizarre que tu aimerais essayer ?", "Quelle est ta plus grosse bêtise d'enfant ?", "Quel est ton talent le plus inutile ?", "Quel animal aimerais-tu avoir chez toi ?", "Quelle est la chose la plus folle que tu aies mangée ?", "Si tu pouvais vivre dans un film, lequel choisirais-tu ?"],
  a: ["Fais ton meilleur rire de méchant de dessin animé.", "Imite un bébé qui pleure pendant 10 secondes.", "Raconte une histoire de 30 secondes qui commence par « Il était une fois un poulet ».", "Fais un défilé de mannequin jusqu'à la porte et reviens.", "Imite le bruit de ton réveil.", "Chante « Joyeux anniversaire » en mode opéra.", "Fais une déclaration d'amour à ta boisson.", "Dis 5 mots qui commencent par Z en 10 secondes.", "Fais ton meilleur moonwalk.", "Imite un commentateur de foot pendant que {joueur} boit.", "Mime ton métier de rêve, les autres devinent.", "Fais 10 sauts en étoile.", "Prends la voix d'un robot pour dire bonjour à chacun.", "Fais un compliment à {joueur} en chantant.", "Garde les yeux fermés jusqu'à ton prochain tour.", "Fais le tour de la pièce en marchant à reculons.", "Imite la démarche de {joueur}.", "Dis l'alphabet en rotant… ou en chuchotant.", "Fais une grimace et garde-la 15 secondes.", "Parle comme un pirate jusqu'à ton prochain tour."]
 },
 fun: {
  v: ["Quelle est la pire chose que tu aies dite à un date ?", "Quel est ton plus gros mensonge sur un CV ?", "Qui ici a le pire goût en musique ?", "Quelle est la chose la plus embarrassante dans ta chambre ?", "Quel est le texto le plus bizarre que tu aies reçu ?", "À qui ici confierais-tu ton téléphone déverrouillé ?", "Quelle est ta pire gaffe au travail ou en cours ?", "As-tu déjà menti dans ce jeu ?", "Quelle est la célébrité que tu trouves la plus surcotée ?", "Quel est le plus long que tu sois resté sans répondre à un message ?", "Qui ici serait le premier à mourir dans un film d'horreur ?", "Quelle est la chose la plus gênante que tes parents aient faite devant tes amis ?", "As-tu déjà été pris en train de parler seul ?", "Quel est le pire cadeau que tu aies offert ?", "As-tu déjà craqué sur un ou une ami d'un de tes parents ?", "Qui ici ferait le pire président ?", "Quelle est ta plus grosse dépense inutile ?", "As-tu déjà pleuré pour obtenir quelque chose ?", "Quelle rumeur aimerais-tu lancer sur toi-même ?", "Quel est le compliment le plus bizarre qu'on t'ait fait ?"],
  a: ["Laisse {joueur} choisir un emoji que tu dois envoyer à ton dernier contact.", "Imite {joueur} en train de commander au restaurant.", "Fais un rap de 4 phrases sur la soirée.", "Mange un aliment choisi par le groupe sans grimacer.", "Fais un selfie de groupe avec la pire grimace.", "Parle avec un accent marseillais jusqu'à ton prochain tour.", "Laisse le groupe te donner un nouveau prénom pour la soirée.", "Raconte ton pire date en 3 phrases.", "Fais une danse TikTok, même inventée.", "Laisse {joueur} te faire une coiffure ridicule.", "Écris « J'adore les chaussettes » en statut WhatsApp pendant une heure.", "Imite ton ex, sans dire son nom.", "Fais la planche pendant que {joueur} te raconte une blague.", "Appelle un ami et demande-lui la recette des pâtes, très sérieusement.", "Lis à voix haute le dernier message de ta mère.", "Fais semblant d'être un guide touristique pour la pièce.", "Fais un massage des pieds à {joueur}, en chaussettes.", "Vends ton téléphone au groupe comme un télé-achat.", "Chante le refrain d'une chanson choisie par {joueur}.", "Fais deviner un film à {joueur} en le mimant."]
 },
 hot: {
  v: ["Qui ici a le plus beau sourire ?", "Ton plus gros râteau, raconté en détail ?", "Qu'est-ce qui te fait craquer en premier chez quelqu'un ?", "Quel est ton plus beau souvenir de bisou ?", "As-tu déjà eu un crush sur un ami en couple ?", "Quelle est la phrase qui te fait fondre ?", "As-tu déjà envoyé un message de drague à 3 h du matin ?", "Préfères-tu les blonds, les bruns ou les roux ?", "As-tu déjà été le crush de quelqu'un ici, à ton avis ?", "Quel est ton type de date idéal ?", "As-tu déjà menti pour plaire à quelqu'un ?", "Quel est le meilleur endroit pour un premier bisou ?", "Quelle est la chose la plus romantique qu'on ait faite pour toi ?", "As-tu déjà regretté un bisou ?", "Quelle partie de ton corps préfères-tu ?", "As-tu déjà dragué quelqu'un sur les réseaux ?", "Qui ici a le plus de charme ?", "Quel est ton plus gros fantasme de vacances ?", "As-tu déjà eu une histoire d'un été ?", "Tu préfères séduire ou être séduit ?"],
  a: ["Fais un clin d'œil à {opp} et garde son regard 10 secondes.", "Raconte à {opp} ce qui te plaît chez {elle|lui:opp}.", "Fais un slow imaginaire avec ton oreiller.", "Fais un bisou sur le front de {opp}.", "Donne la main à {opp} jusqu'à ton prochain tour.", "Chuchote un compliment à l'oreille de {opp}.", "Fais un massage des mains à {opp} pendant 30 secondes.", "Danse un collé-serré de 20 secondes avec {opp}.", "Imite ta technique de drague sur {opp}.", "Laisse {opp} te faire un câlin de 15 secondes.", "Fais une déclaration en poème à {opp}.", "Pose ta tête sur l'épaule de {opp} jusqu'à ton prochain tour.", "Regarde {opp} dans les yeux en disant « Tu es magnifique ».", "Fais une photo de couple avec {opp}, joue contre joue.", "Remets une mèche de cheveux de {opp} en place, lentement.", "Fais un baisemain à chaque personne du sexe opposé.", "Fais deviner une chanson d'amour à {opp} en la fredonnant.", "Invente une phrase de drague avec le prénom de {opp}.", "Laisse {opp} choisir où tu dois t'asseoir jusqu'à la fin du jeu.", "Fais un bisou sur la joue de {opp} en {la|le:opp} prenant par surprise."]
 },
 x18: {
  v: ["Quelle est ta plus grande expérience au lit ?", "Préfères-tu les préliminaires ou passer direct à l'action ?", "Quel est l'endroit le plus risqué où tu as eu envie de faire l'amour ?", "Quel est ton plus gros fantasme avec une célébrité ?", "As-tu déjà fait l'amour au travail ?", "Plutôt lingerie ou nu ?", "Quelle est la chose la plus coquine dans ton téléphone ?", "As-tu déjà eu une aventure de vacances torride ?", "As-tu déjà fait l'amour dans la nature ?", "As-tu déjà fait l'amour en étant ivre et regretté ?", "Quelle est la position que tu n'as jamais essayée ?", "Ton record du plus court rapport ?", "As-tu déjà fait un massage qui a mal tourné… ou bien tourné ?", "Quelle est ta plus grosse honte au lit ?", "As-tu déjà dit le mauvais prénom ?", "Quel est le meilleur moment de la journée pour toi ?", "Qu'est-ce qui te refroidit immédiatement au lit ?", "Avec quel personnage de fiction ferais-tu l'amour ?", "Quel accessoire aimerais-tu tester ?", "Raconte ta première fois en 3 mots."],
  a: ["Embrasse le cou de {opp} jusqu'à ce que le groupe dise stop.", "Fais un strip-tease d'un seul vêtement devant {opp}.", "Lèche ton doigt de la façon la plus sexy possible devant {opp}.", "Fais un massage du dos de {opp} sous son haut pendant 20 secondes.", "Assieds-toi à califourchon sur {opp} et murmure-lui un fantasme.", "Mordille la lèvre de {opp}, ou prends 2 gages.", "Danse lascivement contre {opp} pendant 20 secondes.", "Enlève ton haut pendant un tour complet.", "Laisse {opp} t'embrasser dans le cou les yeux bandés.", "Mets un glaçon dans ta bouche et passe-le sur le ventre de {opp}.", "Fais un bisou à {opp} là où le groupe décide, au-dessus de la ceinture.", "Mime ta position préférée avec {opp}, habillés.", "Décris en détail ce que tu ferais à {opp} pendant 7 minutes au paradis.", "Laisse {opp} poser ses mains où {elle|il:opp} veut sur toi, au-dessus de la ceinture, 10 secondes.", "Enlève un vêtement de {opp} avec les dents.", "Fais un body shot sur {opp} avec la boisson de ton choix.", "Embrasse {opp} pendant 10 secondes, ou prends 3 gages.", "Allonge-toi et laisse {opp} s'asseoir sur toi pendant un tour.", "Fais un suçon à {opp} dans le cou, avec son accord.", "Fais une lap dance d'une minute à {opp}."]
 }
};

export const GAGES_MORE = lines(`Imite un animal choisi par le groupe pendant 20 secondes.
Fais 10 pompes.
Fais 30 secondes de gainage.
Chante le refrain d'une chanson choisie par le groupe.
Parle avec un accent jusqu'à ton prochain tour.
Garde une cuillère dans la bouche jusqu'à ton prochain tour.
Mange une rondelle de citron sans grimacer.
Bois un verre d'eau sans les mains.
Fais un compliment à chaque personne présente.
Raconte une blague nulle.
Imite une personne du groupe, les autres devinent qui.
Danse 30 secondes sans musique.
Fais une déclaration d'amour à un objet de la pièce.
Parle comme un robot jusqu'à ton prochain tour.
Mets tes chaussettes sur les mains pendant un tour.
Laisse le groupe te coiffer.
Fais le tour de la pièce à quatre pattes.
Récite l'alphabet à l'envers.
Envoie « Tu me manques » à la 7e personne de tes contacts.
Montre la dernière photo de ta galerie.
Laisse le groupe changer ton fond d'écran pour 24 heures.
Laisse le groupe écrire ta prochaine story.
Like la plus vieille photo d'un profil choisi par le groupe.
Appelle quelqu'un et chante-lui une chanson.
Fais un discours de 30 secondes sur les chaussettes.
Fais un défilé de mode avec 3 objets de la pièce.
Tiens-toi sur un pied jusqu'à ton prochain tour.
Parle à la 3e personne jusqu'à ton prochain tour.
Interdit de dire « oui » jusqu'à ton prochain tour.
Interdit de rire pendant 2 minutes.
Fais une grimace sur une photo que le groupe garde.
Laisse quelqu'un te dessiner sur la main au stylo.
Porte un objet sur la tête pendant un tour.
Fais la poule pendant 15 secondes.
Fais le bruit d'un animal à chaque fois que tu bois, pendant 10 minutes.
Mime un film, le groupe a 30 secondes pour trouver.
Fais un massage des épaules à la personne à ta gauche.
Sers à boire à tout le monde.
Lis le dernier message de ta conversation la plus récente.
Raconte ta plus grosse honte.
Fais 15 squats en chantant.
Laisse la personne à ta droite choisir ton prochain verre.
Parle uniquement en chantant jusqu'à ton prochain tour.
Fais un tutoriel make-up imaginaire de 30 secondes.
Fais une vidéo de toi en train de danser, que le groupe peut regarder.
Garde les yeux fermés pendant un tour complet.
Imite ta mère au téléphone.
Fais un câlin à la personne de ton choix pendant 10 secondes.
Trouve 5 mots qui riment avec ton prénom.
Fais un rap sur la personne à ta gauche.
Échange un vêtement avec quelqu'un jusqu'à la fin de la partie.
Laisse le groupe choisir ta photo de profil pendant une heure.
Raconte ton rêve le plus bizarre.
Fais semblant d'être un serveur pour le prochain tour.
Mange une cuillère de moutarde.
Fais la statue pendant 30 secondes, même si on te chatouille.
Invente un slogan publicitaire pour la personne à ta droite.
Récite une poésie apprise à l'école.
Fais une présentation météo de la soirée.
Dis trois qualités et un défaut de la personne à ta gauche.
Imite un présentateur du JT pour annoncer ton prochain gage.
Chante une chanson de Disney en entier, ou au moins le refrain.
Fais 20 secondes de beatbox.
Fais un tour de magie, même raté.
Joue du piano imaginaire sur la table pendant 20 secondes.
Raconte ta pire journée.
Fais 10 tours de bras comme un moulin.
Envoie un vocal où tu imites un animal à un ami.
Prends une photo avec la personne la plus proche, joue contre joue.
Embrasse ta propre main de façon passionnée pendant 5 secondes.
Fais un bisou sur la joue de la personne à ta gauche.
Laisse le groupe écrire un message à envoyer à qui il veut, tu as un droit de veto.
Fais semblant d'être un chat jusqu'à ton prochain tour.
Mets ton haut à l'envers pendant 10 minutes.
Garde ta main sur ta tête jusqu'à ton prochain tour.
Commente tout ce que fait le groupe pendant une minute, comme au foot.
Ne bois qu'avec ta main gauche pendant 10 minutes.
Dis une phrase sans la lettre E.
Fais l'avion autour de la pièce.
Fais trois vœux à voix haute.`);

export const GAGES_HOT = lines(`Fais un bisou dans le cou de la personne de ton choix.
Fais un massage des épaules de 30 secondes à la personne de ton choix.
Enlève un vêtement jusqu'à la fin de la partie, sous-vêtements exclus.
Fais une danse sensuelle de 20 secondes.
Murmure quelque chose de coquin à l'oreille de quelqu'un.
Envoie « Je pense à toi » à ton crush.
Laisse le groupe lire tes 5 derniers messages avec ton crush.
Fais un slow de 30 secondes avec la personne de ton choix.
Assieds-toi sur les genoux de quelqu'un jusqu'à ton prochain tour.
Fais un clin d'œil séducteur à chaque personne.
Raconte ton meilleur bisou en détail.
Fais un compliment osé à la personne à ta droite.
Mange une fraise de la façon la plus sexy possible.
Fais semblant de draguer la personne à ta gauche pendant 30 secondes.
Laisse quelqu'un te faire un suçon sur le bras.
Montre la photo la plus sexy de ta galerie à une personne de ton choix.
Fais un bisou sur la joue de chaque personne du sexe opposé.
Raconte ton fantasme le plus avouable.
Fais un strip-tease d'une chaussette, très lentement.
Laisse la personne de ton choix te faire un bisou où elle veut sur le visage.
Imite ton expression du matin au réveil après une nuit torride.
Fais un body shot avec la boisson de ton choix.
Mordille l'oreille de la personne de ton choix pendant 3 secondes.
Fais un lap dance de 15 secondes à la personne de ton choix.
Embrasse quelqu'un sur la bouche, ou bois deux fois.`);

export const MYS_MORE = [
 ...lines(`gagner à Koh-Lanta
se faire virer pour un tweet
finir avec 15 enfants
devenir président
oublier son mot de passe tous les jours
partir sans payer au restaurant
rire en premier à sa propre blague
pleurer au mariage d'un inconnu
être en retard à son propre mariage
se teindre les cheveux en bleu
dépenser 200 € en bonbons
s'endormir au cinéma
adopter trois chats d'un coup
vivre dans une cabane au fond des bois
gagner un concours de danse
devenir célèbre sur TikTok
avoir une double vie secrète
faire un tatouage en soirée
se marier deux fois
survivre à une apocalypse zombie
ouvrir un restaurant
finir en prison pour une histoire ridicule
changer de pays tous les ans
se faire passer pour quelqu'un d'autre
écrire un livre
finir milliardaire
oublier l'anniversaire de son couple
draguer le serveur ce soir
trouver l'amour sur une appli
garder un secret toute sa vie`).map(x => ({ t: "qui", x: "…" + x + " ?" })),
 ...lines(`mangé un plat entier de pâtes seul
pris un bain de minuit
dormi chez un inconnu
fait un tatouage temporaire
gagné un tournoi
porté un vêtement à l'envers toute la journée sans le savoir
chanté au karaoké devant des inconnus
fait une fausse excuse pour ne pas venir à une soirée
oublié où j'ai garé ma voiture
été dans un pays sans parler la langue
fait un régime de moins d'une journée
dansé dans la rue
fait un plongeon raté
oublié le prénom de mon date
cassé quelque chose chez quelqu'un sans le dire
lu un livre en entier en une journée
fait un road trip
appelé quelqu'un par erreur
envoyé un selfie raté à la mauvaise personne
pleuré de rire au point de ne plus pouvoir respirer`).map(x => ({ t: "jamais", x: "…" + x + "." })),
 {t:"defi",x:"{p1} doit faire deviner 3 films en les mimant en 45 secondes.",s:45},
 {t:"defi",x:"{p1} fait une déclaration d'amour à un objet de la pièce, avec émotion."},
 {t:"defi",x:"{p1} parle pendant 30 secondes sans utiliser la lettre A.",s:30},
 {t:"defi",x:"{p1} imite 4 célébrités, le groupe devine.",s:60},
 {t:"defi",x:"{p1} tient un verre d'eau sur la tête pendant 15 secondes.",s:15},
 {t:"defi",x:"{p1} invente un hymne pour le groupe et le chante."},
 {t:"defi",x:"{p1} raconte l'histoire du Petit Chaperon rouge en 30 secondes, version film d'action.",s:30},
 {t:"defi",x:"{p1} fait 20 squats en 30 secondes.",s:30},
 {t:"defi",x:"{p1} cite 10 marques de voitures en 20 secondes.",s:20},
 {t:"defi",x:"{p1} fait rire {p2} sans dire un mot, en 30 secondes.",s:30},
 {t:"duel",x:"{p1} contre {p2} : qui cite le plus de capitales ? À tour de rôle, qui sèche perd."},
 {t:"duel",x:"{p1} contre {p2} : concours de la plus longue note tenue. Le groupe tranche."},
 {t:"duel",x:"{p1} contre {p2} : imitation d'un animal. Le groupe vote pour la meilleure."},
 {t:"duel",x:"{p1} contre {p2} : qui tient le plus longtemps sur un pied, les yeux fermés ?"},
 {t:"duel",x:"{p1} contre {p2} : concours de pompes en 20 secondes.",s:20},
 {t:"duel",x:"{p1} contre {p2} : à tour de rôle, citez des chansons de Disney. Qui sèche perd."},
 {t:"duel",x:"{p1} contre {p2} : celui qui fait le plus beau compliment au groupe gagne. Le groupe vote."},
 {t:"duel",x:"{p1} contre {p2} : pile ou face, trois manches. Le groupe choisit le gage du perdant."},
 {t:"regle",x:"Interdit de croiser les bras."},
 {t:"regle",x:"Quand {p1} lève la main, tout le monde doit lever la main. Le dernier fait un gage."},
 {t:"regle",x:"Il faut dire « s'il vous plaît » avant chaque phrase."},
 {t:"regle",x:"Interdit d'utiliser des prénoms : on dit « mon ami » ou « mon amie »."},
 {t:"regle",x:"{p1} est {la juge|le juge} de la soirée : {elle|il} peut annuler une règle quand {elle|il} veut."},
 {t:"regle",x:"Interdit de dire « je »."},
 {t:"regle",x:"Chaque fois que quelqu'un éternue ou tousse, tout le monde crie « santé »."},
 {t:"regle",x:"Tout le monde doit boire de la main gauche."},
 {t:"devine",x:"{p1} fait deviner un pays en le mimant. 30 secondes.",s:30},
 {t:"devine",x:"{p1} fredonne le générique d'une série. Trouvez laquelle."},
 {t:"devine",x:"{p1} décrit un personnage de Disney en 3 mots."},
 {t:"devine",x:"{p1} imite un sport sans bouger les jambes."},
 {t:"devine",x:"{p1} mime une émotion. Trouvez laquelle."},
 {t:"devine",x:"{p1} fait le bruit d'un instrument de musique."}
];

export const TU_MORE = lines(`Freddie Krueger
Mister Bean
Monsieur Patate
Le Petit Chaperon rouge
Le Grand Méchant Loup
Raiponce
La Belle au bois dormant
Le Chat Potté
Le Roi Lion
Bambi
Dumbo
Tarzan
Mowgli
Baloo
Captain Hook
Le Capitaine Haddock
Gaston Lagaffe
Le Marsupilami
Spirou
Les Bisounours
Casper
Shaggy
Daffy Duck
Bugs Bunny
Titi et Grosminet
Popeye
Inspecteur Gadget
Luigi
Donkey Kong
Kirby
Link
Pac-Man
Lara Croft
Kratos
Ezio
Batman
Robin
Catwoman
Wolverine
Deadpool
Black Panther
Captain Marvel
Thanos
Loki
Gandalf
Frodon
Legolas
Voldemort
Dumbledore
Rogue
Hagrid
Ron Weasley
Katniss
Bella Swan
Edward Cullen
Daenerys
Jon Snow
Walter White
Eleven
Mercredi Addams
Le Professeur de La Casa de Papel
Lupin
Docteur House
Ross et Rachel
Joey Tribbiani
Chandler Bing
Sheldon Cooper
Bart Simpson
Marge Simpson
Rick et Morty
Dexter
Hannibal Lecter
Ghostface
Chucky
Pennywise
Jason
La reine d'Angleterre
Le prince Harry
Meghan Markle
Kate Middleton
Vladimir Poutine
Donald Trump
Joe Biden
Charles de Gaulle
Jeanne d'Arc
Marie-Antoinette
Louis XIV
Christophe Colomb
Neil Armstrong
Martin Luther King
Nelson Mandela
Gandhi
Frida Kahlo
Van Gogh
Michel-Ange
Shakespeare
Molière
Victor Hugo
Jean de La Fontaine
Antoine de Saint-Exupéry
Gérard Depardieu
Christian Clavier
Dany Boon
Kad Merad
Florence Foresti
Élie Semoun
Mimie Mathy
Patrick Bruel
Mylène Farmer
Vianney
Orelsan
Soprano
Gims
Nekfeu
PNL
Ninho
SCH
Indila
Louane
Zaz
Kendji Girac
Vitaa
Slimane
Amir
Christophe Maé
M. Pokora
Antoine Griezmann
Paul Pogba
Karim Benzema
Thierry Henry
Didier Deschamps
Michel Platini
Yannick Noah
Laure Manaudou
Florent Manaudou
Léon Marchand
Victor Wembanyama
Tiger Woods
Lewis Hamilton
Max Verstappen
Ayrton Senna
Mohamed Ali
Mike Tyson
Novak Djokovic
LeBron James
Kobe Bryant
Pelé
Maradona
Simone Biles
Le Titanic qui coule
Le Big Bang
La Saint-Valentin
Halloween
Noël
Le nouvel an
Le Carnaval de Rio
Les Jeux olympiques
La Coupe du monde
Le Festival de Cannes
Les Oscars
Le Ballon d'or
L'Eurovision
Koh-Lanta
Les Marseillais
Qui veut gagner des millions
Fort Boyard
The Voice
Star Academy
Pékin Express`);

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "L", "M", "N", "P", "R", "S", "T", "V"];
const BOMB_CATS = ["Un prénom", "Un animal", "Un objet", "Un verbe", "Un aliment", "Un métier", "Une marque", "Un pays", "Une ville", "Un mot de plus de 6 lettres"];
export const BOMB_MORE = [
  ...BOMB_CATS.flatMap(c => LETTERS.map(l => `${c} qui commence par ${l}`)),
  ...["Un film d'horreur", "Un dessin animé", "Un plat italien", "Un fromage", "Un cocktail", "Un réseau social", "Un jeu vidéo", "Une émission de télé", "Un youtubeur", "Un rappeur français", "Une chanson de Disney", "Un sport de combat", "Un insecte", "Une fleur", "Un pays d'Afrique", "Un pays d'Asie", "Une ville d'Italie", "Une marque de chaussures", "Une marque de luxe", "Un mot qui rime avec « soirée »", "Un mot qui rime avec « amour »", "Un mot qui rime avec « chat »", "Un mot qui finit par « -tion »", "Une chose qu'on trouve dans un frigo", "Une chose qu'on met dans une valise", "Une chose qui fait du bruit", "Une chose ronde", "Une chose rouge", "Un mot en anglais lié à la fête", "Un personnage de Harry Potter"]
];

export const WYR_MORE = {
  normal: pairs(`Vivre au bord de la mer|Vivre à la montagne
Être toujours trop habillé|Être toujours pas assez habillé
Pouvoir te téléporter|Pouvoir remonter le temps
Ne plus jamais utiliser internet|Ne plus jamais regarder la télé
Avoir un chef cuisinier personnel|Avoir un chauffeur personnel
Vivre 100 ans en bonne santé|Vivre 200 ans avec quelques soucis
Être l'enfant le plus jeune|Être l'aîné
Un été sans soleil|Un hiver sans neige
Parler toujours en rimes|Parler toujours en chantant
Avoir des mains géantes|Avoir des pieds minuscules
Manger de la pizza à chaque repas|Ne plus jamais manger de pizza
Être drôle|Être intelligent
Travailler de chez toi pour toujours|Ne jamais pouvoir télétravailler
Avoir un perroquet qui répète tout|Un chat qui te juge
Connaître tous les secrets de tes amis|Que tes amis connaissent tous les tiens
Être bloqué dans un film d'horreur|Être bloqué dans une comédie romantique
Ne jamais plus avoir de wifi|Ne jamais plus avoir de chauffage
Faire le tour du monde en bateau|Faire le tour du monde en avion
Une fête surprise pour ton anniversaire|Un voyage surprise
Avoir une mémoire parfaite|Pouvoir oublier ce que tu veux
Rire toute la journée sans raison|Pleurer à chaque film
Habiter à Paris|Habiter à la campagne
Être un super-héros méconnu|Être un méchant célèbre
Ne plus jamais avoir le hoquet|Ne plus jamais avoir de courbatures
Gagner un Oscar|Gagner une médaille olympique
Avoir 3 bras|Avoir 3 jambes
Ne plus jamais pouvoir t'asseoir|Ne plus jamais pouvoir te coucher
Ne parler qu'en anglais|Ne parler qu'en verlan
Un an sans vacances|Un an sans week-end
Vivre dans un dessin animé|Vivre dans un jeu vidéo`),
  hot: pairs(`Embrasser quelqu'un sous la pluie|Embrasser quelqu'un sous les étoiles
Un premier date à la plage|Un premier date dans un bar
Un crush qui t'ignore|Quelqu'un que tu n'aimes pas qui te colle
Que ton ex devienne célèbre|Que ton ex devienne ton beau-frère
Te faire draguer par message|Te faire draguer en vrai
Un bisou maladroit|Pas de bisou du tout
Sortir avec ton prof de sport|Sortir avec ton médecin
Un partenaire très romantique|Un partenaire très drôle
Te réveiller à côté de ton crush|Te réveiller à côté de ton ex
Un slow devant toute ta famille|Un bisou devant tous tes collègues
Que ton crush voie tes vieilles photos|Que ton crush rencontre tes parents
Une déclaration en public|Une déclaration par lettre
Sortir avec quelqu'un qui ne sait pas danser|Avec quelqu'un qui ne sait pas cuisiner
Être en couple avec un acteur|Avec un chanteur
Un week-end romantique à Venise|Un week-end festif à Ibiza
Que ton crush lise ton journal intime|Qu'il écoute tes vocaux
Rompre par message|Te faire larguer en public
Un ex jaloux|Un ex qui t'a oublié
Un partenaire qui chante tout le temps|Un partenaire qui ronfle fort
Draguer en soirée|Draguer sur une appli`),
  x18: pairs(`Faire l'amour dans un hôtel de luxe|Faire l'amour sous une tente
Un partenaire très tendre|Un partenaire très sauvage
Faire l'amour en musique|Faire l'amour en silence
Un bain moussant à deux|Une douche à deux
Que tes voisins t'entendent|Que tes colocs te voient
Une nuit avec ton crush|Une semaine de vacances payée
Un massage à l'huile|Un massage aux glaçons
Te faire déshabiller|Déshabiller l'autre
Faire l'amour le matin au réveil|En pleine nuit
Un strip-tease pour toi|Faire un strip-tease
Une nuit sans dormir|Une nuit câline sans rien d'autre
Des préliminaires interminables|Aller droit au but
Un plan à trois avec deux inconnus|Un plan à trois avec deux amis
Avouer ton fantasme à ton partenaire|Le réaliser sans en parler
Faire l'amour dans un avion|Faire l'amour dans un train
Un partenaire qui parle salement|Un partenaire très silencieux
Rester au lit tout un dimanche|Faire l'amour dans chaque pièce de la maison
Les yeux bandés|Les mains attachées
Te faire réveiller par des bisous|Par un petit déjeuner au lit
Un sextoy télécommandé en soirée|Un jeu de rôle en costume`)
};

export const NHIE_MORE = {
  soft: lines(`fait du ski
vu une aurore boréale
été dans un pays d'Asie
fait de cheval
mangé des escargots
vu un film d'horreur seul
participé à un spectacle
gagné à un jeu à gratter
été à un concert à l'étranger
dormi dans un aéroport
eu de tatouage
été dans une ambulance
fait de la plongée
nagé avec des dauphins
appris une danse en entier
monté sur scène
cuisiné pour plus de 10 personnes
pris un cours de chant
fait du bénévolat
passé une nuit à l'hôpital`),
  fun: lines(`fait semblant de connaître quelqu'un
oublié un rendez-vous important
fait tomber mon téléphone dans les toilettes
volé une frite dans l'assiette de quelqu'un
été pris en train de stalker quelqu'un
envoyé un message en me trompant de conversation
crié sur un arbitre
fait semblant de lire un livre pour avoir l'air intelligent
fait la queue plus de 3 heures pour quelque chose
eu une amende
dormi au travail ou en cours
eu une panne de réveil le jour d'un examen
menti sur mon âge pour entrer quelque part
fait semblant d'être occupé pour éviter quelqu'un
eu un fou rire dans un enterrement ou un mariage
supprimé un message avant qu'il soit lu
regardé une série entière en un week-end
répondu « toi aussi » au serveur qui dit « bon appétit »
caché quelque chose sous mon lit
raconté un secret en pensant qu'il ne serait pas répété`),
  hot: lines(`dragué un serveur ou une serveuse
embrassé quelqu'un dans un ascenseur
eu un date qui a fini au petit matin
envoyé un message à mon crush en ayant bu
fait un câlin à mon ex après la rupture
été sur une appli de rencontre en étant en couple
embrassé quelqu'un que je venais de rencontrer
eu un crush sur un ami de mes parents
ressenti de la jalousie envers une personne de cette pièce
reçu un bisou par surprise
fait semblant d'aimer un cadeau d'un ex
regardé le téléphone de mon partenaire en cachette
donné un faux numéro en soirée
eu une histoire avec deux personnes amies entre elles
dansé un slow avec un inconnu
embrassé quelqu'un dans un taxi
eu un crush sur un ou une collègue
écrit une lettre d'amour
dragué quelqu'un en me faisant passer pour quelqu'un d'autre
imaginé un plan à trois`),
  x18: lines(`fait l'amour dans un ascenseur
fait l'amour au travail
fait de massage érotique
reçu de lap dance
acheté un sextoy en ligne
fait l'amour dans une piscine
envoyé un message très coquin au travail
fait l'amour avec quelqu'un de cette soirée
fait un plan d'un soir en vacances
fait l'amour devant un miroir
été surpris par un colocataire
fait l'amour dans une cabine d'essayage
fait l'amour plus de 2 heures d'affilée
couché avec quelqu'un rencontré sur une appli le soir même
fait l'amour dans les toilettes d'une boîte
utilisé de la nourriture au lit
fait un strip-poker qui a mal fini
fait l'amour dans un champ
appelé quelqu'un par le mauvais prénom au lit
fait l'amour au premier rendez-vous`)
};

export const QUIZ_MORE = [
  ["Culture générale", "Combien de minutes compte une heure et demie ?", "90", "60", "100", "120"],
  ["Culture générale", "Quel gaz les plantes absorbent-elles pour faire la photosynthèse ?", "Le dioxyde de carbone", "L'oxygène", "L'azote", "L'hélium"],
  ["Culture générale", "Combien de faces a un dé classique ?", "6", "4", "8", "12"],
  ["Culture générale", "Quel est le plus long os du corps humain ?", "Le fémur", "Le tibia", "L'humérus", "Le radius"],
  ["Culture générale", "Quelle est la planète la plus proche du Soleil ?", "Mercure", "Vénus", "Mars", "La Terre"],
  ["Culture générale", "Combien de temps la Terre met-elle pour faire le tour du Soleil ?", "Un an", "Un mois", "Un jour", "Dix ans"],
  ["Culture générale", "Quel est l'animal emblème de l'Australie ?", "Le kangourou", "Le koala", "L'émeu", "Le wombat"],
  ["Culture générale", "Quelle est la couleur d'une émeraude ?", "Verte", "Rouge", "Bleue", "Violette"],
  ["Culture générale", "Combien de joueurs compte une équipe de volley sur le terrain ?", "6", "5", "7", "11"],
  ["Culture générale", "Quel instrument mesure la température ?", "Le thermomètre", "Le baromètre", "La boussole", "Le sismographe"],
  ["Culture générale", "Quel est le contraire de « nocturne » ?", "Diurne", "Lunaire", "Matinal", "Solaire"],
  ["Culture générale", "Combien de zéros compte un million ?", "6", "5", "7", "9"],
  ["Géographie", "Quelle est la capitale de l'Allemagne ?", "Berlin", "Munich", "Francfort", "Hambourg"],
  ["Géographie", "Quelle est la capitale du Portugal ?", "Lisbonne", "Porto", "Madrid", "Faro"],
  ["Géographie", "Quelle est la capitale de la Grèce ?", "Athènes", "Thessalonique", "Sparte", "Héraklion"],
  ["Géographie", "Sur quel continent se trouve le Kenya ?", "L'Afrique", "L'Asie", "L'Amérique du Sud", "L'Océanie"],
  ["Géographie", "Quel océan borde la côte ouest de la France ?", "L'Atlantique", "Le Pacifique", "L'océan Indien", "L'Arctique"],
  ["Géographie", "Dans quel pays se trouve Amsterdam ?", "Les Pays-Bas", "La Belgique", "Le Danemark", "L'Allemagne"],
  ["Géographie", "Quelle chaîne de montagnes sépare la France de l'Espagne ?", "Les Pyrénées", "Les Alpes", "Le Jura", "Les Vosges"],
  ["Géographie", "Quelle est la capitale du Maroc ?", "Rabat", "Casablanca", "Marrakech", "Fès"],
  ["Géographie", "Quel pays a pour capitale Dublin ?", "L'Irlande", "L'Écosse", "Le pays de Galles", "L'Islande"],
  ["Cinéma et séries", "Comment s'appelle le meilleur ami de Harry Potter, de la famille Weasley ?", "Ron", "Fred", "George", "Percy"],
  ["Cinéma et séries", "Quel est le nom du lion dans « Le Monde de Narnia » ?", "Aslan", "Simba", "Mufasa", "Rex"],
  ["Cinéma et séries", "Dans quel film voit-on un petit poisson-clown chercher son fils ?", "Le Monde de Nemo", "Le Monde de Dory", "Vaiana", "La Petite Sirène"],
  ["Cinéma et séries", "Quel acteur joue Jack Sparrow ?", "Johnny Depp", "Orlando Bloom", "Brad Pitt", "Leonardo DiCaprio"],
  ["Cinéma et séries", "Dans « Les Simpson », comment s'appelle le père ?", "Homer", "Bart", "Ned", "Moe"],
  ["Cinéma et séries", "Quel super-héros vient de la planète Krypton ?", "Superman", "Thor", "Green Lantern", "Flash"],
  ["Cinéma et séries", "Quelle série suit un professeur de chimie devenu fabricant de drogue ?", "Breaking Bad", "Narcos", "Ozark", "Better Call Saul"],
  ["Cinéma et séries", "Dans « Shrek », quel animal accompagne Shrek ?", "Un âne", "Un cheval", "Un chat", "Un dragon"],
  ["Cinéma et séries", "Qui a réalisé « Titanic » ?", "James Cameron", "Steven Spielberg", "Christopher Nolan", "Ridley Scott"],
  ["Cinéma et séries", "Dans « Le Seigneur des anneaux », qui porte l'anneau jusqu'au Mordor ?", "Frodon", "Sam", "Gandalf", "Aragorn"],
  ["Musique", "Qui chante « Rolling in the Deep » ?", "Adele", "Rihanna", "Beyoncé", "Pink"],
  ["Musique", "Quel groupe a chanté « Bohemian Rhapsody » ?", "Queen", "The Beatles", "ABBA", "Coldplay"],
  ["Musique", "Qui chante « Thriller » ?", "Michael Jackson", "Prince", "Stevie Wonder", "Elvis Presley"],
  ["Musique", "Qui chante « Bella » ?", "Gims", "Soprano", "Jul", "Booba"],
  ["Musique", "Qui chante « Tout oublier » avec Roméo Elvis ?", "Angèle", "Louane", "Clara Luciani", "Pomme"],
  ["Musique", "Quel instrument joue un pianiste ?", "Le piano", "Le violon", "La batterie", "La flûte"],
  ["Musique", "De quel pays vient la K-pop ?", "La Corée du Sud", "Le Japon", "La Chine", "La Thaïlande"],
  ["Sport", "Combien de sets faut-il gagner pour remporter un match de tennis masculin en Grand Chelem ?", "3", "2", "4", "5"],
  ["Sport", "Quel pays organise le Tour de France ?", "La France", "L'Espagne", "L'Italie", "La Belgique"],
  ["Sport", "Dans quel sport marque-t-on un « strike » ?", "Le bowling", "Le golf", "Le billard", "Le curling"],
  ["Sport", "Combien de joueurs compte une équipe de rugby à XV sur le terrain ?", "15", "13", "11", "7"],
  ["Sport", "Quel sport pratique Teddy Riner ?", "Le judo", "La boxe", "La lutte", "Le karaté"],
  ["Sport", "Quelle couleur a le maillot du leader du Tour de France ?", "Jaune", "Vert", "Blanc", "Rouge"],
  ["Pop culture", "Quel réseau social est connu pour ses vidéos courtes et sa musique ?", "TikTok", "LinkedIn", "Pinterest", "X"],
  ["Pop culture", "Quelle marque fabrique la PlayStation ?", "Sony", "Microsoft", "Nintendo", "Sega"],
  ["Pop culture", "Quelle entreprise a créé l'iPhone ?", "Apple", "Samsung", "Google", "Nokia"],
  ["Pop culture", "Quel est le personnage principal de « The Legend of Zelda » ?", "Link", "Zelda", "Ganon", "Mario"],
  ["Pop culture", "Dans quel pays est né le Nutella ?", "L'Italie", "La France", "La Suisse", "La Belgique"],
  ["Pop culture", "Quel animal est la mascotte de Twitter avant X ?", "Un oiseau", "Un chat", "Un renard", "Un poisson"]
].map(([cat, q, a, ...w]) => ({ q, a, w, cat }));

export const TVM_MORE = ["Ton pire job", "Une soirée qui a mal tourné", "Ta plus grosse peur d'enfant", "Un mensonge à tes parents", "Ta plus belle rencontre", "Un objet que tu as perdu", "Un record personnel", "Ton premier concert", "Un plat que tu détestes", "Ta pire chute", "Un talent bizarre", "Ton premier téléphone", "Un endroit où tu as dormi", "Un animal que tu as eu", "Une célébrité que tu as croisée", "Ton pire rendez-vous"];
