import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    View, StyleSheet, Text, Pressable, Image,
    ScrollView, useWindowDimensions, ImageBackground, StatusBar, ActivityIndicator
} from 'react-native';
import { SvgXml, SvgUri } from 'react-native-svg';
import Sound from 'react-native-sound';
import RenderHTML from "react-native-render-html";
import ss from '../../styles/index';
import { setLivePaused } from '../../actions/actions';
import AutorizationService from '../../services/AutorizationService';

// const player = new SoundPlayer();
// let player;
// Sound.setCategory('Playback');

const authService = new AutorizationService();



const BookScreen = ({ navigation, route }) => {
    // console.log(navigation);
    console.log(route.params.data);
    const bgGrade = `<svg width="100%" height="100%" viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="-14" width="100%" height="100%" fill="url(#paint0_linear_5_5115)"/>
        <defs>
            <linearGradient id="paint0_linear_5_5115" x1="187" y1="100" x2="259.856" y2="315.917" gradientUnits="userSpaceOnUse">
                <stop stop-color="#82278A"/>
                <stop offset="1" stop-color="#6D2BD7"/>
            </linearGradient>
        </defs>
    </svg>

    `;
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { userFavorites, livePaused, userId, token } = useSelector(state => state);
    const { id, image, cover, authorName, authorRead, title, content, audio } = route.params.data;
    const [ svgError, setSvgError ] = useState(false);
    const [ isPlay, togglePlay ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);
    const [ player, setPlayer ] = useState(null);
    const [ favor, toggleFavor ] = useState(false);
    const [ trackTime, setTrackDuration ] = useState('');
    // const bg = ;

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                height: 60,
                backgroundColor:'#82278A',
                shadowColor: 'transparent'
            },
            headerTitleStyle: {
                fontSize: 14,
                paddingLeft: 0,
                paddingRight: 10,
                color: '#ffffff',
            }
        });
        setPlayer(null);
        setLoaded(false);
        authService.addToHistoryList(userId, id, token).then(resp => {
            console.log(resp);
        });
    }, [audio]);

    useEffect(() => {
        // See notes below about preloading sounds within initialization code below.
        // setPlayer(null);
        // setTrackDuration('');

        if (!player && audio) {
            const sound = new Sound(audio, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }

                // playAudio(player);
                // loaded successfully
                const playerTime = () => {
                    const msc = new Date(sound.getDuration() * 1000);
                    console.log(msc);
                    let time = '';

                    if (msc <= 3600000) {
                        time = `${msc.getMinutes()}min ${msc.getSeconds()}sec`;
                    } else {
                        time = `${msc.getHours()}h ${msc.getMinutes()}min ${msc.getSeconds()}sec`;
                    }

                    return time;
                }
                setTrackDuration(playerTime);
                setLoaded(true);
            });
            setPlayer(sound);
        }
    },[player, audio]);

    useEffect(() => {
        toggleFavor(false);
        if (userFavorites.length) {
            userFavorites.forEach(item => {
                if (item == id) {
                    toggleFavor(true);
                }
            });
        }
    },[id]);

    useEffect(() => {
        if (player && player._loaded) {
            if (isPlay) {
                playAudio(player);
            } else {
                dispatch(setLivePaused(false));
                player.pause();
            }
        }
    },[isPlay]);

    const playAudio = useCallback((player) => {
        dispatch(setLivePaused(true));
        player.play((success) => {
            if (success) {
                console.log('successfully finished playing');
                dispatch(setLivePaused(false));
                togglePlay(false);
            }
        });
    },[]);

    // console.dir(SvgUri);
    return (
        <ScrollView>
            <StatusBar
                backgroundColor="#82278A"
                 />
            <View style={ styles.wrapper }>
                <View
                    style={ styles.top }
                    >
                    <View style={ styles.cover }>
                        <SvgXml style={ styles.cover.bg } xml={bgGrade} />
                        { image && !svgError ?
                            <SvgUri
                                onError={() => setSvgError(true)}
                                style={ styles.cover.img }
                                uri={ image }
                            />
                            :
                            <Image style={ styles.cover.img } source={{ uri: cover }} />
                        }
                    </View>
                    <View style={ styles.head }>
                        <Text style={ styles.title }>
                            { title }
                        </Text>
                        <Pressable
                            style={ styles.like }
                            resizeMode={'contain'}
                            onPress={() => {
                                toggleFavor(!favor);
                            }}
                        >
                            <Image
                                style={ styles.like.icon }
                                source={ favor ? require('../../assets/img/heart-active.png') : require('../../assets/img/heart.png') }
                                />
                        </Pressable>
                    </View>
                    <View style={ styles.player }>
                        <Pressable
                            style={ styles.player.btn }
                            disabled={!loaded}
                            onPress={() => {
                                togglePlay(!isPlay);
                                // dispatch(setLive(!live));
                            }}
                        >
                            <Image
                                style={ styles.player.btn.img }
                                source={ isPlay ? require('../../assets/img/pause.png') : require('../../assets/img/play.png') }
                                />
                        </Pressable>
                        {
                            trackTime ?
                            <Text style={ styles.player.time }>{ trackTime }</Text>
                            :
                            <ActivityIndicator />
                        }

                    </View>
                    <View style={ styles.autor, styles.top.author }>
                        <Text style={ styles.autor.label }>
                            Հեղինակ:
                        </Text>
                        <Text style={ styles.autor.name }>{ authorName }</Text>
                    </View>
                </View>
                <View style={ styles.cats }>
                    <View style={ styles.cat }>
                    </View>
                    <View style={ styles.cat }>
                    </View>
                </View>
                <View style={ styles.text }>
                    <RenderHTML tagsStyles={ styles.text.html } contentWidth={width} source={{ html: content }} />
                </View>
                {
                    authorRead ? <View stylereact-native-linear-gradient={ styles.autor, styles.row }>
                        <Text style={ styles.autor.label }>Կարդում է.</Text>
                        <Text style={ styles.autor.name }>{ authorRead }</Text>
                    </View> : null
                }
                <View style={ styles.last }></View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 0,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 73,
        backgroundColor:'#381466',
    },
    top: {
        paddingTop: 22,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 22,
        marginRight: -26,
        marginLeft: -26,
        marginBottom: 30,
        minHeight: 300,
        backgroundColor: '#82278A',
        // justifyContent: "flex-end",
        // alignItems: "flex-end",

        author: {
            flex: 1,
            justifyContent: 'flex-end',
            // alignItems: 'flex-end'
        }
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 23
    },
    title: {
        fontSize: 22,
        lineHeight: 26,
        fontWeight: 'bold',
        marginRight: 15,
        color: '#ffffff'
    },
    like: {
        width: 20,
        height: 17,
        marginTop: 4,

        icon: {
            width: '100%',
            height: '100%',
        }
    },
    player: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        // flex: 1,

        btn: {
            width: 47,
            height: 47,
            marginRight: 14,

            img: {
                width: '100%',
                height: '100%',
            }
        },
        time: {
            fontSize: 10,
            color: '#D9A7FF'
        },
    },
    cover: {
        position: 'absolute',
        backgroundColor: '#82278A',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',

        img: {
            width: '100%',
            height: '100%',
        },
        bg: {
            position: 'absolute',
            width: '100%',
            height: '100%',
        }
    },
    autor: {
        fontSize: 12,
        label: {
            color: '#D9A7FF',
            marginRight: 8
        },
        name: {
            color: '#ffffff',
            fontWeight: 'bold',
        }
    },
    cats: {},
    cat: {},
    text: {
        marginBottom: 20,

        html: {
            p: {
                color: '#CCAEFF',
                fontSize: 16,
                lineHeight: 24
            }
        }
    },
    row: {
        flexDirection: 'row',
    },
    last: {
        height: 50
    }
})

export default BookScreen;
