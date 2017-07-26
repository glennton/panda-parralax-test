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


  //Main Calc
  calc(){
    this.h = this.element['clientHeight'];
    this.y1Pos = this.element['offsetTop'];
    this.y2Pos = this.h + this.y1Pos;
  }
  //Calc Scrolling
  calcScroll(scrollY, stageHeight){
    //get midpoint of container
    this.midY = this.h / 2
    //factor in distance from top of document, and amount scrolled
    this.midY  =  this.midY + this.y1Pos - scrollY

    // Calculate the distance between the middle points, and factor in
    this.scrollPt = ((this.midY  / stageHeight) + (.5 *this.scale)) * 100 / this.scale

    //Calculate Direction
    if(this.scrollPt > this.lastScrollPt){
      this.direction = 1 // Up
    }else{
      this.direction = 2 // Down
    }
    this.lastScrollPt = this.scrollPt

    if(0 < this.scrollPt && this.scrollPt < 100){
      this.inView = true
      //console.log(this.element['id'], this.scrollPt , this.direction)
    }else{
      this.inView = false
    }
  }


  checkTop(scrollY, stageHeight){
    if(this.y1Pos > scrollY && this.y1Pos < scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }//If entire container takes up window
  checkMiddle(scrollY, stageHeight){
    if(this.y1Pos < scrollY && this.y1Pos + this.h > scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }
  checkBot(scrollY, stageHeight){
    if(this.y1Pos + this.h > scrollY && this.y1Pos + this.h < scrollY + stageHeight){
      return true
    }else{
      return false
    }
  }

  calcScrollTest(scrollY, stageHeight){
    if(this.checkTop(scrollY, stageHeight) || this.checkMiddle(scrollY, stageHeight) || this.checkBot(scrollY, stageHeight)){
      this.inView = true
    }else{
      this.inView = false
    }
  }




  refresh(windowProportion){
    //Set Height
    this.element['style']['padding-bottom'] = windowProportion * this.scale + '%';
    this.calc()
  }
}
