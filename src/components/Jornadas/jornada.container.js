import React, {Component} from "react";
import JornadaComponent from './jornada.component'
import Api from '../../services/api'


class Jornada extends  Component {
    constructor(props){
        super(props)

        this.state = {
            jornadas:[]
        }
    }

    
    componentDidMount(){
        setTimeout(() => {
        this.setState({jornadas:Api.getJornadas()})
       }, 500);
    }

    

    render(){
        return (<JornadaComponent jornadas={this.state.jornadas}/>)
    }
    
}
export default Jornada