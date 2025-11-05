import { Dimensions, Keyboard, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../assets/styles';
import React from "react";
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { COLORS, SCREENS, SocketEvent } from '../../utils/constants';
import HomeSvg from '../../assets/icons/home.svg';
import SearchSvg from '../../assets/icons/search.svg';
import CartSvg from '../../assets/icons/cart.svg';
import MessageSvg from '../../assets/icons/message.svg';
import DashboardSvg from '../../assets/icons/dashboard.svg';
import { fontValue } from '../../utils/responsiveFonts';
import { socket } from '../../utils/socket';
import { useEffect, useState } from 'react';
import { setNotificationCount, setRentActiveSlice, setUnReadCountForMesage } from '../../redux/slices/home';
import { CommonActions, StackActions } from '@react-navigation/native';
import { navigationRef } from '../../screens/rootstack';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import CustomIcon from '../Icon';
const { height, width } = Dimensions.get('window');

const _renderIcon = (routeName: string, selectedTab: string) => {
    const dispatch = useAppDispatch()
    const { messages } = useAppSelector(state => state.home);

    let Icon = undefined;

    switch (routeName) {
        case SCREENS.ChatStackNavigator:
            Icon = HomeSvg;
            break;
        case SCREENS.StatusStackNavigator:
            Icon = SearchSvg;
            break;
        case SCREENS.CallStackNavigator:
            Icon = CartSvg;
            break;
    }

    useEffect(() => {
        socket.on(SocketEvent.UNREAD_COUNT_MESSAGE, data => {
            dispatch(setUnReadCountForMesage(data?.payload));
        });
        socket.on(SocketEvent.NOTI_COUNT, data => {
            dispatch(setNotificationCount(data?.payload));
        });
    }, []);

    return Icon ? (
        <View style={{ position: 'relative' }}>
            <Icon
                style={{
                    color: selectedTab === routeName ? COLORS.primary : COLORS.icon,
                }}
            />
            {routeName === SCREENS.ChatStackNavigator && messages > 0 && (
                <View
                    style={[styles.badge, {
                        borderColor: selectedTab === routeName ? COLORS.primary : 'white',
                    }]}>
                    <Text
                        style={{
                            color: selectedTab === routeName ? COLORS.primary : 'white',
                            fontSize: fontValue(9),
                            fontWeight: 'bold',
                        }}>
                        {messages > 99 ? '99+' : messages}
                    </Text>
                </View>
            )}
        </View>
    ) : null;
};

const _renderLabel = (routeName: string) => {
    switch (routeName) {
        case SCREENS.ChatStackNavigator:
            return SCREENS.Chat;
            break;
        case SCREENS.StatusStackNavigator:
            return SCREENS.Status;
            break;
        case SCREENS.CallStackNavigator:
            return SCREENS.Call;
            break;
    }
};

const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    const dispatch = useAppDispatch()

    return (
        <View
            style={[
                styles.bgPrimary,
                styles.bgWhite,
                styles.tab
            ]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const isFocused = state.index === index;
                const onPress = () => {
                    // Handle special case for StatusStackNavigator
                    if (route?.name === "StatusStackNavigator" && !isFocused) {
                        dispatch(setRentActiveSlice(true))
                    }
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    // Use proper navigation instead of reset
                    if (!isFocused && !event.defaultPrevented) {
                        // Navigate to the tab
                        navigation.navigate(route.name);
                    }
                    else {
                        if (navigationRef.current?.getCurrentRoute()?.name == "OrderRequested" && route?.name === SCREENS.SettingsStackNavigator) {
                            navigation.reset({
                                index: 0,
                                routes: [
                                    { name: SCREENS.dashboard } // Only use 'name' here
                                ],
                            });
                        }
                    }

                };
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[
                            styles.alignItemCenter,
                            { width: '20%' },
                        ]}>
                        <View style={{}}>
                            {_renderIcon(route.name, state.routes[state.index].name)}
                        </View>
                        <Text
                            adjustsFontSizeToFit={true}
                            allowFontScaling={false}
                            style={[
                                styles.mt5,
                                styles.poppinsRegular,
                                styles.fs10,
                                {
                                    color: isFocused ? COLORS.primary : COLORS.icon,
                                },
                            ]}>
                            {_renderLabel(route.name)}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default BottomTabBar;
