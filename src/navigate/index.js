import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Welcome from '../screens/Welcome';
import Favorite from '../screens/Favorite';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Login from '../screens/auth/Login';
import Registration from '../screens/auth/Registration';
import Categories from '../screens/Categories';
import Category from '../screens/Category';
import BookScreen from '../screens/BookScreen';
import screenOptions from './screenOptions';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
            <HomeStack.Screen
                name="Home"
                component={ Home }
                options={{ title: 'Կատեգորիաներ', headerLeft: null }}
            />
            <HomeStack.Screen
                name="Profile"
                component={ Profile }
                options={{
                    presentation: "modal",
                    title: 'Անձնագիր',
                    headerLeft: null }}
                />
        </HomeStack.Navigator>
    );
};

const WelcomStack = createNativeStackNavigator();

const WelcomStackScreen = () => {
    return (
        <WelcomStack.Navigator
            initialRouteName='Welcome'
            screenOptions={screenOptions}
        >
            <WelcomStack.Screen name="Welcome" component={ Welcome }  options={{
                    headerShown: false
                }} />
        </WelcomStack.Navigator>
    );
};

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
            initialRouteName='Login'
            screenOptions={screenOptions} >
            <AuthStack.Screen
                name="Auth"
                component={ Login }
                options={{ title: 'Ներս մտնել', headerTitleAlign: 'center' }} />
            <AuthStack.Screen
                name="Registration"
                component={ Registration }
                options={{ title: 'Նոր հաշիվ', headerTitleAlign: 'center' }}  />
        </AuthStack.Navigator>
    );
};

const FavoriteStack = createNativeStackNavigator();

const FavoriteStackScreen = () => {
    return (
        <FavoriteStack.Navigator
            initialRouteName='Favorite'
            screenOptions={screenOptions} >
            <FavoriteStack.Screen name="Favorite" component={ Favorite } options={{ title: 'Իմ գրքերը' }} />
        </FavoriteStack.Navigator>
    );
};

const CatalogStack = createNativeStackNavigator();

const CatalogStackScreen = () => {
    return (
        <CatalogStack.Navigator
            initialRouteName='Categories'
            screenOptions={screenOptions} >
            <CatalogStack.Screen
                name="Categories"
                component={ Categories }
                options={{ title: 'կատալոգ' }} />
            <CatalogStack.Screen
                name="Category"
                component={ Category }
                options={({ route }) => ({ title: route.params.name })} />
            <CatalogStack.Screen
                name="Book"
                component={ BookScreen }
                options={({ route }) => ({ title: route.params.name })} />
        </CatalogStack.Navigator>
    );
};

const SearchStack = createNativeStackNavigator();

const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator
            initialRouteName='Search'
            screenOptions={screenOptions} >
            <SearchStack.Screen name="Search" component={ Search }  options={{ title: 'Որոնում' }} />
        </SearchStack.Navigator>
    );
};

export {
    HomeStackScreen,
    FavoriteStackScreen,
    CatalogStackScreen,
    SearchStackScreen,
    AuthStackScreen,
    WelcomStackScreen,
};
