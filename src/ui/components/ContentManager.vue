<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
import HeroManager from 'src/ui/components/hero-manager/HeroManager.vue'
import CharacterManager from 'src/ui/components/character-manager/CharacterManager.vue'
import LocationManager from 'src/ui/components/location-manager/LocationManager.vue'
import ScenarioManager from 'src/ui/components/scenario-manager/ScenarioManager.vue'
import InstructionManager from 'src/ui/components/instruction-manager/InstructionManager.vue'
import Modal from 'src/ui/components/Modal.vue'
//----------------------------------------------------------
const heroesModal = ref(false);
const charactersModal = ref(false);
const locationsModal = ref(false);
const scenariosModal = ref(false);
const instructionsModal = ref(false);
//----------------------------------------------------------
//----------------------------------------------------------
</script>
<template>
<div class="content-manager">

  <div class="content-manager-buttons">

    <h3>Manage Content</h3>

    <button @click="heroesModal=true" title="open heroes manager">
      <font-awesome-icon icon="fa-solid fa-user" /> Heroes
    </button>
    <button @click="charactersModal=true" title="open locations manager">
      <font-awesome-icon icon="fa-solid fa-users" /> Characters
    </button>
    <button @click="locationsModal=true" title="open locations manager">
      <font-awesome-icon icon="fa-solid fa-dungeon" /> Locations
    </button>
    <button @click="scenariosModal=true" title="open scenarios manager">
      <font-awesome-icon icon="fa-solid fa-pen-fancy" /> Scenarios
    </button>
    <hr/>
    <button @click="instructionsModal=true" title="open instructions manager">
      <font-awesome-icon icon="fa-solid fa-terminal" /> Instructions
    </button>
  </div>
     
  <Modal container-class="md" :show="heroesModal" @close="heroesModal=false">
    <HeroManager :select="false" @finish="heroesModal=false" />
  </Modal>

  <Modal container-class="md" :show="charactersModal" @close="charactersModal=false">
    <CharacterManager :select="false" @finish="charactersModal=false" />
  </Modal>

  <Modal container-class="md" :show="locationsModal" @close="locationsModal=false">
    <LocationManager :select="false" @finish="locationsModal=false" />
  </Modal>

  <Modal container-class="md" :show="scenariosModal" @close="scenariosModal=false">
    <ScenarioManager :select="false" @finish="scenariosModal=false" />
  </Modal>

  <Modal container-class="md" :show="instructionsModal" @close="instructionsModal=false">
    <InstructionManager @finish="instructionsModal=false" />
  </Modal>

</div>
</template>

<style scoped lang="scss">
.content-manager {
  .content-manager-buttons {
    background-color: rgba(0,0,0,0.5);
    color: #fff;
    border: solid 1px #777;
    border-radius: 10px;
    overflow-y: auto;
    padding: 15px;
    width: 300px;

    h3 {
      margin: 0;
      padding: 0 0 10px 0;
      text-align: center;
    }

    button {
      display: block;
      width: 100%;
      margin: 3px 0;
    }
  }

}
</style>