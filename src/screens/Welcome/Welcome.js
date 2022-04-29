import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View
} from 'react-native';

const Welcome = ({navigation}) => {
    const { img, text, container } = welcome;

    useEffect(() => {
        navigation.getParent().setOptions({
            tabBarStyle: { display: "none" }
        });
    }, []);

    return (
        <View
            style={ container }
            >
            <Image
                style={ img }
                resizeMode={'cover'}
                source={{
                    uri: 'https://radioheqiat.fm/wp-content/uploads/Welcome.jpg',
                }}
            />
            <Text
                style={ text }
                >Բարի գալուստ հեքիաթ</Text>
        </View>
    )
};

const welcome = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: -60,
        // bottom: -88,
        width: '100%',
        // zIndex: 5,
        // transition: '0.4s',

        hide: {
            // top: '-100%',
            display: 'none',
        },
    },
    img: {
        width: '100%',
        height: '100%',
    },
    text: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 30,
        textAlign: 'center',
        fontSize: 32,
        color: '#ffffff',
    }
})

export default Welcome;
