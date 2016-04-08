/**
 * Created by anthony on 08/04/2016.
 */

/**
 * This file contains the constant variable for interaction between the
 * firebase calls and game states.
 */

/**
 * myChips and opChips are used to hold the game chips for both players
 * @type {Array}
 */
var myChips = [],
    opChips = [];

/**
 * These hold the email of the current player (name) and opponent as well as the key for the
 * game in the firebase.
 * @type {string}
 */
var name = "",
    gameKey = null,
    opponent = "";