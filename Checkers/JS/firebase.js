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
    var fbLocation = fb.child("/location");
    // now we can install event handler for nodes added, changed and removed.
    fbLocation.on('child_added', function (sn) {
        var data = sn.val();
        console.dir({'added': data});
        locations[sn.key()] = data;
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
        myChips = locations[gameKey].p1Chips;
        opChips = locations[gameKey].p2Chips;
    }else{
        myChips = locations[gameKey].p2Chips;
        opChips = locations[gameKey].p1Chips;
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
function addLocation(name){
    //prevent a duplicate name
    // if(getKey(name)) return;
    // NAME IS VALID - GO AHEAD AND ADD IT...
    fb.child("/location").push({
        p1: name,
        p1Chips: [{c:2, r:3, isQueen: false, isDestroyed: false},{c:4, r:3, isQueen: false, isDestroyed: false},
            {c:6, r:3, isQueen: false, isDestroyed: false},{c:8, r:3, isQueen: false, isDestroyed: false},
            {c:1, r:2, isQueen: false, isDestroyed: false},{c:3, r:2, isQueen: false, isDestroyed: false},
            {c:5, r:2, isQueen: false, isDestroyed: false},{c:7, r:2, isQueen: false, isDestroyed: false},
            {c:2, r:1, isQueen: false, isDestroyed: false},{c:4, r:1, isQueen: false, isDestroyed: false},
            {c:6, r:1, isQueen: false, isDestroyed: false},{c:8, r:1, isQueen: false, isDestroyed: false}],
        p2: "",
        p2Chips: [{c:1, r:6, isQueen: false, isDestroyed: false},{c:3, r:6, isQueen: false, isDestroyed: false},
            {c:5, r:6, isQueen: false, isDestroyed: false},{c:7, r:6, isQueen: false, isDestroyed: false},
            {c:2, r:7, isQueen: false, isDestroyed: false},{c:4, r:7, isQueen: false, isDestroyed: false},
            {c:6, r:7, isQueen: false, isDestroyed: false},{c:8, r:7, isQueen: false, isDestroyed: false},
            {c:1, r:8, isQueen: false, isDestroyed: false},{c:3, r:8, isQueen: false, isDestroyed: false},
            {c:5, r:8, isQueen: false, isDestroyed: false},{c:7, r:8, isQueen: false, isDestroyed: false}],
        status: false,
        winner: "",
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
function updateLocation(ref,opp,name) {
    //prevent a duplicate name
    // if (getKey(name)) return;
    // NAME IS VALID - GO AHEAD AND ADD IT...
    fb.child("/location/" + ref).set({
        p1: opp,
        p1Chips: [{x:2}],
        p2: name,
        p2Chips: [{x:3},{x:4}],
        status: true,
        winner: "",
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
    name = $('#email').val();//document.getElementById("email").value;
    gameKey = getKey();
    if(gameKey !== null){
        opponent = getOpponent(gameKey);
        updateLocation(gameKey,opponent, name);
    }else {
        //name = "P1";
        addLocation(name);
    }
    gameKey = setKey();
}