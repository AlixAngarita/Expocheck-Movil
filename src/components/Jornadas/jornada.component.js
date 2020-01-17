import React from 'react'
import {FlatList, View, Text, StyleSheet, ActivityIndicator, Alert, TouchableHighlight, SafeAreaView, ScrollView } from 'react-native'
import { ListItem, Divider} from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import moment from 'moment';


const keyExtractor = (item, index) => index.toString()


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

    return (
        <View style={{flex:1}}>
            {
                props.jornadas.length > 0 &&
               <SafeAreaView>
                   <ScrollView>
                       {props.jornadas.map((item, index) => (
                           <TouchableHighlight
                           key={index.toString()}
                           onPress={() => callDate(item,props)}>
                              <ListItem
                                      key={item.titulo}
                                      title={item.titulo}
                                      subtitle={moment(item.fechaInicio).format('MMM D') + ' a ' + moment(item.fechaFinaliza).format('MMM D') + ' del ' + moment(item.fechaInicio).format('Y')}
                                      leftAvatar={{title:item.gradoJornada}}
                                      chevron
                                  />
                          </TouchableHighlight>
                       ))}
                   </ScrollView>
               </SafeAreaView>
            }

            { !props.loading && props.jornadas.length == 0  ?
                <View style={{ display:'flex',flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                         <Text style={{color:'grey'}}>No se encontraron jornadas.</Text>
                </View>:null
            }

            { props.loading  && props.jornadas.length == 0 ?
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>:null
            }
        </View>
    )
}

export default withNavigation(Jornada)