import {isIphoneX, getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform, StatusBar, Dimensions} from 'react-native';

export function fontValue(fontSize: number, standardScreenHeight = 680) {
  const {height, width} = Dimensions.get('window');
  const standardLength = width > height ? width : height;
  const offset =
    width > height
      ? 0
      : Platform.OS === 'ios'
      ? 78
      : (StatusBar.currentHeight as number); // iPhone X style SafeAreaView size in portrait

  const deviceHeight =
    isIphoneX() || Platform.OS === 'android'
      ? standardLength - offset
      : standardLength - getStatusBarHeight();

  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
