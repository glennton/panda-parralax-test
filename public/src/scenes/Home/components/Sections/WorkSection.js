import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class WorkSection extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {openModal} = this.props;
    //Images
    const Svg_Scene_Cloud04 = require(`__assetDir/images/cloud_scene_04.svg`);
    const Svg_Scene_Cloud05 = require(`__assetDir/images/cloud_scene_05.svg`);
    const Svg_Logo_Tokidoki = require(`__assetDir/images/logo_tokidoki.svg`);
    const Svg_Logo_Bebe = require(`__assetDir/images/logo_bebe.svg`);
    const Svg_Logo_Tb = require(`__assetDir/images/logo_tb.svg`);

    return(
      <section class="section-container main-container" id="work" data-init-proportion="1.5" style={{backgroundColor:'#fcbe11'}}>
        <div class="main-content">
          <div class="grid-container">
            <div class="grid-x grid-margin-x">
              <div class="cell medium-4">
                <div class="obj-container obj-container-brand-logos">
                  <Svg_Logo_Tokidoki className={`logo_tokidoki`} />
                </div>
                <p>
                  <span class="title">Role</span> <br/>
                  Front-End Web Developer</p>
                <p>
                  <span class="title">Active</span> <br/>
                  February 2016 - August 2017</p>
                <p>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a class="more-button" onClick={()=>openModal('tokidoki')}> <span>+</span></a>
              </div>
              <div class="cell medium-4">
                <div class="obj-container obj-container-brand-logos">
                  <Svg_Logo_Bebe className={`logo_bebe`} />
                </div>
                <p>
                  <span class="title">Role</span> <br/>
                  Front-End Web Developer</p>
                <p>
                  <span class="title">Active</span> <br/>
                  February 2016 - August 2017</p>
                <p>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a class="more-button" onClick={()=>openModal('bebe')}> <span>+</span></a>
              </div>
              <div class="cell medium-4">
                <div class="obj-container obj-container-brand-logos">
                  <Svg_Logo_Tb className={`logo_tb`} />
                </div>
                <p>
                  <span class="title">Role</span> <br/>
                  Front-End Web Developer</p>
                <p>
                  <span class="title">Active</span> <br/>
                  February 2016 - August 2017</p>
                <p>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a class="more-button" onClick={()=>openModal('tb')}> <span>+</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|45" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud04 style={{fill:'#f78721'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|47" data-z="10" data-mouse-depth="2" data-pStart="20" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud05 style={{fill:'#fca411'}}/>
        </div>
        <div class="floating-element html-element sm-w-110 sm-h-30" data-color="#fcb411" data-x="48" data-y="40|20|20" data-z="5" data-r="-3" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-30" data-color="#f99619" data-x="48" data-y="40|20|100" data-z="14" data-r="3" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-60" data-color="#fca411" data-x="48" data-y="40|20|90" data-z="10"> </div>
      </section>
    )
  }
}
