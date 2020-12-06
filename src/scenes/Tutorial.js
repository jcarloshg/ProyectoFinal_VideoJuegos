import Bullet from './Bullet.js';
class Tutorial extends Phaser.Scene {
    constructor() {
        super({key: 'Tutorial'});
    }

    init(data) {
        console.log('Scene: Tutorial');
        console.log(data);
        // Variables para controlar la activacion de sonidos
        this.musicaAct = data.musica;
        this.sonidoAct = data.sonido;

        // Variables para controlar sonidos del personaje
        this.caminando = false;
        this.saltando = false;

        // Direccion de bullet
        this.flipX = 'der';
    }

    preload() {
        //
    }

    create() {
        this.saltar = this.sound.add('salto', { loop: false, volume: 1 });
        this.flotar = this.sound.add('flotar', { loop: true, volume: 0.8 });
        this.caminar = this.sound.add('caminar', { loop: true });
        this.disparo = this.sound.add('disparo');


        // ************************************************************
        // DECORACIONES
        // ************************************************************
        // FONDO
        this.spaceX = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'spaceX'
        );

        // Teclas guía
        this.movimiento_i = this.add.image(125, 25, 'movimiento_i')
        .setScale(0.3).setAlpha(0.6);
        this.salto_i = this.add.image(320, 25, 'salto_i')
        .setScale(0.3).setAlpha(0.6);
        this.disparo_i = this.add.image(500, 25, 'disparo_i')
        .setScale(0.3).setAlpha(0.6);

        // Botón iniciar
        this.iniciar_t = this.add.image(900, 25, 'iniciar_t')
        .setScale(0.5).setAlpha(0.6).setInteractive();

        this.iniciar_t.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.iniciar_t.setAlpha(1);
        });

        this.iniciar_t.on('pointerout', () => {
            this.iniciar_t.setAlpha(0.6);
        });

        this.iniciar_t.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.iniciar_t.setTint(0xff0000);
            this.time.addEvent({
                delay: 200,
                callback: () => {
                    this.scene.start('NivelUno', { 
                        musica: this.musicaAct, 
                        sonido: this.sonidoAct 
                    });
                    this.scene.start('ElementosHUD', { vidas: 3 });
                    this.scene.start('Menu', { 
                        musica: this.musicaAct, 
                        sonido: this.sonidoAct, 
                        nivel: 'NivelUno'
                    });
                },
            });
        });

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************

        // plataforma NO SE MUEVE 
        this.grupoPlataformas = this.physics.add.staticGroup();
        this.grupoPlataformas.create(128, 385, 'piso');
        this.grupoPlataformas.create(382, 385, 'piso');
        this.grupoPlataformas.create(636, 385, 'piso');
        this.grupoPlataformas.create(890, 385, 'piso');

        // // PLATAFORMA flotante
        this.grupoPlataformas_flot = this.physics.add.staticGroup();
        this.grupoPlataformas_flot.create(254, 250, 'piso_x');
        this.grupoPlataformas_flot.create(512, 190, 'piso_x');
        this.grupoPlataformas_flot.create(766, 125, 'piso_x');
        this.grupoPlataformas_flot.create(766, 250, 'piso_x');

        // // ************************************************************
        // // PERSONAJE
        // // ************************************************************
        this.astro = this.physics.add.sprite(100, 100, 'astro').setScale(0.30);
        this.astro.setBounce(0.1);
        this.cursor_astro = this.input.keyboard.createCursorKeys();

        // // ************************************************************
        // // DISPARO
        // // ************************************************************
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate:true });
        this.bullets.setDepth(-1);

        this.input.keyboard.on('keydown_D', () => {
            this.disparo_i.setAlpha(1);
        });

        this.input.keyboard.on('keyup_D', () => {
            this.disparo_i.setAlpha(0.6);
            if (this.sonidoAct) this.disparo.play();
            const bullet = this.bullets.get().setActive(true).setVisible(true);
            bullet.fire(this.astro.x, this.astro.y, this.flipX);
        });

        // // ************************************************************
        // // COLISIÓN
        // // ************************************************************
        this.physics.add.collider(this.astro, this.grupoPlataformas);
        this.physics.add.collider(this.astro, this.grupoPlataformas_flot);
    }

    // Sonidos de las acciones
    playJump() {
        this.salto_i.setAlpha(1);
        if (!this.saltando && this.sonidoAct) {
            this.saltar.play();
            this.flotar.play();
            this.saltando = true;
        }
    }

    playWalk() {
        this.movimiento_i.setAlpha(1);
        if (!this.caminando && this.sonidoAct) {
            this.caminar.play();
            this.caminando = true;
        }
    }

    muteJump() {
        this.salto_i.setAlpha(0.6);
        this.flotar.stop();
        this.saltando = false;
    }

    muteWalk() {
        this.movimiento_i.setAlpha(0.6);
        this.caminar.stop();
        this.caminando = false;
    }

    muteAll() {
        this.movimiento_i.setAlpha(0.6);
        this.salto_i.setAlpha(0.6);
        this.flotar.stop();
        this.caminar.stop();
        this.saltando = false;
        this.caminando = false;
    }

    update(time, delta) {
        // MOVIMIENTO DEL FONDO
        let incrementoFondo = 0.5;
        this.spaceX.tilePositionX += incrementoFondo;

        if (this.cursor_astro.left.isDown && this.astro.x > 0)
        {
            this.flipX = 'izq';
            if (this.astro.body.onFloor()) {
                this.astro.setVelocityX(-275);
                this.astro.anims.play('walk', true);
                this.playWalk();
                this.muteJump();
            }
            else {
                this.astro.setVelocityX(-150);
                this.muteWalk();
            }
        }
        else if (this.cursor_astro.right.isDown && this.astro.x < 1000)  
        {
            this.flipX = 'der';
            if(this.astro.body.onFloor()) {
                this.astro.setVelocityX(275);
                this.astro.anims.play('walk', true);
                this.playWalk();
                this.muteJump();
            }
            else {
                this.astro.setVelocityX(150);
                this.muteWalk();
            }
        }
        else {
            this.astro.setVelocityX(0);
            if( this.astro.body.onFloor() ) {
                this.astro.anims.play('idle', true);
                this.muteAll();
            }
        }

        if (this.cursor_astro.space.isDown && 
            this.astro.body.onFloor()) 
        {
            this.astro.setVelocityY(-375);
            this.astro.anims.play('fly', true);
            this.playJump();
        }

        if (this.astro.body.velocity.x > 0) {
            this.astro.setFlipX(false);
        } else if (this.astro.body.velocity.x < 0) {
            this.astro.setFlipX(true);
        }

        // perder vida
        if(this.astro.y > (this.scale.height)) {
            this.astro.y  = 100;
            this.astro.x  = 100;
            if (this.sonidoAct) this.sound.play('caer');
        }
    }
}

export default Tutorial;