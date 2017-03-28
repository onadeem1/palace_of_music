import { engine } from './loader.js'

let portraitArray = [
    'T29',
    'T30',
    'T32',
    'T41',
    'T35',
    'T28',
    'T27',
    'T31',
    'T6',
    'T11',
    'T42',
    'T43',
    'T44',
    'T45',
    'T34',
    'T7',
    'T8',
    'T9',
    'T10',
    'T12',
    'T36',
    'T37',
    'T38',
    'T39',
    'T40',
    'T13',
    'T25',
    'T26'
]


export function checkForPort(input){
    return portraitArray.includes(input)
}

export const checkKeyPressed = e => {
  switch (e.keyCode) {
    case 81:
      if (engine.isPointerLock == false) {
        engine.isPointerLock = true;
      } else if (engine.isPointerLock == true) {
        engine.isPointerLock = false;
        scene.activeCamera.inputs.attached.mouse.previousPosition = null
      }
      break;
  }
}
