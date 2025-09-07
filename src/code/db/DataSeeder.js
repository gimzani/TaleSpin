
import characters from '../_dummydata/charactersList.js';
import heroes from '../_dummydata/heroesList.js';
import settings from '../_dummydata/settingsList.js';
import scenarios from '../_dummydata/scenariosList.js';


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

    for(const scenario of scenarios) {
      await db.Scenarios.put(scenario);
    }
    return { success: true, message: "Data seeded successfully." }
  } catch {
    return { success: false, message: "Data seed failed." }
  }
}