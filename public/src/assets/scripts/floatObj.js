export class floatObj {
  constructor(parent, name, options) {
    options = options || {}

    //Main Arguments
    this.parent           = document.getElementById(parent);
    this.name = name
    //Options
    this.initPcX        = options['data-x'] || 50;
    this.initPcY        = options['data-y'] || 50;
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.plaxDepth      = options['data-plax-depth'] || 1;
    this.initScaleW     = options['data-scale-x'] || 1;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.initScaleH     = options['data-scale-y'] || this.initScaleW;
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
    this.containerObj = {};
    this.containerObj.interpolation = 1;
    this.proportion;
    this.stage;

  }
  //Calc Positioning and sizes - on load and if modified
  calcPos(){
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
    this.pcW = 100 * this.initScaleW
    this.proportion = viewBox.w / viewBox.h;
    this.pcH = this.pcW / this.proportion
  }
  _setSyles(){
    $(this.element).css({
      'width': `${this.pcW}%`,
      'height': `0`,
      'padding-bottom': `${this.pcH}%`,
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
