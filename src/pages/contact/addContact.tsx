import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { flex1, justyfyCenter, mh20, mh30, mv20 } from '../../components/commonStyles';
import {  styledComponentsSheet } from '../../styledComponent/styledComponent';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { addContactData } from '../../utils/data/contactData';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import { SearchHeader } from '../media/mediaCommonHeader';

export type AddContactProps = {

}

const AddContact = (props: AddContactProps) => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        dob: '',
        message: '',
    });

    const handleInputChange = (key: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    };

    const handleSaveContact = () => {
        navigation.navigate(screenName.ContactPage as never)
    };

    return (
        <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
            {/* <SearchHeader headerText={labels.addContact} /> */}
            <View style={[flex1, mh30]}>
                {
                    addContactData.map((field) => (
                        <View key={field.key}>
                            <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                <View style={[justyfyCenter]}>
                                    <CustomIcon name={field.iconName} size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type={field.iconType} />
                                </View>
                                <CustomTextInput
                                    textColor={isDark() ? colors.greyVar0 : colors.blackVar1}
                                    placeholder={field.label}
                                    value={formData[field.key]}
                                    onChangeText={(text) => handleInputChange(field.key, text)}
                                />
                            </View>
                        </View>
                    ))
                }
            </View>
            <View style={[mv20, mh20]}>
                <LongPurpleButton title={labels.saveContact} onChange={handleSaveContact} />
            </View>
        </View>
    )
};

export default AddContact;