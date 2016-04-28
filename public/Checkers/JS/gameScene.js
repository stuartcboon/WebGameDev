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
    this.destroyChip;
    this.noDestroyed
    this.turn;
    this.endSceneCalled;
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
        this.destroyChip = null;
        this.turn = "";
        this.endSceneCalled = false;
        winner = "";

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
        if(winner === "") {
            this.updateChips();
            this.mouselocation();
            this.checkOpChips();
            this.queening();
        }else{
           if(!this.endSceneCalled) {
               this.endSceneCalled = true;
               this.endScene();
           }
        }
    },
    /**
     * When the player of the corresponding name enters one of the given cell numbers of the gBoard they
     * are rewarded with the chip being created as a queen
     */
    queening: function(){
        for(var i = 0; i < 12; i++){
            if(!this._myChips[i].isDestroyed){
                if(locations[gameKey].p1 === name) {
                    if (this._myChips[i].c === 56 || this._myChips[i].c === 58 || this._myChips[i].c === 60 || this._myChips[i].c === 62) {
                        this._myChips[i].isQueen = true;
                    }
                }else{
                    if (this._myChips[i].c === 1 || this._myChips[i].c === 3 || this._myChips[i].c === 5 || this._myChips[i].c === 7) {
                        this._myChips[i].isQueen = true;
                    }
                }
            }
        }
    },
    /**
     * this monitors if the oponent has any chips left, they do not and this.noDestroyed = 12
     * winner has the current players name added to end the game
     */
    checkOpChips: function(){
        this.noDestroyed = 0;
        for(var i = 0; i < this._opChips.length; i++){
            if(this._opChips[i].isDestroyed){
                this.noDestroyed++
            }
        }
        if(this.noDestroyed === 12){
            winner = name;
        }
    },
    /**
     * updateChips check that the chips set for both players are not equal to an empty string or
     * of type undefined, or if they are not. by checking these elements allows for the current
     * chip images to be cleared out only when exist to stop crashing. This then alters the
     * properties of the game variables and then recreates the images by calling the displayChip function
     */
    updateChips: function(){
        var checkChips = false;
       // if(turn === name){
            for(var i = 0; i < myChips.length; i++){
                if(myChips[i].image === "" || typeof myChips[i].image === "undefined"){
                    checkChips = true;
                }
                if(this._myChips[i].image !== "" && typeof this._myChips[i].image !== "undefined"){
                    if(!this._myChips[i].isDestroyed) {
                        this._myChips[i].image.destroy();
                    }
                    if(!this._opChips[i].isDestroyed) {
                        this._opChips[i].image.destroy();
                    }
                    checkChips = true;
                }
            }
            if(checkChips) {

                for(var i = 0; i < 12; i++){
                    this._myChips[i].c = myChips[i].c;
                    this._myChips[i].isDestroyed = myChips[i].isDestroyed;
                    //this._myChips[i].isQueen = myChips[i].isQueen;
                    if(!this._myChips[i].isDestroyed) {
                        this._myChips[i].image.x = this.gBoard[myChips[i].c].x;
                        this._myChips[i].image.y = this.gBoard[myChips[i].c].y;
                    }
                    this._opChips[i].c = opChips[i].c;
                   // this._opChips[i].isDestroyed = myChips[i].isDestroyed;
                    this._opChips[i].isQueen = opChips[i].isQueen;
                    if(!this._opChips[i].isDestroyed) {
                        this._opChips[i].image.x = this.gBoard[opChips[i].c].x;
                        this._opChips[i].image.y = this.gBoard[opChips[i].c].y;
                    }
                }
                 this.displayChips();
            }
       // }
    },
    /**
     * checks to see if it is the current player shot and returns the corresponding boolean
     * @returns {boolean} Returns true/false depending on the analysis of the if statement
     */
    checkTurn: function(){

        this.turn = this.game.add.text(this.game.width * 0.73, 200, "Current Player \n" + locations[gameKey].turn, {font: "20px Courier New", fill: "#FFFFFF", align: "center"});
        if(locations[gameKey].turn === name) {
            return true;
        }
        else{
            return false;
        }
    },
    /**
     * This contains the rule to govern the movements of a queen chip including single movement and
     * jump movements to take a player.
     * @param index {Number} Holds the location of the chip within its array
     * @param cell {Number} Holds the cell attepting to move to
     * @returns {boolean} returns the true false value of a movement
     */
    queenRules: function(index, cell){
       // for(var i = 0; i < 12; i++){
         //   if(this._myChips[i].isQueen){
                if(index === cell && index > this._myChips[this.chipToMove].c + 6 && index < this._myChips[this.chipToMove].c + 10) {
                    return true;
                }else{
                    for(var j = 0; j < this._opChips.length; j++){
                        if(index === cell && index > this._myChips[this.chipToMove].c + 13 && index < this._myChips[this.chipToMove].c + 15 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c + 7){
                            this.destroyChip = j;
                            return true;
                        }else if(index === cell && index > this._myChips[this.chipToMove].c + 17 && index < this._myChips[this.chipToMove].c + 19 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c + 9) {
                            this.destroyChip = j;
                            return true;
                        }
                    }
                }
                if(index === cell && index < this._myChips[this.chipToMove].c - 6 && index > this._myChips[this.chipToMove].c - 10){
                    return true;
                }else{
                    for(var j = 0; j < this._opChips.length; j++){
                        if(index === cell && index < this._myChips[this.chipToMove].c - 13 && index > this._myChips[this.chipToMove].c - 15 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c - 7){
                            this.destroyChip = j;
                            return true;
                        }else if(index === cell && index < this._myChips[this.chipToMove].c - 17 && index > this._myChips[this.chipToMove].c - 19 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c - 9) {
                            this.destroyChip = j;
                            return true;
                        }
                    }
                }
           // }
       // }
    },
    /**
     * this checks to see if any rules have been broken by responding with a false return value
     * else it returns true.
     * @param index {Number} Holds the cell location within the gBoard the player is trying to move to
     * @returns {boolean} Holds the boolean response for the move, if it conflicts with a rule false else true
     */
    gameRules: function(index){
        var movableCells = [1,3,5,7,8,10,12,14,17,19,21,23,24,26,28,30,33,35,37,39,40,42,44,46,49,51,53,55,56,58,60,62];
        var inCheck = false;
        var check = true;
        // inCheck indicates if the player is attempting to move illegally as a standard chip and queen
        for(var i = 0; i < movableCells.length; i++) {
            if(locations[gameKey].p1 === name){
                if(index === movableCells[i] && this._myChips[this.chipToMove].isQueen){
                    inCheck = this.queenRules(index, movableCells[i]);
                }
                if (index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                    index > this._myChips[this.chipToMove].c + 6 && index < this._myChips[this.chipToMove].c + 10){
                    inCheck = true;
                }else{
                    for(var j = 0; j < this._opChips.length; j++){
                        if(index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                            index > this._myChips[this.chipToMove].c + 13 && index < this._myChips[this.chipToMove].c + 15 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c + 7){
                            inCheck = true;
                            this.destroyChip = j;
                           // console.log("p2: " +this._opChips[j].c + "isDestroyed");
                        }else if(index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                        index > this._myChips[this.chipToMove].c + 17 && index < this._myChips[this.chipToMove].c + 19 &&
                        this._opChips[j].c === this._myChips[this.chipToMove].c + 9) {
                            inCheck = true;
                            //console.log("p2: " +this._opChips[j].c + "isDestroyed");
                            this.destroyChip = j;
                        }
                    }
                }
            }else{
                if(index === movableCells[i] && this._myChips[this.chipToMove].isQueen){
                    inCheck = this.queenRules(index, movableCells[i]);
                }
                if (index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                    index < this._myChips[this.chipToMove].c - 6 && index > this._myChips[this.chipToMove].c - 10){
                    inCheck = true;
                }else{
                    for(var j = 0; j < this._opChips.length; j++){
                        if(index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                            index < this._myChips[this.chipToMove].c - 13 && index > this._myChips[this.chipToMove].c - 15 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c - 7){
                            inCheck = true;
                            this.destroyChip = j;
                            //console.log("p1: " +this._opChips[j].c + "isDestroyed");
                        }else if(index === movableCells[i] && !this._myChips[this.chipToMove].isQueen &&
                            index < this._myChips[this.chipToMove].c - 17 && index > this._myChips[this.chipToMove].c - 19 &&
                            this._opChips[j].c === this._myChips[this.chipToMove].c - 9) {
                            inCheck = true;
                            this.destroyChip = j;
                            //console.log("p1: " +this._opChips[j].c + "isDestroyed");
                        }
                    }
                }
            }
        }
        // when cell selected to move to is accepted check everything else
        if(inCheck) {
            // if not attempting to move back whilst standard chip
            if(check) {
                    // makes sure player cannot land on an occupied gBoard cell
                    for (var i = 0; i < 12; i++) {
                        if (this._myChips[i].c === index || this._opChips[i].c === index) check = false;
                    }
            }
            if(check && this.destroyChip !== null){
                console.log("p2: " +this._opChips[this.destroyChip].c + "isDestroyed");
                this._opChips[this.destroyChip].image.destroy();
                this._opChips[this.destroyChip].isDestroyed = true;
                this._opChips[this.destroyChip].c = 100;
                this.destroyChip = null;
            }else{
                this.destroyChip = null;
            }
        }else{
            // when move is illegal onto a white cell
            check = false;
        }
        //if(!check2 && check) check = check2; // as a reverse condition is required for some rules this alters the main check accordingly.
        return check;
    },
    /**
     * mouselocation, checks were the mouse pointer is when the mouse button is clicked down. This is then used to
     * identify if there is a chip belonging to the player. When the player clicks on their chip it is added to the
     * chipToMove which allows them to select a secondary position to place the piece which is dependent on a true
     * response from the rules function.
     */
    mouselocation: function(){
        if(this.checkTurn()) { // ensures only the currently active player is able to move a chip
            if (game.input.mousePointer.isDown) {
                // check if chip to move if not null, if null check if location has a chip assigned to it.
                // if not then forget location  chipToMove remains null, else add chip details to chipToMove
                this.mX = game.input.x;
                this.mY = game.input.y;
                console.log("x: " + this.mX + " y: " + this.mY);
                for (var i = 0; i < this._myChips.length; i++) { // ensures the player can only move their own chip set
                    if(!this._myChips[i].isDestroyed) {
                        if (this.mX > this.gBoard[this._myChips[i].c].x && this.mX < this.gBoard[this._myChips[i].c].x + 64 &&
                            this.mY > this.gBoard[this._myChips[i].c].y && this.mY < this.gBoard[this._myChips[i].c].y + 64) {
                            this.chipToMove = i;
                            this.mouseClicked = true;
                            console.log(this.chipToMove);
                        }
                    }
                }
            }
            if (this.chipToMove !== null) {
                for (var i = 0; i < this.gBoard.length; i++) {
                    //if(!this._myChips[i].isDestroyed) {
                        if (this.mX > this.gBoard[i].x && this.mX < this.gBoard[i].x + 64 &&
                            this.mY > this.gBoard[i].y && this.mY < this.gBoard[i].y + 64) {
                            if (this._myChips[this.chipToMove].c !== i) {
                                if (this.gameRules(i)) {
                                    this._myChips[this.chipToMove].c = i;
                                    this._myChips[this.chipToMove].image.x = this.gBoard[i].x;
                                    this._myChips[this.chipToMove].image.y = this.gBoard[i].y;
                                    turn = opponent;
                                    this.updateDB();
                                }
                            }
                        }
                    //}
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
        this.btn = this.game.add.button(this.game.width * 0.82, this.game.height * 0.5, 'Btn', this.resign, this, 4, 2, 6);
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
     * display the player and opponent chips on the screen, by filtering through each of the arrays and checking to
     * see if the are a queen or normal piece when this is established the corresponding image is displayed within
     * the canvas
     */
    displayChips: function(){
        for(var i = 0; i<this._myChips.length; i++){
            if(!this._myChips[i].isDestroyed) {

                if (locations[gameKey].p1 === name) {
                    if(this._myChips[i].isQueen){
                        this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x, this.gBoard[this._myChips[i].c].y, "Q", 0);
                    }else {
                        this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x, this.gBoard[this._myChips[i].c].y, "Tiles", 3);
                    }
                } else {
                    if(this._myChips[i].isQueen){
                        this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x, this.gBoard[this._myChips[i].c].y, "Q", 1);
                    }else {
                        this._myChips[i].image = this.game.add.image(this.gBoard[this._myChips[i].c].x, this.gBoard[this._myChips[i].c].y, "Tiles", 4);
                    }
                }
            }
        }
        for(var i = 0; i<this._opChips.length; i++){

            if(!this._opChips[i].isDestroyed) {
                if (locations[gameKey].p1 === name) {
                    if(this._opChips[i].isQueen){
                        this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x, this.gBoard[this._opChips[i].c].y, "Q", 1);
                    }else {
                        this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x, this.gBoard[this._opChips[i].c].y, "Tiles", 4);
                    }
                } else {
                    if(this._opChips[i].isQueen){
                        this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x, this.gBoard[this._opChips[i].c].y, "Q", 0);
                    }else {
                        this._opChips[i].image = this.game.add.image(this.gBoard[this._opChips[i].c].x, this.gBoard[this._opChips[i].c].y, "Tiles", 3);
                    }
                }
            }
        }
    },
    /**
     * updateDB passes the correct parameters to the updateGameDB on the firebase_check.js file
     */
    updateDB: function(){
        if(locations[gameKey].p1 === name){
            updateGameDB(gameKey, name, opponent, this.cleanArray(this._myChips), this.cleanArray(this._opChips))
        }else{
            updateGameDB(gameKey, opponent, name, this.cleanArray(this._opChips), this.cleanArray(this._myChips))
        }
    },
    /**
     * this filters the Phaser image added to the current array and destroys the image from the screen before pushing
     * it to the returned temp array
     * @param arr {Array} Hold the current array for filtering
     * @returns {Array} Holds the returned fully filtered array
     */
    cleanArray: function(arr){
        var tempArr = [];
        for(var i = 0; i < arr.length; i++){
            if(!arr[i].isDestroyed) {
                arr[i].image.destroy();
            }
            tempArr.push(arr[i]);
            tempArr[i].image = "";
        }
        return tempArr;
    },
    /**
     * this is activated when the player clicks on the resign button during a game
     */
    resign: function(){
        if(opponent === ""){
            winner = "noBody";
        }else {
            winner = opponent;
        }
        this.updateDB();
    },
    /**
     * endScene, call the end scene state
     */
    endScene: function(){
        removeGame(gameKey);
        if(winner === name){
            this.game.state.start('EndSW');
        }else{
            this.game.state.start('EndSL');
        }
       // this.game.state.start('MenuS'); // should call end scene when created
    }
};

