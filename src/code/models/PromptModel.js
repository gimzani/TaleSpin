//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class PromptModel {

  promptCode = getKeyCode(6);
  name = null;
  prompt = null;
  sortOrder = 0;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.promptCode = options.promptCode || this.promptCode;
    this.name = options.name || this.name;
    this.prompt = options.prompt || this.prompt;
    this.sortOrder = parseInt(options.sortOrder) || this.sortOrder;
  }

}