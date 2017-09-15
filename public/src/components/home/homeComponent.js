'use strict'
import {throttle} from '../../assets/scripts/throttle.js';
import {debounce} from '../../assets/scripts/debounce.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';
import {svgObj} from '../../assets/scripts/svgObj.js';
import {imgObj} from '../../assets/scripts/imgObj.js';
import {htmlObj} from '../../assets/scripts/htmlObj.js';
//Animation Frame Call Back https://gamedev.stackexchange.com/questions/37298/slow-firefox-javascript-canvas-performance
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

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
const floatElements = Array.from(document.getElementsByClassName('floating-element'))

let containers = []
let floatingObjArray = []

//Stage Defaults and Inits
let stage = new stageObj({
  fps: 30
})

//Refresh Container Scroll Variables
function containerCalcScroll(){
  containers.map((e, i)=>{
    e.calcScroll()
  });
}

//Refresh Floating Object Scroll Variables
function floatObjCalcScroll() {
  for(let i=0, l = floatingObjArray.length; i<l; i++){
    var el = floatingObjArray[i];
    el.calcScroll();
  }
}


//Refresh Floating Object Top Variables
function floatObjCalcTop() {
  //Only animate if user action in window
  for(var i=0, l = floatingObjArray.length; i<l; i++){
    var el = floatingObjArray[i];
    el.setPos();
  }
}

//Refresh Container Variables
function containerSetHeight(windowProportion){
  //Recalc stage in Resize Event Listener
  containers.map((e, i)=>{
    //Reset Height
    e.setHeight(windowProportion);
  });
  //Recalc Stage
  stage.calc()
}

function getActiveContainers(){
  let activeContainers = []
  containers.map((e,i)=>{
    if(e.inView){
      activeContainers.push({id: e.element.id, index:i})
    }
  })
  //console.log('ACTIVECONTAINERS', activeContainers, activeContainers.length)
  return activeContainers
}

function containersMake(){
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    const newContainer = new containerObj(e);
    containers.push(newContainer)
    newContainer.position = i;
    newContainer.init(stage)
  })
  //Create reference in stage object
  stage.containers = containers;
  stage.activeContainers.push(containers[0]);
}



//Init defaults on load
function initAll(){
  //Make Containers
  containersMake()
  //Init Calcs
  stage.calc()
  //Refresh
  containerSetHeight(stage.windowRatio)
  containerCalcScroll()
  stage.scrollY = $(window).scrollTop()
  // ANIMATE!
  requestAnimationFrame(floatObjCalcFrame)
}

initAll()

function _getScrollData(){
  //update scroll calculations and active containers before setting scroll data
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
  if(currentIndex + modifier < containers.length){
    targetIndex = currentIndex + modifier
  }else{
    targetIndex = 0
  }
  const nextContainer = containers[targetIndex];
  //Set if skipping two, add both scales
  if(modifier == 2){
    scaleSpeed = scaleSpeed + nextContainer.scale
  }
  scrollData = {speedModifier: activeContainer.scale,yPos : nextContainer.y1Pos, interpolation: 1-(activeContainer.interpolation/100) }
  return scrollData;
}

function scrollTo(e){
  e.preventDefault()
  stage.freezeMouse = true;
  const scrollData = _getScrollData()
  $('html, body').stop().animate({
      scrollTop: scrollData.yPos + 10 //offet by 10 to make sure previous element is not in view
  }, 2000 * scrollData.speedModifier,()=>{
    stage.freezeMouse = false;
    //callback
  });
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

window.addEventListener("click", scrollTo, true);
// $(document).ready(()=>{
//   $('.down-btn-cirle').on('click',(e)=>{
//     scrollTo(e)
//   })
// })
////////////////////////////////////////////////////////// OBJECTS
//https://codepen.io/Yakudoo/
//!!!!!!!!!!!!!!!!!!!!!! change param values to something more standard !!!!!!!!!!!!!!!!!!!!!!//

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
    containers.map((f,j)=>{
      if(parentId == f.element.id){
        parentObj = f;
      }
    })
    //Define type of object
    if(hasClass(e,'svg-element')){
      const img = e.getAttribute('data-img')
      newFloatingObj = new svgObj( require(`../../assets/images/${img}`), parentObj, options);
    }
    if(hasClass(e,'img-element')){
      const img = e.getAttribute('data-img')
      newFloatingObj = new imgObj(require(`../../assets/images/${img}`), parentObj, options);
    }
    if(hasClass(e,'html-element')){
      newFloatingObj = new htmlObj(parentObj, options);
    }
    //Init Object
    newFloatingObj.make(e, stage)
    //Push into parent inside floating object array
    floatingObjArray.push(newFloatingObj)
  })
}
makeFloatObjects(floatElements)

function calcAllFrames(){
  for(var i=0, l = floatingObjArray.length; i<l; i++){
    var el = floatingObjArray[i];
    el.calcFrame();
  }
}

function floatObjCalcFrame() {
  //Only animate if user action in window
  if(stage.mouseCheck != stage.mouseX || stage.scrollY != stage.scrollCheck){
    stage.mouseCheck  = stage.mouseX;
    stage.scrollCheck  = stage.scrollY;
    calcAllFrames()
    containerCalcScroll()
    floatObjCalcScroll()
  }
  stage.scrollY = window.pageYOffset;
  requestAnimationFrame(floatObjCalcFrame)
}



////////////////////////////////////////////////////////// EVENTS
//Mouse Move
const calcMouse = throttle(function(e) {
  if(!stage.freezeMouse){
    stage.mouseX = e.clientX/window.innerWidth
    stage.mouseY = e.clientY/stage.activeContainer.h
  }
}, stage.calcFps);
if(!stage.isMobile){
  window.addEventListener("mousemove",(calcMouse), true);
}

//Window Scroll

window.addEventListener('scroll', stage.updateActiveContainers(), true);

//Mouse Enter
const onMouseEnter = function(e) {
  stage.activeContainer = e;
}
containers.map((e,i)=>{
  //Set Active Stage when mouse enters container
  e.element.addEventListener("mouseenter", ()=>{onMouseEnter(e)}, true);
})

const onWindowResize = throttle(()=>{
  stage.calc()
  floatObjCalcTop()
  containerSetHeight(stage.windowRatio);
  calcAllFrames()
  //$('#debugBreakpoint').html(stage.windowProportion)
}, stage.calcFps)
window.addEventListener("resize", onWindowResize, true);


//DEBUGGING
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
