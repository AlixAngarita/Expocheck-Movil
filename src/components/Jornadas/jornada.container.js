import React, {Component} from "react";
import JornadaComponent from './jornada.component'
import {connect} from 'react-redux'
import {getJornadasThunk} from '../../redux/actions/jornadas.action'

class Jornada extends  Component {

    constructor(props) {
        super(props);

    }
    render(){
        return (<JornadaComponent loading={true}/>)
    }
    
}
const mapStateToProps = (state) => {
    return {
        jornadas: state.jornadas,
        auth: state.auth
    }
}

const mapDispatchToProps = {
    getJornadasThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Jornada)