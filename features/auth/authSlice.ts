import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  sendOtpLoading: boolean;
  verifyOtpLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  sendOtpLoading: false,
  verifyOtpLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  },
});

export const {
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
} = authSlice.actions;

export default authSlice.reducer;
