
export default class Settings {
  constructor(db) {
    this.db = db;
  }


  async list() {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readonly');
      const store = tx.objectStore('Settings');
      store.getAll().addEventListener("success", (evt) => {
        let charactersList = evt.target.result;
        charactersList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        resolve(charactersList);
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
  
  async put(req) {
    let objectClone = JSON.parse(JSON.stringify(req));
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readwrite');
      const store = tx.objectStore('Settings');
      store.put(objectClone).addEventListener("success", (evt) => {
        resolve(true);
      });
    });
  }

  async delete(code) {
    return new Promise((resolve) => {
      const tx = this.db.transaction('Settings', 'readwrite');
      const store = tx.objectStore('Settings');
      store.delete(code).addEventListener("success", (evt) => {
        resolve(evt.target.result);
      });
    });
  }

}