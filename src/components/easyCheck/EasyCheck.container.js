import React, { Component } from 'react';
import EsyCheckComponent from './easyCheck.component'
import {View} from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import FirebaseService from '../../services/firebaseService'

class EasyCheck extends Component {

        constructor(props){
            super(props)
        }

       async componentDidMount(){
            this.saveToken()
        }

       async  getPushToken(){
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
              );

              let finalStatus = existingStatus;
            
              // only ask if permissions have not already been determined, because
              // iOS won't necessarily prompt the user a second time.
              if (existingStatus !== 'granted') {
                // Android remote notification permissions are granted during the app
                // install, so this will only ask on iOS
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
              }
            
              // Stop here if the user did not grant permissions
              if (finalStatus !== 'granted') {
                return;
              }
            
              // Get the token that uniquely identifies this device
              let token = await Notifications.getExpoPushTokenAsync();
              return {token, existingStatus:existingStatus!="granted"};
        }

        async saveToken(){
            const {token, existingStatus} = await this.getPushToken()
            if (token != undefined && existingStatus){
                await FirebaseService.addDocument("tokens", {token})
            }
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