import React from "react";
import HorarioComponent from './horario.component'
import {findJornadaById} from '../../services/jornadas.service'


class HorarioContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading:true,
            fechaInicio:null,
            presentaciones:[],
            dias:['Lunes','Martes', 'Miércoles', 'Jueves', 'Viernes'],
            horarioFiltrado:[],
            diaSeleccionado:'',
            jornada:{}
        }
        this.filtrar = this.filtrar.bind(this)
    }

    componentDidMount(){
        this.getAgenda()
    }

    getAgenda(){
        this.setState({loading:true, presentaciones:[]})
        findJornadaById(this.props.id)
        .then(jornada => {
            this.setState({
                presentaciones:jornada.data.presentaciones, 
                loading:false,
                jornada:jornada.data,
                fechaInicio:jornada.fechaInicio
            })
        })
    }

    filtrar(dia_filtrado){
       if(dia_filtrado=='all'){
        this.setState({horarioFiltrado:[], diaSeleccionado:'Toda la semana'})
       }else{
        this.setState({horarioFiltrado:this.state.presentaciones.filter(horario => horario.nombreDia==dia_filtrado), diaSeleccionado:dia_filtrado})
       }
    }

    render(){
        return(<HorarioComponent 
            horario={this.state.horarioFiltrado.length > 0 ? this.state.horarioFiltrado: this.state.presentaciones} 
            dias={this.state.dias}
            filtrar={this.filtrar}
            diaSeleccionado={this.state.diaSeleccionado}
            loading={this.state.loading}
            fechaInicio={this.state.fechaInicio}/>)
    }
}

export default HorarioContainer