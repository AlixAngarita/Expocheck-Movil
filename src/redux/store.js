import {createStore, combineReducers} from 'redux'
import jornadas from './reducers/jornadas.reducer'

const reducers = combineReducers({
    jornadas
})

export default createStore(reducers)