import {handleActions} from 'redux-actions'
import {setStateConection} from '../actions/offline.action'

export default handleActions({
    [setStateConection]: (state,action) =>  {
        console.log("Cambio  el estado connect",action.payload)
        return action.payload
    }
}, false)