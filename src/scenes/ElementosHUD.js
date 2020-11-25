
class ElementosHUD extends Phaser.Scene {
    constructor() {
        super({key: 'ElementosHUD'});
    }

    init(data) {
        console.log('Scene: ElementosHUD', data.vidas);

        this.numero_vidas = data.vidas;
        this.conrazon_y = 170;

    }

    preload(){
        // Eventos para controlar las vidas
        this.registry.events.on('vida_suma', (flag_sonido) => {

            if (flag_sonido) this.recoge_corazon.play();

            this.numero_vidas += 1;// suma uno a las vidas
            this.grupo_corazones.create(50, this.conrazon_y, 'corazon').setScale(2); // crea el corazon
            this.conrazon_y += 30; // suma a la altura del siguiente corazon

            console.log('suma 1, total vida-> ', this.numero_vidas);
        });

        this.registry.events.on('vida_resta', (flag_sonido) => {
            if ( this.numero_vidas <= 1 ) {

                this.sound.pauseAll();

                if (flag_sonido) this.pierde_todos_corazones.play();

                this.scene.bringToTop('GameOver');
                console.log(this.scene.manager.scenes);
                this.scene.start('GameOver');

            }
            else {

                if (flag_sonido) this.pierde_corazon.play();

                this.grupo_corazones.getChildren()[this.numero_vidas-1].destroy();
                this.conrazon_y -= 30;
                this.numero_vidas -= 1;
            }
            console.log('resta 1, total vida-> ', this.numero_vidas);
        });

        this.registry.events.on('recoge_escudo', (flag_sonido) => {
            console.log("recogio escudo");
            if (flag_sonido) this.recoge_escudo.play();
        });
    }

    create() {
        this.letrero_vidas = this.add.image(50, 50, 'letrero_vidas').setScale(0.1);

        this.grupo_corazones = this.add.group();
        this.grupo_corazones.create(50, 80, 'corazon').setScale(2);
        this.grupo_corazones.create(50, 110, 'corazon').setScale(2);
        this.grupo_corazones.create(50, 140, 'corazon').setScale(2);

        // sonido
        this.recoge_escudo = this.sound.add('recoge_escudo');
        this.recoge_corazon = this.sound.add('recoge_corazon', { volume: 1 });
        this.pierde_todos_corazones = this.sound.add('pierde_todos_corazones', { volume: 1 });
        this.pierde_corazon = this.sound.add('pierde_corazon', { volume: 1 });
    }


    update(time, delta) {

    }
}

export default ElementosHUD;
