export default {
  dbName: "TaleSpin",
  version: 1,

  schema: [
    { name: 'Characters', keys:'characterCode' },
    { name: 'Heroes', keys:'heroCode' },
    { name: 'Scenarios', keys:'scenarioCode' },
    { name: 'SystemPrompts', keys:'promptCode' }
  ]
}