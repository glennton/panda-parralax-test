export class containerObj {
  constructor(e, params) {
    params = params || {};
    this.element = e;
    this.scale = parseInt(this.element.getAttribute('data-init-scale')) || 1;
    //defaults
    let {
       h = 0,
       y1Pos = 0,
       y2Pos = 0,
       dTop = 0,
       dBot = 0,
     } = params
    //assign to this
    Object.assign(this, params);
  }
  calc(){
    this.height = this.element.clientHeight;
    this.y1Pos = this.element.offsetTop;
    this.y2Pos = this.height + this.y1Pos;
  }
  refresh(stage){
    this.element.document.setAttribute('padding-bottom', windowProportion);
  }
}
