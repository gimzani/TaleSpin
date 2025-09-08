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
</script>
<template>
<div class="chat-output">
  <div class="output-window" contenteditable="true">
    
    
    output blocks...

  </div>
</div>
</template>

<style scoped lang="scss">
.chat-output {
    padding: 10px 10px 5px 10px;

  .output-window {
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    border: solid 1px #777;
    border-radius: 10px;
    overflow-y: auto;
    padding: 10px;
    height: 100%;
  }

}
</style>