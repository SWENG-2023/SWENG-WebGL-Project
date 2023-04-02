//File: MultiPlayerPongGame.js

"use strict";

function MultiPlayerPongGame() {
    this.kBallSprite = "assets/snake_sprites/apple.png";
    this.kSnakeSprite = "assets/snake_sprites/paddle.png";
    this.kSnakeSegmentSprite = "assets/snake_sprites/body_vertical.png";
    this.kBgSprite = "assets/snake_sprites/snake_bg.png";
    this.kEnemySnake = "assets/snake_sprites/enemyPaddle.png";
    this.kEnemySnakeSegmentSprite = "assets/snake_sprites/red_body_vertical.png";

    this.mCamera = null;

    this.mMsg = null;
    this.mInputMsg = null;
    this.mFPSMsg = null;
    this.mScoreMsg = null;

    this.mPaddle = null;
    this.mPlayer2Paddle = null;
    this.mBall = null;
    this.mSegments = [];
    this.mTail = null;
    this.mNewAllowed = true;
    this.mGridSegments = null;
    this.mBg = null;
}
gEngine.Core.inheritPrototype(MultiPlayerPongGame, Scene)

MultiPlayerPongGame.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBallSprite);
    gEngine.Textures.loadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kEnemySnakeSegmentSprite);
    gEngine.Textures.loadTexture(this.kSnakeSprite);
    gEngine.Textures.loadTexture(this.kEnemySnake);
    gEngine.Textures.loadTexture(this.kBgSprite);
};
MultiPlayerPongGame.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBallSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSegmentSprite);
    gEngine.Textures.unloadTexture(this.kEnemySnakeSegmentSprite);
    gEngine.Textures.unloadTexture(this.kSnakeSprite);
    gEngine.Textures.unloadTexture(this.kEnemySnake);
};

MultiPlayerPongGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(128, 128), // position of the camera
        256,                       // width of camera
        [0, 0, 500, 500]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray

    this.mBall = new Ball(this.kBallSprite);
    this.mPaddle = new Paddle(this.kSnakeSprite);
    this.mPlayer2Paddle = new Player2Paddle(this.kEnemySnake, this.mBall)
    this.mTail = this.mPaddle;
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

    this.mScoreMsg = new FontRenderable("1");
    this.mScoreMsg.setColor([0, 0, 0, 1]);
    this.mScoreMsg.getXform().setPosition(10, 40);
    this.mScoreMsg.setTextHeight(10);

    this.mPlayerScoreMsg = new FontRenderable("Player score msg");
    // this.mPlayerScoreMsg.setColor([0, 0, 0, 0]);
    this.mPlayerScoreMsg.getXform().setPosition(87, 57);
    this.mPlayerScoreMsg.setTextHeight(10);
    
    this.mEnemyScoreMsg = new FontRenderable("Enemy score msg");
    // this.mEnemyScoreMsg.setColor([0, 0, 0, 0]);
    this.mEnemyScoreMsg.getXform().setPosition(90, 203);
    this.mEnemyScoreMsg.setTextHeight(10);
    
    this.mRoundOverMsg = new FontRenderable("Round over msg");
    // this.mRoundOverMsg.setColor([0, 0, 0, 0]);
    this.mRoundOverMsg.getXform().setPosition(20, 140);
    this.mRoundOverMsg.setTextHeight(10);
    
    this.mPausedMsg = new FontRenderable("Paused game msg");
    // this.mPausedMsg.setColor([0, 0, 0, 0]);
    this.mPausedMsg.getXform().setPosition(88, 137);
    this.mPausedMsg.setTextHeight(10);


    this.mFPSMsg.getXform().setPosition(10, 30);
    this.mFPSMsg.setTextHeight(10);

    // this.mSegments.push(this.mPaddle);
    // this.mFrameCounter = 0;

    this.mGridSegments = Array.from({length: 16}, () =>
        Array.from({length: 16}, () => false)
    );

    gEngine.DefaultResources.setGlobalAmbientIntensity(1);
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
};

// PongGame.prototype.makeSegment = function(){
//     let newSegment = new PaddleSegment(this.kSnakeSegmentSprite, this.mTail);
//     this.mTail = newSegment;
//     this.mSegments.push(newSegment);
// }

MultiPlayerPongGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);
    this.mBall.draw(this.mCamera);
    this.mPaddle.draw(this.mCamera);
    this.mPlayer2Paddle.draw(this.mCamera);
    
   // this.mSegments.forEach(segment => segment.draw(this.mCamera));

    // this.mMsg.draw(this.mCamera);
    // this.mInputMsg.draw(this.mCamera);
    // this.mFPSMsg.draw(this.mCamera);
    // this.mScoreMsg.draw(this.mCamera);
    this.mPlayerScoreMsg.draw(this.mCamera);
    this.mEnemyScoreMsg.draw(this.mCamera);
    this.mRoundOverMsg.draw(this.mCamera);
    this.mPausedMsg.draw(this.mCamera);
};

MultiPlayerPongGame.prototype.update = function(){
    let msg = "Last pressed command: ";
    let fpsMsg = "Frame Counter: ";
    let scoreMsg = "Collisions: ";
    let playerScoreMsg = "Player score: ";
    let enemyScoreMsg = "Enemy score: ";
    let roundOverMsg = "Round over. Press A or D to continue.";
    let pausedGameMsg = "Game is Paused.";
    this.mBall.update();
    this.mBall.collide(this.mPaddle, this.mPlayer2Paddle)
    this.mPlayer2Paddle.update();
    this.mPaddle.update();

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) { 
        this.mBall.pauseGame ^= 1;
    } 
        // this.mScoreMsg.setText(scoreMsg + this.mBall.collideCount);
        if(this.mBall.pauseGame == 0) {
            for (let i = this.mSegments.length-1; i >= 0; i--) {
                this.mSegments[i].update();
            }
            // this.mScoreMsg.setText(scoreMsg + this.mBall.collideCount);
    
            this.mFrameCounter++;
            if(this.mFrameCounter == 10){
                this.mFrameCounter = 0;
                this.makeSegment();
            }   
        }
    this.mEnemyScoreMsg.setText(enemyScoreMsg + this.mBall.enemyScore);
    this.mPlayerScoreMsg.setText(playerScoreMsg + this.mBall.playerScore);
    // this.mInputMsg.setText(msg + this.mPaddle.mLastLetter);
    // this.mFPSMsg.setText(fpsMsg + this.mPaddle.mFrameCounter);    
    if(this.mBall.roundOver == 1) {
        this.mRoundOverMsg.setText(roundOverMsg);
    } else {
        this.mRoundOverMsg.setText("");
    }
    if(this.mBall.pauseGame == 1 && this.mBall.roundOver == 0) {
        this.mPausedMsg.setText(pausedGameMsg);
    } else {
        this.mPausedMsg.setText("");
    }
    
};