//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Setting {

  id = getKeyCode(6);
  name = null;
  description = null;
  category = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.category = options.category || this.category;
    this.description = options.description || this.description;
  }

}