import React from 'react';
import UserBtn from '../components/UserBtn';

const screenOptions = {
    headerForceInset: {
        top: 'never',
        bottom: 'never'
    },
    headerBackTitleVisible: false,
    headerHideShadow: true,
    headerStyle: {
        backgroundColor:'#381466',
    },
    // headerBackground: Component,
    headerShadowVisible: false,
    headerTitleStyle: {
        fontSize: 20,
        color: '#ffffff',
    },
    cardStyle: {
        backgroundColor: 'transparent'
    },
    headerTitleAlign: 'left',
    headerTintColor: '#ffffff',
    headerRight: () => <UserBtn />
};

export default screenOptions;
