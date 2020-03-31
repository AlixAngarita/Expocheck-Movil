import config from '../config/server'
const axios = require('axios')

const headers = {"Content-Type":"application/json"}

export const calificarMetrica = (idJornada, idPresentacion, evaluacion) => {
    return axios.post(config.rest+'/api/presentacion/evaluacion/'+idJornada+'/'+idPresentacion,
    {evaluacion},{headers})
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