<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useDialog } from 'src/code/composables/useDialog.js';
//----------------------------------------------------------
import InstructionList from './controls/InstructionList.vue'
import InstructionNewEdit from './controls/InstructionNewEdit.vue'
//----------------------------------------------------------
const appStore = useAppStore();
const dialog = useDialog();
//----------------------------------------------------------
const items = ref([]);
const selectedItem = ref(null);
const selectedItems = ref([]);
const editingItem = ref(false);
//----------------------------------------------------------
async function listItems() {
  items.value = await appStore.listInstructions();
}
//----------------------------------------------------------
async function saveItem(item) {
  await appStore.saveInstruction(item);
  await listItems();
  editingItem.value = false;
}
//----------------------------------------------------------
async function removeItem(item) {
  const confirm = await dialog.confirm({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete the instruction "${item.name}"? This action cannot be undone.`
  });
  if(confirm) {
    await appStore.deleteInstruction(item.id);
    await listItems();
  }
}
//----------------------------------------------------------
function editItem(item) {
  selectedItem.value = item;
  editingItem.value = true;
}
//----------------------------------------------------------
onMounted(async () => {
  await listItems();
})
//----------------------------------------------------------
</script>
<template>
<div class="instruction-manager">

<InstructionList 
  v-model="selectedItems"
  :items="items" 
  @new-item="editingItem=true; selectedItem=null"
  @edit-item="editItem"
  @remove-item="removeItem"
  v-if="!editingItem" />

<InstructionNewEdit 
  :item="selectedItem"
  @cancel="editingItem=false; selectedItem=null"
  @save="saveItem"
  v-if="editingItem" />

</div>
</template>

<style scoped lang="scss">
.instruction-manager {
  width: 100%;
}
</style>