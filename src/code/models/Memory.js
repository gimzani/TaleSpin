
//---------------------------------------------------------
// Memories are used by the scene buffer to detail game objects
//---------------------------------------------------------
export default class Memory {

  digest = null;
  expanded = null;
  rawRefs = [];
  summaryRefs = [];  
  
  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.digest = options.digest || this.digest;
    this.expanded = options.expanded || this.expanded;
    this.rawRefs = options.rawRefs || this.rawRefs;
    this.summaryRefs = options.summaryRefs || this.summaryRefs;
  }

}