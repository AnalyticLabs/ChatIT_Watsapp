import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mh30, ml10, ml5, mv20 } from '../../components/commonStyles';
import { commonView } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { DevWidth } from '../../utils/device';
import { labels } from '../../utils/labels';
import { UsFlagTmg } from '../../utils/png';
import { SearchHeader } from '../media/mediaCommonHeader';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export type EditAccountSettingsProps = {

}


const EditAccountSettings = (props: EditAccountSettingsProps) => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: labels.MarkVilliams,
        hello: labels.HelloIamUsingChatIt,
        email: labels.InfoEmail,
        phoneNo: labels.PhoneNo,
        dob: labels.Date,
        country: labels.India,
    });
    const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
    const handleCancelButton = () => {
        setIsCancelButtonActive(true);
        navigation.goBack();
    };

    const handleDeleteChatButton = () => {
        setIsCancelButtonActive(false);
    };

    const handleInputChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const inputFields = [
        {
            key: 'name',
            label: labels.MarkVilliams,
            iconName: 'user',
            iconType: 'Feather',
        },
        {
            key: 'hello',
            label: labels.HelloIamUsingChatIt,
            iconName: 'user',
            iconType: 'Feather',
        },
        {
            key: 'email',
            label: labels.InfoEmail,
            iconName: 'envelope',
            iconType: 'SimpleLineIcons',
        },
        {
            key: 'phoneNo',
            label: labels.PhoneNo,
            iconName: 'phone',
            iconType: 'Feather',
        },
        {
            key: 'dob',
            label: labels.Date,
            iconName: 'calendar-blank',
            iconType: 'MaterialCommunityIcons',
        },
        {
            key: 'country',
            label: labels.India,
            iconName: 'calendar-blank',
            iconType: 'MaterialCommunityIcons',
        },
    ];

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.EditProfile} /> */}
            <View style={[flex1, mh30]}>
                {
                    inputFields.map((field) => (
                        <View key={field.key}>
                            {
                                field.key === 'phoneNo' ? (
                                    <View>
                                        <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                            <View style={[justyfyCenter]}>
                                                <CustomIcon name={field.iconName} size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type={field.iconType} />
                                            </View>
                                            <View style={[alignItemsCenter, justyfyCenter, flexRow, ml10]}>
                                                <Image source={UsFlagTmg} style={{ height: 18, width: 18, borderRadius: 100 }} />
                                                <View style={[ml5]}>
                                                    <CustomIcon name='chevron-down-outline' type="Ionicons" color={isDark() ? colors.greyVar0 : colors.blackVar2} size={15} />
                                                </View>
                                            </View>
                                            <CustomTextInput
                                                textColor={isDark() ? colors.greyVar0 : colors.blackVar1}
                                                value={formData[field.key]}
                                                onChangeText={(text) => handleInputChange(field.key, text)}
                                            />
                                        </View>
                                    </View>
                                ) : (
                                    <View>
                                        <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                            <View style={[justyfyCenter]}>
                                                <CustomIcon name={field.iconName} size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type={field.iconType} />
                                            </View>
                                            <CustomTextInput
                                                textColor={isDark() ? colors.greyVar0 : colors.blackVar1}
                                                value={formData[field.key]}
                                                onChangeText={(text) => handleInputChange(field.key, text)}
                                            />
                                        </View>
                                    </View>
                                )
                            }
                        </View>
                    ))
                }
            </View>
            <View style={[mv20, mh20,commonView.rowSpaceBetween]}>
                <SmallButton
                    title={labels.cancel}
                    onChange={handleCancelButton}
                    backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
                    textColor={isCancelButtonActive ? colors.white : (isDark() ? colors.redVar3 : colors.greyVar4)}
                    borderWidth={isCancelButtonActive ? 0 : 1}
                    width={DevWidth / 2.3}
                />
                <SmallButton
                    title={labels.saveChange}
                    onChange={handleDeleteChatButton}
                    backgroundColor={isCancelButtonActive ? colors.white : colors.primaryVar3}
                    textColor={isCancelButtonActive ? colors.primaryVar3 : colors.white}
                    borderWidth={isCancelButtonActive ? 1 : 0}
                    width={DevWidth / 2.3}
                />
            </View>
        </View>
    )
}

export default EditAccountSettings