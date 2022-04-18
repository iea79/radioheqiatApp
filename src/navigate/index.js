import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, LogBox } from 'react-native';
import { useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';
import Catalog from '../screens/Catalog';
import Search from '../screens/Search';
import Login from '../screens/auth/Login';
import Registration from '../screens/auth/Registration';
import { getToken } from '../actions/actions';

const options = {
    headerHideShadow: true,
    headerStyle: {
        height: 60,
        backgroundColor:'#381466',
        shadowColor: 'transparent'
    },
    headerTitleStyle: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#ffffff',
    },
    headerTitleAlign: 'left',
    headerTintColor: '#ffffff',
    cardStyle: {
        backgroundColor: "#381466",
    },
};

// useLayoutEffect(() => {
//     const routeName = getFocusedRouteNameFromRoute(route);
//     if (routeName == "Welcome"){
//         navigation.setOptions({tabBarStyle: {display: 'none'}});
//     } else {
//         // alert(routeName);
//         navigation.setOptions({tabBarStyle: {
//             backgroundColor: "#381466",
//             display: 'flex'
//         }});
//     }
// }, [navigation, route])

// AsyncStorage.removeItem('token');
const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
    // const token = true;
    // const token = false;
    const store = useSelector(state => state);
    const { token } = useSelector(state => state);
    console.log(store);


    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])

    useEffect(() => {
        console.log(store);
        checkToken();
    }, [token])


    const checkToken = useCallback(async () => {
        const tok = await AsyncStorage.getItem('token')
            .then(resp => {
                console.log('checkToken then === ', resp);
                getToken(resp);
                navigation.navigate('Home');
            })
            .catch(err => {
                console.log('checkToken err === ', err);
                console.log(err);
            });
        console.log('checkToken ===', tok);
        // if (tok) {
        // }
    }, [token])

    // console.log('HomeStackScreen state ==== ', state);
    return (
        <HomeStack.Navigator
            initialRouteName={ token ? 'Home' : 'Login' }
            screenOptions={options} >
            <HomeStack.Screen
                name="Home"
                component={ Home }
                options={{ title: 'Կատեգորիաներ', headerLeft: null }} />
            <AuthStack.Screen name="Welcome" component={ Welcome }  options={{ title: 'Ներս մտնել', headerTitleAlign: 'center' }} />
            <AuthStack.Screen name="Login" component={ Login }  options={{ title: 'Ներս մտնել', headerTitleAlign: 'center' }} />
            <AuthStack.Screen name="Registration" component={ Registration } options={{ title: 'Նոր հաշիվ', headerTitleAlign: 'center' }}  />
        </HomeStack.Navigator>
    )
}

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
            initialRouteName='Login'
            screenOptions={options} >
            <AuthStack.Screen name="Auth" component={ Login }  options={{ title: 'Ներս մտնել', headerTitleAlign: 'center' }} />
            <AuthStack.Screen name="Registration" component={ Registration } options={{ title: 'Նոր հաշիվ', headerTitleAlign: 'center' }}  />
        </AuthStack.Navigator>
    )
}

const FavoriteStack = createStackNavigator();

const FavoriteStackScreen = () => {
    return (
        <FavoriteStack.Navigator
            initialRouteName='Login'
            screenOptions={options} >
            <FavoriteStack.Screen name="Favorite" component={ Favorite }  options={{ title: 'Իմ գրքերը' }} />
        </FavoriteStack.Navigator>
    )
}

const CatalogStack = createStackNavigator();

const CatalogStackScreen = () => {
    return (
        <CatalogStack.Navigator
            initialRouteName='Login'
            screenOptions={options} >
            <CatalogStack.Screen name="Catalog" component={ Catalog }  options={{ title: 'Կատալոգ' }} />
        </CatalogStack.Navigator>
    )
}

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator
            initialRouteName='Login'
            screenOptions={options} >
            <SearchStack.Screen name="Search" component={ Search }  options={{ title: 'Որոնում' }} />
        </SearchStack.Navigator>
    )
}

export { HomeStackScreen, FavoriteStackScreen, CatalogStackScreen, SearchStackScreen, AuthStackScreen };
