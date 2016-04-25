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
    this.p1T;
    this.p2T;
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
    update: function(){
        this.displayPlayer();
        this.displayChips();
    },
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
        this.btn = this.game.add.button(this.game.width * 0.82, this.game.height * 0.5, 'Btn', this.loseScene, this, 4, 2, 6);
        this.btn.width = this.game.width * 0.15;
        this.btn.height = this.game.height * 0.1;
        this.btn.anchor.setTo(0.5, 0.5);
        this.textSize = this.game.height * 0.07;
        this.btnT = this.game.add.text(this.btn.x, this.btn.y + 10, 'Resign', {font: this.textSize + "px Arial", fill: "#000000"});
        this.btnT.anchor.setTo(0.5,0.5);

    },
    /**
     * displayPlayer displays the corresponding player with the correct player 1/2.
     */
    displayPlayer: function(){

        if(locations[gameKey].p1 === name){
            this.p1T =  this.game.add.text(100, 0, name, {font: "40px Arial", fill: "#FFFFFF"});
            this.p2T =  this.game.add.text(100, this.game.height - 30, opponent, {font: "40px Arial", fill: "#FFFFFF"});
        }else{
            this.p1T =  this.game.add.text(100, 0, opponent, {font: "40px Arial", fill: "#FFFFFF"});
            this.p2T =  this.game.add.text(100, this.game.height - 30, name, {font: "40px Arial", fill: "#FFFFFF"});
        }
    },
    /**
     * display the plyer and opponent chips on the screen
     */
    displayChips: function(){
        for(var i = 0; i<myChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this.game.add.image(myChips[i].c * 64, myChips[i].r * 64, 'Tiles', 3);
            }else{
                this.game.add.image(myChips[i].c * 64, myChips[i].r * 64, 'Tiles', 4);
            }
        }
        for(var i = 0; i<opChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this.game.add.image(opChips[i].c * 64, opChips[i].r * 64, 'Tiles', 4);
            }else{
                this.game.add.image(opChips[i].c * 64, opChips[i].r * 64, 'Tiles', 3);
            }
        }

    },
    /**
     * endScene, call the end scene state
     */
    loseScene: function(){
        this.game.state.start('LoseS'); // should call end scene when created
    }
};