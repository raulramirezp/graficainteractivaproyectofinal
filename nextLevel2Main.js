var buttonNextLevel;

var nextLevel2 = {
    preload: function() {
        game.load.image("background", "assets/nextLevel2.png");
        game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "background");
        buttonNextLevel = game.add.button(300, 640, 'button', startLevel2, this, 1, 0, 2);
    }
}

function startLevel2() {
    game.state.start("Level2");
}