<script setup>
//----------------------------------------------------------
import { ref, watch, onMounted } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
//----------------------------------------------------------
const appStore = useAppStore();
//----------------------------------------------------------
const selectedScreen = ref(null);
//----------------------------------------------------------
function screenSelected() {
  appStore.setActiveScreen(selectedScreen.value);
}
//----------------------------------------------------------
watch(() => appStore.activeScreenName, (val) => {
  selectedScreen.value = val
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="developer-nav">
  <select v-model="selectedScreen" @change="screenSelected">
    <option v-for="s in appStore.screenList" :value="s" :key="s">{{ s }}</option>
  </select>
</div>
</template>

<style scoped lang="scss">
.developer-nav {
  position: absolute;
  top: 0; right: 0;
}
</style>