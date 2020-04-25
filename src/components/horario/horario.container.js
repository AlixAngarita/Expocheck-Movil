import React from "react";
import HorarioComponent from './horario.component'
import {findJornadaById} from '../../services/jornadas.service'
import config from '../../config/server'
import  io from 'socket.io-client'
const jornadaEvents = io(config.host+'/jornadaEvents')

class HorarioContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading:true,
            fechaInicio:null,
            presentaciones:[],
            //dias:['Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes'],
            horarioFiltrado:[],
            diaSeleccionado:'',
            jornada:{}
        }
        //this.filtrar = this.filtrar.bind(this)
    }

    componentDidMount(){
        this.getAgenda()
        this.realtime()
    }

    getAgenda(){
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

    realtime(){
        jornadaEvents.on('jornadaEvents',(data) => {
            console.log("Actualización desde agenda!")
            this.getAgenda()
        })
    }

    render(){
        
        return(<HorarioComponent 
            horario={this.state.presentaciones} 
            //dias={this.state.dias}
            //filtrar={this.filtrar}
            //diaSeleccionado={this.state.diaSeleccionado}
            loading={this.state.loading}
            fechaInicio={this.state.jornada.fechaInicio}
            fechaFinaliza={this.state.jornada.fechaFinaliza}
            />)
    }
}

export default HorarioContainer