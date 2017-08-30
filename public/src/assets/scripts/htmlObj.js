import {floatObj} from '../../assets/scripts/floatObj.js';

export class htmlObj extends floatObj {
  constructor(src, parent, options) {
    super(parent, options)
  }

  make(e, stage){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    e.appendChild(svgElement)
    super.make(e, stage)
  }
}
