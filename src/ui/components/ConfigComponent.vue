<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
//----------------------------------------------------------
const appStore = useAppStore();
//----------------------------------------------------------
function cancel() {
  appStore.setActiveScreen('SplashScreen');
}
//----------------------------------------------------------
function beginTheStory() {
  appStore.setActiveScreen('PlayScreen');
}
//----------------------------------------------------------
</script>
<template>
<div class="config-component">


  <div>
    New Tale Name: 
    <input type="text" />
  </div>

  <div>
    The Hero of the Story: 
    <input type="text" />
    <input type="hidden" />
  </div>

  <div>
    Supporting Characters: 
    <input type="text" />
    <input type="hidden" />
  </div>
  
  <div>
    The Initial Setting: 
    <input type="text" />
    <input type="hidden" />
  </div>

  <div>
    The Story Thus Far: 
    <input type="text" />
    <input type="hidden" />
  </div>

  <div>
    How do we begin?: 
    <input type="text" />
    <input type="hidden" />
  </div>

  <div>
    <button class="danger" @click="cancel">Cancel</button>
    <button class="success" @click="beginTheStory">Begin</button>
  </div>

</div>
</template>

<style scoped lang="scss">
.config-component {

}
</style>