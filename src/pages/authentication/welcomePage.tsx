import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { WelcomeButton } from '../../components/commonButtons';
import { flex1, mt20, mt70 } from '../../components/commonStyles';
import {  styledComponentsSheet } from '../../styledComponent/styledComponent';
import { useTheme } from '../../theme/themeContext';
import { colors } from '../../utils/colors';
import { DevHeight } from '../../utils/device';
import { labels } from '../../utils/labels';
import { AuthImageBg, AuthImageBottom } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { ToodleImageDark, ToodleImageLight, WelcomePageLogo, WelcomePageLogoDark } from '../../utils/svg';

export type WelcomePageProps = {};

const WelcomePage: React.FC<WelcomePageProps> = (props: WelcomePageProps) => {
  const navigation = useNavigation();
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
  const { theme } = useTheme();

  const isDarkTheme = theme === 'dark';

  const handleCancelButtonClick = () => {
    setIsCancelButtonActive(true);
    navigation.navigate(screenName.LoginEmail as never);

  };

  const handleSaveChangesClick = () => {
    setIsCancelButtonActive(false);
    navigation.navigate(screenName.SignUp as never);
  };

  return (
    <Fragment>
      <View style={[flex1]}>
       <ScrollView>
       <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }}>
          <ImageBackground source={AuthImageBg} style={[flex1]}>
          <View style={[styledComponentsSheet.logoContainer]}>
              <View style={[mt20]}>
                {isDarkTheme ? <WelcomePageLogoDark /> : <WelcomePageLogo />}
              </View>
              <View style={[mt70]}>
                {isDarkTheme ? <ToodleImageDark /> : <ToodleImageLight/>}
              </View>
            </View>
            <ImageBackground source={AuthImageBottom}
              style={[flex1, { width: '100%' }]} >
              <View style={[{ bottom: DevHeight / 14 },styledComponentsSheet.btnContainer]}>
                <WelcomeButton
                  title={labels.logIn}
                  backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                  textColor={isCancelButtonActive ? colors.primaryVar3 : colors.white}
                  onChange={handleCancelButtonClick}
                  borderWidth={isCancelButtonActive ? 1 : 1}
                />
                <WelcomeButton
                  title={labels.signUp}
                  backgroundColor={isCancelButtonActive ? colors.primaryVar3 : colors.white}
                  textColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                  onChange={handleSaveChangesClick}
                  borderWidth={1}
                />
              </View>
            </ImageBackground>
          </ImageBackground>
        </GestureHandlerRootView>
       </ScrollView>
      </View>
    </Fragment>
  )
};

export default WelcomePage;