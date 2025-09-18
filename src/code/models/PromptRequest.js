
//---------------------------------------------------------
export default class PromptRequest {

  model = null;
  prompt = null;
  stream = true;
  stop = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.model = options.model || this.model;
    this.prompt = options.prompt || this.prompt;
    this.stop = options.stop || this.stop;
  }

}