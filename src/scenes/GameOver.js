
class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'GameOver'});
    }

    init() {
        console.log('Scene: GameOver');
    }

    create() {
        this.fondo_gameOver = this.add.tileSprite(
            this.scale.width / 2, this.scale.height / 2,
            this.scale.width, this.scale.height, 
            'fondo_gameOver');
        this.btn_volverInicio = this.add.image(this.scale.width/2, 350, 'btn_volverInicio').setScale(0.1).setInteractive();
        this.game_over = this.add.image(this.scale.width/2, 275, 'game_over').setScale(0.2);
        // Botón para regresar a la pantalla inicial
        this.btn_volverInicio.on('pointerover', () => {
            // if (this.sonidoAct) this.sound.play('hover');
            this.btn_volverInicio.setTint(0xff9f9f);
        });
        this.btn_volverInicio.on('pointerout', () => {
            this.btn_volverInicio.clearTint();
        });
        this.btn_volverInicio.on('pointerup', () => {
            this.scene.sendToBack('GameOver');
            this.scene.bringToTop('Bootloader');
            this.scene.launch('Bootloader');
            console.log("game over ", this.scene.manager.scenes);
        });
    }

    update(time, delta) {

    }
}

export default GameOver;
