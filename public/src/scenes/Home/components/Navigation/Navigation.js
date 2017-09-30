import React, {Component} from "react";
import styles from './navigation.scss';

export default class Navigation extends Component{
  constructor(props){
    super(props);
    this.state = {
      menuActive: false
    }
    this.activateNavigation = () => {
      const toggle = !this.state.menuActive
      this.setState({menuActive : toggle})

    };
  }
  render(){
    return(
      <section id="fixed-header" className={`grid-x align-center ${this.state.menuActive ? 'active' : ''}`}>
        <div className={`cell medium-4 medium-order-1 text-right`}>
          <ul className={`left-nav`}>
            <li><a onClick=''>Home</a></li>
            <li><a onClick=''>Work</a></li>
          </ul>
        </div>
        <div className={`cell medium-1 medium-order-2`}>
          <div id="nav-toggle" className={this.state.menuActive ? 'open' : ''} onClick={()=>this.activateNavigation()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className={`cell medium-4 medium-order-3`}>
          <ul className={`right-nav`}>
            <li><a onClick=''>Skills</a></li>
            <li><a onClick=''>Contact</a></li>
          </ul>
        </div>
      </section>
    )
  }
}
