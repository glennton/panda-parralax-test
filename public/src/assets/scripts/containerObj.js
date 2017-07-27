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

    //Inits
    this.scale = parseInt(this.element['dataset']['initProportion']) || 1;
  }

  init(stageHeight){
    this.calc()
    this.calcScroll(0, stageHeight)
  }

  //Main Calc
  calc(){
    this.h = this.element['clientHeight'];
    this.y1Pos = this.element['offsetTop'];
    this.y2Pos = this.h + this.y1Pos;
  }

  _checkTop(scrollY, stageHeight){
    if(this.y1Pos > scrollY && this.y1Pos < scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }//If entire container takes up window
  _checkMiddle(scrollY, stageHeight){
    if(this.y1Pos < scrollY && this.y1Pos + this.h > scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }
  _checkBot(scrollY, stageHeight){
    if(this.y1Pos + this.h > scrollY && this.y1Pos + this.h < scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }

  _checkInView(scrollY, stageHeight){
    if(this._checkTop(scrollY, stageHeight) || this._checkMiddle(scrollY, stageHeight) || this._checkBot(scrollY, stageHeight)){
      this.inView = true
    }else{
      this.inView = false
    }
  }

  //Calc Scrolling
  calcScroll(scrollY, stageHeight){
    this._checkInView(scrollY, stageHeight)
    if(this.inView){
      //Calculate current position of container
      let containerMidY = this.h + this.y1Pos - scrollY
      //Calculate middle of window and shift by half of container
      let windowMidY = stageHeight / 2 + (this.h / 2)
      let interpolation = containerMidY / windowMidY / 2
      //Reverse Order
      this.interpolation = (interpolation * 100 - 100 ) * -1
      console.log(this.element.id, this.interpolation)
    }
  }


  refresh(windowProportion){
    //Set Height
    this.element['style']['padding-bottom'] = windowProportion * this.scale + '%';
    this.calc()
  }
}
