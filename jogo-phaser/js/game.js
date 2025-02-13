const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { debug: true } },
    scene: { preload, create, update }
  };
  
  let jogador, movimento, mobileControls;
  const mapWidth = 2000, mapHeight = 2000;
  
  function preload() {
    this.load.image("fundo", "../assets/maps/mapafundo4.jpg");
    this.load.spritesheet("jogador", "../assets/player/sprites1.png", { frameWidth: 16, frameHeight: 16 });
    this.load.image("elefantinho", "../assets/brinquedos/elefantinho.png");
    this.load.image("rodaGigante1", "../assets/brinquedos/rodaGigante1.png");
    this.load.image("rodaGigante2", "../assets/brinquedos/rodaGigante2.png");
    this.load.image("barcoViking", "../assets/brinquedos/barcoViking.png");
    this.load.image("basquete", "../assets/brinquedos/basquete.png");
    this.load.image("chapeuMexicano", "../assets/brinquedos/chapeuMexicano.png");
    this.load.image("montanhaRussa", "../assets/brinquedos/montanhaRussa.png");
    this.load.image("samba", "../assets/brinquedos/samba.png");
  }
  
  function create() {
    this.add.image(0, 0, "fundo").setOrigin(0, 0).setDisplaySize(mapWidth, mapHeight);
    
    jogador = this.physics.add.sprite(mapWidth / 2, mapHeight / 2, "jogador").setCollideWorldBounds(true);
    jogador.setScale(3);
    
    this.anims.create({ key: "andar_esquerda", frames: this.anims.generateFrameNumbers("jogador", { start: 8, end: 11 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: "andar_direita", frames: this.anims.generateFrameNumbers("jogador", { start: 12, end: 15 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: "andar_cima", frames: this.anims.generateFrameNumbers("jogador", { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
    this.anims.create({ key: "andar_baixo", frames: this.anims.generateFrameNumbers("jogador", { start: 4, end: 7 }), frameRate: 10, repeat: -1 });
    
    this.physics.world.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
    this.cameras.main.startFollow(jogador);
    this.cameras.main.setZoom(2);
    
    let fences = this.physics.add.staticGroup();
    let fenceGraphics = this.add.graphics();
    let fenceThickness = 40;
    fenceGraphics.fillStyle(0x8B4513, 1);
    fenceGraphics.fillRect(0, 0, mapWidth, fenceThickness);
    fenceGraphics.generateTexture("fenceH", mapWidth, fenceThickness);
    fenceGraphics.clear();
    fenceGraphics.fillStyle(0x8B4513, 1);
    fenceGraphics.fillRect(0, 0, fenceThickness, mapHeight);
    fenceGraphics.generateTexture("fenceV", fenceThickness, mapHeight);
    fenceGraphics.destroy();
    
    fences.create(mapWidth / 2, fenceThickness / 2, "fenceH").setOrigin(0.5, 0.5);
    fences.create(mapWidth / 2, mapHeight - fenceThickness / 2, "fenceH").setOrigin(0.5, 0.5);
    fences.create(fenceThickness / 2, mapHeight / 2, "fenceV").setOrigin(0.5, 0.5);
    fences.create(mapWidth - fenceThickness / 2, mapHeight / 2, "fenceV").setOrigin(0.5, 0.5);
    this.physics.add.collider(jogador, fences);
    
    const criarBrinquedo = (x, y, key, scale = 0.5, colliderMsg = "") => {
      const obj = this.physics.add.staticImage(x, y, key).setScale(scale);
      obj.body.setCircle(obj.displayWidth / 2);
      obj.refreshBody();
      this.physics.add.collider(jogador, obj, () => { console.log(`Colisão com ${colliderMsg || key}`); });
    };
    
    criarBrinquedo(1500, 1600, "elefantinho", 0.5, "elefantinho");
    criarBrinquedo(500, 400, "rodaGigante1", 0.5, "rodaGigante1");
    criarBrinquedo(1800, 400, "rodaGigante2", 0.5, "rodaGigante2");
    criarBrinquedo(570, 1310, "barcoViking", 0.2, "barcoViking");
    criarBrinquedo(1430, 1330, "basquete", 0.4, "basquete");
    criarBrinquedo(600, 660, "chapeuMexicano", 0.4, "chapeuMexicano");
    criarBrinquedo(1550, 370, "montanhaRussa", 0.7, "montanhaRussa");
    criarBrinquedo(500, 1600, "samba", 0.5, "samba");
    
    mobileControls = { left: false, right: false, up: false, down: false };
    let style = { fontSize: "48px", fill: "#FFF", backgroundColor: "#000", padding: { x: 10, y: 10 } };
    
    // Posiciona os botões usando this.scale.height para que fiquem fixos na tela
    let leftArrow = this.add.text(50, this.scale.height - 100, "←", style).setScrollFactor(0).setInteractive().setDepth(100);
    let rightArrow = this.add.text(150, this.scale.height - 100, "→", style).setScrollFactor(0).setInteractive().setDepth(100);
    let upArrow = this.add.text(100, this.scale.height - 150, "↑", style).setScrollFactor(0).setInteractive().setDepth(100);
    let downArrow = this.add.text(100, this.scale.height - 50, "↓", style).setScrollFactor(0).setInteractive().setDepth(100);
    
    leftArrow.on("pointerdown", () => { mobileControls.left = true; });
    leftArrow.on("pointerup", () => { mobileControls.left = false; });
    leftArrow.on("pointerout", () => { mobileControls.left = false; });
    
    rightArrow.on("pointerdown", () => { mobileControls.right = true; });
    rightArrow.on("pointerup", () => { mobileControls.right = false; });
    rightArrow.on("pointerout", () => { mobileControls.right = false; });
    
    upArrow.on("pointerdown", () => { mobileControls.up = true; });
    upArrow.on("pointerup", () => { mobileControls.up = false; });
    upArrow.on("pointerout", () => { mobileControls.up = false; });
    
    downArrow.on("pointerdown", () => { mobileControls.down = true; });
    downArrow.on("pointerup", () => { mobileControls.down = false; });
    downArrow.on("pointerout", () => { mobileControls.down = false; });
    
    movimento = this.input.keyboard.createCursorKeys();
    this.input.on("pointerdown", () => { if (this.sound && this.sound.context) { this.sound.context.resume(); } });
  }
  
  function update() {
    jogador.setVelocity(0);
    let movendo = false;
    
    if (movimento.left.isDown || mobileControls.left) {
      jogador.setVelocityX(-150);
      jogador.anims.play("andar_esquerda", true);
      movendo = true;
    } else if (movimento.right.isDown || mobileControls.right) {
      jogador.setVelocityX(150);
      jogador.anims.play("andar_direita", true);
      movendo = true;
    }
    
    if (movimento.up.isDown || mobileControls.up) {
      jogador.setVelocityY(-150);
      jogador.anims.play("andar_cima", true);
      movendo = true;
    } else if (movimento.down.isDown || mobileControls.down) {
      jogador.setVelocityY(150);
      jogador.anims.play("andar_baixo", true);
      movendo = true;
    }
    
    if (!movendo) { jogador.anims.stop(); }
  }
  
  new Phaser.Game(config);
  