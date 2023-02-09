// File: Snake 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Snake(spriteTexture) {

    this.mSnake= new TextureRenderable(spriteTexture);
    this.mSnake.setColor([1, 1, 1, 0]);
    this.mSnake.getXform().setPosition(35, 50);
    this.mSnake.getXform().setSize(3, 3);
    this.mLastLetter = "N/A";
    GameObject.call(this, this.mSnake);

    this.setSpeed(0.1);
}
gEngine.Core.inheritPrototype(Snake, GameObject);

Snake.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward
    // control by WASD
    var xform = this.getXform();
    var fdir = this.getCurrentFrontDir(); // A vec3

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        // Set the rotation of sprite and direction for movement
        xform.setRotationInDegree(0);
        vec2.set(fdir, 0, 1);
        this.mLastLetter = "W";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.setRotationInDegree(180);
        vec2.set(fdir, 0, -1);
        this.mLastLetter = "S";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.setRotationInDegree(90);
        vec2.set(fdir, -1, 0);
        this.mLastLetter = "A";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.setRotationInDegree(270);
        vec2.set(fdir, 1, 0);
        this.mLastLetter = "D";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        xform.setPosition(35, 50);
        this.mLastLetter = "R";
    }


};