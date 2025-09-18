//---------------------------------------------------------
export default class Instruction {

  id = null;
  name = null;
  text = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.text = options.text || this.text;
  }

}