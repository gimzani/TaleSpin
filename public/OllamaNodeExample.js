import ollama from 'ollama'

// memory buffers
let storySummary = "The party has just left the village.";
let history = [];

async function narrate(playerInput) {
  // Add player input to history
  history.push({ role: "user", content: playerInput });

  // Keep only the last 6 messages
  const recentHistory = history.slice(-6)
    .map(m => `${m.role.toUpperCase()}: ${m.content}`)
    .join("\n");

  const prompt = `
  ## Story so far:
  ${storySummary}

  ## Recent conversation:
  ${recentHistory}

  ## Player just said:
  ${playerInput}

  Continue the story:
  `;

  const response = await ollama.chat({
    model: 'storyteller',
    messages: [{ role: 'user', content: prompt }]
  });

  // Add narrator response to history
  history.push({ role: "assistant", content: response.message.content });

  return response.message.content;
}

// Example game loop:
(async () => {
  console.log(await narrate("I draw my sword and face the goblin."));
})();
