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
              return {token};
        }

        existToken(token) {
            return new Promise((resolve, reject) => {
                FirebaseService.getDocuments('tokens')
                .then(tokens => {
                    tokens.map(to => console.log(to))
                    exist = tokens.some(current_token => current_token.token == token)
                    console.log(exist)
                    resolve(exist)
                }).catch(err => reject(err))
            })
        }

        async saveToken(){
            const {token} = await this.getPushToken()
            this.existToken(token).then( async exist => {
                if (!exist){
                    await FirebaseService.addDocument("tokens", {token})
                    console.log('se guardo')
                }
            })
            
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