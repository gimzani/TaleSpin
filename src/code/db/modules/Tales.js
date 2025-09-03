
export default class Tales {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readonly');
      const store = tx.objectStore('Tales');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  } 
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readonly');
      const store = tx.objectStore('Tales');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readonly');
      const store = tx.objectStore('Tales');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}