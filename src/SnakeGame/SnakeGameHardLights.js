/*
 * File: MyGame_Lights: support the creation of light for SnakeGame
 */
/*jslint node: true, vars: true */
/*global gEngine, SnakeGame, Light, LightSet */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

SnakeGameHard.prototype._createALight = function (pos, color, n, f, intensity) {
    var light = new Light();
    light.setColor(color);
    light.setXPos(pos[0]);
    light.setYPos(pos[1]);
    light.setZPos(pos[2]);
    light.setNear(n);
    light.setFar(f);
    light.setIntensity(intensity);

    return light;
};

SnakeGameHard.prototype._initializeLights = function () {
    this.mGlobalLightSet = new LightSet();

    // SnakeHead light
    var l = this._createALight(
        [128, 128, 6],            // Center of camera 
        [0.8, 0.6, 0.6, 1],     // color
        15, 40,                 // near and far
        1                       // intensity
    );
    this.mGlobalLightSet.addToSet(l);

    // Apple Light
    l = this._createALight(
        [0, 0, 6],
        [0.8, 0.4, 0.4, 1],
        10, 30,
        0.5
    );
    this.mGlobalLightSet.addToSet(l);
};


// Moves the SnakeLight to the location of the SnakeHead
SnakeGameHard.prototype._moveSnakeLight = function (snakeHead) {
    let light = this.mGlobalLightSet.getLightAt(0);
    light.set2DPosition(snakeHead.getXform().getPosition());
}

// Moves the SnakeLight to the location of the Apple
SnakeGameHard.prototype._moveAppleLight = function (apple) {
    let light = this.mGlobalLightSet.getLightAt(1);
    light.set2DPosition(apple.getXform().getPosition());
}