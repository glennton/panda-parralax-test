export class floatObj {
  constructor(parent, name, options) {
    options = options || {}

    //Main Arguments
    this.name = name
    this.parent = parent;

    //Options
    this.initPcX        = options['data-x'] || 50;
    this.initPcY        = options['data-y'] || 50;
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.plaxDepth      = options['data-plax-depth'] || 1;
    this.initW          = options['data-w'] || null;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.initH          = options['data-h'] || null;
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    this.z              = options['data-z'] || 20;
    this.t = 1
    //Not Set
    this.element;
    this.pcW;
    this.pcH;
    this.pcX;
    this.pcY;
    this.proportion;
    this.stage;

  }
  //Calc Positioning and sizes - on load and if modified
  calcPos(){
    console.log(this.parent)
    //Set X,Y to center of element
    this.pcX = this.initPcX - (this.pcW / 2)
    this.pcY = this.initPcY - (this.pcH / 2)
  }

  _setViewBox(){
    let computedElement = window.getComputedStyle(this.element)

    return {
      w : $(this.element).outerWidth(),
      h : $(this.element).outerHeight()
    }

  }
  _setDimensions(){
    let viewBox = this._setViewBox()
    this.proportion = viewBox.w / viewBox.h;
    if(this.initH){
      this.pcH = this.initH/this.parent.scale;
      this.pcW = this.pcH * this.proportion
      console.log(this.proportion, this.pcH, this.pcW, this.parent.scale, this.stage.windowProportion)
    }else{
      this.pcW = this.initW;
      this.pcH = this.initW / this.proportion / this.parent.scale
    }
  }
  _setSyles(){
    $(this.element).css({
      'width': `${this.pcW}%`,
      'min-width': `${this.pcW}%`,
      'height': `${this.pcH}%`,
      'z-index': this.z
    })
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
    this._setDimensions()
    this._setSyles()
    //Recalc position
    this.calcPos()
    //Calc first frame
    this.calcFrame(true)
    //Set this.element for future use
  }
  // Refresh position per frame

  calcFrame(isInit){
    if(this.mouseDepth || isInit){
      //X Calc
      const left =
        (this.pcX)  //Initial X Position, Halved to get center of element
        + this.stage.mouseX // Mouse modifier
        * this.mouseDepth;
      //Y Calc
      const top =
        (this.pcY)  //Initial X Position, Halved to get center of element
        + this.stage.mouseY // Mouse modifier
        * this.mouseDepth;
      $(this.element).css({
        'transform': `translate(${left}%, ${top}%) rotate(${this.rotate }deg)`
      })
    }
  }
}
