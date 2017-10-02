import React, {Component} from "react";
import {Link} from "react-router-dom";


export default class HomeSection extends Component{

  constructor(props){
    super(props);
  }

  render(){
    //Images
    const Svg_Scene_Cloud01 = require(`__assetDir/images/cloud_scene_01.svg`);
    const Svg_Scene_Cloud02 = require(`__assetDir/images/cloud_scene_02.svg`);
    const Svg_Scene_Cloud03 = require(`__assetDir/images/cloud_scene_03.svg`);
    const Svg_Scene_Water01 = require(`__assetDir/images/water_scene_01.svg`);
    const Svg_Sprite_Whale01 = require(`__assetDir/images/whale_01.svg`);
    const Svg_Sprite_Boat01 = require(`__assetDir/images/boat_01.svg`);
    const Svg_Scene_Bubbles01 = require(`__assetDir/images/bubbles_01.svg`);
    const Svg_Scene_Bubbles02 = require(`__assetDir/images/bubbles_02.svg`);
    const Svg_Scene_Bubbles03 = require(`__assetDir/images/bubbles_03.svg`);

    return(
      <section class="section-container main-container purpleLight" id="home" data-init-proportion="4" style={{backgroundColor:'#674565'}}>
        <div class="copy-box sm-w-90 sm-t-4 sm-l-5 md-w-70 md-l-15 md-t-4 lg-w-50 lg-l-25 lg-t-4">
          <h1>I design and develop...</h1>
          <p>Hi there! My name is Glenn, and as you can see above I design and Hi there! My name is Glenn, and as you can see abodesign and dend  test, and deploy, but mostly, I like to create things.</p>
          <p>I’m open for adventure, and Fishing for Friendships!</p>
        </div>
        <div class="down-btn sm-z-50 sm-l-50 sm-t-9 md-t-16 lg-t-12">
          <div class="down-btn-cirle down-btn-inner-1"></div>
          <div class="down-btn-cirle down-btn-inner-2"></div>
          <div class="down-btn-cirle down-btn-inner-3"></div>
        </div>
        {/* Bg Diagonal */}
        <div class="floating-element html-element sm-w-110 sm-h-20" data-mouse-depth="0" data-color="#343d5b" data-x="46|49|49" data-y="15|22|22" data-z="10" data-r="3" data-float-frequency="" data-float-amplitude=""> </div>
        {/* Clouds */}
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#09aadb" data-x="50|53|50" data-y="19|19|19" data-z="20" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="67">
          <Svg_Scene_Cloud01 style={{fill:'#09aadb'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#1185bf" data-x="50|50|50" data-y="19|19|19" data-z="15" data-mouse-depth="2" data-pStart="20" data-pEnd="100" data-pEndY="53" data-m-suppress="1">
          <Svg_Scene_Cloud02 style={{fill:'#1185bf'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#2a4b70" data-x="50|50|50" data-y="22|22|22" data-z="14" data-mouse-depth="4" data-pStart="20" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud03 style={{fill:'#2a4b70'}}/>
        </div>
        <div class="floating-element html-element animation-container sm-w-100 sm-h-30" data-y="30|22|30" data-x="50|50|50" data-z="30" data-pStart="20" data-pEnd="100" data-pEndY="100">
          {/* Water */}
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-105" data-z="3" data-color="#2a4b70" data-x="49|49|49" data-y="42|65|42">
            <Svg_Scene_Water01 style={{fill:'#2a4b70'}}/>
          </div>
          {/* Whale */}
          <div class="floating-element svg-element sm-w-110 md-w-60 lg-w-50" data-name="test" data-x="100|80|80" data-y="50|70|50" data-z="2" data-r="20" data-pStart="20" data-pEnd="55" data-pEndX="-40" data-pEndR="-20" data-yArcAmplitude="17">
            <Svg_Sprite_Whale01 />
          </div>
          {/* Boat */}
          <div class="floating-element svg-element sm-w-60 md-w-35 lg-w-25" data-x="27|27|27" data-y="17|13|47|46|44|42|41|39|37|20|17|13" data-z="1" data-r="1" data-pStart="47" data-pEnd="80" data-pEndY="30" data-pEndR="50">
            <Svg_Sprite_Boat01 />
          </div>
        </div>
        {/* Bubbles */}
        <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-90" data-x="48" data-y="70|65|55">
          <Svg_Scene_Bubbles01 style={{fill:'#2bc5f4'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-90" data-x="50" data-y="70|65|55" data-z="23" data-pStart="40" data-pEnd="100" data-pEndY="20">
          <Svg_Scene_Bubbles02 style={{fill:'#a1e4f8'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-80" data-x="49" data-y="70|65|55" data-z="24" data-pStart="40" data-pEnd="100" data-pEndY="30">
          <Svg_Scene_Bubbles03 style={{fill:'#4fcff6'}}/>
        </div>
        {/* Background */}
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#13b4e5" data-x="55|52|50" data-y="70|65|62" data-z="20" data-r="-5"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#1dbced" data-x="50" data-y="80|80|80" data-z="21" data-r="-2"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#28c6f6" data-x="50" data-y="90|90|85" data-z="23" data-r="0"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#40d2fe" data-x="50" data-y="100|100|95" data-z="24" data-r="2"> </div>
      </section>
    )
  }
}
