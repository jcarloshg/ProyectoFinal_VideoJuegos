
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

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************
        
        // plataforma NO SE MUEVE 
        this.grupoPlataforma =  this.physics.add.group();
        this.grupoPlataforma.create(250,    150, 'piso_5');
        this.grupoPlataforma.create( 90,    390, 'piso_1');
        this.grupoPlataforma.create(525,    300, 'piso_3');
        this.grupoPlataforma.create(1050,   340, 'piso_6');
        this.grupoPlataforma.create(1200,   365, 'piso_7');
        this.grupoPlataforma.create(1300,   390, 'piso_8');
        this.grupoPlataforma.create(1550,   290, 'piso_9');
        this.grupoPlataforma.create(750,    150, 'piso_10');
        this.grupoPlataforma.create(550,    390, 'piso_2');
        this.grupoPlataforma.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // PLATAFORMA MOVIBLE
        this.grupoPlataforma_flot = this.physics.add.group();
        this.grupoPlataforma_flot.create(250,   240, 'piso_plataforma');
        this.grupoPlataforma_flot.create(425,   210, 'piso_plataforma');
        this.grupoPlataforma_flot.create(600,   210, 'piso_plataforma');
        this.grupoPlataforma_flot.create(885,   190, 'piso_plataforma');
        this.grupoPlataforma_flot.create(1435,  190, 'piso_plataforma');
        this.grupoPlataforma_flot.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // INICIA LOS TWEENS
        this.iniciaTweens();


        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(100, 100, 'astro').setScale(0.30);
        this.astro.anims.play('idle', true);
        this.cursor_astro = this.input.keyboard.createCursorKeys();


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
        this.physics.add.collider(this.astro, this.grupoPlataforma);
        this.physics.add.collider(this.astro, this.grupoPlataforma_flot);

        this.input.on('pointerup', (evento) => {
            this.time.addEvent({
                delay: 100,
                callback: () => {
                    this.scene.start('NivelDos', { musica: this.musicaAct, sonido: this.sonidoAct });
                },
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
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incremento = 2;
        let incrementoFondoNubes = 0.5;
        let incrementoFondoMontania = 0.06;

        this.fondoNubes.tilePositionX += incrementoFondoNubes;
        this.fondoMontanias.tilePositionX += incrementoFondoMontania;

        if (this.cursor_astro.left.isDown && this.astro.body.touching.down)   {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(true);
            // this.astro.x += -incremento;
            this.astro.setVelocityX(-150);
        }
        else if (this.cursor_astro.right.isDown && this.astro.body.touching.down)  {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(false);
            // this.astro.x +=  incremento;
            this.astro.setVelocityX(150);
        } 
        else if (this.cursor_astro.up.isDown) {
            this.astro.anims.play('fly', true);
            this.astro.y += -incremento-4;
            this.playJump();
            this.muteWalk();

            if(this.cursor_astro.right.isDown){
                this.astro.setFlipX(false);
                // this.astro.x +=  incremento;
                this.astro.setVelocityX(100);
            }
            if(this.cursor_astro.left.isDown){
                this.astro.setFlipX(true);
                // this.astro.x += -incremento;
                this.astro.setVelocityX(-100);
            }
        }
        else {
            this.astro.anims.play('idle', true);
            this.astro.setVelocityX(0);
            this.muteAll();
        } 

        // perder vida
        if(this.astro.y > (this.scale.height)) {
            this.astro.y  = 100;
            this.astro.x  = 100;
        }
        // Cambiar nivel 1620
        if(this.astro.x > 1620) {
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('NivelDos', 
                    { musica: this.musicaAct, sonido: this.sonidoAct });
                },
            });
        }

    }

    iniciaTweens(){
        // PLATAFORMA MOVIBLES 4
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot.getChildren()[3],
                this.grupoPlataforma_flot.getChildren()[4]
            ],
            y: 300,
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        // PLATAFORMA MOVIBLES 1 Y 2
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot.getChildren()[1],
                this.grupoPlataforma_flot.getChildren()[2],
                this.grupoPlataforma_flot.getChildren()[3],
            ],
            y: 140,
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
            y: 330,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
    
    }
}

export default NivelUno;
