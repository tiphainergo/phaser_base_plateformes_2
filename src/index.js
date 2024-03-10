// chargement des librairies
import niveau1 from "/src/js/niveau1.js";
import niveau2 from "/src/js/niveau2.js";
import niveau3 from "/src/js/niveau3.js"; 
import selection from "/src/js/selection.js"; 
import menu from "/src/js/menu.js";

var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [menu, selection, niveau1, niveau2, niveau3]
  }

// création et lancement du jeu à partir de la configuration config
var game = new Phaser.Game(config);
game.scene.start("menu"); // lancement de la scene selection

