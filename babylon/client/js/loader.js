/******SCENE IS ON GLOBAL ******/

//import files
import $ from 'jquery'
import { searchAlbumsAndPlaySong, getComposer} from './musicFunctions.js'
import loadAmbientMusic from './ambientMusic.js'
import lightShow from './lightShow.js'
import checkForPort from './checkForPort.js'
import createGUI from './GUI.js'


//select canvas
let canvas = document.getElementById("renderCanvas");

let pickResult;
let pickedCameraPosition;

let sceneChecked;
let sceneLocation = "../Scenes/";

//declare demo to load
let demo = {

  scene: "Espilit",
  incremental: false,
  binary: true,
  doNotUseCDN: false,
  collisions: true,
  offline: false,
  onload: function () {
    scene.autoClear = true;
    scene.createOrUpdateSelectionOctree();
    scene.getMeshByName("Sol loin").useVertexColors = false;
    scene.GUI = false;
    scene.ambientPlaying = false
    var postProcess = new BABYLON.RefractionPostProcess("Refraction", "/scenes/customs/refMap.jpg", new BABYLON.Color3(1.0, 1.0, 1.0), 0.5, 0.5, 1.0, scene.cameras[1]);
  }
};

// Babylon
let engine = new BABYLON.Engine(canvas, true);
let musicFileArray = ['beet', 'beet2', 'brahms', 'brahms2', 'dvorak', 'dvorak2', 'shost', 'shost2', 'shubert']

export const loadScene = function (name, incremental, sceneLocation, then) {
  sceneChecked = false;
  BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;

  engine.resize();

  var dlCount = 0;
  BABYLON.SceneLoader.Load(sceneLocation + name + "/", name + incremental + ".babylon", engine, function (newScene) {

    scene = newScene;
    scene.executeWhenReady(function () {
      canvas.style.opacity = 1;
      if (scene.activeCamera) {
        scene.activeCamera.attachControl(canvas);
        scene.activeCamera.speed = 0.5

        if (newScene.activeCamera.keysUp) {
          newScene.activeCamera.keysUp.push(87); // W
          newScene.activeCamera.keysDown.push(83); // S
          newScene.activeCamera.keysLeft.push(65); // A
          newScene.activeCamera.keysRight.push(68); // D
        }
      }


      var outdoorAmbience = new BABYLON.Sound('outdoorAmbience', 'Assets/outdoors.wav', scene, function(){
        outdoorAmbience.setVolume(0.04)
        outdoorAmbience.play()
      }, { loop: true, autoplay: true });
      loadAmbientMusic(scene, outdoorAmbience)

      let text1 = scene.getMeshByName("Text01")
      let text2 = scene.getMeshByName("Text02")
      text1.isVisible = false
      text2.isVisible = false

      if (then) {
        then();
      }
    });
  }, function (evt) {

    if (evt.lengthComputable) {
      engine.loadingUIText = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";

    } else {

      dlCount = evt.loaded / (1024 * 1024);
      engine.loadingUIText = "Loading, please wait..." + Math.floor(dlCount * 100.0) / 100.0 + " MB already loaded.";
    }
  });

  canvas.style.opacity = 0;
};

// Render loop
var renderFunction = function () {

  // Render scene
  if (scene) {
    if (!sceneChecked) {
      var remaining = scene.getWaitingItemsCount();
      engine.loadingUIText = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
    }

    scene.render();

    // Streams
    if (scene.useDelayedTextureLoading) {
      var waiting = scene.getWaitingItemsCount();
      if (waiting > 0) {
        status.innerHTML = "Streaming items..." + waiting + " remaining";
      } else {
        status.innerHTML = "";
      }
    }
  }
};

// Launch render loop

engine.runRenderLoop(renderFunction);

// Resize
window.addEventListener("resize", function () {
  engine.resize();
});


var checkKeyPressed = e => {
  switch(e.keyCode) {
    case 81:
    if (engine.isPointerLock == false){
      engine.isPointerLock = true;
    } else if (engine.isPointerLock == true){
      engine.isPointerLock = false;
      scene.activeCamera.inputs.attached.mouse.previousPosition = null
    }
    break;
  }
}

window.addEventListener("keydown", checkKeyPressed, false);
//Lock pointer if Q is pressed

// Listen for Click
window.addEventListener("click", function (evt) {
  if(scene.GUI){
    document.body.removeChild(document.getElementById("dialog"))
    scene.GUI = false;
    return
  }
  pickResult = scene.pick(scene.pointerX, scene.pointerY)
  const meshHit = pickResult.pickedMesh.name;
  if (pickResult.distance > 3) {
    return
  }
  if (checkForPort(meshHit) && !scene.GUI) {
    getComposer(meshHit)
      .then((res) => createGUI(res.data))
      .catch(console.log('there was a fuck up'))
    scene.GUI = true;
    pickedCameraPosition = Object.assign({}, scene.cameras[0].position)
  }
})

window.addEventListener("keydown", function (event) {
  let keyCodes = event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 65 || event.keyCode === 68 ||
  event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40;

  if (pickedCameraPosition && keyCodes){
    let currentCameraPosition = scene.cameras[0].position
    let distanceAway = BABYLON.Vector3.Distance(pickedCameraPosition, currentCameraPosition)
    if (distanceAway > .5 && scene.GUI){
      document.body.removeChild(document.getElementById("dialog"))
      scene.GUI = false
    }
  }
})



var mode = "";
if (demo.incremental) {
  mode = ".incremental";
} else if (demo.binary) {
  mode = ".binary";
}

if (demo.offline) {
  engine.enableOfflineSupport = true;
}
else {
  engine.enableOfflineSupport = false;
}

loadScene(demo.scene, mode, sceneLocation, function () {
  BABYLON.StandardMaterial.BumpTextureEnabled = true;
  if (demo.collisions !== undefined) {
    scene.collisionsEnabled = demo.collisions;
  }

  if (demo.onload) {
    demo.onload();
  }

});
