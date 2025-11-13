import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from './HomeStackNavigator';
import MacroCalculator from '../../screens/Member/MacroCalculator';
import Blogs from '../../screens/Member/Blog/Blogs';
import Products from '../../screens/Member/Product/Products';
import Profile from '../../screens/Member/Profile/Profile';
import { SCREENS } from '../../utils/Routes';
import { styles } from '../../assets/styles';
import CustomTabBar from './CustomTabBar';
import { Image } from 'react-native';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
        <Tab.Navigator
            tabBar={props => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tab.Screen
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <CustomIcon
                            name={'chatbox-ellipses-outline'}
                            type={'Ionicons'}
                            size={20}
                            // color={isSelected ? colors.white : (isDarkTheme ? colors.greyVar3 : colors.primaryVar2)} />
                            color={colors.primaryVar2}
                        />

                        // <Image source={require('../../assets/images/Home.png')} style={styles.img} />
                    ),
                    tabBarLabel: 'Home',
                    tabBarHideOnKeyboard: true,
                }}
                name={SCREENS.HomeStackNavigator}
                component={HomeStackNavigator}
            />
            <Tab.Screen
                name={SCREENS.Calculator}
                component={MacroCalculator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CustomIcon
                            name={'users'}
                            type={'Feather'}
                            size={20}
                            // color={isSelected ? colors.white : (isDarkTheme ? colors.greyVar3 : colors.primaryVar2)} />
                            color={colors.primaryVar2}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.Blogs}
                component={Blogs}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CustomIcon
                            name={'record-circle-outline'}
                            type={'MaterialCommunityIcons'}
                            size={20}
                            // color={isSelected ? colors.white : (isDarkTheme ? colors.greyVar3 : colors.primaryVar2)} />
                            color={colors.primaryVar2}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.Products}
                component={Products}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CustomIcon
                            name={'person-circle-outline'}
                            type={'Ionicons'}
                            size={20}
                            // color={isSelected ? colors.white : (isDarkTheme ? colors.greyVar3 : colors.primaryVar2)} />
                            color={colors.primaryVar2}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={SCREENS.Profile}
                component={Profile}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CustomIcon
                            name={'phone'}
                            type={'Feather'}
                            size={20}
                            // color={isSelected ? colors.white : (isDarkTheme ? colors.greyVar3 : colors.primaryVar2)} />
                            color={colors.primaryVar2}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabs;
