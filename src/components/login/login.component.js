import React, { Component } from 'react';
import { ScrollView, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, ImageBackground, Keyboard, Modal, StyleSheet, TouchableHighlight } from 'react-native'
import { CheckBox } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
const background = require('../../../assets/login/static-background.png');
const logo = require('../../../assets/login/logo.png')
const boton = require('../../../assets/login/boton.png')
const {Terminos} = require('./termsandconditions')
//import { WebView } from 'react-native-webview';



//width: '100%', height: '100%', 
//const LoginComponent = props => {
class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color: 'white',
            keyboard: false,
            modalVisible: false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    //handleCheckBox = () => this.setState({ termsAccepted: !this.state.termsAccepted })

    _keyboardDidShow = () => { this.setState({ keyboard: true })};
    _keyboardDidHide = () => this.setState({ keyboard: false });
    
    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    /*Terminos = () => {
        const { modalVisible } = this.state
        if (!modalVisible) {
          return null
        }
        return (
            
        <ScrollView style={{flex:1}}>
            <WebView
            originWhitelist={['*']}
            source={{ html: '<h1>Hello world</h1>' }}
            />
        </ScrollView>
        );
    }*/
    

    render() {
        //console.log(this.props)
        //console.log('No se han aceptado')}>
        const { modalVisible } = this.state;
        return (
            <View style={{ flex: 1, overflow: 'hidden', alignItems: 'center' }}>
                <ImageBackground source={background} resizeMode='cover' style={{ height: '100%', width: '100%' }}>
                    {!this.state.keyboard ? 
                    <ScrollView>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        
                        <Image source={logo} style={{ width: 120, height: 140, marginTop: '20%' }} />
                    </View></ScrollView> : undefined}


                    <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            this.setState({ checked: !this.state.checked, color: 'white' })
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Terminos/>

                            <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: "#0abde3" }}
                            onPress={() => {
                                this.setModalVisible(!modalVisible);
                            }}
                            >
                            <Text style={styles.textStyle}>Cerrar</Text>
                            </TouchableHighlight>
                        </View>
                        </View>
                    </Modal>
                    </View>


                    
                </ImageBackground>
                <KeyboardAvoidingView style={{ position: 'absolute', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', top: '50%' }}
                    behavior="padding">
                    <TextInput
                        placeholder="example@upb.edu.co"
                        keyboardType='email-address'
                        style={{ borderRadius: 13, height: 40, padding: 10, backgroundColor: 'rgba(255,255,255,0.86)', width: 300, color: '#95A5A6' }} />
                    <TouchableOpacity activeOpacity={0.8} onPress={() =>
                        this.state.checked ? this.props.navigation.navigate('Authentication') : this.setState({ color: 'red' })}>
                        <Image source={boton} style={{ width: 280, marginTop: 10, resizeMode: 'contain' }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '40%' }}>
                        <CheckBox
                            center
                            checked={this.state.checked}
                            onPress={() => this.setState({ checked: !this.state.checked, color: 'white' })}
                            checkedIcon='check-square'
                            uncheckedColor={this.state.color}
                            checkedColor='white'
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, margin: 0 }}
                            style={{flex: 1, padding: 0}}
                        />
                        <TouchableOpacity
                                onPress={() => {
                                    this.setModalVisible(!modalVisible);
                                }}
                            >
                        <Text style={{ color: this.state.color, fontSize: 12 }}>
                            Acepto los{" "}
                            
                            
                                <Text style={{ textDecorationLine: 'underline' }}>
                                términos y condiciones </Text>
                            
                        </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>);
    }
}

/*
<Text style={{ textDecorationLine: 'underline' }}>
                                términos y condiciones
                            </Text>

*/

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
    }
  });

export default withNavigation(LoginComponent)