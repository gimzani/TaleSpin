<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import TaleSpinDb from 'src/code/db/talespinDb';
import SettingManager from 'src/ui/components/setting-manager/SettingManager.vue'
//----------------------------------------------------------
const taleSpinDb = TaleSpinDb.getInstance();
//----------------------------------------------------------
const ready = ref(false);
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
    <SettingManager></SettingManager>
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