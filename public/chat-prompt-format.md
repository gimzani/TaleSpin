
System Prompt Flow

```js
{ "role": "system", "content": "You are the narrator of a fantasy adventure. Always describe scenes vividly." }
{ "role": "user", "content": "I draw my sword and face the goblin." }
{ "role": "assistant", "content": "The goblin snarls, clutching a rusty blade, ready to fight." }

```
Messages:

```js
[
  { "role": "system", "content": "You are the narrator of a fantasy RPG." },
  { "role": "user", "content": "I walk into the tavern." },
  { "role": "assistant", "content": "The tavern is noisy, filled with drunken sailors and the smell of ale." },
  { "role": "user", "content": "I approach the barkeep and ask for a drink." }
]
```

* system → rules/framework.
* user → input/question.
* assistant → model’s output.



Larger Context:

```JS
{ "role": "system", "content": "NPC roleplay follows the rules below." },
{ "role": "user", "content": "Player: I want to talk to the wizard." },
{ "role": "assistant", "content": "NPC (Wizard): 'Ah, so you seek knowledge...'" }
```
* System = invisible rules of the game.
* User = player input / your instructions.
* Assistant = model’s output (narrator/characters).
* You pass in all three as a history, and the model always produces the next assistant message.