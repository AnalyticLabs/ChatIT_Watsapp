import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { CommonModal } from '../../components/commonModal';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, m28, mh25, mv30, mv8 } from '../../components/commonStyles';
import { commonText,} from '../../components/commonText';
import {  styledComponentsSheet } from '../../styledComponent/styledComponent';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { AuthImageBg } from '../../utils/png';
import { PasswordLogo } from '../../utils/svg';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationconfig';
import { topLogo } from './loginEmail';

export type createNewPasswordProps = {
}

const CreateNewPassword = (props: createNewPasswordProps) => {
    const navigation = useNavigation()
    const [showPassword, setShowPassword] = useState(true);
    const [shownewPassword, setShowNewPassword] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();

    const isDarkTheme = theme === 'dark';

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const formKeys = {
        password: 'Password',
        confirmpassword: 'Confirmpassword'
    };

    const defaultValues = {
        Password: 'dreams123',
        Confirmpassword: 'dreams123',
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordVisibility1 = () => {
        setShowNewPassword(!shownewPassword);
    };

    const onLogin = (details: any) => {
    };

    return (
        <Fragment>
            <View style={[flex1]}>
                <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }}>
                    <ImageBackground source={AuthImageBg} style={[flex1]}>
                        <View style={[m28]}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <CustomIcon name='arrow-back-outline' size={28} color={colors.black} type='Ionicons' />
                            </TouchableOpacity>
                            {topLogo(<PasswordLogo />)}
                        </View>
                        <View>
                            <View style={[mh25]}>
                                <Text style={[{ color: isDarkTheme ? colors.white : colors.black },commonText.h20font600Black]}>{labels.createpassword}</Text>
                                 <Text style={[commonText.h14font400Gray4,mv8, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }]}>{labels.cpMsg}</Text>
                                <Text style={[commonText.h14font400Gray4,{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }]}>{labels.cpMsg1}</Text>
                                <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor },styledComponentsSheet.iconInputContainer]}>
                                    <View style={[styledComponentsSheet.inputContainer1]}>
                                        <View style={[flexRow, alignItemsCenter]}>
                                            <CustomIcon name='lock-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                                            <Controller
                                                name={formKeys.password}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <CustomTextInput
                                                        placeholder={labels.newPwd}
                                                        value={value}
                                                        secureTextEntry={showPassword}
                                                        onChangeText={onChange}
                                                        textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                                    />
                                                )}
                                                rules={{
                                                    required: requiredValidation(('')),
                                                    minLength: minLengthValidation(
                                                        validationSchema.password.minLength,
                                                    ),
                                                }}
                                            />
                                        </View>
                                        <View style={[justyfyCenter]}>
                                            <TouchableOpacity onPress={togglePasswordVisibility} >
                                                <CustomIcon
                                                    name={!showPassword ? 'eye' : 'eye-closed'}
                                                    size={20}
                                                    color={isDarkTheme ? colors.greyVar3 : colors.greyVar4}
                                                    type='octicons'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor },styledComponentsSheet.iconInputContainer]}>
                                    <View style={[styledComponentsSheet.inputContainer1]}>
                                        <View style={[flexRow, alignItemsCenter]}>
                                            <CustomIcon name='lock-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                                            <Controller
                                                name={formKeys.confirmpassword}
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <CustomTextInput
                                                        placeholder={labels.confirmPwd}
                                                        value={value}
                                                        secureTextEntry={shownewPassword}
                                                        onChangeText={onChange}
                                                        textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                                    />
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
                                            <TouchableOpacity onPress={togglePasswordVisibility1} >
                                                <CustomIcon
                                                    name={!showPassword ? 'eye' : 'eye-closed'}
                                                    size={20}
                                                    color={isDarkTheme ? colors.greyVar3 : colors.greyVar4}
                                                    type='octicons'
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={[mv30]}>
                                    <LongPurpleButton
                                        title={labels.changePwd}
                                        onChange={() => {
                                            handleSubmit(onLogin);
                                            toggleModal();
                                        }}
                                    />
                                </View>
                            </View>
                            <CommonModal
                                isVisible={isModalVisible}
                                onClose={() => {
                                    toggleModal();
                                }}
                            />
                        </View>
                    </ImageBackground>
                </GestureHandlerRootView>
            </View>
        </Fragment>
    );
};

export default CreateNewPassword;