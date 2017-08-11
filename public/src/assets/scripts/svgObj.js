import {floatObj} from '../../assets/scripts/floatObj.js';

export class svgObj extends floatObj {
  constructor(src, parent, name, options) {
    super(parent, name, options)
    this.src = src;
  }

  make(e, stage){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    e.appendChild(svgElement)
    super.make(e, stage)
  }
}
