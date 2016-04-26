/**
 * Created by anthony on 26/03/2016.
 */

/**
 * GameScene provides the functionality for the game scene.
 * the function hold the variables for this state whilst its
 * prototypes hold the methods to run the game scene.
 * game state Key "GameS"
 */
var gameScene = function(game){
    this.btn;
    this.btnT;
    this.layers;
    this.map;
    this.p1T;
    this.p2T;
    this.chipToMove;
    this.gBoard;
    this.mX;
    this.mY;
    this.mouseClicked;
    this._myChips;
    this._opChips;

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
        this.mouseClicked = false;
        this._myChips = [];
        this._opChips = [];
      /*  if(myChips.length === 0){
            myChips = p1ChipSet;
            opChips = p2ChipSet;
        }*/
    },
    /**
     * create, creates the initial game elements
     */
    create: function(){
        for(var i = 0; i< 12; i++){
            this._myChips.push(myChips[i]);
            this._opChips.push(opChips[i]);
        }
        this.createMap();
        this.createBoard();
        this.createButton();
        this.displayPlayer();
        this.displayChips();
    },
    /**
     * update holds the game processes
     */
    update: function(){
        this.checkTurn();
        this.mouselocation();



    },
    checkTurn: function(){
        var checkChips = false;
       // if(turn === name){
            for(var i = 0; i < myChips.length; i++){
                if(myChips[i].image === "" || typeof myChips[i].image === "undefined"){
                    checkChips = true;
                }
                if(this._myChips[i].image !== "" && typeof this._myChips[i].image !== "undefined"){
                    this._myChips[i].image.destroy();
                    this._opChips[i].image.destroy();
                    checkChips = true;
                }
            }
            if(checkChips) {

                for(var i = 0; i < 12; i++){
                    this._myChips[i].c = myChips[i].c;
                    this._myChips[i].image.x = this.gBoard[myChips[i].c].x;
                    this._myChips[i].image.y = this.gBoard[myChips[i].c].y;
                    this._opChips[i].c = opChips[i].c;
                    this._opChips[i].image.x = this.gBoard[opChips[i].c].x;
                    this._opChips[i].image.y = this.gBoard[opChips[i].c].y;
                }
                 this.displayChips();
                //this._myChips = myChips;
                //this._opChips = opChips;
                //
            }
       // }
    },
    /**
     * mouselocation, checks were the mouse pointer is when the mouse button is clicked down. This is then used to
     * identify if there is a chip belonging to the player. When the player clicks on their chip it is added to the
     * chipToMove which allows them to select a secondary position to place the piece which is dependent on a true
     * response from the rules function.
     */
    mouselocation: function(){
        if(game.input.mousePointer.isDown) {
            // check if chip to move if not null, if null check if location has a chip assigned to it.
            // if not then forget location  chipToMove remains null, else add chip details to chipToMove
            this.mX = game.input.x;
            this.mY = game.input.y;
            console.log("x: " + this.mX + " y: " + this.mY);
            for (var i = 0; i < this._myChips.length; i++) {
                if (this.mX > this.gBoard[this._myChips[i].c].x && this.mX < this.gBoard[this._myChips[i].c].x + 64 &&
                    this.mY > this.gBoard[this._myChips[i].c].y && this.mY < this.gBoard[this._myChips[i].c].y + 64) {
                    this.chipToMove = i;
                    this.mouseClicked = true;
                    console.log(this.chipToMove);
                }
            }
        }
        if(this.chipToMove !== null){
            for(var i = 0; i < this.gBoard.length; i++){
                if(this.mX > this.gBoard[i].x && this.mX < this.gBoard[i].x + 64 &&
                   this.mY > this.gBoard[i].y && this.mY < this.gBoard[i].y + 64){
                    if(this._myChips[this.chipToMove].c !== i) {
                        this._myChips[this.chipToMove].c = i;
                        this._myChips[this.chipToMove].image.x = this.gBoard[i].x;
                        this._myChips[this.chipToMove].image.y = this.gBoard[i].y;
                        turn = opponent;
                        this.updateDB();
                    }
                }

            }
        }

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
       /* if(this._myChips.length === 0){
            this._myChips = myChips;
            this._opChips = opChips;
        }*/
        for(var i = 0; i<this._myChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x,this.gBoard[this._myChips[i].c].y,"Tiles", 3);
            }else{
                this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x,this.gBoard[this._myChips[i].c].y,"Tiles", 4);
            }
        }
        for(var i = 0; i<this._opChips.length; i++){
            if(locations[gameKey].p1 === name) {
                this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x,this.gBoard[this._opChips[i].c].y,"Tiles", 4);
            }else{
                this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x,this.gBoard[this._opChips[i].c].y,"Tiles", 3);
            }
        }
    },
    updateDB: function(){
        if(locations[gameKey].p1 === name){
            updateGameDB(gameKey, name, opponent, this.cleanArray(this._myChips), this.cleanArray(this._opChips))
        }else{
            updateGameDB(gameKey, opponent, name, this.cleanArray(this._opChips), this.cleanArray(this._myChips))
        }
    },
    cleanArray: function(arr){
        var tempArr = [];
        for(var i = 0; i < arr.length; i++){
            arr[i].image.destroy();
            tempArr.push(arr[i]);
            tempArr[i].image = "";
            // tempArr[i].c = arr[i].c;
           // tempArr[i].isQueen = arr[i].isQueen;
           // tempArr[i].isDestroyed = arr[i].isDestroyed;
        }
        return tempArr;
    },
    /**
     * endScene, call the end scene state
     */
    endScene: function(){
        this.game.state.start('MenuS'); // should call end scene when created
    }
};

