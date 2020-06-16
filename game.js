// Ejemplo de una estructura mínima para un juego creado utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var game = new Phaser.Game(800, 800, Phaser.CANVAS, "container");

//declara todas las variables globales
var background;
var sky;
var player;
var flechaderecha;
var flechaizquierda;
var jumpButton;
var startImage = 0;
var jumpTimer = 0;
var direction = -1;

// Define "jugando", donde va a ocurrir el juego
// El estado jugando tiene tres métodos básicos: preload, create y update
var jugando = {

    preload: function() { // primero carga todas las imágenes
        game.load.image("imgfondo", "assets/background3.jpg");
        game.load.spritesheet("player", "assets/dogSequence2.png ", 125, 118);
    },

    create: function() { // crea los actores y muestra las imágenes
        background = game.add.tileSprite(0, 0, 800, 800, "imgfondo");
        player = game.add.sprite(100, 325, "player");
        player.anchor.setTo(0.5); // centra las coordenadas del objeto
        player.animations.add("caminar", [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        flechaderecha = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // activa la tecla derecha
        flechaizquierda = game.input.keyboard.addKey(Phaser.Keyboard.LEFT); // activa la tecla izquierda
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        game.physics.startSystem(Phaser.Physics.ARCADE); // activa la capacidad de reconocer coliciones, bordes, gravedad, etc.
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true; // no deja salir de los límites del juego

        player.body.bounce.y = 0.3
        player.body.gravity.y = 800
        player.body.collideWorldBounds = true
    },

    update: function() { // ejecuta de manera reiterativa
        player.animations.play("caminar");
        background.tilePosition.x += direction;
        if (flechaderecha.isDown) {
            direction = -1;
            player.position.x += 2;
            background.tilePosition.x -= 1;
            player.scale.setTo(1, 1);
        }
        if (flechaizquierda.isDown) {
            direction = 1;
            player.position.x -= 2;
            player.scale.setTo(-1, 1);
            background.tilePosition.x += 2;
        }
        if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer) {
            player.body.velocity.y = -250;
            jumpTimer = game.time.now + 750;
        }
        if (game.input.activePointer.isDown) { // si el puntero del mouse está undido ( o el dedo toca la pantalla)...
            this.parar(); // ejecuta la función "parar()"
        } else { //  si no está undido.....
            player.angle = 0; //  devuelve el pescado a la rotación inicial 
        }
    },

    parar: function() { // detiene el fondo y rota el pescado 
        player.angle -= 1; // gira el pescado un grado
        background.tilePosition.x += 1; // contraresta el movimiento del fondo y lo detiene
    },
}

game.state.add("activo", jugando); // define a "jugando" como un estado
game.state.start("activo"); // inicia con el estado "jugando"