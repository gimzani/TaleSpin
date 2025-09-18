<script setup>
//----------------------------------------------------------
import { onMounted, ref,watch } from 'vue'
import { useGameStore } from 'src/code/stores/useGameStore'; 
//----------------------------------------------------------
import ChatOutput from './controls/ChatOutput.vue';
import ChatInput from './controls/ChatInput.vue';
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
const gameStore = useGameStore();
//----------------------------------------------------------
//----------------------------------------------------------
onMounted(() => {
  gameStore.renderChat();
})
//----------------------------------------------------------
</script>
<template>
<div class="chat-component">
  <ChatOutput></ChatOutput>
  <ChatInput></ChatInput>
</div>
</template>