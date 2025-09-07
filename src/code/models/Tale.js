//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class Tale {

  id = getKeyCode(6);
  name = null;
  description = null;
  genre = null;
  voice = null;

  hero = null;
  characters = [];
  settings = [];

  sceneIds = [];        // running progression of sceneIds
  chapterIds = [];      // running progression of chapterIds
  actIds = [];          // running progression of actIds
  
  act = null;           // current act. Starts out as 'the story thus far...
  chapter = null;       // current chapter
  scene = null;         // current scene

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.genre = options.genre || this.genre;
    this.voice = options.voice || this.voice;
    
    this.sceneIds = options.sceneIds || this.sceneIds;

    this.hero = options.hero || this.hero;
    this.characters = options.characters || this.characters;
    this.settings = options.settings || this.settings;
  }

}