import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, LogBox } from 'react-native';
import { useSelector } from 'react-redux';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import Favorite from '../screens/Favorite';
import Search from '../screens/Search';
import Login from '../screens/auth/Login';
import Registration from '../screens/auth/Registration';
import Categories from '../screens/Categories';
import Category from '../screens/Category';
import BookScreen from '../screens/BookScreen';

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

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation, route }) => {
    return (
        <>
            <HomeStack.Navigator
                initialRouteName={ 'Home' }
                screenOptions={options} >
                <HomeStack.Screen
                    name="Home"
                    component={ Home }
                    options={{ title: 'Կատեգորիաներ', headerLeft: null }} />
            </HomeStack.Navigator>
        </>
    )
}

const WelcomStack = createStackNavigator();

const WelcomStackScreen = ({ navigation, route }) => {
    return (
        <>
            <WelcomStack.Navigator
                screenOptions={options} >
                <WelcomStack.Screen name="Welcome" component={ Welcome }  options={{
                        headerShown: false
                    }} />
            </WelcomStack.Navigator>
        </>
    )
}

const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <>
            <AuthStack.Navigator
                initialRouteName='Login'
                screenOptions={options} >
                <AuthStack.Screen name="Auth" component={ Login }  options={{ title: 'Ներս մտնել', headerTitleAlign: 'center' }} />
                <AuthStack.Screen name="Registration" component={ Registration } options={{ title: 'Նոր հաշիվ', headerTitleAlign: 'center' }}  />
            </AuthStack.Navigator>
        </>
    )
}

const FavoriteStack = createStackNavigator();

const FavoriteStackScreen = () => {
    return (
        <>
            <FavoriteStack.Navigator
                screenOptions={options} >
                <FavoriteStack.Screen name="Favorite" component={ Favorite } options={{ title: 'Իմ գրքերը' }} />
            </FavoriteStack.Navigator>
        </>
    )
}

const CatalogStack = createStackNavigator();

const CatalogStackScreen = () => {
    return (
        <>
            <CatalogStack.Navigator
                initialRouteName='Categories'
                screenOptions={options} >
                <CatalogStack.Screen name="Categories" component={ Categories }  options={{ title: 'կատալոգ' }} />
                <CatalogStack.Screen name="Category" component={ Category } options={({ route }) => ({ title: route.params.name })} />
                <CatalogStack.Screen name="Book" component={ BookScreen }  options={({ route }) => ({ title: route.params.name })} />
            </CatalogStack.Navigator>
        </>
    )
}

const SearchStack = createStackNavigator();

const SearchStackScreen = () => {
    return (
        <>
            <SearchStack.Navigator
                initialRouteName='Search'
                screenOptions={options} >
                <SearchStack.Screen name="Search" component={ Search }  options={{ title: 'Որոնում' }} />
            </SearchStack.Navigator>
        </>
    )
}

export { HomeStackScreen, FavoriteStackScreen, CatalogStackScreen, SearchStackScreen, AuthStackScreen, WelcomStackScreen };
