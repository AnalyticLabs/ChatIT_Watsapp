import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../utils/colors';

const CustomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
    return (
        // <>
        //     <BottomTabBar />
        // </>
        <View style={[styles.tabContainer,]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel ?? route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
                const iconName = options.tabBarIcon
                    ? (options.tabBarIcon as any)({ focused: isFocused, color: 'white' }).props.name
                    : 'ellipse';

                return (
                    <TouchableOpacity
                        key={label.toString()}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={[styles.tabButton, isFocused && styles.activeTab]}
                    >
                        <View style={{ height: 22, width: 22 }} >
                            {/* <AppImage source={require('../../assets/images/Home.png')} style={commonStyles.img} /> */}
                            {options.tabBarIcon?.({ focused: isFocused, color: 'white', size: 22 })}
                        </View>
                        {/* <Icon name={iconName} size={24} color="#fff" /> */}
                        {/* {isFocused && <View style={styles.indicator} />} */}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default CustomTabBar;

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#1C1C1C',
        borderRadius: 30,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingVertical: 10,
        overflow: 'hidden',
    },
    tabButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 16,
        padding: 15,
    },
    activeTab: {
        backgroundColor: '#000',

    },
    indicator: {
        width: (11),
        height: (4),
        borderTopLeftRadius: (2),
        borderTopRightRadius: (2),
        backgroundColor: colors.primary,
        position: 'absolute',
        bottom: 0,
    },
});
