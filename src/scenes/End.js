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
        const grupoA = this.add.container();
        grupoA.add([
            this.platformA,
            this.dialogo1,
            this.goodAstroA,
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
            delay: 6000,
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
        const grupoB = this.add.container();
        grupoB.add([
            this.platformB,
            this.goodAstroB,
            this.badAstroB,
            this.dialogo2,
            this.dialogo3,
        ]);
        grupoB.setAlpha(0);        
        this.tweens = this.add.tween({
            targets: [grupoB],
            delay: 5000,
            alpha: 1,
            duration: 5000,
            yoyo: true,
            hold: 2000,
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
            delay: 14000,
            x: 305,
            duration: 1000,
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
            delay: 16000,
            x: 200,
            duration: 1000,
            onComplete: (tween, obj, target) => {
                this.bullet.setVisible(false);
                this.goodAstroC.play('die',true);
            },
        });
        const grupoC = this.add.container();
        grupoC.add([
            this.platformC,
            this.goodAstroC,
            this.badAstroC,
            this.bullet,
        ]);
        grupoC.setAlpha(0);        
        this.tweens = this.add.tween({
            targets: [grupoC],
            delay: 12000,
            alpha: 1,
            duration: 5000,
            yoyo: true,
            hold: 1000,
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
            delay: 20000,
            y: 250,
            duration: 5000,
            onStart: (tween, obj, target) => {
                this.badAstroD.play('flyB',true);
            },
        });
        const grupoD = this.add.container();
        grupoD.add([
            this.platformD,
            this.goodAstroD,
            this.badAstroD,
        ]);
        grupoD.setAlpha(0);        
        this.tweens = this.add.tween({
            targets: [grupoD],
            delay: 18000,
            alpha: 1,
            duration: 5000,
            yoyo: true,
            hold: 1000,
        });

        this.btn_volverInicio = this.add.image(this.scale.width/2, 800, 'btn_volverInicio').setScale(0.1).setInteractive();
        // Botón para regresar a la pantalla inicial
        this.btn_volverInicio.on('pointerover', () => {
            // if (this.sonidoAct) this.sound.play('hover');
            this.btn_volverInicio.setTint(0xff9f9f);
        });
        this.btn_volverInicio.on('pointerout', () => {
            this.btn_volverInicio.clearTint();
        });
        this.btn_volverInicio.on('pointerup', () => {
            location.reload();
            console.log("game over ", this.scene.manager.scenes);
        });
        this.tweens = this.add.tween({
            targets: [this.btn_volverInicio],
            delay: 20000,
            y: 350,
            duration: 5000,
        });

    }
    
    update(time, delta) {
        
    }
}

export default End;
