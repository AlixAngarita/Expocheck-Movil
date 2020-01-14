import React from "react";
import {Button} from 'react-native-elements'
import { View, StyleSheet, Text, Image} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation } from 'react-navigation';
import { SliderBox } from "react-native-image-slider-box";


const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-around',
        backgroundColor:'#ecf0f1'
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

const images = [
  "https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/Calificar%20presentaci%C3%B3n.png?alt=media&token=87b0948e-78cb-4bb8-bf50-6433958a57bc"
]

const Home = props => {
 return(
     <View style={styles.container}>

        <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/icon%20-%20prod.png?alt=media&token=1e11c661-16db-4623-8fdf-a49c8cddf734'}} style={{width: 150, height: 150}} />
        </View>
        <View>
            <Text style={{color:'#0abde3', fontSize:25, textAlign:'center'}}>Calificar una presentación es asi de facil!</Text>
        </View>
        <View >
            <SliderBox images={images} />
        </View>
        <View style={{flexDirection:'column', alignItems:'center'}}>
                <Button
                    containerStyle={{backgroundColor:'#54a0ff'}}
                    titleStyle={{ color:'white', padding:5}}
                    icon={
                    <Icon
                      name="check"
                      size={20}
                      color="white"
                    />
                    }
                    onPress={() => props.navigation.navigate('Jornadas')}
                    title="Comienza ahora"
                    type="outline"
                />
            </View>
         
     </View>
 )
}

export default withNavigation(Home);
