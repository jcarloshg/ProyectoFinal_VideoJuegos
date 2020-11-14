class NivelDos extends Phaser.Scene {
    constructor() {
        super({key: 'NivelDos'});
    }

    init() {
        console.log('Scene: NivelDos');
    }
    
    preload() {
        this.load.setPath('./assets/NivelDos');

        this.load.image('piso_roca_1', 'piso_roca_1.png');
        this.load.image('piso_roca_2', 'piso_roca_2.png');
        this.load.image('piso_roca_3', 'piso_roca_3.png');
        this.load.image('piso_roca_4', 'piso_roca_4.png');
        this.load.image('piso_roca_5', 'piso_roca_5.png');
        this.load.image('piso_roca_6', 'piso_roca_6.png');
        this.load.image('piso_roca_7', 'piso_roca_7.png');
        this.load.image('piso_roca_8', 'piso_roca_8.png');
        this.load.image('Rocas_up', 'Rocas_up.png');

        // fondo
        this.load.image('fondo_n2', 'fondo_n2.png');
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
        this.grupoPlataforma_2.create(1180, 300, 'piso_roca_8');
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
        this.grupoPlataforma_flot_2.create(1360, 170, 'piso_roca_6');
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

        // ************************************************************
        // CAMARA
        // ************************************************************

        // ************************************************************
        // COLISIÓN
        // ************************************************************
        // this.physics.add.collider(this.astro, this.grupoPlataforma);
        // this.physics.add.collider(this.astro, this.grupoPlataforma_flot)
    }
    update(time, delta) {
        // MOVIMIENTO DEL FONDO Y PERSONAJE
        let incrementoFondo = 0.05;

        this.fondo_n2.tilePositionX += incrementoFondo; 

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
            y: 340,
            duration: 1200,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
    
    }
}

export default NivelDos;