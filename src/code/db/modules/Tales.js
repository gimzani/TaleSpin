
export default class Tales {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readonly');
      const store = tx.objectStore('Tales');
      store.getAll().addEventListener("success", (evt) => {
        let list = evt.target.result;
        list.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(list);
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
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readwrite');
      const store = tx.objectStore('Tales');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Tales', 'readwrite');
      const store = tx.objectStore('Tales');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}