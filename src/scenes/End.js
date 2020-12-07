class End extends Phaser.Scene{
    constructor(){
        super({
            key: 'End'
        });
    }

    init() {
        console.log('Escena Final');
    }
    preload() {
       
            
    }
    create() {
        /*
            Plataformas y Background
        */
        this.back = this.add.image(0,0,'fondoFin').setOrigin(0,0).setScale(1,1.5);
        this.platformA = this.add.image(0,175,'pisoFin').setOrigin(0,.5).setScale(1.25,1);
        this.platformB = this.add.image(500,175,'pisoFin').setOrigin(0,.5).setScale(1.25,1);
        this.platformC = this.add.image(0,375,'pisoFin').setOrigin(0,.5).setScale(1.25,1);
        this.platformD = this.add.image(500,375,'pisoFin').setOrigin(0,.5).setScale(1.25,1);
        
        /*
            Animación Primer cuadro
        */
        this.dialogo1 = this.add.image(250,100,'dialogo1Fin').setScale(.15);
        this.dialogo1.setVisible(false);
        this.goodAstroA = this.add.sprite(-100, 125, 'astro').setScale(0.25);
        this.goodAstroA.anims.play('idle', true);
        this.tweens = this.add.tween({
            targets: [this.goodAstroA],
            x: 200,
            duration: 5000,
            onStart: (tween, obj, target) => {
                obj[0].anims.play('walk', true);
            },
            onComplete: (tween, obj, target) => {
                obj[0].anims.pause();
                this.dialogo1.setVisible(true);
            },
        });

        /*
            Animación Segundo cuadro
        */
        this.goodAstroB = this.add.sprite(700,125,'astro').setScale(0.25);
        this.badAstroB = this.add.sprite(1200,125,'bad').setScale(0.25);
        this.badAstroB.flipX = true;
        this.dialogo2 = this.add.image(850,100,'dialogo2Fin').setScale(.15);
        this.dialogo2.setVisible(false);
        this.dialogo3 = this.add.image(650,100,'dialogo3Fin').setScale(.15);
        this.dialogo3.setVisible(false);
        this.tweens = this.add.tween({
            targets: [this.badAstroB],
            x: 800,
            duration: 5000,
            onStart: (tween, obj, target) => {
                obj[0].anims.play('walkB', true);
            },
            onComplete: (tween, obj, target) => {
                obj[0].anims.pause();
                this.dialogo2.setVisible(true);
                this.dialogo3.setVisible(true);
            },
        });

        /*
            Animación Tercer cuadro
        */
        this.goodAstroC = this.add.sprite(200,325,'astro').setScale(0.25);
        this.badAstroC = this.add.sprite(300,325,'bad').setScale(0.25);
        this.badAstroC.flipX = true;
        this.bullet = this.add.image(300,330,'bullet').setScale(.75);
        this.bullet.flipX = true;
        this.bullet.setVisible(false);
        this.tweens = this.add.tween({
            targets: [this.badAstroC],
            x: 305,
            duration: 500,
            onStart: (tween, obj, target) => {
                obj[0].anims.play('walkB', true);
                this.bullet.setVisible(true);
            },
            onComplete: (tween, obj, target) => {
                obj[0].anims.pause();
            },
        });
        this.tweens = this.add.tween({
            targets: [this.bullet],
            x: 200,
            duration: 1000,
            onComplete: (tween, obj, target) => {
                this.bullet.setVisible(false);
                this.goodAstroC.play('die',true);
            },
        });


        /*
            Animación Cuarto cuadro
        */
        this.goodAstroD = this.add.sprite(700,325,'astro').setScale(0.25);
        this.badAstroD = this.add.sprite(800,325,'bad').setScale(0.25);
        this.badAstroD.flipX = true;
        this.goodAstroD.play('die',true);
        this.tweens = this.add.tween({
            targets: [this.badAstroD],
            y: 250,
            duration: 5000,
            onStart: (tween, obj, target) => {
                this.badAstroD.play('flyB',true);
            },
        });

        /*
            Creación de 4 grupos
            para aparecer y desaparecer cuadros 
        */
       
    }
    
    update(time, delta) {
        
    }
}

export default End;
