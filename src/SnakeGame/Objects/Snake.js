// File: Snake 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Snake(spriteTexture) {

    this.mSnake= new TextureRenderable(spriteTexture);
    this.mSnake.setColor([1, 1, 1, 0]);

    let initCoords = this.getSquareCoords(7, 7);
    this.mSnake.getXform().setPosition(100, 100);
    this.mSnake.getXform().setSize(3, 3);
    this.mLastLetter = "N/A";
    this.mFrameCounter = 0; // To only update the snake at set intervals
    this.mFrameUpdateInterval = 15;
    GameObject.call(this, this.mSnake);

    this.setSpeed(0.2);
}
gEngine.Core.inheritPrototype(Snake, GameObject);

Snake.prototype.getSquareCoords = function (xSquare, ySquare){
    let coordsArray = [];

    // 1-indexed, 16 * 16 grid, gets the middle of squares
    coordsArray.push((xSquare * 16) - 8);
    coordsArray.push((ySquare * 16) - 8);
    return coordsArray;
}

Snake.prototype.takeInput = function () {
    // control by WASD
    var xform = this.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        // Set the rotation of sprite and direction for movement
        this.mLastLetter = "W";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mLastLetter = "S";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mLastLetter = "A";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mLastLetter = "D";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        xform.setPosition(177.5, 177.5);
        this.mLastLetter = "R";
    }
};

Snake.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward

    this.takeInput();
    this.mFrameCounter++;

    if(this.mFrameCounter == this.mFrameUpdateInterval){
        this.mFrameCounter = 0;
        var xform = this.getXform();
        var fdir = this.getCurrentFrontDir(); // A vec3

        switch(this.mLastLetter){
            case 'W':
                xform.setRotationInDegree(0);
                vec2.set(fdir, 0, 1);
                break;

            case 'S':
                xform.setRotationInDegree(180);
                vec2.set(fdir, 0, -1);
                break;

            case 'A':
                xform.setRotationInDegree(90);
                vec2.set(fdir, -1, 0);
                break;

            case 'D':
                xform.setRotationInDegree(270);
                vec2.set(fdir, 1, 0);
                break;
        }
    }
};