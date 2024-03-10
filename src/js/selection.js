/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var groupe_plateformes; // contient toutes les plateformes
var clavier; // pour la gestion du clavier


export default class selection extends Phaser.Scene {
 
    constructor() {
       super({key : "selection"}); // mettre le meme nom que le nom de la classe
  }
    preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    this.load.image('img_porte1', 'src/assets/door1.png');
    this.load.image('img_porte2', 'src/assets/door2.png');
    this.load.image('img_porte3', 'src/assets/door3.png');
    this.load.image("img_ciel", "src/assets/sky.png");
   
  }
    create() {
    
    this.add.image(400, 300, "img_ciel")
    .setDisplaySize(800, 600);
    groupe_plateformes = this.physics.add.staticGroup();
    groupe_plateformes.create(200, 584, "img_plateforme")
    groupe_plateformes.setTint(0xff0000);
    groupe_plateformes.create(600, 584, "img_plateforme")
    groupe_plateformes.setTint(0xff0000);
  
    //  on ajoute 3 platesformes flottantes
    groupe_plateformes.create(600, 450, "img_plateforme")
    groupe_plateformes.setTint(0xffff00);
    groupe_plateformes.create(50, 300, "img_plateforme")
    groupe_plateformes.setTint(0xff00ff);
    groupe_plateformes.create(750, 270, "img_plateforme")
    groupe_plateformes.setTint(0xff00ff);

  
  
    player = this.physics.add.sprite(100, 450, "img_perso");
  
    //  propriétées physiqyes de l'objet player :
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });
  
    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });
  
    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    clavier = this.input.keyboard.createCursorKeys();
    //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(player, groupe_plateformes);
    this.porte1 = this.physics.add.staticSprite(600, 414, "img_porte1");
    this.porte2 = this.physics.add.staticSprite(50, 264, "img_porte2");
    this.porte3 = this.physics.add.staticSprite(750, 234, "img_porte3");
 
  }
  
    update() {
    if (clavier.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }
  
    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
    if (Phaser.Input.Keyboard.JustDown(clavier.space) == true) {
        if (this.physics.overlap(player, this.porte1)) this.scene.switch("niveau1");
        if (this.physics.overlap(player, this.porte2)) this.scene.switch("niveau2");
        if (this.physics.overlap(player, this.porte3)) this.scene.switch("niveau3");
      } 
  }
} 