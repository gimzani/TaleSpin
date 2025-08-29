
export default class Heroes {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readonly');
      const store = tx.objectStore('Heroes');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
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
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Heroes', 'readonly');
      const store = tx.objectStore('Heroes');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}