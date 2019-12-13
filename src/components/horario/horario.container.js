import React from "react";
import HorarioComponent from './horario.component'
import FirebaseService from '../../services/firebaseService'

class HorarioContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            loading:true,
            fechaInicio:null,
            horario:[],
            dias:['Lunes','Martes', 'Miercoles', 'Jueves', 'Viernes'],
            horarioFiltrado:[],
            diaSeleccionado:''
        }
        this.filtrar = this.filtrar.bind(this)
    }

    componentDidMount(){
        this.getAgenda()
    }

    getAgenda(){
        FirebaseService.getDocById('jornadas', this.props.id)
        .then(jornada => this.setState({horario:jornada.agenda, loading:false, fechaInicio:jornada.fechaInicio}))
    }

    filtrar(dia_filtrado){
       if(dia_filtrado=='all'){
        this.setState({horarioFiltrado:[], diaSeleccionado:'Toda la semana'})
       }else{
        this.setState({horarioFiltrado:this.state.horario.filter(horario => horario.nombreDia==dia_filtrado), diaSeleccionado:dia_filtrado})
       }
    }

    render(){
        return(<HorarioComponent 
            horario={this.state.horarioFiltrado.length > 0 ? this.state.horarioFiltrado: this.state.horario} 
            dias={this.state.dias}
            filtrar={this.filtrar}
            diaSeleccionado={this.state.diaSeleccionado}
            loading={this.state.loading}
            fechaInicio={this.state.fechaInicio}/>)
    }
}

export default HorarioContainer