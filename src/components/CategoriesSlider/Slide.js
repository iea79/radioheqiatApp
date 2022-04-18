import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const Slide = ({ data }) => {
    const { slide, img, title } = styles;
    const { cover, lotty } = data.media;

    const setCover = () => {
        // if (lotty) {
        //     return <LottieView source={{
        //             // uri: lotty
        //         }} autoPlay loop resizeMode="center"/>
        // } else {
        // }
        if (cover) {
            return <Image
                resizeMode={'cover'}
                source={{ uri: cover }}
                style={ img }
                ></Image>
        }
    }

    return (
        <View
            onPress={() => {}}
            style={ slide }
            >
            {setCover()}
            <Text style={ title }>{data.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    slide: {
        height: 180,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        // overflow: 'hidden',
        backgroundColor: '#82278A',
        marginLeft: 15,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    img: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#ffffff',
        padding: 14
    }
})

export default Slide;
