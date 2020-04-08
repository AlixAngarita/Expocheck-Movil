import {createAction} from 'redux-actions'
import {list} from '../../services/jornadas.service'
import {loadingJornadas} from './loading.actions'

export const  getJornadas = createAction('getJornadas')

export const  getIdJornada = createAction('getIdJornada')
export const getJornadasThunk = () => async dispatch => {
    try {
        let jornadas = await list()
        dispatch(getJornadas(jornadas.data))
        dispatch(loadingJornadas(false))
    } catch (error) {
        console.error(error)
    }
}