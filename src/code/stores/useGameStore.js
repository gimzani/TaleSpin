//------------------------------------------------------------------
import { toRaw } from 'vue'
import { defineStore } from 'pinia';
import ollama from 'ollama/browser';
import AiPrompt from 'src/code/ai/AiPrompt.js';
//------------------------------------------------------------------
import Tale from 'src/code/models/Tale.js';
import Session from 'src/code/models/Session.js';
import ChatMessage from 'src/code/models/ChatMessage.js';
//------------------------------------------------------------------
export const useGameStore = defineStore('useGameStore', {
  state: () => ({

    ai: null,
    tale: null,
    session: null,

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
    async newTale(taleData) {
      const tale = new Tale(taleData);
      this.newSession(tale);
      this.saveTale(tale);
    },
    //--------------------------------------------------------
    async saveTale(tale) {
      this.tale = tale;
      const clone = JSON.parse(JSON.stringify(tale));
      return await this.db.Tales.put(clone);
    },
    //--------------------------------------------------------
    async loadTale(taleId) {
      const tale = await this.db.Tales.get(taleId);
      this.tale = new Tale(tale);
      if(this.tale.sessionId) {
        this.loadSession(this.tale.sessionId);
      }
    },
    //--------------------------------------------------------
    //--------------------------------------------------------
    newSession(tale) {
      const session = new Session();
      tale.sessionId = session.id;
      session.memoryBank.chatLog.push({ role: "assistant", content: tale.initialContent });
      session.fromTale(tale);
      this.saveSession(session);
    },
    //--------------------------------------------------------
    async saveSession(session) {
      this.session = session;
      const clone = JSON.parse(JSON.stringify(session));
      return await this.db.Sessions.put(clone);
    },
    //--------------------------------------------------------
    async loadSession(sessionId) {
      const session = await this.db.Sessions.get(sessionId);
      this.session = session;
    },
    //--------------------------------------------------------
    //--------------------------------------------------------
    async initGameState() {
      this.ai = new AiPrompt();
      await this.ai.init(this.session);
    },
    //--------------------------------------------------------
    async sendPrompt(userString) {

      let session = { ...this.session };

      session.memoryBank.chatLog.push({ role: "user", content: userString });

      const storyPrompt = this.ai.buildStoryPrompt(session);
      console.log('storyPrompt?', toRaw(storyPrompt));

      storyPrompt.messages = [...storyPrompt.messages, ...toRaw(this.rollingChatLog)];

      this.networkInUse = true;
      let res =  await ollama.chat(storyPrompt);
      console.log('raw response', res);
      this.networkInUse = false;

      session.memoryBank.chatLog.push(res.message);

      this.saveSession(session);

    }  
    //--------------------------------------------------------
    
  }
})