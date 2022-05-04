import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Slide from './Slide';
import RestService from '../../services/RestService';
import ss from '../../styles/index';

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
            }).catch(() => {
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
            { !category.length ? <ActivityIndicator style={ ss.loader } /> : null }
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        // boxSizing: 'border-box',
        minHeight: 180,
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginRight: -25,
        marginLeft: -25,
        marginBottom: 46,
    },
})

export default CategoriesSlider;
