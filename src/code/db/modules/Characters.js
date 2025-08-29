
export default class Characters {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Characters', 'readonly');
      const store = tx.objectStore('Characters');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Characters', 'readonly');
      const store = tx.objectStore('Characters');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Characters', 'readonly');
      const store = tx.objectStore('Characters');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}