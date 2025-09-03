
//---------------------------------------------------------
export default class Outfit {

  name = '--';
  text = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.name = options.name || this.name;
    this.text = options.text || this.text;
  }

}