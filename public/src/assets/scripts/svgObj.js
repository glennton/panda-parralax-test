import {floatObj} from '../../assets/scripts/floatObj.js';

export class svgObj extends floatObj {
  constructor(src, parent, name, options) {
    super(src, parent, name, options)
  }
  //Calculate box dimensions from svg element
  _setViewBox(){
    return {
      w : parseFloat(this.element.children[0].getAttribute('viewBox').split(' ')[2]),
      h : parseFloat(this.element.children[0].getAttribute('viewBox').split(' ')[3])
    }
  }
  make(e){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    e.appendChild(svgElement)
    super.make(e)
  }
}
