import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class Transition2Section extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const Svg_Scene_Cloud06 = require(`__assetDir/images/cloud_scene_06.svg`);
    const Svg_Scene_Cloud07 = require(`__assetDir/images/cloud_scene_07.svg`);
    const Svg_Scene_Cloud08 = require(`__assetDir/images/cloud_scene_08.svg`);
    const Svg_Sprite_Whale02 = require(`__assetDir/images/whale_02.svg`);
    return(
      <section class="section-container" id="transition2" data-init-proportion="5" style={{backgroundColor:'#bed9b5'}}>
        {/* Static */}
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#fcb411" data-x="48" data-y="40|20|0" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#ebbe3c" data-x="48" data-y="40|20|20" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#d9c86d" data-x="48" data-y="40|20|40" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#c9d297" data-x="48" data-y="40|20|60" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#b0e0d8" data-x="48" data-y="40|20|95" data-z="10" data-r="-3"> </div>
        {/* Clouds */}
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|15" data-z="10" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud06 style={{fill:'#7eead9'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|30" data-z="21" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="40">
          <Svg_Scene_Cloud07 style={{fill:'#bdf3f4'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|35" data-z="10" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="60">
          <Svg_Scene_Cloud08 style={{fill:'#65bece'}}/>
        </div>
        {/* Whale */}
        <div class="floating-element svg-element sm-w-30 md-w-30 lg-w-30" data-x="50|50|50" data-y="20|20|-10" data-z="15" data-pStart="20" data-pEnd="100" data-pEndY="200">
          <Svg_Sprite_Whale02 />
        </div>
      </section>
    )
  }
}
