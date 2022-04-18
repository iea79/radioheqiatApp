import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import AutorizationService from '../../../services/AutorizationService';
import { getToken, setFavorites, setName, setEmail, setUserId, setPassword } from '../../../actions/actions';
import {
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Image,
    Text,
    Alert,
    View,
    TextInput,
    Pressable,
} from 'react-native';
import ss from '../../../styles';

const authService = new AutorizationService


const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { form, title, sub, register, fbText, fbImage, footer, loading } = loginStyles;
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    }, []);

    const saveToken = async (jwt) => {
        try {
            await AsyncStorage.setItem('token', jwt);
        } catch (e) {
            setLoader(false);
        } finally {
        }
    }

    const handleSubmit = async () => {
        setLoader(true);
        // console.log(email, password);
        const data = {email: email, password: password};
        const auth = await authService.authUser(data)
            .then(json => {
                console.log('authUser then === ', json);
                // setLoader(false);
                return json;
            })
            .catch(err => {
                console.log('authUser catch === ', err);
                return err;
                // setLoader(false);
            })

        if (auth.success) {
            // console.log('success');
            const { jwt } = auth.data;
            await authService.loginUser(jwt).then(resp => {
                console.log('loginUser', resp);
            }).catch(err => {
                console.log('loginUser === ', err);
                setLoader(false);
                // Alert.alert(err);
            });
            await authService.validateToken(jwt).then(resp => {
                console.log('validateToken', resp);
                const { user_email, ID: userId, display_name } = resp.data.user;

                dispatch(setEmail(user_email));
                dispatch(setName(display_name));
                dispatch(setUserId(userId));
                dispatch(setPassword(password));
                saveToken(jwt);
                dispatch(getToken(jwt));
                setLoader(false);

            }).catch(err => {
                console.log('validateToken === ', err);
                setLoader(false);
                // Alert.alert(err);
            });
        } else {
            setLoader(false);
            console.log('error');
            if (auth.error) {
                Alert.alert(auth.error);
            } else {
                Alert.alert(auth.data.message);
            }
        }
    }

    const Loader = () => {
        if (loader) {
            return <View style={ ss.loading }><ActivityIndicator size="large" /></View>
        } else {
            return null;
        }
    }

    return (
        <ScrollView>
            <View style={ ss.content }>
                <Text style={ title }>Բարի գալուստ</Text>
                <Text style={ sub }>Գրանցվեք կամ մուտք գործեք՝ հեքիաթներ լսելու համար</Text>
                <View style={ form }>
                    <TextInput
                        style={ ss.input }
                        type="email"
                        placeholder="Էլ"
                        keyboardType="email-address"
                        placeholderTextColor="#ffffff"
                        onChangeText={val => setUserEmail(val)}
                        defaultValue={email}
                        />
                    <TextInput
                        style={ ss.input }
                        type="password"
                        placeholder="Գաղտնաբառ"
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        onChangeText={val => setUserPassword(val)}
                        defaultValue={password}
                        />
                    <Text style={ register }>Մոռացել եք գաղտնաբառը?
                        <Text
                            style={ ss.link }
                            onPress={() => {}}
                        > Վերակայել այստեղ</Text>
                    </Text>
                    <Pressable
                        onPress={() => {
                            handleSubmit()
                        }}
                        >
                        <Text
                            style={[ ss.btn, ss.btnSuccess ]}
                            >ներս մտնել</Text>
                    </Pressable>
                    <Loader />
                </View>
                <Pressable
                    onPress={() => navigation.navigate('Registration')}
                    >
                    <Text
                        style={[ ss.btn, ss.btnBorder ]}
                        >Գրանցում</Text>
                </Pressable>
                <View style={ footer }>
                    <Text
                        style={ fbText }
                    >Մուտք գործեք</Text>
                    <View style={ fbImage }>
                        <Image
                            style={{ width: 52, height: 52 }}
                            resizeMode={'cover'}
                            source={{
                                uri: 'https://radioheqiat.fm/wp-content/uploads/fb.png'
                            }}
                            />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const loginStyles = StyleSheet.create({
    form: {

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 12
    },
    sub: {
        fontSize: 22,
        color: '#ffffff',
        marginBottom: 40
    },
    register: {
        textAlign: 'center',
        fontSize: 14,
        color: '#ffffff',
        marginTop: 6,
        marginBottom: 50,
    },
    footer: {
        paddingTop: 25,
        paddingBottom: 50,
        textAlign: 'center',
    },
    fbText: {
        fontSize: 14,
        color: '#ffffff',
        textAlign: 'center',
    },
    fbImage: {
        paddingTop: 20,
        alignSelf: 'center',
    },
})

export default Login;
