// import { useNavigation } from '@react-navigation/native';
// import React, { Fragment, useState } from 'react';
// import { Controller, useForm } from 'react-hook-form';
// import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { LongPurpleButton } from '../../components/commonButtons';
// import { CustomTextInput } from '../../components/commonInputFields';
// import { alignItemsCenter, flex1, flexRow, justyfyCenter, m28, mh25, mv8, ph5 } from '../../components/commonStyles';
// import { commonText, } from '../../components/commonText';
// import { styledComponentsSheet } from '../../styledComponent/styledComponent';
// import { useTheme } from '../../theme/themeContext';
// import CustomIcon from '../../utils/Icons';
// import { colors } from '../../utils/colors';
// import { labels } from '../../utils/labels';
// import { AuthImageBg } from '../../utils/png';
// import { screenName } from '../../utils/screenName';
// import { AppleIcon, AppleIconDark, FaceBookIcon, GoogleIcon, GoogleIconDark, LoginPageLogo } from '../../utils/svg';
// import { minLengthValidation, requiredValidation, validationSchema } from '../../utils/validationconfig';

// export const topLogo = (logo: any) => {
//     const { theme } = useTheme();

//     const isDarkTheme = theme === 'dark';
//     return (
//         <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar4 : 'rgba(248, 236, 258, 0.7)' },styledComponentsSheet.loginLogoCircle]}>
//             <View style={{ backgroundColor: isDarkTheme ? colors.darkModeVar6 : 'rgba(90, 7, 139, 0.03)' }}>
//                 {logo}
//             </View>
//         </View>
//     )
// };

// export const socialLogo = (content: any) => {
//     const { theme } = useTheme();

//     const isDarkTheme = theme === 'dark';

//     return (
//         <View style={[{ backgroundColor: isDarkTheme ? colors.darkModeVar6 : colors.primaryVar1 },styledComponentsSheet.socialLogoCircle]}>
//             {content}
//         </View>
//     )
// };

// export type loginEmailProps = {
// }

// const LoginEmail = (props: loginEmailProps) => {
//     const [showPassword, setShowPassword] = useState(true);
//     const [isChecked, setIsChecked] = useState(false);
//     const navigation = useNavigation();
//     const { theme } = useTheme();

//     const isDarkTheme = theme === 'dark';

//     const formKeys = {
//         name: 'Email',
//         password: 'Password',
//     };

//     const defaultValues = {
//         Email: 'ChatIt@gmail.com',
//         Password: 'dreams123',
//     };

//     const {
//         handleSubmit,
//         control,
//         formState: { errors },
//     } = useForm({ defaultValues });

//     const onLogin = (details: any) => {
//         navigation.navigate(screenName.Chats as never);
//     };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const toggleCheckbox = () => {
//         setIsChecked(!isChecked);
//     };

//     return (
//         <Fragment>
//             <View style={[flex1]}>
//                 <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }}>
//                     <ImageBackground source={AuthImageBg} style={[flex1]}>
//                         <ScrollView>
//                             <View style={[m28]}>
//                                 {topLogo(<LoginPageLogo />)}
//                             </View>
//                             <View>
//                                 <View style={[mh25]}>
//                                     <Text style={[{ color: isDarkTheme ? colors.white : colors.black },commonText.h20font600Black]}>{labels.logIn}</Text>
//                                     <Text style={[mv8, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Gray4]}>{labels.message}</Text>
//                                     <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor },styledComponentsSheet.iconInputContainer]}>
//                                         <View style={[justyfyCenter]}>
//                                             <CustomIcon name='email-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialCommunityIcons' />

//                                         </View>
//                                         <Controller
//                                             name={formKeys.name}
//                                             control={control}
//                                             render={({ field: { onChange, value } }) => (
//                                                 <CustomTextInput
//                                                     placeholder={labels.emailaddress}
//                                                     value={value}
//                                                     onChangeText={onChange}
//                                                     textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
//                                                 />
//                                             )}
//                                             rules={{
//                                                 required: requiredValidation(("labels.emailOrUserName")),
//                                                 minLength: minLengthValidation(
//                                                     validationSchema.name.minLength,
//                                                 ),
//                                             }}
//                                         />
//                                     </View>
//                                     <View style={[{ borderBottomColor: isDarkTheme ? `rgba(78, 80, 114, 0.3)` : colors.borderBottomColor },styledComponentsSheet.iconInputContainer]}>
//                                         <View style={[styledComponentsSheet.inputContainer1]}>
//                                             <View style={[flexRow, alignItemsCenter]}>
//                                                 <CustomIcon name='lock-outline' size={20} color={isDarkTheme ? colors.greyVar3 : colors.greyVar4} type='MaterialIcons' />
//                                                 <Controller
//                                                     name={formKeys.password}
//                                                     control={control}
//                                                     render={({ field: { onChange, value } }) => (
//                                                         <CustomTextInput
//                                                             placeholder={labels.password}
//                                                             value={value}
//                                                             secureTextEntry={showPassword}
//                                                             onChangeText={onChange}
//                                                             textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
//                                                         />
//                                                     )}
//                                                     rules={{
//                                                         required: requiredValidation(('labels.password')),
//                                                         minLength: minLengthValidation(
//                                                             validationSchema.password.minLength,
//                                                         ),
//                                                     }}
//                                                 />
//                                             </View>
//                                             <View style={[justyfyCenter]}>
//                                                 <TouchableOpacity onPress={togglePasswordVisibility} >
//                                                     <CustomIcon
//                                                         name={!showPassword ? 'eye' : 'eye-closed'}
//                                                         size={20}
//                                                         color={isDarkTheme ? colors.greyVar3 : colors.greyVar4}
//                                                         type='octicons'
//                                                     />
//                                                 </TouchableOpacity>
//                                             </View>
//                                         </View>
//                                     </View>
//                                     <View style={[styledComponentsSheet.checkBoxContainer1]}>
//                                         <View style={[flexRow]}>
//                                             <TouchableOpacity
//                                                 onPress={toggleCheckbox}>
//                                                 <View style={[{ backgroundColor: isChecked ? colors.primaryVar3 : 'transparent' },styledComponentsSheet.checkBox]}>
//                                                     {isChecked && (
//                                                         <CustomIcon name="check" size={16} color={colors.white} type={'MaterialCommunityIcons'} />)}
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <Text style={[ph5, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Gray4]}>{labels.rememberme}</Text>
//                                         </View>
//                                         <TouchableOpacity
//                                             onPress={() => { navigation.navigate(screenName.ForgetPassword as never) }}>
//                                             <Text style={[commonText.h14font400Blue]} >{labels.forgetpassword}</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                     <View style={{ marginVertical: 30 }}>
//                                         <LongPurpleButton
//                                             title={labels.logIn}
//                                             onChange={handleSubmit(onLogin)}
//                                         />
//                                     </View>
//                                     <View style={[styledComponentsSheet.checkBoxContainer]}>
//                                         <View style={[{ borderBottomColor: isDarkTheme ? 'rgba(78, 80, 114, 0.3)' : colors.borderBottomColor },styledComponentsSheet.bottomStyle]} />
//                                         <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Blue]}>{labels.continuemsg}</Text>
//                                         <View style={[{ borderBottomColor: isDarkTheme ? 'rgba(78, 80, 114, 0.3)' : colors.borderBottomColor },styledComponentsSheet.bottomStyle]} />
//                                     </View>
//                                     <View style={[styledComponentsSheet.socialLogoContainer]}>
//                                         {socialLogo(isDarkTheme ? <GoogleIconDark /> : <GoogleIcon />)}
//                                         {socialLogo(<FaceBookIcon />)}
//                                         {socialLogo(isDarkTheme ? <AppleIconDark /> : <AppleIcon />)}
//                                     </View>
//                                 </View>
//                                 <View style={[styledComponentsSheet.textContainer]}>
//                                     <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 },commonText.h14font400Gray4]}>{labels.donthaveanaccount}</Text>
//                                     <TouchableOpacity
//                                         onPress={() => { navigation.navigate(screenName.SignUp as never) }}>
//                                         <Text style={[commonText.h14font400Blue]} >{labels.signUp}</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </ScrollView>
//                     </ImageBackground>
//                 </GestureHandlerRootView>
//             </View>
//         </Fragment>
//     )
// };

// export default LoginEmail;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LongPurpleButton } from '../../components/commonButtons';
import { CustomTextInput } from '../../components/commonInputFields';
import {
    flex1,
    flexRow,
    justyfyCenter,
    alignItemsCenter,
    mh25,
    mv8,
    m28,
    ph5,
} from '../../components/commonStyles';
import { commonText } from '../../components/commonText';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { screenName } from '../../utils/screenName';
import {
    requiredValidation,
    minLengthValidation,
    validationSchema,
} from '../../utils/validationconfig';
import { Image } from 'react-native';
import { useSendOTPMutation } from '../../api/authApi';
import { logToConsole, showErrorToast, showSuccessToast } from '../../utils/functions';
import { setCredentials } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const LoginEmail = () => {
    const [sendOTP, { isLoading: isSendOTPLoading }] = useSendOTPMutation()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation();
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';
    const [phoneNumber, setPhoneNumber] = useState('');
    const [remember, setRemember] = useState(false);
    const handlePhoneNumber = (newPhoneNumber: string) => {
        setPhoneNumber(newPhoneNumber);
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const formKeys = {
        email: 'Email',
        password: 'Password',
    };

    const defaultValues = {
        Email: '',
        Password: '',
    };

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({ defaultValues });

    const onLogin = (details: any) => {
        console.log('Login pressed:', details);
        navigation.navigate(screenName.Chats as never);
    };

    const handleLogin = async () => {
        const payload = {
            // phoneNumber: '7009173569',
            phoneNumber: phoneNumber,
            // phoneSuffix: prefix,
            phoneSuffix: '+91',
        };
        try {
            const response = await sendOTP(payload).unwrap();
            const { status, data, message } = response || {};
            console.log(status, '----status', response);

            if (status !== 'success') {
                console.log('error ');

                showErrorToast(message || 'Login failed');
                return;
            }
            else {
                // dispatch(setCredentials({ user: data?._doc, token: data.accessToken, isAuthenticated: true }));
                navigation.navigate(screenName.Verification, { confirmation: data?.otpDetails, payload });
                // showSuccessToast('Login successful!');
            }

        } catch (error: any) {
            const message =
            error?.data?.message ||
            error?.error ||
            'Something went wrong. Please try again.';
            logToConsole(message,'=-=-=-=-=-=-');
            showErrorToast(message);
        }
    };


    return (
        <GestureHandlerRootView
            style={[
                flex1,
                { backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white },
            ]}
        >
            <View style={[{
                backgroundColor: colors.background, flex: 1,
                justifyContent: "center",
                padding: 24,
            }]}>
                <View style={{
                    alignItems: "center",
                    marginBottom: 40,
                }}>
                    <Image
                        source={require("../../../assets/images/png/Logo.png")} // replace with your actual logo
                        style={{
                            width: 80,
                            height: 80,
                        }}
                        resizeMode="contain"
                    />
                    <Text
                        style={{
                            color: colors.primaryVar1, marginTop: 8,
                            fontSize: 28,
                            fontFamily: "Poppins_600SemiBold",
                        }}
                    >
                        ChatIt
                    </Text>
                </View>
                <Text style={[{
                    color: colors.primaryVar1,
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "600",
                    marginBottom: 20,
                }]}>
                    Sign up for free
                </Text>

                <View style={{ marginTop: 8, }}>
                    <Text style={[{
                        color: colors.primaryVar1, fontSize: 14,
                        fontWeight: "600",
                        marginBottom: 6,
                    }]}>
                        Phone Number <Text style={{ color: colors.error }}>*</Text>
                    </Text>

                    <CustomTextInput
                        placeholder={labels.phNumber}
                        value={phoneNumber}
                        onChangeText={handlePhoneNumber}
                        keyboardType='numeric'
                        textColor={isDarkTheme ? colors.greyVar3 : colors.blackVar1}
                    />

                    <TouchableOpacity
                        onPress={() => setRemember(!remember)}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 20,
                            marginTop: 10

                        }}
                    >
                        <View
                            style={[

                                {
                                    borderColor: colors.border,
                                    width: 18,
                                    height: 18,
                                    borderWidth: 1,
                                    borderRadius: 4,
                                    marginRight: 8,
                                },
                                remember && { backgroundColor: colors.primaryVar1 },
                            ]}
                        />
                        <Text style={[{
                            color: colors.primaryVar1,
                            fontSize: 14,
                        }]}>
                            Remember me
                        </Text>
                    </TouchableOpacity>

                    <LongPurpleButton
                        title={labels.logIn}
                        // onChange={() => { navigation.navigate(screenName.Chats as never) }}
                        onChange={() => { handleLogin() }}
                    />
                </View>
            </View>
        </GestureHandlerRootView>
    );
};

export default LoginEmail;
