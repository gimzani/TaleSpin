<script setup>
//----------------------------------------------------------
import { onMounted, ref,watch } from 'vue'
import { useGameStore } from 'src/code/stores/useGameStore'; 
import { useContentStore } from 'src/code/stores/useContentStore'; 
//----------------------------------------------------------
import ChatOutput from './controls/ChatOutput.vue';
import ChatInput from './controls/ChatInput.vue';
import ModalManager from 'src/ui/components/global/ModalManager.vue';
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
const gameStore = useGameStore();
const contentStore = useContentStore();
//----------------------------------------------------------
//----------------------------------------------------------

//----------------------------------------------------------
//----------------------------------------------------------
watch(() => contentStore.charactersModal, async (val) => {
  if(!val) {
    let characters = await contentStore.pullCharacterSelection();
    console.log('characters', characters)
  }
});
//----------------------------------------------------------
watch(() => contentStore.locationsModal, async (val) => {
  if(!val) {
    let locations = await contentStore.pullLocationSelection();
    console.log('locations', locations)
  }
});
//----------------------------------------------------------
onMounted(async () => {
  await gameStore.initGameState();
})
//----------------------------------------------------------
</script>
<template>
<div class="chat-panel">
  <ChatOutput></ChatOutput>
  <ChatInput></ChatInput>

  <ModalManager />
</div>
</template>

<style scoped lang="scss">
.chat-panel {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  display: grid;
  grid-template-rows: 1fr 120px;
  height: 100%;
}
</style>