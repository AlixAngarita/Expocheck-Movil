import React, { Component } from 'react'
import AuthenticationComponent from './autenticacion.component'

export default class Authentication extends Component {

    render(){
        //console.log(this.props)
        //console.log(this.props.auth)
        //console.log('this -> ' + state.auth)
        return <AuthenticationComponent/>
    }
}

/*const mapStateToProps = (state) => {
    return {
        jornadas: state.jornadas
    }
}

const mapDispatchToProps = {
    getJornadasThunk
}*/

