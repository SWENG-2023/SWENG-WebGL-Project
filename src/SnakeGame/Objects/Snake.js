// File: Snake 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Snake(spriteTexture) {

    this.mSnake= new LightRenderable(spriteTexture);
    this.mSnake.setColor([1, 1, 1, 0]);

    let initCoords = this.getSquareCoords(5, 10);
    this.mSnake.getXform().setPosition(initCoords[0], initCoords[1]);
    this.mSnake.getXform().setSize(14, 14);
    this.mLastLetter = "N/A";
    this.mFrameCounter = 0; // To only update the snake at set intervals
    this.mFrameUpdateInterval = 10;
    GameObject.call(this, this.mSnake);

    // Since 1 grid = 16px, 1 grid/10 frames
    this.setSpeed(16/10);
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

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.mLastLetter != "S") {
        // Set the rotation of sprite and direction for movement
        this.mLastLetter = "W";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.mLastLetter != "W") {
        this.mLastLetter = "S";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.mLastLetter != "D") {
        this.mLastLetter = "A";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.mLastLetter != "A") {
        this.mLastLetter = "D";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        let coords = this.getSquareCoords(10, 10);
        xform.setPosition(coords[0], coords[1]);
        this.mFrameCounter = 0;
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
                if(xform.getRotationInDegree() != 180){
                    xform.setRotationInDegree(0);
                    vec2.set(fdir, 0, 1);
                    break;
                }

            case 'S':
                if(xform.getRotationInDegree() != 0){
                    xform.setRotationInDegree(180);
                    vec2.set(fdir, 0, -1);
                    break;
                }   

            case 'A':
                if(xform.getRotationInDegree() != 270){
                    xform.setRotationInDegree(90);
                    vec2.set(fdir, -1, 0);
                    break;
                }

            case 'D':
                if(xform.getRotationInDegree() != 90){ 
                    xform.setRotationInDegree(270);
                    vec2.set(fdir, 1, 0);
                    break;
                }
        }
    }
};