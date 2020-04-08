import {getIdJornada} from '../actions/jornadas.action'
import {handleActions} from 'redux-actions'

export default  handleActions({
    [getIdJornada]: (state,action) =>  {
        console.log("Cambio el id de la jornada-> ",action.payload)
        return action.payload
    }
},0)