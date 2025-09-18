//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import { AI_VOICE, STORY_GENRE } from 'src/code/enums.js'
//---------------------------------------------------------
export default class Tale {

  id = getKeyCode(6);
  name = null;
  genre = STORY_GENRE.MODERN;
  voice = AI_VOICE.SECOND_PERSON;
  scenario = null;

  hero = null;
  characters = [];
  locations = [];  

  longterm = [];     // synopsis - per scene change (front-loaded)
  shortterm = [];    // synopsis - per 15 messages

  whatHappensNext = null;
  writingInstruction = null;

  messages = [];   // entire chat log
  chatLog = null;   // entire chat log

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.name = options.name || this.name;
    this.genre = options.genre || this.genre;
    this.voice = options.voice || this.voice;
    this.scenario = options.scenario || this.scenario;

    this.hero = options.hero || this.hero;
    this.characters = options.characters || this.characters;
    this.locations = options.locations || this.locations;
    
    this.longterm = options.longterm || this.longterm;
    this.shortterm = options.shortterm || this.shortterm;

    this.whatHappensNext = options.whatHappensNext || this.whatHappensNext;
    this.writingInstruction = options.writingInstruction || this.writingInstruction;

    this.messages = options.messages || this.messages;
    this.chatLog = options.chatLog || this.chatLog;
    
  }

}