//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
// The Scenario class models a single scenario for user selection
//---------------------------------------------------------
export default class Scenario {

  id = getKeyCode(6);
  name = null;
  text = null;
  genre = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.text = options.text || this.text;
    this.genre = options.genre || this.genre;
  }

}