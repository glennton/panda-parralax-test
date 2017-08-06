import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';
import {floatObj} from '../../assets/scripts/floatObj.js';
import {svgObj} from '../../assets/scripts/svgObj.js';

const sectionContainers = Array.from(document.getElementsByClassName('section-container'))
const floatElements = Array.from(document.getElementsByClassName('floating-element'))

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

function _getInViewElement(){
  let returnElement;
  containers.map((e, i)=>{
    let j;
    if(i + 1 == containers.length){
      j = 0
    }else{
      j = i+1
    }
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

function makeFloatObjects(arr){
  arr.map((e,i) => {
    let options = {};
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
      newFloatingObj = new floatObj('', parent, 't1_box06', options)
    }
    //Init Object
    newFloatingObj.make(e)
    //Link container to child object
    containers.map((f,j)=>{
      console.log(newFloatingObj)
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
        e.calcFrame(mousePos, stage.fps);
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
