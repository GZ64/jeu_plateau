/* quelques constantes pour facilité les eventuels amelioration du jeu et faciliter la lecture du code */


const NOMBRE_LIGNE = 10; // nbre de ligne du tableau html
const NOMBRE_COLONNE = 10; // nbre de colonne du tableau html
const NOMBRE_CASE = NOMBRE_LIGNE * NOMBRE_COLONNE;

const NOMBRE_BRIQUES = (NOMBRE_CASE * 12) / 100;// 12% de briques par rapport au nombres de cases

const LARGEUR_FENETRE = window.innerWidth - (window.innerWidth * 10/100);// la largeur de la fenetre pour styliser le plateau
const HAUTEUR_FENETRE = window.innerHeight - (window.innerHeight * 15/100);// idem pour la hauteur
