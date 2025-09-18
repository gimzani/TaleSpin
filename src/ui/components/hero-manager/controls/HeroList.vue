<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
import HeroListing from './HeroListing.vue';
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: String },
  select: { type: Boolean, default: true },
  items: { type: Array }
});
const emit = defineEmits(['update:modelValue', 'new-item', 'edit-item', 'remove-item', 'finish']);
//----------------------------------------------------------
const itemSelection = ref(null);
//----------------------------------------------------------
function toggleSelect(item) {
  if(props.select) {      
    emit('update:modelValue', item.id);
  }
}
//----------------------------------------------------------
watch(() => props.modelValue, (newVal) => {
  itemSelection.value = newVal;
}, { immediate: true }) 
//----------------------------------------------------------
</script>
<template>
<div class="component-list-frame">

  <div class="component-list-header">
    <div class="component-list-header-title">
      Heroes
    </div>   
    <div>
      <button class="success" @click="$emit('new-item')">
        New
      </button>
    </div>    
  </div>  

  <div class="component-list-items">
    <HeroListing 
      v-for="item in items" 
      :key="item.id" 
      :select="select"
      :item="item" 
      :selected="itemSelection === item.id"
      @select="toggleSelect(item)"
      @edit="$emit('edit-item', item)"
      @remove="$emit('remove-item', item)" />
  </div>
  
  <div class="text-right mt-3">
    <button @click="$emit('finish')">Finish</button>
  </div>

</div>
</template>