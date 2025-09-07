//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class SceneBuffer {

  id = getKeyCode(12);
  description = null;                 // generated description
  header = null;                      // generated instructions and high-level summaries
  messages = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.description = options.description || this.description;
    this.header = options.header || this.header;
    this.messages = options.messages || this.messages;
  }

}