
class NivelUno extends Phaser.Scene {
    constructor() {
        super({key: 'NivelUno'});
    }

    init() {
        console.log('Scene: NivelUno');
    }
    
    preload() {
        this.load.setPath('./assets/NivelUno');

        this.load.image('piso_1', 'piso_1.png');
        this.load.image('piso_2', 'piso_2.png');
        this.load.image('piso_3', 'piso_3.png');
        this.load.image('piso_4', 'piso_4.png');
        this.load.image('piso_5', 'piso_5.png');
        this.load.image('piso_6', 'piso_6.png');
        this.load.image('piso_7', 'piso_7.png');
        this.load.image('piso_8', 'piso_8.png');
        this.load.image('piso_9', 'piso_9.png');
        this.load.image('piso_10', 'piso_10.png');
        this.load.image('piso_plataforma', 'piso_plataforma.png');
        this.load.image('fondo_montanias', 'fondo_montanias.png');

        // fondo
        this.load.image('fondo', 'fondo.png');

        // ejemplo
        //this.load.image('astro', '../Personaje/dibujo.png');

        //Animaciones
        this.load.atlas('astro', '../Personaje/astro.png',
                        '../Personaje/astro_atlas.json');
        this.load.animation('astroAnim', '../Personaje/astro_anim.json');
    }

    create() {

        // ************************************************************
        // DECORACIONES
        // ************************************************************
        // this.fondo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'fondo').setDepth(-2);
        // FONDO ESTRELLAS
        this.fondo = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width, this.scale.height, 
            'fondo'
        );
        // FONDO MONTANIAS 
        this.fondoMontanias = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width, this.scale.height, 
            'fondo_montanias'
        );

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
        // CAMARA
        // ************************************************************
        

        // ************************************************************
        // COLISIÓN
        // ************************************************************
        this.physics.add.collider(this.astro, this.grupoPlataforma);
        this.physics.add.collider(this.astro, this.grupoPlataforma_flot)
    }
    update(time, delta) {


        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incremento = 2;
        let incrementoFondo = 0.05;
        let incrementoFondoMontania = 0.15;

        this.fondo.tilePositionX += incrementoFondo; 

        if (this.cursor_astro.left.isDown && this.astro.body.touching.down)   {
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(true);
            this.astro.x                += -incremento;
            this.fondoMontanias.tilePositionX    += -incrementoFondoMontania; 
        }
        else if (this.cursor_astro.right.isDown && this.astro.body.touching.down)  {
            this.astro.anims.play('walk', true);
            this.astro.setFlipX(false);
            this.astro.x                +=  incremento;
            this.fondoMontanias.tilePositionX    += incrementoFondoMontania; 
        } 
        else if (this.cursor_astro.up.isDown)     {
            this.astro.anims.play('fly', true);
            this.astro.y += -incremento-4;
            if(this.cursor_astro.right.isDown){
                this.astro.setFlipX(false);
                this.astro.x                +=  incremento;
                this.fondoMontanias.tilePositionX    += incrementoFondoMontania;
            }
            if(this.cursor_astro.left.isDown){
                this.astro.setFlipX(true);
                this.astro.x                += -incremento;
                this.fondoMontanias.tilePositionX    += -incrementoFondoMontania;
            }
        }
        else {
            this.astro.anims.play('idle', true);
        }  
        if(this.astro.y > (this.scale.width)){
            this.astro.y  = 100;
            this.astro.x  = 100;
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
