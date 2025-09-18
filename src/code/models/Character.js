//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
// The Character is the supporting person in the story.
// They have a set of memories and outfits.
//  - Memories are important information to remember
//  - Outfits are collections of clothing items that can be worn  
//---------------------------------------------------------
export default class Character {

  id = getKeyCode(6);
  name = null;
  fullName = null;
  otherNames = null;
  genre = null;

  appearance = null;
  personality = null;
  details = null;
  
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
    this.fullName = options.fullName || this.fullName;
    this.otherNames = options.otherNames || this.otherNames;
    this.genre = options.genre || this.genre;

    this.appearance = options.appearance || this.appearance;
    this.personality = options.personality || this.personality;
    this.details = options.details || this.details;
        
    this.earshot = options.earshot || this.earshot;
    this.active = options.active || this.active;    
    this.assertive = options.assertive || this.assertive;
    this.affinity = options.affinity || this.affinity;

  }

}