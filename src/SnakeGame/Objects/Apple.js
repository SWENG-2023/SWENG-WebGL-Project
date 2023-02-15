// File: Apple 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Apple(spriteTexture, snakeHead) {
    this.mSnakeHead = snakeHead;
    this.mApple = new TextureRenderable(spriteTexture);
    this.score = 0;
    this.mApple.setColor([1,1,1,0]);
    this.mApple.getXform().setPosition(Math.random()*80, Math.random()*80);
    this.mApple.getXform().setSize(12,12);
    this.mEaten = false;
    GameObject.call(this,this.mApple);
}
gEngine.Core.inheritPrototype(Apple, GameObject);

Apple.prototype.moveApple = function () {
    this.mApple.getXform().setPosition(Math.random()*80, Math.random()*80);

}

Apple.prototype.getEaten = function (snakeX, snakeY) {
    let appleX = this.mApple.getXform().getXPos();
    let appleY = this.mApple.getXform().getYPos();
    if((appleX>snakeX-5&&appleX<snakeX+5)&&(appleY>snakeY-5&&appleY<snakeY+5))
    {
        this.moveApple();
        this.score++;
        this.mEaten = true;
    }
}

Apple.prototype.resetEaten = function () {
    this.mEaten = false;
}

Apple.prototype.takeInput = function () {
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
       this.moveApple();
    }
};

Apple.prototype.update = function (){
    this.takeInput();
    GameObject.prototype.update.call(this);
}