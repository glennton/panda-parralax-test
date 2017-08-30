export class floatObj {
  constructor(parent, options) {
    options = options || {}

    //Main Arguments
    this.parent = parent;

    //Options
    this.name           = options['data-name'] || '';
    this.initTop        = []
    options['data-top'].split('-').map((e,i)=>{
      this.initTop.push(parseInt(e))
    })
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.pDepth         = options['data-p-depth'] || 1;
    this.pStart         = parseInt(options['data-pstart']) || .1;
    this.pEnd           = parseInt(options['data-pend']) || null;
    this.pStartY        = parseInt(options['data-pstarty']) || 0;
    this.pEndY          = parseInt(options['data-pendy']) || 100;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;
    //Not Set
    this.t;
    this.element;
    this.stage;
    this.plaxY = 0;
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
    this.stage = stage;
    //set top
    this.setTop()
    //Calc first frame
    this.calcFrame(true)
    //Set this.element for future use
  }
  setTop(){
    if(this.stage.breakpoint == 'sm'){this.t = this.initTop[0]}
    if(this.stage.breakpoint == 'md'){this.t = this.initTop[1]}
    if(this.stage.breakpoint == 'lg'){this.t = this.initTop[2]}
  }
  //Update plax modifier if scrolled
  calcScroll(){
    if(this.pStart != null && this.pEnd != null){
      if(this.parent.interpolation > this.pStart && this.parent.interpolation < this.pEnd){
        let change = (this.pEndY - this.pStartY) / (this.pEnd - this.pStart )
        this.plaxY = this.pStartY + change * (this.parent.interpolation - this.pStart )
      }else{
        if(this.parent.interpolation < this.pStart){this.plaxY = this.pStartY}
        if(this.parent.interpolation > this.pEnd){this.plaxY = this.pEndY}
      }
    }
  }

  //Recalc Frame if mouse moved
  calcFrame(){
    //X Calc
    const left =
      + (this.stage.mouseX - .5) // creates range -0.5 to +0.5
      * this.mouseDepth;
    //Y Calc
    let top = this.t
    top = top
      + this.stage.mouseY // Mouse modifier
      * this.mouseDepth;
    //Plax Modifier
    top = top + this.plaxY
    //Proportion Modifier
    $(this.element).css({
      'margin-left': `${left}%`,
      'top': `${top}%`
    })
    //if(this.name == 'test'){console.log(this.t, this.plaxY)}
  }
}
