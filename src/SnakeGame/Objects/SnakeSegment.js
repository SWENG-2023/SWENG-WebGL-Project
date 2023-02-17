// File: Snake 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SnakeSegment(spriteTexture, parentSegment) {

    this.mSegment= new TextureRenderable(spriteTexture);
    this.mSegment.setColor([1, 1, 1, 0]);
    this.mSegment.getXform().setSize(15, 15);
    GameObject.call(this, this.mSegment);

    this.mParent = parentSegment; // The segment/head it is following
    this.getXform().setPosition(parentSegment.getXform().getXPos(), parentSegment.getXform().getYPos());

    this.setSpeed(0);
    let nextDirection = parentSegment.getXform().getRotationInDegree();
    this.getXform().setRotationInDegree(nextDirection);

    this.mFrameCounter = 0;
    this.mFrameUpdateInterval = 10;
}
gEngine.Core.inheritPrototype(SnakeSegment, GameObject);


SnakeSegment.prototype.update = function () {
    GameObject.prototype.update.call(this);  // default moving forward

    this.mFrameCounter++;

    if(this.mFrameCounter == this.mFrameUpdateInterval){
        this.setSpeed(16/10);
        this.mFrameCounter = 0;
        var xform = this.getXform();
        var fdir = this.getCurrentFrontDir();

        // Copy the parent's rotation and direction
        xform.setRotationInDegree(this.mParent.getXform().getRotationInDegree());
        vec2.copy(fdir, this.mParent.getCurrentFrontDir());
    }
};