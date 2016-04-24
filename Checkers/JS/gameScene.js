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
    this.chipToMove;
    this.gBoard;
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
        this.chipToMove = null;
        this.gBoard = boardStruc;

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
        this.mouselocation();

    },
    /**
     * mouselocation, checks were the mouse pointer is when the mouse button is clicked down. This is then used to
     * identify if there is a chip belonging to the player. When the player clicks on their chip it is added to the
     * chipToMove which allows them to select a secondary position to place the piece which is dependent on a true
     * response from the rules function.
     */
    mouselocation: function(){
        if(game.input.mousePointer.isDown){
            // check if chip to move if not null, if null check if location has a chip assigned to it.
            // if not then forget location  chipToMove remains null, else add chip details to chipToMove
            var mX = game.input.x;
            var mY = game.input.y;
            console.log("x: " + mX + " y: " + mY);
            for(var i=0; i< myChips.length; i++){
                if(mX > this.gBoard[myChips[i].c].x && mX < this.gBoard[myChips[i].c].x + 64 &&
                   mY > this.gBoard[myChips[i].c].y && mY < this.gBoard[myChips[i].c].y + 64){
                    this.chipToMove = myChips[i];
                    console.log(this.chipToMove);
                }
            }
            if(this.chipToMove !== null){

            }
        }
    },
    movechip: function(){},
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
     * display the player and opponent chips on the screen
     */
    displayChips: function(){
        for(var i = 0; i<myChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this.game.add.image(this.gBoard[myChips[i].c].x,this.gBoard[myChips[i].c].y,"Tiles", 3);
                //this.game.add.image(myChips[i].c * 64, myChips[i].r * 64, 'Tiles', 3);
            }else{
                this.game.add.image(this.gBoard[myChips[i].c].x,this.gBoard[myChips[i].c].y,"Tiles", 4);
                //this.game.add.image(myChips[i].c * 64, myChips[i].r * 64, 'Tiles', 4);
            }
        }
        for(var i = 0; i<opChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this.game.add.image(this.gBoard[opChips[i].c].x,this.gBoard[opChips[i].c].y,"Tiles", 4);
               // this.game.add.image(opChips[i].c * 64, opChips[i].r * 64, 'Tiles', 4);
            }else{
                this.game.add.image(this.gBoard[opChips[i].c].x,this.gBoard[opChips[i].c].y,"Tiles", 3);
               // this.game.add.image(opChips[i].c * 64, opChips[i].r * 64, 'Tiles', 3);
            }
        }

    },
    /**
     * endScene, call the end scene state
     */
    endScene: function(){
        this.game.state.start('MenuS'); // should call end scene when created
    }
};