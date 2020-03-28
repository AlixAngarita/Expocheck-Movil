import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, ImageBackground } from 'react-native'
import { CheckBox } from 'react-native-elements'
import assets from '../../config/assets'
import { withNavigation } from 'react-navigation';
const background = require('../../../assets/login/static-background.png');
const logo = require('../../../assets/login/logo.png')
const boton = require('../../../assets/login/boton.png')

//width: '100%', height: '100%', 
//const LoginComponent = props => {
class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })
    
    render() {
        //console.log(this.props)
        return (
            <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }}>
                <ImageBackground source={background} resizeMode='cover' style={{ height: '100%', width: '100%' }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Image source={logo} style={{ width: 120, height: 140, marginTop: '20%' }} />
                    </View>
                </ImageBackground>
                <KeyboardAvoidingView style={{ position: 'absolute', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '50%' }}
                    behavior="padding">
                    <TextInput
                        placeholder="example@upb.edu.co"
                        keyboardType='email-address'
                        style={{ borderRadius: 13, height: 40, padding: 10, backgroundColor: 'rgba(255,255,255,0.86)', width: 300, color: '#95A5A6' }} />
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>
                        this.state.checked ? this.props.navigation.navigate('Authentication') : console.log('No se han aceptado')}>
                        <View style={{}}>
                        </View>
                        <Image source={boton} style={{ width: 280, marginTop: 10, resizeMode: 'contain' }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '40%' }}>
                        <CheckBox
                            center

                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked })}
                            checkedIcon='check-square'
                            uncheckedColor='white'
                            checkedColor='white'
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            style={{flex: 1, padding: 0}}
                        />
                        <Text style={{ color: 'white', fontSize: 12 }}>
                            Acepto los{" "}
                            <Text style={{ textDecorationLine: 'underline' }}>
                                términos y condiciones
                            </Text>
                        </Text>

                    </View>
                </KeyboardAvoidingView>
            </View>);
    }
}

export default withNavigation(LoginComponent)