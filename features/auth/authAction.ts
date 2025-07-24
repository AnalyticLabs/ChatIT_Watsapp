import { AppDispatch } from "../../store/index";
import {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
} from "./authSlice";
import { createProfileAPI, sendOtpAPI, verifyOtpAPI } from "../../api/authApi";

export const sendOtp = (payload: {
  phoneNumber: string;
  phoneSuffix: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sendOtpStart());
      const response = await sendOtpAPI(payload);
      dispatch(sendOtpSuccess());
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      dispatch(sendOtpFailure(message));
      throw new Error(message);
    }
  };
};

export const verifyOtp = ({
  phoneNumber,
  phoneSuffix,
  otp,
}: {
  phoneNumber: string;
  phoneSuffix: string;
  otp: string;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(verifyOtpStart());
      const res = await verifyOtpAPI({ phoneNumber, phoneSuffix, otp });
      dispatch(verifyOtpSuccess());
      return res;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "OTP verification failed";
      dispatch(verifyOtpFailure(message));
      throw error;
    }
  };
};

export const createProfile = ({
  username,
  agreed,
  profileImage,
}: {
  username: string;
  agreed: boolean;
  profileImage?: string | null;
}) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(createProfileStart());
      const response = await createProfileAPI({
        username,
        agreed,
        profileImage,
      });
      dispatch(createProfileSuccess());
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Profile creation failed";
      dispatch(createProfileFailure(message));
      throw new Error(message);
    }
  };
};
