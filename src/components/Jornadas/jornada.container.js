import React, {Component} from "react";
import JornadaComponent from './jornada.component'
import {connect} from 'react-redux'
import {getJornadasThunk} from '../../redux/actions/jornadas.action'

class Jornada extends  Component {
    render(){
        return (<JornadaComponent loading={true}/>)
    }
    
}
const mapStateToProps = (state) => {
    return {
        jornadas: state.jornadas
    }
}

const mapDispatchToProps = {
    getJornadasThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Jornada)