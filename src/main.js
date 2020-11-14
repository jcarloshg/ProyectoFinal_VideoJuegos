import NivelUno from './scenes/NivelUno.js';
import Bootloader from './Bootloader.js';
import NivelDos from './scenes/NivelDos.js';

const config = {
    title: "Mision Rescate",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1600,
        height: 400,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#333333",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 400
            }
        }
    },
    scene: [Bootloader, NivelUno, NivelDos]
};

new Phaser.Game(config);