export class containerObj {
  constructor(e, options) {
    options = options || {}

    //Main Arguments
    this.element = e;

    //Options
    this.pcH     = options.pcH || 0;
    this.pcW     = options.pcW || 0;
    this.y1Pos   = options.y1Pos || 0;
    this.y2Pos   = options.y2Pos || 0;
    this.dTop    = options.dTop || 0;
    this.dBot    = options.dBot || 0;

    //Not Set
    this.h

    //Inits
    this.scale       = parseInt(this.element.dataset.initProportion) || 1;
  }


  //Main Calc
  calc(stage){
    this.h = this.element.clientHeight;
    this.y1Pos = this.element.offsetTop;
    this.y2Pos = this.h + this.y1Pos;
  }
  //Calc Scrolling
  scrollCalc(){

  }

  refresh(stage){
    //Set Height
    this.element.style['padding-bottom'] = stage.windowProportion * this.scale + '%';
  }
}
