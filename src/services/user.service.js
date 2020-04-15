import config from '../config/server'
const axios = require('axios')

const headers = {"Content-Type":"application/json"}

export const getTokens = () => {
    return axios.get(config.rest+'/api/usuario/tokens', {headers})
}

export const addToken = (idUsuario, token) => {
    return axios.post(config.rest+'/api/usuario/token/'+idUsuario,{token},{headers})
}