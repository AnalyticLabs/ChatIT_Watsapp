import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors } from '../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fontValue } from '../utils/responsiveFont';

const CustomTabBar = ({state, descriptors, navigation}: BottomTabBarProps) => {
    const insets = useSafeAreaInsets();
  return (
    <View style={[styles.tabContainer,
    {bottom: insets.bottom}
    ]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route?.key];
        const label = options.tabBarLabel ?? route?.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route?.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route?.name);
          }
        };
        const iconName = options.tabBarIcon
          ? (options.tabBarIcon as any)({focused: isFocused, color: 'white'})
              .props.name
          : 'ellipse';

        return (
          <TouchableOpacity
            key={label.toString()}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            onPress={onPress}
            style={[styles.tabButton, isFocused && styles.activeTab]}>
            <View style={{height: fontValue(22), width: fontValue(22)}}>
              {options.tabBarIcon?.({
                focused: isFocused,
                color: 'white',
                size: fontValue(22),
              })}
            </View>
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
    // backgroundColor: 'transparent',
    backgroundColor: colors.white,
    borderRadius: fontValue(30),
    marginHorizontal: fontValue(16),
    // marginBottom: 16,
    paddingVertical: fontValue(10),
    overflow: 'hidden',
    position: 'absolute',
    // bottom: 10,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: fontValue(16),
    padding: fontValue(10),
  },
  activeTab: {
    // backgroundColor: '#000',
    backgroundColor: colors.primaryVar4,
  },
});
