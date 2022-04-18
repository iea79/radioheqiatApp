import 'react-native-gesture-handler';
import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogBox, Image } from 'react-native';
import { setMessage, setBookPlayed, setLive, setLivePaused, setLivePosition, setFavorites, setLiveLoader } from './actions/actions';
import ss from './styles/index';

import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, FavoriteStackScreen, CatalogStackScreen, SearchStackScreen, AuthStackScreen } from './navigate';
// import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);


const Tab = createBottomTabNavigator();

const audio = process.env.PUBLIC_URL + "/20211231_6930826265517758107.mp3";

const defaultBook = {
    "id": 1369,
    "title": {
        "rendered": "Կարապետ-բեկի հեքիաթը"
    },
    "author": {
        "name": "Հայ Ժողովրդական Հեքիաթներ",
        "read_by": "Կարդում է Արևիկ Մուրադյանը"
    },
    "media": {
        "cover": "https://radioheqiat.fm/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը-mp3-image.jpg",
        "audio": audio
        // "audio": "https://radioheqiat.fm/wp-content/uploads/Հայ-Ժողովրդական-Հեքիաթներ-Կարապետ-բեկի-հեքիաթը.mp3"
    },
};

const App = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { live } = useSelector(state => state);

    if (live === undefined) {
        dispatch(setBookPlayed(defaultBook));
        dispatch(setLive(true));
        dispatch(setLivePaused(false));
        dispatch(setLivePosition(0));
        dispatch(setFavorites([]));
        dispatch(setLiveLoader(true));
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                        headerShown: false,
                        tabBarStyle: ss.tabBarStyle,
                        tabBarActiveTintColor: '#F6D378',
                        tabBarInactiveTintColor: 'white',
                        tabBarHideOnKeyboard: true,
                        tabBarIcon: ({ focused, image }) => {
                            if (route.name === 'HomeScreen') {
                                image = focused ? require('./assets/img/home-icon-focus.png') : require('./assets/img/home-icon.png')
                            }
                            if (route.name === 'FavoriteScreen') {
                                image = focused ? require('./assets/img/favor-icon-focus.png') : require('./assets/img/favor-icon.png')
                            }
                            if (route.name === 'CatalogScreen') {
                                image = focused ? require('./assets/img/cat-icon-focus.png') : require('./assets/img/cat-icon.png')
                            }
                            if (route.name === 'SearchScreen') {
                                image = focused ? require('./assets/img/search-icon-focus.png') : require('./assets/img/search-icon.png')
                            }

                            // You can return any component that you like here!
                            return <Image source={image} style={{ width: 32, height: 32 }} />
                        },
                    }
                )}
                >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeStackScreen}
                    options={() => {
                        return {
                            title: 'տուն'
                        }
                    }}
                />
                <Tab.Screen name="FavoriteScreen" component={FavoriteStackScreen} options={{ title: 'Իմ գրքերը' }} />
                <Tab.Screen name="CatalogScreen" component={CatalogStackScreen} options={{ title: 'Կատալոգ' }} />
                <Tab.Screen name="SearchScreen" component={SearchStackScreen} options={{ title: 'Որոնում' }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default App;
