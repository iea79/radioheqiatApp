import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ss from '../../styles';
import AutorizationService from '../../services/AutorizationService';
import { setName, logOut } from '../../actions/actions';

const restService = new AutorizationService();

const Profile = ({ navigation }) => {
    const dispatch = useDispatch();
    const { userName, userEmail, userId, token, userPassword } = useSelector(state => state);
    const [ name, setNewName ] = useState(userName);
    const [ isChanged, setChanged ] = useState(false);
    // const [ email, setEmail ] = useState(userEmail);
    const [ password, setNewPassword ] = useState(userPassword);

    useEffect(() => {
        navigation.setOptions({
            headerBackVisible: false,
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() => handleLogOut()}>
                        <Text style={ styles.logout }>Դուրս գալ</Text>
                    </TouchableOpacity>
                )
            }
        });
    },[]);

    useEffect(() => {
        if (name !== userName) {
            setChanged(true);
        } else {
            setChanged(false);
        }
    },[name, password]);

    const handleSubmit = () => {
        dispatch(setName(name));
        restService.editName(userId, name, token).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleLogOut = () => {
        restService.revokeToken(token).then(() => {
            AsyncStorage.removeItem('token');
            dispatch(logOut());
        })
    }

    // const handleEditPhone = (e) => {
    //     e.preventDefault();
    //     dispatch(setPhone(phone));
    //     restService.editPhone(userId, phone, token).then(json => {
    //         console.log(json);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // };

    return (
        <ScrollView style={ ss.content }>
            <View style={[ styles.wrapper, ss.beforePlayer ]}>
                <View style={ styles.top }>
                    <TextInput
                        style={ ss.input }
                        defaultValue={userEmail}
                        placeholderTextColor="#ffffff"
                        readOnly
                        disabled={true}
                        />
                    <TextInput
                        style={ ss.input }
                        defaultValue={name}
                        placeholderTextColor="#ffffff"
                        onChangeText={val => setNewName(val)}
                        />
                    <TextInput
                        style={ ss.input }
                        placeholder="Գաղտնաբառ"
                        defaultValue={password}
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        onChangeText={val => setNewPassword(val)}
                        readOnly
                        disabled={true}
                        />
                    <View style={ styles.actions }>
                        <TouchableOpacity style={ styles.actions.btn }>
                            {/*Support*/}
                            <Text style={[ ss.btn, ss.btnPrimary, ss.btnSmall ]}>Աջակցություն</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={ styles.actions.btn }>
                            {/*Chat*/}
                            <Text style={[ ss.btn, ss.btnPrimary, ss.btnSmall ]}>Զրուցարան</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={ styles.bottom }>
                    <TouchableOpacity
                        disabled={!isChanged}
                        onPress={() => {
                            handleSubmit();
                        }}
                        style={ isChanged ? styles.bottom.btn : styles.bottom.btn.disable }
                        >
                        <Text style={[ ss.btn, ss.btnSuccess ]}>Պահպանել</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    logout: {
        fontSize: 20,
        color: '#8F71C2',
        fontWeight: 'bold',
    },
    wrapper: {
        flex: 1,
        justifyContent: 'space-between',
    },
    top: {
        flex: 1,
    },
    bottom: {
        marginTop: 20,
        paddingBottom: 20,

        btn: {
            disable: {
                opacity: 0.7,
            }
        }
    },
    actions: {
        marginLeft: -5,
        marginRight: -5,
        flexDirection: 'row',
        justifyContent: 'space-between',

        btn: {
            flexGrow: 0.5,
            margin: 5,

        },
    },
})

export default Profile;
