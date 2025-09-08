
//---------------------------------------------------------
export default class Prompt {

  model = null;
  messages = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.model = options.model || this.model;
    this.messages = options.messages || this.messages;
  }

}