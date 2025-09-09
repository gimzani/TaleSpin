//-----------------------------------------------------------------------------
import { ref } from 'vue'
import dbConfig from './db.config.js'
//-----------------------------------------------------------------------------
import Characters from './modules/Characters.js'
import Heroes from './modules/Heroes.js'
import Scenarios from './modules/Scenarios.js'
import Locations from './modules/Locations.js'
import Tales from './modules/Tales.js'
import Sessions from './modules/Sessions.js'
//-----------------------------------------------------------------------------
export default class TaleSpinDb {
  //-----------------------------------
  db = null;
  //-----------------------------------
  Characters = null;
  Heroes = null;
  Scenarios = null;
  Locations = null;
  Tales = null;
  Sessions = null;
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
    this.Scenarios = new Scenarios(this.db);
    this.Locations = new Locations(this.db);
    this.Tales = new Tales(this.db);
    this.Sessions = new Sessions(this.db);
  }
  //-----------------------------------
}