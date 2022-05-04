import React from 'react';
import { Text, View, Pressable, Image, StyleSheet } from 'react-native';

const CategorySub = ({ data, navigation }) => {
    console.log(data);
    const { id, name, media: { cover_small: cover } } = data;
    console.log('CategorySub');
    return (
        <Pressable
            style={ styles.item }
            onPress={() => {
                navigation.navigate('Category', {
                    id: id,
                    name: name,
                });
            }}
            >
            <View
                style={ styles.cover }
                >
            { cover ?
                <Image
                    style={ styles.img }
                    source={{
                    uri: cover
                }} />
            :  <View style={ styles.img }></View>
            }
            </View>
            <Text
                style={ styles.name }
                >{ name }</Text>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#684A9B',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        paddingTop: 24,
        paddingBottom: 24,
    },
    cover: {
        width: 30,
        height: 30,
        marginRight: 21
    },
    img: {
        borderRadius: 4,
        width: '100%',
        height: '100%',
        backgroundColor: '#905087'
    },
    name: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold'
    },
})

export default CategorySub;
