import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import LoginEmail from '../pages/authentication/loginEmail';
import {screenName} from '../utils/screenName';
import Verification from '../pages/authentication/verification';
import {screenOptions} from '../../navigation';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  const [isonBoarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const checkIsBoarded = async () => {
  //     const isOnBoarded = await AsyncStorage.getItem(HAS_ONBOARDED);
  //     setIsOnboarded(isOnBoarded !== null && isOnBoarded === 'true');
  //     setIsLoading(false);
  // };

  // useEffect(() => {
  //     checkIsBoarded();
  // }, []);
  // if (isLoading)

  // return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //         <ActivityIndicator color={'white'} />
  //     </View>
  // );

  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      {/* <Stack.Screen /> */}
      <AuthStack.Screen name={screenName.LoginEmail} component={LoginEmail} />
      <AuthStack.Screen
        name={screenName.Verification}
        component={Verification}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
