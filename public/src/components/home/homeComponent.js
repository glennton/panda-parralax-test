'use strict'
import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';
import {svgObj} from '../../assets/scripts/svgObj.js';

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
const floatElements = Array.from(document.getElementsByClassName('floating-element'))

let containers = []
let floatingObjArray = {}

//Stage Defaults and Inits
let stage = new stageObj({
  fps: 1
})

//Refresh Container Variables
function containerCalcScroll(){
  containers.map((e, i)=>{
    e.calcScroll()
  });
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

function getNextContainerIndex(index){
  let newIndex;
  const containerCount = containers.length
  if(index + 1 < containers.length){
    newIndex = index + 1
  }else{
    newIndex = 0
  }
  return newIndex
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
  containerSetHeight(stage.windowProportion)
  containerCalcScroll()
  stage.scrollY = $(window).scrollTop()
}

initAll()

function _getScrollData(){
  //update calculations before scroll
  containerCalcScroll()
  stage.updateActiveContainers()
  let scrollData = {}
  var activeContainer = stage.activeContainers[0]
  console.log('ACTIVECONTAINER', activeContainer, scrollData)
  const nextContainerIndex = getNextContainerIndex(stage.activeContainers[0].position)
  const nextContainer = containers[nextContainerIndex]
  scrollData = {scale: activeContainer.scale,yPos : nextContainer.y1Pos, interpolation: 1-(activeContainer.interpolation/100) }
  // activeContainers.map((e,i)=>{
  //   const nextContainerIndex = getNextContainerIndex(e.index)
  //   const nextContainer = containers[nextContainerIndex]
  //   const activeContainer = containers[e.index]
  //   scrollData = {scale: activeContainer.scale,yPos : nextContainer.y1Pos, interpolation: 1-(activeContainer.interpolation/100) }
  // })

  return scrollData;
}

function scrollTo(e){
  e.preventDefault()
  const scrollData = _getScrollData()
  $('html, body').stop().animate({
      scrollTop: scrollData.yPos + 10 //offet by 10 to make sure previous element is not in view
  }, 1000 * scrollData.scale,()=>{
    //callback
  });
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

window.addEventListener("click", scrollTo, true);

////////////////////////////////////////////////////////// OBJECTS
//https://codepen.io/Yakudoo/
//!!!!!!!!!!!!!!!!!!!!!! change param values to something more standard !!!!!!!!!!!!!!!!!!!!!!//

function makeFloatObjects(arr){
  arr.map((e,i) => {
    let options = {};
    let newFloatingObj;
    let parentObj;
    const parentId = $(e).parent().attr('id')
    for (let att, i = 0, atts = e.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        options[att.nodeName] = att.nodeValue
    }
    const img = e.getAttribute('data-img')
    //Link object to parent
    containers.map((f,j)=>{
      if(parentId == f.element.id){
        parentObj = f;
      }
    })
    //Define type of object
    if(hasClass(e,'svg-element')){
      newFloatingObj = new svgObj( require(`../../assets/images/${img}`), parentObj, 't1_box06', options)
    }else{
      newFloatingObj = new floatObj(parentObj, 't1_box06', options)
    }
    //Init Object
    newFloatingObj.make(e, stage)
    //Push into parent inside floating object array
    if(!floatingObjArray[parentId]){
      floatingObjArray[parentId] = []
    }
    floatingObjArray[parentId].push(newFloatingObj);
  })
}
makeFloatObjects(floatElements)

//Only needed on resize or orientation
function floatObjCalcPos(){
  containers.map((e,i)=>{
    if(floatingObjArray[e.element.id]){
      floatingObjArray[e.element.id].map((f, j)=>{
        f.calcPos()
      })
    }
  })
}


const floatObjCalcFrame = throttle(function() {
  stage.activeContainers.map((e,i)=>{
    if(floatingObjArray[e.element.id]){
      //Only update frames for elements inside containers in view
      floatingObjArray[e.element.id].map((f, j)=>{
        //Only calc if parent container is in view
        f.calcFrame();
      })
    }
  })
  requestAnimationFrame(floatObjCalcFrame)
}, stage.calcFps);

////////////////////////////////////////////////////////// EVENTS
//Mouse Move
const calcMouse = throttle(function(e) {
  stage.mouseX = e.clientX/window.innerWidth
  stage.mouseY = e.clientY/stage.activeContainer.h
}, stage.calcFps);
window.addEventListener("mousemove",calcMouse, true);

//Window Scroll
const onScroll = throttle(function(e) {
//!!!!!!!!!!!!!!!!!!!!!! RECALC CONTAINER SCROLL !!!!!!!!!!!!!!!!!!!!!!//
  containerCalcScroll()
  stage.updateActiveContainers()
  stage.scrollY = $(window).scrollTop();
}, stage.calcFps);
window.addEventListener('scroll', onScroll, true);

//Mouse Enter
const onMouseEnter = function(e) {
  stage.setContainer(e);
}
containers.map((e,i)=>{
  //Set Active Stage when mouse enters container
  e.element.addEventListener("mouseenter", ()=>{onMouseEnter(e)}, true);
})

const onWindowResize = throttle(()=>{
  stage.calc()
  containerSetHeight(stage.windowProportion);
  floatObjCalcPos();
}, stage.calcFps)
window.addEventListener("resize", onWindowResize, onWindowResize);

////////////////////////////////////////////////////////// ANIMATE!

requestAnimationFrame(floatObjCalcFrame)
