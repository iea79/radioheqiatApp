import React, { useLayoutEffect, useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Welcome from '../Welcome';
import HomeBooks from '../../components/HomeBooks';
import CategoriesSlider from '../../components/CategoriesSlider';
import ss from '../../styles';
import { setFavorites } from '../../actions/actions';
import AutorizationService from '../../services/AutorizationService';
import Loader from '../../components/Loader';

const authService = new AutorizationService();

const Home = ({ navigation }) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);
    const { token, userId, userFavorites } = useSelector(state => state);
    // console.log(token);
    useLayoutEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: ss.tabBarStyle });
        getFavorList();
    }, []);

    const getFavorList = useCallback(async () => {
        await authService.getFavoriteList(userId, token).then(resp => {
            console.log('Home getFavoriteList ===', resp);
            dispatch(setFavorites(resp));
        }).catch(err => {
            console.log('Home getFavoriteList === ', err);
            setLoader(false);
            // Alert.alert(err);
        });
    }, [])

    return (
        <ScrollView>
            <View style={ ss.content }>
                <CategoriesSlider />
                <HomeBooks />
            </View>
        </ScrollView>
    )
}

export default Home;
