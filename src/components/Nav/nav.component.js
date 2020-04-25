import React from "react";
import {  Dimensions } from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import Presentacion from '../Presentacion/presentacion.container'
import Horario from '../horario/horario.container'
import Listado from '../listado/listado.container'
import { connect } from "react-redux";
import {setNav} from '../../redux/actions/nav.action'
 

 class TabViewExample extends React.Component {

  constructor(props){
    super(props)
  }

  renderScene = ({route}) => {
    switch (route.key) {
      case 'Presentacion':
        return <Presentacion id={this.props.id}/>;
      case 'Listado':
        return <Listado id={this.props.id}/>;
      case 'Horario':
        return <Horario id={this.props.id} />;
      }
    }
  

  state = {
    index: 0,
    routes: [
      { key: "Presentacion", title: "Exponiendo"},
      {key:'Listado', title:'Listado'},
      { key: "Horario", title: "Agenda" },
    ]
  };

  
tab(props){
  return (
  <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "white"}}
            style={{ backgroundColor: "#0abde3" }}
          />
  )
}

  render() {
    return (
      <TabView
        lazy={true}
        tabBarPosition='top'
        navigationState={this.state}
        renderTabBar={this.tab}
        renderScene={ this.renderScene }
        onIndexChange={index => {
          this.setState({ index })
          this.props.setNav(index)
        }}
        initialLayout={{ width: Dimensions.get("window").width }}
      />
    );
  }
}

export default connect(null,{setNav})(TabViewExample)