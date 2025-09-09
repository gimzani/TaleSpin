
import characters from '../_dummydata/charactersList.js';
import heroes from '../_dummydata/heroesList.js';
import locations from '../_dummydata/locationsList.js';
import scenarios from '../_dummydata/scenariosList.js';


export async function seedData(db) {
  try {
    for(const character of characters) {
      await db.Characters.put(character);
    }

    for(const hero of heroes) {
      await db.Heroes.put(hero);
    }

    for(const location of locations) {
      await db.Locations.put(location);
    }

    for(const scenario of scenarios) {
      await db.Scenarios.put(scenario);
    }
    return { success: true, message: "Data seeded successfully." }
  } catch {
    return { success: false, message: "Data seed failed." }
  }
}