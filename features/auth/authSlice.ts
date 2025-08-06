// import { createSlice } from "@reduxjs/toolkit";

// interface AuthState {
//   token: string | null;
//   user: any | null;
//   isAuthLoaded: boolean;
//   sendOtpLoading: boolean;
//   verifyOtpLoading: boolean;
//   createProfileLoading: boolean;
//   getAllUsersLoading: boolean;
//   users: any[];
//   error: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   user: null,
//   isAuthLoaded: false,
//   sendOtpLoading: false,
//   verifyOtpLoading: false,
//   createProfileLoading: false,
//   getAllUsersLoading: false,
//   users: [],
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     // Set auth on app load or after login
//     setAuth: (state, action) => {
//       state.token = action.payload.token;
//       state.user = action.payload.user;
//       state.isAuthLoaded = true;
//     },

//     // Clear auth on logout
//     clearAuth: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuthLoaded = true;
//     },

//     setAuthLoaded: (state) => {
//       state.isAuthLoaded = true;
//     },

//     /* Send OTP */
//     sendOtpStart: (state) => {
//       state.sendOtpLoading = true;
//       state.error = null;
//     },
//     sendOtpSuccess: (state) => {
//       state.sendOtpLoading = false;
//     },
//     sendOtpFailure: (state, action) => {
//       state.sendOtpLoading = false;
//       state.error = action.payload;
//     },

//     /* Verify OTP */
//     verifyOtpStart: (state) => {
//       state.verifyOtpLoading = true;
//       state.error = null;
//     },
//     verifyOtpSuccess: (state) => {
//       state.verifyOtpLoading = false;
//     },
//     verifyOtpFailure: (state, action) => {
//       state.verifyOtpLoading = false;
//       state.error = action.payload;
//     },

//     /* Create Profile */
//     createProfileStart: (state) => {
//       state.createProfileLoading = true;
//       state.error = null;
//     },
//     createProfileSuccess: (state) => {
//       state.createProfileLoading = false;
//     },
//     createProfileFailure: (state, action) => {
//       state.createProfileLoading = false;
//       state.error = action.payload;
//     },

//     getAllUsersStart: (state) => {
//       state.getAllUsersLoading = true;
//       state.error = null;
//     },
//     getAllUsersSuccess: (state, action) => {
//       state.getAllUsersLoading = false;
//       state.users = action.payload;
//     },
//     getAllUsersFailure: (state, action) => {
//       state.getAllUsersLoading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   setAuth,
//   clearAuth,
//   sendOtpStart,
//   sendOtpSuccess,
//   sendOtpFailure,
//   verifyOtpStart,
//   verifyOtpSuccess,
//   verifyOtpFailure,
//   createProfileStart,
//   createProfileSuccess,
//   createProfileFailure,
//   getAllUsersStart,
//   getAllUsersSuccess,
//   getAllUsersFailure,
// } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  user: any | null;
  isAuthLoaded: boolean;
  sendOtpLoading: boolean;
  verifyOtpLoading: boolean;
  createProfileLoading: boolean;
  getAllUsersLoading: boolean;
  users: any[];
  error: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthLoaded: false,
  sendOtpLoading: false,
  verifyOtpLoading: false,
  createProfileLoading: false,
  getAllUsersLoading: false,
  users: [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Batch set auth (used in loadAuth)
    setAuth: (state, action: PayloadAction<{ token: string; user: any }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthLoaded = true;
    },

    // ✅ Set token and user separately (used in verifyOtp)
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },

    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthLoaded = true;
    },

    setAuthLoaded: (state) => {
      state.isAuthLoaded = true;
    },

    /* Send OTP */
    sendOtpStart: (state) => {
      state.sendOtpLoading = true;
      state.error = null;
    },
    sendOtpSuccess: (state) => {
      state.sendOtpLoading = false;
    },
    sendOtpFailure: (state, action: PayloadAction<string>) => {
      state.sendOtpLoading = false;
      state.error = action.payload;
    },

    /* Verify OTP */
    verifyOtpStart: (state) => {
      state.verifyOtpLoading = true;
      state.error = null;
    },
    verifyOtpSuccess: (state) => {
      state.verifyOtpLoading = false;
    },
    verifyOtpFailure: (state, action: PayloadAction<string>) => {
      state.verifyOtpLoading = false;
      state.error = action.payload;
    },

    /* Create Profile */
    createProfileStart: (state) => {
      state.createProfileLoading = true;
      state.error = null;
    },
    createProfileSuccess: (state) => {
      state.createProfileLoading = false;
    },
    createProfileFailure: (state, action: PayloadAction<string>) => {
      state.createProfileLoading = false;
      state.error = action.payload;
    },

    /* Get All Users */
    getAllUsersStart: (state) => {
      state.getAllUsersLoading = true;
      state.error = null;
    },
    getAllUsersSuccess: (state, action: PayloadAction<any[]>) => {
      state.getAllUsersLoading = false;
      state.users = action.payload;
    },
    getAllUsersFailure: (state, action: PayloadAction<string>) => {
      state.getAllUsersLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setAuth,
  setToken,
  setUser,
  clearAuth,
  setAuthLoaded,
  sendOtpStart,
  sendOtpSuccess,
  sendOtpFailure,
  verifyOtpStart,
  verifyOtpSuccess,
  verifyOtpFailure,
  createProfileStart,
  createProfileSuccess,
  createProfileFailure,
  getAllUsersStart,
  getAllUsersSuccess,
  getAllUsersFailure,
} = authSlice.actions;

export default authSlice.reducer;
