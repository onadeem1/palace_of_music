import { createArtistSpotify } from './musicFunctions'

// CastorGUI
let canvas = document.getElementById("renderCanvas");
let css = "button {cursor:pointer;} #textDialog{margin:6px}";
let options = { themeRoot: "./dist/", themeGUI: "default" };
let guisystem = new CASTORGUI.GUIManager(canvas, css, options);

export default function createGUI(composerData) {
  if (!composerData) return

  //store composer info
  let composerName = composerData.name;
  let composerDescription = composerData.description;
  let composerBirthday = 'Birth Date: ' + composerData.born + '<br />';
  let composerBirthCountry = 'Country of Birth: ' + composerData.birthCountry + '<br /><br />';
  let composerTime = 'Period: ' + composerData.timeperiod + '<br />';

  //GUI setup
  let options = { w: window.innerWidth * .5, h: window.innerHeight * .75, x: guisystem.getCanvasSize().width * 0.3, y: guisystem.getCanvasSize().height * 0.2, heightTitle: 40, textTitle: composerName, titleFontSize: 22, colorContent: 'rgb(24, 24, 24)', backgroundColor: 'black', closeButton: null };
  let dialog = new CASTORGUI.GUIWindow("dialog", options, guisystem);
  dialog.setVisible(true);
  let text = new CASTORGUI.GUIText("textDialog", { size: 20, color: 'white', police: 'Palatino Linotype', text: composerTime + composerBirthday + composerBirthCountry + composerDescription, centerHorizontal: true }, guisystem, false);
  dialog.add(text);

  //add spotify, takes in name & id to append player to
  createArtistSpotify(composerName, '#dialog_content')
}
