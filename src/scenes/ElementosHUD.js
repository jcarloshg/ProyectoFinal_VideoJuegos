
class ElementosHUD extends Phaser.Scene {
    constructor() {
        super({key: 'ElementosHUD'});
    }

    init() {
        console.log('Scene: ElementosHUD');
    }

    create() {
        this.corazon = this.add.image(50, 50, 'corazon').setScale(2.5);
    }

    update(time, delta) {

    }
}

export default ElementosHUD;
