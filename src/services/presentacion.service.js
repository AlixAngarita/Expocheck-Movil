import config from '../config/server'
const axios = require('axios')

const headers = {"Content-Type":"application/json"}

export const calificarMetrica = (idJornada, idPresentacion, evaluacion) => {
    return axios.post(config.rest+'/api/presentacion/evaluacion/'+idJornada+'/'+idPresentacion,
    {evaluacion},{headers})
}

export const actulizarMetrica = (idJornada, idPresentacion, valor, idEvaluacion) => {
    return axios.post(config.rest+'/api/presentacion/editar-evaluacion/'+idJornada+'/'+idPresentacion+'/'+idEvaluacion,
    {valor},{headers})
}

export const comentar = (idJornada, idPresentacion, comentario) => {
    return axios.post(config.rest+'/api/presentacion/comentario/'+idJornada+'/'+idPresentacion, 
    {comentario}, {headers})
}

export const preguntar = (idJornada, idPresentacion, pregunta) => {
    return axios.post(config.rest+'/api/presentacion/pregunta/'+idJornada+'/'+idPresentacion, 
    {pregunta}, {headers})
}

export const findById = (idJornada, idPresentacion) => {
    return axios.get(config.rest+'/api/presentacion/'+idJornada+'/'+idPresentacion, {headers})
}
export const  list = (idJornada) => {
    return axios.get(config.rest+'/api/presentacion/'+idJornada, {headers})
}
