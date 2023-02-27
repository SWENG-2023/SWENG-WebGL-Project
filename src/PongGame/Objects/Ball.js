//File: Ball

"use strict";

function Ball(spriteTexture)
{
    this.mBall = new TextureRenderable(spriteTexture);
    this.mBall.setColor([1,1,1,0]);
    this.mBall.getXform().setPosition(128,128);
    this.mBall.getXform().setSize(12,12);
    // this.rotation = 315+Math.random()*90;
    // this.mBall.getXform().setRotationInDegree(this.rotation);
    GameObject.call(this,this.mBall);
    this.setSpeed(16/10);
    vec2.set(this.getCurrentFrontDir(), 1, 0);

}
gEngine.Core.inheritPrototype(Ball,GameObject);

Ball.prototype.collide = function(paddle, enemyPaddle){
    let paddleX = paddle.getXform().getXPos();
    let paddleY = paddle.getXform().getYPos();
    let enemyPaddleX = enemyPaddle.getXform().getXPos();
    let enemyPaddleY = enemyPaddle.getXform().getYPos();
    let ballX = this.mBall.getXform().getXPos();
    let ballY = this.mBall.getXform().getYPos();
    if(paddleX-7<ballX && paddleX+7 > ballX && paddleY-7 < ballY && paddleY+7>ballY){
        vec2.set(this.getCurrentFrontDir(), 0, 1);
    }
    if(enemyPaddleX-7<ballX && enemyPaddleX+7 > ballX && enemyPaddleY-7 < ballY && enemyPaddleY+7>ballY){
        vec2.set(this.getCurrentFrontDir(), 0, -1);
    }
    if(ballX>=256){
        vec2.set(this.getCurrentFrontDir(), -1, 0);
    }
    if(ballX<=0){
        vec2.set(this.getCurrentFrontDir(), 1, 0);
    }
};

Ball.prototype.takeInput = function (){
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        // this.rotation = 315+Math.random()*90;
        // this.mBall.getXform().setRotationInDegree(this.rotation);
        this.mBall.getXform().setPosition(128,128);
    }
};

Ball.prototype.update = function(){
    GameObject.prototype.update.call(this);
    this.mBall.getXform().setRotationInDegree(this.mBall.getXform().getRotationInDegree()+2);
    var fdir = this.getCurrentFrontDir();
    var xform = this.getXform();
    this.takeInput();
}