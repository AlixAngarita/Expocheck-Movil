import React, {useEffect, useState} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Keyboard, Animated } from "react-native";
import { AirbnbRating, Image } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation'
const qrimage = require('../../../assets/images/qrcode.png')

const CalfificarComponent = props => {

  const [focus, setfocus] = useState(true)
  const [animated, setanimated] = useState(new Animated.Value(0)) 

  const keyboardDidHide = () => {
    setfocus(false)
  }

  const keyboardDidShow = () => {
    setfocus(true)
  }

 const runAnimateScanner = () => {
  Animated.loop(
    Animated.timing(animated,{
      toValue:1,
      duration:1300
    })
   ).start() 
  }
    useEffect(() => {
      runAnimateScanner()
      this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        keyboardDidShow,
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        keyboardDidHide,
      );

      return () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
      }
    });

    

    
    const styles = StyleSheet.create({
      ratingContainer:{
        flex:1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop:20
      },
      inputContainer:{
        flex: 1.7
        , 
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:focus ? 'center':'flex-end',
      },
      input:{
        borderColor:'#0abde3', 
        borderRadius:20, borderWidth:1, 
        padding:8, 
        width:'80%', 
        minHeight:45,
        maxHeight:100,
        color:'grey'
      }
     })
    const { hasCameraPermission, scanned } = props;

    const [value, onChangeText] = React.useState('');

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
           <View style={{flex:1}}>
                {props.granted && (
                  <React.Fragment>
                    { !props.ok && !props.hasQrCode && (
                   <View style={{flex: 1,backgroundColor: '#000000'}}>
                     <BarCodeScanner
                      onBarCodeScanned={scanned ? undefined : props.handleBarCodeScanned}
                      style={[StyleSheet.absoluteFillObject]}
                    />
                    <Animated.View 
                      style={{position:'relative', top:'50%', height:1, backgroundColor:'red',
                      opacity:animated.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1]  
                      })}}>

                    </Animated.View>
                    <Button 
                      onPress={() => props.navigation.goBack()}
                      type='clear'
                      containerStyle={{position:'relative', top:'90%'}}
                      title={"Cancelar"}
                      titleStyle={{color:'white', fontSize:20}}/>
                   </View>
                )}
                {props.ok && props.valid && (
                  <React.Fragment>
                    <View style={styles.ratingContainer}>
                        <AirbnbRating
                          count={5}
                          reviews={["Mala", "Aceptable", "Buena", "Muy buena", "Exelente"]}
                          defaultRating={props.calificada !='' ? props.calificada:0}
                          size={35}
                          isDisabled={props.calificada != ''}
                          onFinishRating={(rating) => props.calificar(rating)}
                        />
                        <Text style={{fontSize:10, color:'grey'}}>{props.calificada !='' ? 'Calificada':'Solo puede calificar una vez'}</Text>
                        
                    </View>
                    <KeyboardAvoidingView  style={styles.inputContainer}
                     behavior="padding" >
                      <TextInput
                      onChangeText={text => onChangeText(text)}
                      autoCapitalize="sentences"
                      autoCorrect={true}
                      value={value}
                      style={[styles.input, {marginBottom: focus ? 15: 10}]}
                      multiline={true}
                      autoFocus={true}
                      placeholder="Escribe algo..."
                      large={true}
                      />
                      <Button
                      buttonStyle={{backgroundColor:'#0abde3', borderRadius:50, marginBottom: focus ? 15: 10, width:45,height:45}}
                        icon={ <Icon
                          name='paper-plane'
                          size={18}
                          color='white'
                        />}
                        onPress={() => {
                          props.addComment(value)
                          onChangeText('')
                        }}
                      />
                    </KeyboardAvoidingView >
                  </React.Fragment>
                )}
                { !props.valid &&  !props.scanned && (
                  <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center' }}>
                      
                        <Text style={{color:'red', fontSize:20, marginBottom:20}}>Código no valido</Text>
                        <Image
                          source={qrimage}
                          style={{ width: 200, height: 200 }}
                        />
                        <Button 
                          buttonStyle={{backgroundColor:'#0abde3', marginTop:20}}
                          icon={
                          <Icon
                            name="qrcode"
                            size={40}
                            color="white"
                          />
                        }
                        type="solid" 
                        onPress={() => props.scanear()} ></Button>
                      
                  </View>
                )}
                {props.ok && !props.valid && (Alert.alert('Codigo invalido', 
                'El codigo QR escaneado no es valido', 
                [{ text: 'Cancelar'},{text: 'Scanear', onPress: () => props.scanear()}]))}
                  </React.Fragment>
                )}

                {!props.granted && (
                  <View style={{flex:1, flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:20, color:'grey', textAlign:'center', marginBottom:30, marginHorizontal:15}}>Permita que easy check pueda acceder a la camara del dispositivo.</Text>
                    <Button 
                    title="Permitir"
                    buttonStyle={{backgroundColor:'#0abde3'}}
                    onPress={() => props.pedirPermiso()}/>
                  </View>
                )}
           </View>
    )
}

export default withNavigation(CalfificarComponent)