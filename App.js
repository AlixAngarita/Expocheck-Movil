import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/components/Home/home.container'
import JornaadaScreen from './src/components/Jornadas/jornada.container'
import EasyCheckScreen from  './src/components/easyCheck/EasyCheck.container'
import Calificar from './src/components/calificar/calificar.container'
import Authentication from './src/components/autenticacion/autenticacion.container'
import Login from './src/components/login/login.container'
import MenuComponent from './src/components/menu'
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import {ActivityIndicator, View} from 'react-native'
import FlashMessage from "react-native-flash-message";
import PresentacionListada from './src/components/PresentacionListada/presentacion.container'

const AppNavigator = createStackNavigator({

  Login: {
    screen:Login,
    navigationOptions:{
      header:null
    }
  },
  Authentication: {
    screen:Authentication,
    navigationOptions:{
      header:null
    }
  },
  Home:HomeScreen,
  Calificar: {
    screen:Calificar,
    navigationOptions:{
      title:'Calificar presentación',
      header:null
    }
  },
  Jornadas: {
    screen:JornaadaScreen,
    navigationOptions:{
      title:'Seleccione una jornada',
      header:null
    }
  },
  EasyCheck: {
    screen:EasyCheckScreen,
    navigationOptions:{
      title:'Expocheck'
    }
  },
  Presentación: {
    screen:PresentacionListada,
    navigationOptions:{
      title:'Presentación'
    }
  }

}, 
{
  initialRouteName:'Login',
  defaultNavigationOptions:{
    headerRight:(<MenuComponent/>),
    headerStyle:{
      backgroundColor:'#0abde3',
      elevation: 0, //for android
      shadowOpacity: 0, //for ios
      borderBottomWidth: 0, //for ios
    },
    headerTintColor:'white'
  },
  headerLayoutPreset:'center'
})

const Navigator = createAppContainer(AppNavigator)
class App extends React.Component {
  render(){
    return(
      <Provider store={store}>
        <PersistGate loading={<View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <View>
                                  <ActivityIndicator size="large"/>
                                </View>
                            </View>}  
                  persistor={persistor}>
          <Navigator/>
        </PersistGate>
        <FlashMessage position="top" /> 
      </Provider>
    )
  }
}

export default App