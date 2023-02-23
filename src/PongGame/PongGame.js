//File: PongGame.js

"use strict";

function PongGame() {
    this.kBallSprite = "assets/snake_sprites/apple.png";
    this.kSnakeSprite = "assets/snake_sprites/head_up.png";
    this.kSnakeSegmentSprite = "assets/snake_sprites/body_vertical.png";
    this.kBgSprite = "assets/snake_sprites/snake_bg.png";

    this.mCamera = null;

    this.mMsg = null;
    this.mInputMsg = null;
    this.mFPSMsg = null;
    this.mScoreMsg = null;

    this.mPaddle = null;
    this.mBall = null;
    this.mSegments = [];
    this.mTail = null;
    this.mNewAllowed = true;
    this.mGridSegments = null;

    this.mBg = null;
}
gEngine.Core.inheritPrototype(PongGame, Scene)

PongGame.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBallSprite);
    gEngine.Textures.loadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kBgSprite);
};
PongGame.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBallSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSprite);
};

PongGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 0, 500, 500]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mBall = new Ball(this.kBallSprite);
    //MORE THINGS HERE

    this.mBg = new TextureRenderable(this.kBgSprite);
    this.mBg.setColor([1,1,1,0]);
    this.mBg.getXform().setSize(256,256);
    this.mBg.getXform().setPosition(128,128);

    this.mMsg = new FontRenderable("Hello Pong! [R] to reset");
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

    this.mFrameCounter = 0;

    this.mGridSegments = Array.from({length: 16}, () =>
        Array.from({length: 16}, () => false)
    );

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
};

PongGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mBall.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    this.mInputMsg.draw(this.mCamera);
    this.mFPSMsg.draw(this.mCamera);
    this.mScoreMsg.draw(this.mCamera);
};

PongGame.prototype.update = function(){
    let msg = "Last pressed command: ";
    let fpsMsg = "Frame Counter: ";
    let scoreMsg = "Score: ";

    this.mBall.update();
    this.mFrameCounter++;
    if(this.mFrameCounter == 10){
        this.mFrameCounter = 0;
    }
    this.mInputMsg.setText(msg + this.mPaddle.mLastLetter);
    this.mFPSMsg.setText(fpsMsg + this.mPaddle.mFrameCounter);    
};