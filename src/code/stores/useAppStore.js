//------------------------------------------------------------------
import { defineStore } from 'pinia';
import screens from 'src/ui/screens'
//------------------------------------------------------------------
export const useAppStore = defineStore('useAppStore', {
  state: () => ({
    screenList: Object.keys(screens),
    activeScreenName: 'SplashScreen'
  }),
  getters: { 
    activeScreen: (state) => screens[state.activeScreenName]
   },
  actions: { 
    setActiveScreen(name) {
      this.activeScreenName = name;
    }
  }
})