import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AzureInstance, AzureLoginView } from 'react-native-azure-ad-2';

const credentials = {
    client_id: 'fa2fc1bf-4b02-4a57-a50f-8acd7f95aaa8',
    client_secret: 'ebUsl@eJvXes3D6He_G?4nS-VOOzSRJ9',
    scope: 'User.ReadBasic.All User.Read offline_access'
};

export default class AuthenticationComponent extends React.Component {
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
            console.log(result);
        }).catch(err => {
            console.log(err);
        })
    }


    render() {

        if (!this.state.loginSuccess) {

            return (<AzureLoginView
                azureInstance={this.azureInstance}
                loadingMessage="Solicitando token"
                onSuccess={this._onLoginSuccess}
            />)
        }

        const { userPrincipalName, givenName } = this.state.azureLoginObject;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {givenName}</Text>
                <Text style={styles.text}>You logged into Azure with {userPrincipalName}</Text>
            </View>
        );
    }
}

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
