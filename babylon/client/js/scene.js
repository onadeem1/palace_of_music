/* global scene: true BABYLON */

import { engine, canvas } from './loader.js'
import loadAmbientMusic from './ambientMusic.js'

let sceneChecked;

export const loadScene = function (name, incremental, sceneLocation, then) {
  engine.resize();
  sceneChecked = false;
  let dlCount = 0;

  BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;
  BABYLON.SceneLoader.Load(sceneLocation + name + "/", name + incremental + ".babylon", engine, function (newScene) {
    scene = newScene;
    scene.executeWhenReady(function () {
      canvas.style.opacity = 1;
      if (scene.activeCamera) {
        scene.activeCamera.attachControl(canvas);
        scene.activeCamera.speed = 0.1

        if (newScene.activeCamera.keysUp) {
          newScene.activeCamera.keysUp.push(87); // W
          newScene.activeCamera.keysDown.push(83); // S
          newScene.activeCamera.keysLeft.push(65); // A
          newScene.activeCamera.keysRight.push(68); // D
        }
      }

      let outdoorAmbience = new BABYLON.Sound('outdoorAmbience', 'Assets/outdoors.wav', scene, function () {
        outdoorAmbience.setVolume(0.01)
        outdoorAmbience.play()
      }, { loop: true, autoplay: true });
      loadAmbientMusic(scene, outdoorAmbience)

      let text1 = scene.getMeshByName("Text01")
      let text2 = scene.getMeshByName("Text02")
      text1.isVisible = false
      text2.isVisible = false
      if (then) then();
    });
  }, (evt) => {
    if (evt.lengthComputable) {

      engine.loadingUIText = "Loading, please wait..." + (evt.loaded * 100 / evt.total).toFixed() + "%";

    } else {

      dlCount = evt.loaded / (1024 * 1024);
      engine.loadingUIText = "Loading, please wait..." + Math.floor(dlCount * 100.0) / 100.0 + " MB already loaded.";
    }
  });
  canvas.style.opacity = 0;
};

// Render Function
export const renderFunction = () => {
  // Render scene
  if (scene) {
    if (!sceneChecked) {
      let remaining = scene.getWaitingItemsCount();
      engine.loadingUIText = "Streaming items..." + (remaining ? (remaining + " remaining") : "");
    }
    scene.render();

    // Streams
    if (scene.useDelayedTextureLoading) {
      let waiting = scene.getWaitingItemsCount();
      if (waiting > 0) status.innerHTML = 'Streaming items...' + waiting + ' remaining';
      else status.innerHTML = '';
    }
  }
};
