class Bootloader extends Phaser.Scene{
    constructor(){
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
        // Variables para controlar la activación de sonido
        this.sonidoAct = true;
        this.musicaAct = true;
        // Variable para la primera interacción
        this.move = false;
    }

    preloadBar() {
        let progressBar = this.add.graphics();
        let progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(630, 265, 320, 50);

        let width = this.cameras.main.width;
        let height = this.cameras.main.height;
        let loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Cargando...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        let percentText = this.make.text({
            x: (width / 2) - 10,
            y: (height / 2) - 10,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        this.load.on('progress', function(value) {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(640, 275, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', function () {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
        });
    }

    preload() {
        this.preloadBar();
        this.load.setPath('./assets/');

        this.load.image('background', 'inicio/noche.png');
        this.load.image('clic', 'inicio/clic.png');
        this.load.image('texto', 'inicio/texto.png');
        this.load.image('jugar', 'inicio/jugar.png');
        this.load.image('opciones', 'inicio/opciones.png');

        this.load.image('opciones_2', 'opciones/opciones_2.png');
        this.load.image('musica_txt', 'opciones/Musica.png');
        this.load.image('sonido', 'opciones/Sonido.png');
        this.load.image('activado', 'opciones/Activado.png');
        this.load.image('desactivado', 'opciones/Desactivado.png');
        this.load.image('volver', 'opciones/volver.png');

        this.load.atlas('spaceship',
        'spaceship/spaceship.png',
        'spaceship/spaceship_atlas.json');
        this.load.animation('spaceshipAnim',
        'spaceship/spaceship_anim.json');

        this.load.audio('musica', 'inicio/against-time.mp3');
        this.load.audio('hover', 'inicio/hover.mp3');
        this.load.audio('select', 'inicio/select.mp3');
        this.load.audio('landing', 'inicio/landing.mp3');    
    }

    create() {
        this.background = this.add.tileSprite(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height, "background");
        this.background.setScrollFactor(0);

        // Inidicación inicial
        this.clic = this.add.image(this.scale.width/2, this.scale.height - 50, "clic");
        this.clic.setDepth(3)
        this.clic.setAlpha(0);
        this.clicTween = this.add.tween({
            targets: [this.clic],
            alpha: 1,
            delay: 2000,
        });

        // Pantalla de inicio
        this.container = this.add.container(0, 0);
        this.texto = this.add.image((this.scale.width/2), -400,"texto").setOrigin(0, 0);
        this.jugar_btn = this.add.image((this.scale.width/2), -50, "jugar").setInteractive();
        this.opc_btn = this.add.image((this.scale.width/2), 30, "opciones").setInteractive();

        // Sprite de nave espacial
        this.hoverSprite = this.add.sprite((this.scale.width/2), 375, 'spaceship');
        this.hoverSprite.setScale(2);
        this.hoverSprite.setDepth(2);
        this.hoverSprite.setVisible(false);

        // Declaración de sonidos recurrentes
        this.sound.pauseOnBlur = false;
        this.musica = this.sound.add('musica', { loop: true, volume: 0.4 });
        this.landing = this.sound.add('landing');

        this.container.add([
            this.texto,
            this.jugar_btn,
            this.opc_btn,
        ]);
        this.container.setVisible(false);

        this.opciones();

        this.createTweens();

        // Al presionar una tecla se incia la escena
        this.input.keyboard.on('keydown', (evento) => {
            if (!this.move) {
                this.move = true;
                this.tween_clic.play();
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.clic.setVisible(false);
                        this.musica.play();
                        this.mostrarInicio();
                    },
                });
            }
        });

        // Al hacer clic en el canvas se incia la escena
        this.input.on('pointerup', (evento) => {
            if (!this.move) {
                this.move = true;
                this.tween_clic.play();
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.clic.setVisible(false);
                        this.musica.play();
                        this.mostrarInicio();
                        this.backTweenC = this.add.tween({
                            targets: [this.back],
                            alpha: 0,
                            duration: 2000,
                        });
                    },
                });
            }
        });

        // Eventos del botón jugar
        this.jugar_btn.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.jugar_btn.setTint(0xff9f9f);
            this.hoverSprite.x = this.jugar_btn.x - 150;
            this.hoverSprite.y = this.jugar_btn.y + 350;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });

        this.jugar_btn.on('pointerout', () => {
            this.jugar_btn.clearTint();
            this.hoverSprite.setVisible(false);
        });

        this.jugar_btn.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            // this.musica.stop();
            // Cambio de escena
            console.log('clic escena');
            setTimeout(
                () => {
                    this.scene.start('NivelUno');},
                200)
        });

        // Eventos del botón opciones
        this.opc_btn.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.opc_btn.setTint(0xff9f9f);
            this.hoverSprite.x = this.opc_btn.x - 150;
            this.hoverSprite.y = this.opc_btn.y + 350;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });

        this.opc_btn.on('pointerout', () => {
            this.opc_btn.clearTint();
            this.hoverSprite.setVisible(false);
        });

        this.opc_btn.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.container.setVisible(false);
            this.mostrarOpciones();
        });

    }

    opciones() {
        // Pantalla de opciones
        this.container_2 = this.add.container(0, 0);
        this.opciones_2 = this.add.image((this.scale.width/2), -325, "opciones_2");

        this.volver = this.add.image(70, -250, "volver").setScale(0.7).setInteractive();
        this.sonido = this.add.image((this.scale.width/2), -125, "sonido").setInteractive();
        this.musica_txt = this.add.image((this.scale.width/2), -25, "musica_txt").setInteractive();

        this.activado_1 = this.add.image((this.scale.width/2)+150, -125, "activado");
        this.activado_2 = this.add.image((this.scale.width/2)+150, -25, "activado");

        this.desactivado_1 = this.add.image((this.scale.width/2)+150, -125, "desactivado").setVisible(false);
        this.desactivado_2 = this.add.image((this.scale.width/2)+150, -25, "desactivado").setVisible(false);

        this.container_2.add([
            this.opciones_2,
            this.volver,
            this.sonido,
            this.musica_txt,
            this.activado_1,
            this.activado_2,
            this.desactivado_1,
            this.desactivado_2
        ]);
        this.container_2.setVisible(false);

        // Botón para regresar a la pantalla inicial
        this.volver.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.volver.setTint(0xff9f9f);
        });
        this.volver.on('pointerout', () => {
            this.volver.clearTint();
        });
        this.volver.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            this.container_2.setVisible(false);
            this.mostrarInicio();
        });

        // Eventos del bóton para activar/desactivar el sonido
        this.sonido.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.sonido.setTint(0xff9f9f);
            this.hoverSprite.x = this.sonido.x - 160;
            this.hoverSprite.y = this.sonido.y + 400;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });
        this.sonido.on('pointerout', () => {
            this.hoverSprite.setVisible(false);
            this.sonido.clearTint();
        });
        this.sonido.on('pointerup', () => {
            if (this.sonidoAct) {
                this.sonidoAct = false;
                this.activado_1.setVisible(false);
                this.desactivado_1.setVisible(true);
            }
            else {
                this.sound.play('select');
                this.sonidoAct = true;
                this.activado_1.setVisible(true);
                this.desactivado_1.setVisible(false);
            }
        });

        // Eventos del bóton para activar/desactivar la música
        this.musica_txt.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.musica_txt.setTint(0xff9f9f);
            this.hoverSprite.x = this.musica_txt.x - 160;
            this.hoverSprite.y = this.musica_txt.y + 400;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });
        this.musica_txt.on('pointerout', () => {
            this.hoverSprite.setVisible(false);
            this.musica_txt.clearTint();
        });
        this.musica_txt.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');

            if (this.musicaAct) {
                this.musicaAct = false;
                this.activado_2.setVisible(false);
                this.desactivado_2.setVisible(true);
                this.musica.pause();
            }
            else {
                this.musicaAct = true;
                this.activado_2.setVisible(true);
                this.desactivado_2.setVisible(false);
                this.musica.resume();
            }
        });
    }

    createTweens() {
        this.tween_inicio = this.tweens.add({
            targets: [this.container],
            y: 350,
            ease: 'Bounce',
            duration: 950
        });

        this.tween_opc = this.tweens.add({
            targets: [this.container_2],
            y: 300,
            ease: 'Bounce',
            duration: 1500,
        });

        this.tween_clic = this.tweens.add({
            targets: [this.clic],
            y: 700,
            ease: 'Power4',
            duration: 900
        });
        this.tween_clic.stop();
    }

    mostrarInicio() {
        if (this.sonidoAct) this.landing.play();
        this.container.setVisible(true);
        this.tween_inicio.restart();
    }

    mostrarOpciones() {
        this.hoverSprite.setVisible(false);
        this.container_2.setVisible(true);
        this.tween_opc.restart();
    }

    update(time, delta) {
        this.background.tilePositionY += 0.5;
    }
}

export default Bootloader;