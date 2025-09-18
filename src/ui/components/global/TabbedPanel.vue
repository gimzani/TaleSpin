<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  tabs: { type: Array }
});
const emit = defineEmits([]);
//----------------------------------------------------------
const selectedTab = ref(null);
//----------------------------------------------------------
function setTab(item) {
  selectedTab.value = item;
}
//----------------------------------------------------------
watch(() => props.tabs, (val) => {
  let defaultTab = val.find(t => t.default);
  if(defaultTab) {
    selectedTab.value = defaultTab;
  } else {    
    selectedTab.value = props.tabs[0];
  }
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="tabbed-panel">
  <div class="tabs">
    <div class="tab-item-group" v-for="i in tabs">
      <div class="tab-spacer"></div>
      <div class="tab-item" :class="{'active': selectedTab.tag===i.tag}" @click="setTab(i)">
        <font-awesome-icon class="field-icon text-primary" :icon="i.icon" v-if="i.icon" />
        <slot :name="`tab-${i.tag}`">
          <span class="tab-label">{{ i.label }}</span>        
        </slot>
      </div> 
    </div>
    <div class="tab-spacer tab-spacer-end"></div>
  </div>
  <div class="tabbed-panel-panel">      
    <slot :name="`panel-${selectedTab.tag}`"></slot>    
  </div>
</div>
</template>