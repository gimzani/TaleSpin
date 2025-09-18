//------------------------------------------------------------------
import { toRaw } from 'vue'
import { defineStore } from 'pinia';
import ollama from 'ollama/browser';
import * as prompt from 'src/code/promptUtils.js'
//------------------------------------------------------------------
import Tale from 'src/code/models/Tale.js';
import PromptRequest from 'src/code/models/PromptRequest.js';
//------------------------------------------------------------------
export const useGameStore = defineStore('useGameStore', {
  state: () => ({

    model: 'talespin',

    tale: null,
    chatLog: '',
    networkInUse: false
    
  }),
  getters: {  
    rollingChatLog: (state) => { 
      if (!state.session?.memoryBank?.chatLog) {
        return [];
      }
      return state.session.memoryBank.chatLog.slice(-10);
    }
  },
  actions: {
    //--------------------------------------------------------
    //#region Save/Load Tale
    //--------------------------------------------------------
    async newTale(taleData, initialContent) {
      const tale = new Tale(taleData);
      this.tale = tale;

      this.setActiveCharacter(tale.characters[0].id);
      this.setActiveLocation(tale.locations[0].id);

      tale.messages = prompt.sliceChatLog(initialContent);

      this.saveTale(tale);
      localStorage.setItem('tale', JSON.stringify({taleId: tale.id}));
    },
    //--------------------------------------------------------
    async saveTale() {
      const clone = JSON.parse(JSON.stringify(this.tale));
      return await this.db.Tales.put(clone);
    },
    //--------------------------------------------------------
    async loadTale(taleId) {
      const tale = await this.db.Tales.get(taleId);
      this.tale = new Tale(tale);
      localStorage.setItem('tale', JSON.stringify({taleId: tale.id}));
    },
    //--------------------------------------------------------
    //#endregion
    //--------------------------------------------------------
    //#region Chat Functions
    //--------------------------------------------------------
    renderChat() {
      this.chatLog = this.tale.messages.join('\n\n');  // todo: limit to 20 OR make a getter?
    },
    //--------------------------------------------------------
    updateMessages(text) {
      this.tale.messages = prompt.sliceChatLog(text);
      this.renderChat();
    },
    //--------------------------------------------------------
    async setActiveCharacter(id) {
      this.tale.characters.forEach(c => c.active=false);
      let ind = this.tale.characters.findIndex(c => c.id===id);
      this.tale.characters[ind].active=true;
    },
    //--------------------------------------------------------
    async setActiveLocation(id) {
      this.tale.locations.forEach(c => c.active=false);
      let ind = this.tale.locations.findIndex(c => c.id===id);
      this.tale.locations[ind].active=true;
    },
    //--------------------------------------------------------
    //#endregion
    //--------------------------------------------------------


    //--------------------------------------------------------  test script
    async testScript() {

      // let chatLog = await fetch('/chatLog.txt').then(res => res.text());
      // return prompt.sliceChatLog(chatLog);

      let promptContent = await prompt.buildNextPrompt(this.tale, "So now what?");

      console.log(promptContent);

    },

    //--------------------------------------------------------
    //--------------------------------------------------------
    //#region PROMPT FUNCTIONS
    //--------------------------------------------------------
    async sendPrompt(userInput) {

      let character = prompt.getActiveCharacter(this.tale);

      let promptContent = await prompt.buildNextPrompt(this.tale, userInput);

      let req = new PromptRequest({
        model: this.model,
        prompt: promptContent,
        options: {
          stop: [
            '\n\n',
            `\n${this.tale.hero.name}:`,
            `\n${character.name}:`
          ]
        }
      });

      // console.log(req.prompt);
      // return;

      this.tale.messages.push(`${this.tale.hero.name}: ${userInput}`);
      this.renderChat();

      this.networkInUse = true;
      const response = await ollama.generate(req);

      let nextIndex = this.tale.messages.length;
      this.tale.messages[nextIndex] = `${character.name}: `;
      
      for await (const part of response) {
        this.tale.messages[nextIndex] += part.response;
        this.renderChat();
      }

      this.networkInUse = false;

    }  
    //--------------------------------------------------------


    //--------------------------------------------------------
    //#endregion

    
  }
})