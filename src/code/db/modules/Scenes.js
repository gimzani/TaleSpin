
export default class Scenes {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenes', 'readonly');
      const store = tx.objectStore('Scenes');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  } 
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenes', 'readonly');
      const store = tx.objectStore('Scenes');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenes', 'readonly');
      const store = tx.objectStore('Scenes');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}