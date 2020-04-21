import React, {useEffect, useState} from "react";
import {View, Text, Alert, TouchableWithoutFeedback} from 'react-native'
import { Badge, Avatar} from 'react-native-elements'
import { withNavigation } from 'react-navigation';



const Calificar =  (props) => {
    return (
        <View style={{alignItems:'center', justifyContent:'center', marginTop:20, marginBottom:20}}>
        <View style={{flexDirection:'row'}}>
          <View style={{marginRight:50, flexDirection:'column', alignItems:'center'}}>
                <Avatar
                  rounded
                  icon={{name: 'comments', type: 'font-awesome', color:'white'}}
                  overlayContainerStyle={{backgroundColor: '#00A8FF'}}
                  onPress={() => {
                    if(!props.listado){
                      props.navigation.navigate('Calificar', {presentacion:props.presentacion, hascode: props.hasCode(), idJornada:props.idJornada, comment:true})
                    }
                  }}
                  activeOpacity={0.7}
                  size="medium"
                />
                  <Text style={{color:'white'}}>Comentarios</Text>
                <Badge
                  status="success"
                  containerStyle={{ position: 'absolute', top: 1, right: 4}}
                  value={props.presentacion.comentarios.length}
                />
            </View>
          <View style={{flexDirection:'column', alignItems:'center'}}>
              <Avatar
                rounded
                icon={{name: 'question-circle', type: 'font-awesome', color:'white'}}
                overlayContainerStyle={{backgroundColor: '#00A8FF'}}
                onPress={() => {
                  if(!props.listado){
                    props.navigation.navigate('Calificar', {presentacion:props.presentacion, hascode: props.hasCode(), idJornada:props.idJornada, 
                      comment:false, listado:props.listado}) 
                  }
                } 
              }
                activeOpacity={0.7}
                size="medium"
                su
              />
              <Text style={{color:'white'}}>Preguntas</Text>

              <Badge
                status="error"
                containerStyle={{ position: 'absolute', top: 1, right: 4}}
                value={props.presentacion.preguntas.length}
              />
          </View>
        </View>
        </View>
    )
}

export default withNavigation(Calificar)