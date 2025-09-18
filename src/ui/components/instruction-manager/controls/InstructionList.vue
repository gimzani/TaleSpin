<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
import InstructionListing from './InstructionListing.vue';
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Array },
  items: { type: Array }
});
const emit = defineEmits(['update:modelValue', 'new-item', 'edit-item', 'remove-item', 'finish']);
//----------------------------------------------------------
</script>
<template>
<div class="component-list-frame">

  <div class="component-list-header">
    <div class="component-list-header-title">
      Instructions
    </div>   
    <div>
      <button class="success" @click="$emit('new-item')">
        New
      </button>
    </div>    
  </div>  

  <div class="component-list-items">
    <InstructionListing 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      @edit="$emit('edit-item', item)"
      @remove="$emit('remove-item', item)" />
  </div>
    
  <div class="text-right mt-3">
    <button @click="$emit('finish')">Finish</button>
  </div>

</div>
</template>