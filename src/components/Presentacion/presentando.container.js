import React from "react";
import PresentacionComponent from './presentando.component'


class Presentacion extends React.Component {

    constructor(props){
        super(props)
        
        this.state = {
            presentacion:{titulo:'Titulo presentación actual', calificacion:3}
        }
    }


    render(){
        return(
            <PresentacionComponent
            presentacion={this.state.presentacion}
            handleBarCodeScanned={this.handleBarCodeScanned}/>)
    }
}

export default Presentacion