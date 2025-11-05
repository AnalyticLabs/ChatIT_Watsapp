import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';
import { COLORS } from '../../utils/constants';
import { styles as FixedStyles } from '../../assets/styles';
import { fontValue } from '../../utils/responsiveFonts';
import IMAGES from '../../utils/IMAGES';

const { width, height } = Dimensions.get('window');

interface UploadImageProps {
    isImage?: boolean;
    txt?: string;
    profileBox?: boolean;
    source?: any; // You might want to specify a more specific type for the image source
    onGallery?: () => void;
    children?: ReactNode;
    title?: string;
    imgLength?: number;
}

const UploadImage: React.FC<UploadImageProps> = ({
    isImage,
    txt,
    profileBox,
    source,
    onGallery,
    children,
    title,
    imgLength,
}) => {
    return (
        <View>
            <TouchableOpacity onPress={onGallery} style={styles.wrapper}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.imgWrp}>
                        <Image source={IMAGES.uploadImg} style={FixedStyles.img} />
                    </View>
                </View>
            </TouchableOpacity>
            <View>{children}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        height: fontValue(135),
        width: fontValue(135),
        // backgroundColor: COLORS.primary,
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontValue(12),
        overflow: 'hidden',
        marginRight: fontValue(15),
    },
    uploadTxt: {
        fontSize: fontValue(12),
        color: COLORS.black,
        fontWeight: '400',
        fontFamily: 'Outfit', // Replace 'Outfit' with Fonts.outfit if Fonts is properly imported and configured
    },
    sizeTxt: {
        fontSize: fontValue(10),
        color: COLORS.primary,
        fontWeight: '400',
    },
    imgWrp: {
        height: fontValue(50),
        width: fontValue(50),
        alignSelf: 'center',
    },
    wrapper2: {
        height: fontValue(150),
        width: '100%',
        backgroundColor: COLORS.titleOpacty,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: 'rgba(131, 145, 161, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: fontValue(12),
        overflow: 'hidden',
    },
});

export default UploadImage;
