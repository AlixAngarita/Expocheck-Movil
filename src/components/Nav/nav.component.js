import React from "react";
import {  Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Presentacion from '../Presentacion/presentacion.container'
import Horario from '../horario/horario.container'
import Listado from '../listado/listado.container'

export default class TabViewExample extends React.Component {

  constructor(props){
    super(props)
  }

  

  state = {
    index: 0,
    routes: [
      { key: "Presentacion", title: "Exponiendo"},
      {key:'Listado', title:'Listado'},
      { key: "Horario", title: "Agenda" },
    ]
  };


  render() {
    return (
      <TabView
        tabBarPosition='top'
        navigationState={this.state}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "white"}}
            style={{ backgroundColor: "#0abde3" }}
          />
        )}
        renderScene={ ({route}) => {
          switch (route.key) {
            case 'Presentacion':
              return <Presentacion id={this.props.id}/>;
            case 'Listado':
              return <Listado id={this.props.id}/>;
            case 'Horario':
              return <Horario id={this.props.id} />;
            }
          }
        }
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

