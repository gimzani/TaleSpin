//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
import MemoryBank from './MemoryBank.js'
//---------------------------------------------------------
export default class Session {

  id = getKeyCode(6);
  memoryBank = new MemoryBank();

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.id = options.id || this.id;
    this.memoryBank = options.memoryBank || this.memoryBank;
  }

}