import {handleActions} from 'redux-actions'
import {loadingJornadas} from '../actions/loading.actions'

export default handleActions({
    [loadingJornadas]: (state,action) =>  {
        return action.payload
    }
}, true)