export class floatObj {
  constructor(parent, name, options) {
    options = options || {}

    //Main Arguments
    this.name = name
    this.parent = parent;

    //Options
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.plaxDepth      = options['data-plax-depth'] || 1;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    this.t = 1
    //Not Set
    this.element;
    this.stage;
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
    //Calc first frame
    this.calcFrame(true)
    //Set this.element for future use
  }
  // Refresh position per frame

  calcFrame(isInit){
    if(this.mouseDepth || isInit){
      //X Calc
      const left =
        (1)  //Initial X Position, Halved to get center of element
        + this.stage.mouseX // Mouse modifier
        * this.mouseDepth;
      //Y Calc
      const top =
        (1)  //Initial X Position, Halved to get center of element
        + this.stage.mouseY // Mouse modifier
        * this.mouseDepth;
      $(this.element).css({
        'margin-left': `-${left}%`,
        'margin-top': `-${top}%`
      })
    }
  }
}
