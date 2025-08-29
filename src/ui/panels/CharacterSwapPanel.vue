<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Object }
});
const emit = defineEmits(['finish']);
//----------------------------------------------------------
</script>
<template>
<div class="character-swap-panel">

  <div class="character-swap-panel-input">
    <div class="mb-2">
      <select>
        <option :value="null">~ please select ~</option>
        <option :value="1">Claire Heart</option>
      </select>
    </div>
    <div class="mb-2">
      <label>Situational Override:</label>
      <textarea class="w-100" rows="4"></textarea>
    </div>
    <div class="text-end">
      <button>Finish</button>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.character-swap-panel {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  padding: 50px;
  background-color: rgba(0,0,0,0.75);

  .character-swap-panel-input {
    display: flex;
    flex-direction: column;
  }
}
</style>