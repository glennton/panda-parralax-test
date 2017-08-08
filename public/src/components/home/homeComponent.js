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
  console.log('ACTIVECONTAINERS', activeContainers, activeContainers.length)
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
    newContainer.init(stage)
  })
}

//Init defaults on load
function initAll(){
  //Make Containers
  containersMake()
  //Init Calcs
  stage.calc()
  //Refresh
  containerSetHeight(stage.windowProportion)
  containerCalcScroll(0)
  stage.scrollY = $(window).scrollTop()
}

initAll()

function _getScrollData(){
  const activeContainers = getActiveContainers();
  let scrollData = {}
  var activeContainer = containers[activeContainers[0].index]
  console.log('ACTIVECONTAINER', activeContainer)
  const nextContainerIndex = getNextContainerIndex(activeContainers[0].index)
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
  }, 1000 * scrollData.scale * scrollData.interpolation, 'linear');
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
      newFloatingObj = new floatObj(parent, 't1_box06', options)
    }
    //Init Object
    newFloatingObj.make(e, stage)
    //Link container to child object
    containers.map((f,j)=>{
      if(newFloatingObj.parent.id == f.element.id){
        newFloatingObj.containerObj = f;
      }
    })
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
  const activeContainers = getActiveContainers()
  activeContainers.map((e,i)=>{
    if(floatingObjArray[e.id]){
      floatingObjArray[e.id].map((f, j)=>{
        f.calcPos()
      })
    }
  })
}

const floatObjCalcFrame = throttle(function() {
  const activeContainers = getActiveContainers()
  activeContainers.map((e,i)=>{
    if(floatingObjArray[e.id]){
      //Only update frames for elements inside containers in view
      floatingObjArray[e.id].map((e, i)=>{
        //Only calc if parent container is in view
        e.calcFrame();
      })
    }
  })
  requestAnimationFrame(floatObjCalcFrame)
}, stage.calcFps);

////////////////////////////////////////////////////////// EVENTS
//Mouse Move
const calcMouse = throttle(function(e) {
  console.log('STAGE.CALCFPS', stage.calcFps)
  stage.mouseX = e.clientX/window.innerWidth
  stage.mouseY = e.clientY/stage.activeContainer.h
}, stage.calcFps);
window.addEventListener("mousemove",calcMouse, true);

//Window Scroll
const onScroll = throttle(function(e) {
//!!!!!!!!!!!!!!!!!!!!!! RECALC CONTAINER SCROLL !!!!!!!!!!!!!!!!!!!!!!//
  containerCalcScroll()
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
