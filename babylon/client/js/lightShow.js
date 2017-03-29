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


// const randomPositionSphere = function () {
//     return new BABYLON.Vector3(chance.floating({min: -6, max: 2}), chance.floating({min: 0.4, max: 4.6}), chance.floating({min: 2, max: 9}))
// }
// function spawnThings(currentScene) {
//     // var sphere = BABYLON
//     //     .Mesh
//     //     .CreateSphere("sphere1", 2, 0.5, currentScene);
//     // sphere.position = new BABYLON.Vector3(-5.6, 2, 5)
//     // sphere.emissiveColor = randColorArr[1]()
//     // sphere.isVisible = false
//     // for (var i = 0; i < 16; i++) {
//     //     let newInstance = sphere.createInstance('sphere_' + i)
//     //     newInstance.position = randomPosition()
//     //     newInstance.scaling.x = sphere.scaling.x += (i / 100)
//     //     newInstance.scaling.y = sphere.scaling.y += (i / 100)
//     //     newInstance.scaling.z = sphere.scaling.z += (i / 100)
//     //     // var light1 = new BABYLON.PointLight("point_light_" + i, newInstance.position, currentScene);
//     //     // // newInstance.childLight = light1
//     //     // light1.intensity = (i / 16)
//     //     // light1.diffuse = randColorArr[chance.integer({min: 1, max: 3})]()
//     //     sphereArray.push(newInstance)
//     // }
//     var ms = BABYLON
//         .Mesh
//         .CreateBox("skyBoxer", 0.5, currentScene); // create needed mesh
//     ms.position = new BABYLON.Vector3(-6, 15, -9)
//     ms.material = new BABYLONX.ShaderBuilder() // make Inistance
//         .InLine('discard;')
//         .BuildMaterial(currentScene);
//     for (var i = -0; i < 17; i++) {

//         for (var j = -0; j < 17; j++) {

//             var mm = ms.clone();
//             mm.position.x = (i % 2 == 0
//                 ? i
//                 : -i) * 1 + 1 * (Math.abs(i / 8) / i);
//             mm.position.z = (j % 2 == 0
//                 ? j
//                 : -j) * 1 - 1 * (Math.abs(j / 8) / j);
//             mm.material = new BABYLONX.ShaderBuilder() // make Inistance
//                 .SetUniform('ip1', 'vec3')
//                 .VertexShader('result = vec4( pos*(1.+ip1.x)+vec3(0.,pow(5.*ip1.x*pos.y,3.)/63.,0.),1.);')
//                 .InLine('result = vec4( ip1.x, 0.,1.-min(1.,max(0.,' + BABYLONX.Shader.Print(i / 20) + '))*(1.-pow(ip1.x,3.)*30.),1. );') // Make Solid Color for Result
//                 .BuildMaterial(currentScene); // Make ShaderMaterial

//             mesh.push(mm);
//         }
//     }
// }


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
