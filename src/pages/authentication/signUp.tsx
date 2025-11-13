import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import { alignItemsCenter, flex1, flexRow, justyfyCenter, m28, mb20, mh25, ml10, ml15, mt15, mv8 } from '../../components/commonStyles';
import { commonText,  } from '../../components/commonText';
import { styledComponentsSheet, } from '../../styledComponent/styledComponent';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { AuthImageBg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { AppleIcon, AppleIconDark, CountryLogo, FaceBookIcon, GoogleIcon, GoogleIconDark, SignUpLogo } from '../../utils/svg';
import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationconfig';
import { socialLogo, topLogo } from './loginEmail';

export type SignUpProps = {
}

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState<undefined>()
    const [showPassword, setShowPassword] = useState(true);
    const navigation = useNavigation()
    const { theme } = useTheme();

    const isDarkTheme = theme === 'dark';

    const formKeys = {
        name: 'Email',
        password: 'Password',
    };
    const {
        control,
    } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleFirstName = (newFirstName: string) => {
        setFirstName(newFirstName);
    };

    const handleLastName = (newLastName: string) => {
        setLastName(newLastName);
    };

    const handleUserName = (newUserName: string) => {
        setUserName(newUserName);
    };

    const handlePhoneNumber = (newPhoneNumber: undefined) => {
        setPhoneNumber(newPhoneNumber);
    };

    return (
        <Fragment>
            <View style={[flex1]}>
                <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }}>
                    <ImageBackground source={AuthImageBg} style={[flex1]}>
                        <View >
                            <ScrollView>
                                <View style={[m28]}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <CustomIcon name='arrow-back-outline' size={28} color={colors.black} type='Ionicons' />
                                    </TouchableOpacity>
                                    {topLogo(<SignUpLogo />)}
                                </View>
                                <View>
                                    <View style={[mh25]}>
                                        <Text style={[{ color: isDarkTheme ? colors.white : colors.black },commonText.h20font600Black]}>{labels.signUp}</Text>
                                        <Text style={[mv8, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels.newaccount}</Text>
                                        <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                            <View style={[justyfyCenter]}>
                                                <CustomIcon name='person' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                            </View>
                                            <CustomTextInput
                                                placeholder={labels.firstName}
                                                value={firstName}
                                                onChangeText={handleFirstName}
                                                textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                            />
                                        </View>
                                        <View>
                                            <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                                <View style={[justyfyCenter]}>
                                                    <CustomIcon name='person' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                                </View>
                                                <CustomTextInput
                                                    placeholder={labels.lastName}
                                                    value={lastName}
                                                    onChangeText={handleLastName}
                                                    textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                                />
                                            </View>
                                        </View>
                                        <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
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
                                                        textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
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
                                        <View>
                                            <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                                <View style={[justyfyCenter]}>
                                                    <CustomIcon name='person' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                                </View>
                                                <CustomTextInput
                                                    placeholder={labels.userName}
                                                    value={userName}
                                                    onChangeText={handleUserName}
                                                    textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                                />
                                            </View>
                                        </View>
                                        <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                            <View style={[justyfyCenter]}>
                                                <CustomIcon name='phone' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='Feather' />
                                            </View>
                                            <View style={[ml15, mt15]}>
                                                <CountryLogo />
                                            </View>
                                            <View style={[justyfyCenter, ml10]}>
                                                <CustomIcon name='chevron-down' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='octicons' />
                                            </View>
                                            <CustomTextInput
                                                placeholder={labels.phNumber}
                                                value={phoneNumber}
                                                onChangeText={handlePhoneNumber}
                                                keyboardType='numeric'
                                                textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                                            />
                                        </View>
                                        <View>
                                            <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor }, styledComponentsSheet.iconInputContainer]}>
                                                <View style={[styledComponentsSheet.inputContainer1]}>
                                                    <View style={[flexRow, alignItemsCenter]}>
                                                        <CustomIcon name='lock-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
                                                        <Controller
                                                            name={formKeys.password}
                                                            control={control}
                                                            render={({ field: { onChange, value } }) => (
                                                                <CustomTextInput
                                                                    placeholder={labels.password}
                                                                    value={value}
                                                                    secureTextEntry={showPassword}
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
                                        </View>
                                        <View style={{ marginVertical: 30 }}>
                                            <LongPurpleButton
                                                title={labels.signUp}
                                                onChange={() => { navigation.navigate(screenName.Chats as never) }}
                                            />
                                        </View>
                                        <View style={[styledComponentsSheet.checkBoxContainer]}>
                                            <View style={[{ borderBottomColor: isDarkTheme ? 'rgba(78, 80, 114, 0.3)' : colors.borderBottomColor }, styledComponentsSheet.bottomStyle]} />
                                            <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels.continuemsg}</Text>
                                            <View style={[{ borderBottomColor: isDarkTheme ? 'rgba(78, 80, 114, 0.3)' : colors.borderBottomColor }, styledComponentsSheet.bottomStyle]} />
                                        </View>
                                        <View style={[styledComponentsSheet.socialLogoContainer]}>                                            {socialLogo(isDarkTheme ? <GoogleIconDark /> : <GoogleIcon />)}
                                            {socialLogo(<FaceBookIcon />)}
                                            {socialLogo(isDarkTheme ? <AppleIconDark /> : <AppleIcon />)}
                                        </View>
                                    </View>
                                    <View style={[mb20,styledComponentsSheet.textContainer]}>
                                        <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels.haveanAccount}</Text>
                                        <TouchableOpacity
                                            onPress={() => { navigation.navigate(screenName.LoginEmail as never) }}>
                                            <Text style={[commonText.h14font400Blue]} >{labels.logIn}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </ImageBackground>
                </GestureHandlerRootView>
            </View>
        </Fragment>
    )
};

export default SignUp;