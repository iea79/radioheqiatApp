import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Books from '../../components/Books';
import CategoriesSlider from '../../components/CategoriesSlider';
import ss from '../../styles';

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
