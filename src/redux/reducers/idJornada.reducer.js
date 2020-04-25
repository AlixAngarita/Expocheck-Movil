import {getIdJornada} from '../actions/jornadas.action'
import {handleActions} from 'redux-actions'

export default  handleActions({
    [getIdJornada]: (state,action) =>  {
        return action.payload
    }
},0)