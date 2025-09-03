
export default class Instructions {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Instructions', 'readonly');
      const store = tx.objectStore('Instructions');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Instructions', 'readonly');
      const store = tx.objectStore('Instructions');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Instructions', 'readonly');
      const store = tx.objectStore('Instructions');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}