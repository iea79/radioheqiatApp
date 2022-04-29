import React from 'react';
import { Pressable, StyleSheet, Text, Image } from 'react-native';

const CategoryItem = ({ data, navigation }) => {
    // console.log(data);
    // console.log(navigation);
    const { slide, img, title } = styles;
    const { media: { cover }, id, name } = data;

    const setCover = () => {
        if (cover) {
            return <Image
                resizeMode={'cover'}
                source={{ uri: cover }}
                style={ img }
                ></Image>
        }
    }

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('Category', {
                    id: id,
                    name: name,
                });
            }}
            style={ slide }
            >
            {setCover()}
            <Text style={ title }>{data.name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    slide: {
        height: 180,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        // overflow: 'hidden',
        backgroundColor: '#82278A',
        marginBottom: 10,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    img: {
        position: 'absolute',
        // flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff',
        width: 196,
        paddingTop: 18,
        paddingLeft: 28,
        paddingRight: 28,
        paddingBottom: 18
    }
})


export default CategoryItem;
