var buttonNextLevel3;

var nextLevel3 = {
    preload: function() {
        game.load.image("background", "assets/nextLevel3.png");
        game.load.spritesheet('button', 'assets/buttons.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "background");
        buttonNextLevel3 = game.add.button(300, 640, 'button', startLevel3, this, 1, 0, 2);
    }
}

function startLevel3() {
    game.state.start("Level3");
}