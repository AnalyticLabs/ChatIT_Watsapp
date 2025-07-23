import { AppDispatch } from "../../store/index";
import {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
} from "./authSlice";
import { sendOtpAPI, verifyOtpAPI } from "../../api/authApi";

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
