import { Text, TextProps } from 'react-native';
import React from 'react';
import { COLORS } from '../../utils/constants';
import { FontFamily } from '../../assets/styles';
import { fontValue } from '../../utils/responsiveFonts';
interface RNTextProps extends TextProps {
    size?: 'small' | 'medium' | 'large' | 'semiLarge' | 'extraLarge' | number;
    font?: 'regular' | 'boldItalic' | 'bold' | 'italic';
    textColor?: 'white' | 'gray' | 'black' | string;
    onPress?: () => void;
}

const fontSizeMapping: Record<
    Exclude<RNTextProps['size'], number | undefined>,
    number
> = {
    small: fontValue(10),
    medium: fontValue(12),
    semiLarge: fontValue(14),
    large: fontValue(16),
    extraLarge: fontValue(18),
};

const fontFamilyMapping: Record<NonNullable<RNTextProps['font']>, string> = {
    // boldItalic: FontFamily.BoldItalic,
    // bold: FontFamily.Bold,
    // italic: FontFamily.Italic,
    // regular: FontFamily.Regular,
};
const colorMapping: Record<'white' | 'black' | 'gray', string> = {
    black: COLORS.black,
    white: '#fff',
    gray: COLORS.subTitle,
};

const RNText: React.FC<RNTextProps> = ({
    size = 'medium',
    font = 'bold',
    textColor = 'black',
    style,
    children,
    onPress,
    ...props
}) => {
    const fontSize =
        typeof size === 'number' ? fontValue(size) : fontSizeMapping[size];
    const fontFamily = fontFamilyMapping[font];
    const color = colorMapping[textColor as 'white' | 'black' | 'gray'] || textColor;

    return (
        <Text
            style={[{ fontSize, fontFamily, color }, style]}
            {...props}
            onPress={onPress}>
            {children}
        </Text>
    );
};

export default RNText;