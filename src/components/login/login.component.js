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
//checked={this.state.checked}
//<View style={{ height: 50 }} />

/*
View
style={{flex:1, flexDirection:'column', 
    backgroundColor:'#f1f2f6', alignItems:'center', 
    justifyContent:'center'}}

<Image
        source={{uri:assets.logo}} style={{width: 150, height: 150, marginBottom:50}}/>
        <KeyboardAvoidingView style={{flexDirection:'column', alignItems:'center', 
        justifyContent:'center' }}
        behavior="padding">
             <TextInput
            placeholder="Digite su ID ..."
            keyboardType='number-pad'
            maxLength={9}
            style={{borderColor:'#74b9ff', borderRadius:20, borderWidth:1, height:40,
            padding:10, backgroundColor:'#ecf0f1', width:300, color:'grey'}}/>
             <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Jornadas')}>
                        <View style={{borderRadius:100, backgroundColor:'#74b9ff', 
                            marginVertical:20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            width:100,
                            elevation: 3}}>
                            <Text style={{color:'white', fontSize:18, padding:10, textAlign:'center'}}>Login</Text>
                        </View>
                        <View style={{height:50}}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
*/

export default withNavigation(LoginComponent)