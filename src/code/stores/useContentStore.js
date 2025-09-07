//------------------------------------------------------------------
import { defineStore } from 'pinia';
//------------------------------------------------------------------
const sysFile = import.meta.env.VITE_MAIN_SYSTEM_FILE;
const sumFile = import.meta.env.VITE_MAIN_SUMMARY_FILE;
//------------------------------------------------------------------
export const useContentStore = defineStore('useContentStore', {
  state: () => ({

    mainSystemInstruction: null,
    mainSummaryInstruction: null,

    heroesModal: false,
    charactersModal: false,
    settingsModal: false,
    scenariosModal: false,

    heroSelection: null,
    characterSelection: [],
    settingSelection: [],
    scenarioSelection: null,

  }),
  getters: {  },
  actions: { 


    async init() {
      this.mainSystemInstruction = await fetch(`/system/${sysFile}`).then(res => res.text());
      this.mainSummaryInstruction = await fetch(`/system/${sumFile}`).then(res => res.text());
    },

    async pullHeroSelection() {
      let id = this.heroSelection;
      this.heroSelection = null;
      return await this.db.Heroes.get(id);
    },  

    async pullCharacterSelection() {
      let ids = [...this.characterSelection];
      this.characterSelection = [];
      return await this.db.Characters.getCollection(ids);
    },

    async pullSettingSelection() {
      let ids = [...this.settingSelection];
      this.settingSelection = [];
      return await this.db.Settings.getCollection(ids);
    },

    async pullScenarioSelection() {
      let id = this.scenarioSelection;
      this.scenarioSelection = null;
      return await this.db.Scenarios.get(id);
    },  
    

  }
})