import React from 'react'
import {observer} from 'mobx-react'

@observer
export default class Game extends React.Component {

  componentDidMount(){
    this.refs.vidRef.addEventListener('ended', this.showResult.bind(this) ,false)
  }

  isFirstRollOfCurrentFrame(){
    return this.props.store.currentRoll === this.props.store.rolls[0] ? true : false
  }

  checkIfStrike(lastVal){ 
    return lastVal === 10 ? true : false
  }

  pinsKnockedDown(){ // Get a random number from one to ten of pins knocked down
    return Math.ceil(Math.random()*10)
  }

  showResult(){
      this.props.store.isVidVisible = false
      this.showUpdatedInfos()
      this.props.store.buttonDisabled = false
  }

  roll(){
    if(this.props.store.frames > 0){
      this.props.store.isVidVisible = true
      this.refs.vidRef.play()
      this.props.store.buttonDisabled = true
    }else{
      alert('No more frames! Reload to restart Game')
    }      
  }

  showUpdatedInfos(){

    this.props.store.lastScore = this.pinsKnockedDown()
    
    if (this.props.store.currentRoll === 'first') {
      // first
      if (this.checkIfStrike(this.props.store.lastScore)) {
        this.props.store.score += this.props.store.lastScore
        this.props.store.currentRoll = 'strike'
        alert('Strike!!! 10 points!')
      }else{
        this.props.store.score += this.props.store.lastScore
        this.props.store.currentRoll = 'last'
      }      
    }else if(this.props.store.currentRoll === 'strike') {
      // strike
      if (this.checkIfStrike(this.props.store.lastScore)) {
        this.props.store.score += this.props.store.lastScore
        this.props.store.currentRoll = 'spare'
        alert('Spare!!! 10 points!')
      }else{
        this.props.store.score += this.props.store.lastScore
        this.props.store.currentRoll = 'last'
      }
    }else if(this.props.store.currentRoll === 'spare') {
      // spare
      this.props.store.score += this.props.store.lastScore
      this.props.store.currentRoll = 'last'
    }else if(this.props.store.currentRoll === 'last') { 
      // last
      this.props.store.score += this.props.store.lastScore
      this.props.store.currentRoll = 'first'    
      this.props.store.frames --  
    }

  }

  render() {
    const {randomvals, lastScore, frames, score, rolls, currentRoll, isVidVisible, buttonDisabled}  = this.props.store
    let vidClasses        = isVidVisible === true ? 'center db h5' : 'dn',
        flashScoreClasses = isVidVisible === true ? 'dn' : 'pt4 f-headline center db h5 ma0 tc sans-serif',
        btnClasses        = buttonDisabled === true ? "mt3 dim bg-gray white pv3 w-50 center db bn br3 " : "mt3 dim bg-orange white pv3 w-50 center db bn br3 "

    return (
      <div>
        <h1 className="sans-serif f1 ma0 pa5 bg-near-black tc white">Babbel Challenge</h1>
        <div className="mw8 center pt4">
          <div className="ba b--light-gray">
            <p className='w-100 b sans-serif tc dib'>Score: {score}</p>
            <p className={flashScoreClasses}>{lastScore}</p>
            <video ref="vidRef" className={vidClasses}>
              <source src='./assets/bowling-animation.mp4' type="video/mp4"/>
            </video>
            <div className="cf w-100">
              <div className="fl w-third">
                <p className="f6 w-100  sans-serif tc dib">Frame: {frames}</p>
              </div>
              <div className="fl w-third">
                <p className="f6 w-100  sans-serif tc dib">Roll: {currentRoll}</p>
              </div>
              <div className="fl w-third">
                <p className="f6 w-100  sans-serif tc dib">Last number of pins knocked down: {lastScore}</p>
              </div>
            </div>            
          </div>
              <button disabled={buttonDisabled} onClick={this.roll.bind(this)} className={btnClasses}>Shoot!</button>
        </div>
      </div>
    )
  }
}