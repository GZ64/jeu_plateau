/* Objet joueur qui represente les caracteristiques de chaque joueur et leurs actions possible */

/* constructeur prenant en parametre pour l'initialisation de l'objet le nom, l'arme, la santé, la 
classe des paragraphe ou seront affiché les infos du joueur, l'id de l'element td ou se trouve le joueur, l'id de la div
joueur 1 ou joueur2 qui permet d'aiguiller les entrées clavier et enfin le nom du de l'image du joueur */
function Joueur(nom, arme, sante, classPara, tdIdJoueur, divIdJoueur, img, defense) {
    this.nom = nom;
    this.arme = arme;
    this.sante = sante;
	this.classPara = "." + classPara;
	this.tdIdJoueur = tdIdJoueur;
	this.divIdJoueur = divIdJoueur;
	this.img = img;
	this.defense = defense;

	// methode qui met a jour les informations du joueur
	this.infoJoueur = function() {
		// creation des noeuds textuels qui correspondent aux propriete de l'objet stockés dans un tableau
		var joueurAttributs = [ document.createTextNode(this.nom),
			document.createTextNode(this.arme.replace(/_/g, " ")),
			document.createTextNode(this.sante)
		];
		// selection de tous les paragraphe contenu dans la classe du joueur (this)
		var p = document.querySelectorAll(this.classPara);

		var taille = p.length;
		for(var i = 0; i < taille; i++) {
			if(p[i].childNodes[1]) { // si les noeuds sont present
				p[i].replaceChild(joueurAttributs[i], p[i].childNodes[1]); // remplacement des noeuds textuels
			}
			// si les noeuds sont absents
			p[i].appendChild(joueurAttributs[i]);
		}
	};

	// methode pour le deplacement du joueur
	this.deplacerJoueur = function(deplacementOk, direction) {
		switch (direction) { // les direction sont données a l'appel de la methode dans deplacement_joueur.js
			case 'gauche' :
				// calcul de la nouvelle position
				anciennePosition = this.tdIdJoueur;
				nouvellePosition = anciennePosition - 1;
				if(deplacementOk[nouvellePosition]) { /* si la case est autorisée
					on rafraichi le joueur sur la carte puis grace aux sprite css on affiche l'image
					representant le joueur dans la bonne position (ici -50px) */
					rafraichirJoueur(anciennePosition, nouvellePosition, '100%', '100%', this);
					this.tdIdJoueur --; // mise a jour de la nouvelle position du joueur.
				}
				break;
			// idem pour les autres directiions
			case 'droite' :
				anciennePosition = this.tdIdJoueur;
				nouvellePosition = anciennePosition + 1;
				if(deplacementOk[nouvellePosition]) {
					rafraichirJoueur(anciennePosition, nouvellePosition, '100%', '-3%', this);
					this.tdIdJoueur ++;
				}
				break;
			case 'haut' :
				anciennePosition = this.tdIdJoueur;
				nouvellePosition = anciennePosition - NOMBRE_COLONNE;
				if(deplacementOk[nouvellePosition]) {
					rafraichirJoueur(anciennePosition, nouvellePosition, '0%', '2%', this);
					this.tdIdJoueur -= 10;
				}
				break;
			case 'bas' :
				anciennePosition = this.tdIdJoueur;
				nouvellePosition = anciennePosition + NOMBRE_COLONNE;
				if(deplacementOk[nouvellePosition]) {
					rafraichirJoueur(anciennePosition, nouvellePosition, '0%', '100%', this);
					this.tdIdJoueur += 10;
				}
				break;
			default:
				console.log('default dans la methode deplacerJoueur');
		}
	};

	// methode qui s'occupe des degats infligés selon le bareme annoncé
    this.frapperJoueur = function(joueurAFrapper, arme) {
		switch(arme) // on determine l'arme
		{
			case "couteau":
				if(joueurAFrapper.defense) { // si le joueur frappé se défend
					joueurAFrapper.sante -= 5;
				} else {
					joueurAFrapper.sante -= 10;
				}
				break;
			case "fiole":
				if(joueurAFrapper.defense) {
					joueurAFrapper.sante -= 10;
				} else {
					joueurAFrapper.sante -= 20;
				}
				break;
			case "batte_de_baseball":
				if(joueurAFrapper.defense) {
					joueurAFrapper.sante -= 15;
				} else {
					joueurAFrapper.sante -= 30;
				}
				break;
			case "hache":
				if(joueurAFrapper.defense) {
					joueurAFrapper.sante -= 20;
				} else {
					joueurAFrapper.sante -= 40;
				}
				break;
			case "pistolet":
				if(joueurAFrapper.defense) {
					joueurAFrapper.sante -= 25;
				} else {
					joueurAFrapper.sante -= 50;
				}
				break;
			default:
				break;
		}
        
    };
}

