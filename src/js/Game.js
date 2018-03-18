import React from 'react'
import {observer} from 'mobx-react'

@observer
export default class Game extends React.Component {

  showGif(){
    // Random number to hack gif image cache, as it doesn't loop and otherways it would show only the last frame
    this.props.store.rollGif = `./img/homer.gif?a${Math.random()}` 
    setTimeout(()=>{
      this.props.store.rollGif = ''
    },4000)
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

  roll(){
    if(this.props.store.frames > 0){
      this.showGif()
      this.props.store.lastScore = this.pinsKnockedDown()
      // First roll of frame
      if( this.isFirstRollOfCurrentFrame() ){
        if (this.checkIfStrike(this.props.store.lastScore)) {
          this.props.store.strike = true
          this.props.store.score += this.props.store.lastScore
          this.props.store.lastScore = 0
          alert('Strike! 10 points!')
        }
        this.props.store.score += this.props.store.lastScore
        this.props.store.strike === true ? this.props.store.currentRoll = this.props.store.rolls[0] : this.props.store.currentRoll = this.props.store.rolls[1]
      }else{
        // Second roll of frame
        if (this.checkIfStrike(this.props.store.lastScore)) {
          if (this.props.store.strike === true) {
            alert('Spare! 10 points')
            this.props.store.score += this.props.store.lastScore
          }
        }else{
          this.props.store.score += this.props.store.lastScore
          this.props.store.frames -= 1
          this.props.store.strike = false
          this.props.store.currentRoll = this.props.store.rolls[0]
        }
      }
    }else{
      alert('No more frames! Reload to restart Game')
    }
  }

  render() {
    const {randomvals, lastScore, frames, score, rolls, currentRoll, rollGif}  = this.props.store
    return (
      <div>
        <h1 className="sans-serif f1 ma0 pa5 bg-near-black tc white">Babbel Challenge</h1>
        <div className="mw8 center pt4">
          <div className="ba b--light-gray">
            <p className="f3 w-100 b sans-serif tc dib">Score: {score}</p>
            <img className="center db h5" src={rollGif}/>
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
              <button onClick={this.roll.bind(this)} className="mt3 dim bg-orange white pv3 w-50 center db bn br3 ">Shoot!</button>
        </div>
      </div>
    )
  }
}