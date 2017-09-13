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
    this.r              = parseInt(options['data-r']) || 0;
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
    this.tx = 0;
    this.ty = 0;
    this.element;
    this.stage;
    this.plaxY = 0;
    this.plaxX = 0;
    //Set to r by default
    this.plaxR = this.r;
    this.yArc = 0;
    this.intpl;
    this.parentProportion = 1;
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
  _filterBreakpoint(data,type){
    if(this.stage.breakpointCount % data.length === 0){
      let index;
      index = this.stage.breakpoint - 1;
      if(data.length == 3){
        if(this.stage.breakpoint < 3){index = 0}
        if(this.stage.breakpoint >= 3 && this.stage.breakpoint < 10){index = 1}
        if(this.stage.breakpoint >= 10){index = 2}
      }
      if(data.length == 6){
        index = Math.ceil(this.stage.breakpoint / 2) - 1
      }
      //Debug
      if(this.name == 'test'){
        if(type == 'x'){
          $('#objectX').html(index);
        }
        if(type == 'y'){
          $('#objectY').html(index);
        }
      }
      return data[index];
    }else{
      throw 'Incorrect Number of Values'
    }
  }
  setPos(){
    this.t = this._filterBreakpoint(this.initY,'y')
    this.l = this._filterBreakpoint(this.initX,'x')
    //Position from center of object
    this.tx = $(this.element).outerWidth()/2
    this.ty = $(this.element).outerHeight()/2
    //Set parent Y Modifier if child tween
    if($(this.element).parent().hasClass('animation-container')){
      const h1 = $(this.element).parent().outerHeight();
      const h2 = this.parent.h;
      this.parentProportion = h1/h2
    }
  }
  _interpolate(start, end){
    let change = (end - start) / (this.pEnd - this.pStart )
    return start + change * (this.parent.interpolation - this.pStart )
  }
  //Update plax modifier if scrolled
  calcScroll(){
    if(this.parent.inView){
      if(this.pActive){
        //If element has parallax range defined
        if(this.parent.interpolation > this.pStart && this.parent.interpolation < this.pEnd){
          //If parallax Y Defined
          if(this.pEndY){
            this.plaxY = this._interpolate(0, this.pEndY)/this.parentProportion
          }
          //If parallax X Defined
          if(this.pEndX){
            this.plaxX = this._interpolate(0, this.pEndX)
          }
          //If parallax Arc Defined
          if(this.yArcAmplitude){
            const angle = this._interpolate(0, Math.PI)
            const amplitude = 10
            this.yArc = (Math.sin(angle) * this.yArcAmplitude)/this.parentProportion
          }
          if(this.pEndR){
            this.plaxR = this._interpolate(this.r, this.pEndR)
          }
        }else{
          if(this.parent.interpolation < this.pStart){
            if(this.pEndY){ this.plaxY = 0 }
            if(this.pEndX){ this.plaxX = 0 }
            if(this.pEndR){ this.plaxR = this.r }
          }
          if(this.parent.interpolation > this.pEnd){
            if(this.pEndY){ this.plaxY = this.pEndY }
            if(this.pEndX){ this.plaxX = this.pEndX }
            if(this.pEndR){ this.plaxR = this.pEndR }
          }
        }
      }else{
        //If element does not have parallax range defined
      }
    }
  }

  //Recalc Frame if mouse moved
  calcFrame(){
    if(this.parent.inView){
      //if(this.name == 'test'){console.log(this.parent)}
      //X Calc
      let left = this.l
        + ((this.stage.mouseX - .5) * this.mouseDepth); // creates range -0.5 to +0.5
      left = left + this.plaxX
      //Y Calc
      let top = this.t
      top = top
        + this.stage.mouseY // Mouse modifier
        * this.mouseDepth;
      //Plax Modifier
      top = top + this.plaxY - this.yArc
      //Rotate Calc
      let rotate = this.plaxR

      //Proportion Modifier
      this.element.style['left'] = `${left}%`;
      this.element.style['top'] = `${top}%`;
      this.element.style['transform'] = `rotate(${rotate}deg) translate3d(-${this.tx}px,-${this.ty}px,1px)`;
      if(this.name == 'test'){console.log('calced')}
    }
  }
}
