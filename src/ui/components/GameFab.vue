<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useGameStore } from 'src/code/stores/useGameStore'; 
import { getKeyCode } from 'src/code/codegen.js'
import { SCREENS } from 'src/code/enums.js';
//----------------------------------------------------------
const appStore = useAppStore();
const gameStore = useGameStore();
//----------------------------------------------------------
const selectedScreen = ref(null);
const expanded = ref(false);
//----------------------------------------------------------
async function quit() {
  localStorage.removeItem('tale');
  appStore.setActiveScreen(SCREENS.SPLASH);
}
//----------------------------------------------------------
function screenSelected() {
  appStore.setActiveScreen(selectedScreen.value);
}
//----------------------------------------------------------
function getRandomCode() {
  let code = getKeyCode(8);
  console.log(code);
}
//----------------------------------------------------------
async function runTestScripts() {
  let result = await gameStore.testScript();
  console.log(result);
}
//----------------------------------------------------------
watch(() => appStore.activeScreenName, (val) => {
  selectedScreen.value = val
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="developer-nav">

  <div class="fab-button">
    <button  title="game actions" @click="expanded = !expanded">
      <font-awesome-icon icon="fa-solid fa-cog" />
    </button>
  </div>

  <div class="fab-menu" v-if="expanded" @mouseleave="expanded=false">
    <div v-if="appStore.debugMode">
      <button class="w-100" @click="runTestScripts" title="test code">
        <font-awesome-icon icon="fa-solid fa-flask" /> Test&nbsp;Scripts
      </button>  
      <hr style="width: 150px;" />
      <select class="w-100" v-model="selectedScreen" @change="screenSelected">
        <option v-for="s in appStore.screenList" :value="s" :key="s">{{ s }}</option>
      </select>
      <hr style="width: 150px;" />
      <button class="w-100" @click="getRandomCode" title="get random code">
        <font-awesome-icon icon="fa-solid fa-lock" /> Random&nbsp;Code
      </button>  
      <button class="w-100" @click="appStore.seedDatabase" title="seed database">
        <font-awesome-icon icon="fa-seedling" /> Seed Database
      </button>      
      <hr style="width: 150px;" /> 
    </div>
    <button class="w-100" @click="quit" title="quit game">
      <font-awesome-icon icon="fa-solid fa-power-off" /> Quit
    </button>  
 
  </div>

</div>
</template>