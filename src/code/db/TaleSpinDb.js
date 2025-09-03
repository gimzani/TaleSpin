//-----------------------------------------------------------------------------
import { ref } from 'vue'
import dbConfig from './db.config.js'
//-----------------------------------------------------------------------------
import Characters from './modules/Characters.js'
import Heroes from './modules/Heroes.js'
import Instructions from './modules/Instructions.js'
import Scenes from './modules/Scenes.js'
import Settings from './modules/Settings.js'
import Tales from './modules/Tales.js'
//-----------------------------------------------------------------------------
export default class TaleSpinDb {
  //-----------------------------------
  db = null;
  //-----------------------------------
  Characters = null;
  Heroes = null;
  Instructions = null;
  Scenes = null;
  Settings = null;
  Tales = null;
  //-----------------------------------
  errorMessage = null;
  ready = false;
  dbReady = ref(false); 
  //---------------------------------------------------------------------------
  static getInstance() {
    if(!this.instance) {
      this.instance = new TaleSpinDb();
    }
    return this.instance;
  }
  //---------------------------------------------------------------------------
  init() {
    //--------------------------------
    const dbOpenRequest = indexedDB.open(dbConfig.dbName, dbConfig.version);
    //--------------------------------
    dbOpenRequest.onupgradeneeded = async (evt) => {
      //----------------------------
      const db = evt.target.result;
      const objectStores = Array.from(db.objectStoreNames);
      //----------------------------
      if(objectStores.length===0) {
        for(const table of dbConfig.schema) {
          let indexes = table.keys.split(',').map(i => i.trim());
          const store = db.createObjectStore(table.name, { keyPath: indexes[0] });
          for(let i=1; i<indexes.length; i++) {
            if(indexes[i].includes('|')) {
              let composite = indexes[i].split('|').map(i => i.trim());
              store.createIndex(indexes[i],composite);
            } else {
              store.createIndex(indexes[i], indexes[i]);
            }
          }
        }
      }
    }
    //--------------------------------
    dbOpenRequest.onsuccess = (evt) => {
      this.db = evt.target.result;          
      this.buildFunctionLibrary();
      this.dbReady.value = true;
    };
    //--------------------------------
    dbOpenRequest.onerror = (evt) => {
      this.errorMessage = evt.target.error;
    }; 
    //--------------------------------
  }
  //-----------------------------------
  buildFunctionLibrary() {
    this.Characters = new Characters(this.db);
    this.Heroes = new Heroes(this.db);
    this.Instructions = new Instructions(this.db);
    this.Scenes = new Scenes(this.db);
    this.Settings = new Settings(this.db);
    this.Tales = new Tales(this.db);
  }
  //-----------------------------------
}