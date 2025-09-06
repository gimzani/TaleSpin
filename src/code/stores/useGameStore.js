//------------------------------------------------------------------
import { defineStore } from 'pinia';
import Tale from '../models/Tale.js';
//------------------------------------------------------------------
export const useGameStore = defineStore('useGameStore', {
  state: () => ({
    tale: null,
    gameState: null
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
    async getHero(id) {
      return await this.db.Heroes.get(id);
    },
    //--------------------------------------------------------
    async getCharacters(ids) {
      return await this.db.Characters.getCollection(ids);
    },
    //--------------------------------------------------------
    async getSettings(ids) {
      return await this.db.Settings.getCollection(ids);
    }

  }
})