import React, { useState, useLayoutEffect, useCallback } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import Slide from './Slide';
import RestService from '../../services/RestService';

// const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 5 }).map((el, i) => {
    return {
        id: i,
        image: `https://picsum.photos/1440/2842?random=${i}`,
        title: `This is the title! ${i + 1}`,
        subtitle: `This is the subtitle ${i + 1}!`,
    };
});

const restService = new RestService();

const CategoriesSlider = () => {
    const [ category, setCategory ] = useState([]);

    useLayoutEffect(() => {
        if (!category.length) {
            setCats();
        }
    }, [category]);

    const setCats = useCallback(() => {
        restService.getBooksCategories().then(json => {
            setCategory(json);
        }).catch(err => {
            setCategory([]);
        });
    }, [category]);

    return (
        <FlatList
            horizontal={true}
            data={ category }
            style={ styles.list }
            renderItem={({ item }) => {
                return <Slide data={item} />;
            }}
        />
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 0,
        alignSelf: 'flex-start',
        marginRight: -15,
        marginLeft: -15,
        marginBottom: 46,
        // height: 180
    }
})

export default CategoriesSlider;
