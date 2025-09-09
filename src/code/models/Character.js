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
  genre = null;

  memories = [];        // important information to remember

  outfits = [];
  wearing = null;
  
  earshot = false;
  active = false;
  assertive = 0.5;
  affinity = 0.5;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.genre = options.genre || this.genre;
    
    this.memories = options.memories || this.memories;

    this.outfits = options.outfits ? options.outfits.map(o => new Outfit(o)) : this.outfits;
    this.wearing = options.wearing || this.wearing;
    
    this.earshot = options.earshot || this.earshot;
    this.active = options.active || this.active;    
    this.assertive = options.assertive || this.assertive;
    this.affinity = options.affinity || this.affinity;

  }

}