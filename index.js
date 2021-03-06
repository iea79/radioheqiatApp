/**
 * Evgeniy Ivanov
 * https://frontendie.ru
 *
 * @format
 * @flow strict-local
*/
import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/store';


const AppRedux = () => (
    <Provider store={ store }>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
