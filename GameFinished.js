var buttonBackMenu;

var gameFinished = {
    preload: function() {
        game.load.image("background", "assets/endCover.png");
        game.load.spritesheet('button', 'assets/buttonsRestart.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "background");
        buttonBackMenu = game.add.button(game.camera.x + 300, 640, 'button', backToMainMenu, this, 2, 1, 0);
    }
}

function backToMainMenu() {
    game.state.start("MainMenu");
}