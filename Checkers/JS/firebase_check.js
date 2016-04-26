/**
 * Created by anthony on 26/03/2016.
 */

/**
  * This document will be used for the communication between the client side and the
  * firebase sever.
  */

// note - put all this code inside the <script> tags
var fb = new Firebase("https://ascheckers.firebaseio.com"),
    locations = {};

if (fb) {
    //this gets a refrerefce to the 'location' node.
    var fbLocation = fb.child("/game");
    // now we can install event handler for nodes added, changed and removed.
    fbLocation.on('child_added', function (sn) {
        var data = sn.val();
        console.dir({'added': data});
        locations[sn.key()] = data;
        setTimeout( function(){
            game.state.start('GameS');
        }, 3000);
    });
    fbLocation.on('child_changed', function (sn) {
        var data = sn.val();
        locations[sn.key()] = data;
        console.dir({'moved': data});
        updateGame();
    });
    fbLocation.on('child_removed', function (sn) {
        var data = sn.val();
        delete locations[sn.key()];
        console.dir({'removed': data});
    })
}

/**
 * performs the task of refreshing the game chips after a move has be made.
 */
function updateGame(){
    setOp();

    if(locations[gameKey].p1 === name){
        p1 = name;
        p2 = opponent;
        myChips = locations[gameKey].p1Chips;
        opChips = locations[gameKey].p2Chips;
        turn = locations[gameKey].turn;
        winner = locations[gameKey].winner;
    }else{
        p2 = name;
        p1 = opponent;
        myChips = locations[gameKey].p2Chips;
        opChips = locations[gameKey].p1Chips;
        turn = locations[gameKey].turn;
        winner = locations[gameKey].winner;
    }
}

/**
 * sets the opponent of the currently active game
 */
function setOp(){
    if(opponent === ""){
        if(locations[gameKey].p1 === name){
            opponent = locations[gameKey].p2;
        }else{

        }
    }
}

/**
 * set the key to equal currently active game for the player
 */
function setKey(){
    var loc;
    for(loc in locations){
        if(locations[loc].p1 === name || locations[loc].p2 == name){
            return loc;
        }
    }
}


/**
 * getKey will return a key when the status = false;
 */
function getKey(){
    var loc;
    for(loc in locations){
        if(locations[loc].status === false){
            return loc;
        }
    }
    return null;
}

/**
 * Get the opponents name using the key
 */
function getOpponent(key, name){
    // for(key in locations){
    if(locations[key].status === false){
        return locations[key].p1;
    }
    // }
}

/**
 * creates a new game on the database for an opponent to join, initialises the player chips
 */
function addPlayer(name){
    //prevent a duplicate name
    // if(getKey(name)) return;
    // NAME IS VALID - GO AHEAD AND ADD IT...
    fb.child("/game").push({
        p1: name,
        p1Chips: p1ChipSet,
        p2: "",
        p2Chips: p2ChipSet,
        status: false,
        winner: winner,
        turn: name,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function(err){
        if(err){
            console.dir(err);
        }
    });
}

/**
 * updates the game after every turn of the game including the first instance of joining a game.
 */
function updatePlayers(ref,p1,p2,p1C,p2C) {
    //prevent a duplicate name
    // if (getKey(name)) return;
    // NAME IS VALID - GO AHEAD AND ADD IT...
    fb.child("/game/" + ref).set({
        p1: p1,
        p1Chips: p1ChipSet,
        p2: p2,
        p2Chips: p2ChipSet,
        status: true,
        winner: winner,
        turn: p1,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function (err) {
        if (err) {
            console.dir(err);
        }
    });
}

function updateGameDB(ref, p1, p2, p1C, p2C){
    fb.child("/game/" + ref).set({
        p1: p1,
        p1Chips: p1C,
        p2: p2,
        p2Chips: p2C,
        status: true,
        winner: winner,
        turn: turn,
        timestamp: Firebase.ServerValue.TIMESTAMP
    }, function (err) {
        if (err) {
            console.dir(err);
        }
    });
}
/**
 * when button to start game is clicked, check to see if a game exist that player can join
 * if no game exists then create game.
 */
function checkForGame(){
    name = $('#email').val();
    gameKey = getKey();
    if(gameKey !== null){
        opponent = getOpponent(gameKey);
        updatePlayers(gameKey, opponent, name);
    }else {
        addPlayer(name);
    }
    gameKey = setKey();
}