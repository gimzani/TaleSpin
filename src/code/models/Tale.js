//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Tale {

  id = getKeyCode(6);
  name = null;
  description = null;
  category = null;

  hero = null;
  characters = [];
  settings = [];  

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.category = options.category || this.category;

    this.hero = options.hero || this.hero;
    this.characters = options.characters || this.characters;
    this.settings = options.settings || this.settings;
  }

}