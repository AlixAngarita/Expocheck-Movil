import React, {useState, useEffect} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Animated } from "react-native";
import { withNavigation } from 'react-navigation';

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



const Home = props => {
    const [animation] = useState(new Animated.Value(0))

    startAnimate = () => {
      Animated.loop(
          Animated.sequence([
              Animated.delay(1500),
              Animated.spring(animation,{
                toValue:2,
                friction:3,
                delay:1000
              })
          ])
      ).start()
    }

    useEffect(() => {
        startAnimate()
    })
      
 return(
     <View style={styles.container}>

        <View style={{flexDirection:'column', alignItems:'center', marginTop:20}}>
            <Image source={{uri: 'https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/icon%20-%20prod.png?alt=media&token=1e11c661-16db-4623-8fdf-a49c8cddf734'}} style={{width: 150, height: 150}} />
        </View>
        <View>
            <Text style={{color:'#0abde3', fontSize:25, textAlign:'center'}}>Calificar una presentación es asi de facil!</Text>
        </View>
        <Image style={{width:'100%', height:280}} resizeMode='center' source={{uri:'https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/Calificar%20presentaci%C3%B3n.png?alt=media&token=87b0948e-78cb-4bb8-bf50-6433958a57bc'}}/>
        <View style={{flexDirection:'column', alignItems:'center'}}>
               
                      <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Jornadas')}>
                        <Animated.View style={{borderRadius:100, backgroundColor:'#0abde3', transform:[
                                {scale:animation.interpolate({
                                inputRange:[0, 1, 2],
                                outputRange:[1, .8, 1]
                                })}
                            ],
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,

                            elevation: 3}}>
                            <Text style={{color:'white', fontSize:18, padding:12}}>Comienza ahora</Text>
                        </Animated.View>
                     </TouchableOpacity>
                
        </View>
         
     </View>
 )
}

export default withNavigation(Home);
