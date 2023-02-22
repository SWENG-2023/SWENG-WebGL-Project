//File: Ball

"use strict";

function Ball(spriteTexture)
{
    this.mBall = new textureRenderable(spriteTexture);
    this.mBall.setColor([1,1,1,0]);
    this.mBall.getXform().setSize(12,12);
    GameObject.call(this,this.mBall);
}
gEngine.Core.inheritPrototype(Ball,GameObject);

Ball.prototype.Collide = function(){

}

Ball.prototype.update = function(){
    GameObject.prototype.update.call(this);
}