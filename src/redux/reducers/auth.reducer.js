// Reducers are pure functions that specify how application state should change in response to an action. 
// Reducers respond with the new state, which is passed to store.js and, in turn, our UI.
const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(state = initialState, action) {
    console.log("Cambio el estado usuario")
    if(action.payload != undefined)
      console.log(action.payload.mail)
    
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        isAuthenticated: action.payload != undefined? true: false,
        user: action.payload,
      };
    case "USER_LOADING":
      return {
        ...state
      };
    default:
      return state;
  }
}