import  io from 'socket.io-client'
import {comentar, preguntar, calificarMetrica, actulizarMetrica} from './presentacion.service'
import { YellowBox } from 'react-native'
import config from '../config/server'


class Socket {
    
    constructor(){
        this.forum = io(config.host+'/forum')
        this.rating = io(config.host+'/rating')
        this.generalEvent = io(config.host+'/generalEvent')

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ])
    }


    // cuando comenten
    addCommet(comment, presentacion,  idJornada){
      return new Promise((resolve, reject) => {

                    if(comment.contenido.trim().length > 0){
                        // guardo en la base de datos el nuevo comentario
                        comentar(idJornada, presentacion._id, comment)
                        .then(res => {
                            this.updateInRealtime(idJornada,presentacion)
                            resolve(res)
                        })
                        .catch(err => reject(err))
                    }
            
      })
    }

    // Cuando pregunten
    addQuestion(question, presentacion,  idJornada){
        return new Promise((resolve, reject) => {

            if(question.contenido.trim().length > 0){

                this.updateInRealtime(idJornada,presentacion)

                // guardo en la base de datos la nueva pregunta
                preguntar(idJornada, presentacion._id, question)
                .then(res => {
                    this.updateInRealtime(idJornada,presentacion)
                    resolve(res)
                })
                .catch(err => reject(err))
            }
    
        })

    }

    // cuando calfiquen
    addEvaluacion(evaluacion, presentacion, idJornada){
        return new Promise((resolve, reject) => {

            this.updateInRealtime(idJornada,presentacion)

            // guardo en la base de datos la nueva pregunta
            calificarMetrica(idJornada, presentacion._id, evaluacion)
            .then(res => {
                this.updateInRealtime(idJornada,presentacion)
                resolve(res)
            })
            .catch(err => reject(err))
        })
        
    }

    updateEvaluacion(valor, presentacion, idJornada, idEvaluacion){
        return new Promise((resolve, reject) => {

            this.updateInRealtime(idJornada,presentacion)

            actulizarMetrica(idJornada, presentacion._id, valor, idEvaluacion)
            .then(res => {
                this.updateInRealtime(idJornada,presentacion)
                resolve(res)
            })
            .catch(err => reject(err))
        })
        
    }

    // Servico real time
    updateInRealtime(idJornada, presentacion){
        this.generalEvent.emit('onRealTimeEvent', {idJornada, titulo:presentacion.titulo})
    }
    
}

export default new Socket()