import {floatObj} from '../../assets/scripts/floatObj.js';

export class htmlObj extends floatObj {
  constructor(parent, options) {
    super(parent, options)
    this.color = options['data-color'] || null;
  }

  make(e, stage){
    super.make(e, stage)
    if(this.color){
      this.element.style['background-color'] = this.color;
    }
  }
}
