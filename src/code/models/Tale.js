//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Tale {

  id = getKeyCode(6);
  name = '--';
  description = null;

  hero = null
  characters = [];
  sceneBuffer = [];  

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
  }

}