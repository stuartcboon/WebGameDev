/**
 * Created by anthony on 26/03/2016.
 */

/**
 * GameScene provides the functionality for the game scene.
 * the function hold the variables for this state whilst its
 * prototypes hold the methods to run the game scene.
 * game state Key "GameS"
 */
var gameScene = function(){
    this.btn;
    this.btnT;
    this.layers;
    this.map;
};

/**
 * This contains the gameScene prototypes.
 * @type {{}}
 */
gameScene.prototype = {
    /**
     * set all the variables in this to be empty or null
     */
    preload: function(){
        this.btn = null;
        this.btnT = null;
        this.layers = [];
        this.map = null;
    },
    /**
     * create, creates the initial game elements
     */
    create: function(){
        this.createMap();
        this.createBoard();
        this.createButton();
    },
    /**
     * update holds the game processes
     */
    update: function(){},
    /**
     * create map creates the map for the game board
     */
    createMap: function(){
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('Checkers', 'Tiles');
    },
    /**
     * craete board set the layers for the board to be rendered at
     */
    createBoard: function(){
        this.layers[0] = this.map.createLayer('cBoard');
        this.layers[0].resizeWorld();
    },
    /**
     * createButton creates the button for players to resign
     */
    createButton: function(){
        this.btn = this.game.add.button(this.game.width * 0.82, this.game.height * 0.5, 'Btn', this.endScene, this, 4, 2, 6);
        this.btn.width = this.game.width * 0.15;
        this.btn.height = this.game.height * 0.1;
        this.btn.anchor.setTo(0.5, 0.5);
        this.textSize = this.game.height * 0.07;
        this.btnT = this.game.add.text(this.btn.x, this.btn.y + 10, 'Resign', {font: this.textSize + "px Arial", fill: "#000000"});
        this.btnT.anchor.setTo(0.5,0.5);
    },
    /**
     * endScene, call the end scene state
     */
    endScene: function(){
        this.game.state.start('MenuS'); // should call end scene when created
    }
};