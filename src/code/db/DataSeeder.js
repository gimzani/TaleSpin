
import characters from '../_dummydata/charactersList.js';
import heroes from '../_dummydata/heroesList.js';
import settings from '../_dummydata/settingsList.js';
import instructions from '../_dummydata/instructionsList.js';


export async function seedData(db) {
  try {
    for(const character of characters) {
      await db.Characters.put(character);
    }

    for(const hero of heroes) {
      await db.Heroes.put(hero);
    }

    for(const setting of settings) {
      await db.Settings.put(setting);
    }

    for(const instruction of instructions) {
      await db.Instructions.put(instruction);
    }
    return { success: true, message: "Data seeded successfully." }
  } catch {
    return { success: false, message: "Data seed failed." }
  }
}