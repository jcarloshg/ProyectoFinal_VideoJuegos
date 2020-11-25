
class ElementosHUD extends Phaser.Scene {
    constructor() {
        super({key: 'ElementosHUD'});
    }

    init(data) {
        console.log('Scene: ElementosHUD', data.vidas);

        this.numero_vidas = data.vidas;
    }

    preload(){
        // Eventos para controlar las vidas
        this.registry.events.on('vida_suma', () => {
            this.numero_vidas += 1;
            console.log('se suma una vida', this.numero_vidas);
        });

        this.registry.events.on('vida_resta', () => {
            // this.numero_vidas -= 1;
            this.perderVida();
            console.log('se resta una vida', this.numero_vidas);
        });
    }

    create() {
        this.grupo_corazones = this.add.group();
        this.grupo_corazones.create(50, 50, 'corazon').setScale(2.5);
        this.grupo_corazones.create(50, 100, 'corazon').setScale(2.5);
        this.grupo_corazones.create(50, 150, 'corazon').setScale(2.5);

        // this.corazon = this.add.image(50, 50, 'corazon').setScale(2);

        this.corazon = this.add.image(50, 50, 'corazon').setScale(2.5);
        this.textoVidas = this.add.text(44, 38, `${this.numero_vidas}`, { font: '20px Arial' });
        this.textoVidas.setTint(0x000000);
    }

    perderVida() {
        if ( this.numero_vidas > 1 ) {
            this.numero_vidas -= 1;
            this.textoVidas.setText(`${this.numero_vidas}`);
        }
        else {
            // Game over
        }
    }

    update(time, delta) {

    }
}

export default ElementosHUD;
