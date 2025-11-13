import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, View } from 'react-native';
import * as Keychain from 'react-native-keychain';
import SplashScreen from 'react-native-splash-screen';
import RootNavigation from './navigation';
import { getData, storageKeys } from './src/common/asyncStorage';
import { h100, w100 } from './src/components/commonStyles';
import { ThemeProvider } from './src/theme/themeContext';
import { colors } from './src/utils/colors';
import { screenName } from './src/utils/screenName';
import { styledComponentsSheet } from './src/styledComponent/styledComponent';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

export type AppProps = {};

const App = (props: AppProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const STATUS_BAR_HEIGHT = Platform.OS === "ios" ? 50 : StatusBar.currentHeight;
  const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;

  useEffect(() => {
    initialCall();
  }, []);

  const initialCall = async () => {
    setTimeout(() => {
      SplashScreen.hide();
      setIsLoading(false);
    }, 1000);

    var loginDetails = await getData(storageKeys.loginDetails);
    if (loginDetails && loginDetails.token) {
    } else {
      await Keychain.resetGenericPassword();
    }
  };

  if (isLoading) {
    return (
      <View style={[styledComponentsSheet.splashScreenContainer]}>
        <Image source={require('./assets/images/png/splashImage.png')} style={[w100, h100]} />
      </View>
    );
  }
  return (
    <Provider store={store}>
      <ThemeProvider>
        <View style={{ flex: 1 }}>
          <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: colors.primaryVar3 }}>
            <StatusBar
              translucent
              backgroundColor={colors.primaryVar3}
              barStyle="light-content"
            />
          </View>
          <RootNavigation initialRouteName={screenName.LoginEmail} />
        </View>
      </ThemeProvider>
    </Provider>
  );
};

export default App;