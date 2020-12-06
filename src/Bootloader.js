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
        let width = this.cameras.main.width;
        let height = this.cameras.main.height;

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(335, 165, 320, 50);

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
            progressBar.fillRect(345, 175, 300 * value, 30);
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
        this.load.image('logo', 'inicio/Fantasy_games.png');

        this.load.image('opciones_2', 'opciones/opciones_2.png');
        this.load.image('musica_txt', 'opciones/Musica.png');
        this.load.image('sonido', 'opciones/Sonido.png');
        this.load.image('activado', 'opciones/Activado.png');
        this.load.image('desactivado', 'opciones/Desactivado.png');
        this.load.image('volver', 'opciones/volver.png');
        // MENU
        this.load.image('pausa', 'opciones/boton_pausa.png');
        this.load.image('fondoMenu', 'opciones/fondoMenu.png');
        
        // SOUNDS
        this.load.audio('caminar', 'sounds/footsteps.mp3');
        this.load.audio('espacio', 'sounds/sound_space.mp3');
        this.load.audio('salto', 'sounds/jump.mp3');
        this.load.audio('flotar', 'sounds/floating.mp3');
        this.load.audio('caer', 'sounds/falling.mp3');

        // ============================================================================
        //  SPRITES
        // ============================================================================
        // ESPACIO ANIMACIÓN
        this.load.atlas('spaceship','spaceship/spaceship.png','spaceship/spaceship_atlas.json');
        this.load.animation('spaceshipAnim', 'spaceship/spaceship_anim.json');
        // PERSONAJE
        this.load.atlas('astro', 'Personaje/astro.png','Personaje/astro_atlas.json');
        this.load.animation('astroAnim', 'Personaje/astro_anim.json');

        this.load.image('bullet', 'Personaje/bullet.png');
        this.load.audio('disparo', 'Personaje/shot.mp3');

        this.load.audio('musica', 'inicio/against-time.mp3');
        this.load.audio('hover', 'inicio/hover.mp3');
        this.load.audio('select', 'inicio/select.mp3');
        this.load.audio('landing', 'inicio/landing.mp3');
        
        // ============================================================================
        // Tutorial
        // ============================================================================
        this.load.setPath('./assets/tutorial');
        this.load.image('spaceX', 'spaceX.png');
        this.load.image('piso', 'Piso.png');
        this.load.image('piso_x', 'Piso_X.png');
        this.load.image('movimiento_i', 'movimiento.png');
        this.load.image('salto_i', 'salto.png');
        this.load.image('disparo_i', 'disparo.png');
        this.load.image('iniciar_t', 'iniciar.png');
        this.load.image('tutorial_btn', 'tutorial_btn.png');

        // ============================================================================
        //  NIVEL DOS
        // ============================================================================
        this.load.setPath('./assets/NivelDos');
        this.load.image('piso_roca_1', 'Piso_roca_1.png');
        // this.load.image('piso_roca_2', 'Piso_roca_2.png');
        this.load.image('piso_roca_3', 'Piso_roca_3.png');
        // this.load.image('piso_roca_4', 'Piso_roca_4.png');
        this.load.image('piso_roca_5', 'Piso_roca_5.png');
        this.load.image('piso_roca_6', 'Piso_roca_6.png');
        this.load.image('piso_roca_7', 'Piso_roca_7.png');
        this.load.image('piso_roca_8', 'Piso_roca_8.png');
        this.load.image('Rocas_up', 'Rocas_up.png');
        // fondo
        this.load.image('fondo_n2', 'fondo_n2.png');
        
        // ============================================================================
        //  NIVEL UNO
        // ============================================================================
        this.load.setPath('./assets/NivelUno');
        this.load.image('malo', 'malo.png'); // auiliar compa de los malos 
        // PLATAFORMAS
        this.load.image('piso_1', 'piso_1.png');
        this.load.image('piso_2', 'piso_2.png');
        this.load.image('piso_3', 'piso_3.png');
        this.load.image('piso_4', 'piso_4.png');
        this.load.image('piso_5', 'piso_5.png');
        this.load.image('piso_6', 'piso_6.png');
        this.load.image('piso_7', 'piso_7.png');
        this.load.image('piso_8', 'piso_8.png');
        this.load.image('piso_9', 'piso_9.png');
        this.load.image('piso_10', 'piso_10.png');
        this.load.image('piso_plataforma', 'piso_plataforma.png');
        this.load.image('fondo_montanias', 'fondo_montanias.png');
        // FONDO
        this.load.image('fondo', 'fondo.png');
        // SOUND
        this.load.audio('tema_1', 'tema_1.mp3');



        // ============================================================================
        //  NIVEL UNO
        // ============================================================================
        this.load.setPath('./assets/NivelTres');

        this.load.image('plataforma_8x1', 'plataforma_8x1.png');
        this.load.image('plataforma_1x3', 'plataforma_1x3.png');
        this.load.image('plataforma_2x1', 'plataforma_2x1.png');
        this.load.image('plataforma_1x1', 'plataforma_1x1.png');
        this.load.image('fondo_nivelTres', 'fondo.png');

        // ============================================================================
        //  ELEMENTOS hud
        // ============================================================================
        this.load.setPath('./assets/elementosHUD');
        this.load.image('corazon', 'corazon.png');
        this.load.image('escudo', 'escudo_0.png');
        this.load.image('letrero_vidas', 'letrero_vidas.png');
        // sonidos
        this.load.audio('recoge_escudo', 'recoge_escudo.wav');
        this.load.audio('recoge_corazon', 'recoge_corazon.wav');
        this.load.audio('pierde_corazon', 'pierde_corazon.wav');
        this.load.audio('pierde_todos_corazones', 'pierde_todos_corazones.wav');

        // ============================================================================
        // GAME OVER
        // ============================================================================
        this.load.setPath('./assets/GameOver');
        this.load.image('btn_volverInicio', 'btn_volverInicio.png');
        this.load.image('fondo_gameOver', 'fondo_gameOver.png');
        this.load.image('game_over', 'game_over.png');
        this.load.audio('game_over_music', 'game_over_music.wav');
        
        // ============================================================================
        // Escena Introductoria
        // ============================================================================
        this.load.setPath('./assets/cinematicas/intro');
        this.load.image(['planet','dialogo1','dialogo2', 
                         'noche', 'spaceShip', 'dibujo',
                         'montanias','enemie']);
        this.load.image('interior', 'interior.jpg');
    
    }

    create() {
        this.logo = this.add.image((this.scale.width/2), 175, 'logo');
        this.logo.setScale(0.2);
        this.logo.setDepth(3);
        this.logo.setAlpha(0);

        this.background = this.add.tileSprite(this.scale.width/2, this.scale.height/2, this.scale.width, this.scale.height, "background");
        this.background.setScrollFactor(0);

        // Inidicación inicial
        this.clic = this.add.image(this.scale.width/2, this.scale.height-50, "clic");
        this.clic.setDepth(3)
        this.clic.setAlpha(0);
        this.clicTween = this.add.tween({
            targets: [this.clic, this.logo],
            alpha: 1,
            delay: 1000,
        });

        // Pantalla de inicio
        this.container = this.add.container(0, 0);
        this.texto = this.add.image((this.scale.width/2), -200,"texto");
        this.jugar_btn = this.add.image((this.scale.width/2), -50, "jugar").setInteractive();
        this.opc_btn = this.add.image((this.scale.width/2), 30, "opciones").setInteractive();

        // Sprite de nave espacial
        this.hoverSprite = this.add.sprite((this.scale.width/2), 375, 'spaceship');
        this.hoverSprite.setScale(2);
        this.hoverSprite.setDepth(2);
        this.hoverSprite.setVisible(false);

        // Declaración de sonidos recurrentes
        this.sound.pauseOnBlur = false;
        this.musica = this.sound.add('musica', { loop: true, volume: 1 });
        this.tema_1 = this.sound.add('tema_1', { loop: true, volume: 1 });
        this.espacio = this.sound.add('espacio', { loop: true, volume: 1 });
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
                        this.logo.setVisible(false);
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
                        this.logo.setVisible(false);
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
            this.hoverSprite.y = this.jugar_btn.y + 335;
            this.hoverSprite.anims.play('spaceship_idle');
            this.hoverSprite.setVisible(true);
        });
 
        this.jugar_btn.on('pointerout', () => {
            this.jugar_btn.clearTint();
            this.hoverSprite.setVisible(false);
        });

        this.jugar_btn.on('pointerup', () => {
            if (this.sonidoAct) this.sound.play('select');
            if (this.musicaAct) this.musica.stop();
            // Cambio de escena
            console.log('clic escena');
            let tema1Promise = this.tema_1.play();
            let espacioPromise = this.espacio.play();

            if (tema1Promise !== undefined &&
                espacioPromise !== undefined)
            {
                if (!this.musicaAct) {
                    this.tema_1.pause();
                    this.espacio.pause();
                }
            }
            setTimeout( () => {
                console.log(this.scene.manager.scenes);
                this.scene.start('Seleccion', {musica: this.musicaAct, sonido: this.sonidoAct });
                console.log(this.scene.manager.scenes);
            }, 200)
        });

        // Eventos del botón opciones
        this.opc_btn.on('pointerover', () => {
            if (this.sonidoAct) this.sound.play('hover');
            this.opc_btn.setTint(0xff9f9f);
            this.hoverSprite.x = this.opc_btn.x - 150;
            this.hoverSprite.y = this.opc_btn.y + 335;
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

        this.volver = this.add.image(170, -250, "volver").setScale(0.7).setInteractive();
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
            this.hoverSprite.y = this.sonido.y + 300;
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
            this.hoverSprite.y = this.musica_txt.y + 300;
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
            y: 335,
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
            targets: [this.clic, this.logo],
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