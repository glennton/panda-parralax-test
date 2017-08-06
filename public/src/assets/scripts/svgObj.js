import {floatObj} from '../../assets/scripts/floatObj.js';

export class svgObj extends floatObj {
  constructor(src, parent, name, options) {
    super(src, parent, name, options)
    this.color = options['data-color'] || "#000000";
  }

  //Calculate box dimensions from svg element
  _setViewBox(){
    return {
      w : parseFloat(this.element.children[0].getAttribute('viewBox').split(' ')[2]),
      h : parseFloat(this.element.children[0].getAttribute('viewBox').split(' ')[3])
    }
  }

  _setSyles(){
    this.element['style']['fill'] = this.color
    this.element['style']['color'] = this.color
    super._setSyles()
  }

  make(e){
    //Place svg in parent
    const svgElement = document.createRange().createContextualFragment(this.src);
    e.appendChild(svgElement)
    super.make(e)
  }
}
