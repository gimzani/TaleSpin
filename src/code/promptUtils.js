//--------------------------------------------------------
import { AI_VOICE,  } from 'src/code/enums.js'
import TaleSpinDb from 'src/code/db/TaleSpinDb.js'
//--------------------------------------------------------
const db = TaleSpinDb.getInstance();
//--------------------------------------------------------
//#region public
//--------------------------------------------------------
export async function buildNextPrompt(tale, userInput) {
  let sysPrompt = [];

  let mainInstruction = await db.Instructions.get('MAIN_RP');
  sysPrompt.push(mainInstruction.text + determineVoice(tale));
  sysPrompt.push(getHeroText(tale));
  sysPrompt.push(getCharactersText(tale));
  sysPrompt.push(getActiveCharacterText(tale));
  sysPrompt.push(getActiveLocationText(tale));
  sysPrompt.push(getScenarioInformation(tale));
  sysPrompt.push(getWhatHappenedSoFar(tale, userInput));
  sysPrompt.push(getUserInputDetails(tale));

  //return new ChatMessage({ role: 'system', content: sysPrompt.join('\n\n') });  // chat?
  return sysPrompt.join('\n\n');
}

//--------------------------------------------------------
export function determineVoice(tale) {
  let voice = null;
  if(tale.voice===AI_VOICE.SECOND_PERSON) {
    voice = "\n- Use second person voice when telling the story. Refer to the hero as 'you' unless referred to by a character."
  }
  if(tale.voice===AI_VOICE.THIRD_PERSON) {
    voice = "\n- Use third person voice when telling the story. Refer to the hero by the appropriate gendered pronoun unless referred to by a character."
  }
  return voice;  
}
//--------------------------------------------------------
export function getHeroText(tale) {
  let hero = tale.hero;
  let prompt = `# Our hero is ${hero.name}. Here is ${hero.name}'s description/personality:\n---\n${hero.description}`;
  return prompt;
}

//--------------------------------------------------------
export function getCharactersText(tale) {  
  let prompt = `# The Characters in this story are:\n---`;
  tale.characters.forEach(character => {
    prompt += `\n* ${character.fullName} who goes by ${character.otherNames || character.name}`;
  });
  tale.characters.forEach(character => {
    prompt += `\n\n${character.name} is ${character.appearance} \n ${character.personality}`;
  });
  return prompt;
}

//--------------------------------------------------------
export function getActiveCharacterText(tale) {
  let character = getActiveCharacter(tale);
  let prompt = `# THE ACTIVE CHARACTER IS: ${character.fullName} who goes by ${character.otherNames || character.name}.\n---\n${character.details}`;
  return prompt;
}
//--------------------------------------------------------
export function getActiveLocationText(tale) {
  let location = getActiveLocation(tale);
  let prompt = `# The characters and the hero are located in ${location.name}. Here's what ${location.name} looks like:\n---\n${location.description}`;
  return prompt;
}
//--------------------------------------------------------
export function getScenarioInformation(tale) {
  if(!tale.scenario) {
    tale.scenario = "(None specified. Freeform.)"
  }
  let prompt = `# Here's the initial scenario and world info:\n---\n${tale.scenario}`;
  return prompt;
}
//--------------------------------------------------------
export function getWhatHappenedSoFar(tale, userInput) {  
  let hero = tale.hero;
  let prompt = `# Here's what has happened so far:\n---`;
  if(tale.longterm[0]) {
    prompt+=`\n${tale.longterm[0]}`;
  }
  if(tale.shortterm[0]) {
    prompt+=`\n${tale.shortterm[0]}`;
  }

  tale.messages.forEach(m => {
    prompt += `\n${m}`;
  });

  prompt += `\n${hero.name}: ${userInput}`;

  return prompt;
}
//--------------------------------------------------------
export function getUserInputDetails(tale) {
  let hero = tale.hero;
  let character = getActiveCharacter(tale);
  let prompt = `# Your Task:\n---`;  
  prompt += `\nYour task is to write the next message in this chat/roleplay between ${hero.name} and ${character.name}. There should be a blank new line between messages.`;
  if(tale.whatHappensNext) {
    prompt += `\nIMPORTANT: Rougly speaking, the reader wants this to happen next: **${tale.whatHappensNext}**. You MUST **creatively interpret** these instructions (not repeat verbatim) - be creative! Let it play out in a fascinating and edge-of-your-seat kind of way. `
  }
  if(tale.writingInstruction) {
    prompt += `\nThe reader also gave these more general instructions: ${tale.writingInstruction} `
  }
  return prompt;
}
//--------------------------------------------------------
//#endregion


export function sliceChatLog(text, size=10) {

  // Normalize windows CRLF to LF
  if (typeof text !== 'string' || text.length === 0) return [];

  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Split on two or more newlines (one or more blank lines as delimiter)
  const parts = normalized
    .split(/\n\s*\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);

  // If size is falsy or not a positive number, return all parts
  if (!size || typeof size !== 'number' || size <= 0) return parts;

  // Return the last `size` chunks in order
  return parts.slice(-size);
}




//--------------------------------------------------------
//#region private
//--------------------------------------------------------
export function getActiveCharacter(tale) {
  let character = tale.characters.find(c => c.active);
  if(!character) {
    tale.characters[0].active=true;
    character = tale.characters[0];
  }
  return character;
}

export function getActiveLocation(tale) {
  let location = tale.locations.find(c => c.active);
  if(!location) {
    tale.locations[0].active=true;
    location = tale.locations[0];
  }
  return location;
}
//--------------------------------------------------------
//#endregion