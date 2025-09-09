<script setup>
//----------------------------------------------------------  not used
import { ref } from 'vue'
//----------------------------------------------------------
const expanded = ref(false);
//----------------------------------------------------------
</script>
<template>
<div class="expandible-container">
  <div>
    <button @click="expanded = !expanded">
      <font-awesome-icon :icon="expanded ? 'fa-chevron-down' : 'fa-chevron-right'" />
    </button>
  <slot name="header"></slot>
  </div>
  <div v-if="expanded">
    <slot name="body"></slot>
  </div>
</div>
</template>
