import React, {Component} from "react";
import JornadaComponent from './jornada.component'
import firebaseService from '../../services/firebaseService'
import {connect} from 'react-redux'
import {getJornadas} from '../../redux/actions/jornadas.action'

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
        this.props.jornadas
        .then(jornadas => this.setState({jornadas, loading:false}))
        .catch(err => console.error(err))
    }
    

    render(){
        return (<JornadaComponent loading={this.state.loading} jornadas={this.state.jornadas}/>)
    }
    
}
const mapStateToProps = (state) => {
    return {
        jornadas: state.jornadas
    }
}

const mapDispatchToProps = {
    getJornadas
}

export default connect(mapStateToProps, mapDispatchToProps)(Jornada)