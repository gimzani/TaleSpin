<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
import { useContentStore } from 'src/code/stores/useContentStore'; 
//----------------------------------------------------------
const props = defineProps({});
const emit = defineEmits([]);
//----------------------------------------------------------
const contentStore = useContentStore();
//----------------------------------------------------------
import HeroManager from 'src/ui/components/hero-manager/HeroManager.vue'
import CharacterManager from 'src/ui/components/character-manager/CharacterManager.vue'
import LocationManager from 'src/ui/components/location-manager/LocationManager.vue'
import ScenarioManager from 'src/ui/components/scenario-manager/ScenarioManager.vue'
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
async function setHero(heroId) {
  contentStore.heroSelection = heroId;
  contentStore.heroesModal=false;
}
//----------------------------------------------------------
async function setCharacters(characterIds) { 
  contentStore.characterSelection = characterIds;
  contentStore.charactersModal=false;
}
//----------------------------------------------------------
async function setLocations(locationsIds) { 
  contentStore.locationSelection = locationsIds;
  contentStore.locationsModal=false;
}
//----------------------------------------------------------
async function setScenarios(scenarioId) { 
  contentStore.scenarioSelection = scenarioId;
  contentStore.scenariosModal=false;
}
//----------------------------------------------------------
</script>
<template>
<div class="modal-manager">
     
  <Modal container-class="md" :show="contentStore.heroesModal" @close="contentStore.heroesModal=false">
    <HeroManager @finish="setHero" />
  </Modal>

  <Modal container-class="md" :show="contentStore.charactersModal" @close="contentStore.charactersModal=false">
    <CharacterManager @finish="setCharacters" />
  </Modal>

  <Modal container-class="md" :show="contentStore.locationsModal" @close="contentStore.locationsModal=false">
    <LocationManager @finish="setLocations" />
  </Modal>

  <Modal container-class="md" :show="contentStore.scenariosModal" @close="contentStore.scenariosModal=false">
    <ScenarioManager @finish="setScenarios" />
  </Modal>

</div>
</template>
