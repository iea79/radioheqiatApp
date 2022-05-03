import 'react-native-gesture-handler';
import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Image, StatusBar } from 'react-native';
import { setMessage, setBookPlayed, setLive, setLivePaused, setLivePosition, setFavorites, setLiveLoader, getToken, setEmail, setName, setUserId } from './actions/actions';
import ss from './styles/index';
import LivePlayer from './components/LivePlayer';
import AutorizationService from './services/AutorizationService';
import Welcome from './screens/Welcome';
import Login from './screens/auth/Login';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, FavoriteStackScreen, CatalogStackScreen, SearchStackScreen, AuthStackScreen, WelcomStackScreen } from './navigate';
// import SplashScreen from 'react-native-splash-screen';

// console.log(LogBox);

// LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    'new NativeEventEmitter',
    'Remote debugger'
]);

const authService = new AutorizationService();
const Tab = createBottomTabNavigator();
const STYLES = ['default', 'dark-content', 'light-content'];

const App = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const store = useSelector(state => state);
    const { live, token } = useSelector(state => state);
    const [ loaded, setLoaded ] = useState(true);

    if (live === undefined) {
        dispatch(setBookPlayed([]));
        dispatch(setLive(true));
        dispatch(setLivePaused(false));
        dispatch(getToken(false));
        dispatch(setFavorites([]));
        // dispatch(setLiveLoader(true));
    }
    useEffect(() => {
        if (loaded) {
            checkToken();
        }
    },[loaded]);

    useEffect(() => {
        console.log('App === ', store);

        if (token) {
            checkUser();
        }
    }, [token])

    const checkUser = async () => {
        await authService.validateToken(token).then(resp => {
            console.log('validete then === ', resp);
            console.log(resp);
            const { ID, display_name, user_email } = resp.data.user;
            dispatch(setUserId(ID));
            dispatch(setName(display_name));
            dispatch(setEmail(user_email));

            authService.getFavoriteList(ID, token).then(resp => {
                console.log('Home getFavoriteList ===', resp);
                dispatch(setFavorites(resp.data));
            }).catch(err => {
                console.log('Home getFavoriteList === ', err);
                dispatch(setFavorites([]));
            });
            setTimeout(function () {
                setLoaded(false);
            }, 500);
        }).catch(err => {
            dispatch(getToken(false));
            AsyncStorage.removeItem('token');
        })
    }

    const checkToken = async () => {
        console.log('checkToken');
        await AsyncStorage.getItem('token')
            .then(token => {
                console.log('checkToken then === ', token);
                if (token && token !== false && token !== undefined) {
                    console.log('checkToken set token');
                    dispatch(getToken(token));
                    setTimeout(function () {
                        setLoaded(false);
                    }, 1000);
                }
            })
            .catch(err => {
                console.log('checkToken err === ', err);
                console.log(err);
            });
    }

    return (
        <>
            <StatusBar
                backgroundColor="#381466"
                 />
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                            headerShown: false,
                            tabBarStyle: ss.tabBarStyle,
                            tabBarActiveTintColor: '#F6D378',
                            tabBarInactiveTintColor: 'white',
                            tabBarHideOnKeyboard: true,
                            tabBarIcon: ({ focused, image }) => {
                                if (route.name === 'HomeScreen') {
                                    image = focused ? require('./assets/img/home-icon-focus.png') : require('./assets/img/home-icon.png')
                                }
                                if (route.name === 'FavoriteScreen') {
                                    image = focused ? require('./assets/img/favor-icon-focus.png') : require('./assets/img/favor-icon.png')
                                }
                                if (route.name === 'CatalogScreen') {
                                    image = focused ? require('./assets/img/cat-icon-focus.png') : require('./assets/img/cat-icon.png')
                                }
                                if (route.name === 'SearchScreen') {
                                    image = focused ? require('./assets/img/search-icon-focus.png') : require('./assets/img/search-icon.png')
                                }

                                // You can return any component that you like here!
                                return <Image source={image} style={{ width: 32, height: 32 }} />
                            },
                        }
                    )}
                    >
                    { loaded ?
                        <Tab.Screen name="WelcomScreen" component={WelcomStackScreen} options={{ title: '' }} />
                        :
                        !token ?
                            <Tab.Screen name="AuthScreens" component={AuthStackScreen} options={{ title: 'Իմ գրքերը' }} />
                            :
                                <>
                                    <Tab.Screen
                                        name="HomeScreen"
                                        component={HomeStackScreen}
                                        options={{
                                            // title: 'տուն',
                                            // headerTitle: props => <LogoTitle {...props} />,
                                            // headerRight: () => (
                                            //     <Button
                                            //         onPress={() => alert('This is a button!')}
                                            //         title="Info"
                                            //         color="#fff"
                                            //     />
                                            // ),
                                        }}
                                    />
                                    <Tab.Screen
                                        name="FavoriteScreen"
                                        component={FavoriteStackScreen}
                                        options={{ title: 'Իմ գրքերը' }}
                                        listeners={({ navigation, route }) => ({
                                            tabPress: e => {
                                                console.log(route);
                                                navigation.navigate('FavoriteScreen');
                                            },
                                        })}
                                    />
                                    <Tab.Screen
                                        name="CatalogScreen"
                                        component={CatalogStackScreen}
                                        options={{ title: 'Կատալոգ' }}
                                        listeners={({ navigation, route }) => ({
                                            tabPress: e => {
                                                console.log(e);
                                                console.log(navigation);
                                                console.log(route.name);
                                                if (route.name && route.name === 'CatalogScreen' && route.name === 'Categories') {
                                                    navigation.navigate('Categories');
                                                }
                                            },
                                        })}
                                    />
                                    <Tab.Screen name="SearchScreen" component={SearchStackScreen} options={{ title: 'Որոնում' }} />
                                </>
                    }
                </Tab.Navigator>
                { !loaded ? <LivePlayer /> : null }
            </NavigationContainer>
        </>
    )
}

export default App;
