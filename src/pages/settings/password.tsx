import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View } from 'react-native';
import { SmallButton } from '../../components/commonButtons';
import { CardHeaderText, PasswordToggleIcon, ToggleSwitch } from '../../components/commonComponents';
import { CustomTextInput } from '../../components/commonInputFields';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, mh20, mt20, ph10, pv20, spaceBetween } from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { commonView, } from '../../components/commonView';
import { isDark } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationconfig';
import { SearchHeader } from '../media/mediaCommonHeader';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';

export type PasswordProps = {};

const Password = (props: PasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState(true);
  const [newPassword, setNewPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [isCancelButtonActive, setIsCancelButtonActive] = useState(false);
  const [toggleVisible, setToggleVisible] = useState(false);

  const handleToggle = () => {
    setToggleVisible(!toggleVisible);
  }

  const handleCancelButtonClick = () => {
    setIsCancelButtonActive(true);
  }

  const handleSaveChangesClick = () => {
    setIsCancelButtonActive(false);
  }

  const formKeys = {
    newpassword: 'password',
    currentPassword: 'currentpassword',
    confirmpassword: 'confirmpassword'
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleCurrentPassword = () => {
    setCurrentPassword(!currentPassword);
  }

  const handleNewPassword = () => {
    setNewPassword(!newPassword);
  }

  const handleConfirmPassword = () => {
    setConfirmPassword(!confirmPassword);
  }

  return (
    <Fragment>
      <View style={[flex1, { backgroundColor: isDark() ? colors.darkModeVar2 : colors.whiteVar0 }]} >
        <ScrollView style={{ flex: 1 }}>
          {/* <SearchHeader headerText={labels.pwdandSec} /> */}
          <View style={[mt20, mh20]}>
            <CardHeaderText text='Security' />
            <View style={[pv20, flexRow, spaceBetween]}>
              <View style={[flexRow, alignItemsCenter]}>
                <View style={[{ backgroundColor: isDark() ? colors.darkModeVar7 : colors.primaryVar4 },commonView.iconBackground]}>
                  <CustomIcon name='smartphone' size={20} color={isDark() ? colors.greyVar3 : colors.primaryVar3} type='Feather' />
                </View>
                <Text style={[ph10,commonText.h16fontBoldBlack]}>{labels.twofactor}</Text>
              </View>
              <ToggleSwitch value={toggleVisible} onToggle={handleToggle} />
            </View>
            <View style={[mt20]}>
              <CardHeaderText text={labels.changePwd} />
            </View>
            <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
              <View style={[styledComponentsSheet.inputContainer1]}>
                <View style={[flexRow, alignItemsCenter]}>
                  <CustomIcon name='lock-outline' size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                  <Controller
                    name={formKeys.currentPassword}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomTextInput
                        placeholder={labels.currentPwd}
                        value={value}
                        secureTextEntry={currentPassword}
                        onChangeText={onChange} />
                    )}
                    rules={{
                      required: requiredValidation(('labels.password')),
                      minLength: minLengthValidation(
                        validationSchema.password.minLength,
                      ),
                    }}
                  />
                </View>
                <View style={[justyfyCenter]}>
                  <PasswordToggleIcon isVisible={!confirmPassword} toggleVisibility={handleCurrentPassword} />
                </View>
              </View>
            </View>
            <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
              <View style={[styledComponentsSheet.inputContainer1]} >
                <View style={[flexRow, alignItemsCenter]}>
                  <CustomIcon name='lock-outline' size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                  <Controller
                    name={formKeys.newpassword}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomTextInput
                        placeholder={labels.newPwd}
                        value={value}
                        secureTextEntry={newPassword}
                        onChangeText={onChange} />
                    )}
                    rules={{
                      required: requiredValidation(('labels.password')),
                      minLength: minLengthValidation(
                        validationSchema.password.minLength,
                      ),
                    }}
                  />
                </View>
                <View style={[justyfyCenter]}>
                  <PasswordToggleIcon isVisible={!confirmPassword} toggleVisibility={handleNewPassword} />
                </View>
              </View>
            </View>
            <View style={[{ borderBottomColor: isDark() ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
              <View style={[styledComponentsSheet.inputContainer1]} >
                <View style={[flexRow, alignItemsCenter]}>
                  <CustomIcon name='lock-outline' size={20} color={isDark() ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                  <Controller
                    name={formKeys.confirmpassword}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <CustomTextInput
                        placeholder={labels.confirmPwd}
                        value={value}
                        secureTextEntry={confirmPassword}
                        onChangeText={onChange} />
                    )}
                    rules={{
                      required: requiredValidation(labels.password),
                      minLength: minLengthValidation(
                        validationSchema.password.minLength,
                      ),
                    }}
                  />
                </View>
                <View style={[justyfyCenter]}>
                  <PasswordToggleIcon isVisible={!confirmPassword} toggleVisibility={handleConfirmPassword} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
          <View style={[mh20,commonView.rowSpaceBetween,{ bottom: 20 }]}>
          <SmallButton
            title={labels.cancel}
            backgroundColor={isCancelButtonActive ? colors.primaryVar3 : (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white)}
            textColor={isCancelButtonActive ? colors.white : isDark() ? colors.redVar3 : colors.greyVar4}
            onChange={handleCancelButtonClick}
            borderWidth={isCancelButtonActive ? 0 : 1} />
          <SmallButton
            title={labels.saveChange}
            backgroundColor={isCancelButtonActive ? (isDark() ? `rgba(200, 16, 46, 0.2)` : colors.white) : colors.primaryVar3}
            textColor={isCancelButtonActive ? isDark() ? colors.redVar3 : colors.greyVar4 : colors.white}
            onChange={handleSaveChangesClick}
            borderWidth={isCancelButtonActive ? 1 : 0} />
        </View>
      </View>
    </Fragment>
  )
};

export default Password;