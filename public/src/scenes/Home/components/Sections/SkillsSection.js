import React, {Component} from "react";
import ReactSVG from 'react-svg';
import {Link} from "react-router-dom";

export default class SkillsSection extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {imgDir} = this.props;
    return(
      <section class="section-container main-container" id="skills" data-init-proportion="1.5" style={{backgroundColor:'#aae3e8'}}>
        <div class="main-content">
          <div class="grid-container">
            <div class="grid-x grid-margin-x align-center">
                <div class="cell medium-5">
                <div class="obj-container obj-container-dev-icons">
                  <object class="header-coffee" data="./assets/images/icon_coffee.svg"></object>
                </div>
                <p>
                  <span class="title">Design</span>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <p>
                  <span class="title">SKILLSET</span>
                  <br />
                    Photoshop CC, Illustrator CC.
                </p>
                <div class="obj-container obj-container-skill-icons">
                  <object class="header-cc" data="./assets/images/logo_cc.svg"></object>
                </div>
              </div>
              {/*Develop*/}
              <div class="cell medium-5">
                <div class="obj-container obj-container-dev-icons">
                  <object class="header-beer" data="./assets/images/icon_beer.svg"></object>
                </div>
                <p>
                  <span class="title">Develop</span>
                  <br />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                </p>
                <p>
                  <span class="title">SKILLSET</span>
                  <br />
                  Node JS, MongoDB, Angular, ExpressJS, Sass, Gulp, Grunt, Apache, Redhat / Linux, Amazon Web Services.
                </p>
                <div class="grid-x grid-margin-x">

                  <div class="cell medium-4 text-center">
                    <div class="obj-container obj-container-skill-icons">
                      <object class="header-mongo" data="./assets/images/logo_mongo.svg"></object>
                    </div>
                  </div>
                  <div class="cell medium-4 text-center">
                    <div class="obj-container obj-container-skill-icons">
                      <object class="header-node" data="./assets/images/logo_node.svg"></object>
                    </div>
                  </div>
                  <div class="cell medium-4 text-center">
                    <div class="obj-container obj-container-skill-icons">
                      <object class="header-angular" data="./assets/images/logo_angular.svg"></object>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|62" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="70">
          <ReactSVG path={`${imgDir}water_scene_02.svg`} style={{fill:'#2fa7c5'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|50" data-z="14" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="60">
          <ReactSVG path={`${imgDir}water_scene_03.svg`} style={{fill:'#ffffff'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|62" data-z="13" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="30">
          <ReactSVG path={`${imgDir}water_scene_04.svg`} style={{fill:'#40b5ce'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|67" data-z="12" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="20">
          <ReactSVG path={`${imgDir}water_scene_05.svg`} style={{fill:'#7bc9d5'}}/>
        </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#97d7de" data-x="48" data-y="40|20|50" data-z="10" data-r="-3"> </div>
      </section>
    )
  }
}
