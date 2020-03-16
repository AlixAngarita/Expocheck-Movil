import {handleActions} from 'redux-actions'
import {loadingJornadas} from '../actions/loading.actions'

export default handleActions({
    [loadingJornadas]: (state,action) =>  {
        console.log("Cambio  el estado loadingJornadas",action.payload)
        return action.payload
    }
}, true)