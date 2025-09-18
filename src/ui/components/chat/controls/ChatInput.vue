<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useGameStore } from 'src/code/stores/useGameStore'; 
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
const gameStore = useGameStore();
//----------------------------------------------------------
const userInput = ref(null);
//----------------------------------------------------------
async function send() {
  await gameStore.sendPrompt(userInput.value);
  userInput.value = null;
}
//----------------------------------------------------------
</script>
<template>
<div class="chat-input">
  <textarea rows="4" v-model="userInput"></textarea>
  <button @click="send">Send</button>
</div>
</template>