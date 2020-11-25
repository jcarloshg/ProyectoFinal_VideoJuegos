
class GameOver extends Phaser.Scene {
    constructor() {
        super({key: 'GameOver'});
    }

    init() {
        console.log('Scene: GameOver');
    }

    create() {
        this.btn_volverInicio = this.add.image(this.scale.width/2, 50, 'btn_volverInicio').setScale(0.1).setInteractive();
    }

    update(time, delta) {

    }
}

export default GameOver;
