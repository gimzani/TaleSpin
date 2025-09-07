//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import Outfit from './Outfit.js'
//---------------------------------------------------------
// The Character in play is the character's current game state
//---------------------------------------------------------
export default class CharacterInPlay {

  id = getKeyCode(6);
  name = null;
  description = null;
  memories = [];        // important information to remember
  outfits = [];

  assertive = 0.5;
  affinity = 0.5;
  wearing = null;
  earshot = false;
  active = false;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.outfits = options.outfits ? options.outfits.map(o => new Outfit(o)) : this.outfits;
    
    this.assertive = parseFloat(options.assertive) || this.assertive;
    this.affinity = parseFloat(options.affinity) || this.affinity;
    this.wearing = options.wearing || this.wearing;
    this.earshot = !!options.earshot ? options.earshot : this.earshot;
    this.active = !!options.active ? options.active : this.active;
    
  }

}