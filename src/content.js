/* ---------- Contenu ----------
   Gabarits : {joueur} = autre joueur au hasard, {opp} = joueur du sexe opposé (sinon un autre),
   {p1} {p2} = joueurs tirés, {fille|garçon} = accord selon le joueur concerné ({…|…:p2} pour un autre). */
export const MIMES = {
  "Action":["Se brosser les dents","Faire du ski","Changer une couche","Rater son bus","Faire un selfie","Monter un meuble IKEA","Se faire piquer par une guêpe","Danser la macarena","Faire du surf","Promener un chien qui tire","Marcher sur un Lego","Faire sauter des crêpes","Se maquiller dans le métro","Faire un créneau","Avoir le hoquet","Jouer au bowling","Traire une vache","Se réveiller en retard","Faire du yoga","Ouvrir un bocal récalcitrant","Pêcher un gros poisson","Faire du lèche-vitrine"],
  "Métier":["Pompier","Dentiste","Coiffeur","Chef d'orchestre","Policier qui règle la circulation","Astronaute","Magicien","Chirurgien","Serveur","Photographe","Prof de sport","Boulanger","Plombier","Influenceuse","Arbitre de foot","DJ"],
  "Animal":["Pingouin","Kangourou","Gorille","Serpent","Flamant rose","Poulpe","Paresseux","Crabe","Chat qui chasse une mouche","Éléphant","Dauphin","Poule","Girafe","Escargot","Moustique"],
  "Film / série":["Titanic","Le Roi Lion","Harry Potter","Spider-Man","La Reine des neiges","Les Dents de la mer","Star Wars","Squid Game","Shrek","Pirates des Caraïbes","Matrix","Le Seigneur des anneaux","Mission impossible","Cendrillon","Jurassic Park","Rocky","Barbie","Intouchables"],
  "Personnage":["Michael Jackson","Le Père Noël","Dracula","Beyoncé","Napoléon","Mario","Tarzan","Superman","Une sirène","Un zombie","Charlie Chaplin","Freddie Mercury","Un mannequin sur le podium","Une reine d'Angleterre"],
  "Objet":["Parapluie","Aspirateur","Trottinette","Machine à laver","Sèche-cheveux","Montgolfière","Grille-pain","Tondeuse","Photomaton","Ascenseur","Balançoire","Brosse à dents électrique","Trampoline","Tire-bouchon"]
};
export const MIME_CARDS = Object.entries(MIMES).flatMap(([cat,ws])=>ws.map(w=>({w,cat})));

export const TABOO = [
 ["Plage","sable","mer","soleil","vacances"],["Pizza","Italie","fromage","four","livraison"],["Mariage","robe","bague","église","mariés"],
 ["Téléphone","appeler","portable","écran","sonner"],["Café","boire","matin","tasse","noir"],["Noël","sapin","cadeaux","décembre","Père"],
 ["Football","ballon","but","équipe","Mbappé"],["Chocolat","cacao","sucré","noir","tablette"],["Instagram","photo","réseau","story","likes"],
 ["Avion","voler","aéroport","pilote","ciel"],["Dentiste","dents","carie","médecin","bouche"],["Netflix","série","film","abonnement","regarder"],
 ["Hôpital","malade","médecin","infirmière","urgences"],["Licorne","corne","cheval","magique","arc-en-ciel"],["Paris","capitale","France","tour Eiffel","ville"],
 ["Vampire","sang","dents","Dracula","nuit"],["Anniversaire","gâteau","bougies","âge","fête"],["Réveil","matin","sonner","dormir","heure"],
 ["Cinéma","film","salle","écran","popcorn"],["Pluie","eau","nuage","parapluie","mouillé"],["Selfie","photo","téléphone","soi","visage"],
 ["Bébé","enfant","couche","petit","pleurer"],["Montagne","ski","neige","sommet","haut"],["Fromage","lait","camembert","France","vache"],
 ["Douche","eau","salle de bain","savon","laver"],["Karaoké","chanter","micro","chanson","paroles"],["Police","voleur","arrêter","sirène","uniforme"],
 ["Chat","miauler","animal","chien","poils"],["Jardin","fleurs","herbe","maison","plantes"],["Amoureux","couple","cœur","aimer","Saint-Valentin"],
 ["Sushi","japonais","poisson","riz","baguettes"],["Tatouage","encre","peau","dessin","aiguille"],["École","élèves","professeur","classe","apprendre"],
 ["Pirate","bateau","trésor","perroquet","jambe de bois"],["Lune","nuit","ciel","étoile","astronaute"],["Valise","voyage","vêtements","aéroport","roulettes"],
 ["Maquillage","rouge à lèvres","visage","mascara","fond de teint"],["Sport","courir","salle","transpirer","muscles"],["Fantôme","drap","peur","mort","château"],
 ["Glace","froid","vanille","cornet","été"],["Boîte de nuit","danser","musique","videur","soirée"],["Shopping","magasin","acheter","vêtements","soldes"]
].map(([w,...f])=>({w,f}));

export const AV = {
 chill:{
  v:["Quel est ton plus gros fou rire ?","Quelle chanson honteuse écoutes-tu en boucle ?","Quel est le pire cadeau que tu aies reçu ?","Si tu pouvais échanger ta vie avec quelqu'un ici pendant une journée, ce serait qui ?","Quelle est ta plus grosse peur ?","Quel est ton talent caché ?","Quel est le dernier mensonge que tu as dit ?","Quel plat ne pourrais-tu jamais manger ?","Quelle est la chose la plus bizarre que tu fais quand tu es seul{e|} ?","Quel est ton pire souvenir d'école ?","Quelle célébrité aimerais-tu rencontrer ?","Montre ton temps d'écran de la semaine.","Quel surnom t'a-t-on déjà donné ?","Quelle est la pire coupe de cheveux que tu aies eue ?","Quelle est ta plus grosse honte en public ?","Quel est ton plaisir coupable ?","Si tu gagnais 1 million demain, que ferais-tu en premier ?","Quel âge avais-tu à ton premier bisou ?","Qui ici te connaît le mieux ?","Quel est le message le plus gênant que tu aies envoyé à la mauvaise personne ?"],
  a:["Imite {joueur} pendant 30 secondes.","Parle avec un accent jusqu'à ton prochain tour.","Fais 10 squats.","Chante le refrain de la dernière chanson que tu as écoutée.","Montre la dernière photo de ta galerie.","Fais un compliment sincère à chaque personne présente.","Danse 20 secondes sans musique.","Raconte une blague. Si personne ne rit, raconte-en une autre.","Fais une déclaration d'amour à un objet de la pièce.","Parle comme un robot jusqu'à ton prochain tour.","Essaie de lécher ton coude.","Laisse {joueur} te faire une coiffure.","Fais le tour de la pièce en marchant comme un pingouin.","Mime ton petit-déjeuner de ce matin.","Récite l'alphabet à l'envers le plus vite possible.","Fais une pub de 20 secondes pour l'objet le plus proche de toi.","Tiens la planche 30 secondes.","Imite un animal choisi par {joueur}.","Prends un selfie avec ta pire grimace et montre-le à tout le monde.","Échange un accessoire avec {joueur} jusqu'à la fin de la partie."]
 },
 fun:{
  v:["Qui ici trouves-tu le plus attirant ?","Raconte ton pire date.","As-tu déjà stalké un ex ? Jusqu'où ?","Quelle est la chose la plus folle que tu aies faite pour quelqu'un ?","Montre ta dernière recherche Google.","As-tu déjà menti à quelqu'un ici ? À propos de quoi ?","Quel est ton crush de célébrité le plus inavouable ?","Quelle est la pire chose que tu aies dite sur quelqu'un dans son dos ?","Qui ici serait le pire coloc ? Pourquoi ?","Combien de jours as-tu tenu sans te laver les cheveux, au maximum ?","Quel est ton plus gros red flag ?","As-tu déjà fait semblant d'être malade pour éviter quelqu'un ?","Avec qui ici partirais-tu sur une île déserte ?","Quelle est la chose la plus chère que tu aies cassée ?","T'es-tu déjà fait refouler d'une boîte ? Raconte.","Quelle rumeur sur toi était vraie ?","Lis à voix haute le dernier message que tu as envoyé.","Note de 1 à 10 le look de chaque personne ici ce soir.","Quelle est la pire excuse que tu aies inventée ?","Qui ici a le plus de chances de te trahir pour 1 000 € ?"],
  a:["Envoie « Tu me manques » à la 5e personne de tes contacts.","Laisse {joueur} écrire ta prochaine story.","Appelle quelqu'un en visio et chante-lui joyeux anniversaire.","Fais un défilé de mode avec 3 accessoires trouvés dans la pièce.","Laisse {joueur} faire défiler ta galerie photo pendant 15 secondes.","Fais une danse langoureuse avec une chaise.","Parle uniquement en chantant jusqu'à ton prochain tour.","Laisse {joueur} te maquiller les yeux fermés.","Fais un tutoriel make-up imaginaire de 30 secondes.","Imite la personne à ta gauche en train de draguer.","Appelle quelqu'un et annonce-lui une fausse nouvelle choquante pendant 30 secondes.","Fais ton meilleur twerk pendant 15 secondes.","Laisse le groupe choisir ta photo de profil WhatsApp pour 24 h.","Fais une déclaration dramatique à {opp}, à genoux.","Raconte ton dernier rêve en le mimant.","Écris un poème de 4 vers sur {joueur} et lis-le.","Garde une cuillère dans la bouche jusqu'à ton prochain tour.","Like 3 vieilles photos du compte de ton crush.","Imite le prof qui t'a le plus marqué{e|}.","Fais le tour de la table en faisant un compliment ridicule à chacun."]
 },
 hot:{
  v:["Qui ici embrasserais-tu si tu devais choisir ?","Quelle est la chose la plus osée que tu aies faite ?","Quel est ton fantasme le plus avouable ?","Qu'est-ce qui t'excite le plus chez quelqu'un ?","Raconte ton meilleur bisou, avec les détails.","Quel est l'endroit le plus insolite où tu as embrassé quelqu'un ?","As-tu déjà écrit à ton ex à 3 h du matin pour qu'il ou elle vienne ?","As-tu déjà craqué pour l'ex d'un ami ou d'une amie ?","Combien de personnes as-tu embrassées en une seule soirée, au maximum ?","Quel est le message le plus coquin que tu aies envoyé ?","Es-tu attiré{e|} par quelqu'un ici ? Qui ?","Quelle partie du corps de {opp} préfères-tu ?","Tu dors en pyjama, en sous-vêtements ou nu{e|} ?","As-tu déjà eu un coup d'un soir ? Raconte.","Quel est ton type physique, exactement ?","As-tu déjà envoyé une photo osée ? À qui (sans nom) ?","Note sur 10 ton attirance pour {opp}.","Quel vêtement te rend le plus sexy, selon toi ?","Quel est le pire endroit où tu as eu envie de quelqu'un ?","As-tu déjà fantasmé sur quelqu'un de ce groupe ?"],
  a:["Fais un bisou dans le cou de {opp}.","Envoie « Je pensais à toi… » à ton crush ou ton ex.","Fais un massage des épaules de 30 secondes à {opp}.","Assieds-toi sur les genoux de {opp} jusqu'à ton prochain tour.","Murmure quelque chose de coquin à l'oreille de {opp}.","Fais une danse lascive de 20 secondes devant {opp}.","Drague {opp} avec ta meilleure phrase d'accroche, les yeux dans les yeux.","Fais un slow collé-serré de 30 secondes avec {opp}.","Mange une banane de la façon la plus sexy possible.","Laisse {opp} te faire un bisou où {elle|il:opp} veut sur le visage.","Lis la composition d'un shampoing avec ta voix la plus sexy.","Fais passer un glaçon de ta bouche à ta main, puis au cou de {opp}.","Fais un compliment osé à {opp}.","Montre ta dernière conversation avec ton crush.","Enlève une chaussette avec les dents.","Tiens la main de {opp} jusqu'à ton prochain tour.","Rejoue ton dernier date avec {opp} comme partenaire.","Fais un bisou sur la joue de chaque personne présente.","Fais un bisou soufflé à {opp} chaque fois que tu bois, jusqu'à ton prochain tour.","Mords doucement l'épaule de {opp}."]
 },
 x18:{
  v:["Quelle est ta position préférée ?","Quel est l'endroit le plus fou où tu as fait l'amour ?","À quel âge as-tu perdu ta virginité ? Raconte.","Avec combien de personnes as-tu couché ?","As-tu déjà fait un plan à trois ? Sinon, tu aimerais ?","Quel est ton fantasme le plus inavouable ?","As-tu déjà couché avec quelqu'un le premier soir ?","As-tu déjà simulé ? Pourquoi ?","Qu'est-ce qui t'excite le plus chez {opp} ?","As-tu déjà envoyé des nudes ? Ça s'est bien passé ?","T'es-tu déjà fait surprendre en plein acte ?","Ton record : combien de fois en une seule nuit ?","Raconte ton pire coup, sans donner de nom.","As-tu déjà utilisé un sextoy ? Lequel ?","Plutôt dominant{e|} ou soumis{e|} ?","As-tu déjà eu un sex friend régulier ?","Si tu devais passer la nuit avec quelqu'un ici, ce serait qui ?","Quelle est la partie de ton corps la plus sensible ?","As-tu déjà fait l'amour dans un lieu public ?","Quel est le truc le plus bizarre qui t'excite ?","Avec ou sans lumière ?","As-tu déjà recouché avec un ex après la rupture ?","Note ta dernière fois sur 10.","Raconte ta meilleure nuit, sans donner de nom.","As-tu déjà embrassé quelqu'un du même sexe ? Et plus ?"],
  a:["Embrasse {opp} sur la bouche, ou prends 2 gages.","Fais un lap dance de 30 secondes à {opp}.","Enlève un vêtement de ton choix jusqu'à la fin du jeu.","Fais un suçon à {opp}, là où {elle|il:opp} accepte.","Mime ta position préférée avec un coussin.","Mordille l'oreille de {opp} pendant 5 secondes.","Body shot : bois un shot (ou mange un bonbon) posé sur le ventre de {opp}.","Embrasse le cou de {opp} pendant 10 secondes.","Strip-tease de 20 secondes. Tu gardes tes sous-vêtements.","Laisse {opp} t'embrasser où {elle|il:opp} veut, au-dessus de la ceinture.","7 minutes au paradis : isole-toi 7 minutes avec {opp}.","Chuchote à l'oreille de {opp} ce que tu lui ferais si vous étiez seuls.","Fais un massage sensuel d'une minute à {opp}.","Passe un glaçon sur le cou et le ventre de {opp}.","Montre la couleur de tes sous-vêtements à {opp}, et seulement à {elle|lui:opp}.","Simule un orgasme, le plus fort possible.","Fais un bisou à {opp} à l'endroit que le groupe choisit (au-dessus de la ceinture).","Les yeux bandés, laisse {opp} t'embrasser où {elle|il:opp} veut sur le visage et le cou.","Assieds-toi à califourchon sur {opp} pendant un tour complet.","Embrasse {opp} avec la langue pendant 5 secondes, ou prends 2 gages.","Lèche de la chantilly ou du chocolat sur le doigt de {opp}.","Envoie un message coquin à ton crush, le groupe le relit avant.","Enlève un vêtement à {opp}, avec son accord.","Fais la pose la plus hot possible avec {opp} pendant 10 secondes."]
 }
};
export const GAGES = ["Bois un grand verre d'eau cul sec.","Fais 15 pompes (sur les genoux autorisé).","Garde les yeux fermés pendant tout le prochain tour.","Parle de toi à la 3e personne jusqu'à ton prochain tour.","Laisse le groupe te dessiner une moustache à l'eye-liner.","Interdit de dire « je » jusqu'à ton prochain tour.","Chante une chanson choisie par le groupe.","Mange une cuillère d'un condiment choisi par le groupe.","Fais le tour de la pièce à cloche-pied.","Pose ton téléphone au centre, écran visible, jusqu'à ton prochain tour."];
export const AV_LEVELS = [["chill","Chill"],["fun","Fun"],["hot","Épicé"],["x18","+18"]];
export const AV_PTS = {v:1,a:2};
export const AV_BONUS = {chill:0,fun:0,hot:1,x18:2};

export const TVM_THEMES = ["Ton enfance","Tes voyages","Ta vie amoureuse","Tes plus grosses hontes","Ta famille","Tes talents cachés","La nourriture","L'école","Tes soirées","Ton boulot ou tes études","Les animaux","Une célébrité croisée","Tes blessures et accidents","Tes bêtises","Tes peurs","Ton téléphone"];

/* Paires proches exprès : l'Undercover ne doit pas se repérer tout de suite */
export const UC_PAIRS = [["Mojito","Caïpirinha"],["Tinder","Hinge"],["Amsterdam","Copenhague"],["Escape game","Laser game"],["Huître","Moule"],["Tiramisu","Panna cotta"],["Se faire ghoster","Se prendre un vent"],["Brunch","Afterwork"],["Bali","Thaïlande"],["Gueule de bois","Mal de mer"],["Speed dating","Blind date"],["Botox","Acide hyaluronique"],["Kiné","Ostéo"],["Sauna","Hammam"],["Club Med","Croisière"],["Ex","Crush"],["Raclette","Fondue"],["Beyoncé","Rihanna"],["Les Marseillais","Koh-Lanta"],["Vinted","Leboncoin"],["Fête des voisins","Crémaillère"],["Enterrement de vie de jeune fille","Baby shower"],["Selfie","Story"],["Prosecco","Champagne"],["Paddle","Kayak"],["Henné","Tatouage éphémère"],["Pilates","Yoga"],["Faux cils","Extensions de cheveux"],["Fond de teint","Anticernes"],["Témoin de mariage","Demoiselle d'honneur"],["Ikea","Maisons du Monde"],["Uber Eats","Deliveroo"],["Coachella","Tomorrowland"],["Love Island","La Villa des cœurs brisés"],["Dubaï","Las Vegas"],["Ibiza","Mykonos"],["Grey's Anatomy","Dr House"],["Friends","How I Met Your Mother"],["Bridget Jones","Le Diable s'habille en Prada"],["Pole dance","Zumba"],["Jacuzzi","Spa"],["Manucure","Pédicure"],["Blind test","Karaoké"],["Bowling","Billard"],["Croque-monsieur","Panini"],["Guacamole","Houmous"],["Lune de miel","Week-end en amoureux"],["Instagram","Pinterest"],["Massage","Gommage"],["Gloss","Baume à lèvres"],["Chantilly","Crème fraîche"],["Jalousie","Possessivité"],["Premier rendez-vous","Entretien d'embauche"],["Rupture","Divorce"],["Demande en mariage","Saint-Valentin"],["Talons aiguilles","Compensées"],["Glamping","Cabane dans les arbres"],["Égypte","Maroc"],["Aya Nakamura","Angèle"],["Squid Game","Hunger Games"],["Barbie","Polly Pocket"],["Cluedo","Loup-garou"],["Uno","Dobble"],["Tequila","Jägermeister"],["Nutella","Pâte de spéculoos"],["Wingman","Entremetteuse"],["Plan cul","Coup d'un soir"],["Nudes","Sextos"]];

export const UC_SPECIALS = [
 {id:"boss",icon:"crown",name:"Le Boss",d:"Son vote compte double. Personne ne sait qui c'est."},
 {id:"ghost",icon:"ghost",name:"Le Fantôme",d:"Continue de voter après son élimination."},
 {id:"lovers",icon:"heart",name:"Les Amoureux",d:"Deux joueurs liés, de sexe opposé si possible. Si l'un tombe, l'autre meurt de chagrin. +2 pts chacun s'ils survivent ensemble."},
 {id:"avenger",icon:"swords",name:"Le Vengeur",d:"Quand il est éliminé, il emporte la personne de son choix avec lui."},
 {id:"shield",icon:"shield",name:"Le Bouclier",d:"Survit au premier vote qui l'élimine."},
 {id:"clown",icon:"laugh",name:"Le Clown",d:"Gagne 3 points s'il se fait éliminer au premier vote."}
];
export const UC_PTS = {civil:2, under:5, white:6};

export const MYS_TYPES = {
  qui:{label:"Qui pourrait…",icon:"hand",c:"var(--c-tvm)",foot:"À 3, tout le monde pointe quelqu'un. La personne la plus désignée fait un gage."},
  jamais:{label:"Je n'ai jamais…",icon:"quote",c:"var(--c-taboo)",foot:"Celles et ceux qui l'ont déjà fait se lèvent et racontent."},
  defi:{label:"Défi",icon:"zap",c:"var(--c-mime)",foot:"Défi raté ? Gage choisi par le groupe."},
  duel:{label:"Duel",icon:"swords",c:"var(--c-av)",foot:"La personne qui perd fait un gage choisi par l'autre."},
  patate:{label:"Patate chaude",icon:"timer",c:"var(--c-uc)",foot:"Chacun son tour dans le sens des aiguilles d'une montre. Plus de 5 secondes d'hésitation et c'est perdu."},
  regle:{label:"Nouvelle règle",icon:"gavel",c:"var(--c-mys)",foot:"Valable jusqu'à la prochaine carte « Nouvelle règle ». Qui craque fait un gage."},
  devine:{label:"Devinette",icon:"lightbulb",c:"var(--c-tvm)",foot:"La première personne qui trouve marque le point."}
};
export const MYS = [
 ...["devenir célèbre","se marier en premier","oublier son propre anniversaire","mourir en premier dans un film d'horreur","partir vivre à l'autre bout du monde sur un coup de tête","écrire à son ex ce soir","finir au poste pour une bêtise","pleurer devant un dessin animé","claquer tout son salaire en un week-end","devenir influenceur ou influenceuse","avoir 10 chats à 60 ans","se perdre même avec un GPS","s'endormir en premier ce soir","rire à un enterrement"].map(x=>({t:"qui",x:"…"+x+" ?"})),
 ...["dormi pendant un cours","menti sur mon âge","fouillé le téléphone de quelqu'un","pleuré pour une histoire d'amour","oublié le prénom de quelqu'un en pleine conversation","chanté à fond sous la douche","envoyé un message à la mauvaise personne","ghosté quelqu'un","fait semblant d'aimer un cadeau","mangé un truc tombé par terre","raté un avion ou un train","stalké quelqu'un jusqu'en 2015 sur Instagram"].map(x=>({t:"jamais",x:"…"+x+"."})),
 {t:"defi",x:"{p1} doit faire rire quelqu'un en 30 secondes sans toucher personne.",s:30},
 {t:"defi",x:"{p1} parle 30 secondes de cuisine sans jamais dire « euh ».",s:30},
 {t:"defi",x:"{p1} imite 3 personnes du groupe. Les autres devinent qui."},
 {t:"defi",x:"{p1} a 20 secondes pour citer 10 pays d'Afrique.",s:20},
 {t:"defi",x:"{p1} fait une pub télé de 30 secondes pour {p2}.",s:30},
 {t:"defi",x:"{p1} doit rapporter 5 objets rouges en 30 secondes.",s:30},
 {t:"defi",x:"{p1} raconte sa journée comme un commentateur sportif."},
 {t:"defi",x:"{p1} a 15 secondes pour dire 5 mots qui riment avec « soirée ».",s:15},
 {t:"defi",x:"{p1} improvise un discours de mariage pour {p2}."},
 {t:"defi",x:"{p1} garde son sérieux 30 secondes pendant que tout le monde essaie de {la|le} faire rire.",s:30},
 {t:"defi",x:"{p1} imite le cri de 5 animaux différents."},
 {t:"defi",x:"{p1} chante une chanson d'amour à {p2} en {la|le:p2} regardant dans les yeux.",opp:true},
 {t:"duel",x:"{p1} contre {p2} : concours de regard. La première personne qui rit ou cligne perd."},
 {t:"duel",x:"{p1} contre {p2} : pierre-feuille-ciseaux en 3 manches gagnantes."},
 {t:"duel",x:"{p1} contre {p2} : qui tient le plus longtemps la chaise contre le mur ?"},
 {t:"duel",x:"{p1} contre {p2} : bataille de compliments. La première personne qui sèche perd."},
 {t:"duel",x:"{p1} contre {p2} : citez à tour de rôle des marques de vêtements. Qui sèche perd."},
 {t:"duel",x:"{p1} contre {p2} : bras de fer chinois avec le pouce."},
 {t:"duel",x:"{p1} contre {p2} : battle de danse de 15 secondes chacun. Le groupe vote.",s:15},
 {t:"duel",x:"{p1} contre {p2} : duel de grimaces. Le groupe vote pour la pire."},
 {t:"duel",x:"{p1} contre {p2} : un maximum de squats en 20 secondes.",s:20},
 {t:"duel",x:"{p1} contre {p2} : ni oui ni non. {p1} pose des questions pendant 30 secondes.",s:30},
 ...["des marques de voitures","des chanteurs et chanteuses français","des films Disney","des pays d'Europe","des choses qu'on trouve dans une salle de bain","des fromages","des séries Netflix","des prénoms qui commencent par M","des fruits","des personnages de dessin animé","des capitales","des marques de maquillage","des sports","des mots anglais qu'on utilise en français"].map(x=>({t:"patate",x:"Citez "+x+"."})),
 {t:"regle",x:"Interdit de dire « oui » et « non »."},
 {t:"regle",x:"Interdit de prononcer le prénom de quelqu'un."},
 {t:"regle",x:"Il faut lever la main avant de parler."},
 {t:"regle",x:"{p1} est {la reine|le roi}. Tout le monde l'appelle « Votre Majesté »."},
 {t:"regle",x:"Chaque fois que quelqu'un rit, il ou elle se lève."},
 {t:"regle",x:"Interdit de montrer ses dents en souriant."},
 {t:"regle",x:"{p1} et {p2} doivent finir les phrases de l'autre."},
 {t:"regle",x:"Interdit de toucher son téléphone."},
 {t:"regle",x:"Chaque phrase doit se terminer par « … mon cœur »."},
 {t:"regle",x:"Tout le monde parle en chuchotant."},
 {t:"regle",x:"{p1} est {la servante|le serviteur} de {p2} : {elle|il} lui sert à boire jusqu'à nouvel ordre."},
 {t:"devine",x:"{p1} fredonne une chanson, sans les paroles."},
 {t:"devine",x:"{p1} décrit un film en 3 mots seulement."},
 {t:"devine",x:"{p1} mime une célébrité. 30 secondes pour trouver.",s:30},
 {t:"devine",x:"{p1} dit une réplique culte de film. Trouvez le film."},
 {t:"devine",x:"{p1} dessine un animal dans les airs avec son doigt."},
 {t:"devine",x:"{p1} chante une chanson en remplaçant toutes les paroles par « la la la »."}
];

export const TEAM_NAMES = ["Les Paillettes","Les Cactus","Les Disco","Les Pirates"];
export const TEAM_COLORS = ["var(--c-mime)","var(--c-taboo)","var(--c-tvm)","var(--c-uc)"];
export const GAMES = [
 {id:"mime",name:"Mimes",icon:"drama",tag:"Par équipes",min:2,c:"var(--c-mime)",desc:"Fais deviner sans parler."},
 {id:"taboo",name:"Mot interdit",icon:"ban",tag:"Par équipes",min:2,c:"var(--c-taboo)",desc:"Fais deviner sans les mots en rouge."},
 {id:"av",name:"Action ou Vérité",icon:"flame",tag:"Quatre niveaux",min:2,c:"var(--c-av)",desc:"De Chill jusqu'à +18."},
 {id:"tvm",name:"2 vérités, 1 mensonge",icon:"scanSearch",tag:"Aux points",min:2,c:"var(--c-tvm)",desc:"Trouve l'anecdote inventée."},
 {id:"uc",name:"Undercover",icon:"mask",tag:"Rôles secrets",min:3,c:"var(--c-uc)",desc:"Démasque l'intrus parmi vous."},
 {id:"mys",name:"Jeu mystère",icon:"dices",tag:"Cartes surprises",min:2,c:"var(--c-mys)",desc:"Défis, duels et règles absurdes."}
];
