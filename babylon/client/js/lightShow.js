'use strict';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

const randColorArr = {

    1: function () {
        return new BABYLON.Color3(1, chance.floating({min: 0, max: 1}), chance.floating({min: 0, max: 1}))
    },
    2: function () {
        return new BABYLON.Color3(chance.floating({min: 0, max: 1}), 1, chance.floating({min: 0, max: 1}))
    },
    3: function () {
        return new BABYLON.Color3(chance.floating({min: 0, max: 1}), chance.floating({min: 0, max: 1}), 1)
    }
}

const randomPosition = function () {
    return new BABYLON.Vector3(chance.floating({min: -10.5, max: 11.5}), chance.floating({min: 0.4, max: 4.6}), chance.floating({min: -3, max: 13.5}))
}

let sphereArray = [];

export default function lightShow(currentScene) {
    let fft;
    currentScene.lights[0].intensity = 0
    var myAnalyser = new BABYLON.Analyser(currentScene);
    BABYLON
        .Engine
        .audioEngine
        .connectToAnalyser(myAnalyser);
    myAnalyser.FFT_SIZE = 64;
    myAnalyser.SMOOTHING = 0.9;
    let counter = 0
    var popper = BABYLON
        .Mesh
        .CreateBox("popper", 0.5, currentScene);
    popper.isVisible = false
    var particleSystem = new BABYLON.ParticleSystem("explosion", 2000, currentScene);
    particleSystem.particleTexture = new BABYLON.Texture("Scenes/Assets/flare.png", currentScene);
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.4;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 0.6;
    particleSystem.gravity = new BABYLON.Vector3(0, -7, 0);
    particleSystem.minAngularSpeed = 2;
    particleSystem.maxAngularSpeed = Math.PI;
    particleSystem.emitter = popper
    particleSystem.direction1 = new BABYLON.Vector3(-3, -2, -3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 7, 7);
    particleSystem.targetStopDuration = 0.25
    particleSystem.emitRate = 2000
    var light0 = new BABYLON.PointLight("Omni2", new BABYLON.Vector3(1, 10, 1), currentScene);
    light0.setEnabled(0)
    light0.range = 200
    light0.intensity = 2;
    light0.parent = popper
    currentScene.registerBeforeRender(function () {
        fft = myAnalyser.getByteFrequencyData();
        let sum = 0
        for (var i = 0; i < fft.length; i++) {
            sum += fft[i]
        }
        for (var i = 0; i < sphereArray.length; i++) {
            sphereArray[i].scaling.x = fft[i] / 75;
            sphereArray[i].scaling.y = fft[i] / 75;
            sphereArray[i].scaling.z = fft[i] / 75;
            sphereArray[i].childLight.intensity = fft[i] / 255;

        }
        let avg = Math.round(sum / fft.length)
        if (avg >= 3) {
            console.log(avg)
            if (counter > 35) {

                let nextPosition = randomPosition()
                popper.position = nextPosition
                let randColorStart = randColorArr[chance.integer({min: 1, max: 3})]()
                let randColorEnd = randColorArr[chance.integer({min: 1, max: 3})]()
                light0.diffuse = randColorEnd
                particleSystem.color1 = randColorStart
                particleSystem.colorDead = randColorEnd
                particleSystem.start();
                light0.setEnabled(1);
                counter = 0
                setTimeout(function () {
                    light0.setEnabled(0)
                }, 250)
            }
            counter++
            console.log(counter)
        }
    })
}
