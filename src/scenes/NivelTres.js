
class NivelTres extends Phaser.Scene {
    constructor() {
        super({key: 'NivelTres'});
    }

    init() {
        console.log('Scene: NivelTres');
    }

    create() {
        this.caminar = this.sound.add('caminar', { loop: true, volume: 0.8 });
        this.saltar = this.sound.add('salto', { loop: false, volume: 1 });
        this.flotar = this.sound.add('flotar', { loop: true, volume: 0.8 });
        this.disparo = this.sound.add('disparo');

        // this.fondo = this.add.tileSprite(
        //     this.scale.width / 2, this.scale.height / 2,
        //     this.scale.width*4, this.scale.height, 
        //     'fondo_nivelTres'
        // );

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
        this.grupo_plataformaMovible.create(250, 150, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(150, 150, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(750, 150, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(850, 150, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(1150, 175, 'plataforma_1x1');
        this.grupo_plataformaMovible.create(1550, 175, 'plataforma_1x1');
        this.grupo_plataformaMovible.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        this.iniciaTweens();

        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(1000, 100, 'astro').setScale(0.25).setSize(190, 220);
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
        // COLISIÓN
        // ************************************************************
        this.physics.add.collider(this.astro, this.grupo_plataforma);
        this.physics.add.collider(this.astro, this.grupo_plataformaMovible);
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
