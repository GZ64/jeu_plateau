/* fonction qui se charge de comparer les positions des joueur et si il doivent se battre,
appel de la methode frapperJoueur*/
function checkCombat(victime, assaillant) {
	/* si la victime est sur la case a gauche de l'assaillant et que la victime ne se trouve pas sur une case situé a l'extreme droite
	ou si la victime est sur la case a droite de l'assaillant et que l'assaillant ne se trouve pas sur une case situé a l'extreme droite
	ou si la victime est sur la case en haut
	ou si la victime est sur la case en bas
	 */
	if ((victime.tdIdJoueur == (assaillant.tdIdJoueur - 1) && ((assaillant.tdIdJoueur - 1) % NOMBRE_COLONNE) != 0
		|| victime.tdIdJoueur == (assaillant.tdIdJoueur + 1) && ((assaillant.tdIdJoueur) % NOMBRE_COLONNE) != 0
		|| victime.tdIdJoueur == (assaillant.tdIdJoueur - NOMBRE_COLONNE)
		|| victime.tdIdJoueur == (assaillant.tdIdJoueur + NOMBRE_COLONNE))
		&& !assaillant.defense) {
		// pause de la musique d'ambiance
		gestionSon('.ambiance', 0, 'pause');
		// play de la musique combats
		gestionSon('.ambiance', 1, 'play');
		// affichage a l'utilisateur qui attaque qui
		alert(assaillant.nom + ' attaque ' + victime.nom);
		// on fait enfin appel a la methode frapperJoueur en fonction de la defense
		assaillant.frapperJoueur(victime, assaillant.arme);
		// on demande une confirmation a la victime si elle veut se defendre au prochain coup
		victime.defense = confirm(victime.nom + ', voulez-vous attaquer ou vous défendre contre le prochain coup ?\n ' +
			'OK = se defendre le prochain tour\n Annuler = attaquer le prochain tour');
		// pause de la musique de combats
		gestionSon('.ambiance', 1, 'pause');
		// la victime est-elle encore envie ?
		checkVital(victime);
		// puis on remet la musique d'ambiance
		gestionSon('.ambiance', 0, 'play');
	}
}

// fonction qui confirme le deces
function checkVital(perso) {
	if(perso.sante <= 0) { // si le joueur est mort
		// un effet sonore pour symboliser la mort du personnage
		gestionSon('.ambiance', 3, 'play');
		// maj jour des info du joueur avant de mourir
		perso.infoJoueur();
		// condoleance a la famille du joueur
		alert(perso.nom + ', Vous êtes mort :-( !');
		if(confirm('Voulez-vous rejouer ?')) { // choix replay
			location.reload(); // rafraichissement de la page
		}
		else {
			window.location = "../" // redirection vers le dossier parent
		}
	} else {
		// effet sonore de cri pour symboliser la prise de degats (ou la perte de santé)
		gestionSon('.ambiance', 2, 'play');
	}
}