import  io from 'socket.io-client'
import {comentar, preguntar, calificarMetrica} from './presentacion.service'
import { YellowBox } from 'react-native'
import config from '../config/server'


class Socket {
    
    constructor(){
        this.forum = io(config.host+'/forum')
        this.rating = io(config.host+'/rating')

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ])
    }


    // cuando comenten
    addCommet(comment, presentacion,  idJornada){
      return new Promise((resolve, reject) => {

                    if(comment.contenido.trim().length > 0){
                        this.updateInRealtime(idJornada,presentacion)

                        // guardo en la base de datos el nuevo comentario
                        comentar(idJornada, presentacion._id, comment)
                        .then(res => resolve(res))
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
                .then(res => resolve(res))
                .catch(err => reject(err))
            }
    
        })

    }

    // cuando calfiquen
    calification(rating, tituloPresentacion, idJornada){
        try {
            /*envio al server, comparo en el cliente si la calificacion actual es para la presentacion actual
         y ago push de la nueva calificación*/
         this.rating.emit('rating', {rating, titulo:tituloPresentacion})


         // guardo en la base de datos la nueva calificacion
         FirebaseService.getDocById('jornadas', idJornada)
         .then(async jornada => {
             let presentaciones = jornada.presentaciones

             presentaciones.map( (pr, index) => {
                 if(pr.titulo == tituloPresentacion ){
                     pr.calificacion.push(rating)
                     presentaciones[index] = pr
                 }
             })
             
             jornada.presentaciones = presentaciones
             await FirebaseService.updateDocument('jornadas', idJornada, jornada)
             
         })
 
        } catch (error) {
            console.log('Error -> ',error)
        }
        
    }

    // Servico real time
    updateInRealtime(idJornada, presentacion){
        this.forum.emit('onRealTimeEvent', {idJornada, titulo:presentacion.titulo})
    }
    
}

export default new Socket()