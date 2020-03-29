import React, { Component } from 'react'
import LoginComponent from './login.component'
import {connect} from 'react-redux'
import Authentication from '../autenticacion/autenticacion.container'

class Login extends Component {

    constructor(props) {
        super(props);

    }
    render(){
        //return this.props.auth.isAuthenticated? <Authentication/> : <LoginComponent/>;
        return <LoginComponent/>;
    }
}
const mapStateToProps = (state) => {
    return {
        jornadas: state.jornadas,
        auth: state.auth
    }
}
export default connect(mapStateToProps)(Login)
  