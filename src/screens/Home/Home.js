import React, { useEffect, useCallback, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Welcome from '../Welcome';
import Books from '../../components/Books';
import CategoriesSlider from '../../components/CategoriesSlider';
import ss from '../../styles';
import { setFavorites } from '../../actions/actions';
import AutorizationService from '../../services/AutorizationService';
import Loader from '../../components/Loader';

const authService = new AutorizationService();

const Home = ({ navigation, route }) => {

    useEffect(() => {
        navigation.getParent().setOptions({ tabBarStyle: ss.tabBarStyle });
    }, []);

    return (
        <ScrollView>
            <View style={ ss.content }>
                <CategoriesSlider navigation={navigation} route={route} />
                <Books navigation={navigation} route={route} />
            </View>
        </ScrollView>
    )
}

export default Home;
