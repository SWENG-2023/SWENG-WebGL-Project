// File: Apple 

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Apple(spriteTexture, snakeHead) {
    this.mSnakeHead = snakeHead;
    this.mApple = new TextureRenderable(spriteTexture);
    this.score = 0;
    this.mApple.setColor([1,1,1,0]);
    this.mApple.getXform().setSize(12,12);
    this.moveApple();
    this.mEaten = false;
    GameObject.call(this,this.mApple);
}
gEngine.Core.inheritPrototype(Apple, GameObject);

Apple.prototype.moveApple = function () {
    let randXSquare = Math.floor(Math.random() * 16) + 1;
    let randYSquare = Math.floor(Math.random() * 16) + 1;

    this.mApple.getXform().setPosition((randXSquare * 16) - 8, (randYSquare * 16) - 8);

}

Apple.prototype.getEaten = function (snakeX, snakeY) {
    let appleX = this.mApple.getXform().getXPos();
    let appleY = this.mApple.getXform().getYPos();
    if((appleX>snakeX-7&&appleX<snakeX+7)&&(appleY>snakeY-7&&appleY<snakeY+7))
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
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.R)) {
       this.moveApple();
    }
};

Apple.prototype.update = function (){
    //this.takeInput();
    GameObject.prototype.update.call(this);
}