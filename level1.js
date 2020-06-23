var finishFirsLevel = 4950;

var attack, kill;

var level1 = {
    preload: function() { // primero carga todas las imágenes
        game.load.image("background", "assets/backgroundlevel1.png");
        game.load.spritesheet("player", "assets/dogSequence2.png ", 125, 118);
        game.load.image("woofwave", "assets/woofWave.png ", 125, 118);
        game.load.image("enemy1", "assets/enemy2.png ", 125, 118);
        game.load.audio("attack", "assets/Dog-woof-single-sound.mp3");
        game.load.audio("kill", "assets/enemy-bork.mp3");
        game.load.audio("world-music", "assets/world-music.mp3");
    },

    create: function() { // crea los actores y muestra las imágenes
        game.world.setBounds(0, 0, 11446, 800);
        game.physics.startSystem(Phaser.Physics.ARCADE); // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
        background = game.add.tileSprite(0, 0, 11446, 800, "background");

        player = game.add.sprite(100, 325, "player");
        player.anchor.setTo(0.5); // centra las coordenadas del objeto
        player.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

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

        attack = game.add.audio('attack');
        kill = game.add.audio('kill');

        game.sound.setDecodedCallback([attack, kill], start, this).then();
    },

    update: function() {
        isLevelFinish();
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
        game.debug.text("ATACAR: BARRA ESPACIADORA", 32, 32);
        game.debug.text("CORRER: CONTROL", 32, 52);
        game.debug.text("MOVERSE ADELANTE: Flecha izquierda", 32, 72);
        game.debug.text("MOVERSE ATRAS: Flecha derecha", 32, 92);
        game.debug.text("SALTAR: Flecha arriba", 32, 112);
    }
}

function jump() {
    player.body.velocity.y = -250;
    jumpTimer = game.time.now + 750;
}

function moveToRight() {
    direction = 1;
    player.position.x += 1;
    player.scale.setTo(1, 1);

    game.camera.x += 1;
    enemies.forEach(theEnemy => {
        if (theEnemy.position.x > -200) {
            theEnemy.position.x -= 2;
        }
    });
}

function moveToLeft() {
    direction = -1;
    if (player.position.x > 150) {
        player.position.x -= 1;
        player.scale.setTo(-1, 1);
        game.camera.x -= 1;
    }
}

function runToRight() {
    direction = 1;
    player.position.x += 1;
    player.scale.setTo(1, 1);

    game.camera.x += 1;
    enemies.forEach(theEnemy => {
        if (theEnemy.position.x > -200) {
            theEnemy.position.x -= 1;
        }
    });
}

function runToLeft() {
    direction = -1;
    if (player.position.x > 150) {
        player.position.x -= 1;
        player.scale.setTo(-1, 1);
        game.camera.x -= 1;
    }
}

function shotPower() {
    if (woofPower == null) {
        playFx("attack")
        woofPower = game.add.sprite(player.position.x + 10, game.height - 20, "woofwave");
        woofPower.anchor.setTo(0, 1);
        woofPower.scale.setTo(1 * direction, 1);
        shotDirection = direction;
    }
}

function samePosition() {
    enemies.forEach(enemy => {
        var case1 = enemy.position.x == player.position.x;
        var case2 = enemy.position.x - player.position.x == 1;
        var case3 = player.position.x - enemy.position.x == 1;
        var case4 = player.position.x - enemy.position.x == 2;
        var case5 = enemy.position.x - player.position.x == 2;
        var case4 = player.position.x - enemy.position.x == 3;
        var case5 = enemy.position.x - player.position.x == 3;
        if (case1 || case2 || case3 || case4 || case5) {
            console.log("Same position");
            game.state.start("GameOver");
        }
    })
}

function killEnemy() {
    enemies.forEach(enemy => {
        if (woofPower != null && (woofPower.position.x < 0 || woofPower.position.x - player.position.x > 800)) {
            woofPower.position.x = -200;
            woofPower = null;
        }

        if (woofPower != null) {
            var case1 = enemy.position.x == woofPower.position.x;
            var case2 = enemy.position.x - woofPower.position.x == 1;
            var case3 = woofPower.position.x - enemy.position.x == 1;
            var case4 = woofPower.position.x - enemy.position.x == 2;
            var case5 = enemy.position.x - woofPower.position.x == 2;
            var case6 = enemy.position.x - woofPower.position.x == -1;
            var case7 = woofPower.position.x - enemy.position.x == -1;
            var case8 = woofPower.position.x - enemy.position.x == -2;
            var case9 = enemy.position.x - woofPower.position.x == -2;
            if (case1 || case2 || case3 || case4 || case5 || case6 || case7 || case8 || case9) {
                woofPower.position.x = -200;
                woofPower = null;
                enemy.body.gravity.y = 800;
                enemy.position.x = -200;
                playFx("kill");
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

function isLevelFinish() {
    if (game.camera.x >= finishFirsLevel) {
        game.state.start("NextLevel2");
    }
}

const playFx = soundFx => {
    this[soundFx].play()
};