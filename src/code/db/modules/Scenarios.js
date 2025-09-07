
export default class Scenarios {
  constructor(db) {
    this.db = db;
  }

  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readonly');
      const store = tx.objectStore('Scenarios');
      store.getAll().addEventListener("success", (evt) => {
        let charactersList = evt.target.result;
        charactersList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(charactersList);
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
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readwrite');
      const store = tx.objectStore('Scenarios');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Scenarios', 'readwrite');
      const store = tx.objectStore('Scenarios');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}