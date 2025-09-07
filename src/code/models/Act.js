//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
// The Act class models a summary of a set of chapters
//---------------------------------------------------------
export default class Act {

  id = getKeyCode(8);
  text = null;
  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.text = options.text || this.text;
  }

}