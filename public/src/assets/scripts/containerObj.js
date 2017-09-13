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
    this.lastScrollPt = 0;// To determine Direction
    this.scrollPt = 0;// To determine Direction
    this.direction // 1 = Up or 2 = Down
    this.midY
    this.inView // True / False
    this.scale;
    this.proportionY;
    this.stage;
    this.position;
    this.interpolation;
  }

  init(stage){
    this.stage = stage
    this.calc()
    this.calcScroll(1)
  }

  //Main Calc
  calc(){
    this.scale = parseFloat(this.element['dataset']['initProportion']) || 1;
    this.h = $(this.element).outerHeight()
    this.y1Pos = this.element['offsetTop'];
    this.y2Pos = this.h + this.y1Pos;
  }

  _checkTop(){
    if(this.y1Pos < (this.stage.scrollY + this.stage.h) && this.y1Pos > this.stage.scrollY){
      return true
    }else{
      return false
    }
  }//If entire container takes up window
  _checkMiddle(){
    if(this.y1Pos <= this.stage.scrollY && this.y1Pos + this.h >= this.stage.scrollY + this.stage.h){
      return true
    }else{
      return false
    }
  }
  _checkBot(){
    // bottom of container greater than scrolled && bottom of container
    if(this.y1Pos + this.h >= this.stage.scrollY && this.y1Pos + this.h <= this.stage.scrollY + this.stage.h){
      return true
    }else{
      return false
    }
  }



  _checkInView(){
    if(this._checkTop() || this._checkMiddle() || this._checkBot()){
      this.inView = true
    }else{
      if(this.y1Pos == 0 && this.stage.scrollY == undefined){
        this.inView = true
      }else{
        this.inView = false
      }
    }
  }

  //Calc Scrolling
  calcScroll(){
    //Refresh Y Position
    this.y1Pos = this.element['offsetTop'];
    //Check if element is in view
    this._checkInView()
    if(this.inView){
      //Calculate current position of container
      let containerMidY = this.h + this.y1Pos - this.stage.scrollY
      //Calculate middle of window and shift by half of container
      let windowMidY = this.stage.h / 2 + (this.h / 2)
      let interpolation = containerMidY / windowMidY / 2
      //Reverse Order
      this.interpolation = (interpolation * 100 - 100 ) * -1
    }
  }

  setHeight(windowProportion){
    //Set Height and Recalculate
    this.element['style']['padding-bottom'] = windowProportion * this.scale + '%';
    this.calc()
    this.proportionY = this.h / $(document).height()
  }
}






//    if(this.element.id=='intro'){console.log('testintro')}
