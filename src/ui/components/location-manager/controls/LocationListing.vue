<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  item: { type: Object },
  selected: { type: Boolean }
});
const emit = defineEmits(['select', 'edit', 'remove']);
//----------------------------------------------------------
const expanded = ref(false);
//----------------------------------------------------------
</script>
<template>
<div class="component-list-item" :class="{ selected: selected }" @click="$emit('select', item)">
  <div class="component-item-header">
    <div>
      <button class="icon me-2" @click.stop="expanded = !expanded">
        <font-awesome-icon :icon="expanded ? 'fa-chevron-down' : 'fa-chevron-right'" />
      </button>
      <span> {{ item.name }} </span>
    </div>
    <div>
      <button class="icon info" @click.stop="$emit('edit', item)">
        <font-awesome-icon icon="edit" />
      </button>
      <button class="icon danger" @click.stop="$emit('remove', item)">        
        <font-awesome-icon icon="times" />
      </button>
    </div>
  </div>  
  <div class="component-item-description" v-if="expanded">{{ item.description }}</div>
</div>
</template>