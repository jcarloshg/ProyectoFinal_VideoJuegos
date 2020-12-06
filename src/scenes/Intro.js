class Intro extends Phaser.Scene{
    constructor(){
        super({
            key: 'Intro'
        });
    }

    init() {
        console.log('Escena Introducción');
    }
    preload() {      

    }
    create() {
        /*
            Primer cuadro
        */
        this.backgroundA = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'noche');
        this.backgroundA.setScrollFactor(0);
        this.piloto = this.add.image(220,110,'dibujo').setScale(.15);
        this.ship = this.add.image(200, 100,'spaceShip').setScale(.08);
        this.ship.flipX = true;
        const grupoA = this.add.container();
        grupoA.add([
            this.backgroundA,
            this.piloto,
            this.ship,
        ]);
        grupoA.setAlpha(0);        
        this.tweens = this.add.tween({
            targets: [grupoA],
            alpha: 1,
            duration: 5000,
            yoyo: true,
            hold: 2000,
        });
        

        /*
            Segundo Cuadro 
        */
        this.background2 = this.add.image(500,0, 'interior').setOrigin(0,0).setScale(.8,.5);
        this.astroUno = this.add.image(600,160,'dibujo').setScale(.25);
        this.astroDos = this.add.image(850,130,'dibujo').setScale(.25);
        this.astroDos.flipX = true;
        this.lineaUno = this.add.image(650,50,'dialogo1').setScale(.2).setAlpha(0);
        this.lineaDos = this.add.image(800,10,'dialogo2').setScale(.2).setAlpha(0);
        this.tweens = this.add.tween({
            targets: [this.lineaUno],
            alpha: 1,
            //yoyo: true,
            delay: 8000,
        });
        this.tweens = this.add.tween({
            targets: [this.lineaDos],
            alpha: 1,
            //yoyo: true,
            delay: 11000,
        });
        const grupoB = this.add.container();
        grupoB.add([
            this.background2, this.astroUno, this.astroDos,
            this.lineaUno, this.lineaDos,
        ]);
        grupoB.setAlpha(0);
        this.tweens = this.add.tween({
            targets: [grupoB],
            delay: 6000,
            alpha: 1,
            duration: 5000,
            yoyo: true,
            hold: 3000,
        });

        /*
            Tercer Cuadro
        */
        this.backgroundB = this.add.tileSprite(0, this.scale.height, this.scale.width, this.scale.height, 'noche');
        this.backgroundB.setScrollFactor(0);
        this.pilotoB = this.add.image(120,330,'dibujo').setScale(.15);
        this.shipB = this.add.image(100, 320,'spaceShip').setScale(.08);
        this.shipB.flipX = true;
        this.planet = this.add.image(300,600,'planet').setScale(.25);
        const grupoC = this.add.container();
        grupoC.add([    this.backgroundB, this.pilotoB, this.shipB, this.planet ]);
        grupoC.setAlpha(0);        
        this.tweens = this.add.tween({
            targets: [grupoC],
            delay: 12000,
            alpha: 1,
            duration: 3000,
            yoyo: true,
            hold: 4000,
        });        
        this.tweens = this.add.tween({
            targets: [this.planet],
            delay: 15000,
            y: 300,
            duration: 5000,
        });


        /*
            Cuarto cuadro
        */ 
        this.background4 = this.add.image(500,200,'montanias').setScale(.6).setOrigin(0,0);
        this.shipC = this.add.image(950, 250,'spaceShip').setScale(.05);
        this.enemie = this.add.image(950,600,'enemie').setScale(.4);
        this.tweens = this.add.tween({
            targets: [this.shipC],
            x: 400,
            y:500,
            rotation: -2.5,
            duration: 5000,
            //yoyo: true,
            delay: 20000,
        });
        this.tweens = this.add.tween({
            targets: [this.enemie],
            y:380,
            duration: 5000,
            //yoyo: true,
            delay: 20000,
        });
        const grupoD = this.add.container();
        grupoD.add([    this.background4, this.shipC, this.enemie ]);
        grupoD.setAlpha(0);
        this.tweens = this.add.tween({
            targets: [grupoD],
            delay: 18000,
            alpha: 1,
            duration: 3000,
            yoyo: true,
            hold: 5000,
        });        

    }
    
    update(time, delta) {
        this.backgroundA.tilePositionX += 0.5;
        this.backgroundB.tilePositionX += 5;
        
    }
}

export default Intro;
