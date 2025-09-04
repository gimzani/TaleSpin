<script setup>
//----------------------------------------------------------
import { ref, computed, onMounted } from 'vue'
import TaleSpinDb from 'src/code/db/talespinDb';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import GameFab from './ui/components/GameFab.vue';
//----------------------------------------------------------
const taleSpinDb = TaleSpinDb.getInstance();
const appStore = useAppStore();
//----------------------------------------------------------
onMounted(() => {
  taleSpinDb.init();
});
//----------------------------------------------------------
</script>

<template>
<component :is="appStore.activeScreen" />
<GameFab />
</template>