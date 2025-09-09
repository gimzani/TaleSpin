
import Memory from './Memory.js'
//---------------------------------------------------------
// Memories are used by the scene buffer to detail game objects
//---------------------------------------------------------
export default class MemoryBank {

  global = new Memory();
  hero = new Memory();
  characters = {};
  locations = {};  

  chatLog = [];
  
  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.global = options.global || this.global;
    this.hero = options.hero || this.hero;
    this.characters = options.characters || this.characters;
    this.locations = options.locations || this.locations;
    
    this.chatLog = options.chatLog || this.chatLog;
  }

}