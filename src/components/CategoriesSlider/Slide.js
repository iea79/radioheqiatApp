import React from 'react';
import { Text, StyleSheet, Image, Pressable } from 'react-native';

const Slide = ({ data, navigation }) => {
    const { slide, img, title } = styles;
    const { id, name, media: { cover_small } } = data;

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('CatalogScreen', {
                    screen: 'Category',
                    params: {
                        id: id,
                        name: name,
                    }
                });
            }}
            style={ slide }
            >
            { cover_small ?
                <Image
                    resizeMode={'cover'}
                    source={{ uri: cover_small }}
                    style={ img }
                ></Image>
                : null
            }
            <Text style={ title }>{data.name}</Text>
        </Pressable>
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
        marginRight: 15,
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
