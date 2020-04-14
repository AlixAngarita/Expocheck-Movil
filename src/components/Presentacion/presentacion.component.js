import React,  {useEffect, useState,} from "react";
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
import { Avatar, Card, Divider  } from "react-native-elements";
import FlipCard from 'react-native-flip-card'
import {useSelector} from 'react-redux'
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
import { Video } from 'expo-av';
import Calificar from '../btnCalifcar/btnCalificar.component'

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const getCalificacionesPorMetricaPublico = (presentacion, jornada) => {
  let evaluaciones = {}
  let total_ponderado = 0;
  jornada.metricas.map(metrica => {
    let valores_calificacion_metrica_actual = 0;
    let cantidad_calificaciones = 0;
    presentacion.evaluaciones.map(evaluacion => {
      if(evaluacion.nombre == metrica.nombre){
        valores_calificacion_metrica_actual += evaluacion.valor;
        cantidad_calificaciones += 1;
      }
    })
    let ponderado = valores_calificacion_metrica_actual/cantidad_calificaciones;
    if(!isNaN(ponderado)){
      evaluaciones[metrica.nombre] = ponderado;
      total_ponderado += ponderado;
    }else{
      evaluaciones[metrica.nombre] = undefined;
    }
    
    
    
  })
  
  
  if(presentacion.evaluaciones.length>0){
    return {acumulado:(total_ponderado/Object.keys(evaluaciones).length),metricas:evaluaciones}
  }
  
}

const getCalificacionesPorMetricaPrivado = (presentacion, jornada) => {
  let ponderado = getPönderado(jornada)
  let calificaciones = getCalificacionesPorMetricaPublico(presentacion,jornada)
  let metricas = Object.keys(ponderado.metricas)
  metricas.map(metrica =>{
    if(calificaciones.metricas[metrica]>ponderado.metricas[metrica]){
      calificaciones.metricas[metrica] = 1
    }
    else if(calificaciones.metricas[metrica] == ponderado.metricas[metrica]){
      calificaciones.metricas[metrica] = 0
    }
    else if(calificaciones.metricas[metrica]<ponderado.metricas[metrica]){
      calificaciones.metricas[metrica] = -1
    }
    else{
      calificaciones.metricas[metrica] = undefined;
    }
  })
  if(calificaciones.acumulado>ponderado.acumulado){
    calificaciones.acumulado = 1
  }
  else if(calificaciones.acumulado==ponderado.acumulado){
    calificaciones.acumulado = 0
  }
  else{
    calificaciones.acumulado = -1
  }
  console.log(calificaciones)
  return calificaciones
}

const getPönderado = (jornada) =>{
  let ponderado = {}
  let cantidad = {}
  jornada.metricas.map(metrica =>{
      ponderado[metrica.nombre] = 0
      cantidad[metrica.nombre] = 0
  })
  
  let presentaciones = []
  jornada.presentaciones.map(presentacion =>{
      let presentacion_actual = getCalificacionesPorMetricaPublico(presentacion,jornada);
      if(!(typeof presentacion_actual === 'undefined')){
      presentaciones.push(presentacion_actual)
      }    
  });
  presentaciones.map(presentacion =>{
      jornada.metricas.map(metrica => {
      let valor_actual = presentacion.metricas[metrica.nombre]
      if(!(typeof valor_actual === 'undefined')){
          ponderado[metrica.nombre] += valor_actual
          cantidad[metrica.nombre] += 1
      }
      
      })
  })
  let ponderado_total = 0
  jornada.metricas.map(metrica =>{
      let valor_actual = ponderado[metrica.nombre]
      if(!(typeof valor_actual === 'undefined')){
      ponderado[metrica.nombre] = valor_actual/cantidad[metrica.nombre]
      if(cantidad[metrica.nombre]>0){
          ponderado_total += (valor_actual/cantidad[metrica.nombre])
      }
      
      }
      
  })
  
  return {acumulado:(ponderado_total/Object.keys(cantidad).length),metricas:ponderado}

}

const Presentacion = props => {

  const [codeQR, setcodeQR] = useState('')
  const [ponderado, setponderado] = useState('')
  const [integrantes, setintegrantes] = useState([])
  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    props.hasCode().then(code => setcodeQR(code))
    // const timer =  setInterval(() =>  props.setPresentacion(), 60000)
    if(props.presentacion != ''){
      setintegrantes(props.presentacion.integrantes.map(int => int.nombre.toUpperCase()))
      setponderado(getCalificacionesPorMetricaPrivado(props.presentacion, props.jornada))
    }
    return () => {
      // clearTimeout(timer);
    }
    
  }, [props.presentacion, props.jornada])


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
              <Text style={{  fontSize: 25, color:'white', textAlign:'center', marginTop:20 , padding:10}}>
                {props.presentacion.titulo.toUpperCase()}
              </Text>
              
              {props.presentacion.video != '' && !props.loadingVideo ? (
                <Video
                source={{ uri: props.presentacion.video }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                isLooping={false}
                useNativeControls
                style={{ width:'100%', height: height/3 }}
              />
              ):(
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
              )}
             <Calificar   presentacion={props.presentacion} hasCode={props.hasCode} idJornada={props.idJornada}/>
            </View>

            

            <View style={{marginTop:30}}>
              <View style={{flexDirection:'row', marginBottom:10}}>
                {/* <View style={{justifyContent:'center'}}>
                  <Icon
                  name='check'
                  type='font-awesome'
                  color='#fbc531' />
                </View> */}
                <Text style={{color:'grey', textAlign:'center', fontSize:20}}>Ponderación global</Text>
              </View>
              <Divider style={{marginBottom:5}}/>
            </View>

            {ponderado!= '' && 
            (
              <View style={{ flexDirection: "row", padding:2,
              width:'90%',
              marginTop:10,
              borderRadius:20,
              backgroundColor:'#48dbfb'}}>
                  <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                    <View>
                      {ponderado.acumulado == 1 && <Icon
                      raised
                      name='arrow-up'
                      type='font-awesome'
                      color='#44BD32' />}
                      
                      {ponderado.acumulado == 0 && <Icon
                      raised
                      name='balance-scale'
                      type='font-awesome'
                      color='#0984e3' />}

                    {ponderado.acumulado == -1 && <Icon
                                          raised
                                          name='arrow-down'
                                          type='font-awesome'
                                          color='#e84118' />}
                    </View>
                  </View>
                  <View style={{ justifyContent: "center" }}>
                      <Text style={{ color: "white", fontSize: 18 }}>
                        {ponderado.acumulado == 1 && 'Por encima de la media'}
                        {ponderado.acumulado == -1 && 'Por debajo de la media'}
                        {ponderado.acumulado == 0 && 'En la media ponderada'}
                      </Text>
                  </View>
              </View>
            )}

          <View style={{marginTop:10}}>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                          <View style={{flexDirection:'row'}}>
                            <View style={{justifyContent:'center'}}>
                              <Icon
                              name='check'
                              type='font-awesome'
                              color='#fbc531' />
                            </View>
                            <Text style={{color:'grey', textAlign:'center', fontSize:20,
                              marginLeft:6}}>Metricas de evaluación
                            </Text>
                          </View>
                          {!props.evaluacionPublica && 
                          (<Text style={{color:'grey',textAlign:'center', fontSize:12, marginBottom:5}}>
                            La evaluación es privada (solo puede ver su ponderado)
                          </Text>)}
                        </View>
                        <Divider style={{marginBottom:5}}/>
            </View>
            <View style={{marginBottom:10}}>
                {props.evaluacionPublica || integrantes.includes(user.nombre.toUpperCase()) ? (
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
                    {ponderado != '' && (
                      <View>
                        {props.evaluaciones.map((evaluacion, i) => (
                      <FlipCard
                        style={{marginBottom:5}}
                        key={(i+3).toString()}>
                          <View style={{ flexDirection: "row", padding:2, paddingRight:5,
                          width:width-30,
                          marginTop:5,
                          borderRadius:20,
                          backgroundColor:ponderado.metricas[evaluacion.metrica] == 1 || ponderado.metricas[evaluacion.metrica] == 0 ? '#4cd137':'#e84118' 
                          }}>
                              <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                                <View>
                                {ponderado.metricas[evaluacion.metrica] == 1 && <Icon
                                raised
                                name='arrow-up'
                                type='font-awesome'
                                color='#44BD32' />}
                                
                                {isNaN(ponderado.metricas[evaluacion.metrica])&& <Icon
                                raised
                                name='eye-slash'
                                type='font-awesome'
                                color='#e84118' />}

                                {ponderado.metricas[evaluacion.metrica] == 0 && <Icon
                                                      raised
                                                      name='balance-scale'
                                                      type='font-awesome'
                                                      color='#0984e3' />}

                                { ponderado.metricas[evaluacion.metrica] == -1 && <Icon
                                                      raised
                                                      name='arrow-down'
                                                      type='font-awesome'
                                                      color='#e84118' />}
                                </View>
                              </View>
                              <View style={{flex:1, justifyContent: "center", flexWrap:'nowrap'}}>
                                <Text style={{ color: "white", fontSize: 18}}>
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
                      </View>
                    )}
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
