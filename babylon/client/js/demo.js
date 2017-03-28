/* global scene BABYLON */

//declare demo to load
export let demo = {
  scene: 'Espilit',
  incremental: false,
  binary: true,
  doNotUseCDN: false,
  collisions: true,
  offline: false,
  onload: function () {
    scene.autoClear = true;
    scene.createOrUpdateSelectionOctree();
    scene.getMeshByName('Sol loin').useVertexColors = false;
    scene.GUI = false;
    scene.ambientPlaying = false
    let postProcess = new BABYLON.RefractionPostProcess('Refraction', '/scenes/customs/refMap.jpg', new BABYLON.Color3(1.0, 1.0, 1.0), 0.5, 0.5, 1.0, scene.cameras[1]);
  }
};
