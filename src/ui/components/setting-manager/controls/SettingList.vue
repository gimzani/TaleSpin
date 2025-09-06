<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
import SettingListing from './SettingListing.vue';
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Array },
  items: { type: Array }
});
const emit = defineEmits(['update:modelValue', 'new-item', 'edit-item', 'remove-item', 'finish']);
//----------------------------------------------------------
const itemSelections = ref(new Set());
//----------------------------------------------------------
function toggleSelect(item) {
  if(itemSelections.value.has(item.id)) {
    itemSelections.value.delete(item.id);
  } else {    
    itemSelections.value.add(item.id);
  }
  emit('update:modelValue', Array.from(itemSelections.value));
}
//----------------------------------------------------------
watch(() => props.modelValue, (newVal) => {
  itemSelections.value = new Set(newVal);
}, { immediate: true }) 
//----------------------------------------------------------
</script>
<template>
<div class="component-list-frame">

  <div class="component-list-header">
    <div class="component-list-header-title">
      Settings
    </div>   
    <div>
      <button class="success" @click="$emit('new-item')">
        New
      </button>
    </div>    
  </div>  

  <div class="component-list-items">
    <SettingListing 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      :selected="itemSelections.has(item.id)"
      @select="toggleSelect(item)"
      @edit="$emit('edit-item', item)"
      @remove="$emit('remove-item', item)" />
  </div>
    
  <div class="text-right mt-3">
    <button @click="$emit('finish')">Finish</button>
  </div>

</div>
</template>