import React, { Component } from 'react'
import AuthenticationComponent from './autenticacion.component'

export default class Authentication extends Component {
    
    render(){    
        const { navigation } = this.props;
        return <AuthenticationComponent
        correo = {navigation.getParam('correo', '')}
        />
    }
}