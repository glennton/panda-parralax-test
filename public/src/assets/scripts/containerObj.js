export class containerObj {
  constructor(e, params) {
    params = params || {};
    this.element = e;
    this.scale = parseInt(this.element.dataset.initProportion) || 1;
    //defaults
    let {
       pcH = 0,
       pcW = 0,
       y1Pos = 0,
       y2Pos = 0,
       dTop = 0,
       dBot = 0,
     } = params
    //assign to this
    Object.assign(this, params);
  }
  //Main Calc
  calc(stage){
    this.height = this.element.clientHeight;
    this.y1Pos = this.element.offsetTop;
    this.y2Pos = this.height + this.y1Pos;
  }
  //Calc Scrolling
  scrollCalc(){

  }

  refresh(stage){
    //Set Height
    this.element.style['padding-bottom'] = stage.windowProportion * this.scale + '%';
  }
}
