import {handleActions} from 'redux-actions'
import {getJornadas} from '../actions/jornadas.action'
// sin actions
// export default (state, action) => {
//     switch(action.type){
//         case  'getJornadas':
//             return state
//         default:
//             return state
//     }
// }

// con redux actions

export default handleActions({
    [getJornadas]: (state,action) =>  {
        console.log("Cambio  el estado jornadas",action.payload)
        return action.payload
    }
},[])