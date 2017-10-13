import React, {Component} from "react";
import ReactSVG from 'react-svg';
import styles from './overlay.scss';
import StupidCarousel from 'react-stupid-carousel';

export default class Overlay extends Component{
  constructor(props){
    super(props);
    this.state = {
      activeSlide: 0
    }
    this.carousels = [];
    this.carouselItemCount = 3;
  }

  nextSlide(){
    let target = this.state.activeSlide + 1;
    if(target >= this.carouselItemCount) target = this.carouselItemCount - target;
    this.carousels.map((e,i)=>{
      this.setState({activeSlide: target},()=>{
        e.goToSlide(target);
      })
    })
  }

  prevSlide(){
    let target = this.state.activeSlide - 1;
    if(target < 0) target = this.carouselItemCount - target - 2;
    this.carousels.map((e,i)=>{
      this.setState({activeSlide: target},()=>{
        e.goToSlide(target);
      })
    })
  }

  render(){
    const {imgDir, modal , closeModal} = this.props;
    return(
      <div className={`modal-container ${modal.section}-modal-container ${modal.isActive ? 'modal-active modal-container-show' : ''}`}>
        <div class="modal-animation-box modal-animation-box-1"></div>
        <div class="modal-animation-box modal-animation-box-2"></div>
        <div class="modal-animation-box modal-animation-box-3"></div>
        <div class="modal-animation-box modal-animation-box-4"></div>
        <div class="modal-content grid-x">
          <div class="modal-content-sidebar cell medium-4 medium-order-2">
            <a class="modal-close-button" onClick={()=>{closeModal()}}>
              <span>+</span>
            </a>
            <div class="sidebar-inner text-center grid-container">
              <div class="sidebar-separator"></div>
              <div class="grid-x logo-nav-container">
                <div class="cell small-3">
                  <a>
                    <div class="sidebar-arrow arrow-left" onClick={ ()=>{ this.prevSlide() } }></div>
                  </a>
                </div>
                <div class="cell small-6">
                  <div style={{width: '100%'}}>
                    <StupidCarousel carouselId="work-carousel-logos" carouselEasing={'ease'} carouselSpeed={700} slidePadding={100} ref={(instance)=>{this.carousels[0] = instance}}>
                      <ReactSVG className={`sidebar-logo`} path={`${imgDir}logo_tokidoki.svg`} />
                      <ReactSVG className={`sidebar-logo`} path={`${imgDir}logo_bebe.svg`} />
                      <ReactSVG className={`sidebar-logo`} path={`${imgDir}logo_tb.svg`} />
                    </StupidCarousel>
                  </div>
                </div>
                <div class="cell small-3">
                  <a>
                    <div class="sidebar-arrow arrow-right" onClick={ ()=>{ console.log('test'); this.nextSlide() } }></div>
                  </a>
                </div>
              </div>
              <div className={`sidebar-description`}>
                <div style={{width: '100%'}}>
                  <StupidCarousel carouselId="work-carousel-description" carouselEasing={'ease'} carouselSpeed={700} slidePadding={100} ref={(instance)=>{this.carousels[1] = instance}}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                  </StupidCarousel>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-content-main  cell medium-8 medium-order-1">
            <nav class="grid-container" id="work-modal-nav">
              <div class="grid-x grid-margin-x align-center">
                <div class="cell medium-2 medium-push-3"><a class="text-center" href="">
                  <object class="logo_tokidoki" data="./assets/images/logo_tokidoki.svg"></object></a>
                </div>
                <div class="cell medium-2 text-center"><a class="text-center" href="">
                  <object class="logo_bebe" data="./assets/images/logo_bebe.svg"></object></a>
                </div>
                <div class="cell medium-2 text-center"><a class="text-center" href="">
                  <object class="logo_tb" data="./assets/images/logo_tb.svg"></object></a>
                </div>
              </div>
            </nav>
            <div style={{width: '100%'}}>
              <StupidCarousel carouselId="work-carousel-description" carouselEasing={'ease'} carouselSpeed={700} slidePadding={100} ref={(instance)=>{this.carousels[2] = instance}}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
              </StupidCarousel>
            </div>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState){
  }
}
