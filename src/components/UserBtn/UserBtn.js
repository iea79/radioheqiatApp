import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { useSelector } from 'react-redux';
import * as RootNavigation from '../../navigate/RootNavigation';

const userIcon = `<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="19.5" stroke="url(#paint0_linear_204_3765)"/>
    <path d="M19.5 19.0625C21.433 19.0625 23 17.4955 23 15.5625C23 13.6295 21.433 12.0625 19.5 12.0625C17.567 12.0625 16 13.6295 16 15.5625C16 17.4955 17.567 19.0625 19.5 19.0625Z" fill="url(#paint1_linear_204_3765)"/>
    <path d="M26.5 26.9375V23.4375C26.5 22.9125 26.2375 22.3875 25.8 22.0375C24.8375 21.25 23.6125 20.725 22.3875 20.375C21.5125 20.1125 20.55 19.9375 19.5 19.9375C18.5375 19.9375 17.575 20.1125 16.6125 20.375C15.3875 20.725 14.1625 21.3375 13.2 22.0375C12.7625 22.3875 12.5 22.9125 12.5 23.4375V26.9375H26.5Z" fill="url(#paint2_linear_204_3765)"/>
    <defs>
        <linearGradient id="paint0_linear_204_3765" x1="6.18182" y1="10.9091" x2="34.9091" y2="30.5455" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F7D378"/>
            <stop offset="1" stop-color="#FAB042"/>
        </linearGradient>
        <linearGradient id="paint1_linear_204_3765" x1="17.0818" y1="13.9716" x2="22.1091" y2="17.408" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F7D378"/>
            <stop offset="1" stop-color="#FAB042"/>
        </linearGradient>
        <linearGradient id="paint2_linear_204_3765" x1="14.6636" y1="21.8466" x2="19.8057" y2="28.8763" gradientUnits="userSpaceOnUse">
            <stop stop-color="#F7D378"/>
            <stop offset="1" stop-color="#FAB042"/>
        </linearGradient>
    </defs>
</svg>`;

const UserBtn = () => {
    const { token } = useSelector(state => state);

    const onPress = () => RootNavigation.navigate('Profile');

    if (!token) {
        return null;
    }
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ width: 40, height: 40 }}
        >
            <SvgXml style={{ width: '100%', height: '100%' }} xml={ userIcon } />
        </TouchableOpacity>
    )
}

export default UserBtn;
