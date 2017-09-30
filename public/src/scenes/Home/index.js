import React, {Component} from "react";
import Parallax from './components/Parallax/Parallax.js';
import Navigation from './components/Navigation/Navigation.js';
import Overlay from './components/Overlay/Overlay.js';
import {Link} from "react-router-dom";
import styles from './home.scss';


export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: {
        target: '',
        isActive: false
      }
    }
    this.closeModal = this.closeModal.bind(this)
  }
  openModal(target){
    console.log(target , this.state)
    this.setState({
      modal:{
        target : target,
        isActive: true
      }
    })
  }
  closeModal(){
    this.setState({
      modal:{
        target : '',
        isActive: false
      }
    })
  }
  render(){
    return(
      <div>
        <Overlay modal={this.state.modal} closeModal={this.closeModal}/>
        <Navigation />
        <section class="section-container main-container purpleLight" id="intro" data-init-proportion="4" style={{backgroundColor:'#674565'}}>
          <div class="copy-box sm-w-90 sm-t-4 sm-l-5 md-w-70 md-l-15 md-t-4 lg-w-50 lg-l-25 lg-t-4">
            <h1>I design and develop...</h1>
            <p>Hi there! My name is Glenn, and as you can see above I design and Hi there! My name is Glenn, and as you can see abodesign and dend  test, and deploy, but mostly, I like to create things.</p>
            <p>I’m open for adventure, and Fishing for Friendships!</p>
            <Link to="Bebe">Test</Link>
          </div>
          <div class="down-btn sm-z-50 sm-l-50 sm-t-9 md-t-16 lg-t-12">
            <div class="down-btn-cirle down-btn-inner-1"></div>
            <div class="down-btn-cirle down-btn-inner-2"></div>
            <div class="down-btn-cirle down-btn-inner-3"></div>
          </div>
          {/* Bg Diagonal */}
          <div class="floating-element html-element sm-w-110 sm-h-20" data-mouse-depth="0" data-color="#343d5b" data-x="46|49|49" data-y="15|22|22" data-z="10" data-r="3" data-float-frequency="" data-float-amplitude=""> </div>
          {/* Clouds */}
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="cloud_scene_01.svg" data-color="#09aadb" data-x="50|53|50" data-y="19|19|19" data-z="20" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="67"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="cloud_scene_02.svg" data-color="#1185bf" data-x="50|50|50" data-y="19|19|19" data-z="15" data-mouse-depth="2" data-pStart="20" data-pEnd="100" data-pEndY="53" data-m-suppress="1"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="cloud_scene_03.svg" data-color="#2a4b70" data-x="50|50|50" data-y="22|22|22" data-z="14" data-mouse-depth="4" data-pStart="20" data-pEnd="100" data-pEndY="25"> </div>
          <div class="floating-element html-element animation-container sm-w-100 sm-h-30" data-y="30|22|30" data-x="50|50|50" data-z="30" data-pStart="20" data-pEnd="100" data-pEndY="100">
            {/* Water */}
            <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-105" data-img="water_scene_01.svg" data-z="3" data-color="#2a4b70" data-x="49|49|49" data-y="42|65|42"> </div>
            {/* Whale */}
            <div class="floating-element svg-element sm-w-110 md-w-60 lg-w-50" data-name="test" data-img="whale_01.svg" data-x="100|80|80" data-y="50|70|50" data-z="2" data-r="20" data-pStart="20" data-pEnd="55" data-pEndX="-40" data-pEndR="-20" data-yArcAmplitude="17"> </div>
            {/* Boat */}
            <div class="floating-element svg-element sm-w-60 md-w-35 lg-w-25" data-img="boat_01.svg" data-x="27|27|27" data-y="17|13|47|46|44|42|41|39|37|20|17|13" data-z="1" data-r="1" data-pStart="47" data-pEnd="80" data-pEndY="30" data-pEndR="50"> </div>
          </div>
          {/* Bubbles */}
          <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-90" data-img="bubbles_01.svg" data-color="#2bc5f4" data-x="48" data-y="70|65|55"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-90" data-img="bubbles_02.svg" data-color="#a1e4f8" data-x="50" data-y="70|65|55" data-z="23" data-pStart="40" data-pEnd="100" data-pEndY="20"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-200 lg-w-80" data-img="bubbles_03.svg" data-color="#4fcff6" data-x="49" data-y="70|65|55" data-z="24" data-pStart="40" data-pEnd="100" data-pEndY="30"> </div>
          {/* Background */}
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#13b4e5" data-x="55|52|50" data-y="70|65|62" data-z="20" data-r="-5"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#1dbced" data-x="50" data-y="80|80|80" data-z="21" data-r="-2"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#28c6f6" data-x="50" data-y="90|90|85" data-z="23" data-r="0"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#40d2fe" data-x="50" data-y="100|100|95" data-z="24" data-r="2"> </div>
        </section>
        <section class="section-container" id="transition1" data-init-proportion="3" style={{backgroundColor:'#61c1ce'}}>
          {/* Bg Diagonal */}
          <div class="floating-element svg-element sm-w-30 md-w-30 lg-w-30" data-img="whale_02.svg" data-x="50|50|50" data-y="20|20|20" data-z="15" data-pStart="1" data-pEnd="80" data-pEndY="45"> </div>
          <div class="floating-element svg-element sm-w-1 md-w-1 lg-w-1" data-img="pot_01.svg" data-x="75|75|75" data-y="20|20|20" data-z="15" data-pStart="1" data-pEnd="80" data-pEndY="45"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#40ddfc" data-x="48" data-y="5|5|10" data-z="8" data-r="3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#4ce7f8" data-x="48" data-y="4|8|25" data-z="9" data-r="-1"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-25" data-color="#8fe4c8" data-x="48" data-y="10|12|35" data-z="12" data-r="1"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#a6e2ab" data-x="48" data-y="55|55|45" data-z="8" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#e0dd4f" data-x="48" data-y="78|78|65" data-z="9" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#fed900" data-x="48" data-y="80|80|80" data-z="9" data-r="-1"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#feca00" data-x="48" data-y="80|80|95" data-z="9" data-r="-1"> </div>
        </section>
        <section class="section-container main-container" id="work" data-init-proportion="1.5" style={{backgroundColor:'#fcbe11'}}>
          <div class="main-content">
            <div class="grid-container">
              <div class="grid-x grid-margin-x">
                <div class="cell medium-4">
                  <div class="obj-container obj-container-brand-logos">
                    <object class="logo_tokidoki" data="./assets/images/logo_tokidoki.svg"></object>
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
                  <a class="more-button" onClick={()=>this.openModal('tokidoki')}> <span>+</span></a>
                </div>
                <div class="cell medium-4">
                  <div class="obj-container obj-container-brand-logos">
                    <object class="logo_bebe" data="./assets/images/logo_bebe.svg"></object>
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
                  <a class="more-button modal-trigger" data-modal-trigger="bebe"> <span>+</span></a>
                </div>
                <div class="cell medium-4">
                  <div class="obj-container obj-container-brand-logos">
                    <object class="logo_tb" data="./assets/images/logo_tb.svg"></object>
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
                  <a class="more-button modal-trigger" data-modal-trigger="tb"> <span>+</span></a>
                </div>
              </div>
            </div>
          </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="cloud_scene_04.svg" data-color="#f78721" data-x="50" data-y="15|15|45" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="25"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#fca411" data-img="cloud_scene_05.svg" data-x="50" data-y="15|15|47" data-z="10" data-mouse-depth="2" data-pStart="20" data-pEnd="100" data-pEndY="25"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-30" data-color="#fcb411" data-x="48" data-y="40|20|20" data-z="5" data-r="-3" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-30" data-color="#f99619" data-x="48" data-y="40|20|100" data-z="14" data-r="3" data-pStart="1" data-pEnd="100" data-pEndY="20"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-60" data-color="#fca411" data-x="48" data-y="40|20|90" data-z="10"> </div>
        </section>
        <section class="section-container" id="transition2" data-init-proportion="5" style={{backgroundColor:'#bed9b5'}}>
          {/* Static */}
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#fcb411" data-x="48" data-y="40|20|0" data-z="5" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#ebbe3c" data-x="48" data-y="40|20|20" data-z="5" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#d9c86d" data-x="48" data-y="40|20|40" data-z="5" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#c9d297" data-x="48" data-y="40|20|60" data-z="5" data-r="-3"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#b0e0d8" data-x="48" data-y="40|20|95" data-z="10" data-r="-3"> </div>
          {/* Clouds */}
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#7eead9" data-img="cloud_scene_06.svg" data-x="50" data-y="15|15|15" data-z="10" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="25"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#bdf3f4" data-img="cloud_scene_07.svg" data-x="50" data-y="15|15|30" data-z="21" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="40"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-color="#65bece" data-img="cloud_scene_08.svg" data-x="50" data-y="15|15|35" data-z="10" data-mouse-depth="2" data-pStart="0" data-pEnd="100" data-pEndY="60"> </div>
          {/* Whale */}
          <div class="floating-element svg-element sm-w-30 md-w-30 lg-w-30" data-img="whale_02.svg" data-x="50|50|50" data-y="20|20|-10" data-z="15" data-pStart="20" data-pEnd="100" data-pEndY="200"> </div>
        </section>
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
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="water_scene_02.svg" data-color="#2fa7c5" data-x="50" data-y="15|15|62" data-z="15" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="70"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="water_scene_03.svg" data-color="#ffffff" data-x="50" data-y="15|15|50" data-z="14" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="60"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="water_scene_04.svg" data-color="#40b5ce" data-x="50" data-y="15|15|62" data-z="13" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="30"> </div>
          <div class="floating-element svg-element sm-w-300 md-w-150 lg-w-104" data-img="water_scene_05.svg" data-color="#7bc9d5" data-x="50" data-y="15|15|67" data-z="12" data-mouse-depth="1" data-pStart="20" data-pEnd="100" data-pEndY="20"> </div>
          <div class="floating-element html-element sm-w-110 sm-h-20" data-color="#97d7de" data-x="48" data-y="40|20|50" data-z="10" data-r="-3"> </div>
        </section>
        <section class="section-container" id="transition3">
        </section>
      </div>
    )
  }

  componentDidMount(){
    ///////////////////////////////////////////////////////////////////////
    //                             FALLBACKS
    ///////////////////////////////////////////////////////////////////////

    //REQUEST ANIMATION FRAME FALLBACK
    const myRequestAnimationFrame =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function(callback) {
          window.setTimeout(callback, 50);
       };
    window.requestAnimationFrame = myRequestAnimationFrame;

    //INIT PARALLAX
    Parallax.init({
      stage: {
        fps: 30,
        scrollSpeed: 1000
      },
      sectionContainers: Array.from(document.getElementsByClassName('section-container')),
      floatElements: Array.from(document.getElementsByClassName('floating-element'))
    });
    //Parallax.debug()
    ///////////////////////////////////////////////////////////////////////
    //                            TRIGGERS
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    //                              EVENTS
    ///////////////////////////////////////////////////////////////////////

    //ON MOUSE MOVE
    if(!Parallax.stage.isMobile){
      window.addEventListener("mousemove",Parallax.calcMouse, true);
    }

    //ON WINDOW SCROLL
    window.addEventListener('scroll', ()=>{Parallax.stage.updateActiveContainers()}, true);

    //Init Active stage **INVESTIGATE
    Parallax.stage.containers.map((e,i)=>{
      //Set Active Stage when mouse enters container
      e.element.addEventListener("mouseenter", Parallax.onMouseEnter(e), true);
    })

    window.addEventListener("resize", Parallax.refreshCalcs, true);

    //window.addEventListener("click", Parallax.scrollTo, true);

    // //DEBUGGING
    // function performanceTest(options){
    //   const check = options.testIncrementer < options.testCount;
    //   if(check){
    //     testFPS = 0
    //     $(window).scrollTop(0);
    //     options.testIncrementer++;
    //     $('html, body').stop().animate({
    //         scrollTop: options.target.offset().top
    //     }, options.testDuration).promise().then(()=>{
    //       options.results.push(testFPS/options.testDuration * 1000);
    //       console.log(testFPS/options.testDuration * 1000)
    //       performanceTest(options)
    //     });
    //   }else{
    //     let resultAverage = 0;
    //     options.results.map((e,i)=>{
    //       resultAverage = resultAverage+e;
    //     })
    //     resultAverage = resultAverage / options.testCount
    //     console.log(`Data Set: ${options.results}`,`Average: ${resultAverage}`)
    //   }
    // }
    // $(document).ready(()=>{
    //   $(document).on('click','#testFPS',(event)=>{
    //     event.preventDefault();
    //     performanceTest({
    //       target: $('#work'),
    //       testDuration:1000,
    //       testCount: 10,
    //       testIncrementer: 0,
    //       results:[]
    //     });
    //   })
    // })
  }
}
