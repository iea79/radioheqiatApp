import React, { useEffect, useCallback, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
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
        }).catch(() => {
            setCategory([]);
        });
    }, [category]);

    return (
        <View style={ ss.beforePlayer }>
            <FlatList
                data={ category }
                style={ ss.content }
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

export default Categories;
