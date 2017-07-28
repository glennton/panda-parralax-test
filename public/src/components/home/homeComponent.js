import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
//let mainContainers = Array.from(document.getElementsByClassName('main-container'))
let containers = []
let floatingObjArray = []

//Stage Defaults
let stage = new stageObj({
  activeContainer: containers[0],
  fps: 60
})

//Refresh Container Variables
const containerCalcScroll = (scrollY, stageHeight)=>{
  containers.map((e, i)=>{
    e.calcScroll(scrollY, stageHeight)
  });
}

//Refresh Container Variables
const containerCalcProportion = (windowProportion)=>{
  //Recalc stage in Resize Event Listener
  containers.map((e, i)=>{
    e.refresh(windowProportion);
  });
  //Recalc Stage
  stage.calc()
}

//Init defaults on load
const initAll = ()=>{
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    const newContainer = new containerObj(e);
    containers.push(newContainer)
    newContainer.init(stage.h)
  })
  //Init Calcs
  stage.calc()
  //Refresh
  containerCalcProportion(stage.windowProportion)
}

initAll()
containerCalcProportion(stage.windowProportion)

////////////////////////////////////////////////////////// OBJECTS
//https://codepen.io/Yakudoo/
//!!!!!!!!!!!!!!!!!!!!!! change param values to something more standard !!!!!!!!!!!!!!!!!!!!!!//
let cloud01 = new floatObj( require("../../assets/images/cloud_01.svg"), 'intro','cloud01',
  { initPcX:80, initPcY:35, floatFrequency:.001, floatAmplitude:2, floatAngle:0,initScaleW:.7 , color:'#0280BE', mouseDepth:5, plaxDepth: 2, z: 10 })
let cloud02 = new floatObj( require("../../assets/images/cloud_02.svg"), 'intro','cloud02',
  { initPcX:10, initPcY:30, floatFrequency:.002, floatAmplitude:2, floatAngle:0,initScaleW:.5 , color:'#0280BE', mouseDepth:4, plaxDepth: 2, z: 10 })
let cloud03 = new floatObj( require("../../assets/images/cloud_03.svg"), 'intro','cloud03',
  { initPcX:80, initPcY:50, floatFrequency:.003, floatAmplitude:1, floatAngle:0,initScaleW:.4 , color:'#86b6e4', mouseDepth:3, plaxDepth: 1.5 })
let cloud04 = new floatObj( require("../../assets/images/cloud_04.svg"), 'intro','cloud04',
  { initPcX:20, initPcY:45, floatFrequency:.004, floatAmplitude:1, floatAngle:0,initScaleW:.4 , color:'#95b6e4', mouseDepth:2, plaxDepth: 1.7 })
let cloud05 = new floatObj( require("../../assets/images/cloud_05.svg"), 'intro','cloud05',
  { initPcX:70, initPcY:50, floatFrequency:.007, floatAmplitude:.5, floatAngle:0,initScaleW:.35 , color:'#d7ecf6', mouseDepth:1, plaxDepth: .5, z: 15 })
let cloud06 = new floatObj( require("../../assets/images/cloud_06.svg"), 'intro','cloud06',
  { initPcX:30, initPcY:55, floatFrequency:.008, floatAmplitude:.5, floatAngle:0,initScaleW:.3 , color:'#f4f5fb', mouseDepth:1, plaxDepth: 1 })

let angle01 = new floatObj( require("../../assets/images/angle_01.svg"), 'intro','angle01',
  { initPcX:50, initPcY:20, z: 5, floatFrequency:.008, floatAmplitude:.5, floatAngle:0,initScaleW:1.2,initScaleH:2 , color:'#026b9f', mouseDepth:1, plaxDepth: .5 })
floatObjMake([cloud01, cloud02, cloud03, cloud04, cloud05, cloud06, angle01])

function floatObjMake(arr){
  //Make float objects
  arr.map((e, i)=>{
    e.make();
    //Set Parent Object
    containers.map((f,j)=>{
      if(e.parent.id == f.element.id){
        e.containerObj = f;
      }
    })
    e['fpsModifier'] = stage.fpsModifier;
    floatingObjArray.push(e);
  })
}
//Only needed on resize or orientation
function floatObjCalcPos(){
  floatingObjArray.map((e, i)=>{
    e.calcPos()
  })
}

function floatObjCalcFrame(){
  floatingObjArray.map((e, i)=>{
    //Only calc if parent container is in view
    if(e.containerObj.inView){
      e.calcFrame(mousePos);
    }
  })
}

////////////////////////////////////////////////////////// EVENTS
let mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};

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
  containerCalcProportion(stage.windowProportion);
  floatObjCalcPos();
}, stage.calcFps)
window.addEventListener("resize", onWindowResize, onWindowResize);

////////////////////////////////////////////////////////// ANIMATE!
window.setInterval(function(){
  floatObjCalcFrame()
}, stage.calcFps);
