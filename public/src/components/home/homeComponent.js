
let sectionContainers = Array.from(document.getElementsByClassName('section-container'))
let mainContainers = Array.from(document.getElementsByClassName('main-container'))
let containers = []
let stage = {'height': 0, 'y1Pos': 0}
class containerObj {
  constructor() {
    this.element;
    this.height = 0;
    this.y1Pos = 0;
    this.y2Pos = 0;
    this.dTop = 0;
    this.dBot = 0;
  }
}
//Push Container to Array
sectionContainers.map((e, i)=>{
  containers.push( {'element':e,'height':'','y1Pos':0,'y2Pos':0,'dTop':0, 'dBot':0})
})

let _checkParentIndex = (element)=>{
  let obj
  containers.map((e, i)=>{
    if(e.element == document.getElementById(element)){
      obj = i
    }
  })
  return obj
}

let _setY1Pos = (index)=>{
  for (var j = 0; j < index; j++) {
    containers[index]['y1Pos'] = containers[index]['y1Pos'] + containers[j]['height']
  }
}
let _setY2Pos = (index)=>{
  containers[index]['y2Pos'] = containers[index]['y1Pos'] + containers[index]['height']
}
let _setHeight = (index)=>{
  containers[index]['height'] = containers[index]['element'].clientHeight
}

let refreshContainers = ()=>{
  containers.map((e, i)=>{
    _setHeight(i) //set height
    _setY1Pos(i) //set y1Pos
    _setY2Pos(i) //set y2Pos
  })
}
let refreshStage = ()=>{
  stage.height = window.innerHeight
  stage.y1Pos = window.scrollY
}
let refreshWindow = ()=>{
  containers.map((i,e)=>{
    _setHeight(i) //set height
    _setY1Pos(i) //set y1Pos
    _setY2Pos(i) //set y2Pos
  })
}

let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      refreshContainers()
      refreshStage()
      ticking = false;
    });
  }
  ticking = true;
});














////////////////////////////////////////////////////////// VARS

//https://codepen.io/Yakudoo/
let pixiWidth = window.innerWidth;
let pixiHeight = window.innerHeight;

let mousePos = {x:window.innerWidth/2, y:window.innerHeight/2};
let mouseParent = containers[0]['element'];

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
////////////////////////////////////////////////////////// EVENTS

containers.map((e,i)=>{
  //Set Mouse Pos
  e.element.addEventListener("mousemove", (event)=>{
    onMouseMove(event, e.height, e)
  });
  //Set Active Stage
  e.element.addEventListener("mouseenter", (event)=>{
    onMouseEnter(event, e.element)
  });
})

////////////////////////////////////////////////////////// FUNCTIONS

function onMouseMove(event, height, e) {
  var tx = -1 + (event.clientX / pixiWidth)*2;
  var ty = 1 - (event.clientY / height)*2;
  mousePos = {x:tx, y:ty};
  globalScale = .8 + (event.clientX / pixiWidth)*.4;
  repulsion = .95 + (event.clientX / pixiHeight)*.05;
}
function onMouseEnter(event, element) {
  mouseParent = element;
}
function loadSprites (arrayName){
  cloudArray.map((e, i)=>{
    loader.add(e)
  })
}

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




let elements = []
let loader = PIXI.loader;

loader.once('complete', onAssetsLoaded);
loadSprites()
loader.load(cloudArray);

class floatingObj {
  constructor(url, stage, parent, params) {
    this.params = params || {};
    this.stage = stage;
    this.parentIndex = _checkParentIndex(parent);
    this.url = url;
    ({
      initPcX : this.initPcX = 0,
      initPcY : this.initPcY = 0,
      initDispX : this.initDispX = 0,
      initDispY : this.initDispY = 0,
      depth : this.depth = 0,
      initScale : this.initScale = 1,
      floatFrequency : this.floatFrequency = 0,
      floatAmplitude : this.floatAmplitude = 0,
      floatAngle : this.floatAngle = 0,
      tint : this.tint = "0xFFFFFF"
    } = params)
  }
  // Make sprite and add to stage
  make(){
    this.sprite = PIXI.Sprite.fromImage(this.url);
    this.stage.addChild(this.sprite)
    elements.push(this)
  }
  updatePosition(){
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
    this.sprite.scale.x = tsx;
    this.sprite.scale.y = tsy;
    //console.log(tx, mousePos.x)
    this.sprite.x = tx;
    this.sprite.y = ty;
    console.log(tsx, tsy)
    this.sprite.tint = this.tint;
  }
}



//introRenderer
let introRenderer = PIXI.autoDetectRenderer(0, 0, {
    antialiasing:true,
    transparent:true,
    resolution: window.devicePixelRatio
});
let introSection = document.getElementById("intro");
introSection.appendChild(introRenderer.view)
let introStage = new PIXI.Container();

function onAssetsLoaded () {
  let cloud1 = new floatingObj( require("../../assets/images/cloud_01.png"), introStage, 'intro',{ depth:5, initPcX:0, initPcY:.5, floatFrequency:.04, floatAmplitude:5, floatAngle:0,initScale:1.5 , tint:'0x0280BE' })
  cloud1.make()
  let cloud2 = new floatingObj( require("../../assets/images/cloud_02.png"), introStage, 'intro',{ depth:2, initPcX:0, initPcY:.5, floatFrequency:.02, floatAmplitude:10, floatAngle:0,initScale:1, tint:''  })
  cloud2.make()
  let cloud3 = new floatingObj( require("../../assets/images/cloud_02.png"), introStage, 'intro',{ depth:2, initPcX:0, initPcY:.5, floatFrequency:.02, floatAmplitude:10, floatAngle:0,initScale:1 , tint:'' })
  cloud3.make()
  let cloud4 = new floatingObj( require("../../assets/images/cloud_02.png"), introStage, 'intro',{ depth:2, initPcX:0, initPcY:.5, floatFrequency:.02, floatAmplitude:10, floatAngle:0,initScale:1 , tint:'' })
  cloud4.make()
  let cloud5 = new floatingObj( require("../../assets/images/cloud_02.png"), introStage, 'intro',{ depth:2, initPcX:0, initPcY:.5, floatFrequency:.02, floatAmplitude:10, floatAngle:0,initScale:1 , tint:'' })
  cloud5.make()
  startAnimating(10)
}



//workRenderer
let workRenderer = PIXI.autoDetectRenderer(0, 0, {
    antialiasing:true,
    transparent:true,
    resolution: window.devicePixelRatio
});
let workSection = document.getElementById("work");
workSection.appendChild(workRenderer.view)

//Refresh Canvases
function refreshCanvases() {
  introRenderer.resize(pixiWidth, pixiHeight);
  workRenderer.resize(pixiWidth, workSection.clientHeight);
}

//On Resize
let id;
$(window).resize(()=>{
    clearTimeout(id);
    id = setTimeout(()=>{
      pixiWidth = window.innerWidth
      pixiHeight = window.innerHeight
      refreshCanvases();
      refreshContainers();
      cloud1.updatePosition()
      cloud2.updatePosition()
    }, 200);
});

//On Load
refreshCanvases();
refreshContainers();





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





////////////////////////////////////////////////////////// ANIMATION

//http://jsfiddle.net/user/m1erickson/fiddles/
var stop = false;
var frameCount = 0;
var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;


function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}


function animate() {

    // request another frame
    requestAnimationFrame(animate);
    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);
        repositionAll();
        introRenderer.render(introStage);
    }
}
