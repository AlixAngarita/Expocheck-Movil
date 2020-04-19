import axios from "axios";
import {createAction} from 'redux-actions'
import {list} from '../../services/jornadas.service'
import {loadingJornadas} from './loading.actions'
import config from '../../config/server'

const headers = {"Content-Type": "application/json"}

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
export const updateAuthors = (user, jornada) => dispatch =>
{
    const integrante = { 
        integrante: {
            nombre: user.nombre,
            autor: user._id
      }
    }

    axios
        .post(config.rest + "/api/jornada/"+jornada+"/integrantes", integrante, {headers})
        .then(res => {
            console.log('update integrante', res.status)        
        })
        .catch(err => {
          console.info(err.config);
          console.log('no se actualizo')
        });
}