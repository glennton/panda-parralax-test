export class floatObj {
  constructor(src, parent, name, options) {
    options = options || {}

    //Main Arguments
    this.parent           = document.getElementById(parent);
    this.src              = src;
    this.name = name
    //Options
    this.initPcX        = options.initPcX || 50;
    this.initPcY        = options.initPcY || 50;
    this.mouseDepth     = options.mouseDepth || 0;
    this.rotate         = options.rotate || 0;
    this.plaxDepth      = options.plaxDepth || 1;
    this.initScaleW     = options.initScaleW || 1;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.initScaleH     = options.initScaleH || this.initScaleW;
    this.floatFrequency = options.floatFrequency || 0;
    this.floatAmplitude = options.floatAmplitude || 0;
    this.floatAngle     = options.floatAngle || 0;
    this.color          = options.color || "#000000";
    this.z              = options.z || 20;
    this.t = 1
    //Not Set
    this.pcW;
    this.pcH;
    this.pcX;
    this.pcY;
    this.containerObj = {};
    this.containerObj.interpolation = 1;
    this.proportion;

  }
  //Calc Positioning and sizes - on load and if modified
  calcPos(){
    //Set X,Y to center of element
    this.pcX = this.initPcX - (this.pcW / 2)
    this.pcY = this.initPcY - (this.pcH / 2)
  }

  _setDimensions(e){
    let viewBox = {
      w : parseFloat(e.children[0].getAttribute('viewBox').split(' ')[2]),
      h : parseFloat(e.children[0].getAttribute('viewBox').split(' ')[3])
    }
    this.pcW = 100 * this.initScaleW

    this.proportion = viewBox.w / viewBox.h;
    this.pcH = this.pcW / this.proportion
  }
  _setSyles(e){
    e['style']['fill'] = this.color
    e['style']['color'] = this.color
    e['style']['width'] = `${this.pcW}%`;
    e['style']['height'] = `${this.pcH}%`;
    e['style']['z-index'] = this.z;
    e['style']['transform'] = `rotate(${this.rotate }deg)`;
    e['style']['-webkit-transform'] = `rotate(${this.rotate }deg)`;
  }
  // Make sprite and add to stage
  make(){
    const newElement = document.createElement('div');
    const svgElement = document.createRange().createContextualFragment(this.src);
    newElement.appendChild(svgElement)
    newElement.setAttribute('class', `floatingObject ${this.name}`)
    this._setDimensions(newElement)
    this._setSyles(newElement)
    this.element = newElement
    this.parent.appendChild(this.element)
    //Recalc position
    this.calcPos()
    //Calc first frame
    this.calcFrame({x:0,y:0} , 1)
  }
  // Refresh position per frame


  calcFrame(mousePos, fps){
    let topCalc;

    //X Calc
    this.element.style['left'] =
      (this.pcX)  //Initial X Position, Halved to get center of element
      + mousePos.x // Mouse modifier
      * this.mouseDepth
      + '%';
    //Y Calc
    topCalc =
      this.pcY //Initial Y Position, Halved to get center of element
      + (mousePos.y * this.mouseDepth) // Mouse modifier
      + (-1 * this.containerObj.interpolation * this.plaxDepth / 10)
      //* - .1 * (this.containerObj.interpolation - 50) //

    this.element.style['top'] = topCalc + '%';
    if(this.name=='cloud01'){
      //console.log(this.containerObj.interpolation)
    }
  }
}
