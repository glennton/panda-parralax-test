import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatingObj} from '../../assets/scripts/floatingObj.js';

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
const refreshContainers = ()=>{
  //Recalc stage in Resize Event Listener
  containers.map((e, i)=>{
    e.refresh(stage);
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
    newContainer.calc(stage)
  })
  //Init Calcs
  stage.calc()
  //Refresh
  refreshContainers(stage)
}

initAll()
refreshContainers()

////////////////////////////////////////////////////////// VARS

//https://codepen.io/Yakudoo/
let mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};


////////////////////////////////////////////////////////// OBJECTS
//!!!!!!!!!!!!!!!!!!!!!! change param values to something more standard !!!!!!!!!!!!!!!!!!!!!!//
let cloud01 = new floatingObj( require("../../assets/images/cloud_01.svg"), 'intro',{ depth:5, initPcX:80, initPcY:55, floatFrequency:.001, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
let cloud02 = new floatingObj( require("../../assets/images/cloud_02.svg"), 'intro',{ depth:4, initPcX:10, initPcY:50, floatFrequency:.002, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
let cloud03 = new floatingObj( require("../../assets/images/cloud_03.svg"), 'intro',{ depth:3, initPcX:70, initPcY:70, floatFrequency:.003, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#86b6e4' })
let cloud04 = new floatingObj( require("../../assets/images/cloud_04.svg"), 'intro',{ depth:2, initPcX:20, initPcY:70, floatFrequency:.004, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#95b6e4' })
let cloud05 = new floatingObj( require("../../assets/images/cloud_05.svg"), 'intro',{ depth:1, initPcX:60, initPcY:70, floatFrequency:.007, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#d7ecf6' })
let cloud06 = new floatingObj( require("../../assets/images/cloud_06.svg"), 'intro',{ depth:1, initPcX:30, initPcY:70, floatFrequency:.008, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#f4f5fb' })
makefloatingObj([cloud01, cloud02, cloud03, cloud04, cloud05, cloud06])

function makefloatingObj(arr){
  arr.map((e, i)=>{
    e.make();
    e.calcPos();
    e['fpsModifier'] = stage.fpsModifier;
    floatingObjArray.push(e);
  })
}
//Only needed on resize or orientation
function calcPosfloatingObj(){
  floatingObjArray.map((e, i)=>{
    e.calcPos()
  })
}

function calcFramefloatingObj(){
  for(var i=0, l = floatingObjArray.length; i<l; i++){
    var el = floatingObjArray[i];
    el.calcFrame(mousePos);
  }
}



////////////////////////////////////////////////////////// EVENTS

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
  refreshContainers(); // Also Recals Stage
  calcPosfloatingObj();
}, stage.calcFps)
window.addEventListener("resize", onWindowResize, onWindowResize);

////////////////////////////////////////////////////////// ANIMATE!
window.setInterval(function(){
  calcFramefloatingObj()
}, stage.calcFps);
