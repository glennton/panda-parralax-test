export class floatObj {
  constructor(parent, options) {
    options = options || {}

    //Main Arguments
    this.parent = parent;

    //Options
    this.name           = options['data-name'] || '';
    this.initY        = []
    this.initX        = []
    options['data-y'].split('|').map((e,i)=>{
      this.initY.push(parseInt(e))
    })
    options['data-x'].split('|').map((e,i)=>{
      this.initX.push(parseInt(e))
    })
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.pDepth         = options['data-p-depth'] || 1;
    this.pStart         = parseInt(options['data-pstart']) || 0;
    this.pEnd           = parseInt(options['data-pend']) || 0;
    this.pEndY          = parseInt(options['data-pendy']) || null;
    this.pEndX          = parseInt(options['data-pendx']) || null;
    this.pEndR          = parseInt(options['data-pendr']) || null;
    this.r              = parseInt(options['data-r']) || null;
    this.yArcAmplitude  = parseInt(options['data-yarcamplitude']) || 0;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;

    if(this.pStart + this.pEnd != 0){
      this.pActive = true
    }

    //Defaults / Not Set
    this.t;
    this.element;
    this.stage;
    this.plaxY = 0;
    this.plaxX = 0;
    this.plaxR = 0;
    this.yArc = 0;
    this.intpl
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
    //set top
    this.setPos()
    //Calc first frame
    this.calcFrame(true)
    //Set this.element for future use
  }
  setPos(){
    if(this.stage.breakpoint == 'sm'){
      this.t = this.initY[0]
      this.l = this.initX[0]
    }
    if(this.stage.breakpoint == 'md'){
      this.t = this.initY[1]
      this.l = this.initX[1]
    }
    if(this.stage.breakpoint == 'lg'){
      this.t = this.initY[2]
      this.l = this.initX[2]
    }
    $(this.element).css({
      'margin-left': `-${ $(this.element).outerWidth()/2 }px`,
      'margin-top': `-${ $(this.element).outerHeight()/2 }px`
    })
  }
  _interpolate(start, end){
    let change = (end - start) / (this.pEnd - this.pStart )
    return start + change * (this.parent.interpolation - this.pStart )
  }
  //Update plax modifier if scrolled
  calcScroll(){
    if(this.pActive){
      if(this.parent.interpolation > this.pStart && this.parent.interpolation < this.pEnd){
        if(this.pEndY){
          this.plaxY = this._interpolate(0, this.pEndY)
        }
        if(this.pEndX){
          this.plaxX = this._interpolate(0, this.pEndX)
        }
        if(this.yArcAmplitude){
          const angle = this._interpolate(0, Math.PI)
          const amplitude = 10
          this.yArc = (Math.sin(angle) * this.yArcAmplitude)
        }
        if(this.pEndR){
          this.plaxR = this._interpolate(0, this.pEndX)
        }
      }
    }
  }

  //Recalc Frame if mouse moved
  calcFrame(){
    //X Calc
    let left = this.l
      + ((this.stage.mouseX - .5) * this.mouseDepth); // creates range -0.5 to +0.5
    left = left + this.plaxX
    //Y Calc
    let top = this.t
    top = top
      + this.stage.mouseY // Mouse modifier
      * this.mouseDepth;
    //Rotate Calc
    let rotate = this.r + this.plaxR
    //Plax Modifier
    top = top + this.plaxY - this.yArc
    //Proportion Modifier
    $(this.element).css({
      'left': `${left}%`,
      'top': `${top}%`,
      'transform': `rotate(${rotate}deg) translate3d(0,0,1px)`
    })
    //if(this.name == 'test'){console.log(this.plaxX)}
  }
}
