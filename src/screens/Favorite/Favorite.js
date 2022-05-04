import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import AutorizationService from '../../services/AutorizationService';
import RestService from '../../services/RestService';
import ss from '../../styles/index';
import Book from '../../components/Books/Book';

const authService = new AutorizationService();
const restService = new RestService();

const Favorite = ({ navigation, route }) => {
    console.log('Favorite', route);
    const { userId, token, userFavorites } = useSelector(state => state);
    // const state = useSelector(state => state);
    const [ favorite, toggleFavorite ] = useState(true);
    const [ history, toggleHistory ] = useState(false);
    const [ data, setData ] = useState([]);
    // console.log(state);

    useEffect(() => {
        if (favorite) {
            setData([]);
            setFavorite();
        }
    },[favorite, userFavorites]);

    useEffect(() => {
        if (history) {
            setData([]);
            setHistory();
        }
    },[history]);

    const setFavorite = async () => {
        await authService.getFavoriteList(userId, token).then(resp => {
            restService.getBooksList(resp.data).then(resp => {
                setData(resp);
            });
        })
    }

    const setHistory = async () => {
        await authService.getHistoryList(userId, token).then(resp => {
            restService.getBooksList(resp.data).then(resp => {
                setData(resp);
            });
        })
    }

    return (
        <View style={ ss.content }>
            <View style={{  paddingBottom: 105 }}>
                <View style={ styles.tabs }>
                    <Pressable
                        style={ styles.tab }
                        disabled={favorite}
                        onPress={() => {
                            toggleFavorite(true);
                            toggleHistory(false);
                        }}
                    >
                        <Text style={ favorite ? styles.tab.nameCurrent : styles.tab.name }>Պատմություն</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.tab }
                        disabled={history}
                        onPress={() => {
                            toggleHistory(true);
                            toggleFavorite(false);
                        }}
                    >
                        <Text style={ history ? styles.tab.nameCurrent : styles.tab.name }>Ֆավորիտներ</Text>
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
                { !data.length ? <ActivityIndicator style={ ss.loader } /> : null }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        marginBottom: 30,
    },
    tab: {
        marginRight: 25,
        name: {
            color: '#7B4FC8',
            fontSize: 16,
            fontWeight: 'bold',
            paddingBottom: 10,

        },
        nameCurrent: {
            fontSize: 16,
            fontWeight: 'bold',
            color: '#F6D378',
            paddingBottom: 10,
            borderBottomWidth: 2,
            // borderBottomStyle: 'solid',
            borderBottomColor: '#F6D378'
        }
    },
    list: {
        marginLeft: -26,
        marginRight: -26,
        paddingLeft: 26,
        paddingRight: 26,
    }
})

export default Favorite;
