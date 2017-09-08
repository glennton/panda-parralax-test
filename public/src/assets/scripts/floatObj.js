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
    this.pStart         = parseInt(options['data-pstart']) || .1;
    this.pEnd           = parseInt(options['data-pend']) || null;
    this.pStartY        = parseInt(options['data-pstarty']) || 0;
    this.pEndY          = parseInt(options['data-pendy']) || 100;
    this.pStartX        = parseInt(options['data-pstartx']) || 0;
    this.pEndX          = parseInt(options['data-pendx']) || 0;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    //Not Set
    this.t;
    this.element;
    this.stage;
    this.plaxY = 0;
    this.plaxX = 0;
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
  }
  _interpolate(start, end){
    let change = (end - start) / (this.pEnd - this.pStart )
    return start + change * (this.parent.interpolation - this.pStart )
  }
  //Update plax modifier if scrolled
  calcScroll(){
    if(this.pStart != null && this.pEnd != null){
      if(this.parent.interpolation > this.pStart && this.parent.interpolation < this.pEnd){
        this.plaxY = this._interpolate(this.pStartY, this.pEndY)
        this.plaxX = this._interpolate(this.pStartX, this.pEndX)
      }else{
        if(this.parent.interpolation < this.pStart){
          this.plaxY = this.pStartY
          this.plaxX = this.pStartX
        }
        if(this.parent.interpolation > this.pEnd){
          this.plaxY = this.pEndY
          this.plaxX = this.pEndX
        }
      }
    }
  }

  //Recalc Frame if mouse moved
  calcFrame(){
    //X Calc
    let left =
      this.l
      + ((this.stage.mouseX - .5) * this.mouseDepth); // creates range -0.5 to +0.5
    left = left + this.plaxX
    //Y Calc
    let top = this.t
    top = top
      + this.stage.mouseY // Mouse modifier
      * this.mouseDepth;
    //Plax Modifier
    top = top + this.plaxY
    //Proportion Modifier
    $(this.element).css({
      'left': `${left}%`,
      'top': `${top}%`
    })
    //if(this.name == 'test'){console.log(this.plaxX)}
  }
}
