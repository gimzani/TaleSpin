<script setup>
//----------------------------------------------------------
import { ref, computed, watch } from 'vue'
import Hero from '../../code/models/Hero.js'
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Object } 
});
const emit = defineEmits(['cancel', 'save']);
//----------------------------------------------------------
const selectedItem = ref(new Hero());
//----------------------------------------------------------
const mode = computed(() => props.modelValue ? 'Edit' : 'New');
//----------------------------------------------------------
function cancel() {
  emit('cancel')
}
//----------------------------------------------------------
function save() {
  emit('save', selectedItem.value)
}
//----------------------------------------------------------
watch(() => props.modelValue, (val) => {
  if(val) {
    selectedItem.value = new Hero(val);
  }  
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="content-panel">

  <div class="content-panel-frame">

    <div class="section-header">
      <div class="section-title">{{ mode }} Hero</div>
    </div>

    <div class="content-panel-form">
      <div class="mb-2">
        <input class="w-100" type="text" placeholder="content name" v-model="selectedItem.name" />
      </div>
      <div class="mb-2">
        <textarea class="w-100" rows="12" v-model="selectedItem.description"></textarea>
      </div>
    </div>

    <div class="text-end button-group">
      <button class="danger" @click="cancel">Cancel</button>
      <button class="success" @click="save">Save</button>
    </div>

  </div>

</div>
</template>