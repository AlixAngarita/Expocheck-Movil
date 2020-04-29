import React, { Component } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Keyboard, Modal, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
const background = require('../../../assets/login/background.png');
const logo = require('../../../assets/login/logo.png')
const boton = require('../../../assets/login/boton.png')
const { Terminos } = require('./termsandconditions')

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checked: false,
            color: 'white',
            keyboard: false,
            modalVisible: false,
            correo: '',
            iconInput: 'envelope',
            inputColor: '#95A5A6'
        }
        this.handleChange= this.handleChange.bind(this);
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    validate = (email) => {
        const expression = /^\w+\.(\w+|\w+\.\d+)@upb.edu.co$/i;
        return expression.test(String(email).toLowerCase())
    }

    handleChange(value) {
        const valido = this.validate(value)
        valido? 
        this.setState({iconInput: 'check-circle', inputColor: '#94d82d', correo: value}) : 
        this.setState({iconInput: 'times-circle', inputColor: 'red', correo: ''})
    }   

    createAlert = () => {
        if (this.state.checked && this.state.correo != '') {
            this.props.navigation.navigate('Authentication', { correo: this.state.correo })
        }
        else {
            if (this.state.correo == '') //correo
            {
                Alert.alert(
                    "Correo inválido",
                    "Por favor revisa que el correo que ingresaste sea un correo institucional de la UPB.",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            }
            else {
                Alert.alert(
                    "Términos y condiciones",
                    "Por favor lee y acepta los términos y condiciones para continuar.",
                    [
                        { text: "OK" }
                    ],
                    { cancelable: false }
                );
            }
        }

    }

    TerminosCondiciones(modalVisible) {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    this.setState({ checked: !this.state.checked, color: 'white' })
                }}
                style={styles.centeredView}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Terminos />
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#0abde3" }}
                            onPress={() => {
                                this.setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Cerrar</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        )
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View >
                <ImageBackground source={background} resizeMode='cover' style={{ height: '100%', width: '100%' }}>                    
                        {this.TerminosCondiciones(modalVisible)}
                        <KeyboardAwareScrollView  
                            enableOnAndroid={true} 
                            keyboardShouldPersistTaps='handled'
                            getTextInputRefs={() => { return [this._textInputRef];}}>
                            <View style={{alignItems: 'center', height: '100%'}}>

                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',  margin: '5%'}}>
                                    <Image source={logo} style={{ width: 128, height: 140,  marginTop: '20%', marginBottom: '10%'}} />
                                    <Text style={styles.ingreso}>
                                        Ingresa con tu correo institucional
                                    </Text>
                                </View>

                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', height: '50%'}}>
                                    <View style={styles.inputView}>
                                        <TextInput
                                            placeholder="example@upb.edu.co"
                                            keyboardType='email-address' 
                                            onChangeText={this.handleChange}
                                            ref={(r) => { this._textInputRef = r; }}/>
                                        <Icon style={{ marginRight: 0, padding: 'auto' }} name={this.state.iconInput} size={20} color={this.state.inputColor} />
                                    </View>

                                    <TouchableOpacity activeOpacity={0.8} onPress={this.createAlert}
                                        style={{margin: '10%'}}>
                                        <Image source={boton} style={{ width: 280, height: 60, resizeMode: 'cover' }} />
                                    </TouchableOpacity>


                                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginBottom: '20%' }}>
                                        <CheckBox
                                            center
                                            checked={this.state.checked}
                                            onPress={() => this.setState({ checked: !this.state.checked, color: 'white' })}
                                            checkedIcon='check-square'
                                            uncheckedColor={this.state.color}
                                            checkedColor='white'
                                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                                            style={{ flex: 1, padding: 0 }}
                                        />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setModalVisible(!modalVisible);
                                            }}>
                                            <Text style={{ color: this.state.color, fontSize: 12 }}>
                                                Acepto los{" "}
                                                <Text style={{ textDecorationLine: 'underline' }}>
                                                    términos y condiciones </Text>
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </KeyboardAwareScrollView >
                </ImageBackground>
            </View>
        );
    }
}

//value={this.state.correo} 

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#F194FF",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flex: 1,
        opacity: 0.9
    },
    ingreso: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 25
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: 100,
        top: 15
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    inputView: {
        flexDirection: 'row', justifyContent: 'space-between',
        borderRadius: 13, height: 40, padding: 10, backgroundColor: 'rgba(255,255,255,0.86)', width: 300, color: '#95A5A6'//input
    },
    teclado: { position: 'absolute', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '50%' }
});

export default withNavigation(LoginComponent)