import  io from 'socket.io-client'
import FirebaseService from '../services/firebaseService'
import { YellowBox } from 'react-native'



class Socket {
    
    constructor(){
        this.forum = io('http://192.168.1.3:3000/forum')
        this.rating = io('http://192.168.1.3:3000/rating')

        YellowBox.ignoreWarnings([
            'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
        ])
    }


    // cuando comenten
    addCommet(comment, tituloPresentacion,  idJornada){
       try {
            /*envio al server, comparo en el cliente si el nuevo comentario  es para la presentacion actual
            y ago push del comentario*/
            this.forum.emit('add', {comment, idJornada, titulo:tituloPresentacion})

            // guardo en la base de datos el nuevo comentario
            FirebaseService.getDocById('jornadas', idJornada)
            .then(async jornada => {
                let presentaciones = jornada.presentaciones
   
                presentaciones.map( (pr, index) => {
                    if(pr.titulo == tituloPresentacion ){
                        pr.comentarios.push(comment)
                        pr.comentarios = pr.comentarios.reverse()
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
}

export default new Socket()