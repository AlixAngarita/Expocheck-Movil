import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, ActivityIndicator, Image } from 'react-native';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {loginUser} from "../../redux/actions/auth.action.js"
import Jornada from '../Jornadas/jornada.container'
import env from '../../../variables.js'
const loading = require('../../../assets/login/background.png');
const logo = require('../../../assets/login/logo.png')

const LoadingToken = () => {
    return (
        <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }}>
                <ImageBackground source={loading} resizeMode='cover' style={{ height: '100%', width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>                    
                        <Image source={logo} style={{ width: 120, height: 140, marginTop: '20%' }} />
                        <ActivityIndicator style={{top: '60%', position: 'absolute'}} size="large" color="#ffff" />
                    </View>
                </ImageBackground>
                
        </View>
    );
}

class AuthenticationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            azureLoginObject: {},
            loginSuccess: false
        };
        this.azureInstance = new AzureInstance(env.credentials);
        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    _onLoginSuccess() {
        this.azureInstance.getUserInfo().then(result => {
            this.setState({
                loginSuccess: true,
                azureLoginObject: result
            });
            const token = this.azureInstance.getToken();
            this.props.loginUser(result, token); //redux
        }).catch(err => {
            console.log(err);
        })
    }


    render() {

        if (!this.state.loginSuccess) {

            return (<AzureLoginView
                azureInstance={this.azureInstance}
                loadingMessage="Solicitando token"
                loadingView = {<LoadingToken/>}
                onSuccess={this._onLoginSuccess}
                mail={this.props.correo}
            />)
        }

        const { userPrincipalName, givenName } = this.state.azureLoginObject;

        return (
            <Jornada/>
        );
    }
}

// ----- REDUX - REACT -----
AuthenticationComponent.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    //errors: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    //errors: state.errors,
  });
  export default connect(
    mapStateToProps,
    { loginUser }
  )(AuthenticationComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});
