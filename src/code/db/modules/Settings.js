
export default class Settings {
  constructor(db) {
    this.db = db;
  }


  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      store.getAll().addEventListener("success", (evt) => {
        let list = evt.target.result;
        list.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(list);
      });
    });
  }
          
  async getCollection(ids) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      const collection = [];
      ids.forEach(id => {
        store.get(id).addEventListener("success", (evt) => {
          collection.push(evt.target.result);
        });
      });      
      collection.sort((a, b) => (a.name > b.name) ? 1 : -1);
      tx.addEventListener('complete', () => resolve(collection));
    });
  }

  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readwrite');
      const store = tx.objectStore('Settings');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readwrite');
      const store = tx.objectStore('Settings');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}