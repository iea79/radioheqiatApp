import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import RestService from '../../services/RestService';
import { setLiveLoader, setLive, setBookPlayed, setLivePosition, setLiveDuration } from '../../actions/actions';

const restService = new RestService();

const LivePlayer = (props) => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { bookPlayed: { audio, authorName, cover, title }, live, livePaused, livePosition, liveDuration, token } = useSelector(state => state);
    const [ isEnded, setIsEnded ] = useState(live);
    const [ isPlaing, setIsPlaying ] = useState(false);
    const [ trackProgress, setTrackProgress ] = useState(0);
    const timerRef = useRef();

    useEffect(() => {
        if (token) {
            if (audio) {
                setIsPlaying(false);
                SoundPlayer.loadUrl(audio);
            } else {
                getNextBook();
            }
        }
    }, [audio, token]);

    useEffect(() => {
        if (audio) {
            // console.log(trackProgress);
            if (live && !livePaused && token) {
                // if (!isPlaing) {
                // SoundPlayer.seek(trackProgress);
                SoundPlayer.play();
                setProgress();
                // SoundPlayer.onFinishedPlaying = () => {
                //     setIsEnded(true);
                // };
                // setIsPlaying(true);
                // }
                // setIsPlaying(false);
            } else {
                SoundPlayer.pause();
                clearInterval(timerRef.current);
                // setIsPlaying(false);
            }
        };
    }, [live, livePaused, audio, token]);

    useEffect(() => {
        console.log('isEnded');
        setTrackProgress(0);
    },[isEnded]);

    // useEffect(() => {
    //     if (+trackProgress > 99) {
    //         setTrackProgress(0);
    //         getNextBook();
    //     }
    // },[trackProgress]);

    const getTrackInfo = useCallback(async () => {
        await SoundPlayer.getInfo().then(info => {
            // console.log(info);
            setTrackProgress(info.currentTime / info.duration * 100);
        });
    }, []);

    const setProgress = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            // console.log('update');
            getTrackInfo();
        }, 1000);
    },[]);

    const getNextBook = useCallback(() => {
        console.log('getNextBook');
        // setTrackProgress(0);
        setIsPlaying(false);

        restService.getBooks('?orderby=rand').then(json => {
            console.log(json[0]);
            dispatch(setBookPlayed(json[0]));
        }).catch(() => {
            // getNextBook();
        });
    }, []);

    // const percent = livePosition / liveDuration * 100 + '%';

    if (!token) {
        return <View></View>;
    }

    if (!audio) {
        return <View></View>;
    }

    return (
        <View style={styles.player}>
            <View style={styles.wrapper}>
                <View style={styles.img}>
                    <Image
                        style={{width: '100%', height: '100%', borderRadius: 10}}
                        source={{
                            uri: cover
                        }} />
                </View>
                <View style={styles.descript}>
                    <Text style={styles.title}>
                        { title }
                    </Text>
                    <Text style={styles.author}>
                        { authorName }
                    </Text>
                </View>
            </View>
            <Pressable
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
        alignItems: 'center'
    },
    wrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        flx: 1,
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
        width: 42,
        height: 42,
        marginRight: 17
    },
    btn: {
        width: 40,
        height: 40,
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
