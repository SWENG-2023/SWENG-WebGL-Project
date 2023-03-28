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

function SnakeGameHard() {
    this.kSnakeSprite = "assets/snake_sprites/head_up.png";
    this.kAppleSprite = "assets/snake_sprites/apple.png";
    this.kSnakeSegmentSprite = "assets/snake_sprites/body_vertical.png"
    this.kSnakeBgSprite = "assets/snake_sprites/snake_bg.png";

    this.kEatCue = "gulp.mp3";

    // The camera to view the scene
    this.mCamera = null;
    this.mInfoCamera = null;

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

    // lighting
    this.mGlobalLightSet = null;

    // background
    this.mBg = null;
}
gEngine.Core.inheritPrototype(SnakeGameHard, Scene);

SnakeGameHard.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kAppleSprite);
    gEngine.Textures.loadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kSnakeBgSprite);

    gEngine.AudioClips.loadAudio(this.kEatCue);
};

SnakeGameHard.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSnakeSprite);
    gEngine.Textures.unloadTexture(this.kAppleSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSegmentSprite);
    //gEngine.Textures.unloadTexture(this.kSnakeBgSprite);
    gEngine.AudioClips.unloadAudio(this.kEatCue);

    let loseLevel = new LoseGame(this.mApple.score);
    gEngine.Core.startScene(loseLevel);
};

SnakeGameHard.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 150, 500, 500]           // viewport (orgX, orgY, width, height)
    );

    
    this.mInfoCamera = new Camera(
        vec2.fromValues(0, 0),
        500,
        [0, 0, 500, 150],
        0 // bound
    );
    

    // sets the background to black
    this.mCamera.setBackgroundColor([1, 1, 1, 1]);

    this.mInfoCamera.setBackgroundColor([0.5, 0.5, 0.5, 1]);

    // Light init
    this._initializeLights();   // defined in SnakeGame_Lights.js

    // SnakeHead init
    this.mSnake = new Snake(this.kSnakeSprite);
    this.mSnake.getRenderable().addLight(this.mGlobalLightSet.getLightAt(0));
    this.mTail = this.mSnake;

    this.mApple = new Apple(this.kAppleSprite);
    this.mApple.getRenderable().addLight(this.mGlobalLightSet.getLightAt(1)); // AppleLight should illuminate Apple

    this.mBg = new LightRenderable(this.kSnakeBgSprite);
    this.mBg.setColor([1, 1, 1, 0]);
    this.mBg.getXform().setSize(256, 256);
    this.mBg.getXform().setPosition(128, 128);
    this.mBg.addLight(this.mGlobalLightSet.getLightAt(0)); // SnakeHead light
    this.mBg.addLight(this.mGlobalLightSet.getLightAt(1)); // apple light

    this.mMsg = new FontRenderable("Hello Dark Snake!");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-230, 60);
    this.mMsg.setTextHeight(25);

    this.mInputMsg = new FontRenderable("Status Message");
    this.mInputMsg.setColor([1, 1, 1, 1]);
    this.mInputMsg.getXform().setPosition(-230, 30);
    this.mInputMsg.setTextHeight(25);

    this.mFPSMsg = new FontRenderable("FPS msg");
    this.mFPSMsg.setColor([1, 1, 1, 1]);
    this.mFPSMsg.getXform().setPosition(-230, 0);
    this.mFPSMsg.setTextHeight(25);

    this.mScoreMsg = new FontRenderable("Score msg");
    this.mScoreMsg.setColor([1, 1, 1, 1]);
    this.mScoreMsg.getXform().setPosition(-230, -30);
    this.mScoreMsg.setTextHeight(25);
    

    this.mSegments.push(this.mSnake);
    this.mFrameCounter = 0;

    this.mGridSegments = Array.from({length: 16}, () =>
        Array.from({length: 16}, () => false)
    );

    this.mApple.moveApple(this.mSegments);

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([0, 0, 0, 1]);
};

SnakeGameHard.prototype.makeSegment = function() {
    let newSegment = new SnakeSegment(this.kSnakeSegmentSprite, this.mTail);
    // Add light
    newSegment.getRenderable().addLight(this.mGlobalLightSet.getLightAt(0)); 

    this.mTail = newSegment;
    this.mSegments.push(newSegment);
}

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
SnakeGameHard.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0, 0, 0, 1.0]); // clear to black

    // Step  B: Activate the drawing Camera
    this.drawGameCamera();
    this.drawUICamera();

    // Step  C: Draw everything



};

SnakeGameHard.prototype.drawGameCamera = function () {
    let camera = this.mCamera;
    camera.setupViewProjection();
    this.mBg.draw(camera);
    this.mApple.draw(camera);
    this.mSegments.forEach(segment => segment.draw(camera));
}

SnakeGameHard.prototype.drawUICamera = function () {
    let camera = this.mInfoCamera;
    camera.setupViewProjection();
    this.mMsg.draw(camera);
    this.mInputMsg.draw(camera);
    this.mFPSMsg.draw(camera);
    this.mScoreMsg.draw(camera);
}

var booleanPause = 0;
// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
SnakeGameHard.prototype.update = function () {
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

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Escape)) { 
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
                //gEngine.AudioClips.playACue(this.kEatCue);
                this.makeSegment();
                this.mApple.resetEaten();
            }
        }
    }
    this._moveSnakeLight(this.mSnake);
    this._moveAppleLight(this.mApple);


    this.mInputMsg.setText(msg + this.mSnake.mLastLetter);
    this.mFPSMsg.setText(fpsMsg + this.mSnake.mFrameCounter);


};