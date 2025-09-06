//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import Outfit from './Outfit.js'
//---------------------------------------------------------
// The Character is the supporting person in the story.
// They have a set of memories and outfits.
//  - Memories are important information to remember
//  - Outfits are collections of clothing items that can be worn  
//---------------------------------------------------------
export default class Character {

  id = getKeyCode(6);
  name = null;
  description = null;
  category = null;
  memories = [];        // important information to remember
  outfits = [];

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.category = options.category || this.category;
    this.outfits = options.outfits ? options.outfits.map(o => new Outfit(o)) : this.outfits;
  }

}