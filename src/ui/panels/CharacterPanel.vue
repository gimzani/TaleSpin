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
<div class="character-panel">

  <div class="character-panel-input">
    <div class="mb-2">
      <input class="w-100" type="text" placeholder="character name" />
    </div>
    <div class="mb-2">
      <textarea class="w-100" rows="12"></textarea>
    </div>
    <div class="text-end">
      <button>Finish</button>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.character-panel {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  padding: 50px;
  background-color: rgba(0,0,0,0.75);

  .character-panel-input {
    display: flex;
    flex-direction: column;
  }
}
</style>