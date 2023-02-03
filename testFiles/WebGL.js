"use strict"
var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
    
    gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gGL !== null) {
        // A. initialize the vertex buffer
        initSquareBuffer(); // This function is defined VertexBuffer.js
        // B. now load and compile the vertex and fragment shaders
        initSimpleShader("VertexShader", "FragmentShader");
        // the two shaders are defined in the index.html file
        // initSimpleShader() function is defined in ShaderSupport.js
        gGL.clearColor(0.0, 0.8, 0.0, 1.0); // set the color to be cleared
    }
    else {
        document.write("<br><b>WebGL is not supported!</b>");
    }
}

function clearCanvas() {
    gGL.clear(gGL.COLOR_BUFFER_BIT); // clear to the color previously set
}

function drawSquare() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);
    // Step A: Activate the shader to use
    gGL.useProgram(gSimpleShader);
    
    // Step B: Enable the vertex position attribute
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);
    
    // Step C: Draw with the above settings
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

function doGLDraw() {
    initializeGL();
    drawSquare();
}

// Request html canvas element
var canvas = document.getElementById("canvas");

// Create a WebGL rendering context  
var gl = canvas.getContext("webgl2");

// Tell user if their browser does not support WebGL
if (!gl) {
    alert("Your browser does not support WebGL");
}

// Set the color of the canvas.
// Parameters are RGB colors (red, green, blue, alpha)
gl.clearColor(0, 0.6, 0.0, 1.0);
// Clear the color buffer with specified color
gl.clear(gl.COLOR_BUFFER_BIT);