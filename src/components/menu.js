import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, Button } from 'react-native';
import Menu, { MenuDivider  } from 'react-native-material-menu';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native'
import {connect} from 'react-redux'
import { withNavigation } from 'react-navigation';
import {logoutUser} from "../redux/actions/auth.action.js"
import PropTypes from "prop-types";
const RCTNetworking = require('RCTNetworking')

class MenuComponent extends React.PureComponent {

  constructor(props) {
      super(props);

      this.state = {
          evaluacion_toggle: false,
          comentarios_toggle: false
      }
  }
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

  logOut= () =>  {
    console.log('Cerrando sesion...')
    RCTNetworking.clearCookies((cleared) => {
      console.log('Cookies cleared, had cookies=' + cleared.toString());  
      this.props.logoutUser();
      this.props.navigation.navigate('Login');      
    })
  };
 
  render() {
    //console.log(this.props.auth)
    var user = this.props.auth.user;
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
            style={{marginVertical:5, marginRight:10}}>
              <ToggleSwitch
              isOn={this.state.evaluacion_toggle}
              onColor="#44bd32"
              offColor="#ecf0f1"
              label="Evaluación pública"
              labelStyle={{ color: "black", fontSize:17, marginRight:35}}
              size="medium"
              onToggle={() => this.setState({ evaluacion_toggle: !this.state.evaluacion_toggle })}
            />

            </View>
            <View
            style={{marginVertical:5, marginRight:10}}>
              <ToggleSwitch
              isOn={this.state.comentarios_toggle}
              onColor="#44bd32"
              offColor="#ecf0f1"
              label="Comentarios públicos"
              labelStyle={{ color: "black", fontSize:17}}
              size="medium"
              onToggle={() => this.setState({ comentarios_toggle: !this.state.comentarios_toggle })}
            />
            </View>
            <MenuDivider style={{marginVertical:5}}/>
            <Text style={{color:'grey', fontSize:15, textAlign:'center', marginVertical:10}}>Mi cuenta</Text>
            <MenuDivider style={{marginVertical:5}}/>
            <Text style={{ color: "black", fontSize:17, marginVertical:10, marginLeft:10}}>{user == undefined? 'Nombre de usuario': user.nombres}</Text>
            <View style={{marginHorizontal: 30, marginBottom:10, fontSize:17}}>
              <Button
                onPress={this.logOut.bind(this)}
                title="Cerrar sesión"
                color="#0abde3"
                accessibilityLabel="Presiona para cerrar la sesión"
              />
            </View>
          </Menu>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
MenuComponent.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}
export default connect(
  mapStateToProps,
  { logoutUser }
)(withNavigation(MenuComponent));