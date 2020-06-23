// Ejemplo de una estructura mínima para un juego creado utilizando la librería externa Phaser
//  realizado por el profesor Carlos Delgado para el curso Gráfica Interactiva de la Universidad Nacional de Colombia

// El primer paso es crear un nuevo objeto "Phaser.Game" y definir su tamaño
var game = new Phaser.Game(800, 800, Phaser.CANVAS, "container");

//declara todas las variables globales
var numberOfEnemies = 15;

var background;
var sky;
var player;
var rightButton;
var leftBUtton;
var jumpButton;
var startImage = 0;
var jumpTimer = 0;
var direction = 1;
var shotDirection = 1;
var floor;
var woofPower = null;
var woofPowerSound;
var enemies = [];

game.state.add("MainMenu", mainMenu);
game.state.add("GameOver", gameOver);
game.state.add("NextLevel2", nextLevel2);
game.state.add("NextLevel3", nextLevel3);
game.state.add("GameFinished", gameFinished);
game.state.add("Level1", level1); // define el nivel 1
game.state.add("Level2", level2); // define el nivel 2
game.state.add("Level3", level3); // define el nivel 3
game.state.start("MainMenu"); // inicia con el estado "jugando" un estado