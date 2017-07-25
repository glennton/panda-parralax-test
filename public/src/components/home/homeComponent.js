import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatingObj} from '../../assets/scripts/floatingObj.js';

let sectionContainers = Array.from(document.getElementsByClassName('section-container'))
//let mainContainers = Array.from(document.getElementsByClassName('main-container'))
let containers = []
let elements = []

let stage = new stageObj()


//Refresh Container Variables
let refreshContainers = ()=>{
  //Recalc stage in Resize Event Listener
  containers.map((e, i)=>{
    e.refresh(stage);
  });
  //Recalc Stage
  stage.calc()
}

//Init defaults on load
let initAll = ()=>{
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    let newContainer = new containerObj(e);
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
let pixiWidth = window.innerWidth;
let pixiHeight = window.innerHeight;

let mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};
let mouseParent = containers[0]['element'];

stage.fps = 10
//Default should be 60, but if less need to speed up animations
stage.fpsModifier = 60 / stage.fps
stage.calcFps = 1000 / stage.fps

////////////////////////////////////////////////////////// OBJECTS
let cloud01 = new floatingObj( require("../../assets/images/cloud_01.svg"), 'cloud01', 'intro',{ depth:5, initPcX:80, initPcY:55, floatFrequency:.001, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
let cloud02 = new floatingObj( require("../../assets/images/cloud_02.svg"), 'cloud02', 'intro',{ depth:4, initPcX:10, initPcY:50, floatFrequency:.002, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
let cloud03 = new floatingObj( require("../../assets/images/cloud_03.svg"), 'cloud03', 'intro',{ depth:3, initPcX:70, initPcY:70, floatFrequency:.003, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#86b6e4' })
let cloud04 = new floatingObj( require("../../assets/images/cloud_04.svg"), 'cloud04', 'intro',{ depth:2, initPcX:20, initPcY:70, floatFrequency:.004, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#95b6e4' })
let cloud05 = new floatingObj( require("../../assets/images/cloud_05.svg"), 'cloud05', 'intro',{ depth:1, initPcX:60, initPcY:70, floatFrequency:.007, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#d7ecf6' })
let cloud06 = new floatingObj( require("../../assets/images/cloud_06.svg"), 'cloud06', 'intro',{ depth:1, initPcX:30, initPcY:70, floatFrequency:.008, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#f4f5fb' })
const clouds = [cloud01, cloud02, cloud03, cloud04, cloud05, cloud06]

clouds.map((e, i)=>{
  e.make();
  elements.push(e);
})

////////////////////////////////////////////////////////// EVENTS
//!!!!!!!!!!!!!!!!!!!!!! change E to parent !!!!!!!!!!!!!!!!!!!!!!//
//Mouse Move
const calcMouse = throttle(function(e) {
  let container = e.srcElement.getAttribute('id')
  let parent = document.getElementById(container);

  let xPos = e.clientX/mouseParent.clientWidth
  let yPos = e.clientY/mouseParent.clientHeight
  mousePos = {x:xPos, y:yPos};
}, stage.calcFps);

window.addEventListener("mousemove",calcMouse, true);
window.addEventListener("mousemove",updateAllSprites, true);

//Window Scroll
const onScroll = throttle(function(e) {
//!!!!!!!!!!!!!!!!!!!!!! RECALC CONTAINER SCROLL !!!!!!!!!!!!!!!!!!!!!!//
}, stage.calcFps);

window.addEventListener('scroll', onScroll, true);


//Mouse Enter
const onMouseEnter = function(e) {
  stage.setContainer(e);
  console.log(stage.activeContainer)
}

containers.map((e,i)=>{
  //Set Active Stage
  e.element.addEventListener("mouseenter", onMouseEnter, true);
})


function onMouseMove(event, height, e) {
  var tx = ((event.clientX / stage.w) *2).toFixed(4);
  var ty = 1 - ((event.clientY / height) *2).toFixed(4);
  var test = ((event.clientX / stage.w) *2)
  mousePos = {x:tx, y:ty};
  var posX = event.clientX / stage.w
}


function makeAll(){
  for(var i=0, l = elements.length; i<l; i++){
    var el = elements[i];
    el.make();
  }
}

function repositionAll(){
  for(var i=0, l = elements.length; i<l; i++){
    var el = elements[i];
    el.updatePosition(mousePos);
  }
}



////////////////////////////////////////////////////////// MAIN EVENTS
//Resize Event
let id;
$(window).resize(()=>{
    clearTimeout(id);
    id = setTimeout(()=>{
      pixiWidth = window.innerWidth
      pixiHeight = window.innerHeight
      stage.calc()
      refreshContainers();
    }, 200);
});


window.setInterval(function(){
  repositionAll()
}, stage.calcFps);

////////////////////////////////////////////////////////// ANIMATE!
const updateAllSprites = throttle(function(e) {
  repositionAll()
}, stage.calcFps); // Maximum run of once per 500 milliseconds
