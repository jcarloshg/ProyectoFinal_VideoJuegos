class Seleccion extends Phaser.Scene {
    constructor() {
        super({key: 'Seleccion'});
    }

    init(data) {
        console.log('Scene: Tutorial');
        console.log(data);
        // Variables para controlar la activacion de sonidos
        this.musicaAct = data.musica;
        this.sonidoAct = data.sonido;
    }

    preload() {
        //
    }

    create() {
        this.spaceX = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'spaceX'
        );
        
        // Botón iniciar
        this.iniciar_btn = this.add.image(
            this.scale.width / 2, 
            this.scale.height / 2 - 50, 
            'iniciar_t'
        ).setInteractive();

        this.iniciar_btn.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.iniciar_btn.setTint(0xff9f9f);
        });

        this.iniciar_btn.on('pointerout', () => {
            this.iniciar_btn.clearTint();
        });

        this.iniciar_btn.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.iniciar_btn.setTint(0xff0000);
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    this.scene.start('Intro', {musica: this.musicaAct, sonido: this.sonidoAct });
                },
            });
        });

        // Botón tutorial
        this.tutorial_btn = this.add.image(
            this.scale.width/2,
            this.scale.height/2 + 50,
            'tutorial_btn'
        ).setInteractive();

        this.tutorial_btn.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.tutorial_btn.setTint(0xff9f9f);
        });

        this.tutorial_btn.on('pointerout', () => {
            this.tutorial_btn.clearTint();
        });

        this.tutorial_btn.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.tutorial_btn.setTint(0xff0000);
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    this.scene.start('Tutorial', {musica: this.musicaAct, sonido: this.sonidoAct });
                },
            });
        });
    }

    update() {
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incrementoFondo = 0.5;
        this.spaceX.tilePositionX += incrementoFondo;
    }
}

export default Seleccion;