import React from "react";
import {  Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { TabBar } from "react-native-tab-view";
import Presentacion from '../Presentacion/presentando.container'
import Horario from '../horario/horario.container'
import Listado from '../listado/listado.container'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class TabViewExample extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "Presentacion", title: "Presentando"},
      {key:'Listado', title:'Expuestas'},
      { key: "Horario", title: "Horarios" },
    ]
  };

  renderIcon (props){
    const {route} = props

    if (route.key === 'Presentacion'){
      return  <Icon name='history' size={30} color={'white'}/>
    }
     
    else if (route.key === 'Listado'){
      return <Icon name='list-ul' size={30} color={'white'}/>
    }
      
    else{
      return <Icon name='calendar' size={30} color={'white'}/>
    }
     
  
  }

  render() {
    return (
      <TabView
        lazy={true}
        tabBarPosition='bottom'
        renderTabBar={props => (
          <TabBar
            {...props}
            renderLabel={props => this.renderIcon(props)}
            indicatorStyle={{ backgroundColor: "white", position:'relative', top:0, height:3}}
            style={{ backgroundColor: "#0abde3" }}
          />
        )}
        navigationState={this.state}
        renderScene={SceneMap({
          Presentacion: Presentacion,
          Horario: Horario,
          Listado:Listado
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

