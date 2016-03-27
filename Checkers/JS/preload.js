/**
 * Created by anthony on 26/03/2016.
 */

/**
 * peload is used to initialise all the variables and assets required
 * for the game to fully function as per the project specification
 * game state know as "Preload"
 */
var preload = function(game){

};

/**
 * This contains the prototypes for the preload function.
 * @type {{}}
 */
preload.prototype = {
    /**
     * prototype preload loads all the assets required for the game,
     * images and audio files
     */
    preload: function(){
        this.game.load.spritesheet('Tiles','Assets/Images/chechers.png', 32, 32, 4);
        this.game.load.image('BG','Assets/Images/background.png');
        this.game.load.spritesheet('Btn','Assets/Images/Buttons.png', 300, 80);
    },
    /**
     * prototype create calls the required functions, this is called in
     * sequential order after preload by Phaser.
     */
    create: function(){
        this.menu();
    },
    /**
     * prototype menu changes the game state to the menu scene
     */
    menu: function(){
        game.state.start('MenuS');
    }

};