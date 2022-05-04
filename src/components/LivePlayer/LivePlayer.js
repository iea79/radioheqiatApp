import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator, Keyboard } from 'react-native';
import Sound from 'react-native-sound';
import RestService from '../../services/RestService';
import { setLive, setBookPlayed } from '../../actions/actions';

const restService = new RestService();

const LivePlayer = ({ route }) => {
    const dispatch = useDispatch();
    const {
        bookPlayed: {
            audio, authorName, cover, title
        },
        live, livePaused, token
    } = useSelector(state => state);
    const [ isEnded, setIsEnded ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ player, setPlayer ] = useState(null);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const [ trackDuration, setTrackDuration ] = useState(0);
    const [ keyboardOpen, setKeyboardOpen ] = useState(false);
    const timerRef = useRef();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardOpen(true));
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardOpen(false));

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [route]);

    useEffect(() => {
        if (!audio) {
            getNextBook();
        }
    },[]);

    useEffect(() => {
        if (audio && !player) {
            setNewPlayer();
        }
    },[audio]);

    useEffect(() => {
        if (player) {
            if (isLoaded && live && !livePaused) {
                playAudio();
                setProgress();
            } else {
                player.pause();
                clearInterval(timerRef.current);
            }
        }
    }, [live, livePaused, isLoaded]);

    useEffect(() => {
        if (isEnded) {
            getNextBook();
        }
    },[isEnded]);

    const setNewPlayer = async () => {
        dispatch(setLive(false));
        let player = await new Sound(audio, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            } else {
                setTrackDuration(player.getDuration() * 1000);
                dispatch(setLive(true));
                setIsLoaded(true);
            }
        });
        setPlayer(player);
    };

    const playAudio = () => {
        player.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                setIsEnded(true);
            }
        });
    };

    const setProgress = () => {
        clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            player.getCurrentTime(seconds => {
                setTrackProgress((seconds*1000)/trackDuration * 100);
            });
        }, 1000);
    };

    const getNextBook = useCallback(() => {
        console.log('getNextBook');
        clearInterval(timerRef.current);

        restService.getBooks('?orderby=rand').then(json => {
            console.log(json[0]);
            setIsEnded(false);
            setTrackDuration(0);
            setTrackProgress(0);
            setPlayer(null);
            setIsLoaded(false);
            dispatch(setBookPlayed(json[0]));
        }).catch(() => {
            getNextBook();
        });
    }, []);

    if (!token) {
        return <View></View>;
    }

    return (
        <View style={ keyboardOpen ? styles.player.notFly : styles.player }>
            <View style={styles.wrapper}>
                <View style={styles.img}>
                    {
                        !isLoaded ?
                        <ActivityIndicator />
                        :
                        <Image
                            style={{width: '100%', height: '100%', borderRadius: 10}}
                            source={{
                                uri: cover
                        }} />
                    }
                </View>
                {
                    !isLoaded ?
                    <ActivityIndicator style={styles.descript} />
                    :
                    <View style={styles.descript}>
                        <Text numberOfLines={1} style={styles.title}>
                            { title }
                        </Text>
                        <Text style={styles.author}>
                            { authorName }
                        </Text>
                    </View>
                }
            </View>
            <Pressable
                style={ styles.btn }
                onPress={() => {
                    dispatch(setLive(!live));
                }}
            >
                <Image
                    style={ styles.btn }
                    source={ live && !livePaused ? require('../../assets/img/pause.png') : require('../../assets/img/play.png') }
                    />
            </Pressable>
            <View style={ styles.progress }>
                <View style={{
                    backgroundColor: '#F6D378',
                    height: 2,
                    borderRadius: 2,
                    width: trackProgress + '%'
                }}>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
        // display: 'none',
        backgroundColor: '#702072',
        color: '#FFFFFF',
        position: 'absolute',
        borderTopWidth: 1,
        borderTopColor: '#915087',
        borderTopStyle: 'solid',
        left: 0,
        bottom: 81,
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        notFly: {
            backgroundColor: '#702072',
            color: '#FFFFFF',
            position: 'absolute',
            borderTopWidth: 1,
            borderTopColor: '#915087',
            borderTopStyle: 'solid',
            left: 0,
            bottom: 0,
            width: '100%',
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '70%',
        // flexGrow: 0.6,
        marginRight: 17
    },
    title: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginBottom: 5
    },
    author: {
        fontSize: 10,
        color: '#FFFFFF',
    },
    descript: {},
    img: {
        backgroundColor: '#9C83BC',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 42,
        height: 42,
        marginRight: 17
    },
    btn: {
        width: 40,
        height: 40,
        flex: 0,
    },
    progress: {
        backgroundColor: '#9C83BC',
        position: 'absolute',
        flex: 1,
        left: 0,
        bottom: 0,
        right: 0,
        height: 2,
    }
});

export default LivePlayer;
