<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useContentStore } from 'src/code/stores/useContentStore'; 
import { getKeyCode } from 'src/code/codegen.js'
//----------------------------------------------------------
const appStore = useAppStore();
const contentStore = useContentStore();
//----------------------------------------------------------
const selectedScreen = ref(null);
const expanded = ref(false);
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

  <div class="fab-menu" v-if="expanded">
    <button @click="contentStore.heroesModal=true" title="open heroes manager">
      <font-awesome-icon icon="fa-solid fa-user" /> Hero
    </button>
    <button @click="contentStore.charactersModal=true" title="open settings manager">
      <font-awesome-icon icon="fa-solid fa-users" /> Characters
    </button>
    <button @click="contentStore.settingsModal=true" title="open settings manager">
      <font-awesome-icon icon="fa-solid fa-dungeon" /> Settings
    </button>
    <button @click="contentStore.scenariosModal=true" title="open scenarios manager">
      <font-awesome-icon icon="fa-solid fa-terminal" /> Scenarios
    </button>
    <div v-if="appStore.debugMode">
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
    </div>
 
  </div>

</div>
</template>