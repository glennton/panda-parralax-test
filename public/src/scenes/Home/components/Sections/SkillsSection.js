import React, {Component} from "react";
import {Link} from "react-router-dom";

export default class SkillsSection extends Component{

  constructor(props){
    super(props);
  }

  render(){
    //Images
    const Svg_Sprite_Coffee = require(`__assetDir/images/icon_coffee.svg`);
    const Svg_Sprite_Beer = require(`__assetDir/images/icon_beer.svg`);

    const Svg_Logo_CC = require(`__assetDir/images/logo_cc.svg`);
    const Svg_Logo_Mongo = require(`__assetDir/images/logo_mongo.svg`);
    const Svg_Logo_Node = require(`__assetDir/images/logo_node.svg`);
    const Svg_Logo_Angular = require(`__assetDir/images/logo_angular.svg`);

    const Svg_Scene_Water02 = require(`__assetDir/images/water_scene_02.svg`);
    const Svg_Scene_Water03 = require(`__assetDir/images/water_scene_03.svg`);
    const Svg_Scene_Water04 = require(`__assetDir/images/water_scene_04.svg`);
    const Svg_Scene_Water05 = require(`__assetDir/images/water_scene_05.svg`);

    return(
      <section class="section-container main-container" id="skills" data-init-proportion="1.5" style={{backgroundColor:'#aae3e8'}}>
        <div class="main-content">
          <div class="grid-container">
            <div class="grid-x grid-margin-x align-center">
                <div class="cell medium-5">
                <div class="obj-container obj-container-dev-icons">
                  <Svg_Sprite_Coffee className={`header-coffee`} />
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
                  <Svg_Logo_CC className={`header-cc`} />
                </div>
              </div>
              {/*Develop*/}
              <div class="cell medium-5">
                <div class="obj-container obj-container-dev-icons">
                  <Svg_Sprite_Beer className={`header-beer`} />
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
                      <Svg_Logo_Mongo className={`header-mongo`} />
                    </div>
                  </div>
                  <div class="cell medium-4 text-center">
                    <div class="obj-container obj-container-skill-icons">
                      <Svg_Logo_Node className={`header-node`} />
                    </div>
                  </div>
                  <div class="cell medium-4 text-center">
                    <div class="obj-container obj-container-skill-icons">
                      <Svg_Logo_Angular className={`header-angular`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|62" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="70">
          <Svg_Scene_Water02 style={{fill:'#2fa7c5'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|50" data-z="14" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="60">
          <Svg_Scene_Water03 style={{fill:'#ffffff'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|62" data-z="13" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="30">
          <Svg_Scene_Water04 style={{fill:'#40b5ce'}}/>
        </div>
        <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-x="50" data-y="15|15|67" data-z="12" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="20">
          <Svg_Scene_Water05 style={{fill:'#7bc9d5'}}/>
        </div>
        <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#97d7de" data-x="48" data-y="40|20|50" data-z="10" data-r="-3"> </div>
      </section>
    )
  }
}
