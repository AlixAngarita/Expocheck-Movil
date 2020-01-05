import React, {Component} from "react";
import JornadaComponent from './jornada.component'
import firebaseService from '../../services/firebaseService'


class Jornada extends  Component {
    constructor(props){
            
        super(props)

        this.state = {
            jornadas:[],
            loading:true
        }
    }

    
    componentDidMount(){
        this.getJornadas()
    }

    getJornadas(){
        firebaseService.getDocuments('jornadas')
        .then(jornadas => this.setState({jornadas, loading:false}))
        .catch(err => console.error(err))
    }
    

    render(){
        return (<JornadaComponent loading={this.state.loading} jornadas={this.state.jornadas}/>)
    }
    
}
export default Jornada