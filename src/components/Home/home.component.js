import React, {useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { withNavigation } from 'react-navigation';
import {Dimensions} from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import {StatusBar, Platform} from 'react-native';



const Home = props => {
    const heightStatusBar = StatusBar.currentHeight
   const images= [
    "https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/steps%2FPaso%201.png?alt=media&token=7d3b0308-d0f6-4264-9686-71a448647a5c",
    "https://firebasestorage.googleapis.com/v0/b/easy-check-b9106.appspot.com/o/steps%2FPaso%202.jpg?alt=media&token=86f5d167-8768-40c0-a86f-55f4290fc0f5",
    ]
      
 return(
     <View style={{backgroundColor:'#F1F2F6', height:Dimensions.get('window').height}}>
        <View style={{marginTop:Platform.OS === 'adroid' ? '10%':heightStatusBar+10,
            width:Dimensions.get('window').width -10}}>
            <SliderBox 
            sliderBoxHeight={Dimensions.get('window').height -60} images={images}
            circleLoop={false} resizeMode="contain"
            dotColor="white"
            dotStyle={{width:18, height:18, borderRadius:50}}/>
        </View>
        <View style={{borderRadius:100, backgroundColor:'#74b9ff', 
                            marginVertical:20,
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 1,
                            },
                            shadowOpacity: 0.22,
                            shadowRadius: 2.22,
                            width:100,
                            elevation: 3}}>
                            <Text style={{color:'white', fontSize:18, padding:10, textAlign:'center'}}>Login</Text>
         </View>
     </View>
 )
}

export default withNavigation(Home);
