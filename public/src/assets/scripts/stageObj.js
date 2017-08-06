export class stageObj{
  constructor(options){
    options = options || {}

    //Options
    this.activeContainer = options.activeContainer || '';
    this.fps = options.fps || 60;

    //Not Set
    this.h;
    this.w;
    this.dTop;
    this.dBot;
    this.docHeight;
    this.windowProportion;

    //Static Inits
    this.isScrolling = false
    this.fpsModifier = 60 / this.fps
    this.calcFps = 1000 / this.fps
  }

  setContainer(x){
    this.activeContainer = x;
  }
  //Main Calc
  //* Triggered by container refresh
  calc(){
    this.h = window['innerHeight'] + 15; //Account for browser scrollbar - wiggle room
    this.w = window['innerWidth'];
    this.docHeight = (document['height'] !== undefined) ? document['height'] : document['body']['offsetHeight'];
    this.dTop = window['pageYOffset'];
    this.dBot = window['pageYOffset'] + window['innerWidth'];
    //Set window proportion,
    this.windowProportion = (this.h / this.w) * 100;
  }
  //
  recalc(){

  }
}
