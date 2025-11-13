import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { ImagePicker } from '../../components/commonComponents';
import { CustomTextInput } from '../../components/commonInputFields';
import { IconModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, justyfyCenter, mh20, mt20 } from '../../components/commonStyles';
import { commonView } from '../../components/commonView';
import {  styledComponentsSheet } from '../../styledComponent/styledComponent';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { UserImg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { SearchHeader } from '../media/mediaCommonHeader';

export type CreateGroupProps = {

}

const CreateGroup = (props: CreateGroupProps) => {
    const navigation = useNavigation();
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
    const [Pic, setPic] = useState('');
    const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);

    const handleImageSelect = (base64Image: string) => {
        setPic(base64Image);
        setIsImagePickerOpen(false);
    };

    const openImagePickerModal = () => {
        setIsImagePickerOpen(true);
    };

    const handleCancelButton = () => {
        setIsCancelButtonActive(true);
    };

    const handleNextButton = () => {
        setIsCancelButtonActive(false);
        navigation.navigate(screenName.CreateGroupUserSelect as never)
    };

    const [formData, setFormData] = useState({
        groupName: '',
        groupType: '',
        groupDescription: '',
    });

    const handleInputChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const inputFields = [
        {
            key: 'groupName',
            label: labels.GroupName,
            iconName: 'users',
            iconType: 'Feather',
        },
        {
            key: 'groupType',
            label: labels.GroupType,
            iconName: 'tago',
            iconType: 'AntDesign',
        },
        {
            key: 'groupDescription',
            label: labels.GroupDescription,
            iconName: 'chatbox-ellipses-outline',
            iconType: 'Ionicons',
        },
    ];

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.CreateGroup} searchIcon={true}  /> */}
            <View style={[mt20, mh20]}>
                {Pic ? (
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${Pic}` }}
                        style={[{ height: 70, width: 70, borderRadius: 100 }]}
                    />
                ) : (
                    <Image
                        source={UserImg}
                        style={[{ height: 70, width: 70, borderRadius: 100 }]}
                    />
                )}
                <TouchableOpacity onPress={openImagePickerModal} style={[{ height: 30, width: 30, borderRadius: 100, backgroundColor: colors.primaryVar3 }, styles.status, alignItemsCenter, justyfyCenter]}>
                    <CustomIcon type='Feather' name='camera' color={colors.white} size={12} />
                </TouchableOpacity>
            </View>
            <View style={[flex1, mh20]}>
                {
                    inputFields.map((field) => (
                        <View key={field.key}>
                            <View style={[{borderBottomColor : isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor},styledComponentsSheet.iconInputContainer]}>
                                <View style={[justyfyCenter]}>
                                    <CustomIcon name={field.iconName} size={20} color={colors.greyVar4} type={field.iconType} />
                                </View>
                                <CustomTextInput
                                    placeholder={field.label}
                                    value={formData[field.key]}
                                    onChangeText={(text) => handleInputChange(field.key, text)}
                                />
                            </View>
                        </View>
                    ))
                }
                <View style={[commonView.rowSpaceBetween]}>
                    <SmallButton
                        title={labels.cancel}
                        onChange={handleCancelButton}
                        backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                        textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                        borderWidth={isCancelButtonActive ? 0 : 1}
                    />
                    <SmallButton
                        title={labels.Next}
                        onChange={handleNextButton}
                        backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                        textColor={isCancelButtonActive ? colors.greyVar4 : colors.white}
                        borderWidth={isCancelButtonActive ? 1 : 0}
                    />
                </View>
            </View>
            <IconModal
                isVisible={isImagePickerOpen}
                onClose={() => setIsImagePickerOpen(false)}
                contentComponent={<ImagePicker onImageSelect={handleImageSelect} cameraOption={() => {setIsImagePickerOpen(false)}} />}
                iconName='image-plus'
                iconType='MaterialCommunityIcons'
                iconSize={24}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        borderWidth: 3,
        borderColor: colors.white,
        position: 'absolute',
        bottom: 0,
        left: 45
    }
});

export default CreateGroup