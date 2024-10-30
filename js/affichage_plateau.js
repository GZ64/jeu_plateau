var tr,
td,
compteur=1,
placement,
divJoueur1,
divJoueur2,
reponse,
body,
armeDispo = ['fiole', 'batte_de_baseball', 'hache', 'pistolet'], // tableau des armes a inserer sur la carte
checkBrique = [], // tableau de booleen: false => case vide et true => case pleine pour les briques et les 2 joueurs
checkArmes = [], // tableau de booleen: false => case vide et true => case arme
deplacementOk = [], // tableau de booleen: false => case inaccessible et true => case accessible
nick1 = prompt('entrez le nom du premier joueur'),
nick2 = prompt('entrez le nom du deuxième joueur'),/*
on instancie 2 objets joueurs qui representerons... Les 2 joueur! */
perso1 = new Joueur(nick1, 'couteau', 100, 'info1', 0, 'divJoueur1', 'joueur1', false),
perso2 = new Joueur(nick2, 'couteau', 100, 'info2', 0, 'divJoueur2', 'joueur2', false);


// on recupere la taille de la fenetre qui conditionnera le plateau via body
body = document.getElementsByTagName('body');
body[0].style.width = LARGEUR_FENETRE + "px";
body[0].style.height = HAUTEUR_FENETRE + "px";

// initialisation des tableaux a false
for(var i = 1; i <= NOMBRE_CASE; i++) {
	checkBrique[i] = false;
	checkArmes[i] = false;
	deplacementOk[i] = false;
}

// construction du tableau html
for(var i = 0; i < NOMBRE_LIGNE; i++) {
	tr = document.createElement('tr');
	for(var j = 0; j < NOMBRE_COLONNE; j++) {
		td  = document.createElement('td');
		td.id = compteur;
		compteur++;
		tr.appendChild(td);
	}
	document.getElementById('plateau').appendChild(tr);
}

/* placement des briques sur la carte qui correspondent a des cases inaccessible et mise a jour du
tableau checkBrique correspondant a l'emplacement des briques
 */
for(var i = 0; i < NOMBRE_BRIQUES; i++) {
	placement = Math.floor(Math.random() * NOMBRE_CASE) + 1;
	if(!checkBrique[placement]) { // si la case est vide (brique)
		document.getElementById(placement).className = 'inaccessible';
		checkBrique[placement] = true;// mise a jour du tableau
	} else {
		i--; // Le nombre est deja sorti, on réitère l'iteration
		continue;
	}
}

/* placement des 4 armes aleatoirement sur la carte et mise a jour du tableau checkArmes a true
 avec pour indice le nombre aleatoire de 1 à 100 qui correspond a l'id du td
 */
for(var i = 0; i < 4; i++) {
	placement = Math.floor(Math.random() * NOMBRE_CASE) + 1;
	if(!checkBrique[placement] && !checkArmes[placement]) { // si la case est vide (brique et armes)
		document.getElementById(placement).className = armeDispo[i];
		checkArmes[placement] = true;// mise a jour du tableau
	} else {
		i--;
		continue;
	}
}

/* placement des joueurs sur la carte */
for(var i = 0; i < 2; i++) {
	placement = Math.floor(Math.random() * NOMBRE_CASE) + 1;
	if(!checkBrique[placement] && !checkArmes[placement]) { // si la case est vide (brique et armes)
		if(!i) { // execution seulement au premier tour de boucle
			document.getElementById(placement).style.background = "url('img/" + perso1.img + ".png') no-repeat 0 0/200% 200%, url('img/" + perso1.arme + ".png') no-repeat 0 0/100% 100%";
			perso1.tdIdJoueur = placement; // on met a jour la valeur de la position du joueur
		} else { // execution au second tour de boucle
			if((placement + 1) != perso1.tdIdJoueur && (placement - 1) != perso1.tdIdJoueur && (placement + 10) != perso1.tdIdJoueur && (placement - 10) != perso1.tdIdJoueur) {
				document.getElementById(placement).style.background = "url('img/" + perso2.img + ".png') no-repeat 0 0/200% 200%, url('img/" + perso2.arme + ".png') no-repeat 0 0/100% 100%";
				perso2.tdIdJoueur = placement; // on met a jour la valeur de la position du joueur
			} else {
				i--; // Le premier joueur est sur une case adjacente, on réitère l'iteration
				continue;
			}
		}
	} else {
		i--; // Le nombre est deja sorti, on réitère l'iteration
		continue;
	}
	checkBrique[placement] = true; // mise a jour du tableau checkbrique representant les briques et les 2 joueurs
}

// on affiche les informations des joueurs dans les divs correspondantes
perso1.infoJoueur();
perso2.infoJoueur();
