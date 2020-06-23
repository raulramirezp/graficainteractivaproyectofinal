finishFirsLevel = 4950; //5730
var level3 = {

    preload: function() { // primero carga todas las imágenes
        game.load.image("background", "assets/backgroundlevel3.png");
        game.load.spritesheet("player", "assets/dogSequence2.png ", 125, 118);
        game.load.image("woofwave", "assets/woofWave.png ", 125, 118);
        game.load.image("enemy1", "assets/enemy2.png ", 125, 118);
    },


    create: function() { // crea los actores y muestra las imágenes
        game.world.setBounds(0, 0, 11446, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE); // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
        background = game.add.tileSprite(0, 0, 11446, 800, "background");

        player = game.add.sprite(100, 325, "player");
        player.anchor.setTo(0.5); // centra las coordenadas del objeto
        player.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        numberOfEnemies = 25;
        createEnemies(numberOfEnemies);

        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        leftBUtton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); // activa la tecla izquierda
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        firePower = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        run = game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);

        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true; // no deja salir de los límites del juego
        player.body.bounce.y = 0.3;
        player.body.gravity.y = 800;

    },

    update: function() {
        finishGame();
        player.animations.play("caminar");

        if (woofPower != null) {
            woofPower.position.x += 3 * shotDirection;
            killEnemy();
        }

        enemies.forEach(theEnemy => {
            if (theEnemy.position.x > -200) {
                theEnemy.position.x -= 1;
            }
        });


        console.log("player pos ", player.position.x);
        samePosition();

        if (rightButton.isDown) {
            moveToRight();

        } else if (leftBUtton.isDown) {
            moveToLeft();
        } else {
            player.animations.stop("caminar");
        }

        if (run.isDown && rightButton.isDown) {
            runToRight();
        }
        if (run.isDown && leftBUtton.isDown) {
            runToLeft();
        }
        if (firePower.isDown) {
            shotPower();
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            jump();
        }
    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);

    }
}

function finishGame() {
    if (game.camera.x >= finishFirsLevel) {
        game.state.start("GameFinished");
    }
}