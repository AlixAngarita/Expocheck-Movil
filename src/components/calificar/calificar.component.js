import React, {useEffect, useState} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import { AirbnbRating } from 'react-native-elements';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const CalfificarComponent = props => {

  const [focus, setfocus] = useState(true)

  const keyboardDidHide = () => {
    setfocus(false)
  }

  const keyboardDidShow = () => {
    setfocus(true)
  }

    useEffect(() => {

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
    },[]);

    

    
    const styles = StyleSheet.create({
      cameraContainer: {
          margin:0,
          height: '115%',
          padding: 0,
      },
  
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
                
                { !props.ok && !props.hasQrCode && (
                   <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : props.handleBarCodeScanned}
                    style={[StyleSheet.absoluteFillObject, styles.cameraContainer]}
                    />
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
                {props.ok && !props.valid && (Alert.alert('Codigo invalido', 
                'El cosigo QR escaneado no es valido', 
                [{text: 'Scanear', onPress: () => props.scanear()}]))}
           </View>
    )
}

export default CalfificarComponent