import React from 'react'
import {observer} from 'mobx-react'

@observer
export default class Game extends React.Component {

  roll(){
    if( this.props.store.frames <= 0 ){
      alert('No frames!')
    } else{
      this.props.store.lastScore = Math.floor(Math.random()*10)
    }
  }

  render() {
    const {randomvals, lastScore, frames}  = this.props.store
    return (
      <div>
        <h1 className="ma0 pa5 bg-near-black tc white">
        Babbel bowling
        </h1>
        <div className="mw8 center pt4">
          <div className="pv6 ba ">
          {/* <p>Players Array: {playersArray}</p> */}
          <p>Remaining frames: {frames}</p>
          <p>Last Score: {lastScore}</p>
          </div>
          <div className="cf">
            <div className="fl w-50 pa3">
              <button onClick={this.roll.bind(this)} className="dim bg-orange white pv3 w-100 bn br3 ">Shoot!</button>
            </div>  
            <div className="fl w-50 pa3">
              <button className="dim bg-orange white pv3 w-100 bn br3 ">Shoot!</button>
            </div>  
          </div>
        </div>
      </div>
    )
  }
}