<script setup>
//----------------------------------------------------------
import { reactive } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
//----------------------------------------------------------
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const appStore = useAppStore();
//----------------------------------------------------------
const loadGameModal = reactive({ show: false });
//----------------------------------------------------------
function newGame() {
  appStore.setActiveScreen('ConfigScreen');
}
//----------------------------------------------------------
function loadGame() {
  loadGameModal.show = true;
}
//----------------------------------------------------------
</script>
<template>  
<div class="splash-screen-logo">
  TaleSpin
</div>
<div class="splash-screen-buttons">
  <button @click="newGame">New Game</button>
  <button @click="loadGame">Load Game</button>
</div>
<Modal :show="loadGameModal.show" @close="loadGameModal.show=false" close-button="true">
  ...Saved Games List
</Modal>
</template>
