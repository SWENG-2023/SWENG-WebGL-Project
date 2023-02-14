/*
 * File: SnakeGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SnakeGame() {
    this.kSnakeSprite = "assets/snake_sprites/head_up.png";
    this.kAppleSprite = "assets/snake_sprites/apple.png";
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mInputMsg = null;
    this.mFPSMsg = null;
    this.mScoreMsg = null;

    // the hero and the support objects
    this.mSnake = null;
    this.mApple = null;
}
gEngine.Core.inheritPrototype(SnakeGame, Scene);

SnakeGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kAppleSprite);
};

SnakeGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSnakeSprite);
    gEngine.Textures.unloadTexture(this.kAppleSprite);
};

SnakeGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mSnake = new Snake(this.kSnakeSprite);
    this.mApple = new Apple(this.kAppleSprite);

    this.mMsg = new FontRenderable("Hello Snake! [R] to reset");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(1, 2);
    this.mMsg.setTextHeight(3);

    this.mInputMsg = new FontRenderable("Status Message");
    this.mInputMsg.setColor([0, 0, 0, 1]);
    this.mInputMsg.getXform().setPosition(50, 2);
    this.mInputMsg.setTextHeight(3);

    this.mFPSMsg = new FontRenderable("FPS msg");
    this.mFPSMsg.setColor([0, 0, 0, 1]);
    this.mFPSMsg.getXform().setPosition(1, 10);
    this.mFPSMsg.setTextHeight(3);

    this.mScoreMsg = new FontRenderable("Score msg");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(50, 10);
    this.mScoreMsg.setTextHeight(3);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SnakeGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mSnake.draw(this.mCamera);
    this.mApple.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
    this.mMsg.draw(this.mCamera);
    this.mInputMsg.draw(this.mCamera);
    this.mFPSMsg.draw(this.mCamera);
};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SnakeGame.prototype.update = function () {
    let msg = "Last pressed command: ";
    let fpsMsg = "Frame Counter: ";
    let scoreMsg = "Score: ";
    this.mSnake.update();
    this.mApple.getEaten(this.mSnake.getXform().getXPos(),this.mSnake.getXform().getYPos());
    this.mApple.update();
    this.mScoreMsg.setText(scoreMsg + this.mApple.score)
    this.mInputMsg.setText(msg + this.mSnake.mLastLetter);
    this.mFPSMsg.setText(fpsMsg + this.mSnake.mFrameCounter);
};