//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import { AI_VOICE, STORY_GENRE } from 'src/code/enums.js'
//---------------------------------------------------------
export default class Tale {

  id = getKeyCode(6);
  name = null;
  description = null;
  initialContent = null;
  genre = STORY_GENRE.MODERN;
  voice = AI_VOICE.SECOND_PERSON;

  hero = null;
  characters = [];
  locations = [];  

  sessionId = null;       // memory session

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.initialContent = options.initialContent || this.initialContent;
    this.genre = options.genre || this.genre;
    this.voice = options.voice || this.voice;    

    this.hero = options.hero || this.hero;
    this.characters = options.characters || this.characters;
    this.locations = options.locations || this.locations;
    
    this.sessionId = options.sessionId || this.sessionId;
  }

}