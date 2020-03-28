const setAuthToken = token => {
    if (token) {
      // Apply authorization token to every request if logged in
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      // Delete auth header
      delete axios.defaults.headers.common["Authorization"];
    }
};

// Login - get user token
export const loginUser = user => dispatch => {
  const { token } = 'tokenprueba';
  // Set current user
  dispatch(setCurrentUser(user));
}; // Set logged in user
 
export const setCurrentUser = (user, a) => {
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