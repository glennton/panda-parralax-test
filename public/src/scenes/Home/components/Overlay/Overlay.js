import React, {Component} from "react";
import ReactSVG from 'react-svg';
import styles from './overlay.scss';


export default class Overlay extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {imgDir} = this.props;
    const {modal , closeModal} = this.props;
    return(
      <div className={`modal-container ${modal.isActive ? 'modal-active modal-container-show' : ''}`}>
        <div class="modal-animation-box modal-animation-box-1"></div>
        <div class="modal-animation-box modal-animation-box-2"></div>
        <div class="modal-animation-box modal-animation-box-3"></div>
        <div class="modal-animation-box modal-animation-box-4"></div>
        <div class="modal-content">
          <div class="modal-content-sidebar">
            <a class="modal-close-button" onClick={()=>{closeModal()}}>
              <span>+</span>
            </a>
            <div class="sidebar-content">
              <ReactSVG path={`${imgDir}logo_tokidoki.svg`} style={{fill:'#fff'}}/>
            </div>
          </div>
          <div class="work-modal-container modal-inner">
            <nav class="grid-container" id="work-modal-nav">
              <div class="grid-x grid-margin-x align-center">
                <div class="cell medium-2 medium-push-3"><a class="text-center" href="">
                    <object class="logo_tokidoki" data="./assets/images/logo_tokidoki.svg"></object></a></div>
                <div class="cell medium-2 text-center"><a class="text-center" href="">
                    <object class="logo_bebe" data="./assets/images/logo_bebe.svg"></object></a></div>
                <div class="cell medium-2 text-center"><a class="text-center" href="">
                    <object class="logo_tb" data="./assets/images/logo_tb.svg"></object></a></div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    )
  }
  componentDidUpdate(prevProps, prevState){
  }
}
