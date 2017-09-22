import {Throttle} from '../../../components/Throttle/Throttle.js';
import {ContainerObj} from './ContainerObj.js';
import {StageObj} from './StageObj.js';
import {FloatObj} from './FloatObj.js';
import {SvgObj} from './SvgObj.js';
import {ImgObj} from './ImgObj.js';
import {HtmlObj} from './HtmlObj.js';

let sectionContainers;
let floatElements;
let floatingObjArray = [];
let stage;
//INIT MODULE
const init = function(settings){
  sectionContainers = settings.sectionContainers;
  floatElements = settings.floatElements;
  Parallax.stage = new StageObj(settings.stage);
  stage = Parallax.stage;

  //MAKE CONTAINERS
  _containersMake()
  ////Init Stage Calcs
  stage.calc()
  containerCalcPosition()
  containerCalcScroll()

  ////Init ActiveContainer
  stage.updateActiveContainers()
  ////Refresh Containers
  stage.scrollY = $(window).scrollTop()
  ////Make Objects
  _makeFloatObjects()
  ////Recal Objects Position
  floatObjCalcTop()
  //// ANIMATE!
  requestAnimationFrame(_floatObjCalcFrame)
  ////Scroll Trigger
  ////window.addEventListener("click", scrollTo, true);
}

//MAKE CONTAINERS
function _containersMake(){
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    const newContainer = new ContainerObj(e);
    //Inits
    newContainer.position = i;
    newContainer.scale = parseFloat(e['dataset']['initProportion']) || 1;
    stage.containers.push(newContainer)
  })
  //Create reference in stage object
  stage.activeContainers.push(sectionContainers[0]);
}

//REFRESH CONTAINER POSITION CALCULATIONS
const containerCalcPosition = function(){
  for(let i=0; i < stage.containers.length; i++){
    const el = stage.containers[i];
    el.element['style']['padding-bottom'] = stage.windowRatio * el.scale + '%';
    el.h = $(el.element).outerHeight();
    el.y1Pos = el.element['offsetTop'];
    el.y2Pos = el.h + el.y1Pos;
    el.proportionY = el.h / $(document).height();
  }
}

//REFRESH CONTAINER INTERPOLATION AND SCROLL
const containerCalcScroll = function(){
  for(let i=0; i < stage.containers.length; i++){
    const el = stage.containers[i];
    //Calc Scrolling
    //Refresh Y Position
    el.y1Pos = el.element['offsetTop'];
    //Check if element is in view
    _containerInView()
    if(el.inView){
      //Calculate current position of container
      const containerMidY = el.h + el.y1Pos - stage.scrollY;
      //Calculate middle of window and shift by half of container
      const windowMidY = stage.h / 2 + (el.h / 2);
      const interpolation = containerMidY / windowMidY / 2;
      //Reverse Order
      el.interpolation = (interpolation * 100 - 100 ) * -1;
    }
    function _containerInView(){
      if(
          (el.y1Pos < (stage.scrollY + stage.h) && el.y1Pos > stage.scrollY) || //Check if top of container is in viewport
          (el.y1Pos <= stage.scrollY && el.y1Pos + el.h >= stage.scrollY + stage.h) || //Check if middle of container is in viewport
          (el.y1Pos + el.h >= stage.scrollY && el.y1Pos + el.h <= stage.scrollY + stage.h) //Check if bottom of container is in viewport
      ){
        el.inView = true;
      }else{
        if(el.y1Pos == 0 && stage.scrollY == undefined){
          el.inView = true;
        }else{
          el.inView = false;
        }
      }
    }
  }
}

//MAKE OBJECTS
function _makeFloatObjects(){
  floatElements.map((e,i) => {
    let options = {};
    let newFloatingObj;
    let parentObj;
    const parentId = $(e).closest('.section-container').attr('id');
    for (let att, i = 0, atts = e.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        options[att.nodeName] = att.nodeValue;
    }
    //Link object to parent
    stage.containers.map((f,j)=>{
      if(parentId == f.element.id){
        parentObj = f;
      }
    })
    //Define type of object
    if(_hasClass(e,'svg-element')){
      const img = e.getAttribute('data-img');
      newFloatingObj = new SvgObj( require(`../../../assets/images/${img}`), parentObj, options);
    }
    if(_hasClass(e,'img-element')){
      const img = e.getAttribute('data-img');
      newFloatingObj = new ImgObj(require(`../../../assets/images/${img}`), parentObj, options);
    }
    if(_hasClass(e,'html-element')){
      newFloatingObj = new HtmlObj(parentObj, options);
    }
    //Init Object
    newFloatingObj.make(e, stage)
    //Push into parent inside floating object array
    floatingObjArray.push(newFloatingObj)

    //PRIVATE FUNCTIONS
    function _hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
  })
}

//CALCULATE OBJECT POSITIONS
const floatObjCalcTop = function() {
  //Only animate if user action in window
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    const el = floatingObjArray[i];
    //Set top and left based on breakpoint
    el.t = _filterBreakpoint(el.initY,'y',el.name);
    el.l = _filterBreakpoint(el.initX,'x',el.name);
    //Position from center of object
    el.tx = $(el.element).outerWidth()/2;
    el.ty = $(el.element).outerHeight()/2;
    //Set parent Y Modifier if child tween
    if($(el.element).parent().hasClass('animation-container')){
      const h1 = $(el.element).parent().outerHeight();
      const h2 = el.parent.h;
      el.parentProportion = h1/h2;
    }
    el.element.style['z-index'] = el.z;
  }

  //PRIVATE FUNCTIONS
  function _filterBreakpoint(data,type,name){
    if(stage.breakpointCount % data.length === 0){
      let index;
      index = stage.breakpoint - 1;
      //if 1 coordinate point provided
      if(data.length == 1){
        index = 0;
      }
      //if 3 coordinate points provided
      if(data.length == 3){
        if(stage.breakpoint < 3){index = 0;}
        if(stage.breakpoint >= 3 && stage.breakpoint < 10){index = 1;}
        if(stage.breakpoint >= 10){index = 2;}
      }
      //if 6 coordinate points provided
      if(data.length == 6){
        index = Math.ceil(stage.breakpoint / 2) - 1;
      }
      //Debug
      if(name == 'test'){
        if(type == 'x'){
          $('#objectX').html(index);
        }
        if(type == 'y'){
          $('#objectY').html(index);
        }
      }
      return data[index];
    }else{
      //console.log(this.element, data, type, this.stage.breakpointCount % data.length)
      throw 'Incorrect Number of Values';
    }
  }
}

//OBJECT INTERPOLATION CALCS ON SCROLL
function _floatObjCalcScroll() {
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    const el = floatingObjArray[i];
    // if(el.name == 'test'){
    //   console.log(el.element)
    // }
    if(el.parent.inView && el.pActive){
      //If element has parallax range defined
      if(el.parent.interpolation > el.pStart && el.parent.interpolation < el.pEnd){
        //If parallax Y Defined
        if(el.pEndY){
          el.plaxY = _interpolate(0, el.pEndY, el.pStart, el.pEnd, el.parent.interpolation)/el.parentProportion;
        }
        //If parallax X Defined
        if(el.pEndX){
          el.plaxX = _interpolate(0, el.pEndX, el.pStart, el.pEnd, el.parent.interpolation);
        }
        //If parallax Arc Defined
        if(el.yArcAmplitude){
          const angle = _interpolate(0, Math.PI, el.pStart, el.pEnd, el.parent.interpolation);
          const amplitude = 10;
          el.yArc = (Math.sin(angle) * el.yArcAmplitude)/el.parentProportion;
        }
        if(el.pEndR){
          el.plaxR = _interpolate(el.r, el.pEndR, el.pStart, el.pEnd, el.parent.interpolation);
        }
      }else{
        if(el.parent.interpolation < el.pStart){
          if(el.pEndY){ el.plaxY = 0; }
          if(el.pEndX){ el.plaxX = 0; }
          if(el.pEndR){ el.plaxR = el.r; }
        }
        if(el.parent.interpolation > el.pEnd){
          if(el.pEndY){ el.plaxY = el.pEndY; }
          if(el.pEndX){ el.plaxX = el.pEndX; }
          if(el.pEndR){ el.plaxR = el.pEndR; }
        }
      }
    }
  }

  //PRIVATE FUNCTIONS
  function _interpolate(start, end, pstart, pend, parentIntp){
    const change = (end - start) / (pend - pstart );
    return start + change * (parentIntp - pstart )
  }
}

//ANIMATE ALL
function _floatObjCalcFrame() {
  //Only animate if mouse has changed position, or page is scrolling
  if(stage.mouseCheck != stage.mouseX || stage.scrollY != stage.scrollCheck){
    stage.mouseCheck  = stage.mouseX;
    stage.scrollCheck  = stage.scrollY;
    calcAllFrames()
    containerCalcScroll()
    _floatObjCalcScroll()
    //testFPS = testFPS + 1
  }
  stage.scrollY = window.pageYOffset;
  requestAnimationFrame(_floatObjCalcFrame)
}

//CALCULATE OBJECT FRAME
const calcAllFrames = function(){
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    const el = floatingObjArray[i];
    if(el.parent.inView){
      //if(this.name == 'test'){console.log(this.parent)}
      //X Calc
      let left = el.l
        + ((stage.mouseX - .5) * el.mouseDepth); // creates range -0.5 to +0.5
      left = left + el.plaxX;
      //Y Calc
      let top = el.t;
      top = top
        + stage.mouseY // Mouse modifier
        * el.mouseDepth;
      //Plax Modifier
      top = top + el.plaxY - el.yArc;
      //Rotate Calc
      let rotate = el.plaxR;
      //Proportion Modifier
      el.element.style['left'] = `${left}%`;
      el.element.style['top'] = `${top}%`;
      el.element.style['transform'] = `rotate(${rotate}deg) translate3d(-${el.tx}px,-${el.ty}px,1px)`;
    }
  }
}

//SCROLL TRIGGER ANIMATION
const scrollTo = function(e){
  e.preventDefault()
  stage.freezeMouse = true;
  const scrollData = _getScrollData()
  $('html, body').stop().animate({
      scrollTop: scrollData.yPos + 10 //offet by 10 to make sure previous element is not in view
  }, 2000 * scrollData.speedModifier * scrollData.interpolation,()=>{
    stage.freezeMouse = false;
    //callback
  });

  //PRIVATE FUNCTIONS
  function _getScrollData(e){
    //update scroll calculations and active containers before setting scroll data
    containerCalcPosition()
    containerCalcScroll()
    stage.updateActiveContainers()
    //Set vars
    let scrollData = {};
    const activeContainer = stage.activeContainers[0];
    const currentIndex = stage.activeContainers[0].position;
    let targetIndex;
    let scaleSpeed = activeContainer.scale;
    let modifier;
    //Set next index based on if main container or transition container
    if($(activeContainer.element).hasClass('main-container')){
      //Skip two if main container
      modifier = 2;
    }else{
      //Skip one if transition container
      modifier = 1;
    }
    //Set next container index
    if(currentIndex + modifier < stage.containers.length){
      targetIndex = currentIndex + modifier;
    }else{
      targetIndex = 0;
    }
    const nextContainer = stage.containers[targetIndex];
    //Set if skipping two, add both scales
    if(modifier == 2){
      scaleSpeed = scaleSpeed + nextContainer.scale;
    }
    scrollData = {speedModifier: activeContainer.scale,yPos : nextContainer.y1Pos, interpolation: 1-(activeContainer.interpolation/100) }
    return scrollData;
  }
}

///////////////////////////////////////////////////////////////////////
//                         EVENT FUNCTIONS
///////////////////////////////////////////////////////////////////////

//ON MOUSE MOVE
const calcMouse = function(e){
  if(!stage.freezeMouse){
    stage.mouseX = e.clientX/window.innerWidth
    stage.mouseY = e.clientY/stage.activeContainer.h
  }
}

//ON MOUSE ENTER
const onMouseEnter = function(e) {
  stage.activeContainer = e;
}

//ON WINDOW RESIZE
const onWindowResize = function(){
  stage.calc()
  floatObjCalcTop()
  containerCalcPosition();
  calcAllFrames()
}

let Parallax = {
  init : init,
  containerCalcPosition: containerCalcPosition,
  containerCalcScroll: containerCalcScroll,
  floatObjCalcTop: floatObjCalcTop,
  calcAllFrames: calcAllFrames,
  calcMouse: calcMouse,
  onMouseEnter: onMouseEnter,
  onWindowResize: onWindowResize,
  scrollTo: scrollTo
}

module.exports = Parallax;
