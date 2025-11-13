import { baseApi } from './baseApi';
import { User, LoginRequest, LoginResponse, RegisterRequest } from '../types/authTypes';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOTP: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/send-otp',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    register: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/signup',
        method: 'POST',
        body,
      }),
    }),
    verifyOtp: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/verify-otp',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/forgot-password',
        method: 'POST',
        body,
      }),
    }),

    resetPassword: builder.mutation<LoginResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/reset-password',
        method: 'POST',
        body,
      }),
    }),

    resendOtp: builder.mutation<LoginResponse, void>({
      query: () => ({
        url: 'auth/otp/resend',
        method: 'POST'
      }),
    }),
  }),
});

export const {
  useSendOTPMutation,
  useRegisterMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
