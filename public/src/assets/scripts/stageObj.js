export class stageObj{
  constructor(options){
    options = options || {}

    //Options
    this.fps = options.fps || 60;
    this.breakpointRange = options.breakpointRange || [56,143];
    this.breakpointCount = options.breakpointRange || 12;
    //Defaults
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseCheck = 0;
    this.isScrolling = false;
    this.scrollY = $(window).scrollTop();
    this.scrollCheck = 0;

    //Not Set
    this.h;
    this.w;
    this.dTop;
    this.dBot;
    this.docHeight;
    this.windowRatio;
    this.windowProportion;
    this.containers = [];
    this.activeContainers = [];
    this.activeContainer;
    this.freezeMouse;
    this.breakpoints = [];
    this.breakpoint;

    //Static Inits
    this.fpsModifier = 60 / this.fps;
    this.calcFps = 1000 / this.fps;

    //Set Breakpoints
    if(this.breakpointCount % 3 !=0){
      throw 'breakpointCount must be factor of 3'
    }
    const range = this.breakpointRange[1] - this.breakpointRange[0];
    let floor = this.breakpointRange[0];
    const interval = range / (this.breakpointCount - 1)
    this.breakpoints.push(floor)
    for(let i = 1; i < this.breakpointCount; i++){
      floor = floor + interval
      this.breakpoints.push(floor)
    }
    //Detect Mobile
    if((typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1)){
      this.isMobile = true;
    }else{
      this.isMobile = false;
    }
  }

  updateActiveContainers(){
    this.activeContainers = [];
    this.containers.map((e,i)=>{
      if(e.inView){
        this.activeContainers.push(e)
      }
    })
  }

  setMousePos(x,y){
    this.mouseX = x;
    this.mouseY = y;
  }

  //Main Calc
  //* Triggered by container refresh
  calc(){
    this.h = $(window).outerHeight();
    this.w = $(window).outerWidth();
    this.docHeight = $(document).height();
    this.dTop = window['pageYOffset'];
    this.dBot = window['pageYOffset'] + this.h;
    //Set window ratio
    this.windowRatio = this.h / this.w * 100;
    //Set css breakpoints
    if(this.w >= this.h){
      //flip twist it and reverse it
      this.windowProportion = (100 - (this.h / this.w * 100) + 100);
    }else{
      this.windowProportion = (this.w / this.h * 100);
    }
    //Set js breakpoints
    if(this.windowProportion <= this.breakpoints[0] || this.windowProportion >= this.breakpoints[this.breakpointCount-1]){
      //Set outer ranges
      if(this.windowProportion <= this.breakpoints[0]){this.breakpoint = 1}
      if(this.windowProportion >= this.breakpoints[this.breakpointCount-1]){this.breakpoint = this.breakpointCount}
    }else{
      //set inner ranges
      for(let i = 0; i < this.breakpointCount; i++){
        if(this.windowProportion > this.breakpoints[i] && this.windowProportion < this.breakpoints[i+1]){
          this.breakpoint = i + 1
          break;
        }
      }
    }

    //Small
    if(this.windowProportion >= this.breakpoints[9]){
      $('body').addClass('sm md lg')
    }
    //Medium
    if(this.windowProportion >= this.breakpoints[2] && this.windowProportion < this.breakpoints[9]){
      $('body').addClass('sm md').removeClass('lg')
    }
    //Large
    if(this.windowProportion < this.breakpoints[2]){
      $('body').addClass('sm').removeClass('md lg')
    }
  }
}
