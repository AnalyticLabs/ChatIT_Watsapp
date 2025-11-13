import { useNavigation } from '@react-navigation/native';
import React, { Fragment, useRef, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LongPurpleButton } from '../../components/commonButtons';
import { flex1, flexRow, m28, mh25, mt20, mv30, mv8, ph30, pt25, spaceBetween, } from '../../components/commonStyles';
import { commonText, } from '../../components/commonText';
import { styledComponentsSheet } from '../../styledComponent/styledComponent';
import { useTheme } from '../../theme/themeContext';
import CustomIcon from '../../utils/Icons';
import { colors } from '../../utils/colors';
import { labels } from '../../utils/labels';
import { AuthImageBg } from '../../utils/png';
import { screenName } from '../../utils/screenName';
import { VerificationLogo } from '../../utils/svg';
import { topLogo } from './loginEmail';
import { useResendOtpMutation, useVerifyOtpMutation } from '../../api/authApi';
import { logToConsole, showErrorToast, showSuccessToast } from '../../utils/functions';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice';
import { saveString } from '../../utils/storage';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '../../services/Endpoints';

export type VerificationProps = {};

const Verification = ({ route }: any) => {
    const { confirmation } = route.params;
    const { phoneNumber } = route.params?.payload
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation()
    const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const otpInputRefs = useRef<TextInput[]>(Array(6).fill(null));
    const { theme } = useTheme();

    const isDarkTheme = theme === 'dark';

    const handleOtpChange = (index: number, text: string) => {
        if (text?.length === 1 && index < 5) {
            otpInputRefs.current[index + 1]?.focus();
        }
        const updatedOtp = [...otp];
        updatedOtp[index] = text;
        setOtp(updatedOtp);
    };

    const renderOtpInputs = () => {
        return otp.map((value, index) => (
            <View key={index}>
                <TextInput
                    ref={(ref) => (otpInputRefs.current[index] = ref)}
                    style={[styledComponentsSheet.otpInput, {
                        borderWidth: 1,
                        borderColor: value ? colors.primaryVar3 : isDarkTheme ? colors.darkModeVar5 : colors.borderBottomColor,
                        backgroundColor: value ? isDarkTheme ? colors.darkModeVar6 : colors.primaryVar4 : isDarkTheme ? colors.darkModeVar7 : colors.white
                    }]}
                    onChangeText={(text) => handleOtpChange(index, text)}
                    value={value}
                    maxLength={1}
                    keyboardType="numeric"
                    placeholderTextColor={colors.black}
                />
            </View>
        ));
    };

    const handleSubmitOtp = async () => {
        try {
            const response = await verifyOtp(route.params?.payload).unwrap();
            const { status, data, message } = response || {};
            if (status !== 'success') {
                showErrorToast(message || 'Login failed');
                return;
            }
            else {
                dispatch(setCredentials({ user: data, token: data.accessToken, isAuthenticated: true }));
                navigation.navigate(screenName.Chats as never)
                showSuccessToast('Login successful!');
                saveString(TOKEN_KEY, data?.token);
                saveString(REFRESH_TOKEN_KEY, data?.refreshToken);
            }

        } catch (error: any) {
            logToConsole('Login failed:', error);
            const message =
                error?.data?.message ||
                error?.error ||
                'Something went wrong. Please try again.';
            showErrorToast(message);
        }
    };

    const handlResend = async () => {
        // try {
        //     const response = await resendOtp().unwrap();
        //     console.log('Resend response:', response);
        //     const { status, data, message } = response || {};
        //     if (status) {
        //         console.log('OTP resent successfully!', response);
        //         showSuccessToast(message || 'OTP resent successfully!');
        //     } else {
        //         showErrorToast(message || 'Failed to resend OTP');
        //     }
        // } catch (error: any) {
        //     console.error('Resend failed:', error);
        //     const message =
        //         error?.data?.message ||
        //         error?.error ||
        //         'Something went wrong. Please try again.';
        //     showErrorToast(message);
        // }
    };

    return (
        <Fragment>
            <View style={[flex1]}>
                <GestureHandlerRootView style={{ flex: 1, backgroundColor: isDarkTheme ? colors.darkModeVar2 : colors.white }}>
                    <ImageBackground source={AuthImageBg} style={[flex1]}>
                        <View style={[m28]}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <CustomIcon name="arrow-back-outline" size={28} color={colors.black} type="Ionicons" />
                            </TouchableOpacity>
                            {/* {topLogo(<VerificationLogo />)} */}
                        </View>
                        <View>
                            <View style={[mh25]}>
                                <Text style={[{ color: isDarkTheme ? colors.white : colors.black }, commonText.h20font600Black]}>{labels?.verification}</Text>
                                <Text style={[mv8, { color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels?.verifyMsg}</Text>
                                <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{phoneNumber}</Text>
                            </View>
                        </View>
                        <View style={[ph30]}>
                            <View style={[flexRow, spaceBetween, mt20]}>
                                {renderOtpInputs()}
                            </View>
                            <View style={[pt25, flexRow, spaceBetween]}>
                                <View style={[flexRow]}>
                                    <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels.didnotReceivecode}</Text>
                                    <TouchableOpacity onPress={handlResend} >
                                        <Text style={[commonText.h14font400Purple3]}>{labels.resendCode}</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={[{ color: isDarkTheme ? colors.greyVar3 : colors.greyVar4 }, commonText.h14font400Gray4]}>{labels.second}</Text>
                            </View>
                            <View style={[mv30]}>
                                <LongPurpleButton
                                    title={labels.verifyAcc}
                                    onChange={handleSubmitOtp}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </GestureHandlerRootView>
            </View>
        </Fragment>
    )
};

export default Verification; 