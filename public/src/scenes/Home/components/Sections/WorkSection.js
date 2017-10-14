import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './workSection.scss';

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
      <section class="section-container main-container" id="work" data-init-proportion="1.5">
        <div class="main-content">
          <div class="grid-container">
            <div class="grid-x grid-margin-x">
              <div className={'cell medium-4 brand-container'}>
                <p className={'brand-title'}><span>01</span><br />tokidoki</p>
                <p>
                  <span class="title">Role</span> <br/>
                  Ecommerce Site Manager</p>
                <p>
                  <span class="title">Active</span> <br/>
                  February 2012 - July 2014</p>
                <p className={'about'}>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a className={'button button-black'} onClick={()=>openModal({target: 'tokidoki', section: 'work'})}> + see work</a>
              </div>
              <div className={'cell medium-4 brand-container'}>
              <p className={'brand-title'}><span>02</span><br />bebe stores</p>
                <p>
                  <span class="title">Role</span> <br/>
                  Front-End Web Developer</p>
                <p>
                  <span class="title">Active</span> <br/>
                  July 2014 - February 2016</p>
                <p className={'about'}>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a className={'button button-black'} onClick={()=>openModal({target: 'bebe', section: 'work'})}> + see work</a>
              </div>
              <div className={'cell medium-4 brand-container'}>
                <p className={'brand-title'}><span>03</span><br />tailored brands</p>
                <p>
                  <span class="title">Role</span> <br/>
                  Front-End Web Developer</p>
                <p>
                  <span class="title">Active</span> <br/>
                  February 2016 - <em>Present</em></p>
                <p className={'about'}>
                  <span class="title">About</span> <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <a className={'button button-black'} onClick={()=>openModal({target: 'tb', section: 'work'})}> + see work</a>
              </div>
            </div>
          </div>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|47" data-z="10" data-mouse-depth="2" data-pStart="20" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud05 style={{fill:'#fca790'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|45" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="25">
          <Svg_Scene_Cloud04 style={{fill:'#ee9699'}}/>
        </div>
        <div class="floating-element html-element sm-w-110 sm-h-60" data-color="#fcbc84" data-x="48" data-y="40|20|20" data-z="5" data-r="-4" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-60" data-color="#f8a193" data-x="48" data-y="40|20|90" data-z="10"> </div>
        <div class="floating-element html-element sm-w-110 sm-h-30" data-color="#ee9699" data-x="48" data-y="40|20|95" data-z="14" data-r="3" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
      </section>
    )
  }
}
