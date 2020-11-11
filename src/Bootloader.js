class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.image('logo_gamma', 'logo_gamma.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });
    }

    create() {
        this.boton_ejemplo = this.add.image(this.scale.width / 2, this.scale.height / 2, 'logo_gamma').setInteractive();

        this.boton_ejemplo.on('pointerup', () => {
            setTimeout(
                () => {this.scene.start('NivelUno')},
                200)
        });
    }
}
export default Bootloader;