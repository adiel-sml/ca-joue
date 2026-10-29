/* Je n'ai jamais : chaque carte complète « Je n'ai jamais… ».
   Soft : souvenirs et expériences de la vie. Fun : bêtises, hontes et mensonges.
   Épicé : séduction, crushs, bisous, ex et jalousie, sans rien de sexuel.
   +18 : uniquement des expériences sexuelles. */
const L = s => s.trim().split("\n").map(x => x.trim()).filter(Boolean);

export const NHIE_SOFT = L(`
pris l'avion
dormi sous une tente
mangé des escargots
mangé des cuisses de grenouille
goûté au caviar
fait du ski
fait du snowboard
fait de la plongée sous-marine
nagé dans l'océan
vu un dauphin en vrai
caressé un serpent
monté à cheval
monté sur un chameau
fait un tour en montgolfière
sauté en parachute
fait de saut à l'élastique
pris un bateau de croisière
dormi dans un train de nuit
vu une éclipse
vu une étoile filante
vu une aurore boréale
visité Disneyland
visité le Louvre
monté en haut de la tour Eiffel
traversé l'Atlantique
voyagé en Asie
voyagé en Afrique
voyagé en Amérique
parlé des heures à un inconnu dans le train
pris un cours de danse
joué d'un instrument de musique
chanté dans une chorale
joué dans une pièce de théâtre
gagné un trophée
gagné une médaille sportive
gagné à un jeu à gratter
trouvé un billet par terre
perdu mon portefeuille
cassé un os
eu de points de suture
passé une nuit à l'hôpital
regardé l'aiguille pendant une prise de sang
eu de poisson rouge
eu de chat
eu de hamster
donné un nom ridicule à un animal
planté un arbre
cultivé mes propres légumes
fait mon propre pain
réussi une recette du premier coup
brûlé un plat en cuisine
mangé un piment très fort
bu un café sans sucre jusqu'au bout
mangé avec des baguettes
fait un pique-nique
dormi à la belle étoile
fait un feu de camp
grillé des chamallows
fait un château de sable
fait un bonhomme de neige
fait une bataille de boules de neige
fait une bataille d'eau
construit une cabane dans les bois
grimpé dans un arbre
attrapé un poisson
vu un spectacle de cirque
vu un feu d'artifice en vrai
assisté à un concert
assisté à un match dans un stade
vu un film au cinéma en plein air
regardé un film trois fois de suite
lu un livre en une seule nuit
relu le même livre plusieurs fois
écrit un poème
tenu un journal intime
cru au Père Noël après dix ans
fait une collection de quelque chose
fait un puzzle de plus de 1000 pièces
résolu un Rubik's Cube
gagné au Monopoly
fini un jeu vidéo à 100 %
joué à un jeu vidéo toute une nuit
construit quelque chose en Lego
dessiné un portrait
peint un tableau
fait de la poterie
tricoté quelque chose
cousu un vêtement
fait un tour de magie à quelqu'un
appris une langue étrangère
parlé trois langues
pris un cours de cuisine
fait du bénévolat
donné mon sang
participé à une course à pied
couru un semi-marathon
fait du yoga
fait une randonnée en montagne
dormi dans un refuge de montagne
vu un ours en liberté
vu un lion en vrai
visité une ferme
trait une vache
fait plus de 50 kilomètres à vélo d'un coup
conduit une voiture
conduit un scooter
fait une balade en calèche
pris le métro dans une autre capitale
fait du stop
perdu mon chemin à l'étranger
dormi dans un aéroport
raté un avion
eu une valise perdue par une compagnie aérienne
voyagé sans personne
fait un road trip
dormi dans une voiture
vu le lever du soleil après une nuit blanche
vu un coucher de soleil sur la mer
nagé de nuit
nagé dans un lac
sauté d'un plongeoir de plus de 5 mètres
fait un tour de grande roue
fait des montagnes russes
eu le mal des transports
eu le mal de mer
eu un coup de soleil terrible
eu le hoquet pendant plus d'une heure
eu une indigestion de chocolat
mangé un gâteau entier
mangé une glace en plein hiver
bu un smoothie aux légumes
aimé les épinards
mangé des sushis
mangé un hamburger de trois étages
fait un barbecue
cuisiné pour plus de dix personnes
organisé une fête surprise
eu une fête surprise
oublié mon propre anniversaire
fêté mon anniversaire à l'étranger
reçu un cadeau fait main
offert un cadeau fait main
emballé un cadeau de travers
ouvert un cadeau avant la date
cherché mes lunettes alors qu'elles étaient sur ma tête
cherché mon téléphone alors qu'il était dans ma main
mis mes chaussures au mauvais pied
porté deux chaussettes différentes toute la journée
porté un pull à l'envers en public
coupé mes cheveux moi-même
teint mes cheveux d'une couleur flashy
fait de tatouage temporaire
eu les cheveux très longs
porté un appareil dentaire
eu une carie
eu peur du dentiste
eu peur du noir
eu peur des clowns
eu peur des araignées
touché une araignée volontairement
vu un fantôme, du moins je crois
lu mon horoscope chaque jour
cru à mon horoscope
vu un vœu d'anniversaire se réaliser
jeté une pièce dans une fontaine
cassé un miroir
senti un tremblement de terre
vécu une grosse tempête
vécu une panne d'ascenseur
dormi plus de 12 heures d'affilée
fait une sieste de plus de trois heures
regardé une série entière en un week-end
regardé des dessins animés le dimanche matin après vingt ans
chanté à tue-tête dans ma voiture
dansé dans ma cuisine
parlé à mon chien comme à un humain
répondu à quelqu'un qui ne me parlait pas
fait coucou à quelqu'un qui ne me saluait pas
tenu la porte à quelqu'un qui était très loin
répondu « vous aussi » au serveur qui m'a souhaité bon appétit
trébuché dans la rue
glissé sur une plaque de verglas
fait tomber mon téléphone dans l'eau
cassé l'écran de mon téléphone
eu un téléphone à clapet
envoyé une lettre par la poste cette année
écrit une carte postale
reçu un colis surprise
gagné un concours sur internet
participé à une émission de télé
rencontré une célébrité
pris un selfie avec une star
demandé un autographe
assisté à un concert au premier rang
attendu plus de deux heures dans une file d'attente
fait la queue pour la sortie d'un nouveau téléphone
gagné une peluche géante à la fête foraine
fait du karting
fait un strike au bowling
joué au golf
marqué un but dans un vrai match
participé à une compétition de danse
fait de la gymnastique
réussi le grand écart
tenu sur les mains plus de dix secondes
fait la roue
jonglé avec trois balles
fait du monocycle
fait du skateboard
fait du surf
fait du paddle
fait du kayak
fait de l'escalade
fait de l'accrobranche
fait de la tyrolienne
visité une grotte
visité un château fort
visité un musée de cire
vu un tableau célèbre en vrai
pris des cours de piano
appris une chorégraphie entière
réparé quelque chose grâce à un tuto
monté un meuble sans la notice
repeint une pièce
déménagé plus de cinq fois
vécu à l'étranger
changé de ville sur un coup de tête
adopté un animal
ramené un animal perdu à son propriétaire
soigné un oiseau blessé
assisté à une naissance
gardé des enfants
eu de filleul
fait un discours devant plus de cent personnes
présenté un exposé sans notes
eu un fou rire en classe
fait partie des délégués de classe
eu une très bonne note sans avoir révisé
reçu un prix à l'école
fait une dictée sans faute
récité un poème appris il y a des années
fait du théâtre d'improvisation
pleuré devant un film d'animation
ri à en avoir mal au ventre
vu un match de foot en direct à l'étranger
mangé dans un restaurant étoilé
goûté un insecte
bu du lait directement à la vache
vu une baleine
fait du traîneau à chiens
dormi dans un igloo
vu des chutes d'eau géantes
pris un hélicoptère
visité une île déserte
vu les pyramides
fêté le nouvel an à l'étranger
vu le soleil de minuit
gagné un concours de dessin
participé à un tournoi de jeux vidéo
appris à coder
créé un site internet
fabriqué un meuble
`);

export const NHIE_FUN = L(`
menti sur mon âge
fait semblant d'être malade pour éviter une soirée
séché un cours
copié pendant un contrôle
fait le mur
inventé une excuse pour annuler au dernier moment
donné un faux prénom à quelqu'un
donné un faux numéro
fait semblant de téléphoner pour éviter quelqu'un
fait semblant de ne pas voir quelqu'un dans la rue
lu les messages de quelqu'un en cachette
fouillé dans le sac de quelqu'un
répété un secret qu'on m'avait confié
dit du mal de quelqu'un présent ce soir
menti pendant ce jeu
passé plus d'une heure à regarder le profil de quelqu'un
liké une vieille photo par erreur
créé un faux compte
supprimé une photo parce qu'elle n'avait pas assez de likes
posté une photo trop retouchée
mis une photo de moi en fond d'écran
pris cinquante selfies pour en garder un seul
envoyé un message à la mauvaise personne
envoyé une capture d'écran à la personne dont je parlais
supprimé un message avant qu'il soit lu
laissé quelqu'un en vu exprès
ghosté un ami
bloqué quelqu'un sur un coup de tête
débloqué quelqu'un juste pour voir ce qu'il devenait
écouté une conversation qui ne me concernait pas
fait semblant de comprendre une blague
ri à une blague nulle de mon patron
dormi au travail
dormi en cours
posé un jour de congé pour regarder une série
menti sur mon CV
fait semblant d'avoir lu un livre
fait semblant de connaître un artiste
chanté faux exprès au karaoké
pris le micro au karaoké sans qu'on me le demande
dansé sur une table
fait un discours en soirée sans qu'on me le demande
perdu mes clés en soirée
perdu ma voix après une soirée
oublié la fin d'une soirée
vomi en soirée
mangé un kebab à 4 heures du matin
dormi chez quelqu'un sans lui demander
pris un taxi que je ne pouvais pas payer
fait la fête jusqu'au lever du soleil
enchaîné deux soirées sans dormir
menti à mes parents sur l'endroit où j'étais
pris la voiture de mes parents sans le dire
caché une mauvaise note à mes parents
imité la signature de mes parents
laissé quelqu'un d'autre se faire punir à ma place
cassé quelque chose chez quelqu'un sans le dire
mangé le dernier morceau en faisant comme si de rien n'était
volé une frite dans l'assiette de quelqu'un
bu directement à la bouteille dans le frigo
remis dans l'assiette un aliment tombé par terre
regardé dans l'armoire à pharmacie de quelqu'un
utilisé la brosse à dents de quelqu'un d'autre
porté le même vêtement trois jours de suite
reniflé mon t-shirt pour savoir s'il était propre
porté un vêtement pour le rendre au magasin ensuite
rendu un cadeau en magasin
offert un cadeau qu'on m'avait offert
oublié un prénom juste après qu'on me l'a dit
appelé quelqu'un par le mauvais prénom
salué un inconnu en croyant le connaître
fait la bise à quelqu'un qui tendait la main
raté un high five
parlé tout seul dans la rue
rejoué une dispute dans ma tête pendant des heures
hurlé devant un match à la télé
insulté un arbitre
pleuré devant une émission de télé-réalité
voté pour un candidat de télé-réalité
appris une danse TikTok
supprimé une vidéo TikTok de honte
passé plus de huit heures sur mon téléphone en un jour
regardé mon téléphone en plein film au cinéma
parlé fort au cinéma
mangé quelque chose en magasin avant de payer
pris des échantillons gratuits plusieurs fois
resquillé dans une file d'attente
fait semblant de ne pas parler français à l'étranger
menti sur mon métier à un inconnu
raconté une histoire inventée en soirée
exagéré une anecdote pour la rendre plus drôle
eu un ami imaginaire
donné un surnom à ma voiture
dormi avec une peluche après dix-huit ans
eu une amende
eu un PV de stationnement
eu un flash de radar
raté mon permis
calé au feu vert
fait trois fois le tour d'un rond-point
oublié où était garée ma voiture
enfermé mes clés dans la voiture
claqué la porte avec les clés à l'intérieur
fait tomber quelque chose dans les toilettes
bouché les toilettes chez quelqu'un
utilisé les toilettes d'un café sans rien consommer
fait pipi dans la mer
fait pipi dans une piscine
fait semblant de dormir pour ne pas aider
fait semblant d'avoir du travail pour éviter quelqu'un
dit « je suis en route » alors que j'étais encore chez moi
dit « j'arrive dans cinq minutes » en sortant de la douche
annulé un rendez-vous par message une heure avant
oublié un anniversaire et fait semblant que non
souhaité un anniversaire le mauvais jour
lu la fin d'un livre en premier
spoilé une série exprès
avancé dans une série sans attendre la personne avec qui je la regardais
emprunté le compte Netflix de quelqu'un sans le dire
utilisé le wifi des voisins
mangé des céréales au dîner
mangé une pizza froide au petit-déjeuner
commandé à manger deux fois dans la même journée
caché un paquet de chips pour ne pas partager
mangé le goûter de quelqu'un
léché le couvercle d'un yaourt en public
chanté sous la douche jusqu'à ce que quelqu'un frappe
imité mon prof devant toute la classe
eu une heure de colle
fini dans le bureau du directeur
eu un fou rire dans un moment très sérieux
ri tellement fort que tout le monde s'est retourné
pleuré de rire en public
eu le hoquet pendant un entretien important
renversé un verre sur quelqu'un
envoyé un vocal de plus de cinq minutes
écouté un vocal en accéléré
ignoré l'appel de ma mère
raccroché au nez de quelqu'un
fait semblant de ne plus avoir de réseau
éteint mon téléphone pour faire croire qu'il n'avait plus de batterie
inventé une excuse pour partir plus tôt du travail
envoyé un mail à toute l'entreprise par erreur
répondu à tous par erreur
critiqué mon patron en croyant que le micro était coupé
oublié de couper ma caméra en visio
fait une visio en pyjama en bas
mangé pendant une réunion en visio, caméra allumée
fait semblant de travailler
pris une pause de plus d'une heure
volé des stylos au bureau
mangé la nourriture de quelqu'un dans le frigo du bureau
regardé une série au travail
fait une sieste dans ma voiture
menti sur mes loisirs pour impressionner
dit que j'adorais un plat que je détestais
fait semblant d'aimer un cadeau
revendu un cadeau en ligne
acheté quelque chose de très cher sur un coup de tête
regretté un achat le jour même
acheté un vêtement que je n'ai jamais porté
commandé quelque chose sur internet en pleine nuit
dépensé tout mon salaire en un week-end
emprunté de l'argent sans le rendre
oublié de rembourser quelqu'un
prétexté avoir oublié ma carte pour ne pas payer
partagé l'addition au centime près
laissé un énorme pourboire par erreur
quitté un restaurant sans payer
commandé un plat sans savoir ce que c'était
fait semblant de m'y connaître en vin
recraché discrètement un plat dans une serviette
donné ma nourriture au chien sous la table
inventé une allergie pour éviter un plat
mangé quelque chose tombé par terre
bu un verre que quelqu'un avait laissé
fait un concours de shots
perdu un pari stupide
relevé un défi débile
refusé de payer un pari perdu
triché à un jeu de société
renversé le plateau en perdant au Monopoly
boudé après avoir perdu à un jeu
fait la tête toute une soirée
fait semblant de bouder pour obtenir quelque chose
pleuré pour obtenir quelque chose
caché du bazar sous mon lit avant l'arrivée d'invités
rangé ma chambre en mettant tout dans un placard
laissé la vaisselle s'accumuler une semaine
reniflé le lait pour savoir s'il était encore bon
passé une journée entière en pyjama
passé un week-end entier sans sortir
fait le ménage à 3 heures du matin
commencé un régime le lundi et arrêté le mardi
menti sur mon poids
juré de ne plus jamais boire et recommencé le week-end suivant
payé une salle de sport sans jamais y aller
supplié un objet de fonctionner
tapé sur un appareil pour le réparer
cru une fausse info sur internet
partagé une fausse info
cliqué sur un lien douteux
oublié mon mot de passe juste après l'avoir changé
utilisé le même mot de passe partout
rempli un formulaire avec un faux nom
écouté la même chanson plus de vingt fois d'affilée
chanté une chanson avec les mauvaises paroles pendant des années
crié des paroles que je ne connaissais pas en concert
fait de la guitare imaginaire en public
dansé devant le miroir en me filmant
imité un accent devant quelqu'un qui avait cet accent
eu une conversation entière en emojis
envoyé un emoji gênant à mon patron
écrit « mdr » sans rire
répondu « haha » à un message triste par erreur
appelé quelqu'un avec ma poche
eu mon téléphone qui sonne en plein silence
fouillé mon sac pour éviter un regard
pris l'ascenseur pour un seul étage
attendu qu'un voisin parte pour sortir de chez moi
attendu dans la voiture la fin d'une chanson
ouvert un colis qui n'était pas pour moi
ouvert le frigo dix fois en espérant qu'il se remplisse
grignoté en cachette au milieu de la nuit
fini un paquet de gâteaux en une soirée
gardé un objet trouvé
gardé la monnaie rendue en trop
gagné une dispute en ayant tort
refusé d'admettre que j'avais tort
tapé mon propre nom sur Google
regardé ce que devenaient mes anciens camarades sur les réseaux
relu mes vieux messages pour rire
écrit un avis négatif par vengeance
crié sur un livreur en retard
caché un cadeau tellement bien que je l'ai perdu
oublié quelqu'un à une station-service
pris la mauvaise sortie trois fois de suite
oublié de mettre ma ceinture et pris une amende
appelé le service client pour me plaindre d'une broutille
fait semblant de parler une langue étrangère
mangé tout un pot de glace devant une série
regardé des vidéos de chats pendant plus d'une heure
dormi pendant un film au cinéma
oublié ce que je venais chercher dans une pièce
répondu « toi aussi » à quelqu'un qui me souhaitait un bon anniversaire
applaudi à l'atterrissage d'un avion
pris mon assiette en photo avant de manger
répondu à un message trois semaines plus tard
inventé un mot d'excuse pour ne pas aller en sport
porté des lunettes de soleil en intérieur pour cacher une gueule de bois
envoyé un message tout en majuscules par erreur
fait une sieste pendant un mariage
`);

export const NHIE_HOT = L(`
embrassé quelqu'un dans cette pièce
eu un crush sur quelqu'un ici
dragué quelqu'un ici
embrassé quelqu'un le premier soir
embrassé deux personnes dans la même soirée
embrassé un inconnu en boîte
embrassé quelqu'un sous la pluie
embrassé quelqu'un dans un ascenseur
embrassé quelqu'un dans un taxi
embrassé quelqu'un à minuit le soir du nouvel an
embrassé quelqu'un pour gagner un pari
embrassé quelqu'un pendant un Action ou Vérité
embrassé quelqu'un du même sexe
embrassé l'ex d'un ami
embrassé quelqu'un de plus de dix ans mon aîné
embrassé quelqu'un dont je ne connaissais pas le prénom
donné mon premier bisou avant douze ans
raté un bisou en me cognant le nez
regretté un bisou dès la seconde d'après
reçu un bisou volé
volé un bisou
eu un crush sur un prof
eu un crush sur un collègue
eu un crush sur le frère ou la sœur d'un ami
eu un crush sur l'ex d'un ami
eu un crush sur un ami de mes parents
eu un crush sur un serveur ou une serveuse
eu un crush sur mon coiffeur ou ma coiffeuse
eu un crush sur un personnage de dessin animé
eu un crush sur une célébrité pendant des années
collé une affiche de mon crush dans ma chambre
écrit le prénom de mon crush partout dans mes cahiers
imaginé mon mariage avec mon crush
passé des heures sur le profil de mon crush
liké une vieille photo de mon crush par erreur
changé de trajet pour croiser mon crush
appris l'emploi du temps de quelqu'un pour le croiser
fait semblant d'aimer un sport pour plaire à quelqu'un
fait semblant d'aimer une série pour plaire à quelqu'un
menti sur mes goûts pour séduire
ri à toutes les blagues de quelqu'un pour lui plaire
rougi en parlant à mon crush
bégayé devant quelqu'un qui me plaisait
éteint mon téléphone de stress après avoir écrit à mon crush
écrit un message de drague sans jamais oser l'envoyer
fait une déclaration d'amour par message
fait une déclaration d'amour en face
écrit une lettre d'amour
reçu une lettre d'amour anonyme
envoyé une lettre d'amour anonyme
offert des fleurs pour séduire
reçu des fleurs d'un admirateur secret
eu un admirateur secret
organisé un rendez-vous surprise
fait un premier date au cinéma
passé toute une nuit à parler pendant un date
fait un date catastrophique
quitté un date en plein milieu
inventé une urgence pour fuir un date
demandé à un ami de m'appeler pour fuir un date
fait deux dates le même jour
fait deux dates avec deux personnes différentes la même semaine
accepté un date juste pour le restaurant gratuit
payé l'addition d'un date qui ne me plaisait pas
fait un blind date
fait du speed dating
eu un compte sur une appli de rencontre
swipé à droite sur tout le monde
matché avec quelqu'un que je connaissais
matché avec un ex sur une appli
matché avec un collègue sur une appli
menti sur mon profil de rencontre
mis une photo de profil qui date de plusieurs années
rencontré quelqu'un qui ne ressemblait pas du tout à ses photos
discuté des semaines avec quelqu'un sans jamais le rencontrer
ghosté quelqu'un après un date
subi un ghosting après un date
donné un faux numéro à quelqu'un qui me draguait
dragué quelqu'un dans le métro
dragué quelqu'un à la salle de sport
dragué quelqu'un au travail
dragué un serveur ou une serveuse
dragué quelqu'un en vacances
dragué quelqu'un sur les réseaux sociaux
dragué quelqu'un en le confondant avec une autre personne
utilisé une phrase de drague toute faite
réussi une drague avec une phrase nulle
pris un râteau devant tout le monde
pris un râteau par message
mis un râteau à quelqu'un ici
refusé un premier date puis regretté
flirté pour avoir quelque chose gratuitement
flirté pour éviter une amende
flirté avec quelqu'un en couple
flirté devant mon ex pour le provoquer
provoqué la jalousie de quelqu'un exprès
fouillé le téléphone de mon partenaire
lu les messages de mon partenaire en cachette
vérifié la dernière connexion de quelqu'un
vérifié si mon crush avait vu ma story
posté une story juste pour mon crush
posté une photo juste pour faire réagir mon ex
écrit à mon ex à trois heures du matin
appelé mon ex après avoir bu
recontacté un ex des années après
gardé des photos de mon ex
gardé un cadeau d'un ex
porté un vêtement de mon ex après la rupture
pleuré pour une rupture pendant plus d'un mois
rompu par message
rompu le jour de la Saint-Valentin
rompu juste avant les vacances
rompu et recommencé l'histoire le lendemain
eu une relation qui a duré moins d'une semaine
eu une relation à distance
eu une relation secrète
caché une relation à mes amis
caché une relation à mes parents
présenté quelqu'un à mes parents au bout d'une semaine
dit « je t'aime » en premier
dit « je t'aime » sans le penser
dit « je t'aime » à la mauvaise personne
entendu « je t'aime » sans savoir quoi répondre
fait un câlin qui a duré beaucoup trop longtemps
tenu la main de quelqu'un au cinéma
posé ma tête sur l'épaule de quelqu'un pour tenter ma chance
fait semblant d'avoir froid pour avoir une veste
fait semblant de ne pas savoir danser pour qu'on m'apprenne
dansé un slow avec un inconnu
dansé collé-serré en boîte
fait une danse lascive en soirée
fait un clin d'œil à un inconnu
souri à quelqu'un jusqu'à ce qu'il vienne me parler
écrit mon numéro sur une serviette pour quelqu'un
reçu un numéro écrit sur une serviette
accepté un verre offert par un inconnu
offert un verre à un inconnu pour engager la conversation
parlé à quelqu'un toute une soirée sans demander son prénom
oublié le prénom de mon date
appelé mon partenaire par le prénom de mon ex
confondu deux conversations de drague
envoyé un message de drague à la mauvaise personne
envoyé un message de drague à mes parents par erreur
eu un fou rire pendant un bisou
eu le hoquet pendant un date
fait une tache sur mon haut pendant un premier date
renversé mon verre pendant un date
eu une haleine d'ail à un premier rendez-vous
pris trois chewing-gums avant un bisou
entraîné mes bisous sur ma main
répété une déclaration devant le miroir
cherché des conseils de drague sur internet
demandé conseil à toute ma famille avant un date
joué les entremetteurs entre deux amis
fait se rencontrer deux personnes qui sont encore ensemble
eu une histoire d'un été
eu une histoire de vacances qui a continué après
pleuré à la fin d'une histoire de vacances
oublié un amour de vacances en une semaine
eu une histoire avec un collègue
eu une histoire avec un voisin
eu une histoire avec un ami d'enfance
eu une histoire avec le meilleur ami de mon ex
eu une histoire avec deux personnes amies entre elles
eu une histoire avec quelqu'un de beaucoup plus jeune
eu deux relations en même temps
trompé un partenaire
découvert une tromperie
pardonné une tromperie
surveillé l'ex de mon partenaire sur les réseaux
ressenti de la jalousie envers un ami de mon partenaire
fait une crise de jalousie
provoqué une crise de jalousie
inventé un rendez-vous pour faire réagir quelqu'un
inventé un partenaire pour échapper à un dragueur
fait semblant d'être célibataire
enlevé une bague pour paraître célibataire
dragué quelqu'un en me faisant passer pour quelqu'un d'autre
posé un lapin à un date
attendu plus d'une heure un date qui n'est jamais venu
invité un date chez moi dès le premier soir
cuisiné pour séduire quelqu'un
fait passer un plat commandé pour ma propre cuisine
préparé un dîner aux chandelles
organisé une Saint-Valentin surprise
passé la Saint-Valentin sans personne
envoyé une carte de Saint-Valentin anonyme
reçu une demande en mariage
fait une demande en mariage
refusé une demande en mariage
pensé à me marier avec quelqu'un ici
rêvé de quelqu'un ici
rêvé d'un ex
rêvé de mon patron de façon romantique
craqué pour l'ex d'un ami
craqué pour le partenaire d'un ami
craqué pour quelqu'un de cette soirée
fait une balade romantique au clair de lune
regardé les étoiles avec quelqu'un qui me plaisait
dormi dans les bras de quelqu'un sans rien de plus
écrit une chanson pour quelqu'un
chanté une chanson d'amour à quelqu'un
dédié une chanson à quelqu'un à la radio
fait une playlist pour quelqu'un qui me plaisait
offert un cadeau trop cher pour séduire
offert un cadeau à un crush sans lui dire pourquoi
attendu des heures une réponse en fixant mon téléphone
analysé un message de drague avec mes amis pendant une heure
demandé à un ami d'écrire mes messages de drague
écrit les messages de drague d'un ami
attendu exprès avant de répondre à un crush
mis des heures à choisir une tenue pour un date
changé trois fois de tenue avant un rendez-vous
acheté une tenue juste pour un date
changé de look pour reconquérir quelqu'un
essayé de reconquérir un ex
réussi à reconquérir un ex
refusé de revoir un ex qui voulait revenir
gardé une amitié avec un ex
parlé de mon ex pendant tout un date
comparé mon partenaire à mon ex
eu un crush sur deux personnes en même temps
eu un coup de foudre
eu un coup de foudre dans les transports
échangé des regards avec quelqu'un pendant tout un trajet en métro
cherché quelqu'un sur les réseaux à partir de son seul prénom
envoyé une demande d'ami à un crush à deux heures du matin
laissé un commentaire de drague sous une photo
envoyé un cœur sur une story pour draguer
répondu à une story juste pour lancer la conversation
envoyé un vocal de drague
fait une déclaration publique sur les réseaux
affiché une relation sur les réseaux
supprimé toutes les photos d'un ex après la rupture
archivé les photos d'un ex au lieu de les supprimer
regardé de vieilles photos de couple en pleurant
eu envie d'embrasser quelqu'un pendant cette soirée
menti sur mon nombre d'ex
menti sur mon premier bisou
dragué quelqu'un pendant un mariage
attrapé le bouquet de la mariée
embrassé quelqu'un pendant une fête de famille
flirté avec quelqu'un pendant des vacances en famille
fait semblant de dormir pour rester contre quelqu'un
embrassé quelqu'un sur une grande roue
embrassé quelqu'un dans la neige
embrassé quelqu'un dans l'eau
donné un baiser sur la main à quelqu'un
fait un slow pendant un mariage avec un inconnu
envoyé « tu dors ? » à un crush en pleine nuit
`);

export const NHIE_X18 = L(`
fait l'amour dans une voiture
fait l'amour à la plage
fait l'amour dans une piscine
fait l'amour sous la douche
fait l'amour dans une baignoire
fait l'amour dans un jacuzzi
fait l'amour dans un ascenseur
fait l'amour dans un avion
fait l'amour dans un train
fait l'amour dans les toilettes d'une boîte
fait l'amour dans une cabine d'essayage
fait l'amour dans un parc
fait l'amour dans une forêt
fait l'amour dans un champ
fait l'amour sur un balcon
fait l'amour sur un toit
fait l'amour dans une tente
fait l'amour dans un hôtel de luxe
fait l'amour dans le lit de mes parents
fait l'amour chez mes parents alors qu'ils étaient là
fait l'amour au travail
fait l'amour dans un bureau
fait l'amour dans une salle de classe
fait l'amour dans une bibliothèque
fait l'amour au cinéma
fait l'amour pendant une soirée, dans la chambre d'à côté
fait l'amour dehors en pleine journée
fait l'amour sous la pluie
fait l'amour dans la neige
fait l'amour dans la cuisine
fait l'amour sur la machine à laver
fait l'amour sur un canapé chez des amis
fait l'amour dans le lit d'un ami
fait l'amour dans un lit superposé
fait l'amour en camping
couché le premier soir
couché avec quelqu'un rencontré le soir même
couché avec quelqu'un rencontré sur une appli le jour même
couché avec un collègue
couché avec mon patron ou ma patronne
couché avec un ex après la rupture
couché avec un ex en étant en couple
couché avec l'ex d'un ami
couché avec le meilleur ami de mon ex
couché avec deux personnes différentes le même week-end
couché avec deux personnes différentes le même jour
couché avec quelqu'un de plus de quinze ans mon aîné
couché avec quelqu'un dont j'ai oublié le prénom
couché avec quelqu'un sans connaître son prénom
couché avec un ami et fait comme si de rien n'était
couché avec quelqu'un présent ce soir
couché avec un voisin
couché avec un inconnu en vacances
couché avec quelqu'un d'un peu connu
fait un plan à trois
eu envie d'un plan à trois
proposé un plan à trois
refusé un plan à trois
participé à une soirée échangiste
eu un sex friend
eu un sex friend pendant plus d'un an
eu deux sex friends en même temps
vu un sex friend devenir une vraie relation
eu un coup d'un soir
eu un coup d'un soir avec quelqu'un que je recroise souvent
regretté un coup d'un soir
vécu un coup d'un soir inoubliable
envoyé de nudes
envoyé un nude à la mauvaise personne
reçu un nude sans l'avoir demandé
gardé des nudes d'un ex
pris des photos sexy de moi
filmé un moment intime
regardé un film porno avec quelqu'un
regardé un porno pour apprendre quelque chose
essayé une position vue dans un film
essayé le Kamasutra
essayé plus de dix positions différentes
eu un orgasme en moins de cinq minutes
simulé un orgasme
eu plusieurs orgasmes d'affilée
fait l'amour plus de trois fois dans la même nuit
fait l'amour plus de deux heures d'affilée
fait l'amour plus de cinq fois dans une journée
passé un week-end entier au lit
fait l'amour le matin avant le travail
fait l'amour pendant la pause déjeuner
fait l'amour en sachant que quelqu'un pouvait entendre
fait exprès de faire du bruit en faisant l'amour
fait l'amour en silence total pour ne pas me faire entendre
entendu mes voisins faire l'amour
tapé au mur pour que mes voisins arrêtent
surpris mes colocs en plein acte
surpris mes parents en plein acte
vu mes parents débarquer en plein acte
vu un coloc débarquer en plein acte
utilisé de sextoy
acheté un sextoy en ligne
acheté un sextoy en magasin
offert un sextoy
reçu un sextoy en cadeau
utilisé un sextoy à deux
utilisé de menottes
utilisé un bandeau sur les yeux
attaché quelqu'un au lit
eu les mains attachées au lit
fait de jeu de rôle au lit
fait l'amour avec un déguisement
fait de strip-tease
fait un strip-tease à quelqu'un
reçu un strip-tease
fait un lap dance
reçu un lap dance
joué au strip-poker
perdu tous mes vêtements au strip-poker
fait de massage érotique
reçu un massage érotique
utilisé de l'huile de massage au lit
utilisé de la nourriture au lit
utilisé de la chantilly au lit
utilisé des glaçons au lit
préparé une playlist pour faire l'amour
allumé des bougies avant de faire l'amour
réservé un hôtel juste pour une nuit torride
fait un week-end coquin
offert de la lingerie à quelqu'un
acheté de la lingerie pour séduire
porté de la lingerie sexy sous mes vêtements toute une journée
dormi sans rien sur moi
fait du naturisme
pris un bain de minuit sans maillot
envoyé un message coquin pendant le travail
envoyé un message très chaud à la mauvaise personne
fait du sexting
fait du sexting avec quelqu'un que je n'avais jamais vu
fait l'amour au téléphone
fait l'amour par visio
eu une aventure torride en vacances
eu une aventure avec quelqu'un de beaucoup plus expérimenté
partagé la première fois de quelqu'un
perdu ma virginité avant 16 ans
perdu ma virginité après 20 ans
perdu ma virginité dans un endroit insolite
perdu ma virginité avec quelqu'un rencontré le soir même
raconté ma première fois en détail à mes amis
menti sur ma première fois
menti sur mon nombre de partenaires
eu plus de dix partenaires
eu plus de vingt partenaires
fait l'amour avec quelqu'un du même sexe
eu envie de faire l'amour avec quelqu'un du même sexe
fantasmé sur quelqu'un du même sexe
fantasmé sur quelqu'un de cette pièce
fantasmé sur un prof
fantasmé sur mon patron
pensé à une célébrité en faisant l'amour
pensé à quelqu'un d'autre en faisant l'amour
dit le mauvais prénom au lit
ri en plein acte
eu un fou rire pendant les préliminaires
eu une crampe en plein acte
cassé un lit
cassé un objet en faisant l'amour
réveillé mes voisins en faisant l'amour
reçu une plainte des voisins pour du bruit au lit
fait l'amour avec de la fièvre
fait l'amour pour me réconcilier après une dispute
fait l'amour pour oublier une rupture
couché avec quelqu'un pour rendre un ex jaloux
couché avec quelqu'un par vengeance
couché avec quelqu'un juste pour l'expérience
couché avec un inconnu pendant un festival
fait l'amour dans une tente en festival
fait l'amour sur une plage nudiste
fait l'amour dans la piscine d'un hôtel la nuit
fait l'amour dans un sauna
fait l'amour dans un hammam
fait l'amour dans un vestiaire
fait l'amour dans une voiture garée en ville
fait l'amour sur le capot d'une voiture
fait l'amour dans un escalier
fait l'amour contre un mur
fait l'amour devant un miroir
fait l'amour devant une fenêtre ouverte
fait l'amour avec la lumière allumée
fait l'amour uniquement dans le noir complet
fait l'amour les yeux bandés
fait l'amour sans dire un seul mot
parlé crûment au lit
demandé à mon partenaire de parler crûment
donné une note à un partenaire
tenu une liste de mes partenaires
écrit la liste de mes fantasmes
avoué un fantasme à mon partenaire
réalisé un fantasme
réalisé un fantasme avec quelqu'un rencontré le soir même
refusé un fantasme à mon partenaire
testé au lit quelque chose que j'ai regretté
fait des préliminaires de plus d'une heure
fait l'amour sans préliminaires
eu un suçon visible au travail
fait un suçon à quelqu'un pour marquer mon territoire
eu des griffures dans le dos après une nuit
laissé des griffures dans le dos de quelqu'un
eu des courbatures après une nuit agitée
marché bizarrement le lendemain d'une nuit agitée
annulé un rendez-vous pour rester au lit avec quelqu'un
fait l'amour juste avant un examen
fait l'amour le soir du nouvel an à minuit
fait l'amour pendant un mariage
fait l'amour avec un témoin de mariage
fait l'amour pendant une fête de famille
fait l'amour dans une maison de vacances familiale
fait l'amour alors que des amis dormaient dans la même pièce
fait l'amour devant un film
fait l'amour pendant un match à la télé
arrêté de faire l'amour pour répondre au téléphone
fait l'amour à quatre heures du matin après une soirée
fait l'amour après avoir trop bu et tout oublié le lendemain
couché avec quelqu'un que je ne trouvais pas attirant au départ
couché avec quelqu'un que mes amis détestaient
couché avec quelqu'un que je n'ai jamais revu
couché avec quelqu'un que je n'aurais pas dû
caché un coup d'un soir à mes colocs
fait sortir quelqu'un en douce au petit matin
quitté un appartement en douce après une nuit
fait semblant de dormir pour éviter un deuxième round
réclamé un deuxième round
fait l'amour au réveil avant même de dire bonjour
envoyé une photo coquine pour réveiller quelqu'un
eu une relation purement physique pendant des mois
recouché avec un ex juste pour voir si c'était pareil
regretté de ne pas avoir couché avec quelqu'un
refusé une nuit torride et regretté ensuite
accepté une nuit torride et regretté ensuite
essayé le sexe tantrique
lu un livre érotique en public
regardé un film érotique en cachette quand j'étais ado
cherché des positions sur internet avant un rendez-vous
acheté des préservatifs en rougissant
oublié les préservatifs au pire moment
continué à faire l'amour alors qu'on frappait à la porte
fait l'amour dans une voiture de location
fait l'amour sur un bateau
fait l'amour dans une chambre d'hôtel avec vue
gémi exprès pour faire plaisir à mon partenaire
fait l'amour dans un camping-car
fait l'amour dans une cabane
fait l'amour sur une table
fait l'amour sous les étoiles
fait l'amour dans un hamac
fait l'amour en montagne
`);
