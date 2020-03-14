import React,{useEffect} from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableHighlight, SafeAreaView, ScrollView } from 'react-native'
import { Icon} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import {Dimensions} from 'react-native'
import FlipCard from 'react-native-flip-card'
import {useSelector, useDispatch} from 'react-redux'
import {getJornadasThunk} from '../../redux/actions/jornadas.action'
import {setStateConection} from '../../redux/actions/offline.action'
import NetInfo from '@react-native-community/netinfo';
import {store} from '../../redux/store'
import {StatusBar, Platform} from 'react-native';

const styles = StyleSheet.create({
    titulo:{
       color:'grey',
       textAlign:'center'
    },
    loading:{
        flex:1,
        flexDirection:'column', 
        alignItems:'center', 
        justifyContent:'center'
    }
})
import { Avatar } from 'react-native-elements';

const now = moment().format('YYYY-MM-DD')

const callDate = (item,props) => {
    moment(now).isBetween( moment(item.fechaInicio), moment(item.fechaFinaliza),  null, '[]') ?
        props.navigation.navigate('EasyCheck',{id:item._id})
        :Alert.alert('Fuera de fecha', 'Solo podra ver la agenda y listar las presentaciones.',
        [
        {text: 'OK', onPress: () => props.navigation.navigate('EasyCheck',{id:item._id})},
        ])
}



const Jornada = props => {
    let jornadas = useSelector(state => state.jornadas);
    let dispatch = useDispatch();
   
    useEffect(() => {

        NetInfo.fetch().then(state => {
             // si no esta conectado rehidrata el estado persistido
            if(!state.isConnected){
                dispatch(getJornadasThunk(store.getState().jornadas))
            }

            // si esta conectado sigue con las acciones para consultar la data actualizada
            dispatch(getJornadasThunk())
        });

        // suscripción para estar pendiente del cambio en la conexion
        const unsubscribe = NetInfo.addEventListener(state => {
              // guardo el estado inicial de la conexion en el storage 
              dispatch(setStateConection(state.isConnected))
        });

        return () => {
            unsubscribe();
        }
    }, [])

    const heightStatusBar = StatusBar.currentHeight
    const heightScreen = Dimensions.get('window').height
    return (
        <View style={{flex:1 , justifyContent: 'center', alignItems: 'center' }}>
            <View style={{backgroundColor:'#F1F2F6', width:'90%',
                ...Platform.select({
                ios: {
                    height:heightScreen  - 50
                },
                android: {
                    height:heightScreen  - 50
                }}),
                marginTop:Platform.OS === 'adroid' ? '10%':heightStatusBar,
                borderRadius:20, alignItems:'center',
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5}}>
                {
                    jornadas.length > 0 &&
                    <View >
                        <Text style={{fontSize:20, color:'grey', textAlign:'center', marginVertical:5}}>Seleccione una Jornada</Text>
                        <ScrollView showsVerticalScrollIndicator={false} >
                        {jornadas.map((item, index) => (
                                
                                    <FlipCard
                                        style={{marginBottom:10}}
                                        key={index.toString()}>
                                        {/* Face Side */}
                                            <View style={{flex:1, borderRadius:20, flexDirection:'row', alignItems:'center',        
                                                backgroundColor:'white',
                                                width:Dimensions.get('window').width - 50}}>
                                                <View style={{marginHorizontal:10}}>
                                                    <Avatar
                                                        size="small"
                                                        rounded
                                                        title="XV"
                                                        activeOpacity={0.7}
                                                        />
                                                </View>
                                                <View style={{flex:1, flexDirection:'column', minHeight:50}}>
                                                    <Text style={{fontSize:18}}>{item.titulo}</Text>
                                                    <Text style={{color:'grey', marginBottom:5}}>
                                                        {moment(item.fechaInicio).format('MMM D') + ' a ' + moment(item.fechaFinaliza).format('MMM D') + ' del ' + moment(item.fechaInicio).format('Y')}
                                                    </Text>
                                                </View>
                                                <View style={{marginHorizontal:10}}>
                                                    <Icon  type='font-awesome' size={30}
                                                        name='arrow-circle-right'color='#48DBFB' 
                                                        onPress={() => callDate(item,props)} />
                                                </View>
                                        </View>
                                        {/* Back Side */}
                                                <View style={{borderRadius:20,
                                                    backgroundColor:'white',
                                                    width:Dimensions.get('window').width - 50,
                                                    flex:1, flexDirection:'column',
                                                    flexWrap:'nowrap',
                                                    padding:10}}>
                                                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                                                        <Icon  type='font-awesome' size={20}
                                                        name='arrow-circle-left'color='#48DBFB' />
                                                        <Text style={{fontSize:18, marginLeft:10}}>Descripción</Text>
                                                    </View>
                                                    <Text
                                                    style={{color:'grey'}}>Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final</Text>
                                                </View>
                                    </FlipCard>
                            ))}
                        </ScrollView>     
                    </View>
                }
                { !props.loading && jornadas.length == 0  ?
                <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <Text style={{color:'grey'}}>No se encontraron jornadas.</Text>
                    </View>:null
                }

                { props.loading  && jornadas.length == 0 ?
                    <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>:null
                }
            </View>
        </View>
    )
}

export default withNavigation(Jornada)