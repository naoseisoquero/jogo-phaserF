const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: { default: 'arcade', arcade: { debug: false } },
  scene: { preload, create, update }
};

let jogador, movimento, mobileControls;
const mapWidth = 2000, mapHeight = 2000;
let popupOpen = false;

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
  this.load.image("zipper", "../assets/brinquedos/zipper.png");


  this.load.image("painelElefante", "../assets/brinquedos/painel1.jpg");
  this.load.image("painelPadrao","../assets/brinquedos/painel3.png");


  this.load.image("button1", "../assets/brinquedos/on.png");
  this.load.image("button2", "../assets/brinquedos/off.png");
  this.load.image("button3", "../assets/brinquedos/botaoBaixo.png");
  this.load.image("button4", "../assets/brinquedos/BotaoCima.png");
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
    this.physics.add.collider(jogador, obj, () => {
      if (!popupOpen) {
        let popup;
        switch(colliderMsg) {
          case "elefantinho":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "painelElefante");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.5);
      
            var eleButton1 = this.add.image(popup.x - 100, popup.y + 35, "button1");
            eleButton1.setScale(0.5)
            eleButton1.setScrollFactor(0);
            eleButton1.setDepth(210);
            eleButton1.setInteractive({ useHandCursor: true });
            eleButton1.on("pointerdown", () => { console.log("Botão elefantinho 1 clicado"); });
            
            var eleButton2 = this.add.image(popup.x + 100, popup.y +40, "button2");
            eleButton2.setScale(0.5)
            eleButton2.setScrollFactor(0)
            eleButton2.setDepth(210);
            eleButton2.setInteractive({ useHandCursor: true });
            eleButton2.on("pointerdown", () => { console.log("Botão elefantinho 2 clicado"); });
            
            var eleButton3 = this.add.image(popup.x - 100, popup.y + 100, "button3");
            eleButton3.setScale(0.3)
            eleButton3.setScrollFactor(0);
            eleButton3.setDepth(210);
            eleButton3.setInteractive({ useHandCursor: true });
            eleButton3.on("pointerdown", () => { console.log("Botão elefantinho 3 clicado"); });
            
            var eleButton4 = this.add.image(popup.x + 100, popup.y + 95, "button4");
            eleButton4.setScale(0.3)
            eleButton4.setScrollFactor(0);
            eleButton4.setDepth(210);
            eleButton4.setInteractive({ useHandCursor: true });
            eleButton4.on("pointerdown", () => { console.log("Botão elefantinho 4 clicado"); });
            
            
            
            
            var closeX_ele = popup.x + popup.displayWidth/2 - 20;
            var closeY_ele = popup.y - popup.displayHeight/2 + 20;
            var closeButton_ele = this.add.text(closeX_ele, closeY_ele, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_ele.setScrollFactor(0);
            closeButton_ele.setDepth(220);
            closeButton_ele.setInteractive({ useHandCursor: true });
            closeButton_ele.on("pointerdown", () => {
              popup.destroy();
              closeButton_ele.destroy();
              eleButton1.destroy();
              eleButton2.destroy();
              eleButton3.destroy();
              eleButton4.destroy();
              popupOpen = false;
            });
            break;
          case "chapeuMexicano":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "painelPadrao");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);

            var chapeuButton1 = this.add.image(popup.x - 80, popup.y + 35, "button1");
            chapeuButton1.setScale(0.5)
            chapeuButton1.setScrollFactor(0);
            chapeuButton1.setDepth(210);
            chapeuButton1.setInteractive({ useHandCursor: true });
            chapeuButton1.on("pointerdown", () => { console.log("Botão chapeu mexicano 1 clicado"); });
            
            var chapeuButton2 = this.add.image(popup.x + 80, popup.y +40, "button2");
            chapeuButton2.setScale(0.5)
            chapeuButton2.setScrollFactor(0);
            chapeuButton2.setDepth(210);
            chapeuButton2.setInteractive({ useHandCursor: true });
            chapeuButton2.on("pointerdown", () => { console.log("Botão chapeu mexicano 2 clicado"); });
            
            
            var closeX_chapeu = popup.x + popup.displayWidth/2 - 20;
            var closeY_chapeu = popup.y - popup.displayHeight/2 + 20;
            var closeButton_chapeu = this.add.text(closeX_chapeu, closeY_chapeu, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_chapeu.setScrollFactor(0);
            closeButton_chapeu.setDepth(220);
            closeButton_chapeu.setInteractive({ useHandCursor: true });
            closeButton_chapeu.on("pointerdown", () => {
              popup.destroy();
              closeButton_chapeu.destroy();
              chapeuButton1.destroy();
              chapeuButton2.destroy();
              popupOpen = false;
            });
            break;
          case "zipper":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);

            var zipperButton1 = this.add.image(popup.x - 100, popup.y, "button1");
            zipperButton1.setScrollFactor(0);
            zipperButton1.setDepth(210);
            zipperButton1.setInteractive({ useHandCursor: true });
            zipperButton1.on("pointerdown", () => { console.log("Botão zipper 1 clicado"); });
            
            var zipperButton2 = this.add.image(popup.x + 100, popup.y, "button2");
            zipperButton2.setScrollFactor(0);
            zipperButton2.setDepth(210);
            zipperButton2.setInteractive({ useHandCursor: true });
            zipperButton2.on("pointerdown", () => { console.log("Botão zipper 2 clicado"); });
            
            var closeX_zip = popup.x + popup.displayWidth/2 - 20;
            var closeY_zip = popup.y - popup.displayHeight/2 + 20;
            var closeButton_zip = this.add.text(closeX_zip, closeY_zip, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_zip.setScrollFactor(0);
            closeButton_zip.setDepth(220);
            closeButton_zip.setInteractive({ useHandCursor: true });
            closeButton_zip.on("pointerdown", () => {
              popup.destroy();
              closeButton_zip.destroy();
              zipperButton1.destroy();
              zipperButton2.destroy();
              popupOpen = false;
            });
            break;
          case "rodaGigante1":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);

            var rg1button1 = this.add.image(popup.x - 100, popup.y, "button1");
            rg1button1.setScrollFactor(0);
            rg1button1.setDepth(210);
            rg1button1.setInteractive({ useHandCursor: true });
            rg1button1.on("pointerdown", () => { console.log("Botão rodaGigante1 1 clicado"); });
            
            var rg1button2 = this.add.image(popup.x + 100, popup.y, "button2");
            rg1button2.setScrollFactor(0);
            rg1button2.setDepth(210);
            rg1button2.setInteractive({ useHandCursor: true });
            rg1button2.on("pointerdown", () => { console.log("Botão rodaGigante1 2 clicado"); });
            
            var closeX_rg1 = popup.x + popup.displayWidth/2 - 20;
            var closeY_rg1 = popup.y - popup.displayHeight/2 + 20;
            var closeButton_rg1 = this.add.text(closeX_rg1, closeY_rg1, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_rg1.setScrollFactor(0);
            closeButton_rg1.setDepth(220);
            closeButton_rg1.setInteractive({ useHandCursor: true });
            closeButton_rg1.on("pointerdown", () => {
              popup.destroy();
              closeButton_rg1.destroy();
              rg1button1.destroy();
              rg1button2.destroy();
              popupOpen = false;
            });
            break;
          case "rodaGigante2":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);

            var rg2button1 = this.add.image(popup.x - 150, popup.y - 50, "button1");
            rg2button1.setScrollFactor(0);
            rg2button1.setDepth(210);
            rg2button1.setInteractive({ useHandCursor: true });
            rg2button1.on("pointerdown", () => { console.log("Botão rodaGigante2 1 clicado"); });
            
            var rg2button2 = this.add.image(popup.x + 150, popup.y - 50, "button2");
            rg2button2.setScrollFactor(0);
            rg2button2.setDepth(210);
            rg2button2.setInteractive({ useHandCursor: true });
            rg2button2.on("pointerdown", () => { console.log("Botão rodaGigante2 2 clicado"); });
            
            var rg2button3 = this.add.image(popup.x - 150, popup.y + 50, "button3");
            rg2button3.setScrollFactor(0);
            rg2button3.setDepth(210);
            rg2button3.setInteractive({ useHandCursor: true });
            rg2button3.on("pointerdown", () => { console.log("Botão rodaGigante2 3 clicado"); });
            
            var rg2button4 = this.add.image(popup.x + 150, popup.y + 50, "button4");
            rg2button4.setScrollFactor(0);
            rg2button4.setDepth(210);
            rg2button4.setInteractive({ useHandCursor: true });
            rg2button4.on("pointerdown", () => { console.log("Botão rodaGigante2 4 clicado"); });
            
            var closeX_rg2 = popup.x + popup.displayWidth/2 - 20;
            var closeY_rg2 = popup.y - popup.displayHeight/2 + 20;
            var closeButton_rg2 = this.add.text(closeX_rg2, closeY_rg2, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_rg2.setScrollFactor(0);
            closeButton_rg2.setDepth(220);
            closeButton_rg2.setInteractive({ useHandCursor: true });
            closeButton_rg2.on("pointerdown", () => {
              popup.destroy();
              closeButton_rg2.destroy();
              rg2button1.destroy();
              rg2button2.destroy();
              rg2button3.destroy();
              rg2button4.destroy();
              popupOpen = false;
            });
            break;
          case "barcoViking":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);
     
            var bvbutton1 = this.add.image(popup.x - 100, popup.y, "button1");
            bvbutton1.setScrollFactor(0);
            bvbutton1.setDepth(210);
            bvbutton1.setInteractive({ useHandCursor: true });
            bvbutton1.on("pointerdown", () => { console.log("Botão barcoViking 1 clicado"); });
            
            var bvbutton2 = this.add.image(popup.x + 100, popup.y, "button2");
            bvbutton2.setScrollFactor(0);
            bvbutton2.setDepth(210);
            bvbutton2.setInteractive({ useHandCursor: true });
            bvbutton2.on("pointerdown", () => { console.log("Botão barcoViking 2 clicado"); });
            
            var closeX_bv = popup.x + popup.displayWidth/2 - 20;
            var closeY_bv = popup.y - popup.displayHeight/2 + 20;
            var closeButton_bv = this.add.text(closeX_bv, closeY_bv, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_bv.setScrollFactor(0);
            closeButton_bv.setDepth(220);
            closeButton_bv.setInteractive({ useHandCursor: true });
            closeButton_bv.on("pointerdown", () => {
              popup.destroy();
              closeButton_bv.destroy();
              bvbutton1.destroy();
              bvbutton2.destroy();
              popupOpen = false;
            });
            break;
          case "samba":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);
         
            var sambabutton1 = this.add.image(popup.x - 150, popup.y - 50, "button1");
            sambabutton1.setScrollFactor(0);
            sambabutton1.setDepth(210);
            sambabutton1.setInteractive({ useHandCursor: true });
            sambabutton1.on("pointerdown", () => { console.log("Botão samba 1 clicado"); });
            
            var sambabutton2 = this.add.image(popup.x + 150, popup.y - 50, "button2");
            sambabutton2.setScrollFactor(0);
            sambabutton2.setDepth(210);
            sambabutton2.setInteractive({ useHandCursor: true });
            sambabutton2.on("pointerdown", () => { console.log("Botão samba 2 clicado"); });
            
            var sambabutton3 = this.add.image(popup.x - 150, popup.y + 50, "button3");
            sambabutton3.setScrollFactor(0);
            sambabutton3.setDepth(210);
            sambabutton3.setInteractive({ useHandCursor: true });
            sambabutton3.on("pointerdown", () => { console.log("Botão samba 3 clicado"); });
            
            var sambabutton4 = this.add.image(popup.x + 150, popup.y + 50, "button4");
            sambabutton4.setScrollFactor(0);
            sambabutton4.setDepth(210);
            sambabutton4.setInteractive({ useHandCursor: true });
            sambabutton4.on("pointerdown", () => { console.log("Botão samba 4 clicado"); });
            
            var closeX_samba = popup.x + popup.displayWidth/2 - 20;
            var closeY_samba = popup.y - popup.displayHeight/2 + 20;
            var closeButton_samba = this.add.text(closeX_samba, closeY_samba, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_samba.setScrollFactor(0);
            closeButton_samba.setDepth(220);
            closeButton_samba.setInteractive({ useHandCursor: true });
            closeButton_samba.on("pointerdown", () => {
              popup.destroy();
              closeButton_samba.destroy();
              sambabutton1.destroy();
              sambabutton2.destroy();
              sambabutton3.destroy();
              sambabutton4.destroy();
              popupOpen = false;
            });
            break;
          case "basquete":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);
   
            var basketbutton1 = this.add.image(popup.x - 100, popup.y, "button1");
            basketbutton1.setScrollFactor(0);
            basketbutton1.setDepth(210);
            basketbutton1.setInteractive({ useHandCursor: true });
            basketbutton1.on("pointerdown", () => { console.log("Botão basquete 1 clicado"); });
            
            var basketbutton2 = this.add.image(popup.x + 100, popup.y, "button2");
            basketbutton2.setScrollFactor(0);
            basketbutton2.setDepth(210);
            basketbutton2.setInteractive({ useHandCursor: true });
            basketbutton2.on("pointerdown", () => { console.log("Botão basquete 2 clicado"); });
            
            var closeX_basket = popup.x + popup.displayWidth/2 - 20;
            var closeY_basket = popup.y - popup.displayHeight/2 + 20;
            var closeButton_basket = this.add.text(closeX_basket, closeY_basket, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_basket.setScrollFactor(0);
            closeButton_basket.setDepth(220);
            closeButton_basket.setInteractive({ useHandCursor: true });
            closeButton_basket.on("pointerdown", () => {
              popup.destroy();
              closeButton_basket.destroy();
              basketbutton1.destroy();
              basketbutton2.destroy();
              popupOpen = false;
            });
            break;
          case "montanhaRussa":
            popupOpen = true;
            popup = this.add.image(this.cameras.main.width/2, this.cameras.main.height/2, "popupBg");
            popup.setScrollFactor(0);
            popup.setDepth(200);
            popup.setScale(0.4);

            var mrbutton1 = this.add.image(popup.x - 100, popup.y, "button1");
            mrbutton1.setScrollFactor(0);
            mrbutton1.setDepth(210);
            mrbutton1.setInteractive({ useHandCursor: true });
            mrbutton1.on("pointerdown", () => { console.log("Botão montanha russa 1 clicado"); });
            
            var mrbutton2 = this.add.image(popup.x + 100, popup.y, "button2");
            mrbutton2.setScrollFactor(0);
            mrbutton2.setDepth(210);
            mrbutton2.setInteractive({ useHandCursor: true });
            mrbutton2.on("pointerdown", () => { console.log("Botão montanha russa 2 clicado"); });
            
            var closeX_mr = popup.x + popup.displayWidth/2 - 20;
            var closeY_mr = popup.y - popup.displayHeight/2 + 20;
            var closeButton_mr = this.add.text(closeX_mr, closeY_mr, "X", {
              fontSize: "32px",
              fill: "#FFF",
              backgroundColor: "#000",
              padding: { x: 5, y: 5 }
            });
            closeButton_mr.setScrollFactor(0);
            closeButton_mr.setDepth(220);
            closeButton_mr.setInteractive({ useHandCursor: true });
            closeButton_mr.on("pointerdown", () => {
              popup.destroy();
              closeButton_mr.destroy();
              mrbutton1.destroy();
              mrbutton2.destroy();
              popupOpen = false;
            });
            break;
          default:
            console.log(`Colisão com ${colliderMsg}`);
        }
      } else {
        console.log(`Colisão com ${colliderMsg}`);
      }
    });
  };
  
  // CRIAÇÃO DOS BRINQUEDOS – defina as posições desejadas
  criarBrinquedo(1500, 1600, "elefantinho", 0.5, "elefantinho");
  criarBrinquedo(600, 660, "chapeuMexicano", 0.4, "chapeuMexicano");
  criarBrinquedo(1200, 800, "zipper", 0.5, "zipper");
  criarBrinquedo(500, 400, "rodaGigante1", 0.5, "rodaGigante1");
  criarBrinquedo(1450, 880, "rodaGigante2", 0.3, "rodaGigante2");
  criarBrinquedo(570, 1310, "barcoViking", 0.2, "barcoViking");
  criarBrinquedo(1430, 1330, "basquete", 0.4, "basquete");
  criarBrinquedo(1550, 370, "montanhaRussa", 0.7, "montanhaRussa");
  criarBrinquedo(500, 1600, "samba", 0.5, "samba");
  
  // CONTROLE MOBILE
  mobileControls = { left: false, right: false, up: false, down: false };
  let style = { fontSize: "48px", fill: "#FFF", backgroundColor: "#000", padding: { x: 10, y: 10 } };

  let leftArrow = this.add.text(50, this.scale.height - 100, "←", style)
    .setScrollFactor(0)
    .setInteractive()
    .setDepth(100);
  let rightArrow = this.add.text(150, this.scale.height - 100, "→", style)
    .setScrollFactor(0)
    .setInteractive()
    .setDepth(100);
  let upArrow = this.add.text(100, this.scale.height - 150, "↑", style)
    .setScrollFactor(0)
    .setInteractive()
    .setDepth(100);
  let downArrow = this.add.text(100, this.scale.height - 50, "↓", style)
    .setScrollFactor(0)
    .setInteractive()
    .setDepth(100);
  
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
  this.input.on("pointerdown", () => { 
    if (this.sound && this.sound.context) { 
      this.sound.context.resume(); 
    } 
  });
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
  
  if (!movendo) { 
    jogador.anims.stop(); 
  }
}

new Phaser.Game(config);
