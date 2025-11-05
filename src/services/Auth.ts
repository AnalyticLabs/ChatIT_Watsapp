import {RawAxiosRequestHeaders } from 'axios';
import { instance, publicReq } from './config';
import { REFRESH_TOKEN_KEY, URL } from './Endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshTokenService = (headers: RawAxiosRequestHeaders) =>
    publicReq.get(URL.REFRESH_TOKEN, {
        headers,
    });
export const logInService = (data: any) => publicReq.post(URL.LOGIN, data);
// export const logOutService = async () => instance.get(URL.LOG_OUT, { token: await AsyncStorage.getItem(REFRESH_TOKEN_KEY) });
export const logOutService = async () => {
    const token = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    return instance.get(URL.LOG_OUT, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const sendOTPService = (data: any) => publicReq.post(URL.SEND_OTP, data);
export const verifyOTPService = (data: any) => publicReq.post(URL.VERIFY_OTP, data);
export const getUsersService = () => instance.get(URL.USERS);


export const signUpService = (data: any) => publicReq.post(URL.SIGN_UP, data);
export const forgotPasswordService = (data: any) =>
    publicReq.put(URL.FORGOT_PASSWORD, data);
export const verifyOtpService = (data: any) =>
    publicReq.put(URL.VERIFY_OTP, data);
export const resendOtpService = (data: any) =>
    publicReq.patch(URL.RESEND_OTP, data);
export const resetPasswordService = (data: any) =>
    publicReq.put(URL.RESET_PASSWORD, data);
export const getProfileService = () => instance.get(URL.GET_PROFILE);

export const getPaymentCardService = () => instance.get(URL.PAYMENT_CARD);
export const deletePaymentCardService = (query: any) => instance.delete(URL.PAYMENT_CARD + query);

export const notificationListService = (query: string) =>
    instance.get(URL.GET_NOTIFICATION + query);