import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  sendOtpLoading: boolean;
  verifyOtpLoading: boolean;
  createProfileLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  sendOtpLoading: false,
  verifyOtpLoading: false,
  createProfileLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* SendOTP Slices */
    sendOtpStart: (state) => {
      state.sendOtpLoading = true;
      state.error = null;
    },
    sendOtpSuccess: (state) => {
      state.sendOtpLoading = false;
    },
    sendOtpFailure: (state, action) => {
      state.sendOtpLoading = false;
      state.error = action.payload;
    },

    /* VerifyOTP Slices */
    verifyOtpStart: (state) => {
      state.verifyOtpLoading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.verifyOtpLoading = false;
    },
    verifyOtpFailure: (state, action) => {
      state.verifyOtpLoading = false;
      state.error = action.payload;
    },

    /* CreateProfile Slices */
    createProfileStart: (state) => {
      state.createProfileLoading = true;
      state.error = null;
    },
    createProfileSuccess: (state) => {
      state.createProfileLoading = false;
    },
    createProfileFailure: (state, action) => {
      state.createProfileLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
} = authSlice.actions;

export default authSlice.reducer;
