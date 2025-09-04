
export default class Heroes {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readonly');
      const store = tx.objectStore('Heroes');
      store.getAll().addEventListener("success", (evt) => {
        let heroesList = evt.target.result;
        heroesList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(heroesList);
      });
    });
  }
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readonly');
      const store = tx.objectStore('Heroes');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readwrite');
      const store = tx.objectStore('Heroes');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readwrite');
      const store = tx.objectStore('Heroes');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}