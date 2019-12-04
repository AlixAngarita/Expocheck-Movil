import React, { Component } from 'react';
import EsyCheckComponent from './easyCheck.component'
import {View} from 'react-native'
class EasyCheck extends Component {

        constructor(props){
            super(props)
        }

        // static navigationOptions  ={
        //     headerShown:false
        // }

        render(){
            return(
                <View style={{flex:1}}>
                    <EsyCheckComponent/>
                </View>
            )
        }
}

export default EasyCheck