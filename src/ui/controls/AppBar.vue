<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
</script>
<template>
<div class="app-bar">
  APP
</div>
</template>

<style scoped lang="scss">
.app-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #000;
  color: #fff;
}
</style>