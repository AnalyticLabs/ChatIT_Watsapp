import { createSlice } from '@reduxjs/toolkit';
import { getNotificationListThunk, getPaymentCardThunk, getProfileThunk } from '../thunks/auth';

// Define a type for the slice state

// Define the initial state using that type
interface State {
  isLoggedIn: boolean;
  tabBarVisible: boolean;
  user: {
    [key: string]: any;
  };
  theme: 'light' | 'dark';
  role: 'user' | 'vendor';
  paymentCardList: [];
  achCardList: [];
  notificationList: [];
  coordinates: {}
  privacy: {}
  terms: {}
  rules: {}
}
const initialState: State = {
  isLoggedIn: false,
  tabBarVisible: true,
  user: {},
  theme: 'light',
  role: 'user',
  paymentCardList: [],
  achCardList: [],
  notificationList: [],
  coordinates: {},
  privacy: {},
  terms: {},
  rules: {},
};

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      return state;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      return state;
    },
    setRole: (state, action) => {
      state.role = action.payload;
      return state;
    },
    setCordinates: (state, action) => {
      state.coordinates = action.payload;
      return state;
    },
    setPrivacy: (state, action) => {
      state.privacy = action.payload
      return state
    },
    setTerms: (state, action) => {
      state.terms = action.payload
      return state
    },
    setRules: (state, action) => {
      state.rules = action.payload
      return state
    }
  },
  extraReducers: builder => {
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getPaymentCardThunk.fulfilled, (state, action) => {
      state.paymentCardList = action.payload?.cards;
      state.achCardList = action.payload?.ach;
    });
    builder.addCase(getNotificationListThunk.fulfilled, (state, action) => {
      state.notificationList = action.payload;
    });
  },
});

// Other code such as selectors can use the imported `RootState` type
// export const selectFile = (state: RootState) => state.home.files;
export const { setIsLoggedIn, setTheme, setRole, setCordinates, setTerms, setPrivacy, setRules } = authSlice.actions;
export default authSlice.reducer;
