//------------------------------------------------------------------
const sysFile = import.meta.env.VITE_MAIN_SYSTEM_FILE;
const sumFile = import.meta.env.VITE_MAIN_SUMMARY_FILE;
//------------------------------------------------------------------
import Prompt from 'src/code/models/Prompt.js';
import ChatMessage from 'src/code/models/ChatMessage.js';
//------------------------------------------------------------------
export default class AiPrompt {

  modelName = 'talespin';

  systemMessages = {
    main: new ChatMessage({ role: "system" }),
    summary: new ChatMessage({ role: "system" }),
    story: new ChatMessage({ role: "system" }),
    hero: new ChatMessage({ role: "system" }),
    character: new ChatMessage({ role: "system" }),
    location: new ChatMessage({ role: "system" })
  }
  //--------------------------------------------------------
  async init(session) {

    this.systemMessages.main.content = await fetch(`/system/${sysFile}`).then(res => res.text());
    this.systemMessages.summary.content = await fetch(`/system/${sumFile}`).then(res => res.text());

    this.setStory(session);
    this.setHero(session);
    this.setCharacter(session);
    this.setLocation(session);

  }
  //--------------------------------------------------------
  buildStoryPrompt() {

    // add hero
  
    let prompt = new Prompt({ model: this.modelName });

    // get main system prompt
    prompt.messages.push(this.systemMessages.main);
    prompt.messages.push(this.systemMessages.story);
    prompt.messages.push(this.systemMessages.hero);
    prompt.messages.push(this.systemMessages.character);
    prompt.messages.push(this.systemMessages.location);

    return prompt;
  }
  //--------------------------------------------------------
  //--------------------------------------------------------
  setStory(session) {
    let text = `CONTEXT:\n`;
    text += `${session.memoryBank.global.description}:\n\n`;
    this.systemMessages.story.content = text;
  }
  //--------------------------------------------------------
  setHero(session) {
    let text = `HERO:${session.memoryBank.hero.name}:\n`;
    text += `${session.memoryBank.hero.description}\n\n`;
    this.systemMessages.hero.content = text;
  }
  //--------------------------------------------------------
  setCharacter(session) {
    let text = `ACTIVE CHARACTER: ${session.memoryBank.characters[session.activeCharacter].name}:\n`;
    text += `${session.memoryBank.characters[session.activeCharacter].description}\n\n`;
    this.systemMessages.character.content = text;
  }
  //--------------------------------------------------------
  setLocation(session) {   
    let text = `LOCATION: ${session.memoryBank.locations[session.activeLocation].name}:\n`;
    text += `${session.memoryBank.locations[session.activeLocation].description}\n\n`;
    this.systemMessages.location.content = text;
  }
  //--------------------------------------------------------
}