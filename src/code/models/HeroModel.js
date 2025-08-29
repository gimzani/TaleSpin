//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class HeroModel {

  heroCode = getKeyCode(6);
  name = 'unkown';
  prompt = null;
  imageUrl = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.heroCode = options.heroCode || this.heroCode;
    this.name = options.name || this.name;
    this.prompt = options.prompt || this.prompt;
    this.imageUrl = options.imageUrl || this.imageUrl;
  }

}