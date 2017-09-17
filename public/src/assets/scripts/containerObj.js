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
    this.position;
    this.interpolation;
  }
}






//    if(this.element.id=='intro'){console.log('testintro')}
