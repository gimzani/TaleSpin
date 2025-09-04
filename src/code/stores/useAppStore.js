//------------------------------------------------------------------
import { defineStore } from 'pinia';
import { SCREENS } from 'src/code/enums.js';
import { seedData } from 'src/code/db/DataSeeder.js';
import screens from 'src/ui/screens'
//------------------------------------------------------------------
export const useAppStore = defineStore('useAppStore', {
  state: () => ({
    screenList: Object.keys(screens),
    activeScreenName: SCREENS.DEVELOPER
  }),
  getters: { 
    activeScreen: (state) => screens[state.activeScreenName]
   },
  actions: { 
    setActiveScreen(name) {
      this.activeScreenName = name;
    },
    seedDatabase() {
      seedData(this.db);
    },

    async listCharacters() {
      return await this.db.Characters.list();
    },
    async saveCharacter(item) {
      return await this.db.Characters.put(item);
    },
    async deleteCharacter(id) {
      return await this.db.Characters.delete(id);
    },
    
    async listHeroes() {
      return await this.db.Heroes.list();
    },
    async saveHero(item) {
      return await this.db.Heroes.put(item);
    },
    async deleteHero(id) {
      return await this.db.Heroes.delete(id);
    },
    
    async listSettings() {
      return await this.db.Settings.list();
    },
    async saveSetting(item) {
      return await this.db.Settings.put(item);
    },
    async deleteSetting(id) {
      return await this.db.Settings.delete(id);
    },

    
    async listInstructions() {
      return await this.db.Instructions.list();
    },
    async saveInstruction(item) {
      return await this.db.Instructions.put(item);
    },
    async deleteInstruction(id) {
      return await this.db.Instructions.delete(id);
    },



    


  }
})