<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useGameStore } from '../../code/stores/useGameStore.js'
import TaleSpinDb from 'src/code/db/talespinDb';
import ContentManager from 'src/ui/components/ContentManager.vue'
//----------------------------------------------------------
const taleSpinDb = TaleSpinDb.getInstance();
const gameStore = useGameStore();
//----------------------------------------------------------
const ready = ref(false);
//----------------------------------------------------------
async function runAiPrompt() {
  let prompt = await gameStore.test();
  console.log(prompt);
}
//----------------------------------------------------------
watch(() => taleSpinDb.dbReady.value, async () => {    
  ready.value = taleSpinDb.dbReady.value;
}, { immediate: true })
//----------------------------------------------------------
</script>
<template>
<div class="developer" v-if="ready">

  
  <ContentManager/>



</div>
</template>

<style scoped lang="scss">
.developer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100vh;

  .dev-portal {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;

    padding: 4rem;

  }

}
</style>