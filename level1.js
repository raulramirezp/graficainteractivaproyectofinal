var level1 = {

    preload: function() { // primero carga todas las imágenes
        game.load.image("imgfondo", "assets/background3.jpg");
        game.load.spritesheet("player", "assets/dogSequence2.png ", 125, 118);
        game.load.image("woofwave", "assets/woofWave.png ", 125, 118);
        game.load.image("enemy1", "assets/enemy2.png ", 125, 118);
        //    game.load.audio("woofSound", "assets/woofWave.ogg");
    },


    create: function() { // crea los actores y muestra las imágenes
        game.physics.startSystem(Phaser.Physics.ARCADE); // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
        background = game.add.tileSprite(0, 0, 800, 800, "imgfondo");

        player = game.add.sprite(100, 325, "player");
        player.anchor.setTo(0.5); // centra las coordenadas del objeto
        player.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        createEnemies(numberOfEnemies);
        playerRelativeXPosition = 100;

        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        leftBUtton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); // activa la tecla izquierda
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        firePower = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        run = game.input.keyboard.addKey(Phaser.KeyCode.CONTROL);

        // woofPowerSound = game.add.audio("woofSound");
        //   game.sound.setDecodedCallback([woofPowerSound], update, this);


        game.physics.arcade.enable(player);

        player.body.collideWorldBounds = true; // no deja salir de los límites del juego
        player.body.bounce.y = 0.3;
        player.body.gravity.y = 800;

    },

    update: function() {

        // woofPowerSound.play();
        player.animations.play("caminar");

        if (woofPower != null) {
            woofPower.position.x += 3 * shotDirection;
            killEnemy();
        }

        enemies.forEach(theEnemy => {
            if (theEnemy.position.x > -200) {
                theEnemy.position.x -= 1;
            }
            console.log("The enemy position ", theEnemy.position.x);
        });
        console.log("Player position ", playerRelativeXPosition)

        samePosition();

        if (rightButton.isDown) {
            direction = 1;
            player.position.x += 1;
            playerRelativeXPosition += 1;
            player.scale.setTo(1, 1);

            background.tilePosition.x -= 1;

            enemies.forEach(theEnemy => {
                if (theEnemy.position.x > -200) {
                    theEnemy.position.x -= 2;
                }
            });

        } else if (leftBUtton.isDown) {
            direction = -1;
            if (playerRelativeXPosition > 150) {
                player.position.x -= 1;
                playerRelativeXPosition -= 1;
                player.scale.setTo(-1, 1);
                background.tilePosition.x += 1;
            }
        } else {
            player.animations.stop("caminar");
        }

        if (run.isDown && rightButton.isDown) {
            direction = 1;
            player.position.x += 1;
            playerRelativeXPosition += 1;
            player.scale.setTo(1, 1);

            background.tilePosition.x -= 1;
            enemies.forEach(theEnemy => {
                if (theEnemy.position.x > -200) {
                    theEnemy.position.x -= 1;
                }
            });
        }
        if (run.isDown && leftBUtton.isDown) {
            direction = -1;
            if (playerRelativeXPosition > 150) {
                player.position.x -= 1;
                playerRelativeXPosition -= 1;
                player.scale.setTo(-1, 1);
                background.tilePosition.x += 1;
            }
        }
        if (firePower.isDown) {
            if (woofPower == null) {
                woofPower = game.add.sprite(playerRelativeXPosition + 10, game.height - 20, "woofwave");
                woofPower.anchor.setTo(0, 1);
                woofPower.scale.setTo(1 * direction, 1);
                shotDirection = direction;
            }
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            samePosition();
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
    },

    render: function() {

        game.debug.cameraInfo(game.camera, 32, 32);

    }
}

function samePosition() {
    enemies.forEach(enemy => {
        var case1 = enemy.position.x == playerRelativeXPosition;
        var case2 = enemy.position.x - playerRelativeXPosition == 1;
        var case3 = playerRelativeXPosition - enemy.position.x == 1;
        var case4 = playerRelativeXPosition - enemy.position.x == 3;
        var case5 = enemy.position.x - playerRelativeXPosition == 3;
        if (case1 || case2 || case3 || case4 || case5) {
            game.state.start("GameOver");
        }
    })
}

function killEnemy() {
    enemies.forEach(enemy => {
        if (woofPower != null && (woofPower.position.x < 0 || woofPower.position.x - playerRelativeXPosition > 800)) {
            woofPower.position.x = -200;
            woofPower = null;
        }

        if (woofPower != null) {
            var case1 = enemy.position.x == woofPower.position.x;
            var case2 = enemy.position.x - woofPower.position.x == 1;
            var case3 = woofPower.position.x - enemy.position.x == 1;
            var case4 = woofPower.position.x - enemy.position.x == 2;
            var case5 = enemy.position.x - woofPower.position.x == 2;
            if (case1 || case2 || case3 || case4 || case5) {
                woofPower.position.x = -200;
                woofPower = null;
                enemy.body.gravity.y = 800;
                enemy.position.x = -200;
            }
        }

    })
}

function createEnemies(numberOfEnemies) {
    for (i = 0; i < numberOfEnemies; i++) {
        var position = Math.floor(Math.random() * 10000) + 400;
        var tmpenemy = game.add.sprite(position, game.height - 20 + i * 2, "enemy1");
        tmpenemy.anchor.setTo(0, 1);
        game.physics.arcade.enable(tmpenemy);
        enemies.push(tmpenemy);
    }
}