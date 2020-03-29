import config from '../config/server'
const axios = require('axios')

const headers = {"Content-Type":"application/json"}

export const list = () => {
    return axios.get(config.rest +'/api/jornada', {headers})
}

export const findJornadaById = (id) => {
    return axios.get(config.rest +'/api/jornada/'+id, {headers})
}