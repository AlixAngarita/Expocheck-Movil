import React, { Component } from 'react';
import EsyCheckComponent from './easyCheck.component'
import {View} from 'react-native'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {getTokens, addToken} from '../../services/user.service'
import { connect } from 'react-redux';

class EasyCheck extends Component {

        constructor(props){
            super(props)
            this.state = {
                notification: {},
            };
        }

       async componentDidMount(){
            this.saveToken()
            this._notificationSubscription = Notifications.addListener(this._handleNotification)
        }

        _handleNotification = notification => {
            this.setState({ notification: notification });
        };

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
                getTokens()
                .then(async res => {
                    const tokenList = res.data
                    tokens = await tokenList.map(t => t.token)
                    exist = await tokens.includes(token)
                    resolve(exist)
                }).catch(err => reject(err))
            })
        }

        async saveToken(){
            const {token} = await this.getPushToken()
            this.existToken(token).then( async exist => {
                if (!exist){
                    await addToken(this.props.user._id, token)
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

function mapStateToProps(state) {
    const { auth, connect, idJornada } = state
    return { user: auth.user, connect, idJornada}
}

export default connect(mapStateToProps)(EasyCheck)