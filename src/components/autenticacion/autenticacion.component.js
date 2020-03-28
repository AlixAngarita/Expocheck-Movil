import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withNavigation } from 'react-navigation';
import {loginUser} from "../../redux/actions/auth.action.js"
import Jornada from '../Jornadas/jornada.container'

const loading = require('../../../assets/get-token.png');

const credentials = {
    client_id: 'fa2fc1bf-4b02-4a57-a50f-8acd7f95aaa8',
    client_secret: 'ebUsl@eJvXes3D6He_G?4nS-VOOzSRJ9',
    scope: 'User.ReadBasic.All User.Read offline_access'
};

const LoadingToken = props => {
    return (
        <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }}>
                <ImageBackground source={loading} resizeMode='cover' style={{ height: '100%', width: '100%' }}/>
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
        this.azureInstance = new AzureInstance(credentials);
        this._onLoginSuccess = this._onLoginSuccess.bind(this);
    }

    _onLoginSuccess() {
        this.azureInstance.getUserInfo().then(result => {
            this.setState({
                loginSuccess: true,
                azureLoginObject: result
            });
            this.props.loginUser(result); //redux
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
            />)
        }

        const { userPrincipalName, givenName } = this.state.azureLoginObject;

        return (
            <Jornada/>
            /*
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {givenName}</Text>
                <Text style={styles.text}>You logged into Azure with {userPrincipalName}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Jornadas')}>
                            <Text style={{color:'red', fontSize:18, padding:10, textAlign:'center'}}>Continuar</Text>     
            </TouchableOpacity>
            </View>
            */
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
  )(withNavigation(AuthenticationComponent));

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
