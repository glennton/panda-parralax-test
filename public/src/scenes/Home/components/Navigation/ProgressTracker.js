import React, {Component} from "react";
import styles from './progressTracker.scss'
import Parallax from '../Parallax/Parallax.js'

export default class ProgressTracker extends Component{
  constructor(props){
    super(props);
    this.itemCount = this.props.itemCount || 6;
    this.state = {
      top: 0
    }
    this.updateProgressTracker = this.updateProgressTracker.bind(this);
  }
  getItemElement(key:number){
    const obj = <div className={`progress-dot-container`} key={key}><div className={`progress-dot`}></div></div>
    return obj
  };
  makeDots(){
    let items = [];
    for(let i = 0; i < this.itemCount; i++){
      console.log(this.getItemElement(i))
      items.push( this.getItemElement(i) )
    }
    return items;
  }
  updateProgressTracker(){
    const { dBot, dTop, scrollY, h, docHeight } = Parallax.stage;
    const top = ( (h + scrollY) / (docHeight - h) - (h / docHeight) ) * 100;
    this.setState({top:top})
  }
  render(){
    const progressCircleStyle = {
      transform: `translate3d(-0px,${this.state.top}px,1px)`
    }
    return(
      <div id="progress-tracker">
        <div className={`progress-circle-container`} style={progressCircleStyle}><div className={`progress-circle`}></div></div>
        { this.makeDots() }
      </div>
    )
  }
  componentDidMount() {
    window.addEventListener('scroll', this.updateProgressTracker);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateProgressTracker);
  }
}
