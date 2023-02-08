function GameOver() {
    this.mCamera = null;
    this.mMsg = null;
};
gEngine.Core.inheritPrototype(GameOver, Scene);

GameOver.prototype.initialize = function() {
    // Step A: set up the cameras
    this.mCamera = new Camera(
                        vec2.fromValues(50, 33), // position of the camera
                        100, // width of camera
                        [0, 0, 600, 400] // viewport (orgX, orgY, width, height)
                        );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);
    
    this.mMsg = new FontRenderable("Game Over!");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(22, 32);
    this.mMsg.setTextHeight(10);
};

GameOver.prototype.draw = function() {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    // Step B: Activate the drawing Camera
    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera.getVPMatrix());
};

GameOver.prototype.update = function() {
    gEngine.GameLoop.stop();
};

GameOver.prototype.unloadScene = function() {
    gEngine.Core.cleanUp(); // release gl resources
};