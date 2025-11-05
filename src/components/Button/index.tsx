import {
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    ViewStyle,
  } from 'react-native';
  import React from 'react';

  import { styles } from '../../assets/styles';
  import { COLORS } from '../../utils/constants';
import { fontValue } from '../../utils/responsiveFonts';
  
  interface ButtonProps {
    title: string;
    bgColor?: string;
    brr?: any;
    borderWidth?: number;
    color?: string;
    borderColor?: string;
    h?: number;
    w?: ViewStyle;
    clr?: string;
    fw?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
    fs?: number;
    onClick: () => void;
    r?: number;
    mH?: number;
    textPh?: number;
    borderRad?: boolean;
    fontRegular?: boolean;
    padding?: number;
    isImage?: boolean;
    source?: number;
    fontMedium?: boolean;
    dashedBorder?: boolean;
    isActive?: boolean;
    disabled?: boolean;
    fixed?: boolean;
  }
  
  const Button: React.FC<ButtonProps> = ({
    title,
    onClick,
    borderRad = true,
    brr,
    h,
    w,
    fs,
    fw,
    mH,
    textPh,
    fontRegular,
    borderWidth,
    borderColor,
    padding,
    clr,
    bgColor,
    isImage,
    source,
    fontMedium,
    dashedBorder,
    isActive,
    disabled,
    fixed,
  }) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.bttn,
          borderRad ? (brr ? brr : styles.leftBottmRad15) : styles.borderRad10,
          styles.bgPrimary,
          isImage && styles.fdr,
          isImage && styles.alignItemCenter,
          h
            ? {
              height: h,
            }
            : {},
          w ? { width: w } : {},
          borderWidth ? { borderWidth: borderWidth } : {},
          borderColor ? { borderColor: borderColor } : {},
          padding ? { padding: padding } : {},
          bgColor ? { backgroundColor: bgColor } : {},
          isImage && { gap: fontValue(5) },
          dashedBorder && { borderStyle: 'dashed' },
        ]}
        onPress={onClick}>
        {isImage && (
          <Image
            source={source}
            style={{ height: fontValue(30), width: fontValue(30) }}
            resizeMode="contain"
          />
        )}
        {isActive ? (
          <ActivityIndicator size={'small'} color={COLORS.white} />
        ) : (
          <Text
            style={[
              styles.fs16,
              fontMedium ? styles.poppinsMedium : styles.poppinsSemiBold,
              styles.titleScndry,
              {
                textAlign: 'center',
              },
              fs ? { fontSize: fs } : styles.fs16,
              clr ? { color: clr } : {},
              textPh ? { paddingHorizontal: textPh } : {},
              fontRegular && styles.poppinsRegular,
            ]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  };
  
  export default Button;
  