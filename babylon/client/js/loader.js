var canvas = document.getElementById("renderCanvas");

// CastorGUI
var css = "button {cursor:pointer;} #textDialog{margin:6px}";
var options = { themeRoot: "./dist/", themeGUI: "default" };
var guisystem = new CASTORGUI.GUIManager(canvas, css, options);
var pickResult;
var pickedCameraPosition;

var sceneChecked;
var sceneLocation = "../Scenes/";

// Babylon
var engine = new BABYLON.Engine(canvas, true);
var scene;

let musicFileArray = ['beet', 'beet2', 'brahms', 'brahms2', 'dvorak', 'dvorak2', 'shost', 'shost2', 'shubert']

var loadAmbientMusic = function (currentScene) {
  if (!currentScene.ambientPlaying) {
    currentScene.ambientPlaying = true
    let newSong = chance.pickone(musicFileArray)
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, currentScene);
    particleSystem.particleTexture = new BABYLON.Texture("Scenes/Assets/flare.png", scene);
    particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;
    particleSystem.emitRate = 100;
    particleSystem.disposeOnStop = true;

    let ambientSong = new BABYLON.Sound("Music", "Assets/Music/" + newSong + ".wav", currentScene, function () {
      let newX = chance.floating({ min: -13, max: 22 })
      let newY = chance.floating({ min: 0.7, max: 10.7 })
      let newZ = chance.floating({ min: -9.6, max: 17 })

      ambientSong.setPosition(new BABYLON.Vector3(newX, newY, newZ))
      particleSystem.emitter = currentScene.getMeshByName("T1")

      let intervalTime = chance.integer({ min: 10000, max: 11000 })
      setTimeout(function () {
        ambientSong.play()
        particleSystem.start()
      }, intervalTime)
    }, { spatialSound: true })

    ambientSong.onended = function () {
      particleSystem.dispose()
      let intervalTime = chance.integer({ min: 10000, max: 11000 })
      currentScene.ambientPlaying = false
      setTimeout(function () { loadAmbientMusic(currentScene) }, intervalTime)
    }
  }
}


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

      //loading spotify files
      let fetchTracks = (albumId) => {
        return axios.get('https://api.spotify.com/v1/albums/' + albumId)
      }

      let searchAlbumsAndPlaySong = (query) => {
        axios.get('https://api.spotify.com/v1/search', {
          params: {
            q: query,
            type: 'album'
          }
        })
          .then(res => fetchTracks(res.data.albums.items[0].id))
          .then(album => album.data.tracks.items)
          .then(songs => new Audio(songs[0].preview_url))
          .then(audio => audio.play())
      }

      // searchAlbumsAndPlaySong('zappa')

      //adjusting frames shown
      let frames = scene.getMeshByName("T33")
      frames.isVisible = false

      let T1 = scene.getMeshByName("T1")
      let T2 = scene.getMeshByName("T2")
      let T3 = scene.getMeshByName("T3")

      T1.isVisible = false
      T2.isVisible = false
      T3.isVisible = false

      let T4 = scene.getMeshByName("T4")
      let T5 = scene.getMeshByName("T5")

      T4.isVisible = false
      T5.isVisible = false

      let T20 = scene.getMeshByName("T20")
      T20.isVisible = false
      let blackPlaques = scene.getMeshByName("Chassis table Corbu")
      blackPlaques.isVisible = false

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
  if (meshHit[0] === 'T' && !scene.GUI) {
    createGUI(pickResult);
    scene.GUI = true;
    pickedCameraPosition = Object.assign({}, scene.cameras[0].position)
  } else if (document.body.dialog) {
    scene.GUI = false;
  }
})

window.addEventListener("keydown", function(event){
  if( pickedCameraPosition && (event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 65 || event.keyCode === 68)){
    let currentCameraPosition = scene.cameras[0].position
    let distanceAway = BABYLON.Vector3.Distance(pickedCameraPosition, currentCameraPosition)
    if(distanceAway > 3){
      document.body.removeChild(document.getElementById("dialog"))
      scene.GUI = false
    }
  }
})



function createGUI(meshClicked) {
  var options = { w: 450, h: 300, x: guisystem.getCanvasSize().width * 0.35, y: guisystem.getCanvasSize().height * 0.25, backgroundColor: "#99ccff",  };
  var dialog = new CASTORGUI.GUIWindow("dialog", options, guisystem);
  dialog.setVisible(true);
  var text = new CASTORGUI.GUIText("textDialog", { size: 15, text: "hello, world!" }, guisystem, false);
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
