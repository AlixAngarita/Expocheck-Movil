import socketIOClient from "socket.io-client"
import FirebaseService from '../../../easy-check-admin/src/services/firebaseService'

class Socket {
    constructor(){
        this.forum = socketIOClient('http://localhost:3000/forum')
        this.rating = socketIOClient('http://localhost:3000/rating')
    }


    // cuando comenten
    addCommet(comment, id){
        // guardo en la base de datos el nuevo comentario

        /*envio al server, comparo en el cliente si el nuevo comentario  es para la presentacion actual
         y ago push del comentario*/
        this.forum.emit('add', {comment, id})
    }


    // cuando calfiquen
    calification(calification, id){
        // guardo en la base de datos la nueva calificacion

        /*envio al server, comparo en el cliente si la calificacion actual es para la presentacion actual
         y ago push de la nueva calificación*/
        this.rating.emit('rating', {calification, id})
    }
}

export default new Socket()