import { computed, observable } from "mobx"

class BowlingStore{
    @observable frames  = 10
    @observable players = 2
    @observable playersArray = []
    @observable lastScore = 0
    @observable currentRoll = 'first'
    @observable score = 0
    @observable strike = false
    @observable isVidVisible = true
    @observable buttonDisabled = false
}

var store =  window.store = new BowlingStore

export default  store