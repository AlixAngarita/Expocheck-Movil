import {handleActions} from 'redux-actions'
import {qrstate} from '../actions/qr.action'

export default handleActions({
    [qrstate]: (state,action) =>  {
        console.log("Estado del qr cambiado -> ", action.payload)
        return action.payload
    }
}, {titulo:'', valid:false})