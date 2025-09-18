
//--------------------------------------------------------- deprecating
// Memories are used by the MemoryBank to detail game objects
//--------------------------------------------------------- 
export default class Memory {

  name = null;
  description = null;
  digest = null;
  expanded = null;
  rawRefs = [];
  summaryRefs = [];  
  
  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.name = options.name || this.name;
    this.description = options.description || this.description;
    this.digest = options.digest || this.digest;
    this.expanded = options.expanded || this.expanded;
    this.rawRefs = options.rawRefs || this.rawRefs;
    this.summaryRefs = options.summaryRefs || this.summaryRefs;
  }

}