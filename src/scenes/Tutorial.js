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
        // FONDO
        this.spaceX = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'spaceX'
        );

        this.movimiento_i = this.add.image(125, 25, 'movimiento_i').setScale(0.3);
        this.salto_i = this.add.image(320, 25, 'salto_i').setScale(0.3);
        this.disparo_i = this.add.image(500, 25, 'disparo_i').setScale(0.3);

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************

        // plataforma NO SE MUEVE 
        this.grupoPlataformas = this.physics.add.group();
        this.grupoPlataformas.create(128, 385, 'piso');
        this.grupoPlataformas.create(382, 385, 'piso');
        this.grupoPlataformas.create(636, 385, 'piso');
        this.grupoPlataformas.create(890, 385, 'piso');
        this.grupoPlataformas.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // // PLATAFORMA MOVIBLE
        this.grupoPlataformas_flot = this.physics.add.group();
        this.grupoPlataformas_flot.create(254, 265, 'piso_x');
        this.grupoPlataformas_flot.create(512, 125, 'piso_x');
        this.grupoPlataformas_flot.create(766, 125, 'piso_x');
        this.grupoPlataformas_flot.create(766, 250, 'piso_x');
        this.grupoPlataformas_flot.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // // ITEMS
        // this.item_escudo = this.physics.add.image(250, 50, 'escudo').setScale(1.5);
        // this.item_escudo.body.setAllowGravity(false);
        // this.item_escudo.body.setImmovable(true);
        // this.item_escudo.body.moves = false;

        // this.item_corazon = this.physics.add.image(1150, 160, 'corazon').setScale(3);
        // this.item_corazon.body.setAllowGravity(false);
        // this.item_corazon.body.setImmovable(true);
        // this.item_corazon.body.moves = false;

        // // INICIA LOS TWEENS
        this.iniciaTweens();


        // // ************************************************************
        // // PERSONAJE
        // // ************************************************************
        this.astro = this.physics.add.sprite(100, 100, 'astro').setScale(0.30);
        this.astro.anims.play('idle', true);
        this.cursor_astro = this.input.keyboard.createCursorKeys();

        // // ************************************************************
        // // DISPARO
        // // ************************************************************
        // // this.bullets = new Bullets(this);
        // this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate:true });
        // this.bullets.setDepth(-1);

        // this.input.keyboard.on('keyup_D', () => {
        //     if (this.sonidoAct) this.disparo.play();
        //     const bullet = this.bullets.get().setActive(true).setVisible(true);
        //     bullet.fire(this.astro.x, this.astro.y, this.flipX);
        // });

        // // ************************************************************
        // // CAMARA PRINCIPAL
        // // ************************************************************
        // this.cameras.main.setBounds(0, 0,  1600, 400);
        // this.physics.world.setBounds(0, 0, 1600, 400);
        // this.cameras.main.startFollow(this.astro);
        // this.cameras.main.followOffset.set(-200, 0);

        // // ************************************************************
        // // COLISIÓN
        // // ************************************************************
        this.physics.add.collider(this.astro, this.grupoPlataformas);
        this.physics.add.collider(this.astro, this.grupoPlataformas_flot);
        
        // this.physics.add.collider(this.astro, this.item_corazon, () => {
        //     this.item_corazon.setVisible(false);
        //     this.item_corazon.disableBody(true);
        //     this.registry.events.emit('vida_suma', this.sonidoAct);
        // });

        // this.physics.add.collider(this.astro, this.item_escudo, () => {
        //     this.item_escudo.setVisible(false);
        //     this.item_escudo.disableBody(true);
        //     this.registry.events.emit('recoge_escudo', this.sonidoAct);
        // });

        // // para matar a los enemigos
        // this.physics.add.collider(this.malo, this.bullets, (personaje, balla) => {
        //     personaje.setVisible(false);
        //     personaje.disableBody(true);
        //     personaje.destroy();
        //     balla.setVisible(false);
        //     balla.disableBody(true);
        //     balla.destroy();
        //     console.log("NIVEL_UNO murio un enemigo");
        // });

        // // para recibir daño
        // this.physics.add.collider(this.astro, this.malo, (astro, malo) => {

        //     if (this.flag_recibeDanio) {
        //         let aux_x = 0;
                
        //         if (astro.x > malo.x) aux_x = 30;
        //         else  aux_x = -30;

        //         this.flag_recibeDanio =false;

        //         this.tweens.add({
        //             targets: astro,
        //             x: astro.x += aux_x,
        //             duration: 250,
        //             ease: 'Sine.easeInOut'
        //         });

        //         this.muteAll();
        //         this.registry.events.emit('vida_resta', this.sonidoAct);
        //         console.log("NIVEL_UNO astro recibe daño, meno una vida");
        //     }

        //     this.time.addEvent({
        //         delay: 100,
        //         callback: () => { this.flag_recibeDanio = true;},
        //     });

            
        // });

        // this.physics.add.collider(this.grupoPlataforma, this.bullets, () => {
        //     this.bullets.children.get().destroy();
        // });

        // DISPARO
        // this.input.on('pointerup', (evento) => {
        //     // const bullet = this.bullets.get().setActive(true).setVisible(true);
        //     // bullet.fire(this.astro.x, this.astro.y, 'der');

        //     this.time.addEvent({
        //         delay: 100,
        //         callback: () => {
        //             this.scene.start('NivelDos', { musica: this.musicaAct, sonido: this.sonidoAct });
        //             this.registry.events.emit('registra_nombre_scena', 'NivelDos');
        //         },
        //     });
        // });
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
        this.saltar.stop();
        this.saltando = false;
    }

    muteWalk() {
        this.caminar.stop();
        this.caminando = false;
    }

    muteAll() {
        this.flotar.stop();
        this.saltar.stop();
        this.caminar.stop();
        this.saltando = false;
        this.caminando = false;
    }

    update(time, delta) {
        let incrementoFondo = 0.5;
        this.spaceX.tilePositionX += incrementoFondo;
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incremento = 2;
        // let incrementoFondoNubes = 0.5;
        // let incrementoFondoMontania = 0.06;

        // this.fondoNubes.tilePositionX += incrementoFondoNubes;
        // this.fondoMontanias.tilePositionX += incrementoFondoMontania;

        if (this.cursor_astro.left.isDown && this.astro.body.touching.down)   {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(true);
            // this.astro.x += -incremento;
            this.astro.setVelocityX(-225);
            this.flipX = 'izq';
        }
        else if (this.cursor_astro.right.isDown && this.astro.body.touching.down)  {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(false);
            // this.astro.x +=  incremento;
            this.astro.setVelocityX(225);
            this.flipX = 'der';
        } 
        else if (this.cursor_astro.space.isDown) {
            this.astro.anims.play('fly', true);
            this.astro.y += -incremento-4;
            this.playJump();
            this.muteWalk();

            if(this.cursor_astro.right.isDown){
                this.astro.setFlipX(false);
                // this.astro.x +=  incremento;
                this.astro.setVelocityX(115);
            }
            if(this.cursor_astro.left.isDown){
                this.astro.setFlipX(true);
                // this.astro.x += -incremento;
                this.astro.setVelocityX(-115);
            }
        }
        else {
            this.astro.anims.play('idle', true);
            this.astro.setVelocityX(0);
            this.muteAll();
        }

        // // Disparar
        // // if (this.cursor_astro.space.isDown && time > this.lastFired) {
        // //     console.log('Disparo');
        // //     const bullet = this.bullets.get().setActive(true).setVisible(true);
        // //     bullet.fire(this.astro.x, this.astro.y, 'der');
        // //     this.lastFired = time + 100;
        // // }

        // // perder vida
        // if(this.astro.y > (this.scale.height)) {
        //     this.astro.y  = 100;
        //     this.astro.x  = 100;
        //     if (this.sonidoAct) this.sound.play('caer');
        //     this.registry.events.emit('vida_resta', this.sonidoAct);
        // }
        // // Cambiar nivel 1620
        // if(this.astro.x > 1620) {
        //     this.time.addEvent({
        //         delay: 1000,
        //         callback: () => {
        //             this.scene.start('NivelDos', { musica: this.musicaAct, sonido: this.sonidoAct });
        //             this.registry.events.emit('registra_nombre_scena', 'NivelDos');
        //         },
        //     });
        // }

    }

    iniciaTweens(){
        // PLATAFORMA MOVIBLES 4
        // this.tweens.add({
        //     targets: [
        //         this.grupoPlataforma_flot.getChildren()[3],
        //         this.grupoPlataforma_flot.getChildren()[4]
        //     ],
        //     y: 300,
        //     duration: 2000,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
        // // PLATAFORMA MOVIBLES 1 Y 2
        // this.tweens.add({
        //     targets: [
        //         this.grupoPlataforma_flot.getChildren()[1]
        //     ],
        //     y: 140,
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
        // // PLATAFORMA 2
        // this.tweens.add({
        //     targets: [
        //         this.grupoPlataforma_flot.getChildren()[2]
        //     ],
        //     y: 340,
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
        // PLATAFORMA MOVIBLES 0
        this.tweens.add({
            targets: [
                this.grupoPlataformas_flot.getChildren()[0],
            ],
            y: 125,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // *****************************
        // ITEMES
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

export default Tutorial;