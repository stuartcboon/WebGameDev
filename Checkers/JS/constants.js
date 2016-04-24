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
 * P1ChipSet and P2ChipSet are set as constants for the game as the game start point for each chip
 * will never change.
 * @type {Array}
 */
var p1ChipSet = [{c:1, isQueen: false, isDestroyed: false},{c:3, isQueen: false, isDestroyed: false},
    {c:5, isQueen: false, isDestroyed: false},{c:7, isQueen: false, isDestroyed: false},
    {c:8, isQueen: false, isDestroyed: false},{c:10, isQueen: false, isDestroyed: false},
    {c:12, isQueen: false, isDestroyed: false},{c:14, isQueen: false, isDestroyed: false},
    {c:17, isQueen: false, isDestroyed: false},{c:19, isQueen: false, isDestroyed: false},
    {c:21, isQueen: false, isDestroyed: false},{c:23, isQueen: false, isDestroyed: false}];
var p2ChipSet = [{c:40, isQueen: false, isDestroyed: false},{c:42, isQueen: false, isDestroyed: false},
    {c:44, isQueen: false, isDestroyed: false},{c:46, isQueen: false, isDestroyed: false},
    {c:49, isQueen: false, isDestroyed: false},{c:51, isQueen: false, isDestroyed: false},
    {c:53, isQueen: false, isDestroyed: false},{c:55, isQueen: false, isDestroyed: false},
    {c:56, isQueen: false, isDestroyed: false},{c:58, isQueen: false, isDestroyed: false},
    {c:60, isQueen: false, isDestroyed: false},{c:62, isQueen: false, isDestroyed: false}];

/**
 * boardStruc has been set to a constant as the board structure will never change shape.
 * @type {Array}
 */
var boardStruc = [{x: 64, y: 64},{x: 128, y: 64},{x: 192, y: 64},{x: 256, y: 64},{x: 320, y: 64},{x: 384, y: 64},{x: 448, y: 64},{x: 512, y: 64},
    {x: 64, y: 128},{x: 128, y: 128},{x: 192, y: 128},{x: 256, y: 128},{x: 320, y: 128},{x: 384, y: 128},{x: 448, y: 128},{x: 512, y: 128},
    {x: 64, y: 192},{x: 128, y: 192},{x: 192, y: 192},{x: 256, y: 192},{x: 320, y: 192},{x: 384, y: 192},{x: 448, y: 192},{x: 512, y: 192},
    {x: 64, y: 256},{x: 128, y: 256},{x: 192, y: 256},{x: 256, y: 256},{x: 320, y: 256},{x: 384, y: 256},{x: 448, y: 256},{x: 512, y: 256},
    {x: 64, y: 320},{x: 128, y: 320},{x: 192, y: 320},{x: 256, y: 320},{x: 320, y: 320},{x: 384, y: 320},{x: 448, y: 320},{x: 512, y: 320},
    {x: 64, y: 384},{x: 128, y: 384},{x: 192, y: 384},{x: 256, y: 384},{x: 320, y: 384},{x: 384, y: 384},{x: 448, y: 384},{x: 512, y: 384},
    {x: 64, y: 448},{x: 128, y: 448},{x: 192, y: 448},{x: 256, y: 448},{x: 320, y: 448},{x: 384, y: 448},{x: 448, y: 448},{x: 512, y: 448},
    {x: 64, y: 512},{x: 128, y: 512},{x: 192, y: 512},{x: 256, y: 512},{x: 320, y: 512},{x: 384, y: 512},{x: 448, y: 512},{x: 512, y: 512}];

/**
 * These hold the email of the current player (name) and opponent as well as the key for the
 * game in the firebase.
 * @type {string}
 */
var name = "",
    gameKey = null,
    opponent = "";