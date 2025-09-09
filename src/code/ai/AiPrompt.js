//------------------------------------------------------------------
const sysFile = import.meta.env.VITE_MAIN_SYSTEM_FILE;
const sumFile = import.meta.env.VITE_MAIN_SUMMARY_FILE;
//------------------------------------------------------------------
import Prompt from 'src/code/models/Prompt.js';
//------------------------------------------------------------------
export default class AiPrompt {

  modelName = 'storyteller';

  systemMessages = {
    main: { role: "system", content: null },
    summary: { role: "system", content: null },
    story: { role: "system", content: null },
    character: { role: "system", content: null },
    location: { role: "system", content: null }
  }

  constructor() {

  }


  async init() {
    this.systemMessages.main.content = await fetch(`/system/${sysFile}`).then(res => res.text());
    this.systemMessages.summary.content = await fetch(`/system/${sumFile}`).then(res => res.text());
  }

  getMainSystemPrompt() {
    return new Prompt({
      model: this.modelName,
      content: this.mainSystemInstruction
    });
  }

  getSummarySystemPrompt() {
    return new Prompt({
      role: "system",
      content: this.mainSummaryInstruction
    });
  }

  // =============================>  start here!!!

  async buildStoryPrompt(tale) {
  // assemble system prompts and story fragments into a single prompt

    // get main system prompt
    
    // add Location

    // add hero

    // add character

    // add last N messages

  }


  async buildSummaryRequestPrompt() {
    // assemble last X history items and request a summary
  }


  async buildReasoningPrompt() {
    // assemble last x messages and request a reasoned response - (how does the character feel about..., what would the character do in this situation...)
  }


  async getLastN_MessageBatch() {
    // assemble last X messages
  }

  async getLastN_HistoryBatch() {
    // assemble last X messages
  }









}