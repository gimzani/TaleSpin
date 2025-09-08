<script setup>
//----------------------------------------------------------
import { ref, reactive, watch } from 'vue'
import { SCREENS } from 'src/code/enums.js';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useGameStore } from 'src/code/stores/useGameStore'; 
//----------------------------------------------------------
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const appStore = useAppStore();
const gameStore = useGameStore();
//----------------------------------------------------------
const loadGameModal = reactive({ show: false });
const tales = ref([]);
//----------------------------------------------------------
function newGame() {
  appStore.setActiveScreen(SCREENS.CONFIG);
}
//----------------------------------------------------------
async function showGameList() {
  loadGameModal.show = true;
}
//----------------------------------------------------------
async function loadGame(tale) {
  await gameStore.loadTale(tale.id);
  appStore.setActiveScreen(SCREENS.PLAY);  
}
//----------------------------------------------------------
async function listSavedGames() {
  tales.value = await appStore.listSaveGames();
}
//----------------------------------------------------------
watch(() => appStore.db.dbReady.value, async (val) => {  
  if(val) {      
    await listSavedGames();
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>

<div class="splash-screen-logo">
  TaleSpin
</div>

<div class="splash-screen-buttons">
  <button @click="newGame">New Game</button>
  <button @click="showGameList" :disabled="tales.length===0">Load Game</button>
</div>

<Modal :show="loadGameModal.show" @close="loadGameModal.show=false" :close-button="true">
 
  <div class="game-list">
    <div class="game-list-item" v-for="t in tales">
      <div>{{ t.name }}</div>
      <button @click="loadGame(t)">Load</button>
    </div>
  </div>

</Modal>
</template>
