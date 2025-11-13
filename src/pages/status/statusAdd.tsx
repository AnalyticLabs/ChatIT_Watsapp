import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { alignItemsCenter, flex1, flexRow, mh20, mh5, ml15, mt50, spaceBetween } from '../../components/commonStyles';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { DevHeight } from '../../utils/device';
import { screenName } from '../../utils/screenName';
import { StatusUploadImg } from '../../utils/svg';

export type statusAddProps = {
    height?: number;
}

const ReplyFooterView = () => {
    const navigation = useNavigation()

    const handlePaperPlaneIconClick = () => {
        navigation.navigate(screenName.NoStatus, { showSecondScreen: true });
    }

    return (
        <View style={[styles.container, { backgroundColor: isDark() ? colors.darkModeVar1 : colors.white }]}>
            <View style={[styles.inputContainer, { backgroundColor: isDark() ? colors.darkModeVar1 : colors.white }]} >
                <View style={[styles.inputWrapper, { backgroundColor: isDark() ? colors.darkModeVar6 : colors.white, borderColor: isDark() ? colors.darkModeVar6 : colors.greyVar2 }]}>
                    <View style={styles.captionIcon}>
                        <View style={[flexRow, ml15, alignItemsCenter]}>
                            <CustomIcon name='smiley' type="octicons" size={16} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            <TextInput
                                style={styles.captionInput}
                                placeholder="Add a caption..."
                                placeholderTextColor={isDark() ? colors.greyVar3 : colors.greyVar4}
                            />
                        </View>
                        <View style={[flexRow]}>
                            <View style={{ marginRight: 10, transform: [{ rotate: '45deg' }] }}>
                                <CustomIcon name='paperclip' type="Feather" size={18} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                            </View>
                            <CustomIcon name='camera-outline' type="MaterialCommunityIcons" size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} />
                        </View>
                    </View>
                </View>
                <View style={[ml15]}>
                    <TouchableOpacity onPress={handlePaperPlaneIconClick}>
                        <View style={{ backgroundColor: colors.primaryVar3, height: 40, width: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end', }}>
                            <CustomIcon name='paper-plane' type="font-awesome" color={colors.white} size={14} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const StatusAdd = (props: statusAddProps) => {
    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
<View
  style={[
    commonView.topContainerWhiteCardBase,
    { height: DevHeight / 12 },
  ]}
  {...props}
>
                <TouchableOpacity style={[flexRow, spaceBetween, { marginTop: 25, }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[mh5, ml15]}>
                            <CustomIcon name='crop' color={isDark() ? colors.white : colors.greyVar4} size={20} type='entypo' />
                        </View>
                        <View style={[mh5]}>
                            <CustomIcon name='sticker-circle-outline' color={isDark() ? colors.white : colors.greyVar4} size={20} type='MaterialCommunityIcons' />
                        </View>
                        <View style={[mh5]}>
                            <CustomIcon name='format-text' color={isDark() ? colors.white : colors.greyVar4} size={20} type='MaterialCommunityIcons' />
                        </View>
                        <View style={[mh5]}>
                            <CustomIcon name='pencil' color={isDark() ? colors.white : colors.greyVar4} size={20} type='octicons' />
                        </View>
                        <View style={[mh5]}>
                            <CustomIcon name='image-plus' color={isDark() ? colors.white : colors.greyVar4} size={20} type='MaterialCommunityIcons' />
                        </View>
                    </View>
                    <View style={[mh20]}>
                        <CustomIcon name='x' type="Feather" size={20} color={isDark() ? colors.white : colors.greyVar4} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={[mt50, alignItemsCenter, flex1]}>
                <StatusUploadImg />
            </View>
            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <ReplyFooterView />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    inputWrapper: {
        width: '86%',
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: 'row',
    },
    captionIcon: {
        flexDirection: 'row',
        width: '80%',
        height: 40,
        paddingHorizontal: 2,
        alignItems: 'center',
    },
    captionInput: {
        flex: 1,
        marginLeft: 5,
        color: colors.greyVar4,
        fontSize: 14,
        fontWeight: '400',
    },
})

export default StatusAdd;