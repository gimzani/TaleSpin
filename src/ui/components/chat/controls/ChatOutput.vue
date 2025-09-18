<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useGameStore } from 'src/code/stores/useGameStore'; 
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
const gameStore = useGameStore();
//-----------------------------------------------------------------
function sendVal(evt) {
  let text = evt.target.innerText.trim();
  gameStore.updateMessages(text);  
}
//----------------------------------------------------------
</script>
<template>
<div class="chat-output">
  <div 
    class="output-window" 
    contenteditable="true" 
    v-text="gameStore.chatLog"
    @blur="sendVal"
  >
  </div>
</div>
</template>