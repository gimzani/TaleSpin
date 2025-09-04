<script setup>
//----------------------------------------------------------
import { ref, computed, watch } from 'vue'
import Instruction from 'src/code/models/Instruction.js'
//----------------------------------------------------------
const props = defineProps({
  item: { type: Object } 
});
const emit = defineEmits(['cancel', 'save']);
//----------------------------------------------------------
const selectedItem = ref(new Instruction());
//----------------------------------------------------------
const mode = computed(() => props.item ? 'Edit' : 'New');
//----------------------------------------------------------
watch(() => props.item, (val) => {
  if(val) {
    selectedItem.value = new Instruction(val);
  }  
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>

<div class="content-form-frame">

  <div class="section-header">
    <div class="section-title">{{ mode }} Instruction</div>
  </div>

  <div class="content-form">
    <div class="mb-2">
      <input class="w-100" type="text" placeholder="content name" v-model="selectedItem.name" />
    </div>
    <div class="mb-2">
      <textarea class="w-100" rows="12" v-model="selectedItem.text"></textarea>
    </div>
  </div>

  <div class="text-end button-group">
    <button class="danger" @click="$emit('cancel')">Cancel</button>
    <button class="success" @click="$emit('save', selectedItem)">Save</button>
  </div>

</div>

</template>