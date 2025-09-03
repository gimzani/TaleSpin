<script setup>
//----------------------------------------------------------
import { ref, computed, onMounted } from 'vue'
import TaleSpinDb from 'src/code/db/talespinDb';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import DeveloperNav from './ui/components/DeveloperNav.vue';
//----------------------------------------------------------
const db = TaleSpinDb.getInstance();
const appStore = useAppStore();
//----------------------------------------------------------
onMounted(() => {
  db.init();
});
//----------------------------------------------------------
</script>

<template>
<component :is="appStore.activeScreen" />
<DeveloperNav></DeveloperNav>
</template>