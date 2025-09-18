<script setup>
//----------------------------------------------------------
import { ref, onMounted } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useDialog } from 'src/code/composables/useDialog.js';
//----------------------------------------------------------
import ScenarioList from './controls/ScenarioList.vue'
import ScenarioNewEdit from './controls/ScenarioNewEdit.vue'
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
  items.value = await appStore.listScenarios();
}
//----------------------------------------------------------
async function saveItem(item) {
  await appStore.saveScenario(item);
  await listItems();
  editingItem.value = false;
}
//----------------------------------------------------------
async function removeItem(item) {
  const confirm = await dialog.confirm({
    title: 'Confirm Delete',
    text: `Are you sure you want to delete the scenario "${item.name}"? This action cannot be undone.`
  });
  if(confirm) {
    await appStore.deleteScenario(item.id);
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
onMounted(async () => {
  await listItems();
})
//----------------------------------------------------------
</script>
<template>
<div class="scenario-manager">

<ScenarioList 
  v-model="selectedItem"
  :select="select"
  :items="items" 
  @new-item="editingItem=true; selectedItem=null"
  @edit-item="editItem"
  @remove-item="removeItem"
  @finish="submitSelections"
  v-if="!editingItem" />

<ScenarioNewEdit 
  :item="selectedItem"
  @cancel="editingItem=false; selectedItem=null"
  @save="saveItem"
  v-if="editingItem" />

</div>
</template>

<style scoped lang="scss">
.scenario-manager {
  width: 100%;
}
</style>