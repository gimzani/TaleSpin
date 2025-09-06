<script setup>
//----------------------------------------------------------
import { ref, watch, onMounted } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { getKeyCode } from 'src/code/codegen.js'
//----------------------------------------------------------
const appStore = useAppStore();
//----------------------------------------------------------
const selectedScreen = ref(null);
//----------------------------------------------------------
function screenSelected() {
  appStore.setActiveScreen(selectedScreen.value);
}
//----------------------------------------------------------
function getRandomCode() {
  let code = getKeyCode(8);
  console.log(code);
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

  <button @click="appStore.seedDatabase" title="seed database">
    <font-awesome-icon icon="fa-seedling" />
  </button>
 
  <button @click="getRandomCode" title="get random code">
    <font-awesome-icon icon="fa-solid fa-lock" />
  </button>
  <button  title="game actions">
    <font-awesome-icon icon="fa-solid fa-cog" />
  </button>


</div>
</template>

<style scoped lang="scss">
.developer-nav {
  position: absolute;
  top: 10px; right: 10px;
  display: flex;
}
</style>