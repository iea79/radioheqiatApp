import {createStore} from 'redux';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducers';

// const persistedState = AsyncStorage.getItem('reduxState') ? JSON.parse(AsyncStorage.getItem('reduxState')) : {};
// const persistedState = getKeys ? JSON.parse(getKeys) : {};
const persistedState = {};
const store = createStore(reducer, persistedState);
store.subscribe(() => store.getState());

// store.subscribe( async () => {
//     await AsyncStorage.setItem('reduxState', JSON.stringify(store.getState()));
// });

export default store;
