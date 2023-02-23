//File: Paddle.js
"use strict";



function Paddle(spriteTexture){
    this.mPaddle = new TextureRenderable(spriteTexture);
    this.mPaddle.setColor([1,1,1,0]);
    let initCoords = this.getSquareCoords(128,256);
    this.mPaddle.getXform().setPosition(initCoords[0].initCoords[1]);
    this.mPaddle.getXform().setSize(14,14);
    this.mLastLetter="N/A";
    this.mFrameCounter = 0;
    this.mFrameUpdateInterval = 10;
    gameObject.call(this, this.mPaddle)

    this.setSpeed(16/10);
}
gEngine.Core.inheritPrototype(Paddle, GameObject);

Paddle.prototype.takeInput = function () {
    var xform = this.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mLastLetter = "A";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mLastLetter = "D";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        let coords = this.getSquareCoords(10, 10);
        xform.setPosition(coords[0], coords[1]);
        this.mFrameCounter = 0;
        this.mLastLetter = "R";
    }
};

Paddle.prototype.update = function(){
    GameObject.prototype.update.call(this);

    this.takeInput();
    this.mFrameCounter++;
    if(this.mFrameCounter == this.mFrameUpdateInterval){
        this.mFrameCounter = 0;
        var xform = this.getXform();
        var fdir = this.getCurrentFrontDir();

        switch(this.mLastLetter){
            case 'A':
                xform.setRotationInDegree(90);
                vec2.set(fdir, -1, 0);
                break;
            case 'S':
                xform.setRotationInDegree(180);
                vec2.set(fdir, 0, -1);
                break;
                
        }
    }
};
