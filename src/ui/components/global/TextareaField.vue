<script setup>
//---------------------------------------------------------------
import { ref, computed, toRef, useAttrs } from 'vue';
import { countWords } from 'src/code/utils.js'
//---------------------------------------------------------------
const props = defineProps({
  modelValue: { type: String },
  isValid: { type: Boolean, default: true },  
  showWordCount: { type: Boolean, default: true },
  maxWords: { type: Number, default: 500 }
});
defineOptions({ inheritAttrs: false });
const emit = defineEmits(['update:modelValue','input']);
const attrs = useAttrs();
//---------------------------------------------------------------
const inputField = ref(null);
//---------------------------------------------------------------
const wordCount = computed(() => props.modelValue ? countWords(props.modelValue) : 0);
const wordLimit = computed(() => {
  return `${wordCount.value}/${props.maxWords}`;
});
//---------------------------------------------------------------
function setFocus() {
  inputField.value.focus();
}
//---------------------------------------------------------------
function setModelValue(evt) {
  let targetVal = evt.target.value;
  emit('input', targetVal)
  emit('update:modelValue', targetVal);
}
//---------------------------------------------------------------
</script>

<template>
<div 
  :class="$attrs.class, { 'invalid': !isValid }" 
  @click="setFocus"
>
  <textarea ref="inputField" 
    :id="$attrs.id" 
    :name="$attrs.name"
    :placeholder="$attrs.placeholder" 
    :rows="$attrs.rows" 
    :value="modelValue" 
    @input="setModelValue">
  </textarea>
</div>
<div class="word-counter" v-if="maxWords && showWordCount">{{ wordLimit }}</div>
</template>