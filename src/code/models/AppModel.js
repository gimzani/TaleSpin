//-----------------------------------------------------------------
import CharacterModel from "./CharacterModel";
//-----------------------------------------------------------------
export default class AppModel {

  initialPrompt = null;
  
  characters = [];        // <CharacterModel>
  buffer = [];            // <string>
  prompts = [];           // <string>

  currentSituation = null;            // recap
  activeCharacter = null;
  additionalInstructions = null;      // add to prompt


  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {

    this.initialPrompt = options.initialPrompt || this.initialPrompt;

    this.characters = options.characters ? options.characters.map(c => new CharacterModel(c)) : this.characters;
    this.buffer = options.buffer || this.buffer;
    this.prompts = options.prompts || this.prompts;
    
    this.currentSituation = options.currentSituation || this.currentSituation;
    this.activeCharacter = options.activeCharacter || this.activeCharacter;
  }

}