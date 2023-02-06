/*
 * File: Engine_DefaultResources.js 
 */
/*jslint node: true, vars: true, evil: true */
/*global gEngine: false, SimpleShader: false */
/* find out more about jslint: http://www.jslint.com/help.html */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    // Simple Shader
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  // Path to the VertexShader 
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  // Path to the simple FragmentShader

    // Texture Shader
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl"; // Path to VertexShader
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl"; // Path to FragmentShader
    var mTextureShader = null;

    var mConstColorShader = null;

    var getConstColorShader = function () { return mConstColorShader; };
    var getTextureShader = function() { return mTextureShader; };

    var _createShaders = function (callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        callBackFunction();
    };

    var initialize = function (callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        // texture shader:
        gEngine.TextFileLoader.loadTextFile(kTextureVS,
            gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS,
            gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function () { _createShaders(callBackFunction); });
    };

    // Public interface for this object. Anything not in here will
    // not be accessable.
    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader
    };
    return mPublic;
}());