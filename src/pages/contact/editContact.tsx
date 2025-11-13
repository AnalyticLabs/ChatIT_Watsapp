import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mh30, ml10, ml5, mv20 } from '../../components/commonStyles';
import { IconInputContainer } from '../../styledComponent/styledComponent';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { editContact } from '../../utils/data/contactData';
import { labels } from '../../utils/labels';
import { UsFlagTmg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { SearchHeader } from '../media/mediaCommonHeader';

export type EditContactProps = {
    
}

const EditContact = (props: EditContactProps) => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        name: labels.Horace1,
        hello: labels.Keene,
        email: labels.InfoEmail,
        phoneNo: labels.PhoneNo,
        dob: labels.Date,
        country: labels.inivitemsg,
    });

    const handleInputChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleSaveChanges = () => {
        navigation.navigate(screenName.ContactDetails as never)
    };

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.editCont} /> */}
            <View style={[flex1, mh30]}>
                {
                    editContact.map((field) => (
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
            <View style={[mv20, mh20]}>
                <LongPurpleButton
                    title={labels.saveChange}
                    onChange={handleSaveChanges}
                />
            </View>
        </View>
    )
};

export default EditContact;