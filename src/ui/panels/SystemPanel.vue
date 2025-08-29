<script setup>
//----------------------------------------------------------
import { ref, watch } from 'vue'
import TaleSpinDb from 'src/code/db/talespinDb';
//----------------------------------------------------------
const db = TaleSpinDb.getInstance();
//----------------------------------------------------------
const props = defineProps({
  db: { type: Object}
});
const emit = defineEmits([]);
//----------------------------------------------------------
const systemPrompts = ref([]);
const characters = ref([]);
const heroes = ref([]);
const scenarios = ref([]);
//----------------------------------------------------------
async function listSystemPrompts() {
  systemPrompts.value = await db.SystemPrompts.list();
}
//----------------------------------------------------------
async function listCharacters() {
  systemPrompts.value = await db.Characters.list();
}
//----------------------------------------------------------
async function listHeroes() {
  systemPrompts.value = await db.Heroes.list();
}
//----------------------------------------------------------
async function listScenarios() {
  systemPrompts.value = await db.Scenarios.list();
}
//----------------------------------------------------------
watch(() => db.dbReady.value, async () => {  
  if(db.dbReady.value) {
    listSystemPrompts();
    listCharacters();
    listHeroes();
    listScenarios;
  }
}, { immediate: true })
//----------------------------------------------------------
</script>
<template>
<div class="system-panel">
  
  <div>
    <label>System Prompt:</label> 
    <div class="d-flex">
      <select>
        <option v-for="s in systemPrompts" :value="s.promptCode" :key="s.promptCode">{{ s.name }}</option>
      </select>
      <button>+</button>
    </div>
  </div>
  
  <div>
    <label>Scenario:</label> 
    <div class="d-flex">
      <select>
        <option v-for="s in scenarios" :value="s.scenarioCode" :key="s.scenarioCode">{{ s.name }}</option>
      </select>
      <button>+</button>
    </div>
  </div>
  
  <div>
    <label>Characters:</label>
    <div class="d-flex">
      <select>
        <option v-for="c in characters" :value="c.characterCode" :key="c.characterCode">{{ c.name }}</option>
      </select>
      <button>+</button>
    </div>
  </div>
  
  <div>
    <label>Heroes:</label> 
    <div class="d-flex">
      <select>
        <option v-for="h in heroes" :value="h.heroCode" :key="h.heroCode">{{ h.name }}</option>
      </select>
      <button>+</button>
    </div>
  </div>

</div>
</template>

<style scoped lang="scss">
.system-panel {

}
</style>