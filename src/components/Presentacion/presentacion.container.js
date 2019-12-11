import React from "react";
import PresentacionComponent from './presentacion.component'


class Presentacion extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            presentacion:{titulo:'Titulo presentación', calificacion:3}
        }
        console.log(this.props.jornada)
    }


    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}/>)
    }
}

export default Presentacion