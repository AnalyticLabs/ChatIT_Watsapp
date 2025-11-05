import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HAS_ONBOARDED, SCREENS} from '../../utils/constants';
import {screenOptions} from '../rootstack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import VerifyOTPScreen from '../Auth/VerifyOTPScreen';
import { styles } from '../../assets/styles';
import LoginScreen from '../Auth/LoginScreen';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  const [isonBoarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkIsBoarded = async () => {
    const isOnBoarded = await AsyncStorage.getItem(HAS_ONBOARDED);
    setIsOnboarded(isOnBoarded !== null && isOnBoarded === 'true');
    setIsLoading(false);
  };

  useEffect(() => {
    checkIsBoarded();
  }, []);
  if (isLoading)

    return (
      <View style={[styles.flex1, styles.jcCenter, styles.alignItemCenter]}>
        <ActivityIndicator color={'white'} />
      </View>
    );
    
  return (
    <AuthStack.Navigator screenOptions={screenOptions}>
      <AuthStack.Screen name={SCREENS.login} component={LoginScreen} />
      <AuthStack.Screen name={SCREENS.VerifyOTP} component={VerifyOTPScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
