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
        scene.activeCamera.speed = 0.075

        if (newScene.activeCamera.keysUp) {
          newScene.activeCamera.keysUp.push(87); // W
          newScene.activeCamera.keysDown.push(83); // S
          newScene.activeCamera.keysLeft.push(65); // A
          newScene.activeCamera.keysRight.push(68); // D
        }

        //create custom rotation for camera
        var FreeCameraKeyboardRotateInput = function () {
          this._keys = [];
          this.keysLeft = [82];
          this.keysRight = [69];
          this.sensibility = 0.0015;
        }

        // Hooking keyboard events
        FreeCameraKeyboardRotateInput.prototype.attachControl = function (element, noPreventDefault) {
          var _this = this;
          if (!this._onKeyDown) {
            element.tabIndex = 1;
            this._onKeyDown = function (evt) {
              if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                _this.keysRight.indexOf(evt.keyCode) !== -1) {
                var index = _this._keys.indexOf(evt.keyCode);
                if (index === -1) {
                  _this._keys.push(evt.keyCode);
                }
                if (!noPreventDefault) {
                  evt.preventDefault();
                }
              }
            };
            this._onKeyUp = function (evt) {
              if (_this.keysLeft.indexOf(evt.keyCode) !== -1 ||
                _this.keysRight.indexOf(evt.keyCode) !== -1) {
                var index = _this._keys.indexOf(evt.keyCode);
                if (index >= 0) {
                  _this._keys.splice(index, 1);
                }
                if (!noPreventDefault) {
                  evt.preventDefault();
                }
              }
            };

            element.addEventListener("keydown", this._onKeyDown, false);
            element.addEventListener("keyup", this._onKeyUp, false);
            BABYLON.Tools.RegisterTopRootEvents([
              { name: 'blur', handler: this._onLostFocus }
            ]);
          }
        };

        // This function is called by the system on every frame
        FreeCameraKeyboardRotateInput.prototype.checkInputs = function () {
          if (this._onKeyDown) {
            var camera = this.camera;
            // Keyboard
            for (var index = 0; index < this._keys.length; index++) {
              var keyCode = this._keys[index];
              if (this.keysLeft.indexOf(keyCode) !== -1) {
                camera.cameraRotation.y += this.sensibility;
              }
              else if (this.keysRight.indexOf(keyCode) !== -1) {
                camera.cameraRotation.y -= this.sensibility;
              }
            }
          }
        };
        FreeCameraKeyboardRotateInput.prototype.getTypeName = function () {
          return "FreeCameraKeyboardRotateInput";
        };
        FreeCameraKeyboardRotateInput.prototype._onLostFocus = function (e) {
          this._keys = [];
        };
        FreeCameraKeyboardRotateInput.prototype.getSimpleName = function () {
          return "keyboardRotate";
        };

        // Connect to camera:
        newScene.activeCamera.inputs.add(new FreeCameraKeyboardRotateInput());
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
