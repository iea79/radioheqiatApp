import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import AutorizationService from '../../../services/AutorizationService';
import {
    ScrollView,
    StatusBar,
    ActivityIndicator,
    StyleSheet,
    Image,
    Text,
    Alert,
    View,
    TextInput,
    Pressable
} from 'react-native';
import { getToken, setFavorites, setName, setEmail, setUserId, setPassword } from '../../../actions/actions';
import ss from '../../../styles';

const authService = new AutorizationService

const Registration = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setUserName] = useState('');
    const [email, setUserEmail] = useState('');
    const [password, setUserPassword] = useState('');
    const [passwordRepeat, setUserPasswordRepaeat] = useState('');
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: { display: "none" } });
    }, []);

    const onHandleSubmit = async () => {
        setLoader(true);
        console.log(name, email, password);
        const data = {username: name, email: email, password: password, confirmPassword: passwordRepeat};
        const auth = await authService.registerUser(data)
            .then(json => {
                console.log('registerUser then === ', json);
                // setLoader(false);
                return json;
            })
            .catch(err => {
                console.log('registerUser catch === ', err);
                return err;
                // setLoader(false);
            })

        if (auth.success) {
            // console.log('success');
            const { jwt } = auth;
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
    };

    const saveToken = async (jwt) => {
        try {
            await AsyncStorage.setItem('token', jwt);
        } catch (e) {
            setLoader(false);
        } finally {
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
        <ScrollView style={{ paddingTop: 10 }} >
            <View style={ ss.content }>
                <View>
                    <TextInput
                        style={ ss.input }
                        type="text"
                        placeholder="Անուն"
                        placeholderTextColor="#ffffff"
                        onChangeText={val => setUserName(val)}
                        defaultValue={ name }
                        />
                    <TextInput
                        style={ ss.input }
                        type="email"
                        placeholder="Էլ"
                        keyboardType="email-address"
                        placeholderTextColor="#ffffff"
                        onChangeText={val => setUserEmail(val)}
                        defaultValue={ email }
                        />
                    <TextInput
                        style={ ss.input }
                        type="password"
                        placeholder="Գաղտնաբառ"
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        onChangeText={val => setUserPassword(val)}
                        defaultValue={ password }
                        />
                    <TextInput
                        style={ ss.input }
                        type="password"
                        placeholder="Գաղտնաբառ"
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        onChangeText={val => setUserPasswordRepaeat(val)}
                        defaultValue={ passwordRepeat }
                        />
                    <Pressable
                        onPress={ onHandleSubmit }
                        >
                        <Text
                            style={[ ss.btn, ss.btnSuccess ]}
                            >Գրանցվել</Text>
                    </Pressable>
                    <Loader />
                </View>
            </View>
        </ScrollView>
    )
}

export default Registration;
