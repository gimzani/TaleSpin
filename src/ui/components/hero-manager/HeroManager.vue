<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useDialog } from 'src/code/composables/useDialog.js';
//----------------------------------------------------------
import HeroList from './controls/HeroList.vue'
import HeroNewEdit from './controls/HeroNewEdit.vue'
//----------------------------------------------------------
const appStore = useAppStore();
const dialog = useDialog();
//----------------------------------------------------------
const props = defineProps({
  select: { type: Boolean, default: true }
});
const emit = defineEmits(['finish']);
//----------------------------------------------------------
const items = ref([]);
const selectedItem = ref(null);
const editingItem = ref(false);
//----------------------------------------------------------
async function listItems() {
  items.value = await appStore.listHeroes();
}
//----------------------------------------------------------
async function saveItem(item) {
  await appStore.saveHero(item);
  await listItems();
  editingItem.value = false;
}
//----------------------------------------------------------
async function removeItem(item) {
  const confirm = await dialog.confirm({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete the character "${item.name}"? This action cannot be undone.`
  });
  if(confirm) {
    await appStore.deleteHero(item.id);
    await listItems();
  }
}
//----------------------------------------------------------
function editItem(item) {
  selectedItem.value = item;
  editingItem.value = true;
}
//----------------------------------------------------------
function submitSelections() {
  emit('finish', selectedItem.value);
}

//----------------------------------------------------------
watch(() => appStore.db.dbReady.value, async () => {  
  await listItems();
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="hero-manager">

<HeroList 
  v-model="selectedItem"
  :select="select"
  :items="items" 
  @new-item="editingItem=true; selectedItem=null"
  @edit-item="editItem"
  @remove-item="removeItem"
  @finish="submitSelections"
  v-if="!editingItem" />

<HeroNewEdit 
  :item="selectedItem"
  @cancel="editingItem=false; selectedItem=null"
  @save="saveItem"
  v-if="editingItem" />

</div>
</template>

<style scoped lang="scss">
.hero-manager {
  width: 100%;
}
</style>