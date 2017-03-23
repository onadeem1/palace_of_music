/******SCENE IS ON GLOBAL ******/

//import files
import { searchAlbumsAndPlaySong, getComposer } from './musicFunctions.js'
import loadAmbientMusic from './ambientMusic.js'

//select canvas
let canvas = document.getElementById("renderCanvas");

// CastorGUI
let css = "button {cursor:pointer;} #textDialog{margin:6px}";
let options = { themeRoot: "./dist/", themeGUI: "default" };
let guisystem = new CASTORGUI.GUIManager(canvas, css, options);
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
        scene.gravity.scaleInPlace(0.5);
        scene.GUI = false;
        scene.ambientPlaying = false
        var postProcess = new BABYLON.RefractionPostProcess("Refraction", "/scenes/customs/refMap.jpg", new BABYLON.Color3(1.0, 1.0, 1.0), 0.5, 0.5, 1.0, scene.cameras[1]);
    }
};

// Babylon
let engine = new BABYLON.Engine(canvas, true);

let musicFileArray = ['beet', 'beet2', 'brahms', 'brahms2', 'dvorak', 'dvorak2', 'shost', 'shost2', 'shubert']

var loadScene = function (name, incremental, sceneLocation, then) {
  sceneChecked = false;
  BABYLON.SceneLoader.ForceFullSceneLoadingForIncremental = true;

  engine.resize();

  var dlCount = 0;
  BABYLON.SceneLoader.Load(sceneLocation + name + "/", name + incremental + ".babylon", engine, function (newScene) {

    scene = newScene;
    var loader = new BABYLON.AssetsManager(scene);
    var piano = loader.addMeshTask("piano", "", "Assets/Piano/", "rescaledpiano.obj");

    loader.load()

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

     var outdoorAmbience = new BABYLON.Sound('outdoorAmbience', 'Assets/outdoors.wav', scene, function(){
          outdoorAmbience.setVolume(0.15)
          outdoorAmbience.play()
        }, { loop: true, autoplay: true });
        loadAmbientMusic(scene, outdoorAmbience)

      //adjusting frames shown
      // let frames = scene.getMeshByName("T33")
      // frames.isVisible = false

      // let T1 = scene.getMeshByName("T1")
      // let T2 = scene.getMeshByName("T2")
      // let T3 = scene.getMeshByName("T3")

      // T1.isVisible = false
      // T2.isVisible = false
      // T3.isVisible = false

      // let T4 = scene.getMeshByName("T4")
      // let T5 = scene.getMeshByName("T5")

      // T4.isVisible = false
      // T5.isVisible = false

      // let T20 = scene.getMeshByName("T20")
      // T20.isVisible = false
      // let blackPlaques = scene.getMeshByName("Chassis table Corbu")
      // blackPlaques.isVisible = false

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

// Listen for Click

window.addEventListener("click", function () {
  pickResult = scene.pick(scene.pointerX, scene.pointerY)
  const meshHit = pickResult.pickedMesh.name;

  if (pickResult.distance > 3) {
    return
  }

  console.log('mesh name', meshHit)

  if (meshHit[0] === 'T' && !scene.GUI) {
    getComposer(meshHit)
    .then((res) => createGUI(res.data));
    scene.GUI = true;
    pickedCameraPosition = Object.assign({}, scene.cameras[0].position)
  } else if (document.body.dialog) {
    scene.GUI = false;
  }
})

window.addEventListener("keydown", function(event){
  let keyCodes = event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 65 || event.keyCode === 68 ||
  event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40;

   if (pickedCameraPosition && keyCodes){
     let currentCameraPosition = scene.cameras[0].position
     let distanceAway = BABYLON.Vector3.Distance(pickedCameraPosition, currentCameraPosition)
     if (distanceAway > 3 && scene.GUI){
       document.body.removeChild(document.getElementById("dialog"))
       scene.GUI = false
     }
   }
 })

function createGUI(composerData) {
  let composerName = composerData.name;
  let composerDescription = composerData.description;
  let composerBirthday = composerData.born + '<br>';
  let composerBirthCountry = composerData.birthCountry + '<br>';
  let composerTime = composerData.timeperiod + '<br>';
  let options = { w: 500, h: 600, x: guisystem.getCanvasSize().width * 0.68, y: guisystem.getCanvasSize().height * 0.1, textTitle: composerName, colorContent: 'white' };
  let dialog = new CASTORGUI.GUIWindow("dialog", options, guisystem);
  dialog.setVisible(true);
  let text = new CASTORGUI.GUIText("textDialog", { size: 15, text: [composerTime, composerBirthday, composerBirthCountry, composerDescription], centerHorizontal:true }, guisystem, false);
  // var textfield = new CASTORGUI.GUITextfield("mytextfield ", { x: 20, y: 100, zIndex: 5, w:100, h:25, placeholder:"Your text here" }, guisystem);
  dialog.add(text);
}

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

  for (var index = 0; index < scene.cameras.length; index++) {
    var camera = scene.cameras[index];
    var option = new Option();
    option.text = camera.name;
    option.value = camera;

    if (camera === scene.activeCamera) {
      option.selected = true;
    }
  }
});
