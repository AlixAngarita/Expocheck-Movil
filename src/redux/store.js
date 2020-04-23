import {createStore, combineReducers, applyMiddleware} from 'redux'
import jornadas from './reducers/jornadas.reducer'
import idJornada from './reducers/idJornada.reducer'
import connect from './reducers/offline.reducer'
import authReducer from './reducers/auth.reducer'
import loadingJornada from './reducers/loading.reducers'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist';
import createSecureStore from "redux-persist-expo-securestore";
import indexNav from './reducers/nav.reducer'
import qr from './reducers/qr.reducer'
const storage = createSecureStore();



// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage,
    // Whitelist (Save Specific Reducers)
    whitelist: [
      'jornadas','connect','auth'
    ],
    // Blacklist (Don't Save Specific Reducers)
    blacklist: [
    ],
  };

const rootReducer = combineReducers({
    idJornada,
    jornadas,
    connect,
    loadingJornada,
    auth: authReducer,
    indexNav,
    qr
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