import React from "react";
import ListadoComponent from './listado.component'
import {findJornadaById} from '../../services/jornadas.service'
import config from '../../config/server'
import  io from 'socket.io-client'
const pr = io(config.host+'/presentation')
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
        this.setState({loading:true, presentaciones:[]})
        findJornadaById(this.props.id)
        .then(jornada => {
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
            this.getPresentaciones()
        })

        pr.on('nextPresentation', (data) => {
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