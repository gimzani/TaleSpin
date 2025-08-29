//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class CharacterModel {

  characterCode = getKeyCode(6);
  name = 'unkown';
  prompt = null;
  imageUrl = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.characterCode = options.characterCode || this.characterCode;
    this.name = options.name || this.name;
    this.prompt = options.prompt || this.prompt;
    this.imageUrl = options.imageUrl || this.imageUrl;
  }

}