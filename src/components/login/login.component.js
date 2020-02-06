import React from 'react'
import { View, TextInput,TouchableOpacity, Text, Image, KeyboardAvoidingView} from 'react-native'
import assets from '../../config/assets'
import { withNavigation } from 'react-navigation';


const LoginComponent = props => {
    return (
    <View style={{flex:1, flexDirection:'column', 
    backgroundColor:'#f1f2f6', alignItems:'center', 
    justifyContent:'center'}}>
        <Image
        source={{uri:assets.logo}} style={{width: 150, height: 150, marginBottom:50}}/>
        <KeyboardAvoidingView style={{flexDirection:'column', alignItems:'center', 
        justifyContent:'center' }}
        behavior="padding">
             <TextInput
            placeholder="Digite su ID ..."
            keyboardType='number-pad'
            maxLength={9}
            style={{borderColor:'#74b9ff', borderRadius:20, borderWidth:1, height:40,
            padding:10, backgroundColor:'#ecf0f1', width:300, color:'grey'}}/>
             <TouchableOpacity activeOpacity={0.5} onPress={() => props.navigation.navigate('Jornadas')}>
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
                        <View style={{height:50}}/>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>)
}

export default withNavigation(LoginComponent)