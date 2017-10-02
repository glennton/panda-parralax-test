import React, {Component} from "react";
import Parallax from './components/Parallax/Parallax.js';
import Navigation from './components/Navigation/Navigation.js';
import Overlay from './components/Overlay/Overlay.js';

import HomeSection from './components/Sections/HomeSection.js';
import Transition1Section from './components/Sections/Transition1Section.js';
import WorkSection from './components/Sections/WorkSection.js';
import Transition2Section from './components/Sections/Transition2Section.js';
import SkillsSection from './components/Sections/SkillsSection.js';
import Transition3Section from './components/Sections/Transition3Section.js';
import ContactSection from './components/Sections/ContactSection.js';

import styles from './home.scss';

export default class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: {
        target: '',
        isActive: false
      },
      imgDir: '../../../../assets/images/'
    }
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
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
        <Overlay modal={this.state.modal} closeModal={this.closeModal} imgDir={this.state.imgDir}/>
        <Navigation />

        <HomeSection imgDir={this.state.imgDir} />
        <Transition1Section imgDir={this.state.imgDir} />
        <WorkSection imgDir={this.state.imgDir} closeModal={this.closeModal} openModal={this.openModal}/>
        <Transition2Section imgDir={this.state.imgDir} />
        <SkillsSection imgDir={this.state.imgDir} />
        <Transition3Section imgDir={this.state.imgDir} />
        <ContactSection imgDir={this.state.imgDir} />
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
        scrollSpeed: 500
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
