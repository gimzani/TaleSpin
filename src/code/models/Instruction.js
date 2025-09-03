//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Instruction {

  id = getKeyCode(6);
  name = '--';
  text = null;
  type = null;
  sortOrder = 0;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.text = options.text || this.text;
    this.type = options.type || this.type;
    this.sortOrder = parseInt(options.sortOrder) || this.sortOrder;
  }

}