import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CategoryItem from './CategoryItem';
import RestService from '../../services/RestService';
import ss from '../../styles';

const restService = new RestService();

const Categories = ({ navigation }) => {
    console.log('Categories');
    // console.log(navigation);
    const [ category, setCategory ] = useState([]);

    useEffect(() => {
        if (!category.length) {
            setCats();
        }
    }, [category]);

    const setCats = useCallback(() => {
        restService.getBooksCategories('?parent=0').then(json => {
            setCategory(json);
        }).catch(err => {
            setCategory([]);
        });
    }, [category]);

    return (
        <View style={ ss.content }>
            <FlatList
                data={ category }
                style={ styles.list }
                renderItem={({ item }) => {
                    return <CategoryItem
                    data={item} navigation={ navigation }
                    />;
                }}
            />
        { !category.length ? <ActivityIndicator style={ ss.loader } /> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        alignSelf: 'center'
    }
})

export default Categories;
