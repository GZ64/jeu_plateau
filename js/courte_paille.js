var droitJouer, // booleen false=> tour a joueur 1  true=> tour a joueur2
premierTour; // nombre representant qui va commencer a jouer: 1 = joueur1 et 2 = joueur2

// tirage au sort
premierTour = Math.floor(Math.random() * 2) + 1;

if(premierTour == 1) // si c'est le joueur1 qui commence
{
    // opacité sur la divJoueur2
    $('#divJoueur2').fadeTo(600, 0.5);
    droitJouer = false; // tour a joueur1
    deplacementLimite(perso1.tdIdJoueur); // on determine les deplacement autorisés
    divJoueur2 = document.getElementById(perso2.divIdJoueur);
    divJoueur2.className = "off"; // ajout de la classe off a la div du joueur2

    divJoueur1 = document.getElementById(perso1.divIdJoueur);
    divJoueur1.className = "on"; // ajout de la classe on a la div du joueur1
} else if(premierTour == 2) { // idem pour le deuxieme joueur
    $('#divJoueur1').fadeTo(600, 0.5);
    droitJouer = true;  // tour a joueur2
    deplacementLimite(perso2.tdIdJoueur);
    divJoueur1 = document.getElementById(perso1.divIdJoueur);
    divJoueur1.className = "off";

    divJoueur2 = document.getElementById(perso2.divIdJoueur);
    divJoueur2.className = "on";
}














