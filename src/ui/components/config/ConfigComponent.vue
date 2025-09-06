<script setup>
//----------------------------------------------------------
import { reactive, ref, computed } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useGameStore } from 'src/code/stores/useGameStore'; 
import Tale from 'src/code/models/Tale.js'
//----------------------------------------------------------
import HeroManager from 'src/ui/components/hero-manager/HeroManager.vue'
import CharacterManager from 'src/ui/components/character-manager/CharacterManager.vue'
import SettingManager from 'src/ui/components/setting-manager/SettingManager.vue'
import TextareaField from 'src/ui/components/global/TextareaField.vue';
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const modals = reactive({
  heroesModal: false,
  charactersModal: false,
  settingsModal: false,
});
//----------------------------------------------------------
const appStore = useAppStore();
const gameStore = useGameStore();
const tale = ref(new Tale());
//----------------------------------------------------------
const ready = computed(() => (tale.value.hero && tale.value.characters.length>0 && tale.value.settings.length>0 && tale.value.name && tale.value.description) );
//----------------------------------------------------------
function cancel() {
  appStore.setActiveScreen('SplashScreen');
}
//----------------------------------------------------------
async function setHero(heroId) {
  modals.heroesModal=false;
  tale.value.hero = await gameStore.getHero(heroId);
}
//----------------------------------------------------------
async function setCharacters(characterIds) { 
  modals.charactersModal=false;
  tale.value.characters = await gameStore.getCharacters(characterIds);
}
//----------------------------------------------------------
async function setSettings(selections) { 
  modals.settingsModal=false;
  tale.value.settings = await gameStore.getSettings(selections);
}
//----------------------------------------------------------
async function beginTheStory() {
  await gameStore.saveTale(tale.value);
  appStore.setActiveScreen('PlayScreen');
}
//----------------------------------------------------------
</script>
<template>
<div class="config-component" v-if="appStore.db.dbReady.value">

  <div>
    <label for="taleName">New Tale Name: </label>    
    <input id="taleName" type="text" v-model="tale.name" />
  </div>

  <div class="config-content-selection">
    <label>The Hero of the Story:</label>
    <button class="icon" @click="modals.heroesModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.hero">
    <li>{{ tale.hero.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Supporting Characters:</label>
    <button class="icon" @click="modals.charactersModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.characters">
    <li v-for="c in tale.characters">{{ c.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Story Settings: </label>  
    <button class="icon" @click="modals.settingsModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  
  <ul class="config-content-items" v-if="tale.settings">
    <li v-for="s in tale.settings">{{ s.name }}</li>
  </ul>

  <div class="mt-3">
    <label for="storyThusFar">The Story Thus Far:</label>   
    <TextareaField id="storyThusFar" rows="6" v-model="tale.description" :showWordCount="true"></TextareaField>
  </div>

  <div class="config-content-buttons">
    <button class="danger me-1" @click="cancel">Cancel</button>
    <button class="success" @click="beginTheStory" :disabled="!ready">Begin</button>
  </div>
   
  <Modal container-class="md" :show="modals.heroesModal" @close="modals.heroesModal=false">
    <HeroManager @finish="setHero" />
  </Modal>

  <Modal container-class="md" :show="modals.charactersModal" @close="modals.charactersModal=false">
    <CharacterManager @finish="setCharacters" />
  </Modal>

  <Modal container-class="md" :show="modals.settingsModal" @close="modals.settingsModal=false">
    <SettingManager @finish="setSettings" />
  </Modal>

</div>
</template>