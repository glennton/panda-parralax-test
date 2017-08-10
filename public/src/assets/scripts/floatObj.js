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
    this.ratioX;
    this.stage;
    this.h;
    this.w;

  }
  //Calc Positioning and sizes - on load and if modified

  _setViewBox(){
    let computedElement = window.getComputedStyle(this.element)
    return {
      w : $(this.element).outerWidth(),
      h : $(this.element).outerHeight()
    }

  }
  _setDimensions(){
    let viewBox = this._setViewBox()
    this.proportion = viewBox.w  / viewBox.h;
    console.log('THIS.PROPORTION', this.proportion)
    if(this.initH){
      this.h = this.stage.h * (this.initH / 100)
      this.w = this.h * this.proportion
    }
    if(this.initW){
      this.w = this.stage.w * (this.initW / 100)
      this.h = this.w / this.proportion
    }
    console.log('THIS.H ', this.h )
    this.pcH = this.h / this.parent.h * 100;
    this.pcW = this.w / this.stage.w * 100;
  }
  _setSyles(){
    $(this.element).css({
      'width': `${this.w}px`,
      'height': `${this.h}px`,
      'z-index': this.z,
      'rotate': this.rotate,
      'top': `${this.initPcY / this.parent.scale}%`,
      'left': `${this.initPcX}%`
    })
  }
  calcPos(){
    console.log('calcpos')
    this._setDimensions()
    this._setSyles()
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
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
        (this.w / 2)  //Initial X Position, Halved to get center of element
        + this.stage.mouseX // Mouse modifier
        * this.mouseDepth;
      //Y Calc
      const top =
        (this.h / 2)  //Initial X Position, Halved to get center of element
        + this.stage.mouseY // Mouse modifier
        * this.mouseDepth;
      $(this.element).css({
        'margin-left': `-${left}px`,
        'margin-top': `-${top}px`
      })
    }
  }
}
