import React from 'react';
import {
    StyleSheet,
    Image,
    ImageSourcePropType,
    StyleProp,
    ImageStyle,
} from 'react-native';
import { fontValue } from '../../utils/responsiveFont';

interface Props {
    source?: string | ImageSourcePropType;
    style?: StyleProp<ImageStyle>;
    resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
}

const AppImage: React.FC<Props> = ({
    source,
    style,
    resizeMode = 'contain',
}) => {
    const defaultImage = require('../../assets/images/logo.png');

    // ✅ Handle both remote URL and local require safely
    const imageSource =
        typeof source === 'string'
            ? { uri: source }
            : (source as ImageSourcePropType) || defaultImage;

    return (
        <Image
            source={imageSource}
            resizeMode={resizeMode}
            style={[styles.default, style]}
        />
    );
};

const styles = StyleSheet.create({
    default: {
        width: fontValue(178),
        height: fontValue(54),
    },
});

export default AppImage;
