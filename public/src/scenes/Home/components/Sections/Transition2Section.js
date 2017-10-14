import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Transition2Section extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const Svg_Scene_Cloud01 = require(`__assetDir/images/cloud_scene_01.svg`);
    const Svg_Scene_Cloud02 = require(`__assetDir/images/cloud_scene_02.svg`);
    const Svg_Scene_Cloud03 = require(`__assetDir/images/cloud_scene_03.svg`);
    const Svg_Scene_Cloud05 = require(`__assetDir/images/cloud_scene_05.svg`);
    const Svg_Scene_Cloud06 = require(`__assetDir/images/cloud_scene_06.svg`);
    const Svg_Scene_Cloud07 = require(`__assetDir/images/cloud_scene_07.svg`);
    const Svg_Scene_Cloud08 = require(`__assetDir/images/cloud_scene_08.svg`);
    const Svg_Sprite_Whale02 = require(`__assetDir/images/whale_02.svg`);
    return(
      <section class="section-container" id="transition2" data-init-proportion="5" style={{backgroundColor:'#c0cbcf'}}>
        {/* Static */}
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#ee9699" data-x="48" data-y="40|20|0" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#e59fa3" data-x="48" data-y="40|20|20" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#dcacb2" data-x="48" data-y="40|20|40" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#c9c0c5" data-x="48" data-y="40|20|60" data-z="5" data-r="-3"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#b3dadf" data-x="48" data-y="40|20|95" data-z="10" data-r="-3"> </div>
        {/* Clouds */}
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|12" data-z="10" data-pStart="0" data-pEnd="100" data-pEndY="50">
          <Svg_Scene_Cloud06 style={{fill:'#f6dee5'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|21" data-z="9" data-pStart="0" data-pEnd="100" data-pEndY="10">
          <Svg_Scene_Cloud05 style={{fill:'#dcacb2'}}/>
        </div>

        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|30" data-z="21" data-pStart="0" data-pEnd="100" data-pEndY="40">
          <Svg_Scene_Cloud07 style={{fill:'#dfeef5'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|40" data-z="9" data-pStart="0" data-pEnd="100" data-pEndY="10">
          <Svg_Scene_Cloud01 style={{fill:'#c9c0c5'}}/>
        </div>

        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|60" data-z="9" data-pStart="0" data-pEnd="100" data-pEndY="10">
          <Svg_Scene_Cloud01 style={{fill:'#c0cbcf'}}/>
        </div>

        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|35" data-z="10" data-pStart="0" data-pEnd="100" data-pEndY="60">
          <Svg_Scene_Cloud08 style={{fill:'#d8f1f6'}}/>
        </div>

        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50|50|50" data-y="22|22|106" data-z="11" data-mouse-depth="4">
          <Svg_Scene_Cloud03 style={{fill:'#aae3e8'}}/>
        </div>

        {/* Whale */}
        <div class="floating-element svg-element sm-w-30 md-w-30 lg-w-30" data-x="50|50|50" data-y="20|20|-10" data-z="15" data-pStart="20" data-pEnd="100" data-pEndY="200">
          <Svg_Sprite_Whale02 />
        </div>
      </section>
    )
  }
}
