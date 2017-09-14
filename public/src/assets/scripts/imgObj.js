import {floatObj} from '../../assets/scripts/floatObj.js';

export class imgObj extends floatObj {
  constructor(img, parent, options) {
    super(parent, options)
    this.img = img;
  }

  make(e, stage){
    //Place svg in parent
    let img = document.createElement('img');
    img.src = `${this.img}`
    e.appendChild(img)
    super.make(e, stage)
    if(this.color){
      $(e).find('path,circle').css(`fill`,`#${this.color }`)
    }
  }
}
