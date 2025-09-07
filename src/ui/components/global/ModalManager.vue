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
import SettingManager from 'src/ui/components/setting-manager/SettingManager.vue'
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
async function setSettings(settingsIds) { 
  contentStore.settingSelection = settingsIds;
  contentStore.settingsModal=false;
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

  <Modal container-class="md" :show="contentStore.settingsModal" @close="contentStore.settingsModal=false">
    <SettingManager @finish="setSettings" />
  </Modal>

  <Modal container-class="md" :show="contentStore.scenariosModal" @close="contentStore.scenariosModal=false">
    <ScenarioManager @finish="setScenarios" />
  </Modal>

</div>
</template>
