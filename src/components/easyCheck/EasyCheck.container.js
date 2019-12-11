import React, { Component } from 'react';
import EsyCheckComponent from './easyCheck.component'
import {View} from 'react-native'
class EasyCheck extends Component {

        constructor(props){
            super(props)
        }


        render(){
            return(
                <View style={{flex:1}}>
                    <EsyCheckComponent jornada ={this.props.navigation.getParam('jornada')}/>
                </View>
            )
        }
}

export default EasyCheck