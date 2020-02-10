import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text } from 'react-native';
import Menu, { MenuDivider  } from 'react-native-material-menu';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native'


class MenuComponent extends React.PureComponent {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = () => {
    this._menu.hide();
  };
 
  showMenu = () => {
    this._menu.show();
  };
 
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableWithoutFeedback
          onPress={this.showMenu}>
          <Menu
            ref={this.setMenuRef}
            button={<Icon style={{marginRight:25}}  name="ellipsis-v" size={40} color="white" size={20}/>}
            animationDuration={50}
          >
            <Text style={{color:'grey', fontSize:15, textAlign:'center', marginVertical:10}}>Privacidad</Text>
            <MenuDivider style={{marginVertical:5}}/>
            <View
            style={{marginVertical:5}}>
              <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor="#ecf0f1"
              label="Evaluación publica"
              labelStyle={{ color: "black", fontSize:17}}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
            </View>
            <View
            style={{marginVertical:5, marginRight:10}}>
              <ToggleSwitch
              isOn={true}
              onColor="#44bd32"
              offColor="#ecf0f1"
              label="Comentarios publicos"
              labelStyle={{ color: "black", fontSize:17}}
              size="medium"
              onToggle={isOn => console.log("changed to : ", isOn)}
            />
            </View>
          </Menu>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
 
export default MenuComponent;