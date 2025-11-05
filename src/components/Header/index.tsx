import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles as commonStyles } from '../../assets/styles';
import RNText from '../Text';
import ImageComponent from '../imageComp';
import { fontValue } from '../../utils/responsiveFonts';
import { useTheme } from '../../theme/ThemeProvider';
import { COLORS } from '../../utils/constants';
interface Props {
  title?: string;
  user?: {
    profileImage?: string;
    name?: string;
    email?: string;
  };
  onBack?: () => void;
}

const AppHeader: React.FC<Props> = ({ title, user, onBack }) => {

  const { colors } = useTheme();
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingTop: inset.top }]}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <ImageComponent source={require('../../assets/icons/Backarrow.png')} style={commonStyles.img} />
        </TouchableOpacity>
      )}
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : user ? (
        <View style={styles.userWrap}>
          <ImageComponent source={user.profileImage} style={styles.img} />
          <View>
            <RNText style={commonStyles.fs14}>
              {user.name}
            </RNText>
            <RNText style={styles.email}>
              {user.email}
            </RNText>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: fontValue(16),
    paddingVertical: fontValue(20),
    backgroundColor: COLORS.white,
  },
  backBtn: {
    marginRight: fontValue(10),
    width: fontValue(16),
    height: fontValue(16),
    backgroundColor:COLORS.white
  },
  title: {
    fontSize: fontValue(20),
    color: COLORS.black,
  },
  userWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: fontValue(8),
  },
  img: {
    width: fontValue(32),
    height: fontValue(32),
    borderRadius: fontValue(20),
  },
  email: {
    color: COLORS.white,
    fontSize: fontValue(13),
  },
});

export default AppHeader;
