<script setup>
//----------------------------------------------------------
import { ref, computed } from 'vue'
import { SCREENS, STORY_GENRE, AI_VOICE } from 'src/code/enums.js';
import { useAppStore } from 'src/code/stores/useAppStore'; 
import { useGameStore } from 'src/code/stores/useGameStore'; 
//----------------------------------------------------------
import Tale from 'src/code/models/Tale.js'
import Character from 'src/code/models/Character.js'
//----------------------------------------------------------
import TextareaField from 'src/ui/components/global/TextareaField.vue';
import HeroManager from 'src/ui/components/hero-manager/HeroManager.vue'
import CharacterManager from 'src/ui/components/character-manager/CharacterManager.vue'
import LocationManager from 'src/ui/components/location-manager/LocationManager.vue'
import ScenarioManager from 'src/ui/components/scenario-manager/ScenarioManager.vue'
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const appStore = useAppStore();
const gameStore = useGameStore();
//----------------------------------------------------------
const tale = ref(new Tale());
const initialContent = ref(null);
//----------------------------------------------------------
const ready = computed(() => (tale.value.hero && tale.value.characters.length>0 && tale.value.locations.length>0 && tale.value.name && tale.value.scenario) );
//----------------------------------------------------------
const heroesModal = ref(false);
const charactersModal = ref(false);
const locationsModal = ref(false);
const scenariosModal = ref(false);
//----------------------------------------------------------
function cancel() {
  appStore.setActiveScreen(SCREENS.SPLASH);
}
//----------------------------------------------------------
async function beginTheStory() {
  await gameStore.newTale(tale.value, initialContent.value);
  appStore.setActiveScreen(SCREENS.PLAY);
}
//----------------------------------------------------------
//----------------------------------------------------------
async function setHero(heroId) {
  tale.value.hero = await appStore.getHero(heroId);
  heroesModal.value=false;
}
//----------------------------------------------------------
async function setCharacters(characterIds) {
  let characters = await appStore.getCharacters(characterIds);
  tale.value.characters = characters.map(c => new Character(c));
  charactersModal.value=false;
}
//----------------------------------------------------------
async function setLocations(locationIds) {
  let locations = await appStore.getLocations(locationIds);
  tale.value.locations = locations;
  locationsModal.value=false;
}
//----------------------------------------------------------
async function setScenario(scenarioId) {
  let scenario = await appStore.getScenario(scenarioId);
  tale.value.scenario = scenario.text;
  scenariosModal.value=false;
}
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
    <button class="icon" @click="scenariosModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <TextareaField id="storyThusFar" rows="6" v-model="tale.scenario" :showWordCount="true" placeholder="Story thus far"></TextareaField>
  <div>    
    <TextareaField id="initialContent" rows="6" v-model="initialContent" :showWordCount="true" placeholder="Initial Content"></TextareaField>
  </div>  

  <div class="config-content-selection">
    <label>The Hero of the Story:</label>
    <button class="icon" @click="heroesModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.hero">
    <li>{{ tale.hero.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Supporting Characters:</label>
    <button class="icon" @click="charactersModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  <ul class="config-content-items" v-if="tale.characters">
    <li v-for="c in tale.characters">{{ c.name }}</li>
  </ul>
  
  <div class="config-content-selection">
    <label>Story Locations: </label>  
    <button class="icon" @click="locationsModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  
  <ul class="config-content-items" v-if="tale.locations">
    <li v-for="s in tale.locations">{{ s.name }}</li>
  </ul>

  <div class="config-content-buttons">
    <button class="danger me-1" @click="cancel">Cancel</button>
    <button class="success" @click="beginTheStory" :disabled="!ready">Begin</button>
  </div>

  <!-- MODALS -->

  <Modal container-class="md" :show="heroesModal" @close="heroesModal=false">
    <HeroManager @finish="setHero" />
  </Modal>

  <Modal container-class="md" :show="charactersModal" @close="charactersModal=false">
    <CharacterManager @finish="setCharacters" />
  </Modal>

  <Modal container-class="md" :show="locationsModal" @close="locationsModal=false">
    <LocationManager @finish="setLocations" />
  </Modal>

  <Modal container-class="md" :show="scenariosModal" @close="scenariosModal=false">
    <ScenarioManager @finish="setScenario" />
  </Modal>

</div>
</template>