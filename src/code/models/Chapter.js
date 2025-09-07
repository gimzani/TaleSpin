//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
// The Chapter class models a summary of a set of messages
//---------------------------------------------------------
export default class Chapter {

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