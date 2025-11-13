import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { isDark } from '../theme/themeContext';
import { colors } from '../utils/colors';
import { DevWidth } from '../utils/device';
import { commonText } from './commonText';
import { commonView, } from './commonView';
import { TouchableOpacity } from 'react-native';

//================================ LONG BUTTON =============================//

type LongPurpleButtonProps = {
  title: string;
  onChange?: () => void;
};

export const LongPurpleButton: React.FC<LongPurpleButtonProps> = ({
  title,
  onChange,

}) => {
  return (
    <View>
      <TouchableOpacity style={[commonView.longButton]}
        onPress={onChange}>
        <Text style={[commonText.h15font600]} >{title} </Text>
      </TouchableOpacity>
    </View>
  );
};

//================================ SMALL BUTTON =============================//

type SmallButtonProps = {
  title: string;
  onChange: () => void;
  borderWidth?: number;
  borderWidthColor?: string;
  backgroundColor: string;
  textColor: string;
  width?: string | number;
  style?: StyleProp<ViewStyle>;
  borderColor?: string;
};

export const SmallButton: React.FC<SmallButtonProps> = ({
  title,
  onChange,
  backgroundColor,
  textColor,
  borderWidth,
  width = DevWidth / 2.4,
  borderColor
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          commonView.smallButton,
          backgroundColor && { backgroundColor },
          borderWidth !== undefined && { borderWidth },
          width !== undefined && { width },
          {
            borderColor: isDark()
              ? borderColor || colors.redVar2
              : colors.greyVar4,
          },
        ]}
        onPress={onChange}
      >
        <Text style={[{ color: textColor },commonText.h15fontBold600]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};



type WelcomeButtonProps = {
  title: string;
  onChange: () => void;
  borderWidth?: number;
  borderWidthColor?: string;
  backgroundColor: string;
  textColor: string;
  width?: string | number;
  height?: string | number;
  style?: StyleProp<ViewStyle>;
};

export const WelcomeButton: React.FC<WelcomeButtonProps> = ({
  title,
  onChange,
  backgroundColor,
  textColor,
  borderWidth,
  width = DevWidth / 2.4,
  height = 50,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[
          commonView.smallButton,
          backgroundColor && { backgroundColor },
          borderWidth !== undefined && { borderWidth },
          width !== undefined && { width },
          {
           
          },
        ]}
        onPress={onChange}
      >
        <Text style={[{ color: textColor },commonText.h15fontBold600]}> {title}</Text>
      </TouchableOpacity>
    </View>
  );
};
