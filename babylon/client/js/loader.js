/******SCENE IS ON GLOBAL ******/

//import files
import $ from 'jquery'
import loadAmbientMusic from './ambientMusic.js'
import {createComposerGUI, removeComposerGUI} from './GUI.js'
import { checkKeyPressed } from './utilityFuncs.js'

//select canvas
let canvas = document.getElementById("renderCanvas");

// Babylon Engine
export let engine = new BABYLON.Engine(canvas, true);

//scene
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


      var outdoorAmbience = new BABYLON.Sound('outdoorAmbience', 'Assets/outdoors.wav', scene, function () {
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

//Lock pointer if Q is pressed to move camera around 360 degrees
window.addEventListener("keydown", checkKeyPressed, false);

//create GUI on composer portrait click
window.addEventListener("click", createComposerGUI )

//remove GUI window when user walks away
window.addEventListener("keydown", removeComposerGUI)

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
