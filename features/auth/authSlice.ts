import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sendOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    sendOtpSuccess: (state) => {
      state.loading = false;
    },
    sendOtpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    verifyOtpStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.loading = false;
    },
    verifyOtpFailure: (state, action) => {
      state.loading = false;
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
