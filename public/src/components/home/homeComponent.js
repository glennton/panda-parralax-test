import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';
import {svgObj} from '../../assets/scripts/svgObj.js';

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
const floatElements = Array.from(document.getElementsByClassName('floating-element'))
//let mainContainers = Array.from(document.getElementsByClassName('main-container'))
let containers = []
let floatingObjArray = {}

//Stage Defaults
let stage = new stageObj({
  activeContainer: containers[0],
  fps: 1
})

//Refresh Container Variables
const containerCalcScroll = (scrollY, stageHeight)=>{
  containers.map((e, i)=>{
    e.calcScroll(scrollY, stageHeight)
  });
}

//Refresh Container Variables
const containerSetHeight = (windowProportion)=>{
  //Recalc stage in Resize Event Listener
  containers.map((e, i)=>{
    //Reset Height
    e.setHeight(windowProportion);
  });
  //Recalc Stage
  stage.calc()
}

const containersMake = ()=>{
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    const newContainer = new containerObj(e);
    containers.push(newContainer)
    newContainer.init(window['innerHeight'] , i)
  })
}

//Init defaults on load
const initAll = ()=>{
  //Make Containers
  containersMake()
  //Init Calcs
  stage.calc()
  //Refresh
  containerSetHeight(stage.windowProportion)
  containerCalcScroll(0, window['innerHeight'])
}

initAll()
//containerSetHeight(stage.windowProportion)

function _getInViewElement(){
  let returnElement;
  containers.map((e, i)=>{
    let j;
    if(i + 1 == containers.length){
      j = 0
    }else{
      j = i+1
    }
    console.log(e.inView , e.interpolation < 60 , e.interpolation , e.scale , e.proportionY  )
    if(e.inView){
      if(returnElement){
        if(e.interpolation < 60){
          returnElement = {scale: e.scale,yPos : containers[j]['y1Pos']}
        }
      }else{
        returnElement = {scale: e.scale,yPos : containers[j]['y1Pos']}
      }
    }
  });
  return returnElement;
}

function scrollTo(e){
  e.preventDefault()
  const scrollData = _getInViewElement()
  $('html, body').stop().animate({
      scrollTop: scrollData.yPos
  }, 500 * scrollData.scale);
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

window.addEventListener("click", scrollTo, true);

////////////////////////////////////////////////////////// OBJECTS
//https://codepen.io/Yakudoo/
//!!!!!!!!!!!!!!!!!!!!!! change param values to something more standard !!!!!!!!!!!!!!!!!!!!!!//
/*
let intro_cloud01 = new floatObj( require("../../assets/images/cloud_01.svg"), 'intro','cloud01',
  { initPcX:80, initPcY:45, floatFrequency:1, floatAmplitude:1, floatAngle:0,initScaleW:.6 , color:'#0280BE', mouseDepth:-5, plaxDepth: 2, z: 10 })
let intro_cloud02 = new floatObj( require("../../assets/images/cloud_02.svg"), 'intro','intro_cloud02',
  { initPcX:15, initPcY:35, floatFrequency:.04, floatAmplitude:1, floatAngle:0,initScaleW:.5 , color:'#0280BE', mouseDepth:-4, plaxDepth: 2, z: 10 })
let intro_cloud03 = new floatObj( require("../../assets/images/cloud_03.svg"), 'intro','intro_cloud03',
  { initPcX:80, initPcY:50, floatFrequency:.1, floatAmplitude:1, floatAngle:0,initScaleW:.4 , color:'#81c6e4', mouseDepth:4, plaxDepth: 1.5 })
let intro_cloud04 = new floatObj( require("../../assets/images/cloud_04.svg"), 'intro','intro_cloud04',
  { initPcX:20, initPcY:55, floatFrequency:.08, floatAmplitude:1, floatAngle:0,initScaleW:.4 , color:'#95b6e4', mouseDepth:2, plaxDepth: 3.5 })
let intro_cloud05 = new floatObj( require("../../assets/images/cloud_05.svg"), 'intro','intro_cloud05',
  { initPcX:70, initPcY:55, floatFrequency:.07, floatAmplitude:.5, floatAngle:0,initScaleW:.35 , color:'#d7ecf6', mouseDepth:1, plaxDepth: 2.5, z: 15 })
let intro_cloud06 = new floatObj( require("../../assets/images/cloud_06.svg"), 'intro','intro_cloud06',
  { initPcX:30, initPcY:50, floatFrequency:.1, floatAmplitude:.5, floatAngle:0,initScaleW:.3 , color:'#d2e6ff', mouseDepth:1, plaxDepth: 1, z: 11 })
let intro_cloud07 = new floatObj( require("../../assets/images/cloud_01.svg"), 'intro','intro_cloud07',
  { initPcX:12, initPcY:52, floatFrequency:.08, floatAmplitude:1, floatAngle:0,initScaleW:.35 , color:'#f4f5fb', mouseDepth:4, plaxDepth: 1.7 })

let intro_angle01 = new floatObj( require("../../assets/images/angle_01.svg"), 'intro','intro_angle01',
  { initPcX:50, initPcY:20, floatAngle:0,initScaleW:1.2,initScaleH:2 , color:'#026b9f', mouseDepth:.2, plaxDepth: .2, z: 5})
let intro_waves01 = new floatObj( require("../../assets/images/waves_01.svg"), 'intro','intro_waves01',
  { initPcX:50, initPcY:75, floatAngle:0,initScaleW:1.2,initScaleH:2 , color:'#026b9f', mouseDepth:4, plaxDepth: 2, z: 30 })
let intro_waves02 = new floatObj( require("../../assets/images/waves_02.svg"), 'intro','intro_waves02',
  { initPcX:50, initPcY:50, floatAngle:0,initScaleW:1.2,initScaleH:2 , color:'#5db6e4', mouseDepth:6, plaxDepth: -1, z: 25 })

let intro_box01 = new floatObj( require("../../assets/images/box_04.svg"), 'intro','intro_box01',
  { initPcX:50, initPcY:70, floatAngle:0,initScaleW:1.2, color:'#007ab7', plaxDepth: -1.5, z: 35, rotate: 3 })
let intro_box02 = new floatObj( require("../../assets/images/box_04.svg"), 'intro','intro_box02',
  { initPcX:50, initPcY:78, floatAngle:0,initScaleW:1.2, color:'#bae4a4', plaxDepth: 1, z: 34, rotate: -2 })
let intro_box03 = new floatObj( require("../../assets/images/box_04.svg"), 'intro','intro_box03',
  { initPcX:50, initPcY:98, floatAngle:0,initScaleW:1.2, color:'#bae4a4', plaxDepth: .5, z: 36, rotate: -2 })

floatObjMake([intro_cloud01, intro_cloud02, intro_cloud03, intro_cloud04, intro_cloud05, intro_cloud06, intro_cloud07, intro_angle01, intro_waves01, intro_waves02, intro_box01, intro_box02, intro_box03])

let t1_box01 = new floatObj( require("../../assets/images/box_04.svg"),'transition1', 't1_box01',
  { initPcX:50, initPcY:10, floatAngle:0,initScaleW:1.2, color:'#be9de0', plaxDepth: -1, z: 10, rotate: 6 })
let t1_box02 = new floatObj( require("../../assets/images/box_05.svg"),'transition1', 't1_box02',
  { initPcX:50, initPcY:20, floatAngle:0,initScaleW:1.2, color:'#026b9f', plaxDepth: 5, z: 10, rotate: -3 })
let t1_box03 = new floatObj( require("../../assets/images/box_04.svg"),'transition1', 't1_box03',
  { initPcX:50, initPcY:30, floatAngle:0,initScaleW:1.2, color:'#328ac5', plaxDepth: -3, z: 10, rotate: 1 })
let t1_box04 = new floatObj( require("../../assets/images/box_01.svg"),'transition1', 't1_box04',
  { initPcX:50, initPcY:40, floatAngle:0,initScaleW:1.2, color:'#bae4a4', plaxDepth: 3, z: 10, rotate: 3 })
let t1_box05 = new floatObj( require("../../assets/images/box_04.svg"),'transition1', 't1_box05',
  { initPcX:50, initPcY:50, floatAngle:0,initScaleW:1.2, color:'#698ac5', plaxDepth: -1.5, z: 10, rotate: -2 })
let t1_box06 = new floatObj( require("../../assets/images/box_05.svg"),'transition1', 't1_box06',
  { initPcX:50, initPcY:60, floatAngle:0,initScaleW:1.2, color:'#6967a8', plaxDepth: 1, z: 10, rotate: 5 })
let t1_box07 = new floatObj( require("../../assets/images/box_04.svg"),'transition1', 't1_box07',
  { initPcX:50, initPcY:70, floatAngle:0,initScaleW:1.2, color:'#6967a8', plaxDepth: -2, z: 10, rotate: -3 })

floatObjMake([t1_box01, t1_box02, t1_box03, t1_box04, t1_box05, t1_box06, t1_box07])
*/

function makeFloatObjects(arr){
  arr.map((e,i) => {
    let options = {};
    var nodes=[], values=[];
    for (let att, i = 0, atts = e.attributes, n = atts.length; i < n; i++){
        att = atts[i];
        options[att.nodeName] = att.nodeValue
    }
    const parent = e.parentElement.id
    const img = e.getAttribute('data-img')
    let newFloatingObj;
    //Define type of object
    if(hasClass(e,'svg-element')){
      newFloatingObj = new svgObj( require(`../../assets/images/${img}`), parent, 't1_box06', options)
    }else{
      newFloatingObj = new floatObj( require(`../../assets/images/${img}`), parent, 't1_box06', options)
    }
    //Init Object
    newFloatingObj.make(e)
    //Link container to child object
    containers.map((f,j)=>{
      if(newFloatingObj.parent.id == f.element.id){
        newFloatingObj.containerObj = f;
      }
    })
    newFloatingObj.fpsModifier = stage.fpsModifier;
    //Push into parent inside floating object array
    if(!floatingObjArray[parent]){
      floatingObjArray[parent] = []
    }
    floatingObjArray[parent].push(newFloatingObj);
  })
}
makeFloatObjects(floatElements)

//Only needed on resize or orientation
function floatObjCalcPos(){
  floatingObjArray.map((e, i)=>{
    e.calcPos()
  })
}


function _getActiveContainers(){
  let activeContainers = []
  containers.map((e,i)=>{
    if(e.inView){
      activeContainers.push(e.element.id)
    }
  })
  return activeContainers
}

const floatObjCalcFrame = throttle(function() {
  const activeContainers = _getActiveContainers()
  activeContainers.map((e,i)=>{
    if(floatingObjArray[e]){
      //Only update frames for elements inside containers in view
      floatingObjArray[e].map((e, i)=>{
        //Only calc if parent container is in view
        if(e.containerObj.inView){
          e.calcFrame(mousePos, stage.fps);
        }
      })
    }
  })
  requestAnimationFrame(floatObjCalcFrame)
}, stage.calcFps);

////////////////////////////////////////////////////////// EVENTS
let mousePos = {x:.50, y:.50};

//Mouse Move
const calcMouse = throttle(function(e) {
  const xPos = e.clientX/window.innerWidth
  const yPos = e.clientY/stage.activeContainer.h
  mousePos = {x:xPos, y:yPos};
}, stage.calcFps);
window.addEventListener("mousemove",calcMouse, true);

//Window Scroll
const onScroll = throttle(function(e) {
//!!!!!!!!!!!!!!!!!!!!!! RECALC CONTAINER SCROLL !!!!!!!!!!!!!!!!!!!!!!//
  const scrollY = (window['pageYOffset'] !== undefined) ? window['pageYOffset'] : (document['documentElement'] || document['body']['parentNode'] || document['body']).scrollTop;
  containerCalcScroll(scrollY, stage.h)
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
