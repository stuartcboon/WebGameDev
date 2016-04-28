/**
 * Created by Stuart on 26/03/2016.
 */

/**
 * endScene hold the functionality for the users end scene.
 * game state Key "EndSW"
 */
var winScene = function(){
    this.btn;
    this.btnT;
    this.iBox;
    this.textSize;
    this.star;
};

/**
 * This contains the endScene prototypes.
 * @type {{}}
 */
winScene.prototype = {

    preload: function(){
        this.btn = null;
        this.btnT = null;
        this.iBox = null;
        this.star = null;
        this.textSize = 0;
    },

    create:function(){
        this.createButton();

        this.star = this.game.add.sprite(this.game.width*0.5,this.game.height*0.5,'youWin');
        this.star.width = this.game.width * 0.95;
        this.star.height = this.game.height * 0.7;
        this.star.anchor.setTo(0.5,0.5);
    },

    render: function(){},
    createButton: function(){
        this.btn = this.game.add.button(this.game.width * 0.5, this.game.height*0.8, 'Btn', this.menu, this, 4, 2, 6);
        this.btn.width = this.game.width * 0.4;
        this.btn.height = this.game.height * 0.1;
        this.btn.anchor.setTo(0.5, -0.8);
        this.textSize = this.game.height * 0.07;
        this.btnT = this.game.add.text(this.btn.x, this.btn.y + 10, 'Menu', {font: this.textSize + "px Arial", fill: "#000000"});
        this.btnT.anchor.setTo(0.5,-0.8);
    },

    menu: function(){
        game.state.start('MenuS');
    },
};
