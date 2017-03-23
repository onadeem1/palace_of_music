'use strict';

// Load Chance
var Chance = require('chance');

// Instantiate Chance so it can be used
var chance = new Chance();

let musicFileArray = {
    'T29': ['beet', 'beet2'],
    'T30': ['brahms', 'brahms2'],
    'T32': ['dvorak', 'dvorak2'],
    'T41': ['shost', 'shost2'],
    'T35': ['shubert'],
    'T28': ['mozart'],
    'T27': ['tchaik'],
    'T31': ['chopin'],
    'T6': ['pachelbel'],
    'T11': ['haydn'],
    'T42': ['saint-saens']
}

function getCoords(input){
    switch (input){
        case 'T29':
            return {x: 6.6, y: 2.5, z: -3.4}
        case 'T30':
            return {x: 0.2, y: 1.5, z: -3.4}
        case 'T32':
            return {x: -6, y: 1.5, z: -3.6}
        case 'T41':
            return {x: 4.2, y: 4.6, z: 14.3}
        case 'T35':
            return {x: -6, y: 1.7, z: 1.1}
        case 'T28':
            return {x: 12.6, y: 1.4, z: -0.5}
        case 'T27':
            return {x: 8.5, y: 1.5, z: 0.7}
        case 'T31':
            return {x: -2.9, y: 1.1, z: -2.5}
        case 'T6':
            return {x: -6.6, y: 1.1, z: 11.9}
        case 'T11':
            return {x: 3.9, y: 1.3, z: 14.4}
        case 'T42':
            return {x: 1.2, y:4.3, z: 14.2}
    }
}

export default function loadAmbientMusic (currentScene, outdoorAmbience) {

  if (!currentScene.ambientPlaying) {

    currentScene.ambientPlaying = true
    let newSpawnPoint = chance.pickone(Object.keys(musicFileArray))
    let songFromPoint = chance.pickone(musicFileArray[newSpawnPoint])
    let coordinates = getCoords(newSpawnPoint)

    var spawner = BABYLON.Mesh.CreateBox("fountain", 1.0, currentScene);
    spawner.position = new BABYLON.Vector3(coordinates.x, coordinates.y, coordinates.z)
    spawner.isVisible = false

    var note1Particle = new BABYLON.ParticleSystem("particles", 1000, currentScene);
    note1Particle.particleTexture = new BABYLON.Texture("Scenes/Assets/note1.png", currentScene);
    note1Particle.minSize = 0.1;
    note1Particle.maxSize = 0.2;
    note1Particle.minLifeTime = 0.3;
    note1Particle.maxLifeTime = 2.5;
    note1Particle.emitRate = 50;
    note1Particle.color1 = new BABYLON.Color4(1, 0.0784314, 0.576471, 1.0);
    note1Particle.color2 = new BABYLON.Color4(0.580392, 0, 0.827451, 1.0);
    note1Particle.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    note1Particle.direction1 = new BABYLON.Vector3(0, 0, 0);
    note1Particle.direction2 = new BABYLON.Vector3(-3, 0.5, -1);
    note1Particle.disposeOnStop = true;

    var note2Particle = new BABYLON.ParticleSystem("particles1", 1000, currentScene);
    note2Particle.particleTexture = new BABYLON.Texture("Scenes/Assets/note2.png", currentScene);
    note2Particle.minSize = 0.1;
    note2Particle.maxSize = 0.2;
    note2Particle.minLifeTime = 0.3;
    note2Particle.maxLifeTime = 2.5;
    note2Particle.emitRate = 50;
    note2Particle.color1 = new BABYLON.Color4(0, 1, 0, 1.0);
    note2Particle.color2 = new BABYLON.Color4(0.678431, 1, 0.184314, 1.0);
    note2Particle.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
    note2Particle.direction1 = new BABYLON.Vector3(0, 0, 0);
    note2Particle.direction2 = new BABYLON.Vector3(-3, 0.5, -1);
    note2Particle.disposeOnStop = true;
    var myAnalyser = new BABYLON.Analyser(currentScene);
            BABYLON.Engine.audioEngine.connectToAnalyser(myAnalyser);
            myAnalyser.FFT_SIZE = 512;
            myAnalyser.SMOOTHING = 0.9;
    let ambientSong = new BABYLON.Sound("Music", "Assets/Music/" + songFromPoint + ".wav", currentScene, function () {
        let intervalTime = chance.integer({ min:2000, max: 2500 })
        setTimeout(function () {
            ambientSong.attachToMesh(spawner)
            ambientSong.play()
            note1Particle.start()
            note2Particle.start()
            note1Particle.emitter = spawner
            note2Particle.emitter = spawner
            outdoorAmbience.setVolume(0.01)
            myAnalyser.drawDebugCanvas()
    }, intervalTime)
    }, { spatialSound: true , distanceModel: 'exponential', panningModel: 'equalpower'})

    ambientSong.onended = function () {
      note1Particle.dispose()
      note2Particle.dispose()
      let intervalTime = chance.integer({ min: 2000, max: 2500 })
      currentScene.ambientPlaying = false
      outdoorAmbience.setVolume(0.01)
      myAnalyser.dispose()
      setTimeout(function () { loadAmbientMusic(currentScene, outdoorAmbience) }, intervalTime)
    }
  }
}
