
class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'GameOver'});
    }

    init(data) {
        console.log('Scene: GameOver');
        // Variables para controlar la activacion de sonidos
        this.musicaAct = data.musica;
    }

    create() {

        this.fondo_gameOver = this.add.image(
            this.scale.width / 2, this.scale.height / 2, 
            'fondo_gameOver').setScale(1.01);
        
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
            location.reload();
            console.log("game over ", this.scene.manager.scenes);
        });


        this.game_over_music = this.sound.add('game_over_music', { volume: 0.5 });

        this.time.addEvent({
            delay: 1500,
            callback: () => {
                if (this.musicaAct) this.game_over_music.play();
            },
        });
    }

    update(time, delta) {

    }
}

export default GameOver;
