import React, {Component} from "react";
import Parallax from '__scenesDir/Home/components/Parallax/Parallax.js';
import styles from './navigation.scss';

export default class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuActive: false
    }
  }
  activateNavigation = () => {
    const toggle = !this.state.menuActive
    this.setState({menuActive : toggle})
  };
  deactivateNavigation = () => {
    console.log('click')
    this.setState({menuActive : false})
  };
  render(){
    return(
      <section id="fixed-header" className={`grid-x align-center ${this.state.menuActive ? 'active' : ''}`}>
        <div className={`cell medium-4 small-order-1 text-right`}>
          <ul className={`left-nav`}>
            <li><a onClick={()=>{this.deactivateNavigation(); Parallax.navigateTo('home')}}>Home</a></li>
            <li><a onClick={()=>{this.deactivateNavigation(); Parallax.navigateTo('work')}}>Work</a></li>
          </ul>
        </div>
        <div className={`cell medium-1 small-order-2`}>
          <div id="nav-toggle" className={this.state.menuActive ? 'open' : ''} onClick={()=>this.activateNavigation()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`cell medium-4 small-order-3`}>
          <ul className={`right-nav`}>
            <li><a onClick={()=>{this.deactivateNavigation(); Parallax.navigateTo('skills')}}>Skills</a></li>
            <li><a onClick={()=>{this.deactivateNavigation(); Parallax.navigateTo('contact')}}>Contact</a></li>
          </ul>
        </div>
      </section>
    )
  }
}
