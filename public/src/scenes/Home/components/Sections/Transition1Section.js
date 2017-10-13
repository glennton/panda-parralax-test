import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Transition1Section extends Component{
  constructor(props){
    super(props);
  }

  render(){
    //images
    const Svg_Sprite_Whale02 = require(`__assetDir/images/whale_02.svg`);
    const Svg_Sprite_Pot01 = require(`__assetDir/images/pot_01.svg`);

    return(
      <section class="section-container" id="transition1" data-init-proportion="3" style={{backgroundColor:'#61c1ce'}}>
        {/* Bg Diagonal */}
        <div class="floating-element svg-element sm-w-30 md-w-30 lg-w-30" data-x="50|50|50" data-y="20|20|20" data-z="15" data-pStart="1" data-pEnd="80" data-pEndY="45">
          <Svg_Sprite_Whale02 />
        </div>
        <div class="floating-element svg-element sm-w-1 md-w-1 lg-w-1" data-x="75|75|75" data-y="20|20|20" data-z="15" data-pStart="1" data-pEnd="80" data-pEndY="45">
          <Svg_Sprite_Pot01 />
        </div>
        <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#40ddfc" data-x="48" data-y="5|5|10" data-z="8" data-r="3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#4ce7f8" data-x="48" data-y="4|8|25" data-z="9" data-r="-1"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#8fe4c8" data-x="48" data-y="10|12|35" data-z="12" data-r="1"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#a6e2ab" data-x="48" data-y="55|55|45" data-z="8" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#e0dd4f" data-x="48" data-y="78|78|65" data-z="9" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#fed900" data-x="48" data-y="80|80|80" data-z="9" data-r="-1"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#feca00" data-x="48" data-y="80|80|95" data-z="9" data-r="-1"> </div>
      </section>
    )
  }
}
