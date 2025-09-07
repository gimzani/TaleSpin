<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import TaleSpinDb from 'src/code/db/talespinDb';
import ModalManager from 'src/ui/components/global/ModalManager.vue'
//----------------------------------------------------------
const taleSpinDb = TaleSpinDb.getInstance();
//----------------------------------------------------------
const ready = ref(false);
const modals = ref(null);
//----------------------------------------------------------
watch(() => taleSpinDb.dbReady.value, async () => {  
  if(taleSpinDb.dbReady.value===true) {
    ready.value = true;
  }
}, { immediate: true })
//----------------------------------------------------------
</script>
<template>
<div class="developer" v-if="ready">

  <div class="dev-portal">
    <ModalManager ref="modals" />
  </div>

</div>
</template>

<style scoped lang="scss">
.developer {

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