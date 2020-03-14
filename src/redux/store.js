import {createStore, combineReducers, applyMiddleware} from 'redux'
import jornadas from './reducers/jornadas.reducer'
import connect from './reducers/offline.reducer'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from "redux-persist-expo-securestore";

const storage = createSecureStore();
// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'jornadas','connect'
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [
    ],
  };

const rootReducer = combineReducers({
    jornadas,
    connect
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

// Exports
export {
    store,
    persistor,
};