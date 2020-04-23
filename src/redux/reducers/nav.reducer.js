import {handleActions} from 'redux-actions'
import {setNav} from '../actions/nav.action'

export default handleActions({
    [setNav]: (state,action) =>  {
        console.log("Index cambiado -> ", action.payload)
        return action.payload
    }
}, 0)