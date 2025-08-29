//---------------------------------------------------------
import { getKeyCode } from 'src/code/codegen.js'
//---------------------------------------------------------
export default class ScenarioModel {

  scenarioCode = getKeyCode(6);
  name = 'unkown';
  prompt = null;
  imageUrl = null;

  constructor(options) {
    if(options) { this.init(options); }
  } 

  init(options) {
    this.scenarioCode = options.scenarioCode || this.scenarioCode;
    this.name = options.name || this.name;
    this.prompt = options.prompt || this.prompt;
    this.imageUrl = options.imageUrl || this.imageUrl;
  }

}