<script setup>
//----------------------------------------------------------
import { ref, computed, watch } from 'vue'
import Setting from 'src/code/models/Setting.js'
//----------------------------------------------------------
import TextareaField from 'src/ui/components/global/TextareaField.vue';
//----------------------------------------------------------
const props = defineProps({
  item: { type: Object } 
});
const emit = defineEmits(['cancel', 'save']);
//----------------------------------------------------------
const selectedItem = ref(new Setting());
//----------------------------------------------------------
const mode = computed(() => props.item ? 'Edit' : 'New');
//----------------------------------------------------------
watch(() => props.item, (val) => {
  if(val) {
    selectedItem.value = new Setting(val);
  }  
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>

<div class="component-form-frame">

  <div class="section-header">
    <div class="section-title">{{ mode }} Setting</div>
  </div>

  <div class="component-form">
    <div class="mb-2">
      <input class="w-100" type="text" placeholder="content name" v-model="selectedItem.name" />
    </div>
    <div class="mb-2">
      <TextareaField class="w-100" rows="8" v-model="selectedItem.description" :maxWords="300" :showWordCount="true"></TextareaField>
    </div>
  </div>

  <div class="text-end button-group">
    <button class="danger" @click="$emit('cancel')">Cancel</button>
    <button class="success" @click="$emit('save', selectedItem)">Save</button>
  </div>

</div>

</template>