//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import MemoryBank from './MemoryBank.js'
import Memory from './Memory.js'
//---------------------------------------------------------
export default class Session {

  id = getKeyCode(6);
  memoryBank = new MemoryBank();

  activeCharacter = null;
  activeLocation = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.memoryBank = options.memoryBank || this.memoryBank;
    
    this.activeCharacter = options.activeCharacter || this.activeCharacter;
    this.activeLocation = options.activeLocation || this.activeLocation;
  }


  fromTale(tale) {

    this.memoryBank.global.name = tale.name;
    this.memoryBank.global.description = tale.description;
    this.memoryBank.global.digest = tale.description;
    this.memoryBank.global.expanded = tale.description;
    
    this.memoryBank.hero.name = tale.hero.name;
    this.memoryBank.hero.description = tale.hero.description;
    this.memoryBank.hero.digest = tale.hero.description;
    this.memoryBank.hero.expanded = tale.hero.description;

    tale.characters.forEach(c => {          
      this.memoryBank.characters[c.id] = new Memory();
      this.memoryBank.characters[c.id].name = c.name;
      this.memoryBank.characters[c.id].description = c.description;
      this.memoryBank.characters[c.id].digest = c.description;
      this.memoryBank.characters[c.id].expanded = c.description;
    });

    tale.locations.forEach(l => {        
      this.memoryBank.locations[l.id] = new Memory();
      this.memoryBank.locations[l.id].name = l.name;
      this.memoryBank.locations[l.id].description = l.description;
      this.memoryBank.locations[l.id].digest = l.description;
      this.memoryBank.locations[l.id].expanded = l.description;
    });

    this.activeCharacter = tale.characters[0].id;
    this.activeLocation = tale.locations[0].id;

  }

}