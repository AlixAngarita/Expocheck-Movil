const initialState = {
  isAuthenticated: false,
  user: {}
};
export default function(state = initialState, action) {
    
  switch (action.type) {
    case "SET_CURRENT_USER":
      console.log("Cambio el estado usuario")
      console.log('payload: ', action.payload)
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