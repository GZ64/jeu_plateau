/* fichier pour la gestion de la mise a jour de la carte*/






/* fonction pour la mise a jour de la position du joueur avec la gestion de la direction du joueur
avec les sprites css (param x et y) */
function rafraichirJoueur(anciennePosition, nouvellePosition, x, y, joueur) {
    // on supprime l'image du joueur sur l'ancienne case
    document.getElementById(anciennePosition).style.background = "";
    // puis on l'ajoute a la nouvelle case
    document.getElementById(nouvellePosition).style.background = "url('img/" + joueur.img + ".png') no-repeat " + x + " " + y + "/200% 200%, url('img/" + joueur.arme + ".png') no-repeat 0 0/100% 100%";
    /*document.getElementById(nouvellePosition).style.backgroundSize = "100%";*/
    // MAJ du tableau representant les briques et les deux joueurs
    checkBrique[nouvellePosition] = true;
    checkBrique[anciennePosition] = false;
}

/* cette fonction calcul les positions autorisé par le joueur en fonction
   des brique et de l'autre joueur */
function deplacementLimite(position) {
    // stockage des positions limite extreme
    var maxGauche = position - 3;
    var maxDroite = position + 3;
    var maxHaut = position - 30;
    var maxBas = position + 30;


    deplacementOk = []; // remise a zero du tableau
    deplacementOk[position] = true;// memorisation dans le tableau la position actuel du joueur

    // 4 boucles pour les directions
    for(var i = position - 1; i >= maxGauche; i--) { /* a gauche
        si il n'y a pas de brique ni de joueur et que la position est au mini a 1 et au maxi a 100
        et que l'on est pas a la limite du tableau html */
        if(!checkBrique[i] && i > 0 && i <= 100 && !((i % 10) == 0)) {
            document.getElementById(i).classList.add("autorisee"); // ajout de la classe autorisé au td concerné
            deplacementOk[i] = true; // MAJ du tableau des deplacement autorisé
        } else {
            break;
        }
    }
    // idem pour les autres directions
    for(var i = position + 1; i <= maxDroite; i++) { // a droite
        if(!checkBrique[i] && i > 0 && i <= 100 && !((i % 10) == 1)) {
            document.getElementById(i).classList.add("autorisee");
            deplacementOk[i] = true;
        } else {
            break;
        }
    }
    for(var i = position - 10; i >= maxHaut; i -= 10) { // en haut
        if(!checkBrique[i] && i > 0 && i <= 100) {
            document.getElementById(i).classList.add("autorisee");
            deplacementOk[i] = true;
        } else {
            break;
        }
    }
    for(var i = position + 10; i <= maxBas; i+= 10) { // en bas
        if(!checkBrique[i] && i > 0 && i <= 100) {
            document.getElementById(i).classList.add("autorisee");
            deplacementOk[i] = true;
        } else {
            break;
        }
    }
}

/* gestion de la carte au changement de tour concernant les deplacement autorisé et les armes si
le joueur si trouve */
function rafraichirCarte(perso, deplacementOk) {
    var tdActuel; // variable qui contient l'id du td en cours
    for (var i = 1; i <= 100; i++) { // on parcours le tableau html
        tdActuel = document.getElementById(i);
        if (deplacementOk[i]) { // si le deplacement etait ok
            tdActuel.classList.remove("autorisee"); // on retire la classe autorisée
        }
        if (i == perso.tdIdJoueur) { // si le tdactuel correspond au joueur
            switch (tdActuel.className) { // check des diffentes armes que pourrait contenir le tdactuel
                case 'fiole':
                    tdActuel.classList.remove("fiole"); // on prend l'arme
                    tdActuel.classList.add(perso.arme); // on laisse l'ancienne arme
                    perso.arme = "fiole"; // MAJ de l'arme du joueur
                    break;
                // idem pour les autres armes
                case "batte_de_baseball":
                    tdActuel.classList.remove("batte_de_baseball");
                    tdActuel.classList.add(perso.arme);
                    perso.arme = "batte_de_baseball";
                    break;
                case 'hache':
                    tdActuel.classList.remove("hache");
                    tdActuel.classList.add(perso.arme);
                    perso.arme = "hache";
                    break;
                case'pistolet':
                    tdActuel.classList.remove("pistolet");
                    tdActuel.classList.add(perso.arme);
                    perso.arme = "pistolet";
                    break;
                case 'couteau':
                    tdActuel.classList.remove("couteau");
                    tdActuel.classList.add(perso.arme);
                    perso.arme = "couteau";
                    break;
                default:
                    break;
            }
            /* on laisse la derniere position du joueur en omnetant les valeur top et left pour les sprites,
            ce qui permet d'eviter un passage a zero a chaque tour */
            tdActuel.style.backgroundImage = "url('img/" + perso.img + ".png'), url('img/" + perso.arme + ".png')";
        }
    }
}

// gestion de l'affichage des tour a tour
function affichageTourJoueur(joueur) {
    //remise a zero des classes des div joueur
    divJoueur1.className = "";
    divJoueur2.className = "";
    if(joueur == 'joueur1') { // si le joueur qui passe le tour est joueur1
        divJoueur1.className = "off"; // ajout de la classe off au joueur1
        divJoueur2.className = "on"; // ajout de la classe on au joueur2
    } else { // si le joueur qui passe le tour est joueur2
        divJoueur2.className = "off";
        divJoueur1.className = "on";
    }
}