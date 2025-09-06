
//---------------------------------------------------------
export default class Prompt {

  role = null;
  content = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.role = options.role || this.role;
    this.content = options.content || this.content;
  }

}