import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Pressable, Image, FlatList, ActivityIndicator } from 'react-native';
import ss from '../../styles/index';
import RestService from '../../services/RestService';
import Book from '../../components/Books/Book';

const restService = new RestService();

const Search = ({ navigation }) => {
    const [ search, setSearch ] = useState('');
    const [ loader, toggleLoader ] = useState(false);
    const [ data, setData ] = useState('');

    useEffect(() => {
        getSearchRezults();
    },[search]);

    const getSearchRezults = async () => {
        toggleLoader(true);
        if (search.length > 0) {
            console.log('search');
            await restService.getSearchData(search).then(resp => {
                console.log(resp);
                setData(resp);
                toggleLoader(false);
            });
        } else {
            toggleLoader(false);
        }
    }

    return (
        <View style={ ss.content }>
            <View style={ styles.top }>
                <View style={ styles.field }>
                    <TextInput
                        style={ styles.input, ss.input }
                        onChangeText={val => setSearch(val)}
                        defaultValue={search}
                        keyboardType="web-search"
                    />
                    <Pressable
                        style={ styles.searchBtn }
                        onPress={() => {
                            getSearchRezults();
                        }}
                        >
                        <Image
                            style={ styles.searchBtn.img }
                            source={ require('../../assets/img/search.png') } />
                    </Pressable>
                </View>
                <Pressable
                    onPress={() => {
                        setSearch('');
                        setData([]);
                        toggleLoader(false);
                    }}
                    style={ styles.reset }>
                    <Image
                        style={ styles.reset.img }
                        source={ require('../../assets/img/reset.png') } />
                </Pressable>
            </View>
            <FlatList
                data={ data }
                style={ styles.list }
                renderItem={({ item }) => {
                    return <Book
                        data={item} navigation={ navigation }
                        />;
                }}
                />
            { loader ? <ActivityIndicator style={ ss.loader } /> : null }
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    field: {
        flexGrow: 1
    },
    searchBtn: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',

        img: {
            width: 32,
            height: 32,
        }
    },
    reset: {
        width: 32,
        height: 32,
        marginLeft: 13,
        marginBottom: 20,

        img: {
            width: '100%',
            height: '100%',
        }
    },
    list: {},
});

export default Search;
