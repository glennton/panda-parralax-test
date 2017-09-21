import {FloatObj} from './FloatObj.js';

export class SvgObj extends FloatObj {
  constructor(src, parent, options) {
    super(parent, options)
    this.src = src;
    this.color = options['data-color'] || null;
  }

  make(e, stage){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    $(svgElement).css(`width`,`${this.imgw}%`)
    e.appendChild(svgElement)
    super.make(e, stage)
    if(this.color){
      $(e).find('path,circle').css(`fill`,`${this.color }`)
    }
  }
}
