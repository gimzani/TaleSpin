<script setup>
//----------------------------------------------------------
import { onMounted } from 'vue'
import { SCREENS } from 'src/code/enums.js';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import TaleSpinDb from 'src/code/db/talespinDb';
//----------------------------------------------------------
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
<GameFab v-if="appStore.activeScreenName!==SCREENS.SPLASH" />
</template>