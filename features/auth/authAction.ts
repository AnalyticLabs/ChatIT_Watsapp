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
  setAuth,
  clearAuth,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailure,
} from "./authSlice";
import {
  createProfileAPI,
  sendOtpAPI,
  verifyOtpAPI,
  getAllUsersAPI,
} from "../../api/authApi";
import {
  clearAuthFromStorage,
  getAuthFromStorage,
  saveAuthToStorage,
} from "~/utils/authStorage";

// App start auth loader
export const loadAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const auth = await getAuthFromStorage();
      if (auth?.token && auth?.user) {
        dispatch(setAuth(auth));
      } else {
        dispatch(clearAuth());
      }
    } catch (e) {
      dispatch(clearAuth());
    }
  };
};

// Logout function
export const logout = () => {
  return async (dispatch: AppDispatch) => {
    await clearAuthFromStorage();
    dispatch(clearAuth());
  };
};

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
      const { token, user } = res.data;

      // Save to AsyncStorage
      await saveAuthToStorage(token, user);
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

export const getAllUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(getAllUsersStart());
      const res = await getAllUsersAPI();
      dispatch(getAllUsersSuccess(res.data));
      return res.data;
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to fetch users";
      dispatch(getAllUsersFailure(message));
      throw error;
    }
  };
};
