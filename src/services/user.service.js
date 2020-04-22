import config from '../config/server'
const axios = require('axios')

const headers = {"Content-Type":"application/json"}

export const getTokens = () => {
    return axios.get(config.rest+'/api/usuario/tokens', {headers})
}

export const addToken = (idUsuario, token) => {
    return axios.post(config.rest+'/api/usuario/token/'+idUsuario,{token},{headers})
}

export const updatePrivacy = (idUsuario,privacidad) =>{
    console.log('updatePrivacy')
    console.log(privacidad)
    return axios.post(config.rest+'/api/usuario/privacidad/'+idUsuario,
    {comentariosPublicos:privacidad.comentariosPublicos,
     evaluacionPublica:privacidad.evaluacionPublica },{headers})
}