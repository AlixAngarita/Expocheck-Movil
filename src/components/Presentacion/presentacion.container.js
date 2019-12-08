import React from "react";
import PresentacionComponent from './presentacion.component'


class Presentacion extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            presentacion:{titulo:'Titulo presentación', calificacion:3}
        }
    }


    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}/>)
    }
}

export default Presentacion