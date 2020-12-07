import Bullet from './Bullet.js';

class NivelUno extends Phaser.Scene {
    constructor() {
        super({key: 'NivelUno'});
    }

    init(data) {
        console.log('Scene: NivelUno');
        console.log(data);
        // Variables para controlar la activacion de sonidos
        this.musicaAct = data.musica;
        this.sonidoAct = data.sonido;

        // Variables para controlar sonidos del personaje
        this.caminando = false;
        this.saltando = false;

        // Direccion de bullet
        this.flipX = 'der';

        // bandare para solo recibir daño una vez
        this.flag_recibeDanio = true;

        // Es piso
        this.isFloor = false;
    }
    
    preload() {
        // Eventos para controlar la musica y sonidos
        this.registry.events.on('sonido', dato => {
            console.log('Se ha emitido el evento sonido', dato);
            this.sonidoAct = dato;
        });

        this.registry.events.on('musica', dato => {
            console.log('Se ha emitido el evento musica', dato);
            this.musicaAct = dato;
        });
    }

    create() {
        this.saltar = this.sound.add('salto', { loop: false, volume: 1 });
        this.flotar = this.sound.add('flotar', { loop: true, volume: 0.8 });
        this.caminar = this.sound.add('caminar', { loop: true });
        this.disparo = this.sound.add('disparo');


        // ************************************************************
        // DECORACIONES
        // ************************************************************
        // this.fondo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'fondo').setDepth(-2);
        // FONDO MONTANIAS 
        this.fondoMontanias = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'fondo_montanias'
        );
        this.fondoNubes = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'fondo');


        this.malo = this.physics.add.image(500, 315, 'malo');
        this.malo.body.setAllowGravity(false);
        this.malo.body.setImmovable(true);
        this.malo.body.moves = false;

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************

        // plataforma NO SE MUEVE 
        this.grupoPlataforma =  this.physics.add.staticGroup();
        this.grupoPlataforma.create(250,  135, 'piso_5');
        this.grupoPlataforma.create(40,   395, 'piso_1');
        this.grupoPlataforma.create(1565, 290, 'piso_9');
        this.grupoPlataforma.create(700,  145, 'piso_10');
        this.grupoPlataforma.create(550,  390, 'piso_2');
        this.grupoPlataforma.create(1150, 390, 'piso_2');
        this.grupoPlataforma.create(500,  240, 'piso_plataforma');
        this.grupoPlataforma.create(1150, 240, 'piso_plataforma');

        // PLATAFORMAS MOVIBLES
        this.grupoPlataforma_flot = this.physics.add.group();
        this.grupoPlataforma_flot.create(240,   265, 'piso_plataforma');
        this.grupoPlataforma_flot.create(850,   190, 'piso_plataforma');
        this.grupoPlataforma_flot.create(1435,  180, 'piso_plataforma');
        this.grupoPlataforma_flot.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // ITEMS
        this.item_escudo = this.physics.add.image(250, 50, 'escudo').setScale(1.5);
        this.item_escudo.body.setAllowGravity(false);
        this.item_escudo.body.setImmovable(true);
        this.item_escudo.body.moves = false;

        this.item_corazon = this.physics.add.image(1150, 170, 'corazon').setScale(3);
        this.item_corazon.body.setAllowGravity(false);
        this.item_corazon.body.setImmovable(true);
        this.item_corazon.body.moves = false;

        // INICIA LOS TWEENS
        this.iniciaTweens();


        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(50, 100, 'astro').setScale(0.3);
        this.astro.body.setMass(750);
        this.cursor_astro = this.input.keyboard.createCursorKeys();

        // ************************************************************
        // DISPARO
        // ************************************************************
        // this.bullets = new Bullets(this);
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate:true });
        this.bullets.setDepth(-1);

        this.input.keyboard.on('keyup_D', () => {
            if (this.sonidoAct) this.disparo.play();
            const bullet = this.bullets.get().setActive(true).setVisible(true);
            bullet.fire(this.astro.x, this.astro.y, this.flipX);
        });

        // ************************************************************
        // CAMARA PRINCIPAL
        // ************************************************************
        this.cameras.main.setBounds(0, 0,  1600, 400);
        this.physics.world.setBounds(0, 0, 1600, 400);
        this.cameras.main.startFollow(this.astro);
        this.cameras.main.followOffset.set(-200, 0);

        // ************************************************************
        // COLISIÓN
        // ************************************************************
        this.physics.add.collider(this.astro, this.grupoPlataforma, () => {
            this.isFloor = false;
        });
        this.physics.add.collider(this.astro, this.grupoPlataforma_flot, () => {
            this.isFloor = true;
        });
        
        this.physics.add.collider(this.astro, this.item_corazon, () => {
            this.item_corazon.setVisible(false);
            this.item_corazon.disableBody(true);
            this.registry.events.emit('vida_suma', this.sonidoAct);
        });

        this.physics.add.collider(this.astro, this.item_escudo, () => {
            this.item_escudo.setVisible(false);
            this.item_escudo.disableBody(true);
            this.registry.events.emit('recoge_escudo', this.sonidoAct);
        });

        // para matar a los enemigos
        this.physics.add.collider(this.malo, this.bullets, (personaje, balla) => {
            personaje.setVisible(false);
            personaje.disableBody(true);
            personaje.destroy();
            balla.setVisible(false);
            balla.disableBody(true);
            balla.destroy();
            console.log("NIVEL_UNO murio un enemigo");
        });

        // para recibir daño
        this.physics.add.collider(this.astro, this.malo, (astro, malo) => {

            if (this.flag_recibeDanio) {
                let aux_x = 0;
                
                if (astro.x > malo.x) aux_x = 30;
                else  aux_x = -30;

                this.flag_recibeDanio =false;

                this.tweens.add({
                    targets: astro,
                    x: astro.x += aux_x,
                    duration: 250,
                    ease: 'Sine.easeInOut'
                });

                this.muteAll();
                this.registry.events.emit('vida_resta', this.sonidoAct);
                console.log("NIVEL_UNO astro recibe daño, meno una vida");
            }

            this.time.addEvent({
                delay: 100,
                callback: () => { this.flag_recibeDanio = true;},
            });

            
        });
    }

    // Sonidos de las acciones
    playJump() {
        if (!this.saltando && this.sonidoAct) {
            this.saltar.play();
            this.flotar.play();
            this.saltando = true;
        }
    }

    playWalk() {
        if (!this.caminando && this.sonidoAct) {
            this.caminar.play();
            this.caminando = true;
        }
    }

    muteJump() {
        this.flotar.stop();
        this.saltando = false;
    }

    muteWalk() {
        this.caminar.stop();
        this.caminando = false;
    }

    muteAll() {
        this.flotar.stop();
        this.caminar.stop();
        this.saltando = false;
        this.caminando = false;
    }

    update(time, delta) {
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incrementoFondoNubes = 0.5;
        let incrementoFondoMontania = 0.06;
        this.fondoNubes.tilePositionX += incrementoFondoNubes;
        this.fondoMontanias.tilePositionX += incrementoFondoMontania;

        if (this.cursor_astro.left.isDown && this.astro.x > 0)
        {
            this.flipX = 'izq';
            if (this.astro.body.onFloor() || this.isFloor) {
                this.astro.setVelocityX(-250);
                this.astro.anims.play('walk', true);
                this.playWalk();
                this.muteJump();
            }
            else {
                this.astro.setVelocityX(-150);
                this.muteWalk();
            }
        }
        else if (this.cursor_astro.right.isDown && this.astro.x < 1640)
        {
            this.flipX = 'der';
            if(this.astro.body.onFloor() || this.isFloor) {
                this.astro.setVelocityX(250);
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
            if( this.astro.body.onFloor() || this.isFloor ) {
                this.astro.anims.play('idle', true);
                this.muteAll();
            }
        }

        if (this.cursor_astro.space.isDown && 
            ( this.astro.body.onFloor() || this.isFloor ) ) 
        {
            this.astro.setVelocityY(-425);
            this.astro.anims.play('fly', true);
            this.playJump();
            this.isFloor = false;
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
            this.registry.events.emit('vida_resta', this.sonidoAct);
        }
        // Cambiar nivel 1620
        if(this.astro.x > 1620) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('NivelDos', { musica: this.musicaAct, sonido: this.sonidoAct });
                    this.registry.events.emit('registra_nombre_scena', 'NivelDos');
                },
            });
        }

    }

    iniciaTweens(){
        // PLATAFORMAs MOVIBLES 2 y 4
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot.getChildren()[2]
            ],
            y: 275,
            duration: 1500,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        // PLATAFORMA MOVIBLE 1
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot.getChildren()[1]
            ],
            y: 340,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        // PLATAFORMA MOVIBLES 0
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot.getChildren()[0],
            ],
            y: 375,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // // *****************************
        // // ITEMES
        // this.tweens.add({
        //     targets: [
        //         this.item_escudo,
        //     ],
        //     y: this.item_escudo.y + 10,
        //     duration: 500,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
        // this.tweens.add({
        //     targets: [
        //         this.item_corazon,
        //     ],
        //     y: this.item_corazon.y + 10,
        //     duration: 500,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
    
    }
}

export default NivelUno;
