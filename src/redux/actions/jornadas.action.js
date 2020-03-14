import {createAction} from 'redux-actions'
import FirebaseService from '../../services/firebaseService'

export const  getJornadas = createAction('getJornadas')
export const getJornadasThunk = () => async dispatch => {
    try {
        let jornadas = await FirebaseService.getDocuments('jornadas')
        dispatch(getJornadas(jornadas))
    } catch (error) {
        console.error(error)
    }
}