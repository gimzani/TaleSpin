<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useDialog } from 'src/code/composables/useDialog.js';
//----------------------------------------------------------
import CharacterList from './controls/CharacterList.vue'
import CharacterNewEdit from './controls/CharacterNewEdit.vue'
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
  items.value = await appStore.listCharacters();
}
//----------------------------------------------------------
async function saveItem(item) {
  await appStore.saveCharacter(item);
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
    await appStore.deleteCharacter(item.id);
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
onMounted(async () => {
  await listItems();
})
//----------------------------------------------------------
</script>
<template>
<div class="character-manager">

<CharacterList 
  v-model="selectedItems"
  :items="items" 
  @new-item="editingItem=true; selectedItem=null"
  @edit-item="editItem"
  @remove-item="removeItem"
  @finish="submitSelections"
  v-if="!editingItem" />

<CharacterNewEdit 
  :item="selectedItem"
  @cancel="editingItem=false; selectedItem=null"
  @save="saveItem"
  v-if="editingItem" />

</div>
</template>

<style scoped lang="scss">
.character-manager {
  width: 100%;
}
</style>