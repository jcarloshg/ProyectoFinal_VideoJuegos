import Bullet from './Bullet.js';

class NivelTres extends Phaser.Scene {
    constructor() {
        super({key: 'NivelTres'});
    }

    init(data) {
        console.log('Scene: NivelTres');
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
        this.caminar = this.sound.add('caminar', { loop: true, volume: 0.8 });
        this.saltar = this.sound.add('salto', { loop: false, volume: 1 });
        this.flotar = this.sound.add('flotar', { loop: true, volume: 0.8 });
        this.disparo = this.sound.add('disparo');

        this.fondo = this.add.image(
            this.scale.width/2, this.scale.height/2, 
            'fondo_nivelTres'
        ).setScale(1.5);

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************
        this.grupo_plataforma = this.physics.add.group();
        this.grupo_plataforma.create(200, 375, 'plataforma_8x1');
        this.grupo_plataforma.create(500, 325, 'plataforma_1x3');
        this.grupo_plataforma.create(800, 375, 'plataforma_8x1');
        this.grupo_plataforma.create(1350, 100, 'plataforma_1x1');
        this.grupo_plataforma.create(1350, 375, 'plataforma_2x1');
        this.grupo_plataforma.create(1350, 250, 'plataforma_1x1');
        this.grupo_plataforma.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        this.grupo_plataformaMovible = this.physics.add.group();
        this.grupo_plataformaMovible.create(250, 200, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(150, 200, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(750, 200, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(850, 200, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(1150, 175, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(1550, 175, 'plataforma_1x1');
        this.grupo_plataformaMovible.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // ITEMS
        this.item_escudo = this.physics.add.image(1350, 50, 'escudo').setScale(1.5);
        this.item_escudo.body.setAllowGravity(false);
        this.item_escudo.body.setImmovable(true);
        this.item_escudo.body.moves = false;

        this.grupoCorazones = this.physics.add.group();
        this.grupoCorazones.create(200, 100, 'corazon').setScale(3);
        this.grupoCorazones.create(800, 100, 'corazon').setScale(3);
        this.grupoCorazones.children.iterate( (corazon) => {
            corazon.body.setAllowGravity(false);
            corazon.body.setImmovable(true);
            corazon.body.moves = false;
        });

        this.iniciaTweens();

        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(100, 100, 'astro').setScale(0.25).setSize(190, 220);
        this.astro.anims.play('idle', true);
        this.cursor_astro = this.input.keyboard.createCursorKeys();

        // ************************************************************
        // CAMARA PRINCIPAL
        // ************************************************************
        this.cameras.main.setBounds(0, 0,  1900, 400);
        this.physics.world.setBounds(0, 0, 1900, 400);
        this.cameras.main.startFollow(this.astro);
        this.cameras.main.followOffset.set(-200, 0);

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
        // COLISIÓN
        // ************************************************************
        this.physics.add.collider(this.astro, this.grupo_plataforma);
        this.physics.add.collider(this.astro, this.grupo_plataformaMovible);

        this.physics.add.collider(this.astro, this.grupoCorazones, (personaje, corazon) => {
            corazon.setVisible(false);
            corazon.disableBody(true);
            this.registry.events.emit('vida_suma', this.sonidoAct);
        });

        this.physics.add.collider(this.astro, this.item_escudo, () => {
            this.item_escudo.setVisible(false);
            this.item_escudo.disableBody(true);
            this.registry.events.emit('recoge_escudo', this.sonidoAct);
        });
    }

    update(time, delta) {

        // let incrementoFondo = 0.05;
        // this.fondo.tilePositionX += incrementoFondo; 

        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incremento = 2;
        
        if (this.cursor_astro.left.isDown && this.astro.body.touching.down)   {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(true);
            // this.astro.x += -incremento;
            this.astro.setVelocityX(-150);
            this.flipX = 'izq';
        }
        else if (this.cursor_astro.right.isDown && this.astro.body.touching.down)  {
            this.playWalk();
            this.muteJump();
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(false);
            // this.astro.x +=  incremento;
            this.astro.setVelocityX(150);
            this.flipX = 'der';
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
        if(this.astro.y > (this.scale.height)){
            this.astro.y  = 100;
            this.astro.x  = 100;
            if (this.sonidoAct) this.sound.play('caer');
            this.registry.events.emit('vida_resta', this.sonidoAct);
        }
    }

    iniciaTweens(){
        // PLATAFORMAS 1 Y 2 IZQUIEAD-DERECHA
        this.tweens.add({
            targets: [
                this.grupo_plataformaMovible.getChildren()[0],
                this.grupo_plataformaMovible.getChildren()[1],
                this.grupo_plataformaMovible.getChildren()[2],
                this.grupo_plataformaMovible.getChildren()[3],
            ],
            y: this.grupo_plataformaMovible.getChildren()[0].y + 50,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

        // PLATAFORMAS 3 Y 5 IZQUIEAD-DERECHA
        this.tweens.add({
            targets: [
                this.grupo_plataformaMovible.getChildren()[4],
                this.grupo_plataformaMovible.getChildren()[5],
                this.grupo_plataformaMovible.getChildren()[6],
                this.grupo_plataformaMovible.getChildren()[7],
            ],
            y: this.grupo_plataformaMovible.getChildren()[4].y + 150,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
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

}

export default NivelTres;
