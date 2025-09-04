//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import Outfit from './Outfit.js'
//---------------------------------------------------------
// The Hero is the protagonist in the story - he is also the 'user'.
// They have a set of outfits.
//  - Outfits are collections of clothing items that can be worn  
//---------------------------------------------------------
//---------------------------------------------------------
export default class Hero {

  id = getKeyCode(6);
  name = '--';
  description = null;
  outfits = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.outfits = options.outfits ? options.outfits.map(o => new Outfit(o)) : this.outfits;
  }

}