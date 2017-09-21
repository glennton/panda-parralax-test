export class FloatObj {
  constructor(parent, options) {
    options = options || {}

    //Main Arguments
    this.parent = parent;

    //Options
    this.name           = options['data-name'] || '';
    this.initY        = []
    this.initX        = []
    options['data-y'].split('|').map((e,i)=>{
      this.initY.push(parseInt(e))
    })
    options['data-x'].split('|').map((e,i)=>{
      this.initX.push(parseInt(e))
    })
    this.mouseDepth     = parseInt(options['data-mouse-depth']) || 0;
    this.rotate         = options['data-rotate'] || 0;
    this.pDepth         = options['data-p-depth'] || 1;
    this.pStart         = parseInt(options['data-pstart']) || 0;
    this.pEnd           = parseInt(options['data-pend']) || 0;
    this.pEndY          = parseInt(options['data-pendy']) || null;
    this.pEndX          = parseInt(options['data-pendx']) || null;
    this.pEndR          = parseInt(options['data-pendr']) || null;
    this.r              = parseInt(options['data-r']) || 0;
    this.z              = options['data-z'] || 1;
    this.yArcAmplitude  = parseInt(options['data-yarcamplitude']) || 0;
    //If initScaleH not defined, keep same proportion by setting to initScaleW
    this.floatFrequency = options['data-float-frequency'] || 0;
    this.floatAmplitude = options['data-float-amplitude'] || 0;
    this.floatAngle     = options['data-float-angle'] || 0;

    if(this.pStart + this.pEnd != 0){
      this.pActive = true
    }

    //Defaults / Not Set
    this.t;
    this.tx = 0;
    this.ty = 0;
    this.element;
    this.stage;
    this.plaxY = 0;
    this.plaxX = 0;
    //Set to r by default
    this.plaxR = this.r;
    this.yArc = 0;
    this.intpl;
    this.parentProportion = 1;
  }
  // Make sprite and add to stage
  make(e, stage){
    this.element = e;
  }
}
