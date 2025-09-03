<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
import ChatOutput from 'src/ui/outputs/ChatOutput.vue';
import ChatInput from 'src/ui/inputs/ChatInput.vue';
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
</script>
<template>
<div class="chat-panel">
  <ChatOutput></ChatOutput>
  <ChatInput></ChatInput>
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