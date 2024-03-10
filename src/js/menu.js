export default class menu extends Phaser.Scene {
    constructor() {
      super({ key: "menu" });
    }
    //on charge les images
    preload() {
      this.load.image("menu_fond", "src/assets/Menu.png");
      this.load.image("imageBoutonPlay", "src/assets/imageBoutonPlay.png");
    }
  
    create() {
     // on place les éléments de fond
      this.add
        .image(0, 0, "Menu")
        .setOrigin(0)
        .setDepth(0)
        .setDisplaySize(800, 600);
  
        this.add.text(200, 200, "Bienvenue dans le jeu", {
          fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
          fontSize: "30pt",
          color: "black"
        });

      //on ajoute un bouton de clic, nommé bouton_play
      var bouton_play = this.add.image(400, 300, "imageBoutonPlay")
      .setDepth(1)
      .setScale(0.25); 
      //=========================================================
      //on rend le bouton interratif
      bouton_play.setInteractive();
  
      //Cas ou la souris passe sur le bouton play
      bouton_play.on("pointerover", () => {
      });
      
      //Cas ou la souris ne passe plus sur le bouton play
      bouton_play.on("pointerout", () => {
      });
  
  
      //Cas ou la sourris clique sur le bouton play :
      // on lance le niveau 1
      bouton_play.on("pointerup", () => {
        this.scene.start("selection");
      });
    }
  }  