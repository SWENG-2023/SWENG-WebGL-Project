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
    this.setSpeed(1.5);
    if(this.coinFlip() == 1)
    {this.angleToVector(110+Math.random()*45);}
    else
    {this.angleToVector(250-Math.random()*45)}
    this.collideCount = 0;
    this.cooldown = 10;
    this.playerScore = 0;
    this.enemyScore = 0;
    this.pauseGame = 0;
    this.roundOver = 0;
}
gEngine.Core.inheritPrototype(Ball,GameObject);

Ball.prototype.coinFlip = function(){
    if (Math.random() > .5){
        return 1;   
    }   
    else{
        return 0;
    }
}

Ball.prototype.angleToVector = function(angle){
    let radians = angle * (Math.PI / 180);
    vec2.set(this.getCurrentFrontDir(),Math.cos(radians),Math.sin(radians))
}

Ball.prototype.collide = function(paddle, enemyPaddle){
    let paddleX = paddle.getXform().getXPos();
    let paddleY = paddle.getXform().getYPos();
    let enemyPaddleX = enemyPaddle.getXform().getXPos();
    let enemyPaddleY = enemyPaddle.getXform().getYPos();
    let ballX = this.mBall.getXform().getXPos();
    let ballY = this.mBall.getXform().getYPos();
    if(paddleX-31 < ballX && paddleX+31 > ballX && paddleY+3 < ballY && paddleY+7>ballY&& this.cooldown >=(50-(this.collideCount/5))){
        vec2.set(this.getCurrentFrontDir(),this.getCurrentFrontDir()[0],-this.getCurrentFrontDir()[1])
        this.collideCount++;
        this.cooldown = 0;
    }
    if(enemyPaddleX-31<ballX && enemyPaddleX+31 > ballX && enemyPaddleY-7 < ballY && enemyPaddleY-3>ballY&&this.cooldown>=(50-(this.collideCount/5))){
        vec2.set(this.getCurrentFrontDir(),this.getCurrentFrontDir()[0],-this.getCurrentFrontDir()[1])
        this.collideCount++;
        this.cooldown = 0;
    }
    if(ballX>=256||ballX<=0){
        vec2.set(this.getCurrentFrontDir(),-this.getCurrentFrontDir()[0],this.getCurrentFrontDir()[1])
    }

    if(ballY>= 256 || ballY <= 0) {
        if(ballY>= 256 ) {
            this.playerScore++;
            this.mBall.getXform().setPosition(128,128);
            this.angleToVector(45+Math.random()*90);
        } else {
            this.enemyScore++;
            this.mBall.getXform().setPosition(128,128);
            this.angleToVector(225+Math.random()*90);
        }
        this.setSpeed(16/10);
        this.collideCount = 0;    
        this.pauseGame ^= 1;
        this.roundOver = 1;
    }
    this.cooldown++;
};

Ball.prototype.takeInput = function (){
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
        // this.rotation = 315+Math.random()*90;
        // this.mBall.getXform().setRotationInDegree(this.rotation);
        this.mBall.getXform().setPosition(128,128);
        this.angleToVector(225+Math.random()*90);
    }
};

Ball.prototype.update = function(){
    if(this.roundOver == 1) {
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.A) || gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) { 
            this.roundOver = 0;
            this.pauseGame ^= 1;
        } 

    } else {
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) { 
            this.pauseGame ^= 1;
        } 
        if(this.pauseGame == 0) {
            GameObject.prototype.update.call(this);
            this.mBall.getXform().setRotationInDegree(this.mBall.getXform().getRotationInDegree()+2);
            this.takeInput();
            this.setSpeed(1+(this.collideCount/10));
        }
    }
}