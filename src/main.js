import GameOver from './scenes/GameOver.js';

import Bootloader from './Bootloader.js';
import NivelUno from './scenes/NivelUno.js';
import NivelDos from './scenes/NivelDos.js';
import ElementosHUD from './scenes/ElementosHUD.js';
import Menu from './scenes/Menu.js';

const config = {
    title: "Mision Rescate",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1000,
        height: 400,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#111111",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 400
            },
            debug: true,
        }
    },
    audio: {
        disableWebAudio: true
    },
    scene: [Bootloader, NivelUno, NivelDos, ElementosHUD, Menu, GameOver]
};

new Phaser.Game(config);