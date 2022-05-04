import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import ss from '../../styles';
import RestService from '../../services/RestService';
import CategorySub from '../../components/CategorySub';
import Book from '../../components/Books/Book';

const restService = new RestService();

const Category = ({ route, navigation }) => {
    const { id } = route.params;
    console.log(route.name);
    const [ parent, setParent ] = useState([]);
    const [ loaded, setLoaded ] = useState(true);
    const [ books, setBooks ] = useState([]);

    useEffect(() => {
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

    const renderContent = () => {
        if (parent.length) {
            return (
                <FlatList
                    data={ parent }
                    style={ ss.content }
                    renderItem={({ item }) => {
                        return <CategorySub
                            data={item} navigation={ navigation } route={ route }
                        />;
                    }}
                    />
            )
        }
        if (books.length) {
            return (
                <FlatList
                    data={ books }
                    style={ ss.content }
                    renderItem={({ item }) => {
                        return <Book
                            data={item} navigation={ navigation }  route={ route }
                        />;
                    }}
                    />
            )
        }
    }

    return (
        <View style={ ss.beforePlayer }>
            {
                loaded ? <ActivityIndicator style={ ss.loader } /> : renderContent()
            }
        </View>
    )
};

export default Category;
