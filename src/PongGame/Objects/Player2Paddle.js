//File: EnemyPaddle.js
"use strict";



function Player2Paddle(spriteTexture, ball){
    this.mPlayer2Paddlee = new TextureRenderable(spriteTexture);
    this.mBall = ball
    this.mPlayer2Paddle.setColor([1,1,1,0]);
    let initCoords = this.getSquareCoords(8,16);
    this.mPlayer2Paddle.getXform().setPosition(initCoords[0],initCoords[1]);
    this.mPlayer2Paddle.getXform().setSize(14,58);
    
    this.mLastLetter="A";
    this.mFrameCounter = 0;
    this.mFrameUpdateInterval = 10;
    GameObject.call(this, this.mPlayer2Paddle)

    this.setSpeed(16/10);
    this.mPlayer2Paddle.getXform().setRotationInDegree(90);
    vec2.set(this.getCurrentFrontDir(), -1, 0);
    this.wiggleTimer = 0;
}
gEngine.Core.inheritPrototype(Player2Paddle, GameObject);

Player2Paddle.prototype.getSquareCoords = function (xSquare, ySquare){
    let coordsArray = [];

    // 1-indexed, 16 * 16 grid, gets the middle of squares
    coordsArray.push((xSquare * 16) - 8);
    coordsArray.push((ySquare * 16) - 8);
    return coordsArray;
}

Player2Paddle.prototype.takeInput = function () {
    var xform = this.getXform();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        this.mLastLetter = "A";
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        this.mLastLetter = "D";
    }
};

Player2Paddle.prototype.update = function(){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) { 
        this.mBall.pauseGame ^= 1;
    } 
    if(this.mBall.pauseGame == 0) {
        GameObject.prototype.update.call(this);
        if(this.mPaddle.getXform().getXPos() <= 28 && this.mLastLetter == 'A')
        {
            this.setSpeed(0);
        }
    else  if(this.mPaddle.getXform().getXPos() >= 228 && this.mLastLetter == 'D')
        {
            this.setSpeed(0);
        }
        else{
            this.setSpeed(16/10);
        }
        this.takeInput();
        this.mFrameCounter++;
        if(this.mFrameCounter == this.mFrameUpdateInterval){
            this.mFrameCounter = 0;
            // if(xform.getXPos()>=248 || xform.getXpos()<=8)
            // {
            //     vec2.set(fdir, 0,0);
            // }
            var xform = this.getXform();
            var fdir = this.getCurrentFrontDir();
            
                switch(this.mLastLetter){
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
    }
};
