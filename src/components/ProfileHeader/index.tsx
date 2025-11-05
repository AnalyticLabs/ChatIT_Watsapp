import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from '../../assets/styles';
import RNText from '../Text';
import { COLORS } from '../../utils/constants';
import CustomIcon from '../Icon';
import { useAppSelector } from '../../utils/hooks';
import ImageComponent from '../imageComp';
import IMAGES from '../../utils/IMAGES';
import { fontValue } from '../../utils/responsiveFonts';
import ImagePicker from '../ImagePicker';
import Video from '../../assets/icons/video.svg';
import Phone from '../../assets/icons/phone.svg';
import Camera from '../../assets/icons/camera.svg';
import { useTheme } from "../../theme/ThemeProvider";

interface Props {
    name?: string;
    contact?: string;
    description?: string;
    hashTags?: string[];
    about?: string;
}

const ProfileHeader = ({
    name = '',
    contact = '',
    description = '',
    hashTags = [],
    about = '',
}: Props) => {
    const { isUserProfile } = useAppSelector((state: any) => state.auth)
    const { colors } = useTheme();

    return (
        <View >
            <View style={styles.mt5}>
                <ImagePicker
                    // onProfile={() => handleState('profileModel', true)}
                    // onClose={() => handleState('profileModel', false)}
                    // getImage={v => {
                    //     setState({
                    //         ...state,
                    //         profilePic: v as string,
                    //         profileModel: false,
                    //     });
                    // }}
                    profileSource={IMAGES.dummyImg}
                    isOpen={false}
                    txtStyle={styles.poppinsSemiBold}
                    isEditIcon
                    iconPress={true}
                />
            </View>
            <View style={localStyles.centeredContent}>
                <RNText size={fontValue(14)} font="bold" textColor={colors.primary} style={localStyles.text}>
                    {name}
                </RNText>
                <RNText size={fontValue(10)} font="bold" textColor={COLORS.black} style={localStyles.text}>
                    {contact}
                </RNText>

            </View>
            <View style={[
                // styles.mt5,
                styles.pv5,
                styles.fdr,
                styles.jcSbtw,
                styles.alignItemCenter,
                {
                    marginHorizontal: fontValue(90)
                }
            ]} >
                <TouchableOpacity style={[localStyles.icon, { backgroundColor: colors.primary }]}>
                    <Video style={{ color: COLORS.white }} />
                </TouchableOpacity>
                <TouchableOpacity style={[localStyles.icon, { backgroundColor: colors.primary }]}>
                    <Phone style={{ color: COLORS.white }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileHeader;

const localStyles = StyleSheet.create({
    headerImage: {
        height: fontValue(100),
        width: '100%',
        borderRadius: fontValue(12),
        marginTop: fontValue(15),
        backgroundColor: COLORS.transparent,
    },
    overlayImage: {
        height: fontValue(50),
        width: fontValue(50),
        borderRadius: fontValue(100),
        position: 'absolute',
        zIndex: 1,
        right: fontValue(30),
        top: fontValue(25),
    },
    centeredContent: {
        alignSelf: 'center',
        alignItems: 'center',
    },
    text: {
        marginTop: fontValue(10),
    },
    hashTagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: fontValue(5),
    },
    hashTag: {
        paddingVertical: fontValue(4),
        marginRight: fontValue(8),
    },
    locationIcon: {
        marginLeft: fontValue(5),
    },
    icon: {
        padding: 16,
        borderRadius: fontValue(12)
    }
});
