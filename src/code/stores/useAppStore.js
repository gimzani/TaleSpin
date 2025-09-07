//------------------------------------------------------------------
import { defineStore } from 'pinia';
import { SCREENS } from 'src/code/enums.js';
import { seedData } from 'src/code/db/DataSeeder.js';
import screens from 'src/ui/screens'
//------------------------------------------------------------------
import { useToasts } from 'src/code/composables/useToasts.js'
//------------------------------------------------------------------
const toasts = useToasts();
//------------------------------------------------------------------
export const useAppStore = defineStore('useAppStore', {
  state: () => ({    
    screenList: Object.keys(screens),
    activeScreenName: SCREENS.SPLASH,
    debugMode: true
  }),
  getters: { 
    activeScreen: (state) => screens[state.activeScreenName]
   },
  actions: { 
    //--------------------------------------------------------
    setActiveScreen(name) {
      this.activeScreenName = name;
    },
    //--------------------------------------------------------
    async seedDatabase() {
      const result = await seedData(this.db);
      if(result.success) {
        toasts.success(result.message);
      } else {
        toasts.error(result.message);
      }
    },
    //--------------------------------------------------------
    async listSaveGames() {
      return await this.db.Tales.list();
    },
    //--------------------------------------------------------
    async listCharacters() {
      return await this.db.Characters.list();
    },
    async saveCharacter(item) {
      return await this.db.Characters.put(item);
    },
    async deleteCharacter(id) {
      return await this.db.Characters.delete(id);
    },
    //--------------------------------------------------------
    async listHeroes() {
      return await this.db.Heroes.list();
    },
    async saveHero(item) {
      return await this.db.Heroes.put(item);
    },
    async deleteHero(id) {
      return await this.db.Heroes.delete(id);
    },
    //--------------------------------------------------------
    async listSettings() {
      return await this.db.Settings.list();
    },
    async saveSetting(item) {
      return await this.db.Settings.put(item);
    },
    async deleteSetting(id) {
      return await this.db.Settings.delete(id);
    },
    //--------------------------------------------------------
    async listScenarios() {
      return await this.db.Scenarios.list();
    },
    async saveScenario(item) {
      return await this.db.Scenarios.put(item);
    },
    async deleteScenario(id) {
      return await this.db.Scenarios.delete(id);
    },
    //--------------------------------------------------------
 
  }
})