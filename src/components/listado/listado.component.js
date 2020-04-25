import React from "react";
import { View, FlatList, StyleSheet,  Text, ActivityIndicator, Dimensions, TouchableOpacity} from "react-native";
import { withNavigation } from 'react-navigation';
import Calificar from '../btnCalifcar/btnCalificar.component'
import {Icon} from 'react-native-elements'
const styles = StyleSheet.create({
    presentacionContainer:{
        flexDirection:'row',
        marginLeft:0
    },
    loading:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center'
    }
})

const getCalificacionesPorMetricaPublico = (presentacion, jornada) => {
    let evaluaciones = {}
    let total_ponderado = 0;
    jornada.metricas.map(metrica => {
      let valores_calificacion_metrica_actual = 0;
      let cantidad_calificaciones = 0;
  
      if(presentacion.evaluaciones.length > 0){
        presentacion.evaluaciones.map(evaluacion => {
          if(evaluacion.nombre == metrica.nombre){
            valores_calificacion_metrica_actual += evaluacion.valor;
            cantidad_calificaciones += 1;
          }
        })
      }
  
      let ponderado = cantidad_calificaciones != 0 ? valores_calificacion_metrica_actual/cantidad_calificaciones:0;
      if(!isNaN(ponderado)){
        evaluaciones[metrica.nombre] = ponderado;
        total_ponderado += ponderado;
      }else{
        evaluaciones[metrica.nombre] = undefined;
      }
      
      
      
    })
    
    
      return {acumulado:(total_ponderado/Object.keys(evaluaciones).length),metricas:evaluaciones}
    
    
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

const keyExtractor = (item, index) => index.toString()

const renderItem =  ({ item }, props) => {
    const ponderado =  getCalificacionesPorMetricaPrivado(item, props.jornada)
    
    return (
        <TouchableOpacity 
        activeOpacity={0.8}
        onPress={()=> props.navigation.push('Presentación',{presentacion:item, jornada:props.jornada})}>
                <View style={{ minHeight:200, width:Dimensions.get('window').width-20, flexDirection:'column', 
                    marginTop:10,
                    borderRadius:20,
                    justifyContent:'center',
                    backgroundColor:'#48DBFB'}}>
                    <Text style={{textAlign:'center', fontSize:20, color:'white', marginTop:20}}>{item.titulo.toUpperCase()}</Text>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                    {ponderado!= '' && 
                        (
                        <View style={{ flexDirection: "row", padding:2,
                        width:'90%',
                        marginTop:10,
                        borderRadius:20,
                        backgroundColor:'#00A8FF'}}>
                            <View style={{ marginHorizontal: 10, justifyContent: "center"}}>
                                <View>
                                {ponderado.acumulado == 1 && <Icon
                                size={15}
                                raised
                                name='arrow-up'
                                type='font-awesome'
                                color='#44BD32' />}
                                
                                {ponderado.acumulado == 0 && <Icon
                                raised
                                size={15}
                                name='balance-scale'
                                type='font-awesome'
                                color='#0984e3' />}
    
                                {ponderado.acumulado == -1 && <Icon
                                size={15}
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
                    </View>
                    <Calificar listado={true}  presentacion={item}  idJornada={props.jornada._id}/>
                </View>
        </TouchableOpacity>
    )
}
    

 

const Listado = props => {

    return (
        <View style={{flex:1,  marginBottom:20}}>
           
            {
                props.listado.length > 0 && !props.loading? 
                (<View style={{flex:1, flexDirection:'column', alignItems:'center',}}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    data={props.listado}
                    renderItem={(item) => renderItem(item,props)}
                    />
                </View>) :null
            }
            {
                props.loading && props.listado.length == 0 &&
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            }
            { !props.loading && props.listado.length == 0  ?
                <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <Text style={{color:'grey', fontSize:17}}>No hay presentaciones.</Text>
                </View>:null
            }
        </View>
    )
}

export default withNavigation(Listado)