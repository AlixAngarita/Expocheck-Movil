import React from "react";
import ListadoComponent from './listado.component'
import {findJornadaById} from '../../services/jornadas.service'
import config from '../../config/server'
import  io from 'socket.io-client'
const generalEvent = io(config.host+'/generalEvent')
const jornadaEvents = io(config.host+'/jornadaEvents')

class Listado extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            presentaciones:[ ],
            loading:true,
            jornada:{}
        }
        this.realtimeEvent = this.realtimeEvent.bind(this)
        this.realtimeEvent()
    }

    componentDidMount(){
        this.getPresentaciones()
    }

    getPresentaciones(){
        findJornadaById(this.props.id)
        .then(jornada => {
            console.log("JORNADA -> ",jornada.data)
            this.setState({
                presentaciones:jornada.data.presentaciones, 
                loading:false,
                jornada:jornada.data
            })
        })
    }
    
    realtimeEvent(){
        generalEvent.on('reloadPresentation',() => {
            this.getPresentaciones()
        })
        jornadaEvents.on('jornadaEvents',() => {
            console.log("Se actualizo la jornada!")
            this.getPresentaciones()
        })
    }

    render(){
        return(<ListadoComponent listado={this.state.presentaciones}
             loading={this.state.loading}
             jornada={this.state.jornada}
             />)
    }
}

export default Listado