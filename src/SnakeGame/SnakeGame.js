/*
 * File: SnakeGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SnakeGame() {
    this.kSnakeSprite = "assets/snake_sprites/head_up.png";
    this.kAppleSprite = "assets/snake_sprites/apple.png";
    this.kSnakeSegmentSprite = "assets/snake_sprites/body_vertical.png";
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
    this.mGridSegments = null;

    // background
    this.mBg = null;
}

const gameOverSound = new Audio("gameover.wav"); 

gEngine.Core.inheritPrototype(SnakeGame, Scene);

SnakeGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kAppleSprite);
    gEngine.Textures.loadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kSnakeBgSprite);
};

SnakeGame.prototype.unloadScene = function () {
    //gEngine.Textures.unloadTexture(this.kSnakeSprite);
    //gEngine.Textures.unloadTexture(this.kAppleSprite);
    //gEngine.Textures.unloadTexture(this.kSnakeSegmentSprite);
    //gEngine.Textures.unloadTexture(this.kSnakeBgSprite);

    let loseLevel = new LoseGame(this.mApple.score);
    gEngine.Core.startScene(loseLevel);
};

SnakeGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 150, 500, 500]           // viewport (orgX, orgY, width, height)
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

    this.mMsg = new FontRenderable("Hello Snake!");
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
    this.mFPSMsg.setTextHeight(10);

    this.mScoreMsg = new FontRenderable("Score msg");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(10, 40);
    this.mScoreMsg.setTextHeight(10);
    
    this.mFPSMsg.getXform().setPosition(10, 30);
    this.mFPSMsg.setTextHeight(10);

    this.mSegments.push(this.mSnake);
    this.mFrameCounter = 0;

    this.mGridSegments = Array.from({length: 16}, () =>
        Array.from({length: 16}, () => false)
    );

    this.mApple.moveApple(this.mSegments);

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
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
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mApple.draw(this.mCamera);
    
    this.mSegments.forEach(segment => segment.draw(this.mCamera));

    this.mMsg.draw(this.mCamera);
    this.mInputMsg.draw(this.mCamera);
    this.mFPSMsg.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
};

var booleanPause = 0;


// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SnakeGame.prototype.update = function () {
    
    let msg = "Last pressed command: ";
    let fpsMsg = "Frame Counter: ";
    let scoreMsg = "Score: ";
    let snakeXPos = this.mSnake.getXform().getXPos();

    let snakeYPos = this.mSnake.getXform().getYPos();

    if(snakeXPos < 0 || snakeXPos > 256 || snakeYPos < 0 || snakeYPos > 256){
        gameOverSound.play();
        gEngine.GameLoop.stop();
    }

    // Allows segments to eat apples
    /*
    this.mSegments.forEach(segment => {
        this.mApple.getEaten(segment.getXform().getXPos(),segment.getXform().getYPos());
    });
    */
    this.mApple.getEaten(this.mSnake.getXform().getXPos(),this.mSnake.getXform().getYPos(), this.mSegments);
    this.mApple.update();
    this.mScoreMsg.setText(scoreMsg + this.mApple.score);

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) { 
        booleanPause ^= 1;
    } 

    if(booleanPause == 0) {

        for (let i = this.mSegments.length-1; i >= 0; i--) {
            this.mSegments[i].update();
        }

        let h = [];

        for (let i = 2; i < this.mSegments.length; i++) {
            if(this.mSegments[i].pixelTouches(this.mSnake, h)){
                gameOverSound.play();
                gEngine.GameLoop.stop();
            }
        }

    
        this.mFrameCounter++;
        if(this.mFrameCounter == 10){
            this.mFrameCounter = 0;
            if(this.mApple.mEaten){
                this.makeSegment();
                this.mApple.resetEaten();
            }
        }
    }

    //this.mSegments.forEach(segment => segment.update());

    this.mInputMsg.setText(msg + this.mSnake.mLastLetter);
    this.mFPSMsg.setText(fpsMsg + this.mSnake.mFrameCounter);

    //if(this.mNewAllowed && this.mSnake.mLastLetter == "R"){
    //    this.mSegments = [this.mSnake];
    //} 

    
};
