import React, { useLayoutEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, VirtualizedList } from 'react-native';
import Book from './Book';
import RestService from '../../services/RestService';

// const bookList = Array.from({ length: 15 }).map((el, i) => {
//     return {
//         id: i,
//         image: `https://picsum.photos/1440/2842?random=${i}`,
//         title: `Հովհաննես Թումանյան`,
//         subtitle: `Հեքիաթի հեղինակը`,
//         time: `1h 35min`,
//     };
// });

const restService = new RestService();

const BooksHeader = () => {
    return <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 34, color: '#ffffff' }}>Հիմա լսում եմ</Text>
}

const HomeBooks = () => {
    const [ bookList, setBookList ] = useState([]);

    useLayoutEffect(() => {
        // alert('effect');
        if (!bookList.length) {
            setList();
        }
        // console.log(bookList[0]);
    }, [bookList]);

    const setList = useCallback(() => {
        restService.getBooks(`?orderby=popular`, 30).then(json => {
            setBookList(json);
        }).catch(err => {
            setBookList([]);
        });
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                style={ styles.list }
                data={bookList}
                renderItem={({ item }) => {
                    return bookList.length && <Book data={item} />;
                }}
                ListHeaderComponent={BooksHeader}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    list: {}
})

export default HomeBooks;
