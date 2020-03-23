import React, {useEffect, useState} from "react";
import {View, Text} from 'react-native'
import { Badge, Avatar} from 'react-native-elements'


const Calificar = (props) => {

    return (
        <View style={{alignItems:'center', justifyContent:'center', marginTop:20}}>
        <View style={{flexDirection:'row'}}>
        <View style={{marginRight:50, flexDirection:'column', alignItems:'center'}}>
              <Avatar
                rounded
                icon={{name: 'comments', type: 'font-awesome', color:'white'}}
                overlayContainerStyle={{backgroundColor: '#00A8FF'}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                size="medium"
              />
                <Text style={{color:'#95A5A6'}}>Comentarios</Text>
              <Badge
                status="success"
                containerStyle={{ position: 'absolute', top: 1, right: 4}}
                value={4}
              />
          </View>
          <View style={{flexDirection:'column', alignItems:'center'}}>
              <Avatar
                rounded
                icon={{name: 'question-circle', type: 'font-awesome', color:'white'}}
                overlayContainerStyle={{backgroundColor: '#00A8FF'}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                size="medium"
                su
              />
              <Text style={{color:'#95A5A6'}}>Preguntas</Text>

              <Badge
                status="error"
                containerStyle={{ position: 'absolute', top: 1, right: 4}}
                value={4}
              />
          </View>
        </View>
        </View>
    )
}

export default Calificar