//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Location {

  id = getKeyCode(6);
  name = null;
  description = null;
  genre = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.genre = options.genre || this.genre;
    this.description = options.description || this.description;
  }

}