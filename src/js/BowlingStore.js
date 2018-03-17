import { computed, observable } from "mobx"

class BowlingStore{
    @observable frames  = 10
    @observable players = 2
    @observable playersArray = []
    @observable lastScore = 0

    // @computed multiPlayerFrames = (players)=>{
    //     playersArray.length = players
    //     return playersArray
    // }
}

var store =  new BowlingStore

export default  store

