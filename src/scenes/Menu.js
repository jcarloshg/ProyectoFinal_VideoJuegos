
class Menu extends Phaser.Scene {
    constructor() {
        super({key: 'Menu'});
    }

    init() {
        console.log('Scene: Menu');
        this.flagMenu = true;
    }

    create() {
        this.btn_pause = this.add.image(this.scale.width-100, 50, 'pausa').setScale(0.3).setInteractive();

        // NAVE ICONO
        this.hoverSprite = this.add.sprite((this.scale.width/2) -500, 375, 'spaceship');
        this.hoverSprite.setScale(1.5);
        this.hoverSprite.setDepth(2);
        this.hoverSprite.setVisible(false);

        this.opciones();

        // TWEEN OPCIONES
        this.tween_opc = this.tweens.add({
            targets: [this.container_2],
            y: 300,
            ease: 'Bounce',
            duration: 1500,
        });

        this.btn_pause.on( 'pointerup', () => {
            this.container_2.setVisible(true);
            this.tween_opc.restart();
            this.btn_pause.setVisible(false);
        });

    }

    update(time, delta) {

    }

    opciones() {
        // Pantalla de opciones
        this.container_2 = this.add.container(0, 0);
        this.menuFondo = this.add.image(this.scale.width/2, this.scale.height/2, 'fondoMenu');


        this.opciones_2 = this.add.image((this.scale.width/2), -325, "opciones_2");

        this.volver = this.add.image(400, -250, "volver").setScale(0.4).setInteractive();
        this.sonido = this.add.image((this.scale.width/2), -175, "sonido").setInteractive().setScale(0.5);
        this.musica_txt = this.add.image((this.scale.width/2), -125, "musica_txt").setInteractive().setScale(0.5);

        this.activado_1 = this.add.image((this.scale.width/2)+125, -175, "activado").setScale(0.5);
        this.activado_2 = this.add.image((this.scale.width/2)+125, -125, "activado").setScale(0.5);

        this.desactivado_1 = this.add.image((this.scale.width/2)+125, -175, "desactivado").setVisible(false).setScale(0.5);
        this.desactivado_2 = this.add.image((this.scale.width/2)+125, -125, "desactivado").setVisible(false).setScale(0.5);

        this.container_2.add([
            this.menuFondo,
            this.opciones_2,
            this.volver,
            this.sonido,
            this.musica_txt,
            this.activado_1,
            this.activado_2,
            this.desactivado_1,
            this.desactivado_2
        ]);
        this.container_2.setVisible(false);

        // Botón para regresar a la pantalla inicial
        this.volver.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.volver.setTint(0xff9f9f);
        });
        this.volver.on('pointerout', () => {
            this.volver.clearTint();
        });
        this.volver.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.btn_pause.setVisible(true);
            this.container_2.setVisible(false);
            // this.mostrarInicio();
        });

        // Eventos del bóton para activar/desactivar el sonido
        this.sonido.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.sonido.setTint(0xff9f9f);
            this.hoverSprite.x = this.sonido.x - 100;
            this.hoverSprite.y = this.sonido.y + 300;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });
        this.sonido.on('pointerout', () => {
            this.hoverSprite.setVisible(false);
            this.sonido.clearTint();
        });
        this.sonido.on('pointerup', () => {
            if (this.sonidoAct) {
                this.sonidoAct = false;
                this.activado_1.setVisible(false);
                this.desactivado_1.setVisible(true);
            }
            else {
                this.sound.play('select');
                this.sonidoAct = true;
                this.activado_1.setVisible(true);
                this.desactivado_1.setVisible(false);
            }
        });

        // Eventos del bóton para activar/desactivar la música
        this.musica_txt.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.musica_txt.setTint(0xff9f9f);
            this.hoverSprite.x = this.musica_txt.x - 100;
            this.hoverSprite.y = this.musica_txt.y + 300;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });

        this.musica_txt.on('pointerout', () => {
            this.hoverSprite.setVisible(false);
            this.musica_txt.clearTint();
        });

        this.musica_txt.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');

            if (this.musicaAct) {
                this.musicaAct = false;
                this.activado_2.setVisible(false);
                this.desactivado_2.setVisible(true);
                // this.musica.pause();
            }
            else {
                this.musicaAct = true;
                this.activado_2.setVisible(true);
                this.desactivado_2.setVisible(false);
                // this.musica.resume();
            }
        });
    }
}

export default Menu;
