export class stageObj{
  constructor(params){
    params = params || {}
    //defaults
    let {
      h = 0,
      w = 0,
      docHeight = 0,
      dTop = 0,
      dBot = 0,
      windowProportion = 0,
      isScrolling = false,
      activeContainer = ''
    } = params
    //assign to this
    Object.assign(this, params);
  }
  setContainer(x){
    this.activeContainer = x;
  }
  //Main Calc
  //* Triggered by container refresh
  calc(){
    this.h = window.innerHeight + 15; //Account for browser scrollbar - wiggle room
    this.w = window.innerWidth;
    this.docHeight = (document.height !== undefined) ? document.height : document.body.offsetHeight;
    this.dTop = window.pageYOffset;
    this.dBot = window.pageYOffset + window.innerWidth;
    this.isScrolling = false;
    //Set window proportion,
    if(this.w >= this.h){
      this.windowProportion = (this.h / this.w) * 100;
    }else{
      this.windowProportion = (this.w / this.h) * 100;
    }

  }
  //
  recalc(){

  }
}
