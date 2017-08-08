import {floatObj} from '../../assets/scripts/floatObj.js';

export class svgObj extends floatObj {
  constructor(src, parent, name, options) {
    super(parent, name, options)
    this.src = src;
    this.color = options['data-color'] || "#000000";
  }

  _setSyles(){
    this.element['style']['fill'] = this.color
    this.element['style']['color'] = this.color
    super._setSyles()
  }

  make(e, stage){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    e.appendChild(svgElement)
    super.make(e, stage)
  }
}
