/* global scene BABYLON CASTORGUI */

import { createArtistSpotify, getComposer } from './musicFunctions'
import { checkForPort } from './utilityFuncs'

// CastorGUI
let canvas = document.getElementById("renderCanvas");
let css = "button {cursor:pointer;} #textDialog{margin:6px}";
let options = { themeRoot: "./dist/", themeGUI: "default" };
let guisystem = new CASTORGUI.GUIManager(canvas, css, options);
let pickedCameraPosition, pickResult;

function createCastorGUI(composerData) {
  if (!composerData) return

  //store composer info
  let composerName = composerData.name;
  let composerDescription = composerData.description;
  let composerBirthday = 'Birth Date: ' + composerData.born + '<br />';
  let composerBirthCountry = 'Country of Birth: ' + composerData.birthCountry + '<br /><br />';
  let composerTime = 'Period: ' + composerData.timeperiod + '<br />';

  //GUI setup
  let GUIoptions = { w: window.innerWidth * .5, h: window.innerHeight * .75, x: guisystem.getCanvasSize().width * 0.3, y: guisystem.getCanvasSize().height * 0.2, heightTitle: 40, textTitle: composerName, titleFontSize: 22, colorContent: 'rgb(24, 24, 24)', backgroundColor: 'black', closeButton: null };

  let dialog = new CASTORGUI.GUIWindow("dialog", GUIoptions, guisystem);
  dialog.setVisible(true);

  let text = new CASTORGUI.GUIText("textDialog", { size: 20, color: 'white', police: 'Palatino Linotype', text: composerTime + composerBirthday + composerBirthCountry + composerDescription, centerHorizontal: true }, guisystem, false);
  dialog.add(text);

  //add spotify, takes in name & id to append player to
  createArtistSpotify(composerName, '#dialog_content')
}

//retrieve composer information & use info to create the GUI
export function createComposerGUI(evt) {
  if (scene.GUI) {
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
      .then((res) => createCastorGUI(res.data))
      .catch(console.error.bind(console))
    scene.GUI = true;
    pickedCameraPosition = Object.assign({}, scene.cameras[0].position)
  }
}

export function removeComposerGUI(event) {
  let keyCodes = event.keyCode === 87 || event.keyCode === 83 || event.keyCode === 65 || event.keyCode === 68 ||
    event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40;

  if (pickedCameraPosition && keyCodes) {

    let currentCameraPosition = scene.cameras[0].position
    let distanceAway = BABYLON.Vector3.Distance(pickedCameraPosition, currentCameraPosition)

    if (distanceAway > .5 && scene.GUI) {
      document.body.removeChild(document.getElementById("dialog"))
      scene.GUI = false
    }
  }
}
