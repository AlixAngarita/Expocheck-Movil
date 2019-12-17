import React from "react";
import ListadoComponent from './listado.component'
import FirebaseService from '../../services/firebaseService'

class Listado extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            presentaciones:[ ],
            loading:true,
            fechaFinaliza:'',
            fechaInicio:''
        }
    }

    componentDidMount(){
        this.getPresentaciones()
    }

    getPresentaciones(){
        FirebaseService.getDocById('jornadas', this.props.id)
        .then(jornada => this.setState({
            presentaciones:jornada.presentaciones, 
            loading:false,
            fechaInicio:jornada.fechaInicio, 
            fechaFinaliza:jornada.fechaFinaliza
        }))
    }

    render(){
        return(<ListadoComponent listado={this.state.presentaciones}
             loading={this.state.loading}
             id={this.props.id}
             fechaInicio={this.state.fechaInicio}
             fechaFinaliza={this.state.fechaFinaliza}
             />)
    }
}

export default Listado