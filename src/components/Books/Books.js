import React, { useEffect, useState, useCallback } from 'react';
import { Text, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Book from './Book';
import RestService from '../../services/RestService';
import ss from '../../styles/index';

const restService = new RestService();
const BooksHeader = () => {
    return <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 34, color: '#ffffff' }}>Հիմա լսում եմ</Text>
}

const Books = ({ navigation, route }) => {
    const [ bookList, setBookList ] = useState([]);
    console.log(route);

    useEffect(() => {
        // alert('effect');
        if (!bookList.length) {
            setList();
        }
        // console.log(bookList[0]);
    }, [bookList]);

    const setList = useCallback(() => {
        restService.getBooks(`?orderby=popular`, 30).then(json => {
            setBookList(json);
        }).catch(() => {
            setBookList([]);
        });
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                style={ ss.beforePlayer }
                data={bookList}
                renderItem={({ item }) => {
                    return bookList.length && <Book data={item} navigation={navigation} route={route} />;
                }}
                ListHeaderComponent={BooksHeader}
            />
        { !bookList.length ? <ActivityIndicator style={ styles.loader } /> : null }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {},
    loader: {
        alignSelf: 'center'
    }
})

export default Books;
