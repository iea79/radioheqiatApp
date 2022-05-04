import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox, Image, StatusBar } from 'react-native';
import { setBookPlayed, setLive, setLivePaused, setLiveLoader, setFavorites, getToken, setEmail, setName, setUserId } from './actions/actions';
import ss from './styles/index';
import LivePlayer from './components/LivePlayer';
import AutorizationService from './services/AutorizationService';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStackScreen, FavoriteStackScreen, CatalogStackScreen, SearchStackScreen, AuthStackScreen, WelcomStackScreen } from './navigate';
<<<<<<< HEAD
=======
import { navigationRef } from './navigate/RootNavigation';
>>>>>>> 8881fe7f5c0efad593e064cb1c0f12fe507c3468

LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
    'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    'new NativeEventEmitter',
    'Remote debugger',
    'Can\'t perform a React state',
]);

const authService = new AutorizationService();
const Tab = createBottomTabNavigator();
// const STYLES = ['default', 'dark-content', 'light-content'];
const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: '#381466',
    card: '#381466',
    primary: '#381466',
    text: '#ffffff'
  },
};

console.log('MyTheme', MyTheme);

const App = () => {
    const dispatch = useDispatch();
    const { live, token, liveLoader } = useSelector(state => state);
    // const [ loaded, setLoaded ] = useState(liveLoader);

    if (live === undefined) {
        dispatch(setBookPlayed([]));
        dispatch(setLive(true));
        dispatch(setLivePaused(false));
        dispatch(getToken(false));
        dispatch(setFavorites([]));
    }
    useEffect(() => {
        if (!liveLoader) {
            checkToken();
        }
    },[liveLoader]);

    useEffect(() => {
        if (token) {
            checkUser();
        }
    }, [token])

    const checkUser = async () => {
        await authService.validateToken(token).then(resp => {
            const { ID, display_name, user_email } = resp.data.user;
            dispatch(setUserId(ID));
            dispatch(setName(display_name));
            dispatch(setEmail(user_email));

            authService.getFavoriteList(ID, token).then(resp => {
                dispatch(setFavorites(resp.data));
            }).catch(() => {
                dispatch(setFavorites([]));
            });
            setTimeout(function () {
                dispatch(setLiveLoader(true));
            }, 500);
        }).catch(() => {
            dispatch(getToken(false));
            AsyncStorage.removeItem('token');
        })
    }

    const checkToken = async () => {
        await AsyncStorage.getItem('token')
        .then(token => {
            if (token && token !== false && token !== undefined) {
                dispatch(getToken(token));
                setTimeout(function () {
                    dispatch(setLiveLoader(true));
                }, 1000);
            } else {
                setTimeout(function () {
                    dispatch(setLiveLoader(true));
                }, 1000);
            }
        })
        .catch(() => {
        });
    }

    return (
            <NavigationContainer theme={MyTheme} ref={navigationRef}>
                <StatusBar
                    hidden={false}
                    backgroundColor="#381466"
                    barStyle={'light-content'}
                />
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
                    { !liveLoader ?
                        <Tab.Screen name="WelcomScreen" component={WelcomStackScreen} options={{ title: '' }} />
                        :
                        !token ?
                            <Tab.Screen name="AuthScreens" component={AuthStackScreen} options={{ title: 'Իմ գրքերը' }} />
                            :
                            <>
                                <Tab.Screen
                                    name="HomeScreen"
                                    component={HomeStackScreen}
                                    options={{ title: 'տուն' }}
                                    listeners={() => ({
                                        tabPress: () => {
                                            navigationRef.navigate('HomeScreen', {screen: 'Home'});
                                        },
                                    })}
                                />
                                <Tab.Screen
                                    name="FavoriteScreen"
                                    component={FavoriteStackScreen}
                                    options={{ title: 'Իմ գրքերը' }}
                                    listeners={() => ({
                                        tabPress: () => {
                                            navigationRef.navigate('FavoriteScreen', {screen: 'Favorite'});
                                        },
                                    })}
                                />
                                <Tab.Screen
                                    name="CatalogScreen"
                                    component={CatalogStackScreen}
<<<<<<< HEAD
                                    options={{ title: 'Կատալոգ' }}
                                    listeners={({ navigation, route }) => ({
                                        tabPress: e => {
                                            console.log(e);
                                            console.log(navigation);
                                            console.log(route.name);
                                            if (route.name && route.name === 'CatalogScreen' && route.name === 'Categories') {
                                                navigation.navigate('Categories');
                                            }
=======
                                    listeners={() => ({
                                        tabPress: () => {
                                            navigationRef.navigate('CatalogScreen', {screen: 'Categories'});
>>>>>>> 8881fe7f5c0efad593e064cb1c0f12fe507c3468
                                        },
                                    })}
                                />
                                <Tab.Screen name="SearchScreen" component={SearchStackScreen} options={{ title: 'Որոնում' }} />
                            </>
                    }
                </Tab.Navigator>
<<<<<<< HEAD
                { !loaded && token ? <LivePlayer /> : null }
=======
                { liveLoader && token ? <LivePlayer /> : null }
>>>>>>> 8881fe7f5c0efad593e064cb1c0f12fe507c3468
            </NavigationContainer>
    )
}

export default App;
