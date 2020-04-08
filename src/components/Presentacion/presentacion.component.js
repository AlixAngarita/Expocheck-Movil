import React,  {useEffect, useState} from "react";
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Avatar, Card, Divider  } from "react-native-elements";
import FlipCard from 'react-native-flip-card'
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Rating, Icon , AirbnbRating} from "react-native-elements";
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }
});
import Calificar from '../btnCalifcar/btnCalificar.component'

const width = Dimensions.get("window").width;
const Presentacion = props => {

  const [codeQR, setcodeQR] = useState('')

  useEffect(() => {
    props.hasCode().then(code => setcodeQR(code))
    
  })

  const calificada = (metrica) => {
    let calificacion = {califico:false, valor:0}
    
    props.presentacion.evaluaciones.map(evaluacion => {
      if(evaluacion.nombre == metrica && evaluacion.autor == props.autor){
        calificacion.califico = true
        calificacion.valor = evaluacion.valor
      }
    })
    return calificacion
  }
  
  return (
    <View style={styles.container}>
      {props.presentacion != "" && !props.loading && (
        <ScrollView showsVerticalScrollIndicator={false}>
           <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              alignContent: "center"
            }}
          >
            <View
              style={{
                marginHorizontal:20,
                marginTop: 10,
                width:'96%',
                borderRadius:20,
                backgroundColor:'#48DBFB'
              }}
            >
              <Text style={{  fontSize: 25, color:'white', textAlign:'center', marginTop:20 }}>
                {props.presentacion.titulo}
              </Text>
              {/* <Text style={{ color: "grey", fontSize: 20 }}>Integrantes</Text> */}
              <View style={{ alignItems: "center", marginTop:10}}>
                {props.presentacion.integrantes.map((integrante, i) => (
                  <View
                   key={i.toString()}
                    style={{
                      marginTop:5,
                      width:'96%',
                      borderRadius: 20,
                      padding: 5,
                      flexWrap: "nowrap",
                      backgroundColor:'white'
                    }}
                  >
                    <View style={{ flexDirection: "row", padding:2 }}>
                      <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                        <View>
                          <Avatar
                            size="small"
                            rounded
                            title={(i + 1).toString()}
                            activeOpacity={0.7}
                            containerStyle={{
                              borderColor: "#95A5A6",
                              borderStyle: "dashed",
                              borderWidth: 1
                            }}
                          />
                        </View>
                      </View>
                      <View style={{ justifyContent: "center" }}>
                        <Text style={{ color: "#95A5A6", fontSize: 18 }}>
                          {integrante.nombre}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            
             <Calificar   presentacion={props.presentacion} hasCode={props.hasCode} idJornada={props.idJornada}/>
            </View>

            <View style={{marginTop:30}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                <View style={{justifyContent:'center'}}>
                  <Icon
                  name='check'
                  type='font-awesome'
                  color='#fbc531' />
                </View>
                <Text style={{color:'grey', textAlign:'center', fontSize:20,
                  marginLeft:10}}>Calificaciones del auditorio</Text>
              </View>
              <Divider style={{marginBottom:5}}/>
            </View>

              <View style={{ flexDirection: "row", padding:2,
              width:'90%',
              marginTop:10,
              borderRadius:20,
              backgroundColor:'#00A8FF'}}>
                  <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                    <View>
                      <Icon
                      raised
                      name='arrow-up'
                      type='font-awesome'
                      color='#44BD32' />
                    </View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        Por encima de la media
                      </Text>
                  </View>
              </View>

            <View style={{marginBottom:10}}>
                {props.evaluacionPublica ? (
                  <ScrollView  showsVerticalScrollIndicator={false}>
                    {props.evaluaciones.map((evaluacion, i) => (
                      <FlipCard
                          style={{marginBottom:5}}
                          key={(i).toString()}>
                          {/* Face Side */}
                          <View  style={{ padding:2,
                          width:width-30,
                          marginTop:5,
                          borderRadius:20,
                          borderColor:'#48DBFB',
                          borderStyle:'solid',
                          borderWidth:1 }}>
                                <Text style={{textAlign:'center', fontSize:20, color:'grey'}}>{evaluacion.metrica} </Text>
                                <View  style={{ alignItems:'center'}}>
                                  <Rating
                                      startingValue={evaluacion.calificaciones.length > 0 ? (evaluacion.calificaciones.reduce((a, b) => a+b,0))/evaluacion.calificaciones.length:0}
                                      imageSize={30}
                                      type="custom"
                                      readonly
                                      fractions={0.5}/>
                                </View>
                        </View>
                          {/* Back Side */}
                          <View  style={{ padding:2,
                          width:width-30,
                          marginTop:10,
                          borderRadius:20,
                          borderColor:'#00A8FF',
                          borderStyle:'solid',
                          borderWidth:1 }}>
                                <View  style={{ alignItems:'center'}}>
                                  {codeQR != '' ? (
                                  <React.Fragment>
                                    <AirbnbRating
                                      style={{marginTop:5, fontSize:20}}
                                      defaultRating={calificada(evaluacion.metrica).califico ? calificada(evaluacion.metrica).valor:0}
                                      showRating={false}
                                      count={5}
                                      onFinishRating={(valor) => props.calificar(evaluacion.metrica,valor)}/>
                                    {calificada(evaluacion.metrica).califico && (
                                          <Text style={{color:'grey', marginVertical:5}}>Calificada</Text>
                                    )}
                                  </React.Fragment>):(
                                    <View style={{flexDirection:'column', alignItems:'center'}}>
                                      <Icon
                                        raised
                                        name='qrcode'
                                        type='font-awesome'
                                        color='#00A8FF'
                                        onPress={() => {
                                          props.navigation.navigate('Calificar', {presentacion:props.presentacion, hascode: props.hasCode(), idJornada:props.idJornada, back:true}) 
                                        } } />
                                        <Text style={{color:'grey'}}>Escanear código QR</Text>
                                    </View>
                                  )}
                                </View>
                        </View>
                              
                      </FlipCard>
                    
                    ))}
                  </ScrollView>
                ):(
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {props.evaluaciones.map((evaluacion, i) => (
                      <FlipCard
                        style={{marginBottom:5}}
                        key={(i+3).toString()}>
                          <View style={{ flexDirection: "row", padding:2,
                          width:width-30,
                          marginTop:5,
                          borderRadius:20,
                          backgroundColor:'#48DBFB' }}>
                              <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                                <View>
                                  <Icon
                                  raised
                                  name='arrow-up'
                                  type='font-awesome'
                                  color='#44BD32'/>
                                </View>
                              </View>
                              <View style={{ justifyContent: "center" }}>
                                <Text style={{ color: "white", fontSize: 18 }}>
                                  {evaluacion.metrica}
                                </Text>
                              </View>
                          </View>

                          {/* Back Side */}
                          <View  style={{ padding:2,
                          width:width-30,
                          marginTop:10,
                          borderRadius:20,
                          borderColor:'#00A8FF',
                          borderStyle:'solid',
                          borderWidth:1 }}>
                                <View  style={{ alignItems:'center'}}>
                                  {codeQR != '' ? (
                                  <React.Fragment>
                                    <AirbnbRating
                                      style={{marginTop:5}}
                                      defaultRating={calificada(evaluacion.metrica).califico ? calificada(evaluacion.metrica).valor:0}
                                      showRating={false}
                                      count={5}
                                      onFinishRating={(valor) => props.calificar(evaluacion.metrica,valor)}/>
                                    {calificada(evaluacion.metrica).califico && (
                                          <Text style={{color:'grey', marginVertical:5}}>Calificada</Text>
                                    )}
                                  </React.Fragment>):(
                                    <View style={{flexDirection:'column', alignItems:'center'}}>
                                      <Icon
                                        raised
                                        name='qrcode'
                                        type='font-awesome'
                                        color='#00A8FF'
                                        onPress={() => {
                                          props.navigation.navigate('Calificar', {presentacion:props.presentacion, hascode: props.hasCode(), idJornada:props.idJornada, back:true}) 
                                        } } />
                                        <Text style={{color:'grey'}}>Escanear código QR</Text>
                                    </View>
                                  )}
                                </View>
                        </View>
                      </FlipCard>
                    ))}
                  </ScrollView>
                )}
            </View>
          </View>

          
        </ScrollView>
      )}

      {!props.loading && props.presentacion == "" ? (
        <View
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: "grey", fontSize: 17 }}>
            No hay una presentación agendada.
          </Text>
        </View>
      ) : null}

      {props.loading && props.presentacion == "" && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

export default withNavigation(Presentacion);
