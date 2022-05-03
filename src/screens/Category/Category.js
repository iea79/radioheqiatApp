import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import ss from '../../styles';
import RestService from '../../services/RestService';
import CategorySub from '../../components/CategorySub';
import Book from '../../components/Books/Book';

const restService = new RestService();

const Category = ({ route, navigation }) => {
    console.log('Category');
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { id } = route.params;
    console.log(route.params);
    // console.log(itemId);
    const [ parent, setParent ] = useState([]);
    const [ loaded, setLoaded ] = useState(true);
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
        console.log('route change');
        setParent([]);
        setBooks([]);
        setLoaded(true);
    },[route]);

    useEffect(() => {
        if (loaded) {
            checkCategory();
        }
    }, [loaded]);

    const checkCategory = useCallback(async () => {
        await restService.getBooksCategories(`?parent=${id}`).then(cats => {
            if (cats.length) {
                console.log('Parent categories === ', cats);
                setParent(cats);
                setLoaded(false);
            } else {
                console.log('Parent categories === ', cats);
                restService.getAllBooksCategory(id).then(json => {
                    console.log('Books category === ', cats);

                    setBooks(json);
                    setLoaded(false);
                }).catch(err => {
                    console.log(err);
                    setBooks([]);
                    setLoaded(false);
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }, [route]);

    return (
        <View style={ ss.content }>
            {
                parent.length ?
                <FlatList
                    data={ parent }
                    style={ styles.list }
                    renderItem={({ item }) => {
                        return <CategorySub
                            data={item} navigation={ navigation } route={ route }
                        />;
                    }}
                    />
                :
                <FlatList
                    data={ books }
                    style={ styles.list }
                    renderItem={({ item }) => {
                        return <Book
                            data={item} navigation={ navigation }  route={ route }
                        />;
                    }}
                    />
            }
            { loaded ? <ActivityIndicator style={ ss.loader } /> : null }
        </View>
    )
};

const styles = StyleSheet.create({
    list: {
        flex: 0
    }
})

export default Category;
