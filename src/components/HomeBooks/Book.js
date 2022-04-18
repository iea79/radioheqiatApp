import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

const Book = ({ data }) => {
    const { row, link, cover, img, title, descript, favorite, foot } = styles;
    const [ favor, toggleFavor ] = useState(false);

    const toggleFavorite = () => {
        toggleFavor(!favor);
    }

    return (
        <View
            onPress={() => {}}
            style={ row }
            >
            <Pressable
                style={ link }
                onPress={() => {alert('play')}}>
                <View style={ cover }>
                    {
                        data && data.cover ?
                            <Image
                                resizeMode={'cover'}
                                source={{ uri: data.cover }}
                                style={ img }
                            ></Image> :
                            <Image
                                resizeMode={'cover'}
                                source={{ uri: 'https://radioheqiat.fm/wp-content/uploads/logo-footer.png' }}
                                style={ img }
                            ></Image>
                    }
                </View>
                <View style={ descript }>
                    <Text style={ title }>{data.title}</Text>
                    <View style={ foot }>
                        <Text style={ foot.text }>{data.authorName}</Text>
                        <Text style={ foot.text }>{data.time}</Text>
                    </View>
                </View>
            </Pressable>
            <Pressable
                onPress={() => {toggleFavorite()}}
                style={ favorite }>
                <Image
                    resizeMode={'contain'}
                    source={ favor ? require('./heart-active.png') : require('./heart.png') }
                    style={ favorite.img }
                ></Image>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    link: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'flex-start',
        flex: 1
    },
    cover: {
        width: 42,
        height: 42,
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    descript: {
        paddingLeft: 12,
    },
    favorite: {
        width: 18,
        height: 18,
        marginLeft: 15,
        padding: 1,

        img: {
            width: 16,
            height: 16,
        },
    },
    foot: {
        flexDirection: 'row',
        text: {
            fontSize: 10,
            color: '#BEBDBD'
        },
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5
    }
})

export default Book;
