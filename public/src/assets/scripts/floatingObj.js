export class floatingObj {
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
  }
  // Refresh position per frame
  updatePosition(mousePos, fpsModifier){
    const element = document.getElementById(this.name);
    /////////MODIFIERS
    let floatY = 0;
    if (this.floatFrequency>0){
      floatY = Math.cos(this.floatAngle)*this.floatAmplitude*2;
      this.floatAngle += (this.floatFrequency * fpsModifier);
    }

    //SET ELEMENT
    //Set Scale
    element.style['width'] = 100 * this.initScale + '%';
    //Set Center
    element.style['margin-left'] = '-' + element.clientWidth / 2 + 'px';
    element.style['margin-top'] = '-' + element.clientHeight / 2 + 'px';

    element.style['left'] = this.initPcX + (mousePos.x * this.depth) + '%';
    element.style['top'] =  this.initPcY + floatY + (mousePos.y * this.depth) + '%';

  }
}
