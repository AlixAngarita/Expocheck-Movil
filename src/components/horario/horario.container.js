import React from "react";
import HorarioComponent from './horario.component'

class HorarioContainer extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            horario:[],
            dias:['Lunes','Martes', 'Miercoles', 'Jueves', 'Viernes'],
            horarioFiltrado:[],
            diaSeleccionado:''
        }
        this.filtrar = this.filtrar.bind(this)
    }

    componentDidMount(){
        this.setState({horario:this.props.agenda})
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
            diaSeleccionado={this.state.diaSeleccionado}/>)
    }
}

export default HorarioContainer