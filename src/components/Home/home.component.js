import React from "react";
import {Avatar, Button} from 'react-native-elements'
import { View, StyleSheet, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    avatarContainer:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    texMuted:{
        color:'grey',
        textAlign:'center'
    },
    creditContainer:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'center',
        position:'absolute',
        bottom:5,
        left:'25%'
    },
    easyText:{
        color:'grey',
        textAlign:'center'
    },
    textEasyContainer:{
        flex:0.2,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    easy:{
        flex:1,
         flexDirection:'column', 
         justifyContent:'center', 
         alignItems:'center',
         marginTop:1
    }
})

const Home = props => {
 return(
     <View style={styles.container}>
         <View style={styles.avatarContainer}>
             <Avatar 
             size="xlarge"
             source={{uri:'https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/logo.jpeg?alt=media&token=a9b3c664-96dc-46d5-bc6d-215f233d11b9'}}/> 
           
            <View style={{marginTop:20}}>
                <View style={{ flexDirection:'row'}}>
                    <Icon name="star" size={30} color="#f1c40f" />
                    <Icon name="star" size={30} color="#f1c40f" />
                    <Icon name="star" size={30} color="#f1c40f" />
                    <Icon name="star" size={30} color="#f1c40f" />
                    <Icon name="star" size={30} color="#f1c40f" />
                </View>
                 <Text style={styles.texMuted}>
                     Califica
                </Text>
            </View>

            <View style={{marginTop:20}}>
                <Icon  name="comments" size={35} color="#0abde3" />
            </View>

            <View style={{marginTop:20}}>
                <Button
                    onPress={() => props.navigation.navigate('Jornadas')}
                    title="Comienza!"
                    type="outline"
                />
            </View>
         </View>
         <View style={styles.creditContainer}>
            <Text style={styles.texMuted}>Created by Deiver Carrascal</Text>
         </View>
     </View>
 )
}

export default withNavigation(Home);
