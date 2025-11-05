import { TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SCREENS } from '../../utils/constants';
import { screenOptions } from '../rootstack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Message from '../message';
// import HomeSvg from '../../assets/images/icons/home.svg';
import HomeSvg from '../../assets/icons/home.svg';
import SearchSvg from '../../assets/icons/search.svg';
import CartSvg from '../../assets/icons/cart.svg';
import MessageSvg from '../../assets/icons/message.svg';
import DashboardSvg from '../../assets/icons/dashboard.svg';
import BottomTabBar from '../../components/BottomTabBar';
import ChatStackNavigator from './ChatStack';
import StatusStackNavigator from './StatusStack';
import CallStackNavigator from './CallsStack';
import { styles } from '../../assets/styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const _renderIcon = (routeName: string, selectedTab: string) => {
  let Icon = undefined;
  switch (routeName) {
    case SCREENS.ChatStackNavigator:
      Icon = selectedTab === routeName && HomeSvg;
      break;
    case SCREENS.StatusStackNavigator:
      Icon = selectedTab === routeName && SearchSvg;
      break;
    case SCREENS.CallStackNavigator:
      Icon = selectedTab === routeName && CartSvg;
      break;
    case SCREENS.message:
      Icon = selectedTab === routeName && MessageSvg;
      break;
    // case SCREENS.SettingsStackNavigator:
    //   Icon = selectedTab === routeName && DashboardSvg;
    //   break;
  }

  return (
    Icon && (
      <Icon
        style={{
          color: COLORS.icon,
        }}
      />
    )
  );
};

const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
  return (
    <TouchableOpacity
      onPress={() => navigate(routeName)}
      style={tabStyles.tabbarItem}>
      {_renderIcon(routeName, selectedTab)}
    </TouchableOpacity>
  );
};

const BottomTabs = createBottomTabNavigator();

const StackNavigator = () => {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener?.remove();
      keyboardDidHideListener?.remove();
    };
  }, []);
  
  const insets = useSafeAreaInsets();
  return (
    <>
      <BottomTabs.Navigator
        // circleWidth={60}
        initialRouteName={SCREENS.ChatStackNavigator}
        screenOptions={{
          ...screenOptions, 
        }}
        tabBar={isKeyboardVisible ? () => null : props => <BottomTabBar {...props} />}
      >
        <BottomTabs.Screen
          options={{
            tabBarLabel: 'Chat',
            tabBarHideOnKeyboard: true,
          }}
          name={SCREENS.ChatStackNavigator}
          component={ChatStackNavigator}
        />
        <BottomTabs.Screen
          options={{ tabBarLabel: 'status' }}
          name={SCREENS.StatusStackNavigator}
          component={StatusStackNavigator}
        />
        <BottomTabs.Screen
          options={{ tabBarLabel: 'cart' }}
          name={SCREENS.CallStackNavigator}
          component={CallStackNavigator}
        />
      </BottomTabs.Navigator>
    </>
  );
};

export default StackNavigator;

const tabStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    // flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.black,
    width: 54,
    height: 54,
    borderRadius: 54,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: COLORS.primary,
    // borderColor: COLORS.black,
    borderWidth: 1,
    bottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.black,
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
});
