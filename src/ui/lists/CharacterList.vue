<script setup>
//----------------------------------------------------------
import { ref } from 'vue'
//----------------------------------------------------------
const props = defineProps({
  items: { type: Array }
});
const emit = defineEmits([]);
//----------------------------------------------------------
function newItem() {

}
//----------------------------------------------------------
function editItem(item) {

}
//----------------------------------------------------------
function removeItem(item) {
  
}
//----------------------------------------------------------
</script>
<template>
<div class="content-list">

  <div class="content-list-header">
    <div class="content-list-header-title">
      Characters
    </div>   
    <div>
      <button class="success" @click="newItem">
        New
      </button>
    </div>    
  </div>  

  <div class="content-list-items">
    <div class="content-list-item" v-for="i in items">
      <div>      
        <div>{{ i.name }}</div>
        <div class="content-item-description">{{ i.description }}</div>
        <div v-if="false">{{ i.description }}</div>
      </div> 
      <div class="content-item-buttons">
        <button class="icon info" @click="editItem(i)">
          <font-awesome-icon icon="edit" />
        </button>
        <button class="icon danger" @click="removeItem(i)">        
          <font-awesome-icon icon="times" />
        </button>
      </div>
    </div>
  </div>

</div>
</template>