export class floatObj {
  constructor(parent, name, options) {
    options = options || {}

    //Main Arguments
    this.name = name
    this.parent = parent;

    //Options
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.pDepth         = options['data-p-depth'] || 1;
    this.pStart         = parseInt(options['data-pstart']) || null;
    this.pEnd           = parseInt(options['data-pend']) || null;
    this.pStartVal      = parseInt(options['data-pstartval']) || 0;
    this.pEndVal        = parseInt(options['data-pendval']) || 100;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    this.t = 1
    //Not Set
    this.element;
    this.stage;
    this.plaxY = 0;
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
    //Calc first frame
    this.calcFrame(true)
    //Set this.element for future use
  }

  //Update plax modifier if scrolled
  calcScroll(){
    if(this.pStart != null && this.pEnd != null){
      if(this.parent.interpolation > this.pStart && this.parent.interpolation < this.pEnd){
        let change = (this.pEndVal - this.pStartVal) / (this.pEnd - this.pStart )
        this.plaxY = this.pStartVal + change * (this.parent.interpolation - this.pStart )
      }else{
        if(this.parent.interpolation < this.pStart){this.plaxY = this.pStartVal}
        if(this.parent.interpolation > this.pEnd){this.plaxY = this.pEndVal}
      }
      //console.log(this.plaxY)
    }
  }

  //Recalc Frame if mouse moved
  calcFrame(isInit){
    //X Calc
    const left =
      + (this.stage.mouseX - .5) // creates range -0.5 to +0.5
      * this.mouseDepth;
    //Y Calc
    let top =
      + this.stage.mouseY // Mouse modifier
      * this.mouseDepth;
    top = top + this.plaxY
    $(this.element).css({
      'margin-left': `${left}%`,
      'margin-top': `${top}%`
    })
  }
}
