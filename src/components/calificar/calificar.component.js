import React, {useEffect, useState} from "react";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Text, View, StyleSheet, Alert, TextInput, KeyboardAvoidingView, Keyboard, Animated,
Platform, Dimensions, StatusBar} from "react-native";
import { Image, Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {withNavigation} from 'react-navigation'
import {ScrollView} from 'react-native'
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
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'center',
        alignItems:focus ? 'center':'flex-end',
        marginBottom:focus ? 30:5
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
    const heightStatusBar = StatusBar.currentHeight
    const heightScreen = Dimensions.get('window').height

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
           <View style={{flex:1 , justifyContent: 'center', alignItems: 'center' }}>
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
                  <View style={{backgroundColor:'#F1F2F6', width:'90%',marginTop:Platform.OS === 'adroid' ? '10%':heightStatusBar,
                  borderRadius:20, alignItems:'center',
                  shadowColor: "#000",
                  shadowOffset: {
                      width: 0,
                      height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                    ...Platform.select({
                    ios: {
                        height:heightScreen  - 50
                    },
                    android: {
                        height:heightScreen  - 50
                    }})}}>
                    {/* <View style={styles.ratingContainer}>
                        <AirbnbRating
                          count={5}
                          reviews={["Mala", "Aceptable", "Buena", "Muy buena", "Exelente"]}
                          defaultRating={props.calificada !='' ? props.calificada:0}
                          size={35}
                          isDisabled={props.calificada != ''}
                          onFinishRating={(rating) => props.calificar(rating)}
                        />
                        <Text style={{fontSize:10, color:'grey'}}>{props.calificada !='' ? 'Calificada':'Solo puede calificar una vez'}</Text>
                        
                    </View> */}
                   
                    <KeyboardAvoidingView 
                     behavior="padding" >
                      <Text style={{fontSize:20, color:'grey', textAlign:'center', marginVertical:10}}>{props.comment ? 'Comentarios':'Preguntas'}</Text>
                      <Divider style={{marginBottom:5}}/>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {!props.comment && (
                          <View style={{flex:1, borderRadius:20, flexDirection:'column', alignItems:'center',
                            marginVertical:10}}>
                            {props.presentacion.preguntas.length == 0 && (
                              <Text style={{color:'#95A5A6', fontSize:20, textAlign:'center', marginVertical:20}}>Sé el primero en decir algo!.</Text>
                            )}

                            {props.presentacion.preguntas.map((pregunta, i) => (
                              <View key={i.toString()} style={{backgroundColor:'white', width:Dimensions.get('window').width - 50,
                              borderRadius:20, padding:10, marginVertical:5}}>
                                      <Text style={{color:'#95A5A6'}}>{pregunta.contenido}</Text>
                              </View>
                            ))}

                          </View>
                        )}
                        
                        {props.comment && (
                          <View style={{flex:1, borderRadius:20, flexDirection:'column', alignItems:'center',
                            marginVertical:10}}>
                            {props.presentacion.comentarios.length == 0 && (
                              <Text style={{color:'#95A5A6', fontSize:20, textAlign:'center', marginVertical:20}}>Sé el primero en decir algo!.</Text>
                            )}
                            {props.presentacion.comentarios.map((comentario, i) => (
                              <View key={i.toString()} style={{backgroundColor:'white', width:Dimensions.get('window').width - 50,
                              borderRadius:20, padding:10, marginVertical:5}}>
                                      <Text style={{color:'#95A5A6'}}>{comentario.contenido}</Text>
                              </View>
                            ))}
                          </View>
                        )}
                      </ScrollView>
                      
                      <View style={styles.inputContainer}>
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
                          buttonStyle={{backgroundColor:'#0abde3', borderRadius:50, marginBottom: focus ? 15: 10, width:45,height:45,
                          marginLeft:10}}
                            icon={ <Icon
                              name='paper-plane'
                              size={18}
                              color='white'
                            />}
                            onPress={() => {
                              if(props.comment)
                                  props.addComment(value)
                              else
                                  props.addQuestion(value)
                              onChangeText('')
                            }}
                          />
                      </View>
                      
                    </KeyboardAvoidingView >
                  </View>
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