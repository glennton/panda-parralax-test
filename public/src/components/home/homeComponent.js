'use strict'
import {throttle} from '../../assets/scripts/throttle.js';
import {debounce} from '../../assets/scripts/debounce.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';
import {svgObj} from '../../assets/scripts/svgObj.js';
import {imgObj} from '../../assets/scripts/imgObj.js';
import {htmlObj} from '../../assets/scripts/htmlObj.js';

///////////////////////////////////////////////////////////////////////
//                             FALLBACKS
///////////////////////////////////////////////////////////////////////

//REQUEST ANIMATION FRAME FALLBACK
const myRequestAnimationFrame =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  function(callback) {
      window.setTimeout(callback, 50);
   };
window.requestAnimationFrame=myRequestAnimationFrame;

///////////////////////////////////////////////////////////////////////
//                         GLOBAL VARIABLES
///////////////////////////////////////////////////////////////////////

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
const floatElements = Array.from(document.getElementsByClassName('floating-element'))

let containers = []
let floatingObjArray = []
//Debug Only
let testFPS = 0;
//Stage Defaults and Inits
let stage = new stageObj({
  fps: 30
})

///////////////////////////////////////////////////////////////////////
//                         STAGE FUNCTIONS
///////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////
//                       CONTAINER FUNCTIONS
///////////////////////////////////////////////////////////////////////

//MAKE CONTAINERS
function containersMake(){
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    const newContainer = new containerObj(e);
    //Inits
    newContainer.position = i;
    newContainer.scale = parseFloat(e['dataset']['initProportion']) || 1;
    stage.containers.push(newContainer)
  })
  //Create reference in stage object
  stage.activeContainers.push(containers[0]);
}

//REFRESH CONTAINER POSITION CALCULATIONS
function containerCalcPosition(){
  for(let i=0; i < stage.containers.length; i++){
    const el = stage.containers[i];
    el.element['style']['padding-bottom'] = stage.windowRatio * el.scale + '%';
    el.h = $(el.element).outerHeight()
    el.y1Pos = el.element['offsetTop'];
    el.y2Pos = el.h + el.y1Pos;
    el.proportionY = el.h / $(document).height()
  }
}
//REFRESH CONTAINER INTERPOLATION AND SCROLL
function containerCalcScroll(){
  for(let i=0; i < stage.containers.length; i++){
    const el = stage.containers[i];
    //Calc Scrolling
    //Refresh Y Position
    el.y1Pos = el.element['offsetTop'];
    //Check if element is in view
    _containerInView()
    if(el.inView){
      //Calculate current position of container
      let containerMidY = el.h + el.y1Pos - stage.scrollY
      //Calculate middle of window and shift by half of container
      let windowMidY = stage.h / 2 + (el.h / 2)
      let interpolation = containerMidY / windowMidY / 2
      //Reverse Order
      el.interpolation = (interpolation * 100 - 100 ) * -1
    }
    function _containerInView(){
      if(
          (el.y1Pos < (stage.scrollY + stage.h) && el.y1Pos > stage.scrollY) || //Check if top of container is in viewport
          (el.y1Pos <= stage.scrollY && el.y1Pos + el.h >= stage.scrollY + stage.h) || //Check if middle of container is in viewport
          (el.y1Pos + el.h >= stage.scrollY && el.y1Pos + el.h <= stage.scrollY + stage.h) //Check if bottom of container is in viewport
      ){
        el.inView = true
      }else{
        if(el.y1Pos == 0 && stage.scrollY == undefined){
          el.inView = true
        }else{
          el.inView = false
        }
      }
    }
  }
}

//REFRESH CONTAINER SIZE CALCS
function containerSetHeight(windowProportion){
  //Recalc stage in Resize Event Listener
  stage.containers.map((e, i)=>{
    //Reset Height
    e.setHeight(windowProportion);
  });
  //Recalc Stage
  stage.calc()
}

///////////////////////////////////////////////////////////////////////
//                        OBJECT FUNCTIONS
///////////////////////////////////////////////////////////////////////

//MAKE OBJECTS
function makeFloatObjects(arr){
  arr.map((e,i) => {
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
      const img = e.getAttribute('data-img')
      newFloatingObj = new svgObj( require(`../../assets/images/${img}`), parentObj, options);
    }
    if(_hasClass(e,'img-element')){
      const img = e.getAttribute('data-img')
      newFloatingObj = new imgObj(require(`../../assets/images/${img}`), parentObj, options);
    }
    if(_hasClass(e,'html-element')){
      newFloatingObj = new htmlObj(parentObj, options);
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
function floatObjCalcTop() {
  //Only animate if user action in window
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    const el = floatingObjArray[i];
    //Set top and left based on breakpoint
    el.t = _filterBreakpoint(el.initY,'y',el.name)
    el.l = _filterBreakpoint(el.initX,'x',el.name)
    //Position from center of object
    el.tx = $(el.element).outerWidth()/2
    el.ty = $(el.element).outerHeight()/2
    //Set parent Y Modifier if child tween
    if($(el.element).parent().hasClass('animation-container')){
      const h1 = $(el.element).parent().outerHeight();
      const h2 = el.parent.h;
      el.parentProportion = h1/h2
    }
    el.element.style['z-index'] = el.z
  }

  //PRIVATE FUNCTIONS
  function _filterBreakpoint(data,type,name){
    if(stage.breakpointCount % data.length === 0){
      let index;
      index = stage.breakpoint - 1;
      //if 1 coordinate point provided
      if(data.length == 1){
        index = 0
      }
      //if 3 coordinate points provided
      if(data.length == 3){
        if(stage.breakpoint < 3){index = 0}
        if(stage.breakpoint >= 3 && stage.breakpoint < 10){index = 1}
        if(stage.breakpoint >= 10){index = 2}
      }
      //if 6 coordinate points provided
      if(data.length == 6){
        index = Math.ceil(stage.breakpoint / 2) - 1
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
      throw 'Incorrect Number of Values'
    }
  }
}

//OBJECT INTERPOLATION CALCS ON SCROLL
function floatObjCalcScroll() {
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
          el.plaxY = _interpolate(0, el.pEndY, el.pStart, el.pEnd, el.parent.interpolation)/el.parentProportion
        }
        //If parallax X Defined
        if(el.pEndX){
          el.plaxX = _interpolate(0, el.pEndX, el.pStart, el.pEnd, el.parent.interpolation)
        }
        //If parallax Arc Defined
        if(el.yArcAmplitude){
          const angle = _interpolate(0, Math.PI, el.pStart, el.pEnd, el.parent.interpolation)
          const amplitude = 10
          el.yArc = (Math.sin(angle) * el.yArcAmplitude)/el.parentProportion
        }
        if(el.pEndR){
          el.plaxR = _interpolate(el.r, el.pEndR, el.pStart, el.pEnd, el.parent.interpolation)
        }
      }else{
        if(el.parent.interpolation < el.pStart){
          if(el.pEndY){ el.plaxY = 0 }
          if(el.pEndX){ el.plaxX = 0 }
          if(el.pEndR){ el.plaxR = el.r }
        }
        if(el.parent.interpolation > el.pEnd){
          if(el.pEndY){ el.plaxY = el.pEndY }
          if(el.pEndX){ el.plaxX = el.pEndX }
          if(el.pEndR){ el.plaxR = el.pEndR }
        }
      }
    }
  }

  //PRIVATE FUNCTIONS
  function _interpolate(start, end, pstart, pend, parentIntp){
    let change = (end - start) / (pend - pstart )
    return start + change * (parentIntp - pstart )
  }
}

///////////////////////////////////////////////////////////////////////
//                       ANIMATION FUNCTIONS
///////////////////////////////////////////////////////////////////////

//ANIMATE ALL
function floatObjCalcFrame() {
  //Only animate if mouse has changed position, or page is scrolling
  if(stage.mouseCheck != stage.mouseX || stage.scrollY != stage.scrollCheck){
    stage.mouseCheck  = stage.mouseX;
    stage.scrollCheck  = stage.scrollY;
    calcAllFrames()
    containerCalcScroll()
    floatObjCalcScroll()
    testFPS = testFPS + 1
  }
  stage.scrollY = window.pageYOffset;
  requestAnimationFrame(floatObjCalcFrame)
}

//CALCULATE OBJECT FRAME
function calcAllFrames(){
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    const el = floatingObjArray[i];
    if(el.parent.inView){
      //if(this.name == 'test'){console.log(this.parent)}
      //X Calc
      let left = el.l
        + ((el.stage.mouseX - .5) * el.mouseDepth); // creates range -0.5 to +0.5
      left = left + el.plaxX
      //Y Calc
      let top = el.t
      top = top
        + el.stage.mouseY // Mouse modifier
        * el.mouseDepth;
      //Plax Modifier
      top = top + el.plaxY - el.yArc
      //Rotate Calc
      let rotate = el.plaxR
      //Proportion Modifier
      el.element.style['left'] = `${left}%`;
      el.element.style['top'] = `${top}%`;
      el.element.style['transform'] = `rotate(${rotate}deg) translate3d(-${el.tx}px,-${el.ty}px,1px)`;
      if(el.name == 'test'){console.log('calced')}
    }
  }
}

//SCROLL TRIGGER ANIMATION
function scrollTo(e){
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
  function _getScrollData(){
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
      modifier = 2
    }else{
      //Skip one if transition container
      modifier = 1
    }
    //Set next container index
    if(currentIndex + modifier < stage.containers.length){
      targetIndex = currentIndex + modifier
    }else{
      targetIndex = 0
    }
    const nextContainer = stage.containers[targetIndex];
    //Set if skipping two, add both scales
    if(modifier == 2){
      scaleSpeed = scaleSpeed + nextContainer.scale
    }
    scrollData = {speedModifier: activeContainer.scale,yPos : nextContainer.y1Pos, interpolation: 1-(activeContainer.interpolation/100) }
    return scrollData;
  }
}


// $(document).ready(()=>{
//   $('.down-btn-cirle').on('click',(e)=>{
//     scrollTo(e)
//   })
// })


///////////////////////////////////////////////////////////////////////
//                              RUN APP
///////////////////////////////////////////////////////////////////////

//DOCUMENT READY
$(()=>{
  //INIT AND RUN
  (()=>{
    //Make Containers
    containersMake()
    //Init Stage Calcs
    stage.calc()
    containerCalcPosition()
    containerCalcScroll()

    //Init ActiveContainer
    stage.updateActiveContainers()
    //Refresh Containers
    stage.scrollY = $(window).scrollTop()
    //Make Objects
    makeFloatObjects(floatElements)
    //Recal Objects Position
    floatObjCalcTop()
    // ANIMATE!
    requestAnimationFrame(floatObjCalcFrame)
    //Scroll Trigger
    window.addEventListener("click", scrollTo, true);
  })()


  ///////////////////////////////////////////////////////////////////////
  //                              EVENTS
  ///////////////////////////////////////////////////////////////////////
  //ON MOUSE MOVE
  const calcMouse = throttle(function(e) {
    if(!stage.freezeMouse){
      stage.mouseX = e.clientX/window.innerWidth
      stage.mouseY = e.clientY/stage.activeContainer.h
    }
  }, stage.calcFps);
  if(!stage.isMobile){
    window.addEventListener("mousemove",(calcMouse), true);
  }

  //ON WINDOW SCROLL
  window.addEventListener('scroll', stage.updateActiveContainers(), true);

  //ON MOUSE ENTER
  const onMouseEnter = function(e) {
    stage.activeContainer = e;
  }
  stage.containers.map((e,i)=>{
    //Set Active Stage when mouse enters container
    e.element.addEventListener("mouseenter", ()=>{onMouseEnter(e)}, true);
  })

  //ON WINDOW RESIZE
  const onWindowResize = throttle(()=>{
    stage.calc()
    floatObjCalcTop()
    containerCalcPosition();
    calcAllFrames()
    //$('#debugBreakpoint').html(stage.windowProportion)
  }, stage.calcFps)
  window.addEventListener("resize", onWindowResize, true);
})
































// //DEBUGGING
// function debug(){
//   $('#debugPanel').css('display','block')
//   //RESIZE
//   window.addEventListener("resize", ()=>{
//     $('#debugBreakpoint').html(stage.breakpoint)
//     $('#proportion').html(stage.windowProportion)
//     if($('body').hasClass('lg')){
//       $('#cssbreakpoint').html('lg')
//     }else{
//       if($('body').hasClass('md')){
//         $('#cssbreakpoint').html('md')
//       }else{
//         $('#cssbreakpoint').html('sm')
//       }
//     }
//   }, true);
//   //SCROLL
//   window.addEventListener('scroll', ()=>{
//     $(stage.activeContainers).each((i,e)=>{
//       $('#activeContainer' + i).html($(e.element).attr('id'))
//       $('#interpolation' + i).html(e.interpolation)
//     })
//     $('#debugBreakpoint').html(stage.breakpoint)
//     $('.debugContainer').each((i,e)=>{
//       if($(e).html()){
//         $(e).parent().css('display','inline-block')
//       }else{
//         $(e).parent().css('display','none')
//       }
//     })
//   }, true);
// }
// debug()
//
// function performanceTest(options){
//   const check = options.testIncrementer < options.testCount;
//   if(check){
//     testFPS = 0
//     $(window).scrollTop(0);
//     options.testIncrementer++;
//     $('html, body').stop().animate({
//         scrollTop: options.target.offset().top
//     }, options.testDuration).promise().then(()=>{
//       options.results.push(testFPS/options.testDuration * 1000);
//       console.log(testFPS/options.testDuration * 1000)
//       performanceTest(options)
//     });
//   }else{
//     let resultAverage = 0;
//     options.results.map((e,i)=>{
//       resultAverage = resultAverage+e;
//     })
//     resultAverage = resultAverage / options.testCount
//     console.log(`Data Set: ${options.results}`,`Average: ${resultAverage}`)
//   }
// }
// $(document).ready(()=>{
//   $(document).on('click','#testFPS',(event)=>{
//     event.preventDefault();
//     performanceTest({
//       target: $('#work'),
//       testDuration:1000,
//       testCount: 10,
//       testIncrementer: 0,
//       results:[]
//     });
//   })
// })
