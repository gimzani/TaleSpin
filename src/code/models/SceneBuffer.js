//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class SceneBuffer {

  id = getKeyCode(6);
  setting = null;
  header = null;                      // generated instructions and high-level summaries
  messages = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.setting = options.setting || this.setting;
    this.header = options.header || this.header;
    this.messages = options.messages || this.messages;
  }

}