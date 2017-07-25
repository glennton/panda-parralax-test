export class floatingObj {
  constructor(src, parent, options) {
    options = options  || {};
    this.parent = document.getElementById(parent);
    this.src = src;
    //Set Defaults
    let {
      initPcX = 50,
      initPcY = 50,
      depth = 1,
      initScale = 1,
      floatFrequency = 0,
      floatAmplitude = 0,
      floatAngle = 0,
      color = "#0280BE"
    } = options;

    //Assign options to this
    Object.assign(this, options);

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
    this.element = newElement
    this.parent.appendChild(newElement)

    //Recalc position
    this.calcPos()
  }
  // Refresh position per frame
  calcFrame(mousePos){
    /////////MODIFIERS

    //Set Scale

    //Set Center
    //this.element.style['margin-left'] = '-' + this.element.clientWidth / 2 + 'px';
    //this.element.style['margin-top'] = '-' + this.element.clientHeight / 2 + 'px';

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
