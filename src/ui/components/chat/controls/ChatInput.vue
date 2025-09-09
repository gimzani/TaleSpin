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

<style scoped lang="scss">
.chat-input {
  display: flex;
  padding: 10px;

  textarea {
    width: 100%;
    resize: none;
    border-radius: 10px 0 0 10px;
  }

  button {
    border-radius: 0 10px 10px 0;
    padding: 0 20px;
    font-size: 1.25rem;
  }
}
</style>