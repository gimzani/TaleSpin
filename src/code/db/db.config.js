export default {
  dbName: "TaleSpin",
  version: 1,

  schema: [
    { name: 'Characters', keys:'id' },
    { name: 'Heroes', keys:'id' },
    { name: 'Scenarios', keys:'id' },
    { name: 'Locations', keys:'id' },
    { name: 'Tales', keys:'id' },
    { name: 'Sessions', keys:'id' },
  ]
}