var buttonStartnewGame;

var mainMenu = {
    preload: function() {
        game.load.image("imgfondo", "assets/backgroundMenu.jpg");
        game.load.spritesheet('button', 'assets/button_sprite_sheet_menu.png', 193, 71);
    },

    create: function() {
        background = game.add.tileSprite(0, 0, 800, 800, "imgfondo");
        buttonStartnewGame = game.add.button(game.world.centerX - 95, 500, 'button', startLevel1, this, 0, 1, 2);
        buttonStartnewGame.onInputOver.add(over, this);
        buttonStartnewGame.onInputOut.add(out, this);
        buttonStartnewGame.onInputUp.add(up, this);

    }
}


function startLevel1() {
    game.state.start("Level1");
}