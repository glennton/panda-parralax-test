export class floatingObj {
  constructor(src, parent, options) {
    options = options || {}

    //Main Arguments
    this.parent           = document.getElementById(parent);
    this.src              = src;

    //Options
    this.initPcX        = options.initPcX || 50;
    this.initPcY        = options.initPcY || 50;
    this.depth          = options.depth || 1;
    this.initScale      = options.initScale || 1;
    this.floatFrequency = options.floatFrequency || 0;
    this.floatAmplitude = options.floatAmplitude || 0;
    this.floatAngle     = options.floatAngle || 0;
    this.color          = options.color || "#000000";
    this.z              = options.z || 10;

    //Not Set
    this.pcW;
    this.pcH;
    this.pcX;
    this.pcY;

  }
  //Calc Positioning and sizes
  calcPos(){
    this.pcW = 100 * this.initScale
    this.pcH = this.element.clientHeight / this.parent.clientHeight * 100
    //Set X,Y to center of element
    this.pcX = this.initPcX - (this.pcW / 2)
    this.pcY = this.initPcY - (this.pcH / 2)
  }

  // Make sprite and add to stage
  make(){
    const newElement = document.createElement('div');
    const svgElement = document.createRange().createContextualFragment(this.src);
    newElement.appendChild(svgElement)
    newElement.setAttribute('class', 'floatingObject')
    newElement.style['fill'] = this.color
    newElement.style['color'] = this.color
    newElement.style['width'] = 100 * this.initScale + '%';
    newElement.style['z-index'] = this.z;
    this.element = newElement
    this.parent.appendChild(newElement)
    //Recalc position
    this.calcPos()
  }
  // Refresh position per frame
  calcFrame(mousePos){
    this.element.style['left'] =
      (this.pcX)  //Initial X Position, Halved to get center of element
      + mousePos.x
      * this.depth
      + '%';
    this.element.style['top'] =
      (this.pcY) //Initial Y Position, Halved to get center of element
      + mousePos.y
      * this.depth
      + '%';

  }
}
