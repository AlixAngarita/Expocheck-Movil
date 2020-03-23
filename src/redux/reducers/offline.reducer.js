import {handleActions} from 'redux-actions'
import {setStateConection} from '../actions/offline.action'

export default handleActions({
    [setStateConection]: (state,action) =>  {
        return action.payload
    }
}, false)