import {throttle} from '../../assets/scripts/throttle.js';
import {containerObj} from '../../assets/scripts/containerObj.js';
import {stageObj} from '../../assets/scripts/stageObj.js';

let sectionContainers = Array.from(document.getElementsByClassName('section-container'))
let mainContainers = Array.from(document.getElementsByClassName('main-container'))
let containers = []

let last_known_scroll_position = 0;
let ticking = false;

//Refresh Stage Variables
let refreshStage = ()=>{
  stage.calc()
}
//Refresh Container Variables
let refreshContainers = ()=>{
  containers.map((e, i)=>{
    e.calc();
  });
}
//Init defaults on load
let initAll = ()=>{
  //Push Container to Array
  sectionContainers.map((e, i)=>{
    let newContainer = new containerObj(e);
    containers.push(newContainer)
  })
  let stage = new stageObj()
  stage.calc()
  refreshContainers()
  console.log(containers , stage)
}
initAll()



window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      //refreshStage()
      ticking = false;
    });
  }
  ticking = true;
});










////////////////////////////////////////////////////////// ANIMATION

//http://jsfiddle.net/user/m1erickson/fiddles/
let stop = false;
let frameCount = 0;
let fps, fpsInterval, startTime, now, then, elapsed;


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    //animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        repositionAll();
    }
}









////////////////////////////////////////////////////////// VARS

//https://codepen.io/Yakudoo/
let pixiWidth = window.innerWidth;
let pixiHeight = window.innerHeight;

let mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};
let mouseParent = containers[0]['element'];

let framesPerSec = 10
let calcFrameRate = 1000 / framesPerSec
// 1000MS
let globalScale = 1;
let parallaxCoeff = 3;
let repulsion = .95;

let colorArrayBlues = [
  '0x0280BE',
  '0x86b6E4',
  '0xFFFFFF',
  '0xD7ECF6',
  '0x95B6E4'
]
let cloudArray = [
  require('../../assets/images/cloud_01.png'),
  require('../../assets/images/cloud_02.png'),
  require('../../assets/images/cloud_03.png'),
  require('../../assets/images/cloud_04.png'),
  require('../../assets/images/cloud_05.png'),
  require('../../assets/images/cloud_06.png')
]
let cloudObjs = {}

const calcMouse = throttle(function(e) {
  let container = e.srcElement.getAttribute('id')
  let parent = document.getElementById(container);

  //Ignore if somehow greater than 1..
  let xPos = e.clientX/mouseParent.clientWidth
  let yPos = e.clientY/mouseParent.clientHeight
  mousePos = {x:xPos, y:yPos};

}, calcFrameRate); // Maximum run of once per 500 milliseconds

const updateAllSprites = throttle(function(e) {
  repositionAll()
}, calcFrameRate); // Maximum run of once per 500 milliseconds

////////////////////////////////////////////////////////// EVENTS

containers.map((e,i)=>{
  //Mouse Move
  e.element.addEventListener("mousemove",calcMouse, true);
  e.element.addEventListener("mousemove",updateAllSprites, true);
  //Set Active Stage
  e.element.addEventListener("mouseenter", (event)=>{
    onMouseEnter(event, e.element)
  });
})

////////////////////////////////////////////////////////// FUNCTIONS

function onMouseMove(event, height, e) {
  var tx = ((event.clientX / pixiWidth) *2).toFixed(4);
  var ty = 1 - ((event.clientY / height) *2).toFixed(4);
  var test = ((event.clientX / pixiWidth) *2)
  //console.log('tx',typeof test )
  mousePos = {x:tx, y:ty};
  var posX = event.clientX / pixiWidth
  //console.log(posX)
}

function onMouseEnter(event, element) {
  mouseParent = element;
}

/*
function randomizeSimple(params){
  let {min= 0, max= 0, decimalPlace= 1, forIndex=false} = params;
  if(forIndex) max = max - 1
  let num
  num = Math.round(Math.random() * (max - min) + min);
  num = num / decimalPlace
  return num
}
function makeClouds(number, parent){
  for (var i = 0; i < number; i++) {
    let cloudIndex = randomizeSimple({max: cloudArray.length, decimalPlace: 1, forIndex: true});
    let rCloud = cloudArray[cloudIndex];
    let tintIndex = randomizeSimple({max: cloudArray.length, decimalPlace: 1, forIndex: true});
    let rtint = colorArrayBlues[tintIndex]
    let rInitPcY = randomizeSimple({min: 5, max: 8, decimalPlace: 10})
    let rInitPcX = randomizeSimple({max: 10, decimalPlace: 10})
    let rFloatFrequency = randomizeSimple({min: 5, max: 10, decimalPlace: 100})
    cloudObjs[i] = new floatingObj( rCloud , introStage, parent,{ depth:5, initPcX:rInitPcX, initPcY:rInitPcY, floatFrequency:rFloatFrequency, floatAmplitude:5, floatAngle:0,initScale:.7, tint: rtint });
    cloudObjs[i].make();
  }
}
*/



let elements = []

class floatingObj {
  constructor(src, name, parent, options) {
    options = options  || {};
    this.name = name;
    this.parent = document.getElementById(parent);
    this.src = src;
    //Set Defaults
    let {
      initPcX = 0,
      initPcY = 0,
      initDispX = 0,
      initDispY = 0,
      depth = 1,
      initScale = 1,
      floatFrequency = 0,
      floatAmplitude = 0,
      floatAngle = 0,
      color = "#0280BE"
    } = options;
    //Assign options to this
    Object.assign(this, options);

  }
  // Make sprite and add to stage
  make(){
    const newElement = document.createElement('div');
    const svgElement = document.createRange().createContextualFragment(this.src);
    newElement.appendChild(svgElement)
    newElement.setAttribute('id', this.name)
    newElement.setAttribute('class', 'floatingObject')
    newElement.style['fill'] = this.color
    newElement.style['color'] = this.color
    this.parent.appendChild(newElement)
    elements.push(this)
  }
  // Refresh position per frame
  updatePosition(){
    const element = document.getElementById(this.name);
    /////////MODIFIERS
    let floatY = 0;
    if (this.floatFrequency>0){
      floatY = Math.cos(this.floatAngle)*this.floatAmplitude*2;
      this.floatAngle += this.floatFrequency;
    }

    //SET ELEMENT
    //Set Scale
    element.style['width'] = 100 * this.initScale + '%';
    //Set Center
    element.style['margin-left'] = '-' + element.clientWidth / 2 + 'px';
    element.style['margin-top'] = '-' + element.clientHeight / 2 + 'px';

    element.style['left'] = this.initPcX + (mousePos.x * this.depth) + '%';
    element.style['top'] =  this.initPcY + floatY + (mousePos.y * this.depth) + '%';



/*
    let floatY = 0;
    let directionX = 1;
    if (this.floatFrequency>0){
      floatY = Math.cos(this.floatAngle)*this.floatAmplitude*2;
      this.floatAngle += this.floatFrequency;
    }
    //Reverse mouse bounce if on other half of screen
    if(this.initPcX > .49){
      directionX = -1
    }
    //Mouse Modifiers
    var tx = (pixiWidth*this.initPcX) + this.initDispX - mousePos.x * directionX * this.depth * parallaxCoeff
    var ty = (pixiHeight*this.initPcY) + this.initDispY + floatY + mousePos.y * this.depth * parallaxCoeff;
    var tsx = this.initScale * Math.round( pixiWidth / 200 ) / 10 ;
    var tsy = this.initScale * Math.round( pixiWidth / 200 ) / 10 ;
    this.scaleX = tsx;
    this.scaleY = tsy;
    //console.log(tx, mousePos.x)
    this.posX = tx;
    this.posY = ty;
    this.tint = this.tint;
    console.log(this.posX , this.posY)
    element.style.top = this.posY+'%';
    element.style.left = this.posX+'%';
*/
  }
}



let cloud01 = new floatingObj( require("../../assets/images/cloud_01.svg"), 'cloud01', 'intro',{ depth:5, initPcX:80, initPcY:55, floatFrequency:.001, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
cloud01.make()

let cloud02 = new floatingObj( require("../../assets/images/cloud_02.svg"), 'cloud02', 'intro',{ depth:4, initPcX:10, initPcY:50, floatFrequency:.002, floatAmplitude:2, floatAngle:0,initScale:.5 , color:'#0280BE' })
cloud02.make()

let cloud03 = new floatingObj( require("../../assets/images/cloud_03.svg"), 'cloud03', 'intro',{ depth:3, initPcX:70, initPcY:70, floatFrequency:.003, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#86b6e4' })
cloud03.make()

let cloud04 = new floatingObj( require("../../assets/images/cloud_04.svg"), 'cloud04', 'intro',{ depth:2, initPcX:20, initPcY:70, floatFrequency:.004, floatAmplitude:1, floatAngle:0,initScale:.4 , color:'#95b6e4' })
cloud04.make()

let cloud05 = new floatingObj( require("../../assets/images/cloud_05.svg"), 'cloud05', 'intro',{ depth:1, initPcX:60, initPcY:70, floatFrequency:.007, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#d7ecf6' })
cloud05.make()

let cloud06 = new floatingObj( require("../../assets/images/cloud_06.svg"), 'cloud06', 'intro',{ depth:1, initPcX:30, initPcY:70, floatFrequency:.008, floatAmplitude:.5, floatAngle:0,initScale:.3 , color:'#f4f5fb' })
cloud06.make()




//On Resize
let id;
$(window).resize(()=>{
    clearTimeout(id);
    id = setTimeout(()=>{
      pixiWidth = window.innerWidth
      pixiHeight = window.innerHeight
      refreshContainers();
      //cloud1.updatePosition()
      //cloud2.updatePosition()
    }, 200);
});

//On Load


////////////////////////////////////////////////////////// MAIN EVENTS

window.setInterval(function(){
  repositionAll()
}, calcFrameRate);


function makeAll(){
  for(var i=0, l = elements.length; i<l; i++){
    var el = elements[i];
    el.make();
  }
}
function repositionAll(){
  for(var i=0, l = elements.length; i<l; i++){
    var el = elements[i];
    el.updatePosition();
  }
}
