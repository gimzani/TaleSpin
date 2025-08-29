
export default class SystemPrompts {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('SystemPrompts', 'readonly');
      const store = tx.objectStore('SystemPrompts');
      store.getAll().addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async get(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('SystemPrompts', 'readonly');
      const store = tx.objectStore('SystemPrompts');
      store.get(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }
  
  async add(req) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('SystemPrompts', 'readonly');
      const store = tx.objectStore('SystemPrompts');
      store.put(req).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

}