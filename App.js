import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/components/Home/home.container'
import JornaadaScrenn from './src/components/Jornadas/jornada.container'
import EasyCheckScreen from  './src/components/easyCheck/EasyCheck.container'
import Calificar from './src/components/calificar/calificar.container'
import Presentación from './src/components/Presentacion/presentacion.container'
import Login from './src/components/login/login.container'
import MenuComponent from './src/components/menu'
const AppNavigator = createStackNavigator({

  Login:{
    screen:Login,
    navigationOptions:{
      header:null
    }
  },
  Home:HomeScreen,
  Calificar:{
    screen:Calificar,
    navigationOptions:{
      title:'Calificar presentación'
    }
  },
  Jornadas:{
    screen:JornaadaScrenn,
    navigationOptions:{
      title:'Seleccione una jornada',
      headerRight:null
    }
  },
  EasyCheck:{
    screen:EasyCheckScreen,
    navigationOptions:{
      title:'Expocheck'
    }
  },
  Presentación:{
    screen:Presentación,
    navigationOptions:{
      title:'Presentación'
    }
  }

}, 
{
  initialRouteName:'Home',
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

export default createAppContainer(AppNavigator)
