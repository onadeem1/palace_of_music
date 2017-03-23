'use strict';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

var bar = [];
var square = "http://cdn.babylonjs.com/wwwbabylonjs/assetsdemos/3danalyser/square.jpg";
var bjs = "http://cdn.babylonjs.com/wwwbabylonjs/assetsdemos/3danalyser/metal.png";
var fft;

// function createRingcubes(r, nb, currentScene) {
//         var TWO_PI = Math.PI * 0.20;
//         var angle = TWO_PI / nb;
//         var cube;
//         // Create a really cool metal material with bump :)
//         // var m1 = new BABYLON.StandardMaterial("m", currentScene);
//         // m1.diffuseTexture = new BABYLON.Texture(square, currentScene);
//         // m1.bumpTexture = new BABYLON.Texture("http://cdn.babylonjs.com/wwwbabylonjs/assetsdemos/3danalyser/grained_uv.png", currentScene);
//         // m1.reflectionTexture = new BABYLON.Texture(bjs, currentScene);
//         // m1.reflectionTexture.level = 0.8;
//         // m1.reflectionTexture.coordinatesMode = BABYLON.Texture.SPHERICAL_MODE;

//         for (var i = 0; i <= nb; i++) {
//             if (i === 0) {
//                 bar[i] = BABYLON
//                     .Mesh
//                     .CreateBox("b", 0.02, currentScene);

//                 // bar[i].material = m1;
//                 bar[i].isVisible = false;
//             } else {
//                 bar[i] = bar[0].createInstance("b" + i);
//                 bar[i].position.x = (-2 + r)* Math.sin(angle * i);
//                 bar[i].position.y = 3
//                 bar[i].position.z = 5;
//                 bar[i].rotation.y = 90 + i
//                 bar[i].rotation.x = 90 + i
//                 bar[i].rotation.z = 90 + i
//                 bar[i].scaling.y = 1;
//                 bar[i].scaling.x = 1.0;
//                 console.log(bar)
//             }

//         }
//     }

const randColorArr = {
    1: function(){return new BABYLON.Color3(1,0,0)},
    2: function(){return new BABYLON.Color3(0,1,0)},
    3: function(){return new BABYLON.Color3(0,0,1)}
}
const randomPosition = function(){
    return new BABYLON.Vector3(chance.floating({min: -10.5, max: 11.5}),chance.floating({min:0, max:4.9}),chance.floating({min:-3, max: 13.5}))
}


export default function lightShow(currentScene, outdoorAmbience) {
    currentScene.lights[0].intensity = 0
    var myAnalyser = new BABYLON.Analyser(currentScene);
    BABYLON
        .Engine
        .audioEngine
        .connectToAnalyser(myAnalyser);
    myAnalyser.FFT_SIZE = 64;
    myAnalyser.SMOOTHING = 0.9;
    myAnalyser.drawDebugCanvas()
    currentScene.ambientPlaying = true
    
    // createRingcubes(10, 32, currentScene);
    // var t = 0.0;
    let counter = 0
    var popper = BABYLON.Mesh.CreateBox("popper", 0.5, currentScene);
    popper.isVisible = false
    var particleSystem = new BABYLON.ParticleSystem("explosion", 2000, currentScene);
    particleSystem.particleTexture = new BABYLON.Texture("Scenes/Assets/flare.png", currentScene);
    particleSystem.minSize = 0.2;
    particleSystem.maxSize = 0.7;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.6;
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
    particleSystem.minAngularSpeed = 2;
    particleSystem.maxAngularSpeed = Math.PI;
    particleSystem.emitter = popper
    particleSystem.direction1 = new BABYLON.Vector3(-3, -2, -3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 7, 7);  
    particleSystem.targetStopDuration = 0.25
    particleSystem.emitRate = 2000
    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
    light0.range = 200
    light0.intensity = 2;
    light0.parent = popper
    currentScene.registerBeforeRender(function () {

        fft = myAnalyser.getByteFrequencyData();
        // let btt = myAnalyser.getFloatFrequencyData();
        
        // Scale cubes according to music ! :)
        // here we multiply by 4 because we are working on a very little scene like (20x20x20)
        let sum = 0
        for (var i = 0; i < fft.length; i++) {
                sum += fft[i]
                // bar[i].scaling.z = fft[i] * 1;
        }
        let avg = Math.round(sum / fft.length)
        if (avg >= 3) {
            if (counter === 5){
                let nextPosition = randomPosition()
                popper.position = nextPosition
                let randColorStart = randColorArr[chance.integer({min:1 , max: 3})]()
                let randColorEnd = randColorArr[chance.integer({min:1 , max: 3})]()
                light0.diffuse = randColorEnd
                particleSystem.color1 = randColorStart
                particleSystem.colorDead = randColorEnd
                particleSystem.start();
                light0.setEnabled(1);
                // console.log(randColor)
                counter = 0
                setTimeout(function(){
                    light0.setEnabled(0)
                }, 250)
                // particleSystem.stop()
            }
            counter++
        }
        // console.log(btt)
    })
}
