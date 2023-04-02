/*
 * File: LoseGame.js 
 * This is the logic of our lose game screen. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LoseGame(score) {
    this.kSnakeBgSprite = "assets/snake_sprites/snake_bg.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mLoseMsg = null;
    this.mScoreMsg = null;

    // background
    this.mBg = null;

    // score
    this.mScore = score;
}
gEngine.Core.inheritPrototype(LoseGame, Scene);

LoseGame.prototype.loadScene = function () {
    //gEngine.Textures.loadTexture(this.kSnakeBgSprite);
};

LoseGame.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kSnakeBgSprite);
    
    if(window.gameChoice==1)
    {
    let snakeLevel = new SnakeGame();
    gEngine.Core.startScene(snakeLevel);
    }
    else if(window.gameChoice==2)
    {
        let snakeLevel = new PongGame();
        gEngine.Core.startScene(snakeLevel);
    }
    else{
        let snakeLevel= new SnakeGameHard();
        gEngine.Core.startScene(snakeLevel);
    }
    
    

};

LoseGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 150, 500, 500]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray


    this.mBg = new TextureRenderable(this.kSnakeBgSprite);
    this.mBg.setColor([1, 1, 1, 0]);
    this.mBg.getXform().setSize(256, 256);
    this.mBg.getXform().setPosition(128, 128);

    this.mLoseMsg = new FontRenderable("You lost! Hard luck");
    this.mLoseMsg.setColor([0, 0, 0, 1]);
    this.mLoseMsg.getXform().setPosition(10, 128);
    this.mLoseMsg.setTextHeight(20);

    this.mScoreMsg = new FontRenderable("");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(80, 60);
    this.mScoreMsg.setTextHeight(20);

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);

};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
LoseGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to black

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mLoseMsg.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
LoseGame.prototype.update = function () {
    let scoreMsg = "Score: ";

    this.mScoreMsg.setText(scoreMsg + this.mScore);

    if(gEngine.Input.isKeyPressed(gEngine.Input.keys.R)){
        gEngine.GameLoop.stop();
    }

};