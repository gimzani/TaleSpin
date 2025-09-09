//------------------------------------------------------------------
import { defineStore } from 'pinia';
import ollama from 'ollama/browser';
import AiPrompt from '../ai/AiPrompt.js';
//------------------------------------------------------------------
import Tale from '../models/Tale.js';
//------------------------------------------------------------------
const BUFFER_LIMIT = 250;  // number of messages allowed in messageBuffer
//------------------------------------------------------------------
export const useGameStore = defineStore('useGameStore', {
  state: () => ({

    ai: null,
    tale: null,

    messageBuffer: []   // rolling buffer - (individual messages get copied to sceneBuffer)
    
  }),
  getters: {  

  },
  actions: {
    //--------------------------------------------------------
    async saveTale(tale) {
      this.tale = new Tale(tale);
      const clone = JSON.parse(JSON.stringify(this.tale));
      return await this.db.Tales.put(clone);
    },
    //--------------------------------------------------------
    async loadTale(taleId) {
      const tale = await this.db.Tales.get(taleId);
      this.tale = new Tale(tale);
    },
    //--------------------------------------------------------
    //--------------------------------------------------------
    async initGameState() {      

      this.ai = new AiPrompt();
      await this.ai.init();

      let systemPrompt = this.ai.getMainSystemPrompt();

      console.log('systemPrompt?', systemPrompt)


      //START HERE!



    },
    //--------------------------------------------------------


    async getNewScene() {},

    async getActSummary() {},

    async getChapterSummary() {},


    async checkAffinity() {},


    
  }
})