
export default class Settings {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
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
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}