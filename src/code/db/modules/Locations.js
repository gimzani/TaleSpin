
export default class Locations {
  constructor(db) {
    this.db = db;
  }


  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Locations', 'readonly');
      const store = tx.objectStore('Locations');
      store.getAll().addEventListener("success", (evt) => {
        let list = evt.target.result;
        list.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(list);
      });
    });
  }
          
  async getCollection(ids) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Locations', 'readonly');
      const store = tx.objectStore('Locations');
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
      const tx = this.db.transaction('Locations', 'readonly');
      const store = tx.objectStore('Locations');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Locations', 'readwrite');
      const store = tx.objectStore('Locations');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Locations', 'readwrite');
      const store = tx.objectStore('Locations');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}