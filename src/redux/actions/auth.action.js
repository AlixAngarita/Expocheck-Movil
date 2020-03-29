import axios from "axios";
import config from '../../config/server'

const setAuthToken = token => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
};

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
          const user = res.data
          // Set current user
          dispatch(setCurrentUser(user));
        })
        .catch(err => {
          console.info(err.config);
          console.log('no se pudo')
          /*dispatch({
            type: GET_ERRORS,
            payload: err.response.data,
          });*/
        });
   // });
}; // Set logged in user
 
export const setCurrentUser = (user) => {
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
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

/*
replication.test().then(base => {
  const usuario = {

  }


    axios
      .post(base + "/usuario/nuevo", usuario)
      .then(res => {
        // Save to localStorage// Set token to localStorage
        const id = res.data._id;
        console.log(id)

        //localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        //setAuthToken(token);
        // Decode token to get user data
        //const decoded = jwt_decode(token);
        //var isAmbulancia = decoded

        // Set current user
        dispatch(setCurrentUser(id, usuario));
      })
      .catch(err => {
        console.info(err.config);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  });


*/