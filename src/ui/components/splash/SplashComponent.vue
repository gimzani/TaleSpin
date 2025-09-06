<script setup>
//----------------------------------------------------------
import { ref, reactive } from 'vue'
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
  appStore.setActiveScreen('ConfigScreen');
}
//----------------------------------------------------------
async function showGameList() {
  tales.value = await appStore.listSaveGames();
  loadGameModal.show = true;
}
//----------------------------------------------------------
async function loadGame(tale) {
  await gameStore.loadTale(tale.id);
  appStore.setActiveScreen('PlayScreen');  
}
//----------------------------------------------------------
</script>
<template>

<div class="splash-screen-logo">
  TaleSpin
</div>

<div class="splash-screen-buttons">
  <button @click="newGame">New Game</button>
  <button @click="showGameList">Load Game</button>
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
