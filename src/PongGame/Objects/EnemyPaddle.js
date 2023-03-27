//File: EnemyPaddle.js
"use strict";



function EnemyPaddle(spriteTexture, ball){
    this.mEnemyPaddle = new TextureRenderable(spriteTexture);
    this.mBall = ball
    this.mEnemyPaddle.setColor([1,1,1,0]);
    let initCoords = this.getSquareCoords(8,16);
    this.mEnemyPaddle.getXform().setPosition(initCoords[0],initCoords[1]);
    this.mEnemyPaddle.getXform().setSize(14,58);
    
    this.mLastLetter="A";
    this.mFrameCounter = 0;
    this.mFrameUpdateInterval = 10;
    GameObject.call(this, this.mEnemyPaddle)

    this.setSpeed(16/10);
    this.mEnemyPaddle.getXform().setRotationInDegree(90);
    vec2.set(this.getCurrentFrontDir(), -1, 0);
    this.wiggleTimer = 0;
}
gEngine.Core.inheritPrototype(EnemyPaddle, GameObject);

EnemyPaddle.prototype.getSquareCoords = function (xSquare, ySquare){
    let coordsArray = [];

    // 1-indexed, 16 * 16 grid, gets the middle of squares
    coordsArray.push((xSquare * 16) - 8);
    coordsArray.push((ySquare * 16) - 8);
    return coordsArray;
}

// EnemyPaddle.prototype.takeInput = function () {
//     var xform = this.getXform();

//     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
//         this.mLastLetter = "A";
//     }
//     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
//         this.mLastLetter = "D";

//     }
//     if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
//         let coords = this.getSquareCoords(8, 1);
//         xform.setPosition(coords[0], coords[1]);
//         this.mFrameCounter = 0;
//         this.mLastLetter = "R";
//         this.setSpeed(16/10);

//     }
// };

EnemyPaddle.prototype.update = function(){
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) { 
        this.mBall.pauseGame ^= 1;
    } 
    if(this.mBall.pauseGame == 0) {
        GameObject.prototype.update.call(this);
        if(this.mBall.getXform().getXPos() < this.mEnemyPaddle.getXform().getXPos())
        {
            this.mLastLetter = "A";
        }
        if(this.mBall.getXform().getXPos() > this.mEnemyPaddle.getXform().getXPos())
        {
            this.mLastLetter = "D";
        }

        if(this.mEnemyPaddle.getXform().getXPos() <= 8 && this.mLastLetter == 'A')
        {
            this.setSpeed(0);
        }
    else  if(this.mEnemyPaddle.getXform().getXPos() >= 248 && this.mLastLetter == 'D')
        {
            this.setSpeed(0);
        }
        else{
            this.setSpeed(16/10);
        }
        //this.takeInput();
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
