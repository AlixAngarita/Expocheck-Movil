import {handleActions} from 'redux-actions'
import {qrstate} from '../actions/qr.action'

export default handleActions({
    [qrstate]: (state,action) =>  {
        return action.payload
    }
}, {titulo:'', valid:false})