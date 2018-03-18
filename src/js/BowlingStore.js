import { computed, observable } from "mobx"

class BowlingStore{
    @observable frames  = 10
    @observable players = 2
    @observable playersArray = []
    @observable lastScore = 0
    @observable rolls = [1,2]
    @observable currentRoll = 1
    @observable score = 0
    @observable strike = false
    @observable rollGif =  ""
    @observable gifEnded =  false
}

var store =  window.store = new BowlingStore

export default  store

