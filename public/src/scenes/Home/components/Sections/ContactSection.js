import React, {Component} from "react";
import ReactSVG from 'react-svg';
import {Link} from "react-router-dom";

export default class ContactSection extends Component{

  constructor(props){
    super(props);
  }

  render(){
    const {imgDir} = this.props;
    return(
      <section class="section-container main-container" id="contact" data-init-proportion="1.5" style={{backgroundColor:'#aae3e8'}}>
      </section>
    )
  }
}
