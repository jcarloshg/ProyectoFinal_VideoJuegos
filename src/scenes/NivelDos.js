import Bullet from './Bullet.js';

class NivelDos extends Phaser.Scene {
    constructor() {
        super({key: 'NivelDos'});
    }

    init(data) {
        console.log('Scene: NivelDos');
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

        // Escudo activado
        this.escudoAct = false;
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
        this.caminar = this.sound.add('caminar', { loop: true, volume: 0.8 });
        this.saltar = this.sound.add('salto', { loop: false, volume: 1 });
        this.flotar = this.sound.add('flotar', { loop: true, volume: 0.8 });
        this.disparo = this.sound.add('disparo');
        this.danio_malo = this.sound.add('danio_malo');

        // ************************************************************
        // DECORACIONES
        // ************************************************************
        // FONDO ESTRELLAS
        this.fondo_n2 = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'fondo_n2'
        );
        // Rocas Arriba 
        this.rocas_up = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width*4, this.scale.height, 
            'Rocas_up'
        );

        
        // ************************************************************
        // Enemigos
        // ************************************************************
        this.enemigos = this.physics.add.group({
            key: 'enemigo',
            repeat: 2,
            setXY: {
                x: 1100,
                y: 335,
                stepX: 80,
            }
        });
        this.enemigos.children.iterate( (enemigo) => {
            enemigo.setScale(0.35);
            enemigo.body.setAllowGravity(false);
        });
        this.enemigos.playAnimation('enemigo_walk');

        this.enemigos.getChildren().forEach(enemigo => {
            this.timeline = this.tweens.timeline({
                targets: enemigo,
                paused: true,
                totalDuration: 4000,
                yoyo:true,
                repeat: -1,
                tweens: [
                    {   
                        x: enemigo.x - 150,    
                        onStart: (tweens, obj, targets) => {  },
                        onRepeat: (tweens, obj, targets) => { obj.flipX= false; },
                        onYoyo: (tweens, obj, targets) => { obj.flipX= true; }
                     }
                ]
            });
            this.timeline.play();
        });

        // ************************************************************
        // OBSTACULOS
        // ************************************************************
        this.obstaculo = this.physics.add.sprite(420, 220, 'mk');
        this.obstaculo.anims.play('mk_idle', true);
        this.obstaculo.body.setAllowGravity(false);
        this.obstaculo.body.setImmovable(true);
        this.obstaculo.setCircle(24);

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************
        
        // plataforma NO SE MUEVE 
        this.grupoPlataforma_2 = this.physics.add.staticGroup();
        this.grupoPlataforma_2.create(40,   295, 'piso_roca_3');
        this.grupoPlataforma_2.create(410,  335, 'piso_roca_7');
        this.grupoPlataforma_2.create(520,  400, 'piso_roca_1');
        this.grupoPlataforma_2.create(790,  150, 'piso_roca_8');
        this.grupoPlataforma_2.create(780,  440, 'piso_roca_7');
        this.grupoPlataforma_2.create(1020, 395, 'piso_roca_8');
        this.grupoPlataforma_2.create(1100, 200, 'piso_roca_6');
        this.grupoPlataforma_2.create(1200, 395, 'piso_roca_8');
        this.grupoPlataforma_2.create(1550, 175, 'piso_roca_5');

        // PLATAFORMA MOVIBLE
        this.grupoPlataforma_flot_2 = this.physics.add.group();
        this.grupoPlataforma_flot_2.create(230, 200, 'piso_roca_6');
        this.grupoPlataforma_flot_2.create(1400, 160, 'piso_roca_6');
        this.grupoPlataforma_flot_2.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // ITEMS
        this.item_escudo = this.physics.add.image(780, 300, 'escudo').setScale(1.5);
        this.item_escudo.body.setAllowGravity(false);
        this.item_escudo.body.setImmovable(true);
        this.item_escudo.body.moves = false;

        this.item_corazon = this.physics.add.image(780, 90, 'corazon').setScale(2.5);
        this.item_corazon.body.setAllowGravity(false);
        this.item_corazon.body.setImmovable(true);
        this.item_corazon.body.moves = false;

        // INICIA LOS TWEENS
        this.iniciaTweens();

        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(50, 0, 'astro').setScale(0.30);
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
        this.physics.add.collider(this.astro, this.grupoPlataforma_2, () => {
            this.isFloor = false;
        });
        this.physics.add.collider(this.astro, this.grupoPlataforma_flot_2,
            (player, slider) => {
                if (slider.body.touching.up) {
                    this.isFloor = true;
                }
            }
        );
        
        this.physics.add.collider(this.astro, this.item_corazon, () => {
            this.item_corazon.setVisible(false);
            this.item_corazon.disableBody(true);
            this.registry.events.emit('vida_suma', this.sonidoAct);
        });

        // Escudo
        this.timeline = this.tweens.createTimeline();
        this.timeline.add({
            targets: [this.astro],
            alpha: 0.9,
            repeat: -1,
            yoyo: true,
            duration: 100, 
            onRepeat: (tween, obj, target) => {
                target.setTint(0xff9037);
            }, 
            onYoyo: (tween, obj, target) => { 
                target.clearTint();
            },
            onRepeatParams: [this.astro],
            onYoyoParams: [this.astro]
        });

        this.physics.add.collider(this.astro, this.item_escudo, () => {
            this.item_escudo.setVisible(false);
            this.item_escudo.disableBody(true);
            this.registry.events.emit('recoge_escudo', this.sonidoAct);
            this.escudoAct = true;
            this.timeline.play();

            this.time.addEvent({
                delay: 8000,
                callback: () => {
                    this.timeline.pause();
                    this.escudoAct = false;
                },
            });
        });

        // Destruir obstaculos
        this.physics.add.collider(this.obstaculo, this.bullets,
            (obstacle, bala) => {
                obstacle.setVisible(false);
                obstacle.disableBody(true);
                obstacle.destroy();
                bala.setVisible(false);
                bala.disableBody(true);
                bala.destroy();
            }
        );

        // para matar a los enemigos
        this.physics.add.collider(this.enemigos, this.bullets, (personaje, balla) => {
            if (this.sonidoAct) this.danio_malo.play();
            personaje.setVisible(false);
            personaje.disableBody(true);
            personaje.destroy();
            balla.setVisible(false);
            balla.disableBody(true);
            balla.destroy();
            console.log("NIVEL_UNO murio un enemigo");
        });

        // Recibir daño por obstaculo
        this.physics.add.collider(this.astro, this.obstaculo,
            (astro, obstaculo) => {
                if (this.escudoAct) {
                    this.obstaculo.setVisible(false);
                    this.obstaculo.disableBody(true);
                    this.obstaculo.destroy();
                    if (this.sonidoAct) this.sound.play('select');
                }

                astro.setTint(0xff0000);
                if (this.flag_recibeDanio && !this.escudoAct) {
                    let aux_x = 0;
                    let aux_y = 0;

                    if (astro.x > obstaculo.x) aux_x = 65;
                    else aux_x = -65;

                    // if (astro.y > obstaculo.y) aux_y = 30;
                    // else aux_y = -30;
    
                    this.flag_recibeDanio =false;
    
                    this.tweens.add({
                        targets: astro,
                        x: astro.x += aux_x,
                        y: astro.y += aux_y,
                        duration: 250,
                        ease: 'Sine.easeInOut'
                    });
    
                    this.muteAll();
                    this.registry.events.emit('vida_resta', this.sonidoAct, this.musicaAct);
                    console.log("NIVEL_UNO astro recibe daño, meno una vida");
                }
    
                this.time.addEvent({
                    delay: 100,
                    callback: () => { 
                        this.flag_recibeDanio = true;
                        astro.clearTint();
                    },
                });
            }
        );

        //Recibir daño por enemigo
        this.physics.add.collider(this.astro, this.enemigos,
            (astro, enemigo) => {

                if (this.escudoAct) {
                    enemigo.setVisible(false);
                    enemigo.disableBody(true);
                    enemigo.destroy();
                    if (this.sonidoAct) this.danio_malo.play();
                    if (this.sonidoAct) this.sound.play('select');
                }

                astro.setTint(0xff0000);
                if (this.flag_recibeDanio && !this.escudoAct) {
                    let aux_x = 0;
                    let aux_y = 0;

                    if (astro.x > enemigo.x) aux_x = 65;
                    else aux_x = -65;

                    this.flag_recibeDanio =false;
    
                    this.tweens.add({
                        targets: astro,
                        x: astro.x += aux_x,
                        y: astro.y += aux_y,
                        duration: 250,
                        ease: 'Sine.easeInOut'
                    });
    
                    this.muteAll();
                    this.registry.events.emit('vida_resta', this.sonidoAct, this.musicaAct);
                    console.log("NIVEL_UNO astro recibe daño, meno una vida");
                }
    
                this.time.addEvent({
                    delay: 100,
                    callback: () => { 
                        this.flag_recibeDanio = true;
                        astro.clearTint();
                    },
                });
            }
        );

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
        //Fondo
        let incrementoFondo = 0.05;
        this.fondo_n2.tilePositionX += incrementoFondo; 

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
        if(this.astro.y > (this.scale.height)){
            this.astro.y  = 100;
            this.astro.x  = 100;
            if (this.sonidoAct) this.sound.play('caer');
            this.registry.events.emit('vida_resta', this.sonidoAct, this.musicaAct);
        }

        // Cambiar nivel 1620
        if(this.astro.x > 1620) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('NivelTres', { musica: this.musicaAct, sonido: this.sonidoAct });
                    this.registry.events.emit('registra_nombre_scena', 'NivelTres');
                },
            });
        }
    }

    iniciaTweens(){
        // PLATAFORMA MOVIBLE 0
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot_2.getChildren()[0]
            ],
            y: 350,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        // PLATAFORMA MOVIBLE 1
        // this.tweens.add({
        //     targets: [
        //         this.grupoPlataforma_flot_2.getChildren()[1]
        //     ],
        //     y: 150,
        //     duration: 1000,
        //     ease: 'Sine.easeInOut',
        //     repeat: -1,
        //     yoyo: true
        // });
        // PLATAFORMA MOVIBLE 2
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot_2.getChildren()[1],
            ],
            y: 325,
            duration: 1200,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // *****************************
        // ITEMES
        this.tweens.add({
            targets: [
                this.item_escudo,
            ],
            y: this.item_escudo.y + 10,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        this.tweens.add({
            targets: [
                this.item_corazon,
            ],
            y: this.item_corazon.y + 10,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // ********************************
        // OBSTACULOS
        this.tweens.add({
            targets: [this.obstaculo],
            y: this.obstaculo.y + 10,
            duration: 500,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
        });
    }
}

export default NivelDos;