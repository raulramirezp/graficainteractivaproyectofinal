// Ejemplo de una estructura mínima para un juego creado utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var game = new Phaser.Game(800, 800, Phaser.CANVAS, "container");

//declara todas las variables globales
var background;
var sky;
var player;
var rightButton;
var leftBUtton;
var jumpButton;
var startImage = 0;
var jumpTimer = 0;
var direction = -1;
var playerRelativeXPosition;
var floor;
var woofPower = null;
var woofPowerSound;
// Define "jugando", donde va a ocurrir el juego
// El estado jugando tiene tres métodos básicos: preload, create y update
var level1 = {

    preload: function() { // primero carga todas las imágenes
        game.load.image("imgfondo", "assets/background3.jpg");
        game.load.spritesheet("player", "assets/dogSequence2.png ", 125, 118);
        game.load.image("woofwave", "assets/woofWave.png ", 125, 118);
        game.load.image("enemy1", "assets/enemy2.png ", 125, 118);
        game.load.audio("woofSound", "assets/woofWave.ogg");
    },


    create: function() { // crea los actores y muestra las imágenes

        enemies = game.add.group();

        background = game.add.tileSprite(0, 0, 800, 800, "imgfondo");

        player = game.add.sprite(100, 325, "player");
        player.anchor.setTo(0.5); // centra las coordenadas del objeto
        player.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        enemy = game.add.sprite(game.width + 100, game.height - 20, "enemy1")
        enemy.anchor.setTo(0, 1);
        playerRelativeXPosition = 100;

        rightButton = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        leftBUtton = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); // activa la tecla izquierda
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        firePower = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        woofPowerSound = game.add.audio("woofSound");
        //   game.sound.setDecodedCallback([woofPowerSound], update, this);

        game.physics.startSystem(Phaser.Physics.ARCADE); // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
        game.physics.arcade.enable(player);
        game.physics.arcade.enable(enemy);

        player.body.collideWorldBounds = true; // no deja salir de los límites del juego
        player.body.bounce.y = 0.3
        player.body.gravity.y = 800

    },

    update: function() { // ejecuta de manera reiterativa
        //background.tilePosition.x += direction;

        woofPowerSound.play();
        player.animations.play("caminar");
        if (enemy.position.x > -200) {
            enemy.position.x -= 1;
        }

        if (woofPower != null) {
            woofPower.position.x += 3;
            killEnemy();
        }

        console.log("Enemy position ", enemy.position.x)
        console.log("Player position ", playerRelativeXPosition)

        samePosition();

        if (rightButton.isDown) {
            direction = -1;

            player.position.x += 2;
            playerRelativeXPosition += 2;
            player.scale.setTo(1, 1);

            background.tilePosition.x -= 1;
            if (enemy.position.x > -200) {
                enemy.position.x -= 2;
            }
        } else if (leftBUtton.isDown) {

            if (playerRelativeXPosition > 150) {
                direction = 1;
                player.position.x -= 2;
                playerRelativeXPosition -= 2;
                player.scale.setTo(-1, 1);
                background.tilePosition.x += 1;
                if (enemy.position.x > -200) {
                    enemy.position.x += 1;
                }
            }
        } else {
            player.animations.stop("caminar");
        }

        if (firePower.isDown) {
            if (woofPower == null) {
                woofPowerSound.play();
                woofPower = game.add.sprite(playerRelativeXPosition + 10, game.height - 20, "woofwave");
                woofPower.anchor.setTo(0, 1);
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
    if (enemy.position.x == playerRelativeXPosition || enemy.position.x - playerRelativeXPosition == 1 || playerRelativeXPosition - enemy.position.x == 1) {
        console.log("Same position")
        window.alert("Same position")

    }
}

function killEnemy() {
    if (enemy.position.x == woofPower.position.x || enemy.position.x - woofPower.position.x == 1 || woofPower.position.x - enemy.position.x == 1) {
        woofPower.position.x = -200;
        woofPower = null;
        enemy.body.gravity.y = 800;
        enemy.position.x = -200;
    }
}

game.state.add("Level1", level1); // define a "jugando" como un estado1
game.state.start("Level1"); // inicia con el estado "jugando" un estado