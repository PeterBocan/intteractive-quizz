import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from "redux-thunk";

import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'root',
    storage
};

// let persistedReducer = persistReducer(persistConfig, reducer);
let persistedReducer = reducer;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(persistedReducer,
    composeEnhancer(applyMiddleware(thunk))
);
let persistor = persistStore(store);
/**
 *  <PersistGate loading={null} persistor={persistor}>
 *
 *      </PersistGate>
 */
render(
    <Provider store={store}>
           <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

