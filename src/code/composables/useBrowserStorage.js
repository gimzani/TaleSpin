// -------------------------------------------------------------------------
// useBrowserStorage 
//   Methods to get and set encrypted objects in local and session storage.
// -------------------------------------------------------------------------
import utf8 from 'utf8'
import b64 from 'base-64'
// -------------------------------------------------------------------------
const ENCRYPTED = false;
// -------------------------------------------------------------------------
export function useBrowserStorage() {
  return {
    getLocalData,
    setLocalData,
    clearLocalData,
    clearAllLocalData,
    getSessionData,
    setSessionData,
    clearSessionData,
    clearAllSessionData,
    clearAllStorage
  }
}

// -------------------------------------------------------------------------
//#region LocalStorage
// -------------------------------------------------------------------------
function getLocalData(storageKey, encrypted=ENCRYPTED) {
  // ---------------------
  if(!storageKey) { console.log('no storage key specified'); return }
  // ---------------------
  let jsonData = localStorage.getItem(storageKey);
  if(!jsonData) { return null; }  
  if(encrypted) {
    jsonData = b64.decode(utf8.encode(jsonData));
  } 
  return JSON.parse(jsonData);
}
// -------------------------------------------------------------------------
function setLocalData(storageKey, data, encrypted=ENCRYPTED) {
  // ---------------------
  if(!storageKey) { console.log('no storage key specified'); return }
  if(!data) { console.log('no storage data specified'); return }
  // ---------------------
  let jsonData = JSON.stringify(data);
  if(encrypted) {   
    jsonData = b64.encode(utf8.encode(jsonData));
  } 
  localStorage.setItem(storageKey, jsonData);
}
// -------------------------------------------------------------------------
function clearLocalData(storageKey) {
  localStorage.removeItem(storageKey);
  console.log(`Cleared Local storage for ${storageKey}`);
}
// -------------------------------------------------------------------------
function clearAllLocalData() {
  localStorage.clear();
  console.log(`Cleared Local storage.`);
}
// -------------------------------------------------------------------------
//#endregion
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
//#region sessionStorage
// -------------------------------------------------------------------------
function getSessionData(storageKey, encrypted=ENCRYPTED) {
  // ---------------------
  if(!storageKey) { console.log('no storage key specified'); return }
  // ---------------------
  let jsonData = sessionStorage.getItem(storageKey);
  if(!jsonData) { return null; }  
  if(encrypted) {
    jsonData = b64.decode(utf8.encode(jsonData));
  } 
  return JSON.parse(jsonData);
}
// -------------------------------------------------------------------------
function setSessionData(storageKey, data, encrypted=ENCRYPTED) {
  // ---------------------
  if(!storageKey) { console.log('no storage key specified'); return }
  if(!data) { console.log('no storage data specified'); return }
  // ---------------------
  let jsonData = JSON.stringify(data);
  if(encrypted) {   
    jsonData = b64.encode(utf8.encode(jsonData));
  } 
  sessionStorage.setItem(storageKey, jsonData);
}
// -------------------------------------------------------------------------
function clearSessionData(storageKey) {
  sessionStorage.removeItem(storageKey);
  console.log(`Cleared Session storage for ${storageKey}`);
}
// -------------------------------------------------------------------------
function clearAllSessionData() {
  sessionStorage.clear();
  console.log(`Cleared Session storage.`);
}
// -------------------------------------------------------------------------
//#endregion
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
function clearAllStorage() {
  localStorage.clear();
  sessionStorage.clear();
  console.log(`Cleared ALL storage.`);
}