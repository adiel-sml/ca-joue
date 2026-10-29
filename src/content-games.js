/* Contenu des jeux Time's Up, La Bombe, Tu préfères, Je n'ai jamais, Quiz et Loup-garou */
import { TU_MORE, BOMB_MORE, WYR_MORE, QUIZ_MORE } from "./content-more.js";
import { NHIE_SOFT, NHIE_FUN, NHIE_HOT, NHIE_X18 } from "./content-nhie.js";
import { WYR_EXTRA, BOMB_EXTRA, QUIZ_EXTRA } from "./content-extra.js";
import { QUIZ_THEMED, QUIZ_RECAT } from "./content-quiz.js";
const uniq = l => { const s = new Set(); return l.filter(x => { const k = (typeof x === "string" ? x : x.q || x.join("|")).toLowerCase(); if (s.has(k)) return false; s.add(k); return true; }); };

/* ---------- Time's Up : personnalités, personnages et objets connus ---------- */
const TU_BASE = [
  "Zinédine Zidane", "Kylian Mbappé", "Omar Sy", "Jamel Debbouze", "Céline Dion", "Johnny Hallyday", "Édith Piaf", "Aya Nakamura", "Jul", "Booba",
  "Angèle", "Stromae", "David Guetta", "Squeezie", "Brad Pitt", "Leonardo DiCaprio", "Beyoncé", "Rihanna", "Shakira", "Taylor Swift",
  "Michael Jackson", "Madonna", "Elvis Presley", "Freddie Mercury", "Lady Gaga", "Ed Sheeran", "Justin Bieber", "Kim Kardashian", "Barack Obama", "Emmanuel Macron",
  "Napoléon", "Jules César", "Cléopâtre", "Albert Einstein", "Marie Curie", "Léonard de Vinci", "Picasso", "Mozart", "Elon Musk", "Mark Zuckerberg",
  "Steve Jobs", "Bill Gates", "Lionel Messi", "Cristiano Ronaldo", "Serena Williams", "Usain Bolt", "Teddy Riner", "Tony Parker", "Michael Jordan", "Roger Federer",
  "Rafael Nadal", "Coco Chanel", "Karl Lagerfeld", "Marilyn Monroe", "Charlie Chaplin", "Louis de Funès", "Jean Dujardin", "Marion Cotillard", "Brigitte Bardot", "Gad Elmaleh",
  "Kev Adams", "Cyril Hanouna", "Nabilla", "Dwayne Johnson", "Will Smith", "Tom Cruise", "Johnny Depp", "Angelina Jolie", "Jennifer Lopez", "Ariana Grande",
  "Billie Eilish", "Drake", "Eminem", "Snoop Dogg", "Bob Marley", "Kanye West", "Elizabeth II", "Lady Diana", "Harry Styles", "Zlatan Ibrahimović",
  "Neymar", "Thomas Pesquet", "Harry Potter", "Hermione", "Dark Vador", "Yoda", "Spider-Man", "Batman", "Superman", "Wonder Woman",
  "Hulk", "Iron Man", "Thor", "Shrek", "Mickey", "Donald", "Pikachu", "Mario", "Sonic", "Lara Croft",
  "James Bond", "Sherlock Holmes", "Astérix", "Obélix", "Tintin", "Bob l'éponge", "Homer Simpson", "Cendrillon", "Blanche-Neige", "Elsa",
  "Simba", "Nemo", "Buzz l'Éclair", "Woody", "Jack Sparrow", "Indiana Jones", "Rocky", "Terminator", "Le Joker", "Dracula",
  "Frankenstein", "Barbie", "Peter Pan", "Pinocchio", "Le Petit Prince", "Gandalf", "Gollum", "Dora l'exploratrice", "Scooby-Doo", "Garfield",
  "Winnie l'ourson", "Stitch", "Les Minions", "Olaf", "Lucky Luke", "Le Père Noël", "La Fée Clochette", "Ariel", "Aladdin", "Le Génie",
  "Mulan", "Hercule", "Robin des Bois", "Zorro", "Le Grinch", "La tour Eiffel", "La statue de la Liberté", "Le Titanic", "L'iPhone", "Netflix",
  "Instagram", "McDonald's", "Coca-Cola", "Nutella", "Lego", "Le Rubik's Cube", "Le Tamagotchi", "La PlayStation", "Le Monopoly", "Fortnite",
  "Tetris", "Pac-Man", "Big Ben", "Les pyramides", "La Grande Muraille de Chine", "La Joconde", "Disneyland", "Las Vegas", "Hollywood", "Le Tour de France"
];

/* ---------- La Bombe : thèmes ---------- */
const BOMB_BASE = [
  ...["OU", "CH", "AN", "ON", "EAU", "IN", "OI", "GN", "ILL", "PR", "TR", "QU", "ER", "AR", "OR", "UR", "EU", "AI", "ION", "ETTE"].map(s => `Un mot qui contient « ${s} »`),
  ...["A", "B", "C", "D", "F", "G", "L", "M", "P", "R", "S", "T", "V"].map(l => `Un mot qui commence par ${l}`),
  ...["Un pays", "Une marque de vêtements", "Un fruit ou un légume", "Un animal", "Un prénom de fille", "Un prénom de garçon", "Un chanteur ou une chanteuse", "Un film", "Une série", "Un métier",
    "Un sport", "Une ville de France", "Un objet de la cuisine", "Une couleur", "Un personnage Disney", "Une marque de voiture", "Un footballeur", "Une boisson", "Un plat", "Un instrument de musique",
    "Un dessert", "Un super-héros", "Une partie du corps", "Un vêtement", "Une application", "Un jeu de société", "Une capitale", "Un moyen de transport", "Un mot anglais", "Une chose qu'on trouve à la plage"]
];

/* ---------- Tu préfères : "choix A|choix B" ---------- */
const wyr = s => s.trim().split("\n").map(l => l.split("|").map(x => x.trim()));
const WYR_BASE = {
  normal: wyr(`Avoir le hoquet toute ta vie|Éternuer toutes les cinq minutes
Ne plus jamais manger de chocolat|Ne plus jamais manger de fromage
Pouvoir voler|Être invisible
Vivre sans musique|Vivre sans films ni séries
Parler toutes les langues|Parler aux animaux
Être toujours en retard de 10 minutes|Être toujours en avance de 30 minutes
Revivre ton enfance|Voir ta vie dans 20 ans
Des vacances à la mer|Des vacances à la montagne
Un mois sans téléphone|Un mois sans voir tes amis
Être riche sans amis|Être pauvre avec plein d'amis
Avoir 10 enfants|Ne pas en avoir
Lire dans les pensées|Voir l'avenir
Dormir 4 heures par nuit|Dormir 12 heures par nuit
Manger seulement des pâtes toute ta vie|Manger seulement du riz toute ta vie
Perdre tous tes souvenirs|Ne plus pouvoir en créer de nouveaux
Être célèbre|Être riche
Vivre dans le passé|Vivre dans le futur
Avoir un dragon|Avoir une licorne
Toujours dire ce que tu penses|Ne plus jamais pouvoir parler
Chanter au lieu de parler|Danser au lieu de marcher
Avoir les cheveux verts à vie|Ne plus avoir de sourcils à vie
Ne plus jamais prendre l'avion|Ne plus jamais prendre le train
Passer une journée avec ton idole|Gagner 10 000 €
Vivre sans réseaux sociaux|Vivre sans sucre
Être la personne la plus drôle du groupe|Être la plus belle du groupe
Faire le tour du monde seul|Rester en France avec tes amis
Habiter un château hanté|Habiter une cabane au fond des bois
Cuisiner comme un chef|Danser comme un pro
Ne jamais avoir froid|Ne jamais avoir chaud
Croiser ton ex en soirée|Croiser ton ancien prof de maths en soirée
Crier chaque fois que tu as peur|Rire chaque fois que tu es triste
Une heure dans un ascenseur en panne avec ton ex|Une heure dans un ascenseur en panne avec ton patron
Un bouton sur le nez le jour de ton mariage|La pluie toute la journée de ton mariage
Manger uniquement sucré|Manger uniquement salé
Ne plus jamais te voir dans un miroir|Ne plus jamais être pris en photo
Avoir une voix aiguë comme avec de l'hélium|Avoir une voix très grave
Être un génie que personne ne comprend|Être quelqu'un de banal mais très aimé
Gagner au loto|Rencontrer l'amour de ta vie demain
Ne plus jamais boire de café|Ne plus jamais boire d'alcool
Connaître la date de ta mort|Connaître la cause de ta mort`),
  hot: wyr(`Embrasser ton ex|Embrasser ton pire ennemi
Que ton crush lise tous tes messages|Que tes parents lisent tous tes messages
Un date parfait mais sans bisou|Un date nul avec un bisou incroyable
Sortir avec quelqu'un de très beau mais ennuyeux|Sortir avec quelqu'un de moche mais hilarant
Que tes parents voient ton historique internet|Que ton patron le voie
Avouer ton crush ce soir|Ne plus jamais le revoir
Un premier bisou devant tout le monde|Pas de bisou du tout
Sortir avec le meilleur ami de ton ex|Sortir avec l'ex de ton meilleur ami
Recevoir un message coquin de ton patron|Recevoir un message coquin de ton ex
Une relation à distance|Vivre ensemble dès le premier mois
Un partenaire très jaloux|Un partenaire totalement indifférent
Te faire draguer par quelqu'un ici|Te faire draguer par une star
Partir en vacances avec ton ex|Partir en vacances avec la famille de ton crush
Montrer ta galerie photo au groupe|Montrer tes recherches Google au groupe
Un bisou de 30 secondes devant tes parents|Un slow devant ton patron
Te marier à Las Vegas sur un coup de tête|Ne jamais te marier
Lire à voix haute tes derniers messages à ton crush|Lire ta dernière recherche internet
Sortir avec quelqu'un de 15 ans de plus que toi|Sortir avec quelqu'un de 10 ans de moins que toi
Que ton crush te voie au réveil|Que ton crush te voie après une nuit de fête
Un partenaire qui ronfle|Un partenaire qui parle en dormant
Embrasser quelqu'un ici|Envoyer « tu me manques » à ton ex
Un date au McDo|Un date au musée
Ton ex devient ton patron|Ton ex devient ton voisin
Ghoster quelqu'un|Te faire ghoster
Craquer pour ton meilleur ami|Craquer pour le frère ou la sœur de ton meilleur ami
Un date avec une star filmé à la télé|Un date secret avec quelqu'un ici
Dire « je t'aime » en premier|Attendre que l'autre le dise
Raconter ton pire date à ton crush|Raconter ton meilleur date à ton ex
Que ton ex sorte avec ton meilleur ami|Que ton ex sorte avec ta sœur ou ton frère
Te faire draguer par message vocal|Te faire draguer par lettre manuscrite`),
  x18: wyr(`Faire l'amour dans un ascenseur|Faire l'amour sur une plage
Ne plus jamais faire l'amour|Ne plus jamais manger ton plat préféré
Un plan à trois|Une nuit avec ta star préférée
Faire l'amour lumière allumée|Faire l'amour dans le noir complet
Que ton ex voie tes nudes|Que tes parents te surprennent au lit
Un partenaire très expérimenté|Un partenaire totalement débutant
Mener la danse au lit|Te laisser guider au lit
Faire l'amour en silence obligatoire|Faire l'amour en parlant tout le temps
Faire un strip-tease devant ce groupe|Envoyer un nude à ton ex
Le matin|Le soir
Coucher avec ton meilleur ami|Coucher avec ton ex
Te faire surprendre par ta mère|Te faire surprendre par ton patron
Un coup d'un soir incroyable|Une relation tranquille mais sans passion
Une semaine sans sexe|Une semaine sans téléphone
Des menottes|Un bandeau sur les yeux
Faire l'amour dans une voiture|Faire l'amour dans une cabine d'essayage
Avouer ton fantasme ici|Avouer ton nombre de partenaires ici
De la chantilly|Du chocolat fondu
Un partenaire qui fait beaucoup de bruit|Un partenaire qui n'en fait aucun
Recevoir un massage érotique|Faire un massage érotique
Coucher le premier soir|Attendre trois mois
Faire l'amour devant un miroir|Vous filmer, rien que pour vous deux
Très bon au lit mais nul en bisou|Très bon en bisou mais nul au lit
Un sex friend régulier|Une relation sérieuse sans sexe pendant six mois
Faire l'amour sous la douche|Faire l'amour dans un jacuzzi
Un partenaire qui parle beaucoup au lit|Un partenaire qui ne dit rien
Changer de partenaire chaque semaine|Le même partenaire toute ta vie
Que ton crush voie ta liste de fantasmes|Que ta mère la voie
Te faire surprendre par tes colocs|Te faire surprendre par tes voisins
Une nuit torride sans bisou|Une heure de bisous sans rien d'autre`)
};

/* ---------- Je n'ai jamais (la carte commence par « Je n'ai jamais… ») ---------- */
const nhie = s => s.trim().split("\n").map(x => x.trim());

/* ---------- Quiz : [question, bonne réponse, 3 mauvaises réponses, catégorie] ---------- */
const Q = (cat, list) => list.map(([q, a, ...w]) => ({ q, a, w, cat }));
const QUIZ_BASE = [
  ...Q("Culture générale", [
    ["Quelle est la capitale de l'Australie ?", "Canberra", "Sydney", "Melbourne", "Perth"],
    ["Quel est le plus grand océan du monde ?", "Le Pacifique", "L'Atlantique", "L'océan Indien", "L'Arctique"],
    ["Quelle planète est surnommée la planète rouge ?", "Mars", "Jupiter", "Vénus", "Saturne"],
    ["Qui a peint La Joconde ?", "Léonard de Vinci", "Michel-Ange", "Raphaël", "Picasso"],
    ["En quelle année l'homme a-t-il marché sur la Lune pour la première fois ?", "1969", "1965", "1972", "1959"],
    ["Quel est le plus long fleuve de France ?", "La Loire", "La Seine", "Le Rhône", "La Garonne"],
    ["Combien de jours compte une année bissextile ?", "366", "365", "364", "367"],
    ["Quel est le plus grand animal du monde ?", "La baleine bleue", "L'éléphant d'Afrique", "La girafe", "Le cachalot"],
    ["Quelle langue parle-t-on au Brésil ?", "Le portugais", "L'espagnol", "Le brésilien", "L'anglais"],
    ["Quel pays a la forme d'une botte ?", "L'Italie", "La Grèce", "L'Espagne", "Le Portugal"],
    ["Combien de côtés a un hexagone ?", "6", "5", "7", "8"],
    ["Quel est le symbole chimique de l'or ?", "Au", "Or", "Ag", "Go"],
    ["Quel organe pompe le sang dans le corps ?", "Le cœur", "Le foie", "Les poumons", "Les reins"],
    ["Dans quelle ville se trouve la statue de la Liberté ?", "New York", "Washington", "Boston", "Los Angeles"],
    ["Quelle est la monnaie du Royaume-Uni ?", "La livre sterling", "L'euro", "Le dollar", "Le franc"],
    ["Quelle est la capitale du Canada ?", "Ottawa", "Toronto", "Montréal", "Vancouver"],
    ["Combien de pattes a une araignée ?", "8", "6", "10", "12"],
    ["Qui a écrit « Les Misérables » ?", "Victor Hugo", "Émile Zola", "Molière", "Balzac"],
    ["Quelle couleur obtient-on en mélangeant du bleu et du jaune ?", "Le vert", "Le violet", "L'orange", "Le marron"],
    ["Combien d'États composent les États-Unis ?", "50", "52", "48", "51"],
    ["Quel est le plus petit pays du monde ?", "Le Vatican", "Monaco", "Malte", "Le Liechtenstein"],
    ["Dans quel pays se trouve le Machu Picchu ?", "Le Pérou", "Le Mexique", "La Bolivie", "Le Chili"],
    ["Quelle est la date de la fête nationale française ?", "Le 14 juillet", "Le 1er mai", "Le 11 novembre", "Le 8 mai"],
    ["Quel métal est liquide à température ambiante ?", "Le mercure", "Le plomb", "L'étain", "Le zinc"],
    ["Qui a été le premier président des États-Unis ?", "George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"],
    ["Combien d'os compte le corps humain adulte ?", "206", "186", "226", "306"],
    ["Quel est le plus grand désert chaud du monde ?", "Le Sahara", "Le Gobi", "Le Kalahari", "L'Atacama"],
    ["Quelle est la couleur du cheval blanc d'Henri IV ?", "Blanc", "Noir", "Gris", "Marron"],
    ["Combien d'heures compte une semaine ?", "168", "148", "172", "160"],
    ["Quel est l'animal terrestre le plus rapide ?", "Le guépard", "Le lion", "L'antilope", "Le lévrier"],
    ["Combien de cœurs a une pieuvre ?", "3", "1", "2", "8"],
    ["Quel animal est connu pour changer de couleur ?", "Le caméléon", "L'iguane", "Le crapaud", "La salamandre"],
    ["Quel monument a été construit pour l'Exposition universelle de 1889 ?", "La tour Eiffel", "L'Arc de triomphe", "Le Sacré-Cœur", "Le Grand Palais"],
    ["Dans quel musée se trouve La Joconde ?", "Le Louvre", "Le musée d'Orsay", "Le Centre Pompidou", "Le Prado"],
    ["Combien de lettres compte l'alphabet français ?", "26", "24", "25", "28"],
    ["Quel est le plus grand pays du monde en superficie ?", "La Russie", "Le Canada", "La Chine", "Les États-Unis"]
  ]),
  ...Q("Géographie", [
    ["Quelle est la capitale de l'Espagne ?", "Madrid", "Barcelone", "Séville", "Valence"],
    ["Quelle est la capitale du Japon ?", "Tokyo", "Kyoto", "Osaka", "Séoul"],
    ["Dans quel pays se trouve Marrakech ?", "Le Maroc", "L'Algérie", "La Tunisie", "L'Égypte"],
    ["Quelle est la capitale de l'Italie ?", "Rome", "Milan", "Naples", "Venise"],
    ["Quelle mer borde Marseille ?", "La Méditerranée", "L'Atlantique", "La Manche", "La mer du Nord"],
    ["Quelle ville est surnommée « la Ville rose » ?", "Toulouse", "Lyon", "Bordeaux", "Nice"],
    ["Quelle ville accueille chaque année en mai un célèbre festival de cinéma ?", "Cannes", "Nice", "Deauville", "Avignon"],
    ["Lisbonne est la capitale de quel pays ?", "Le Portugal", "L'Espagne", "Le Brésil", "L'Italie"],
    ["Quelle langue parle-t-on officiellement en Argentine ?", "L'espagnol", "Le portugais", "L'argentin", "L'italien"],
    ["De quelle région vient la tartiflette ?", "La Savoie", "L'Alsace", "La Bretagne", "L'Auvergne"],
    ["Dans quel pays se trouve la ville de Barcelone ?", "L'Espagne", "L'Italie", "Le Portugal", "La France"],
    ["Quelle est la capitale de la Belgique ?", "Bruxelles", "Anvers", "Liège", "Bruges"],
    ["Quel fleuve traverse Paris ?", "La Seine", "La Loire", "Le Rhône", "La Marne"],
    ["Dans quel pays se trouvent les pyramides de Gizeh ?", "L'Égypte", "Le Mexique", "Le Soudan", "La Jordanie"]
  ]),
  ...Q("Cinéma et séries", [
    ["Avec Titanic et Ben-Hur, quel film détient le record de 11 Oscars ?", "Le Retour du roi", "Avatar", "Le Parrain", "Forrest Gump"],
    ["Dans « Le Roi Lion », comment s'appelle le père de Simba ?", "Mufasa", "Scar", "Rafiki", "Zazu"],
    ["Qui joue Jack dans « Titanic » ?", "Leonardo DiCaprio", "Brad Pitt", "Matt Damon", "Johnny Depp"],
    ["Comment s'appelle l'école de Harry Potter ?", "Poudlard", "Beauxbâtons", "Durmstrang", "Pré-au-Lard"],
    ["Dans « La Casa de Papel », comment surnomme-t-on le cerveau du braquage ?", "Le Professeur", "Berlin", "Tokyo", "Rio"],
    ["Quel personnage de Star Wars révèle à Luke qu'il est son père ?", "Dark Vador", "Yoda", "Obi-Wan Kenobi", "L'Empereur"],
    ["Dans « Friends », comment s'appelle le café ?", "Central Perk", "Monk's Café", "MacLaren's", "Luke's"],
    ["Quelle série se déroule dans la ville de Hawkins ?", "Stranger Things", "Riverdale", "Dark", "Wednesday"],
    ["Dans « La Reine des neiges », comment s'appelle le bonhomme de neige ?", "Olaf", "Sven", "Kristoff", "Hans"],
    ["Qui a réalisé « Jurassic Park » ?", "Steven Spielberg", "James Cameron", "George Lucas", "Ridley Scott"],
    ["Quelle princesse épouse Shrek ?", "Fiona", "Aurore", "Belle", "Raiponce"],
    ["Dans « Intouchables », qui joue Driss ?", "Omar Sy", "Jamel Debbouze", "Kad Merad", "Dany Boon"],
    ["Dans quel film entend-on la chanson « Hakuna Matata » ?", "Le Roi Lion", "Aladdin", "Tarzan", "Le Livre de la jungle"],
    ["Quelle série met en scène la famille Lannister ?", "Game of Thrones", "The Witcher", "Vikings", "The Crown"],
    ["Quel super-héros se cache derrière Peter Parker ?", "Spider-Man", "Batman", "Iron Man", "Superman"],
    ["Qui est l'ennemi juré de Batman ?", "Le Joker", "Lex Luthor", "Thanos", "Magnéto"],
    ["De quel pays vient la série « Squid Game » ?", "La Corée du Sud", "Le Japon", "La Chine", "La Thaïlande"],
    ["Quel acteur incarne Iron Man dans les films Marvel ?", "Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo"],
    ["Dans « Bienvenue chez les Ch'tis », dans quelle ville est muté le héros ?", "Bergues", "Lille", "Dunkerque", "Calais"],
    ["Comment s'appelle le cowboy de « Toy Story » ?", "Woody", "Buzz", "Zigzag", "Rex"],
    ["Quelle saga suit l'héroïne Katniss Everdeen ?", "Hunger Games", "Divergente", "Twilight", "Le Labyrinthe"],
    ["Dans « Twilight », comment s'appelle le vampire dont Bella tombe amoureuse ?", "Edward", "Jacob", "Damon", "Stefan"]
  ]),
  ...Q("Musique", [
    ["Quel chanteur est surnommé le « Roi de la pop » ?", "Michael Jackson", "Elvis Presley", "Prince", "Justin Timberlake"],
    ["De quelle ville venaient les Beatles ?", "Liverpool", "Londres", "Manchester", "Birmingham"],
    ["Qui chante « Alors on danse » ?", "Stromae", "Gims", "Kendji Girac", "Christophe Maé"],
    ["Qui chante « Djadja » ?", "Aya Nakamura", "Angèle", "Wejdene", "Vitaa"],
    ["Qui chante « Shape of You » ?", "Ed Sheeran", "Justin Bieber", "Shawn Mendes", "Sam Smith"],
    ["Qui chante « Bad Guy » ?", "Billie Eilish", "Dua Lipa", "Ariana Grande", "Lorde"],
    ["Combien de cordes a une guitare classique ?", "6", "4", "5", "7"],
    ["Qui chantait « Non, je ne regrette rien » ?", "Édith Piaf", "Dalida", "Barbara", "Mireille Mathieu"],
    ["Qui chante « Formidable » ?", "Stromae", "Grand Corps Malade", "Orelsan", "Bigflo et Oli"],
    ["De quel pays vient le groupe ABBA ?", "La Suède", "La Norvège", "Le Danemark", "Les Pays-Bas"],
    ["Qui chante « Balance ton quoi » ?", "Angèle", "Clara Luciani", "Louane", "Zaz"],
    ["Quel rappeur marseillais est surnommé « l'Ovni » ?", "Jul", "SCH", "Naps", "Soprano"],
    ["Qui chante « Hello », sorti en 2015 ?", "Adele", "Beyoncé", "Rihanna", "Lady Gaga"],
    ["Qui chante « Umbrella » ?", "Rihanna", "Beyoncé", "Shakira", "Katy Perry"],
    ["Qui chante « Despacito » avec Daddy Yankee ?", "Luis Fonsi", "J Balvin", "Ricky Martin", "Enrique Iglesias"],
    ["Quel chanteur français était surnommé « l'idole des jeunes » ?", "Johnny Hallyday", "Eddy Mitchell", "Claude François", "Michel Sardou"],
    ["Qui chante « Blinding Lights » ?", "The Weeknd", "Drake", "Bruno Mars", "Post Malone"]
  ]),
  ...Q("Sport", [
    ["En quelle année la France a-t-elle gagné sa première Coupe du monde de football ?", "1998", "2006", "1986", "2002"],
    ["Combien de points vaut un essai au rugby ?", "5", "3", "4", "7"],
    ["Dans quel sport utilise-t-on un volant ?", "Le badminton", "Le tennis", "Le squash", "Le ping-pong"],
    ["Combien de joueurs par équipe sur un terrain de basket ?", "5", "6", "7", "4"],
    ["Combien de joueurs par équipe sur un terrain de football ?", "11", "10", "12", "9"],
    ["Quel tournoi de tennis se joue sur terre battue à Paris ?", "Roland-Garros", "Wimbledon", "L'US Open", "L'Open d'Australie"],
    ["Tous les combien d'années ont lieu les Jeux olympiques d'été ?", "4 ans", "2 ans", "3 ans", "5 ans"],
    ["Quelle ville a accueilli les Jeux olympiques d'été 2024 ?", "Paris", "Los Angeles", "Tokyo", "Londres"],
    ["Combien de temps dure un match de football, hors arrêts de jeu et prolongations ?", "90 minutes", "80 minutes", "100 minutes", "120 minutes"],
    ["Quel nageur détient le record de médailles d'or olympiques ?", "Michael Phelps", "Mark Spitz", "Ryan Lochte", "Léon Marchand"],
    ["Combien de trous compte un parcours de golf classique ?", "18", "9", "12", "20"],
    ["Dans quel pays est né Lionel Messi ?", "L'Argentine", "L'Espagne", "L'Uruguay", "Le Brésil"],
    ["Quel club de football joue au Parc des Princes ?", "Le PSG", "L'OM", "L'OL", "Le Stade rennais"]
  ]),
  ...Q("Pop culture", [
    ["Quel réseau social a pour logo un fantôme ?", "Snapchat", "TikTok", "Instagram", "BeReal"],
    ["Qui a fondé Facebook ?", "Mark Zuckerberg", "Elon Musk", "Jeff Bezos", "Bill Gates"],
    ["Quelle marque a pour logo une pomme croquée ?", "Apple", "Samsung", "Google", "Huawei"],
    ["Comment s'appelle l'assistant vocal d'Apple ?", "Siri", "Alexa", "Cortana", "Bixby"],
    ["De quel pays vient la pizza ?", "L'Italie", "La France", "L'Espagne", "La Grèce"],
    ["Quel est l'ingrédient principal du guacamole ?", "L'avocat", "Le concombre", "Le petit pois", "La courgette"],
    ["Quel cocktail mélange rhum, menthe et citron vert ?", "Le mojito", "La piña colada", "Le spritz", "Le cosmopolitan"],
    ["Quel est l'ingrédient de base du houmous ?", "Le pois chiche", "La lentille", "Le haricot rouge", "La fève"],
    ["Quel jeu vidéo met en scène un plombier moustachu ?", "Super Mario", "Sonic", "Zelda", "Pac-Man"],
    ["Dans quel jeu vidéo construit-on un monde avec des blocs ?", "Minecraft", "Les Sims", "Fortnite", "Tetris"],
    ["Comment s'appelle le Pokémon jaune électrique le plus célèbre ?", "Pikachu", "Évoli", "Raichu", "Salamèche"],
    ["Quelle application de rencontre a popularisé le « swipe » ?", "Tinder", "Hinge", "Meetic", "Happn"],
    ["Quel est le vrai nom du youtubeur Squeezie ?", "Lucas Hauchard", "Cyprien Iov", "Norman Thavaud", "Natoo"]
  ])
];

export const TU_WORDS = uniq([...TU_BASE, ...TU_MORE]);
export const BOMB_THEMES = uniq([...BOMB_BASE, ...BOMB_MORE, ...BOMB_EXTRA]);
export const WYR = Object.fromEntries(Object.keys(WYR_BASE).map(k => [k, uniq([...WYR_BASE[k], ...WYR_MORE[k], ...WYR_EXTRA[k]])]));
/* Je n'ai jamais : listes réécrites dans content-nhie.js (au moins 250 cartes par niveau) */
export const NHIE = { soft: uniq(NHIE_SOFT), fun: uniq(NHIE_FUN), hot: uniq(NHIE_HOT), x18: uniq(NHIE_X18) };
export const QUIZ = uniq([...QUIZ_BASE, ...QUIZ_MORE, ...QUIZ_EXTRA, ...QUIZ_THEMED]).map(q => QUIZ_RECAT[q.q] ? { ...q, cat: QUIZ_RECAT[q.q] } : q);
/* Thèmes du Quiz, dans l'ordre d'affichage */
export const QUIZ_THEMES = ["Culture générale", "Géographie", "Histoire", "Sciences et nature", "Cinéma et séries", "Musique", "Sport", "Pop culture"];

/* ---------- Loup-garou ---------- */
export const LG_ROLES = {
  wolf: { name: "Loup-garou", icon: "paw", d: "Chaque nuit, les loups choisissent ensemble une victime. Le jour, fais-toi passer pour un villageois." },
  villager: { name: "Villageois", icon: "house", d: "Tu n'as pas de pouvoir. Débats, trouve les loups et vote contre eux." },
  seer: { name: "Voyante", icon: "eye", d: "Chaque nuit, tu découvres le rôle d'un joueur de ton choix." },
  witch: { name: "Sorcière", icon: "flask", d: "Tu as une potion de vie pour sauver la victime des loups et une potion de mort pour éliminer quelqu'un. Une seule fois chacune." },
  hunter: { name: "Chasseur", icon: "crosshair", d: "Si tu meurs, tu élimines aussitôt la personne de ton choix." },
  cupid: { name: "Cupidon", icon: "heart", d: "La première nuit, tu désignes deux amoureux. Si l'un meurt, l'autre meurt de chagrin." }
};
export const LG_SPECIALS = ["seer", "witch", "hunter", "cupid"];
