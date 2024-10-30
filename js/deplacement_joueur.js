// variable utilisées par la methode deplacerJoueur pour le calcul de la nouvelle position
var anciennePosition,
nouvellePosition;


// gestion evenementielle en JQuery
$(function() {
	$(document).keydown(function(e) { // on observe l'evenement keydown
		switch(e.which) { // on test la valeur de la touche pressée
			case 37: // a gauche
				if(droitJouer) { // tour a joueur2
					perso2.deplacerJoueur(deplacementOk, 'gauche'); // on fait appel a la methode delacerJoueur
				} else { // tour a joueur1
					perso1.deplacerJoueur(deplacementOk, 'gauche');
				}
				break;
			case 39: // a droite
				if(droitJouer) {
					perso2.deplacerJoueur(deplacementOk, 'droite');
				} else {
					perso1.deplacerJoueur(deplacementOk, 'droite');
				}
				break;
			case 38: // en haut
				if(droitJouer) {
					perso2.deplacerJoueur(deplacementOk, 'haut');
				} else {
					perso1.deplacerJoueur(deplacementOk, 'haut');
				}
				break;
			case 40: // en bas
				if(droitJouer) {
					perso2.deplacerJoueur(deplacementOk, 'bas');
				} else {
					perso1.deplacerJoueur(deplacementOk, 'bas');
				}
				break;
			case 13: // case entree
				if(droitJouer) {  // tour a joueur2
					// switch des opacité des divJoueur
					$('#divJoueur1').fadeTo(600, 1);
					$('#divJoueur2').fadeTo(600, 0.5);
					// materialisation graphique du tour a joueur2
					affichageTourJoueur(perso2.img);
					// suppression du droit de jouer a joueur2
					droitJouer = false;
					// MAJ de la carte
					rafraichirCarte(perso2, deplacementOk);
					// MAJ des infos du joueur2 pour la prise d'arme
					perso2.infoJoueur();
					checkCombat(perso1, perso2);
					// MAJ des infos du joueur1 pour la perte de santé eventuel
					perso1.infoJoueur();
					// affichage des cases autorisées pour le joueur1
					deplacementLimite(perso1.tdIdJoueur);
				} else {  // tour a joueur1
					$('#divJoueur2').fadeTo(600, 1);
					$('#divJoueur1').fadeTo(600, 0.5);
					affichageTourJoueur(perso1.img);
					droitJouer = true;
					rafraichirCarte(perso1, deplacementOk);
					perso1.infoJoueur();
					checkCombat(perso2, perso1);
					perso2.infoJoueur();
					deplacementLimite(perso2.tdIdJoueur);
				}
				break;
			default:
				break;
		}
	});
});
