/* File: music.js
*  
* defines the object that supports the loading and using of the buffer that 
* contains vertex positions of a square onto the gGL context
* 
* Notice, this is a singleton object.
*/

/*jslint node: true, vars: true */
/*global gEngine: false, Float32Array: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var x = new Audio("assets/sounds/MyGame_cue.wav");

var backgroundMusic = new Audio("assets/sounds/BGWaltz.mp3");

backgroundMusic.loop = true;

function musicStart() {
    var backgroundMusic = new Audio("assets/sounds/BGWaltz.mp3");
    backgroundMusic.play();
}

function volumeDown() {
    backgroundMusic.volume -= 0.25;
}

function volumeUp() {
    backgroundMusic.volume += 0.25;
}

function playAudio() {
    x.play();   
}


function pauseAudio() {
    x.pause();
}






