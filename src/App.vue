<script setup>
//----------------------------------------------------------
import { ref, reactive, onMounted } from 'vue'
import AppModel from 'src/code/models/AppModel.js'
import TaleSpinDb from 'src/code/db/talespinDb';
//----------------------------------------------------------
import AppBar from 'src/ui/controls/AppBar.vue';
import SystemPanel from 'src/ui/panels/SystemPanel.vue';
import ChatPanel from 'src/ui/panels/ChatPanel.vue';
import HeroPanel from 'src/ui/panels/HeroPanel.vue';
import CharacterPanel from 'src/ui/panels/CharacterPanel.vue';
import CharacterSwapPanel from 'src/ui/panels/CharacterSwapPanel.vue';
import PromptPanel from 'src/ui/panels/PromptPanel.vue';
//----------------------------------------------------------
const app = ref(new AppModel());
const db = TaleSpinDb.getInstance();
//----------------------------------------------------------
const panels = reactive({
  showChat: false,
  showPrompts: false,
  showHero: false,
  showCharacters: false,
  showCharacterSwap: false
});
//----------------------------------------------------------
onMounted(() => {
  db.init();
});
//----------------------------------------------------------
</script>

<template>
<div class="app-container">
  <AppBar></AppBar>
  <div class="app-controls">
    <SystemPanel ></SystemPanel>
    <ChatPanel v-if="panels.showChat"></ChatPanel>
    <PromptPanel v-if="panels.showPrompts"></PromptPanel>
    <HeroPanel v-if="panels.showHero"></HeroPanel>
    <CharacterPanel v-if="panels.showCharacters"></CharacterPanel>
    <CharacterSwapPanel v-if="panels.showCharacterSwap"></CharacterSwapPanel>
  </div>
</div>
</template>

<style scoped lang="scss">
.app-container {
  display: grid;
  grid-template-rows:  50px 1fr;
  height: 100vh;
  .app-controls {
    position: relative;
    height: 100%;
  }
}
</style>