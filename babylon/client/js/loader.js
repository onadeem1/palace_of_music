/* global scene BABYLON */

//import files
import { createComposerGUI, removeComposerGUI } from './GUI.js';
import { checkKeyPressed } from './utilityFuncs.js';
import { loadScene, renderFunction } from './scene.js';
import { demo } from './demo.js';

//select canvas element
export let canvas = document.getElementById("renderCanvas");

// Babylon Engine & Scene
export let engine = new BABYLON.Engine(canvas, true);
let sceneLocation = '../Scenes/';

// Launch render loop
engine.runRenderLoop(renderFunction);

// Resize babylon engine when necessary
window.addEventListener('resize', engine.resize.bind(engine));

//Lock pointer if Q is pressed to move camera around 360 degrees
window.addEventListener('keydown', checkKeyPressed, false);

//create GUI on composer portrait click
window.addEventListener('click', createComposerGUI);

//remove GUI window when user walks away
window.addEventListener('keydown', removeComposerGUI);

//check & set scene mode
let mode = '';
if (demo.incremental) mode = '.incremental';
else if (demo.binary) mode = '.binary';

//toggle offline support
if (demo.offline) engine.enableOfflineSupport = true;
else engine.enableOfflineSupport = false;

//Load the scene!
loadScene(demo.scene, mode, sceneLocation, () => {
  BABYLON.StandardMaterial.BumpTextureEnabled = true;
  if (demo.collisions !== undefined) scene.collisionsEnabled = demo.collisions;
  if (demo.onload) demo.onload()
});
