export class stageObj{
  constructor(options){
    options = options || {}

    //Options
    this.activeContainer = options.activeContainer || '';
    this.fps = options.fps || 60;

    //Defaults
    this.mouseX = 0;
    this.mouseY = 0;
    this.isScrolling = false;

    //Not Set
    this.scrollY = $(window).scrollTop();
    this.h;
    this.w;
    this.dTop;
    this.dBot;
    this.docHeight;
    this.windowProportion;

    //Static Inits
    this.fpsModifier = 60 / this.fps;
    this.calcFps = 1000 / this.fps;
  }

  setMousePos(x,y){
    this.mouseX = x;
    this.mouseY = y;
  }
  setContainer(e){
    this.activeContainer = e;
  }
  //Main Calc
  //* Triggered by container refresh
  calc(){
    this.h = $(window).outerHeight();
    this.w = $(window).outerWidth();
    this.docHeight = $(document).height();
    this.dTop = window['pageYOffset'];
    this.dBot = window['pageYOffset'] + this.h;
    //Set window proportion,
    this.windowProportion = (this.h / this.w) * 100;
  }
  //
  recalc(){

  }
}
