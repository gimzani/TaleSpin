
import characters from '../_dummydata/charactersList.js';
import heroes from '../_dummydata/heroesList.js';
import settings from '../_dummydata/settingsList.js';
import instructions from '../_dummydata/instructionsList.js';


export function seedData(db) {

  for(const character of characters) {
    db.Characters.put(character);
  }

  for(const hero of heroes) {
    db.Heroes.put(hero);
  }

  for(const setting of settings) {
    db.Settings.put(setting);
  }

  for(const instruction of instructions) {
    db.Instructions.put(instruction);
  }

}