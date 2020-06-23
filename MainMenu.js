var buttonStartnewGame;

var mainMenu = {
    preload: function() {
        game.load.image("background", "assets/menu.png");
        game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "background");
        buttonStartnewGame = game.add.button(300, 640, 'button', startLevel1, this, 1, 0, 2);
    }
}

function startLevel1() {
    game.state.start("Level1");
}