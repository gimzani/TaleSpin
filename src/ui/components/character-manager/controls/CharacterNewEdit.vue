<script setup>
//----------------------------------------------------------
import { ref, computed, watch } from 'vue'
import Character from 'src/code/models/Character.js'
//----------------------------------------------------------
import TextareaField from 'src/ui/components/global/TextareaField.vue';
import TabbedPanel from 'src/ui/components/global/TabbedPanel.vue';
//----------------------------------------------------------
const props = defineProps({
  item: { type: Object } 
});
const emit = defineEmits(['cancel', 'save']);
//----------------------------------------------------------
const selectedItem = ref(new Character());
const tabs = [
  {
    "tag": "appearance",
    "label": "Appearance",
    "default": true
  },
  {
    "tag": "personality",
    "label": "Personality"
  },
  {
    "tag": "details",
    "label": "Details"
  },
]
//----------------------------------------------------------
const mode = computed(() => props.item ? 'Edit' : 'New');
//----------------------------------------------------------
watch(() => props.item, (val) => {
  if(val) {
    selectedItem.value = new Character(val);
  }  
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>

<div class="component-form-frame">

  <div class="section-header">
    <div class="section-title">{{ mode }} Character</div>
  </div>

  <div class="component-form">

    <div class="row gap-2">
      <div class="col">
        <input class="w-100" type="text" placeholder="character name/nickname" v-model="selectedItem.name" />
      </div>
      <div class="col">
        <input class="w-100" type="text" placeholder="full name" v-model="selectedItem.fullName" />
      </div>
    </div>

    <div class="py-2">
      <input class="w-100" type="text" placeholder="other names" v-model="selectedItem.otherNames" />
    </div>

    <TabbedPanel :tabs="tabs">
      <template #panel-appearance>
        <TextareaField class="w-100" rows="12" v-model="selectedItem.appearance" :maxWords="500" :showWordCount="true"></TextareaField>
      </template>
      <template #panel-personality>
        <TextareaField class="w-100" rows="12" v-model="selectedItem.personality" :maxWords="500" :showWordCount="true"></TextareaField>
      </template>
      <template #panel-details>
        <TextareaField class="w-100" rows="12" v-model="selectedItem.details" :maxWords="500" :showWordCount="true"></TextareaField>
      </template>      
    </TabbedPanel>

  </div>

  <div class="text-end button-group">
    <button class="danger" @click="$emit('cancel')">Cancel</button>
    <button class="success" @click="$emit('save', selectedItem)">Save</button>
  </div>

</div>

</template>