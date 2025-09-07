<script setup>
//----------------------------------------------------------
import { watch, ref, computed } from 'vue'
import { SCREENS, STORY_GENRE, AI_VOICE } from 'src/code/enums.js';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useGameStore } from 'src/code/stores/useGameStore'; 
import { useContentStore } from 'src/code/stores/useContentStore'; 
//----------------------------------------------------------
import CharacterInPlay from 'src/code/models/CharacterInPlay.js'
import Tale from 'src/code/models/Tale.js'
//----------------------------------------------------------
import TextareaField from 'src/ui/components/global/TextareaField.vue';
import ModalManager from 'src/ui/components/global/ModalManager.vue';
//----------------------------------------------------------
const appStore = useAppStore();
const gameStore = useGameStore();
const contentStore = useContentStore();
const tale = ref(new Tale());
//----------------------------------------------------------
const ready = computed(() => (tale.value.hero && tale.value.characters.length>0 && tale.value.settings.length>0 && tale.value.name && tale.value.description) );
//----------------------------------------------------------
function cancel() {
  appStore.setActiveScreen(SCREENS.SPLASH);
}
//----------------------------------------------------------
async function beginTheStory() {
  await gameStore.saveTale(tale.value);
  appStore.setActiveScreen(SCREENS.PLAY);
}
//----------------------------------------------------------
watch(() => contentStore.heroesModal, async (val) => {
  if(!val) {
    tale.value.hero = await contentStore.pullHeroSelection();
  }
});
//----------------------------------------------------------
watch(() => contentStore.charactersModal, async (val) => {
  if(!val) {
    let characters = await contentStore.pullCharacterSelection();
    tale.value.characters = characters.map(c => new CharacterInPlay(c));
  }
});
//----------------------------------------------------------
watch(() => contentStore.settingsModal, async (val) => {
  if(!val) {
    tale.value.settings = await contentStore.pullSettingSelection();
  }
});
//----------------------------------------------------------
watch(() => contentStore.scenariosModal, async (val) => {
  if(!val) {
    const scenario = await contentStore.pullScenarioSelection(); 
    tale.value.description = scenario.text;
  }
});
//----------------------------------------------------------
</script>
<template>
<div class="config-component" v-if="appStore.db.dbReady.value">

  <div class="row gx-2">
    <div class="col">
      <label for="taleName">Genre: </label>    
      <select class="w-100" v-model="tale.genre">
        <option v-for="g in STORY_GENRE">{{ g }}</option>
      </select>

    </div>
    <div class="col">
      <label for="taleName">Voice: </label>
      <select class="w-100" v-model="tale.voice">
        <option v-for="v in AI_VOICE">{{ v }}</option>
      </select>
    </div>
  </div>

  <div class="mt-3">
    <label for="taleName">New Tale Name: </label>    
    <input id="taleName" type="text" v-model="tale.name" />
  </div>
  
  <div class="config-content-selection mt-3 mb-2">
    <label>Story Thus Far: </label>  
    <button class="icon" @click="contentStore.scenariosModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <TextareaField id="storyThusFar" rows="6" v-model="tale.description" :showWordCount="true"></TextareaField>
  

  <div class="config-content-selection">
    <label>The Hero of the Story:</label>
    <button class="icon" @click="contentStore.heroesModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.hero">
    <li>{{ tale.hero.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Supporting Characters:</label>
    <button class="icon" @click="contentStore.charactersModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.characters">
    <li v-for="c in tale.characters">{{ c.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Story Settings: </label>  
    <button class="icon" @click="contentStore.settingsModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  
  <ul class="config-content-items" v-if="tale.settings">
    <li v-for="s in tale.settings">{{ s.name }}</li>
  </ul>

  <div class="config-content-buttons">
    <button class="danger me-1" @click="cancel">Cancel</button>
    <button class="success" @click="beginTheStory" :disabled="!ready">Begin</button>
  </div>

  <ModalManager />

</div>
</template>