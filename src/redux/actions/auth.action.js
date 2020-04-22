import axios from "axios";
import config from '../../config/server';
import {updatePrivacy} from '../../services/user.service'
import Socket from '../../services/sockect'

const headers = {"Content-Type": "application/json"}
// Login - POST api/usuario/nuevo -> Registra un nuevo usuario
export const loginUser = (user, token) => dispatch => {
  //replication.test().then(base => {
    const usuario = { usuario: {
      nombre: user.displayName,
      correo: user.mail,
      //telefono: user.mobilePhone, //agregar luego al modelo
      token: 'null', //token.accessToken //el token de Outlook explota el store, luego se modifica por el de las notificaciones
      aceptoTerminos: true
    }}
      axios
        .post(config.rest + "/api/usuario/nuevo", usuario, {headers})
        .then(res => {
          const userData = res.data
          userData.nombres = user.givenName;
          // Set current user
          dispatch(setCurrentUser(userData));
        })
        .catch(err => {
          console.info(err.config);
          console.log('no se guardo')
          /*dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });*/
        });
   // });
}; // Set logged in user
 
export const setCurrentUser = (user) => {
  console.log(user)
    return {
      type: "SET_CURRENT_USER",
      payload: user
    };
  }; // User loading

export const setUserLoading = () => {
  
    return {
      type: "USER_LOADING",
    };
  }; // Log user out
  
export const logoutUser = () => dispatch => {
    dispatch(setCurrentUser());
};

export const updatePrivacyUser = (user,privacidad) => dispatch => {
  updatePrivacy(user._id,privacidad).then(res => {
    const userData = res.data
    userData.nombres = user.nombres
    userData.evaluacionPublica = privacidad.evaluacionPublica
    userData.comentariosPublicos = privacidad.comentariosPublicos
    console.log('to setCurrentUser(user)')
    dispatch(setCurrentUser(userData))
    Socket.updatePrivacidad(user.nombre)
  })
  .catch(err => {
    console.log("update privacy error")
    console.info(err)
    
  })
}
