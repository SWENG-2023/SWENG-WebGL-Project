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
    this.kSnakeSegmentSprite = "assets/snake_sprites/body_vertical.png"
    this.kSnakeBgSprite = "assets/snake_sprites/snake_bg.png";

    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;
    this.mInputMsg = null;
    this.mFPSMsg = null;
    this.mScoreMsg = null;

    // the hero and the support objects
    this.mSnake = null;
    this.mApple = null;
    this.mSegments = [];
    this.mTail = null;
    this.mNewAllowed = true;

    // background
    this.mBg = null;
}
gEngine.Core.inheritPrototype(SnakeGame, Scene);

SnakeGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kAppleSprite);
    gEngine.Textures.loadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kSnakeBgSprite);
};

SnakeGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSnakeSprite);
    gEngine.Textures.unloadTexture(this.kAppleSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.unloadTexture(this.kSnakeBgSprite);
};

SnakeGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 0, 500, 500]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mSnake = new Snake(this.kSnakeSprite);
    this.mApple = new Apple(this.kAppleSprite);
    this.mTail = this.mSnake;

    this.mBg = new TextureRenderable(this.kSnakeBgSprite);
    this.mBg.setColor([1, 1, 1, 0]);
    this.mBg.getXform().setSize(256, 256);
    this.mBg.getXform().setPosition(128, 128);

    this.mMsg = new FontRenderable("Hello Snake! [R] to reset");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 10);
    this.mMsg.setTextHeight(10);

    this.mInputMsg = new FontRenderable("Status Message");
    this.mInputMsg.setColor([0, 0, 0, 1]);
    this.mInputMsg.getXform().setPosition(10, 20);
    this.mInputMsg.setTextHeight(10);

    this.mFPSMsg = new FontRenderable("FPS msg");
    this.mFPSMsg.setColor([0, 0, 0, 1]);
    this.mFPSMsg.getXform().setPosition(1, 10);
    this.mFPSMsg.setTextHeight(3);

    this.mScoreMsg = new FontRenderable("Score msg");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(50, 10);
    this.mScoreMsg.setTextHeight(3);
    
    this.mFPSMsg.getXform().setPosition(10, 30);
    this.mFPSMsg.setTextHeight(10);

    this.mSegments.push(this.mSnake);
};

SnakeGame.prototype.makeSegment = function() {
    let newSegment = new SnakeSegment(this.kSnakeSegmentSprite, this.mTail);
    this.mTail = newSegment;
    this.mSegments.push(newSegment);
}

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
    
    //this.mSnake.draw(this.mCamera);
    this.mBg.draw(this.mCamera);
    this.mSegments.forEach(segment => segment.draw(this.mCamera));

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

    //this.mSnake.update();
    this.mSegments.forEach(segment => segment.update());

    this.mInputMsg.setText(msg + this.mSnake.mLastLetter);
    this.mFPSMsg.setText(fpsMsg + this.mSnake.mFrameCounter);

    if(this.mNewAllowed && this.mSnake.mLastLetter == "R"){
        this.makeSegment();
        //this.mNewAllowed = false;
        this.mSnake.mLastLetter == "W";
    } 
};