import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Text, Pressable, Image, ScrollView, useWindowDimensions, ImageBackground } from 'react-native';
// import SoundPlayer from 'react-native-sound-player';
import Sound from 'react-native-sound';
import RenderHTML from "react-native-render-html";
import ss from '../../styles/index';
import { setLivePaused } from '../../actions/actions';

// const player = new SoundPlayer();
let player;
Sound.setCategory('Playback');

const BookScreen = ({ navigation, route }) => {
    // console.log(navigation);
    // console.log(route.params.data);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { userFavorites, livePaused } = useSelector(state => state);
    const { id, image, cover, authorName, authorRead, title, content, audio } = route.params.data;
    const [ isPlay, togglePlay ] = useState(false);
    const [ favor, toggleFavor ] = useState(false);
    const [ trackTime, setTrackDuration ] = useState('');
    const bg = { uri: image };

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
    }, []);

    useEffect(() => {
        // See notes below about preloading sounds within initialization code below.
        player = null;
        setTrackDuration('');

        if (!player) {
            player = new Sound(audio, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return;
                }
                // loaded successfully
                const playerTime = () => {
                    const msc = new Date(player.getDuration() * 1000);
                    console.log(msc);
                    let time = '';

                    if (msc <= 360000) {
                        time = `${msc.getMinutes()}min ${msc.getSeconds()}sec`;
                    } else {
                        time = `${msc.getHours()}h ${msc.getMinutes()}min ${msc.getSeconds()}sec`;
                    }

                    return time;
                }
                setTrackDuration(playerTime);
            });
        }
    },[audio]);
    // console.log(player);

    useEffect(() => {
        // console.log(audio);
        // SoundPlayer.loadUrl(audio);
        getTrackInfo();
    },[audio]);

    useEffect(() => {
        toggleFavor(false);
        // console.log(userFavorites);
        if (userFavorites.length) {
            userFavorites.forEach(item => {
                if (item == id) {
                    toggleFavor(true);
                }
            });
        }
    },[id]);

    useEffect(() => {
        if (isPlay) {
            dispatch(setLivePaused(true));
            player.play((success) => {
                if (success) {
                    console.log('successfully finished playing');
                    dispatch(setLivePaused(false));
                    togglePlay(false);
                } else {
                    console.log('playback failed due to audio decoding errors');
                }
            });
        } else {
            dispatch(setLivePaused(false));
            player.pause();
        }
    },[isPlay]);

    const getTrackInfo = useCallback(async () => {
        // await SoundPlayer.getInfo().then(info => {
        //     console.log(info);
        //     setTrackDuration(info.duration);
        //     // return info.duration;
        // });
        // const rezTime =
        // return time.getMinutes() + 'min ' + time.getSeconds() + 'sec';
        // return time + 'ms';
    }, []);

    return (
        <ScrollView>
            <View style={ styles.wrapper }>
                <ImageBackground
                    style={ styles.top }
                    resizeMode={'contain'}
                    source={bg}
                    >
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
                        <Text style={ styles.player.time }>{ trackTime }</Text>
                    </View>
                    <View style={ styles.autor, styles.top.author }>
                        <Text style={ styles.autor.label }>
                            Հեղինակ:
                        </Text>
                        <Text style={ styles.autor.name }>{ authorName }</Text>
                    </View>
                </ImageBackground>
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
        paddingTop: 0,
        paddingLeft: 25,
        paddingRight: 25,
        paddingBottom: 73,
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
    // cover: {
    //     position: 'absolute',
    //     backgroundColor: '#82278A',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //
    //     img: {
    //         width: '100%',
    //         height: '100%',
    //     }
    // },
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
