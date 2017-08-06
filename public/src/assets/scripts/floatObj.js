export class floatObj {
  constructor(src, parent, name, options) {
    options = options || {}

    //Main Arguments
    this.parent           = document.getElementById(parent);
    this.src              = src;
    this.name = name
    //Options
    this.initPcX        = options['data-x'] || 50;
    this.initPcY        = options['data-y'] || 50;
    this.mouseDepth     = options['data-mouse-depth'] || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.plaxDepth      = options['data-plax-depth'] || 1;
    this.initScaleW     = options['data-scale-x'] || 1;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.initScaleH     = options['data-scale-y'] || this.initScaleW;
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    this.color          = options['data-color'] || "#000000";
    this.z              = options['z'] || 20;
    this.t = 1
    //Not Set
    this.element;
    this.pcW;
    this.pcH;
    this.pcX;
    this.pcY;
    this.containerObj = {};
    this.containerObj.interpolation = 1;
    this.proportion;
    this

  }
  //Calc Positioning and sizes - on load and if modified
  calcPos(){
    //Set X,Y to center of element
    this.pcX = this.initPcX - (this.pcW / 2)
    this.pcY = this.initPcY - (this.pcH / 2)
    console.log(this.pcX, this.pcY, this.initPcX, this.initPcY )
  }

  _setViewBox(){
    let computedElement = window.getComputedStyle(this.element)
    return {
      w : computedElement.getPropertyValue('width'),
      h : computedElement.getPropertyValue('height')
    }
  }
  _setDimensions(){
    let viewBox = this._setViewBox()
    this.pcW = 100 * this.initScaleW

    this.proportion = viewBox.w / viewBox.h;
    this.pcH = this.pcW / this.proportion
  }
  _setSyles(){
    this.element['style']['fill'] = this.color
    this.element['style']['color'] = this.color
    this.element['style']['width'] = `${this.pcW}%`;
    this.element['style']['height'] = `${this.pcH}%`;
    this.element['style']['z-index'] = this.z;
    this.element['style']['transform'] = `rotate(${this.rotate }deg)`;
    this.element['style']['-webkit-transform'] = `rotate(${this.rotate }deg)`;
  }
  // Make sprite and add to stage
  make(e){
    this.element = e;
    e.setAttribute('class', `floatingObject ${this.name}`)
    this._setDimensions()
    this._setSyles()
    //Recalc position
    this.calcPos()
    //Calc first frame
    this.calcFrame({x:0,y:0} , 1)
    //Set this.element for future use
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
    this.element.style['top'] =
      (this.pcY)  //Initial X Position, Halved to get center of element
      + mousePos.y // Mouse modifier
      * this.mouseDepth
      + '%';
    console.log(this.pcX, mousePos.x, this.mouseDepth , '|', this.pcY, mousePos.y)
  }
}
