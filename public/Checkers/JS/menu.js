/**
 * Created by anthony on 26/03/2016.
 */

/**
 * menuScene provides the functionality during the menu scene.
 * the variables are held within the function whilst the methods
 * are held as prototypes.
 * game state Key "MenuS"
 */
var menuScene = function(game){
    this.btn;
    this.btnT;
    this.iBox;
    this.textSize;
    this.message;
};

/**
 * This contains the menuScene prototypes.
 * @type {{preload: menuScene.preload, create: menuScene.create, update: menuScene.update,
 * inputBox: menuScene.inputBox, createButton: menuScene.createButton, startGame: menuScene.startGame}}
 */
menuScene.prototype = {
    /**
     * initialising the menu states at the instance the state is called,
     * ensuring the variables are wiped before they are used every time
     * the state is called.
     */
    preload: function(){
        this.btn = null;
        this.btnT = null;
        this.iBox = null;
        this.textSize = 0;
        this.message = "";
    },
    /**
     * create is used to create the initial elements on the canvas through Phaser.js
     */
    create: function() {
        this.createButton();
        this.inputBox();
    },
    /**
     * inpuBox is created and added to document using jquery and moved over the canvas by its parent
     * that is set to position absolute and z-index of 1, therefore when this element is created and
     * appended to its parent it appears to be in the canvas.
     */
    inputBox: function(){
        this.iBox = '<input type="text" id="email" placeholder="name">';
        $("#tInput").append(this.iBox);
        var marginTop = 100;
        var tIW = this.game.width *0.252;
        var tIFS = this.game.height *0.055;
        var marginLeft = (this.game.width * 0.5)-(tIW *0.5);
        $("#email").css({"float": "left", "border": "1px solid grey", "margin-top": marginTop + "px",
            "margin-left": marginLeft + "px", "width": tIW +"px", "font-size": tIFS + "px",
            "background-color": "purple"});

    },
    /**
     * createButton creates the play button, and places it in the center of the canvas by setting its x anchor
     * to the center of the button object. This also creates the text for on top of the button.
     */
    createButton: function(){
        this.btn = this.game.add.button(this.game.width * 0.5, 300, 'Btn', this.checkPlayer, this, 4, 2, 6);
        this.btn.width = this.game.width * 0.4;
        this.btn.height = this.game.height * 0.1;
        this.btn.anchor.setTo(0.5, 0);
        this.textSize = this.game.height * 0.07;
        this.btnT = this.game.add.text(this.btn.x, this.btn.y + 10, 'Play', {font: this.textSize + "px Arial", fill: "#000000"});
        this.btnT.anchor.setTo(0.5,0);
    },
    /**
     * Error message displays an error to the user when they have entered an incorrect name
     * @param i {Number} Holds the number value that represents the error
     */
    errorMessage: function(i){
        if(i === 0){
            this.message = game.add.text(this.game.width * 0.5, 200, 'You have not entered a name', {font: this.textSize + "px Arial", fill: "#FFFFFF"});
            this.message.anchor.setTo(0.5, 0);
        }else if(i === 1){
            this.message = game.add.text(this.game.width * 0.5, 200 , 'Name already in use', {font: this.textSize + "px Arial", fill: "#FFFFFF"});
            this.message.anchor.setTo(0.5, 0);
        }else if(i === 1) {
            this.message = game.add.text(this.game.width * 0.5, 200, 'Please connect to the internet and refresh page', {font: this.textSize + "px Arial", fill: "#FFFFFF"});
            this.message.anchor.setTo(0.5, 0);
        }
    },
    /**
     * this checks that the player has entered an acceptable answer if true the game is started else an error message
     * is displayed
     */
    checkPlayer: function(){
        var key;
        var exists = false;
        for(key in locations){
            if(locations[key].p1 === $('#email').val()){
                exists = true;
            }else if(locations[key].p2 === $('#email').val()){
                exists = true;
            }
        }
        if ($('#email').val() === "") {
            this.errorMessage(0);
        } else {
            if(!exists){
                this.startGame();
            }else{
                this.errorMessage(1);
            }
        }
    },
    /**
     * StartGame is called when the start button is clicked and calls checkforGame (firebase.js) to setup/join a game
     * it then removes the email input box from the document and starts the game state.
     */
    startGame: function() {
        checkForGame();
        $("#email").remove();
        // setTimeout allows for a slight delay in a response from the database
        setTimeout(function () {
            game.state.start('GameS');
        }, 3000);
    }
};

