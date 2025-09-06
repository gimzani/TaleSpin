<script setup>
//----------------------------------------------------------
import { reactive, ref } from 'vue'
import { useAppStore } from 'src/code/stores/useAppStore'; 
import Tale from 'src/code/models/Tale.js'
//----------------------------------------------------------
import HeroManager from 'src/ui/components/hero-manager/HeroManager.vue'
import CharacterManager from 'src/ui/components/character-manager/CharacterManager.vue'
import SettingManager from 'src/ui/components/setting-manager/SettingManager.vue'
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const modals = reactive({
  heroesModal: false,
  charactersModal: false,
  settingsModal: false,
});
//----------------------------------------------------------
const appStore = useAppStore();
const tale = ref(new Tale());
//----------------------------------------------------------
function cancel() {
  appStore.setActiveScreen('SplashScreen');
}
//----------------------------------------------------------
function setHeroes(selections) { 
  console.log(selections);
  modals.heroesModal=false;
}
//----------------------------------------------------------
function setCharacters(selections) { 
  console.log(selections);
  modals.charactersModal=false;
}
//----------------------------------------------------------
function setSettings(selections) { 
  console.log(selections);
  modals.settingsModal=false;
}
//----------------------------------------------------------
function beginTheStory() {
  appStore.setActiveScreen('PlayScreen');
}
//----------------------------------------------------------
</script>
<template>
<div class="config-component">

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
  
  <div class="config-content-selection">
    <label>Supporting Characters:</label>
    <button class="icon" @click="modals.charactersModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
  
  <div class="config-content-selection">
    <label>The Initial Setting: </label>  
    <button class="icon" @click="modals.settingsModal=true">
      <font-awesome-icon icon="plus" />
    </button>
  </div>

  <div>
    <label for="storyThusFar">The Story Thus Far:</label>   
    <textarea id="storyThusFar" rows="6" v-model="tale.description"></textarea>
  </div>

  <div class="config-content-buttons">
    <button class="danger me-1" @click="cancel">Cancel</button>
    <button class="success" @click="beginTheStory">Begin</button>
  </div>
  
  <input id="hero-id" type="hidden" v-model="tale.hero" />
  <input id="character-ids" type="hidden" v-model="tale.characters" />
  <input id="initial-setting-id" type="hidden" v-model="tale.setting" />
   
  <Modal container-class="md" :show="modals.heroesModal" @close="modals.heroesModal=false">
    <HeroManager @finish="setHeroes" />
  </Modal>

  <Modal container-class="md" :show="modals.charactersModal" @close="modals.charactersModal=false">
    <CharacterManager @finish="setCharacters" />
  </Modal>

  <Modal container-class="md" :show="modals.settingsModal" @close="modals.settingsModal=false">
    <SettingManager @finish="setSettings" />
  </Modal>

</div>
</template>