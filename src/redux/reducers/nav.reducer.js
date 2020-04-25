import {handleActions} from 'redux-actions'
import {setNav} from '../actions/nav.action'

export default handleActions({
    [setNav]: (state,action) =>  {
        return action.payload
    }
}, 0)