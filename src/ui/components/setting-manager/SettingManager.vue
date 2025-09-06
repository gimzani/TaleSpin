<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useDialog } from 'src/code/composables/useDialog.js';
//----------------------------------------------------------
import SettingList from './controls/SettingList.vue'
import SettingNewEdit from './controls/SettingNewEdit.vue'
//----------------------------------------------------------
const appStore = useAppStore();
const dialog = useDialog();
//----------------------------------------------------------
const emit = defineEmits(['finish']);
//----------------------------------------------------------
const items = ref([]);
const selectedItem = ref(null);
const selectedItems = ref([]);
const editingItem = ref(false);
//----------------------------------------------------------
async function listItems() {
  items.value = await appStore.listSettings();
}
//----------------------------------------------------------
async function saveItem(item) {
  await appStore.saveSetting(item);
  await listItems();
  editingItem.value = false;
}
//----------------------------------------------------------
async function removeItem(item) {
  const confirm = await dialog.confirm({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete the setting "${item.name}"? This action cannot be undone.`
  });
  if(confirm) {
    await appStore.deleteSetting(item.id);
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
  emit('finish', [...selectedItems.value]);
}
//----------------------------------------------------------
watch(() => appStore.db.dbReady.value, async () => {  
  await listItems();
}, { immediate: true });
//----------------------------------------------------------
</script>
<template>
<div class="setting-manager">

<SettingList 
  v-model="selectedItems"
  :items="items" 
  @new-item="editingItem=true; selectedItem=null"
  @edit-item="editItem"
  @remove-item="removeItem"
  @finish="submitSelections"
  v-if="!editingItem" />

<SettingNewEdit 
  :item="selectedItem"
  @cancel="editingItem=false; selectedItem=null"
  @save="saveItem"
  v-if="editingItem" />

</div>
</template>

<style scoped lang="scss">
.setting-manager {
  min-width: 500px;
  max-width: 700px;
  width: 100%;
}
</style>