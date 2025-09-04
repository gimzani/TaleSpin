<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
import HeroListing from './HeroListing.vue';
//----------------------------------------------------------
const props = defineProps({
  modelValue: { type: Array },
  items: { type: Array }
});
const emit = defineEmits(['update:modelValue', 'new-item', 'edit-item', 'remove-item']);
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
<div class="content-list">

  <div class="content-list-header">
    <div class="content-list-header-title">
      Heroes
    </div>   
    <div>
      <button class="success" @click="$emit('new-item')">
        New
      </button>
    </div>    
  </div>  

  <div class="content-list-items">
    <HeroListing 
      v-for="item in items" 
      :key="item.id" 
      :item="item" 
      :selected="itemSelections.has(item.id)"
      @select="toggleSelect(item)"
      @edit="$emit('edit-item', item)"
      @remove="$emit('remove-item', item)" />
  </div>

</div>
</template>