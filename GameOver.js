var buttonBack;

var gameOver = {
    preload: function() {
        game.load.image("imgfondo", "assets/backgroundEndGame.jpg");
        game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "imgfondo");
        buttonBack = game.add.button(game.world.centerX - 95, 400, 'button', backToMainMenu, this, 2, 1, 0);
        buttonBack.onInputOver.add(over, this);
        buttonBack.onInputOut.add(out, this);
        buttonBack.onInputUp.add(up, this);

    }
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function backToMainMenu() {
    game.state.start("MainMenu");
}