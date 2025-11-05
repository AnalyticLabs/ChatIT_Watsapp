import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../../utils/constants';
import { screenOptions } from '../rootstack';
import CallScreen from '../Calls/CallScreen';
import CallsListScreen from '../Calls/CallsListScreen';

const CallStack = createStackNavigator();

const CallStackNavigator = () => {

  return (
    <CallStack.Navigator
      initialRouteName={SCREENS.Call}
      screenOptions={screenOptions}>
      <CallStack.Screen name={SCREENS.Call} component={CallsListScreen} />
      <CallStack.Screen name={SCREENS.CallDetail} component={CallScreen} />

    </CallStack.Navigator>
  );
};

export default CallStackNavigator;
