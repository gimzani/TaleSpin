
export default class Scenarios {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readonly');
      const store = tx.objectStore('Scenarios');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  } 
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readonly');
      const store = tx.objectStore('Scenarios');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readonly');
      const store = tx.objectStore('Scenarios');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}