import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { isDark } from '../theme/themeContext';
import CustomIcon from '../utils/Icons';
import { colors } from '../utils/colors';
import { DevHeight, DevWidth } from '../utils/device';
import { labels } from '../utils/labels';
import { commonText, } from './commonText';

export const CallCommonHeader = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
        height: DevHeight * 0.12,
        width: DevWidth,
        backgroundColor: isDark() ? colors.darkModeVar1 : colors.white,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <CustomIcon name='arrow-back-ios' size={15} color={isDark() ? colors.white : colors.blackVar2} type='MaterialIcons' />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomIcon name='lock' size={12} color={isDark() ? colors.white : colors.greyVar4} type='Feather' />
        <Text style={[{ marginLeft: 10 },commonText.h12fontBold400GreyVar4DarkWhite]}>{labels.Endtoendencrypted}</Text>
      </View>
      <CustomIcon name='person-add' size={15} color={isDark() ? colors.white : colors.blackVar2} type='octicons' />
    </View>
  );
};

export const ContactCommonHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        alignItems: 'center',
        height: DevHeight * 0.12,
        width: DevWidth,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
      }}
    >
      <CustomIcon name='arrow-back-ios' size={18} color={colors.blackVar2} type='MaterialIcons' />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomIcon name='lock' size={15} color={colors.greyVar4} type='Feather' />
        <Text style={[{ marginLeft: 10 },commonText.h15Grey]}>{labels.Endtoendencrypted}</Text>
      </View>
      <CustomIcon name='person-add' size={18} color={colors.blackVar2} type='octicons' />
    </View>
  );
};