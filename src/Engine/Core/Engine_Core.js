"use strict"; // Operate in Strict mode
var gEngine = gEngine || { };
// initialize the variable while ensuring it is not redefined

gEngine.Core = (function() {
    // instance variable: the graphical context for drawing
    var mGL = null;
    
    // Accessor of the webgl context
    var getGL = function() { return mGL; };
    // Contains the functions and variables that will be accessible.
    var mPublic = {
        getGL: getGL
    };

    // initialize the WebGL
    var _initializeWebGL = function(htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        mGL = canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
        
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    // initialize all of the EngineCore components
    var initializeEngineCore = function(htmlCanvasID) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
    };

    // Clears the draw area and draws one square
    var clearCanvas = function(color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]); // set the color to be cleared
        mGL.clear(mGL.COLOR_BUFFER_BIT); // clear to the color previously set
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas
    };
    
    return mPublic;
}());