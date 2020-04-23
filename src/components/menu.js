import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, Button } from 'react-native';
import Menu, { MenuDivider  } from 'react-native-material-menu';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ToggleSwitch from 'toggle-switch-react-native'
import {connect} from 'react-redux'
import { withNavigation } from 'react-navigation';
import {logoutUser,updatePrivacyUser} from "../redux/actions/auth.action.js"
import PropTypes from "prop-types";

const RCTNetworking = require('RCTNetworking')

class MenuComponent extends React.PureComponent {


  
 
  
  constructor(props) {
      super(props);
      var evaluacionPublica = false ;
      var comentariosPublicos = false ;
      if(this.props.auth.user.evaluacionPublica){
        evaluacionPublica = true;
      }
      if(this.props.auth.user.comentariosPublicos){
        comentariosPublicos = true
      }
      this.state = {
        evaluacionPublica: evaluacionPublica,
        comentariosPublicos: comentariosPublicos
      }
      
      
  }
  _menu = null;
  /*async componentDidMount()
    {
      console.log('didmount')
      this.setState({
        evaluacionPublica: this.props.auth.user.evaluacionPublica,
        comentariosPublicos: this.props.auth.user.comentariosPublicos
      })
      
    }*/
  
  setPrivacy = (privacidad) => {
    
    this.setState({evaluacionPublica:privacidad.evaluacionPublica},
      () => {this.props.updatePrivacyUser(this.props.auth.user,privacidad)})
     
  }
  
  setPrivacyComment = (privacidad) => {
    this.setState({comentariosPublicos:privacidad.comentariosPublicos},
      () => {this.props.updatePrivacyUser(this.props.auth.user,privacidad)})

  }
  
  
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
      this._menu.hide()
      console.log('Cookies cleared, had cookies=' + cleared.toString());  
      this.props.logoutUser();
      this.props.navigation.navigate('Login');      
    })
  };
 
  render() {
    var props = this.props;

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
              isOn={this.state.evaluacionPublica}
              onColor="#44bd32"
              offColor="#ecf0f1"
              label="Evaluación pública"
              labelStyle={{ color: "black", fontSize:17, marginRight:35}}
              size="medium"
              onToggle={() =>{
                
                
                this.setPrivacy(
                  {
                    evaluacionPublica:!this.state.evaluacionPublica,
                    comentariosPublicos:this.state.comentariosPublicos
                  }
                )
              }}
            />

            </View>
            <View
            style={{marginVertical:5, marginRight:10}}>
              <ToggleSwitch
              isOn={this.state.comentariosPublicos}
              onColor="#44bd32"
              offColor="#ecf0f1"
              label="Comentarios públicos"
              labelStyle={{ color: "black", fontSize:17}}
              size="medium"
              onToggle={() => {
                this.setPrivacyComment(
                  {
                    evaluacionPublica:this.state.evaluacionPublica,
                    comentariosPublicos:!this.state.comentariosPublicos
                  }
                )
              } }
            />
            </View>
            <MenuDivider style={{marginVertical:10}}/>
            <Text style={{color:'grey', fontSize:15, textAlign:'center', marginBottom:10, marginTop:20}}>Mi cuenta</Text>
            <MenuDivider style={{marginVertical:5}}/>
            <Text style={{ color: "black", fontSize:17, marginVertical:10, textAlign:'center'}}>{props.auth.user == undefined? 'Nombre de usuario': props.auth.user.nombres}</Text>
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
  updatePrivacyUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}
export default connect(
  mapStateToProps,
  { logoutUser ,updatePrivacyUser}
)(withNavigation(MenuComponent));