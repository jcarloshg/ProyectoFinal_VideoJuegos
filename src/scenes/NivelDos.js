class NivelDos extends Phaser.Scene {
    constructor() {
        super({key: 'NivelDos'});
    }

    init() {
        console.log('Scene: NivelDos');
    }
    
    preload() {
        this.load.setPath('./assets/NivelDos');
        this.load.image('piso_roca_1', 'Piso_roca_1.png');
        this.load.image('piso_roca_2', 'Piso_roca_2.png');
        this.load.image('piso_roca_3', 'Piso_roca_3.png');
        this.load.image('piso_roca_4', 'Piso_roca_4.png');
        this.load.image('piso_roca_5', 'Piso_roca_5.png');
        this.load.image('piso_roca_6', 'Piso_roca_6.png');
        this.load.image('piso_roca_7', 'Piso_roca_7.png');
        this.load.image('piso_roca_8', 'Piso_roca_8.png');
        this.load.image('Rocas_up', 'Rocas_up.png');

        // fondo
        this.load.image('fondo_n2', 'fondo_n2.png');
        
        //Animaciones
        this.load.atlas('astro', '../Personaje/astro.png',
                        '../Personaje/astro_atlas.json');
        this.load.animation('astroAnim', '../Personaje/astro_anim.json');
    }

    create() {
        // ************************************************************
        // DECORACIONES
        // ************************************************************
        // FONDO ESTRELLAS
        this.fondo_n2 = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width, this.scale.height, 
            'fondo_n2'
        );
        // Rocas Arriba 
        this.rocas_up = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width, this.scale.height, 
            'Rocas_up'
        );

        // ************************************************************
        // PLATAFORMAS
        // ************************************************************
        
        // plataforma NO SE MUEVE 
        this.grupoPlataforma_2 =  this.physics.add.group();
        this.grupoPlataforma_2.create(80, 295, 'piso_roca_3');
        this.grupoPlataforma_2.create(380, 335, 'piso_roca_7');
        this.grupoPlataforma_2.create(520, 385, 'piso_roca_1');
        this.grupoPlataforma_2.create(780, 180, 'piso_roca_8');
        this.grupoPlataforma_2.create(1180, 320, 'piso_roca_8');
        this.grupoPlataforma_2.create(1540, 225, 'piso_roca_5');
        this.grupoPlataforma_2.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // PLATAFORMA MOVIBLE
        this.grupoPlataforma_flot_2 = this.physics.add.group();
        this.grupoPlataforma_flot_2.create(235, 200, 'piso_roca_6');
        this.grupoPlataforma_flot_2.create(580, 300, 'piso_roca_6');
        this.grupoPlataforma_flot_2.create(980, 300, 'piso_roca_6');
        this.grupoPlataforma_flot_2.create(1360, 160, 'piso_roca_6');
        this.grupoPlataforma_flot_2.children.iterate( (plataforma) => {
            plataforma.body.setAllowGravity(false);
            plataforma.body.setImmovable(true);
            plataforma.body.moves = false;
        });

        // INICIA LOS TWEENS
        this.iniciaTweens();


        // ************************************************************
        // PERSONAJE
        // ************************************************************
        this.astro = this.physics.add.sprite(100,0, 'astro').setScale(0.30);
        this.astro.anims.play('idle', true);
        this.cursor_astro = this.input.keyboard.createCursorKeys();

        // ************************************************************
        // CAMARA
        // ************************************************************

        // ************************************************************
        // COLISIÓN
        // ************************************************************
        this.physics.add.collider(this.astro, this.grupoPlataforma_2);
        this.physics.add.collider(this.astro, this.grupoPlataforma_flot_2);
    }
    update(time, delta) {
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        //Fondo
        let incrementoFondo = 0.05;
        this.fondo_n2.tilePositionX += incrementoFondo; 
        //Personaje
        let incremento = 2;
        if (this.cursor_astro.left.isDown && this.astro.body.touching.down)   {
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(true);
            this.astro.x                += -incremento;
        }
        else if (this.cursor_astro.right.isDown && this.astro.body.touching.down)  {
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(false);
            this.astro.x                +=  incremento;
        } 
        else if (this.cursor_astro.up.isDown)     {
            this.astro.anims.play('fly', true);
            this.astro.y += -incremento-4;
            if(this.cursor_astro.right.isDown){
                this.astro.setFlipX(false);
                this.astro.x                +=  incremento;
            }
            if(this.cursor_astro.left.isDown){
                this.astro.setFlipX(true);
                this.astro.x                += -incremento;
            }
        }
        else {
            this.astro.anims.play('idle', true);
        }  
        if(this.astro.y > (this.scale.height)){
            this.astro.y  = 100;
            this.astro.x  = 100;
        }
        if(this.astro.x < 0){
            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.start('NivelUno');
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
        // PLATAFORMAS MOVIBLES 1 y 2
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot_2.getChildren()[1],
                this.grupoPlataforma_flot_2.getChildren()[2],
            ],
            y: 160,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        // PLATAFORMA MOVIBLE 3
        this.tweens.add({
            targets: [
                this.grupoPlataforma_flot_2.getChildren()[3],
            ],
            y: 325,
            duration: 1200,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
    
    }
}

export default NivelDos;