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
}
gEngine.Core.inheritPrototype(Ball,GameObject);

Ball.prototype.collide = function(){
    vec2.set(fdir, 0, -1);

}

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
    vec2.set(fdir, -.75, -.75);
    this.takeInput();
}