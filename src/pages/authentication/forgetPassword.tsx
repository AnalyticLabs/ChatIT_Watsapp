import { useNavigation } from '@react-navigation/native';
import React, { Fragment, } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { flex1, justyfyCenter, m28, mh25, mt8, mv30, mv8 } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { styledComponentsSheet,  } from '../../styledComponent/styledComponent';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { AuthImageBg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { PasswordLogo } from '../../utils/svg';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationconfig';
import { topLogo } from './loginEmail';

export type ForgetPasswordProps = {
}

const ForgetPassword = (props: ForgetPasswordProps) => {
    const navigation = useNavigation();
    const { theme } = useTheme();

    const isDarkTheme = theme === 'dark';

    const formKeys = {
        name: 'Email',
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onLogin = (details: any) => {
        navigation.navigate(screenName.Verification as never);
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
                                <Text style={[{ color: isDarkTheme ? colors.white : colors.black },commonText.h20font600Black]}>{labels.forgetPassword1}</Text>
                                <Text style={[mt8,commonText.h14font400Gray4,mv8, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }]} >{labels.fPmsg}</Text>
                                <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor },styledComponentsSheet.iconInputContainer]}>
                                    <View style={[justyfyCenter]}>
                                        <CustomIcon name='email-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialCommunityIcons' />
                                    </View>
                                    <Controller
                                        name={formKeys.name}
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <CustomTextInput
                                                placeholder={labels.emailaddress}
                                                value={value}
                                                onChangeText={onChange}
                                                textColor={isDarkTheme?colors.greyVar3:colors.blackVar1}
                                            />
                                        )}
                                        rules={{
                                            required: requiredValidation(("labels.emailOrUserName")),
                                            minLength: minLengthValidation(
                                                validationSchema.name.minLength,
                                            ),
                                        }}
                                    />
                                </View>
                                <View style={[mv30]}>
                                    <LongPurpleButton
                                        title={labels.resetPassword}
                                        onChange={handleSubmit(onLogin)}
                                    />
                                </View>
                            </View>
                            <View style={[styledComponentsSheet.textContainer1]}>
                                <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Gray4]}>{labels.remeberyourPassword}</Text>
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate(screenName.LoginEmail as never) }}>
                                    <Text style={[commonText.h14font400Blue]} >{labels.logIn}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </GestureHandlerRootView>
            </View>
        </Fragment>
    )
};

export default ForgetPassword;