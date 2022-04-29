import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Slide from './Slide';
import RestService from '../../services/RestService';

// const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const restService = new RestService();

const CategoriesSlider = ({ navigation, route }) => {
    console.log(navigation);
    const [ category, setCategory ] = useState([]);

    useLayoutEffect(() => {
        if (!category.length) {
            setCats();
        }
    }, [category]);

    const setCats = useCallback(() => {
        if (!category.length) {
            restService.getBooksCategories('').then(json => {
                // console.log(json);
                setCategory(json);
            }).catch(err => {
                setCategory([]);
            });
        }
    }, [category]);

    return (
        <>
            <FlatList
                horizontal={true}
                data={ category }
                style={ styles.list }
                renderItem={({ item }) => {
                    return <Slide data={item} navigation={navigation} route={route} />;
                }}
            />
            { !category.length ? <ActivityIndicator style={ styles.loader } /> : null }
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        // flex: 1,
        boxSizing: 'border-box',
        height: 180,
        alignSelf: 'flex-start',
        paddingLeft: 25,
        // paddingRight: 10,
        marginRight: -25,
        marginLeft: -25,
        marginBottom: 46,
        // height: 180
    },
    loader: {
        alignSelf: 'center'
    }
})

export default CategoriesSlider;
